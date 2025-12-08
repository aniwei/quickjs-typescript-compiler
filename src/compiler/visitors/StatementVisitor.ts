import ts from 'typescript'
import { CompilerContext } from '../CompilerContext'
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
    const hasUserLabels = labelManager.currentPendingLabels.some(l => !l.startsWith('goto_end_') && !l.startsWith('goto8_end_') && !l.startsWith('gosub_'))
    
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
            compiler.emitJump(funcDef, Opcode.OP_if_true8, loopInfo.breakLabel)
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
            compiler.emitJump(funcDef, Opcode.OP_if_true8, loopInfo.continueLabel!)
            return
          }
        }
      }
    }

    // 1. Condition
    this.context.visit(node.expression)
    
    // 2. Jump if false
    compiler.emitOp(funcDef, Opcode.OP_if_false8)
    const ifFalseOffsetPos = funcDef.byteCode.size
    compiler.emitU8(funcDef, 0) // Placeholder
    
    // 3. Then block
    this.context.visit(node.thenStatement)
    
    if (node.elseStatement) {
      // 4. Jump to end (skip else)
      compiler.emitOp(funcDef, Opcode.OP_goto8)
      const gotoOffsetPos = funcDef.byteCode.size
      compiler.emitU8(funcDef, 0) // Placeholder
      
      // 5. Patch if_false
      const elsePos = funcDef.byteCode.size
      const ifFalseOffset = elsePos - ifFalseOffsetPos
      
      if (ifFalseOffset > 127 || ifFalseOffset < -128) {
        throw new Error('Jump offset too large for if_false8')
      }
      funcDef.byteCode.buffer[ifFalseOffsetPos] = ifFalseOffset
      
      // 6. Else block
      this.context.visit(node.elseStatement)
      
      // 7. Patch goto
      const endPos = funcDef.byteCode.size
      const gotoOffset = endPos - gotoOffsetPos
      
      if (gotoOffset > 127 || gotoOffset < -128) {
        throw new Error('Jump offset too large for goto8')
      }
      funcDef.byteCode.buffer[gotoOffsetPos] = gotoOffset
    } else {
      // 5. Patch if_false
      const endPos = funcDef.byteCode.size
      const ifFalseOffset = endPos - ifFalseOffsetPos
      
      if (ifFalseOffset > 127 || ifFalseOffset < -128) {
        throw new Error('Jump offset too large for if_false8')
      }
      funcDef.byteCode.buffer[ifFalseOffsetPos] = ifFalseOffset
    }
  }

  visitWhileStatement(node: ts.WhileStatement) {
    const { compiler, funcDef, labelManager } = this.context
    if (!funcDef) {
      return
    }

    const continueLabel = compiler.newLabel()
    compiler.markLabel(funcDef, continueLabel)
    const startPos = funcDef.byteCode.size

    // 1. Condition
    this.context.visit(node.expression)

    // 2. Jump if false to end
    compiler.emitOp(funcDef, Opcode.OP_if_false8)
    const ifFalseOffsetPos = funcDef.byteCode.size
    compiler.emitU8(funcDef, 0) // Placeholder

    // Push loop info
    const loopInfo = labelManager.pushLoop('loop', funcDef, continueLabel)

    // 3. Body
    this.context.visit(node.statement)
    
    labelManager.popLoop()

    // 4. Jump back to start
    compiler.emitOp(funcDef, Opcode.OP_goto8)
    const gotoOffsetPos = funcDef.byteCode.size
    compiler.emitU8(funcDef, 0) // Placeholder
    const gotoOffset = startPos - gotoOffsetPos

    if (gotoOffset > 127 || gotoOffset < -128) {
      // TODO: Handle long jumps
      throw new Error('Jump offset too large for goto8')
    }

    funcDef.byteCode.buffer[gotoOffsetPos] = gotoOffset

    // 5. Patch if_false
    const endPos = funcDef.byteCode.size
    const ifFalseOffset = endPos - ifFalseOffsetPos

    if (ifFalseOffset > 127 || ifFalseOffset < -128) {
      // TODO: Handle long jumps
      throw new Error('Jump offset too large for if_false8')
    }

    funcDef.byteCode.buffer[ifFalseOffsetPos] = ifFalseOffset
    
    // Patch break jumps
    compiler.markLabel(funcDef, loopInfo.breakLabel)
  }

  visitDoStatement(node: ts.DoStatement) {
    const { compiler, funcDef, labelManager } = this.context
    if (!funcDef) {
      return
    }

    const startPos = funcDef.byteCode.size
    const continueLabel = compiler.newLabel()

    // Push loop info
    const loopInfo = labelManager.pushLoop('loop', funcDef, continueLabel)

    // 1. Body
    this.context.visit(node.statement)
    
    // 2. Continue Target is here
    compiler.markLabel(funcDef, continueLabel)

    // 3. Condition
    this.context.visit(node.expression)

    // 4. Jump if true to start
    compiler.emitOp(funcDef, Opcode.OP_if_true8)
    const ifTrueOffsetPos = funcDef.byteCode.size
    compiler.emitU8(funcDef, 0) // Placeholder
    
    const ifTrueOffset = startPos - ifTrueOffsetPos
    if (ifTrueOffset > 127 || ifTrueOffset < -128) {
      throw new Error('Jump offset too large for if_true8')
    }
    funcDef.byteCode.buffer[ifTrueOffsetPos] = ifTrueOffset
    
    labelManager.popLoop()
    
    // 5. Break Target is here
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

    const startPos = funcDef.byteCode.size

    // 3. Condition
    let ifFalseOffsetPos = -1
    if (node.condition) {
      this.context.visit(node.condition)
      compiler.emitOp(funcDef, Opcode.OP_if_false8)
      ifFalseOffsetPos = funcDef.byteCode.size
      compiler.emitU8(funcDef, 0)
    }

    // Push loop info
    const loopInfo = labelManager.pushLoop('loop', funcDef)

    // 4. Body
    this.context.visit(node.statement)

    labelManager.popLoop()

    // 5. Increment
    compiler.markLabel(funcDef, loopInfo.continueLabel!)

    if (node.incrementor) {
      this.context.visit(node.incrementor)
      compiler.emitOp(funcDef, Opcode.OP_drop)
    }

    // 6. Loop
    compiler.emitOp(funcDef, Opcode.OP_goto8)
    const gotoOffsetPos = funcDef.byteCode.size
    compiler.emitU8(funcDef, 0)
    const gotoOffset = startPos - gotoOffsetPos

    if (gotoOffset > 127 || gotoOffset < -128) {
      throw new Error('Jump offset too large for goto8')
    }

    funcDef.byteCode.buffer[gotoOffsetPos] = gotoOffset
    
    // 7. Patch exit
    const endPos = funcDef.byteCode.size
    if (ifFalseOffsetPos !== -1) {
      const offset = endPos - ifFalseOffsetPos

      if (offset > 127 || offset < -128) {
        throw new Error('Jump offset too large for if_false8')
      }
      funcDef.byteCode.buffer[ifFalseOffsetPos] = offset
    }

    // Patch break jumps
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
    
    // Push loop info
    const loopInfo = labelManager.pushLoop('loop', funcDef)

    // Jump to check
    compiler.emitOp(funcDef, Opcode.OP_goto8)
    const gotoCheckPos = funcDef.byteCode.size
    compiler.emitU8(funcDef, 0)
    
    // Body Label
    const bodyPos = funcDef.byteCode.size
    
    // Adjust stack for loop variable (pushed by for_of_next)
    compiler.adjustStack(funcDef, 1)
    
    // Assign to variable
    if (node.initializer) {
      if (ts.isVariableDeclarationList(node.initializer)) {
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
    }
    
    // Visit Body
    this.context.visit(node.statement)
    
    // Continue Label
    compiler.markLabel(funcDef, loopInfo.continueLabel!)
    
    // Check Label
    const checkPos = funcDef.byteCode.size
    
    // Patch initial goto
    const offset = checkPos - gotoCheckPos
    funcDef.byteCode.buffer[gotoCheckPos] = offset
    
    compiler.emitOp(funcDef, Opcode.OP_for_of_next)
    compiler.emitU8(funcDef, 0)
    
    // if_false8 Body
    compiler.emitOp(funcDef, Opcode.OP_if_false8)
    const jumpBackPos = funcDef.byteCode.size
    compiler.emitU8(funcDef, 0)
    
    const jumpBackOffset = bodyPos - jumpBackPos
    funcDef.byteCode.buffer[jumpBackPos] = jumpBackOffset
    
    // Drop iterator
    compiler.emitOp(funcDef, Opcode.OP_drop)
    
    // Iterator Close
    compiler.emitOp(funcDef, Opcode.OP_iterator_close)
    
    labelManager.popLoop()
    
    // Break Label
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
    
    // Push loop info
    // Filter user labels
    const userLabels = labelManager.currentPendingLabels.filter(l => !l.startsWith('goto_end_') && !l.startsWith('goto8_end_') && !l.startsWith('gosub_'))

    const loopInfo: LoopInfo = {
      type: 'loop',
      labels: userLabels,
      breakLabel: compiler.newLabel(),
      continueLabel: compiler.newLabel()
    }
    labelManager.currentLoopStack.push(loopInfo)
    
    // Remove user labels from pendingLabels
    labelManager.currentPendingLabels = labelManager.currentPendingLabels.filter(l => l.startsWith('goto_end_') || l.startsWith('goto8_end_') || l.startsWith('gosub_'))

    // Jump to check
    compiler.emitOp(funcDef, Opcode.OP_goto8)
    const gotoCheckPos = funcDef.byteCode.size
    compiler.emitU8(funcDef, 0)
    
    // Body Label
    const bodyPos = funcDef.byteCode.size
    
    // Assign to variable
    if (node.initializer) {
      if (ts.isVariableDeclarationList(node.initializer)) {
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
    }
    
    // Visit Body
    this.context.visit(node.statement)
    
    // Continue Label
    compiler.markLabel(funcDef, loopInfo.continueLabel!)
    
    // Check Label
    const checkPos = funcDef.byteCode.size
    
    // Patch initial goto
    const offset = checkPos - gotoCheckPos
    funcDef.byteCode.buffer[gotoCheckPos] = offset
    
    compiler.emitOp(funcDef, Opcode.OP_for_in_next)
    
    // if_false8 Body
    compiler.emitOp(funcDef, Opcode.OP_if_false8)
    const jumpBackPos = funcDef.byteCode.size
    compiler.emitU8(funcDef, 0)
    
    const jumpBackOffset = bodyPos - jumpBackPos
    funcDef.byteCode.buffer[jumpBackPos] = jumpBackOffset
    
    // Drop iterator
    compiler.emitOp(funcDef, Opcode.OP_drop)
    
    labelManager.popLoop()
    
    // Break Label
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

    // 1. Evaluate expression
    this.context.visit(node.expression)
    
    // 3. Setup break stack
    const loopInfo = labelManager.pushLoop('switch', funcDef)

    const clauses = node.caseBlock.clauses
    
    // Handle "Default First" case: Jump to first Case Check
    let startJumpPos = -1
    const hasCaseClauses = clauses.some(c => ts.isCaseClause(c))
    if (clauses.length > 0 && ts.isDefaultClause(clauses[0]) && hasCaseClauses) {
      compiler.emitOp(funcDef, Opcode.OP_goto8)
      startJumpPos = funcDef.byteCode.size
      compiler.emitU8(funcDef, 0)
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
          const buf = funcDef.byteCode.buffer
          const len = funcDef.byteCode.size
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
            compiler.emitOp(funcDef, Opcode.OP_goto8)
            pendingSkipCheckJumpPos = funcDef.byteCode.size
            compiler.emitU8(funcDef, 0)
          }
        }

        // If this is the first Case Clause, patch startJumpPos
        if (startJumpPos !== -1) {
          const offset = funcDef.byteCode.size - startJumpPos
          if (offset > 127 || offset < -128) {
            throw new Error('Jump offset too large for goto8')
          }
          funcDef.byteCode.buffer[startJumpPos] = offset
          startJumpPos = -1
        }

        // Patch previous check jump
        if (previousCheckJumpPos !== -1) {
          const offset = funcDef.byteCode.size - previousCheckJumpPos
          if (offset > 127 || offset < -128) {
            throw new Error('Jump offset too large for if_false8')
          }
          funcDef.byteCode.buffer[previousCheckJumpPos] = offset
          previousCheckJumpPos = -1
        }

        // Emit Check
        compiler.emitOp(funcDef, Opcode.OP_dup)
        this.context.visit(clause.expression)
        compiler.emitOp(funcDef, Opcode.OP_strict_eq)
        compiler.emitOp(funcDef, Opcode.OP_if_false8)
        previousCheckJumpPos = funcDef.byteCode.size
        compiler.emitU8(funcDef, 0)
      }
      
      // Patch skip check jump
      if (pendingSkipCheckJumpPos !== -1) {
        const offset = funcDef.byteCode.size - pendingSkipCheckJumpPos
        if (offset > 127 || offset < -128) {
          throw new Error('Jump offset too large for goto8')
        }
        funcDef.byteCode.buffer[pendingSkipCheckJumpPos] = offset
      }

      if (isDefault) {
        defaultBodyLabelPos = funcDef.byteCode.size
      }
      
      // Visit Body
      for (const stmt of clause.statements) {
        this.context.visit(stmt)
      }
    }
    
    // Patch the LAST check failure
    if (previousCheckJumpPos !== -1) {
      let target = -1
      if (defaultBodyLabelPos !== -1) {
        target = defaultBodyLabelPos
      } else {
        target = funcDef.byteCode.size // End
      }
      
      const offset = target - previousCheckJumpPos
      if (offset > 127 || offset < -128) {
        throw new Error('Jump offset too large for if_false8')
      }
      funcDef.byteCode.buffer[previousCheckJumpPos] = offset
    }
    
    // Pop break stack
    labelManager.popLoop()
    
    // Patch breaks
    compiler.markLabel(funcDef, loopInfo.breakLabel)
    
    // Drop switch value
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

    compiler.emitJump(funcDef, Opcode.OP_goto8, loopInfo.breakLabel)
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

    compiler.emitJump(funcDef, Opcode.OP_goto8, loopInfo.continueLabel!)
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

    // Push catch handler
    compiler.emitOp(funcDef, Opcode.OP_catch, node.getStart())
    const catchOffsetPos = funcDef.byteCode.size
    compiler.emitU32(funcDef, 0) // Placeholder

    // Visit Try Block
    this.context.isTerminated = false
    // this.enter('block') // Removed, using outer scope
    this.context.visit(node.tryBlock)
    // this.exit() // Removed
    const tryTerminated = this.context.isTerminated
    this.context.isTerminated = false // Reset for catch

    let gotoEndOffsetPos = -1

    if (!tryTerminated) {
      // End of Try Block
      compiler.emitOp(funcDef, Opcode.OP_drop) // Drop catch handler
      
      if (hasFinally) {
        compiler.emitOp(funcDef, Opcode.OP_gosub)
        const gosubOffsetPos = funcDef.byteCode.size
        compiler.emitU32(funcDef, 0) // Placeholder
        
        // Patch gosub later
        labelManager.currentPendingLabels.push(`gosub_${gosubOffsetPos}`)
      }

      compiler.emitOp(funcDef, Opcode.OP_goto8)
      gotoEndOffsetPos = funcDef.byteCode.size
      compiler.emitU8(funcDef, 0) // Placeholder
    }

    // Patch catch offset
    const catchPos = funcDef.byteCode.size
    const catchOffset = catchPos - catchOffsetPos
    funcDef.byteCode.putU32At(catchOffsetPos, catchOffset)

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
      let catch2OffsetPos = -1
      if (hasFinally) {
        compiler.emitOp(funcDef, Opcode.OP_catch)
        catch2OffsetPos = funcDef.byteCode.size
        compiler.emitU32(funcDef, 0) // Placeholder
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
        
        if (hasFinally) {
          compiler.emitOp(funcDef, Opcode.OP_gosub)
          const gosubOffsetPos = funcDef.byteCode.size
          compiler.emitU32(funcDef, 0) // Placeholder
          labelManager.currentPendingLabels.push(`gosub_${gosubOffsetPos}`)
        }
        
        compiler.emitOp(funcDef, Opcode.OP_drop) // Drop undefined
        
        compiler.emitOp(funcDef, Opcode.OP_goto8)
        const gotoEndOffsetPos2 = funcDef.byteCode.size
        compiler.emitU8(funcDef, 0) // Placeholder
        
        // Patch goto end 2
        // console.log(`Pushing goto8_end_${gotoEndOffsetPos2}`)
        labelManager.currentPendingLabels.push(`goto8_end_${gotoEndOffsetPos2}`)
      }

      // Patch catch 2
      if (hasFinally) {
        const catch2Pos = funcDef.byteCode.size
        const catch2Offset = catch2Pos - catch2OffsetPos
        funcDef.byteCode.putU32At(catch2OffsetPos, catch2Offset)
        
        // Catch 2 Handler (rethrow)
        compiler.emitOp(funcDef, Opcode.OP_gosub)
        const gosubOffsetPos = funcDef.byteCode.size
        compiler.emitU32(funcDef, 0) // Placeholder
        labelManager.currentPendingLabels.push(`gosub_${gosubOffsetPos}`)
        
        compiler.emitOp(funcDef, Opcode.OP_throw)
      }

    } else {
      // No catch block, but we are here because of exception (and we have finally)
      // So we are in the catch handler of the try block
      
      // Execute finally
      compiler.emitOp(funcDef, Opcode.OP_gosub)
      const gosubOffsetPos = funcDef.byteCode.size
      compiler.emitU32(funcDef, 0) // Placeholder
      labelManager.currentPendingLabels.push(`gosub_${gosubOffsetPos}`)
      
      // Rethrow
      compiler.emitOp(funcDef, Opcode.OP_throw)
    }

    // Finally Block Label
    if (hasFinally) {
      const finallyPos = funcDef.byteCode.size
      
      // Patch all gosubs
      for (let i = 0; i < labelManager.currentPendingLabels.length; i++) {
        const label = labelManager.currentPendingLabels[i]
        if (label.startsWith('gosub_')) {
          const pos = parseInt(label.split('_')[1])
          const offset = finallyPos - pos
          funcDef.byteCode.putU32At(pos, offset)
          labelManager.currentPendingLabels.splice(i, 1)
          i--
        }
      }

      this.context.visit(node.finallyBlock)
      compiler.emitOp(funcDef, Opcode.OP_ret)
    }

    // End Label
    const endPos = funcDef.byteCode.size
    
    // Patch goto end 1
    if (gotoEndOffsetPos !== -1) {
      const gotoEndOffset = endPos - gotoEndOffsetPos
      if (gotoEndOffset > 127 || gotoEndOffset < -128) {
        throw new Error('Jump offset too large for goto8')
      }
      funcDef.byteCode.buffer[gotoEndOffsetPos] = gotoEndOffset
    }
    
    // Patch other goto ends
    for (let i = 0; i < labelManager.currentPendingLabels.length; i++) {
      const label = labelManager.currentPendingLabels[i]
      if (label.startsWith('goto8_end_')) {
        const pos = parseInt(label.split('_')[2])
        const offset = endPos - pos
        if (offset > 127 || offset < -128) {
          throw new Error('Jump offset too large for goto8')
        }
        funcDef.byteCode.buffer[pos] = offset
        labelManager.currentPendingLabels.splice(i, 1)
        i--
      }
    }

    scopeManager.exit()
  }
}
