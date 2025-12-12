import { CompilerContext } from './CompilerContext'
import { 
  FunctionDef, 
  JSVarDef, 
  JSVarKindEnum,
  JSClosureVar,
  ARGUMENT_VAR_OFFSET,
  ARG_SCOPE_END,
  LabelSlot,
} from './FunctionDef'
import { Opcode, OPCODE_DEFS, JSAtom } from '../env'
import { BytecodeBuilder } from './BytecodeBuilder'
import { Compiler } from './Compiler'

// ============================================================================
// 常量定义 - 对应 QuickJS parser.c
// ============================================================================

/** JS 模式: 严格模式 */
const JS_MODE_STRICT = 0x01

/** JS 抛出错误类型 */
const JS_THROW_VAR_RO = 0      // 只读变量
const JS_THROW_VAR_REDECL = 1  // 变量重声明
const JS_THROW_VAR_UNINITIALIZED = 2 // 变量未初始化

// ============================================================================
// 代码上下文 - 对应 parser.c:CodeContext
// 
// QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:10006-10016
// ============================================================================

/**
 * CodeContext 用于遍历字节码中的指令
 */
interface CodeContext {
  bcBuf: Uint8Array      // 原始字节码缓冲区
  bcLen: number          // 字节码长度
  pos: number            // 当前位置
  lineNum: number        // 行号
  op: number             // 当前操作码
  idx: number            // 索引参数
  label: number          // 标签参数
  val: number            // 值参数
  atom: number           // atom 参数
}

/**
 * 变量解析器 - 对应 parser.c:resolve_variables
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:10456-10800
 * 
 * 该类负责将编译阶段生成的 scope 操作码转换为最终的字节码:
 * - OP_scope_get_var → OP_get_loc / OP_get_var_ref / OP_get_var
 * - OP_scope_put_var → OP_put_loc / OP_put_var_ref / OP_put_var
 * - OP_scope_make_ref → OP_make_loc_ref / OP_make_var_ref_ref / OP_make_var_ref
 * - OP_enter_scope / OP_leave_scope → 处理作用域
 */
export class VariableResolver {
  constructor(private context: CompilerContext) {}

  private get compiler(): Compiler {
    return this.context.compiler
  }

  // ============================================================================
  // 主入口方法 - 对应 parser.c:resolve_variables
  // 
  // QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:10456-10800
  // ============================================================================

  /**
   * 解析函数中的所有变量引用
   * 
   * 两遍扫描:
   * 1. 第一遍: 处理全局变量的运行时检查 (OP_check_define_var)
   * 2. 第二遍: 将 scope 操作码转换为最终操作码
   */
  resolve(fd: FunctionDef): void {
    const bc = fd.byteCode
    const bcBuf = bc.buffer
    const bcLen = bc.size
    
    // 创建输出缓冲区
    const bcOut = new BytecodeBuilder()
    
    // 第一遍: 添加全局变量定义检查 (仅用于全局变量模式)
    if (fd.isGlobalVar) {
      this.addGlobalVarChecks(fd, bcBuf, bcLen, bcOut)
    }
    
    // 第二遍: 解析 scope 变量
    this.resolvePass2(fd, bcBuf, bcLen, bcOut)
    
    // 用新字节码替换原字节码
    fd.byteCode = bcOut
  }

  // ============================================================================
  // 第一遍: 全局变量检查 - 对应 parser.c:10480-10540
  // ============================================================================

