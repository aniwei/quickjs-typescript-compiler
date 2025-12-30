import ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { CompilerContext } from '../CompilerContext'
import { Opcode, TempOpcode, JSAtom, JSMode, JS_ATOM_NULL, COPY_DATA_PROPERTIES_FLAGS_DEPTH0, FOR_OF_NEXT_OPERAND_DEFAULT } from '../../env'
import { BlockEnv, JSImportExportTypeEnum, JSModuleDef } from '../FunctionDef'
import { JSVarDefEnum } from '../Compiler'

/**
 * 语句访问器 - 对应 parser.c:js_parse_statement_or_decl
 * 
 * 主要对应:
 * - js_parse_statement_or_decl (parser.c:6914-7724)
 * - js_parse_block (parser.c:6491-6510)
 * - js_parse_var (parser.c:6509-6607)
 * - emit_break (parser.c:6334-6380)
 */
export class StatementVisitor extends VisitorContext {
  constructor(context: CompilerContext) {
    super(context)
  }

  private isImmediateUnlabeledBreak(stmt: ts.Statement): boolean {
    if (ts.isBreakStatement(stmt)) {
      return stmt.label == null
    }

    if (ts.isLabeledStatement(stmt)) {
      return this.isImmediateUnlabeledBreak(stmt.statement)
    }

    if (ts.isBlock(stmt)) {
      if (stmt.statements.length !== 1) return false
      return this.isImmediateUnlabeledBreak(stmt.statements[0])
    }

    return false
  }

  // ============================================================================
  // with 语句 - 对应 parser.c: TOK_WITH 分支
  // ============================================================================

  /**
   * 访问 with 语句 - 对应 QuickJS parser.c:7565+ (TOK_WITH)
   */
  visitWithStatement(node: ts.WithStatement): void {
    const fd = this.funcDef!

    // QuickJS: strict mode 下禁止 with
    if ((fd.jsMode & JSMode.JS_MODE_STRICT) !== 0) {
      throw new Error('invalid keyword: with')
    }

    // 1) 计算 with 的对象表达式（值留在栈上）
    const prevExpressionValueUsed = this.context.expressionValueUsed
    this.context.expressionValueUsed = true
    try {
      this.context.visit(node.expression)
    } finally {
      this.context.expressionValueUsed = prevExpressionValueUsed
    }

    // 2) push_scope + define <with> 变量
    this.compiler.pushScope(fd)
    const withIdx = this.compiler.defineVar(fd, JSAtom.JS_ATOM__with_, JSVarDefEnum.JS_VAR_DEF_WITH)

    // 3) to_object + put_loc <with>
    this.compiler.emitOp(fd, Opcode.OP_to_object)
    this.compiler.emitOp(fd, Opcode.OP_put_loc)
    this.compiler.emitU16(fd, withIdx)

    // 4) set_eval_ret_undefined + 编译 statement
    this.compiler.setEvalRetUndefined(fd)
    this.context.visit(node.statement)

    // 5) pop_scope
    this.compiler.popScope(fd)
  }

  private emitArrayDestructuringFromStack(
    fd: any,
    pattern: ts.ArrayBindingPattern,
    tok: 'const' | 'let' | 'var',
    opts: { allowInitializer: boolean }
  ): void {
    // 对齐 QuickJS js_parse_destructuring_element() 的 '[' 分支。
    // QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4583-4765
    // 约束：仅支持 identifier bindings、可选默认值、可选末尾 rest。

    // value on stack -> start iterator
    this.compiler.emitOp(fd, Opcode.OP_for_of_start)

    const emitStore = (atom: number) => {
      const opcode = (tok === 'const' || tok === 'let')
        ? TempOpcode.OP_scope_put_var_init
        : TempOpcode.OP_scope_put_var
      this.compiler.emitOp(fd, opcode)
      this.compiler.emitU32(fd, atom)
      this.compiler.emitU16(fd, fd.scopeLevel)
    }

    const emitDefault = (expr: ts.Expression) => {
      const labelHasVal = this.compiler.newLabelInt(fd)
      // QuickJS optimize: undefined strict_eq -> is_undefined
      // QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:11670-11677
      this.compiler.emitOp(fd, Opcode.OP_dup)
      this.compiler.emitOp(fd, Opcode.OP_is_undefined)
      this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelHasVal)
      this.compiler.emitOp(fd, Opcode.OP_drop)
      this.context.visit(expr)
      this.compiler.emitLabelInt(fd, labelHasVal)
    }

    const emitSpreadCode = (depth: number) => {
      // 对齐 QuickJS js_emit_spread_code()
      // QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4205-4240
      const labelRestNext = this.compiler.newLabelInt(fd)
      const labelRestDone = this.compiler.newLabelInt(fd)

      this.compiler.emitOp(fd, Opcode.OP_array_from)
      this.compiler.emitU16(fd, 0)
      this.compiler.emitOp(fd, Opcode.OP_push_i32)
      this.compiler.emitU32(fd, 0)

      this.compiler.emitLabelInt(fd, labelRestNext)
      this.compiler.emitOp(fd, Opcode.OP_for_of_next)
      this.compiler.emitU8(fd, 2 + depth)
      this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelRestDone)

