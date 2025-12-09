import ts from 'typescript'
import { CompilerContext } from '../CompilerContext'
import { Label } from '../Compiler'
import { Opcode } from '../../env'
import { JSVarKind } from '../FunctionDef'
import { LoopInfo } from '../LabelManager'

export class StatementVisitor {
  private context: CompilerContext

  constructor(context: CompilerContext) {
    this.context = context
  }

  visitBlock(node: ts.Block) {
    const { labelManager, scopeManager, compiler, funcDef } = this.context
    if (!funcDef) {
      return
    }

    let loopInfo: LoopInfo | undefined
    
    // Check for user labels
    const hasUserLabels = labelManager.currentPendingLabels.some(l => !l.startsWith('goto_end_') && !l.startsWith('goto8_end_'))
    
    if (hasUserLabels) {
      loopInfo = labelManager.pushLoop('block', funcDef)
    }

    scopeManager.enter('block', funcDef)
    
    // Hoist block-scoped variables (let/const)
    for (const stmt of node.statements) {
      if (ts.isVariableStatement(stmt)) {
        const isLet = (stmt.declarationList.flags & ts.NodeFlags.Let) !== 0
        const isConst = (stmt.declarationList.flags & ts.NodeFlags.Const) !== 0
        if (isLet || isConst) {
          for (const decl of stmt.declarationList.declarations) {
            if (ts.isIdentifier(decl.name)) {
              const name = decl.name.text
              const currentScope = scopeManager.currentScope
              if (!currentScope.vars.has(name)) {
                // Add as local var
                const scopeLevel = scopeManager.stackDepth - funcDef.scopeLevel - 1
                const varIdx = compiler.addVar(funcDef, name, isConst, true, scopeLevel)
                currentScope.vars.set(name, {
                  type: 'local',
                  idx: varIdx,
                  isLexical: true,
                  isConst
                })
                
                // Emit set_loc_uninitialized
                const localIdx = funcDef.vars[varIdx].localIdx
                if (localIdx !== -1) {
                  compiler.emitOp(funcDef, Opcode.OP_set_loc_uninitialized)
                  compiler.emitU16(funcDef, localIdx)
                }
              }
            }
          }
        }
      }
    }

    for (const stmt of node.statements) {
      this.context.visit(stmt)
      if (this.context.isTerminated) break
    }
    scopeManager.exit()

    if (loopInfo) {
      compiler.markLabel(funcDef, loopInfo.breakLabel)
      labelManager.popLoop()
    }
  }