  /**
   * 添加全局变量定义检查
   * 
   * 在全局变量模式下，需要在运行时检查变量是否已定义
   */
  private addGlobalVarChecks(
    fd: FunctionDef,
    bcBuf: Uint8Array,
    bcLen: number,
    bcOut: BytecodeBuilder
  ): void {
    const isStrict = (fd.jsMode & JS_MODE_STRICT) !== 0
    
    // 遍历全局变量，添加检查指令
    for (let i = 0; i < fd.globalVarCount; i++) {
      const hf = fd.globalVars[i]
      const varName = hf.varName
      
      // 检查是否需要定义检查
      // 对于词法变量 (let/const) 和函数声明，需要检查
      if (hf.isLexical) {
        // let/const 变量需要检查是否重复定义
        bcOut.putU8(Opcode.OP_check_define_var)
        bcOut.putU32(varName)
        bcOut.putU8(hf.isConst ? 1 : 0) // flags: 1 = const
      } else if (hf.forceInit) {
        // 需要强制初始化的变量
        bcOut.putU8(Opcode.OP_check_define_var)
        bcOut.putU32(varName)
        bcOut.putU8(2) // flags: 2 = var
      }
    }
  }

  // ============================================================================
  // 第二遍: 解析 scope 变量 - 对应 parser.c:10540-10800
  // ============================================================================

  /**
   * 第二遍扫描: 将 scope 操作码转换为最终操作码
   */
  private resolvePass2(
    fd: FunctionDef,
    bcBuf: Uint8Array,
    bcLen: number,
    bcOut: BytecodeBuilder
  ): void {
    let pos = 0
    
    while (pos < bcLen) {
      const startPos = pos
      const op = bcBuf[pos++]
      const opDef = OPCODE_DEFS[op]
      
      if (!opDef) {
        // 未知操作码，直接复制
        bcOut.putU8(op)
        continue
      }
      
      // 根据操作码类型处理
      switch (op) {
        // === Scope 变量访问操作码 ===
        case Opcode.OP_scope_get_var:
        case Opcode.OP_scope_get_var_undef:
        case Opcode.OP_scope_get_var_checkthis:
        case Opcode.OP_scope_put_var:
        case Opcode.OP_scope_put_var_init:
        case Opcode.OP_scope_delete_var:
        case Opcode.OP_scope_get_ref:
        case Opcode.OP_scope_make_ref: {
          // 格式: OP atom:u32 scope:u16 [label:u32]
          const atom = this.getU32(bcBuf, pos)
          pos += 4
          const scopeLevel = this.getU16(bcBuf, pos)
          pos += 2
          
          // OP_scope_make_ref 有额外的 label
          let label = -1
          if (op === Opcode.OP_scope_make_ref) {
            label = this.getU32(bcBuf, pos)
            pos += 4
          }
          
          // 解析 scope 变量
          this.resolveScopeVar(fd, atom, scopeLevel, op, bcOut, bcBuf, label, startPos)
          break
        }
        
        // === Scope 私有字段操作码 ===
        case Opcode.OP_scope_get_private_field:
        case Opcode.OP_scope_get_private_field2:
        case Opcode.OP_scope_put_private_field:
        case Opcode.OP_scope_in_private_field: {
          // 格式: OP atom:u32 scope:u16
          const atom = this.getU32(bcBuf, pos)
          pos += 4
          const scopeLevel = this.getU16(bcBuf, pos)
          pos += 2
          
          // 解析私有字段
          this.resolveScopePrivateField(fd, atom, scopeLevel, op, bcOut)
          break
        }
        
        // === 作用域控制操作码 ===
        case Opcode.OP_enter_scope: {
          // 格式: OP scope:u16
          const scopeLevel = this.getU16(bcBuf, pos)
          pos += 2
          
          // enter_scope 在解析后可能被优化掉
          // 但我们仍然输出它以保持正确性
          bcOut.putU8(Opcode.OP_enter_scope)
          bcOut.putU16(scopeLevel)
          break
        }
        
        case Opcode.OP_leave_scope: {
          // 格式: OP scope:u16
          const scopeLevel = this.getU16(bcBuf, pos)
          pos += 2
          
          bcOut.putU8(Opcode.OP_leave_scope)
          bcOut.putU16(scopeLevel)
          break
        }
        
        // === 标签操作码 ===
        case Opcode.OP_label: {
          // 格式: OP label:u32
          const labelIdx = this.getU32(bcBuf, pos)
          pos += 4
          
          // 更新标签位置
          if (labelIdx >= 0 && labelIdx < fd.labelSlots.length) {
            fd.labelSlots[labelIdx].pos2 = bcOut.size
          }
          
          bcOut.putU8(Opcode.OP_label)
          bcOut.putU32(labelIdx)
          break
        }
        
        // === 其他操作码: 直接复制 ===
        default: {
          bcOut.putU8(op)
          
          // 根据操作码格式复制参数
          const opSize = opDef.size
          if (opSize > 1) {
            for (let i = 1; i < opSize; i++) {
              bcOut.putU8(bcBuf[pos++])
            }
          }
          break
        }
      }
    }
  }

