import ts from 'typescript'
import { Compiler, Label } from './compiler/Compiler'
import { FunctionDef, JSVarKind } from './compiler/FunctionDef'
import { JSAtom, JSMode, Opcode, FunctionKind } from './env'

interface VarInfo {
  type: 'closure' | 'local'
  idx: number
  localIdx?: number
  isLexical: boolean
  isConst: boolean
}

interface Scope {
  type: 'module' | 'block' | 'function'
  vars: Map<string, VarInfo>
  parent: Scope | null
  funcDef?: FunctionDef
}

interface LoopInfo {
  type: 'loop' | 'switch' | 'block'
  labels: string[]
  breakLabel: Label
  continueLabel?: Label
}

export class TypeScriptCompiler {
  private compiler: Compiler
  private funcDef: FunctionDef | null = null
  private currentNode: ts.Node | null = null
  private moduleVarIdx = 0
  private scopeStack: Scope[] = []
  private loopStack: LoopInfo[] = []
  private pendingLabels: string[] = []
  private isTerminated = false

  constructor(options?: any) {
    console.log('TypeScriptCompiler constructor called')
    this.compiler = new Compiler(options)
    // this.compiler.addAtom('undefined')
  }

  async compileFileWithArtifacts(filename: string): Promise<{ bytecode: Uint8Array, functionDef: FunctionDef }> {
    const fs = await import('fs/promises')
    const source = await fs.readFile(filename, 'utf-8')
    const bytecode = this.compile(source, filename)
    return { bytecode, functionDef: this.funcDef! }
  }

  compile(source: string, filename: string = 'input.ts'): Uint8Array {
    console.log('Compiling:', filename)
    this.moduleVarIdx = 0
    this.scopeStack = []
    this.loopStack = []
    
    // Initialize module scope
    this.scopeStack.push({
      type: 'module',
      vars: new Map(),
      parent: null
    })

    const sourceFile = ts.createSourceFile(
      filename,
      source,
      ts.ScriptTarget.ES2020,
      true
    )
    this.compiler.setSourceFile(sourceFile)

    // Create top-level function definition (module)
    const fd = new FunctionDef()
    fd.jsMode = JSMode.JS_MODE_STRICT
    fd.funcName = JSAtom.JS_ATOM__eval_
    fd.funcKind = FunctionKind.JS_FUNC_ASYNC // Module is async
    
    const filenameAtom = this.compiler.addAtom(filename)
    fd.filename = filenameAtom
    fd.hasDebug = true
    fd.argumentsAllowed = true
    fd.sourcePos = 0 // Start of file

    this.funcDef = fd

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

    return this.compiler.writeModule(fd, filenameAtom)
  }

