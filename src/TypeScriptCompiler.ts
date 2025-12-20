import ts from 'typescript'
import { Compiler, Label } from './compiler/Compiler'
import { FunctionDef, JSVarKind, JSVarDef, JSClosureVar, JSVarScope } from './compiler/FunctionDef'
import { JSAtom, JSMode, Opcode, FunctionKind, OPCODE_BY_CODE } from './env'
import { ScopeManager, VarInfo, Scope } from './compiler/ScopeManager'
import { LabelManager, LoopInfo } from './compiler/LabelManager'

import { CompilerContext } from './compiler/CompilerContext'
import { StatementVisitor } from './compiler/visitors/StatementVisitor'
import { ExpressionVisitor } from './compiler/visitors/ExpressionVisitor'
import { FunctionVisitor } from './compiler/visitors/FunctionVisitor'
import { ClassVisitor } from './compiler/visitors/ClassVisitor'
import { LiteralVisitor } from './compiler/visitors/LiteralVisitor'
import { IdentifierVisitor } from './compiler/visitors/IdentifierVisitor'
import { ThisVisitor } from './compiler/visitors/ThisVisitor'
import { HoistVariablesVisitor } from './compiler/HoistVariablesVisitor'
import { VariableResolver } from './compiler/VariableResolver'
import { LabelResolver } from './compiler/LabelResolver'
import { StackSizeComputer } from './compiler/StackSizeComputer'
import { FunctionBuilder, BytecodeWriter } from './compiler/FunctionBuilder'
import { DebugInfoBuilder } from './compiler/DebugInfoBuilder'

export class TypeScriptCompiler implements CompilerContext {
  public compiler: Compiler
  public scopeManager: ScopeManager
  public labelManager: LabelManager
  public variableResolver: VariableResolver
  public funcDef: FunctionDef | null = null
  public currentNode: ts.Node | null = null
  public deferredTasks: (() => void)[] = []
  public isTerminated = false
  public nodeScopeMap: Map<ts.Node, number[]> = new Map()
  private statementVisitor: StatementVisitor
  private expressionVisitor: ExpressionVisitor
  private functionVisitor: FunctionVisitor
  private classVisitor: ClassVisitor
  private literalVisitor: LiteralVisitor
  private identifierVisitor: IdentifierVisitor
  private thisVisitor: ThisVisitor
  private variableHoister: HoistVariablesVisitor

  constructor(options?: any) {
    // console.log('TypeScriptCompiler constructor called')
    this.compiler = new Compiler(options)
    this.scopeManager = new ScopeManager(this.compiler)
    this.labelManager = new LabelManager(this.compiler)
    this.variableResolver = new VariableResolver(this)
    this.statementVisitor = new StatementVisitor(this)
    this.expressionVisitor = new ExpressionVisitor(this)
    this.functionVisitor = new FunctionVisitor(this)
    this.classVisitor = new ClassVisitor(this)
    this.literalVisitor = new LiteralVisitor(this)
    this.identifierVisitor = new IdentifierVisitor(this)
    this.thisVisitor = new ThisVisitor(this)
    this.variableHoister = new HoistVariablesVisitor(this)
    // this.compiler.addAtom('undefined')
  }

  setFuncDef(funcDef: FunctionDef | null) {
    this.funcDef = funcDef
  }

  setIsTerminated(value: boolean) {
    this.isTerminated = value
  }


  async compileFileWithArtifacts(filename: string): Promise<{ bytecode: Uint8Array, functionDef: FunctionDef }> {
    const fs = await import('fs/promises')
    const source = await fs.readFile(filename, 'utf-8')
    const bytecode = this.compile(source, filename)
    return { bytecode, functionDef: this.funcDef! }
  }