  // ============================================================================
  // 核心方法: 解析 scope 变量 - 对应 parser.c:resolve_scope_var
  // 
  // QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:9148-9623
  // ============================================================================

  /**
   * 解析 scope 变量，将其转换为最终的访问操作码
   * 
   * 搜索顺序:
   * 1. 当前作用域的局部变量
   * 2. 当前函数的其他变量 (包括参数)
   * 3. 父函数的变量 (闭包)
   * 4. 全局变量
   */
  private resolveScopeVar(
    fd: FunctionDef,
    varName: number,
    scopeLevel: number,
    op: number,
    bcOut: BytecodeBuilder,
    bcBuf: Uint8Array,
    labelIdx: number,
    posInOriginal: number
  ): void {
    let varIdx = -1
    let isPseudoVar = false
    let labelDone = -1
    
    // 检查是否为伪变量 (this, new.target, home_object, this_active_func)
    isPseudoVar = (
      varName === JSAtom.JS_ATOM_home_object ||
      varName === JSAtom.JS_ATOM_this_active_func ||
      varName === JSAtom.JS_ATOM_new_target ||
      varName === JSAtom.JS_ATOM_this
    )
    
    // === 步骤1: 在当前词法作用域中查找 ===
    varIdx = this.findInLocalScope(fd, varName, scopeLevel, isPseudoVar)
    
    if (varIdx >= 0) {
      // 检查 const 赋值
      if (this.checkConstAssignment(fd, varIdx, varName, op, bcOut)) {
        return
      }
      
      // 生成局部变量访问代码
      this.emitLocalVarAccess(fd, varIdx, varName, op, bcOut)
      return
    }
    
    // === 步骤2: 在当前函数的非作用域变量中查找 ===
    varIdx = this.findInFunctionVars(fd, varName, isPseudoVar)
    
    if (varIdx >= 0) {
      if (this.checkConstAssignment(fd, varIdx, varName, op, bcOut)) {
        return
      }
      this.emitLocalVarAccess(fd, varIdx, varName, op, bcOut)
      return
    }
    
    // === 步骤3: 在父函数中查找 (闭包) ===
    const closureResult = this.findInParentScopes(fd, varName, scopeLevel, op, isPseudoVar)
    if (closureResult.found) {
      if (closureResult.varIdx >= 0) {
        this.emitClosureVarAccess(fd, closureResult.varIdx, varName, op, bcOut)
      }
      return
    }
    
    // === 步骤4: 全局变量访问 ===
    this.emitGlobalVarAccess(varName, op, bcOut)
  }

  // ============================================================================
  // 辅助方法: 在局部作用域中查找变量
  // ============================================================================

  /**
   * 在当前词法作用域中查找变量
   */
  private findInLocalScope(
    fd: FunctionDef,
    varName: number,
    scopeLevel: number,
    isPseudoVar: boolean
  ): number {
    // 遍历作用域链
    for (let idx = fd.scopes[scopeLevel]?.first ?? -1; idx >= 0;) {
      const vd = fd.vars[idx]
      
      if (vd.varName === varName) {
        return idx
      }
      
      // 注意: with 语句会在作用域中添加 _with_ 变量
      // 这里暂不处理 with 语句
      
      idx = vd.scopeNext
    }
    
    return -1
  }

