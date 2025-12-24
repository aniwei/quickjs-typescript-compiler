import ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { CompilerContext } from '../CompilerContext'
import { Opcode, TempOpcode, JSAtom, JS_ATOM_NULL } from '../../env'
import { 
  FunctionDef, 
  JSParseFunctionEnum,
  JSFunctionKindEnum,
  ARGUMENT_VAR_OFFSET,
} from '../FunctionDef'
import { JSVarDefEnum } from '../Compiler'

/**
 * 函数访问器 - 对应 parser.c:12892-13483 js_parse_function_decl2
 * 
 * 处理所有类型的函数定义:
 * - 函数声明 (function declaration)
 * - 函数表达式 (function expression)
 * - 箭头函数 (arrow function)
 * - 方法定义 (method definition)
 * - getter/setter
 * - 生成器函数 (generator)
 * - 异步函数 (async)
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:12892-13483
 */
export class FunctionVisitor extends VisitorContext {
  /** 缓存已提升的函数声明 */
  private hoisted: Map<ts.FunctionDeclaration, { fd: FunctionDef, childIdx: number, cpoolIdx: number }> = new Map()

  private inferSetNameAtomFromContext(expr: ts.Expression): number {
    // 处理多层括号：例如 `const x = ((...) => ...)`
    let cur: ts.Node = expr
    while (cur.parent && ts.isParenthesizedExpression(cur.parent)) {
      cur = cur.parent
    }

    const parent = cur.parent
    if (!parent) return 0

    // `const name = <func>` / `let name = <func>`
    if (ts.isVariableDeclaration(parent) && parent.initializer === cur) {
      if (ts.isIdentifier(parent.name)) {
        return this.compiler.addAtom(parent.name.text)
      }
      return 0
    }

    // `name = <func>`
    if (ts.isBinaryExpression(parent) && parent.right === cur && parent.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      const lhs = parent.left
      if (ts.isIdentifier(lhs)) {
        return this.compiler.addAtom(lhs.text)
      }
      if (ts.isPropertyAccessExpression(lhs)) {
        return this.compiler.addAtom(lhs.name.text)
      }
      if (ts.isElementAccessExpression(lhs)) {
        const arg = lhs.argumentExpression
        if (arg && ts.isStringLiteral(arg)) {
          return this.compiler.addAtom(arg.text)
        }
      }
      return 0
    }

    // `{ name: <func> }`
    if (ts.isPropertyAssignment(parent) && parent.initializer === cur) {
      const n = parent.name
      if (ts.isIdentifier(n)) return this.compiler.addAtom(n.text)
      if (ts.isStringLiteral(n)) return this.compiler.addAtom(n.text)
      if (ts.isNumericLiteral(n)) return this.compiler.addAtom(n.text)
      return 0
    }

    return 0
  }

  constructor(context: CompilerContext) {
    super(context)
  }

  // ============================================================================
  // 函数声明 - 对应 parser.c:12892-13000 (func_type = JS_PARSE_FUNC_STATEMENT)
  // ============================================================================

