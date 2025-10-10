import * as ts from 'typescript'
import type { Compiler } from '../../compiler'
import { Opcode, env } from '../../env'
import type { StatementVisitor, StatementVisitorRegistrar } from '../visitors/statementVisitors'
import { compileForInStatement, compileForOfStatement, compileForStatement, compileWhileStatement } from './loops'
import { compileBlockStatement } from './simple/index'

function labeledStatementVisitor(compiler: Compiler, node: ts.Statement) {
  compileLabeledStatement(compiler, node as ts.LabeledStatement)
}

function compileIfStatement(compiler: Compiler, node: ts.IfStatement) {
  compiler.compileExpression(node.expression)

  const elseLabel = compiler.createLabel()
  const hasElse = node.elseStatement !== undefined
  const endLabel = hasElse ? compiler.createLabel() : null
  const conditionalOpcode = env.supportsShortOpcodes ? Opcode.OP_if_false8 : Opcode.OP_if_false

  compiler.emitJump(conditionalOpcode, elseLabel)

  if (ts.isBlock(node.thenStatement)) {
    compileBlockStatement(compiler, node.thenStatement)
  } else {
    compiler.compileStatement(node.thenStatement)
  }

  if (hasElse && endLabel) {
    compiler.emitGoto(endLabel)
  }

  compiler.markLabel(elseLabel)

  if (hasElse) {
    const elseStatement = node.elseStatement!
    if (ts.isBlock(elseStatement)) {
      compileBlockStatement(compiler, elseStatement)
    } else {
      compiler.compileStatement(elseStatement)
    }

    if (endLabel) {
      compiler.markLabel(endLabel)
    }
  }
}

function ifStatementVisitor(compiler: Compiler, node: ts.Statement) {
  compileIfStatement(compiler, node as ts.IfStatement)
}

function switchStatementVisitor(compiler: Compiler, node: ts.Statement) {
  compileSwitchStatement(compiler, node as ts.SwitchStatement)
}

function breakStatementVisitor(compiler: Compiler, node: ts.Statement) {
  compileBreakStatement(compiler, node as ts.BreakStatement)
}

function continueStatementVisitor(compiler: Compiler, node: ts.Statement) {
  compileContinueStatement(compiler, node as ts.ContinueStatement)
}

function returnStatementVisitor(compiler: Compiler, node: ts.Statement) {
  compileReturnStatement(compiler, node as ts.ReturnStatement)
}

function throwStatementVisitor(compiler: Compiler, node: ts.Statement) {
  compileThrowStatement(compiler, node as ts.ThrowStatement)
}

function compileReturnStatement(compiler: Compiler, node: ts.ReturnStatement) {
  if (node.expression) {
    compiler.compileExpression(node.expression)
    compiler.emitReturnOpcode(node)
  } else {
    compiler.emitVoidReturnOpcode(node)
  }
  compiler.markExplicitReturn()
}

function compileThrowStatement(compiler: Compiler, node: ts.ThrowStatement) {
  if (!node.expression) {
    throw new Error('Throw statement must have an expression')
  }
  compiler.compileExpression(node.expression)
  compiler.emitInstruction(Opcode.OP_throw, [], node)
}

function compileBreakStatement(compiler: Compiler, node: ts.BreakStatement) {
  const { target, unwindTargets } = compiler.resolveBreak(node)
  for (const unwind of unwindTargets) {
    compiler.emitControlFlowUnwind(unwind)
  }
  compiler.emitGoto(target.breakLabel)
}

function compileContinueStatement(compiler: Compiler, node: ts.ContinueStatement) {
  const { target, unwindTargets } = compiler.resolveContinue(node)
  for (const unwind of unwindTargets) {
    compiler.emitControlFlowUnwind(unwind)
  }
  compiler.emitGoto(target.continueLabel)
}

export const controlFlowStatementVisitors = new Map<ts.SyntaxKind, StatementVisitor>([
  [ts.SyntaxKind.LabeledStatement, labeledStatementVisitor],
  [ts.SyntaxKind.IfStatement, ifStatementVisitor],
  [ts.SyntaxKind.SwitchStatement, switchStatementVisitor],
  [ts.SyntaxKind.BreakStatement, breakStatementVisitor],
  [ts.SyntaxKind.ContinueStatement, continueStatementVisitor],
  [ts.SyntaxKind.ReturnStatement, returnStatementVisitor],
  [ts.SyntaxKind.ThrowStatement, throwStatementVisitor],
])

export function registerControlFlowStatements(register: StatementVisitorRegistrar) {
  for (const [kind, visitor] of controlFlowStatementVisitors) {
    register(kind, visitor)
  }
}

