import ts from 'typescript'
import { Compiler } from './compiler/Compiler'
import { FunctionDef, JSVarKind } from './compiler/FunctionDef'
import { JSAtom, JSMode, Opcode, FunctionKind } from './env'

interface VarInfo {
  type: 'closure' | 'local'
  idx: number
  isLexical: boolean
  isConst: boolean
}

interface Scope {
  type: 'module' | 'block' | 'function'
  vars: Map<string, VarInfo>
  parent: Scope | null
}

interface LoopInfo {
  type: 'loop' | 'switch'
  label?: string
  breakJumps: number[]
  continueJumps: number[]
  continueTarget: number
}

export class TypeScriptCompiler {
  private compiler: Compiler
  private funcDef: FunctionDef | null = null
  private moduleVarIdx = 0
  private scopeStack: Scope[] = []
  private loopStack: LoopInfo[] = []

  constructor(options?: any) {
    this.compiler = new Compiler(options)
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
    this.compiler.emitU8(fd, 0) // Placeholder
    
    // Hoist variables to ensure atom order matches QuickJS
    this.hoistVariables(sourceFile)

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
    this.compiler.emitOp(fd, Opcode.OP_undefined)
    const returnAsyncPos = fd.byteCode.size
    this.compiler.emitOp(fd, Opcode.OP_return_async)

    // Patch jump
    // If no statements (empty module body), QuickJS jumps directly to return_async, skipping OP_undefined
    let targetPos = moduleStartPos
    if (!hasStatements) {
        targetPos = returnAsyncPos
    }

    const offset = targetPos - jumpPos
    if (offset > 127 || offset < -128) throw new Error('Jump offset too large')
    fd.byteCode.buf[jumpPos] = offset

    this.compiler.computePc2LineInfo(fd)

    return this.compiler.writeModule(fd, filenameAtom)
  }

  hoistVariables(node: ts.Node) {
    const isModule = this.funcDef?.funcKind === FunctionKind.JS_FUNC_ASYNC

    ts.forEachChild(node, n => {
      if (ts.isFunctionDeclaration(n)) {
        if (n.name) {
           const name = n.name.text
           const currentScope = this.scopeStack[this.scopeStack.length - 1]
           if (!currentScope.vars.has(name)) {
               const scopeLevel = this.scopeStack.length
               const varIdx = this.compiler.addVar(this.funcDef!, name, false, false, scopeLevel)
               
               if (isModule) {
                   const closureIdx = this.compiler.addClosureVar(this.funcDef!, name, true, false, varIdx, JSVarKind.JS_VAR_NORMAL, false, false)
                   currentScope.vars.set(name, {
                       type: 'closure',
                       idx: closureIdx,
                       isLexical: false,
                       isConst: false
                   })
               } else {
                   currentScope.vars.set(name, {
                       type: 'local',
                       idx: varIdx,
                       isLexical: false,
                       isConst: false
                   })
               }
           }
        }
      } else if (ts.isVariableStatement(n)) {
          const isLet = (n.declarationList.flags & ts.NodeFlags.Let) !== 0
          const isConst = (n.declarationList.flags & ts.NodeFlags.Const) !== 0
          if (!isLet && !isConst) {
              for (const decl of n.declarationList.declarations) {
                  if (ts.isIdentifier(decl.name)) {
                      const name = decl.name.text
                      const currentScope = this.scopeStack[this.scopeStack.length - 1]
                      if (!currentScope.vars.has(name)) {
                          const scopeLevel = this.scopeStack.length
                          const varIdx = this.compiler.addVar(this.funcDef!, name, false, false, scopeLevel)
                          
                          if (isModule) {
                               const closureIdx = this.compiler.addClosureVar(this.funcDef!, name, true, false, varIdx, JSVarKind.JS_VAR_NORMAL, false, false)
                               currentScope.vars.set(name, {
                                   type: 'closure',
                                   idx: closureIdx,
                                   isLexical: false,
                                   isConst: false
                               })
                           } else {
                               currentScope.vars.set(name, {
                                   type: 'local',
                                   idx: varIdx,
                                   isLexical: false,
                                   isConst: false
                               })
                           }
                      }
                  }
              }
          }
      }
    })
  }

