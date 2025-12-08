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

export class TypeScriptCompiler implements CompilerContext {
  public compiler: Compiler
  public scopeManager: ScopeManager
  public labelManager: LabelManager
  public funcDef: FunctionDef | null = null
  public currentNode: ts.Node | null = null
  public moduleVarIdx = 0
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
    this.moduleVarIdx = 0
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

    // Create top-level function definition (module)
    const fd = new FunctionDef()
    // fd.scopeLevel = this.scopeManager.tack.length
    fd.scopeLevel = 0 // Module function seems to be level 0 in QuickJS WASM
    fd.jsMode = JSMode.JS_MODE_STRICT
    fd.funcName = JSAtom.JS_ATOM__eval_
    fd.funcKind = FunctionKind.JS_FUNC_ASYNC // Module is async
    
    const filenameAtom = this.compiler.addAtom(filename)
    fd.filename = filenameAtom
    fd.hasDebug = true
    fd.argumentsAllowed = true
    fd.sourcePos = 0 // Start of file

    this.funcDef = fd
    // QuickJS WASM seems to use Scope 2 for top-level module variables.
    // Scope 0 is arguments. Scope 1 is ??? (maybe var scope separate from lexical scope?)
    // So we skip Scope 1.
    if (fd.scopeCount === 1) {
       fd.scopeCount = 2
    }
    
    console.log(`compile: before enter scopeCount=${fd.scopeCount}`)
    this.scopeManager.enter('function', this.funcDef) // Push function scope for module body

    // Module prologue
    this.compiler.emitOp(fd, Opcode.OP_push_this)
    this.compiler.emitOp(fd, Opcode.OP_if_false8)
    const jumpPos = fd.byteCode.size
    this.compiler.emitU8(fd, 0)
    
    // Hoist variables to ensure atom order matches QuickJS
    this.hoistVariables(sourceFile)

    let lastStmtEnd = sourceFile.end
    if (sourceFile.statements.length > 0) {
      lastStmtEnd = sourceFile.statements[sourceFile.statements.length - 1].getEnd()
    }

    // Script Path: Visit Function Declarations
    for (const stmt of sourceFile.statements) {
      if (ts.isFunctionDeclaration(stmt)) {
        this.visit(stmt)
      }
    }

    this.compiler.emitOp(fd, Opcode.OP_return_undef)

    // Module Path: Visit other statements
    const moduleStartPos = fd.byteCode.size
    let hasStatements = false

    for (const stmt of sourceFile.statements) {
      if (!ts.isFunctionDeclaration(stmt)) {
        this.visit(stmt)
        hasStatements = true
      }
    }

    // Execute deferred tasks (e.g. compiling method bodies)
    for (const task of this.deferredTasks) {
      task()
    }
    
    // Update stack size for module
    fd.stackSize = fd.stackSizeMax
    
    // Module epilogue
    const epiloguePos = fd.byteCode.size
    this.compiler.emitOp(fd, Opcode.OP_undefined)
    const returnAsyncPos = fd.byteCode.size
    this.compiler.emitOp(fd, Opcode.OP_return_async)

    // Patch jump
    // if_false8 jumps if false (eval mode). We want to jump to the start of the module body.
    // If true (init mode), we fall through to return_undef (after init code).
    let targetPos = moduleStartPos
    
    const offset = targetPos - jumpPos
    if (offset > 127 || offset < -128) {
      throw new Error('Jump offset too large')
    }

    fd.byteCode.buffer[jumpPos] = offset
    this.compiler.computePc2LineInfo(fd)