  /**
   * 访问函数声明 - 对应 parser.c:js_parse_function_decl2
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:12892-13483
   * 
   * 语法: function name(params) { body }
   */
  visitFunctionDeclaration(node: ts.FunctionDeclaration): void {
    const parentFd = this.funcDef!
    const sourcePos = node.getStart()

    // 确定函数类型和种类
    let funcType = JSParseFunctionEnum.JS_PARSE_FUNC_STATEMENT
    let funcKind = this.getFunctionKind(node)

    // 获取函数名
    const funcName = node.name 
      ? this.compiler.addAtom(node.name.text)
      : JS_ATOM_NULL

    // 创建子函数定义 - 对应 parser.c:13004-13015 js_new_function_def
    const fd = new FunctionDef(parentFd, false, false)
    fd.funcName = funcName
    fd.funcType = funcType
    fd.funcKind = funcKind
    fd.filename = parentFd.filename
    fd.sourcePos = sourcePos

    // 设置函数属性 - 对应 parser.c:13016-13045
    fd.hasPrototype = (funcKind === JSFunctionKindEnum.JS_FUNC_NORMAL)
    fd.hasHomeObject = false
    fd.hasArgumentsBinding = true
    fd.hasThisBinding = true
    fd.newTargetAllowed = true
    fd.superCallAllowed = false
    fd.superAllowed = false
    fd.argumentsAllowed = true

    // 添加到父函数的子函数列表
    const childIdx = this.compiler.addChild(parentFd, fd)

    // 编译函数体
    this.compileFunctionBody(fd, node.parameters, node.body)

    // 添加到常量池 - 对应 parser.c:13350-13356
    const cpoolIdx = this.compiler.cpoolAdd(parentFd, null)
    fd.parentCpoolIdx = cpoolIdx

    // 定义函数变量 - 对应 parser.c:13379-13461
    if (parentFd.isGlobalVar) {
      // 全局作用域: 添加全局变量
      // 对应 QuickJS parser.c:13429-13461
      // 不发射任何操作码！函数会在 instantiate_hoisted_definitions 中初始化
      const hf = this.compiler.addGlobalVar(parentFd, funcName)
      if (hf) {
        hf.cpoolIdx = cpoolIdx
      }
      // 注意：这里不发射 OP_fclosure 或 OP_scope_put_var_init
      // 全局函数初始化由 VariableResolver.instantiateHoistedDefinitions 处理
    } else {
      // 函数作用域: 定义 var 变量
      // 对应 QuickJS parser.c:13429-13435
      const varIdx = this.compiler.defineVar(parentFd, funcName, JSVarDefEnum.JS_VAR_DEF_VAR)
      if (varIdx >= 0 && varIdx < ARGUMENT_VAR_OFFSET) {
        parentFd.vars[varIdx].funcPoolIdx = cpoolIdx
      }
      // 注意：对于非全局函数，变量初始化也由 VariableResolver.resolvePass2 的
      // OP_enter_scope 处理中完成
    }

    // 缓存用于后续引用
    this.hoisted.set(node, { fd, childIdx, cpoolIdx })
  }

  // ============================================================================
  // 函数表达式 - 对应 parser.c:13005-13015 (func_type = JS_PARSE_FUNC_EXPR)
  // ============================================================================

  /**
   * 访问函数表达式 - 对应 parser.c:js_parse_function_decl2
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:12892-13483
   * 
   * 语法: function [name](params) { body }
   */
  visitFunctionExpression(node: ts.FunctionExpression): void {
    const parentFd = this.funcDef!
    const sourcePos = node.getStart()

    // 确定函数类型和种类
    const funcType = JSParseFunctionEnum.JS_PARSE_FUNC_EXPR
    const funcKind = this.getFunctionKind(node)

    // 获取函数名 (可选)
    const funcName = node.name
      ? this.compiler.addAtom(node.name.text)
      : JS_ATOM_NULL

    // 创建子函数定义 - 对应 parser.c:13004-13015
    const fd = new FunctionDef(parentFd, false, true) // isFuncExpr = true
    fd.funcName = funcName
    fd.funcType = funcType
    fd.funcKind = funcKind
    fd.filename = parentFd.filename
    fd.sourcePos = sourcePos

    // 设置函数属性 - 对应 parser.c:13016-13045
    fd.hasPrototype = (funcKind === JSFunctionKindEnum.JS_FUNC_NORMAL)
    fd.hasHomeObject = false
    fd.hasArgumentsBinding = true
    fd.hasThisBinding = true
    fd.newTargetAllowed = true
    fd.superCallAllowed = false
    fd.superAllowed = false
    fd.argumentsAllowed = true

    // 添加到父函数的子函数列表
    this.compiler.addChild(parentFd, fd)

    // 编译函数体
    this.compileFunctionBody(fd, node.parameters, node.body)

    // 添加到常量池 - 对应 parser.c:13350-13356
    const cpoolIdx = this.compiler.cpoolAdd(parentFd, null)
    fd.parentCpoolIdx = cpoolIdx

    // 发射 OP_fclosure - 对应 parser.c:13361-13370
    // 函数表达式直接将闭包压栈
    // QuickJS: 该结构性指令通常不绑定 source pos（避免产生额外 OP_line_num 采样点）。
    this.compiler.emitOp(parentFd, Opcode.OP_fclosure)
    this.compiler.emitU32(parentFd, cpoolIdx)

    // 如果没有名称，尝试从赋值/初始化上下文推断 (QuickJS 行为)
    if (funcName === JS_ATOM_NULL) {
      this.compiler.emitOp(parentFd, Opcode.OP_set_name)
      this.compiler.emitU32(parentFd, this.inferSetNameAtomFromContext(node) || JS_ATOM_NULL)
    }
  }

