import ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import {
  Opcode,
  TempOpcode,
  JSMode,
  JSAtom,
  JS_ATOM_NULL,
  JS_DEFINE_CLASS_HAS_HERITAGE,
  OP_DEFINE_METHOD_METHOD,
  OP_DEFINE_METHOD_GETTER,
  OP_DEFINE_METHOD_SETTER,
} from '../../env'
import { 
  FunctionDef, 
  JSVarKindEnum,
  JSParseFunctionEnum,
  JSFunctionKindEnum,
} from '../FunctionDef'
import { JSVarDefEnum } from '../Compiler'
import { CompilerContext } from '../CompilerContext'

/**
 * 类字段定义 - 对应 parser.c:ClassFieldsDef
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:3206-3211
 */
interface ClassFieldsDef {
  /** 字段初始化函数 */
  fieldsInitFd: FunctionDef | null
  /** 计算属性字段数量 */
  computedFieldsCount: number
  /** 是否需要品牌检查 */
  needBrand: boolean
  /** 是否为静态字段 */
  isStatic: boolean
  /** 品牌推送位置 */
  brandPushPos: number

  /** 类私有字段作用域级别（用于子函数闭包解析对齐 QuickJS） */
  privateScopeLevel?: number
}

/**
 * 类访问器 - 对应 parser.c:3213-3742 js_parse_class
 * 
 * 处理:
 * - 类声明 (class declaration)
 * - 类表达式 (class expression)
 * - 类继承 (extends)
 * - 构造函数 (constructor)
 * - 方法 (methods)
 * - 静态方法 (static methods)
 * - getter/setter
 * - 类字段 (class fields)
 * - 静态字段 (static fields)
 * - 私有字段 (private fields)
 * - 静态块 (static blocks)
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:3213-3742
 */
export class ClassVisitor extends VisitorContext {
  constructor(context: CompilerContext) {
    super(context)
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

      // Only count super usage in the current function's body.
      if (node !== root && (ts.isFunctionLike(node) || ts.isClassLike(node))) {
        return
      }

      ts.forEachChild(node, walk)
    }