    this.scopeManager.exit() // Exit function scope
    return this.compiler.writeModule(fd, filenameAtom)
  }

  hoistVariables(node: ts.Node) {
    const isModule = this.funcDef?.funcKind === FunctionKind.JS_FUNC_ASYNC
    const isScriptRoot = !this.funcDef?.parent && !isModule
    const treatAsContextVar = isModule || isScriptRoot
    // console.log(`hoistVariables: isModule=${isModule} scopeStack=${this.scopeManager.tack.length} funcLevel=${this.funcDef?.scopeLevel}`)

    ts.forEachChild(node, n => {
      if (ts.isFunctionDeclaration(n)) {
        if (n.name) {
          const name = n.name.text
          
          let targetScope = this.scopeManager.currentScope
          let targetScopeLevel = this.scopeManager.stackDepth - this.funcDef!.scopeLevel - 1
          
          if (!treatAsContextVar) {
            // Find function scope
            for (let i = this.scopeManager.stackDepth - 1; i >= 0; i--) {
              const scope = this.scopeManager.getScope(i)
              if (scope.type === 'function' || scope.type === 'module') {
                targetScope = scope
                targetScopeLevel = i - this.funcDef!.scopeLevel
                break
              }
            }
          }

          if (!targetScope.vars.has(name)) {
            let varIdx: number
            if (treatAsContextVar) {
              // For module/script variables, add as captured var (no stack slot)
              varIdx = this.compiler.addVar(this.funcDef!, name, false, false, targetScopeLevel, JSVarKind.JS_VAR_NORMAL, true, true)
            } else {
              varIdx = this.compiler.addVar(this.funcDef!, name, false, false, targetScopeLevel)
            }
            
            if (treatAsContextVar) {
              const nameAtom = this.compiler.addAtom(name)
              const closureIdx = this.compiler.addClosureVarWithAtom(this.funcDef!, nameAtom, true, false, varIdx, JSVarKind.JS_VAR_NORMAL, false, false)
              targetScope.vars.set(name, {
                type: 'closure',
                idx: closureIdx,
                localIdx: varIdx,
                isLexical: false,
                isConst: false
              })
            } else {
              targetScope.vars.set(name, {
                type: 'local',
                idx: varIdx,
                localIdx: varIdx,
                isLexical: false,
                isConst: false
              })
            }
          }
        }
      } else if (ts.isVariableStatement(n)) {
        const isLet = (n.declarationList.flags & ts.NodeFlags.Let) !== 0
        const isConst = (n.declarationList.flags & ts.NodeFlags.Const) !== 0
          
        // Hoist all variables (var/let/const) in top-level to ensure atom order
        for (const decl of n.declarationList.declarations) {
          if (ts.isIdentifier(decl.name)) {
            const name = decl.name.text
            
            let targetScope = this.scopeManager.currentScope
            let targetScopeLevel = this.scopeManager.stackDepth - this.funcDef!.scopeLevel - 1
            
            // console.log(`hoistVariables var: ${name} isLet=${isLet} level=${targetScopeLevel}`)

            if (!isLet && !isConst && !treatAsContextVar) {
               // var: hoist to function scope
               for (let i = this.scopeManager.stackDepth - 1; i >= 0; i--) {
                  const scope = this.scopeManager.getScope(i)
                  if (scope.type === 'function' || scope.type === 'module') {
                    targetScope = scope
                    targetScopeLevel = i - this.funcDef!.scopeLevel
                    break
                  }
               }
            }

            if (!targetScope.vars.has(name)) {
              let varIdx: number
              if (treatAsContextVar) {
                // For module/script variables (var/let/const/function), add as captured var (no stack slot)
                varIdx = this.compiler.addVar(this.funcDef!, name, isConst, isLet || isConst, targetScopeLevel, JSVarKind.JS_VAR_NORMAL, true, true)
              } else {
                varIdx = this.compiler.addVar(this.funcDef!, name, isConst, isLet || isConst, targetScopeLevel)
              }
              
              if (treatAsContextVar) {
                const nameAtom = this.compiler.addAtom(name)
                const closureIdx = this.compiler.addClosureVarWithAtom(this.funcDef!, nameAtom, true, false, varIdx, JSVarKind.JS_VAR_NORMAL, isConst, isLet || isConst)
                targetScope.vars.set(name, {
                  type: 'closure',
                  idx: closureIdx,
                  localIdx: varIdx,
                  isLexical: isLet || isConst,
                  isConst: isConst
                })
              } else {
                targetScope.vars.set(name, {
                  type: 'local',
                  idx: varIdx,
                  localIdx: varIdx,
                  isLexical: isLet || isConst,
                  isConst: isConst
                })
              }
              
              // Emit set_loc_uninitialized for let/const
              // QuickJS WASM does not emit this for top-level eval variables?
              // if (isLet || isConst) {
              //    this.compiler.emitOp(this.funcDef!, Opcode.OP_set_loc_uninitialized)
              //    this.compiler.emitU16(this.funcDef!, varIdx)
              // }
            }
          }
        }
      } else if (ts.isClassDeclaration(n)) {
        if (n.name) {
          const name = n.name.text
          console.log(`hoistVariables class: ${name} isModule=${isModule}`)
          
          const currentScope = this.scopeManager.currentScope

          if (!currentScope.vars.has(name)) {
            const isConst = true
            const isLexical = true
            const scopeLevel = currentScope.scopeIndex
            console.log(`hoistVariables: adding ${name} to scopeLevel=${scopeLevel}`)
            
            let varIdx: number
            if (isModule && false) { // Class is const, so always add
              varIdx = -1
            } else {
              // Class name is a normal const variable in the block scope
              varIdx = this.compiler.addVar(this.funcDef!, name, isConst, isLexical, scopeLevel, JSVarKind.JS_VAR_NORMAL)
            }
             
            if (isModule) {
              console.log(`Adding closure var for class ${name} (module)`)
              const nameAtom = this.compiler.addAtom(name)
              // QuickJS seems to mark class name closure var as not const (mutable binding?)
              const closureIdx = this.compiler.addClosureVarWithAtom(this.funcDef!, nameAtom, true, false, varIdx, JSVarKind.JS_VAR_NORMAL, false, isLexical)
              currentScope.vars.set(name, {
                type: 'closure',
                idx: closureIdx,
                localIdx: varIdx,
                isLexical: isLexical,
                isConst: isConst
              })
            } else {
              currentScope.vars.set(name, {
                type: 'local',
                idx: varIdx,
                localIdx: varIdx,
                isLexical: isLexical,
                isConst: isConst
              })
            }
          }

          const parentScopeIdx = currentScope.scopeIndex
          console.log(`hoistVariables: parentScopeIdx=${parentScopeIdx} first=${this.funcDef!.scopes[parentScopeIdx]?.first}`)

          // Allocate scopes
          // QuickJS WASM only allocates one extra scope for class body?
          // const nameScopeIndex = this.funcDef!.scopeCount++
          const nameScopeIndex = -1
          
          const bodyScopeIndex = this.funcDef!.scopeCount++
          // Link bodyScope to parentScope
          // Always initialize because scopes are pre-allocated in constructor
          const parentFirst = this.funcDef!.scopes[parentScopeIdx] ? this.funcDef!.scopes[parentScopeIdx].first : -1
          this.funcDef!.scopes[bodyScopeIndex] = { first: parentFirst, parent: parentScopeIdx }

          this.nodeScopeMap.set(n, [nameScopeIndex, bodyScopeIndex])

          // 1. Add Inner Variable (Animal) to Name Scope
          // QuickJS WASM seems to skip adding inner variable for class declarations?
          // It uses the outer variable instead.
          // const innerVarIdx = this.compiler.addVar(this.funcDef!, name, true, true, nameScopeIndex, JSVarKind.JS_VAR_NORMAL)
          const innerVarIdx = -1
          
          // if (nameScopeIndex !== -1 && !this.scopeManager.ars.has(nameScopeIndex)) {
          //   this.scopeManager.ars.set(nameScopeIndex, [])
          // }
          /*
          this.scopeManager.ars.get(nameScopeIndex)!.push({
            name: name,
            info: {
                type: 'local',
                idx: innerVarIdx,
                localIdx: innerVarIdx,
                isLexical: true,
                isConst: true
            }
          })
          */

          // 2. Add <class_fields_init> to Body Scope
          const fieldsInitName = '<class_fields_init>'
          const fieldsInitIdx = this.compiler.addVar(this.funcDef!, fieldsInitName, true, true, bodyScopeIndex, JSVarKind.JS_VAR_NORMAL)
          
          this.scopeManager.addPreHoistedVar(bodyScopeIndex, fieldsInitName, {
            type: 'local',
            idx: fieldsInitIdx,
            localIdx: fieldsInitIdx,
            isLexical: true,
            isConst: true
          })
          console.log('DEBUG: End of ClassDeclaration handling in hoistVariables')
        }
      }
    })
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