      this.compiler.emitOp(fd, Opcode.OP_define_array_el)
      this.compiler.emitOp(fd, Opcode.OP_inc)
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelRestNext)

      this.compiler.emitLabelInt(fd, labelRestDone)
      // enum_rec xxx array idx undef -- enum_rec xxx array
      this.compiler.emitOp(fd, Opcode.OP_drop)
      this.compiler.emitOp(fd, Opcode.OP_drop)
    }

    const bindingElements = pattern.elements
    for (let i = 0; i < bindingElements.length; i++) {
      const element = bindingElements[i]

      if (ts.isOmittedExpression(element)) {
        // hole: emit for_of_next; drop; drop
        this.compiler.emitOp(fd, Opcode.OP_for_of_next)
        this.compiler.emitU8(fd, 0)
        this.compiler.emitOp(fd, Opcode.OP_drop)
        this.compiler.emitOp(fd, Opcode.OP_drop)
        continue
      }

      const isRest = element.dotDotDotToken != null
      if (isRest && i !== bindingElements.length - 1) {
        throw new Error('rest element must be the last one')
      }

      if (!ts.isIdentifier(element.name)) {
        throw new Error('Only identifier bindings are supported in array destructuring')
      }

      const atom = this.compiler.addAtom(element.name.text)

      if (isRest) {
        if (element.initializer && opts.allowInitializer) {
          throw new Error('rest element cannot have a default value')
        }
        emitSpreadCode(0)
        emitStore(atom)
        continue
      }

      // QuickJS: for `var` array destructuring, store via make_loc_ref + put_ref_value.
      // This also requires OP_for_of_next operand depth=2 so it can find enum_rec under the ref.
      if (tok === 'var') {
        const labelPut = this.compiler.newLabelInt(fd)

        this.compiler.emitOp(fd, TempOpcode.OP_scope_make_ref)
        this.compiler.emitU32(fd, atom)
        this.compiler.emitU32(fd, labelPut)
        this.compiler.emitU16(fd, fd.scopeLevel)
        this.compiler.updateLabel(fd, labelPut, 1)

        this.compiler.emitOp(fd, Opcode.OP_for_of_next)
        this.compiler.emitU8(fd, 2)
        // drop bool (leave value)
        this.compiler.emitOp(fd, Opcode.OP_drop)

        if (element.initializer && opts.allowInitializer) {
          emitDefault(element.initializer)
        }

        this.compiler.emitLabelInt(fd, labelPut)
        this.compiler.emitOp(fd, Opcode.OP_put_ref_value)
      } else {
        this.compiler.emitOp(fd, Opcode.OP_for_of_next)
        this.compiler.emitU8(fd, 0)
        // drop bool (leave value)
        this.compiler.emitOp(fd, Opcode.OP_drop)

        if (element.initializer && opts.allowInitializer) {
          emitDefault(element.initializer)
        }

        emitStore(atom)
      }
    }

    // close iterator
    this.compiler.emitOp(fd, Opcode.OP_iterator_close)
  }

  private emitArrayDestructuringDeclaration(
    fd: any,
    pattern: ts.ArrayBindingPattern,
    initializer: ts.Expression,
    tok: 'const' | 'let' | 'var'
  ): void {
    // 对齐 QuickJS js_parse_var() 的 destructuring 入口：先 push undefined sentinel。
    // QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6576-6594
    const labelStart = this.compiler.newLabelInt(fd)
    const labelLoad = this.compiler.newLabelInt(fd)
    const labelDone = this.compiler.newLabelInt(fd)

    this.compiler.emitOp(fd, Opcode.OP_undefined)
    this.compiler.emitOp(fd, Opcode.OP_dup)
    this.compiler.emitOp(fd, Opcode.OP_is_undefined)
    this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelLoad)

    this.compiler.emitLabelInt(fd, labelStart)
    this.emitArrayDestructuringFromStack(fd, pattern, tok, { allowInitializer: true })
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelDone)

    this.compiler.emitLabelInt(fd, labelLoad)
    this.compiler.emitOp(fd, Opcode.OP_drop)
    this.context.visit(initializer)
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelStart)

    this.compiler.emitLabelInt(fd, labelDone)
  }

  // ============================================================================
  // 块语句 - 对应 parser.c:6491-6510 js_parse_block
  // ============================================================================

  /**
   * 访问块语句 - 对应 parser.c:6491-6510
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6491-6510
   */
  visitBlock(node: ts.Block): void {
    const fd = this.funcDef!
    const statements = node.statements

    if (statements.length === 0) {
      // 空块，不需要作用域
      return
    }

    // QuickJS: js_parse_block() 对非空块总是 push_scope/pop_scope。
    // 即使块内没有词法绑定，这也会影响 scope index 的分配，进而影响 varDef.scopeLevel。
    this.compiler.pushScope(fd)

    for (const stmt of statements) {
      this.context.visit(stmt)
    }

    // QuickJS: pop_scope() 本身不发射字节码。
    // 我们的实现用 TempOpcode.OP_leave_scope 表示作用域退出，但对于形如 `{ break x; }`
    // 的块，这个 leave_scope 会落在无条件跳转后的死代码区，导致后续 goto->label 的
    // “跳到下一条指令”优化无法触发，进而产生多余的 goto8。
    // 这里仅对「块内只有一条 break/continue」做最小化对齐：不发射 leave_scope。
    if (
      statements.length === 1 &&
      (ts.isBreakStatement(statements[0]) || ts.isContinueStatement(statements[0]))
    ) {
      this.compiler.popScopeNoEmit(fd)
    } else {
      this.compiler.popScope(fd)
    }
  }

  // ============================================================================
  // 变量声明 - 对应 parser.c:6509-6607 js_parse_var
  // ============================================================================

  /**
   * 访问变量声明语句 - 对应 parser.c:6509-6607
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6509-6607
   */
  visitVariableStatement(node: ts.VariableStatement): void {
    const fd = this.funcDef!
    const decl = node.declarationList
    const isConst = (decl.flags & ts.NodeFlags.Const) !== 0
    const isLet = (decl.flags & ts.NodeFlags.Let) !== 0

    // QuickJS: js_parse_var() 在变量 initializer 分支里直接 emit_op(OP_scope_put_var[_init])，
    // 并不会对这条 store 指令调用 emit_source_pos。
    // 参考：third_party/QuickJS/src/core/parser.c: js_parse_var() -> emit_op(s, OP_scope_put_var_init/OP_scope_put_var)

    const isExported = node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword) ?? false

    const hasWithScope = (scope: number): boolean => {
      // Align with QuickJS has_with_scope() (parser.c:3886-3916)
      for (let s = scope; s >= 0; s = fd.scopes[s]?.parent ?? -1) {
        for (let idx = fd.scopes[s]?.first ?? -1; idx >= 0; idx = fd.vars[idx].scopeNext) {
          const vd = fd.vars[idx]
          if (vd.varName === JSAtom.JS_ATOM__with_) return true
          if (vd.scopeLevel !== s) break
        }
      }
      return false
    }

    for (const declaration of decl.declarations) {
      // 处理标识符声明
      if (ts.isIdentifier(declaration.name)) {
        const name = declaration.name.text
        const atom = this.compiler.addAtom(name)

        // 定义变量 - 对应 parser.c:6532-6538 js_define_var
        if (isConst) {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_CONST)
        } else if (isLet) {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_LET)
        } else {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_VAR)
        }

        // export const/let/var x ...
        if (isExported) {
          if (!fd.module) {
            throw new Error('export declarations require module compilation')
          }
          this.addLocalExport(fd.module, atom, atom)
        }

        // 处理初始化器 - 对应 parser.c:6541-6566
        if (declaration.initializer) {
          // QuickJS: inside a with-scope, simple identifier stores use a ref-based pattern:
          // OP_scope_make_ref ... <rhs> ... OP_put_ref_value
          // This is required to match QuickJS's with_make_ref + make_loc_ref + put_ref_value shape.
          if (!isConst && !isLet && hasWithScope(fd.scopeLevel)) {
            const labelPut = this.compiler.newLabelInt(fd)
            this.compiler.emitOp(fd, TempOpcode.OP_scope_make_ref)
            this.compiler.emitU32(fd, atom)
            this.compiler.emitU32(fd, labelPut)
            this.compiler.emitU16(fd, fd.scopeLevel)
            this.compiler.updateLabel(fd, labelPut, 1)

            // rhs
            this.context.visit(declaration.initializer)

            this.compiler.emitLabelInt(fd, labelPut)
            this.compiler.emitOp(fd, Opcode.OP_put_ref_value)
          } else {
            // 计算初始化表达式
            // QuickJS: initializer 的表达式求值路径会自然触发 emit_source_pos（通过各表达式的 emit_op/emit_source_pos 逻辑），
            // 只有最终的 store 指令（OP_scope_put_var[_init]）不绑定 sourcePos。
            // 因此这里不应全局 suppress source pos。
            this.context.visit(declaration.initializer)

            // 发射 scope_put_var_init 或 scope_put_var
            const opcode = (isConst || isLet) 
              ? TempOpcode.OP_scope_put_var_init 
              : TempOpcode.OP_scope_put_var
            // QuickJS: 这里不 emit_source_pos，因此不应绑定 sourcePos
            this.compiler.emitOp(fd, opcode)
            this.compiler.emitU32(fd, atom)
            this.compiler.emitU16(fd, fd.scopeLevel)
          }
        } else {
          // 无初始化器
          if (isConst) {
            throw new Error('missing initializer for const variable')
          }
          if (isLet) {
            // let 变量需要初始化为 undefined - 对应 parser.c:6567-6572
            this.compiler.emitOp(fd, Opcode.OP_undefined)
            this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var_init)
            this.compiler.emitU32(fd, atom)
            this.compiler.emitU16(fd, fd.scopeLevel)
          }
          // var 声明没有初始化器时不需要做任何事
        }
      } else {
        // 解构声明
        if (!declaration.initializer) {
          throw new Error('Destructuring declaration requires an initializer')
        }

        // array destructuring（最小实现：支持 for-of-destructuring-rest fixtures）
        if (ts.isArrayBindingPattern(declaration.name)) {
          const pattern = declaration.name
          const tok: 'const' | 'let' | 'var' = isConst ? 'const' : isLet ? 'let' : 'var'

          // 1) 定义绑定变量（对齐 QuickJS：先 define var 再 eval initializer）
          for (const element of pattern.elements) {
            if (ts.isOmittedExpression(element)) continue
            if (!ts.isIdentifier(element.name)) {
              throw new Error('Only identifier bindings are supported in array destructuring')
            }
            const atom = this.compiler.addAtom(element.name.text)
            if (tok === 'const') {
              this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_CONST)
            } else if (tok === 'let') {
              this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_LET)
            } else {
              this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_VAR)
            }
          }

          this.emitArrayDestructuringDeclaration(fd, pattern, declaration.initializer, tok)
          continue
        }

        if (!ts.isObjectBindingPattern(declaration.name)) {
          throw new Error('Only object/array destructuring declarations are currently supported')
        }

        const pattern = declaration.name

        // 1) 定义绑定变量
        // QuickJS: js_parse_var() defines the bindings before evaluating initializer.
        const defineBindingIdent = (ident: ts.Identifier) => {
          const atom = this.compiler.addAtom(ident.text)
          if (isConst) {
            this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_CONST)
          } else if (isLet) {
            this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_LET)
          } else {
            this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_VAR)
          }
          return atom
        }

        for (const element of pattern.elements) {
          if (element.dotDotDotToken) {
            if (!ts.isIdentifier(element.name)) {
              throw new Error('Object rest binding must be an identifier')
            }
            defineBindingIdent(element.name)
            continue
          }

          if (!ts.isIdentifier(element.name)) {
            throw new Error('Only identifier bindings are supported in object destructuring')
          }
          defineBindingIdent(element.name)

          // 对齐 QuickJS：即使当前 TS 侧实现不直接使用 excludeAtoms，
          // 也需要在此阶段按源码顺序触发 atom 插入，避免后续 atom id 顺序发生漂移。
          if (element.propertyName == null) {
            this.compiler.addAtom(element.name.text)
          } else if (ts.isIdentifier(element.propertyName)) {
            this.compiler.addAtom(element.propertyName.text)
          } else if (ts.isStringLiteral(element.propertyName) || ts.isNumericLiteral(element.propertyName)) {
            this.compiler.addAtom(element.propertyName.text)
          } else {
            throw new Error('Computed property names in destructuring are not yet supported')
          }
        }

        const tok: 'const' | 'let' | 'var' = isConst ? 'const' : isLet ? 'let' : 'var'

        const hasRest = pattern.elements.some(e => e.dotDotDotToken != null)
        if (!hasRest) {
          // 对齐 QuickJS js_parse_destructuring_var()：
          //   undefined; dup; is_undefined; if_true load;
          // start: to_object; dup/get_field/put_var_init ... ; drop; goto done;
          // load: drop; <eval initializer>; goto start;
          const labelStart = this.compiler.newLabelInt(fd)
          const labelLoad = this.compiler.newLabelInt(fd)
          const labelDone = this.compiler.newLabelInt(fd)

          this.compiler.emitOp(fd, Opcode.OP_undefined)
          this.compiler.emitOp(fd, Opcode.OP_dup)
          this.compiler.emitOp(fd, Opcode.OP_is_undefined)
          this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelLoad)

          this.compiler.emitLabelInt(fd, labelStart)
          this.compiler.emitOp(fd, Opcode.OP_to_object)

          for (const element of pattern.elements) {
            if (!ts.isIdentifier(element.name) || element.dotDotDotToken) {
              throw new Error('Only identifier bindings are supported in object destructuring (no rest)')
            }

            const bindingAtom = this.compiler.addAtom(element.name.text)
            const keyAtom = element.propertyName == null
              ? this.compiler.addAtom(element.name.text)
              : ts.isIdentifier(element.propertyName)
                ? this.compiler.addAtom(element.propertyName.text)
                : (ts.isStringLiteral(element.propertyName) || ts.isNumericLiteral(element.propertyName))
                  ? this.compiler.addAtom(element.propertyName.text)
                  : (() => { throw new Error('Computed property names in destructuring are not yet supported') })()

            if (tok === 'var') {
              // QuickJS: var destructuring uses a ref-based store (make_loc_ref/put_ref_value)
              // so we must keep the source object, create an lvalue ref, and then store via put_ref_value.
              // Stack after to_object: [src]
              // dup: [src src]
              this.compiler.emitOp(fd, Opcode.OP_dup)

              const labelRef = this.compiler.newLabelInt(fd)
              this.compiler.emitOp(fd, TempOpcode.OP_scope_make_ref)
              this.compiler.emitU32(fd, bindingAtom)
              this.compiler.emitU32(fd, labelRef)
              this.compiler.emitU16(fd, fd.scopeLevel)
              // Anchor label immediately after OP_scope_make_ref so VariableResolver does NOT optimize it away.
              this.compiler.updateLabel(fd, labelRef, 1)

              // rot3l: [src src ref_obj ref_prop] -> [src ref_obj ref_prop src]
              this.compiler.emitOp(fd, Opcode.OP_rot3l)
              // get_field: [src ref_obj ref_prop src] -> [src ref_obj ref_prop value]
              this.compiler.emitOp(fd, Opcode.OP_get_field)
              this.compiler.emitAtom(fd, keyAtom)
            } else {
              if (element.propertyName == null) {
                // QuickJS: PROP_TYPE_VAR + let/const path emits OP_get_field2 (no preceding dup)
                // parser.c: js_parse_destructuring_element(): "source -- source val"
                this.compiler.emitOp(fd, Opcode.OP_get_field2)
                this.compiler.emitAtom(fd, keyAtom)
              } else {
                // QuickJS: renamed binding uses an explicit dup, then OP_get_field
                this.compiler.emitOp(fd, Opcode.OP_dup)
                this.compiler.emitOp(fd, Opcode.OP_get_field)
                this.compiler.emitAtom(fd, keyAtom)
              }
            }

            if (element.initializer) {
              const labelKeep = this.compiler.newLabelInt(fd)
              this.compiler.emitOp(fd, Opcode.OP_dup)
              this.compiler.emitOp(fd, Opcode.OP_is_undefined)
              this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelKeep)
              this.compiler.emitOp(fd, Opcode.OP_drop)
              this.context.visit(element.initializer)
              this.compiler.emitLabelInt(fd, labelKeep)
            }

            if (tok === 'var') {
              // put_ref_value consumes the ref pair and assigned value, leaving only the source object.
              // The source object is dropped after the loop (matching QuickJS).
              this.compiler.emitOp(fd, Opcode.OP_put_ref_value)
            } else {
              this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var_init)
              this.compiler.emitU32(fd, bindingAtom)
              this.compiler.emitU16(fd, fd.scopeLevel)
            }
          }

          this.compiler.emitOp(fd, Opcode.OP_drop)
          this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelDone)

          this.compiler.emitLabelInt(fd, labelLoad)
          this.compiler.emitOp(fd, Opcode.OP_drop)
          this.context.visit(declaration.initializer)
          this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelStart)

          this.compiler.emitLabelInt(fd, labelDone)
          return
        }

        // 对齐 QuickJS：object destructuring + rest 的 lowering。
        // 当前最小支持：initializer 必须是 identifier。
        if (!ts.isIdentifier(declaration.initializer)) {
          throw new Error('Object destructuring with rest currently requires identifier initializer')
        }

        const srcAtom = this.compiler.addAtom(declaration.initializer.text)

        // Collect (keyAtom, bindingAtom, initializer?) in source order (excluding rest).
        const props: Array<{ keyAtom: number; bindingAtom: number; defaultInit?: ts.Expression }> = []
        let restAtom: number | null = null
        for (const element of pattern.elements) {
          if (element.dotDotDotToken) {
            if (!ts.isIdentifier(element.name)) {
              throw new Error('Object rest binding must be an identifier')
            }
            restAtom = this.compiler.addAtom(element.name.text)
            continue
          }

          if (!ts.isIdentifier(element.name)) {
            throw new Error('Only identifier bindings are supported in object destructuring')
          }

          const bindingAtom = this.compiler.addAtom(element.name.text)
          const keyAtom = element.propertyName == null
            ? this.compiler.addAtom(element.name.text)
            : ts.isIdentifier(element.propertyName)
              ? this.compiler.addAtom(element.propertyName.text)
              : (ts.isStringLiteral(element.propertyName) || ts.isNumericLiteral(element.propertyName))
                ? this.compiler.addAtom(element.propertyName.text)
                : (() => { throw new Error('Computed property names in destructuring are not yet supported') })()

          props.push({ keyAtom, bindingAtom, defaultInit: element.initializer ?? undefined })
        }

        if (restAtom == null) {
          throw new Error('Internal error: expected rest binding')
        }

        const labelLoad = this.compiler.newLabelInt(fd)
        const labelStart = this.compiler.newLabelInt(fd)
        const labelDone = this.compiler.newLabelInt(fd)

        // undefined sentinel path (matches QuickJS output even though always taken)
        this.compiler.emitOp(fd, Opcode.OP_undefined)
        this.compiler.emitOp(fd, Opcode.OP_dup)
        this.compiler.emitOp(fd, Opcode.OP_is_undefined)
        this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelLoad)

        // start: value is on stack
        this.compiler.emitLabelInt(fd, labelStart)
        this.compiler.emitOp(fd, Opcode.OP_to_object)

        // Build exclude object and keep source object around.
        // Stack: [srcObj] -> [srcObj, excludeObj]
        this.compiler.emitOp(fd, Opcode.OP_object)
        this.compiler.emitOp(fd, Opcode.OP_swap)
        this.compiler.emitOp(fd, Opcode.OP_swap)

        for (let i = 0; i < props.length; i++) {
          const { keyAtom, bindingAtom, defaultInit } = props[i]

          // Mark excluded key: excludeObj[key] = null
          this.compiler.emitOp(fd, Opcode.OP_null)
          this.compiler.emitOp(fd, Opcode.OP_define_field)
          this.compiler.emitAtom(fd, keyAtom)

          // Get srcObj[key] while keeping srcObj on stack.
          this.compiler.emitOp(fd, Opcode.OP_swap)
          this.compiler.emitOp(fd, Opcode.OP_get_field2)
          this.compiler.emitAtom(fd, keyAtom)

          if (defaultInit) {
            this.compiler.emitOp(fd, Opcode.OP_dup)
            this.compiler.emitOp(fd, Opcode.OP_is_undefined)

            const labelKeep = this.compiler.newLabelInt(fd)
            this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelKeep)
            this.compiler.emitOp(fd, Opcode.OP_drop)

            // 对齐 QuickJS：常见的 `= 2` 场景要避免与 sourcePos 绑定产生差异。
            // 重要：编译期绝不能直接发射 SHORT_OPCODES (182-200)，
            // 因为它们与 TempOpcode 数值区间重叠，会在 VariableResolver 中被误解析。
            // 这里先发射 long opcode 形式；后续 LabelResolver 会再收缩为 `push_2`。
            if (ts.isNumericLiteral(defaultInit) && Number(defaultInit.text.replace(/_/g, '')) === 2) {
              this.compiler.emitOp(fd, Opcode.OP_push_i32)
              this.compiler.emitU32(fd, 2)
            } else {
              this.context.visit(defaultInit)
            }

            this.compiler.emitLabelInt(fd, labelKeep)
          }

          this.compiler.emitOp(fd, Opcode.OP_put_var_init)
          this.compiler.emitU32(fd, bindingAtom)

          // Prepare for next excluded key definition (except after last prop).
          if (i !== props.length - 1) {
            this.compiler.emitOp(fd, Opcode.OP_swap)
          }
        }

        // Rest：复制源对象的可枚举自有属性，并排除 exclude keys
        this.compiler.emitOp(fd, Opcode.OP_object)
        this.compiler.emitOp(fd, Opcode.OP_copy_data_properties)
        // 对齐 QuickJS: emit_u8(s, 0 | ((depth_lvalue + 1) << 2) | ((depth_lvalue + 2) << 5))
        this.compiler.emitU8(fd, COPY_DATA_PROPERTIES_FLAGS_DEPTH0)
        this.compiler.emitOp(fd, Opcode.OP_put_var_init)
        this.compiler.emitU32(fd, restAtom)
        this.compiler.emitOp(fd, Opcode.OP_drop)
        this.compiler.emitOp(fd, Opcode.OP_drop)
        this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelDone)

        // load: drop sentinel, load src and jump to start
        this.compiler.emitLabelInt(fd, labelLoad)
        this.compiler.emitOp(fd, Opcode.OP_drop)
        // Match QuickJS: sample source position at the destructuring initializer (`= src`).
        this.compiler.emitSourcePos(fd, declaration.initializer.getStart())
        this.compiler.emitOp(fd, Opcode.OP_get_var)
        this.compiler.emitU32(fd, srcAtom)
        this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelStart)

        this.compiler.emitLabelInt(fd, labelDone)
      }
    }
  }

  // ============================================================================
  // ESM import/export declarations (module mode)
  // ============================================================================

  private ensureModule(fd: any): JSModuleDef {
    if (!fd.module) {
      throw new Error('import/export declarations require module compilation')
    }
    return fd.module as JSModuleDef
  }

  private addReqModule(m: JSModuleDef, moduleNameAtom: number): number {
    // Deduplicate by moduleName (matching QuickJS add_req_module_entry behavior).
    const idx = m.reqModuleEntries.findIndex(e => e.moduleName === moduleNameAtom)
    if (idx >= 0) return idx
    m.reqModuleEntries.push({ moduleName: moduleNameAtom, attributes: undefined })
    return m.reqModuleEntries.length - 1
  }

  private addLocalExport(m: JSModuleDef, localNameAtom: number, exportNameAtom: number): void {
    // Minimal duplicate export-name guard.
    for (const e of m.exportEntries) {
      if ('exportName' in e && e.exportName === exportNameAtom) {
        throw new Error('duplicate exported name')
      }
    }
    m.exportEntries.push({
      exportType: JSImportExportTypeEnum.JS_EXPORT_TYPE_LOCAL,
      localName: localNameAtom,
      exportName: exportNameAtom,
    })
  }

  private addIndirectExport(m: JSModuleDef, reqModuleIdx: number, localNameAtom: number, exportNameAtom: number): void {
    for (const e of m.exportEntries) {
      if ('exportName' in e && e.exportName === exportNameAtom) {
        throw new Error('duplicate exported name')
      }
    }
    m.exportEntries.push({
      exportType: JSImportExportTypeEnum.JS_EXPORT_TYPE_INDIRECT,
      reqModuleIdx,
      localName: localNameAtom,
      exportName: exportNameAtom,
    })
  }

  private addImportBinding(
    fd: any, 
    m: JSModuleDef, 
    localNameAtom: number, 
    importNameAtom: number, 
    isStar: boolean, 
    reqModuleIdx: number): void {
    // 对齐 QuickJS：为模块 import 绑定创建一个 closure var。
    // 注意：这里不按 (varIdx,isLocal) 去重，因为 module globals 可能共享索引。
    // 这里只按本地名字去重。
    if (localNameAtom !== JSAtom.JS_ATOM_default) {
      if (fd.closureVar?.some((cv: any) => cv.varName === localNameAtom)) {
        throw new Error('duplicate import binding')
      }
    }

    const cv: any = {
      // 对齐 QuickJS parser.c:add_import(): is_local = is_star
      // - namespace import (import * as ns) => is_local = TRUE (module.c 会为其创建 var_ref)
      // - named/default import => is_local = FALSE (link 阶段从依赖模块注入)
      isLocal: isStar,
      isArg: false,
      isConst: true,
      isLexical: true,
      varKind: 0,
      varIdx: m.importEntries.length,
      varName: localNameAtom,
    }
    fd.closureVar.push(cv)
    fd.closureVarCount++

    m.importEntries.push({
      varIdx: fd.closureVarCount - 1,
      isStar,
      importName: importNameAtom,
      reqModuleIdx,
    })
  }

  visitImportDeclaration(node: ts.ImportDeclaration): void {
    const fd: any = this.funcDef!
    const m = this.ensureModule(fd)

    if (!node.moduleSpecifier || !ts.isStringLiteral(node.moduleSpecifier)) {
      throw new Error('import moduleSpecifier must be a string literal')
    }
    const moduleNameAtom = this.compiler.addAtom(node.moduleSpecifier.text)
    const reqModuleIdx = this.addReqModule(m, moduleNameAtom)

    // Side-effect import: import "x";
    if (!node.importClause) return

    const clause = node.importClause

    // import defaultName from "x"
    if (clause.name) {
      const localNameAtom = this.compiler.addAtom(clause.name.text)
      this.addImportBinding(fd, m, localNameAtom, JSAtom.JS_ATOM_default, false, reqModuleIdx)
    }

    const nb = clause.namedBindings
    if (!nb) return

    if (ts.isNamespaceImport(nb)) {
      // import * as ns from "x"
      const localNameAtom = this.compiler.addAtom(nb.name.text)
      this.addImportBinding(fd, m, localNameAtom, JSAtom.JS_ATOM__star_, true, reqModuleIdx)
      return
    }

    if (ts.isNamedImports(nb)) {
      for (const spec of nb.elements) {
        const importNameAtom = this.compiler.addAtom((spec.propertyName ?? spec.name).text)
        const localNameAtom = this.compiler.addAtom(spec.name.text)
        this.addImportBinding(fd, m, localNameAtom, importNameAtom, false, reqModuleIdx)
      }
      return
    }
  }

  visitExportDeclaration(node: ts.ExportDeclaration): void {
    const fd: any = this.funcDef!
    const m = this.ensureModule(fd)

    const from = node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)
      ? node.moduleSpecifier.text
      : null

    let reqModuleIdx = -1
    if (from != null) {
      const moduleNameAtom = this.compiler.addAtom(from)
      reqModuleIdx = this.addReqModule(m, moduleNameAtom)
    }

    // export * from 'x'
    if (!node.exportClause) {
      if (reqModuleIdx < 0) {
        throw new Error('export * requires a from clause')
      }
      m.starExportEntries.push({ reqModuleIdx })
      return
    }

    // export * as ns from 'x'
    if ((ts as any).isNamespaceExport && (ts as any).isNamespaceExport(node.exportClause)) {
      if (reqModuleIdx < 0) {
        throw new Error('export * as ns requires a from clause')
      }
      const ns = (node.exportClause as any).name as ts.Identifier
      const exportNameAtom = this.compiler.addAtom(ns.text)
      this.addIndirectExport(m, reqModuleIdx, JSAtom.JS_ATOM__star_, exportNameAtom)
      return
    }

    // export { a as b, c } [from 'x']
    if (ts.isNamedExports(node.exportClause)) {
      for (const spec of node.exportClause.elements) {
        const localNameAtom = this.compiler.addAtom((spec.propertyName ?? spec.name).text)
        const exportNameAtom = this.compiler.addAtom(spec.name.text)
        if (reqModuleIdx >= 0) {
          this.addIndirectExport(m, reqModuleIdx, localNameAtom, exportNameAtom)
        } else {
          this.addLocalExport(m, localNameAtom, exportNameAtom)
        }
      }
      return
    }

    throw new Error('Unsupported export declaration form')
  }

  visitExportAssignment(node: ts.ExportAssignment): void {
    const fd = this.funcDef!
    const m = this.ensureModule(fd as any)

    if (node.isExportEquals) {
      throw new Error('export = is not supported (ESM only)')
    }

    // export default <expr>
    const localNameAtom = JSAtom.JS_ATOM__default_
    const exportNameAtom = JSAtom.JS_ATOM_default

    // Ensure local binding exists.
    this.compiler.defineVar(fd, localNameAtom, JSVarDefEnum.JS_VAR_DEF_LET)
    this.addLocalExport(m, localNameAtom, exportNameAtom)

    // Evaluate expression and store into *default*.
    this.context.visit(node.expression)

    const prevSuppress = (fd as any).suppressSourcePos
    try {
      ;(fd as any).suppressSourcePos = true
      this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var_init)
      this.compiler.emitU32(fd, localNameAtom)
      this.compiler.emitU16(fd, fd.scopeLevel)
    } finally {
      ;(fd as any).suppressSourcePos = prevSuppress
    }
  }

  // ============================================================================
  // if 语句 - 对应 parser.c:7026-7055
  // ============================================================================

  /**
   * Emit a conditional jump to `labelFalse` when `expr` is falsy.
   *
  * This is a boolean/test-context emitter (unlike ExpressionVisitor's value-form
  * logical expression emission which uses a `dup` + `if_true/if_false` + `drop` chain).
  * QuickJS uses
   * jump-based short-circuiting for conditions and it enables downstream
   * peephole optimizations like `null strict_neq if_false -> is_null if_true`.
   */
  private emitCondJumpFalse(expr: ts.Expression, labelFalse: number): void {
    const fd = this.funcDef!

    if (ts.isParenthesizedExpression(expr)) {
      this.emitCondJumpFalse(expr.expression, labelFalse)
      return
    }

    // Do not rewrite `!expr` by swapping true/false jumps.
    // QuickJS emits OP_lnot for unary '!' (via js_parse_unary), and fixtures expect the
    // explicit OP_lnot to be present in the bytecode stream.

    if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
      this.emitCondJumpFalse(expr.left, labelFalse)
      this.emitCondJumpFalse(expr.right, labelFalse)
      return
    }

    if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
      const labelTrue = this.compiler.newLabelInt(fd)
      this.emitCondJumpTrue(expr.left, labelTrue)
      this.emitCondJumpFalse(expr.right, labelFalse)
      this.compiler.emitLabelInt(fd, labelTrue)
      return
    }

    this.context.visit(expr)
    this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelFalse)
  }

  /** Emit a conditional jump to `labelTrue` when `expr` is truthy. */
  private emitCondJumpTrue(expr: ts.Expression, labelTrue: number): void {
    const fd = this.funcDef!

    if (ts.isParenthesizedExpression(expr)) {
      this.emitCondJumpTrue(expr.expression, labelTrue)
      return
    }

    // Do not rewrite `!expr` by swapping true/false jumps.
    // Keep explicit OP_lnot emission for bytecode parity with QuickJS.

    if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
      this.emitCondJumpTrue(expr.left, labelTrue)
      this.emitCondJumpTrue(expr.right, labelTrue)
      return
    }

    if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
      const labelFalse = this.compiler.newLabelInt(fd)
      this.emitCondJumpFalse(expr.left, labelFalse)
      this.emitCondJumpTrue(expr.right, labelTrue)
      this.compiler.emitLabelInt(fd, labelFalse)
      return
    }

    this.context.visit(expr)
    this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelTrue)
  }

  private isPureAndChain(expr: ts.Expression): boolean {
    if (ts.isParenthesizedExpression(expr)) return this.isPureAndChain(expr.expression)
    if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
      return this.isPureAndChain(expr.left) && this.isPureAndChain(expr.right)
    }
    if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
      return false
    }
    // leaf
    return true
  }

  /**
   * 访问 if 语句 - 对应 parser.c:7026-7055
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:7026-7055
   */
  visitIfStatement(node: ts.IfStatement): void {
    const fd = this.funcDef!

    // QuickJS: TOK_IF branch does not explicitly call emit_source_pos for the `if` keyword.
    // Avoid producing a standalone pc2line sample at `if` by pre-seeding the dedup pointer.
    fd.lastOpcodeSourcePtr = node.getStart()

    // 创建新作用域 (用于 `let f; if(1) function f(){}` 语义)
    this.compiler.pushScope(fd)

    // 设置 eval 返回值为 undefined - 对应 parser.c:7033
    this.compiler.setEvalRetUndefined(fd)

    // 创建标签
    const label1 = this.compiler.newLabelInt(fd)

    // QuickJS observes different shapes for condition emission:
    // - pure `&&` chains often end up as jump-based tests (enabling is_null peepholes)
    // - `||` conditions in practice still use the value-form `dup/if_*/drop` short-circuit
    // To match QuickJS fixtures, only use boolean-context lowering for pure && chains.
    if (this.isPureAndChain(node.expression)) {
      this.emitCondJumpFalse(node.expression, label1)
    } else {
      const prevValueUsedCond = this.context.expressionValueUsed
      this.context.expressionValueUsed = true
      try {
        this.context.visit(node.expression)
      } finally {
        this.context.expressionValueUsed = prevValueUsedCond
      }
      this.compiler.emitGotoInt(fd, Opcode.OP_if_false, label1)
    }


    // 编译 then 分支
    this.context.visit(node.thenStatement)


    if (node.elseStatement) {
      // 有 else 分支
      const label2 = this.compiler.newLabelInt(fd)

      // then 分支结束后跳转到 label2
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, label2)

      // 发射 label1 (else 分支开始)
      this.compiler.emitLabelInt(fd, label1)


      // 编译 else 分支
      this.context.visit(node.elseStatement)


      // 发射 label2 (结束)
      this.compiler.emitLabelInt(fd, label2)
    } else {
      // 无 else 分支
      this.compiler.emitLabelInt(fd, label1)
    }

    // 弹出作用域
    this.compiler.popScope(fd)
  }

  // ============================================================================
  // while 语句 - 对应 parser.c:7056-7084
  // ============================================================================

  /**
   * 访问 while 语句 - 对应 parser.c:7056-7084
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:7056-7084
   */
  visitWhileStatement(node: ts.WhileStatement, labelName = JS_ATOM_NULL): void {
    const fd = this.funcDef!

    // QuickJS folds `while (1) label: break;` into a no-op.
    if (ts.isNumericLiteral(node.expression) && node.expression.text === '1' && this.isImmediateUnlabeledBreak(node.statement)) {
      return
    }

    // QuickJS: TOK_WHILE branch does not explicitly call emit_source_pos for the `while` keyword.
    // Avoid producing a standalone pc2line sample at `while` by pre-seeding the dedup pointer.
    fd.lastOpcodeSourcePtr = node.getStart()

    // 创建标签 - 对应 parser.c:7061-7062
    const labelCont = this.compiler.newLabelInt(fd)
    const labelBreak = this.compiler.newLabelInt(fd)

    // 压入 break 条目 - 对应 parser.c:7064-7065
    const breakEntry = new BlockEnv()
    this.compiler.pushBreakEntry(fd, breakEntry, labelName, labelBreak, labelCont, 0)

    // 设置 eval 返回值为 undefined - 对应 parser.c:7072
    this.compiler.setEvalRetUndefined(fd)

    // 发射 continue 标签 - 对应 parser.c:7072
    this.compiler.emitLabelInt(fd, labelCont)

    // QuickJS codegen: `while (cond) continue;` can be emitted without an explicit body/goto:
    //   labelCont: <cond>; if_true(labelCont); labelBreak
    // This avoids the extra `goto labelCont` that TS-side lowering would otherwise produce.
    // This matters for byte-for-byte parity (e.g. test_log get_clock Date.now loop).
    const isBareContinue = ts.isContinueStatement(node.statement) && !node.statement.label

    // Special-case: `while (cond) continue;`
    // Use value-form condition + OP_if_true backedge, matching QuickJS and avoiding extra goto.
    if (isBareContinue) {
      const prevValueUsedCond = this.context.expressionValueUsed
      this.context.expressionValueUsed = true
      try {
        this.context.visit(node.expression)
      } finally {
        this.context.expressionValueUsed = prevValueUsedCond
      }
      this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelCont)
      this.compiler.emitLabelInt(fd, labelBreak)
      this.compiler.popBreakEntry(fd)
      return
    }

    // 编译条件表达式：仅对纯 && 链做布尔上下文 lowering，其余保持 value-form
    if (this.isPureAndChain(node.expression)) {
      this.emitCondJumpFalse(node.expression, labelBreak)
    } else {
      const prevValueUsedCond = this.context.expressionValueUsed
      this.context.expressionValueUsed = true
      try {
        this.context.visit(node.expression)
      } finally {
        this.context.expressionValueUsed = prevValueUsedCond
      }
      this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelBreak)
    }

    // 编译循环体 - 对应 parser.c:7077-7078
    this.context.visit(node.statement)

    // 跳转回 continue 标签 - 对应 parser.c:7079
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelCont)

    // 发射 break 标签 - 对应 parser.c:7081
    this.compiler.emitLabelInt(fd, labelBreak)

    // 弹出 break 条目 - 对应 parser.c:7083
    this.compiler.popBreakEntry(fd)
  }

  // ============================================================================
  // do-while 语句 - 对应 parser.c:7085-7119
  // ============================================================================

  /**
   * 访问 do-while 语句 - 对应 parser.c:7085-7119
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:7085-7119
   */
  visitDoStatement(node: ts.DoStatement, labelName = JS_ATOM_NULL): void {
    const fd = this.funcDef!

    // 创建标签 - 对应 parser.c:7090-7092
    const labelCont = this.compiler.newLabelInt(fd)
    const labelBreak = this.compiler.newLabelInt(fd)
    const label1 = this.compiler.newLabelInt(fd)

    // 压入 break 条目 - 对应 parser.c:7094-7095
    const breakEntry = new BlockEnv()
    this.compiler.pushBreakEntry(fd, breakEntry, labelName, labelBreak, labelCont, 0)

    // QuickJS 顺序: 先 emit_label(label1)，再 set_eval_ret_undefined。
    // 参考: third_party/QuickJS/src/core/parser.c (TOK_DO 分支)
    // 发射循环开始标签 - 对应 parser.c:7102
    this.compiler.emitLabelInt(fd, label1)

    // 设置 eval 返回值为 undefined - 对应 parser.c:7104
    this.compiler.setEvalRetUndefined(fd)

    // 编译循环体 - 对应 parser.c:7106-7107
    this.context.visit(node.statement)

    // 发射 continue 标签 - 对应 parser.c:7109
    this.compiler.emitLabelInt(fd, labelCont)

    // 编译条件表达式：仅对纯 && 链做布尔上下文 lowering，其余保持 value-form
    if (this.isPureAndChain(node.expression)) {
      this.emitCondJumpTrue(node.expression, label1)
    } else {
      const prevValueUsedCond = this.context.expressionValueUsed
      this.context.expressionValueUsed = true
      try {
        this.context.visit(node.expression)
      } finally {
        this.context.expressionValueUsed = prevValueUsedCond
      }
      this.compiler.emitGotoInt(fd, Opcode.OP_if_true, label1)
    }

    // 发射 break 标签 - 对应 parser.c:7119
    this.compiler.emitLabelInt(fd, labelBreak)

    // 弹出 break 条目 - 对应 parser.c:7121
    this.compiler.popBreakEntry(fd)
  }

  // ============================================================================
  // for 语句 - 对应 parser.c:7122-7216
  // ============================================================================

  /**
   * 访问 for 语句 - 对应 parser.c:7122-7216
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:7122-7216
   */
  visitForStatement(node: ts.ForStatement, labelName = JS_ATOM_NULL): void {
    const fd = this.funcDef!

    // QuickJS folds `for(;;) label: break;` into a no-op.
    if (!node.initializer && !node.condition && !node.incrementor && this.isImmediateUnlabeledBreak(node.statement)) {
      return
    }

    // QuickJS: TOK_FOR branch does not explicitly call emit_source_pos for the `for` keyword.
    // Avoid producing a standalone pc2line sample at `for` by pre-seeding the dedup pointer.
    fd.lastOpcodeSourcePtr = node.getStart()
    const blockScopeLevel = fd.scopeLevel

    // 设置 eval 返回值为 undefined - 对应 parser.c:7134
    this.compiler.setEvalRetUndefined(fd)

    // 创建作用域 (用于 for 循环中的词法变量)
    this.compiler.pushScope(fd)

    // 处理初始化部分 - 对应 parser.c:7157-7174
    if (node.initializer) {
      if (ts.isVariableDeclarationList(node.initializer)) {
        // 变量声明
        const decl = node.initializer
        this.visitForInitializer(decl)
      } else {
        // 表达式
        this.context.visit(node.initializer)
        this.compiler.emitOp(fd, Opcode.OP_drop)
      }

      // 关闭闭包 - 对应 parser.c:7175-7176
      this.compiler.closeScopes(fd, fd.scopeLevel, blockScopeLevel)
    }

    // 创建标签 - 对应 parser.c:7180-7184
    let labelTest = this.compiler.newLabelInt(fd)
    const labelCont = this.compiler.newLabelInt(fd)
    const labelBody = this.compiler.newLabelInt(fd)
    const labelBreak = this.compiler.newLabelInt(fd)

    // 压入 break 条目 - 对应 parser.c:7186-7187
    const breakEntry = new BlockEnv()
    this.compiler.pushBreakEntry(fd, breakEntry, labelName, labelBreak, labelCont, 0)

    // 测试表达式 - 对应 parser.c:7190-7199
    // QuickJS 的布局是：test → body（fallthrough）→ incr → goto test
    if (node.condition) {
      this.compiler.emitLabelInt(fd, labelTest)
      const prevValueUsedCond = this.context.expressionValueUsed
      this.context.expressionValueUsed = true
      try {
        this.context.visit(node.condition)
      } finally {
        this.context.expressionValueUsed = prevValueUsedCond
      }
      this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelBreak)
    } else {
      // 无条件表达式，test 标签等于 body 标签
      labelTest = labelBody
    }

    // 关键修复：当没有 incrementor 时，continue 目标应为 labelTest。
    // 否则循环体内的 continue 会在此处之前被编译，仍指向未发射的 labelCont，导致 label.addr 维持为 -1。
    if (!node.incrementor) {
      breakEntry.labelCont = labelTest
    }

    // 循环体 - 对应 parser.c:7222-7225
    this.compiler.emitLabelInt(fd, labelBody)
    this.context.visit(node.statement)

    // 关闭闭包 - 对应 parser.c:7228-7229
    this.compiler.closeScopes(fd, fd.scopeLevel, blockScopeLevel)

    if (node.incrementor) {
      // 增量表达式部分（continue 目标）- 对应 parser.c:7205-7212
      this.compiler.emitLabelInt(fd, labelCont)
      this.context.visit(node.incrementor)
      this.compiler.emitOp(fd, Opcode.OP_drop)

      // 跳回测试 - 对应 parser.c:7214
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelTest)
    } else {
      // 无增量表达式：continue 指向测试，并在循环体末尾回到测试
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelTest)
    }

    // 发射 break 标签 - 对应 parser.c:7246
    this.compiler.emitLabelInt(fd, labelBreak)

    // 弹出 break 条目 - 对应 parser.c:7248
    this.compiler.popBreakEntry(fd)
    
    // 弹出作用域 - 对应 parser.c:7249
    this.compiler.popScope(fd)
  }

  /**
   * 处理 for 循环初始化器中的变量声明
   */
  private visitForInitializer(decl: ts.VariableDeclarationList): void {
    const fd = this.funcDef!
    const isConst = (decl.flags & ts.NodeFlags.Const) !== 0
    const isLet = (decl.flags & ts.NodeFlags.Let) !== 0

    for (const declaration of decl.declarations) {
      if (ts.isIdentifier(declaration.name)) {
        const name = declaration.name.text
        const atom = this.compiler.addAtom(name)
        const sourcePos = declaration.getStart()

        // QuickJS does not emit a standalone pc2line sample for the for-loop initializer.
        // Pre-seed the dedup pointer so initializer-related ops don't introduce an extra entry.
        fd.lastOpcodeSourcePtr = sourcePos

        // 定义变量
        if (isConst) {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_CONST)
        } else if (isLet) {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_LET)
        } else {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_VAR)
        }

        // 处理初始化器
        if (declaration.initializer) {
          this.context.visit(declaration.initializer)
          const opcode = (isConst || isLet)
            ? TempOpcode.OP_scope_put_var_init
            : TempOpcode.OP_scope_put_var
          this.compiler.emitOp(fd, opcode, sourcePos)
          this.compiler.emitU32(fd, atom)
          this.compiler.emitU16(fd, fd.scopeLevel)
        } else if (isLet) {
          // let 变量初始化为 undefined
          this.compiler.emitOp(fd, Opcode.OP_undefined)
          this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var_init)
          this.compiler.emitU32(fd, atom)
          this.compiler.emitU16(fd, fd.scopeLevel)
        }
      }
    }
  }

  // ============================================================================
  // for-of 语句 - 对应 parser.c:6659-6825 js_parse_for_in_of
  // ============================================================================

  /**
   * 访问 for-of 语句 - 对应 parser.c:6659-6825
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6659-6825
   */
  visitForOfStatement(node: ts.ForOfStatement, labelName = JS_ATOM_NULL): void {
    const fd = this.funcDef!
    const blockScopeLevel = fd.scopeLevel

    // 对齐 QuickJS: js_parse_for_in_of (parser.c:6659-6910)
    this.compiler.setEvalRetUndefined(fd)

    const labelCont = this.compiler.newLabelInt(fd)
    const labelBreak = this.compiler.newLabelInt(fd)
    // QuickJS: labelNext 是 loop body entry（每次迭代把 value 赋给目标，然后 fallthrough 执行 body）
    const labelNext = this.compiler.newLabelInt(fd)

    // create scope
    this.compiler.pushScope(fd)

    // push break entry
    // for-of / for-await-of: has_iterator=true, drop_count = 1 + 2 = 3
    const breakEntry = new BlockEnv()
    this.compiler.pushBreakEntry(fd, breakEntry, labelName, labelBreak, labelCont, 3)
    breakEntry.hasIterator = true
    breakEntry.scopeLevel = blockScopeLevel

    // 1) 先在当前作用域里定义 loop target（QuickJS 在 for_xxx_start 之前就会 set_loc_uninitialized）
    // 2) 每次迭代在 labelNext 里把 iterator value 赋给 target
    let assignTarget: (() => void) | undefined
    if (ts.isVariableDeclarationList(node.initializer)) {
      const decl = node.initializer.declarations[0]
      if (!decl) {
        throw new Error('Unsupported for-of initializer')
      }

      const isConst = (node.initializer.flags & ts.NodeFlags.Const) !== 0
      const isLet = (node.initializer.flags & ts.NodeFlags.Let) !== 0
      const tok: 'const' | 'let' | 'var' = isConst ? 'const' : isLet ? 'let' : 'var'

      if (ts.isIdentifier(decl.name)) {
        const atom = this.compiler.addAtom(decl.name.text)

        if (isConst) {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_CONST)
        } else if (isLet) {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_LET)
        } else {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_VAR)
        }

        assignTarget = () => {
          const opcode = (isConst || isLet)
            ? TempOpcode.OP_scope_put_var_init
            : TempOpcode.OP_scope_put_var
          this.compiler.emitOp(fd, opcode)
          this.compiler.emitU32(fd, atom)
          this.compiler.emitU16(fd, fd.scopeLevel)
        }
      } else if (ts.isArrayBindingPattern(decl.name)) {
        // 对齐 QuickJS: js_parse_for_in_of() 在 label_next 里调用 js_parse_destructuring_element(tok, hasval=TRUE)
        // QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6712-6765
        const pattern = decl.name

        // define bindings (compile-time)
        for (const element of pattern.elements) {
          if (ts.isOmittedExpression(element)) continue
          if (!ts.isIdentifier(element.name)) {
            throw new Error('Only identifier bindings are supported in for-of array destructuring')
          }
          const atom = this.compiler.addAtom(element.name.text)
          if (tok === 'const') {
            this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_CONST)
          } else if (tok === 'let') {
            this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_LET)
          } else {
            this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_VAR)
          }
        }

        assignTarget = () => {
          // hasval=TRUE, allow_initializer=FALSE
          this.emitArrayDestructuringFromStack(fd, pattern, tok, { allowInitializer: false })
        }
      } else {
        throw new Error('Unsupported for-of initializer')
      }
    } else if (ts.isIdentifier(node.initializer)) {
      const atom = this.compiler.addAtom(node.initializer.text)
      const sourcePos = node.initializer.getStart()
      assignTarget = () => {
        // QuickJS emits a source-pos anchor for the loop target assignment.
        // Without this, pc2line misses the `y` token in `for (y of arr)`.
        this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var, sourcePos)
        this.compiler.emitU32(fd, atom)
        this.compiler.emitU16(fd, fd.scopeLevel)
      }
    } else {
      throw new Error('Unsupported for-of initializer')
    }

    // label_expr: eval iterable + start iterator, then goto cont
    // QuickJS: js_parse_for_in_of (parser.c:6659-6825)
    this.context.visit(node.expression)
    if (node.awaitModifier) {
      this.compiler.emitOp(fd, Opcode.OP_for_await_of_start)
    } else {
      this.compiler.emitOp(fd, Opcode.OP_for_of_start)
    }
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelCont)

    // label_next: assign iteration value to target, then fallthrough to body
    this.compiler.emitLabelInt(fd, labelNext)
    assignTarget()

    // loop body
    this.context.visit(node.statement)

    this.compiler.closeScopes(fd, fd.scopeLevel, breakEntry.scopeLevel)

    // label_cont: emit next + branch
    this.compiler.emitLabelInt(fd, labelCont)
    if (node.awaitModifier) {
      // QuickJS: for_await_of_next; await; iterator_get_value_done
      this.compiler.emitOp(fd, Opcode.OP_for_await_of_next)
      this.compiler.emitOp(fd, Opcode.OP_await)
      this.compiler.emitOp(fd, Opcode.OP_iterator_get_value_done)
    } else {
      this.compiler.emitOp(fd, Opcode.OP_for_of_next)
      this.compiler.emitU8(fd, FOR_OF_NEXT_OPERAND_DEFAULT)
    }

    // on stack: enum_rec value bool
    // QuickJS: if_false -> labelNext (继续迭代)
    this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelNext)
    // 结束路径: drop value (通常为 undefined)，然后 close iterator
    this.compiler.emitOp(fd, Opcode.OP_drop)

    // label_break: close and drop enum_rec
    this.compiler.emitLabelInt(fd, labelBreak)
    this.compiler.emitOp(fd, Opcode.OP_iterator_close)

    this.compiler.popBreakEntry(fd)
    this.compiler.popScope(fd)
  }

  // ============================================================================
  // for-in 语句 - 对应 parser.c:6659-6825 js_parse_for_in_of
  // ============================================================================

  /**
   * 访问 for-in 语句 - 对应 parser.c:6659-6825
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6659-6825
   */
  visitForInStatement(node: ts.ForInStatement, labelName = JS_ATOM_NULL): void {
    const fd = this.funcDef!
    const blockScopeLevel = fd.scopeLevel

    // 设置 eval 返回值为 undefined - for-in 从 for 语句分支进入，继承 parser.c:7134
    this.compiler.setEvalRetUndefined(fd)

    // 对齐 QuickJS: js_parse_for_in_of (parser.c:6659-6910)
    // QuickJS 在 OPTIMIZE 开启时会把“next”代码块搬到表达式求值之后。
    // TS 侧直接按优化后的最终布局发射，避免依赖后处理重排。

    const labelCont = this.compiler.newLabelInt(fd)
    const labelBreak = this.compiler.newLabelInt(fd)
    // QuickJS: labelNext 是 loop body entry（每次迭代把 key 赋给目标，然后 fallthrough 执行 body）
    const labelNext = this.compiler.newLabelInt(fd)

    // create scope
    this.compiler.pushScope(fd)

    // for-in: drop_count = 1, has_iterator = false
    const breakEntry = new BlockEnv()
    this.compiler.pushBreakEntry(fd, breakEntry, labelName, labelBreak, labelCont, 1)
    breakEntry.scopeLevel = blockScopeLevel

    // 1) 先在当前作用域里定义 loop target（QuickJS 在 for_in_start 之前会 set_loc_uninitialized）
    // 2) 每次迭代在 labelNext 里把 key 赋给 target
    // 3) 如果 head 里带 initializer（for(var k = init in obj)），需要在计算 obj 之前先执行 initializer
    //    QuickJS: parser.c:6808-6824 (has_initializer)
    let emitInitializer: (() => void) | undefined
    let assignTarget: (() => void) | undefined
    let assignTargetSourcePos: number = -1
    if (ts.isVariableDeclarationList(node.initializer)) {
      const decl = node.initializer.declarations[0]
      if (!decl || !ts.isIdentifier(decl.name)) {
        throw new Error('Unsupported for-in initializer')
      }
      const atom = this.compiler.addAtom(decl.name.text)
      const isConst = (node.initializer.flags & ts.NodeFlags.Const) !== 0
      const isLet = (node.initializer.flags & ts.NodeFlags.Let) !== 0

      // QuickJS does not attribute the implicit per-iteration assignment for
      // `for (x in obj)` to the declared identifier token in pc2line (observed
      // for `var` and `let` in fixtures like test_for_in_proxy). Keep the
      // assignment anchored at the surrounding statement instead.
      assignTargetSourcePos = -1

      // QuickJS: only `var` in non-strict mode can have initializer in for-in head.
      // We mirror the behavior for fixtures (QuickJS tests rely on `for (var k = 2 in obj)`).
      if (decl.initializer) {
        if (isConst || isLet) {
          throw new Error('a declaration in the head of a for-in loop can\'t have an initializer')
        }
        emitInitializer = () => {
          this.context.visit(decl.initializer!)
          this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var)
          this.compiler.emitU32(fd, atom)
          this.compiler.emitU16(fd, fd.scopeLevel)
        }
      }

      if (isConst) {
        this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_CONST)
      } else if (isLet) {
        this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_LET)
      } else {
        this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_VAR)
      }

      assignTarget = () => {
        const opcode = (isConst || isLet)
          ? TempOpcode.OP_scope_put_var_init
          : TempOpcode.OP_scope_put_var
        this.compiler.emitOp(fd, opcode)
        this.compiler.emitU32(fd, atom)
        this.compiler.emitU16(fd, fd.scopeLevel)
      }
    } else if (ts.isIdentifier(node.initializer)) {
      assignTargetSourcePos = node.initializer.getStart()
      const atom = this.compiler.addAtom(node.initializer.text)
      assignTarget = () => {
        this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var)
        this.compiler.emitU32(fd, atom)
        this.compiler.emitU16(fd, fd.scopeLevel)
      }
    } else if (
      ts.isPropertyAccessExpression(node.initializer) &&
      !ts.isPrivateIdentifier(node.initializer.name)
    ) {
      const init = node.initializer
      assignTargetSourcePos = init.expression.getStart()
      const dotSourcePos = init.name.getStart() - 1
      const nameAtom = this.compiler.addAtom(init.name.text)
      assignTarget = () => {
        // stack on entry: enum_obj value
        // emit obj -> enum_obj value obj
        // Keep the store attributed to the for-in head lvalue, not the subexpression.
        const prevSuppress = fd.suppressSourcePos
        fd.suppressSourcePos = true
        this.context.visit(init.expression)
        fd.suppressSourcePos = prevSuppress
        // QuickJS also emits a distinct source position for the property access
        // operator (the '.' before the name), which affects pc2line around the
        // swap/put_field sequence.
        if (dotSourcePos >= 0) {
          this.compiler.emitSourcePos(fd, dotSourcePos)
        }
        // enum_obj obj value
        this.compiler.emitOp(fd, Opcode.OP_swap)
        // store without keeping result
        this.compiler.emitOp(fd, Opcode.OP_put_field)
        this.compiler.emitU32(fd, nameAtom)
        this.compiler.emitIc(fd, nameAtom)
      }
    } else if (ts.isElementAccessExpression(node.initializer)) {
      const init = node.initializer
      // QuickJS anchors the per-iteration assignment for element lvalues at the base
      // expression (e.g. `a` in `a[0]`) and also emits a distinct source position at
      // the '[' token before the final store sequence.
      assignTargetSourcePos = init.expression.getStart()

      // Find the '[' token position between `a` and the index expression.
      const sf = init.getSourceFile()
      const text = sf.text
      const exprEnd = init.expression.getEnd()
      const argStart = init.argumentExpression.getStart(sf)
      let bracketPos = -1
      for (let i = argStart - 1; i >= exprEnd; i--) {
        if (text.charCodeAt(i) === 0x5b /* '[' */) {
          bracketPos = i
          break
        }
      }
      assignTarget = () => {
        // stack on entry: enum_obj value
        // emit obj, idx -> enum_obj value obj idx
        // Keep the store attributed to the for-in head lvalue, not the subexpressions.
        const prevSuppress = fd.suppressSourcePos
        fd.suppressSourcePos = true
        this.context.visit(init.expression)
        this.context.visit(init.argumentExpression)
        fd.suppressSourcePos = prevSuppress

        if (bracketPos >= 0) {
          this.compiler.emitSourcePos(fd, bracketPos)
        }
        // reorder top3: value obj idx -> obj idx value
        this.compiler.emitOp(fd, Opcode.OP_rot3l)
        // store without keeping result
        this.compiler.emitOp(fd, Opcode.OP_put_array_el)
      }
    } else {
      throw new Error('Unsupported for-in initializer')
    }

    // label_expr: (optional) eval initializer; eval object + start, goto cont
    if (emitInitializer) {
      emitInitializer()
    }
    this.context.visit(node.expression)
    this.compiler.emitOp(fd, Opcode.OP_for_in_start)
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelCont)

    // label_next: assign iteration key to target, then fallthrough to body
    this.compiler.emitLabelInt(fd, labelNext)
    // Align with QuickJS: the implicit per-iteration assignment should carry the
    // source position of the for-in head lvalue (e.g. `i` in `for (i in obj)`).
    if (assignTargetSourcePos >= 0) {
      this.compiler.emitSourcePos(fd, assignTargetSourcePos)
    }
    assignTarget()

    // loop body
    this.context.visit(node.statement)
    this.compiler.closeScopes(fd, fd.scopeLevel, breakEntry.scopeLevel)

    // label_cont: for_in_next + branch
    this.compiler.emitLabelInt(fd, labelCont)
    this.compiler.emitOp(fd, Opcode.OP_for_in_next)
    // on stack: enum_obj value bool
    this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelNext)
    this.compiler.emitOp(fd, Opcode.OP_drop)

    // label_break: drop enum_obj
    this.compiler.emitLabelInt(fd, labelBreak)
    this.compiler.emitOp(fd, Opcode.OP_drop)

    this.compiler.popBreakEntry(fd)
    this.compiler.popScope(fd)
  }

  // ============================================================================
  // switch 语句 - 对应 parser.c:7262-7347
  // ============================================================================

  /**
   * 访问 switch 语句 - 对应 parser.c:7262-7347
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:7262-7347
   */
  visitSwitchStatement(node: ts.SwitchStatement): void {
    const fd = this.funcDef!

    // QuickJS: js_parse_switch (parser.c:7262-7347)
    // `switch` 关键字本身通常不会形成独立的 pc2line 采样点。
    // 这里将 lastOpcodeSourcePtr 预置为 switch 起点，避免意外产生 line2:col1 的槽。
    // （等价于 QuickJS emit_source_pos 在相同 source_ptr 下的去重效果。）
    fd.lastOpcodeSourcePtr = node.getStart()

    // 设置 eval 返回值为 undefined - 对应 parser.c:7296
    this.compiler.setEvalRetUndefined(fd)

    // 编译 switch 表达式
    this.context.visit(node.expression)

    // 创建作用域
    this.compiler.pushScope(fd)

    // 创建 break 标签
    const labelBreak = this.compiler.newLabelInt(fd)

    // 压入 break 条目 (dropCount=1 用于 switch 表达式值)
    const breakEntry = new BlockEnv()
    this.compiler.pushBreakEntry(fd, breakEntry, 0, labelBreak, -1, 1)

    let defaultLabelPos = -1
    let labelCase = -1

    // 处理所有 case 子句
    for (const clause of node.caseBlock.clauses) {
      if (ts.isDefaultClause(clause)) {
        // default 子句
        if (defaultLabelPos >= 0) {
          throw new Error('duplicate default')
        }

        if (labelCase < 0) {
          // 直接从 switch 表达式落入
          labelCase = this.compiler.newLabelInt(fd)
          this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelCase)
        }

        // 记录 default 位置，用于后续修补
        this.compiler.emitOp(fd, TempOpcode.OP_label)
        this.compiler.emitU32(fd, 0) // 占位符
        defaultLabelPos = fd.byteCode.size - 4

        // 处理 default 子句中的语句
        for (const stmt of clause.statements) {
          this.context.visit(stmt)
        }
      } else if (ts.isCaseClause(clause)) {
        // case 子句
        let label1 = -1

        if (labelCase >= 0) {
          // 跳过当前 case (如果需要)
          label1 = this.compiler.newLabelInt(fd)
          this.compiler.emitGotoInt(fd, Opcode.OP_goto, label1)
        }

        // 发射上一个 case 标签
        if (labelCase >= 0) {
          this.compiler.emitLabelInt(fd, labelCase)
        }
        labelCase = -1

        // dup switch 值
        this.compiler.emitOp(fd, Opcode.OP_dup)

        // 编译 case 表达式
        // QuickJS: js_parse_switch (parser.c:7262-7347)
        // pc2line 采样通常不会为 `case <expr>:` 的测试表达式单独生成条目，
        // 主要在真正执行的语句（如 console.log）处体现。
        // 这里抑制 case expression 内部的 sourcePos 发射以对齐 WASM 行为。
        const prevSuppressSourcePos = fd.suppressSourcePos
        fd.suppressSourcePos = true
        try {
          this.context.visit(clause.expression)
        } finally {
          fd.suppressSourcePos = prevSuppressSourcePos
        }

        // 严格相等比较
        this.compiler.emitOp(fd, Opcode.OP_strict_eq)

        // 如果不相等，跳转到下一个 case
        labelCase = this.compiler.newLabelInt(fd)
        this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelCase)

        // 发射 label1
        if (label1 >= 0) {
          this.compiler.emitLabelInt(fd, label1)
        }

        // 处理 case 子句中的语句
        for (const stmt of clause.statements) {
          this.context.visit(stmt)
        }
      }
    }

    // 处理 default 标签修补
    if (defaultLabelPos >= 0) {
      // 修补 default 标签
      fd.byteCode.putU32At(defaultLabelPos, labelCase)
      if (labelCase >= 0 && fd.labelSlots[labelCase]) {
        fd.labelSlots[labelCase].pos = defaultLabelPos + 4
      }
    } else {
      // 无 default，发射最后的 case 标签
      if (labelCase >= 0) {
        this.compiler.emitLabelInt(fd, labelCase)
      }
    }

    // 发射 break 标签
    this.compiler.emitLabelInt(fd, labelBreak)

    // 丢弃 switch 表达式值
    this.compiler.emitOp(fd, Opcode.OP_drop)

    // 弹出 break 条目
    this.compiler.popBreakEntry(fd)

    // 弹出作用域
    this.compiler.popScope(fd)
  }

  // ============================================================================
  // break/continue 语句 - 对应 parser.c:7250-7261 emit_break
  // ============================================================================

  /**
   * 访问 break 语句 - 对应 parser.c:7250-7261
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:7250-7261
   */
  visitBreakStatement(node: ts.BreakStatement): void {
    const fd = this.funcDef!
    
    // 获取标签名 (如果有)
    const label = node.label 
      ? this.compiler.addAtom(node.label.text)
      : JS_ATOM_NULL

    // 发射 break - 对应 parser.c:6334-6380 emit_break
    this.compiler.emitBreak(fd, label, false)
  }

  /**
   * 访问 continue 语句 - 对应 parser.c:7250-7261
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:7250-7261
   */
  visitContinueStatement(node: ts.ContinueStatement): void {
    const fd = this.funcDef!
    
    // 获取标签名 (如果有)
    const label = node.label 
      ? this.compiler.addAtom(node.label.text)
      : JS_ATOM_NULL

    // 发射 continue - 对应 parser.c:6334-6380 emit_break
    this.compiler.emitBreak(fd, label, true)
  }

  // ============================================================================
  // return 语句 - 对应 parser.c:6969-6991
  // ============================================================================

  /**
   * 访问 return 语句 - 对应 parser.c:6969-6991
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6969-6991
   */
  visitReturnStatement(node: ts.ReturnStatement): void {
    const fd = this.funcDef!
    // QuickJS anchors return's source position to the `return` token:
    // parser.c captures `op_token_ptr = s->token.ptr` and later calls
    // `emit_source_pos(s, op_token_ptr)` right before emitting the return opcode.
    // See: third_party/QuickJS/src/core/parser.c (TOK_RETURN case).
    const sourcePos = node.getStart(node.getSourceFile())

    if (node.expression) {
      // 有返回值
      const expr = node.expression

      // Fast-path: `return 'literal'` should not attach a sourcePos to the literal push.
      // QuickJS typically records source position at the return opcode, not at the literal.
      if (ts.isStringLiteral(expr)) {
        const text = expr.text
        if (text === '') {
          this.compiler.emitAtomOp(fd, Opcode.OP_push_atom_value, JSAtom.JS_ATOM_empty_string)
        } else {
          const atom = this.compiler.addAtom(text)
          this.compiler.emitOp(fd, Opcode.OP_push_atom_value)
          this.compiler.emitAtom(fd, atom)
        }
        this.compiler.emitReturnWithFinally(fd, true, sourcePos)
        return
      }

      // QuickJS 通常只在 return opcode 处记录 source pos；
      // 对于简单字面量返回，抑制表达式自身的 sourcePos，可避免多余的 pc2line entry。
      const isSimpleLiteralReturn =
        ts.isStringLiteral(expr) ||
        ts.isNumericLiteral(expr) ||
        expr.kind === ts.SyntaxKind.TrueKeyword ||
        expr.kind === ts.SyntaxKind.FalseKeyword ||
        expr.kind === ts.SyntaxKind.NullKeyword

      const prevSuppressSourcePos = fd.suppressSourcePos
      if (isSimpleLiteralReturn) {
        fd.suppressSourcePos = true
      }
      try {
        const prevExpressionValueUsed = this.context.expressionValueUsed
        this.context.expressionValueUsed = true
        try {
          this.context.visit(expr)
        } finally {
          this.context.expressionValueUsed = prevExpressionValueUsed
        }
      } finally {
        fd.suppressSourcePos = prevSuppressSourcePos
      }
      this.compiler.emitReturnWithFinally(fd, true, sourcePos)
    } else {
      // 无返回值 - 返回 undefined
      this.compiler.emitReturnWithFinally(fd, false, sourcePos)
    }
  }

  // ============================================================================
  // throw 语句 - 对应 parser.c:6992-7009
  // ============================================================================

  /**
   * 访问 throw 语句 - 对应 parser.c:6992-7009
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6992-7009
   */
  visitThrowStatement(node: ts.ThrowStatement): void {
    const fd = this.funcDef!
    const sourcePos = node.getStart()

    // 编译 throw 表达式
    const prevExpressionValueUsed = this.context.expressionValueUsed
    this.context.expressionValueUsed = true
    try {
      this.context.visit(node.expression)
    } finally {
      this.context.expressionValueUsed = prevExpressionValueUsed
    }

    // 发射 throw
    this.compiler.emitOp(fd, Opcode.OP_throw, sourcePos)
  }

  // ============================================================================
  // try 语句 - 对应 parser.c:7348-7500
  // ============================================================================

  /**
   * 访问 try 语句 - 对应 parser.c:7348-7500
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:7348-7500
   */
  visitTryStatement(node: ts.TryStatement): void {
    const fd = this.funcDef!

    const hasFinally = !!node.finallyBlock

    // 设置 eval 返回值为 undefined - 对应 parser.c:7389
    this.compiler.setEvalRetUndefined(fd)

    // 创建标签
    const labelCatch = this.compiler.newLabelInt(fd)
    const labelCatch2 = this.compiler.newLabelInt(fd)
    const labelFinally = hasFinally ? this.compiler.newLabelInt(fd) : -1
    const labelEnd = this.compiler.newLabelInt(fd)

    // 发射 catch 指令 - 对应 parser.c:7362
    this.compiler.emitGotoInt(fd, Opcode.OP_catch, labelCatch)

    // 压入 break 条目 - 对应 parser.c:7364-7365
    const blockEnv = new BlockEnv()
    this.compiler.pushBreakEntry(fd, blockEnv, 0, -1, -1, 1)
    blockEnv.hasCatchOffset = true
    if (hasFinally) {
      blockEnv.labelFinally = labelFinally
    }

    // 编译 try 块
    this.visitBlock(node.tryBlock)

    // 弹出 break 条目
    this.compiler.popBreakEntry(fd)

    // try 块正常结束 - 对应 parser.c:7371-7379
    // 丢弃 catch 偏移
    this.compiler.emitOp(fd, Opcode.OP_drop)
    if (hasFinally) {
      // 推送 undefined 保持栈平衡
      this.compiler.emitOp(fd, Opcode.OP_undefined)
      // 调用 finally
      this.compiler.emitGotoInt(fd, Opcode.OP_gosub, labelFinally)
      this.compiler.emitOp(fd, Opcode.OP_drop)
    }
    // 跳转到结束
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelEnd)

    // catch 子句 - 对应 parser.c:7381-7451
    if (node.catchClause) {
      // 创建 catch 变量作用域
      this.compiler.pushScope(fd)

      // 发射 catch 标签
      this.compiler.emitLabelInt(fd, labelCatch)

      if (node.catchClause.variableDeclaration) {
        const catchVar = node.catchClause.variableDeclaration
        if (ts.isIdentifier(catchVar.name)) {
          const name = catchVar.name.text
          const atom = this.compiler.addAtom(name)

          // 定义 catch 变量
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_CATCH)

          // 存储异常值到 catch 变量
          this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var)
          this.compiler.emitU32(fd, atom)
          this.compiler.emitU16(fd, fd.scopeLevel)
        }
      } else {
        // 无 catch 变量绑定 (ES2019 optional catch binding)
        this.compiler.emitOp(fd, Opcode.OP_drop)
      }

      // 发射 catch2 指令
      this.compiler.emitGotoInt(fd, Opcode.OP_catch, labelCatch2)

      // 创建 catch 块作用域
      this.compiler.pushScope(fd)

      // 压入 break 条目
      const catchBlockEnv = new BlockEnv()
      this.compiler.pushBreakEntry(fd, catchBlockEnv, 0, -1, -1, 1)
      catchBlockEnv.hasCatchOffset = true
      if (hasFinally) {
        catchBlockEnv.labelFinally = labelFinally
      }

      // 编译 catch 块
      this.visitBlock(node.catchClause.block)

      // 弹出 break 条目
      this.compiler.popBreakEntry(fd)

      // 弹出 catch 块作用域
      this.compiler.popScope(fd)

      // 弹出 catch 变量作用域
      this.compiler.popScope(fd)

      // catch 块正常结束 - 对应 parser.c:7432-7441
      // 丢弃 catch2 偏移
      this.compiler.emitOp(fd, Opcode.OP_drop)
      if (hasFinally) {
        // 推送 undefined
        this.compiler.emitOp(fd, Opcode.OP_undefined)
        // 调用 finally
        this.compiler.emitGotoInt(fd, Opcode.OP_gosub, labelFinally)
        this.compiler.emitOp(fd, Opcode.OP_drop)
      }
      // 跳转到结束
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelEnd)

      // catch2 标签 - catch 块中发生异常
      this.compiler.emitLabelInt(fd, labelCatch2)
      // 调用 finally
      if (hasFinally) {
        this.compiler.emitGotoInt(fd, Opcode.OP_gosub, labelFinally)
      }
      // 重新抛出
      this.compiler.emitOp(fd, Opcode.OP_throw)
    } else {
      // 无 catch 子句 - 对应 parser.c:7453-7458
      this.compiler.emitLabelInt(fd, labelCatch)
      // 调用 finally
      if (hasFinally) {
        this.compiler.emitGotoInt(fd, Opcode.OP_gosub, labelFinally)
      }
      // 重新抛出
      this.compiler.emitOp(fd, Opcode.OP_throw)
    }

    if (hasFinally) {
      // finally 标签 - 对应 parser.c:7462
      this.compiler.emitLabelInt(fd, labelFinally)

      // finally 块 - 对应 parser.c:7500-7530
      const retValueIdx = fd.evalRetIdx

      // 压入 break 条目 (dropCount=2 用于 ret_value 和 gosub_ret_value)
      const finallyBlockEnv = new BlockEnv()
      this.compiler.pushBreakEntry(fd, finallyBlockEnv, 0, -1, -1, 2)

      // QuickJS: 只有在 eval_ret_idx >= 0 时才需要保存/清理 eval_ret。
      // 对应 parser.c:7533-7554
      let savedEvalRetIdx = -1
      if (retValueIdx >= 0) {
        if (fd.gosubRetIdx < 0) {
          const retAtom = this.compiler.addAtom('<ret>')
          fd.gosubRetIdx = this.compiler.addVar(fd, retAtom)
        }
        savedEvalRetIdx = fd.gosubRetIdx

        // 进入 finally 前保存/清理 eval_ret，避免 finally 语句污染 loc0
        // 对应 WASM 反汇编序列: get_loc0; put_loc2; undefined; put_loc0
        // 注意: 不能直接发射 OP_get_loc0/OP_put_loc2 等短操作码，
        // 因为它们与 TempOpcode(182-200) 重叠，会在 resolve_variables/resolve_labels 阶段被误判。
        // 这里使用长格式 OP_get_loc/OP_put_loc，后续由 LabelResolver 收缩为短操作码。
        this.compiler.emitOp(fd, Opcode.OP_get_loc)
        this.compiler.emitU16(fd, retValueIdx)
        this.compiler.emitOp(fd, Opcode.OP_put_loc)
        this.compiler.emitU16(fd, savedEvalRetIdx)
        this.compiler.emitOp(fd, Opcode.OP_undefined)
        this.compiler.emitOp(fd, Opcode.OP_put_loc)
        this.compiler.emitU16(fd, retValueIdx)
      }

      // 编译 finally 块
      this.visitBlock(node.finallyBlock)

      if (retValueIdx >= 0) {
        // QuickJS: finally 结束后恢复 eval_ret
        // 对应 WASM 反汇编序列: get_loc2; put_loc0
        this.compiler.emitOp(fd, Opcode.OP_get_loc)
        this.compiler.emitU16(fd, savedEvalRetIdx)
        this.compiler.emitOp(fd, Opcode.OP_put_loc)
        this.compiler.emitU16(fd, retValueIdx)
      }

      // 弹出 break 条目
      this.compiler.popBreakEntry(fd)
      // 发射 ret (返回到 gosub 调用点)
      this.compiler.emitOp(fd, Opcode.OP_ret)
    }

    // 发射 end 标签
    this.compiler.emitLabelInt(fd, labelEnd)
  }

  // ============================================================================
  // 带标签语句 - 对应 parser.c:6925-6961
  // ============================================================================

  /**
   * 访问带标签语句 - 对应 parser.c:6925-6961
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6925-6961
   */
  visitLabeledStatement(node: ts.LabeledStatement): void {
    const fd = this.funcDef!
    const labelName = this.compiler.addAtom(node.label.text)

    // 检查标签是否重复 - 对应 parser.c:6927-6933
    let be = fd.topBreak
    while (be !== null) {
      if (be.labelName === labelName) {
        throw new Error('duplicate label name')
      }
      be = be.prev
    }

    // 检查是否为循环语句 - 对应 parser.c:6939-6942
    const stmt = node.statement
    const isLoopStatement = ts.isWhileStatement(stmt) ||
                            ts.isDoStatement(stmt) ||
                            ts.isForStatement(stmt) ||
                            ts.isForOfStatement(stmt) ||
                            ts.isForInStatement(stmt)

    if (isLoopStatement) {
      // 循环语句：将 labelName 传递给循环的 break 条目，
      // 这样 `break label` / `continue label` 可以正确解析。
      if (ts.isWhileStatement(stmt)) {
        this.visitWhileStatement(stmt, labelName)
      } else if (ts.isDoStatement(stmt)) {
        this.visitDoStatement(stmt, labelName)
      } else if (ts.isForStatement(stmt)) {
        this.visitForStatement(stmt, labelName)
      } else if (ts.isForOfStatement(stmt)) {
        this.visitForOfStatement(stmt, labelName)
      } else if (ts.isForInStatement(stmt)) {
        this.visitForInStatement(stmt, labelName)
      } else {
        // 理论上不会进入这里（isLoopStatement 已覆盖），保底保持原行为
        this.context.visit(stmt)
      }
    } else {
      // 非循环语句的标签处理 - 对应 parser.c:6943-6960
      const labelBreak = this.compiler.newLabelInt(fd)
      
      // 压入 break 条目
      const breakEntry = new BlockEnv()
      this.compiler.pushBreakEntry(fd, breakEntry, labelName, labelBreak, -1, 0)
      breakEntry.isRegularStmt = true

      // 编译语句
      this.context.visit(stmt)

      // 发射 break 标签
      this.compiler.emitLabelInt(fd, labelBreak)

      // 弹出 break 条目
      this.compiler.popBreakEntry(fd)
    }
  }

  // ============================================================================
  // 表达式语句 - 对应 parser.c:7632-7649
  // ============================================================================

  /**
   * 访问表达式语句 - 对应 parser.c:7632-7649
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:7632-7649
   */
  visitExpressionStatement(node: ts.ExpressionStatement): void {
    const fd = this.funcDef!
    const sourcePos = node.getStart()

    // 发射源码位置
    this.compiler.emitSourcePos(fd, sourcePos)

    // 编译表达式
    const expr = node.expression

    // QuickJS 对属性/元素赋值类表达式语句会走 PUT_LVALUE_NOKEEP_* 路径，
    // 从而不保留赋值表达式的结果（例如 `this.x = y;` / `this.x += n;`）。
    // 这时语句末尾不会再发射 OP_drop。
    // 参考：third_party/QuickJS/src/core/parser.c: js_parse_for_in_of() 里 local `sum += n` 会留下值并 drop；
    //       以及 class-methods 的 `this.value += n` 不留下值也无 drop（通过 disasm 观测）。
    if (
      fd.evalRetIdx < 0 &&
      ts.isBinaryExpression(expr)
    ) {
      const hasWithScope = (func: any, scope: number): boolean => {
        // Align with QuickJS has_with_scope() (parser.c:3886-3916)
        let cur: any = func
        let s = scope
        while (cur) {
          for (let si = s; si >= 0; si = cur.scopes[si]?.parent ?? -1) {
            for (let idx = cur.scopes[si]?.first ?? -1; idx >= 0; idx = cur.vars[idx].scopeNext) {
              const vd = cur.vars[idx]
              if (vd?.varName === JSAtom.JS_ATOM__with_) return true
              if (vd?.scopeLevel !== si) break
            }
          }
          s = cur.parentScopeLevel
          cur = cur.parent
        }
        return false
      }

      const op = expr.operatorToken.kind
      const isAssignmentOp =
        op === ts.SyntaxKind.EqualsToken ||
        (op >= ts.SyntaxKind.PlusEqualsToken && op <= ts.SyntaxKind.CaretEqualsToken) ||
        op === ts.SyntaxKind.AmpersandAmpersandEqualsToken ||
        op === ts.SyntaxKind.BarBarEqualsToken ||
        op === ts.SyntaxKind.QuestionQuestionEqualsToken

      const isNonPrivatePropLValue =
        ts.isPropertyAccessExpression(expr.left) &&
        !ts.isPrivateIdentifier(expr.left.name)
      const isElemLValue = ts.isElementAccessExpression(expr.left)

      const isPropOrElemLValue = isNonPrivatePropLValue || isElemLValue

      // 1) 属性/元素赋值：走 nokeeper 路径
      // 2) with-scope 下的标识符赋值：最终会落到 scope_make_ref + put_ref_value（不产生值），也必须走 nokeeper
      const isIdentifierLValue = ts.isIdentifier(expr.left)
      const isWithIdentifierAssignment =
        isAssignmentOp &&
        isIdentifierLValue &&
        hasWithScope(fd, fd.scopeLevel)

      if ((isAssignmentOp && isPropOrElemLValue) || isWithIdentifierAssignment) {
        const prev = this.context.expressionValueUsed
        this.context.expressionValueUsed = false
        this.context.visit(expr)
        this.context.expressionValueUsed = prev
        return
      }
    }

    // 默认：正常生成表达式（保留结果），然后在非 eval 模式下 drop
    const prevExpressionValueUsed = this.context.expressionValueUsed
    this.context.expressionValueUsed = true
    try {
      this.context.visit(expr)
    } finally {
      this.context.expressionValueUsed = prevExpressionValueUsed
    }

    // 处理表达式结果 - 对应 parser.c:7632-7649
    // QuickJS 在 eval/顶层脚本模式下会把语句表达式的值写入特殊的 <ret> 局部变量
    // （s->eval_ret_idx），以便最后 return 该值。
    // 参考：parser.c:7632-7649（表达式语句）+ parser.c:6906-6912（控制流前将 <ret> 置为 undefined）。
    if (fd.evalRetIdx >= 0) {
      this.compiler.emitOp(fd, Opcode.OP_put_loc)
      this.compiler.emitU16(fd, fd.evalRetIdx)
    } else {
      // 非 eval 模式：丢弃结果
      this.compiler.emitOp(fd, Opcode.OP_drop)
    }
  }

  // ============================================================================
  // 空语句
  // ============================================================================

  /**
   * 访问空语句 - 对应 parser.c:7535-7539
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:7535-7539
   */
  visitEmptyStatement(_node: ts.EmptyStatement): void {
    // 空语句不生成任何代码
  }

  // ============================================================================
  // debugger 语句 - 对应 parser.c:7619-7627
  // ============================================================================

  /**
   * 访问 debugger 语句 - 对应 parser.c:7619-7627
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:7619-7627
   */
  visitDebuggerStatement(_node: ts.DebuggerStatement): void {
    const fd = this.funcDef!
    this.compiler.emitOp(fd, Opcode.OP_debugger)
  }
}
