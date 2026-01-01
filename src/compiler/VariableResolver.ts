import { CompilerContext } from './CompilerContext'
import { 
  FunctionDef, 
  JSVarKindEnum,
  ARGUMENT_VAR_OFFSET,
  ARG_SCOPE_END,
} from './FunctionDef'
import {
  Opcode,
  TempOpcode,
  OPCODE_BY_CODE,
  TEMP_OPCODE_BY_CODE,
  JSAtom,
  JSMode,
  TEMP_OPCODE_MIN,
  TEMP_OPCODE_MAX,
  DEFINE_GLOBAL_LEX_VAR,
  DEFINE_GLOBAL_FUNC_VAR,
  JS_PROP_CONFIGURABLE,
  JS_PROP_WRITABLE,
  JS_EVAL_TYPE_GLOBAL,
  JS_THROW_VAR_RO,
} from '../env'
import { BytecodeBuilder } from './BytecodeBuilder'
import { Compiler } from './Compiler'

// ============================================================================
// 代码上下文 - 对应 parser.c:CodeContext
// 
// QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:10006-10016
// ============================================================================

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

  /**
   * 查找 opcode 定义，支持临时 opcodes
   */
  private getOpcodeDef(op: number) {
    // 检查是否是临时 opcode（182-200 范围）
    if (op >= TEMP_OPCODE_MIN && op <= TEMP_OPCODE_MAX && TEMP_OPCODE_BY_CODE[op]) {
      return TEMP_OPCODE_BY_CODE[op]
    }
    return OPCODE_BY_CODE[op]
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
    
    // 重置优化状态
    this.optimizedLabels = undefined
    this.skipNextGetRefValue = false
    
    // === 预先设置特殊变量索引 ===
    // 对应 parser.c:9863-9873 (add_eval_variables)
    // 这些变量需要在 resolve_variables 开始时就设置，
    // 因为 resolve_labels 会在开始处生成初始化代码
    this.addSpecialVariables(fd)
    
    // 创建输出缓冲区
    const bcOut = new BytecodeBuilder()
    
    // 第一遍: 添加全局变量定义检查 (仅用于 script/eval global 模式)
    // 对于 module，QuickJS 不会在函数体开头注入这些全局 define checks。
    if (fd.isGlobalVar && fd.module == null) {
      this.addGlobalVarChecks(fd, bcOut)
    }
    
    // 第二遍: 解析 scope 变量
    this.resolvePass2(fd, bcBuf, bcLen, bcOut)
    
    // 用新字节码替换原字节码
    fd.byteCode = bcOut
  }

  /**
   * 文档兼容入口：对应 TRANSPILATION_SPEC.md 中的 `resolveVariables()`。
   * 实际实现为 `resolve()`。
   */
  resolveVariables(fd: FunctionDef): void {
    this.resolve(fd)
  }

  /**
   * 预先添加特殊变量 - 对应 parser.c:add_eval_variables
   * 
   * 注意: 这个函数只在函数包含 eval 调用时才被调用！
   * 对于普通函数，特殊变量是在解析变量引用时按需创建的。
   * 
   * 对应 parser.c:12477-12479:
   *   if (fd->has_eval_call)
   *     add_eval_variables(ctx, fd);
   */
  private addSpecialVariables(fd: FunctionDef): void {
    // 只有当函数包含 eval 调用时，才需要预先创建这些变量
    // 对应 parser.c:12477-12479
    if (!fd.hasEvalCall) {
      return
    }

    // 对齐 QuickJS：add_eval_variables() 会在 resolve_variables 开始前确保 eval 相关的
    // “伪变量”(var_object/this/new.target/arguments/func_name...) 已创建。
    // 这会影响 local var index 的顺序，从而影响 byte-for-byte 输出。
    this.ensureEvalSpecialVars(fd)

    // eval 可以潜在访问所有外层函数的变量，因此需要把外层变量全部放入闭包。
    // 对齐 QuickJS: add_eval_variables() 中的 “eval can use all the variables of the enclosing functions”
    // third_party/QuickJS/src/core/parser.c:9932-10045
    this.addEvalClosureVariables(fd)
  }


  /**
   * 对齐 QuickJS：为含 direct eval 的函数创建必要的“伪变量”，但不做闭包变量预填充。
   *
   * 重要：该逻辑也会在子函数的 add_eval_variables 流程中对父函数调用，因此必须保证
   * 创建顺序稳定且与 QuickJS 一致。
   */
  private ensureEvalSpecialVars(fd: FunctionDef): void {
    if (!fd.hasEvalCall) return

    // 在非严格模式的非 eval 代码中，direct eval 可能需要 var object。
    // 对齐 QuickJS: add_eval_variables() (parser.c:9863-9871)
    if (!fd.isEval && (fd.jsMode & JSMode.JS_MODE_STRICT) === 0) {
      if (fd.varObjectIdx < 0) {
        fd.varObjectIdx = this.compiler.addVar(fd, JSAtom.JS_ATOM__var_)
      }
      if (fd.hasParameterExpressions && fd.argVarObjectIdx < 0) {
        fd.argVarObjectIdx = this.compiler.addVar(fd, JSAtom.JS_ATOM__arg_var_)
      }
    }

    // 处理 this 绑定相关的特殊变量
    // 对应 parser.c:9863-9873
    if (fd.hasThisBinding) {
      if (fd.thisVarIdx < 0) {
        fd.thisVarIdx = this.addVarThis(fd)
      }

      if (fd.newTargetVarIdx < 0) {
        fd.newTargetVarIdx = this.compiler.addVar(fd, JSAtom.JS_ATOM_new_target)
      }

      if (fd.isDerivedClassConstructor && fd.thisActiveFuncVarIdx < 0) {
        fd.thisActiveFuncVarIdx = this.compiler.addVar(fd, JSAtom.JS_ATOM_this_active_func)
      }

      if (fd.hasHomeObject && fd.homeObjectVarIdx < 0) {
        fd.homeObjectVarIdx = this.compiler.addVar(fd, JSAtom.JS_ATOM_home_object)
      }
    }

    // 处理 arguments 绑定
    // 对应 parser.c:9874-9881
    if (fd.hasArgumentsBinding && fd.argumentsVarIdx < 0) {
      this.addArgumentsVar(fd)
    }

    // 函数表达式名称
    // 对应 parser.c:9882-9883
    if (fd.isFuncExpr && fd.funcName !== 0) {
      if (fd.funcVarIdx < 0) {
        fd.funcVarIdx = this.compiler.addFuncVar(fd, fd.funcName)
      }
    }
  }


  /**
   * 当函数包含 direct eval 时，预先把所有外层变量放入当前函数的 closure vars。
   * 这会影响 closureVar 列表的内容与顺序，必须在 resolvePass2 之前完成。
   */
  private addEvalClosureVariables(fd: FunctionDef): void {
    if (!fd.hasEvalCall) return

    // QuickJS: add_eval_variables 仅在 eval / closure_var_count==0 时构造整套 closure vars。
    // 我们这里尽量对齐顺序：先按 scope 链添加 lexical vars，再按规则添加 unscoped vars/args。

    let hasThisBinding = fd.hasThisBinding
    let hasArgumentsBinding = fd.hasArgumentsBinding

    let childFd: FunctionDef = fd
    for (;;) {
      const parent = childFd.parent
      if (!parent) break

      const scopeLevel = childFd.parentScopeLevel
      const parentFd = parent

      // 对齐 QuickJS：如果父函数本身也包含 direct eval，它在解析时已经创建了 eval 相关变量。
      // 我们在 resolve 阶段补齐，以便子函数的 add_eval_variables 能捕获到这些变量。
      if (parentFd.hasEvalCall) {
        // 重要：不要在这里“提前”只创建 arguments，而跳过 this/new.target，否则会导致
        // 父函数的 local var index 顺序与 QuickJS 不一致（例如 test_with 的 prologue put_loc8）。
        this.ensureEvalSpecialVars(parentFd)
        if (
          parentFd.hasParameterExpressions &&
          (parentFd.jsMode & JSMode.JS_MODE_STRICT) === 0
        ) {
          this.compiler.addArgumentsArg(parentFd, JSAtom.JS_ATOM_arguments)
        }
      }

      // 对齐 QuickJS：把必要的 this/arguments/function-name 变量补齐到父函数
      if (!hasThisBinding && parentFd.hasThisBinding) {
        if (parentFd.thisVarIdx < 0) {
          parentFd.thisVarIdx = this.addVarThis(parentFd)
        }
        if (parentFd.newTargetVarIdx < 0) {
          parentFd.newTargetVarIdx = this.compiler.addVar(parentFd, JSAtom.JS_ATOM_new_target)
        }
        if (parentFd.isDerivedClassConstructor && parentFd.thisActiveFuncVarIdx < 0) {
          parentFd.thisActiveFuncVarIdx = this.compiler.addVar(parentFd, JSAtom.JS_ATOM_this_active_func)
        }
        if (parentFd.hasHomeObject && parentFd.homeObjectVarIdx < 0) {
          parentFd.homeObjectVarIdx = this.compiler.addVar(parentFd, JSAtom.JS_ATOM_home_object)
        }
        hasThisBinding = true
      }

      if (!hasArgumentsBinding && parentFd.hasArgumentsBinding) {
        if (parentFd.argumentsVarIdx < 0) {
          this.addArgumentsVar(parentFd)
        }
        hasArgumentsBinding = true
      }

      if (parentFd.isFuncExpr && parentFd.funcName !== 0) {
        // add_func_var
        this.compiler.addFuncVar(parentFd, parentFd.funcName)
      }

      // 1) add lexical variables (ordered by scope)
      let scopeIdx = parentFd.scopes[scopeLevel]?.first ?? -1
      while (scopeIdx >= 0) {
        const vd = parentFd.vars[scopeIdx]
        // 对齐 QuickJS: add_eval_variables() 会把父函数当前 scope 的 lexical vars
        // 标记为 captured（vd->is_captured = 1），以便在 leave_scope 时生成 OP_close_loc。
        // 这对于 eval 在子函数中创建闭包、但捕获外层 let/const（例如 for(let i) + eval）是必须的。
        vd.isCaptured = true
        this.compiler.getClosureVar(
          fd,
          parentFd,
          true,
          false,
          scopeIdx,
          vd.varName,
          vd.isConst,
          vd.isLexical,
          vd.varKind
        )
        scopeIdx = vd.scopeNext
      }
      const isArgScope = scopeIdx === ARG_SCOPE_END

      // 2) add unscoped variables
      const isVarInArgScope = (vd: any): boolean => {
        return (
          vd.varName === JSAtom.JS_ATOM_home_object ||
          vd.varName === JSAtom.JS_ATOM_this_active_func ||
          vd.varName === JSAtom.JS_ATOM_new_target ||
          vd.varName === JSAtom.JS_ATOM_this ||
          vd.varName === JSAtom.JS_ATOM__arg_var_ ||
          vd.varKind === JSVarKindEnum.JS_VAR_FUNCTION_NAME
        )
      }

      if (!isArgScope) {
        // args
        for (let i = 0; i < parentFd.argCount; i++) {
          const av: any = parentFd.args[i]
          if (av && av.varName && av.varName !== 0) {
            this.compiler.getClosureVar(
              fd,
              parentFd,
              true,
              true,
              i,
              av.varName,
              false,
              !!av.isLexical,
              JSVarKindEnum.JS_VAR_NORMAL
            )
          }
        }

        for (let i = 0; i < parentFd.varCount; i++) {
          const vd: any = parentFd.vars[i]
          if (
            vd &&
            vd.scopeLevel === 0 &&
            vd.varName !== JSAtom.JS_ATOM__ret_ &&
            vd.varName !== 0
          ) {
            this.compiler.getClosureVar(
              fd,
              parentFd,
              true,
              false,
              i,
              vd.varName,
              false,
              !!vd.isLexical,
              JSVarKindEnum.JS_VAR_NORMAL
            )
          }
        }
      } else {
        for (let i = 0; i < parentFd.varCount; i++) {
          const vd: any = parentFd.vars[i]
          if (vd && vd.scopeLevel === 0 && isVarInArgScope(vd)) {
            this.compiler.getClosureVar(
              fd,
              parentFd,
              true,
              false,
              i,
              vd.varName,
              false,
              !!vd.isLexical,
              JSVarKindEnum.JS_VAR_NORMAL
            )
          }
        }
      }

      // 3) if parent is eval: copy its direct eval closure vars
      if (parentFd.isEval) {
        for (let i = 0; i < parentFd.closureVarCount; i++) {
          const cv: any = parentFd.closureVar[i]
          this.compiler.getClosureVar(
            fd,
            parentFd,
            false,
            !!cv.isArg,
            i,
            cv.varName,
            !!cv.isConst,
            !!cv.isLexical,
            cv.varKind
          )
        }
      }

      childFd = parentFd
    }
  }

  private getWithScopeOpcode(op: number): number | null {
    // 对齐 QuickJS: get_with_scope_opcode() (parser.c:8956-8963)
    switch (op) {
      case TempOpcode.OP_scope_get_ref:
        return Opcode.OP_with_get_ref
      case TempOpcode.OP_scope_make_ref:
        return Opcode.OP_with_make_ref
      case TempOpcode.OP_scope_put_var:
        return Opcode.OP_with_put_var
      case TempOpcode.OP_scope_delete_var:
        return Opcode.OP_with_delete_var
      case TempOpcode.OP_scope_get_var:
      case TempOpcode.OP_scope_get_var_undef:
      case TempOpcode.OP_scope_get_var_checkthis:
        return Opcode.OP_with_get_var
      default:
        // OP_scope_put_var_init 不会用于 with/var object
        return null
    }
  }

  private emitVarObjectTest(
    fd: FunctionDef,
    varName: number,
    op: number,
    bcOut: BytecodeBuilder,
    labelDoneRef: { value: number },
    isWith: number
  ): void {
    const withOp = this.getWithScopeOpcode(op)
    if (withOp == null) return

    if (labelDoneRef.value < 0) {
      labelDoneRef.value = this.compiler.newLabelInt(fd)
    }

    // update_label(s, label_done, 1)
    this.compiler.updateLabel(fd, labelDoneRef.value, 1)

    // with_xxx atom:u32 label:u32 is_with:u8
    bcOut.putU8(withOp)
    bcOut.putU32(varName)
    bcOut.putU32(labelDoneRef.value)
    bcOut.putU8(isWith)
  }

  /**
   * 添加 arguments 变量 - 对应 parser.c:add_arguments_var
   */
  private addArgumentsVar(fd: FunctionDef): void {
    // 添加 arguments 变量
    fd.argumentsVarIdx = this.compiler.addVar(fd, JSAtom.JS_ATOM_arguments)
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
    bcOut: BytecodeBuilder
  ): void {
    // 遍历全局变量，添加检查指令
    // 对应 parser.c:10458-10502
    for (let i = 0; i < fd.globalVarCount; i++) {
      const hf = fd.globalVars[i]
      const varName = hf.varName
      
      // 构造标志位
      let flags = 0
      if (hf.isLexical) {
        flags |= DEFINE_GLOBAL_LEX_VAR  // 0x80
      }
      if (hf.cpoolIdx >= 0) {
        flags |= DEFINE_GLOBAL_FUNC_VAR  // 0x40
      }
      
      // 发射 check_define_var
      bcOut.putU8(Opcode.OP_check_define_var)
      bcOut.putU32(varName)
      bcOut.putU8(flags)
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
      const opDef = this.getOpcodeDef(op)
      
      if (!opDef) {
        // 未知操作码，直接复制
        bcOut.putU8(op)
        continue
      }
      
      // 根据操作码类型处理
      switch (op) {
        // === Scope 变量访问操作码 ===
        case TempOpcode.OP_scope_get_var:
        case TempOpcode.OP_scope_get_var_undef:
        case TempOpcode.OP_scope_get_var_checkthis:
        case TempOpcode.OP_scope_put_var:
        case TempOpcode.OP_scope_put_var_init:
        case TempOpcode.OP_scope_delete_var:
        case TempOpcode.OP_scope_get_ref:
        case TempOpcode.OP_scope_make_ref: {
          // OP_scope_make_ref 格式: OP atom:u32 label:u32 scope:u16
          // 其他 scope 操作码格式: OP atom:u32 scope:u16
          const atom = this.getU32(bcBuf, pos)
          pos += 4
          
          let label = -1
          if (op === TempOpcode.OP_scope_make_ref) {
            // OP_scope_make_ref 的 label 在 atom 之后
            label = this.getU32(bcBuf, pos)
            pos += 4
          }
          
          const scopeLevel = this.getU16(bcBuf, pos)
          pos += 2
          
          // 解析 scope 变量
            this.resolveScopeVar(fd, atom, scopeLevel, op, bcOut, bcBuf, label)
          break
        }
        
        // === Scope 私有字段操作码 ===
        case TempOpcode.OP_scope_get_private_field:
        case TempOpcode.OP_scope_get_private_field2:
        case TempOpcode.OP_scope_put_private_field:
        case TempOpcode.OP_scope_in_private_field: {
          // 格式: OP atom:u32 scope:u16
          const atom = this.getU32(bcBuf, pos)
          pos += 4
          const scopeLevel = this.getU16(bcBuf, pos)
          pos += 2
          
          // 解析私有字段
          this.resolveScopePrivateField(fd, atom, scopeLevel, op, bcOut, startPos)
          break
        }
        
        // === OP_eval 操作码 - 对应 parser.c:10519-10527 ===
        case Opcode.OP_eval: {
          // 格式: OP call_argc:u16 scope:u16
          const callArgc = this.getU16(bcBuf, pos)
          pos += 2
          const scope = this.getU16(bcBuf, pos)
          pos += 2
          
          // 标记 eval 捕获的变量
          this.markEvalCapturedVariables(fd, scope)
          
          // 发射转换后的 OP_eval
          bcOut.putU8(Opcode.OP_eval)
          bcOut.putU16(callArgc)
          // 转换 scope 索引为调整后的变量索引
          const firstVarIdx = (fd.scopes[scope]?.first ?? -1) - ARG_SCOPE_END
          bcOut.putU16(firstVarIdx)
          break
        }
        
        // === OP_apply_eval 操作码 - 对应 parser.c:10528-10531 ===
        case Opcode.OP_apply_eval: {
          // 格式: OP scope:u16
          const scope = this.getU16(bcBuf, pos)
          pos += 2
          
          // 标记 eval 捕获的变量
          this.markEvalCapturedVariables(fd, scope)
          
          // 发射转换后的 OP_apply_eval
          bcOut.putU8(Opcode.OP_apply_eval)
          // 转换 scope 索引为调整后的变量索引
          const firstVarIdx = (fd.scopes[scope]?.first ?? -1) - ARG_SCOPE_END
          bcOut.putU16(firstVarIdx)
          break
        }
        
        // === 作用域控制操作码 ===
        case TempOpcode.OP_enter_scope: {
          // 格式: OP scope:u16
          // 对应 QuickJS parser.c:10691-10722
          const scope = this.getU16(bcBuf, pos)
          pos += 2
          
          // 如果是 body_scope，实例化提升的定义
          if (scope === fd.bodyScope) {
            this.instantiateHoistedDefinitions(fd, bcOut)
          }
          
          // 遍历当前作用域的变量，初始化它们
          let scopeIdx = fd.scopes[scope]?.first ?? -1
          while (scopeIdx >= 0) {
            const vd = fd.vars[scopeIdx]
            if (vd.scopeLevel === scope) {
              // 跳过 arguments 参数
              if (scopeIdx !== fd.argumentsArgIdx) {
                if (vd.varKind === JSVarKindEnum.JS_VAR_FUNCTION_DECL ||
                    vd.varKind === JSVarKindEnum.JS_VAR_NEW_FUNCTION_DECL) {
                  // 函数声明: 用 fclosure 初始化
                  bcOut.putU8(Opcode.OP_fclosure)
                  bcOut.putU32(vd.funcPoolIdx)
                  bcOut.putU8(Opcode.OP_put_loc)
                  bcOut.putU16(scopeIdx)
                } else {
                  // 其他词法变量: 标记为未初始化
                  // 但 catch 绑定变量会在异常入口立即初始化（put_loc），不需要 TDZ 标记。
                  if (vd.varKind !== JSVarKindEnum.JS_VAR_CATCH) {
                    bcOut.putU8(Opcode.OP_set_loc_uninitialized)
                    bcOut.putU16(scopeIdx)
                  }
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
          // 格式: OP scope:u16
          // 对应 QuickJS parser.c:10723-10738
          const scope = this.getU16(bcBuf, pos)
          pos += 2
          
          // 遍历当前作用域的变量，关闭被捕获的变量
          let scopeIdx = fd.scopes[scope]?.first ?? -1
          while (scopeIdx >= 0) {
            const vd = fd.vars[scopeIdx]
            if (vd.scopeLevel === scope) {
              if (vd.isCaptured) {
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
        
        // === 标签操作码 ===
        case TempOpcode.OP_label: {
          // 格式: OP label:u32
          const labelIdx = this.getU32(bcBuf, pos)
          pos += 4
          
          // 检查是否有优化标记
          if (this.optimizedLabels && this.optimizedLabels.has(labelIdx)) {
            const optInfo = this.optimizedLabels.get(labelIdx)!
            
            // 跳过 perm4/insert3/rot3l/nop 和 put_ref_value
            // 这些操作码已经被优化，不需要输出
            // 只需要输出 put 操作
            
            // 检查下一个操作码 (应该是 perm4/insert3/rot3l/nop)
            const nextOp = bcBuf[pos]
            
            if (optInfo.isGlobal) {
              // 全局变量优化
              // 对应 QuickJS parser.c:9042-9067
              if (optInfo.isStrict) {
                // 严格模式: 需要调整栈操作
                if (nextOp !== Opcode.OP_nop) {
                  switch (nextOp) {
                    case Opcode.OP_insert3:
                      bcOut.putU8(Opcode.OP_insert2)
                      break
                    case Opcode.OP_perm4:
                      bcOut.putU8(Opcode.OP_perm3)
                      break
                    case Opcode.OP_rot3l:
                      bcOut.putU8(Opcode.OP_swap)
                      break
                  }
                }
              } else {
                // 非严格模式: insert3 需要 dup
                if (nextOp === Opcode.OP_insert3) {
                  bcOut.putU8(Opcode.OP_dup)
                }
              }
              
              // 输出 put_var / put_var_strict
              bcOut.putU8(optInfo.putOp)
              bcOut.putU32(optInfo.varIdx) // varIdx 是 atom
            } else if (optInfo.isClosure) {
              // 闭包变量优化
              if (nextOp === Opcode.OP_insert3) {
                // insert3 需要先输出 dup
                bcOut.putU8(Opcode.OP_dup)
              }
              
              // 输出 put_var_ref
              bcOut.putU8(optInfo.putOp)
              bcOut.putU16(optInfo.varIdx)
            } else {
              // 局部变量优化 (put_loc / put_arg)
              if (nextOp === Opcode.OP_insert3) {
                // insert3 需要先输出 dup
                bcOut.putU8(Opcode.OP_dup)
              }
              
              // 输出 put_loc / put_arg
              bcOut.putU8(optInfo.putOp)
              bcOut.putU16(optInfo.varIdx)
            }
            
            // 跳过 perm4/insert3/rot3l/nop + put_ref_value
            pos += 1 // skip perm4/insert3/rot3l/nop
            pos += 1 // skip put_ref_value
            
            // 清理优化标记
            this.optimizedLabels.delete(labelIdx)
            break
          }
          
          // 更新标签位置
          if (labelIdx >= 0 && labelIdx < fd.labelSlots.length) {
            fd.labelSlots[labelIdx].pos2 = bcOut.size
          }
          
          bcOut.putU8(TempOpcode.OP_label)
          bcOut.putU32(labelIdx)
          break
        }
        
        // === 优化时跳过 get_ref_value ===
        case Opcode.OP_get_ref_value: {
          // 检查前一个操作是否触发了优化
          // 如果是，这个 get_ref_value 已经被 get_loc/get_arg 替代
          if (this.skipNextGetRefValue) {
            this.skipNextGetRefValue = false
            break
          }
          // 否则正常复制
          bcOut.putU8(op)
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
  // 提升定义实例化 - 对应 parser.c:instantiate_hoisted_definitions
  // 
  // QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:9623-9800
  // ============================================================================

  /**
   * 实例化提升的定义（全局函数和变量）
   * 
   * 对应 QuickJS parser.c:10245-10400 instantiate_hoisted_definitions
   * 
   * 对于全局作用域:
   * 1. 初始化参数中的提升函数
   * 2. 初始化局部变量中的提升函数  
   * 3. 定义全局变量和函数 (OP_define_var / OP_define_func)
   */
  private instantiateHoistedDefinitions(fd: FunctionDef, bcOut: BytecodeBuilder): void {
    // 1. 处理参数中的提升函数
    for (let i = 0; i < fd.argCount; i++) {
      const vd = fd.args[i]
      if (vd && vd.funcPoolIdx >= 0) {
        bcOut.putU8(Opcode.OP_fclosure)
        bcOut.putU32(vd.funcPoolIdx)
        bcOut.putU8(Opcode.OP_put_arg)
        bcOut.putU16(i)
      }
    }
    
    // 2. 处理局部变量中的提升函数 (scope_level == 0)
    for (let i = 0; i < fd.vars.length; i++) {
      const vd = fd.vars[i]
      if (vd.scopeLevel === 0 && vd.funcPoolIdx >= 0) {
        bcOut.putU8(Opcode.OP_fclosure)
        bcOut.putU32(vd.funcPoolIdx)
        bcOut.putU8(Opcode.OP_put_loc)
        bcOut.putU16(i)
      }
    }
    
    // 3. 处理全局变量 (只有 isGlobalVar 模式)
    if (!fd.isGlobalVar) {
      return
    }

    // 模块顶层：bindings 在 module instantiation 阶段创建。
    // 对齐 QuickJS：不发射 OP_define_var / OP_define_func；仅在需要时生成一个
    // `push_this; if_false8 ...` 的受保护块来初始化提升函数（global func decl）。
    if (fd.module) {
      const hoistedFuncs: { cpoolIdx: number; varName: number; closureVarIdx: number }[] = []
      for (let i = 0; i < fd.globalVarCount; i++) {
        const hf = fd.globalVars[i]
        if (!hf) continue
        if (hf.cpoolIdx < 0) continue
        if (hf.isLexical) continue

        const closureVarIdx = fd.closureVar
          .slice(0, fd.closureVarCount)
          .findIndex((cv) => cv.varName === hf.varName)
        if (closureVarIdx < 0) continue

        hoistedFuncs.push({ cpoolIdx: hf.cpoolIdx, varName: hf.varName, closureVarIdx })
      }

      if (hoistedFuncs.length) {
        // Guard: if (this) { init_hoisted_funcs; return_undef }
        // 重要：这里必须使用带 label 的 OP_if_false，而不是直接输出 OP_if_false8。
        // 否则 LabelResolver 的 skipDeadCode 会把后续字节码当作不可达，从而无法做
        // push_i32 -> push_1 等短操作码优化。
        const labelSkip = this.compiler.newLabelInt(fd)
        fd.labelSlots[labelSkip].refCount++
        fd.jumpSize++

        bcOut.putU8(Opcode.OP_push_this)
        bcOut.putU8(Opcode.OP_if_false)
        bcOut.putU32(labelSkip)

        for (const hf of hoistedFuncs) {
          bcOut.putU8(Opcode.OP_fclosure)
          bcOut.putU32(hf.cpoolIdx >>> 0)
          bcOut.putU8(Opcode.OP_put_var_ref)
          bcOut.putU16(hf.closureVarIdx)
        }

        bcOut.putU8(Opcode.OP_return_undef)
        bcOut.putU8(TempOpcode.OP_label)
        bcOut.putU32(labelSkip)
      }

      return
    }
    
    for (const hf of fd.globalVars) {
      // 计算 flags
      let flags = 0
      // QuickJS: instantiate_hoisted_definitions() 里只有非 global eval 才会加 configurable
      if (fd.evalType !== JS_EVAL_TYPE_GLOBAL) {
        flags |= JS_PROP_CONFIGURABLE
      }
      
      if (hf.cpoolIdx >= 0 && !hf.isLexical) {
        // 全局函数定义: fclosure + define_func
        // 对应 QuickJS parser.c:10315-10325 然后 goto done_global_var
        bcOut.putU8(Opcode.OP_fclosure)
        bcOut.putU32(hf.cpoolIdx)
        
        bcOut.putU8(Opcode.OP_define_func)
        bcOut.putU32(hf.varName)
        bcOut.putU8(flags)
        
        // 跳过后续的 put_var_init 处理 (对应 QuickJS 的 goto done_global_var)
        continue
      } else {
        // 变量定义
        if (hf.isLexical) {
          flags |= DEFINE_GLOBAL_LEX_VAR
          if (!hf.isConst) {
            flags |= JS_PROP_WRITABLE
          }
        }
        bcOut.putU8(Opcode.OP_define_var)
        bcOut.putU32(hf.varName)
        bcOut.putU8(flags)
      }
      
      // 如果是函数或需要强制初始化，需要额外的初始化
      if (hf.cpoolIdx >= 0 || hf.forceInit) {
        if (hf.cpoolIdx >= 0) {
          bcOut.putU8(Opcode.OP_fclosure)
          bcOut.putU32(hf.cpoolIdx)
        } else {
          bcOut.putU8(Opcode.OP_undefined)
        }
        bcOut.putU8(Opcode.OP_put_var_init)
        bcOut.putU32(hf.varName)
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
    labelIdx: number
  ): void {
    let varIdx = -1
    let isPseudoVar = false

    // 是否存在 with scope（用于决定是否需要探测外层捕获的 `_with_`）
    let sawWithScope = false

    // 对齐 QuickJS: resolve_scope_var() 里的 label_done
    const labelDoneRef = { value: -1 }
    
    // 检查是否为伪变量 (this, new.target, home_object, this_active_func)
    isPseudoVar = (
      varName === JSAtom.JS_ATOM_home_object ||
      varName === JSAtom.JS_ATOM_this_active_func ||
      varName === JSAtom.JS_ATOM_new_target ||
      varName === JSAtom.JS_ATOM_this
    )
    
    // === 步骤1: 在当前词法作用域中查找（并处理 with scope）===
    // 对齐 QuickJS：
    // - 遍历 scope chain
    // - 遇到 _with_ 则 emit get_loc + with_xxx test
    // - 找到同名局部变量则停止
    let idx = fd.scopes[scopeLevel]?.first ?? -1
    while (idx >= 0) {
      const vd = fd.vars[idx]

      if (vd.varName === varName) {
        varIdx = idx
        break
      }

      if (vd.varName === JSAtom.JS_ATOM__with_ && !isPseudoVar) {
        // push var object
        sawWithScope = true
        bcOut.putU8(Opcode.OP_get_loc)
        bcOut.putU16(idx)
        this.emitVarObjectTest(fd, varName, op, bcOut, labelDoneRef, 1)
      }

      // 对齐 QuickJS：有 eval 的函数会引入 _var_ / _arg_var_，它们也需要参与 var_object_test
      // （is_with=0），否则会丢失 get_loc + with_get_var/with_get_ref 的探测序列。
      if (
        (vd.varName === JSAtom.JS_ATOM__var_ || vd.varName === JSAtom.JS_ATOM__arg_var_) &&
        !isPseudoVar
      ) {
        bcOut.putU8(Opcode.OP_get_loc)
        bcOut.putU16(idx)
        this.emitVarObjectTest(fd, varName, op, bcOut, labelDoneRef, 0)
      }

      idx = vd.scopeNext
    }

    // 对齐 QuickJS: is_arg_scope = (idx == ARG_SCOPE_END)
    const isArgScope = idx === ARG_SCOPE_END

    if (varIdx >= 0) {
      if (this.checkConstAssignment(fd, varIdx, varName, op, bcOut)) {
        return
      }
      this.emitLocalVarAccess(fd, varIdx, varName, op, bcOut, bcBuf, labelIdx)

      if (labelDoneRef.value >= 0) {
        fd.labelSlots[labelDoneRef.value].pos2 = bcOut.size
        bcOut.putU8(TempOpcode.OP_label)
        bcOut.putU32(labelDoneRef.value)
      }
      return
    }
    
    // === 步骤2: 在当前函数的非作用域变量中查找 ===
    varIdx = this.findInFunctionVars(fd, varName, isPseudoVar)
    
    if (varIdx >= 0) {
      if (this.checkConstAssignment(fd, varIdx, varName, op, bcOut)) {
        return
      }
      this.emitLocalVarAccess(fd, varIdx, varName, op, bcOut, bcBuf, labelIdx)

      if (labelDoneRef.value >= 0) {
        fd.labelSlots[labelDoneRef.value].pos2 = bcOut.size
        bcOut.putU8(TempOpcode.OP_label)
        bcOut.putU32(labelDoneRef.value)
      }
      return
    }

    // === 对齐 QuickJS：在检查 parent scopes 之前，先对当前函数的 eval var object 做一次探测 ===
    // parser.c:9345-9360
    if (!isPseudoVar) {
      if (!isArgScope && fd.varObjectIdx >= 0) {
        bcOut.putU8(Opcode.OP_get_loc)
        bcOut.putU16(fd.varObjectIdx)
        this.emitVarObjectTest(fd, varName, op, bcOut, labelDoneRef, 0)
      }
      if (fd.argVarObjectIdx >= 0) {
        bcOut.putU8(Opcode.OP_get_loc)
        bcOut.putU16(fd.argVarObjectIdx)
        this.emitVarObjectTest(fd, varName, op, bcOut, labelDoneRef, 0)
      }
    }

    // === 步骤2.5: 在当前函数已存在的闭包变量中查找 ===
    // 对齐 QuickJS：module 的 import bindings / module globals 会作为 closure vars 存在，
    // 并且它们不是局部 varDefs（fd.vars）也不是父函数捕获。
    for (let i = 0; i < fd.closureVarCount; i++) {
      const cv = fd.closureVar[i]
      if (cv.varName === varName) {
        // 对齐 QuickJS：closure var 一旦“真的被用到”(即这里命中并发射 get_var_ref*)，
        // 才需要把父函数对应的 varDef 标记为 captured。
        // 注意：add_eval_variables 可能会预填充 closureVar 列表，但并不意味着父变量一定需要 captured。
        if (cv.isLocal && fd.parent) {
          if (cv.isArg) {
            const arg = (fd.parent as any).args?.[cv.varIdx]
            if (arg) arg.isCaptured = true
          } else {
            const vd = (fd.parent as any).vars?.[cv.varIdx]
            if (vd) vd.isCaptured = true
          }
        }

        // 对齐 QuickJS：如果命中的是 closure var，但当前存在 with scope，仍需探测外层捕获的 `_with_`。
        // 该探测必须发生在“当前函数 eval var object probes”之后、closure var access 之前。
        // 仅在我们即将返回（closure var 命中）时发射，以避免和 parent-scan 的 `_with_` 探测重复。
        if (
          !isPseudoVar &&
          sawWithScope &&
          varName !== JSAtom.JS_ATOM__with_
        ) {
          for (let j = 0; j < fd.closureVarCount; j++) {
            if (fd.closureVar[j].varName === JSAtom.JS_ATOM__with_) {
              bcOut.putU8(Opcode.OP_get_var_ref)
              bcOut.putU16(j)
              this.emitVarObjectTest(fd, varName, op, bcOut, labelDoneRef, 1)
            }
          }
        }

        this.emitClosureVarAccess(fd, i, varName, op, bcOut, bcBuf, labelIdx)

        if (labelDoneRef.value >= 0) {
          fd.labelSlots[labelDoneRef.value].pos2 = bcOut.size
          bcOut.putU8(TempOpcode.OP_label)
          bcOut.putU32(labelDoneRef.value)
        }
        return
      }
    }
    
    // === 步骤3: 在父函数中查找 (闭包) ===
    // === 步骤3: 在父函数中查找 (闭包) + 处理父作用域的 _with_ ===
    // 对齐 QuickJS：扫描 parent scopes，遇到 _with_ 则捕获并 emit get_var_ref + with_xxx test。
    let currentFd: FunctionDef = fd
    let currentScopeLevel = scopeLevel
    let foundFd: FunctionDef | null = null

    for (let parentFd = fd.parent; parentFd; ) {
      currentScopeLevel = currentFd.parentScopeLevel
      currentFd = parentFd

      let pIdx = currentFd.scopes[currentScopeLevel]?.first ?? -1
      for (; pIdx >= 0;) {
        const vd = currentFd.vars[pIdx]

        if (vd.varName === varName) {
          varIdx = pIdx
          foundFd = currentFd
          break
        }

        if (vd.varName === JSAtom.JS_ATOM__with_ && !isPseudoVar) {
          // capture parent's _with_
          vd.isCaptured = true
          const closureIdx = this.compiler.getClosureVar(
            fd,
            currentFd,
            true,
            false,
            pIdx,
            vd.varName,
            false,
            false,
            JSVarKindEnum.JS_VAR_NORMAL
          )

          bcOut.putU8(Opcode.OP_get_var_ref)
          bcOut.putU16(closureIdx)
          this.emitVarObjectTest(fd, varName, op, bcOut, labelDoneRef, 1)
        }

        if (
          (vd.varName === JSAtom.JS_ATOM__var_ || vd.varName === JSAtom.JS_ATOM__arg_var_) &&
          !isPseudoVar
        ) {
          vd.isCaptured = true
          const closureIdx = this.compiler.getClosureVar(
            fd,
            currentFd,
            true,
            false,
            pIdx,
            vd.varName,
            false,
            false,
            JSVarKindEnum.JS_VAR_NORMAL
          )
          bcOut.putU8(Opcode.OP_get_var_ref)
          bcOut.putU16(closureIdx)
          this.emitVarObjectTest(fd, varName, op, bcOut, labelDoneRef, 0)
        }

        pIdx = vd.scopeNext
      }

      // 对齐 QuickJS: is_arg_scope = (idx == ARG_SCOPE_END)
      const parentIsArgScope = pIdx === ARG_SCOPE_END

      if (varIdx >= 0) break

      // 父函数的闭包变量（对齐 QuickJS：父函数可能只有 closure vars，如 module imports/globals）
      let parentClosureIdx = -1
      for (let i = 0; i < currentFd.closureVarCount; i++) {
        const cv = currentFd.closureVar[i]
        if (cv.varName === varName) {
          parentClosureIdx = i
          break
        }
        if (cv.varName === JSAtom.JS_ATOM__with_ && !isPseudoVar) {
          const closureIdx = this.compiler.getClosureVar(
            fd,
            currentFd,
            true,
            false,
            i,
            cv.varName,
            false,
            false,
            JSVarKindEnum.JS_VAR_NORMAL
          )
          bcOut.putU8(Opcode.OP_get_var_ref)
          bcOut.putU16(closureIdx)
          this.emitVarObjectTest(fd, varName, op, bcOut, labelDoneRef, 1)
        }

        if (
          (cv.varName === JSAtom.JS_ATOM__var_ || cv.varName === JSAtom.JS_ATOM__arg_var_) &&
          !isPseudoVar
        ) {
          const closureIdx = this.compiler.getClosureVar(
            fd,
            currentFd,
            true,
            false,
            i,
            cv.varName,
            false,
            false,
            JSVarKindEnum.JS_VAR_NORMAL
          )
          bcOut.putU8(Opcode.OP_get_var_ref)
          bcOut.putU16(closureIdx)
          this.emitVarObjectTest(fd, varName, op, bcOut, labelDoneRef, 0)
        }
      }
      if (parentClosureIdx >= 0) {
        const cv = currentFd.closureVar[parentClosureIdx]
        const closureIdx = this.compiler.getClosureVar(
          fd,
          currentFd,
          false,
          false,
          parentClosureIdx,
          varName,
          cv.isConst,
          cv.isLexical,
          cv.varKind
        )
        this.emitClosureVarAccess(fd, closureIdx, varName, op, bcOut, bcBuf, labelIdx)

        if (labelDoneRef.value >= 0) {
          fd.labelSlots[labelDoneRef.value].pos2 = bcOut.size
          bcOut.putU8(TempOpcode.OP_label)
          bcOut.putU32(labelDoneRef.value)
        }
        return
      }

      // 对齐 QuickJS：如果没在 scope chain / closure vars 里找到，再在父函数的普通变量/参数里查找。
      // 这一步对捕获父函数参数（如 closure1 中的 b/c）是必需的。
      if (varIdx < 0) {
        varIdx = this.compiler.findVarByAtom(currentFd, varName)
        if (varIdx >= 0) {
          foundFd = currentFd
          break
        }
      }

      // 伪变量（对齐 findInFunctionVars / findInParentScopes 的行为）
      if (varIdx < 0 && isPseudoVar) {
        varIdx = this.resolvePseudoVar(currentFd, varName)
        if (varIdx >= 0) {
          foundFd = currentFd
          break
        }
      }

      // arguments
      if (varIdx < 0 && varName === JSAtom.JS_ATOM_arguments && currentFd.hasArgumentsBinding) {
        varIdx = this.compiler.addArgumentsVar(currentFd, varName)
        foundFd = currentFd
        break
      }

      // 函数表达式名称
      if (varIdx < 0 && currentFd.isFuncExpr && currentFd.funcName === varName) {
        varIdx = this.compiler.addFuncVar(currentFd, varName)
        foundFd = currentFd
        break
      }

      // eval 函数特殊处理
      if (currentFd.isEval) {
        break
      }

      // 对齐 QuickJS: 额外探测 parent 的 eval var object（即使它不在当前 scope chain 中）
      // parser.c:9420-9446
      if (!isPseudoVar) {
        if (!parentIsArgScope && currentFd.varObjectIdx >= 0) {
          const vd = currentFd.vars[currentFd.varObjectIdx]
          vd.isCaptured = true
          const closureIdx = this.compiler.getClosureVar(
            fd,
            currentFd,
            true,
            false,
            currentFd.varObjectIdx,
            vd.varName,
            false,
            false,
            JSVarKindEnum.JS_VAR_NORMAL
          )
          bcOut.putU8(Opcode.OP_get_var_ref)
          bcOut.putU16(closureIdx)
          this.emitVarObjectTest(fd, varName, op, bcOut, labelDoneRef, 0)
        }

        if (currentFd.argVarObjectIdx >= 0) {
          const vd = currentFd.vars[currentFd.argVarObjectIdx]
          vd.isCaptured = true
          const closureIdx = this.compiler.getClosureVar(
            fd,
            currentFd,
            true,
            false,
            currentFd.argVarObjectIdx,
            vd.varName,
            false,
            false,
            JSVarKindEnum.JS_VAR_NORMAL
          )
          bcOut.putU8(Opcode.OP_get_var_ref)
          bcOut.putU16(closureIdx)
          this.emitVarObjectTest(fd, varName, op, bcOut, labelDoneRef, 0)
        }
      }

      parentFd = currentFd.parent
    }

    if (varIdx >= 0 && foundFd) {
      // capture variable
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
        this.emitClosureVarAccess(fd, closureIdx, varName, op, bcOut, bcBuf, labelIdx)
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
        this.emitClosureVarAccess(fd, closureIdx, varName, op, bcOut, bcBuf, labelIdx)
      }

      if (labelDoneRef.value >= 0) {
        fd.labelSlots[labelDoneRef.value].pos2 = bcOut.size
        bcOut.putU8(TempOpcode.OP_label)
        bcOut.putU32(labelDoneRef.value)
      }
      return
    }
    
    // === 步骤4: 全局变量访问 ===
    this.emitGlobalVarAccess(fd, varName, op, bcOut, bcBuf, labelIdx)

    if (labelDoneRef.value >= 0) {
      fd.labelSlots[labelDoneRef.value].pos2 = bcOut.size
      bcOut.putU8(TempOpcode.OP_label)
      bcOut.putU32(labelDoneRef.value)
    }
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
    scopeLevel: number
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
          // QuickJS: add_var() uses memset(0) so scope_next defaults to 0.
          // This field is serialized and must match for byte-perfect output.
          // Source: third_party/QuickJS/src/core/parser.c: add_var (memset(vd, 0, sizeof(*vd)))
          fd.vars[fd.homeObjectVarIdx].scopeNext = 0
        }
        varIdx = fd.homeObjectVarIdx
        break
        
      case JSAtom.JS_ATOM_this_active_func:
        if (fd.thisActiveFuncVarIdx < 0) {
          fd.thisActiveFuncVarIdx = this.compiler.addVar(fd, varName)
          // See add_var() memset(0) note above.
          fd.vars[fd.thisActiveFuncVarIdx].scopeNext = 0
        }
        varIdx = fd.thisActiveFuncVarIdx
        break
        
      case JSAtom.JS_ATOM_new_target:
        if (fd.newTargetVarIdx < 0) {
          fd.newTargetVarIdx = this.compiler.addVar(fd, varName)
          // See add_var() memset(0) note above.
          fd.vars[fd.newTargetVarIdx].scopeNext = 0
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
    if (idx >= 0) {
      // QuickJS: add_var_this() ultimately calls add_var(), which zero-inits vd.
      // Ensure scope_next matches (0 => encoded scopeNextPlus1=1).
      // Source: third_party/QuickJS/src/core/parser.c: add_var_this / add_var
      fd.vars[idx].scopeNext = 0
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

      // 在父函数的闭包变量中查找（对齐 QuickJS：父函数可能只有 closure vars，如 module imports/globals）
      let parentClosureIdx = -1
      for (let i = 0; i < currentFd.closureVarCount; i++) {
        const cv = currentFd.closureVar[i]
        if (cv.varName === varName) {
          parentClosureIdx = i
          break
        }
      }
      if (parentClosureIdx >= 0) {
        const cv = currentFd.closureVar[parentClosureIdx]
        const closureIdx = this.compiler.getClosureVar(
          fd,
          currentFd,
          false,
          false,
          parentClosureIdx,
          varName,
          cv.isConst,
          cv.isLexical,
          cv.varKind
        )
        return { found: true, varIdx: closureIdx }
      }
      
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
    const isPut = (op === TempOpcode.OP_scope_put_var || op === TempOpcode.OP_scope_make_ref)
    
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
   * 检查是否可以优化 put_ref_value 模式
   * 
   * 对应 QuickJS parser.c:8938 can_opt_put_ref_value
   * 
   * 检查 label.pos 位置的字节码模式是否为:
   * - insert3 / put_ref_value
   * - perm4 / put_ref_value  
   * - rot3l / put_ref_value
   * - nop / put_ref_value
   */
  private canOptPutRefValue(bcBuf: Uint8Array, pos: number): boolean {
    if (pos < 0 || pos + 1 >= bcBuf.length) {
      return false
    }
    const opcode = bcBuf[pos]
    return (
      bcBuf[pos + 1] === Opcode.OP_put_ref_value &&
      (opcode === Opcode.OP_insert3 || opcode === Opcode.OP_perm4 || 
       opcode === Opcode.OP_nop || opcode === Opcode.OP_rot3l)
    )
  }

  /**
   * 优化 scope_make_ref 模式
   * 
   * 对应 QuickJS parser.c:8956 optimize_scope_make_ref
   * 
   * 将引用模式 (scope_make_ref -> get_ref_value -> ... -> perm4/insert3 -> put_ref_value)
   * 优化为直接的局部变量访问模式 (get_loc -> ... -> put_loc)
   * 
   * 这个优化对于后缀递增/递减操作尤其重要:
   * - 原模式: make_ref, get_ref_value, post_inc, perm4, put_ref_value (栈深度 4)
   * - 优化后: get_loc, post_inc, put_loc (栈深度 2-3)
   */
  private optimizeScopeMakeRef(
    fd: FunctionDef,
    bcBuf: Uint8Array,
    bcOut: BytecodeBuilder,
    labelIdx: number,
    getOp: number,
    varIdx: number
  ): void {
    const ls = fd.labelSlots[labelIdx]
    const labelPos = ls.pos
    
    // 从 labelPos 开始检查字节码模式
    // label.pos 指向 OP_label 后的第一条指令 (即 perm4/insert3/rot3l/nop)
    const pos = labelPos
    
    // 如果第一条指令后面有 get_ref_value，发射 get_op
    // 注意: 这里我们只需要发射 get_op，因为 get_ref_value 在原始字节码中的处理会被跳过
    // VariableResolver 不处理 get_ref_value，它会被直接复制
    
    // 发射 get 操作
    bcOut.putU8(getOp)
    bcOut.putU16(varIdx)
    
    // 标记原始字节码中的 label 位置需要被修补
    // 在 QuickJS 中，这是通过直接修改 bc_buf 来实现的
    // 但在我们的实现中，我们需要在 label 位置处替换字节码
    
    // 计算原始字节码中需要修补的位置
    // label.pos 指向 OP_perm4/OP_insert3 的位置
    // 需要将 [OP_perm4, OP_put_ref_value] 替换为 [OP_put_loc idx, OP_nop*]
    
    // 由于 VariableResolver 是重写字节码而不是修改原始字节码
    // 我们需要在 OP_label 处理时检测并应用这个优化
    // 这需要更复杂的跨操作码协调
    
    // 更简单的方法: 在此标记需要优化，让后续的 OP_label/perm4/put_ref_value 被跳过
    // 但这需要某种状态传递机制
    
    // 最直接的实现: 记录这个 label 需要被优化
    // 在 OP_label 处理时，如果检测到优化标记，则直接输出替换代码
    
    // 保存优化信息到 labelSlot
    // 使用一个 Map 来存储需要优化的 label
    if (!this.optimizedLabels) {
      this.optimizedLabels = new Map()
    }
    
    const opcode = bcBuf[pos]
    this.optimizedLabels.set(labelIdx, {
      putOp: getOp + 1, // get_loc -> put_loc, get_arg -> put_arg
      varIdx: varIdx,
      hasDup: opcode === Opcode.OP_insert3  // insert3 需要额外的 dup
    })
    
    // 标记需要跳过下一个 get_ref_value
    this.skipNextGetRefValue = true
  }
  
  // 存储需要优化的 label 信息
  private optimizedLabels?: Map<number, { 
    putOp: number; 
    varIdx: number; 
    hasDup: boolean;
    isGlobal?: boolean;
    isStrict?: boolean;
    isClosure?: boolean;  // 闭包变量标志
  }>
  
  // 标记是否需要跳过下一个 get_ref_value
  private skipNextGetRefValue = false

  /**
   * 生成局部变量访问代码
   * 
   * 对应 QuickJS parser.c:9220-9295 中局部变量处理部分
   */
  private emitLocalVarAccess(
    fd: FunctionDef,
    varIdx: number,
    varName: number,
    op: number,
    bcOut: BytecodeBuilder,
    bcBuf?: Uint8Array,
    labelIdx?: number
  ): void {
    const isPut = (op === TempOpcode.OP_scope_put_var || op === TempOpcode.OP_scope_put_var_init)
    const isArg = (varIdx & ARGUMENT_VAR_OFFSET) !== 0
    const realIdx = isArg ? varIdx - ARGUMENT_VAR_OFFSET : varIdx
    
    switch (op) {
      case TempOpcode.OP_scope_make_ref: {
        // 检查是否可以优化
        // 对应 parser.c:9241-9261 中的 can_opt_put_ref_value 检测
        if (bcBuf && labelIdx !== undefined && labelIdx >= 0 && labelIdx < fd.labelSlots.length) {
          const ls = fd.labelSlots[labelIdx]
          if (ls.pos >= 0 && this.canOptPutRefValue(bcBuf, ls.pos)) {
            // 可以优化!
            let getOp: number
            if (isArg) {
              getOp = Opcode.OP_get_arg
            } else {
              const vd = fd.vars[realIdx]
              if (vd && vd.isLexical) {
                getOp = Opcode.OP_get_loc_check
              } else {
                getOp = Opcode.OP_get_loc
              }
            }
            
            // 执行优化
            this.optimizeScopeMakeRef(fd, bcBuf, bcOut, labelIdx, getOp, realIdx)
            
            // 减少 label 引用计数 (QuickJS 在 resolve_labels 中做这个)
            fd.labelSlots[labelIdx].refCount--
            break
          }
        }
        
        // 无法优化，使用原始的 make_ref 模式
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
      
      case TempOpcode.OP_scope_get_ref:
        bcOut.putU8(Opcode.OP_undefined)
        // fall through
      case TempOpcode.OP_scope_get_var_checkthis:
      case TempOpcode.OP_scope_get_var_undef:
      case TempOpcode.OP_scope_get_var:
      case TempOpcode.OP_scope_put_var:
      case TempOpcode.OP_scope_put_var_init: {
        if (isArg) {
          // 参数访问
          bcOut.putU8(isPut ? Opcode.OP_put_arg : Opcode.OP_get_arg)
          bcOut.putU16(realIdx)
        } else {
          // 局部变量访问
          const vd = fd.vars[realIdx]
          
          if (isPut) {
            if (vd.isLexical) {
              if (op === TempOpcode.OP_scope_put_var_init) {
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
              if (op === TempOpcode.OP_scope_get_var_checkthis) {
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
      
      case TempOpcode.OP_scope_delete_var:
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
   * 
   * 对应 QuickJS parser.c:9510-9570
   */
  private emitClosureVarAccess(
    fd: FunctionDef,
    closureIdx: number,
    varName: number,
    op: number,
    bcOut: BytecodeBuilder,
    bcBuf?: Uint8Array,
    labelIdx?: number
  ): void {
    const cv = fd.closureVar[closureIdx]
    const isPut = (op === TempOpcode.OP_scope_put_var || op === TempOpcode.OP_scope_put_var_init)
    
    // 检查 const 赋值
    if ((op === TempOpcode.OP_scope_put_var || op === TempOpcode.OP_scope_make_ref) && cv.isConst) {
      bcOut.putU8(Opcode.OP_throw_error)
      bcOut.putU32(varName)
      bcOut.putU8(JS_THROW_VAR_RO)
      return
    }
    
    switch (op) {
      case TempOpcode.OP_scope_make_ref: {
        // 检查是否可以优化
        // 对应 parser.c:9525-9538
        if (cv.varKind !== JSVarKindEnum.JS_VAR_FUNCTION_NAME &&
            bcBuf && labelIdx !== undefined && labelIdx >= 0 && labelIdx < fd.labelSlots.length) {
          const ls = fd.labelSlots[labelIdx]
          if (ls.pos >= 0 && this.canOptPutRefValue(bcBuf, ls.pos)) {
            // 可以优化!
            let getOp: number
            if (cv.isLexical) {
              getOp = Opcode.OP_get_var_ref_check
            } else {
              getOp = Opcode.OP_get_var_ref
            }
            
            // 发射 get 操作
            bcOut.putU8(getOp)
            bcOut.putU16(closureIdx)
            
            // 保存优化信息
            if (!this.optimizedLabels) {
              this.optimizedLabels = new Map()
            }
            
            const opcode = bcBuf[ls.pos]
            this.optimizedLabels.set(labelIdx, {
              putOp: getOp + 1, // get_var_ref -> put_var_ref
              varIdx: closureIdx,
              hasDup: opcode === Opcode.OP_insert3,
              isClosure: true  // 标记为闭包变量
            })
            
            // 标记需要跳过下一个 get_ref_value
            this.skipNextGetRefValue = true
            
            // 减少 label 引用计数
            fd.labelSlots[labelIdx].refCount--
            break
          }
        }
        
        // 无法优化，使用原始模式
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
      
      case TempOpcode.OP_scope_get_ref:
        bcOut.putU8(Opcode.OP_undefined)
        // fall through
      case TempOpcode.OP_scope_get_var_undef:
      case TempOpcode.OP_scope_get_var:
      case TempOpcode.OP_scope_put_var:
      case TempOpcode.OP_scope_put_var_init: {
        if (isPut) {
          if (cv.isLexical) {
            if (op === TempOpcode.OP_scope_put_var_init) {
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
      
      case TempOpcode.OP_scope_delete_var:
        bcOut.putU8(Opcode.OP_push_false)
        break
    }
  }

  // ============================================================================
  // 代码生成: 全局变量访问
  // ============================================================================

  /**
   * 优化全局变量的 scope_make_ref 模式
   * 
   * 对应 QuickJS parser.c:9001 optimize_scope_make_global_ref
   * 
   * 非严格模式下:
   * - 原模式: make_var_ref -> get_ref_value -> ... -> perm4/insert3 -> put_ref_value
   * - 优化后: get_var -> ... -> put_var
   */
  private optimizeScopeMakeGlobalRef(
    fd: FunctionDef,
    bcBuf: Uint8Array,
    bcOut: BytecodeBuilder,
    labelIdx: number,
    varName: number
  ): void {
    const isStrict = (fd.jsMode & JSMode.JS_MODE_STRICT) !== 0
    const ls = fd.labelSlots[labelIdx]
    const labelPos = ls.pos
    
    // 严格模式下需要先检查变量是否存在
    if (isStrict) {
      bcOut.putU8(Opcode.OP_check_var)
      bcOut.putU32(varName)
    }
    
    // 发射 get_var
    bcOut.putU8(Opcode.OP_get_var)
    bcOut.putU32(varName)
    
    // 保存优化信息
    if (!this.optimizedLabels) {
      this.optimizedLabels = new Map()
    }
    
    const opcode = bcBuf[labelPos]
    this.optimizedLabels.set(labelIdx, {
      putOp: isStrict ? Opcode.OP_put_var_strict : Opcode.OP_put_var,
      varIdx: varName, // 对于全局变量，存储 varName (atom)
      hasDup: opcode === Opcode.OP_insert3,
      isGlobal: true,
      isStrict: isStrict
    })
    
    // 标记需要跳过下一个 get_ref_value
    this.skipNextGetRefValue = true
    
    // 减少 label 引用计数
    fd.labelSlots[labelIdx].refCount--
  }

  /**
   * 生成全局变量访问代码
   * 
   * 对应 QuickJS parser.c:9583-9615
   */
  private emitGlobalVarAccess(
    fd: FunctionDef,
    varName: number,
    op: number,
    bcOut: BytecodeBuilder,
    bcBuf?: Uint8Array,
    labelIdx?: number
  ): void {
    switch (op) {
      case TempOpcode.OP_scope_make_ref: {
        // 检查是否可以优化
        if (bcBuf && labelIdx !== undefined && labelIdx >= 0 && labelIdx < fd.labelSlots.length) {
          const ls = fd.labelSlots[labelIdx]
          if (ls.pos >= 0 && this.canOptPutRefValue(bcBuf, ls.pos)) {
            // 可以优化!
            this.optimizeScopeMakeGlobalRef(fd, bcBuf, bcOut, labelIdx, varName)
            break
          }
        }
        
        // 无法优化，使用原始模式
        bcOut.putU8(Opcode.OP_make_var_ref)
        bcOut.putU32(varName)
        break
      }
        
      case TempOpcode.OP_scope_get_ref:
        bcOut.putU8(Opcode.OP_undefined)
        bcOut.putU8(Opcode.OP_get_var)
        bcOut.putU32(varName)
        break
        
      case TempOpcode.OP_scope_get_var_undef:
        bcOut.putU8(Opcode.OP_get_var_undef)
        bcOut.putU32(varName)
        break
        
      case TempOpcode.OP_scope_get_var:
      case TempOpcode.OP_scope_get_var_checkthis:
        bcOut.putU8(Opcode.OP_get_var)
        bcOut.putU32(varName)
        break
        
      case TempOpcode.OP_scope_put_var:
        bcOut.putU8(Opcode.OP_put_var)
        bcOut.putU32(varName)
        break
        
      case TempOpcode.OP_scope_put_var_init:
        bcOut.putU8(Opcode.OP_put_var_init)
        bcOut.putU32(varName)
        break
        
      case TempOpcode.OP_scope_delete_var:
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
    bcOut: BytecodeBuilder,
    posInOriginal: number
  ): void {
    // 查找私有字段
    const result = this.findPrivateField(fd, varName, scopeLevel)
    
    if (result.idx < 0) {
      throw new Error(
        `undefined private field '${varName}' (pc=${posInOriginal}, scope=${scopeLevel}, op=${op})`
      )
    }
    
    const { idx, isRef, varKind } = result
    
    switch (op) {
      case TempOpcode.OP_scope_get_private_field:
      case TempOpcode.OP_scope_get_private_field2: {
        switch (varKind) {
          case JSVarKindEnum.JS_VAR_PRIVATE_FIELD:
            if (op === TempOpcode.OP_scope_get_private_field2) {
              bcOut.putU8(Opcode.OP_dup)
            }
            this.emitGetLocOrRef(bcOut, isRef, idx)
            bcOut.putU8(Opcode.OP_get_private_field)
            break
            
          case JSVarKindEnum.JS_VAR_PRIVATE_METHOD:
            this.emitGetLocOrRef(bcOut, isRef, idx)
            bcOut.putU8(Opcode.OP_check_brand)
            if (op !== TempOpcode.OP_scope_get_private_field2) {
              bcOut.putU8(Opcode.OP_nip)
            }
            break
            
          case JSVarKindEnum.JS_VAR_PRIVATE_GETTER:
          case JSVarKindEnum.JS_VAR_PRIVATE_GETTER_SETTER:
            if (op === TempOpcode.OP_scope_get_private_field2) {
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
      
      case TempOpcode.OP_scope_put_private_field: {
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
            // 调用 setter: 需要先解析 varName + "<set>" 对应的私有 setter 变量
            // 对应 QuickJS parser.c:resolve_scope_private_field() OP_scope_put_private_field
            const base = this.compiler.getAtomString(varName)
            const setterAtom = this.compiler.addAtom((base ?? '') + '<set>')
            const setterRes = this.findPrivateField(fd, setterAtom, scopeLevel)
            if (setterRes.idx < 0) {
              // 与 QuickJS 一致：找不到 setterName 时视为未解析
              throw new Error('undefined private field')
            }
            this.emitGetLocOrRef(bcOut, setterRes.isRef, setterRes.idx)
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
      
      case TempOpcode.OP_scope_in_private_field:
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
          // 对齐 QuickJS：私有字段名（JS_VAR_PRIVATE_FIELD）会设置 is_captured，
          // 从而在 leave_scope 时生成 OP_close_loc，并让 vardef.flags 匹配（例如 0x35 -> 0x75）。
          // 注意：私有方法/访问器名在 QuickJS 中不会设置 is_captured。
          if (varKind === JSVarKindEnum.JS_VAR_PRIVATE_FIELD) {
            currentFd.vars[idx].isCaptured = true
          }
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
  // Eval 变量捕获 - 对应 parser.c:mark_eval_captured_variables
  // 
  // QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:9821-9832
  // ============================================================================

  /**
   * 标记 eval 可能捕获的变量
   * 
   * eval 调用可能访问当前作用域的所有变量，因此需要将它们标记为被捕获，
   * 以便在运行时将它们放入闭包中。
   * 
   * @param fd 函数定义
   * @param scopeLevel 作用域级别
   */
  private markEvalCapturedVariables(fd: FunctionDef, scopeLevel: number): void {
    // 遍历作用域中的所有变量，标记为被捕获
    let idx = fd.scopes[scopeLevel]?.first ?? -1
    while (idx >= 0) {
      const vd = fd.vars[idx]
      vd.isCaptured = true
      idx = vd.scopeNext
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
}
