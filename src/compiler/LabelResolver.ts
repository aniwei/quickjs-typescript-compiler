import { CompilerContext } from './CompilerContext'
import { 
  FunctionDef, 
  LabelSlot,
  RelocEntry,
  LineNumberSlot,
  JumpSlot,
  JSVarKindEnum,
} from './FunctionDef'
import { 
  Opcode,
  TempOpcode,
  OPCODE_BY_CODE, 
  TEMP_OPCODE_BY_CODE,
  JSAtom, 
  OpFormat,
  SHORT_OPCODES,
  JS_MODE_STRICT_DEFAULT,
  OPSpecialObjectEnum,
} from '../env'
import { BytecodeBuilder } from './BytecodeBuilder'
import { u32ToI32 } from './int32'
import { DebugInfoBuilder } from './DebugInfoBuilder'

// ============================================================================
// 常量定义 - 对应 QuickJS parser.c
// ============================================================================

/** 是否启用优化 */
const OPTIMIZE = true

/**
 * 检查短操作码是否可用
 * 
 * QuickJS WASM 版本可能有超过 256 个操作码，导致短跳转操作码
 * (if_true8, goto8, goto16) 的值超出单字节范围。
 * 只有当这些操作码的值都 <= 255 时才能使用短操作码优化。
 */
const canUseShortOpcodes = () => {
  // 检查所有短跳转操作码是否在有效范围内
  return SHORT_OPCODES &&
    Opcode.OP_if_false8 <= 255 &&
    Opcode.OP_if_true8 <= 255 &&
    Opcode.OP_goto8 <= 255 &&
    Opcode.OP_goto16 <= 255
}

/** 是否启用短操作码 - 根据运行时检查确定 */
const USE_SHORT_OPCODES = canUseShortOpcodes()

let DID_DUMP_SET_LOC_PEEPHOLE = false
let SET_LOC_PEEPHOLE_DUMP_COUNT = 0

/**
 * 临时 opcode 范围（仅本编译器内部使用，最终会在 LabelResolver 阶段被移除/替换）
 *
 * 注意：这不是 QuickJS 的语义常量，因此不注入 env.ts。
 */
const TEMP_OPCODE_MIN = 182
const TEMP_OPCODE_MAX = 200

// ============================================================================
// 多操作码匹配宏 - 对应 parser.c:10126-10129
// ============================================================================

/** 打包 2 个操作码用于模式匹配 */
const M2 = (op1: number, op2: number) => (op1) | ((op2) << 8)

/** 打包 3 个操作码用于模式匹配 */
const M3 = (op1: number, op2: number, op3: number) => (op1) | ((op2) << 8) | ((op3) << 16)

/** 打包 4 个操作码用于模式匹配 */
const M4 = (op1: number, op2: number, op3: number, op4: number) =>
  ((op1) | ((op2) << 8) | ((op3) << 16) | ((op4) << 24)) >>> 0

// ============================================================================
// 代码上下文 - 用于模式匹配
// 
// QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:10113-10129
// ============================================================================

interface CodeContext {
  bcBuf: Uint8Array
  bcLen: number
  pos: number
  lineNum: number
  /** Source length (for disambiguating OP_line_num vs short opcode collisions) */
  sourceLen?: number
  op: number
  idx: number
  label: number
  val: number
  atom: number
}

/**
 * 标签解析器 - 对应 parser.c:resolve_labels
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:11088-12120
 * 
 * 该类负责:
 * 1. 初始化特殊变量 (home_object, this, new.target, arguments 等)
 * 2. 解析标签引用，将相对跳转转换为绝对地址
 * 3. 窥孔优化 (peephole optimizations)
 * 4. 短操作码优化
 * 5. 死代码消除
 * 6. 生成 pc2line 调试信息
 */
export class LabelResolver {
  constructor(_context: CompilerContext) {}

  /**
   * TempOpcode.OP_line_num (200) collides with some real short opcodes (e.g. get_loc1).
   * Disambiguate by validating the following u32 as a plausible sourcePos.
   */
  private isLikelyLineNum(buf: Uint8Array, pos: number, sourceLen?: number): boolean {
    if (pos + 5 > buf.length) return false
    const sourcePos = this.getU32(buf, pos + 1) >>> 0
    if (sourceLen !== undefined && sourceLen > 0) {
      return sourcePos <= sourceLen
    }
    // Fallback heuristic: QuickJS source_pos is typically well below this.
    return sourcePos < (1 << 24)
  }

  /**
   * 查找 opcode 定义，支持临时 opcodes
   * 
   * 临时 opcodes (182-200) 只在编译阶段使用，最终会被移除或替换
   * 它们的值与短操作码重叠，所以需要根据上下文判断
   */
  private getOpcodeDef(op: number): { id: string; size: number; nPop: number; nPush: number; format: OpFormat } | undefined {
    // 检查是否是临时 opcode（182-200 范围）
    if (op >= TEMP_OPCODE_MIN && op <= TEMP_OPCODE_MAX && TEMP_OPCODE_BY_CODE[op]) {
      return TEMP_OPCODE_BY_CODE[op]
    }
    return OPCODE_BY_CODE[op]
  }

  private allocJumpSlot(fd: FunctionDef): JumpSlot {
    if (!fd.jumpSlots) {
      fd.jumpSlots = []
    }
    if (fd.jumpCount >= fd.jumpSlots.length) {
      fd.jumpSlots.push(new JumpSlot())
    }
    return fd.jumpSlots[fd.jumpCount]
  }

  // ============================================================================
  // 主入口方法 - 对应 parser.c:resolve_labels
  // 
  // QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:11088-12120
  // ============================================================================

