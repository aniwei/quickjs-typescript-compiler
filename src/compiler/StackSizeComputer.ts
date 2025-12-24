import { CompilerContext } from './CompilerContext'
import { 
  FunctionDef, 
  JS_STACK_SIZE_MAX,
} from './FunctionDef'
import { Opcode, OPCODE_BY_CODE, OpFormat, STACK_LEVEL_UNSET, OP_COUNT } from '../env'
import { u32ToI32 } from './int32'

// ============================================================================
// 栈大小计算器 - 对应 parser.c:compute_stack_size
// 
// QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:12191-12380
// ============================================================================

/**
 * 栈大小状态
 */
interface StackSizeState {
  bcBuf: Uint8Array
  bcLen: number
  stackLenMax: number
  stackLevelTab: Uint16Array   // 每个 PC 位置的栈大小
  catchPosTab: Int32Array      // 每个 PC 位置的 catch 位置
  fromPosTab: Int32Array       // 记录首次到达该 PC 的来源 PC（诊断用）
  fromOpTab: Uint8Array        // 记录首次到达该 PC 的来源 opcode（诊断用）
  pcStack: number[]            // 待探索的 PC 栈
}

/**
 * 栈大小计算器 - 计算函数所需的最大栈大小
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:12191-12380
 * 
 * 使用广度优先图探索算法:
 * 1. 从位置 0 开始
 * 2. 跟踪每条指令的栈大小变化
 * 3. 处理分支和跳转
 * 4. 确保一致性 (同一位置的栈大小必须相同)
 */
export class StackSizeComputer {
  constructor(_context: CompilerContext) {}

  // ============================================================================
  // 主入口方法 - 对应 parser.c:compute_stack_size
  // 
  // QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:12191-12380
  // ============================================================================

