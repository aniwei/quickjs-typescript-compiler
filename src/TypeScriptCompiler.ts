import ts from 'typescript'
import { Compiler, Label } from './compiler/Compiler'
import { FunctionDef, JSVarKind, JSVarDef, JSClosureVar } from './compiler/FunctionDef'
import { JSAtom, JSMode, Opcode, FunctionKind } from './env'
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
import { HoistVariables } from './compiler/HoistVariables'

export class TypeScriptCompiler implements CompilerContext {
  public compiler: Compiler
  public scopeManager: ScopeManager
  public labelManager: LabelManager
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
  private variableHoister: HoistVariables

  constructor(options?: any) {
    // console.log('TypeScriptCompiler constructor called')
    this.compiler = new Compiler(options)
    this.scopeManager = new ScopeManager(this.compiler)
    this.labelManager = new LabelManager(this.compiler)
    this.statementVisitor = new StatementVisitor(this)
    this.expressionVisitor = new ExpressionVisitor(this)
    this.functionVisitor = new FunctionVisitor(this)
    this.classVisitor = new ClassVisitor(this)
    this.literalVisitor = new LiteralVisitor(this)
    this.identifierVisitor = new IdentifierVisitor(this)
    this.thisVisitor = new ThisVisitor(this)
    this.variableHoister = new HoistVariables(this)
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
    // console.log('Compiling:', filename)
    this.scopeManager.reset()
    this.labelManager.reset()
    this.nodeScopeMap = new Map()
    this.deferredTasks = []

    const sourceFile = ts.createSourceFile(
      filename,
      source,
      ts.ScriptTarget.ES2020,
      true
    )
    this.compiler.setSourceFile(sourceFile)

    // Create顶层函数定义（模块）
    const fd = new FunctionDef()
    fd.scopeLevel = 0
    fd.jsMode = JSMode.JS_MODE_STRICT
    fd.funcName = JSAtom.JS_ATOM__eval_
    // QuickJS marks module init functions as async regardless of TLA so func_kind bits match
    fd.funcKind = FunctionKind.JS_FUNC_ASYNC
    fd.isGlobalVar = true
    
    const filenameAtom = this.compiler.addAtom(filename)
    fd.filename = filenameAtom
    fd.hasDebug = true
    fd.argumentsAllowed = true
    fd.sourcePos = 0 // Start of file
    fd.lineNumberLast = fd.sourcePos
    fd.lineNumberLastPc = 0

     this.funcDef = fd

     // 进入模块函数作用域（对应 QuickJS 顶层）
     this.scopeManager.enter('function', this.funcDef)
    
    // Hoist variables to ensure atom order matches QuickJS
    this.variableHoister.hoistVariables(sourceFile)

    // 模块前置：push_this / if_false 与 QuickJS 对齐
    this.compiler.emitOp(fd, Opcode.OP_push_this)
    const moduleBodyLabel = this.compiler.newLabel(fd)
    this.compiler.emitJump(fd, Opcode.OP_if_false, moduleBodyLabel)

    // 第一遍：先处理函数声明（确保 func_pool/atom 顺序与 QuickJS 对齐）
    for (const stmt of sourceFile.statements) {
      if (ts.isFunctionDeclaration(stmt)) {
        this.visit(stmt)
      }
    }

    // 第二遍：其他语句
    for (const stmt of sourceFile.statements) {
      if (!ts.isFunctionDeclaration(stmt)) {
        this.visit(stmt)
      }
    }

    // Execute deferred tasks (e.g. compiling method bodies)
    for (const task of this.deferredTasks) {
      task()
    }
    
    // Update stack size for module
    fd.stackSize = fd.stackSizeMax
    
    // 主路径结束
    this.compiler.emitOp(fd, Opcode.OP_return_undef)

    // 早退路径（push_this 为假）：与 QuickJS 相同
    this.compiler.markLabel(fd, moduleBodyLabel)
    this.compiler.emitOp(fd, Opcode.OP_undefined)
    this.compiler.emitOp(fd, Opcode.OP_return_async)

    this.compiler.computePc2LineInfo(fd)

    this.scopeManager.exit() // Exit function scope
    return this.compiler.writeModule(fd, filenameAtom)
  }



  hasSideEffects(node: ts.Node): boolean {
    if (ts.isNumericLiteral(node) || ts.isStringLiteral(node) || node.kind === ts.SyntaxKind.NullKeyword || node.kind === ts.SyntaxKind.TrueKeyword || node.kind === ts.SyntaxKind.FalseKeyword) {
      return false
    }

    return true
  }

  visit(node: ts.Node) {
    // console.log('VISIT:', node.kind)
    // if (node.kind === 11) console.log('visit called with StringLiteral')
    switch (node.kind) {
      case ts.SyntaxKind.SourceFile:
        this.visitSourceFile(node as ts.SourceFile)
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
        const expr = (node as ts.ExpressionStatement).expression
        if (this.hasSideEffects(expr)) {
          this.compiler.pendingSourcePos = node.getStart()
          this.visit(expr)
          
          if (this.funcDef) {
            // Check if last op was tail_call
            let lastOp = 0
            if (this.funcDef.byteCode.size > 0) {
              if (this.funcDef.lastOpcodePos !== -1 && this.funcDef.lastOpcodePos < this.funcDef.byteCode.size) {
                lastOp = this.funcDef.byteCode.buffer[this.funcDef.lastOpcodePos]
              } else {
                lastOp = this.funcDef.byteCode.buffer[this.funcDef.byteCode.size - 1]
              }
            }
            
            let shouldDrop = true

            if (shouldDrop && lastOp !== Opcode.OP_tail_call) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
            }
          }
        }
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
      default:
        // console.warn('Unhandled node kind:', node.kind)
        break
    }
  }

  visitCallExpression(node: ts.CallExpression, isTailCall?: boolean, position?: number) {
    this.expressionVisitor.visitCallExpression(node, isTailCall, position)
  }

  visitSourceFile(node: ts.SourceFile) {
    // Hoist variables (var/let/const) for top-level eval
    for (const stmt of node.statements) {
      if (ts.isVariableStatement(stmt)) {
        const isLet = (stmt.declarationList.flags & ts.NodeFlags.Let) !== 0
        const isConst = (stmt.declarationList.flags & ts.NodeFlags.Const) !== 0
        // Treat var as local in eval too
        
        for (const decl of stmt.declarationList.declarations) {
          if (ts.isIdentifier(decl.name)) {
            const name = decl.name.text
            const currentScope = this.scopeManager.currentScope
            if (!currentScope.vars.has(name)) {
              // Add as local var
              const scopeLevel = this.scopeManager.stackDepth - this.funcDef!.scopeLevel - 1
              const varIdx = this.compiler.addVar(this.funcDef!, name, isConst, true, scopeLevel)
              currentScope.vars.set(name, {
                type: 'local',
                idx: varIdx,
                isLexical: true,
                isConst
              })
              
              // Emit set_loc_uninitialized for let/const
              if (isLet || isConst) {
                this.compiler.emitOp(this.funcDef!, Opcode.OP_set_loc_uninitialized)
                this.compiler.emitU8(this.funcDef!, varIdx)
              }
            }
          }
        }
      }
    }

    ts.forEachChild(node, n => this.visit(n))
  }






}