  /**
   * 在当前函数的所有变量中查找
   */
  private findInFunctionVars(
    fd: FunctionDef,
    varName: number,
    isPseudoVar: boolean
  ): number {
    // 查找普通变量 (scope_level = 0)
    let varIdx = this.compiler.findVarByAtom(fd, varName)
    
    // 如果是伪变量且未找到，尝试解析
    if (varIdx < 0 && isPseudoVar) {
      varIdx = this.resolvePseudoVar(fd, varName)
    }
    
    // 检查 arguments
    if (varIdx < 0 && varName === JSAtom.JS_ATOM_arguments && fd.hasArgumentsBinding) {
      varIdx = this.compiler.addArgumentsVar(fd, varName)
    }
    
    // 函数表达式名称
    if (varIdx < 0 && fd.isFuncExpr && varName === fd.funcName) {
      varIdx = this.compiler.addFuncVar(fd, varName)
    }
    
    return varIdx
  }

  /**
   * 解析伪变量 - 对应 parser.c:resolve_pseudo_var
   */
  private resolvePseudoVar(fd: FunctionDef, varName: number): number {
    if (!fd.hasThisBinding) {
      return -1
    }
    
    let varIdx = -1
    
    switch (varName) {
      case JSAtom.JS_ATOM_home_object:
        if (fd.homeObjectVarIdx < 0) {
          fd.homeObjectVarIdx = this.compiler.addVar(fd, varName)
        }
        varIdx = fd.homeObjectVarIdx
        break
        
      case JSAtom.JS_ATOM_this_active_func:
        if (fd.thisActiveFuncVarIdx < 0) {
          fd.thisActiveFuncVarIdx = this.compiler.addVar(fd, varName)
        }
        varIdx = fd.thisActiveFuncVarIdx
        break
        
      case JSAtom.JS_ATOM_new_target:
        if (fd.newTargetVarIdx < 0) {
          fd.newTargetVarIdx = this.compiler.addVar(fd, varName)
        }
        varIdx = fd.newTargetVarIdx
        break
        
      case JSAtom.JS_ATOM_this:
        if (fd.thisVarIdx < 0) {
          fd.thisVarIdx = this.addVarThis(fd)
        }
        varIdx = fd.thisVarIdx
        break
    }
    
    return varIdx
  }

  /**
   * 添加 this 变量 - 对应 parser.c:add_var_this
   */
  private addVarThis(fd: FunctionDef): number {
    const idx = this.compiler.addVar(fd, JSAtom.JS_ATOM_this)
    if (idx >= 0 && fd.isDerivedClassConstructor) {
      const vd = fd.vars[idx]
      // 在派生类构造函数中，this 需要标记为词法变量
      // 用于触发 'uninitialized' 检查
      vd.isLexical = true
    }
    return idx
  }

  // ============================================================================
  // 辅助方法: 在父函数中查找变量 (闭包)
  // ============================================================================