  /**
   * 计算函数的最大栈大小
   * 
   * @returns 最大栈大小，如果出错返回 -1
   */
  compute(fd: FunctionDef): number {
    const bcBuf = fd.byteCode.buffer
    const bcLen = fd.byteCode.size
    
    if (bcLen === 0) {
      return 0
    }
    
    // 初始化状态
    const s: StackSizeState = {
      bcBuf,
      bcLen,
      stackLenMax: 0,
      stackLevelTab: new Uint16Array(bcLen).fill(STACK_LEVEL_UNSET),
      catchPosTab: new Int32Array(bcLen).fill(-1),
      fromPosTab: new Int32Array(bcLen).fill(-1),
      fromOpTab: new Uint8Array(bcLen).fill(0),
      pcStack: [],
    }
    
    // 广度优先探索
    if (!this.ssCheck(s, 0, -1, Opcode.OP_invalid, 0, -1)) {
      return -1
    }
    
    while (s.pcStack.length > 0) {
      const pos = s.pcStack.pop()!
      const stackLen = s.stackLevelTab[pos]
      let catchPos = s.catchPosTab[pos]
      
      const op = bcBuf[pos]
      if (op === 0 || op >= OP_COUNT) {
        throw new Error(`Invalid opcode: ${op} at position ${pos}`)
      }
      
      const opDef = OPCODE_BY_CODE[op]
      if (!opDef) {
        throw new Error(`Unknown opcode: ${op} at position ${pos}`)
      }
      
      const posNext = pos + opDef.size
      if (posNext > bcLen) {
        throw new Error(`Bytecode buffer overflow at position ${pos}`)
      }
      
      // 计算栈变化
      let nPop = opDef.nPop ?? 0
      const nPush = opDef.nPush ?? 0
      
      // 处理可变参数调用
      if (opDef.format === OpFormat.npop || opDef.format === OpFormat.npop_u16) {
        nPop += this.getU16(bcBuf, pos + 1)
      } else if (opDef.format === OpFormat.npopx) {
        // call0, call1, call2, call3
        nPop += op - Opcode.OP_call0
      }
      
      // 检查栈下溢
      if (stackLen < nPop) {
        const opName = opDef.id ?? `unknown_${op}`
        const bytes = Array.from(
          bcBuf.slice(pos, Math.min(bcLen, pos + opDef.size))
        )
          .map(b => b.toString(16).padStart(2, '0'))
          .join(' ')

        const ctxStart = Math.max(0, pos - 16)
        const ctxEnd = Math.min(bcLen, pos + 32)
        const ctxBytes = Array.from(bcBuf.slice(ctxStart, ctxEnd))
          .map(b => b.toString(16).padStart(2, '0'))
          .join(' ')

        const fromPc = s.fromPosTab[pos]
        const fromOp = s.fromOpTab[pos]
        const fromOpName = OPCODE_BY_CODE[fromOp]?.id ?? `unknown_${fromOp}`

        if (process.env.DEBUG_STACK) {
          this.dumpUnderflowWindow(s, pos)
        }
        throw new Error(
          `Stack underflow at pc=${pos} op=${opName} (${op}) stackLen=${stackLen} nPop=${nPop} nPush=${nPush} bytes=${bytes} from_pc=${fromPc} from_op=${fromOpName} (${fromOp}) ctx[${ctxStart}..${ctxEnd})=${ctxBytes}`
        )
      }
      
      let newStackLen = stackLen + nPush - nPop
      
      // 更新最大栈大小
      if (newStackLen > s.stackLenMax) {
        s.stackLenMax = newStackLen
        if (s.stackLenMax > JS_STACK_SIZE_MAX) {
          throw new Error(`Stack overflow at position ${pos}`)
        }
      }
      
      // 根据操作码类型处理控制流
      switch (op) {
        // === 终止指令 ===
        case Opcode.OP_tail_call:
        case Opcode.OP_tail_call_method:
        case Opcode.OP_return:
        case Opcode.OP_return_undef:
        case Opcode.OP_return_async:
        case Opcode.OP_throw:
        case Opcode.OP_throw_error:
        case Opcode.OP_ret:
          // 不需要继续
          continue
        
        // === 无条件跳转 ===
        case Opcode.OP_goto: {
          const diff = this.getI32(bcBuf, pos + 1)
          const target = pos + 1 + diff
          if (!this.ssCheck(s, target, pos, op, newStackLen, catchPos)) {
            return -1
          }
          continue
        }
        
        // === 短跳转 (goto16) ===
        case Opcode.OP_goto16: {
          const diff = this.getI16(bcBuf, pos + 1)
          const target = pos + 1 + diff
          if (!this.ssCheck(s, target, pos, op, newStackLen, catchPos)) {
            return -1
          }
          continue
        }
        
        // === 短跳转 (goto8) ===
        case Opcode.OP_goto8: {
          const diff = this.getI8(bcBuf, pos + 1)
          const target = pos + 1 + diff
          if (!this.ssCheck(s, target, pos, op, newStackLen, catchPos)) {
            return -1
          }
          continue
        }
        
        // === 条件跳转 (短) ===
        case Opcode.OP_if_true8:
        case Opcode.OP_if_false8: {
          const diff = this.getI8(bcBuf, pos + 1)
          const target = pos + 1 + diff
          if (!this.ssCheck(s, target, pos, op, newStackLen, catchPos)) {
            return -1
          }
          break
        }
        
        // === 条件跳转 ===
        case Opcode.OP_if_true:
        case Opcode.OP_if_false: {
          const diff = this.getI32(bcBuf, pos + 1)
          const target = pos + 1 + diff
          if (!this.ssCheck(s, target, pos, op, newStackLen, catchPos)) {
            return -1
          }
          break
        }
        
        // === gosub (finally) ===
        case Opcode.OP_gosub: {
          const diff = this.getI32(bcBuf, pos + 1)
          const target = pos + 1 + diff
          // gosub 会在栈上压入返回地址
          if (!this.ssCheck(s, target, pos, op, newStackLen + 1, catchPos)) {
            return -1
          }
          break
        }
        
        // === with 操作码 ===
        case Opcode.OP_with_get_var:
        case Opcode.OP_with_delete_var: {
          const diff = this.getI32(bcBuf, pos + 5)
          const target = pos + 5 + diff
          if (!this.ssCheck(s, target, pos, op, newStackLen + 1, catchPos)) {
            return -1
          }
          break
        }
        
        case Opcode.OP_with_make_ref:
        case Opcode.OP_with_get_ref: {
          const diff = this.getI32(bcBuf, pos + 5)
          const target = pos + 5 + diff
          if (!this.ssCheck(s, target, pos, op, newStackLen + 2, catchPos)) {
            return -1
          }
          break
        }
        
        case Opcode.OP_with_put_var: {
          const diff = this.getI32(bcBuf, pos + 5)
          const target = pos + 5 + diff
          if (!this.ssCheck(s, target, pos, op, newStackLen - 1, catchPos)) {
            return -1
          }
          break
        }
        
        // === catch ===
        case Opcode.OP_catch: {
          const diff = this.getI32(bcBuf, pos + 1)
          const target = pos + 1 + diff
          if (!this.ssCheck(s, target, pos, op, newStackLen, catchPos)) {
            return -1
          }
          catchPos = pos
          break
        }
        
        // === for-of 迭代 ===
        case Opcode.OP_for_of_start:
        case Opcode.OP_for_await_of_start:
          catchPos = pos
          break
        
        // === drop/nip 检查 catch ===
        // 注意: QuickJS 中 catch_level 使用的是指令执行后的栈深度
        case Opcode.OP_drop: {
          const catchLevel = newStackLen  // drop 后的深度
          catchPos = this.checkCatch(s, bcBuf, catchPos, catchLevel)
          break
        }
        
        case Opcode.OP_nip: {
          // QuickJS: catch_level = stack_len - 1 (parser.c:12293)
          // 注意：这里的 newStackLen 对应 C 中已应用 n_push/n_pop 后的 stack_len
          const catchLevel = newStackLen - 1
          catchPos = this.checkCatch(s, bcBuf, catchPos, catchLevel)
          break
        }
        
        case Opcode.OP_nip1: {
          // QuickJS: catch_level = stack_len - 1 (parser.c:12296)
          const catchLevel = newStackLen - 1
          catchPos = this.checkCatch(s, bcBuf, catchPos, catchLevel)
          break
        }
        
        case Opcode.OP_iterator_close: {
          // iterator_close: nPop=3, nPush=0，但 check 使用 stack_len + 2
          // 在 QuickJS 中: catch_level = stack_len + 2 (执行后的 stack_len + 2)
          const catchLevel = newStackLen + 2
          catchPos = this.checkCatch(s, bcBuf, catchPos, catchLevel)
          break
        }
        
        // === nip_catch ===
        case Opcode.OP_nip_catch: {
          if (catchPos < 0) {
            throw new Error(`nip_catch: no catch op at position ${pos}`)
          }
          newStackLen = s.stackLevelTab[catchPos]
          if (bcBuf[catchPos] !== Opcode.OP_catch) {
            newStackLen++ // for_of_start, for_await_of_start
          }
          newStackLen++ // 不会溢出
          catchPos = s.catchPosTab[catchPos]
          break
        }
        
        default:
          break
      }
      
      // 检查下一条指令
      if (!this.ssCheck(s, posNext, pos, op, newStackLen, catchPos)) {
        return -1
      }
    }
    
    fd.stackSize = s.stackLenMax
    return s.stackLenMax
  }

