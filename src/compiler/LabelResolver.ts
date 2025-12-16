import { CompilerContext } from './CompilerContext'
import { 
  FunctionDef, 
  LabelSlot,
  RelocEntry,
  LineNumberSlot,
  JumpSlot,
  JSVarKindEnum,
  JS_STACK_SIZE_MAX,
} from './FunctionDef'
import { 
  Opcode,
  TempOpcode,
  OPCODE_DEFS, 
  OPCODE_BY_CODE, 
  TEMP_OPCODE_BY_CODE,
  JSAtom, 
  OpFormat,
  SHORT_OPCODES,
  JS_MODE_STRICT_DEFAULT,
  OPSpecialObjectEnum,
} from '../env'
import { BytecodeBuilder } from './BytecodeBuilder'
import { Compiler } from './Compiler'

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

/** JS 模式: 严格模式 */
const JS_MODE_STRICT = JS_MODE_STRICT_DEFAULT

/** 特殊对象类型 - 从 env.ts 导入 */
const OP_SPECIAL_OBJECT_HOME_OBJECT = OPSpecialObjectEnum.OP_SPECIAL_OBJECT_HOME_OBJECT
const OP_SPECIAL_OBJECT_THIS_FUNC = OPSpecialObjectEnum.OP_SPECIAL_OBJECT_THIS_FUNC
const OP_SPECIAL_OBJECT_NEW_TARGET = OPSpecialObjectEnum.OP_SPECIAL_OBJECT_NEW_TARGET
const OP_SPECIAL_OBJECT_ARGUMENTS = OPSpecialObjectEnum.OP_SPECIAL_OBJECT_ARGUMENTS
const OP_SPECIAL_OBJECT_MAPPED_ARGUMENTS = OPSpecialObjectEnum.OP_SPECIAL_OBJECT_MAPPED_ARGUMENTS
const OP_SPECIAL_OBJECT_VAR_OBJECT = OPSpecialObjectEnum.OP_SPECIAL_OBJECT_VAR_OBJECT

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
  constructor(private context: CompilerContext) {}

  private get compiler(): Compiler {
    return this.context.compiler
  }

  /**
   * 查找 opcode 定义，支持临时 opcodes
   * 
   * 临时 opcodes (182-200) 只在编译阶段使用，最终会被移除或替换
   * 它们的值与短操作码重叠，所以需要根据上下文判断
   */
  private getOpcodeDef(op: number): { id: string; size: number; nPop: number; nPush: number; format: OpFormat } | undefined {
    // 检查是否是临时 opcode（182-200 范围）
    if (op >= 182 && op <= 200 && TEMP_OPCODE_BY_CODE[op]) {
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
    
    let lineNum = fd.sourcePos
    
    // 初始化跳转槽
    if (USE_SHORT_OPCODES && fd.jumpSize > 0) {
      fd.jumpSlots = new Array(fd.jumpSize)
      for (let i = 0; i < fd.jumpSize; i++) {
        fd.jumpSlots[i] = new JumpSlot()
      }
    }
    
    // 初始化行号槽
    if (fd.lineNumberSize > 0 && !fd.stripDebug) {
      fd.lineNumberSlots = new Array(fd.lineNumberSize)
      for (let i = 0; i < fd.lineNumberSize; i++) {
        fd.lineNumberSlots[i] = new LineNumberSlot()
      }
      fd.lineNumberLast = fd.sourcePos
      fd.lineNumberLastPc = 0
    }
    
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
        // === 行号信息 ===
        case TempOpcode.OP_line_num:
          lineNum = this.getU32(bcBuf, pos + 1)
          break
        
        // === 标签定义 ===
        case TempOpcode.OP_label: {
          const labelIdx = this.getU32(bcBuf, pos + 1)
          if (labelIdx >= 0 && labelIdx < fd.labelSlots.length) {
            const ls = fd.labelSlots[labelIdx]
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
            posNext = this.skipDeadCode(fd, bcBuf, bcLen, cc.pos, { lineNum })
            break
          }
          
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          this.putShortCode(bcOut, op, argc)
          break
        }
        
        // === 返回/抛出 - 死代码消除 ===
        case Opcode.OP_return:
        case Opcode.OP_return_undef:
        case Opcode.OP_return_async:
        case Opcode.OP_throw:
        case Opcode.OP_throw_error:
          posNext = this.skipDeadCode(fd, bcBuf, bcLen, posNext, { lineNum })
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
          bcOut.put(bcBuf.slice(pos, pos + len))
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
              posNext = this.skipDeadCode(fd, bcBuf, bcLen, posNext, { lineNum })
              break
            }
          }
          
          // 输出跳转指令
          this.emitJump(fd, bcOut, op, label, lineNum)
          posNext = this.skipDeadCode(fd, bcBuf, bcLen, posNext, { lineNum })
          break
        }
        
        // === gosub (用于 finally) ===
        case Opcode.OP_gosub: {
          const label = this.getU32(bcBuf, pos + 1)
          this.emitJump(fd, bcOut, op, label, lineNum)
          break
        }
        
        // === catch ===
        case Opcode.OP_catch: {
          const label = this.getU32(bcBuf, pos + 1)
          this.emitJump(fd, bcOut, op, label, lineNum)
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
                this.emitJump(fd, bcOut, newOp, label, lineNum)
                break
              }
            }
          }
          
          this.emitJump(fd, bcOut, op, label, lineNum)
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
          this.addPc2lineInfo(fd, bcOut.size, lineNum)
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
        
        // === 默认处理 ===
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
    
    // === 计算 pc2line 信息 ===
    this.computePc2lineInfo(fd)
    
    // === 替换字节码 ===
    fd.byteCode = bcOut
    fd.useShortOpcodes = true
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
      bcOut.putU8(OP_SPECIAL_OBJECT_HOME_OBJECT)
      this.putShortCode(bcOut, Opcode.OP_put_loc, fd.homeObjectVarIdx)
    }
    
    // this.active_func
    if (fd.thisActiveFuncVarIdx >= 0) {
      bcOut.putU8(Opcode.OP_special_object)
      bcOut.putU8(OP_SPECIAL_OBJECT_THIS_FUNC)
      this.putShortCode(bcOut, Opcode.OP_put_loc, fd.thisActiveFuncVarIdx)
    }
    
    // new.target
    if (fd.newTargetVarIdx >= 0) {
      bcOut.putU8(Opcode.OP_special_object)
      bcOut.putU8(OP_SPECIAL_OBJECT_NEW_TARGET)
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
      if ((fd.jsMode & JS_MODE_STRICT) !== 0 || !fd.hasSimpleParameterList) {
        bcOut.putU8(Opcode.OP_special_object)
        bcOut.putU8(OP_SPECIAL_OBJECT_ARGUMENTS)
      } else {
        bcOut.putU8(Opcode.OP_special_object)
        bcOut.putU8(OP_SPECIAL_OBJECT_MAPPED_ARGUMENTS)
      }
      if (fd.argumentsArgIdx >= 0) {
        this.putShortCode(bcOut, Opcode.OP_set_loc, fd.argumentsArgIdx)
      }
      this.putShortCode(bcOut, Opcode.OP_put_loc, fd.argumentsVarIdx)
    }
    
    // func_var (函数表达式名称)
    if (fd.funcVarIdx >= 0) {
      bcOut.putU8(Opcode.OP_special_object)
      bcOut.putU8(OP_SPECIAL_OBJECT_THIS_FUNC)
      this.putShortCode(bcOut, Opcode.OP_put_loc, fd.funcVarIdx)
    }
    
    // var_object (用于 eval)
    if (fd.varObjectIdx >= 0) {
      bcOut.putU8(Opcode.OP_special_object)
      bcOut.putU8(OP_SPECIAL_OBJECT_VAR_OBJECT)
      this.putShortCode(bcOut, Opcode.OP_put_loc, fd.varObjectIdx)
    }
    
    // arg_var_object (用于 eval 的参数作用域)
    if (fd.argVarObjectIdx >= 0) {
      bcOut.putU8(Opcode.OP_special_object)
      bcOut.putU8(OP_SPECIAL_OBJECT_VAR_OBJECT)
      this.putShortCode(bcOut, Opcode.OP_put_loc, fd.argVarObjectIdx)
    }
  }

  // ============================================================================
  // 辅助方法: 短操作码
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
        bcOut.putU16(val & 0xffff)
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
   */
  private emitJump(
    fd: FunctionDef,
    bcOut: BytecodeBuilder,
    op: number,
    label: number,
    lineNum: number
  ): void {
    if (label < 0 || label >= fd.labelSlots.length) {
      throw new Error(`Invalid label: ${label}`)
    }
    
    const ls = fd.labelSlots[label]
    this.addPc2lineInfo(fd, bcOut.size, lineNum)
    
    if (USE_SHORT_OPCODES) {
      // 尝试使用短跳转
      if (ls.addr === -1) {
        // 未解析: 使用 pos2 估计
        const diff = ls.pos2 - bcOut.size - 1
        if (diff >= -128 && diff <= 127 && 
            (op === Opcode.OP_if_false || op === Opcode.OP_if_true || op === Opcode.OP_goto)) {
          const shortOp = op === Opcode.OP_goto ? Opcode.OP_goto8 : Opcode.OP_if_false8 + (op - Opcode.OP_if_false)
          
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
      } else {
        // 已解析: 使用实际地址
        const diff = ls.addr - bcOut.size - 1
        if (diff >= -128 && diff <= 127 &&
            (op === Opcode.OP_if_false || op === Opcode.OP_if_true || op === Opcode.OP_goto)) {
          const shortOp = op === Opcode.OP_goto ? Opcode.OP_goto8 : Opcode.OP_if_false8 + (op - Opcode.OP_if_false)
          bcOut.putU8(shortOp)
          bcOut.putU8(diff & 0xff)
          return
        }
        if (diff >= -32768 && diff <= 32767 && op === Opcode.OP_goto) {
          bcOut.putU8(Opcode.OP_goto16)
          bcOut.putU16(diff & 0xffff)
          return
        }
      }
      
      // 记录跳转槽 - 长跳转使用 4 字节偏移
      if (fd.jumpCount < fd.jumpSlots.length) {
        const jp = fd.jumpSlots[fd.jumpCount]
        jp.op = op
        jp.size = 4
        jp.pos = bcOut.size + 1
        jp.label = label
        fd.jumpCount++
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
  private addReloc(fd: FunctionDef, ls: LabelSlot, addr: number, size: number): void {
    const re = new RelocEntry()
    re.addr = addr
    re.size = size
    re.next = ls.firstReloc
    ls.firstReloc = re
  }

  /**
   * 解析重定位条目
   */
  private resolveRelocations(fd: FunctionDef, ls: LabelSlot, bcOut: BytecodeBuilder): void {
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
      if (expected === op) {
        matched = true
      } else if (expected > 255) {
        // M2/M3/M4 编码的多个操作码
        if (op === (expected & 0xFF) ||
            op === ((expected >> 8) & 0xFF) ||
            op === ((expected >> 16) & 0xFF) ||
            op === ((expected >> 24) & 0xFF)) {
          matched = true
        }
      }
      
      if (!matched) return false
      
      cc.op = op
      
      // 根据操作码格式读取参数，并可能与 pattern 中的下一个值匹配
      const posNext = pos + opDef.size
      
      switch (opDef.format) {
        case OpFormat.u8:
        case OpFormat.loc8: {
          const idx = cc.bcBuf[pos + 1]
          cc.idx = idx
          // 检查是否需要匹配参数值
          if (i < pattern.length && pattern[i] !== -1) {
            const expectedArg = pattern[i]
            if (expectedArg >= 0) {
              // 正数：需要精确匹配
              if (idx !== expectedArg) return false
              i++
            }
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
          // 检查是否需要匹配参数值
          if (i < pattern.length && pattern[i] !== -1) {
            const expectedArg = pattern[i]
            if (expectedArg >= 0) {
              // 正数：需要精确匹配
              if (idx !== expectedArg) return false
              i++
            }
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
    if (fd.lineNumberSlots && 
        fd.lineNumberCount < fd.lineNumberSize &&
        pc >= fd.lineNumberLastPc && 
        sourcePos !== fd.lineNumberLast) {
      fd.lineNumberSlots[fd.lineNumberCount] = new LineNumberSlot()
      fd.lineNumberSlots[fd.lineNumberCount].pc = pc
      fd.lineNumberSlots[fd.lineNumberCount].sourcePos = sourcePos
      fd.lineNumberCount++
      fd.lineNumberLastPc = pc
      fd.lineNumberLast = sourcePos
    }
  }

  /**
   * 计算 pc2line 信息 - 对应 parser.c:compute_pc2line_info
   */
  private computePc2lineInfo(fd: FunctionDef): void {
    // TODO: 实现完整的 pc2line 计算
    // 这需要源码位置信息的支持
  }

  // ============================================================================
  // 辅助方法: 短跳转优化 (第二遍)
  // ============================================================================

  /**
   * 优化短跳转 - 对应 parser.c 中的 SHORT_OPCODES 优化
   * 
   * 注意：短跳转和中等跳转已经在 emitJump 中通过 addReloc + resolveRelocations 处理。
   * 这个函数只处理在 emitJump 中被标记为 size=4 的长跳转，它们不能通过
   * resolveRelocations 处理，因为需要在知道所有标签地址后才能决定是否可以缩短。
   */
  private optimizeShortJumps(fd: FunctionDef, bcOut: BytecodeBuilder): void {
    if (!fd.jumpSlots || fd.jumpCount === 0) return
    
    // 只处理长跳转 (size=4) 的重定位
    // 短跳转 (size=1) 和中等跳转 (size=2) 已经通过 addReloc + resolveRelocations 处理
    for (let j = 0; j < fd.jumpCount; j++) {
      const jp = fd.jumpSlots[j]
      
      // 只处理长跳转
      if (jp.size !== 4) continue
      
      const ls = fd.labelSlots[jp.label]
      const diff = ls.addr - jp.pos
      const buf = bcOut.buffer
      
      buf[jp.pos] = diff & 0xff
      buf[jp.pos + 1] = (diff >> 8) & 0xff
      buf[jp.pos + 2] = (diff >> 16) & 0xff
      buf[jp.pos + 3] = (diff >> 24) & 0xff
    }
    
    // TODO: 尝试将长跳转优化为短跳转（需要收缩字节码）
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
  }

  // ============================================================================
  // 字节码读取辅助方法
  // ============================================================================

  private getU8(buf: Uint8Array, pos: number): number {
    return buf[pos]
  }

  private getU16(buf: Uint8Array, pos: number): number {
    return buf[pos] | (buf[pos + 1] << 8)
  }

  private getU32(buf: Uint8Array, pos: number): number {
    return buf[pos] | (buf[pos + 1] << 8) | (buf[pos + 2] << 16) | (buf[pos + 3] << 24)
  }

  private getI32(buf: Uint8Array, pos: number): number {
    const val = this.getU32(buf, pos)
    return val > 0x7FFFFFFF ? val - 0x100000000 : val
  }
}