  /**
   * 在父函数作用域中查找变量
   * 
   * 返回 { found: boolean, varIdx: number }
   * - found = true 表示已处理完成
   * - varIdx >= 0 表示找到了闭包变量索引
   */
  private findInParentScopes(
    fd: FunctionDef,
    varName: number,
    scopeLevel: number,
    op: number,
    isPseudoVar: boolean
  ): { found: boolean; varIdx: number } {
    let currentFd = fd
    let currentScopeLevel = scopeLevel
    let varIdx = -1
    let foundFd: FunctionDef | null = null
    
    // 遍历父函数链
    for (let parentFd = fd.parent; parentFd; ) {
      currentScopeLevel = currentFd.parentScopeLevel
      currentFd = parentFd
      
      // 在父函数的作用域中查找
      for (let idx = currentFd.scopes[currentScopeLevel]?.first ?? -1; idx >= 0;) {
        const vd = currentFd.vars[idx]
        
        if (vd.varName === varName) {
          varIdx = idx
          foundFd = currentFd
          break
        }
        
        idx = vd.scopeNext
      }
      
      if (varIdx >= 0) break
      
      // 在父函数的普通变量中查找
      varIdx = this.compiler.findVarByAtom(currentFd, varName)
      if (varIdx >= 0) {
        foundFd = currentFd
        break
      }
      
      // 伪变量
      if (isPseudoVar) {
        varIdx = this.resolvePseudoVar(currentFd, varName)
        if (varIdx >= 0) {
          foundFd = currentFd
          break
        }
      }
      
      // arguments
      if (varName === JSAtom.JS_ATOM_arguments && currentFd.hasArgumentsBinding) {
        varIdx = this.compiler.addArgumentsVar(currentFd, varName)
        foundFd = currentFd
        break
      }
      
      // 函数表达式名称
      if (currentFd.isFuncExpr && currentFd.funcName === varName) {
        varIdx = this.compiler.addFuncVar(currentFd, varName)
        foundFd = currentFd
        break
      }
      
      // eval 函数特殊处理
      if (currentFd.isEval) {
        break
      }
      
      parentFd = currentFd.parent
    }
    
    // 如果找到了变量，创建闭包引用
    if (varIdx >= 0 && foundFd && foundFd !== fd) {
      // 标记变量为被捕获
      if (varIdx & ARGUMENT_VAR_OFFSET) {
        foundFd.args[varIdx - ARGUMENT_VAR_OFFSET].isCaptured = true
        const closureIdx = this.compiler.getClosureVar(
          fd,
          foundFd,
          true,
          true,
          varIdx - ARGUMENT_VAR_OFFSET,
          varName,
          false,
          false,
          JSVarKindEnum.JS_VAR_NORMAL
        )
        return { found: true, varIdx: closureIdx }
      } else {
        const vd = foundFd.vars[varIdx]
        vd.isCaptured = true
        const closureIdx = this.compiler.getClosureVar(
          fd,
          foundFd,
          true,
          false,
          varIdx,
          varName,
          vd.isConst,
          vd.isLexical,
          vd.varKind
        )
        return { found: true, varIdx: closureIdx }
      }
    }
    
    return { found: false, varIdx: -1 }
  }

  // ============================================================================
  // 辅助方法: 检查 const 赋值
  // ============================================================================

  /**
   * 检查是否尝试给 const 变量赋值
   */
  private checkConstAssignment(
    fd: FunctionDef,
    varIdx: number,
    varName: number,
    op: number,
    bcOut: BytecodeBuilder
  ): boolean {
    const isPut = (op === Opcode.OP_scope_put_var || op === Opcode.OP_scope_make_ref)
    
    if (isPut && !(varIdx & ARGUMENT_VAR_OFFSET)) {
      const vd = fd.vars[varIdx]
      if (vd.isConst) {
        // 抛出只读错误
        bcOut.putU8(Opcode.OP_throw_error)
        bcOut.putU32(varName)
        bcOut.putU8(JS_THROW_VAR_RO)
        return true
      }
    }
    
    return false
  }

  // ============================================================================
  // 代码生成: 局部变量访问
  // ============================================================================