  // ============================================================================
  // 箭头函数 - 对应 parser.c:13035-13040 (func_type = JS_PARSE_FUNC_ARROW)
  // ============================================================================

  /**
   * 访问箭头函数 - 对应 parser.c:js_parse_function_decl2
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:12892-13483
   * 
   * 语法: (params) => expression | { body }
   */
  visitArrowFunction(node: ts.ArrowFunction): void {
    const parentFd = this.funcDef!
    const sourcePos = node.getStart()

    // 确定函数类型和种类 - 对应 parser.c:13005
    const funcType = JSParseFunctionEnum.JS_PARSE_FUNC_ARROW
    let funcKind = JSFunctionKindEnum.JS_FUNC_NORMAL

    // 检查是否为 async 箭头函数
    if (node.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword)) {
      funcKind = JSFunctionKindEnum.JS_FUNC_ASYNC
    }

    // 创建子函数定义 - 对应 parser.c:13004-13015
    const fd = new FunctionDef(parentFd, false, true) // isFuncExpr = true
    fd.funcName = 0 // 箭头函数没有名称
    fd.funcType = funcType
    fd.funcKind = funcKind
    fd.filename = parentFd.filename
    fd.sourcePos = sourcePos

    // 箭头函数特殊属性 - 对应 parser.c:13035-13040
    // 箭头函数没有 prototype 属性
    fd.hasPrototype = false
    // 箭头函数没有 arguments 绑定
    fd.hasArgumentsBinding = false
    fd.hasThisBinding = false
    // 从父函数继承 new.target/super/arguments 权限
    fd.newTargetAllowed = parentFd.newTargetAllowed
    fd.superCallAllowed = parentFd.superCallAllowed
    fd.superAllowed = parentFd.superAllowed
    fd.argumentsAllowed = parentFd.argumentsAllowed
    fd.hasSimpleParameterList = true

    // 添加到父函数的子函数列表
    this.compiler.addChild(parentFd, fd)

    // 编译箭头函数体
    this.compileArrowFunctionBody(fd, node.parameters, node.body)

    // 添加到常量池
    const cpoolIdx = this.compiler.cpoolAdd(parentFd, null)
    fd.parentCpoolIdx = cpoolIdx

    // 发射 OP_fclosure
    // QuickJS: 该结构性指令不绑定 source pos。
    this.compiler.emitOp(parentFd, Opcode.OP_fclosure)
    this.compiler.emitU32(parentFd, cpoolIdx)

