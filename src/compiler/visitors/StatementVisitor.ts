import ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { CompilerContext } from '../CompilerContext'
import { Opcode, TempOpcode, JSAtom } from '../../env'
import { BlockEnv, JSVarKindEnum } from '../FunctionDef'
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

    // 压入新作用域
    this.compiler.pushScope(fd)

    // 遍历所有语句
    for (const stmt of statements) {
      this.context.visit(stmt)
    }

    // 弹出作用域
    this.compiler.popScope(fd)
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
    const isVar = !isConst && !isLet

    for (const declaration of decl.declarations) {
      // 处理标识符声明
      if (ts.isIdentifier(declaration.name)) {
        const name = declaration.name.text
        const atom = this.compiler.addAtom(name)
        const sourcePos = declaration.getStart()

        // 定义变量 - 对应 parser.c:6532-6538 js_define_var
        if (isConst) {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_CONST)
        } else if (isLet) {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_LET)
        } else {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_VAR)
        }

        // 处理初始化器 - 对应 parser.c:6541-6566
        if (declaration.initializer) {
          // 计算初始化表达式
          this.context.visit(declaration.initializer)

          // 发射 scope_put_var_init 或 scope_put_var
          const opcode = (isConst || isLet) 
            ? TempOpcode.OP_scope_put_var_init 
            : TempOpcode.OP_scope_put_var
          this.compiler.emitOp(fd, opcode, sourcePos)
          this.compiler.emitU32(fd, atom)
          this.compiler.emitU16(fd, fd.scopeLevel)
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
        // TODO: 解构赋值
        throw new Error('Destructuring declarations not yet implemented')
      }
    }
  }

  // ============================================================================
  // if 语句 - 对应 parser.c:7026-7055
  // ============================================================================

  /**
   * 访问 if 语句 - 对应 parser.c:7026-7055
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:7026-7055
   */
  visitIfStatement(node: ts.IfStatement): void {
    const fd = this.funcDef!

    // 创建新作用域 (用于 `let f; if(1) function f(){}` 语义)
    this.compiler.pushScope(fd)

    // 设置 eval 返回值为 undefined - 对应 parser.c:7033
    this.compiler.setEvalRetUndefined(fd)

    // 编译条件表达式
    this.context.visit(node.expression)

    // 创建标签
    const label1 = this.compiler.newLabelInt(fd)

    // 条件为假跳转到 label1
    this.compiler.emitGotoInt(fd, Opcode.OP_if_false, label1)


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
  visitWhileStatement(node: ts.WhileStatement): void {
    const fd = this.funcDef!

    // 创建标签 - 对应 parser.c:7061-7062
    const labelCont = this.compiler.newLabelInt(fd)
    const labelBreak = this.compiler.newLabelInt(fd)

    // 压入 break 条目 - 对应 parser.c:7064-7065
    const breakEntry = new BlockEnv()
    this.compiler.pushBreakEntry(fd, breakEntry, 0, labelBreak, labelCont, 0)

    // 设置 eval 返回值为 undefined - 对应 parser.c:7072
    this.compiler.setEvalRetUndefined(fd)

    // 发射 continue 标签 - 对应 parser.c:7072
    this.compiler.emitLabelInt(fd, labelCont)

    // 编译条件表达式 - 对应 parser.c:7073-7074
    this.context.visit(node.expression)

    // 条件为假跳转到 break 标签 - 对应 parser.c:7075
    this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelBreak)

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
  visitDoStatement(node: ts.DoStatement): void {
    const fd = this.funcDef!

    // 创建标签 - 对应 parser.c:7090-7092
    const labelCont = this.compiler.newLabelInt(fd)
    const labelBreak = this.compiler.newLabelInt(fd)
    const label1 = this.compiler.newLabelInt(fd)

    // 压入 break 条目 - 对应 parser.c:7094-7095
    const breakEntry = new BlockEnv()
    this.compiler.pushBreakEntry(fd, breakEntry, 0, labelBreak, labelCont, 0)

    // 设置 eval 返回值为 undefined - 对应 parser.c:7103
    this.compiler.setEvalRetUndefined(fd)

    // 发射循环开始标签 - 对应 parser.c:7102
    this.compiler.emitLabelInt(fd, label1)

    // 编译循环体 - 对应 parser.c:7106-7107
    this.context.visit(node.statement)

    // 发射 continue 标签 - 对应 parser.c:7109
    this.compiler.emitLabelInt(fd, labelCont)

    // 编译条件表达式 - 对应 parser.c:7112-7113
    this.context.visit(node.expression)

    // 条件为真跳转回循环开始 - 对应 parser.c:7117
    this.compiler.emitGotoInt(fd, Opcode.OP_if_true, label1)

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
  visitForStatement(node: ts.ForStatement): void {
    const fd = this.funcDef!
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
    this.compiler.pushBreakEntry(fd, breakEntry, 0, labelBreak, labelCont, 0)

    // 测试表达式 - 对应 parser.c:7190-7199
    if (node.condition) {
      this.compiler.emitLabelInt(fd, labelTest)
      this.context.visit(node.condition)
      this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelBreak)
    } else {
      // 无条件表达式，test 标签等于 body 标签
      labelTest = labelBody
    }

    // 跳过增量部分到循环体 - 对应 parser.c:7203
    if (node.incrementor) {
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelBody)

      // 增量表达式部分 - 对应 parser.c:7205-7212
      this.compiler.emitLabelInt(fd, labelCont)
      this.context.visit(node.incrementor)
      this.compiler.emitOp(fd, Opcode.OP_drop)
      
      // 跳回测试 - 对应 parser.c:7214
      if (labelTest !== labelBody) {
        this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelTest)
      }
    } else {
      // 无增量表达式，continue 标签指向测试
      breakEntry.labelCont = labelTest
    }

    // 循环体 - 对应 parser.c:7222-7225
    this.compiler.emitLabelInt(fd, labelBody)
    this.context.visit(node.statement)

    // 关闭闭包 - 对应 parser.c:7228-7229
    this.compiler.closeScopes(fd, fd.scopeLevel, blockScopeLevel)

    // 跳转到 continue 标签 - 对应 parser.c:7243
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, node.incrementor ? labelCont : labelTest)

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
  visitForOfStatement(node: ts.ForOfStatement): void {
    const fd = this.funcDef!
    const blockScopeLevel = fd.scopeLevel

    // 设置 eval 返回值为 undefined - for-of 从 for 语句分支进入，继承 parser.c:7134
    this.compiler.setEvalRetUndefined(fd)

    // 创建标签
    const labelCont = this.compiler.newLabelInt(fd)
    const labelBody = this.compiler.newLabelInt(fd)
    const labelBreak = this.compiler.newLabelInt(fd)
    const labelNext = this.compiler.newLabelInt(fd)

    // 创建作用域
    this.compiler.pushScope(fd)

    // 压入 break 条目 (dropCount=1 用于迭代器)
    const breakEntry = new BlockEnv()
    this.compiler.pushBreakEntry(fd, breakEntry, 0, labelBreak, labelCont, 1)
    breakEntry.hasIterator = true
    breakEntry.scopeLevel = blockScopeLevel

    // 跳转到表达式求值
    const labelExpr = this.compiler.newLabelInt(fd)
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelExpr)

    // next 标签
    this.compiler.emitLabelInt(fd, labelNext)

    // 处理循环变量
    if (ts.isVariableDeclarationList(node.initializer)) {
      const decl = node.initializer.declarations[0]
      if (ts.isIdentifier(decl.name)) {
        const name = decl.name.text
        const atom = this.compiler.addAtom(name)
        const isConst = (node.initializer.flags & ts.NodeFlags.Const) !== 0
        const isLet = (node.initializer.flags & ts.NodeFlags.Let) !== 0

        // 定义变量
        if (isConst) {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_CONST)
        } else if (isLet) {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_LET)
        } else {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_VAR)
        }

        // 存储迭代值到变量
        const opcode = (isConst || isLet)
          ? TempOpcode.OP_scope_put_var_init
          : TempOpcode.OP_scope_put_var
        this.compiler.emitOp(fd, opcode)
        this.compiler.emitU32(fd, atom)
        this.compiler.emitU16(fd, fd.scopeLevel)
      }
    } else if (ts.isIdentifier(node.initializer)) {
      // 简单标识符
      const atom = this.compiler.addAtom(node.initializer.text)
      this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var)
      this.compiler.emitU32(fd, atom)
      this.compiler.emitU16(fd, fd.scopeLevel)
    }

    // 循环体标签
    this.compiler.emitLabelInt(fd, labelBody)

    // 编译循环体
    this.context.visit(node.statement)

    // continue 标签
    this.compiler.emitLabelInt(fd, labelCont)

    // 关闭闭包
    this.compiler.closeScopes(fd, fd.scopeLevel, breakEntry.scopeLevel)

    // 跳转到 next
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelNext)

    // 表达式标签 - 求值迭代对象
    this.compiler.emitLabelInt(fd, labelExpr)

    // 求值迭代对象
    this.context.visit(node.expression)

    // 获取迭代器
    this.compiler.emitOp(fd, Opcode.OP_for_of_start)

    // for_of_next 跳转到 break
    this.compiler.emitOp(fd, Opcode.OP_for_of_next)
    this.compiler.emitU8(fd, 0) // 偏移将在后处理中修正
    this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelBreak)

    // 跳转到 next
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelNext)

    // break 标签
    this.compiler.emitLabelInt(fd, labelBreak)

    // 丢弃迭代器
    this.compiler.emitOp(fd, Opcode.OP_drop)

    // 弹出 break 条目
    this.compiler.popBreakEntry(fd)

    // 弹出作用域
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
  visitForInStatement(node: ts.ForInStatement): void {
    const fd = this.funcDef!
    const blockScopeLevel = fd.scopeLevel

    // 设置 eval 返回值为 undefined - for-in 从 for 语句分支进入，继承 parser.c:7134
    this.compiler.setEvalRetUndefined(fd)

    // 创建标签
    const labelCont = this.compiler.newLabelInt(fd)
    const labelBody = this.compiler.newLabelInt(fd)
    const labelBreak = this.compiler.newLabelInt(fd)
    const labelNext = this.compiler.newLabelInt(fd)

    // 创建作用域
    this.compiler.pushScope(fd)

    // 压入 break 条目
    const breakEntry = new BlockEnv()
    this.compiler.pushBreakEntry(fd, breakEntry, 0, labelBreak, labelCont, 1)
    breakEntry.hasIterator = true
    breakEntry.scopeLevel = blockScopeLevel

    // 跳转到表达式求值
    const labelExpr = this.compiler.newLabelInt(fd)
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelExpr)

    // next 标签
    this.compiler.emitLabelInt(fd, labelNext)

    // 处理循环变量
    if (ts.isVariableDeclarationList(node.initializer)) {
      const decl = node.initializer.declarations[0]
      if (ts.isIdentifier(decl.name)) {
        const name = decl.name.text
        const atom = this.compiler.addAtom(name)
        const isConst = (node.initializer.flags & ts.NodeFlags.Const) !== 0
        const isLet = (node.initializer.flags & ts.NodeFlags.Let) !== 0

        // 定义变量
        if (isConst) {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_CONST)
        } else if (isLet) {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_LET)
        } else {
          this.compiler.defineVar(fd, atom, JSVarDefEnum.JS_VAR_DEF_VAR)
        }

        // 存储迭代值到变量
        const opcode = (isConst || isLet)
          ? TempOpcode.OP_scope_put_var_init
          : TempOpcode.OP_scope_put_var
        this.compiler.emitOp(fd, opcode)
        this.compiler.emitU32(fd, atom)
        this.compiler.emitU16(fd, fd.scopeLevel)
      }
    } else if (ts.isIdentifier(node.initializer)) {
      // 简单标识符
      const atom = this.compiler.addAtom(node.initializer.text)
      this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var)
      this.compiler.emitU32(fd, atom)
      this.compiler.emitU16(fd, fd.scopeLevel)
    }

    // 循环体标签
    this.compiler.emitLabelInt(fd, labelBody)

    // 编译循环体
    this.context.visit(node.statement)

    // continue 标签
    this.compiler.emitLabelInt(fd, labelCont)

    // 关闭闭包
    this.compiler.closeScopes(fd, fd.scopeLevel, breakEntry.scopeLevel)

    // 跳转到 next
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelNext)

    // 表达式标签 - 求值迭代对象
    this.compiler.emitLabelInt(fd, labelExpr)

    // 求值迭代对象
    this.context.visit(node.expression)

    // 获取迭代器 (for-in)
    this.compiler.emitOp(fd, Opcode.OP_for_in_start)

    // for_in_next 跳转到 break
    this.compiler.emitOp(fd, Opcode.OP_for_in_next)
    this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelBreak)

    // 跳转到 next
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelNext)

    // break 标签
    this.compiler.emitLabelInt(fd, labelBreak)

    // 丢弃迭代器
    this.compiler.emitOp(fd, Opcode.OP_drop)

    // 弹出 break 条目
    this.compiler.popBreakEntry(fd)

    // 弹出作用域
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
        this.context.visit(clause.expression)

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
      : 0 // JS_ATOM_NULL

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
      : 0 // JS_ATOM_NULL

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
    const sourcePos = node.getStart()

    if (node.expression) {
      // 有返回值
      this.context.visit(node.expression)
      this.compiler.emitOp(fd, Opcode.OP_return, sourcePos)
    } else {
      // 无返回值 - 返回 undefined
      this.compiler.emitOp(fd, Opcode.OP_return_undef, sourcePos)
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
    this.context.visit(node.expression)

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

    // 设置 eval 返回值为 undefined - 对应 parser.c:7389
    this.compiler.setEvalRetUndefined(fd)

    // 创建标签
    const labelCatch = this.compiler.newLabelInt(fd)
    const labelCatch2 = this.compiler.newLabelInt(fd)
    const labelFinally = this.compiler.newLabelInt(fd)
    const labelEnd = this.compiler.newLabelInt(fd)

    // 发射 catch 指令 - 对应 parser.c:7362
    this.compiler.emitGotoInt(fd, Opcode.OP_catch, labelCatch)

    // 压入 break 条目 - 对应 parser.c:7364-7365
    const blockEnv = new BlockEnv()
    this.compiler.pushBreakEntry(fd, blockEnv, 0, -1, -1, 1)
    blockEnv.labelFinally = labelFinally

    // 编译 try 块
    this.visitBlock(node.tryBlock)

    // 弹出 break 条目
    this.compiler.popBreakEntry(fd)

    // try 块正常结束 - 对应 parser.c:7371-7379
    // 丢弃 catch 偏移
    this.compiler.emitOp(fd, Opcode.OP_drop)
    // 推送 undefined 保持栈平衡
    this.compiler.emitOp(fd, Opcode.OP_undefined)
    // 调用 finally
    this.compiler.emitGotoInt(fd, Opcode.OP_gosub, labelFinally)
    this.compiler.emitOp(fd, Opcode.OP_drop)
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
      catchBlockEnv.labelFinally = labelFinally

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
      // 推送 undefined
      this.compiler.emitOp(fd, Opcode.OP_undefined)
      // 调用 finally
      this.compiler.emitGotoInt(fd, Opcode.OP_gosub, labelFinally)
      this.compiler.emitOp(fd, Opcode.OP_drop)
      // 跳转到结束
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelEnd)

      // catch2 标签 - catch 块中发生异常
      this.compiler.emitLabelInt(fd, labelCatch2)
      // 调用 finally
      this.compiler.emitGotoInt(fd, Opcode.OP_gosub, labelFinally)
      // 重新抛出
      this.compiler.emitOp(fd, Opcode.OP_throw)
    } else {
      // 无 catch 子句 - 对应 parser.c:7453-7458
      this.compiler.emitLabelInt(fd, labelCatch)
      // 调用 finally
      this.compiler.emitGotoInt(fd, Opcode.OP_gosub, labelFinally)
      // 重新抛出
      this.compiler.emitOp(fd, Opcode.OP_throw)
    }

    // finally 标签 - 对应 parser.c:7462
    this.compiler.emitLabelInt(fd, labelFinally)

    // finally 块 - 对应 parser.c:7500-7530
    if (node.finallyBlock) {
      // 压入 break 条目 (dropCount=2 用于 ret_value 和 gosub_ret_value)
      const finallyBlockEnv = new BlockEnv()
      this.compiler.pushBreakEntry(fd, finallyBlockEnv, 0, -1, -1, 2)

      // 编译 finally 块
      this.visitBlock(node.finallyBlock)

      // 弹出 break 条目
      this.compiler.popBreakEntry(fd)
    }

    // 发射 ret (返回到 gosub 调用点)
    this.compiler.emitOp(fd, Opcode.OP_ret)

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
      // 循环语句的标签在循环内部处理
      // 需要设置标签名以便循环可以引用
      // TODO: 传递标签名给循环语句
      this.context.visit(stmt)
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
    this.compiler.emitOp(fd, TempOpcode.OP_line_num, sourcePos)
    this.compiler.emitU32(fd, sourcePos)

    // 编译表达式
    this.context.visit(node.expression)

    // 丢弃结果
    this.compiler.emitOp(fd, Opcode.OP_drop)
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