  visitIfStatement(node: ts.IfStatement) {
    const { compiler, funcDef, labelManager } = this.context
    if (!funcDef) {
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
            for (let i = labelManager.currentLoopStack.length - 1; i >= 0; i--) {
              if (labelManager.currentLoopStack[i].labels.includes(labelText)) {
                loopInfo = labelManager.currentLoopStack[i]
                break
              }
            }
          } else {
            if (labelManager.currentLoopStack.length > 0) {
              loopInfo = labelManager.currentLoopStack[labelManager.currentLoopStack.length - 1]
            }
          }

          if (loopInfo) {
            this.context.visit(node.expression)
            compiler.emitJump(funcDef, Opcode.OP_if_true, loopInfo.breakLabel)
            return
          }
        } else if (ts.isContinueStatement(stmt)) {
          let loopInfo: LoopInfo | undefined
          if (stmt.label) {
            const labelText = stmt.label.text
            for (let i = labelManager.currentLoopStack.length - 1; i >= 0; i--) {
              if (labelManager.currentLoopStack[i].type === 'loop' && labelManager.currentLoopStack[i].labels.includes(labelText)) {
                loopInfo = labelManager.currentLoopStack[i]
                break
              }
            }
          } else {
            for (let i = labelManager.currentLoopStack.length - 1; i >= 0; i--) {
              if (labelManager.currentLoopStack[i].type === 'loop') {
                loopInfo = labelManager.currentLoopStack[i]
                break
              }
            }
          }

          if (loopInfo) {
            this.context.visit(node.expression)
            compiler.emitJump(funcDef, Opcode.OP_if_true, loopInfo.continueLabel!)
            return
          }
        }
      }
    }

    const endLabel = compiler.newLabel(funcDef)
    const elseLabel = node.elseStatement ? compiler.newLabel(funcDef) : endLabel

    this.context.visit(node.expression)
    compiler.emitJump(funcDef, Opcode.OP_if_false, elseLabel)

    this.context.visit(node.thenStatement)

    if (node.elseStatement) {
      compiler.emitJump(funcDef, Opcode.OP_goto, endLabel)
      compiler.markLabel(funcDef, elseLabel)
      this.context.visit(node.elseStatement)
    }

    compiler.markLabel(funcDef, endLabel)
  }

  visitWhileStatement(node: ts.WhileStatement) {
    const { compiler, funcDef, labelManager } = this.context
    if (!funcDef) {
      return
    }

    const continueLabel = compiler.newLabel(funcDef)
    const loopInfo = labelManager.pushLoop('loop', funcDef, continueLabel)
    compiler.markLabel(funcDef, continueLabel)

    this.context.visit(node.expression)
    compiler.emitJump(funcDef, Opcode.OP_if_false, loopInfo.breakLabel)

    this.context.visit(node.statement)
    
    labelManager.popLoop()

    compiler.emitJump(funcDef, Opcode.OP_goto, continueLabel)
    compiler.markLabel(funcDef, loopInfo.breakLabel)
  }

  visitDoStatement(node: ts.DoStatement) {
    const { compiler, funcDef, labelManager } = this.context
    if (!funcDef) {
      return
    }

    const startLabel = compiler.newLabel(funcDef)
    const continueLabel = compiler.newLabel(funcDef)
    const loopInfo = labelManager.pushLoop('loop', funcDef, continueLabel)

    compiler.markLabel(funcDef, startLabel)
    this.context.visit(node.statement)
    compiler.markLabel(funcDef, continueLabel)

    this.context.visit(node.expression)
    compiler.emitJump(funcDef, Opcode.OP_if_true, startLabel)

    labelManager.popLoop()
    compiler.markLabel(funcDef, loopInfo.breakLabel)
  }

  visitForStatement(node: ts.ForStatement) {
    const { compiler, funcDef, labelManager, scopeManager } = this.context
    if (!funcDef) {
      return
    }

    let hasScope = false
    
    // 1. Enter Scope (if initializer has let/const)
    if (node.initializer && ts.isVariableDeclarationList(node.initializer)) {
      if (node.initializer.flags & (ts.NodeFlags.Let | ts.NodeFlags.Const)) {
        scopeManager.enter('block', funcDef)
        hasScope = true
            
        // Hoist variables
        const isConst = (node.initializer.flags & ts.NodeFlags.Const) !== 0
        for (const decl of node.initializer.declarations) {
          if (ts.isIdentifier(decl.name)) {
            const name = decl.name.text
            const currentScope = scopeManager.currentScope
            if (!currentScope.vars.has(name)) {
              const scopeLevel = scopeManager.stackDepth - funcDef!.scopeLevel - 1
              const varIdx = compiler.addVar(funcDef!, name, isConst, true, scopeLevel)
              currentScope.vars.set(name, {
                type: 'local',
                idx: varIdx,
                isLexical: true,
                isConst
              })
              
              // Emit set_loc_uninitialized
              const localIdx = funcDef!.vars[varIdx].localIdx
              if (localIdx !== -1) {
                  compiler.emitOp(funcDef!, Opcode.OP_set_loc_uninitialized)
                  compiler.emitU16(funcDef!, localIdx)
              }
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
            this.context.visit(decl.initializer)
            const name = decl.name.text
            const scopeInfo = scopeManager.findVar(name, funcDef!)

            if (scopeInfo) {
              const idx = scopeInfo.idx
              if (idx === 0) {
                compiler.emitOp(funcDef, Opcode.OP_put_loc0)
              } else if (idx === 1) {
                compiler.emitOp(funcDef, Opcode.OP_put_loc1)
              } else if (idx === 2) {
                compiler.emitOp(funcDef, Opcode.OP_put_loc2)
              } else if (idx === 3) {
                compiler.emitOp(funcDef, Opcode.OP_put_loc3)
              } else {
                compiler.emitOp(funcDef, Opcode.OP_put_loc)
                compiler.emitU16(funcDef, idx)
              }
            }
          }
        }
      } else {
        this.context.visit(node.initializer)
        compiler.emitOp(funcDef, Opcode.OP_drop)
      }
    }

    const loopInfo = labelManager.pushLoop('loop', funcDef)
    const startLabel = compiler.newLabel(funcDef)
    compiler.markLabel(funcDef, startLabel)

    // 3. Condition
    if (node.condition) {
      this.context.visit(node.condition)
      compiler.emitJump(funcDef, Opcode.OP_if_false, loopInfo.breakLabel)
    }

    // 4. Body
    this.context.visit(node.statement)

    // 5. Increment
    compiler.markLabel(funcDef, loopInfo.continueLabel!)

    if (node.incrementor) {
      this.context.visit(node.incrementor)
      compiler.emitOp(funcDef, Opcode.OP_drop)
    }

    // 6. Loop
    compiler.emitJump(funcDef, Opcode.OP_goto, startLabel)

    labelManager.popLoop()
    compiler.markLabel(funcDef, loopInfo.breakLabel)


    if (hasScope) {
      // Emit close_loc for let/const variables in loop scope
      // QuickJS emits close_loc for each variable in the scope
      // But here we just exit scope.
      // TODO: Check if we need explicit close_loc instructions.
      // For now, just exit scope.
      scopeManager.exit()
    }
  }

  visitForOfStatement(node: ts.ForOfStatement) {
    const { compiler, funcDef, labelManager, scopeManager } = this.context
    if (!funcDef) {
      return
    }

    // 2. Setup iterator
    let hasScope = false
    if (node.initializer && ts.isVariableDeclarationList(node.initializer)) {
      if (node.initializer.flags & (ts.NodeFlags.Let | ts.NodeFlags.Const)) {
        scopeManager.enter('block', funcDef)
        hasScope = true
        
        // Hoist variables
        const isConst = (node.initializer.flags & ts.NodeFlags.Const) !== 0
        for (const decl of node.initializer.declarations) {
          if (ts.isIdentifier(decl.name)) {
            const name = decl.name.text
            const currentScope = scopeManager.currentScope
            if (!currentScope.vars.has(name)) {
              const scopeLevel = scopeManager.stackDepth - funcDef!.scopeLevel - 1
              const varIdx = compiler.addVar(funcDef!, name, isConst, true, scopeLevel)
              currentScope.vars.set(name, {
                type: 'local',
                idx: varIdx,
                isLexical: true,
                isConst
              })
              
              const localIdx = funcDef!.vars[varIdx].localIdx
              if (localIdx !== -1) {
                  compiler.emitOp(funcDef!, Opcode.OP_set_loc_uninitialized)
                  compiler.emitU16(funcDef!, localIdx)
              }
            }
          }
        }
      }
    }

    // 1. Evaluate expression
    this.context.visit(node.expression)

    compiler.emitOp(funcDef, Opcode.OP_for_of_start)
    
    const loopInfo = labelManager.pushLoop('loop', funcDef)
    const bodyLabel = compiler.newLabel(funcDef)
    const checkLabel = compiler.newLabel(funcDef)

    compiler.emitJump(funcDef, Opcode.OP_goto, checkLabel)

    compiler.markLabel(funcDef, bodyLabel)
    compiler.adjustStack(funcDef, 1)

    if (node.initializer && ts.isVariableDeclarationList(node.initializer)) {
      for (const decl of node.initializer.declarations) {
        if (ts.isIdentifier(decl.name)) {
          const name = decl.name.text
          const scopeInfo = scopeManager.findVar(name, funcDef!)
          if (scopeInfo) {
            compiler.emitPutLoc(funcDef, scopeInfo.idx)
          }
        }
      }
    }
    
    this.context.visit(node.statement)
    
    compiler.markLabel(funcDef, loopInfo.continueLabel!)
    compiler.markLabel(funcDef, checkLabel)
    
    compiler.emitOp(funcDef, Opcode.OP_for_of_next)
    compiler.emitU8(funcDef, 0)
    compiler.emitJump(funcDef, Opcode.OP_if_false, bodyLabel)
    
    compiler.emitOp(funcDef, Opcode.OP_drop)
    compiler.emitOp(funcDef, Opcode.OP_iterator_close)
    
    labelManager.popLoop()
    compiler.markLabel(funcDef, loopInfo.breakLabel)
    
    if (hasScope) {
      scopeManager.exit()
    }
  }

  visitForInStatement(node: ts.ForInStatement) {
    const { compiler, funcDef, labelManager, scopeManager } = this.context
    if (!funcDef) {
      return
    }

    // 1. Evaluate expression
    this.context.visit(node.expression)

    // 2. Setup iterator
    let hasScope = false
    if (node.initializer && ts.isVariableDeclarationList(node.initializer)) {
      if (node.initializer.flags & (ts.NodeFlags.Let | ts.NodeFlags.Const)) {
        scopeManager.enter('block', funcDef)
        hasScope = true
        
        // Hoist variables
        const isConst = (node.initializer.flags & ts.NodeFlags.Const) !== 0
        for (const decl of node.initializer.declarations) {
          if (ts.isIdentifier(decl.name)) {
            const name = decl.name.text
            const currentScope = scopeManager.currentScope
            if (!currentScope.vars.has(name)) {
              const scopeLevel = scopeManager.stackDepth - funcDef!.scopeLevel - 1
              const varIdx = compiler.addVar(funcDef!, name, isConst, true, scopeLevel)
              currentScope.vars.set(name, {
                type: 'local',
                idx: varIdx,
                isLexical: true,
                isConst
              })
              
              const localIdx = funcDef!.vars[varIdx].localIdx
              if (localIdx !== -1) {
                  compiler.emitOp(funcDef!, Opcode.OP_set_loc_uninitialized)
                  compiler.emitU16(funcDef!, localIdx)
              }
            }
          }
        }
      }
    }

    compiler.emitOp(funcDef, Opcode.OP_for_in_start)
    
    const userLabels = labelManager.currentPendingLabels.filter(l => !l.startsWith('goto_end_') && !l.startsWith('goto8_end_'))
    const loopInfo: LoopInfo = {
      type: 'loop',
      labels: userLabels,
      breakLabel: compiler.newLabel(funcDef),
      continueLabel: compiler.newLabel(funcDef)
    }
    labelManager.currentLoopStack.push(loopInfo)
    labelManager.currentPendingLabels = labelManager.currentPendingLabels.filter(l => l.startsWith('goto_end_') || l.startsWith('goto8_end_'))

    const bodyLabel = compiler.newLabel(funcDef)
    const checkLabel = compiler.newLabel(funcDef)
    compiler.emitJump(funcDef, Opcode.OP_goto, checkLabel)
    
    compiler.markLabel(funcDef, bodyLabel)
    if (node.initializer && ts.isVariableDeclarationList(node.initializer)) {
      for (const decl of node.initializer.declarations) {
        if (ts.isIdentifier(decl.name)) {
          const name = decl.name.text
          const scopeInfo = scopeManager.findVar(name, funcDef!)
          if (scopeInfo) {
            compiler.emitPutLoc(funcDef, scopeInfo.idx)
          }
        }
      }
    }
    
    this.context.visit(node.statement)
    compiler.markLabel(funcDef, loopInfo.continueLabel!)

    compiler.markLabel(funcDef, checkLabel)
    compiler.emitOp(funcDef, Opcode.OP_for_in_next)
    compiler.emitJump(funcDef, Opcode.OP_if_false, bodyLabel)

    compiler.emitOp(funcDef, Opcode.OP_drop)
    
    labelManager.popLoop()
    compiler.markLabel(funcDef, loopInfo.breakLabel)
    
    if (hasScope) {
      scopeManager.exit()
    }
  }

  visitSwitchStatement(node: ts.SwitchStatement) {
    const { compiler, funcDef, labelManager } = this.context
    if (!funcDef) {
      return
    }

    this.context.visit(node.expression)
    const loopInfo = labelManager.pushLoop('switch', funcDef)
    
    const clauses = node.caseBlock.clauses
    let labelCase: Label | null = null
    let defaultOffset: number | null = null
    let previousClauseFallsThrough = false

    for (let i = 0; i < clauses.length; i++) {
      const clause = clauses[i]
      if (ts.isCaseClause(clause)) {
        let bodyLabel: Label | null = null

        if (labelCase) {
          if (previousClauseFallsThrough) {
            bodyLabel = compiler.newLabel(funcDef)
            compiler.emitJump(funcDef, Opcode.OP_goto, bodyLabel)
          }
          compiler.markLabel(funcDef, labelCase)
          labelCase = null
        } else if (previousClauseFallsThrough) {
          bodyLabel = compiler.newLabel(funcDef)
          compiler.emitJump(funcDef, Opcode.OP_goto, bodyLabel)
        }

        const expressions: ts.Expression[] = [clause.expression]
        let lastClause = clause
        let j = i + 1
        while (lastClause.statements.length === 0 && j < clauses.length && ts.isCaseClause(clauses[j])) {
          const nextCase = clauses[j] as ts.CaseClause
          expressions.push(nextCase.expression)
          lastClause = nextCase
          i = j
          j++
        }

        for (let exprIdx = 0; exprIdx < expressions.length; exprIdx++) {
          compiler.emitOp(funcDef, Opcode.OP_dup)
          this.context.visit(expressions[exprIdx])
          compiler.emitOp(funcDef, Opcode.OP_strict_eq)

          const isLastExpr = exprIdx === expressions.length - 1
          if (!isLastExpr) {
            if (!bodyLabel) {
              bodyLabel = compiler.newLabel(funcDef)
            }
            compiler.emitJump(funcDef, Opcode.OP_if_true, bodyLabel)
          } else {
            if (!bodyLabel) {
              bodyLabel = compiler.newLabel(funcDef)
            }
            labelCase = compiler.newLabel(funcDef)
            compiler.emitJump(funcDef, Opcode.OP_if_false, labelCase)
            compiler.markLabel(funcDef, bodyLabel)
          }
        }

        for (const stmt of lastClause.statements) {
          this.context.visit(stmt)
        }

        previousClauseFallsThrough = !this.context.isTerminated
        this.context.isTerminated = false
      } else {
        const defaultClause = clause as ts.DefaultClause
        if (defaultOffset !== null) {
          throw new Error('Duplicate default clause in switch statement')
        }

        if (!labelCase) {
          labelCase = compiler.newLabel(funcDef)
          compiler.emitJump(funcDef, Opcode.OP_goto, labelCase)
        }

        defaultOffset = funcDef.byteCode.size
        for (const stmt of defaultClause.statements) {
          this.context.visit(stmt)
        }

        previousClauseFallsThrough = !this.context.isTerminated
        this.context.isTerminated = false
      }
    }

    if (defaultOffset !== null) {
      if (!labelCase) {
        labelCase = compiler.newLabel(funcDef)
      }
      compiler.markLabelAt(funcDef, labelCase, defaultOffset)
      labelCase = null
    } else if (labelCase) {
      compiler.markLabel(funcDef, labelCase)
      labelCase = null
    }

    labelManager.popLoop()
    compiler.markLabel(funcDef, loopInfo.breakLabel)
    compiler.emitOp(funcDef, Opcode.OP_drop)
  }

  visitBreakStatement(node: ts.BreakStatement) {
    const { compiler, funcDef, labelManager } = this.context
    if (!funcDef) {
      return
    }

    let loopInfo: LoopInfo | undefined
    if (node.label) {
      const labelText = node.label.text
      loopInfo = labelManager.findBreakTarget(labelText)
      if (!loopInfo) {
        throw new Error(`Undefined label '${labelText}'`)
      }
    } else {
      loopInfo = labelManager.findBreakTarget()
      if (!loopInfo) {
        throw new Error('Break statement outside of loop/switch')
      }
    }

    compiler.emitJump(funcDef, Opcode.OP_goto, loopInfo.breakLabel)
    this.context.isTerminated = true
  }

  visitContinueStatement(node: ts.ContinueStatement) {
    const { compiler, funcDef, labelManager } = this.context
    if (!funcDef) {
      return
    }

    let loopInfo: LoopInfo | undefined
    if (node.label) {
      const labelText = node.label.text
      for (let i = labelManager.currentLoopStack.length - 1; i >= 0; i--) {
        if (labelManager.currentLoopStack[i].type === 'loop' && labelManager.currentLoopStack[i].labels.includes(labelText)) {
          loopInfo = labelManager.currentLoopStack[i]
          break
        }
      }
      if (!loopInfo) {
        for (let i = labelManager.currentLoopStack.length - 1; i >= 0; i--) {
          if (labelManager.currentLoopStack[i].labels.includes(labelText)) {
            throw new Error(`Label '${labelText}' is not a loop label`)
          }
        }
        throw new Error(`Undefined label '${labelText}'`)
      }
    } else {
      for (let i = labelManager.currentLoopStack.length - 1; i >= 0; i--) {
        if (labelManager.currentLoopStack[i].type === 'loop') {
          loopInfo = labelManager.currentLoopStack[i]
          break
        }
      }
      if (!loopInfo) {
        throw new Error('Continue statement outside of loop')
      }
    }

    compiler.emitJump(funcDef, Opcode.OP_goto, loopInfo.continueLabel!)
    this.context.isTerminated = true
  }

  visitReturnStatement(node: ts.ReturnStatement) {
    const { compiler, funcDef } = this.context
    if (!funcDef) {
      return
    }

    if (node.expression) {
      if (ts.isCallExpression(node.expression)) {
        this.context.visitCallExpression(node.expression, true, node.getStart())
      } else {
        this.context.visit(node.expression)
        compiler.emitOp(funcDef, Opcode.OP_return, node.getStart())
      }
    } else {
      compiler.emitOp(funcDef, Opcode.OP_return_undef, node.getStart())
    }
    this.context.isTerminated = true
  }

  visitThrowStatement(node: ts.ThrowStatement) {
    const { compiler, funcDef } = this.context
    if (!funcDef) {
      return
    }

    if (node.expression) {
      this.context.visit(node.expression)
      compiler.emitOp(funcDef, Opcode.OP_throw, node.getStart())
    } else {
      // Should not happen in valid TS/JS for throw statement, but rethrow is different
      compiler.emitOp(funcDef, Opcode.OP_throw, node.getStart())
    }
    this.context.isTerminated = true
  }

  visitTryStatement(node: ts.TryStatement) {
    const { compiler, funcDef, labelManager, scopeManager } = this.context
    if (!funcDef) return

    scopeManager.enter('block', funcDef) // Wrap try statement in a scope

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
    const endLabel = compiler.newLabel(funcDef)
    const finallyLabel = hasFinally ? compiler.newLabel(funcDef) : null
    const catchLabel = compiler.newLabel(funcDef)
    const catch2Label = hasFinally ? compiler.newLabel(funcDef) : null

    // Push catch handler
    compiler.emitJump(funcDef, Opcode.OP_catch, catchLabel)

    // Visit Try Block
    this.context.isTerminated = false
    // this.enter('block') // Removed, using outer scope
    this.context.visit(node.tryBlock)
    // this.exit() // Removed
    const tryTerminated = this.context.isTerminated
    this.context.isTerminated = false // Reset for catch

    if (!tryTerminated) {
      // End of Try Block
      compiler.emitOp(funcDef, Opcode.OP_drop) // Drop catch handler
      
      if (hasFinally && finallyLabel) {
        compiler.emitJump(funcDef, Opcode.OP_gosub, finallyLabel)
      }

      compiler.emitJump(funcDef, Opcode.OP_goto, endLabel)
    }

    compiler.markLabel(funcDef, catchLabel)

    // Catch Handler
    if (hasCatch) {
      const catchClause = node.catchClause!
      
      // Store exception
      if (catchClause.variableDeclaration) {
        const name = (catchClause.variableDeclaration.name as ts.Identifier).text
        // We need to enter a new scope for the catch variable
        scopeManager.enter('block', funcDef)
        
        // Add catch variable
        const scopeLevel = scopeManager.stackDepth - funcDef!.scopeLevel - 1
        // console.log(`Adding catch var ${name} at scope level ${scopeLevel}. Stack len: ${scopeManager.stackDepth}`)
        // QuickJS marks catch vars as JS_VAR_CATCH (kind=3)
        const varIdx = compiler.addVar(funcDef, name, false, false, scopeLevel, JSVarKind.JS_VAR_CATCH)
        const currentScope = scopeManager.currentScope
        currentScope.vars.set(name, {
          type: 'local',
          idx: varIdx,
          isLexical: false,
          isConst: false,
          isCatchVar: true // Still needed for visitIdentifier? No, if isLexical is false.
        })
        
        // Emit put_loc
        if (varIdx === 0) {
          compiler.emitOp(funcDef, Opcode.OP_put_loc0)
        } else if (varIdx === 1) {
          compiler.emitOp(funcDef, Opcode.OP_put_loc1)
        } else if (varIdx === 2) {
          compiler.emitOp(funcDef, Opcode.OP_put_loc2)
        } else if (varIdx === 3) {
          compiler.emitOp(funcDef, Opcode.OP_put_loc3)
        } else {
          compiler.emitOp(funcDef, Opcode.OP_put_loc)
          compiler.emitU16(funcDef, varIdx)
        }
      } else {
        compiler.emitOp(funcDef, Opcode.OP_drop) // Drop exception if no variable
      }

      // If finally exists, we need another catch for the catch block
      if (hasFinally && catch2Label) {
        compiler.emitJump(funcDef, Opcode.OP_catch, catch2Label)
      }

      // Visit Catch Block
      this.context.visit(catchClause.block)
      const catchTerminated = this.context.isTerminated
      this.context.isTerminated = false

      if (catchClause.variableDeclaration) {
        scopeManager.exit()
      }

      if (!catchTerminated) {
        if (hasFinally) {
          compiler.emitOp(funcDef, Opcode.OP_drop) // Drop catch handler 2
        }

        // Emit undefined + drop (to match WASM)
        compiler.emitOp(funcDef, Opcode.OP_undefined)
        
        if (hasFinally && finallyLabel) {
          compiler.emitJump(funcDef, Opcode.OP_gosub, finallyLabel)
        }
        
        compiler.emitOp(funcDef, Opcode.OP_drop) // Drop undefined
        compiler.emitJump(funcDef, Opcode.OP_goto, endLabel)
      }

      // Catch 2 Handler (rethrow)
      if (hasFinally && finallyLabel && catch2Label) {
        compiler.markLabel(funcDef, catch2Label)
        compiler.emitJump(funcDef, Opcode.OP_gosub, finallyLabel)
        compiler.emitOp(funcDef, Opcode.OP_throw)
      }

    } else if (hasFinally && finallyLabel) {
      // No catch block, but we are here because of exception (and we have finally)
      // So we are in the catch handler of the try block
      
      // Execute finally
      compiler.emitJump(funcDef, Opcode.OP_gosub, finallyLabel)
      
      // Rethrow
      compiler.emitOp(funcDef, Opcode.OP_throw)
    }

    // Finally Block Label
    if (hasFinally && finallyLabel) {
      compiler.markLabel(funcDef, finallyLabel)
      this.context.visit(node.finallyBlock)
      compiler.emitOp(funcDef, Opcode.OP_ret)
    }

    compiler.markLabel(funcDef, endLabel)
    scopeManager.exit()
  }

  visitVariableStatement(node: ts.VariableStatement) {
    const { compiler, funcDef, scopeManager } = this.context
    if (!funcDef) {
      return
    }
    
    const isLet = (node.declarationList.flags & ts.NodeFlags.Let) !== 0
    const isConst = (node.declarationList.flags & ts.NodeFlags.Const) !== 0
    const isLexical = isLet || isConst
    
    for (const decl of node.declarationList.declarations) {
      if (ts.isIdentifier(decl.name)) {
        const name = decl.name.text
        
        // Check if already declared in current scope (hoisted)
        let scopeInfo = scopeManager.findVar(name, funcDef)
        
        if (!scopeInfo) {
          // Not found (must be module scope var or function scope var)
          const currentScope = scopeManager.currentScope
          
          if (currentScope.type === 'module') {
            // Add as local var first to reserve slot
            const scopeLevel = scopeManager.scopeStack.length - funcDef.scopeLevel - 1
            const varIdx = compiler.addVar(funcDef, name, isConst, isLexical, scopeLevel)
            
            // Add as closure var
            const closureIdx = compiler.addClosureVar(funcDef, name, true, false, varIdx, JSVarKind.JS_VAR_NORMAL, isConst, isLexical)
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
            this.context.visit(decl.initializer)
            
            // Emit OP_set_name for named function expressions/arrows assigned to variables
            if (ts.isArrowFunction(decl.initializer) || 
              ts.isFunctionExpression(decl.initializer) || 
              ts.isClassExpression(decl.initializer)) {
              const atomId = compiler.addAtom(name)
              compiler.emitOp(funcDef, Opcode.OP_set_name)
              compiler.emitU32(funcDef, atomId)
            }
            
            if (scopeInfo.type === 'closure') {
              // Emit put_var_ref
              const idx = scopeInfo.idx
              if (idx === 0) {
                compiler.emitOp(funcDef, Opcode.OP_put_var_ref0)
              } else if (idx === 1) {
                compiler.emitOp(funcDef, Opcode.OP_put_var_ref1)
              } else if (idx === 2) {
                compiler.emitOp(funcDef, Opcode.OP_put_var_ref2)
              } else if (idx === 3) {
                compiler.emitOp(funcDef, Opcode.OP_put_var_ref3)
              } else {
                compiler.emitOp(funcDef, Opcode.OP_put_var_ref)
                compiler.emitU16(funcDef, idx)
              }
            } else {
              // Local var
              const varIdx = scopeInfo.idx
              const idx = funcDef.vars[varIdx].localIdx
              if (idx === -1) {
                 // Should be closure?
                 throw new Error(`Variable ${name} is captured but accessed as local`)
              }
              
              if (idx === 0) {
                compiler.emitOp(funcDef, Opcode.OP_put_loc0)
              } else if (idx === 1) {
                compiler.emitOp(funcDef, Opcode.OP_put_loc1)
              } else if (idx === 2) {
                compiler.emitOp(funcDef, Opcode.OP_put_loc2)
              } else if (idx === 3) {
                compiler.emitOp(funcDef, Opcode.OP_put_loc3)
              } else {
                compiler.emitOp(funcDef, Opcode.OP_put_loc)
                compiler.emitU16(funcDef, idx)
              }
            }
          }
        }
      }
    }
  }

  visitLabeledStatement(node: ts.LabeledStatement) {
    const { labelManager } = this.context
    const label = node.label.text
    labelManager.currentPendingLabels.push(label)
    const preCount = labelManager.currentPendingLabels.length
    
    this.context.visit(node.statement)
    
    if (labelManager.currentPendingLabels.length >= preCount) {
      if (labelManager.currentPendingLabels[preCount - 1] === label) {
        const index = labelManager.currentPendingLabels.lastIndexOf(label)
        if (index !== -1) {
          labelManager.currentPendingLabels.splice(index, 1)
        }
      }
    }
  }
}