  compile(source: string, filename: string = 'input.ts'): Uint8Array {
    /**
     * 编译入口 - 对应 QuickJS parser.c:13579-13697 (__JS_EvalInternal)
     * 
     * 流程:
     * 1. 创建 FunctionDef (js_new_function_def)
     * 2. 初始化作用域 (push_scope for body scope)
     * 3. 遍历 TypeScript AST 并发射字节码
     * 4. 发射 return 指令
     * 5. 调用 VariableResolver.resolve() (resolve_variables)
     * 6. 调用 LabelResolver.resolve() (resolve_labels)
     * 7. 调用 StackSizeComputer.compute() (compute_stack_size)
     * 8. 调用 FunctionBuilder.build() 和 BytecodeWriter.write() 序列化
     */
    
    // 1. 解析 TypeScript 源码
    const sourceFile = ts.createSourceFile(
      filename,
      source,
      ts.ScriptTarget.ESNext,
      true,
      ts.ScriptKind.TS
    )
    
    // 设置 sourceFile 到 compiler
    this.compiler.setSourceFile(sourceFile)
    
    // 2. 创建根 FunctionDef - 对应 js_new_function_def (parser.c:8215-8285)
    const fd = new FunctionDef()
    fd.isEval = true
    fd.evalType = 1 // JS_EVAL_TYPE_GLOBAL
    fd.isGlobalVar = true
    fd.hasThisBinding = true
    fd.newTargetAllowed = false
    fd.superCallAllowed = false
    fd.superAllowed = false
    fd.argumentsAllowed = true
    // 重要: 对于 eval 脚本，js_new_function_def 使用 js_mallocz 初始化
    // 所以 has_simple_parameter_list 初始为 0 (FALSE)，不像正常函数会设置为 TRUE
    // (parser.c:13072 只对实际函数声明设置 TRUE)
    fd.hasSimpleParameterList = false
    fd.funcName = this.compiler.addAtom('<eval>')
    fd.filename = this.compiler.addAtom(filename)
    fd.source = source
    fd.sourceLen = source.length
    fd.sourcePos = 0

    // 初始化行列缓存 - 对应 QuickJS get_line_col_cached (parser.c:148-180)
    // 供后续 DebugInfoBuilder.computePc2LineInfo 使用。
    DebugInfoBuilder.initLineColCache(fd, source)
    
    // 初始化作用域数组 - parser.c:8261-8268
    fd.scopes = [new JSVarScope(), new JSVarScope(), new JSVarScope(), new JSVarScope()]
    fd.scopeSize = 4
    fd.scopeCount = 1
    fd.scopes[0].first = -1
    fd.scopes[0].parent = -1
    fd.scopeLevel = 0
    fd.scopeFirst = -1
    fd.bodyScope = -1
    
    // 设置当前函数定义
    this.setFuncDef(fd)
    
    // 3. 推入 body scope - 对应 push_scope(s) (parser.c:13659)
    this.compiler.pushScope(fd)
    fd.bodyScope = fd.scopeLevel
    
    // 4. 添加隐藏变量 <ret> 用于返回值 - 对应 parser.c:13499-13502
    // 注意: QuickJS 中 JS_ATOM__ret_ 的实际字符串是 '<ret>' (见 quickjs-atom.h:116)
    const retAtom = this.compiler.addAtom('<ret>')
    const retIdx = this.compiler.addVar(fd, retAtom)
    fd.evalRetIdx = retIdx
    
    // 5. 遍历源文件的每个语句并发射字节码
    for (const statement of sourceFile.statements) {
      this.visitStatement(statement)
    }
    
    // 6. 发射 return 指令 - 对应 parser.c:13504-13533
    // 对于全局 eval，返回 _ret_ 变量的值
    this.compiler.emitOp(fd, Opcode.OP_get_loc)
    this.compiler.emitU16(fd, fd.evalRetIdx)
    this.compiler.emitReturn(fd, true)
    
    // 7. 递归处理所有函数 - 对应 js_create_function (parser.c:12439-12705)
    // QuickJS 的 js_create_function 是递归的，先处理子函数再处理父函数
    this.processFunctionDef(fd)
    
    // 8. 构建最终字节码 - 对应 parser.c:12572-12700
    const builder = new FunctionBuilder()
    const bytecode = builder.build(fd)
    
    // 9. 序列化字节码 - 对应 bytecode.cpp:450-530
    const writer = new BytecodeWriter(this.compiler)
    const result = writer.write(bytecode)
    
    if (process.env.DEBUG_JUMP) {
      console.log(`[TypeScriptCompiler.compile] result.length=${result.length}, result[83]=0x${result[83]?.toString(16) ?? 'undefined'}`)
    }
    
    return result
  }
  