  /**
   * 生成局部变量访问代码
   */
  private emitLocalVarAccess(
    fd: FunctionDef,
    varIdx: number,
    varName: number,
    op: number,
    bcOut: BytecodeBuilder
  ): void {
    const isPut = (op === Opcode.OP_scope_put_var || op === Opcode.OP_scope_put_var_init)
    const isArg = (varIdx & ARGUMENT_VAR_OFFSET) !== 0
    const realIdx = isArg ? varIdx - ARGUMENT_VAR_OFFSET : varIdx
    
    switch (op) {
      case Opcode.OP_scope_make_ref: {
        // 创建引用
        if (isArg) {
          bcOut.putU8(Opcode.OP_make_arg_ref)
          bcOut.putU32(varName)
          bcOut.putU16(realIdx)
        } else {
          bcOut.putU8(Opcode.OP_make_loc_ref)
          bcOut.putU32(varName)
          bcOut.putU16(realIdx)
        }
        break
      }
      
      case Opcode.OP_scope_get_ref:
        bcOut.putU8(Opcode.OP_undefined)
        // fall through
      case Opcode.OP_scope_get_var_checkthis:
      case Opcode.OP_scope_get_var_undef:
      case Opcode.OP_scope_get_var:
      case Opcode.OP_scope_put_var:
      case Opcode.OP_scope_put_var_init: {
        if (isArg) {
          // 参数访问
          bcOut.putU8(isPut ? Opcode.OP_put_arg : Opcode.OP_get_arg)
          bcOut.putU16(realIdx)
        } else {
          // 局部变量访问
          const vd = fd.vars[realIdx]
          
          if (isPut) {
            if (vd.isLexical) {
              if (op === Opcode.OP_scope_put_var_init) {
                // this 只能初始化一次
                if (varName === JSAtom.JS_ATOM_this) {
                  bcOut.putU8(Opcode.OP_put_loc_check_init)
                } else {
                  bcOut.putU8(Opcode.OP_put_loc)
                }
              } else {
                bcOut.putU8(Opcode.OP_put_loc_check)
              }
            } else {
              bcOut.putU8(Opcode.OP_put_loc)
            }
          } else {
            if (vd.isLexical) {
              if (op === Opcode.OP_scope_get_var_checkthis) {
                bcOut.putU8(Opcode.OP_get_loc_checkthis)
              } else {
                bcOut.putU8(Opcode.OP_get_loc_check)
              }
            } else {
              bcOut.putU8(Opcode.OP_get_loc)
            }
          }
          bcOut.putU16(realIdx)
        }
        break
      }
      
      case Opcode.OP_scope_delete_var:
        // delete 局部变量始终返回 false
        bcOut.putU8(Opcode.OP_push_false)
        break
    }
  }

  // ============================================================================
  // 代码生成: 闭包变量访问
  // ============================================================================

  /**
   * 生成闭包变量访问代码
   */
  private emitClosureVarAccess(
    fd: FunctionDef,
    closureIdx: number,
    varName: number,
    op: number,
    bcOut: BytecodeBuilder
  ): void {
    const cv = fd.closureVar[closureIdx]
    const isPut = (op === Opcode.OP_scope_put_var || op === Opcode.OP_scope_put_var_init)
    
    // 检查 const 赋值
    if ((op === Opcode.OP_scope_put_var || op === Opcode.OP_scope_make_ref) && cv.isConst) {
      bcOut.putU8(Opcode.OP_throw_error)
      bcOut.putU32(varName)
      bcOut.putU8(JS_THROW_VAR_RO)
      return
    }
    
    switch (op) {
      case Opcode.OP_scope_make_ref: {
        // 创建闭包引用
        if (cv.varKind === JSVarKindEnum.JS_VAR_FUNCTION_NAME) {
          // 函数名特殊处理
          bcOut.putU8(Opcode.OP_object)
          bcOut.putU8(Opcode.OP_get_var_ref)
          bcOut.putU16(closureIdx)
          bcOut.putU8(Opcode.OP_define_field)
          bcOut.putU32(varName)
          bcOut.putU8(Opcode.OP_push_atom_value)
          bcOut.putU32(varName)
        } else {
          bcOut.putU8(Opcode.OP_make_var_ref_ref)
          bcOut.putU32(varName)
          bcOut.putU16(closureIdx)
        }
        break
      }
      
      case Opcode.OP_scope_get_ref:
        bcOut.putU8(Opcode.OP_undefined)
        // fall through
      case Opcode.OP_scope_get_var_undef:
      case Opcode.OP_scope_get_var:
      case Opcode.OP_scope_put_var:
      case Opcode.OP_scope_put_var_init: {
        if (isPut) {
          if (cv.isLexical) {
            if (op === Opcode.OP_scope_put_var_init) {
              if (varName === JSAtom.JS_ATOM_this) {
                bcOut.putU8(Opcode.OP_put_var_ref_check_init)
              } else {
                bcOut.putU8(Opcode.OP_put_var_ref)
              }
            } else {
              bcOut.putU8(Opcode.OP_put_var_ref_check)
            }
          } else {
            bcOut.putU8(Opcode.OP_put_var_ref)
          }
        } else {
          if (cv.isLexical) {
            bcOut.putU8(Opcode.OP_get_var_ref_check)
          } else {
            bcOut.putU8(Opcode.OP_get_var_ref)
          }
        }
        bcOut.putU16(closureIdx)
        break
      }
      
      case Opcode.OP_scope_delete_var:
        bcOut.putU8(Opcode.OP_push_false)
        break
    }
  }