    walk(root)
    return found
  }

  private findVarInCurrentScope(fd: FunctionDef, varName: number): number {
    let idx = fd.scopes[fd.scopeLevel]?.first ?? -1
    while (idx >= 0) {
      const vd = fd.vars[idx]
      if (vd.varName === varName) {
        return idx
      }
      idx = vd.scopeNext
    }
    return -1
  }

  private getPrivateSetterNameAtom(getterNameAtom: number): number {
    const base = this.compiler.getAtomString(getterNameAtom)
    if (!base) {
      return this.compiler.addAtom('<set>')
    }
    return this.compiler.addAtom(base + '<set>')
  }

  /**
   * 访问类声明 - 对应 parser.c:js_parse_class
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:3213-3742
   * 
   * 语法: class Name [extends SuperClass] { ... }
   */
  visitClassDeclaration(node: ts.ClassDeclaration): void {
    this.compileClass(node, false)
  }

  /**
   * 访问类表达式 - 对应 parser.c:js_parse_class
   * 
   * 语法: const x = class [Name] { ... }
   */
  visitClassExpression(node: ts.ClassExpression): void {
    this.compileClass(node, true)
  }

  /**
   * 编译类 - 对应 parser.c:3213-3742
   * 
   * @param node 类声明或类表达式节点
   * @param isClassExpr 是否为类表达式
   */
  private compileClass(
    node: ts.ClassDeclaration | ts.ClassExpression,
    isClassExpr: boolean
  ): void {
    const fd = this.funcDef!

    // 保存当前 JS 模式，类在严格模式下解析 - 对应 parser.c:3228-3229
    const savedJsMode = fd.jsMode
    fd.jsMode |= JSMode.JS_MODE_STRICT

    // 获取类名 - 对应 parser.c:3231-3245
    let className: number = JS_ATOM_NULL
    let classVarName: number = 0
    if (node.name) {
      className = this.compiler.addAtom(node.name.text)
    }

    // 对于类声明，需要定义变量 - 对应 parser.c:3246-3252
    if (!isClassExpr) {
      if (className === JS_ATOM_NULL) {
        classVarName = JSAtom.JS_ATOM__default_ // export default
      } else {
        classVarName = className
      }
    }

    // 进入作用域 - 对应 parser.c:3254
    this.compiler.pushScope(fd)

    // 解析 extends 子句 - 对应 parser.c:3256-3265
    let classFlags = 0
    const heritage = node.heritageClauses?.find(h => h.token === ts.SyntaxKind.ExtendsKeyword)
    if (heritage && heritage.types.length > 0) {
      classFlags = JS_DEFINE_CLASS_HAS_HERITAGE
      // 编译父类表达式
      this.context.visit(heritage.types[0].expression)
    } else {
      this.compiler.emitOp(fd, Opcode.OP_undefined)
    }

    // 为类名添加 const 定义 - 对应 parser.c:3267-3271
    if (className !== JS_ATOM_NULL) {
      this.compiler.defineVar(fd, className, JSVarDefEnum.JS_VAR_DEF_CONST)
    }

    // 进入私有字段作用域 - 对应 parser.c:3277
    this.compiler.pushScope(fd)
    const privateScopeLevel = fd.scopeLevel

    // 占位符: 构造函数常量池索引 - 对应 parser.c:3279-3281
    this.compiler.emitOp(fd, Opcode.OP_push_const)
    const ctorCpoolOffset = fd.byteCode.size
    this.compiler.emitU32(fd, 0) // 将在后面修补

    // 获取用于 define_class 的类名 - 对应 parser.c:3283-3290
    let className1 = className
    if (className === 0) {
      if (classVarName !== 0) {
        className1 = JSAtom.JS_ATOM_default
      } else {
        className1 = JSAtom.JS_ATOM_empty_string
      }
    }

    // 发射 OP_define_class
    // QuickJS: js_parse_class() 里直接 emit_op(s, OP_define_class)（无 emit_source_pos），因此这里不绑定 sourcePos，避免额外 OP_line_num 采样点。
    // third_party/QuickJS/src/core/parser.c: js_parse_class() -> emit_op(s, OP_define_class)
    this.compiler.emitOp(fd, Opcode.OP_define_class)
    this.compiler.emitAtom(fd, className1)
    this.compiler.emitU8(fd, classFlags)
    const defineClassOffset = fd.lastOpcodePos

    // 初始化类字段定义 - 对应 parser.c:3298-3305
    const classFields: [ClassFieldsDef, ClassFieldsDef] = [
      { fieldsInitFd: null, computedFieldsCount: 0, needBrand: false, isStatic: false, brandPushPos: 0, privateScopeLevel },
      { fieldsInitFd: null, computedFieldsCount: 0, needBrand: false, isStatic: true, brandPushPos: 0, privateScopeLevel }
    ]

    // 编译类成员
    let ctorFd: FunctionDef | null = null

    for (const member of node.members) {
      const result = this.compileClassMember(fd, member, classFlags, classFields)
      if (result && !ctorFd) {
        ctorFd = result
      }
    }

    // 如果没有显式构造函数，创建默认构造函数 - 对应 parser.c:3612-3618
    if (!ctorFd) {
      ctorFd = this.createDefaultConstructor(fd, classFlags, node)
    }

    // 修补构造函数常量池索引 - 对应 parser.c:3619
    fd.byteCode.putU32At(ctorCpoolOffset, ctorFd.parentCpoolIdx)

    // 处理实例字段初始化 - 对应 parser.c:3631-3668
    const cf = classFields[0]
    if (cf.needBrand) {
      // QuickJS: patch the placeholder push_false in <class_fields_init> to push_true
      // so the guarded add_brand block runs.
      if (cf.fieldsInitFd && cf.fieldsInitFd.byteCode && cf.fieldsInitFd.byteCode.size > cf.brandPushPos) {
        cf.fieldsInitFd.byteCode.buffer[cf.brandPushPos] = Opcode.OP_push_true
      }
      // 为原型添加私有品牌
      this.compiler.emitOp(fd, Opcode.OP_dup)
      this.compiler.emitOp(fd, Opcode.OP_null)
      this.compiler.emitOp(fd, Opcode.OP_swap)
      this.compiler.emitOp(fd, Opcode.OP_add_brand)
    }

    // 存储字段初始化函数
    this.compiler.defineVar(fd, JSAtom.JS_ATOM_class_fields_init, JSVarDefEnum.JS_VAR_DEF_CONST)
    if (cf.fieldsInitFd) {
      // 在字段初始化函数末尾发射 return_undef - 对应 parser.c:emit_class_init_end
      this.compiler.emitOp(cf.fieldsInitFd, Opcode.OP_return_undef)
      
      // 发射闭包并存储
      const initCpoolIdx = this.compiler.cpoolAdd(fd, null)
      cf.fieldsInitFd.parentCpoolIdx = initCpoolIdx
      this.compiler.emitOp(fd, Opcode.OP_fclosure)
      this.compiler.emitU32(fd, initCpoolIdx)
      // QuickJS: emit_class_init_end() always emits OP_set_home_object.
      this.compiler.emitOp(fd, Opcode.OP_set_home_object)
    } else {
      this.compiler.emitOp(fd, Opcode.OP_undefined)
    }
    this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var_init)
    this.compiler.emitAtom(fd, JSAtom.JS_ATOM_class_fields_init)
    this.compiler.emitU16(fd, fd.scopeLevel)

    // 弹出原型 - 对应 parser.c:3670
    this.compiler.emitOp(fd, Opcode.OP_drop)

    // 处理静态字段初始化 - 对应 parser.c:3672-3683
    if (classFields[1].needBrand) {
      this.compiler.emitOp(fd, Opcode.OP_dup)
      this.compiler.emitOp(fd, Opcode.OP_dup)
      this.compiler.emitOp(fd, Opcode.OP_add_brand)
    }

    // 存储类名到作用域变量 - 对应 parser.c:3685-3694
    if (className !== 0) {
      this.compiler.emitOp(fd, Opcode.OP_dup)
      this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var_init)
      this.compiler.emitAtom(fd, className)
      this.compiler.emitU16(fd, fd.scopeLevel)
    }

    // 初始化静态字段 - 对应 parser.c:3696-3703
    if (classFields[1].fieldsInitFd) {
      // 在静态字段初始化函数末尾发射 return_undef - 对应 parser.c:emit_class_init_end
      this.compiler.emitOp(classFields[1].fieldsInitFd, Opcode.OP_return_undef)
      
      this.compiler.emitOp(fd, Opcode.OP_dup)
      const initCpoolIdx = this.compiler.cpoolAdd(fd, null)
      classFields[1].fieldsInitFd.parentCpoolIdx = initCpoolIdx
      this.compiler.emitOp(fd, Opcode.OP_fclosure)
      this.compiler.emitU32(fd, initCpoolIdx)
      // QuickJS: emit_class_init_end() always emits OP_set_home_object.
      this.compiler.emitOp(fd, Opcode.OP_set_home_object)
      this.compiler.emitOp(fd, Opcode.OP_call_method)
      this.compiler.emitU16(fd, 0)
      this.compiler.emitOp(fd, Opcode.OP_drop)
    }

    // 弹出私有字段作用域和类作用域 - 对应 parser.c:3705-3706
    this.compiler.popScope(fd)
    this.compiler.popScope(fd)

    // 对于类声明，定义变量并存储 - 对应 parser.c:3708-3716
    if (classVarName !== 0) {
      this.compiler.defineVar(fd, classVarName, JSVarDefEnum.JS_VAR_DEF_LET)
      this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var_init)
      this.compiler.emitAtom(fd, classVarName)
      this.compiler.emitU16(fd, fd.scopeLevel)
    } else if (className === 0) {
      // 匿名类: 设置类名
      this.compiler.emitOp(fd, TempOpcode.OP_set_class_name)
      this.compiler.emitU32(fd, fd.lastOpcodePos + 1 - defineClassOffset)
    }

    // 恢复 JS 模式 - 对应 parser.c:3736
    fd.jsMode = savedJsMode
  }

  /**
   * 编译类成员 - 对应 parser.c:3306-3600
   * 
   * @returns 如果是构造函数，返回构造函数的 FunctionDef
   */
  private compileClassMember(
    fd: FunctionDef,
    member: ts.ClassElement,
    classFlags: number,
    classFields: [ClassFieldsDef, ClassFieldsDef]
  ): FunctionDef | null {
    // 检查是否为静态成员
    const isStatic = ts.canHaveModifiers(member) && 
      (member.modifiers?.some(m => m.kind === ts.SyntaxKind.StaticKeyword) ?? false)

    // 如果是静态成员，交换栈顶 (构造函数和原型) - 对应 parser.c:3366
    if (isStatic) {
      this.compiler.emitOp(fd, Opcode.OP_swap)
    }

    // 根据成员类型处理
    if (ts.isConstructorDeclaration(member)) {
      // 构造函数 - 对应 parser.c:3515-3540
      return this.compileConstructor(fd, member, classFlags)
    } else if (ts.isMethodDeclaration(member)) {
      // 方法 - 对应 parser.c:3489-3600
      this.compileMethod(fd, member, isStatic, classFields)
    } else if (ts.isPropertyDeclaration(member)) {
      // 类字段 - 对应 parser.c:3442-3488
      this.compileClassField(fd, member, isStatic, classFields)
    } else if (ts.isGetAccessorDeclaration(member)) {
      // getter - 对应 parser.c:3382-3440
      this.compileAccessor(fd, member, isStatic, false, classFields)
    } else if (ts.isSetAccessorDeclaration(member)) {
      // setter - 对应 parser.c:3382-3440
      this.compileAccessor(fd, member, isStatic, true, classFields)
    } else if (ts.isClassStaticBlockDeclaration(member)) {
      // 静态块 - 对应 parser.c:3321-3365
      this.compileStaticBlock(fd, member, classFields)
    }

    // 如果是静态成员，再次交换栈顶 - 对应 parser.c:3601-3602
    if (isStatic) {
      this.compiler.emitOp(fd, Opcode.OP_swap)
    }

    return null
  }

  /**
   * 编译构造函数 - 对应 parser.c:3515-3540
   */
  private compileConstructor(
    fd: FunctionDef,
    node: ts.ConstructorDeclaration,
    classFlags: number
  ): FunctionDef {
    const sourcePos = node.getStart()
    const hasHeritage = (classFlags & JS_DEFINE_CLASS_HAS_HERITAGE) !== 0

    // 确定函数类型
    const funcType = hasHeritage
      ? JSParseFunctionEnum.JS_PARSE_FUNC_DERIVED_CLASS_CONSTRUCTOR
      : JSParseFunctionEnum.JS_PARSE_FUNC_CLASS_CONSTRUCTOR

    // 创建构造函数 FunctionDef
    const ctorFd = new FunctionDef(fd, false, false)
    // QuickJS: class constructor 的 bytecode header 里 funcName 是 null
    //（反汇编会显示为 `function: <null>`）。
    ctorFd.funcName = JS_ATOM_NULL
    ctorFd.funcType = funcType
    ctorFd.funcKind = JSFunctionKindEnum.JS_FUNC_NORMAL
    ctorFd.filename = fd.filename
    ctorFd.sourcePos = sourcePos

    // 构造函数属性 - 对应 parser.c:13024-13030
    ctorFd.hasPrototype = false
    ctorFd.hasHomeObject = true
    ctorFd.hasArgumentsBinding = true
    ctorFd.hasThisBinding = true
    ctorFd.newTargetAllowed = true
    ctorFd.superCallAllowed = hasHeritage
    ctorFd.superAllowed = true
    ctorFd.argumentsAllowed = true
    ctorFd.isDerivedClassConstructor = hasHeritage

    // 添加到父函数
    this.compiler.addChild(fd, ctorFd)

    // 编译构造函数体
    this.compileFunctionBodyInternal(ctorFd, node.parameters, node.body)

    // 添加到常量池
    const cpoolIdx = this.compiler.cpoolAdd(fd, null)
    ctorFd.parentCpoolIdx = cpoolIdx

    return ctorFd
  }

  /**
   * 编译方法 - 对应 parser.c:3489-3600
   */
  private compileMethod(
    fd: FunctionDef,
    node: ts.MethodDeclaration,
    isStatic: boolean,
    classFields: [ClassFieldsDef, ClassFieldsDef]
  ): void {
    // QuickJS：方法函数的 debug 位置锚定在“方法名 token”上，
    // 而不是 `static` 之类的修饰符。
    const sf = node.getSourceFile()
    const sourcePos = node.name ? node.name.getStart(sf) : node.getStart(sf)

    // 检查是否为私有方法
    const isPrivate = ts.isPrivateIdentifier(node.name)
    if (isPrivate) {
      classFields[isStatic ? 1 : 0].needBrand = true
    }

    // 确定函数类型和种类
    let funcType = JSParseFunctionEnum.JS_PARSE_FUNC_METHOD
    let funcKind = JSFunctionKindEnum.JS_FUNC_NORMAL

    // 检查 async 和 generator
    const isAsync = node.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword) ?? false
    const isGenerator = node.asteriskToken !== undefined

    if (isAsync && isGenerator) {
      funcKind = JSFunctionKindEnum.JS_FUNC_ASYNC_GENERATOR
    } else if (isAsync) {
      funcKind = JSFunctionKindEnum.JS_FUNC_ASYNC
    } else if (isGenerator) {
      funcKind = JSFunctionKindEnum.JS_FUNC_GENERATOR
    }

    // 获取方法名
    const methodName = this.getPropertyNameAtom(node.name)
    const isComputedName = ts.isComputedPropertyName(node.name)

    // 如果是计算属性名，先编译表达式
    if (isComputedName) {
      this.context.visit((node.name as ts.ComputedPropertyName).expression)
    }

    // 创建方法 FunctionDef
    const methodFd = new FunctionDef(fd, false, false)
    // QuickJS: class methods have a null funcName in the bytecode header; the
    // name is attached via `define_method` / `set_name`.
    methodFd.funcName = JS_ATOM_NULL
    methodFd.funcType = funcType
    methodFd.funcKind = funcKind
    methodFd.filename = fd.filename
    methodFd.sourcePos = sourcePos

    const needsHomeObject = this.bodyContainsSuper(node.body)

    // 方法属性
    methodFd.hasPrototype = false
    methodFd.hasHomeObject = needsHomeObject
    methodFd.hasArgumentsBinding = true
    methodFd.hasThisBinding = true
    methodFd.newTargetAllowed = true
    methodFd.superAllowed = true
    methodFd.needHomeObject = needsHomeObject

    // 添加到父函数
    this.compiler.addChild(fd, methodFd)

    // 编译方法体
    this.compileFunctionBodyInternal(methodFd, node.parameters, node.body)

    // 添加到常量池
    const cpoolIdx = this.compiler.cpoolAdd(fd, null)
    methodFd.parentCpoolIdx = cpoolIdx

    // 发射 OP_fclosure
    // QuickJS: 类解析路径（js_parse_class）本身不调用 emit_source_pos；类相关 opcode 使用 emit_op() 直接发射。
    // 例如 emit_class_init_end() 中对闭包也是 emit_op(s, OP_fclosure)（无 emit_source_pos）。
    // third_party/QuickJS/src/core/parser.c: emit_class_init_end() -> emit_op(s, OP_fclosure)
    this.compiler.emitOp(fd, Opcode.OP_fclosure)
    this.compiler.emitU32(fd, cpoolIdx)

    // 处理私有方法 - 对应 parser.c:3541-3563
    if (isPrivate) {
      // QuickJS: add_private_class_field() 会创建一个 lexical const 变量（varKind=JS_VAR_PRIVATE_METHOD），
      // 并记录 is_static_private。
      // third_party/QuickJS/src/core/parser.c:3589-3610 + add_private_class_field()
      if (this.findVarInCurrentScope(fd, methodName) >= 0) {
        throw new Error('private class field is already defined')
      }
      this.compiler.addPrivateClassField(fd, methodName, JSVarKindEnum.JS_VAR_PRIVATE_METHOD, isStatic)
      methodFd.needHomeObject = true
      this.compiler.emitOp(fd, Opcode.OP_set_home_object)
      this.compiler.emitOp(fd, Opcode.OP_set_name)
      this.compiler.emitAtom(fd, methodName)
      this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var_init)
      this.compiler.emitAtom(fd, methodName)
      this.compiler.emitU16(fd, fd.scopeLevel)
    } else {
      // 公有方法 - 对应 parser.c:3564-3575
      if (isComputedName) {
        this.compiler.emitOp(fd, Opcode.OP_define_method_computed)
      } else {
        this.compiler.emitOp(fd, Opcode.OP_define_method)
        this.compiler.emitAtom(fd, methodName)
      }
      this.compiler.emitU8(fd, OP_DEFINE_METHOD_METHOD)
    }
  }

  /**
   * 编译访问器 (getter/setter) - 对应 parser.c:3382-3440
   */
  private compileAccessor(
    fd: FunctionDef,
    node: ts.GetAccessorDeclaration | ts.SetAccessorDeclaration,
    isStatic: boolean,
    isSetter: boolean,
    classFields: [ClassFieldsDef, ClassFieldsDef]
  ): void {
    // QuickJS 会把 accessor 的 debug 位置锚定到 `get`/`set` 关键字 token
    //（在 `static` 等修饰符之后），而不是整个声明的起始位置。
    // 这会影响 accessor 的第一条 pc2line。
    const sf = node.getSourceFile()
    const text = sf.text
    const declStart = node.getStart(sf)
    const nameStart = node.name.getStart(sf)
    const keyword = isSetter ? 'set' : 'get'
    let sourcePos = declStart
    const kwIdx = text.indexOf(keyword, declStart)
    if (kwIdx >= 0 && kwIdx < nameStart) {
      const before = kwIdx > 0 ? text.charCodeAt(kwIdx - 1) : 0
      const after = kwIdx + keyword.length < text.length ? text.charCodeAt(kwIdx + keyword.length) : 0
      const isBoundaryBefore = before === 0 || before === 0x20 || before === 0x09 || before === 0x0a || before === 0x0d
      const isBoundaryAfter = after === 0 || after === 0x20 || after === 0x09 || after === 0x0a || after === 0x0d
      if (isBoundaryBefore && isBoundaryAfter) {
        sourcePos = kwIdx
      }
    }

    const isPrivate = ts.isPrivateIdentifier(node.name)
    if (isPrivate) {
      classFields[isStatic ? 1 : 0].needBrand = true
    }

    const funcType = isSetter
      ? JSParseFunctionEnum.JS_PARSE_FUNC_SETTER
      : JSParseFunctionEnum.JS_PARSE_FUNC_GETTER

    const accessorName = this.getPropertyNameAtom(node.name)
    const isComputedName = ts.isComputedPropertyName(node.name)

    if (isComputedName) {
      this.context.visit((node.name as ts.ComputedPropertyName).expression)
    }

    // 创建访问器 FunctionDef
    const accessorFd = new FunctionDef(fd, false, false)
    // QuickJS: accessors have a null funcName in the bytecode header.
    accessorFd.funcName = JS_ATOM_NULL
    accessorFd.funcType = funcType
    accessorFd.funcKind = JSFunctionKindEnum.JS_FUNC_NORMAL
    accessorFd.filename = fd.filename
    accessorFd.sourcePos = sourcePos

    const needsHomeObject = this.bodyContainsSuper(node.body)

    accessorFd.hasPrototype = false
    accessorFd.hasHomeObject = needsHomeObject
    accessorFd.hasArgumentsBinding = true
    accessorFd.hasThisBinding = true
    accessorFd.newTargetAllowed = true
    accessorFd.superAllowed = true
    accessorFd.needHomeObject = needsHomeObject

    this.compiler.addChild(fd, accessorFd)

    // 编译访问器体
    this.compileFunctionBodyInternal(accessorFd, node.parameters, node.body)

    const cpoolIdx = this.compiler.cpoolAdd(fd, null)
    accessorFd.parentCpoolIdx = cpoolIdx

    // 同上：类成员闭包发射不绑定 sourcePos，避免 pc2line 额外 entry
    this.compiler.emitOp(fd, Opcode.OP_fclosure)
    this.compiler.emitU32(fd, cpoolIdx)

    if (isPrivate) {
      // Mirror QuickJS private accessor varKind merge logic.
      // third_party/QuickJS/src/core/parser.c:3404-3434
      const existingIdx = this.findVarInCurrentScope(fd, accessorName)
      if (existingIdx >= 0) {
        const existingKind = fd.vars[existingIdx].varKind
        const existingIsStatic = fd.vars[existingIdx].isStaticPrivate
        const isSet = isSetter
        const otherIsSet = !isSet
        const kindGetter = JSVarKindEnum.JS_VAR_PRIVATE_GETTER
        if (
          existingKind === JSVarKindEnum.JS_VAR_PRIVATE_FIELD ||
          existingKind === JSVarKindEnum.JS_VAR_PRIVATE_METHOD ||
          existingKind === JSVarKindEnum.JS_VAR_PRIVATE_GETTER_SETTER ||
          existingKind === (kindGetter + (isSet ? 1 : 0)) ||
          (existingKind === (kindGetter + (otherIsSet ? 1 : 0)) && isStatic !== existingIsStatic)
        ) {
          throw new Error('private class field is already defined')
        }
        fd.vars[existingIdx].varKind = JSVarKindEnum.JS_VAR_PRIVATE_GETTER_SETTER
      } else {
        this.compiler.addPrivateClassField(
          fd,
          accessorName,
          isSetter ? JSVarKindEnum.JS_VAR_PRIVATE_SETTER : JSVarKindEnum.JS_VAR_PRIVATE_GETTER,
          isStatic
        )
      }

      accessorFd.needHomeObject = true
      this.compiler.emitOp(fd, Opcode.OP_set_home_object)
      this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var_init)
      if (isSetter) {
        // QuickJS stores the setter closure in a separate "<set>"-suffixed private name.
        // third_party/QuickJS/src/core/parser.c:3438-3460
        const setterName = this.getPrivateSetterNameAtom(accessorName)
        this.compiler.addPrivateClassField(fd, setterName, JSVarKindEnum.JS_VAR_PRIVATE_SETTER, isStatic)
        this.compiler.emitAtom(fd, setterName)
      } else {
        this.compiler.emitAtom(fd, accessorName)
      }
      this.compiler.emitU16(fd, fd.scopeLevel)
    } else {
      if (isComputedName) {
        this.compiler.emitOp(fd, Opcode.OP_define_method_computed)
      } else {
        this.compiler.emitOp(fd, Opcode.OP_define_method)
        this.compiler.emitAtom(fd, accessorName)
      }
      this.compiler.emitU8(fd, isSetter ? OP_DEFINE_METHOD_SETTER : OP_DEFINE_METHOD_GETTER)
    }
  }

  /**
   * 编译类字段 - 对应 parser.c:3442-3488
   */
  private compileClassField(
    fd: FunctionDef,
    node: ts.PropertyDeclaration,
    isStatic: boolean,
    classFields: [ClassFieldsDef, ClassFieldsDef]
  ): void {
    const cf = classFields[isStatic ? 1 : 0]
    const isPrivate = ts.isPrivateIdentifier(node.name)
    const fieldName = this.getPropertyNameAtom(node.name)
    const isComputedName = ts.isComputedPropertyName(node.name)

    // 私有字段需要创建符号
    if (isPrivate) {
      // QuickJS: add_private_class_field() -> add_scope_var + mark lexical const + is_static_private
      // third_party/QuickJS/src/core/parser.c:3476-3493 + add_private_class_field()
      if (this.findVarInCurrentScope(fd, fieldName) >= 0) {
        throw new Error('private class field is already defined')
      }
      this.compiler.addPrivateClassField(fd, fieldName, JSVarKindEnum.JS_VAR_PRIVATE_FIELD, isStatic)
      this.compiler.emitOp(fd, Opcode.OP_private_symbol)
      this.compiler.emitAtom(fd, fieldName)
      this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var_init)
      this.compiler.emitAtom(fd, fieldName)
      this.compiler.emitU16(fd, fd.scopeLevel)
    }

    // 创建字段初始化函数（如果还没有）
    if (!cf.fieldsInitFd) {
      cf.fieldsInitFd = this.createFieldsInitFunction(fd, isStatic, cf)
    }

    // 切换到字段初始化函数
    const prevFd = this.funcDef
    this.context.funcDef = cf.fieldsInitFd

    // 发射 this
    this.compiler.emitOp(cf.fieldsInitFd, TempOpcode.OP_scope_get_var)
    this.compiler.emitAtom(cf.fieldsInitFd, JSAtom.JS_ATOM_this)
    this.compiler.emitU16(cf.fieldsInitFd, 0)

    if (isComputedName) {
      // 获取计算属性名
      this.compiler.emitOp(cf.fieldsInitFd, TempOpcode.OP_scope_get_var)
      this.compiler.emitAtom(cf.fieldsInitFd, JSAtom.JS_ATOM_computed_field + (isStatic ? 1 : 0))
      // QuickJS uses the current function's scope_level (fields_init_fd), not the outer class fd.
      this.compiler.emitU16(cf.fieldsInitFd, cf.fieldsInitFd.scopeLevel)
      cf.computedFieldsCount++
    } else if (isPrivate) {
      this.compiler.emitOp(cf.fieldsInitFd, TempOpcode.OP_scope_get_var)
      this.compiler.emitAtom(cf.fieldsInitFd, fieldName)
      // Resolve private name via closure from the surrounding class scope.
      this.compiler.emitU16(cf.fieldsInitFd, cf.fieldsInitFd.scopeLevel)
    }

    // 编译初始值或使用 undefined
    if (node.initializer) {
      this.context.visit(node.initializer)
    } else {
      this.compiler.emitOp(cf.fieldsInitFd, Opcode.OP_undefined)
    }

    // 定义字段
    if (isPrivate) {
      this.compiler.emitOp(cf.fieldsInitFd, Opcode.OP_define_private_field)
    } else if (isComputedName) {
      this.compiler.emitOp(cf.fieldsInitFd, Opcode.OP_define_array_el)
      this.compiler.emitOp(cf.fieldsInitFd, Opcode.OP_drop)
    } else {
      this.compiler.emitOp(cf.fieldsInitFd, Opcode.OP_define_field)
      this.compiler.emitAtom(cf.fieldsInitFd, fieldName)
    }

    // 恢复上下文
    this.context.funcDef = prevFd
  }

  /**
   * 编译静态块 - 对应 parser.c:3321-3365
   */
  private compileStaticBlock(
    fd: FunctionDef,
    node: ts.ClassStaticBlockDeclaration,
    classFields: [ClassFieldsDef, ClassFieldsDef]
  ): void {
    const cf = classFields[1] // 静态

    if (!cf.fieldsInitFd) {
      cf.fieldsInitFd = this.createFieldsInitFunction(fd, true, cf)
    }

    // 创建静态块函数
    const blockFd = new FunctionDef(cf.fieldsInitFd, false, false)
    blockFd.funcName = 0
    blockFd.funcType = JSParseFunctionEnum.JS_PARSE_FUNC_CLASS_STATIC_INIT
    blockFd.funcKind = JSFunctionKindEnum.JS_FUNC_NORMAL
    blockFd.filename = fd.filename
    // QuickJS static blocks anchor to the '{' token (after `static`).
    // This affects the initial pc2line (line/column) entry.
    {
      const sf = node.getSourceFile()
      const text = sf.text
      const start = node.getStart(sf)
      const end = node.getEnd()
      const bracePos = text.indexOf('{', start)
      blockFd.sourcePos = bracePos >= 0 && bracePos < end ? bracePos : start
    }

    blockFd.hasArgumentsBinding = false
    // QuickJS: arguments identifier is not allowed in class static init blocks.
    blockFd.argumentsAllowed = false
    blockFd.newTargetAllowed = true
    blockFd.superAllowed = true

    this.compiler.addChild(cf.fieldsInitFd, blockFd)

    // 编译静态块体
    const prevFd = this.funcDef
    this.context.funcDef = blockFd

    this.compiler.pushScope(blockFd)
    for (const stmt of node.body.statements) {
      this.context.visit(stmt)
    }
    if (this.compiler.isLiveCode(blockFd)) {
      this.compiler.emitReturn(blockFd, false)
    }

    this.context.funcDef = prevFd

    // 在字段初始化函数中调用静态块
    const cpoolIdx = this.compiler.cpoolAdd(cf.fieldsInitFd, null)
    blockFd.parentCpoolIdx = cpoolIdx

    const initFd = cf.fieldsInitFd
    this.compiler.pushScope(initFd)

    // QuickJS: js_parse_class() static-block path leaves the fclosure on stack,
    // then loads `this`, swaps, and calls as a method.
    // third_party/QuickJS/src/core/parser.c: around js_parse_class() static block branch.
    this.compiler.emitOp(initFd, Opcode.OP_fclosure)
    this.compiler.emitU32(initFd, cpoolIdx)

    this.compiler.emitOp(initFd, TempOpcode.OP_scope_get_var)
    this.compiler.emitAtom(initFd, JSAtom.JS_ATOM_this)
    this.compiler.emitU16(initFd, 0)
    this.compiler.emitOp(initFd, Opcode.OP_swap)
    this.compiler.emitOp(initFd, Opcode.OP_call_method)
    this.compiler.emitU16(initFd, 0)
    this.compiler.emitOp(initFd, Opcode.OP_drop)

    this.compiler.popScope(initFd)
  }

  /**
   * 创建默认构造函数 - 对应 parser.c:3044-3203 js_parse_class_default_ctor
   */
  private createDefaultConstructor(
    fd: FunctionDef,
    classFlags: number,
    classNode: ts.ClassLikeDeclaration
  ): FunctionDef {
    const hasHeritage = (classFlags & JS_DEFINE_CLASS_HAS_HERITAGE) !== 0

    const ctorFd = new FunctionDef(fd, false, false)
    // QuickJS: 默认类构造函数在字节码头里 funcName 为 null（名字由外层 class 结构隐式表达）。
    ctorFd.funcName = JS_ATOM_NULL
    ctorFd.funcType = hasHeritage
      ? JSParseFunctionEnum.JS_PARSE_FUNC_DERIVED_CLASS_CONSTRUCTOR
      : JSParseFunctionEnum.JS_PARSE_FUNC_CLASS_CONSTRUCTOR
    ctorFd.funcKind = JSFunctionKindEnum.JS_FUNC_NORMAL
    ctorFd.filename = fd.filename

    ctorFd.hasPrototype = false
    ctorFd.hasHomeObject = true
    ctorFd.hasArgumentsBinding = true
    ctorFd.hasThisBinding = true
    // QuickJS: 默认构造函数使用“非简单参数列表”，并且不会在函数 flags 里启用 `arguments` 绑定/变量。
    // 这会影响序列化出来的函数头 flags（例如：base default ctor 常见为 0x540）。
    ctorFd.hasSimpleParameterList = false
    ctorFd.argumentsAllowed = false
    ctorFd.newTargetAllowed = true
    ctorFd.superCallAllowed = hasHeritage
    ctorFd.superAllowed = true
    ctorFd.isDerivedClassConstructor = hasHeritage

    // QuickJS: 默认 ctor 的 debug base 通常锚定在 class 定义末尾附近。
    // 这里用 class 末尾的 '}' token 位置作为 sourcePos，确保 pc2line base 与 WASM 输出一致。
    const classEndPos = Math.max(0, classNode.getEnd() - 1)
    ctorFd.sourcePos = classEndPos

    this.compiler.addChild(fd, ctorFd)

    // QuickJS 默认 ctor：先进入 body scope。
    // QuickJS 源码: third_party/QuickJS/src/core/parser.c: js_parse_class_default_ctor
    this.compiler.pushScope(ctorFd)
    ctorFd.bodyScope = ctorFd.scopeLevel

    if (hasHeritage) {
      // Derived: OP_init_ctor 执行 super 构造调用。
      this.compiler.emitOp(ctorFd, Opcode.OP_init_ctor)
      // 在构造函数作用域绑定 `this`。
      this.compiler.emitOp(ctorFd, TempOpcode.OP_scope_put_var_init)
      this.compiler.emitAtom(ctorFd, JSAtom.JS_ATOM_this)
      this.compiler.emitU16(ctorFd, 0)
      // 然后执行 class fields 初始化。
      this.emitClassFieldInitInternal(ctorFd)
    } else {
      // Base: 检查 ctor 并执行 class fields 初始化。
      this.compiler.emitOp(ctorFd, Opcode.OP_check_ctor)
      this.emitClassFieldInitInternal(ctorFd)
    }

    this.compiler.emitReturn(ctorFd, false)

    const cpoolIdx = this.compiler.cpoolAdd(fd, null)
    ctorFd.parentCpoolIdx = cpoolIdx

    return ctorFd
  }

  /**
   * 创建字段初始化函数 - 对应 parser.c:emit_class_init_start
   */
  private createFieldsInitFunction(fd: FunctionDef, isStatic: boolean, cf?: ClassFieldsDef): FunctionDef {
    const initFd = new FunctionDef(fd, false, false)
    // QuickJS: class init helper 在字节码头里 funcName 为 null，名字由外层 class opcodes 提供。
    initFd.funcName = JS_ATOM_NULL
    initFd.funcType = JSParseFunctionEnum.JS_PARSE_FUNC_METHOD
    initFd.funcKind = JSFunctionKindEnum.JS_FUNC_NORMAL
    initFd.filename = fd.filename

    initFd.hasPrototype = false
    initFd.hasHomeObject = true
    initFd.hasArgumentsBinding = true
    initFd.hasThisBinding = true
    // QuickJS: class fields init helper 在简单场景下序列化 flags 常见为 0x548
    // （典型特征：非简单参数列表、没有 arguments 对象，但允许 super/new.target）。
    initFd.hasSimpleParameterList = false
    initFd.argumentsAllowed = false
    initFd.newTargetAllowed = true
    initFd.superAllowed = true

    this.compiler.addChild(fd, initFd)

    // QuickJS: fields_init_fd 创建时位于 class private field scope 内部，因此私有名的闭包解析应从该 scopeLevel 开始。
    if (cf?.privateScopeLevel !== undefined) {
      initFd.parentScopeLevel = cf.privateScopeLevel
    }

    // QuickJS: emit_class_init_start() 会生成一段 brand-check 逻辑，前面先放一个 push_false 占位，
    // 在需要时再回填为 push_true。
    // 对于 static fields init：QuickJS 在这里不生成这段 prologue。
    if (!isStatic) {
      this.compiler.emitOp(initFd, Opcode.OP_push_false)
      if (cf) {
        cf.brandPushPos = initFd.lastOpcodePos
      }

      const labelAddBrand = this.compiler.newLabelInt(initFd)
      this.compiler.emitGotoInt(initFd, Opcode.OP_if_false, labelAddBrand)

      this.compiler.emitOp(initFd, TempOpcode.OP_scope_get_var)
      this.compiler.emitAtom(initFd, JSAtom.JS_ATOM_this)
      this.compiler.emitU16(initFd, 0)

      this.compiler.emitOp(initFd, TempOpcode.OP_scope_get_var)
      this.compiler.emitAtom(initFd, JSAtom.JS_ATOM_home_object)
      this.compiler.emitU16(initFd, 0)

      this.compiler.emitOp(initFd, Opcode.OP_add_brand)
      this.compiler.emitLabelInt(initFd, labelAddBrand)
    }
    
    return initFd
  }

  /**
   * 辅助方法: 编译函数体
   */
  private compileFunctionBodyInternal(
    fd: FunctionDef,
    parameters: readonly ts.ParameterDeclaration[] | ts.NodeArray<ts.ParameterDeclaration>,
    body: ts.Block | undefined
  ): void {
    const prevFd = this.funcDef
    this.context.funcDef = fd

    // 构造函数检查
    if (fd.funcType === JSParseFunctionEnum.JS_PARSE_FUNC_CLASS_CONSTRUCTOR ||
        fd.funcType === JSParseFunctionEnum.JS_PARSE_FUNC_DERIVED_CLASS_CONSTRUCTOR) {
      this.compiler.emitOp(fd, Opcode.OP_check_ctor)
    }

    // 非派生类构造函数的字段初始化
    if (fd.funcType === JSParseFunctionEnum.JS_PARSE_FUNC_CLASS_CONSTRUCTOR) {
      this.emitClassFieldInitInternal(fd)
    }

    // 编译参数
    this.compileParametersInternal(fd, parameters)

    // Generator 的 initial_yield
    if (fd.funcKind === JSFunctionKindEnum.JS_FUNC_GENERATOR ||
        fd.funcKind === JSFunctionKindEnum.JS_FUNC_ASYNC_GENERATOR) {
      this.compiler.emitOp(fd, Opcode.OP_initial_yield)
    }

    fd.inFunctionBody = true
    this.compiler.pushScope(fd)
    fd.bodyScope = fd.scopeLevel

    if (body) {
      for (const stmt of body.statements) {
        this.context.visit(stmt)
      }
    }

    if (this.compiler.isLiveCode(fd)) {
      this.compiler.emitReturn(fd, false)
    }

    this.context.funcDef = prevFd
  }

  /**
   * 辅助方法: 编译参数
   */
  private compileParametersInternal(
    fd: FunctionDef,
    parameters: readonly ts.ParameterDeclaration[] | ts.NodeArray<ts.ParameterDeclaration>
  ): void {
    fd.hasSimpleParameterList = true

    for (const param of parameters) {
      if (param.dotDotDotToken) {
        fd.hasSimpleParameterList = false
        if (ts.isIdentifier(param.name)) {
          const nameAtom = this.compiler.addAtom(param.name.text)
          const idx = this.compiler.addArg(fd, nameAtom)
          this.compiler.emitOp(fd, Opcode.OP_rest)
          this.compiler.emitU16(fd, idx)
          this.compiler.emitOp(fd, Opcode.OP_put_arg)
          this.compiler.emitU16(fd, idx)
        }
        continue
      }

      if (ts.isIdentifier(param.name)) {
        const nameAtom = this.compiler.addAtom(param.name.text)
        const idx = this.compiler.addArg(fd, nameAtom)

        if (param.initializer) {
          fd.hasSimpleParameterList = false
          const label = this.compiler.newLabelInt(fd)
          this.compiler.emitOp(fd, Opcode.OP_get_arg)
          this.compiler.emitU16(fd, idx)
          this.compiler.emitOp(fd, Opcode.OP_dup)
          this.compiler.emitOp(fd, Opcode.OP_undefined)
          this.compiler.emitOp(fd, Opcode.OP_strict_eq)
          this.compiler.emitGotoInt(fd, Opcode.OP_if_false, label)
          this.compiler.emitOp(fd, Opcode.OP_drop)
          this.context.visit(param.initializer)
          this.compiler.emitOp(fd, Opcode.OP_dup)
          this.compiler.emitOp(fd, Opcode.OP_put_arg)
          this.compiler.emitU16(fd, idx)
          this.compiler.emitLabelInt(fd, label)
        } else {
          fd.definedArgCount++
        }
      }
    }
  }

  /**
   * 辅助方法: 发射类字段初始化
   * 
   * 对应 parser.c:3127-3150 (emit_class_field_init)
   */
  private emitClassFieldInitInternal(fd: FunctionDef): void {
    // 获取 class_fields_init
    // 对应 parser.c:3131-3133
    this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
    this.compiler.emitAtom(fd, JSAtom.JS_ATOM_class_fields_init)
    this.compiler.emitU16(fd, fd.scopeLevel)  // 使用当前 scope_level

    // 如果 class_fields_init 是 falsy (undefined)，跳过调用
    // 对应 parser.c:3136-3137
    this.compiler.emitOp(fd, Opcode.OP_dup)
    const labelNext = this.compiler.newLabelInt(fd)
    this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelNext)

    // 获取 this 并调用 class_fields_init
    // 对应 parser.c:3139-3147
    this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
    this.compiler.emitAtom(fd, JSAtom.JS_ATOM_this)
    this.compiler.emitU16(fd, 0)
    this.compiler.emitOp(fd, Opcode.OP_swap)
    this.compiler.emitOp(fd, Opcode.OP_call_method)
    this.compiler.emitU16(fd, 0)

    // 标签和 drop
    // 对应 parser.c:3148-3149
    this.compiler.emitLabelInt(fd, labelNext)
    this.compiler.emitOp(fd, Opcode.OP_drop)
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
    } else if (ts.isPrivateIdentifier(name)) {
      return this.compiler.addAtom(name.text)
    }
    return JS_ATOM_NULL
  }
}