  /**
   * 递归处理函数定义 - 对应 js_create_function
   * 
   * QuickJS 的 js_create_function 递归处理每个函数:
   * 1. 先递归处理所有子函数
   * 2. 然后解析变量 (resolve_variables)
   * 3. 解析标签 (resolve_labels)
   * 4. 计算栈大小 (compute_stack_size)
   */
  private processFunctionDef(fd: FunctionDef): void {
    // 1. 先递归处理所有子函数 (parser.c:12485-12497)
    for (const childFd of fd.childList) {
      this.processFunctionDef(childFd)
    }
    
    // 2. 解析变量 - resolve_variables (parser.c:10456-10800)
    this.variableResolver.resolve(fd)
    
    // 3. 解析标签 - resolve_labels (parser.c:11088-12120)
    const labelResolver = new LabelResolver(this)
    labelResolver.resolve(fd)
    
    // 4. 计算栈大小 - compute_stack_size (parser.c:12191-12380)
    const stackComputer = new StackSizeComputer(this)
    const stackSize = stackComputer.compute(fd)
    if (stackSize < 0) {
      throw new Error('Stack size computation failed for function')
    }
    fd.stackSize = stackSize

    // 5. 计算 pc2line 调试信息 (QuickJS 对齐实现)
    // 对应 parser.c:10862-10912 (compute_pc2line_info)
    if (!fd.getLineColCache && fd.source) {
      DebugInfoBuilder.initLineColCache(fd, fd.source)
    }
    DebugInfoBuilder.computePc2LineInfo(fd)
  }