  // ============================================================================
  // 代码生成: 全局变量访问
  // ============================================================================

  /**
   * 生成全局变量访问代码
   */
  private emitGlobalVarAccess(
    varName: number,
    op: number,
    bcOut: BytecodeBuilder
  ): void {
    switch (op) {
      case Opcode.OP_scope_make_ref:
        bcOut.putU8(Opcode.OP_make_var_ref)
        bcOut.putU32(varName)
        break
        
      case Opcode.OP_scope_get_ref:
        bcOut.putU8(Opcode.OP_undefined)
        bcOut.putU8(Opcode.OP_get_var)
        bcOut.putU32(varName)
        break
        
      case Opcode.OP_scope_get_var_undef:
        bcOut.putU8(Opcode.OP_get_var_undef)
        bcOut.putU32(varName)
        break
        
      case Opcode.OP_scope_get_var:
      case Opcode.OP_scope_get_var_checkthis:
        bcOut.putU8(Opcode.OP_get_var)
        bcOut.putU32(varName)
        break
        
      case Opcode.OP_scope_put_var:
        bcOut.putU8(Opcode.OP_put_var)
        bcOut.putU32(varName)
        break
        
      case Opcode.OP_scope_put_var_init:
        bcOut.putU8(Opcode.OP_put_var_init)
        bcOut.putU32(varName)
        break
        
      case Opcode.OP_scope_delete_var:
        bcOut.putU8(Opcode.OP_delete_var)
        bcOut.putU32(varName)
        break
    }
  }

  // ============================================================================
  // 私有字段解析 - 对应 parser.c:resolve_scope_private_field
  // 
  // QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:9723-9814
  // ============================================================================

  /**
   * 解析私有字段访问
   */
  private resolveScopePrivateField(
    fd: FunctionDef,
    varName: number,
    scopeLevel: number,
    op: number,
    bcOut: BytecodeBuilder
  ): void {
    // 查找私有字段
    const result = this.findPrivateField(fd, varName, scopeLevel)
    
    if (result.idx < 0) {
      throw new Error(`undefined private field '${varName}'`)
    }
    
    const { idx, isRef, varKind } = result
    
    switch (op) {
      case Opcode.OP_scope_get_private_field:
      case Opcode.OP_scope_get_private_field2: {
        switch (varKind) {
          case JSVarKindEnum.JS_VAR_PRIVATE_FIELD:
            if (op === Opcode.OP_scope_get_private_field2) {
              bcOut.putU8(Opcode.OP_dup)
            }
            this.emitGetLocOrRef(bcOut, isRef, idx)
            bcOut.putU8(Opcode.OP_get_private_field)
            break
            
          case JSVarKindEnum.JS_VAR_PRIVATE_METHOD:
            this.emitGetLocOrRef(bcOut, isRef, idx)
            bcOut.putU8(Opcode.OP_check_brand)
            if (op !== Opcode.OP_scope_get_private_field2) {
              bcOut.putU8(Opcode.OP_nip)
            }
            break
            
          case JSVarKindEnum.JS_VAR_PRIVATE_GETTER:
          case JSVarKindEnum.JS_VAR_PRIVATE_GETTER_SETTER:
            if (op === Opcode.OP_scope_get_private_field2) {
              bcOut.putU8(Opcode.OP_dup)
            }
            this.emitGetLocOrRef(bcOut, isRef, idx)
            bcOut.putU8(Opcode.OP_check_brand)
            bcOut.putU8(Opcode.OP_call_method)
            bcOut.putU16(0)
            break
            
          case JSVarKindEnum.JS_VAR_PRIVATE_SETTER:
            // 只有 setter 没有 getter，抛出错误
            bcOut.putU8(Opcode.OP_throw_error)
            bcOut.putU32(varName)
            bcOut.putU8(JS_THROW_VAR_RO)
            break
        }
        break
      }
      
      case Opcode.OP_scope_put_private_field: {
        switch (varKind) {
          case JSVarKindEnum.JS_VAR_PRIVATE_FIELD:
            this.emitGetLocOrRef(bcOut, isRef, idx)
            bcOut.putU8(Opcode.OP_put_private_field)
            break
            
          case JSVarKindEnum.JS_VAR_PRIVATE_METHOD:
          case JSVarKindEnum.JS_VAR_PRIVATE_GETTER:
            // 不能给私有方法或 getter 赋值
            bcOut.putU8(Opcode.OP_throw_error)
            bcOut.putU32(varName)
            bcOut.putU8(JS_THROW_VAR_RO)
            break
            
          case JSVarKindEnum.JS_VAR_PRIVATE_SETTER:
          case JSVarKindEnum.JS_VAR_PRIVATE_GETTER_SETTER:
            // 调用 setter
            this.emitGetLocOrRef(bcOut, isRef, idx)
            bcOut.putU8(Opcode.OP_swap)
            bcOut.putU8(Opcode.OP_rot3r)
            bcOut.putU8(Opcode.OP_check_brand)
            bcOut.putU8(Opcode.OP_rot3l)
            bcOut.putU8(Opcode.OP_call_method)
            bcOut.putU16(1)
            bcOut.putU8(Opcode.OP_drop)
            break
        }
        break
      }
      
      case Opcode.OP_scope_in_private_field:
        this.emitGetLocOrRef(bcOut, isRef, idx)
        bcOut.putU8(Opcode.OP_private_in)
        break
    }
  }