  // ============================================================================
  // 辅助方法
  // ============================================================================

  /**
   * 检查并记录栈大小 - 对应 parser.c:ss_check
   */
  private ssCheck(
    s: StackSizeState,
    pos: number,
    fromPos: number,
    op: number,
    stackLen: number,
    catchPos: number
  ): boolean {
    if (pos < 0 || pos >= s.bcLen) {
      const op8 = op & 0xff
      const opName = OPCODE_BY_CODE[op8]?.id ?? `unknown_${op8}`
      throw new Error(
        `Bytecode buffer overflow (pc=${pos}, op=${opName}(${op8}), from_pc=${fromPos}, stack=${stackLen}, bcLen=${s.bcLen})`
      )
    }
    
    if (stackLen > s.stackLenMax) {
      s.stackLenMax = stackLen
      if (s.stackLenMax > JS_STACK_SIZE_MAX) {
        throw new Error(`Stack overflow (op=${op}, pc=${pos})`)
      }
    }
    
    if (s.stackLevelTab[pos] !== STACK_LEVEL_UNSET) {
      // 已探索: 检查一致性
      if (s.stackLevelTab[pos] !== stackLen) {
        const prevFromPos = s.fromPosTab[pos]
        const prevFromOp = s.fromOpTab[pos]

        if (process.env.DEBUG_STACK) {
          this.dumpStackMismatch(s, {
            pc: pos,
            prevStackLen: s.stackLevelTab[pos],
            newStackLen: stackLen,
            prevFromPc: prevFromPos,
            prevFromOp,
            newFromPc: fromPos,
            newFromOp: op & 0xff,
          })
        }

        throw new Error(
          `Inconsistent stack size: ${s.stackLevelTab[pos]} vs ${stackLen} (pc=${pos}, prev_from_pc=${prevFromPos}, prev_from_op=${prevFromOp}, new_from_pc=${fromPos}, new_from_op=${op})`
        )
      }
      if (s.catchPosTab[pos] !== catchPos) {
        throw new Error(
          `Inconsistent catch position: ${s.catchPosTab[pos]} vs ${catchPos} (pc=${pos})`
        )
      }
      return true
    }
    
    // 标记为已探索
    s.stackLevelTab[pos] = stackLen
    s.catchPosTab[pos] = catchPos
    s.fromPosTab[pos] = fromPos
    s.fromOpTab[pos] = op & 0xff
    
    // 加入探索队列
    s.pcStack.push(pos)
    return true
  }