  /**
   * 解析标签，优化字节码
   */
  resolve(fd: FunctionDef): void {
    const bcBuf = fd.byteCode.buffer
    const bcLen = fd.byteCode.size
    const bcOut = new BytecodeBuilder()
    
    // 创建 CodeContext 用于模式匹配
    const cc: CodeContext = {
      bcBuf,
      bcLen,
      pos: 0,
      lineNum: -1,
      sourceLen: fd.source ? fd.source.length : 0,
      op: 0,
      idx: 0,
      label: 0,
      val: 0,
      atom: 0,
    }
    
    // 初始化跳转槽
    if (process.env.DEBUG_JUMP) {
      console.log(`[resolve] fd.jumpSize=${fd.jumpSize}, USE_SHORT_OPCODES=${USE_SHORT_OPCODES}`)
    }
    if (USE_SHORT_OPCODES && fd.jumpSize > 0) {
      fd.jumpSlots = new Array(fd.jumpSize)
      for (let i = 0; i < fd.jumpSize; i++) {
        fd.jumpSlots[i] = new JumpSlot()
      }
    }
    
    // 初始化行号槽 - 总是初始化，因为我们需要在 LabelResolver 中记录 pc2line
    // QuickJS 策略：先预估 line_number_size（等价于 line_num 标记数量），再一次性分配固定容量。
    // 这样 add_pc2line_info 不需要 realloc，也不会出现“16 条后静默截断”。
    if (!fd.stripDebug) {
      if (fd.lineNumberSize <= 0) {
        fd.lineNumberSize = this.countLineNumMarkers(bcBuf, bcLen)
      }
      if (fd.lineNumberSize > 0) {
        fd.lineNumberSlots = new Array(fd.lineNumberSize)
        for (let i = 0; i < fd.lineNumberSize; i++) {
          fd.lineNumberSlots[i] = new LineNumberSlot()
        }
        fd.lineNumberCount = 0
        // 与 C 源码一致：初始化为函数的 source_pos
        // parser.c:11121: s->line_number_last = s->source_pos;
        fd.lineNumberLast = fd.sourcePos
        fd.lineNumberLastPc = 0
      } else {
        fd.lineNumberSlots = []
        fd.lineNumberCount = 0
        fd.lineNumberLast = fd.sourcePos
        fd.lineNumberLastPc = 0
      }
    }
    
    // 初始化 lineNum 为函数的 source_pos
    // parser.c:11102: line_num = s->source_pos;
    let lineNum = fd.sourcePos
    
    // === 初始化特殊变量 ===
    this.initializeSpecialVars(fd, bcOut)
    
    // === 主循环: 处理每条指令 ===
    let pos = 0
    while (pos < bcLen) {
      const op = bcBuf[pos]
      // Disambiguate TempOpcode.OP_line_num collisions (notably with get_loc1).
      const opDef = (op === TempOpcode.OP_line_num && !this.isLikelyLineNum(bcBuf, pos, fd.source ? fd.source.length : 0))
        ? OPCODE_BY_CODE[op]
        : this.getOpcodeDef(op)
      if (!opDef) {
        throw new Error(`Unknown opcode: ${op} at position ${pos}`)
      }
      
      const len = opDef.size
      let posNext = pos + len
      
      switch (op) {
        // === 短操作码优化: push_empty_string ===
        // QuickJS 会在 phase 3 将 push_atom_value("" ) 优化为 OP_push_empty_string。
        // 我们在编译阶段避免发射短操作码（与 TempOpcode 重叠），这里再做等价压缩。
        case Opcode.OP_push_atom_value: {
          const atom = this.getU32(bcBuf, pos + 1)
          if (USE_SHORT_OPCODES && OPTIMIZE && atom === JSAtom.JS_ATOM_empty_string) {
            this.addPc2lineInfo(fd, bcOut.size, lineNum)
            bcOut.putU8(Opcode.OP_push_empty_string)
            break
          }
          // 默认输出为 push_atom_value
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          bcOut.putU8(op)
          bcOut.putU32(atom)
          break
        }

        // === set_name: remove dummy set_name ===
        // QuickJS parser.c:10756-10764 removes OP_set_name when atom == JS_ATOM_NULL.
        case Opcode.OP_set_name: {
          const atom = this.getU32(bcBuf, pos + 1)
          if (OPTIMIZE && atom === 0) {
            break
          }
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          bcOut.putU8(op)
          bcOut.putU32(atom)
          break
        }

        // === 行号信息 ===
        case TempOpcode.OP_line_num:
          // Guard against opcode-number collisions in short-opcode mode.
          if (this.isLikelyLineNum(bcBuf, pos, fd.source ? fd.source.length : 0)) {
            lineNum = this.getU32(bcBuf, pos + 1)
            break
          }
          // Fall through to default handling if this is actually a real opcode.
        
        // === 作用域进入/退出 (TempOpcode) ===
        // 对应 QuickJS 源码 parser.c:10691-10750
        case TempOpcode.OP_enter_scope: {
          const scope = this.getU16(bcBuf, pos + 1)
          
          // 遍历作用域中的变量并初始化
          let scopeIdx = fd.scopes[scope].first
          while (scopeIdx >= 0) {
            const vd = fd.vars[scopeIdx]
            if (vd.scopeLevel === scope) {
              if (scopeIdx !== fd.argumentsArgIdx) {
                // catch 绑定变量（JS_VAR_CATCH）在进入 catch scope 时会被 catch 机制立即赋值，
                // QuickJS 最终输出的 bytecode 不会额外插入 OP_set_loc_uninitialized。
                // 若这里插入，会导致后续 label 地址与 pc2line 全部偏移（典型：try/catch family）。
                if (vd.varKind === JSVarKindEnum.JS_VAR_CATCH) {
                  scopeIdx = vd.scopeNext
                  continue
                }
                if (vd.varKind === JSVarKindEnum.JS_VAR_FUNCTION_DECL ||
                    vd.varKind === JSVarKindEnum.JS_VAR_NEW_FUNCTION_DECL) {
                  // 初始化词法变量 (函数声明)
                  this.addPc2lineInfo(fd, bcOut.size, lineNum)
                  bcOut.putU8(Opcode.OP_fclosure)
                  bcOut.putU32(vd.funcPoolIdx)
                  this.putShortCode(bcOut, Opcode.OP_put_loc, scopeIdx)
                } else {
                  // 初始化为 uninitialized
                  this.addPc2lineInfo(fd, bcOut.size, lineNum)
                  bcOut.putU8(Opcode.OP_set_loc_uninitialized)
                  bcOut.putU16(scopeIdx)
                }
              }
              scopeIdx = vd.scopeNext
            } else {
              break
            }
          }
          break
        }

        case TempOpcode.OP_leave_scope: {
          const scope = this.getU16(bcBuf, pos + 1)
          
          // 遍历作用域中的变量并关闭捕获的变量
          let scopeIdx = fd.scopes[scope].first
          while (scopeIdx >= 0) {
            const vd = fd.vars[scopeIdx]
            if (vd.scopeLevel === scope) {
              if (vd.isCaptured) {
                this.addPc2lineInfo(fd, bcOut.size, lineNum)
                bcOut.putU8(Opcode.OP_close_loc)
                bcOut.putU16(scopeIdx)
              }
              scopeIdx = vd.scopeNext
            } else {
              break
            }
          }
          break
        }

        // === 标签定义 ===
        case TempOpcode.OP_label: {
          const labelIdx = this.getU32(bcBuf, pos + 1)
          if (labelIdx >= 0 && labelIdx < fd.labelSlots.length) {
            const ls = fd.labelSlots[labelIdx]
            
            // 关键：pos2 用于后续 jump diff 的“静态预估”。
            // 在本实现里，emitJump() 用的是 srcPos（源字节码位置）去估计 diff：diff = ls.pos2 - srcPos - 1。
            // 因此 ls.pos2 必须是“源字节码坐标”（fd.byteCode.buffer 的位置），否则会导致短跳转估计错误，
            // 以及 findJumpTarget() 误判跳转目标（从而触发错误的 goto→throw 优化）。
            // OP_label 在输入字节码里占用 len bytes（通常为 5），所以 pos2 应该指向下一条指令的源位置。
            ls.pos2 = pos + len
            
            ls.addr = bcOut.size
            
            // 解析重定位条目
            this.resolveRelocations(fd, ls, bcOut)
          }
          break
        }
        
        // === 函数调用 - 尾调用优化 ===
        case Opcode.OP_call:
        case Opcode.OP_call_method: {
          const argc = this.getU16(bcBuf, pos + 1)
          
          // 检测尾调用: call ... return → tail_call
          if (OPTIMIZE && this.codeMatch(cc, posNext, [Opcode.OP_return, -1])) {
            if (cc.lineNum >= 0) lineNum = cc.lineNum
            this.addPc2lineInfo(fd, bcOut.size, lineNum)
            this.putShortCode(bcOut, op + 1, argc) // tail_call / tail_call_method
            {
              const state = { lineNum }
              posNext = this.skipDeadCode(fd, bcBuf, bcLen, cc.pos, state)
              lineNum = state.lineNum
            }
            break
          }
          
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          this.putShortCode(bcOut, op, argc)
          break
        }
        
        // === 返回/抛出 - 死代码消除 ===
        // QuickJS: return/throw 会先 skip_dead_code，然后 goto no_change；
        // 而 no_change 分支会 add_pc2line_info(s, bc_out.size, line_num)。
        // 因此 return/throw 也应记录 pc2line 采样点，否则会丢失最后一条 entry（常见于简单函数/箭头函数/闭包）。
        case Opcode.OP_return:
        case Opcode.OP_return_undef:
        case Opcode.OP_return_async:
        case Opcode.OP_throw:
        case Opcode.OP_throw_error:
          {
            const state = { lineNum }
            posNext = this.skipDeadCode(fd, bcBuf, bcLen, posNext, state)
            lineNum = state.lineNum
            this.addPc2lineInfo(fd, bcOut.size, lineNum)
            bcOut.put(bcBuf.slice(pos, pos + len))
          }
          break
        
        // === 无条件跳转 ===
        case Opcode.OP_goto: {
          let label = this.getU32(bcBuf, pos + 1)
          
          if (OPTIMIZE) {
            const result = this.findJumpTarget(fd, label)
            label = result.label
            
            // 跳转到下一条指令: 删除跳转
            if (this.codeHasLabel(cc, posNext, label)) {
              this.updateLabel(fd, label, -1)
              break
            }
            
            // 跳转到 return/throw: 替换为 return/throw
            if (result.op === Opcode.OP_return || 
                result.op === Opcode.OP_return_undef || 
                result.op === Opcode.OP_throw) {
              this.updateLabel(fd, label, -1)
              this.addPc2lineInfo(fd, bcOut.size, lineNum)
              bcOut.putU8(result.op)
              {
                const state = { lineNum }
                posNext = this.skipDeadCode(fd, bcBuf, bcLen, posNext, state)
                lineNum = state.lineNum
              }
              break
            }
          }

          // 输出跳转指令
          this.emitJump(fd, bcOut, op, label, lineNum, pos)
          {
            const state = { lineNum }
            posNext = this.skipDeadCode(fd, bcBuf, bcLen, posNext, state)
            lineNum = state.lineNum
          }
          break
        }
        
        // === gosub (用于 finally) ===
        case Opcode.OP_gosub: {
          const label = this.getU32(bcBuf, pos + 1)
          this.emitJump(fd, bcOut, op, label, lineNum, pos)
          break
        }
        
        // === catch ===
        case Opcode.OP_catch: {
          const label = this.getU32(bcBuf, pos + 1)
          this.emitJump(fd, bcOut, op, label, lineNum, pos)
          break
        }
        
        // === 条件跳转 ===
        case Opcode.OP_if_true:
        case Opcode.OP_if_false: {
          let label = this.getU32(bcBuf, pos + 1)
          
          if (OPTIMIZE) {
            const result = this.findJumpTarget(fd, label)
            label = result.label
            
            // if_xxx(l1) label(l1) → drop label(l1)
            if (this.codeHasLabel(cc, posNext, label)) {
              this.updateLabel(fd, label, -1)
              bcOut.putU8(Opcode.OP_drop)
              break
            }
            
            // if_false(l1) goto(l2) label(l1) → if_true(l2) label(l1)
            if (this.codeMatch(cc, posNext, [Opcode.OP_goto, -1])) {
              const pos1 = cc.pos
              const line1 = cc.lineNum
              if (this.codeHasLabel(cc, pos1, label)) {
                if (line1 !== -1) lineNum = line1
                posNext = pos1
                this.updateLabel(fd, label, -1)
                label = cc.label
                // 翻转条件
                const newOp = op === Opcode.OP_if_false ? Opcode.OP_if_true : Opcode.OP_if_false
                this.emitJump(fd, bcOut, newOp, label, lineNum, pos)
                break
              }
            }
          }
          
          this.emitJump(fd, bcOut, op, label, lineNum, pos)
          break
        }
        
        // === drop 优化 ===
        case Opcode.OP_drop:
          if (OPTIMIZE) {
            // drop return_undef → return_undef
            if (this.codeMatch(cc, posNext, [Opcode.OP_return_undef, -1])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              break
            }
          }
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          bcOut.putU8(op)
          break
        
        // === undefined 优化 ===
        case Opcode.OP_undefined:
          if (OPTIMIZE) {
            // undefined drop → (nothing)
            if (this.codeMatch(cc, posNext, [Opcode.OP_drop, -1])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              posNext = cc.pos
              break
            }
            
            // undefined return → return_undef
            if (this.codeMatch(cc, posNext, [Opcode.OP_return, -1])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              this.addPc2lineInfo(fd, bcOut.size, lineNum)
              bcOut.putU8(Opcode.OP_return_undef)
              posNext = cc.pos
              break
            }

            // transform undefined if_true(l1)/if_false(l1) -> nop/goto(l1)
            // QuickJS: third_party/QuickJS/src/core/parser.c (case OP_undefined -> has_constant_test)
            if (this.codeMatch(cc, posNext, [M2(Opcode.OP_if_false, Opcode.OP_if_true), -1])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              const val = 0
              const label = cc.label

              // cc.op is set only for M2 multi-match
              if (val === (cc.op - Opcode.OP_if_false)) {
                posNext = cc.pos
                this.emitJump(fd, bcOut, Opcode.OP_goto, label, lineNum, pos)
                {
                  const state = { lineNum }
                  posNext = this.skipDeadCode(fd, bcBuf, bcLen, posNext, state)
                  lineNum = state.lineNum
                }
                break
              } else {
                posNext = cc.pos
                this.updateLabel(fd, label, -1)
                break
              }
            }

            if (USE_SHORT_OPCODES) {
              // transform undefined strict_eq -> is_undefined
              if (this.codeMatch(cc, posNext, [Opcode.OP_strict_eq, -1])) {
                if (cc.lineNum >= 0) lineNum = cc.lineNum
                this.addPc2lineInfo(fd, bcOut.size, lineNum)
                bcOut.putU8(Opcode.OP_is_undefined)
                posNext = cc.pos
                break
              }

              // transform undefined strict_neq if_false/if_true -> is_undefined if_true/if_false
              if (this.codeMatch(cc, posNext, [
                Opcode.OP_strict_neq,
                M2(Opcode.OP_if_false, Opcode.OP_if_true),
                -1,
              ])) {
                if (cc.lineNum >= 0) lineNum = cc.lineNum
                this.addPc2lineInfo(fd, bcOut.size, lineNum)
                bcOut.putU8(Opcode.OP_is_undefined)
                posNext = cc.pos

                const label = cc.label
                const newOp = cc.op ^ Opcode.OP_if_false ^ Opcode.OP_if_true
                this.emitJump(fd, bcOut, newOp, label, lineNum, pos)
                break
              }
            }
          }
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          bcOut.putU8(op)
          break

        // === null / true / false: constant-test folding + is_null peephole ===
        // QuickJS: third_party/QuickJS/src/core/parser.c (case OP_null, OP_push_false, OP_push_true)
        case Opcode.OP_null:
        case Opcode.OP_push_false:
        case Opcode.OP_push_true: {
          if (OPTIMIZE) {
            // SHORT_OPCODES peephole: null strict_eq/strict_neq+if -> is_null ...
            if (USE_SHORT_OPCODES && op === Opcode.OP_null) {
              if (this.codeMatch(cc, posNext, [Opcode.OP_strict_eq, -1])) {
                if (cc.lineNum >= 0) lineNum = cc.lineNum
                this.addPc2lineInfo(fd, bcOut.size, lineNum)
                bcOut.putU8(Opcode.OP_is_null)
                posNext = cc.pos
                break
              }

              if (this.codeMatch(cc, posNext, [
                Opcode.OP_strict_neq,
                M2(Opcode.OP_if_false, Opcode.OP_if_true),
                -1,
              ])) {
                if (cc.lineNum >= 0) lineNum = cc.lineNum
                this.addPc2lineInfo(fd, bcOut.size, lineNum)
                bcOut.putU8(Opcode.OP_is_null)
                posNext = cc.pos

                const label = cc.label
                const newOp = cc.op ^ Opcode.OP_if_false ^ Opcode.OP_if_true
                this.emitJump(fd, bcOut, newOp, label, lineNum, pos)
                break
              }

            }

            // constant-test folding: (null|false|true) if_true/if_false -> nop/goto
            const val = op === Opcode.OP_push_true ? 1 : 0
            if (this.codeMatch(cc, posNext, [M2(Opcode.OP_if_false, Opcode.OP_if_true), -1])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              const label = cc.label

              if (val === (cc.op - Opcode.OP_if_false)) {
                posNext = cc.pos
                this.emitJump(fd, bcOut, Opcode.OP_goto, label, lineNum, pos)
                {
                  const state = { lineNum }
                  posNext = this.skipDeadCode(fd, bcBuf, bcLen, posNext, state)
                  lineNum = state.lineNum
                }
                break
              } else {
                posNext = cc.pos
                this.updateLabel(fd, label, -1)
                break
              }
            }
          }

          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          bcOut.putU8(op)
          break
        }
        
        // === push_i32 优化 ===
        case Opcode.OP_push_i32: {
          const val = this.getI32(bcBuf, pos + 1)
          
          if (OPTIMIZE) {
            // i32(val) neg -> i32(-val)
            // QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:11492-11517
            // 注意: val==0 时不能做该优化（-0 语义），INT32_MIN 取负会溢出。
            if (val !== 0 && val !== -2147483648 && this.codeMatch(cc, posNext, [Opcode.OP_neg, -1])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              if (this.codeMatch(cc, cc.pos, [Opcode.OP_drop, -1])) {
                if (cc.lineNum >= 0) lineNum = cc.lineNum
              } else {
                this.addPc2lineInfo(fd, bcOut.size, lineNum)
                this.pushShortInt(bcOut, -val)
              }
              posNext = cc.pos
              break
            }

            // i32 drop → (nothing)
            if (this.codeMatch(cc, posNext, [Opcode.OP_drop, -1])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              posNext = cc.pos
              break
            }

            // Optimize constant tests: `if (0)`, `if (1)`, `while(0)`, `do...while(0)` ...
            // QuickJS: third_party/QuickJS/src/core/parser.c (case OP_push_i32 -> has_constant_test)
            if (this.codeMatch(cc, posNext, [M2(Opcode.OP_if_false, Opcode.OP_if_true), -1])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              const boolVal = val !== 0 ? 1 : 0
              const label = cc.label

              if (boolVal === (cc.op - Opcode.OP_if_false)) {
                // always jump
                posNext = cc.pos
                this.emitJump(fd, bcOut, Opcode.OP_goto, label, lineNum, pos)
                {
                  const state = { lineNum }
                  posNext = this.skipDeadCode(fd, bcBuf, bcLen, posNext, state)
                  lineNum = state.lineNum
                }
                break
              } else {
                // never jump: remove test
                posNext = cc.pos
                this.updateLabel(fd, label, -1)
                break
              }
            }
          }
          
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          this.pushShortInt(bcOut, val)
          break
        }

        // === get_field 优化: length → get_length ===
        // QuickJS 源码出处：third_party/QuickJS/src/core/parser.c:11590-11628 (resolve_labels)
        //
        // 在 SHORT_OPCODES + OPTIMIZE 模式下：
        //   OP_get_field JS_ATOM_length  → OP_get_length
        // 这会将 5 bytes 指令压缩为 1 byte。
        case Opcode.OP_get_field: {
          const atom = this.getU32(bcBuf, pos + 1)
          if (USE_SHORT_OPCODES && OPTIMIZE && atom === JSAtom.JS_ATOM_length) {
            this.addPc2lineInfo(fd, bcOut.size, lineNum)
            bcOut.putU8(Opcode.OP_get_length)
            break
          }
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          bcOut.putU8(op)
          bcOut.putU32(atom)
          break
        }
        
        // === get_loc 优化 ===
        case Opcode.OP_get_loc: {
          const idx = this.getU16(bcBuf, pos + 1)

          if (process.env.DEBUG_INC_LOC_PEEPHOLE && idx < 4) {
            const bytes = Array.from(bcBuf.slice(pos, Math.min(bcLen, pos + 24)))
              .map(b => b.toString(16).padStart(2, '0'))
              .join(' ')
            // Shallow decode: show the next few raw op bytes (not full disasm).
            const nextOps = Array.from(bcBuf.slice(posNext, Math.min(bcLen, posNext + 12)))
              .map(b => b.toString(16).padStart(2, '0'))
              .join(' ')

            const peekInstr = (startPos: number) => {
              let p = startPos
              // skip line_num markers
              while (p < bcLen && bcBuf[p] === TempOpcode.OP_line_num) {
                p += 5
              }
              if (p >= bcLen) return null
              const op2 = bcBuf[p]
              const def = this.getOpcodeDef(op2)
              if (!def) return { pos: p, op: op2, id: 'unknown' }
              let imm: number | null = null
              if (def.format === OpFormat.u8 || def.format === OpFormat.loc8) {
                imm = bcBuf[p + 1]
              } else if (
                def.format === OpFormat.u16 ||
                def.format === OpFormat.loc ||
                def.format === OpFormat.arg ||
                def.format === OpFormat.var_ref ||
                def.format === OpFormat.npop
              ) {
                imm = this.getU16(bcBuf, p + 1)
              } else if (
                def.format === OpFormat.u32 ||
                def.format === OpFormat.i32 ||
                def.format === OpFormat.label ||
                def.format === OpFormat.const ||
                def.format === OpFormat.atom
              ) {
                imm = this.getU32(bcBuf, p + 1) >>> 0
              }
              return { pos: p, op: op2, id: def.id, imm, size: def.size }
            }

            const instr1 = peekInstr(posNext)
            const instr2 = instr1 ? peekInstr((instr1.pos ?? posNext) + (instr1.size ?? 1)) : null

            // Probe match result without perturbing main cc state.
            const ccProbe: CodeContext = {
              bcBuf,
              bcLen,
              pos: 0,
              lineNum: -1,
              op: 0,
              idx: 0,
              label: 0,
              val: 0,
              atom: 0,
            }
            const ccProbePost: CodeContext = { ...ccProbe }
            const wouldMatchPost = OPTIMIZE && idx < 256 && this.codeMatch(ccProbePost, posNext, [
              M2(Opcode.OP_post_inc, Opcode.OP_post_dec),
              Opcode.OP_put_loc,
              idx,
              Opcode.OP_drop,
              -1,
            ])

            const ccProbeInc: CodeContext = { ...ccProbe }
            const wouldMatchInc = OPTIMIZE && idx < 256 && this.codeMatch(ccProbeInc, posNext, [
              M2(Opcode.OP_inc, Opcode.OP_dec),
              Opcode.OP_put_loc,
              idx,
              -1,
            ])
            console.log('[DEBUG_INC_LOC_PEEPHOLE] OP_get_loc', {
              idx,
              pos,
              posNext,
              wouldMatchPost,
              wouldMatchInc,
              bytes,
              nextOps,
              instr1,
              instr2,
            })
          }

          // QuickJS peephole (resolve_labels):
          //   get_loc(n) post_inc put_loc(n) drop -> inc_loc(n)
          //   get_loc(n) inc dup put_loc(n) drop -> inc_loc(n)
          // 我们这里额外对齐一种在本编译器里常见的变体（特别是 for(i=...;...;i++) 的 update）：
          //   get_loc(n) inc put_loc(n) -> inc_loc(n)
          // 这能让 worker_main 的 i++ 和 QuickJS 输出一致（QuickJS 最终会落到 OP_inc_loc）。
          // QuickJS 源码出处：third_party/QuickJS/src/core/parser.c:11793-11833
          if (OPTIMIZE && idx < 256) {
            if (process.env.DEBUG_ADD_LOC_PEEPHOLE && idx === 2) {
              const ccProbe: CodeContext = {
                bcBuf,
                bcLen,
                pos: 0,
                lineNum: -1,
                sourceLen: fd.source ? fd.source.length : 0,
                op: 0,
                idx: 0,
                label: 0,
                val: 0,
                atom: 0,
              }
              const putOpShort = Opcode.OP_put_loc0 + idx
              const probe1: CodeContext = { ...ccProbe }
              const probe2: CodeContext = { ...ccProbe }
              const probe3: CodeContext = { ...ccProbe }
              const m1 = (idx < 4) && this.codeMatch(probe1, posNext, [Opcode.OP_push_atom_value, -1, Opcode.OP_add, putOpShort, -1])
              const m2 = this.codeMatch(probe2, posNext, [Opcode.OP_push_atom_value, -1, Opcode.OP_add, Opcode.OP_put_loc8, idx, -1])
              const m3 = this.codeMatch(probe3, posNext, [Opcode.OP_push_atom_value, -1, Opcode.OP_add, Opcode.OP_put_loc, idx, -1])
              const bytes = Array.from(bcBuf.slice(pos, Math.min(bcLen, pos + 32)))
                .map(b => b.toString(16).padStart(2, '0'))
                .join(' ')
              console.log('[DEBUG_ADD_LOC_PEEPHOLE] get_loc', { idx, pos, posNext, m1, m2, m3, bytes, probe1, probe2, probe3 })
            }

            // QuickJS resolve_labels peephole: optimize `loc += <const>` into `push_<const> add_loc(loc)`.
            // QuickJS reference: third_party/QuickJS/src/core/parser.c:11839-11871
            // Match multiple store encodings (short/loc8/long) because our input bytecode may be
            // long-form and later shortened.
            const putOpShort = Opcode.OP_put_loc0 + idx
            const matchedAddLoc =
              // Canonical QuickJS pattern when the assignment result is unused:
              //   get_loc(n) push_atom_value(x) add dup put_loc(n) drop -> push_atom_value(x) add_loc(n)
              ((idx < 4) && this.codeMatch(cc, posNext, [
                Opcode.OP_push_atom_value,
                -1,
                Opcode.OP_add,
                Opcode.OP_dup,
                putOpShort,
                Opcode.OP_drop,
                -1,
              ])) ||
              this.codeMatch(cc, posNext, [
                Opcode.OP_push_atom_value,
                -1,
                Opcode.OP_add,
                Opcode.OP_dup,
                Opcode.OP_put_loc8,
                idx,
                Opcode.OP_drop,
                -1,
              ]) ||
              this.codeMatch(cc, posNext, [
                Opcode.OP_push_atom_value,
                -1,
                Opcode.OP_add,
                Opcode.OP_dup,
                Opcode.OP_put_loc,
                idx,
                Opcode.OP_drop,
                -1,
              ]) ||
              // Also accept a shorter internal variant some passes may generate:
              ((idx < 4) && this.codeMatch(cc, posNext, [
                Opcode.OP_push_atom_value,
                -1,
                Opcode.OP_add,
                putOpShort,
                -1,
              ])) ||
              this.codeMatch(cc, posNext, [
                Opcode.OP_push_atom_value,
                -1,
                Opcode.OP_add,
                Opcode.OP_put_loc8,
                idx,
                -1,
              ]) ||
              this.codeMatch(cc, posNext, [
                Opcode.OP_push_atom_value,
                -1,
                Opcode.OP_add,
                Opcode.OP_put_loc,
                idx,
                -1,
              ])

            if (matchedAddLoc) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              this.addPc2lineInfo(fd, bcOut.size, lineNum)

              if (USE_SHORT_OPCODES && OPTIMIZE && cc.atom === JSAtom.JS_ATOM_empty_string) {
                bcOut.putU8(Opcode.OP_push_empty_string)
              } else {
                bcOut.putU8(Opcode.OP_push_atom_value)
                bcOut.putU32(cc.atom)
              }
              bcOut.putU8(Opcode.OP_add_loc)
              bcOut.putU8(idx)
              posNext = cc.pos
              break
            }

            // Align QuickJS output for unused-result `+=` on locals when the RHS is another local load:
            //   get_loc(n) get_loc(m) add put_loc(n) -> get_loc(m) add_loc(n)
            //
            // This sequence is used by QuickJS for string concatenation accumulators in the switch fixtures.
            // QuickJS reference (resolve_labels peephole emitting OP_add_loc):
            //   third_party/QuickJS/src/core/parser.c:11839-11871
            //
            // We intentionally restrict this to RHS `get_loc*` (pure local reads) to avoid reordering effects.
            {
              const sourceLen = fd.source ? fd.source.length : 0
              const ccRhsShort: CodeContext = { ...cc, pos: 0, lineNum: -1, sourceLen, op: 0, idx: 0, label: 0, val: 0, atom: 0 }
              const ccRhsLoc8: CodeContext = { ...cc, pos: 0, lineNum: -1, sourceLen, op: 0, idx: 0, label: 0, val: 0, atom: 0 }
              const ccRhsLoc16: CodeContext = { ...cc, pos: 0, lineNum: -1, sourceLen, op: 0, idx: 0, label: 0, val: 0, atom: 0 }

              // Canonical (QuickJS) unused-result pattern includes dup+drop.
              const matchedStoreShortDupDrop = (idx < 4) && this.codeMatch(ccRhsShort, posNext, [
                M4(Opcode.OP_get_loc0, Opcode.OP_get_loc1, Opcode.OP_get_loc2, Opcode.OP_get_loc3),
                Opcode.OP_add,
                Opcode.OP_dup,
                putOpShort,
                Opcode.OP_drop,
                -1,
              ])

              const matchedStoreLoc8DupDrop = this.codeMatch(ccRhsShort, posNext, [
                M4(Opcode.OP_get_loc0, Opcode.OP_get_loc1, Opcode.OP_get_loc2, Opcode.OP_get_loc3),
                Opcode.OP_add,
                Opcode.OP_dup,
                Opcode.OP_put_loc8,
                idx,
                Opcode.OP_drop,
                -1,
              ])

              const matchedStoreLoc16DupDrop = this.codeMatch(ccRhsShort, posNext, [
                M4(Opcode.OP_get_loc0, Opcode.OP_get_loc1, Opcode.OP_get_loc2, Opcode.OP_get_loc3),
                Opcode.OP_add,
                Opcode.OP_dup,
                Opcode.OP_put_loc,
                idx,
                Opcode.OP_drop,
                -1,
              ])

              // Also accept shorter internal variants without dup/drop.
              const matchedStoreShortNoDup = (idx < 4) && this.codeMatch(ccRhsShort, posNext, [
                M4(Opcode.OP_get_loc0, Opcode.OP_get_loc1, Opcode.OP_get_loc2, Opcode.OP_get_loc3),
                Opcode.OP_add,
                putOpShort,
                -1,
              ])

              const matchedStoreLoc8NoDup = this.codeMatch(ccRhsShort, posNext, [
                M4(Opcode.OP_get_loc0, Opcode.OP_get_loc1, Opcode.OP_get_loc2, Opcode.OP_get_loc3),
                Opcode.OP_add,
                Opcode.OP_put_loc8,
                idx,
                -1,
              ])

              const matchedStoreLoc16NoDup = this.codeMatch(ccRhsShort, posNext, [
                M4(Opcode.OP_get_loc0, Opcode.OP_get_loc1, Opcode.OP_get_loc2, Opcode.OP_get_loc3),
                Opcode.OP_add,
                Opcode.OP_put_loc,
                idx,
                -1,
              ])

              const matchedRhsLoc8DupDrop = this.codeMatch(ccRhsLoc8, posNext, [
                Opcode.OP_get_loc8,
                -1,
                Opcode.OP_add,
                Opcode.OP_dup,
                Opcode.OP_put_loc8,
                idx,
                Opcode.OP_drop,
                -1,
              ])

              const matchedRhsLoc8NoDup = this.codeMatch(ccRhsLoc8, posNext, [
                Opcode.OP_get_loc8,
                -1,
                Opcode.OP_add,
                Opcode.OP_put_loc8,
                idx,
                -1,
              ])

              const matchedRhsLoc16DupDrop = this.codeMatch(ccRhsLoc16, posNext, [
                Opcode.OP_get_loc,
                -1,
                Opcode.OP_add,
                Opcode.OP_dup,
                Opcode.OP_put_loc,
                idx,
                Opcode.OP_drop,
                -1,
              ])

              const matchedRhsLoc16NoDup = this.codeMatch(ccRhsLoc16, posNext, [
                Opcode.OP_get_loc,
                -1,
                Opcode.OP_add,
                Opcode.OP_put_loc,
                idx,
                -1,
              ])

              if (
                matchedStoreShortDupDrop || matchedStoreLoc8DupDrop || matchedStoreLoc16DupDrop ||
                matchedStoreShortNoDup || matchedStoreLoc8NoDup || matchedStoreLoc16NoDup
              ) {
                if (ccRhsShort.lineNum >= 0) lineNum = ccRhsShort.lineNum
                this.addPc2lineInfo(fd, bcOut.size, lineNum)
                // ccRhsShort.op is set because we used M4() multi-match.
                bcOut.putU8(ccRhsShort.op)
                bcOut.putU8(Opcode.OP_add_loc)
                bcOut.putU8(idx)
                posNext = ccRhsShort.pos
                break
              }

              if (matchedRhsLoc8DupDrop || matchedRhsLoc8NoDup) {
                if (ccRhsLoc8.lineNum >= 0) lineNum = ccRhsLoc8.lineNum
                this.addPc2lineInfo(fd, bcOut.size, lineNum)
                if (USE_SHORT_OPCODES && OPTIMIZE && ccRhsLoc8.idx < 4) {
                  bcOut.putU8(Opcode.OP_get_loc0 + ccRhsLoc8.idx)
                } else {
                  bcOut.putU8(Opcode.OP_get_loc8)
                  bcOut.putU8(ccRhsLoc8.idx)
                }
                bcOut.putU8(Opcode.OP_add_loc)
                bcOut.putU8(idx)
                posNext = ccRhsLoc8.pos
                break
              }

              if (matchedRhsLoc16DupDrop || matchedRhsLoc16NoDup) {
                if (ccRhsLoc16.lineNum >= 0) lineNum = ccRhsLoc16.lineNum
                this.addPc2lineInfo(fd, bcOut.size, lineNum)
                if (USE_SHORT_OPCODES && OPTIMIZE && ccRhsLoc16.idx < 4) {
                  bcOut.putU8(Opcode.OP_get_loc0 + ccRhsLoc16.idx)
                } else if (ccRhsLoc16.idx < 256) {
                  bcOut.putU8(Opcode.OP_get_loc8)
                  bcOut.putU8(ccRhsLoc16.idx)
                } else {
                  bcOut.putU8(Opcode.OP_get_loc)
                  bcOut.putU16(ccRhsLoc16.idx)
                }
                bcOut.putU8(Opcode.OP_add_loc)
                bcOut.putU8(idx)
                posNext = ccRhsLoc16.pos
                break
              }
            }

            // QuickJS resolve_labels peephole (parser.c:11793-11833):
            //   get_loc(n) post_inc put_loc(n) drop -> inc_loc(n)
            //   get_loc(n) post_dec put_loc(n) drop -> dec_loc(n)
            // 注意：本编译器在生成字节码时会插入 TempOpcode.OP_line_num，codeMatch 会自动跳过它。
            if (this.codeMatch(cc, posNext, [
              M2(Opcode.OP_post_inc, Opcode.OP_post_dec),
              Opcode.OP_put_loc,
              idx,
              Opcode.OP_drop,
              -1,
            ])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              this.addPc2lineInfo(fd, bcOut.size, lineNum)
              bcOut.putU8(cc.op === Opcode.OP_post_inc ? Opcode.OP_inc_loc : Opcode.OP_dec_loc)
              bcOut.putU8(idx)
              posNext = cc.pos
              break
            }

            // get_loc(n) (inc|dec) put_loc(n) -> (inc_loc|dec_loc)(n)
            if (this.codeMatch(cc, posNext, [
              M2(Opcode.OP_inc, Opcode.OP_dec),
              Opcode.OP_put_loc,
              idx,
              -1,
            ])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              this.addPc2lineInfo(fd, bcOut.size, lineNum)
              bcOut.putU8(cc.op === Opcode.OP_inc ? Opcode.OP_inc_loc : Opcode.OP_dec_loc)
              bcOut.putU8(idx)
              posNext = cc.pos
              break
            }
          }

          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          this.putShortCode(bcOut, op, idx)
          break
        }

        // === get_loc0..3 优化 ===
        // 与 OP_get_loc 的 inc_loc/dec_loc peephole 同理，只是 short opcode 没有 idx 参数。
        case Opcode.OP_get_loc0:
        case Opcode.OP_get_loc1:
        case Opcode.OP_get_loc2:
        case Opcode.OP_get_loc3: {
          const idx = op - Opcode.OP_get_loc0
          if (OPTIMIZE) {
            if (process.env.DEBUG_ADD_LOC_PEEPHOLE && idx === 2) {
              const ccProbe: CodeContext = {
                bcBuf,
                bcLen,
                pos: 0,
                lineNum: -1,
                sourceLen: fd.source ? fd.source.length : 0,
                op: 0,
                idx: 0,
                label: 0,
                val: 0,
                atom: 0,
              }
              const putOp = Opcode.OP_put_loc0 + idx
              const probe1: CodeContext = { ...ccProbe }
              const probe2: CodeContext = { ...ccProbe }
              const probe3: CodeContext = { ...ccProbe }
              const m1 = this.codeMatch(probe1, posNext, [Opcode.OP_push_atom_value, -1, Opcode.OP_add, putOp, -1])
              const m2 = this.codeMatch(probe2, posNext, [Opcode.OP_push_atom_value, -1, Opcode.OP_add, Opcode.OP_put_loc8, idx, -1])
              const m3 = this.codeMatch(probe3, posNext, [Opcode.OP_push_atom_value, -1, Opcode.OP_add, Opcode.OP_put_loc, idx, -1])
              const bytes = Array.from(bcBuf.slice(pos, Math.min(bcLen, pos + 24)))
                .map(b => b.toString(16).padStart(2, '0'))
                .join(' ')
              console.log('[DEBUG_ADD_LOC_PEEPHOLE] get_locX', { idx, pos, posNext, m1, m2, m3, bytes, probe1, probe2, probe3 })
            }

            // QuickJS resolve_labels peephole: optimize `loc += <const>` into `push_<const> add_loc(loc)`.
            // QuickJS reference: third_party/QuickJS/src/core/parser.c:11839-11871
            // Our emitter often produces the shorter pattern without dup/drop:
            //   get_locX push_atom_value(x) add put_locX -> push_atom_value(x) add_loc(X)
            // This matches the final optimized QuickJS output and is important for byte-for-byte parity.
            const putOp = Opcode.OP_put_loc0 + idx
            const matchedAddLoc =
              this.codeMatch(cc, posNext, [
                Opcode.OP_push_atom_value,
                -1,
                Opcode.OP_add,
                Opcode.OP_dup,
                putOp,
                Opcode.OP_drop,
                -1,
              ]) ||
              this.codeMatch(cc, posNext, [
                Opcode.OP_push_atom_value,
                -1,
                Opcode.OP_add,
                Opcode.OP_dup,
                Opcode.OP_put_loc8,
                idx,
                Opcode.OP_drop,
                -1,
              ]) ||
              this.codeMatch(cc, posNext, [
                Opcode.OP_push_atom_value,
                -1,
                Opcode.OP_add,
                Opcode.OP_dup,
                Opcode.OP_put_loc,
                idx,
                Opcode.OP_drop,
                -1,
              ]) ||
              // Accept the shorter variant too.
              this.codeMatch(cc, posNext, [
                Opcode.OP_push_atom_value,
                -1,
                Opcode.OP_add,
                putOp,
                -1,
              ]) ||
              this.codeMatch(cc, posNext, [
                Opcode.OP_push_atom_value,
                -1,
                Opcode.OP_add,
                Opcode.OP_put_loc8,
                idx,
                -1,
              ]) ||
              this.codeMatch(cc, posNext, [
                Opcode.OP_push_atom_value,
                -1,
                Opcode.OP_add,
                Opcode.OP_put_loc,
                idx,
                -1,
              ])

            if (matchedAddLoc) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              this.addPc2lineInfo(fd, bcOut.size, lineNum)

              if (USE_SHORT_OPCODES && OPTIMIZE && cc.atom === JSAtom.JS_ATOM_empty_string) {
                bcOut.putU8(Opcode.OP_push_empty_string)
              } else {
                bcOut.putU8(Opcode.OP_push_atom_value)
                bcOut.putU32(cc.atom)
              }
              bcOut.putU8(Opcode.OP_add_loc)
              bcOut.putU8(idx)
              posNext = cc.pos
              break
            }

            // QuickJS resolve_labels peephole: get_locX post_inc put_locX drop -> inc_loc(X)
            // （short opcode 版本没有 idx 参数）
            if (this.codeMatch(cc, posNext, [M2(Opcode.OP_post_inc, Opcode.OP_post_dec), -1])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              const posAfterPost = cc.pos
              if (this.codeMatch(cc, posAfterPost, [putOp, Opcode.OP_drop, -1])) {
                if (cc.lineNum >= 0) lineNum = cc.lineNum
                this.addPc2lineInfo(fd, bcOut.size, lineNum)
                bcOut.putU8(cc.op === Opcode.OP_post_inc ? Opcode.OP_inc_loc : Opcode.OP_dec_loc)
                bcOut.putU8(idx)
                posNext = cc.pos
                break
              }
            }

            // get_locX (inc|dec) put_locX -> (inc_loc|dec_loc)(X)
            if (this.codeMatch(cc, posNext, [M2(Opcode.OP_inc, Opcode.OP_dec), -1])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              const posAfterInc = cc.pos
              if (this.codeMatch(cc, posAfterInc, [putOp, -1])) {
                if (cc.lineNum >= 0) lineNum = cc.lineNum
                this.addPc2lineInfo(fd, bcOut.size, lineNum)
                bcOut.putU8(cc.op === Opcode.OP_inc ? Opcode.OP_inc_loc : Opcode.OP_dec_loc)
                bcOut.putU8(idx)
                posNext = cc.pos
                break
              }
            }
          }

          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          bcOut.putU8(op)
          break
        }

        // === put_loc0..3 / put_arg0..3 / put_var_ref0..3 优化 ===
        // QuickJS resolve_labels peephole:
        //   put_x(n) get_x(n) -> set_x(n)
        // 见 third_party/QuickJS/src/core/parser.c:11935-11958
        case Opcode.OP_put_loc0:
        case Opcode.OP_put_loc1:
        case Opcode.OP_put_loc2:
        case Opcode.OP_put_loc3:
        case Opcode.OP_put_arg0:
        case Opcode.OP_put_arg1:
        case Opcode.OP_put_arg2:
        case Opcode.OP_put_arg3:
        case Opcode.OP_put_var_ref0:
        case Opcode.OP_put_var_ref1:
        case Opcode.OP_put_var_ref2:
        case Opcode.OP_put_var_ref3: {
          if (OPTIMIZE) {
            // Map put_*X to the corresponding get_*X and set_*X.
            let getOp = -1
            let setOp = -1
            // Also track the long-form get opcode + idx, because in the input bytecode
            // some short opcodes (notably get_loc0..3 / get_loc8) cannot be emitted due
            // to overlap with TempOpcode range (182-200). In that case resolve_labels
            // will see e.g. put_loc1 followed by get_loc(idx=1), and only later emit
            // get_loc1 in the output via putShortCode.
            let getOpLong = -1
            let getIdxLong = -1
            // And for locals, also support the loc8 encoding.
            let getOpLoc8 = -1
            let getIdxLoc8 = -1
            if (op >= Opcode.OP_put_loc0 && op <= Opcode.OP_put_loc3) {
              const idx = op - Opcode.OP_put_loc0
              getOp = Opcode.OP_get_loc0 + idx
              setOp = Opcode.OP_set_loc0 + idx
              getOpLong = Opcode.OP_get_loc
              getIdxLong = idx
              getOpLoc8 = Opcode.OP_get_loc8
              getIdxLoc8 = idx
            } else if (op >= Opcode.OP_put_arg0 && op <= Opcode.OP_put_arg3) {
              const idx = op - Opcode.OP_put_arg0
              getOp = Opcode.OP_get_arg0 + idx
              setOp = Opcode.OP_set_arg0 + idx
              getOpLong = Opcode.OP_get_arg
              getIdxLong = idx
            } else if (op >= Opcode.OP_put_var_ref0 && op <= Opcode.OP_put_var_ref3) {
              const idx = op - Opcode.OP_put_var_ref0
              getOp = Opcode.OP_get_var_ref0 + idx
              setOp = Opcode.OP_set_var_ref0 + idx
              getOpLong = Opcode.OP_get_var_ref
              getIdxLong = idx
            }

            if (process.env.DEBUG_SET_LOC_PEEPHOLE && op >= Opcode.OP_put_loc0 && op <= Opcode.OP_put_loc3) {
              const peek = (startPos: number) => {
                let p = startPos
                while (p < bcLen && bcBuf[p] === TempOpcode.OP_line_num) p += 5
                if (p >= bcLen) return null
                const o = bcBuf[p]
                const def = this.getOpcodeDef(o)
                const size = def?.size ?? 1
                const bytes = bcBuf.slice(p, Math.min(bcLen, p + size))
                let imm: number | null = null
                if (def?.format === OpFormat.u8 || def?.format === OpFormat.loc8) imm = bcBuf[p + 1]
                else if (
                  def?.format === OpFormat.u16 ||
                  def?.format === OpFormat.loc ||
                  def?.format === OpFormat.arg ||
                  def?.format === OpFormat.var_ref ||
                  def?.format === OpFormat.npop
                ) imm = this.getU16(bcBuf, p + 1)
                else if (
                  def?.format === OpFormat.u32 ||
                  def?.format === OpFormat.i32 ||
                  def?.format === OpFormat.label ||
                  def?.format === OpFormat.const ||
                  def?.format === OpFormat.atom
                ) imm = this.getU32(bcBuf, p + 1) >>> 0
                return { pos: p, op: o, id: def?.id ?? 'unknown', size, imm, bytes: Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(' ') }
              }
              const n1 = peek(posNext)
              const n2 = n1 ? peek(n1.pos + n1.size) : null
              const idx = op - Opcode.OP_put_loc0
              if ((typeof n1?.id === 'string' && n1.id.startsWith('get_loc')) && SET_LOC_PEEPHOLE_DUMP_COUNT < 5) {
                console.log('[DEBUG_SET_LOC_PEEPHOLE] put_locX followed by get_loc* (input)', { bcLen, pos, posNext, idx, next1: n1, next2: n2 })
                SET_LOC_PEEPHOLE_DUMP_COUNT++
                if (SET_LOC_PEEPHOLE_DUMP_COUNT >= 5) DID_DUMP_SET_LOC_PEEPHOLE = true
              }
            }

            // Prefer matching the short get_*X form.
            if (getOp >= 0 && this.codeMatch(cc, posNext, [getOp, -1])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              this.addPc2lineInfo(fd, bcOut.size, lineNum)
              bcOut.putU8(setOp)
              posNext = cc.pos
              break
            }

            // Locals may use get_loc8(idx) in the input stream.
            if (getOpLoc8 >= 0 && getIdxLoc8 >= 0 && this.codeMatch(cc, posNext, [getOpLoc8, getIdxLoc8, -1])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              this.addPc2lineInfo(fd, bcOut.size, lineNum)
              bcOut.putU8(setOp)
              posNext = cc.pos
              break
            }

            // Also match the long get_* form with idx (u16).
            if (getOpLong >= 0 && getIdxLong >= 0 && this.codeMatch(cc, posNext, [getOpLong, getIdxLong, -1])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              this.addPc2lineInfo(fd, bcOut.size, lineNum)
              bcOut.putU8(setOp)
              posNext = cc.pos
              break
            }
          }

          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          bcOut.putU8(op)
          break
        }
        
        // === put_loc 优化 ===
        case Opcode.OP_put_loc:
        case Opcode.OP_put_arg:
        case Opcode.OP_put_var_ref: {
          const idx = this.getU16(bcBuf, pos + 1)

          if (process.env.DEBUG_SET_LOC_PEEPHOLE && op === Opcode.OP_put_loc) {
            const peek = (startPos: number) => {
              let p = startPos
              while (p < bcLen && bcBuf[p] === TempOpcode.OP_line_num) p += 5
              if (p >= bcLen) return null
              const o = bcBuf[p]
              const def = this.getOpcodeDef(o)
              const size = def?.size ?? 1
              const bytes = bcBuf.slice(p, Math.min(bcLen, p + size))
              let imm: number | null = null
              if (def?.format === OpFormat.u8 || def?.format === OpFormat.loc8) imm = bcBuf[p + 1]
              else if (
                def?.format === OpFormat.u16 ||
                def?.format === OpFormat.loc ||
                def?.format === OpFormat.arg ||
                def?.format === OpFormat.var_ref ||
                def?.format === OpFormat.npop
              ) imm = this.getU16(bcBuf, p + 1)
              else if (
                def?.format === OpFormat.u32 ||
                def?.format === OpFormat.i32 ||
                def?.format === OpFormat.label ||
                def?.format === OpFormat.const ||
                def?.format === OpFormat.atom
              ) imm = this.getU32(bcBuf, p + 1) >>> 0
              return { pos: p, op: o, id: def?.id ?? 'unknown', size, imm, bytes: Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(' ') }
            }
            const n1 = peek(posNext)
            const n2 = n1 ? peek(n1.pos + n1.size) : null
            if ((typeof n1?.id === 'string' && n1.id.startsWith('get_loc')) && SET_LOC_PEEPHOLE_DUMP_COUNT < 5) {
              console.log('[DEBUG_SET_LOC_PEEPHOLE] put_loc(u16) followed by get_loc* (input)', { bcLen, pos, posNext, idx, next1: n1, next2: n2 })
              SET_LOC_PEEPHOLE_DUMP_COUNT++
              if (SET_LOC_PEEPHOLE_DUMP_COUNT >= 5) DID_DUMP_SET_LOC_PEEPHOLE = true
            }
          }
          
          if (OPTIMIZE) {
            // QuickJS resolve_labels peephole: put_x(n) get_x(n) -> set_x(n)
            // third_party/QuickJS/src/core/parser.c:11935-11958
            // 不依赖 opcode 编号相邻(op±1)，直接做显式映射。
            let getOp = -1
            let setOp = -1
            if (op === Opcode.OP_put_loc) {
              getOp = Opcode.OP_get_loc
              setOp = Opcode.OP_set_loc
            } else if (op === Opcode.OP_put_arg) {
              getOp = Opcode.OP_get_arg
              setOp = Opcode.OP_set_arg
            } else if (op === Opcode.OP_put_var_ref) {
              getOp = Opcode.OP_get_var_ref
              setOp = Opcode.OP_set_var_ref
            }

            if (getOp >= 0 && this.codeMatch(cc, posNext, [getOp, idx, -1])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              this.addPc2lineInfo(fd, bcOut.size, lineNum)
              this.putShortCode(bcOut, setOp, idx) // set_x
              posNext = cc.pos
              break
            }

            // For locals, accept the loc8 get encoding.
            if (op === Opcode.OP_put_loc && idx < 256 && this.codeMatch(cc, posNext, [Opcode.OP_get_loc8, idx, -1])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              this.addPc2lineInfo(fd, bcOut.size, lineNum)
              this.putShortCode(bcOut, Opcode.OP_set_loc, idx)
              posNext = cc.pos
              break
            }
          }
          
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          this.putShortCode(bcOut, op, idx)
          break
        }
        
        // === get_arg / get_var_ref 优化 ===
        case Opcode.OP_get_arg:
        case Opcode.OP_get_var_ref: {
          const idx = this.getU16(bcBuf, pos + 1)
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          this.putShortCode(bcOut, op, idx)
          break
        }
        
        // === push_const / fclosure 优化 ===
        // 注意: 只有短格式优化时才调用 add_pc2line_info，否则走 default
        case Opcode.OP_push_const:
        case Opcode.OP_fclosure: {
          if (USE_SHORT_OPCODES && OPTIMIZE) {
            const idx = this.getU32(bcBuf, pos + 1)
            if (idx < 256) {
              this.addPc2lineInfo(fd, bcOut.size, lineNum)
              bcOut.putU8(op === Opcode.OP_push_const ? Opcode.OP_push_const8 : Opcode.OP_fclosure8)
              bcOut.putU8(idx)
              break
            }
          }
          // goto no_change - 走 default 分支
          bcOut.put(bcBuf.slice(pos, pos + len))
          break
        }
        
        // === dup 优化 ===
        case Opcode.OP_dup: {
          if (OPTIMIZE) {
            // dup put_x(n) → set_x(n)
            const nextOp = bcBuf[posNext]
            if (nextOp === Opcode.OP_put_loc || 
                nextOp === Opcode.OP_put_arg || 
                nextOp === Opcode.OP_put_var_ref) {
              const idx = this.getU16(bcBuf, posNext + 1)
              const setOp = nextOp + 1 // put_x → set_x
              
              if (this.codeMatch(cc, posNext + 3, [Opcode.OP_drop, -1])) {
                // dup put_x(n) drop → put_x(n)
                const posAfterDrop = cc.pos

                // Extra alignment with QuickJS resolve_labels peephole (parser.c:11935-11958):
                // If we have `dup put_x(n) drop get_x(n)` (often produced when we emit an
                // assignment expression and then drop its value in statement context),
                // fold it directly into `set_x(n)` and consume the following get.
                // This ensures we can still match QuickJS output which uses `set_loc`.
                let getMatched = false
                const ccAfter: CodeContext = {
                  bcBuf,
                  bcLen,
                  pos: 0,
                  lineNum: -1,
                  op: 0,
                  idx: 0,
                  label: 0,
                  val: 0,
                  atom: 0,
                }

                if (nextOp === Opcode.OP_put_loc) {
                  if (this.codeMatch(ccAfter, posAfterDrop, [Opcode.OP_get_loc, idx, -1])) {
                    getMatched = true
                  } else if (idx < 256 && this.codeMatch(ccAfter, posAfterDrop, [Opcode.OP_get_loc8, idx, -1])) {
                    getMatched = true
                  } else if (idx < 4 && this.codeMatch(ccAfter, posAfterDrop, [Opcode.OP_get_loc0 + idx, -1])) {
                    getMatched = true
                  }
                } else if (nextOp === Opcode.OP_put_arg) {
                  if (this.codeMatch(ccAfter, posAfterDrop, [Opcode.OP_get_arg, idx, -1])) {
                    getMatched = true
                  } else if (idx < 4 && this.codeMatch(ccAfter, posAfterDrop, [Opcode.OP_get_arg0 + idx, -1])) {
                    getMatched = true
                  }
                } else if (nextOp === Opcode.OP_put_var_ref) {
                  if (this.codeMatch(ccAfter, posAfterDrop, [Opcode.OP_get_var_ref, idx, -1])) {
                    getMatched = true
                  } else if (idx < 4 && this.codeMatch(ccAfter, posAfterDrop, [Opcode.OP_get_var_ref0 + idx, -1])) {
                    getMatched = true
                  }
                }

                if (getMatched) {
                  if (ccAfter.lineNum >= 0) lineNum = ccAfter.lineNum
                  this.putShortCode(bcOut, setOp, idx) // set_x(n)
                  posNext = ccAfter.pos
                  break
                }

                this.addPc2lineInfo(fd, bcOut.size, lineNum)
                this.putShortCode(bcOut, nextOp, idx)
                posNext = posAfterDrop
                break
              }
              
              // dup put_x(n) → set_x(n)
              this.addPc2lineInfo(fd, bcOut.size, lineNum)
              this.putShortCode(bcOut, setOp, idx)
              posNext = posNext + 3
              break
            }
          }
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          bcOut.putU8(op)
          break
        }
        
        // === with_xxx 操作码 ===
        case Opcode.OP_with_get_var:
        case Opcode.OP_with_put_var:
        case Opcode.OP_with_delete_var:
        case Opcode.OP_with_make_ref:
        case Opcode.OP_with_get_ref: {
          const atom = this.getU32(bcBuf, pos + 1)
          let label = this.getU32(bcBuf, pos + 5)
          const isWith = bcBuf[pos + 9]
          
          if (OPTIMIZE) {
            const result = this.findJumpTarget(fd, label)
            label = result.label
          }
          
          if (label >= 0 && label < fd.labelSlots.length) {
            const ls = fd.labelSlots[label]
            this.addPc2lineInfo(fd, bcOut.size, lineNum)
            
            if (USE_SHORT_OPCODES) {
              fd.jumpSlots[fd.jumpCount] = new JumpSlot()
              fd.jumpSlots[fd.jumpCount].op = op
              fd.jumpSlots[fd.jumpCount].size = 4
              fd.jumpSlots[fd.jumpCount].pos = bcOut.size + 5
              fd.jumpSlots[fd.jumpCount].label = label
              fd.jumpCount++
            }
            
            bcOut.putU8(op)
            bcOut.putU32(atom)
            bcOut.putU32(ls.addr === -1 ? 0 : ls.addr - bcOut.size)
            
            if (ls.addr === -1) {
              this.addReloc(fd, ls, bcOut.size - 4, 4)
            }
            
            bcOut.putU8(isWith)
          }
          break
        }
        
        // === post_inc/post_dec 优化 ===
        // QuickJS 源码位置: parser.c:11896-11957
        // 
        // 优化模式:
        // - post_inc put_loc(n) drop → inc put_loc(n)
        // - post_inc put_arg(n) drop → inc put_arg(n)
        // - post_inc put_var_ref(n) drop → inc put_var_ref(n)
        // - post_inc perm3 put_field drop → inc put_field
        // - post_inc perm3 put_var_strict drop → inc put_var_strict
        // - post_inc perm4 put_array_el drop → inc put_array_el
        case Opcode.OP_post_inc:
        case Opcode.OP_post_dec: {
          if (OPTIMIZE) {
            // post_inc put_loc/put_arg/put_var_ref drop → inc put_x
            if (this.codeMatch(cc, posNext, [
              M3(Opcode.OP_put_loc, Opcode.OP_put_arg, Opcode.OP_put_var_ref), -1, 
              Opcode.OP_drop, -1
            ])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              const op1 = cc.op
              const idx = cc.idx
              let pos1 = cc.pos
              
              // 检查是否可以进一步优化为 set_x
              // put_x(n) get_x(n) → set_x(n)
              if (this.codeMatch(cc, pos1, [op1 - 1, idx, -1])) {
                if (cc.lineNum >= 0) lineNum = cc.lineNum
                pos1 = cc.pos
                // op1 + 1 → set_x
                this.addPc2lineInfo(fd, bcOut.size, lineNum)
                bcOut.putU8(Opcode.OP_dec + (op - Opcode.OP_post_dec)) // inc or dec
                this.putShortCode(bcOut, op1 + 1, idx)
                posNext = pos1
                break
              }
              
              this.addPc2lineInfo(fd, bcOut.size, lineNum)
              bcOut.putU8(Opcode.OP_dec + (op - Opcode.OP_post_dec)) // inc or dec
              this.putShortCode(bcOut, op1, idx)
              posNext = pos1
              break
            }
            
            // post_inc perm3 put_field/put_var_strict drop → inc put_field/put_var_strict
            if (this.codeMatch(cc, posNext, [
              Opcode.OP_perm3,
              M2(Opcode.OP_put_field, Opcode.OP_put_var_strict), -1,
              Opcode.OP_drop, -1
            ])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              this.addPc2lineInfo(fd, bcOut.size, lineNum)
              bcOut.putU8(Opcode.OP_dec + (op - Opcode.OP_post_dec)) // inc or dec
              bcOut.putU8(cc.op)
              bcOut.putU32(cc.atom)
              posNext = cc.pos
              break
            }
            
            // post_inc perm4 put_array_el drop → inc put_array_el
            if (this.codeMatch(cc, posNext, [
              Opcode.OP_perm4, Opcode.OP_put_array_el, Opcode.OP_drop, -1
            ])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              this.addPc2lineInfo(fd, bcOut.size, lineNum)
              bcOut.putU8(Opcode.OP_dec + (op - Opcode.OP_post_dec)) // inc or dec
              bcOut.putU8(Opcode.OP_put_array_el)
              posNext = cc.pos
              break
            }
          }
          // no optimization, output as-is
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          bcOut.putU8(op)
          break
        }

        // === typeof tests ===
        // QuickJS（parser.c:12010-12067）在 SHORT_OPCODES + OPTIMIZE 下会尝试简化 typeof 测试：
        // - typeof(s) == "undefined"  -> OP_typeof_is_undefined
        // - typeof(s) != "undefined" if_false -> OP_typeof_is_undefined if_true
        // 同时，即使最终未替换 opcode（例如比较 'number'），也会把匹配到的 cc.line_num 提前赋给 line_num。
        case Opcode.OP_typeof: {
          if (OPTIMIZE) {
            if (this.codeMatch(cc, posNext, [
              Opcode.OP_push_atom_value,
              -1,
              M4(Opcode.OP_strict_eq, Opcode.OP_strict_neq, Opcode.OP_eq, Opcode.OP_neq),
              -1,
            ])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum

              const op1 = (cc.op === Opcode.OP_strict_eq || cc.op === Opcode.OP_eq)
                ? Opcode.OP_strict_eq
                : Opcode.OP_strict_neq

              let op2 = -1
              switch (cc.atom) {
                case JSAtom.JS_ATOM_undefined:
                  op2 = Opcode.OP_typeof_is_undefined
                  break
                case JSAtom.JS_ATOM_function:
                  op2 = Opcode.OP_typeof_is_function
                  break
              }

              if (op2 >= 0) {
                // transform typeof(s) == "<type>" into is_<type>
                if (op1 === Opcode.OP_strict_eq) {
                  this.addPc2lineInfo(fd, bcOut.size, lineNum)
                  bcOut.putU8(op2)
                  posNext = cc.pos
                  break
                }

                // transform typeof(s) != "<type>" if_false into is_<type> if_true
                if (op1 === Opcode.OP_strict_neq && this.codeMatch(cc, cc.pos, [Opcode.OP_if_false, -1])) {
                  if (cc.lineNum >= 0) lineNum = cc.lineNum
                  this.addPc2lineInfo(fd, bcOut.size, lineNum)
                  bcOut.putU8(op2)
                  const label = cc.label
                  posNext = cc.pos
                  this.emitJump(fd, bcOut, Opcode.OP_if_true, label, lineNum, pos)
                  break
                }
              }
            } else if (process.env.DEBUG_TYPEOF_TESTS) {
              console.log('[typeof-tests] no match', {
                pos,
                posNext,
                nextBytes: Array.from(bcBuf.slice(posNext, Math.min(bcLen, posNext + 24))),
              })
            }
          }
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          bcOut.put(bcBuf.slice(pos, pos + len))
          break
        }
        
        // === 默认处理 ===
        // 注意: 与之前的理解不同，C 源码的 no_change 确实调用 add_pc2line_info
        // 但由于 TS 编译器发射 OP_line_num 的策略与 C 不同，这里不调用以避免重复
        default:
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          bcOut.put(bcBuf.slice(pos, pos + len))
          break
      }
      