  /**
   * 查找私有字段
   */
  private findPrivateField(
    fd: FunctionDef,
    varName: number,
    scopeLevel: number
  ): { idx: number; isRef: boolean; varKind: JSVarKindEnum } {
    let currentFd = fd
    let currentScopeLevel = scopeLevel
    let isRef = false
    
    while (true) {
      // 在当前作用域中查找
      const idx = this.findPrivateClassFieldAll(currentFd, varName, currentScopeLevel)
      if (idx >= 0) {
        const varKind = currentFd.vars[idx].varKind
        
        // 如果需要闭包引用
        if (isRef && currentFd !== fd) {
          const closureIdx = this.compiler.getClosureVar(
            fd,
            currentFd,
            true,
            false,
            idx,
            varName,
            true,
            true,
            JSVarKindEnum.JS_VAR_NORMAL
          )
          return { idx: closureIdx, isRef: true, varKind }
        }
        
        return { idx, isRef, varKind }
      }
      
      // 向上查找父函数
      if (!currentFd.parent) {
        break
      }
      
      currentScopeLevel = currentFd.parentScopeLevel
      currentFd = currentFd.parent
      isRef = true
    }
    
    return { idx: -1, isRef: false, varKind: JSVarKindEnum.JS_VAR_NORMAL }
  }

  /**
   * 在所有作用域中查找私有类字段
   */
  private findPrivateClassFieldAll(
    fd: FunctionDef,
    varName: number,
    scopeLevel: number
  ): number {
    let idx = fd.scopes[scopeLevel]?.first ?? -1
    
    while (idx >= 0) {
      if (fd.vars[idx].varName === varName) {
        return idx
      }
      idx = fd.vars[idx].scopeNext
    }
    
    return -1
  }

  /**
   * 生成 get_loc 或 get_var_ref 指令
   */
  private emitGetLocOrRef(bcOut: BytecodeBuilder, isRef: boolean, idx: number): void {
    if (isRef) {
      bcOut.putU8(Opcode.OP_get_var_ref)
    } else {
      bcOut.putU8(Opcode.OP_get_loc)
    }
    bcOut.putU16(idx)
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