function compileLabeledStatement(compiler: Compiler, node: ts.LabeledStatement) {
  const labelName = node.label.text

  if (ts.isForOfStatement(node.statement)) {
    compileForOfStatement(compiler, node.statement, { labelName })
    return
  }
  if (ts.isForInStatement(node.statement)) {
    compileForInStatement(compiler, node.statement, { labelName })
    return
  }
  if (ts.isWhileStatement(node.statement)) {
    compileWhileStatement(compiler, node.statement, { labelName })
    return
  }
  if (ts.isForStatement(node.statement)) {
    compileForStatement(compiler, node.statement, { labelName })
    return
  }
  if (ts.isSwitchStatement(node.statement)) {
    compileSwitchStatement(compiler, node.statement, { labelName })
    return
  }

  const breakLabel = compiler.createLabel()
  compiler.pushLabelTarget(labelName, breakLabel)
  try {
    compiler.compileStatement(node.statement)
  } finally {
    compiler.popLabelTarget()
  }
  compiler.markLabel(breakLabel)
}

function compileSwitchStatement(
  compiler: Compiler,
  node: ts.SwitchStatement,
  options: { labelName?: string } = {}
) {
  compiler.withSourceNode(node.expression, () => {
    compiler.compileExpression(node.expression)

    const exitLabel = compiler.createLabel()
    const clauses = node.caseBlock.clauses
    const pendingFallthroughLabels: string[] = []
    let nextCaseLabel: string | null = null
    let previousClauseFallsThrough = false
    let hasDefaultClause = false
    let requiresDropAfterSwitch = false

    const defaultClauseIndex = clauses.findIndex((clause) => ts.isDefaultClause(clause))
    const defaultLabel = defaultClauseIndex >= 0 ? compiler.createLabel() : null
    const afterDefaultLabel =
      defaultClauseIndex >= 0 && defaultClauseIndex < clauses.length - 1 ? compiler.createLabel() : null
    let shouldMarkAfterDefaultLabel = false

    compiler.pushSwitchTarget(exitLabel, { labelName: options.labelName })
    try {
      for (let index = 0; index < clauses.length; index += 1) {
        const clause = clauses[index]

        if (ts.isCaseClause(clause)) {
          if (nextCaseLabel !== null) {
            if (previousClauseFallsThrough) {
              const fallthroughLabel = compiler.createLabel()
              compiler.emitGoto(fallthroughLabel)
              pendingFallthroughLabels.push(fallthroughLabel)
            }
            compiler.markLabel(nextCaseLabel)
            nextCaseLabel = null
          }

          const caseChain: ts.CaseClause[] = [clause]
          while (index + 1 < clauses.length) {
            const lastInChain = caseChain[caseChain.length - 1]
            if (lastInChain.statements.length > 0) {
              break
            }
            const nextClause = clauses[index + 1]
            if (!ts.isCaseClause(nextClause)) {
              break
            }
            caseChain.push(nextClause)
            index += 1
          }

          const nextClause = clauses[index + 1]
          const isAfterDefault = defaultClauseIndex >= 0 && index > defaultClauseIndex
          const isNextClauseDefault = !!nextClause && ts.isDefaultClause(nextClause)

          let caseEntryLabel: string
          if (isNextClauseDefault) {
            caseEntryLabel = defaultLabel ?? compiler.createLabel()
          } else {
            caseEntryLabel = compiler.createLabel()
          }

          let testFailureLabel: string
          if (isAfterDefault && defaultLabel) {
            testFailureLabel = defaultLabel
          } else if (isNextClauseDefault && afterDefaultLabel) {
            testFailureLabel = afterDefaultLabel
            shouldMarkAfterDefaultLabel = true
          } else if (isNextClauseDefault && defaultLabel) {
            testFailureLabel = defaultLabel
          } else {
            testFailureLabel = caseEntryLabel
          }

          let sharedTrueLabel: string | null = null
          for (let chainIndex = 0; chainIndex < caseChain.length; chainIndex += 1) {
            const currentClause = caseChain[chainIndex]
            compiler.withoutDebugRecording(() => {
              compiler.emitInstruction(Opcode.OP_dup, [], null)
              compiler.compileExpression(currentClause.expression)
              compiler.emitInstruction(Opcode.OP_strict_eq, [], null)
            })

            const isLastClauseInChain = chainIndex === caseChain.length - 1
            if (!isLastClauseInChain) {
              sharedTrueLabel = emitConditionalJumpChain(compiler, Opcode.OP_if_true8, sharedTrueLabel)
            } else {
              nextCaseLabel = caseEntryLabel
              compiler.emitJump(Opcode.OP_if_false8, testFailureLabel)
              if (sharedTrueLabel) {
                compiler.markLabel(sharedTrueLabel)
              }
            }
          }

          flushPendingLabels(compiler, pendingFallthroughLabels)

          const bodyClause =
            [...caseChain].reverse().find((entry) => entry.statements.length > 0) ?? caseChain[caseChain.length - 1]
          const clauseControl = compileSwitchClauseStatements(compiler, bodyClause.statements, options.labelName)
          const fallsThrough = clauseControl.fallsThrough
          if (fallsThrough) {
            requiresDropAfterSwitch = true
          }
          if (clauseControl.exitsSwitch) {
            requiresDropAfterSwitch = true
          }
          previousClauseFallsThrough = fallsThrough

          if (!previousClauseFallsThrough && nextCaseLabel !== null) {
            if (defaultLabel !== null && nextCaseLabel === defaultLabel) {
              // defer marking default label
            } else if (afterDefaultLabel !== null && nextCaseLabel === afterDefaultLabel) {
              // defer until after default clause
            } else {
              compiler.markLabel(nextCaseLabel)
              nextCaseLabel = null
            }
          }
        } else {
          hasDefaultClause = true
          const labelForDefault = defaultLabel ?? compiler.createLabel()

          if (nextCaseLabel === null) {
            nextCaseLabel = labelForDefault
          }

          if (previousClauseFallsThrough) {
            const fallthroughLabel = compiler.createLabel()
            compiler.emitGoto(fallthroughLabel)
            pendingFallthroughLabels.push(fallthroughLabel)
          }

          if (nextCaseLabel !== labelForDefault) {
            compiler.markLabel(nextCaseLabel)
            nextCaseLabel = labelForDefault
          }

          compiler.markLabel(labelForDefault)
          nextCaseLabel = null

          flushPendingLabels(compiler, pendingFallthroughLabels)

          const clauseControl = compileSwitchClauseStatements(compiler, clause.statements, options.labelName)
          const fallsThrough = clauseControl.fallsThrough
          if (fallsThrough) {
            requiresDropAfterSwitch = true
          }
          if (clauseControl.exitsSwitch) {
            requiresDropAfterSwitch = true
          }
          previousClauseFallsThrough = fallsThrough

          if (!previousClauseFallsThrough && nextCaseLabel !== null) {
            compiler.markLabel(nextCaseLabel)
            nextCaseLabel = null
          }

          if (afterDefaultLabel !== null && shouldMarkAfterDefaultLabel) {
            compiler.markLabel(afterDefaultLabel)
            shouldMarkAfterDefaultLabel = false
          }
        }
      }

      if (nextCaseLabel !== null) {
        compiler.markLabel(nextCaseLabel)
      }

      flushPendingLabels(compiler, pendingFallthroughLabels)
      compiler.markLabel(exitLabel)
    } finally {
      compiler.popSwitchTarget()
    }

    if (!hasDefaultClause) {
      requiresDropAfterSwitch = true
    }

    if (requiresDropAfterSwitch) {
      compiler.emitInstruction(Opcode.OP_drop, [], null)
    }
  })
}