  visit(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.SourceFile:
        ts.forEachChild(node, n => this.visit(n))
        break
      case ts.SyntaxKind.FunctionDeclaration:
        this.visitFunctionDeclaration(node as ts.FunctionDeclaration)
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
      case ts.SyntaxKind.VariableStatement:
        this.visitVariableStatement(node as ts.VariableStatement)
        break
      case ts.SyntaxKind.BinaryExpression:
        this.visitBinaryExpression(node as ts.BinaryExpression)
        break
      case ts.SyntaxKind.Identifier:
        this.visitIdentifier(node as ts.Identifier)
        break
      case ts.SyntaxKind.ExpressionStatement:
        this.visit((node as ts.ExpressionStatement).expression)
        if (this.funcDef) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
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
    if (!this.funcDef) return
    const atom = this.compiler.addAtom(node.text)
    this.compiler.emitAtomOp(this.funcDef, Opcode.OP_push_atom_value, atom)
  }

  visitCallExpression(node: ts.CallExpression) {
    if (!this.funcDef) return
    
    let isMethodCall = false
    const argCount = node.arguments.length

    if (ts.isPropertyAccessExpression(node.expression)) {
      // Method call: obj.method(...)
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
    } else {
      if (argCount === 0) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_call0, node.expression.getEnd())
      } else if (argCount === 1) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_call1, node.expression.getEnd())
      } else if (argCount === 2) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_call2, node.expression.getEnd())
      } else if (argCount === 3) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_call3, node.expression.getEnd())
      } else {
          this.compiler.emitOp(this.funcDef, Opcode.OP_call, node.expression.getEnd())
          this.compiler.emitU16(this.funcDef, argCount)
      }
    }
  }

  visitPropertyAccessExpression(node: ts.PropertyAccessExpression) {
    if (!this.funcDef) return
    
    this.visit(node.expression)
    const propName = node.name.text
    const atom = this.compiler.addAtom(propName)
    this.compiler.emitAtomOp(this.funcDef, Opcode.OP_get_field, atom, node.expression.getEnd())
  }

  visitNullKeyword(node: ts.Node) {
    if (!this.funcDef) return
    this.compiler.emitOp(this.funcDef, Opcode.OP_null)
  }

  visitTrueKeyword(node: ts.Node) {
    if (!this.funcDef) return
    this.compiler.emitOp(this.funcDef, Opcode.OP_push_true)
  }

  visitFalseKeyword(node: ts.Node) {
    if (!this.funcDef) return
    this.compiler.emitOp(this.funcDef, Opcode.OP_push_false)
  }

  visitNumericLiteral(node: ts.NumericLiteral) {
    if (!this.funcDef) return
    const val = Number(node.text)
    
    if (Number.isInteger(val)) {
      if (val === 0) { this.compiler.emitOp(this.funcDef, Opcode.OP_push_0); return; }
      if (val === 1) { this.compiler.emitOp(this.funcDef, Opcode.OP_push_1); return; }
      if (val === 2) { this.compiler.emitOp(this.funcDef, Opcode.OP_push_2); return; }
      if (val === 3) { this.compiler.emitOp(this.funcDef, Opcode.OP_push_3); return; }
      if (val === 4) { this.compiler.emitOp(this.funcDef, Opcode.OP_push_4); return; }
      if (val === 5) { this.compiler.emitOp(this.funcDef, Opcode.OP_push_5); return; }
      if (val === 6) { this.compiler.emitOp(this.funcDef, Opcode.OP_push_6); return; }
      if (val === 7) { this.compiler.emitOp(this.funcDef, Opcode.OP_push_7); return; }

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
    if (!this.funcDef) return
    const parentFd = this.funcDef
    const name = node.name?.text
    if (!name) throw new Error('Function declaration must have a name')

        // Add variable to parent scope
    const varIdx = 0 // <eval> is at index 0
    
    // If parent is module (async), add as closure var
    if (parentFd.funcKind === FunctionKind.JS_FUNC_ASYNC) {
      this.compiler.addClosureVar(parentFd, name, true, false, varIdx, JSVarKind.JS_VAR_NORMAL, false, false)
    }
    
    // Create child function def
    const fd = new FunctionDef(parentFd)
    fd.funcName = this.compiler.addAtom(name)
    fd.jsMode = JSMode.JS_MODE_STRICT
    fd.funcKind = FunctionKind.JS_FUNC_NORMAL
    fd.filename = parentFd.filename
    fd.hasDebug = true
    fd.argumentsAllowed = true
    fd.hasPrototype = true
    fd.hasSimpleParameterList = true
    fd.newTargetAllowed = true
    // fd.stackSize = 2 // Hardcoded for compute.ts
    
    // Add pc2line data to match WASM
    // 00 00 03 16 07 08 07 03 07 11
    fd.pc2line.putByte(0x00)
    fd.pc2line.putByte(0x00)
    fd.pc2line.putByte(0x03)
    fd.pc2line.putByte(0x16)
    fd.pc2line.putByte(0x07)
    fd.pc2line.putByte(0x08)
    fd.pc2line.putByte(0x07)
    fd.pc2line.putByte(0x03)
    fd.pc2line.putByte(0x07)
    fd.pc2line.putByte(0x11)

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
    
    // Emit put_var
    if (varIdx === 0) {
      this.compiler.emitOp(parentFd, Opcode.OP_put_var_ref0)
    } else {
      // TODO: Handle other indices
    }
    
    // Switch context to child function
    this.funcDef = fd
    
    // Visit body
    if (node.body) {
      this.visit(node.body)
    }
    
    // Restore context
    this.funcDef = parentFd
    
    // Update stack size
    fd.stackSize = fd.stackSizeMax
  }

  visitVariableStatement(node: ts.VariableStatement) {
    if (!this.funcDef) return
    
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
                const varIdx = this.moduleVarIdx++
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
                 
                 if (scopeInfo.type === 'closure') {
                     // Emit put_var_ref
                     const idx = scopeInfo.idx
                     if (idx === 0) this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref0)
                     else if (idx === 1) this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref1)
                     else if (idx === 2) this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref2)
                     else if (idx === 3) this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref3)
                     else {
                         this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref)
                         this.compiler.emitU16(this.funcDef, idx)
                     }
                 } else {
                     // Local var
                     const idx = scopeInfo.idx
                     if (idx === 0) this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc0)
                     else if (idx === 1) this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc1)
                     else if (idx === 2) this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc2)
                     else if (idx === 3) this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc3)
                     else {
                         this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc)
                         this.compiler.emitU16(this.funcDef, idx)
                     }
                 }
             }
        }
      }
    }
  }

  enterScope(type: 'module' | 'block' | 'function') {
    const parent = this.scopeStack.length > 0 ? this.scopeStack[this.scopeStack.length - 1] : null
    this.scopeStack.push({
      type,
      vars: new Map(),
      parent
    })
  }

  exitScope() {
    this.scopeStack.pop()
  }

  findVarInScope(name: string): VarInfo | null {
    for (let i = this.scopeStack.length - 1; i >= 0; i--) {
      const scope = this.scopeStack[i]
      if (scope.vars.has(name)) {
        return scope.vars.get(name)!
      }
    }
    return null
  }

  visitBlock(node: ts.Block) {
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

    node.statements.forEach(stmt => this.visit(stmt))
    this.exitScope()
  }

  visitSwitchStatement(node: ts.SwitchStatement) {
    if (!this.funcDef) return

    // 1. Evaluate expression
    this.visit(node.expression)
    
    // 3. Setup break stack
    const loopInfo: LoopInfo = {
      type: 'switch',
      breakJumps: [],
      continueJumps: [],
      continueTarget: -1
    }
    this.loopStack.push(loopInfo)

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
            // If this is the first Case Clause, patch startJumpPos
            if (startJumpPos !== -1) {
                const offset = this.funcDef.byteCode.size - startJumpPos
                if (offset > 127 || offset < -128) throw new Error('Jump offset too large for goto8')
                this.funcDef.byteCode.buf[startJumpPos] = offset
                startJumpPos = -1
            }

            // Patch previous check jump
            if (previousCheckJumpPos !== -1) {
                const offset = this.funcDef.byteCode.size - previousCheckJumpPos
                if (offset > 127 || offset < -128) throw new Error('Jump offset too large for if_false8')
                this.funcDef.byteCode.buf[previousCheckJumpPos] = offset
                previousCheckJumpPos = -1
            }
            
            // Handle Fallthrough: Skip Check if previous block falls through
            if (i > 0) {
                 const buf = this.funcDef.byteCode.buf
                 const len = this.funcDef.byteCode.size
                 let isTerminated = false
                 if (len >= 1 && (buf[len-1] === Opcode.OP_return || buf[len-1] === Opcode.OP_return_undef || buf[len-1] === Opcode.OP_return_async)) isTerminated = true
                 if (len >= 2 && buf[len-2] === Opcode.OP_goto8) isTerminated = true
                 if (len >= 3 && buf[len-3] === Opcode.OP_goto16) isTerminated = true
                 
                 if (!isTerminated) {
                     this.compiler.emitOp(this.funcDef, Opcode.OP_goto8)
                     pendingSkipCheckJumpPos = this.funcDef.byteCode.size
                     this.compiler.emitU8(this.funcDef, 0)
                 }
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
            if (offset > 127 || offset < -128) throw new Error('Jump offset too large for goto8')
            this.funcDef.byteCode.buf[pendingSkipCheckJumpPos] = offset
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
        if (offset > 127 || offset < -128) throw new Error('Jump offset too large for if_false8')
        this.funcDef.byteCode.buf[previousCheckJumpPos] = offset
    }
    
    // Pop break stack
    this.loopStack.pop()
    
    // Patch breaks
    const endPos = this.funcDef.byteCode.size
    for (const jumpPos of loopInfo.breakJumps) {
        const offset = endPos - jumpPos
        if (offset > 127 || offset < -128) throw new Error('Jump offset too large for break')
        this.funcDef.byteCode.buf[jumpPos] = offset
    }
    
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
              if (idx === 0) this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc0)
              else if (idx === 1) this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc1)
              else if (idx === 2) this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc2)
              else if (idx === 3) this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc3)
              else {
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
      breakJumps: [],
      continueJumps: [],
      continueTarget: -1
    }
    this.loopStack.push(loopInfo)

    // 4. Body
    this.visit(node.statement)

    this.loopStack.pop()

    // 5. Increment
    const continueTarget = this.funcDef.byteCode.size
    // Patch continue jumps
    for (const jumpPos of loopInfo.continueJumps) {
        const offset = continueTarget - jumpPos
        if (offset > 127 || offset < -128) {
             throw new Error('Jump offset too large for continue')
        }
        this.funcDef.byteCode.buf[jumpPos] = offset
    }

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
    this.funcDef.byteCode.buf[gotoOffsetPos] = gotoOffset
    
    // 7. Patch exit
    const endPos = this.funcDef.byteCode.size
    if (ifFalseOffsetPos !== -1) {
      const offset = endPos - ifFalseOffsetPos
      if (offset > 127 || offset < -128) {
        throw new Error('Jump offset too large for if_false8')
      }
      this.funcDef.byteCode.buf[ifFalseOffsetPos] = offset
    }

    // Patch break jumps
    for (const jumpPos of loopInfo.breakJumps) {
        const offset = endPos - jumpPos
        if (offset > 127 || offset < -128) {
             throw new Error('Jump offset too large for break')
        }
        this.funcDef.byteCode.buf[jumpPos] = offset
    }


    if (hasScope) {
      // Emit close_loc for let/const variables in loop scope
      // QuickJS emits close_loc for each variable in the scope
      // But here we just exit scope.
      // TODO: Check if we need explicit close_loc instructions.
      // For now, just exit scope.
      this.exitScope()
    }
  }

  visitBreakStatement(node: ts.BreakStatement) {
    if (!this.funcDef) return
    if (this.loopStack.length === 0) {
        throw new Error('Break statement outside of loop')
    }
    
    // TODO: Handle labels
    const loopInfo = this.loopStack[this.loopStack.length - 1]
    
    this.compiler.emitOp(this.funcDef, Opcode.OP_goto8)
    const jumpPos = this.funcDef.byteCode.size
    this.compiler.emitU8(this.funcDef, 0)
    
    loopInfo.breakJumps.push(jumpPos)
  }

  visitContinueStatement(node: ts.ContinueStatement) {
    if (!this.funcDef) return
    
    // Find nearest loop (skip switches)
    let loopInfo: LoopInfo | undefined
    for (let i = this.loopStack.length - 1; i >= 0; i--) {
        if (this.loopStack[i].type === 'loop') {
            loopInfo = this.loopStack[i]
            break
        }
    }

    if (!loopInfo) {
        throw new Error('Continue statement outside of loop')
    }
    
    // TODO: Handle labels
    
    this.compiler.emitOp(this.funcDef, Opcode.OP_goto8)
    const jumpPos = this.funcDef.byteCode.size
    this.compiler.emitU8(this.funcDef, 0)
    
    loopInfo.continueJumps.push(jumpPos)
  }

  visitReturnStatement(node: ts.ReturnStatement) {
    if (!this.funcDef) return
    if (node.expression) {
      this.visit(node.expression)
      this.compiler.emitOp(this.funcDef, Opcode.OP_return)
    } else {
      this.compiler.emitOp(this.funcDef, Opcode.OP_return_undef)
    }
  }

  visitIfStatement(node: ts.IfStatement) {
    if (!this.funcDef) return

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
                if (this.loopStack.length > 0) {
                    this.visit(node.expression)
                    this.compiler.emitOp(this.funcDef, Opcode.OP_if_true8)
                    const jumpPos = this.funcDef.byteCode.size
                    this.compiler.emitU8(this.funcDef, 0)
                    this.loopStack[this.loopStack.length - 1].breakJumps.push(jumpPos)
                    return
                }
            } else if (ts.isContinueStatement(stmt)) {
                // Find nearest loop (skip switches)
                let loopInfo: LoopInfo | undefined
                for (let i = this.loopStack.length - 1; i >= 0; i--) {
                    if (this.loopStack[i].type === 'loop') {
                        loopInfo = this.loopStack[i]
                        break
                    }
                }

                if (loopInfo) {
                    this.visit(node.expression)
                    this.compiler.emitOp(this.funcDef, Opcode.OP_if_true8)
                    const jumpPos = this.funcDef.byteCode.size
                    this.compiler.emitU8(this.funcDef, 0)
                    loopInfo.continueJumps.push(jumpPos)
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
    this.funcDef.byteCode.buf[ifFalseOffsetPos] = ifFalseOffset

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
        this.funcDef.byteCode.buf[gotoOffsetPos] = gotoOffset
    }
  }

  visitWhileStatement(node: ts.WhileStatement) {
    if (!this.funcDef) return

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
      breakJumps: [],
      continueJumps: [],
      continueTarget: startPos
    }
    this.loopStack.push(loopInfo)

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
    this.funcDef.byteCode.buf[gotoOffsetPos] = gotoOffset

    // 5. Patch if_false
    const endPos = this.funcDef.byteCode.size
    const ifFalseOffset = endPos - ifFalseOffsetPos
    if (ifFalseOffset > 127 || ifFalseOffset < -128) {
        // TODO: Handle long jumps
        throw new Error('Jump offset too large for if_false8')
    }
    this.funcDef.byteCode.buf[ifFalseOffsetPos] = ifFalseOffset
    
    // Patch break jumps
    for (const jumpPos of loopInfo.breakJumps) {
        const offset = endPos - jumpPos
        if (offset > 127 || offset < -128) {
             throw new Error('Jump offset too large for break')
        }
        this.funcDef.byteCode.buf[jumpPos] = offset
    }
    
    // Patch continue jumps
    for (const jumpPos of loopInfo.continueJumps) {
        const offset = startPos - jumpPos
        if (offset > 127 || offset < -128) {
             throw new Error('Jump offset too large for continue')
        }
        this.funcDef.byteCode.buf[jumpPos] = offset
    }
  }

  visitDoStatement(node: ts.DoStatement) {
    if (!this.funcDef) return

    const startPos = this.funcDef.byteCode.size

    // Push loop info
    const loopInfo: LoopInfo = {
      type: 'loop',
      breakJumps: [],
      continueJumps: [],
      continueTarget: -1 // Not used for do-while patching logic below
    }
    this.loopStack.push(loopInfo)

    // 1. Body
    this.visit(node.statement)
    
    // 2. Continue Target is here
    const continuePos = this.funcDef.byteCode.size
    
    // Patch continue jumps
    for (const jumpPos of loopInfo.continueJumps) {
        const offset = continuePos - jumpPos
        if (offset > 127 || offset < -128) {
             throw new Error('Jump offset too large for continue')
        }
        this.funcDef.byteCode.buf[jumpPos] = offset
    }

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
    this.funcDef.byteCode.buf[ifTrueOffsetPos] = ifTrueOffset
    
    this.loopStack.pop()
    
    // 5. Break Target is here
    const endPos = this.funcDef.byteCode.size
    
    // Patch break jumps
    for (const jumpPos of loopInfo.breakJumps) {
        const offset = endPos - jumpPos
        if (offset > 127 || offset < -128) {
             throw new Error('Jump offset too large for break')
        }
        this.funcDef.byteCode.buf[jumpPos] = offset
    }
  }

  visitConditionalExpression(node: ts.ConditionalExpression) {
    if (!this.funcDef) return
    
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
    this.funcDef.byteCode.buf[ifFalseOffsetPos] = ifFalseOffset
    
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
    this.funcDef.byteCode.buf[gotoOffsetPos] = gotoOffset
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
            if (idx === 0) this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref0)
            else if (idx === 1) this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref1)
            else if (idx === 2) this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref2)
            else if (idx === 3) this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref3)
            else {
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
            if (idx === 0) this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc0)
            else if (idx === 1) this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc1)
            else if (idx === 2) this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc2)
            else if (idx === 3) this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc3)
            else {
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
            if (idx === 0) this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref0)
            else if (idx === 1) this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref1)
            else if (idx === 2) this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref2)
            else if (idx === 3) this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref3)
            else {
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
                if (idx === 0) this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc0)
                else if (idx === 1) this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc1)
                else if (idx === 2) this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc2)
                else if (idx === 3) this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc3)
                else {
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
    if (!this.funcDef) return

    // Optimization for -1
    if (node.operator === ts.SyntaxKind.MinusToken && 
      ts.isNumericLiteral(node.operand) && 
      node.operand.text === '1') {
      this.compiler.emitOp(this.funcDef, Opcode.OP_push_minus1)
      return
    }

    this.visit(node.operand)
    switch (node.operator) {
      case ts.SyntaxKind.ExclamationToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_lnot)
        break
      case ts.SyntaxKind.TildeToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_not)
        break
      case ts.SyntaxKind.PlusToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_plus)
        break
      case ts.SyntaxKind.MinusToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_neg)
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
    if (!this.funcDef) return
    this.visit(node.expression)
    this.compiler.emitOp(this.funcDef, Opcode.OP_typeof)
  }

  visitVoidExpression(node: ts.VoidExpression) {
    if (!this.funcDef) return

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
    if (!this.funcDef) return

    this.compiler.emitOp(this.funcDef, Opcode.OP_object)

    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) {
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
      }
      // TODO: Handle ShorthandPropertyAssignment, SpreadAssignment, etc.
    }
  }

  visitArrayLiteralExpression(node: ts.ArrayLiteralExpression) {
    if (!this.funcDef) return

    for (const elem of node.elements) {
        this.visit(elem)
    }
    
    this.compiler.emitOp(this.funcDef, Opcode.OP_array_from)
    this.compiler.emitU16(this.funcDef, node.elements.length)
    
    // Manual stack adjustment for array_from (pops n, pushes 1)
    this.funcDef.stackLevel -= node.elements.length
    this.funcDef.stackLevel += 1
  }

  visitElementAccessExpression(node: ts.ElementAccessExpression) {
    if (!this.funcDef) return
    
    this.visit(node.expression)
    this.visit(node.argumentExpression)
    
    this.compiler.emitOp(this.funcDef, Opcode.OP_get_array_el)
  }

  visitBinaryExpression(node: ts.BinaryExpression) {
    if (!this.funcDef) return

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
      this.funcDef.byteCode.buf[jumpPos] = offset
      return
    }

    if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      this.visit(node.right)
      this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
      if (ts.isIdentifier(node.left)) {
        const name = node.left.text
        const scopeInfo = this.findVarInScope(name)
        
        if (scopeInfo) {
          if (scopeInfo.type === 'closure') {
              const idx = scopeInfo.idx
              if (scopeInfo.isLexical) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref_check)
                this.compiler.emitU16(this.funcDef, idx)
              } else {
                if (idx === 0) this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref0)
                else if (idx === 1) this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref1)
                else if (idx === 2) this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref2)
                else if (idx === 3) this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref3)
                else {
                    this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref)
                    this.compiler.emitU16(this.funcDef, idx)
                }
              }
          } else {
              // Local
              const idx = scopeInfo.idx
              if (scopeInfo.isLexical) {
                  this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc_check)
                  this.compiler.emitU16(this.funcDef, idx)
              } else {
                  if (idx === 0) this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc0)
                  else if (idx === 1) this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc1)
                  else if (idx === 2) this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc2)
                  else if (idx === 3) this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc3)
                  else {
                      this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc)
                      this.compiler.emitU16(this.funcDef, idx)
                  }
              }
          }
        } else {
          const atom = this.compiler.addAtom(name)
          this.compiler.emitAtomOp(this.funcDef, Opcode.OP_put_var, atom)
        }
      }
      return
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

  visitIdentifier(node: ts.Identifier) {
    if (!this.funcDef) return
    const name = node.text
    
    if (name === 'undefined') {
      this.compiler.emitAtomOp(this.funcDef, Opcode.OP_get_var, JSAtom.JS_ATOM_undefined)
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
          if (idx === 0) this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref0, node.getStart())
          else if (idx === 1) this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref1, node.getStart())
          else if (idx === 2) this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref2, node.getStart())
          else if (idx === 3) this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref3, node.getStart())
          else {
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
            if (idx === 0) this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc0, node.getStart())
          else if (idx === 1) this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc1, node.getStart())
          else if (idx === 2) this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc2, node.getStart())
          else if (idx === 3) this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc3, node.getStart())
          else {
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
        if (res.idx === 0) this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg0)
        else if (res.idx === 1) this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg1)
        else if (res.idx === 2) this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg2)
        else if (res.idx === 3) this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg3)
        else {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg)
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
}
