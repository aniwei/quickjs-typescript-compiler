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
      const opDef = this.getOpcodeDef(op)
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
          lineNum = this.getU32(bcBuf, pos + 1)
          break
        
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
            // QuickJS 在 pass2（resolve_variables）里设置：
            //   third_party/QuickJS/src/core/parser.c: case OP_label: ls->pos2 = bc_out.size + opcode_info[op].size;
            // 注意：这里的 bc_out 是 pass2 输出缓冲；我们在 resolve_labels 里没有独立的 pass2，
            // 因此用当前 bcOut.size 来等价模拟。
            // 另外：OP_label 本身不会输出到 bcOut，但它在输入字节码里占用 5 bytes（1 + u32 label）。
            ls.pos2 = bcOut.size + len
            
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
          }
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          bcOut.putU8(op)
          break
        
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
          }
          
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          this.pushShortInt(bcOut, val)
          break
        }
        
        // === get_loc 优化 ===
        case Opcode.OP_get_loc: {
          const idx = this.getU16(bcBuf, pos + 1)
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          this.putShortCode(bcOut, op, idx)
          break
        }
        
        // === put_loc 优化 ===
        case Opcode.OP_put_loc:
        case Opcode.OP_put_arg:
        case Opcode.OP_put_var_ref: {
          const idx = this.getU16(bcBuf, pos + 1)
          
          if (OPTIMIZE) {
            // put_x(n) get_x(n) → set_x(n)
            if (this.codeMatch(cc, posNext, [op - 1, idx, -1])) {
              if (cc.lineNum >= 0) lineNum = cc.lineNum
              this.addPc2lineInfo(fd, bcOut.size, lineNum)
              this.putShortCode(bcOut, op + 1, idx) // set_x
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
                this.addPc2lineInfo(fd, bcOut.size, lineNum)
                this.putShortCode(bcOut, nextOp, idx)
                posNext = cc.pos
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
            if (fd.jumpCount < fd.jumpSlots.length) {
              const jp = fd.jumpSlots[fd.jumpCount]
              jp.op = shortOp
              jp.size = 1
              jp.pos = bcOut.size + 1  // 偏移位置
              jp.label = label
              fd.jumpCount++
            }
            
            bcOut.putU8(shortOp)
            bcOut.putU8(0)
            this.addReloc(fd, ls, bcOut.size - 1, 1)
            return
          }
          if (diff >= -32768 && diff <= 32767 && op === Opcode.OP_goto) {
            // 记录跳转槽 - 中等跳转使用 2 字节偏移
            if (fd.jumpCount < fd.jumpSlots.length) {
              const jp = fd.jumpSlots[fd.jumpCount]
              jp.op = Opcode.OP_goto16
              jp.size = 2
              jp.pos = bcOut.size + 1
              jp.label = label
              fd.jumpCount++
            }
            
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
          if (fd.jumpCount < fd.jumpSlots.length) {
            const jp = fd.jumpSlots[fd.jumpCount]
            jp.op = shortOp
            jp.size = 1
            jp.pos = bcOut.size + 1
            jp.label = label
            fd.jumpCount++
          }

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
          if (fd.jumpCount < fd.jumpSlots.length) {
            const jp = fd.jumpSlots[fd.jumpCount]
            jp.op = Opcode.OP_goto16
            jp.size = 2
            jp.pos = bcOut.size + 1
            jp.label = label
            fd.jumpCount++
          }

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
      if (fd.jumpCount < fd.jumpSlots.length) {
        const jp = fd.jumpSlots[fd.jumpCount]
        jp.op = op
        jp.size = 4
        jp.pos = bcOut.size + 1
        jp.label = label
        fd.jumpCount++
        
        if (process.env.DEBUG_JUMP) {
          console.log(`[emitJump] Recorded LONG jump: op=0x${op.toString(16)}, size=4, pos=${jp.pos}, label=${label}`)
        }
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
      
      if (op === TempOpcode.OP_line_num) {
        state.lineNum = this.getU32(bcBuf, pos + 1)
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
        if (op === TempOpcode.OP_line_num) {
          lineNum = this.getU32(cc.bcBuf, pos + 1)
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
          cc.label = this.getU32(cc.bcBuf, pos + 1)
          break
        }
        case OpFormat.atom: {
          cc.atom = this.getU32(cc.bcBuf, pos + 1)
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
