import { CompilerContext } from './CompilerContext'
import { 
  FunctionDef, 
  JS_STACK_SIZE_MAX,
} from './FunctionDef'
import { Opcode, OPCODE_DEFS, OPCODE_BY_CODE, OpFormat } from '../env'
import { Compiler } from './Compiler'

// ============================================================================
// 栈大小计算器 - 对应 parser.c:compute_stack_size
// 
// QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:12191-12380
// ============================================================================

/** 操作码数量上限 */
const OP_COUNT = 256

/**
 * 栈大小状态
 */
interface StackSizeState {
  bcLen: number
  stackLenMax: number
  stackLevelTab: Uint16Array   // 每个 PC 位置的栈大小
  catchPosTab: Int32Array      // 每个 PC 位置的 catch 位置
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
  constructor(private context: CompilerContext) {}

  private get compiler(): Compiler {
    return this.context.compiler
  }

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
      bcLen,
      stackLenMax: 0,
      stackLevelTab: new Uint16Array(bcLen).fill(0xffff),
      catchPosTab: new Int32Array(bcLen).fill(-1),
      pcStack: [],
    }
    
    // 广度优先探索
    if (!this.ssCheck(s, 0, Opcode.OP_invalid, 0, -1)) {
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
        throw new Error(`Stack underflow at position ${pos}, op=${op}`)
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
          if (!this.ssCheck(s, target, op, newStackLen, catchPos)) {
            return -1
          }
          continue
        }
        
        // === 短跳转 (goto16) ===
        case Opcode.OP_goto16: {
          const diff = this.getI16(bcBuf, pos + 1)
          const target = pos + 1 + diff
          if (!this.ssCheck(s, target, op, newStackLen, catchPos)) {
            return -1
          }
          continue
        }
        
        // === 短跳转 (goto8) ===
        case Opcode.OP_goto8: {
          const diff = this.getI8(bcBuf, pos + 1)
          const target = pos + 1 + diff
          if (!this.ssCheck(s, target, op, newStackLen, catchPos)) {
            return -1
          }
          continue
        }
        
        // === 条件跳转 (短) ===
        case Opcode.OP_if_true8:
        case Opcode.OP_if_false8: {
          const diff = this.getI8(bcBuf, pos + 1)
          const target = pos + 1 + diff
          if (!this.ssCheck(s, target, op, newStackLen, catchPos)) {
            return -1
          }
          break
        }
        
        // === 条件跳转 ===
        case Opcode.OP_if_true:
        case Opcode.OP_if_false: {
          const diff = this.getI32(bcBuf, pos + 1)
          const target = pos + 1 + diff
          if (!this.ssCheck(s, target, op, newStackLen, catchPos)) {
            return -1
          }
          break
        }
        
        // === gosub (finally) ===
        case Opcode.OP_gosub: {
          const diff = this.getI32(bcBuf, pos + 1)
          const target = pos + 1 + diff
          // gosub 会在栈上压入返回地址
          if (!this.ssCheck(s, target, op, newStackLen + 1, catchPos)) {
            return -1
          }
          break
        }
        
        // === with 操作码 ===
        case Opcode.OP_with_get_var:
        case Opcode.OP_with_delete_var: {
          const diff = this.getI32(bcBuf, pos + 5)
          const target = pos + 5 + diff
          if (!this.ssCheck(s, target, op, newStackLen + 1, catchPos)) {
            return -1
          }
          break
        }
        
        case Opcode.OP_with_make_ref:
        case Opcode.OP_with_get_ref: {
          const diff = this.getI32(bcBuf, pos + 5)
          const target = pos + 5 + diff
          if (!this.ssCheck(s, target, op, newStackLen + 2, catchPos)) {
            return -1
          }
          break
        }
        
        case Opcode.OP_with_put_var: {
          const diff = this.getI32(bcBuf, pos + 5)
          const target = pos + 5 + diff
          if (!this.ssCheck(s, target, op, newStackLen - 1, catchPos)) {
            return -1
          }
          break
        }
        
        // === catch ===
        case Opcode.OP_catch: {
          const diff = this.getI32(bcBuf, pos + 1)
          const target = pos + 1 + diff
          if (!this.ssCheck(s, target, op, newStackLen, catchPos)) {
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
        case Opcode.OP_drop: {
          const catchLevel = stackLen
          catchPos = this.checkCatch(s, bcBuf, catchPos, catchLevel)
          break
        }
        
        case Opcode.OP_nip:
        case Opcode.OP_nip1: {
          const catchLevel = stackLen - 1
          catchPos = this.checkCatch(s, bcBuf, catchPos, catchLevel)
          break
        }
        
        case Opcode.OP_iterator_close: {
          const catchLevel = stackLen + 2
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
      if (!this.ssCheck(s, posNext, op, newStackLen, catchPos)) {
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
    op: number,
    stackLen: number,
    catchPos: number
  ): boolean {
    if (pos < 0 || pos >= s.bcLen) {
      throw new Error(`Bytecode buffer overflow (op=${op}, pc=${pos})`)
    }
    
    if (stackLen > s.stackLenMax) {
      s.stackLenMax = stackLen
      if (s.stackLenMax > JS_STACK_SIZE_MAX) {
        throw new Error(`Stack overflow (op=${op}, pc=${pos})`)
      }
    }
    
    if (s.stackLevelTab[pos] !== 0xffff) {
      // 已探索: 检查一致性
      if (s.stackLevelTab[pos] !== stackLen) {
        throw new Error(
          `Inconsistent stack size: ${s.stackLevelTab[pos]} vs ${stackLen} (pc=${pos})`
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
    
    // 加入探索队列
    s.pcStack.push(pos)
    return true
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

  private getU8(buf: Uint8Array, pos: number): number {
    return buf[pos]
  }

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
    return val > 0x7FFFFFFF ? val - 0x100000000 : val
  }
}
