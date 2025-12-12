import ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { CompilerContext } from '../CompilerContext'
import { Opcode, FunctionKind, JSMode, JSAtom } from '../../env'
import { 
  FunctionDef, 
  JSVarKind,
  JSVarKindEnum,
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
      : 0 // JS_ATOM_NULL

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

    // 发射 OP_fclosure - 对应 parser.c:13361-13377
    // 对于函数声明，需要在外部作用域定义变量
    this.compiler.emitOp(parentFd, Opcode.OP_fclosure, sourcePos)
    this.compiler.emitU32(parentFd, cpoolIdx)

    // 如果有函数名，设置名称
    if (funcName === 0) {
      this.compiler.emitOp(parentFd, Opcode.OP_set_name)
      this.compiler.emitU32(parentFd, 0) // JS_ATOM_NULL
    }

    // 定义函数变量 - 对应 parser.c:13379-13430
    if (parentFd.isGlobalVar) {
      // 全局作用域: 添加全局变量
      const hf = this.compiler.addGlobalVar(parentFd, funcName)
      if (hf) {
        hf.cpoolIdx = cpoolIdx
      }
    } else {
      // 函数作用域: 定义 var 变量
      const varIdx = this.compiler.defineVar(parentFd, funcName, JSVarDefEnum.JS_VAR_DEF_VAR)
      if (varIdx >= 0 && varIdx < ARGUMENT_VAR_OFFSET) {
        parentFd.vars[varIdx].funcPoolIdx = cpoolIdx
      }
    }

    // 存储到作用域变量 - 对应 parser.c:13419-13423
    this.compiler.emitOp(parentFd, Opcode.OP_scope_put_var_init)
    this.compiler.emitAtom(parentFd, funcName)
    this.compiler.emitU16(parentFd, parentFd.scopeLevel)

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
      : 0 // JS_ATOM_NULL

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
    this.compiler.emitOp(parentFd, Opcode.OP_fclosure, sourcePos)
    this.compiler.emitU32(parentFd, cpoolIdx)

    // 如果没有名称，设置为 null
    if (funcName === 0) {
      this.compiler.emitOp(parentFd, Opcode.OP_set_name)
      this.compiler.emitU32(parentFd, 0) // JS_ATOM_NULL
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
    this.compiler.emitOp(parentFd, Opcode.OP_fclosure, sourcePos)
    this.compiler.emitU32(parentFd, cpoolIdx)

    // 箭头函数没有名称，但可能从赋值推断
    this.compiler.emitOp(parentFd, Opcode.OP_set_name)
    this.compiler.emitU32(parentFd, 0) // JS_ATOM_NULL
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
    const sourcePos = node.getStart()

    // 确定函数类型
    let funcType = JSParseFunctionEnum.JS_PARSE_FUNC_METHOD
    let funcKind = this.getFunctionKind(node)

    // 获取方法名
    const funcName = this.getPropertyNameAtom(node.name)

    // 创建子函数定义
    const fd = new FunctionDef(parentFd, false, false)
    fd.funcName = funcName
    fd.funcType = funcType
    fd.funcKind = funcKind
    fd.filename = parentFd.filename
    fd.sourcePos = sourcePos

    // 方法属性 - 对应 parser.c:13022-13030
    fd.hasPrototype = false // 方法没有 prototype
    fd.hasHomeObject = true // 方法有 home object (用于 super)
    fd.hasArgumentsBinding = true
    fd.hasThisBinding = true
    fd.newTargetAllowed = true
    fd.superCallAllowed = false
    fd.superAllowed = true // 方法可以使用 super
    fd.argumentsAllowed = true
    fd.needHomeObject = true

    // 添加到父函数的子函数列表
    this.compiler.addChild(parentFd, fd)

    // 编译方法体
    this.compileFunctionBody(fd, node.parameters, node.body)

    // 添加到常量池
    const cpoolIdx = this.compiler.cpoolAdd(parentFd, null)
    fd.parentCpoolIdx = cpoolIdx

    // 发射 OP_fclosure
    this.compiler.emitOp(parentFd, Opcode.OP_fclosure, sourcePos)
    this.compiler.emitU32(parentFd, cpoolIdx)

    // 对于需要 home object 的方法，发射 OP_set_home_object
    if (fd.needHomeObject) {
      this.compiler.emitOp(parentFd, Opcode.OP_set_home_object)
    }
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

    this.compiler.emitOp(parentFd, Opcode.OP_fclosure, sourcePos)
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

    this.compiler.emitOp(parentFd, Opcode.OP_fclosure, sourcePos)
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
      return 0 // JS_ATOM_NULL
    } else if (ts.isPrivateIdentifier(name)) {
      return this.compiler.addAtom(name.text)
    }
    return 0
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

    // 解析参数 - 对应 parser.c:13060-13170
    this.compileParameters(fd, parameters)

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

    // 解析参数
    this.compileParameters(fd, parameters)

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

      // 发射返回指令
      if (fd.funcKind !== JSFunctionKindEnum.JS_FUNC_NORMAL) {
        this.compiler.emitOp(fd, Opcode.OP_return_async)
      } else {
        this.compiler.emitOp(fd, Opcode.OP_return)
      }
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
      const paramSourcePos = param.getStart()

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
        const idx = this.compiler.addArg(fd, nameAtom)

        // 检查默认值 - 对应 parser.c:13134-13164
        if (param.initializer) {
          fd.hasSimpleParameterList = false
          hasOptArg = true
          this.compileParameterDefaultValue(fd, param, idx)
        } else {
          if (!hasOptArg) {
            fd.definedArgCount++
          }
        }
      }
    }
  }

  /**
   * 编译 rest 参数 - 对应 parser.c:13078-13085
   */
  private compileRestParameter(fd: FunctionDef, param: ts.ParameterDeclaration, argIndex: number): void {
    if (!ts.isIdentifier(param.name)) {
      throw new Error('Rest parameter must be an identifier')
    }

    const nameAtom = this.compiler.addAtom(param.name.text)
    const idx = this.compiler.addArg(fd, nameAtom)

    // 发射 OP_rest 指令
    this.compiler.emitOp(fd, Opcode.OP_rest)
    this.compiler.emitU16(fd, idx)

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
  ): void {
    if (!param.initializer) return

    const label = this.compiler.newLabelInt(fd)

    // 获取参数值 - 对应 parser.c:13143-13144
    this.compiler.emitOp(fd, Opcode.OP_get_arg)
    this.compiler.emitU16(fd, idx)

    // 复制并检查是否为 undefined - 对应 parser.c:13145-13148
    this.compiler.emitOp(fd, Opcode.OP_dup)
    this.compiler.emitOp(fd, Opcode.OP_undefined)
    this.compiler.emitOp(fd, Opcode.OP_strict_eq)

    // 如果不是 undefined，跳过默认值
    this.compiler.emitGotoInt(fd, Opcode.OP_if_false, label)

    // 弹出 undefined，计算默认值 - 对应 parser.c:13149-13152
    this.compiler.emitOp(fd, Opcode.OP_drop)
    
    // 编译默认值表达式
    this.context.visit(param.initializer)

    // 复制并存回参数 - 对应 parser.c:13155-13158
    this.compiler.emitOp(fd, Opcode.OP_dup)
    this.compiler.emitOp(fd, Opcode.OP_put_arg)
    this.compiler.emitU16(fd, idx)

    // 标签: 跳过默认值
    this.compiler.emitLabelInt(fd, label)
  }

  /**
   * 发射类字段初始化 - 对应 parser.c:emit_class_field_init
   * 
   * 在构造函数开始时调用初始化器
   */
  private emitClassFieldInit(fd: FunctionDef): void {
    // 获取类字段初始化函数
    this.compiler.emitOp(fd, Opcode.OP_scope_get_var)
    this.compiler.emitAtom(fd, JSAtom.JS_ATOM_class_fields_init)
    this.compiler.emitU16(fd, 0)

    // 检查是否存在
    this.compiler.emitOp(fd, Opcode.OP_dup)
    this.compiler.emitOp(fd, Opcode.OP_undefined)
    this.compiler.emitOp(fd, Opcode.OP_strict_eq)

    const label = this.compiler.newLabelInt(fd)
    this.compiler.emitGotoInt(fd, Opcode.OP_if_true, label)

    // 调用初始化函数
    this.compiler.emitOp(fd, Opcode.OP_scope_get_var)
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