function emitConditionalJumpChain(
  compiler: Compiler,
  opcode: Opcode,
  sharedTrueLabel: string | null
): string {
  const targetLabel = sharedTrueLabel ?? compiler.createLabel()
  compiler.emitJump(opcode, targetLabel)
  return targetLabel
}

function flushPendingLabels(compiler: Compiler, labels: string[]) {
  while (labels.length > 0) {
    const label = labels.shift()!
    compiler.markLabel(label)
  }
}

function compileSwitchClauseStatements(
  compiler: Compiler,
  statements: readonly ts.Statement[],
  switchLabelName?: string
): { fallsThrough: boolean; exitsSwitch: boolean } {
  for (const statement of statements) {
    compiler.compileStatement(statement)
  }
  return analyzeSwitchClauseControl(statements, switchLabelName)
}

function analyzeSwitchClauseControl(
  statements: readonly ts.Statement[],
  switchLabelName?: string
): { fallsThrough: boolean; exitsSwitch: boolean } {
  if (statements.length === 0) {
    return { fallsThrough: true, exitsSwitch: false }
  }

  const last = statements[statements.length - 1]

  if (ts.isBlock(last)) {
    return analyzeSwitchClauseControl(last.statements, switchLabelName)
  }

  if (ts.isReturnStatement(last) || ts.isThrowStatement(last)) {
    return { fallsThrough: false, exitsSwitch: false }
  }

  if (ts.isBreakStatement(last)) {
    if (!last.label) {
      return { fallsThrough: false, exitsSwitch: true }
    }
    if (switchLabelName && last.label.text === switchLabelName) {
      return { fallsThrough: false, exitsSwitch: true }
    }
    return { fallsThrough: false, exitsSwitch: false }
  }

  if (ts.isContinueStatement(last)) {
    return { fallsThrough: false, exitsSwitch: false }
  }

  return { fallsThrough: true, exitsSwitch: false }
}