  hoistVariables(node: ts.Node) {
    const isModule = this.funcDef?.funcKind === FunctionKind.JS_FUNC_ASYNC
    console.log(`hoistVariables: isModule=${isModule}`)

    ts.forEachChild(node, n => {
      if (ts.isFunctionDeclaration(n)) {
        if (n.name) {
          const name = n.name.text
          const currentScope = this.scopeStack[this.scopeStack.length - 1]
          if (!currentScope.vars.has(name)) {
            const scopeLevel = this.scopeStack.length
            
            let varIdx: number
            if (isModule) {
              // For module variables, do NOT add to vars
              varIdx = -1
            } else {
              varIdx = this.compiler.addVar(this.funcDef!, name, false, false, scopeLevel)
            }
            
            if (isModule) {
              const nameAtom = this.compiler.addAtom(name)
              const closureIdx = this.compiler.addClosureVarWithAtom(this.funcDef!, nameAtom, true, false, this.funcDef!.closureVar.length, JSVarKind.JS_VAR_NORMAL, false, false)
              currentScope.vars.set(name, {
                type: 'closure',
                idx: closureIdx,
                localIdx: varIdx,
                isLexical: false,
                isConst: false
              })
            } else {
              currentScope.vars.set(name, {
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
            const currentScope = this.scopeStack[this.scopeStack.length - 1]
            if (!currentScope.vars.has(name)) {
              const scopeLevel = this.scopeStack.length
              
              let varIdx: number
              if (isModule) {
                // For module variables, do NOT add to vars
                varIdx = -1
              } else {
                varIdx = this.compiler.addVar(this.funcDef!, name, isConst, isLet || isConst, scopeLevel)
              }
              
              if (isModule) {
                const nameAtom = this.compiler.addAtom(name)
                const closureIdx = this.compiler.addClosureVarWithAtom(this.funcDef!, nameAtom, true, false, this.funcDef!.closureVar.length, JSVarKind.JS_VAR_NORMAL, isConst, isLet || isConst)
                currentScope.vars.set(name, {
                  type: 'closure',
                  idx: closureIdx,
                  localIdx: varIdx,
                  isLexical: isLet || isConst,
                  isConst: isConst
                })
              } else {
                currentScope.vars.set(name, {
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
              //    this.compiler.emitU8(this.funcDef!, varIdx)
              // }
            }
          }
        }
      } else if (ts.isClassDeclaration(n)) {
        if (n.name) {
          const name = n.name.text
          const currentScope = this.scopeStack[this.scopeStack.length - 1]
          if (!currentScope.vars.has(name)) {
            const isConst = true
            const isLexical = true
            const scopeLevel = this.scopeStack.length
            
            let varIdx: number
            if (isModule) {
              varIdx = -1
            } else {
              varIdx = this.compiler.addVar(this.funcDef!, name, isConst, isLexical, scopeLevel)
            }
             
            if (isModule) {
              const nameAtom = this.compiler.addAtom(name)
              const closureIdx = this.compiler.addClosureVarWithAtom(this.funcDef!, nameAtom, true, false, this.funcDef!.closureVar.length, JSVarKind.JS_VAR_NORMAL, isConst, isLexical)
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
             
            // Add <class_fields_init> variable
            const fieldsInitName = '<class_fields_init>'
            if (!currentScope.vars.has(fieldsInitName)) {
              const fieldsInitVarIdx = this.compiler.addVar(this.funcDef!, fieldsInitName, true, true, scopeLevel)
              if (isModule) {
                // Note: QuickJS seems to treat this as a const variable
                const fieldsInitClosureIdx = this.compiler.addClosureVar(this.funcDef!, fieldsInitName, true, false, fieldsInitVarIdx, JSVarKind.JS_VAR_NORMAL, true, true)
                currentScope.vars.set(fieldsInitName, {
                  type: 'closure',
                  idx: fieldsInitClosureIdx,
                  localIdx: fieldsInitVarIdx,
                  isLexical: true,
                  isConst: true
                })
              } else {
                currentScope.vars.set(fieldsInitName, {
                  type: 'local',
                  idx: fieldsInitVarIdx,
                  localIdx: fieldsInitVarIdx,
                  isLexical: true,
                  isConst: true
                })
              }
            }
          }
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
    console.log('VISIT:', node.kind)
    if (node.kind === 11) console.log('visit called with StringLiteral')
    switch (node.kind) {
      case ts.SyntaxKind.SourceFile:
        this.visitSourceFile(node as ts.SourceFile)
        break
      case ts.SyntaxKind.FunctionDeclaration:
        this.visitFunctionDeclaration(node as ts.FunctionDeclaration)
        break
      case ts.SyntaxKind.LabeledStatement:
        this.visitLabeledStatement(node as ts.LabeledStatement)
        break
      case ts.SyntaxKind.Block:
        this.visitBlock(node as ts.Block)
        break
      case ts.SyntaxKind.IfStatement:
        this.visitIfStatement(node as ts.IfStatement)
        break
      case ts.SyntaxKind.WhileStatement:
        this.visitWhileStatement(node as ts.WhileStatement)
        break
      case ts.SyntaxKind.DoStatement:
        this.visitDoStatement(node as ts.DoStatement)
        break
      case ts.SyntaxKind.ForStatement:
        this.visitForStatement(node as ts.ForStatement)
        break
      case ts.SyntaxKind.ForOfStatement:
        this.visitForOfStatement(node as ts.ForOfStatement)
        break
      case ts.SyntaxKind.ForInStatement:
        this.visitForInStatement(node as ts.ForInStatement)
        break
      case ts.SyntaxKind.SwitchStatement:
        this.visitSwitchStatement(node as ts.SwitchStatement)
        break
      case ts.SyntaxKind.BreakStatement:
        this.visitBreakStatement(node as ts.BreakStatement)
        break
      case ts.SyntaxKind.ContinueStatement:
        this.visitContinueStatement(node as ts.ContinueStatement)
        break
      case ts.SyntaxKind.ReturnStatement:
        this.visitReturnStatement(node as ts.ReturnStatement)
        break
      case ts.SyntaxKind.ThrowStatement:
        this.visitThrowStatement(node as ts.ThrowStatement)
        break
      case ts.SyntaxKind.TryStatement:
        this.visitTryStatement(node as ts.TryStatement)
        break
      case ts.SyntaxKind.VariableStatement:
        this.visitVariableStatement(node as ts.VariableStatement)
        break
      case ts.SyntaxKind.ClassDeclaration:
        this.visitClassDeclaration(node as ts.ClassDeclaration)
        break
      case ts.SyntaxKind.BinaryExpression:
        this.visitBinaryExpression(node as ts.BinaryExpression)
        break
      case ts.SyntaxKind.ArrowFunction:
        this.visitArrowFunction(node as ts.ArrowFunction)
        break
      case ts.SyntaxKind.Identifier:
        this.visitIdentifier(node as ts.Identifier)
        break
      case ts.SyntaxKind.ThisKeyword:
        this.visitThisKeyword(node as ts.ThisExpression)
        break
      case ts.SyntaxKind.ThisKeyword:
        this.visitThisKeyword(node as ts.ThisExpression)
        break
      case ts.SyntaxKind.DeleteExpression:
        this.visitDeleteExpression(node as ts.DeleteExpression)
        break
      case ts.SyntaxKind.ExpressionStatement:
        const expr = (node as ts.ExpressionStatement).expression
        if (this.hasSideEffects(expr)) {
          this.compiler.pendingSourcePos = node.getStart()
          this.visit(expr)
          
          if (this.funcDef) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
          }
        }
        break
      case ts.SyntaxKind.StringLiteral:
        this.visitStringLiteral(node as ts.StringLiteral)
        break
      case ts.SyntaxKind.CallExpression:
        this.visitCallExpression(node as ts.CallExpression)
        break
      case ts.SyntaxKind.ObjectLiteralExpression:
        this.visitObjectLiteralExpression(node as ts.ObjectLiteralExpression)
        break
      case ts.SyntaxKind.ArrayLiteralExpression:
        this.visitArrayLiteralExpression(node as ts.ArrayLiteralExpression)
        break
      case ts.SyntaxKind.PropertyAccessExpression:
        this.visitPropertyAccessExpression(node as ts.PropertyAccessExpression)
        break
      case ts.SyntaxKind.ElementAccessExpression:
        this.visitElementAccessExpression(node as ts.ElementAccessExpression)
        break
      case ts.SyntaxKind.NullKeyword:
        this.visitNullKeyword(node)
        break
      case ts.SyntaxKind.TrueKeyword:
        this.visitTrueKeyword(node)
        break
      case ts.SyntaxKind.FalseKeyword:
        this.visitFalseKeyword(node)
        break
      case ts.SyntaxKind.NumericLiteral:
        this.visitNumericLiteral(node as ts.NumericLiteral)
        break
      case ts.SyntaxKind.ConditionalExpression:
        this.visitConditionalExpression(node as ts.ConditionalExpression)
        break
      case ts.SyntaxKind.PostfixUnaryExpression:
        this.visitPostfixUnaryExpression(node as ts.PostfixUnaryExpression)
        break
      case ts.SyntaxKind.PrefixUnaryExpression:
        this.visitPrefixUnaryExpression(node as ts.PrefixUnaryExpression)
        break
      case ts.SyntaxKind.TypeOfExpression:
        this.visitTypeOfExpression(node as ts.TypeOfExpression)
        break
      case ts.SyntaxKind.VoidExpression:
        this.visitVoidExpression(node as ts.VoidExpression)
        break
      default:
        // console.warn('Unhandled node kind:', node.kind)
        break
    }
  }

  visitStringLiteral(node: ts.StringLiteral) {
    console.log('Visiting StringLiteral:', node.text)
    if (!this.funcDef) {
      console.log('funcDef is null!')
      return
    }
    const atom = this.compiler.addAtom(node.text)
    this.compiler.emitAtomOp(this.funcDef, Opcode.OP_push_atom_value, atom)
  }

  visitCallExpression(node: ts.CallExpression) {
    const prevNode = this.currentNode
    this.currentNode = node
    if (!this.funcDef) {
      this.currentNode = prevNode
      return
    }
    
    // Handle super() call
    if (node.expression.kind === ts.SyntaxKind.SuperKeyword) {
      // ... (rest of super handling)
      // I need to be careful not to break the logic
      // But wait, I can't wrap the whole function easily with replace_string.
      // I'll just add the save/restore at start/end.

      // 1. Push this.active_func (var 0)
      this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc0)
      this.compiler.emitOp(this.funcDef, Opcode.OP_get_super)
      
      // 2. Push new.target (var 1)
      this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc1)
      
      // 3. Visit arguments
      for (const arg of node.arguments) {
        this.visit(arg)
      }
      
      // 4. Emit call_constructor
      this.compiler.emitOp(this.funcDef, Opcode.OP_call_constructor)
      this.compiler.emitU16(this.funcDef, node.arguments.length)
      
      // 5. Store result to 'this' (var 2)
      this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
      this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc_check_init)
      this.compiler.emitU16(this.funcDef, 2) // this
      
      // 6. Initialize fields
      const fieldsInitNameCtor = '<class_fields_init>'
      const fieldsInitAtom = this.compiler.addAtom(fieldsInitNameCtor)
      const closureIdx = this.funcDef.closureVar.findIndex(cv => cv.varName === fieldsInitAtom)
        
      if (closureIdx !== -1) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref_check)
        this.compiler.emitU16(this.funcDef, closureIdx)
        
        this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
        this.compiler.emitOp(this.funcDef, Opcode.OP_if_false8)
        const jumpPos = this.funcDef.byteCode.size
        this.compiler.emitU8(this.funcDef, 0)
        
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc_check) // get 'this' (checked)
        this.compiler.emitU16(this.funcDef, 2) // var 2
        
        this.compiler.emitOp(this.funcDef, Opcode.OP_swap)
        this.compiler.emitOp(this.funcDef, Opcode.OP_call_method)
        this.compiler.emitU16(this.funcDef, 0)
        
        this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
        
        const endPos = this.funcDef.byteCode.size
        const offset = endPos - jumpPos
        this.funcDef.byteCode.buffer[jumpPos] = offset
        
        this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
      }
        
      return
    }

    let isMethodCall = false
    const argCount = node.arguments.length

    if (ts.isPropertyAccessExpression(node.expression)) {
      // Method call: obj.method(...)
      if (node.expression.expression.kind === ts.SyntaxKind.SuperKeyword) {
          // super.method(...)
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc0) // this
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc1) // <home_object>
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_super)
        
        const propName = node.expression.name.text
        this.compiler.emitAtomOp(this.funcDef, Opcode.OP_push_atom_value, this.compiler.addAtom(propName))
        
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_array_el)
        
        for (const arg of node.arguments) {
          this.visit(arg)
        }
        
        this.compiler.emitOp(this.funcDef, Opcode.OP_call_method)
        this.compiler.emitU16(this.funcDef, argCount)
        this.compiler.adjustStack(this.funcDef, -(argCount + 1)) // TODO: Verify stack adjustment
        
        return
      }

      // 1. Visit object
      this.visit(node.expression.expression)
      
      // 2. Emit get_field2 (pushes this + func)
      const propName = node.expression.name.text
      const atom = this.compiler.addAtom(propName)
      // Use end of object expression (position of dot)
      this.compiler.emitAtomOp(this.funcDef, Opcode.OP_get_field2, atom, node.expression.expression.getEnd())
      
      isMethodCall = true
    } else {
      // Regular call: func(...)
      this.visit(node.expression)
    }

    // 3. Visit arguments
    for (const arg of node.arguments) {
      this.visit(arg)
    }

    // 4. Emit call
    if (isMethodCall) {
      // Use end of property access (position of open parenthesis)
      this.compiler.emitOp(this.funcDef, Opcode.OP_call_method, node.expression.getEnd())
      this.compiler.emitU16(this.funcDef, argCount)
      this.compiler.adjustStack(this.funcDef, -argCount)
    } else {
      if (argCount === 0) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_call0, node.expression.getEnd())
      } else if (argCount === 1) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_call1, node.expression.getEnd())
        this.compiler.adjustStack(this.funcDef, -1)
      } else if (argCount === 2) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_call2, node.expression.getEnd())
        this.compiler.adjustStack(this.funcDef, -2)
      } else if (argCount === 3) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_call3, node.expression.getEnd())
        this.compiler.adjustStack(this.funcDef, -3)
      } else {
        this.compiler.emitOp(this.funcDef, Opcode.OP_call, node.expression.getEnd())
        this.compiler.emitU16(this.funcDef, argCount)
        this.compiler.adjustStack(this.funcDef, -(argCount + 1))
      }
    }
  }

  visitPropertyAccessExpression(node: ts.PropertyAccessExpression) {
    if (!this.funcDef) {
      return
    }
    
    this.visit(node.expression)
    const propName = node.name.text
    const atom = this.compiler.addAtom(propName)
    this.compiler.emitAtomOp(this.funcDef, Opcode.OP_get_field, atom, node.expression.getEnd())
  }

  visitNullKeyword(node: ts.Node) {
    if (!this.funcDef) {
      return
    }
    this.compiler.emitOp(this.funcDef, Opcode.OP_null)
  }

  visitTrueKeyword(node: ts.Node) {
    if (!this.funcDef) {
      return
    }
    this.compiler.emitOp(this.funcDef, Opcode.OP_push_true)
  }

  visitFalseKeyword(node: ts.Node) {
    if (!this.funcDef) {
      return
    }
    this.compiler.emitOp(this.funcDef, Opcode.OP_push_false)
  }

  visitNumericLiteral(node: ts.NumericLiteral) {
    if (!this.funcDef) {
      return
    }
    const val = Number(node.text)
    
    if (Number.isInteger(val)) {
      if (val === 0) { 
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_0) 
        return
      }
      if (val === 1) { 
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_1) 
        return
      }
      if (val === 2) { 
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_2) 
        return
      }
      if (val === 3) { 
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_3) 
        return
      }
      if (val === 4) { 
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_4) 
        return
      }
      if (val === 5) { 
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_5) 
        return
      }
      if (val === 6) { 
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_6) 
        return
      }
      if (val === 7) { 
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_7) 
        return
      }

      if (val >= -128 && val <= 127) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_i8)
        this.compiler.emitU8(this.funcDef, val)
        return
      }
        // TODO: Handle i32
    }
    
    // Float or large int -> push_const8 (if index < 256)
    const idx = this.compiler.addConst(this.funcDef, val)
    this.compiler.emitOp(this.funcDef, Opcode.OP_push_const8)
    this.compiler.emitU8(this.funcDef, idx)
  }

  visitFunctionDeclaration(node: ts.FunctionDeclaration) {
    if (!this.funcDef) {
      return
    }
    
    const savedLoopStack = this.loopStack
    const savedPendingLabels = this.pendingLabels
    this.loopStack = []
    this.pendingLabels = []

    const parentFd = this.funcDef
    const name = node.name?.text
    if (!name) {
      throw new Error('Function declaration must have a name')
    }

    // Add variable to parent scope
    const varIdx = 0 // <eval> is at index 0
    
    // If parent is module (async), add as closure var
    // NOTE: hoistVariables already adds this!
    // if (parentFd.funcKind === FunctionKind.JS_FUNC_ASYNC) {
    //   this.compiler.addClosureVar(parentFd, name, true, false, varIdx, JSVarKind.JS_VAR_NORMAL, false, false)
    // }
    
    // Create child function def
    const fd = new FunctionDef(parentFd)
    fd.funcName = this.compiler.addAtom(name)
    fd.jsMode = JSMode.JS_MODE_STRICT
    fd.funcKind = FunctionKind.JS_FUNC_NORMAL
    fd.filename = parentFd.filename
    fd.hasDebug = true
    fd.sourcePos = node.getStart()
    fd.argumentsAllowed = true
    fd.hasPrototype = true
    fd.hasSimpleParameterList = true
    fd.newTargetAllowed = true
    // fd.stackSize = 2 // Hardcoded for compute.ts
    
    // Add arguments
    for (let i = 0; i < node.parameters.length; i++) {
      const param = node.parameters[i]
      if (ts.isIdentifier(param.name)) {
        this.compiler.addArg(fd, param.name.text)
        
        // If has initializer, add as local var (scope level 1)
        if (param.initializer) {
          this.compiler.addVar(fd, param.name.text, false, false, 1)
        }
      }
    }
    
    // Add child to parent cpool
    const childIdx = this.compiler.addChild(parentFd, fd)
    
    // Emit fclosure
    this.compiler.emitOp(parentFd, Opcode.OP_fclosure8)
    this.compiler.emitU8(parentFd, childIdx)
    
    // Emit put_var
    if (varIdx === 0) {
      this.compiler.emitOp(parentFd, Opcode.OP_put_var_ref0)
    } else {
      // TODO: Handle other indices
    }
    
    // Switch context to child function
    this.funcDef = fd
    
    // Generate default parameter prologue
    for (let i = 0; i < node.parameters.length; i++) {
      const param = node.parameters[i]
      if (param.initializer && ts.isIdentifier(param.name)) {
        // Find the local var index
        let varIdx = -1
        const atomId = this.compiler.addAtom(param.name.text)
        for(let v=0; v<fd.vars.length; v++) {
          if (fd.vars[v].varName === atomId) {
            varIdx = v
            break
          }
        }
        
        if (varIdx !== -1) {
          // set_loc_uninitialized varIdx
          this.compiler.emitOp(fd, Opcode.OP_set_loc_uninitialized)
          this.compiler.emitU16(fd, varIdx)
          
          // get_arg i
          if (i === 0) this.compiler.emitOp(fd, Opcode.OP_get_arg0)
          else if (i === 1) this.compiler.emitOp(fd, Opcode.OP_get_arg1)
          else if (i === 2) this.compiler.emitOp(fd, Opcode.OP_get_arg2)
          else if (i === 3) this.compiler.emitOp(fd, Opcode.OP_get_arg3)
          else {
            this.compiler.emitOp(fd, Opcode.OP_get_arg)
            this.compiler.emitU16(fd, i)
          }
          
          // dup
          this.compiler.emitOp(fd, Opcode.OP_dup)
          
          // is_undefined
          this.compiler.emitOp(fd, Opcode.OP_is_undefined)
          
          // if_false8 label
          this.compiler.emitOp(fd, Opcode.OP_if_false8)
          const jumpPos = fd.byteCode.size
          this.compiler.emitU8(fd, 0)
          
          // drop
          this.compiler.emitOp(fd, Opcode.OP_drop)
          
          // Evaluate initializer
          if (param.initializer.kind === ts.SyntaxKind.StringLiteral) {
             this.visitStringLiteral(param.initializer as ts.StringLiteral)
          } else {
             this.visit(param.initializer)
          }
          
          // set_arg i
          if (i === 0) this.compiler.emitOp(fd, Opcode.OP_set_arg0)
          else if (i === 1) this.compiler.emitOp(fd, Opcode.OP_set_arg1)
          else if (i === 2) this.compiler.emitOp(fd, Opcode.OP_set_arg2)
          else if (i === 3) this.compiler.emitOp(fd, Opcode.OP_set_arg3)
          else {
            this.compiler.emitOp(fd, Opcode.OP_set_arg)
            this.compiler.emitU16(fd, i)
          }
          
          // Patch jump
          const jumpDist = fd.byteCode.size - jumpPos - 1
          fd.byteCode.buffer[jumpPos] = jumpDist
          
          // put_loc varIdx
          if (varIdx === 0) this.compiler.emitOp(fd, Opcode.OP_put_loc0)
          else if (varIdx === 1) this.compiler.emitOp(fd, Opcode.OP_put_loc1)
          else if (varIdx === 2) this.compiler.emitOp(fd, Opcode.OP_put_loc2)
          else if (varIdx === 3) this.compiler.emitOp(fd, Opcode.OP_put_loc3)
          else {
            this.compiler.emitOp(fd, Opcode.OP_put_loc)
            this.compiler.emitU16(fd, varIdx)
          }
        }
      }
    }
    
    // Visit body
    if (node.body) {
      this.visit(node.body)
    }
    
    // Restore context
    this.funcDef = parentFd
    
    // Update stack size
    fd.stackSize = fd.stackSizeMax
    
    this.compiler.computePc2LineInfo(fd)
  }

  visitVariableStatement(node: ts.VariableStatement) {
    if (!this.funcDef) {
      return
    }
    
    const isLet = (node.declarationList.flags & ts.NodeFlags.Let) !== 0
    const isConst = (node.declarationList.flags & ts.NodeFlags.Const) !== 0
    const isLexical = isLet || isConst
    
    for (const decl of node.declarationList.declarations) {
      if (ts.isIdentifier(decl.name)) {
        const name = decl.name.text
        
        // Check if already declared in current scope (hoisted)
        let scopeInfo = this.findVarInScope(name)
        
        if (!scopeInfo) {
          // Not found (must be module scope var or function scope var)
          const currentScope = this.scopeStack[this.scopeStack.length - 1]
          
          if (currentScope.type === 'module') {
            // Add as local var first to reserve slot
            const scopeLevel = this.scopeStack.length
            const varIdx = this.compiler.addVar(this.funcDef, name, isConst, isLexical, scopeLevel)
            
            // Add as closure var
            const closureIdx = this.compiler.addClosureVar(this.funcDef, name, true, false, varIdx, JSVarKind.JS_VAR_NORMAL, isConst, isLexical)
            scopeInfo = { type: 'closure', idx: closureIdx, isLexical, isConst }
            currentScope.vars.set(name, scopeInfo)
          } else {
            // Function scope var (var in block)
            // TODO: Handle var hoisting to function scope
          }
        }
        
        if (scopeInfo) {
          // Emit initialization code
          if (decl.initializer) {
            this.visit(decl.initializer)
            
            // Emit OP_set_name for named function expressions/arrows assigned to variables
            if (ts.isArrowFunction(decl.initializer) || 
              ts.isFunctionExpression(decl.initializer) || 
              ts.isClassExpression(decl.initializer)) {
              const atomId = this.compiler.addAtom(name)
              this.compiler.emitOp(this.funcDef, Opcode.OP_set_name)
              this.compiler.emitU32(this.funcDef, atomId)
            }
            
            if (scopeInfo.type === 'closure') {
              // Emit put_var_ref
              const idx = scopeInfo.idx
              const atomId = this.compiler.addAtom(name)
              if (idx === 0) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref0)
              } else if (idx === 1) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref1)
              } else if (idx === 2) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref2)
              } else if (idx === 3) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref3)
              } else {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref)
                this.compiler.emitU32(this.funcDef, atomId)
                this.compiler.emitU16(this.funcDef, idx)
              }
            } else {
              // Local var
              const idx = scopeInfo.idx
              if (idx === 0) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc0)
              } else if (idx === 1) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc1)
              } else if (idx === 2) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc2)
              } else if (idx === 3) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc3)
              } else {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc)
                this.compiler.emitU16(this.funcDef, idx)
              }
            }
          }
        }
      }
    }
  }

  visitClassDeclaration(node: ts.ClassDeclaration) {
    if (!this.funcDef || !node.name) {
      return
    }

    // Define <class_fields_init> in parent scope if not exists
    const fieldsInitName = '<class_fields_init>'
    let fieldsInitScopeInfo = this.findVarInScope(fieldsInitName)
    
    if (!fieldsInitScopeInfo) {
      // Add to parent scope
      const varIdx = this.compiler.addVar(this.funcDef, fieldsInitName, true, false, this.scopeStack.length)
      const currentScope = this.scopeStack[this.scopeStack.length - 1]
      currentScope.vars.set(fieldsInitName, {
        type: 'local',
        idx: varIdx,
        isLexical: true,
        isConst: true
      })
      fieldsInitScopeInfo = this.findVarInScope(fieldsInitName)
    }

    const savedLoopStack = this.loopStack
    const savedPendingLabels = this.pendingLabels
    this.loopStack = []
    this.pendingLabels = []

    const name = node.name.text
    const scopeInfo = this.findVarInScope(name)
    if (!scopeInfo) {
      throw new Error(`Class ${name} not found in scope`)
    }

    // Emit set_loc_uninitialized
    if (scopeInfo.localIdx !== undefined) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_set_loc_uninitialized)
      this.compiler.emitU16(this.funcDef, scopeInfo.localIdx)
    }

    // Handle <class_fields_init>
    // Already defined at top
    if (fieldsInitScopeInfo) {
      // Emit undefined
      this.compiler.emitOp(this.funcDef, Opcode.OP_undefined)
      
      // Emit set_loc_uninitialized
      if (fieldsInitScopeInfo.localIdx !== undefined) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_set_loc_uninitialized)
        this.compiler.emitU16(this.funcDef, fieldsInitScopeInfo.localIdx)
      }
    }

    // Check for extends
    let hasExtends = false
    if (node.heritageClauses) {
      for (const clause of node.heritageClauses) {
        if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
          if (clause.types.length > 0) {
            // Compile base class expression
            this.visit(clause.types[0].expression)
            hasExtends = true
          }
        }
      }
    }

    // Create constructor function
    const parentFd = this.funcDef
    const fd = new FunctionDef()
    fd.funcName = this.compiler.addAtom(name)
    fd.funcKind = FunctionKind.JS_FUNC_NORMAL
    fd.jsMode = JSMode.JS_MODE_STRICT
    fd.hasDebug = true
    fd.filename = parentFd.filename
    fd.sourcePos = node.getStart()
    fd.parent = parentFd
    
    // Constructor specific flags
    fd.isDerivedClassConstructor = hasExtends
    fd.hasPrototype = true
    fd.hasSimpleParameterList = true // TODO: Check params
    
    // Add variables
    if (fd.isDerivedClassConstructor) {
      this.compiler.addVar(fd, 'this.active_func', false, false, 0)
      this.compiler.addVar(fd, 'new.target', false, false, 0)
      this.compiler.addVar(fd, 'this', true, false, 0)
    } else {
      this.compiler.addVar(fd, 'this', true, false, 0) // this is var 0
    }
    
    // Find constructor node
    const constructorNode = node.members.find(ts.isConstructorDeclaration)
    
    if (constructorNode) {
      // Add arguments
      for (const param of constructorNode.parameters) {
        if (ts.isIdentifier(param.name)) {
          this.compiler.addArg(fd, param.name.text)
        }
      }
    }
        
    // Add child to parent cpool
    const childIdx = this.compiler.addChild(parentFd, fd)
    
    // Emit fclosure8
    this.compiler.emitOp(parentFd, Opcode.OP_fclosure8)
    this.compiler.emitU8(parentFd, childIdx)
    
    // Emit define_class
    const classAtom = this.compiler.addAtom(name)
    this.compiler.emitOp(parentFd, Opcode.OP_define_class)
    this.compiler.emitU32(parentFd, classAtom)
    this.compiler.emitU8(parentFd, hasExtends ? 1 : 0) // flags

    // Handle private fields
    for (const member of node.members) {
      if (member.kind === ts.SyntaxKind.PropertyDeclaration) {
        const prop = member as ts.PropertyDeclaration
        if (prop.name && ts.isPrivateIdentifier(prop.name)) {
          const privateName = prop.name.text
          
          // Add variable to parent scope (class scope)
          const varIdx = this.compiler.addVar(parentFd, privateName, true, true, 0)
          
          // Update scope stack so it can be found later
          const currentScope = this.scopeStack[this.scopeStack.length - 1]
          if (currentScope) {
            currentScope.vars.set(privateName, {
              type: 'local',
              idx: varIdx,
              isLexical: true,
              isConst: true
            })
          }

          // Emit private_symbol
          const atom = this.compiler.addAtom(privateName)
          this.compiler.emitOp(parentFd, Opcode.OP_private_symbol)
          this.compiler.emitU32(parentFd, atom)
          
          // Store in variable
          if (varIdx === 0) {
            this.compiler.emitOp(parentFd, Opcode.OP_put_loc0)
          } else if (varIdx === 1) {
            this.compiler.emitOp(parentFd, Opcode.OP_put_loc1)
          } else if (varIdx === 2) {
            this.compiler.emitOp(parentFd, Opcode.OP_put_loc2)
          } else if (varIdx === 3) {
            this.compiler.emitOp(parentFd, Opcode.OP_put_loc3)
          } else {
            this.compiler.emitOp(parentFd, Opcode.OP_put_loc)
            this.compiler.emitU16(parentFd, varIdx)
          }
        }
      }
    }

    // Handle methods and accessors
    let isSwapped = false
    for (const member of node.members) {
      const kind = member.kind
      const isMethod = kind === ts.SyntaxKind.MethodDeclaration
      const isGetter = kind === ts.SyntaxKind.GetAccessor
      const isSetter = kind === ts.SyntaxKind.SetAccessor
        
      if (isMethod || isGetter || isSetter) {
        const funcMember = member as ts.MethodDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration
        
        if (funcMember.name && (ts.isIdentifier(funcMember.name) || ts.isStringLiteral(funcMember.name))) {
          const methodName = (funcMember.name as ts.Identifier).text
          const isStatic = funcMember.modifiers?.some(m => m.kind === ts.SyntaxKind.StaticKeyword) ?? false
        
          // Adjust stack for define_method
          // Instance method needs proto at sp[-2] (Stack: [proto, ctor])
          // Static method needs ctor at sp[-2] (Stack: [ctor, proto])
          if (isStatic) {
            if (!isSwapped) {
              this.compiler.emitOp(parentFd, Opcode.OP_swap)
              isSwapped = true
            }
          } else {
            if (isSwapped) {
              this.compiler.emitOp(parentFd, Opcode.OP_swap)
              isSwapped = false
            }
          }

          // Create method function
          const methodFd = new FunctionDef()
          methodFd.parent = parentFd
          methodFd.funcName = this.compiler.addAtom(methodName) 
          methodFd.filename = parentFd.filename
          methodFd.source = parentFd.source
          methodFd.sourceLen = parentFd.sourceLen
          methodFd.hasPrototype = false 
          
          // Add 'this' variable
          this.compiler.addVar(methodFd, 'this', true, false, 0)
          
          // Add <home_object> variable
          this.compiler.addVar(methodFd, '<home_object>', false, false, 0)
          
          // Add arguments
          for (const param of funcMember.parameters) {
            if (ts.isIdentifier(param.name)) {
              this.compiler.addArg(methodFd, param.name.text)
            }
          }
          
          // Compile body
          const prevFd: FunctionDef | null = this.funcDef
          this.funcDef = methodFd
          
          // Prologue
          // Init <home_object>
          this.compiler.emitOp(methodFd, Opcode.OP_special_object)
          this.compiler.emitU8(methodFd, 4) // home_object
          this.compiler.emitOp(methodFd, Opcode.OP_put_loc1) // var 1
          
          this.compiler.emitOp(methodFd, Opcode.OP_push_this)
          this.compiler.emitOp(methodFd, Opcode.OP_put_loc0)
          
          if (funcMember.body) {
            this.visit(funcMember.body)
          }
          
          // Epilogue
          // If last op is not return, emit return_undef
          const lastOp = methodFd.byteCode.size > 0 ? methodFd.byteCode.buffer[methodFd.byteCode.size - 1] : Opcode.OP_invalid
          if (lastOp !== Opcode.OP_return && lastOp !== Opcode.OP_return_undef) {
            this.compiler.emitOp(methodFd, Opcode.OP_return_undef)
          }
          this.compiler.computePc2LineInfo(methodFd)
          
          this.funcDef = prevFd
          
          // Add to CPool
          const methodChildIdx = this.compiler.addChild(parentFd, methodFd)
          
          // Emit fclosure8
          this.compiler.emitOp(parentFd, Opcode.OP_fclosure8)
          this.compiler.emitU8(parentFd, methodChildIdx)
          
          // Emit define_method
          const methodAtom = this.compiler.addAtom(methodName)
          this.compiler.emitOp(parentFd, Opcode.OP_define_method)
          this.compiler.emitU32(parentFd, methodAtom)
          
          let flags = 0
          if (isGetter) {
            flags = 1
          } else if (isSetter) {
            flags = 2
          }
          this.compiler.emitU8(parentFd, flags)
        }
      }
    }
    
    // Restore stack to [proto, ctor]
    if (isSwapped) {
      this.compiler.emitOp(parentFd, Opcode.OP_swap)
    }

    // Handle <class_fields_init> assignment
    if (fieldsInitScopeInfo) {
      // OP_define_class pushes [ctor, initializer]
      // We want to store initializer into <class_fields_init>
      
      if (fieldsInitScopeInfo.localIdx !== undefined) {
        const idx = fieldsInitScopeInfo.localIdx
        if (idx === 0) {
            this.compiler.emitOp(parentFd, Opcode.OP_put_loc0)
        } else if (idx === 1) {
            this.compiler.emitOp(parentFd, Opcode.OP_put_loc1)
        } else if (idx === 2) {
            this.compiler.emitOp(parentFd, Opcode.OP_put_loc2)
        } else if (idx === 3) {
            this.compiler.emitOp(parentFd, Opcode.OP_put_loc3)
        } else {
            this.compiler.emitOp(parentFd, Opcode.OP_put_loc)
            this.compiler.emitU16(parentFd, idx)
        }
        
        this.compiler.emitOp(parentFd, Opcode.OP_close_loc)
        this.compiler.emitU16(parentFd, idx)
      }
    }
      
    // Initialize variable
    if (scopeInfo.localIdx !== undefined) {
      if (scopeInfo.localIdx === 0) {
        this.compiler.emitOp(parentFd, Opcode.OP_set_loc0)
      } else if (scopeInfo.localIdx === 1) {
        this.compiler.emitOp(parentFd, Opcode.OP_set_loc1)
      } else if (scopeInfo.localIdx === 2) {
        this.compiler.emitOp(parentFd, Opcode.OP_set_loc2)
      } else if (scopeInfo.localIdx === 3) {
        this.compiler.emitOp(parentFd, Opcode.OP_set_loc3)
      } else {
        this.compiler.emitOp(parentFd, Opcode.OP_set_loc)
        this.compiler.emitU16(parentFd, scopeInfo.localIdx)
      }
    }
      
    if (scopeInfo.type === 'closure') {
      const idx = scopeInfo.idx
      if (idx === 0) {
        this.compiler.emitOp(parentFd, Opcode.OP_put_var_ref0)
      } else if (idx === 1) {
        this.compiler.emitOp(parentFd, Opcode.OP_put_var_ref1)
      } else if (idx === 2) {
        this.compiler.emitOp(parentFd, Opcode.OP_put_var_ref2)
      } else if (idx === 3) {
        this.compiler.emitOp(parentFd, Opcode.OP_put_var_ref3)
      } else {
        this.compiler.emitOp(parentFd, Opcode.OP_put_var_ref)
        this.compiler.emitU16(parentFd, idx)
      }
    }
      
    // Compile constructor body
    this.funcDef = fd

    // Enter function scope
    this.enterScope('function')
    const currentScope = this.scopeStack[this.scopeStack.length - 1]
    
    // Add 'this' to scope
    if (fd.isDerivedClassConstructor) {
      currentScope.vars.set('this', { type: 'local', idx: 2, isLexical: false, isConst: true })
      currentScope.vars.set('new.target', { type: 'local', idx: 1, isLexical: false, isConst: true })
      currentScope.vars.set('this.active_func', { type: 'local', idx: 0, isLexical: false, isConst: true })
    } else {
      currentScope.vars.set('this', { type: 'local', idx: 0, isLexical: false, isConst: true })
    }

    // Ensure <class_fields_init> is available as closure var
    const fieldsInitNameCtor = '<class_fields_init>'
    const fieldsInitScopeInfoCtor = this.findVarInScope(fieldsInitNameCtor)
    let fieldsInitClosureIdx = -1
    
    console.log('fieldsInitScopeInfoCtor:', fieldsInitScopeInfoCtor)

    if (fieldsInitScopeInfoCtor) {
      let isLocalInParent = false
      let parentIdx = -1
      
      if (fieldsInitScopeInfoCtor.type === 'local') {
        isLocalInParent = true
        parentIdx = fieldsInitScopeInfoCtor.idx
      } else {
        isLocalInParent = false
        parentIdx = fieldsInitScopeInfoCtor.idx
      }
      
      fieldsInitClosureIdx = this.compiler.addClosureVar(
        fd, 
        fieldsInitNameCtor, 
        isLocalInParent, 
        false, 
        parentIdx, 
        JSVarKind.JS_VAR_NORMAL, 
        true, 
        true
      )
    }
      
    // Prologue
    if (fd.isDerivedClassConstructor) {
      this.compiler.emitOp(fd, Opcode.OP_special_object)
      this.compiler.emitU8(fd, 2) // this.active_func
      this.compiler.emitOp(fd, Opcode.OP_put_loc0) // var 0
      
      this.compiler.emitOp(fd, Opcode.OP_special_object)
      this.compiler.emitU8(fd, 3) // new.target
      this.compiler.emitOp(fd, Opcode.OP_put_loc1) // var 1
      
      this.compiler.emitOp(fd, Opcode.OP_set_loc_uninitialized)
      this.compiler.emitU16(fd, 2) // var 2 (this)
      
      this.compiler.emitOp(fd, Opcode.OP_check_ctor)
    } else {
      this.compiler.emitOp(fd, Opcode.OP_push_this)
      this.compiler.emitOp(fd, Opcode.OP_put_loc0) // this
      this.compiler.emitOp(fd, Opcode.OP_check_ctor)

        // Initialize private fields
      for (const member of node.members) {
        if (member.kind === ts.SyntaxKind.PropertyDeclaration) {
          const prop = member as ts.PropertyDeclaration
          if (prop.name && ts.isPrivateIdentifier(prop.name)) {
            const privateName = prop.name.text
            
            // Get 'this'
            this.compiler.emitOp(fd, Opcode.OP_get_loc0)
            
            // Get private symbol (captured from parent scope)
            const varInfo = this.findVarInScope(privateName)
            if (varInfo) {
              // It's in parent scope, so we need to capture it
              const closureIdx = this.compiler.addClosureVar(fd, privateName, true, false, varInfo.idx, 0, true, true)
              this.compiler.emitOp(fd, Opcode.OP_get_var_ref_check)
              this.compiler.emitU16(fd, closureIdx)
            } else {
              throw new Error(`Private field ${privateName} not found`)
            }
            
            // Initial value
            if (prop.initializer) {
              const prevFd: FunctionDef | null = this.funcDef
              this.funcDef = fd
              this.visit(prop.initializer)
              this.funcDef = prevFd
            } else {
              this.compiler.emitOp(fd, Opcode.OP_push_0) // Default to 0? No, undefined usually.
              // Wait, WASM used push_0 because initializer was 0.
              // If no initializer, it should be undefined?
              // But private fields MUST be initialized?
              // If no initializer, it is undefined.
              // Let's check WASM for no initializer.
              // But here I have initializer '0'.
              // If I don't have initializer, I should emit undefined.
            }
              
            if (!prop.initializer) {
              this.compiler.emitOp(fd, Opcode.OP_undefined)
            }
              
            // Define private field
            this.compiler.emitOp(fd, Opcode.OP_define_private_field)
          }
        }
      }

      // Initialize fields
      if (fieldsInitClosureIdx !== -1) {
        this.compiler.emitOp(fd, Opcode.OP_get_var_ref_check)
        this.compiler.emitU16(fd, fieldsInitClosureIdx)
        
        this.compiler.emitOp(fd, Opcode.OP_dup)
        this.compiler.emitOp(fd, Opcode.OP_if_false8)
        const jumpPos = fd.byteCode.size
        this.compiler.emitU8(fd, 0)
        
        this.compiler.emitOp(fd, Opcode.OP_get_loc0) // this
        this.compiler.emitOp(fd, Opcode.OP_swap)
        this.compiler.emitOp(fd, Opcode.OP_call_method)
        this.compiler.emitU16(fd, 0)
        
        // this.compiler.emitOp(fd, Opcode.OP_drop)
        
        const endPos = fd.byteCode.size
        const offset = endPos - jumpPos
        fd.byteCode.buffer[jumpPos] = offset
        
        this.compiler.emitOp(fd, Opcode.OP_drop)
      }
    }
      
    // Body
    if (constructorNode && constructorNode.body) {
      this.visit(constructorNode.body)
    } else {
      // Default constructor body
      if (hasExtends) {
        // TODO: Call super()
      }

      // Initialize fields
      if (fieldsInitClosureIdx !== -1) {
        this.compiler.emitOp(fd, Opcode.OP_get_var_ref_check)
        this.compiler.emitU16(fd, fieldsInitClosureIdx)
        
        this.compiler.emitOp(fd, Opcode.OP_dup)
        this.compiler.emitOp(fd, Opcode.OP_if_false8)
        const jumpPos = fd.byteCode.size
        this.compiler.emitU8(fd, 0)
        
        this.compiler.emitOp(fd, Opcode.OP_get_loc0) // this
        this.compiler.emitOp(fd, Opcode.OP_swap)
        this.compiler.emitOp(fd, Opcode.OP_call_method)
        this.compiler.emitU16(fd, 0)
        
        // this.compiler.emitOp(fd, Opcode.OP_drop)
        
        const endPos = fd.byteCode.size
        const offset = endPos - jumpPos
        fd.byteCode.buffer[jumpPos] = offset
        
        this.compiler.emitOp(fd, Opcode.OP_drop)
      }
    }
      
    // Epilogue
    this.compiler.emitOp(fd, Opcode.OP_return_undef)
    this.compiler.computePc2LineInfo(fd)
    
    this.exitScope()

    this.funcDef = parentFd
    
    this.loopStack = savedLoopStack
    this.pendingLabels = savedPendingLabels
  }

  enterScope(type: 'module' | 'block' | 'function') {
    const parent = this.scopeStack.length > 0 ? this.scopeStack[this.scopeStack.length - 1] : null
    this.scopeStack.push({
      type,
      vars: new Map(),
      parent,
      funcDef: this.funcDef || undefined
    })
  }

  exitScope() {
    this.scopeStack.pop()
  }

  captureVariable(targetFd: FunctionDef, name: string, sourceFd: FunctionDef, varInfo: VarInfo): number {
    if (targetFd === sourceFd) {
      return varInfo.idx
    }
    
    if (!targetFd.parent) {
      throw new Error(`Cannot capture variable '${name}': parent function not found`)
    }
    
    // Check if already captured in targetFd
    const atom = this.compiler.atomMap.get(name)
    if (atom !== undefined) {
      for (let k = 0; k < targetFd.closureVar.length; k++) {
        if (targetFd.closureVar[k].varName === atom) {
          return k
        }
      }
    }
    
    let parentIdx: number
    let isLocalInParent: boolean
    
    if (targetFd.parent === sourceFd) {
      parentIdx = varInfo.idx
      isLocalInParent = varInfo.type === 'local'
    } else {
      // Recurse
      parentIdx = this.captureVariable(targetFd.parent, name, sourceFd, varInfo)
      isLocalInParent = false // It's a closure in parent
    }
    
    // Add closure var to targetFd
    const closureIdx = this.compiler.addClosureVar(
      targetFd,
      name,
      isLocalInParent,
      false,
      parentIdx,
      0,
      varInfo.isConst,
      varInfo.isLexical
    )
    
    return closureIdx
  }

  findVarInScope(name: string): VarInfo | null {
    for (let i = this.scopeStack.length - 1; i >= 0; i--) {
      const scope = this.scopeStack[i]
      if (scope.vars.has(name)) {
        const varInfo = scope.vars.get(name)!
        
        if (scope.funcDef && this.funcDef && scope.funcDef !== this.funcDef) {
          const closureIdx = this.captureVariable(this.funcDef, name, scope.funcDef, varInfo)
          return {
            type: 'closure',
            idx: closureIdx,
            isLexical: varInfo.isLexical,
            isConst: varInfo.isConst
          }
        }
        
        return varInfo
      }
    }
    return null
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
            const currentScope = this.scopeStack[this.scopeStack.length - 1]
            if (!currentScope.vars.has(name)) {
              // Add as local var
              const scopeLevel = this.scopeStack.length
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

  visitLabeledStatement(node: ts.LabeledStatement) {
    const label = node.label.text
    this.pendingLabels.push(label)
    const preCount = this.pendingLabels.length
    
    this.visit(node.statement)
    
    if (this.pendingLabels.length >= preCount) {
      if (this.pendingLabels[preCount - 1] === label) {
        const index = this.pendingLabels.lastIndexOf(label)
        if (index !== -1) {
          this.pendingLabels.splice(index, 1)
        }
      }
    }
  }

  visitBlock(node: ts.Block) {
    let loopInfo: LoopInfo | null = null
    if (this.pendingLabels.length > 0) {
      loopInfo = {
        type: 'block',
        labels: [...this.pendingLabels],
        breakLabel: this.compiler.newLabel(),
        continueLabel: undefined
      }
      this.loopStack.push(loopInfo)
      this.pendingLabels = []
    }

    this.enterScope('block')
    
    // Hoist block-scoped variables (let/const)
    for (const stmt of node.statements) {
      if (ts.isVariableStatement(stmt)) {
        const isLet = (stmt.declarationList.flags & ts.NodeFlags.Let) !== 0
        const isConst = (stmt.declarationList.flags & ts.NodeFlags.Const) !== 0
        if (isLet || isConst) {
          for (const decl of stmt.declarationList.declarations) {
            if (ts.isIdentifier(decl.name)) {
              const name = decl.name.text
              const currentScope = this.scopeStack[this.scopeStack.length - 1]
              if (!currentScope.vars.has(name)) {
                // Add as local var
                const scopeLevel = this.scopeStack.length
                const varIdx = this.compiler.addVar(this.funcDef!, name, isConst, true, scopeLevel)
                currentScope.vars.set(name, {
                  type: 'local',
                  idx: varIdx,
                  isLexical: true,
                  isConst
                })
                
                // Emit set_loc_uninitialized
                this.compiler.emitOp(this.funcDef!, Opcode.OP_set_loc_uninitialized)
                this.compiler.emitU16(this.funcDef!, varIdx)
              }
            }
          }
        }
      }
    }

    for (const stmt of node.statements) {
      this.visit(stmt)
      if (this.isTerminated) break
    }
    this.exitScope()

    if (loopInfo) {
      this.compiler.markLabel(this.funcDef!, loopInfo.breakLabel)
      this.loopStack.pop()
    }
  }

  visitSwitchStatement(node: ts.SwitchStatement) {
    if (!this.funcDef) {
      return
    }

    // 1. Evaluate expression
    this.visit(node.expression)
    
    // 3. Setup break stack
    const loopInfo: LoopInfo = {
      type: 'switch',
      labels: [...this.pendingLabels],
      breakLabel: this.compiler.newLabel(),
      continueLabel: undefined
    }
    this.loopStack.push(loopInfo)
    this.pendingLabels = []

    const clauses = node.caseBlock.clauses
    
    // Handle "Default First" case: Jump to first Case Check
    let startJumpPos = -1
    const hasCaseClauses = clauses.some(c => ts.isCaseClause(c))
    if (clauses.length > 0 && ts.isDefaultClause(clauses[0]) && hasCaseClauses) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_goto8)
      startJumpPos = this.funcDef.byteCode.size
      this.compiler.emitU8(this.funcDef, 0)
    }

    let previousCheckJumpPos = -1
    let defaultBodyLabelPos = -1
    
    // Iterate clauses
    for (let i = 0; i < clauses.length; i++) {
      const clause = clauses[i]
      const isCase = ts.isCaseClause(clause)
      const isDefault = ts.isDefaultClause(clause)

      let pendingSkipCheckJumpPos = -1

      if (isCase) {
        // Handle Fallthrough: Skip Check if previous block falls through
        if (i > 0) {
          const buf = this.funcDef.byteCode.buffer
          const len = this.funcDef.byteCode.size
          let isTerminated = false
          if (len >= 1 && (buf[len-1] === Opcode.OP_return || buf[len-1] === Opcode.OP_return_undef || buf[len-1] === Opcode.OP_return_async)) {
            isTerminated = true
          }
          if (len >= 2 && buf[len-2] === Opcode.OP_goto8) {
            isTerminated = true
          }
          if (len >= 3 && buf[len-3] === Opcode.OP_goto16) {
            isTerminated = true
          }
          
          if (!isTerminated) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_goto8)
            pendingSkipCheckJumpPos = this.funcDef.byteCode.size
            this.compiler.emitU8(this.funcDef, 0)
          }
        }

        // If this is the first Case Clause, patch startJumpPos
        if (startJumpPos !== -1) {
          const offset = this.funcDef.byteCode.size - startJumpPos
          if (offset > 127 || offset < -128) {
            throw new Error('Jump offset too large for goto8')
          }
          this.funcDef.byteCode.buffer[startJumpPos] = offset
          startJumpPos = -1
        }

        // Patch previous check jump
        if (previousCheckJumpPos !== -1) {
          const offset = this.funcDef.byteCode.size - previousCheckJumpPos
          if (offset > 127 || offset < -128) {
            throw new Error('Jump offset too large for if_false8')
          }
          this.funcDef.byteCode.buffer[previousCheckJumpPos] = offset
          previousCheckJumpPos = -1
        }

        // Emit Check
        this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
        this.visit(clause.expression)
        this.compiler.emitOp(this.funcDef, Opcode.OP_strict_eq)
        this.compiler.emitOp(this.funcDef, Opcode.OP_if_false8)
        previousCheckJumpPos = this.funcDef.byteCode.size
        this.compiler.emitU8(this.funcDef, 0)
      }
      
      // Patch skip check jump
      if (pendingSkipCheckJumpPos !== -1) {
        const offset = this.funcDef.byteCode.size - pendingSkipCheckJumpPos
        if (offset > 127 || offset < -128) {
          throw new Error('Jump offset too large for goto8')
        }
        this.funcDef.byteCode.buffer[pendingSkipCheckJumpPos] = offset
      }

      if (isDefault) {
        defaultBodyLabelPos = this.funcDef.byteCode.size
      }
      
      // Visit Body
      for (const stmt of clause.statements) {
        this.visit(stmt)
      }
    }
    
    // Patch the LAST check failure
    if (previousCheckJumpPos !== -1) {
      let target = -1
      if (defaultBodyLabelPos !== -1) {
        target = defaultBodyLabelPos
      } else {
        target = this.funcDef.byteCode.size // End
      }
      
      const offset = target - previousCheckJumpPos
      if (offset > 127 || offset < -128) {
        throw new Error('Jump offset too large for if_false8')
      }
      this.funcDef.byteCode.buffer[previousCheckJumpPos] = offset
    }
    
    // Pop break stack
    this.loopStack.pop()
    
    // Patch breaks
    this.compiler.markLabel(this.funcDef, loopInfo.breakLabel)
    
    // Drop switch value
    this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
  }

  visitForStatement(node: ts.ForStatement) {
    if (!this.funcDef) return

    let hasScope = false
    
    // 1. Enter Scope (if initializer has let/const)
    if (node.initializer && ts.isVariableDeclarationList(node.initializer)) {
      if (node.initializer.flags & (ts.NodeFlags.Let | ts.NodeFlags.Const)) {
        this.enterScope('block')
        hasScope = true
            
        // Hoist variables
        const isConst = (node.initializer.flags & ts.NodeFlags.Const) !== 0
        for (const decl of node.initializer.declarations) {
          if (ts.isIdentifier(decl.name)) {
            const name = decl.name.text
            const currentScope = this.scopeStack[this.scopeStack.length - 1]
            if (!currentScope.vars.has(name)) {
              const scopeLevel = this.scopeStack.length
              const varIdx = this.compiler.addVar(this.funcDef!, name, isConst, true, scopeLevel)
              currentScope.vars.set(name, {
                type: 'local',
                idx: varIdx,
                isLexical: true,
                isConst
              })
              
              // Emit set_loc_uninitialized
              this.compiler.emitOp(this.funcDef!, Opcode.OP_set_loc_uninitialized)
              this.compiler.emitU16(this.funcDef!, varIdx)
            }
          }
        }
      }
    }

    // 2. Init
    if (node.initializer) {
      if (ts.isVariableDeclarationList(node.initializer)) {
        // Visit declarations
        for (const decl of node.initializer.declarations) {
          if (decl.initializer && ts.isIdentifier(decl.name)) {
            this.visit(decl.initializer)
            const name = decl.name.text
            const scopeInfo = this.findVarInScope(name)

            if (scopeInfo) {
              const idx = scopeInfo.idx
              if (idx === 0) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc0)
              } else if (idx === 1) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc1)
              } else if (idx === 2) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc2)
              } else if (idx === 3) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc3)
              } else {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc)
                this.compiler.emitU16(this.funcDef, idx)
              }
            }
          }
        }
      } else {
        this.visit(node.initializer)
        this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
      }
    }

    const startPos = this.funcDef.byteCode.size

    // 3. Condition
    let ifFalseOffsetPos = -1
    if (node.condition) {
      this.visit(node.condition)
      this.compiler.emitOp(this.funcDef, Opcode.OP_if_false8)
      ifFalseOffsetPos = this.funcDef.byteCode.size
      this.compiler.emitU8(this.funcDef, 0)
    }

    // Push loop info
    const loopInfo: LoopInfo = {
      type: 'loop',
      labels: [...this.pendingLabels],
      breakLabel: this.compiler.newLabel(),
      continueLabel: this.compiler.newLabel()
    }
    this.loopStack.push(loopInfo)
    this.pendingLabels = []

    // 4. Body
    this.visit(node.statement)

    this.loopStack.pop()

    // 5. Increment
    this.compiler.markLabel(this.funcDef, loopInfo.continueLabel!)

    if (node.incrementor) {
      this.visit(node.incrementor)
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
    }

    // 6. Loop
    this.compiler.emitOp(this.funcDef, Opcode.OP_goto8)
    const gotoOffsetPos = this.funcDef.byteCode.size
    this.compiler.emitU8(this.funcDef, 0)
    const gotoOffset = startPos - gotoOffsetPos

    if (gotoOffset > 127 || gotoOffset < -128) {
      throw new Error('Jump offset too large for goto8')
    }

    this.funcDef.byteCode.buffer[gotoOffsetPos] = gotoOffset
    
    // 7. Patch exit
    const endPos = this.funcDef.byteCode.size
    if (ifFalseOffsetPos !== -1) {
      const offset = endPos - ifFalseOffsetPos

      if (offset > 127 || offset < -128) {
        throw new Error('Jump offset too large for if_false8')
      }
      this.funcDef.byteCode.buffer[ifFalseOffsetPos] = offset
    }

    // Patch break jumps
    this.compiler.markLabel(this.funcDef, loopInfo.breakLabel)


    if (hasScope) {
      // Emit close_loc for let/const variables in loop scope
      // QuickJS emits close_loc for each variable in the scope
      // But here we just exit scope.
      // TODO: Check if we need explicit close_loc instructions.
      // For now, just exit scope.
      this.exitScope()
    }
  }

  visitForOfStatement(node: ts.ForOfStatement) {
    if (!this.funcDef) return

    // 2. Setup iterator
    let hasScope = false
    if (node.initializer && ts.isVariableDeclarationList(node.initializer)) {
      if (node.initializer.flags & (ts.NodeFlags.Let | ts.NodeFlags.Const)) {
        this.enterScope('block')
        hasScope = true
        
        // Hoist variables
        const isConst = (node.initializer.flags & ts.NodeFlags.Const) !== 0
        for (const decl of node.initializer.declarations) {
          if (ts.isIdentifier(decl.name)) {
            const name = decl.name.text
            const currentScope = this.scopeStack[this.scopeStack.length - 1]
            if (!currentScope.vars.has(name)) {
              const scopeLevel = this.scopeStack.length
              const varIdx = this.compiler.addVar(this.funcDef!, name, isConst, true, scopeLevel)
              currentScope.vars.set(name, {
                type: 'local',
                idx: varIdx,
                isLexical: true,
                isConst
              })
              
              this.compiler.emitOp(this.funcDef!, Opcode.OP_set_loc_uninitialized)
              this.compiler.emitU16(this.funcDef!, varIdx)
            }
          }
        }
      }
    }

    // 1. Evaluate expression
    this.visit(node.expression)

    this.compiler.emitOp(this.funcDef, Opcode.OP_for_of_start)
    
    // Push loop info
    const loopInfo: LoopInfo = {
      type: 'loop',
      labels: [...this.pendingLabels],
      breakLabel: this.compiler.newLabel(),
      continueLabel: this.compiler.newLabel()
    }
    this.loopStack.push(loopInfo)
    this.pendingLabels = []

    // Jump to check
    this.compiler.emitOp(this.funcDef, Opcode.OP_goto8)
    const gotoCheckPos = this.funcDef.byteCode.size
    this.compiler.emitU8(this.funcDef, 0)
    
    // Body Label
    const bodyPos = this.funcDef.byteCode.size
    
    // Adjust stack for loop variable (pushed by for_of_next)
    this.compiler.adjustStack(this.funcDef, 1)
    
    // Assign to variable
    if (node.initializer) {
      if (ts.isVariableDeclarationList(node.initializer)) {
        for (const decl of node.initializer.declarations) {
          if (ts.isIdentifier(decl.name)) {
            const name = decl.name.text
            const scopeInfo = this.findVarInScope(name)
            if (scopeInfo) {
              const idx = scopeInfo.idx
              if (idx === 0) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc0)
              } else if (idx === 1) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc1)
              } else if (idx === 2) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc2)
              } else if (idx === 3) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc3)
              } else {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc)
                this.compiler.emitU16(this.funcDef, idx)
              }
            }
          }
        }
      }
    }
    
    // Visit Body
    this.visit(node.statement)
    
    // Continue Label
    this.compiler.markLabel(this.funcDef, loopInfo.continueLabel!)
    
    // Check Label
    const checkPos = this.funcDef.byteCode.size
    
    // Patch initial goto
    const offset = checkPos - gotoCheckPos
    this.funcDef.byteCode.buffer[gotoCheckPos] = offset
    
    this.compiler.emitOp(this.funcDef, Opcode.OP_for_of_next)
    this.compiler.emitU8(this.funcDef, 0)
    
    // if_false8 Body
    this.compiler.emitOp(this.funcDef, Opcode.OP_if_false8)
    const jumpBackPos = this.funcDef.byteCode.size
    this.compiler.emitU8(this.funcDef, 0)
    
    const jumpBackOffset = bodyPos - jumpBackPos
    this.funcDef.byteCode.buffer[jumpBackPos] = jumpBackOffset
    
    // Drop iterator
    this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
    
    // Iterator Close
    this.compiler.emitOp(this.funcDef, Opcode.OP_iterator_close)
    
    this.loopStack.pop()
    
    // Break Label
    this.compiler.markLabel(this.funcDef, loopInfo.breakLabel)
    
    if (hasScope) {
      this.exitScope()
    }
  }

  visitForInStatement(node: ts.ForInStatement) {
    if (!this.funcDef) return

    // 1. Evaluate expression
    this.visit(node.expression)

    // 2. Setup iterator
    let hasScope = false
    if (node.initializer && ts.isVariableDeclarationList(node.initializer)) {
      if (node.initializer.flags & (ts.NodeFlags.Let | ts.NodeFlags.Const)) {
        this.enterScope('block')
        hasScope = true
        
        // Hoist variables
        const isConst = (node.initializer.flags & ts.NodeFlags.Const) !== 0
        for (const decl of node.initializer.declarations) {
          if (ts.isIdentifier(decl.name)) {
            const name = decl.name.text
            const currentScope = this.scopeStack[this.scopeStack.length - 1]
            if (!currentScope.vars.has(name)) {
              const scopeLevel = this.scopeStack.length
              const varIdx = this.compiler.addVar(this.funcDef!, name, isConst, true, scopeLevel)
              currentScope.vars.set(name, {
                type: 'local',
                idx: varIdx,
                isLexical: true,
                isConst
              })
              
              this.compiler.emitOp(this.funcDef!, Opcode.OP_set_loc_uninitialized)
              this.compiler.emitU16(this.funcDef!, varIdx)
            }
          }
        }
      }
    }

    this.compiler.emitOp(this.funcDef, Opcode.OP_for_in_start)
    
    // Push loop info
    const loopInfo: LoopInfo = {
      type: 'loop',
      labels: [...this.pendingLabels],
      breakLabel: this.compiler.newLabel(),
      continueLabel: this.compiler.newLabel()
    }
    this.loopStack.push(loopInfo)
    this.pendingLabels = []

    // Jump to check
    this.compiler.emitOp(this.funcDef, Opcode.OP_goto8)
    const gotoCheckPos = this.funcDef.byteCode.size
    this.compiler.emitU8(this.funcDef, 0)
    
    // Body Label
    const bodyPos = this.funcDef.byteCode.size
    
    // Assign to variable
    if (node.initializer) {
      if (ts.isVariableDeclarationList(node.initializer)) {
        for (const decl of node.initializer.declarations) {
          if (ts.isIdentifier(decl.name)) {
            const name = decl.name.text
            const scopeInfo = this.findVarInScope(name)
            if (scopeInfo) {
              const idx = scopeInfo.idx
              if (idx === 0) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc0)
              } else if (idx === 1) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc1)
              } else if (idx === 2) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc2)
              } else if (idx === 3) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc3)
              } else {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc)
                this.compiler.emitU16(this.funcDef, idx)
              }
            }
          }
        }
      }
    }
    
    // Visit Body
    this.visit(node.statement)
    
    // Continue Label
    this.compiler.markLabel(this.funcDef, loopInfo.continueLabel!)
    
    // Check Label
    const checkPos = this.funcDef.byteCode.size
    
    // Patch initial goto
    const offset = checkPos - gotoCheckPos
    this.funcDef.byteCode.buffer[gotoCheckPos] = offset
    
    this.compiler.emitOp(this.funcDef, Opcode.OP_for_in_next)
    
    // if_false8 Body
    this.compiler.emitOp(this.funcDef, Opcode.OP_if_false8)
    const jumpBackPos = this.funcDef.byteCode.size
    this.compiler.emitU8(this.funcDef, 0)
    
    const jumpBackOffset = bodyPos - jumpBackPos
    this.funcDef.byteCode.buffer[jumpBackPos] = jumpBackOffset
    
    // Drop iterator
    this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
    
    this.loopStack.pop()
    
    // Break Label
    this.compiler.markLabel(this.funcDef, loopInfo.breakLabel)
    
    if (hasScope) {
      this.exitScope()
    }
  }

  visitBreakStatement(node: ts.BreakStatement) {
    if (!this.funcDef) {
      return
    }

    let loopInfo: LoopInfo | undefined
    if (node.label) {
      const labelText = node.label.text
      for (let i = this.loopStack.length - 1; i >= 0; i--) {
        if (this.loopStack[i].labels.includes(labelText)) {
          loopInfo = this.loopStack[i]
          break
        }
      }
      if (!loopInfo) {
        throw new Error(`Undefined label '${labelText}'`)
      }
    } else {
      for (let i = this.loopStack.length - 1; i >= 0; i--) {
        if (this.loopStack[i].type === 'loop' || this.loopStack[i].type === 'switch') {
          loopInfo = this.loopStack[i]
          break
        }
      }
      if (!loopInfo) {
        throw new Error('Break statement outside of loop/switch')
      }
    }

    this.compiler.emitJump(this.funcDef, Opcode.OP_goto8, loopInfo.breakLabel)
  }

  visitContinueStatement(node: ts.ContinueStatement) {
    if (!this.funcDef) {
      return
    }

    let loopInfo: LoopInfo | undefined
    if (node.label) {
        const labelText = node.label.text
        for (let i = this.loopStack.length - 1; i >= 0; i--) {
            if (this.loopStack[i].type === 'loop' && this.loopStack[i].labels.includes(labelText)) {
                loopInfo = this.loopStack[i]
                break
            }
        }
        if (!loopInfo) {
             for (let i = this.loopStack.length - 1; i >= 0; i--) {
                if (this.loopStack[i].labels.includes(labelText)) {
                    throw new Error(`Label '${labelText}' is not a loop label`)
                }
             }
            throw new Error(`Undefined label '${labelText}'`)
        }
    } else {
        for (let i = this.loopStack.length - 1; i >= 0; i--) {
          if (this.loopStack[i].type === 'loop') {
            loopInfo = this.loopStack[i]
            break
          }
        }
        if (!loopInfo) {
          throw new Error('Continue statement outside of loop')
        }
    }

    this.compiler.emitJump(this.funcDef, Opcode.OP_goto8, loopInfo.continueLabel!)
  }

  visitReturnStatement(node: ts.ReturnStatement) {
    if (!this.funcDef) {
      return
    }
    if (node.expression) {
      this.visit(node.expression)
      this.compiler.emitOp(this.funcDef, Opcode.OP_return, node.getStart())
    } else {
      this.compiler.emitOp(this.funcDef, Opcode.OP_return_undef, node.getStart())
    }
    this.isTerminated = true
  }

  visitThrowStatement(node: ts.ThrowStatement) {
    if (!this.funcDef) {
      return
    }
    if (node.expression) {
      this.visit(node.expression)
      this.compiler.emitOp(this.funcDef, Opcode.OP_throw, node.getStart())
    } else {
      // Should not happen in valid TS/JS for throw statement, but rethrow is different
      this.compiler.emitOp(this.funcDef, Opcode.OP_throw, node.getStart())
    }
    this.isTerminated = true
  }

  visitTryStatement(node: ts.TryStatement) {
    if (!this.funcDef) {
      return
    }

    // 1. Setup catch/finally
    // If we have a finally block, we need to wrap everything in a catch-all to execute finally
    // But QuickJS uses gosub for finally.
    
    // Structure for try-catch-finally:
    // catch LABEL_CATCH
    //   TRY_BLOCK
    //   drop (drop catch handler)
    //   gosub LABEL_FINALLY (if finally exists)
    //   goto LABEL_END
    // LABEL_CATCH:
    //   put_loc exception_var (if catch exists)
    //   catch LABEL_CATCH_2 (if finally exists, to catch exceptions in catch block)
    //     CATCH_BLOCK
    //     drop (drop catch handler 2)
    //     gosub LABEL_FINALLY (if finally exists)
    //     goto LABEL_END
    // LABEL_CATCH_2:
    //   gosub LABEL_FINALLY
    //   throw (rethrow)
    // LABEL_FINALLY:
    //   FINALLY_BLOCK
    //   ret
    // LABEL_END:

    const hasCatch = !!node.catchClause
    const hasFinally = !!node.finallyBlock

    // Push catch handler
    this.compiler.emitOp(this.funcDef, Opcode.OP_catch, node.getStart())
    const catchOffsetPos = this.funcDef.byteCode.size
    this.compiler.emitU32(this.funcDef, 0) // Placeholder

    // Visit Try Block
    this.isTerminated = false
    this.visit(node.tryBlock)
    const tryTerminated = this.isTerminated
    this.isTerminated = false // Reset for catch

    let gotoEndOffsetPos = -1

    if (!tryTerminated) {
      // End of Try Block
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop) // Drop catch handler
      
      if (hasFinally) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_gosub)
        const gosubOffsetPos = this.funcDef.byteCode.size
        this.compiler.emitU32(this.funcDef, 0) // Placeholder
        
        // Patch gosub later
        this.pendingLabels.push(`gosub_${gosubOffsetPos}`)
      }

      this.compiler.emitOp(this.funcDef, Opcode.OP_goto8)
      gotoEndOffsetPos = this.funcDef.byteCode.size
      this.compiler.emitU8(this.funcDef, 0) // Placeholder
    }

    // Patch catch offset
    const catchPos = this.funcDef.byteCode.size
    const catchOffset = catchPos - catchOffsetPos
    this.funcDef.byteCode.putU32At(catchOffsetPos, catchOffset)

    // Catch Handler
    if (hasCatch) {
      const catchClause = node.catchClause!
      
      // Store exception
      if (catchClause.variableDeclaration) {
        const name = (catchClause.variableDeclaration.name as ts.Identifier).text
        // We need to enter a new scope for the catch variable
        this.enterScope('block')
        
        // Add catch variable
        const scopeLevel = this.scopeStack.length - 1
        const varIdx = this.compiler.addVar(this.funcDef, name, false, false, scopeLevel)
        const currentScope = this.scopeStack[this.scopeStack.length - 1]
        currentScope.vars.set(name, {
          type: 'local',
          idx: varIdx,
          isLexical: false, // Catch variables are initialized immediately, so no TDZ check needed
          isConst: false
        })
        
        // Emit put_loc
        if (varIdx === 0) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc0)
        } else if (varIdx === 1) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc1)
        } else if (varIdx === 2) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc2)
        } else if (varIdx === 3) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc3)
        } else {
          this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc)
          this.compiler.emitU16(this.funcDef, varIdx)
        }
      } else {
        this.compiler.emitOp(this.funcDef, Opcode.OP_drop) // Drop exception if no variable
      }

      // If finally exists, we need another catch for the catch block
      let catch2OffsetPos = -1
      if (hasFinally) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_catch)
        catch2OffsetPos = this.funcDef.byteCode.size
        this.compiler.emitU32(this.funcDef, 0) // Placeholder
      }

      // Visit Catch Block
      this.visit(catchClause.block)
      const catchTerminated = this.isTerminated
      this.isTerminated = false

      if (catchClause.variableDeclaration) {
        this.exitScope()
      }

      if (!catchTerminated) {
        if (hasFinally) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_drop) // Drop catch handler 2
        }

        // Emit undefined + drop (to match WASM)
        this.compiler.emitOp(this.funcDef, Opcode.OP_undefined)
        
        if (hasFinally) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_gosub)
          const gosubOffsetPos = this.funcDef.byteCode.size
          this.compiler.emitU32(this.funcDef, 0) // Placeholder
          this.pendingLabels.push(`gosub_${gosubOffsetPos}`)
        }
        
        this.compiler.emitOp(this.funcDef, Opcode.OP_drop) // Drop undefined
        
        this.compiler.emitOp(this.funcDef, Opcode.OP_goto8)
        const gotoEndOffsetPos2 = this.funcDef.byteCode.size
        this.compiler.emitU8(this.funcDef, 0) // Placeholder
        
        // Patch goto end 2
        this.pendingLabels.push(`goto8_end_${gotoEndOffsetPos2}`)
      }

      // Patch catch 2
      if (hasFinally) {
        const catch2Pos = this.funcDef.byteCode.size
        const catch2Offset = catch2Pos - catch2OffsetPos
        this.funcDef.byteCode.putU32At(catch2OffsetPos, catch2Offset)
        
        // Catch 2 Handler (rethrow)
        this.compiler.emitOp(this.funcDef, Opcode.OP_gosub)
        const gosubOffsetPos = this.funcDef.byteCode.size
        this.compiler.emitU32(this.funcDef, 0) // Placeholder
        this.pendingLabels.push(`gosub_${gosubOffsetPos}`)
        
        this.compiler.emitOp(this.funcDef, Opcode.OP_throw)
      }

    } else {
      // No catch block, but we are here because of exception (and we have finally)
      // So we are in the catch handler of the try block
      
      // Execute finally
      this.compiler.emitOp(this.funcDef, Opcode.OP_gosub)
      const gosubOffsetPos = this.funcDef.byteCode.size
      this.compiler.emitU32(this.funcDef, 0) // Placeholder
      this.pendingLabels.push(`gosub_${gosubOffsetPos}`)
      
      // Rethrow
      this.compiler.emitOp(this.funcDef, Opcode.OP_throw)
    }

    // Finally Block Label
    if (hasFinally) {
      const finallyPos = this.funcDef.byteCode.size
      
      // Patch all gosubs
      for (let i = 0; i < this.pendingLabels.length; i++) {
        const label = this.pendingLabels[i]
        if (label.startsWith('gosub_')) {
          const pos = parseInt(label.split('_')[1])
          const offset = finallyPos - pos
          this.funcDef.byteCode.putU32At(pos, offset)
          this.pendingLabels.splice(i, 1)
          i--
        }
      }

      this.visit(node.finallyBlock)
      this.compiler.emitOp(this.funcDef, Opcode.OP_ret)
    }

    // End Label
    const endPos = this.funcDef.byteCode.size
    
    // Patch goto end 1
    if (gotoEndOffsetPos !== -1) {
      const gotoEndOffset = endPos - gotoEndOffsetPos
      if (gotoEndOffset > 127 || gotoEndOffset < -128) {
        throw new Error('Jump offset too large for goto8')
      }
      this.funcDef.byteCode.buffer[gotoEndOffsetPos] = gotoEndOffset
    }
    
    // Patch other goto ends
    for (let i = 0; i < this.pendingLabels.length; i++) {
      const label = this.pendingLabels[i]
      if (label.startsWith('goto_end_')) {
        const pos = parseInt(label.split('_')[2])
        const offset = endPos - pos
        this.funcDef.byteCode.putU32At(pos, offset)
        this.pendingLabels.splice(i, 1)
        i--
      } else if (label.startsWith('goto8_end_')) {
        const pos = parseInt(label.split('_')[2])
        const offset = endPos - pos
        if (offset > 127 || offset < -128) {
          throw new Error('Jump offset too large for goto8')
        }
        this.funcDef.byteCode.buffer[pos] = offset
        this.pendingLabels.splice(i, 1)
        i--
      }
    }
  }

  visitIfStatement(node: ts.IfStatement) {
    if (!this.funcDef) {
      return
    }

    // Optimization: if (cond) { break/continue; } -> if_true8 target
    if (!node.elseStatement) {
      let stmt = node.thenStatement
      if (ts.isBlock(stmt)) {
        if (stmt.statements.length === 1) {
          stmt = stmt.statements[0]
        } else {
          stmt = null as any
        }
      }
        
      if (stmt) {
        if (ts.isBreakStatement(stmt)) {
          let loopInfo: LoopInfo | undefined
          if (stmt.label) {
             const labelText = stmt.label.text
             for (let i = this.loopStack.length - 1; i >= 0; i--) {
                if (this.loopStack[i].labels.includes(labelText)) {
                  loopInfo = this.loopStack[i]
                  break
                }
             }
          } else {
             if (this.loopStack.length > 0) {
                loopInfo = this.loopStack[this.loopStack.length - 1]
             }
          }

          if (loopInfo) {
            this.visit(node.expression)
            this.compiler.emitJump(this.funcDef, Opcode.OP_if_true8, loopInfo.breakLabel)
            return
          }
        } else if (ts.isContinueStatement(stmt)) {
          let loopInfo: LoopInfo | undefined
          if (stmt.label) {
             const labelText = stmt.label.text
             for (let i = this.loopStack.length - 1; i >= 0; i--) {
                if (this.loopStack[i].type === 'loop' && this.loopStack[i].labels.includes(labelText)) {
                  loopInfo = this.loopStack[i]
                  break
                }
             }
          } else {
            for (let i = this.loopStack.length - 1; i >= 0; i--) {
              if (this.loopStack[i].type === 'loop') {
                loopInfo = this.loopStack[i]
                break
              }
            }
          }

          if (loopInfo) {
            this.visit(node.expression)
            this.compiler.emitJump(this.funcDef, Opcode.OP_if_true8, loopInfo.continueLabel!)
            return
          }
        }
      }
    }

    // 1. Condition
    this.visit(node.expression)

    // 2. Jump if false to else/end
    this.compiler.emitOp(this.funcDef, Opcode.OP_if_false8)
    const ifFalseOffsetPos = this.funcDef.byteCode.size
    this.compiler.emitU8(this.funcDef, 0) // Placeholder

    // 3. Then block
    this.visit(node.thenStatement)

    // 4. Jump to end (skip else)
    let gotoOffsetPos = -1
    if (node.elseStatement) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_goto8)
      gotoOffsetPos = this.funcDef.byteCode.size
      this.compiler.emitU8(this.funcDef, 0) // Placeholder
    }

    // 5. Patch if_false
    const elsePos = this.funcDef.byteCode.size
    const ifFalseOffset = elsePos - ifFalseOffsetPos
    if (ifFalseOffset > 127 || ifFalseOffset < -128) {
      // TODO: Handle long jumps (OP_if_false)
      throw new Error('Jump offset too large for if_false8')
    }
    this.funcDef.byteCode.buffer[ifFalseOffsetPos] = ifFalseOffset

    // 6. Else block
    if (node.elseStatement) {
      this.visit(node.elseStatement)
      
      // 7. Patch goto
      const endPos = this.funcDef.byteCode.size
      const gotoOffset = endPos - gotoOffsetPos
      if (gotoOffset > 127 || gotoOffset < -128) {
        // TODO: Handle long jumps (OP_goto)
        throw new Error('Jump offset too large for goto8')
      }

      this.funcDef.byteCode.buffer[gotoOffsetPos] = gotoOffset
    }
  }

  visitWhileStatement(node: ts.WhileStatement) {
    if (!this.funcDef) {
      return
    }

    const continueLabel = this.compiler.newLabel()
    this.compiler.markLabel(this.funcDef, continueLabel)
    const startPos = this.funcDef.byteCode.size

    // 1. Condition
    this.visit(node.expression)

    // 2. Jump if false to end
    this.compiler.emitOp(this.funcDef, Opcode.OP_if_false8)
    const ifFalseOffsetPos = this.funcDef.byteCode.size
    this.compiler.emitU8(this.funcDef, 0) // Placeholder

    // Push loop info
    const loopInfo: LoopInfo = {
      type: 'loop',
      labels: [...this.pendingLabels],
      breakLabel: this.compiler.newLabel(),
      continueLabel: continueLabel
    }
    this.loopStack.push(loopInfo)
    this.pendingLabels = []

    // 3. Body
    this.visit(node.statement)
    
    this.loopStack.pop()

    // 4. Jump back to start
    this.compiler.emitOp(this.funcDef, Opcode.OP_goto8)
    const gotoOffsetPos = this.funcDef.byteCode.size
    this.compiler.emitU8(this.funcDef, 0) // Placeholder
    const gotoOffset = startPos - gotoOffsetPos

    if (gotoOffset > 127 || gotoOffset < -128) {
      // TODO: Handle long jumps
      throw new Error('Jump offset too large for goto8')
    }

    this.funcDef.byteCode.buffer[gotoOffsetPos] = gotoOffset

    // 5. Patch if_false
    const endPos = this.funcDef.byteCode.size
    const ifFalseOffset = endPos - ifFalseOffsetPos

    if (ifFalseOffset > 127 || ifFalseOffset < -128) {
      // TODO: Handle long jumps
      throw new Error('Jump offset too large for if_false8')
    }

    this.funcDef.byteCode.buffer[ifFalseOffsetPos] = ifFalseOffset
    
    // Patch break jumps
    this.compiler.markLabel(this.funcDef, loopInfo.breakLabel)
  }

  visitDoStatement(node: ts.DoStatement) {
    if (!this.funcDef) {
      return
    }

    const startPos = this.funcDef.byteCode.size
    const continueLabel = this.compiler.newLabel()

    // Push loop info
    const loopInfo: LoopInfo = {
      type: 'loop',
      labels: [...this.pendingLabels],
      breakLabel: this.compiler.newLabel(),
      continueLabel: continueLabel
    }
    this.loopStack.push(loopInfo)
    this.pendingLabels = []

    // 1. Body
    this.visit(node.statement)
    
    // 2. Continue Target is here
    this.compiler.markLabel(this.funcDef, continueLabel)

    // 3. Condition
    this.visit(node.expression)

    // 4. Jump if true to start
    this.compiler.emitOp(this.funcDef, Opcode.OP_if_true8)
    const ifTrueOffsetPos = this.funcDef.byteCode.size
    this.compiler.emitU8(this.funcDef, 0) // Placeholder
    
    const ifTrueOffset = startPos - ifTrueOffsetPos
    if (ifTrueOffset > 127 || ifTrueOffset < -128) {
      throw new Error('Jump offset too large for if_true8')
    }
    this.funcDef.byteCode.buffer[ifTrueOffsetPos] = ifTrueOffset
    
    this.loopStack.pop()
    
    // 5. Break Target is here
    this.compiler.markLabel(this.funcDef, loopInfo.breakLabel)
  }

  visitConditionalExpression(node: ts.ConditionalExpression) {
    if (!this.funcDef) {
      return
    }
    
    this.visit(node.condition)
    
    // Emit if_false8 placeholder
    this.compiler.emitOp(this.funcDef, Opcode.OP_if_false8)
    const ifFalseOffsetPos = this.funcDef.byteCode.size
    this.compiler.emitU8(this.funcDef, 0) // Placeholder
    
    // True block
    this.visit(node.whenTrue)
    
    // Emit goto8 placeholder
    this.compiler.emitOp(this.funcDef, Opcode.OP_goto8)
    const gotoOffsetPos = this.funcDef.byteCode.size
    this.compiler.emitU8(this.funcDef, 0) // Placeholder
    
    // Target for if_false8 is here
    const elsePos = this.funcDef.byteCode.size
    
    // Patch if_false8
    // Offset = elsePos - ifFalseOffsetPos
    const ifFalseOffset = elsePos - ifFalseOffsetPos
    if (ifFalseOffset > 127 || ifFalseOffset < -128) {
      throw new Error('Jump offset too large for if_false8')
    }
    this.funcDef.byteCode.buffer[ifFalseOffsetPos] = ifFalseOffset
    
    // False block
    this.visit(node.whenFalse)
    
    // Target for goto8 is here
    const endPos = this.funcDef.byteCode.size
    
    // Patch goto8
    // Offset = endPos - gotoOffsetPos
    const gotoOffset = endPos - gotoOffsetPos
    if (gotoOffset > 127 || gotoOffset < -128) {
      throw new Error('Jump offset too large for goto8')
    }
    this.funcDef.byteCode.buffer[gotoOffsetPos] = gotoOffset
  }

  visitPostfixUnaryExpression(node: ts.PostfixUnaryExpression) {
    if (!this.funcDef) return

    if (ts.isIdentifier(node.operand)) {
      const name = node.operand.text
      
      const scopeInfo = this.findVarInScope(name)
      if (scopeInfo) {
        const idx = scopeInfo.idx
        
        // Emit get_var_ref (or check)
        if (scopeInfo.type === 'closure') {
          if (scopeInfo.isLexical) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref_check, node.getStart())
            this.compiler.emitU16(this.funcDef, idx)
          } else {
            if (idx === 0) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref0)
            } else if (idx === 1) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref1)
            } else if (idx === 2) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref2)
            } else if (idx === 3) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref3)
            } else {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref)
              this.compiler.emitU16(this.funcDef, idx)
            }
          }
        } else {
          // Local
          if (scopeInfo.isLexical) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc_check, node.getStart())
            this.compiler.emitU16(this.funcDef, idx)
          } else {
            if (idx === 0) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc0)
            } else if (idx === 1) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc1)
            } else if (idx === 2) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc2)
            } else if (idx === 3) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc3)
            } else {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc)
              this.compiler.emitU16(this.funcDef, idx)
            }
          }
        }
        
        // Emit post_inc/dec
        if (node.operator === ts.SyntaxKind.PlusPlusToken) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_post_inc, node.getEnd() - 2)
        } else {
          this.compiler.emitOp(this.funcDef, Opcode.OP_post_dec, node.getEnd() - 2)
        }
        
        // Emit put_var_ref (or check)
        if (scopeInfo.type === 'closure') {
          if (scopeInfo.isLexical) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref_check)
            this.compiler.emitU16(this.funcDef, idx)
          } else {
            if (idx === 0) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref0)
            } else if (idx === 1) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref1)
            } else if (idx === 2) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref2)
            } else if (idx === 3) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref3)
            } else {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref)
              this.compiler.emitU16(this.funcDef, idx)
            }
          }
        } else {
          // Local
          if (scopeInfo.isLexical) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc_check)
            this.compiler.emitU16(this.funcDef, idx)
          } else {
            if (idx === 0) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc0)
            } else if (idx === 1) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc1)
            } else if (idx === 2) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc2)
            } else if (idx === 3) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc3)
            } else {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc)
              this.compiler.emitU16(this.funcDef, idx)
            }
          }
        }
        return
      }

      const res = this.compiler.findVar(this.funcDef, name)

      if (res) {
        // Local variable
        // TODO: Handle locals
      } else {
        // Global variable
        const atom = this.compiler.addAtom(name)
        
        // Emit get_var
        this.compiler.emitAtomOp(this.funcDef, Opcode.OP_get_var, atom)
        
        // Emit post_inc/dec
        if (node.operator === ts.SyntaxKind.PlusPlusToken) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_post_inc)
        } else {
          this.compiler.emitOp(this.funcDef, Opcode.OP_post_dec)
        }
        
        // Emit put_var
        this.compiler.emitAtomOp(this.funcDef, Opcode.OP_put_var, atom)
      }
    }
  }

  visitPrefixUnaryExpression(node: ts.PrefixUnaryExpression) {
    if (!this.funcDef) {
      return
    }

    // Optimization for -1
    if (node.operator === ts.SyntaxKind.MinusToken && 
      ts.isNumericLiteral(node.operand) && 
      node.operand.text === '1') {
      this.compiler.emitOp(this.funcDef, Opcode.OP_push_minus1, node.getStart())
      return
    }

    this.visit(node.operand)
    switch (node.operator) {
      case ts.SyntaxKind.ExclamationToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_lnot)
        break
      case ts.SyntaxKind.TildeToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_not, node.getStart())
        break
      case ts.SyntaxKind.PlusToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_plus, node.getStart())
        break
      case ts.SyntaxKind.MinusToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_neg, node.getStart())
        break
      case ts.SyntaxKind.PlusPlusToken:
        // TODO: Pre-increment
        break
      case ts.SyntaxKind.MinusMinusToken:
        // TODO: Pre-decrement
        break
    }
  }

  visitTypeOfExpression(node: ts.TypeOfExpression) {
    if (!this.funcDef) {
      return
    }
    this.visit(node.expression)
    this.compiler.emitOp(this.funcDef, Opcode.OP_typeof)
  }

  visitVoidExpression(node: ts.VoidExpression) {
    if (!this.funcDef) {
      return
    }

    // Optimization: void literal -> undefined (skip evaluation and drop)
    if (ts.isNumericLiteral(node.expression) || 
      ts.isStringLiteral(node.expression) ||
      node.expression.kind === ts.SyntaxKind.NullKeyword ||
      node.expression.kind === ts.SyntaxKind.TrueKeyword ||
      node.expression.kind === ts.SyntaxKind.FalseKeyword) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_undefined)
      return
    }

    this.visit(node.expression)
    this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
    this.compiler.emitOp(this.funcDef, Opcode.OP_undefined)
  }

  visitObjectLiteralExpression(node: ts.ObjectLiteralExpression) {
    if (!this.funcDef) {
      return
    }

    this.compiler.emitOp(this.funcDef, Opcode.OP_object)

    for (const prop of node.properties) {
      if (ts.isSpreadAssignment(prop)) {
        this.visit(prop.expression)
        this.compiler.emitOp(this.funcDef, Opcode.OP_null)
        this.compiler.emitOp(this.funcDef, Opcode.OP_copy_data_properties)
        this.compiler.emitU8(this.funcDef, 6) // ENUMERABLE | CONFIGURABLE
        this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
        this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
      } else if (ts.isPropertyAssignment(prop)) {
        if (ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)) {
          const name = prop.name.text
          const atom = this.compiler.addAtom(name)
          
          this.visit(prop.initializer)
          
          this.compiler.emitAtomOp(this.funcDef, Opcode.OP_define_field, atom)
        } else if (ts.isComputedPropertyName(prop.name)) {
          this.visit(prop.name.expression)
          this.compiler.emitOp(this.funcDef, Opcode.OP_to_propkey)
          this.visit(prop.initializer)
          this.compiler.emitOp(this.funcDef, Opcode.OP_define_array_el)
          this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
        }
      } else if (ts.isShorthandPropertyAssignment(prop)) {
        const name = prop.name.text
        const atom = this.compiler.addAtom(name)
        this.visitIdentifier(prop.name)
        this.compiler.emitAtomOp(this.funcDef, Opcode.OP_define_field, atom)
      } else if (ts.isMethodDeclaration(prop)) {
        if (ts.isIdentifier(prop.name)) {
          const name = prop.name.text
          const atom = this.compiler.addAtom(name)
          
          this.visitMethodDefinition(prop)
          
          this.compiler.emitAtomOp(this.funcDef, Opcode.OP_define_method, atom)
          this.compiler.emitU8(this.funcDef, 4) // JS_PROP_CONFIGURABLE
        }
      }
    }
  }

  visitMethodDefinition(node: ts.MethodDeclaration) {
    if (!this.funcDef) {
      return
    }
    const parentFd = this.funcDef
    
    const fd = new FunctionDef(parentFd)
    // fd.funcName = this.compiler.addAtom(node.name.getText())
    fd.funcName = 0
    fd.jsMode = JSMode.JS_MODE_STRICT
    fd.funcKind = FunctionKind.JS_FUNC_NORMAL
    fd.filename = parentFd.filename
    fd.hasDebug = true
    fd.hasHomeObject = true // Methods have home object
    fd.sourcePos = node.getStart()
    
    // Add flags to match WASM
    fd.hasSimpleParameterList = true
    fd.newTargetAllowed = true
    fd.superAllowed = true
    fd.argumentsAllowed = true
    
    // Add arguments
    for (const param of node.parameters) {
      if (ts.isIdentifier(param.name)) {
        this.compiler.addArg(fd, param.name.text)
      }
    }
    
    this.compiler.addVar(fd, 'this', true, false, 0)
    
    const childIdx = this.compiler.addChild(parentFd, fd)
    
    this.compiler.emitOp(parentFd, Opcode.OP_fclosure8)
    this.compiler.emitU8(parentFd, childIdx)
    
    this.funcDef = fd
    
    // Initialize 'this'
    this.compiler.emitOp(fd, Opcode.OP_push_this, node.name.getStart())
    this.compiler.emitOp(fd, Opcode.OP_put_loc0, -1)

    // Push scope
    this.scopeStack.push({
      type: 'function',
      vars: new Map(),
      parent: this.scopeStack.length > 0 ? this.scopeStack[this.scopeStack.length - 1] : null,
      funcDef: fd
    })
    
    // Add 'this' to scope
    this.scopeStack[this.scopeStack.length - 1].vars.set('this', {
      type: 'local',
      idx: 0,
      isLexical: false,
      isConst: true
    })
    
    // Fix 'this' var properties to match WASM
    // WASM has scopeNext=0 (encoded as 1) and flags=0 (not const)
    if (fd.vars.length > 0) {
       fd.vars[0].scopeNext = 0
       fd.vars[0].isConst = false
    }

    if (node.body) {
      this.visit(node.body)
    }
    
    this.scopeStack.pop()
    
    // Epilogue
    // console.log('fd.byteCode:', fd.byteCode)
    if (fd.byteCode.size === 0 || (fd.byteCode.buffer[fd.byteCode.size - 1] !== Opcode.OP_return && fd.byteCode.buffer[fd.byteCode.size - 1] !== Opcode.OP_return_undef)) {
      this.compiler.emitOp(fd, Opcode.OP_undefined)
      this.compiler.emitOp(fd, Opcode.OP_return)
    }
    
    this.compiler.computePc2LineInfo(fd)
    this.funcDef = parentFd
  }

  visitArrayLiteralExpression(node: ts.ArrayLiteralExpression) {
    if (!this.funcDef) {
      return
    }

    const hasSpread = node.elements.some(e => ts.isSpreadElement(e))

    if (hasSpread) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_array_from)
      this.compiler.emitU16(this.funcDef, 0) // Empty array
      this.compiler.emitOp(this.funcDef, Opcode.OP_push_0) // Index 0
      
      for (const elem of node.elements) {
        if (ts.isSpreadElement(elem)) {
          this.visit(elem.expression)
          this.compiler.emitOp(this.funcDef, Opcode.OP_append)
        } else {
          this.visit(elem)
          this.compiler.emitOp(this.funcDef, Opcode.OP_define_array_el)
          this.compiler.emitOp(this.funcDef, Opcode.OP_inc) // increment index
        }
      }
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop) // drop index
    } else {
      for (const elem of node.elements) {
        this.visit(elem)
      }
      
      // Manual stack adjustment for array_from (pops n, pushes 1)
      // emitOp handles push 1. We need to handle pop n.
      this.funcDef.stackLevel -= node.elements.length
      this.compiler.emitOp(this.funcDef, Opcode.OP_array_from)
      this.compiler.emitU16(this.funcDef, node.elements.length)
    }
  }

  visitElementAccessExpression(node: ts.ElementAccessExpression) {
    if (!this.funcDef) {
      return
    }
    
    this.visit(node.expression)
    this.visit(node.argumentExpression)
    
    this.compiler.emitOp(this.funcDef, Opcode.OP_get_array_el, node.expression.getEnd())
  }

  visitBinaryExpression(node: ts.BinaryExpression) {
    if (!this.funcDef) {
      return
    }

    // Logical operators (&&, ||, ??) handle their own visiting and jumps
    if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken ||
      node.operatorToken.kind === ts.SyntaxKind.BarBarToken ||
      node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) {
      
      this.visit(node.left)
      this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
      
      let jumpOp: Opcode
      if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
        jumpOp = Opcode.OP_if_false8
      } else if (node.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
        jumpOp = Opcode.OP_if_true8
      } else {
        // ??
        this.compiler.emitOp(this.funcDef, Opcode.OP_is_undefined_or_null)
        jumpOp = Opcode.OP_if_false8
      }
      
      this.compiler.emitOp(this.funcDef, jumpOp)
      const jumpPos = this.funcDef.byteCode.size
      this.compiler.emitU8(this.funcDef, 0) // Placeholder
      
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
      this.visit(node.right)
      
      // Patch jump
      const endPos = this.funcDef.byteCode.size
      const offset = endPos - jumpPos
      if (offset > 127 || offset < -128) {
        throw new Error('Jump offset too large for logical operator')
      }
      this.funcDef.byteCode.buffer[jumpPos] = offset
      return
    }

    if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      if (ts.isPropertyAccessExpression(node.left) && ts.isPrivateIdentifier(node.left.name)) {
          this.visit(node.left.expression)
          this.visit(node.right)
          
          if (!ts.isExpressionStatement(node.parent)) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
            this.compiler.emitOp(this.funcDef, Opcode.OP_perm3)
          }
          
          const propName = node.left.name.text
          const varInfo = this.findVarInScope(propName)
          if (!varInfo) {
              throw new Error(`Private field '${propName}' not found`)
          }
          this.emitGetVar(varInfo)
          
          this.compiler.emitOp(this.funcDef, Opcode.OP_put_private_field)
          return
      }

      if (ts.isIdentifier(node.left)) {
        this.visit(node.right)
        
        // Always dup the value, because assignment expression returns value
        this.compiler.emitOp(this.funcDef, Opcode.OP_dup)

        const name = node.left.text
        const scopeInfo = this.findVarInScope(name)
        
        if (scopeInfo) {
          if (scopeInfo.type === 'closure') {
            const idx = scopeInfo.idx
            if (scopeInfo.isLexical) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref_check, node.getStart())
              this.compiler.emitU16(this.funcDef, idx)
            } else {
              if (idx === 0) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref0, node.getStart())
              } else if (idx === 1) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref1, node.getStart())
              } else if (idx === 2) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref2, node.getStart())
              } else if (idx === 3) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref3, node.getStart())
              } else {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref, node.getStart())
                this.compiler.emitU16(this.funcDef, idx)
              }
            }
          } else {
            // Local
            const idx = scopeInfo.idx
            if (scopeInfo.isLexical) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc_check, node.getStart())
              this.compiler.emitU16(this.funcDef, idx)
            } else {
              if (idx === 0) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc0, node.getStart())
              } else if (idx === 1) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc1, node.getStart())
              } else if (idx === 2) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc2, node.getStart())
              } else if (idx === 3) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc3, node.getStart())
              } else {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc, node.getStart())
                this.compiler.emitU16(this.funcDef, idx)
              }
            }
          }
        } else {
          const atom = this.compiler.addAtom(name)
          this.compiler.emitAtomOp(this.funcDef, Opcode.OP_put_var, atom, node.getStart())
        }
      } else if (ts.isPropertyAccessExpression(node.left)) {
        if (ts.isIdentifier(node.left.name)) {
          const name = node.left.name.text
          const atom = this.compiler.addAtom(name)
          
          this.visit(node.left.expression)
          this.visit(node.right)
          
          if (!ts.isExpressionStatement(node.parent)) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_insert2)
          }

          this.compiler.emitAtomOp(this.funcDef, Opcode.OP_put_field, atom)
        }
      }

      return
    }

    if (node.operatorToken.kind === ts.SyntaxKind.PlusEqualsToken) {
      if (ts.isPropertyAccessExpression(node.left) && ts.isIdentifier(node.left.name)) {
        const name = node.left.name.text
        const atom = this.compiler.addAtom(name)
        
        this.visit(node.left.expression)
        // Emit get_field2 (pushes [obj, val])
        this.compiler.emitAtomOp(this.funcDef, Opcode.OP_get_field2, atom)
        
        this.visit(node.right)
        this.compiler.emitOp(this.funcDef, Opcode.OP_add)
        
        // Emit put_field (pops [val, obj])
        this.compiler.emitAtomOp(this.funcDef, Opcode.OP_put_field, atom)
        return
      }
    }

    this.visit(node.left)
    this.visit(node.right)
    
    switch (node.operatorToken.kind) {
      case ts.SyntaxKind.PlusToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_add, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.MinusToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_sub, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.AsteriskToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_mul, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.SlashToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_div, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.PercentToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_mod, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.LessThanToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_lt, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.GreaterThanToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_gt, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.LessThanEqualsToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_lte, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.GreaterThanEqualsToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_gte, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.EqualsEqualsToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_eq, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.ExclamationEqualsToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_neq, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.EqualsEqualsEqualsToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_strict_eq, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.ExclamationEqualsEqualsToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_strict_neq, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.AmpersandToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_and, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.BarToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_or, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.CaretToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_xor, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.LessThanLessThanToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_shl, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.GreaterThanGreaterThanToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_sar, node.operatorToken.getStart())
        break
      case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_shr, node.operatorToken.getStart())
        break
      // ... other operators
    }
  }

  visitDeleteExpression(node: ts.DeleteExpression) {
    if (!this.funcDef) {
      return
    }
    
    if (ts.isPropertyAccessExpression(node.expression)) {
      this.visit(node.expression.expression) // obj
      const propName = node.expression.name.text
      const atom = this.compiler.addAtom(propName)
      this.compiler.emitAtomOp(this.funcDef, Opcode.OP_push_atom_value, atom, node.expression.expression.getEnd())
      this.compiler.emitOp(this.funcDef, Opcode.OP_delete, node.expression.expression.getEnd())
    } else if (ts.isElementAccessExpression(node.expression)) {
      this.visit(node.expression.expression) // obj
      this.visit(node.expression.argumentExpression) // prop
      // OP_delete expects value, key. No need for to_propkey if it's already a value?
      // QuickJS emits to_propkey usually?
      // Let's assume yes for safety or check WASM later.
      // this.compiler.emitOp(this.funcDef, Opcode.OP_to_propkey) 
      this.compiler.emitOp(this.funcDef, Opcode.OP_delete, node.expression.expression.getEnd())
    } else if (ts.isIdentifier(node.expression)) {
      // delete var
      const name = node.expression.text
      const atom = this.compiler.addAtom(name)
      this.compiler.emitAtomOp(this.funcDef, Opcode.OP_delete_var, atom, node.getStart())
    } else {
      // delete expr -> true (if not a reference)
      this.visit(node.expression)
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
      this.compiler.emitOp(this.funcDef, Opcode.OP_push_true)
    }
  }

  visitArrowFunction(node: ts.ArrowFunction) {
    if (!this.funcDef) {
      return
    }
    const parentFd = this.funcDef
    
    // Create child function def
    const fd = new FunctionDef(parentFd)
    fd.funcName = 0 // Anonymous (JS_ATOM_NULL)
    fd.jsMode = JSMode.JS_MODE_STRICT
    fd.funcKind = FunctionKind.JS_FUNC_NORMAL
    fd.filename = parentFd.filename
    fd.hasDebug = true
    fd.sourcePos = node.getStart()
    
    // Arrow function specific flags
    fd.hasPrototype = false
    fd.hasArgumentsBinding = false
    fd.hasThisBinding = false
    fd.newTargetAllowed = false
    fd.hasSimpleParameterList = true
    fd.argumentsAllowed = true // Arrow functions seem to have this set in QuickJS WASM
    
    // Add arguments
    for (const param of node.parameters) {
      if (ts.isIdentifier(param.name)) {
        this.compiler.addArg(fd, param.name.text)
      }
    }
    
    // Add child to parent cpool
    const childIdx = this.compiler.addChild(parentFd, fd)
    
    // Emit fclosure
    this.compiler.emitOp(parentFd, Opcode.OP_fclosure8)
    this.compiler.emitU8(parentFd, childIdx)
    
    // Switch context
    this.funcDef = fd
    
    // Visit body
    if (ts.isBlock(node.body)) {
      // Custom visitBlock for Arrow Function to control scope level
      // QuickJS WASM emits scope level 1 for arrow function locals (same as module level?)
      // while Function Declaration locals are level 2.
      
      this.enterScope('block')
      
      // Hoist block-scoped variables (let/const)
      for (const stmt of node.body.statements) {
        if (ts.isVariableStatement(stmt)) {
          const isLet = (stmt.declarationList.flags & ts.NodeFlags.Let) !== 0
          const isConst = (stmt.declarationList.flags & ts.NodeFlags.Const) !== 0
          if (isLet || isConst) {
            for (const decl of stmt.declarationList.declarations) {
              if (ts.isIdentifier(decl.name)) {
                const name = decl.name.text
                const currentScope = this.scopeStack[this.scopeStack.length - 1]
                if (!currentScope.vars.has(name)) {
                  // Add as local var
                  // FORCE SCOPE LEVEL 1 (scopeStack.length - 1)
                  const scopeLevel = this.scopeStack.length - 1
                  const varIdx = this.compiler.addVar(this.funcDef!, name, isConst, true, scopeLevel)
                  currentScope.vars.set(name, {
                    type: 'local',
                    idx: varIdx,
                    isLexical: true,
                    isConst
                  })
                  
                  // Emit set_loc_uninitialized
                  this.compiler.emitOp(this.funcDef!, Opcode.OP_set_loc_uninitialized)
                  this.compiler.emitU16(this.funcDef!, varIdx)
                }
              }
            }
          }
        }
      }
      
      // Visit statements
      for (const stmt of node.body.statements) {
        this.visit(stmt)
      }
      
      this.exitScope()
      
      // Implicit return undefined if no return?
      // QuickJS emits return_undef at end if not returned.
    } else {
      // Expression body
      this.visit(node.body)
      // Implicit return
      this.compiler.emitReturn(fd, true)
    }
    
    // Epilogue
    if (fd.byteCode.size === 0 || (fd.byteCode.buffer[fd.byteCode.size - 1] !== Opcode.OP_return && fd.byteCode.buffer[fd.byteCode.size - 1] !== Opcode.OP_return_undef && fd.byteCode.buffer[fd.byteCode.size - 1] !== Opcode.OP_return_async)) {
      this.compiler.emitOp(fd, Opcode.OP_undefined)
      this.compiler.emitOp(fd, Opcode.OP_return)
    }
    
    this.compiler.computePc2LineInfo(fd)
    this.funcDef = parentFd
  }

  emitGetVar(varInfo: VarInfo, pos?: number) {
    if (varInfo.type === 'closure') {
      const idx = varInfo.idx
      if (varInfo.isLexical) {
        this.compiler.emitOp(this.funcDef!, Opcode.OP_get_var_ref_check, pos)
        this.compiler.emitU16(this.funcDef!, idx)
      } else {
        if (idx === 0) {
          this.compiler.emitOp(this.funcDef!, Opcode.OP_get_var_ref0, pos)
        } else if (idx === 1) {
          this.compiler.emitOp(this.funcDef!, Opcode.OP_get_var_ref1, pos)
        } else if (idx === 2) {
          this.compiler.emitOp(this.funcDef!, Opcode.OP_get_var_ref2, pos)
        } else if (idx === 3) {
          this.compiler.emitOp(this.funcDef!, Opcode.OP_get_var_ref3, pos)
        } else {
          this.compiler.emitOp(this.funcDef!, Opcode.OP_get_var_ref, pos)
          this.compiler.emitU16(this.funcDef!, idx)
        }
      }
    } else {
      // Local
      const idx = varInfo.idx
      if (varInfo.isLexical) {
        this.compiler.emitOp(this.funcDef!, Opcode.OP_get_loc_check, pos)
        this.compiler.emitU16(this.funcDef!, idx)
      } else {
        if (idx === 0) {
          this.compiler.emitOp(this.funcDef!, Opcode.OP_get_loc0, pos)
        } else if (idx === 1) {
          this.compiler.emitOp(this.funcDef!, Opcode.OP_get_loc1, pos)
        } else if (idx === 2) {
          this.compiler.emitOp(this.funcDef!, Opcode.OP_get_loc2, pos)
        } else if (idx === 3) {
          this.compiler.emitOp(this.funcDef!, Opcode.OP_get_loc3, pos)
        } else {
          this.compiler.emitOp(this.funcDef!, Opcode.OP_get_loc, pos)
          this.compiler.emitU16(this.funcDef!, idx)
        }
      }
    }
  }

  visitIdentifier(node: ts.Identifier) {
    if (!this.funcDef) {
      return
    }
    const name = node.text
    
    if (name === 'undefined') {
      this.compiler.emitAtomOp(this.funcDef, Opcode.OP_get_var, JSAtom.JS_ATOM_undefined, node.getStart())
      return
    }

    const scopeInfo = this.findVarInScope(name)
    if (scopeInfo) {
      if (scopeInfo.type === 'closure') {
        const idx = scopeInfo.idx
        if (scopeInfo.isLexical) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref_check, node.getStart())
          this.compiler.emitU16(this.funcDef, idx)
        } else {
          if (idx === 0) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref0, node.getStart())
          } else if (idx === 1) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref1, node.getStart())
          } else if (idx === 2) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref2, node.getStart())
          } else if (idx === 3) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref3, node.getStart())
          } else {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref, node.getStart())
            this.compiler.emitU16(this.funcDef, idx)
          }
        }
      } else {
        // Local
        const idx = scopeInfo.idx
        if (scopeInfo.isLexical) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc_check, node.getStart())
          this.compiler.emitU16(this.funcDef, idx)
        } else {
          if (idx === 0) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc0, node.getStart())
          } else if (idx === 1) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc1, node.getStart())
          } else if (idx === 2) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc2, node.getStart())
          } else if (idx === 3) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc3, node.getStart())
          } else {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc, node.getStart())
            this.compiler.emitU16(this.funcDef, idx)
          }
        }
      }

      return
    }    
    
    const res = this.compiler.findVar(this.funcDef, name)
    
    if (res) {
      if (res.isArg) {
        if (res.idx === 0) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg0, node.getStart())
        } else if (res.idx === 1) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg1, node.getStart())
        } else if (res.idx === 2) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg2, node.getStart())
        } else if (res.idx === 3) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg3, node.getStart())
        } else {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg, node.getStart())
          this.compiler.emitU16(this.funcDef, res.idx)
        }
      } else {
        // Emit get_var
        // ...
      }
    } else {
      // Global variable
      const atom = this.compiler.addAtom(name)
      this.compiler.emitAtomOp(this.funcDef, Opcode.OP_get_var, atom, node.getStart())
    }
  }

  visitThisKeyword(node: ts.ThisExpression) {
    if (!this.funcDef) return
    
    const scopeInfo = this.findVarInScope('this')
    if (scopeInfo) {
      const idx = scopeInfo.idx
      if (scopeInfo.type === 'closure') {
         // Should not happen for 'this' usually?
         // But if captured, maybe?
         // For now assume local
      } else {
         // Local
         if (idx === 0) this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc0, -1)
         else if (idx === 1) this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc1, -1)
         else {
             this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc, -1)
             this.compiler.emitU16(this.funcDef, idx)
         }
      }
    } else {
      this.compiler.emitOp(this.funcDef, Opcode.OP_push_this)
    }
  }
}