    // 箭头函数没有名称，但可能从赋值推断
    this.compiler.emitOp(parentFd, Opcode.OP_set_name)
    this.compiler.emitU32(parentFd, this.inferSetNameAtomFromContext(node) || JS_ATOM_NULL)
  }

  // ============================================================================
  // 方法定义 - 对应 parser.c:13022-13030 (func_type = JS_PARSE_FUNC_METHOD)
  // ============================================================================

  /**
   * 访问方法定义 - 对应 parser.c:js_parse_function_decl2
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:12892-13483
   * 
   * 用于类方法和对象方法
   */
  visitMethodDefinition(node: ts.MethodDeclaration): void {
    const parentFd = this.funcDef!
    // QuickJS：方法函数的 debug 位置锚定在“方法名 token”上（而不是 `static` 等修饰符）。
    // 这会影响该方法函数的 pc2line 初始 (line,col)。
    const sf = node.getSourceFile()
    const sourcePos = node.name ? node.name.getStart(sf) : node.getStart(sf)

    const isObjectLiteralMethod = ts.isObjectLiteralExpression(node.parent)
    // NOTE: In the TS AST, class methods have parent = ClassDeclaration/ClassExpression.
    // Using explicit checks avoids version-dependent helpers like ts.isClassLike.
    const isClassMethod = ts.isClassDeclaration(node.parent) || ts.isClassExpression(node.parent)

    // 确定函数类型
    let funcType = JSParseFunctionEnum.JS_PARSE_FUNC_METHOD
    let funcKind = this.getFunctionKind(node)

    // 获取方法名
    // QuickJS: 对象字面量的 method bytecode header 通常是匿名的 (name=<null>)，
    // 方法名通过 define_method 的 atom 单独携带。
    const funcName = isObjectLiteralMethod ? 0 : this.getPropertyNameAtom(node.name)

    // QuickJS: 仅当方法体实际使用 super 时才需要 home object。
    // 否则会清掉 needHomeObject flag，以减少 bytecode header 差异。
    const needsHomeObject = this.bodyContainsSuper(node.body)

    // 创建子函数定义
    const fd = new FunctionDef(parentFd, false, false)
    fd.funcName = funcName
    fd.funcType = funcType
    fd.funcKind = funcKind
    fd.filename = parentFd.filename
    fd.sourcePos = sourcePos

    // 方法属性 - 对应 parser.c:13022-13030
    fd.hasPrototype = false // 方法没有 prototype
    fd.hasHomeObject = needsHomeObject // 仅当需要 super 时才分配
    fd.hasArgumentsBinding = true
    fd.hasThisBinding = true
    fd.newTargetAllowed = true
    fd.superCallAllowed = false
    fd.superAllowed = true // 方法可以使用 super
    fd.argumentsAllowed = true
    fd.needHomeObject = needsHomeObject

    // 添加到父函数的子函数列表
    this.compiler.addChild(parentFd, fd)

    // 编译方法体
    this.compileFunctionBody(fd, node.parameters, node.body)

    // 添加到常量池
    const cpoolIdx = this.compiler.cpoolAdd(parentFd, null)
    fd.parentCpoolIdx = cpoolIdx

    // 发射 OP_fclosure
    // QuickJS: 对象字面量方法路径不会为 OP_fclosure 绑定 source-pos。
    // 参见 third_party/QuickJS/src/core/parser.c: js_parse_object_literal()（方法分支用 emit_op）。
    this.compiler.emitOp(parentFd, Opcode.OP_fclosure, isObjectLiteralMethod ? undefined : sourcePos)
    this.compiler.emitU32(parentFd, cpoolIdx)

    // 对于需要 home object 的方法：
    // - QuickJS 的 class method 由 define_method 路径处理 home object（不单独发 OP_set_home_object）。
    // - 对象字面量方法同样不需要这里显式 set_home_object。
    if (fd.needHomeObject && !isObjectLiteralMethod && !isClassMethod) {
      this.compiler.emitOp(parentFd, Opcode.OP_set_home_object)
    }
  }

  private bodyContainsSuper(body: ts.ConciseBody | undefined): boolean {
    if (!body) return false

    let found = false
    const root: ts.Node = body

    const walk = (node: ts.Node) => {
      if (found) return

      if (node.kind === ts.SyntaxKind.SuperKeyword) {
        found = true
        return
      }

      // Avoid counting nested functions/classes: only the current function's own body matters.
      if (node !== root && (ts.isFunctionLike(node) || ts.isClassLike(node))) {
        return
      }

      ts.forEachChild(node, walk)
    }

    walk(root)
    return found
  }

  /**
   * 访问 getter 访问器
   * 
   * QuickJS 源码位置: parser.c:3382-3410 (PROP_TYPE_GET)
   */
  visitGetAccessor(node: ts.GetAccessorDeclaration): void {
    const parentFd = this.funcDef!
    const sourcePos = node.getStart()

    const funcType = JSParseFunctionEnum.JS_PARSE_FUNC_GETTER
    const funcName = this.getPropertyNameAtom(node.name)

    const fd = new FunctionDef(parentFd, false, false)
    fd.funcName = funcName
    fd.funcType = funcType
    fd.funcKind = JSFunctionKindEnum.JS_FUNC_NORMAL
    fd.filename = parentFd.filename
    fd.sourcePos = sourcePos

    // getter 属性
    fd.hasPrototype = false
    fd.hasHomeObject = true
    fd.hasArgumentsBinding = true
    fd.hasThisBinding = true
    fd.newTargetAllowed = true
    fd.superAllowed = true
    fd.needHomeObject = true

    this.compiler.addChild(parentFd, fd)

    // getter 不应该有参数
    this.compileFunctionBody(fd, [], node.body)

    const cpoolIdx = this.compiler.cpoolAdd(parentFd, null)
    fd.parentCpoolIdx = cpoolIdx

    // QuickJS: 该结构性指令不绑定 source pos。
    this.compiler.emitOp(parentFd, Opcode.OP_fclosure)
    this.compiler.emitU32(parentFd, cpoolIdx)

    if (fd.needHomeObject) {
      this.compiler.emitOp(parentFd, Opcode.OP_set_home_object)
    }
  }

  /**
   * 访问 setter 访问器
   * 
   * QuickJS 源码位置: parser.c:3382-3410 (PROP_TYPE_SET)
   */
  visitSetAccessor(node: ts.SetAccessorDeclaration): void {
    const parentFd = this.funcDef!
    const sourcePos = node.getStart()

    const funcType = JSParseFunctionEnum.JS_PARSE_FUNC_SETTER
    const funcName = this.getPropertyNameAtom(node.name)

    const fd = new FunctionDef(parentFd, false, false)
    fd.funcName = funcName
    fd.funcType = funcType
    fd.funcKind = JSFunctionKindEnum.JS_FUNC_NORMAL
    fd.filename = parentFd.filename
    fd.sourcePos = sourcePos

    // setter 属性
    fd.hasPrototype = false
    fd.hasHomeObject = true
    fd.hasArgumentsBinding = true
    fd.hasThisBinding = true
    fd.newTargetAllowed = true
    fd.superAllowed = true
    fd.needHomeObject = true

    this.compiler.addChild(parentFd, fd)

    // setter 应该有一个参数
    this.compileFunctionBody(fd, node.parameters, node.body)

    const cpoolIdx = this.compiler.cpoolAdd(parentFd, null)
    fd.parentCpoolIdx = cpoolIdx

    // QuickJS: 该结构性指令不绑定 source pos。
    this.compiler.emitOp(parentFd, Opcode.OP_fclosure)
    this.compiler.emitU32(parentFd, cpoolIdx)

    if (fd.needHomeObject) {
      this.compiler.emitOp(parentFd, Opcode.OP_set_home_object)
    }
  }

  // ============================================================================
  // 辅助方法 - 函数体编译
  // ============================================================================

  /**
   * 获取函数种类 (normal/generator/async/async-generator)
   * 
   * 对应 parser.c:12910-12927
   */
  private getFunctionKind(node: ts.FunctionLikeDeclaration): JSFunctionKindEnum {
    let kind = JSFunctionKindEnum.JS_FUNC_NORMAL

    // 检查 async 修饰符
    const isAsync = node.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword) ?? false
    
    // 检查 generator (星号)
    const isGenerator = node.asteriskToken !== undefined

    if (isAsync && isGenerator) {
      kind = JSFunctionKindEnum.JS_FUNC_ASYNC_GENERATOR
    } else if (isAsync) {
      kind = JSFunctionKindEnum.JS_FUNC_ASYNC
    } else if (isGenerator) {
      kind = JSFunctionKindEnum.JS_FUNC_GENERATOR
    }

    return kind
  }

  /**
   * 获取属性名的 atom
   */
  private getPropertyNameAtom(name: ts.PropertyName): number {
    if (ts.isIdentifier(name)) {
      return this.compiler.addAtom(name.text)
    } else if (ts.isStringLiteral(name)) {
      return this.compiler.addAtom(name.text)
    } else if (ts.isNumericLiteral(name)) {
      return this.compiler.addAtom(name.text)
    } else if (ts.isComputedPropertyName(name)) {
      // 计算属性名需要特殊处理
      return JS_ATOM_NULL
    } else if (ts.isPrivateIdentifier(name)) {
      return this.compiler.addAtom(name.text)
    }
    return JS_ATOM_NULL
  }

  /**
   * 编译函数体 - 对应 parser.c:13055-13175 参数解析 + 13280-13327 函数体
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:13055-13327
   */
  private compileFunctionBody(
    fd: FunctionDef,
    parameters: readonly ts.ParameterDeclaration[] | ts.NodeArray<ts.ParameterDeclaration>,
    body: ts.Block | undefined
  ): void {
    // 保存当前上下文
    const prevFd = this.funcDef
    
    // 切换到新函数上下文
    this.context.funcDef = fd

    // 检查构造函数 - 对应 parser.c:13053-13059
    if (fd.funcType === JSParseFunctionEnum.JS_PARSE_FUNC_CLASS_CONSTRUCTOR ||
        fd.funcType === JSParseFunctionEnum.JS_PARSE_FUNC_DERIVED_CLASS_CONSTRUCTOR) {
      this.compiler.emitOp(fd, Opcode.OP_check_ctor)
    }

    // 非派生类构造函数的类字段初始化
    if (fd.funcType === JSParseFunctionEnum.JS_PARSE_FUNC_CLASS_CONSTRUCTOR) {
      this.emitClassFieldInit(fd)
    }

    // 解析参数 - 对应 parser.c:13060-13289
    // QuickJS: 如果形参列表里出现 '='，则认为存在 parameter expressions，
    // 会创建一个无父作用域的 argument scope，并在其中用 let 方式定义形参变量。
    // Source: third_party/QuickJS/src/core/parser.c:13098-13133
    fd.hasParameterExpressions = parameters.some((p) => !!p.initializer)
    if (fd.hasParameterExpressions) {
      // force no parent scope (scope parent = -1)
      fd.scopeLevel = -1
      fd.scopeFirst = -1
      this.compiler.pushScope(fd) // enter argument scope (ARG_SCOPE_INDEX)
    }

    this.compileParameters(fd, parameters)

    if (fd.hasParameterExpressions) {
      // QuickJS: argument scope has no parent, so it doesn't use pop_scope()
      // Source: third_party/QuickJS/src/core/parser.c:13220-13228
      const scope = fd.scopeLevel
      this.compiler.emitOp(fd, TempOpcode.OP_leave_scope)
      this.compiler.emitU16(fd, scope)
      fd.scopeLevel = 0
      fd.scopeFirst = this.compiler.getFirstLexicalVar(fd, fd.scopeLevel)
    }

    // 生成器函数的 initial_yield - 对应 parser.c:13275-13276
    if (fd.funcKind === JSFunctionKindEnum.JS_FUNC_GENERATOR ||
        fd.funcKind === JSFunctionKindEnum.JS_FUNC_ASYNC_GENERATOR) {
      this.compiler.emitOp(fd, Opcode.OP_initial_yield)
    }

    // 进入函数体
    fd.inFunctionBody = true
    this.compiler.pushScope(fd) // 进入 body scope - 对应 parser.c:13280-13281
    fd.bodyScope = fd.scopeLevel

    // 编译函数体语句
    if (body) {
      for (const stmt of body.statements) {
        this.context.visit(stmt)
      }
    }

    // 如果没有显式返回，添加 return undefined - 对应 parser.c:13326-13328
    if (this.compiler.isLiveCode(fd)) {
      this.compiler.emitReturn(fd, false)
    }

    // 恢复上下文
    this.context.funcDef = prevFd
  }

  /**
   * 编译箭头函数体 - 对应 parser.c:13283-13312
   * 
   * 箭头函数可以有表达式体或块体
   */
  private compileArrowFunctionBody(
    fd: FunctionDef,
    parameters: readonly ts.ParameterDeclaration[] | ts.NodeArray<ts.ParameterDeclaration>,
    body: ts.Block | ts.Expression
  ): void {
    const prevFd = this.funcDef
    this.context.funcDef = fd

    // 解析参数 (同 compileFunctionBody 的 argument scope 行为)
    fd.hasParameterExpressions = parameters.some((p) => !!p.initializer)
    if (fd.hasParameterExpressions) {
      fd.scopeLevel = -1
      fd.scopeFirst = -1
      this.compiler.pushScope(fd)
    }

    this.compileParameters(fd, parameters)

    if (fd.hasParameterExpressions) {
      const scope = fd.scopeLevel
      this.compiler.emitOp(fd, TempOpcode.OP_leave_scope)
      this.compiler.emitU16(fd, scope)
      fd.scopeLevel = 0
      fd.scopeFirst = this.compiler.getFirstLexicalVar(fd, fd.scopeLevel)
    }

    // 进入函数体
    fd.inFunctionBody = true
    this.compiler.pushScope(fd)
    fd.bodyScope = fd.scopeLevel

    if (ts.isBlock(body)) {
      // 块体: { statements }
      for (const stmt of body.statements) {
        this.context.visit(stmt)
      }

      // 添加 return undefined
      if (this.compiler.isLiveCode(fd)) {
        this.compiler.emitReturn(fd, false)
      }
    } else {
      // 表达式体: => expression - 对应 parser.c:13288-13301
      this.context.visit(body)

      // 发射返回指令 (mirror parser.c:emit_return)
      this.compiler.emitReturn(fd, true)
    }

    this.context.funcDef = prevFd
  }

  /**
   * 编译参数 - 对应 parser.c:13061-13173
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:13061-13173
   */
  private compileParameters(
    fd: FunctionDef,
    parameters: readonly ts.ParameterDeclaration[] | ts.NodeArray<ts.ParameterDeclaration>
  ): void {
    fd.hasSimpleParameterList = true
    let hasOptArg = false

    for (let i = 0; i < parameters.length; i++) {
      const param = parameters[i]

      // 检查 rest 参数 - 对应 parser.c:13078-13085
      if (param.dotDotDotToken) {
        fd.hasSimpleParameterList = false
        this.compileRestParameter(fd, param, i)
        hasOptArg = true
        continue
      }

      // 检查是否有解构 - 对应 parser.c:13086-13110
      if (ts.isObjectBindingPattern(param.name) || ts.isArrayBindingPattern(param.name)) {
        fd.hasSimpleParameterList = false
        // TODO: 实现解构参数
        throw new Error('Destructuring parameters not yet implemented')
      }

      // 简单标识符参数
      if (ts.isIdentifier(param.name)) {
        const nameAtom = this.compiler.addAtom(param.name.text)

        // QuickJS: when has_parameter_expressions, define the parameter as a let
        // binding in the argument scope before allocating the argument slot.
        // Source: third_party/QuickJS/src/core/parser.c:13112-13123
        if (fd.hasParameterExpressions) {
          this.compiler.defineVar(fd, nameAtom, JSVarDefEnum.JS_VAR_DEF_LET)
        }

        const idx = this.compiler.addArg(fd, nameAtom)

        // 检查默认值 - 对应 parser.c:13134-13164
        if (param.initializer) {
          fd.hasSimpleParameterList = false
          hasOptArg = true
          this.compileParameterDefaultValue(fd, param, idx, nameAtom)
        } else {
          if (!hasOptArg) {
            fd.definedArgCount++
          }

          // QuickJS: when has_parameter_expressions, copy the argument to the
          // argument scope binding.
          // Source: third_party/QuickJS/src/core/parser.c:13164-13172
          if (fd.hasParameterExpressions) {
            this.compiler.emitOp(fd, Opcode.OP_get_arg)
            this.compiler.emitU16(fd, idx)
            this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var_init)
            this.compiler.emitAtom(fd, nameAtom)
            this.compiler.emitU16(fd, fd.scopeLevel)
          }
        }
      }
    }
  }

  /**
   * 编译 rest 参数 - 对应 parser.c:13078-13085
   */
  private compileRestParameter(fd: FunctionDef, param: ts.ParameterDeclaration, _argIndex: number): void {
    if (!ts.isIdentifier(param.name)) {
      throw new Error('Rest parameter must be an identifier')
    }

    const nameAtom = this.compiler.addAtom(param.name.text)
    const idx = this.compiler.addArg(fd, nameAtom)

    // 发射 OP_rest 指令
    this.compiler.emitOp(fd, Opcode.OP_rest)
    this.compiler.emitU16(fd, idx)

    // QuickJS: when has_parameter_expressions, also init the argument scope
    // binding with the rest array value.
    // Source: third_party/QuickJS/src/core/parser.c:13127-13133
    if (fd.hasParameterExpressions) {
      this.compiler.emitOp(fd, Opcode.OP_dup)
      this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var_init)
      this.compiler.emitAtom(fd, nameAtom)
      this.compiler.emitU16(fd, fd.scopeLevel)
    }

    // 存储到参数位置
    this.compiler.emitOp(fd, Opcode.OP_put_arg)
    this.compiler.emitU16(fd, idx)
  }

  /**
   * 编译参数默认值 - 对应 parser.c:13134-13164
   * 
   * 逻辑:
   * 1. 获取参数值
   * 2. 检查是否为 undefined
   * 3. 如果是，使用默认值
   * 4. 存回参数
   */
  private compileParameterDefaultValue(
    fd: FunctionDef,
    param: ts.ParameterDeclaration,
    idx: number
    ,nameAtom: number
  ): void {
    if (!param.initializer) return

    const label = this.compiler.newLabelInt(fd)

    // 获取参数值 - 对应 parser.c:13143-13144
    this.compiler.emitOp(fd, Opcode.OP_get_arg)
    this.compiler.emitU16(fd, idx)

    // QuickJS optimize: undefined strict_eq -> is_undefined
    // Source: third_party/QuickJS/src/core/parser.c:11670-11677
    this.compiler.emitOp(fd, Opcode.OP_dup)
    this.compiler.emitOp(fd, Opcode.OP_is_undefined)

    // 如果不是 undefined，跳过默认值
    this.compiler.emitGotoInt(fd, Opcode.OP_if_false, label)

    // 弹出 undefined，计算默认值 - 对应 parser.c:13149-13152
    this.compiler.emitOp(fd, Opcode.OP_drop)
    
    // 编译默认值表达式
    this.context.visit(param.initializer)

    // Emit in the same pre-optimization shape as QuickJS:
    //   dup; put_arg
    // LabelResolver will fold it to set_arg0..set_arg3 when possible.
    this.compiler.emitOp(fd, Opcode.OP_dup)
    this.compiler.emitOp(fd, Opcode.OP_put_arg)
    this.compiler.emitU16(fd, idx)

    // 标签: 跳过默认值
    this.compiler.emitLabelInt(fd, label)

    // When has_parameter_expressions, init the argument scope binding.
    // This resolves to put_loc* after resolve_variables.
    if (fd.hasParameterExpressions) {
      this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var_init)
      this.compiler.emitAtom(fd, nameAtom)
      this.compiler.emitU16(fd, fd.scopeLevel)
    }
  }

  /**
   * 发射类字段初始化 - 对应 parser.c:emit_class_field_init
   * 
   * 在构造函数开始时调用初始化器
   */
  private emitClassFieldInit(fd: FunctionDef): void {
    // 获取类字段初始化函数
    this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
    this.compiler.emitAtom(fd, JSAtom.JS_ATOM_class_fields_init)
    this.compiler.emitU16(fd, 0)

    // 检查是否存在
    this.compiler.emitOp(fd, Opcode.OP_dup)
    this.compiler.emitOp(fd, Opcode.OP_undefined)
    this.compiler.emitOp(fd, Opcode.OP_strict_eq)

    const label = this.compiler.newLabelInt(fd)
    this.compiler.emitGotoInt(fd, Opcode.OP_if_true, label)

    // 调用初始化函数
    this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
    this.compiler.emitAtom(fd, JSAtom.JS_ATOM_this)
    this.compiler.emitU16(fd, 0)
    this.compiler.emitOp(fd, Opcode.OP_swap)
    this.compiler.emitOp(fd, Opcode.OP_call_method)
    this.compiler.emitU16(fd, 0)
    this.compiler.emitOp(fd, Opcode.OP_drop)

    const label2 = this.compiler.newLabelInt(fd)
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, label2)

    this.compiler.emitLabelInt(fd, label)
    this.compiler.emitOp(fd, Opcode.OP_drop)

    this.compiler.emitLabelInt(fd, label2)
  }
}