  /**
   * 访问语句节点
   */
  private visitStatement(node: ts.Statement): void {
    // 发射源码位置信息 (OP_line_num)
    // 这与 QuickJS C 版本一致，在语句开始时记录位置
    if (this.funcDef) {
      // QuickJS 似乎不为 break/continue/var 发射行号
      if (!ts.isBreakStatement(node) && 
          !ts.isContinueStatement(node) && 
          !ts.isVariableStatement(node)) {
        const sourcePos = node.getStart()
        this.compiler.emitSourcePos(this.funcDef, sourcePos)
      }
    }
    
    // 处理表达式语句
    if (ts.isExpressionStatement(node)) {
      // 先执行表达式 (将结果压栈)
      this.visitExpression(node.expression)
      
      // 将结果存储到 _ret_ 变量
      if (this.funcDef && this.funcDef.evalRetIdx >= 0) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc)
        this.compiler.emitU16(this.funcDef, this.funcDef.evalRetIdx)
      } else {
        // 丢弃表达式结果
        if (this.funcDef) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
        }
      }
    } else {
      // 其他语句类型
      this.visit(node)
    }
  }
  
  /**
   * 访问表达式节点
   */
  private visitExpression(node: ts.Expression): void {
    this.visit(node)
  }

  visit(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.SourceFile:
        // TODO
        break
      case ts.SyntaxKind.FunctionDeclaration:
        this.functionVisitor.visitFunctionDeclaration(node as ts.FunctionDeclaration)
        break
      case ts.SyntaxKind.LabeledStatement:
        this.statementVisitor.visitLabeledStatement(node as ts.LabeledStatement)
        break
      case ts.SyntaxKind.Block:
        this.statementVisitor.visitBlock(node as ts.Block)
        break
      case ts.SyntaxKind.IfStatement:
        this.statementVisitor.visitIfStatement(node as ts.IfStatement)
        break
      case ts.SyntaxKind.WhileStatement:
        this.statementVisitor.visitWhileStatement(node as ts.WhileStatement)
        break
      case ts.SyntaxKind.DoStatement:
        this.statementVisitor.visitDoStatement(node as ts.DoStatement)
        break
      case ts.SyntaxKind.ForStatement:
        this.statementVisitor.visitForStatement(node as ts.ForStatement)
        break
      case ts.SyntaxKind.ForOfStatement:
        this.statementVisitor.visitForOfStatement(node as ts.ForOfStatement)
        break
      case ts.SyntaxKind.ForInStatement:
        this.statementVisitor.visitForInStatement(node as ts.ForInStatement)
        break
      case ts.SyntaxKind.SwitchStatement:
        this.statementVisitor.visitSwitchStatement(node as ts.SwitchStatement)
        break
      case ts.SyntaxKind.BreakStatement:
        this.statementVisitor.visitBreakStatement(node as ts.BreakStatement)
        break
      case ts.SyntaxKind.ContinueStatement:
        this.statementVisitor.visitContinueStatement(node as ts.ContinueStatement)
        break
      case ts.SyntaxKind.ReturnStatement:
        this.statementVisitor.visitReturnStatement(node as ts.ReturnStatement)
        break
      case ts.SyntaxKind.ThrowStatement:
        this.statementVisitor.visitThrowStatement(node as ts.ThrowStatement)
        break
      case ts.SyntaxKind.TryStatement:
        this.statementVisitor.visitTryStatement(node as ts.TryStatement)
        break
      case ts.SyntaxKind.VariableStatement:
        this.statementVisitor.visitVariableStatement(node as ts.VariableStatement)
        break
      case ts.SyntaxKind.ClassDeclaration:
        this.classVisitor.visitClassDeclaration(node as ts.ClassDeclaration)
        break
      case ts.SyntaxKind.BinaryExpression:
        this.expressionVisitor.visitBinaryExpression(node as ts.BinaryExpression)
        break
      case ts.SyntaxKind.ArrowFunction:
        this.functionVisitor.visitArrowFunction(node as ts.ArrowFunction)
        break
      case ts.SyntaxKind.FunctionExpression:
        this.functionVisitor.visitFunctionExpression(node as ts.FunctionExpression)
        break
      case ts.SyntaxKind.MethodDeclaration:
        this.functionVisitor.visitMethodDefinition(node as ts.MethodDeclaration)
        break
      case ts.SyntaxKind.Identifier:
        this.identifierVisitor.visitIdentifier(node as ts.Identifier)
        break
      case ts.SyntaxKind.ThisKeyword:
        this.thisVisitor.visitThisKeyword(node as ts.ThisExpression)
        break
      case ts.SyntaxKind.DeleteExpression:
        this.expressionVisitor.visitDeleteExpression(node as ts.DeleteExpression)
        break
      case ts.SyntaxKind.ExpressionStatement:
        this.statementVisitor.visitExpressionStatement(node as ts.ExpressionStatement)
        break
      case ts.SyntaxKind.StringLiteral:
        this.literalVisitor.visitStringLiteral(node as ts.StringLiteral)
        break
      case ts.SyntaxKind.BigIntLiteral:
        this.expressionVisitor.visitBigIntLiteral(node as ts.BigIntLiteral)
        break
      case ts.SyntaxKind.CallExpression:
        this.expressionVisitor.visitCallExpression(node as ts.CallExpression)
        break
      case ts.SyntaxKind.NewExpression:
        this.expressionVisitor.visitNewExpression(node as ts.NewExpression)
        break
      case ts.SyntaxKind.ObjectLiteralExpression:
        this.expressionVisitor.visitObjectLiteralExpression(node as ts.ObjectLiteralExpression)
        break
      case ts.SyntaxKind.ArrayLiteralExpression:
        this.expressionVisitor.visitArrayLiteralExpression(node as ts.ArrayLiteralExpression)
        break
      case ts.SyntaxKind.PropertyAccessExpression:
        this.expressionVisitor.visitPropertyAccessExpression(node as ts.PropertyAccessExpression)
        break
      case ts.SyntaxKind.ElementAccessExpression:
        this.expressionVisitor.visitElementAccessExpression(node as ts.ElementAccessExpression)
        break
      case ts.SyntaxKind.NullKeyword:
        this.literalVisitor.visitNullKeyword(node)
        break
      case ts.SyntaxKind.TrueKeyword:
        this.literalVisitor.visitTrueKeyword(node)
        break
      case ts.SyntaxKind.FalseKeyword:
        this.literalVisitor.visitFalseKeyword(node)
        break
      case ts.SyntaxKind.NumericLiteral:
        this.literalVisitor.visitNumericLiteral(node as ts.NumericLiteral)
        break
      case ts.SyntaxKind.ConditionalExpression:
        this.expressionVisitor.visitConditionalExpression(node as ts.ConditionalExpression)
        break
      case ts.SyntaxKind.PostfixUnaryExpression:
        this.expressionVisitor.visitPostfixUnaryExpression(node as ts.PostfixUnaryExpression)
        break
      case ts.SyntaxKind.PrefixUnaryExpression:
        this.expressionVisitor.visitPrefixUnaryExpression(node as ts.PrefixUnaryExpression)
        break
      case ts.SyntaxKind.TypeOfExpression:
        this.expressionVisitor.visitTypeOfExpression(node as ts.TypeOfExpression)
        break
      case ts.SyntaxKind.VoidExpression:
        this.expressionVisitor.visitVoidExpression(node as ts.VoidExpression)
        break
      case ts.SyntaxKind.AwaitExpression:
        this.expressionVisitor.visitAwaitExpression(node as ts.AwaitExpression)
        break
      case ts.SyntaxKind.YieldExpression:
        this.expressionVisitor.visitYieldExpression(node as ts.YieldExpression)
        break
      default:
        // console.warn('Unhandled node kind:', node.kind)
        break
    }
  }
}