      pos = posNext
    }
    
    // === 短跳转优化 (第二遍) ===
    if (USE_SHORT_OPCODES && OPTIMIZE) {
      this.optimizeShortJumps(fd, bcOut)

      // Safe peephole: remove `goto` that jumps to function end right before an explicit return.
      // This matches QuickJS behavior for some constant-folded control-flow patterns.
      this.optimizeGotoToEndBeforeReturn(fd, bcOut)
    }
    
    // 对齐 QuickJS：class fields init helper 相关的一个小型 peephole 优化。
    this.optimizeConstTrueBrandGuard(fd, bcOut)
    this.optimizeConstFalseBrandGuard(fd, bcOut)

    // === 计算 pc2line 信息 ===
    this.computePc2lineInfo(fd)
    
    // === 替换字节码 ===
    fd.byteCode = bcOut
    fd.useShortOpcodes = true
    
    if (process.env.DEBUG_JUMP) {
      console.log(`[resolve] Final bcOut.size=${bcOut.size}`)
    }
  }

  /**
   * 删除紧贴 return_{undef}/return 且跳到函数末尾的冗余 goto。
   *
   * 例如（TS 端可能生成）：goto8 +1; return_undef
   * QuickJS/WASM 常会直接保留 return_undef 而不发射该 goto。
   */
  private optimizeGotoToEndBeforeReturn(fd: FunctionDef, bcOut: BytecodeBuilder): void {
    const buf = bcOut.buffer

    const readI8 = (b: number) => (b << 24) >> 24
    const readI16 = (lo: number, hi: number) => (((lo | (hi << 8)) << 16) >> 16)
    const readI32 = (b0: number, b1: number, b2: number, b3: number) => (b0 | (b1 << 8) | (b2 << 16) | (b3 << 24)) | 0

    const removeBytes = (start: number, count: number) => {
      // shift left
      for (let i = start; i < bcOut.size - count; i++) {
        buf[i] = buf[i + count]
      }
      bcOut.size -= count

      // update label addrs
      for (let i = 0; i < fd.labelSlots.length; i++) {
        const ls = fd.labelSlots[i]
        if (ls.addr > start) ls.addr -= count
        if (ls.pos2 > start) ls.pos2 -= count
        let re = ls.firstReloc
        while (re) {
          if (re.addr > start) re.addr -= count
          re = re.next
        }
      }

      // update jump slots and drop removed jump
      if (fd.jumpSlots && fd.jumpCount > 0) {
        let w = 0
        for (let j = 0; j < fd.jumpCount; j++) {
          const jp = fd.jumpSlots[j]
          const opPos = jp.pos - 1
          if (opPos >= start && opPos < start + count) {
            continue
          }
          if (jp.pos > start) jp.pos -= count
          fd.jumpSlots[w++] = jp
        }
        fd.jumpCount = w
      }

      // update pc2line slots
      if (fd.lineNumberSlots && fd.lineNumberCount > 0) {
        for (let i = 0; i < fd.lineNumberCount; i++) {
          const s = fd.lineNumberSlots[i]
          if (s.pc > start) s.pc -= count
        }
      }
    }

    let changed = false
    let pc = 0
    while (pc < bcOut.size) {
      const op = buf[pc]

      let insnLen = 0
      let targetPc: number | null = null

      if (op === Opcode.OP_goto8) {
        if (pc + 2 <= bcOut.size) {
          insnLen = 2
          targetPc = pc + insnLen + readI8(buf[pc + 1])
        }
      } else if (op === Opcode.OP_goto16) {
        if (pc + 3 <= bcOut.size) {
          insnLen = 3
          targetPc = pc + insnLen + readI16(buf[pc + 1], buf[pc + 2])
        }
      } else if (op === Opcode.OP_goto) {
        if (pc + 5 <= bcOut.size) {
          insnLen = 5
          targetPc = pc + insnLen + readI32(buf[pc + 1], buf[pc + 2], buf[pc + 3], buf[pc + 4])
        }
      }

      if (insnLen > 0 && targetPc !== null) {
        const nextPc = pc + insnLen
        const nextOp = nextPc < bcOut.size ? buf[nextPc] : -1
        const isReturn = nextOp === Opcode.OP_return_undef || nextOp === Opcode.OP_return
        if (isReturn && targetPc === bcOut.size) {
          removeBytes(pc, insnLen)
          changed = true
          pc = Math.max(0, pc - 8)
          continue
        }
      }

      const def = this.getOpcodeDef(op)
      pc += def?.size ?? 1
    }

    if (changed) {
      // Re-patch jump offsets after size changes.
      this.optimizeShortJumps(fd, bcOut)
    }
  }

  // ============================================================================
  // 辅助方法: 初始化特殊变量
  // 
  // QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:11123-11182
  // ============================================================================

  /**
   * 初始化特殊变量 (home_object, this, new.target, arguments 等)
   */
  private initializeSpecialVars(fd: FunctionDef, bcOut: BytecodeBuilder): void {
    // home_object
    if (fd.homeObjectVarIdx >= 0) {
      bcOut.putU8(Opcode.OP_special_object)
      bcOut.putU8(OPSpecialObjectEnum.OP_SPECIAL_OBJECT_HOME_OBJECT)
      this.putShortCode(bcOut, Opcode.OP_put_loc, fd.homeObjectVarIdx)
    }
    
    // this.active_func
    if (fd.thisActiveFuncVarIdx >= 0) {
      bcOut.putU8(Opcode.OP_special_object)
      bcOut.putU8(OPSpecialObjectEnum.OP_SPECIAL_OBJECT_THIS_FUNC)
      this.putShortCode(bcOut, Opcode.OP_put_loc, fd.thisActiveFuncVarIdx)
    }
    
    // new.target
    if (fd.newTargetVarIdx >= 0) {
      bcOut.putU8(Opcode.OP_special_object)
      bcOut.putU8(OPSpecialObjectEnum.OP_SPECIAL_OBJECT_NEW_TARGET)
      this.putShortCode(bcOut, Opcode.OP_put_loc, fd.newTargetVarIdx)
    }
    
    // this
    if (fd.thisVarIdx >= 0) {
      if (fd.isDerivedClassConstructor) {
        bcOut.putU8(Opcode.OP_set_loc_uninitialized)
        bcOut.putU16(fd.thisVarIdx)
      } else {
        bcOut.putU8(Opcode.OP_push_this)
        this.putShortCode(bcOut, Opcode.OP_put_loc, fd.thisVarIdx)
      }
    }
    
    // arguments
    if (fd.argumentsVarIdx >= 0) {
      if ((fd.jsMode & JS_MODE_STRICT_DEFAULT) !== 0 || !fd.hasSimpleParameterList) {
        bcOut.putU8(Opcode.OP_special_object)
        bcOut.putU8(OPSpecialObjectEnum.OP_SPECIAL_OBJECT_ARGUMENTS)
      } else {
        bcOut.putU8(Opcode.OP_special_object)
        bcOut.putU8(OPSpecialObjectEnum.OP_SPECIAL_OBJECT_MAPPED_ARGUMENTS)
      }
      if (fd.argumentsArgIdx >= 0) {
        this.putShortCode(bcOut, Opcode.OP_set_loc, fd.argumentsArgIdx)
      }
      this.putShortCode(bcOut, Opcode.OP_put_loc, fd.argumentsVarIdx)
    }
    
    // func_var (函数表达式名称)
    if (fd.funcVarIdx >= 0) {
      bcOut.putU8(Opcode.OP_special_object)
      bcOut.putU8(OPSpecialObjectEnum.OP_SPECIAL_OBJECT_THIS_FUNC)
      this.putShortCode(bcOut, Opcode.OP_put_loc, fd.funcVarIdx)
    }
    
    // var_object (用于 eval)
    if (fd.varObjectIdx >= 0) {
      bcOut.putU8(Opcode.OP_special_object)
      bcOut.putU8(OPSpecialObjectEnum.OP_SPECIAL_OBJECT_VAR_OBJECT)
      this.putShortCode(bcOut, Opcode.OP_put_loc, fd.varObjectIdx)
    }
    
    // arg_var_object (用于 eval 的参数作用域)
    if (fd.argVarObjectIdx >= 0) {
      bcOut.putU8(Opcode.OP_special_object)
      bcOut.putU8(OPSpecialObjectEnum.OP_SPECIAL_OBJECT_VAR_OBJECT)
      this.putShortCode(bcOut, Opcode.OP_put_loc, fd.argVarObjectIdx)
    }
  }

  /**
    * 对齐 QuickJS：用于 class fields init helper 的最小 peephole 优化。
    *
    * QuickJS 在 <class_fields_init> 中会生成一个受保护的 add_brand 代码块，形状以
    * `push_false; if_false ...` 开头。随后优化器会将“恒为 false”的分支折叠为
    * 无条件跳转，并移除死代码（add_brand 相关操作）。
   */
  private optimizeConstFalseBrandGuard(fd: FunctionDef, bcOut: BytecodeBuilder): void {
    const buf = bcOut.buffer
    const size = bcOut.size

    // Pattern length: 1 + 2 + 1 + 1 + 1 = 6 bytes
    for (let pc = 0; pc + 6 <= size; pc++) {
      if (
        buf[pc] === Opcode.OP_push_false &&
        buf[pc + 1] === Opcode.OP_if_false8 &&
        buf[pc + 3] === Opcode.OP_get_loc0 &&
        buf[pc + 4] === Opcode.OP_get_loc1 &&
        buf[pc + 5] === Opcode.OP_add_brand
      ) {
        // 替换为 `goto8 1`，并删除多余的 4 个字节。
        buf[pc] = Opcode.OP_goto8
        // QuickJS：短跳转目标是相对于 (pos + 1) 的偏移。
        // 为跳到下一条指令，diff 必须为 1。
        buf[pc + 1] = 1

        // 删除区间 [pc+2 .. pc+6) 的字节。
        this.shrinkBytecode(fd, bcOut, pc, 2, 4)
        return
      }
    }
  }

  /**
    * 对齐 QuickJS：当 brand guard 被修补为恒真时的 class fields init helper 优化。
    *
    * 我们的 ClassVisitor 会先发射占位的 `push_false; if_false8 ...` guard，
    * 当需要 private brand 时再将 `push_false` → `push_true`。
    * QuickJS 随后会折叠掉“恒真”分支，最终只保留
    * `get_loc0; get_loc1; add_brand` 这一段序列。
   */
  private optimizeConstTrueBrandGuard(fd: FunctionDef, bcOut: BytecodeBuilder): void {
    const buf = bcOut.buffer
    const size = bcOut.size

    // 模式长度: 1 (push_true) + 2 (if_false8 imm8) + 3 (brand ops) = 6 字节
    for (let pc = 0; pc + 6 <= size; pc++) {
      if (
        buf[pc] === Opcode.OP_push_true &&
        buf[pc + 1] === Opcode.OP_if_false8 &&
        // 该 guard 必须精确跳过到 add_brand 之后的下一条指令。
        buf[pc + 2] === 4 &&
        buf[pc + 3] === Opcode.OP_get_loc0 &&
        buf[pc + 4] === Opcode.OP_get_loc1 &&
        buf[pc + 5] === Opcode.OP_add_brand
      ) {
        // 移除 `push_true; if_false8 <imm>`（共 3 字节），保留 brand ops。
        this.shrinkBytecode(fd, bcOut, pc, 0, 3)
        return
      }
    }
  }

  // ============================================================================
  // 辅助方法：短操作码
  // ============================================================================

  /**
   * 输出短整数 - 对应 parser.c:push_short_int
   */
  private pushShortInt(bcOut: BytecodeBuilder, val: number): void {
    if (USE_SHORT_OPCODES) {
      if (val >= -1 && val <= 7) {
        bcOut.putU8(Opcode.OP_push_0 + val)
        return
      }
      if (val === (val << 24 >> 24)) { // int8
        bcOut.putU8(Opcode.OP_push_i8)
        bcOut.putU8(val & 0xff)
        return
      }
      if (val === (val << 16 >> 16)) { // int16
        bcOut.putU8(Opcode.OP_push_i16)
        // QuickJS: emit_u16(JSParseState* s, uint16_t val)
        // 参见: third_party/QuickJS/src/core/parser.c:1771
        bcOut.putU16(val)
        return
      }
    }
    bcOut.putU8(Opcode.OP_push_i32)
    bcOut.putU32(val)
  }

  /**
   * 输出短代码 - 对应 parser.c:put_short_code
   */
  private putShortCode(bcOut: BytecodeBuilder, op: number, idx: number): void {
    if (USE_SHORT_OPCODES) {
      if (idx < 4) {
        switch (op) {
          case Opcode.OP_get_loc:
            bcOut.putU8(Opcode.OP_get_loc0 + idx)
            return
          case Opcode.OP_put_loc:
            bcOut.putU8(Opcode.OP_put_loc0 + idx)
            return
          case Opcode.OP_set_loc:
            bcOut.putU8(Opcode.OP_set_loc0 + idx)
            return
          case Opcode.OP_get_arg:
            bcOut.putU8(Opcode.OP_get_arg0 + idx)
            return
          case Opcode.OP_put_arg:
            bcOut.putU8(Opcode.OP_put_arg0 + idx)
            return
          case Opcode.OP_set_arg:
            bcOut.putU8(Opcode.OP_set_arg0 + idx)
            return
          case Opcode.OP_get_var_ref:
            bcOut.putU8(Opcode.OP_get_var_ref0 + idx)
            return
          case Opcode.OP_put_var_ref:
            bcOut.putU8(Opcode.OP_put_var_ref0 + idx)
            return
          case Opcode.OP_set_var_ref:
            bcOut.putU8(Opcode.OP_set_var_ref0 + idx)
            return
          case Opcode.OP_call:
            bcOut.putU8(Opcode.OP_call0 + idx)
            return
        }
      }
      if (idx < 256) {
        switch (op) {
          case Opcode.OP_get_loc:
            bcOut.putU8(Opcode.OP_get_loc8)
            bcOut.putU8(idx)
            return
          case Opcode.OP_put_loc:
            bcOut.putU8(Opcode.OP_put_loc8)
            bcOut.putU8(idx)
            return
          case Opcode.OP_set_loc:
            bcOut.putU8(Opcode.OP_set_loc8)
            bcOut.putU8(idx)
            return
        }
      }
    }
    bcOut.putU8(op)
    bcOut.putU16(idx)
  }

  // ============================================================================
  // 辅助方法: 跳转处理
  // ============================================================================

  /**
   * 发射跳转指令
   * 
   * @param srcPos 源字节码中的当前位置，用于估计短跳转距离
   *               对应 QuickJS C 源码: int diff = ls->pos2 - pos - 1;
   */
  private emitJump(
    fd: FunctionDef,
    bcOut: BytecodeBuilder,
    op: number,
    label: number,
    lineNum: number,
    srcPos: number = 0
  ): void {
    if (label < 0 || label >= fd.labelSlots.length) {
      throw new Error(`Invalid label: ${label}`)
    }
    
    const ls = fd.labelSlots[label]
    this.addPc2lineInfo(fd, bcOut.size, lineNum)
    
    if (USE_SHORT_OPCODES) {
      // 尝试使用短跳转
      if (ls.addr === -1) {
        // 未解析: 使用 pos2 估计（QuickJS 在 pass2 里总能得到 ls->pos2）。
        // 我们这里若 pos2 仍为 -1，说明还没遇到对应的 OP_label，无法可靠估计 diff。
        // 这种情况下不要尝试短跳转，否则会写入错误的负偏移，导致后续 stack size 计算/执行崩溃。
        if (ls.pos2 >= 0) {
          // 关键修复: 使用源位置 srcPos 而不是输出位置 bcOut.size
          // 对应 QuickJS C 源码 parser.c:11341: int diff = ls->pos2 - pos - 1;
          const diff = ls.pos2 - srcPos - 1
        
          // DEBUG: 打印跳转信息
          if (process.env.DEBUG_JUMP) {
            console.log(`[emitJump] op=${op.toString(16)}, label=${label}, srcPos=${srcPos}, ls.pos2=${ls.pos2}, diff=${diff}, bcOut.size=${bcOut.size}`)
          }
          
          if (diff >= -128 && diff <= 127 && 
              (op === Opcode.OP_if_false || op === Opcode.OP_if_true || op === Opcode.OP_goto)) {
            const shortOp = op === Opcode.OP_goto ? Opcode.OP_goto8 : Opcode.OP_if_false8 + (op - Opcode.OP_if_false)
            
            if (process.env.DEBUG_JUMP) {
              console.log(`[emitJump] Using SHORT jump: shortOp=0x${shortOp.toString(16)}, bcOut.size=${bcOut.size}`)
            }
            
            // 记录跳转槽 - 短跳转使用 1 字节偏移
            const jp = this.allocJumpSlot(fd)
            jp.op = shortOp
            jp.size = 1
            jp.pos = bcOut.size + 1  // 偏移位置
            jp.label = label
            fd.jumpCount++
            
            bcOut.putU8(shortOp)
            bcOut.putU8(0)
            this.addReloc(fd, ls, bcOut.size - 1, 1)
            return
          }
          if (diff >= -32768 && diff <= 32767 && op === Opcode.OP_goto) {
            // 记录跳转槽 - 中等跳转使用 2 字节偏移
            const jp = this.allocJumpSlot(fd)
            jp.op = Opcode.OP_goto16
            jp.size = 2
            jp.pos = bcOut.size + 1
            jp.label = label
            fd.jumpCount++
            
            bcOut.putU8(Opcode.OP_goto16)
            bcOut.putU16(0)
            this.addReloc(fd, ls, bcOut.size - 2, 2)
            return
          }
        }
      } else {
        // 已解析: 使用实际地址
        // 对应 QuickJS 源码 parser.c:11356 (resolve_labels)
        const diff = ls.addr - bcOut.size - 1
        if (diff >= -128 && diff <= 127 &&
            (op === Opcode.OP_if_false || op === Opcode.OP_if_true || op === Opcode.OP_goto)) {
          const shortOp = op === Opcode.OP_goto ? Opcode.OP_goto8 : Opcode.OP_if_false8 + (op - Opcode.OP_if_false)
          
          // 关键修复: 即使是向后跳转且已经是短跳转，也必须记录到 jumpSlots
          // 因为后续的 optimizeShortJumps 可能会收缩中间的代码，导致 diff 发生变化
          // 对应 QuickJS 源码 parser.c:11363:
          // "we must record the jump because the offset may change if we optimize other jumps"
          const jp = this.allocJumpSlot(fd)
          jp.op = shortOp
          jp.size = 1
          jp.pos = bcOut.size + 1
          jp.label = label
          fd.jumpCount++

          bcOut.putU8(shortOp)
          bcOut.putU8(diff & 0xff)
          return
        }
        if (diff >= -32768 && diff <= 32767 && op === Opcode.OP_goto) {
          // 同上，记录中等跳转
          // 对应 QuickJS 源码 parser.c resolve_labels:
          // if (diff == (int16_t)diff && op == OP_goto) {
          //   jp->size = 2;
          //   jp->op = OP_goto16;
          //   ...
          // }
          const jp = this.allocJumpSlot(fd)
          jp.op = Opcode.OP_goto16
          jp.size = 2
          jp.pos = bcOut.size + 1
          jp.label = label
          fd.jumpCount++

          bcOut.putU8(Opcode.OP_goto16)
          // QuickJS: resolve_labels 中 diff 经过 (int16_t) 校验后写入 OP_goto16
          // 参见: third_party/QuickJS/src/core/parser.c (resolve_labels)
          bcOut.putU16(diff)
          return
        }
      }
      
      // 记录跳转槽 - 长跳转使用 4 字节偏移
      if (process.env.DEBUG_JUMP) {
        console.log(`[emitJump] Before recording: jumpCount=${fd.jumpCount}, jumpSlots.length=${fd.jumpSlots?.length ?? 'null'}`)
      }
      const jp = this.allocJumpSlot(fd)
      jp.op = op
      jp.size = 4
      jp.pos = bcOut.size + 1
      jp.label = label
      fd.jumpCount++
      
      if (process.env.DEBUG_JUMP) {
        console.log(`[emitJump] Recorded LONG jump: op=0x${op.toString(16)}, size=4, pos=${jp.pos}, label=${label}`)
      }
    }
    
    // 默认: 使用 32 位跳转
    bcOut.putU8(op)
    const diff = ls.addr === -1 ? 0 : ls.addr - bcOut.size
    bcOut.putU32(diff)
    
    if (ls.addr === -1) {
      this.addReloc(fd, ls, bcOut.size - 4, 4)
    }
  }

  /**
   * 添加重定位条目 - 对应 parser.c:add_reloc
   */
  private addReloc(_fd: FunctionDef, ls: LabelSlot, addr: number, size: number): void {
    const re = new RelocEntry()
    re.addr = addr
    re.size = size
    re.next = ls.firstReloc
    ls.firstReloc = re
  }

  /**
   * 解析重定位条目
   */
  private resolveRelocations(_fd: FunctionDef, ls: LabelSlot, bcOut: BytecodeBuilder): void {
    let re = ls.firstReloc
    while (re) {
      const diff = ls.addr - re.addr
      const buf = bcOut.buffer
      
      switch (re.size) {
        case 4:
          buf[re.addr] = diff & 0xff
          buf[re.addr + 1] = (diff >> 8) & 0xff
          buf[re.addr + 2] = (diff >> 16) & 0xff
          buf[re.addr + 3] = (diff >> 24) & 0xff
          break
        case 2:
          buf[re.addr] = diff & 0xff
          buf[re.addr + 1] = (diff >> 8) & 0xff
          break
        case 1:
          buf[re.addr] = diff & 0xff
          break
      }
      
      const next = re.next
      re = next
    }
    ls.firstReloc = null
  }

  /**
   * 查找跳转目标 - 对应 parser.c:find_jump_target
   */
  private findJumpTarget(fd: FunctionDef, label0: number): { label: number; op: number } {
    let label = label0
    this.updateLabel(fd, label, -1)
    
    for (let i = 0; i < 10; i++) {
      if (label < 0 || label >= fd.labelSlots.length) break
      
      let pos = fd.labelSlots[label].pos2
      const bcBuf = fd.byteCode.buffer
      
      while (true) {
        const op = bcBuf[pos]
        
        if (op === TempOpcode.OP_line_num || op === TempOpcode.OP_label) {
          pos += this.getOpcodeDef(op)?.size ?? 5
          continue
        }
        
        if (op === Opcode.OP_goto) {
          label = this.getU32(bcBuf, pos + 1)
          break
        }
        
        if (op === Opcode.OP_drop) {
          while (bcBuf[++pos] === Opcode.OP_drop) continue
          if (bcBuf[pos] === Opcode.OP_return_undef) {
            this.updateLabel(fd, label, +1)
            return { label, op: Opcode.OP_return_undef }
          }
        }
        
        this.updateLabel(fd, label, +1)
        return { label, op }
      }
    }
    
    this.updateLabel(fd, label, +1)
    return { label: label0, op: Opcode.OP_nop }
  }

  /**
   * 更新标签引用计数 - 对应 parser.c:update_label
   */
  private updateLabel(fd: FunctionDef, label: number, delta: number): number {
    if (label >= 0 && label < fd.labelSlots.length) {
      fd.labelSlots[label].refCount += delta
      return fd.labelSlots[label].refCount
    }
    return 0
  }

  /**
   * 检查位置后是否有指定标签 - 对应 parser.c:code_has_label
   */
  private codeHasLabel(cc: CodeContext, pos: number, label: number): boolean {
    while (pos < cc.bcLen) {
      const op = cc.bcBuf[pos]
      
      if (op === TempOpcode.OP_line_num) {
        pos += 5
        continue
      }
      
      if (op === TempOpcode.OP_label) {
        const lab = this.getU32(cc.bcBuf, pos + 1)
        if (lab === label) return true
        pos += 5
        continue
      }
      
      if (op === Opcode.OP_goto) {
        const lab = this.getU32(cc.bcBuf, pos + 1)
        if (lab === label) return true
      }
      
      break
    }
    return false
  }

  /**
   * 跳过死代码 - 对应 parser.c:skip_dead_code
   */
  private skipDeadCode(
    fd: FunctionDef,
    bcBuf: Uint8Array,
    bcLen: number,
    pos: number,
    state: { lineNum: number }
  ): number {
    while (pos < bcLen) {
      const op = bcBuf[pos]
      const opDef = this.getOpcodeDef(op)
      if (!opDef) break
      
      const len = opDef.size
      
      if (op === TempOpcode.OP_line_num && this.isLikelyLineNum(bcBuf, pos, fd.source ? fd.source.length : 0)) {
        // QuickJS skip_dead_code() updates *linep* on OP_line_num (parser.c:10417-10485).
        // However, in our pipeline we may have emitted extra OP_line_num markers for code that
        // will later be proven unreachable and skipped here. If we propagate those line updates,
        // they can incorrectly retarget the next reachable opcode's pc2line (e.g. catch2 rethrow).
        // For pc2line parity, ignore OP_line_num while skipping dead code.
      } else if (op === TempOpcode.OP_label) {
        const label = this.getU32(bcBuf, pos + 1)
        if (this.updateLabel(fd, label, 0) > 0) {
          break
        }
      } else {
        // 死代码: 更新标签引用计数
        const fmt = opDef.format
        if (fmt === OpFormat.label || fmt === OpFormat.label_u16) {
          const label = this.getU32(bcBuf, pos + 1)
          this.updateLabel(fd, label, -1)
        }
        // TODO: 释放 atom 引用
      }
      
      pos += len
    }
    return pos
  }

  // ============================================================================
  // 辅助方法: 模式匹配
  // ============================================================================

  /**
   * 代码模式匹配 - 对应 parser.c:code_match
   * 
   * 模式格式: [opcode1, arg1?, opcode2, arg2?, ..., -1]
   * - opcode: 要匹配的操作码值，或用 M2/M3/M4 组合的多选操作码
   * - arg: 如果操作码有参数，下一个值是期望的参数值；-1 表示任意值
   * - -1: 终止符（必须在最后）
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:10131-10244
   */
  private codeMatch(cc: CodeContext, pos: number, pattern: number[]): boolean {
    let lineNum = -1
    let i = 0
    
    while (i < pattern.length) {
      const expected = pattern[i]
      i++
      
      // -1 表示模式结束，匹配成功
      if (expected === -1) {
        cc.pos = pos
        cc.lineNum = lineNum
        return true
      }
      
      // 跳过 line_num 操作码
      while (pos < cc.bcLen) {
        const op = cc.bcBuf[pos]
        if (op === TempOpcode.OP_line_num && this.isLikelyLineNum(cc.bcBuf, pos, cc.sourceLen)) {
          lineNum = this.getU32(cc.bcBuf, pos + 1)
          if (process.env.DEBUG_TYPEOF_TESTS) {
            console.log('[codeMatch] saw OP_line_num', { pos, lineNum })
          }
          pos += 5
        } else {
          break
        }
      }
      
      if (pos >= cc.bcLen) return false
      
      const op = cc.bcBuf[pos]
      const opDef = this.getOpcodeDef(op)
      if (!opDef) return false
      
      // 检查操作码匹配
      // expected 可以是单个操作码，或用 M2/M3/M4 打包的多个操作码
      let matched = false
      let isMultiMatch = false  // 标记是否是多操作码匹配
      if (expected === op) {
        matched = true
        // 精确匹配：不更新 cc.op (与 QuickJS C 行为一致)
      } else if (expected > 255) {
        // M2/M3/M4 编码的多个操作码
        if (op === (expected & 0xFF) ||
            op === ((expected >> 8) & 0xFF) ||
            op === ((expected >> 16) & 0xFF) ||
            op === ((expected >> 24) & 0xFF)) {
          matched = true
          isMultiMatch = true
        }
      }
      
      if (!matched) return false
      
      // 只有多操作码匹配时才更新 cc.op (与 QuickJS C 行为一致)
      if (isMultiMatch) {
        cc.op = op
      }
      
      // 根据操作码格式读取参数，并可能与 pattern 中的下一个值匹配
      const posNext = pos + opDef.size
      
      switch (opDef.format) {
        case OpFormat.u8:
        case OpFormat.loc8: {
          const idx = cc.bcBuf[pos + 1]
          cc.idx = idx
          // 读取参数期望值
          if (i < pattern.length) {
            const expectedArg = pattern[i]
            i++ // 始终递增 i 来消费参数
            if (expectedArg !== -1) {
              // 不是 -1：需要精确匹配
              if (idx !== expectedArg) return false
            }
            // -1：只保存值，不检查
          }
          break
        }
        case OpFormat.u16:
        case OpFormat.loc:
        case OpFormat.arg:
        case OpFormat.var_ref:
        case OpFormat.npop: {
          const idx = this.getU16(cc.bcBuf, pos + 1)
          cc.idx = idx
          // 读取参数期望值
          if (i < pattern.length) {
            const expectedArg = pattern[i]
            i++ // 始终递增 i 来消费参数
            if (expectedArg !== -1) {
              // 不是 -1：需要精确匹配
              if (idx !== expectedArg) return false
            }
            // -1：只保存值，不检查
          }
          break
        }
        case OpFormat.u32:
        case OpFormat.i32:
        case OpFormat.label:
        case OpFormat.const: {
          const raw = this.getU32(cc.bcBuf, pos + 1)
          if (opDef.format === OpFormat.label || opDef.format === OpFormat.const) {
            cc.label = raw
          } else if (opDef.format === OpFormat.i32) {
            cc.val = u32ToI32(raw)
          } else {
            cc.val = raw
          }

          // Consume & optionally match the expected immediate argument.
          if (i < pattern.length) {
            const expectedArg = pattern[i]
            i++
            if (expectedArg !== -1) {
              const actual = (opDef.format === OpFormat.label || opDef.format === OpFormat.const)
                ? cc.label
                : cc.val
              if (actual !== expectedArg) return false
            }
          }
          break
        }
        case OpFormat.atom: {
          cc.atom = this.getU32(cc.bcBuf, pos + 1)
          // Consume & optionally match the atom argument.
          if (i < pattern.length) {
            const expectedArg = pattern[i]
            i++
            if (expectedArg !== -1) {
              if (cc.atom !== expectedArg) return false
            }
          }
          break
        }
        default:
          // 无参数的操作码
          break
      }
      
      pos = posNext
    }
    
    cc.pos = pos
    cc.lineNum = lineNum
    return true
  }

  // ============================================================================
  // 辅助方法: pc2line 信息
  // ============================================================================

  /**
   * 添加 pc2line 信息 - 对应 parser.c:add_pc2line_info
   */
  private addPc2lineInfo(fd: FunctionDef, pc: number, sourcePos: number): void {
    // 对齐 QuickJS add_pc2line_info：仅当已分配 slots 时才记录。
    if (fd.lineNumberSize <= 0 || fd.lineNumberSlots.length === 0) return

    // 对齐 QuickJS：容量耗尽则停止（容量应在前面预估并一次性分配）。
    if (fd.lineNumberCount >= fd.lineNumberSize) return

    // 对齐 QuickJS add_pc2line_info：只记录单调递增的 PC，并跳过重复的 sourcePos。
    if (pc < fd.lineNumberLastPc || sourcePos === fd.lineNumberLast) {
      return
    }

    const slot = fd.lineNumberSlots[fd.lineNumberCount]
    slot.pc = pc
    slot.sourcePos = sourcePos
    fd.lineNumberCount++
    fd.lineNumberLastPc = pc
    fd.lineNumberLast = sourcePos

    if (process.env.DEBUG_PC2LINE && fd.source) {
      if (!fd.getLineColCache) {
        DebugInfoBuilder.initLineColCache(fd, fd.source)
      }
      const cache = fd.getLineColCache!
      const [line, col] = DebugInfoBuilder.getLineColCached(cache, fd.source, sourcePos)
      console.log(`[LR] addPc2lineInfo: pc=${pc} sourcePos=${sourcePos} line=${line} col=${col}`)
    }
  }

  private countLineNumMarkers(bcBuf: Uint8Array, bcLen: number): number {
    let count = 0
    let pos = 0
    while (pos < bcLen) {
      const op = bcBuf[pos]
      const opDef = this.getOpcodeDef(op)
      if (!opDef) break
      if (op === TempOpcode.OP_line_num) count++
      pos += opDef.size
    }
    return count
  }

  /**
   * 计算 pc2line 信息 - 对应 parser.c:compute_pc2line_info
   */
  private computePc2lineInfo(_fd: FunctionDef): void {
    // TODO: 实现完整的 pc2line 计算
    // 这需要源码位置信息的支持
  }

  // ============================================================================
  // 辅助方法: 短跳转优化 (第二遍)
  // ============================================================================

  /**
   * 优化短跳转 - 对应 parser.c:12030-12080 中的 SHORT_OPCODES 优化
   * 
   * 在第一遍处理后，所有标签地址已知。这个函数尝试将长跳转 (4字节偏移) 
   * 收缩为短跳转 (1字节偏移) 或中等跳转 (2字节偏移)。
   * 
   * 收缩过程需要：
   * 1. 更新跳转指令的 opcode 和偏移大小
   * 2. 移动后续字节码
   * 3. 更新所有标签地址和跳转槽位置
   * 4. 更新行号槽位置
   */
  private optimizeShortJumps(fd: FunctionDef, bcOut: BytecodeBuilder): void {
    if (!fd.jumpSlots || fd.jumpCount === 0) return
    
    // 迭代优化，直到没有更多可以收缩的跳转
    let patchOffsets = 1
    while (patchOffsets > 0) {
      patchOffsets = 0
      
      if (process.env.DEBUG_JUMP) {
        console.log(`[optimizeShortJumps] jumpCount=${fd.jumpCount}`)
      }
      
      for (let i = 0; i < fd.jumpCount; i++) {
        const jp = fd.jumpSlots[i]
        const ls = fd.labelSlots[jp.label]
        const pos = jp.pos
        const op = jp.op
        const diff = ls.addr - pos
        
        if (process.env.DEBUG_JUMP) {
          console.log(`  [${i}] op=0x${op.toString(16)}, pos=${pos}, label=${jp.label}, addr=${ls.addr}, diff=${diff}, size=${jp.size}`)
        }
        
        let delta = 3  // 默认 delta: 4字节 -> 1字节 = 3字节差
        let newSize = 1
        let newOp = op
        
        switch (op) {
          case Opcode.OP_goto16:
            delta = 1  // 2字节 -> 1字节 = 1字节差
            // fall through
          case Opcode.OP_if_false:
          case Opcode.OP_if_true:
          case Opcode.OP_goto:
            // 检查是否可以收缩为短跳转 (1字节偏移)
            // C 源码: diff >= -128 && diff <= 127 + delta
            // 需要考虑收缩后 diff 会改变（如果目标在当前位置之后）
            if (diff >= -128 && diff <= 127 + delta) {
              newSize = 1
              if (op === Opcode.OP_goto16) {
                newOp = Opcode.OP_goto8
              } else if (op === Opcode.OP_if_false || op === Opcode.OP_if_true || op === Opcode.OP_goto) {
                newOp = Opcode.OP_if_false8 + (op - Opcode.OP_if_false)
              } else {
                continue  // 已经是短跳转
              }
              
              // 检查是否真的需要收缩
              if (jp.size <= newSize) continue
              
              // 执行收缩
              this.shrinkJump(fd, bcOut, jp, newOp, newSize, delta, i)
              patchOffsets++
            } else if ((diff === (diff << 16 >> 16)) && op === Opcode.OP_goto && jp.size === 4) {
              // 检查是否可以收缩为中等跳转 (2字节偏移)
              newSize = 2
              delta = 2
              newOp = Opcode.OP_goto16
              
              this.shrinkJump(fd, bcOut, jp, newOp, newSize, delta, i)
              patchOffsets++
            } else {
              // 无法收缩：仍然必须回填偏移。
              // QuickJS: 即使没有发生收缩，也要在每一轮根据最新的 pos/addr 重新计算 diff。
              // 否则当其它跳转收缩导致字节码整体移动时，这里的 diff 会变成“陈旧值”。
              const buf = bcOut.buffer
              if (jp.size === 1) {
                buf[pos] = diff & 0xff
              } else if (jp.size === 2) {
                buf[pos] = diff & 0xff
                buf[pos + 1] = (diff >> 8) & 0xff
              } else if (jp.size === 4) {
                buf[pos] = diff & 0xff
                buf[pos + 1] = (diff >> 8) & 0xff
                buf[pos + 2] = (diff >> 16) & 0xff
                buf[pos + 3] = (diff >> 24) & 0xff
              }
            }
            break
            
          default:
            // 其他跳转类型（catch, gosub 等）只填充偏移，不收缩
            // 同时也处理已经是短跳转的情况 (更新偏移量)
            if (jp.size === 1) {
              const buf = bcOut.buffer
              buf[pos] = diff & 0xff
            } else if (jp.size === 2) {
              const buf = bcOut.buffer
              buf[pos] = diff & 0xff
              buf[pos + 1] = (diff >> 8) & 0xff
            } else if (jp.size === 4) {
              const buf = bcOut.buffer
              buf[pos] = diff & 0xff
              buf[pos + 1] = (diff >> 8) & 0xff
              buf[pos + 2] = (diff >> 16) & 0xff
              buf[pos + 3] = (diff >> 24) & 0xff
            }
            break
        }
      }
    }
  }
  
  /**
   * 收缩跳转指令
   */
  private shrinkJump(
    fd: FunctionDef,
    bcOut: BytecodeBuilder,
    jp: JumpSlot,
    newOp: number,
    newSize: number,
    delta: number,
    currentIdx: number
  ): void {
    const pos = jp.pos
    const buf = bcOut.buffer
    
    // 更新 opcode
    buf[pos - 1] = newOp
    jp.op = newOp
    jp.size = newSize
    
    // 计算新的跳转偏移（收缩后）
    const ls = fd.labelSlots[jp.label]
    let newDiff = ls.addr - pos
    if (ls.addr > pos) {
      newDiff -= delta  // 目标在后面，收缩后距离减小
    }
    
    // 写入新偏移
    if (newSize === 1) {
      buf[pos] = newDiff & 0xff
    } else if (newSize === 2) {
      buf[pos] = newDiff & 0xff
      buf[pos + 1] = (newDiff >> 8) & 0xff
    }
    
    // 移动后续字节码
    const newEnd = pos + newSize
    for (let k = newEnd; k < bcOut.size - delta; k++) {
      buf[k] = buf[k + delta]
    }
    bcOut.size -= delta
    
    // 更新标签地址
    for (let j = 0; j < fd.labelSlots.length; j++) {
      if (fd.labelSlots[j].addr > pos) {
        fd.labelSlots[j].addr -= delta
      }
    }
    
    // 更新后续跳转槽位置
    for (let j = currentIdx + 1; j < fd.jumpCount; j++) {
      if (fd.jumpSlots[j].pos > pos) {
        fd.jumpSlots[j].pos -= delta
      }
    }
    
    // 更新行号槽
    if (fd.lineNumberSlots) {
      for (let j = 0; j < fd.lineNumberCount; j++) {
        if (fd.lineNumberSlots[j].pc > pos) {
          fd.lineNumberSlots[j].pc -= delta
        }
      }
    }

    // 更新列号槽
    if (fd.columnNumberSlots) {
      for (let j = 0; j < fd.columnNumberCount; j++) {
        if (fd.columnNumberSlots[j].pc > pos) {
          fd.columnNumberSlots[j].pc -= delta
        }
      }
    }
  }

  /**
   * 收缩字节码
   */
  private shrinkBytecode(
    fd: FunctionDef,
    bcOut: BytecodeBuilder,
    pos: number,
    newSize: number,
    delta: number
  ): void {
    // 移动字节码
    const buf = bcOut.buffer
    for (let i = pos + newSize; i < bcOut.size - delta; i++) {
      buf[i] = buf[i + delta]
    }
    bcOut.size -= delta
    
    // 更新标签地址
    for (let j = 0; j < fd.labelSlots.length; j++) {
      if (fd.labelSlots[j].addr > pos) {
        fd.labelSlots[j].addr -= delta
      }
    }
    
    // 更新跳转槽位置
    for (let j = 0; j < fd.jumpCount; j++) {
      if (fd.jumpSlots[j].pos > pos) {
        fd.jumpSlots[j].pos -= delta
      }
    }
    
    // 更新行号槽
    if (fd.lineNumberSlots) {
      for (let j = 0; j < fd.lineNumberCount; j++) {
        if (fd.lineNumberSlots[j].pc > pos) {
          fd.lineNumberSlots[j].pc -= delta
        }
      }
    }

    // 更新列号槽
    if (fd.columnNumberSlots) {
      for (let j = 0; j < fd.columnNumberCount; j++) {
        if (fd.columnNumberSlots[j].pc > pos) {
          fd.columnNumberSlots[j].pc -= delta
        }
      }
    }
  }

  // ============================================================================
  // 字节码读取辅助方法
  // ============================================================================

  private getU16(buf: Uint8Array, pos: number): number {
    return buf[pos] | (buf[pos + 1] << 8)
  }

  private getU32(buf: Uint8Array, pos: number): number {
    return buf[pos] | (buf[pos + 1] << 8) | (buf[pos + 2] << 16) | (buf[pos + 3] << 24)
  }

  private getI32(buf: Uint8Array, pos: number): number {
    const val = this.getU32(buf, pos)
    return u32ToI32(val >>> 0)
  }
}