  private dumpStackMismatch(
    s: StackSizeState,
    info: {
      pc: number
      prevStackLen: number
      newStackLen: number
      prevFromPc: number
      prevFromOp: number
      newFromPc: number
      newFromOp: number
    }
  ): void {
    const bcBuf = s.bcBuf
    const bcLen = s.bcLen

    const opName = (opcode: number) => OPCODE_BY_CODE[opcode]?.id ?? `unknown_${opcode}`

    const formatInsn = (pc: number): string => {
      const opcode = bcBuf[pc]
      const def = OPCODE_BY_CODE[opcode]
      const size = def?.size ?? 1
      const bytes = Array.from(bcBuf.slice(pc, Math.min(bcLen, pc + size)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join(' ')

      let extra = ''
      switch (opcode) {
        case Opcode.OP_goto: {
          const diff = this.getI32(bcBuf, pc + 1)
          extra = ` diff=${diff} target=${pc + 1 + diff}`
          break
        }
        case Opcode.OP_goto16: {
          const diff = this.getI16(bcBuf, pc + 1)
          extra = ` diff=${diff} target=${pc + 1 + diff}`
          break
        }
        case Opcode.OP_goto8: {
          const diff = this.getI8(bcBuf, pc + 1)
          extra = ` diff=${diff} target=${pc + 1 + diff}`
          break
        }
        case Opcode.OP_if_true:
        case Opcode.OP_if_false: {
          const diff = this.getI32(bcBuf, pc + 1)
          extra = ` diff=${diff} target=${pc + 1 + diff}`
          break
        }
        case Opcode.OP_if_true8:
        case Opcode.OP_if_false8: {
          const diff = this.getI8(bcBuf, pc + 1)
          extra = ` diff=${diff} target=${pc + 1 + diff}`
          break
        }
        default:
          break
      }

      const stack = s.stackLevelTab[pc]
      const stackStr = stack === STACK_LEVEL_UNSET ? '??' : String(stack)
      const pops = def?.nPop ?? 0
      const pushes = def?.nPush ?? 0
      return `pc=${pc.toString().padStart(4)} stack=${stackStr.padStart(2)} op=${opName(opcode).padEnd(26)} bytes=${bytes.padEnd(14)} pop=${pops} push=${pushes}${extra}`
    }

    const marks = new Set([info.pc, info.prevFromPc, info.newFromPc].filter(v => v >= 0))
    console.error(
      `[DEBUG_STACK] Inconsistent stack size at pc=${info.pc}: prev=${info.prevStackLen} (from pc=${info.prevFromPc}, op=${opName(info.prevFromOp)}) vs new=${info.newStackLen} (from pc=${info.newFromPc}, op=${opName(info.newFromOp)})`
    )
    console.error(`[DEBUG_STACK] Bytecode length=${bcLen}`)

    let pc = 0
    let safety = 0
    while (pc < bcLen && safety++ < bcLen + 5) {
      const opcode = bcBuf[pc]
      const def = OPCODE_BY_CODE[opcode]
      const size = def?.size ?? 1
      const prefix = marks.has(pc) ? '>> ' : '   '
      console.error(prefix + formatInsn(pc))
      pc += size
    }
  }

  private dumpUnderflowWindow(s: StackSizeState, pcCenter: number): void {
    const bcBuf = s.bcBuf
    const bcLen = s.bcLen

    const opName = (opcode: number) => OPCODE_BY_CODE[opcode]?.id ?? `unknown_${opcode}`

    const formatInsn = (pc: number): string => {
      const opcode = bcBuf[pc]
      const def = OPCODE_BY_CODE[opcode]
      const size = def?.size ?? 1
      const bytes = Array.from(bcBuf.slice(pc, Math.min(bcLen, pc + size)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join(' ')

      let extra = ''
      switch (opcode) {
        case Opcode.OP_goto: {
          const diff = this.getI32(bcBuf, pc + 1)
          extra = ` diff=${diff} target=${pc + 1 + diff}`
          break
        }
        case Opcode.OP_goto16: {
          const diff = this.getI16(bcBuf, pc + 1)
          extra = ` diff=${diff} target=${pc + 1 + diff}`
          break
        }
        case Opcode.OP_goto8: {
          const diff = this.getI8(bcBuf, pc + 1)
          extra = ` diff=${diff} target=${pc + 1 + diff}`
          break
        }
        case Opcode.OP_if_true:
        case Opcode.OP_if_false: {
          const diff = this.getI32(bcBuf, pc + 1)
          extra = ` diff=${diff} target=${pc + 1 + diff}`
          break
        }
        case Opcode.OP_if_true8:
        case Opcode.OP_if_false8: {
          const diff = this.getI8(bcBuf, pc + 1)
          extra = ` diff=${diff} target=${pc + 1 + diff}`
          break
        }
        default:
          break
      }

      const stack = s.stackLevelTab[pc]
      const stackStr = stack === STACK_LEVEL_UNSET ? '??' : String(stack)
      const pops = def?.nPop ?? 0
      const pushes = def?.nPush ?? 0
      return `pc=${pc.toString().padStart(4)} stack=${stackStr.padStart(2)} op=${opName(opcode).padEnd(26)} bytes=${bytes.padEnd(14)} pop=${pops} push=${pushes}${extra}`
    }

    console.error(`[DEBUG_STACK] Stack underflow window around pc=${pcCenter}`)

    // Walk instruction boundaries to find a nearby start.
    let pc = 0
    const insnStarts: number[] = []
    let safety = 0
    while (pc < bcLen && safety++ < bcLen + 5) {
      insnStarts.push(pc)
      const opcode = bcBuf[pc]
      const def = OPCODE_BY_CODE[opcode]
      const size = def?.size ?? 1
      pc += size
    }

    const idx = insnStarts.findIndex(p => p === pcCenter)
    const centerIdx = idx >= 0 ? idx : Math.max(0, insnStarts.findIndex(p => p > pcCenter) - 1)
    const startIdx = Math.max(0, centerIdx - 12)
    const endIdx = Math.min(insnStarts.length, centerIdx + 18)

    for (let i = startIdx; i < endIdx; i++) {
      const p = insnStarts[i]
      const prefix = p === pcCenter ? '>> ' : '   '
      console.error(prefix + formatInsn(p))
    }
  }

  /**
   * 检查 catch 位置
   */
  private checkCatch(
    s: StackSizeState,
    bcBuf: Uint8Array,
    catchPos: number,
    catchLevel: number
  ): number {
    if (catchPos >= 0) {
      let level = s.stackLevelTab[catchPos]
      if (bcBuf[catchPos] !== Opcode.OP_catch) {
        level++ // for_of_start, for_await_of_start
      }
      if (catchLevel === level) {
        return s.catchPosTab[catchPos]
      }
    }
    return catchPos
  }

  // ============================================================================
  // 字节码读取辅助方法
  // ============================================================================

  private getI8(buf: Uint8Array, pos: number): number {
    const val = buf[pos]
    return val > 127 ? val - 256 : val
  }

  private getU16(buf: Uint8Array, pos: number): number {
    return buf[pos] | (buf[pos + 1] << 8)
  }

  private getI16(buf: Uint8Array, pos: number): number {
    const val = this.getU16(buf, pos)
    return val > 32767 ? val - 65536 : val
  }

  private getU32(buf: Uint8Array, pos: number): number {
    return buf[pos] | (buf[pos + 1] << 8) | (buf[pos + 2] << 16) | (buf[pos + 3] << 24)
  }

  private getI32(buf: Uint8Array, pos: number): number {
    const val = this.getU32(buf, pos)
    return u32ToI32(val >>> 0)
  }
}
