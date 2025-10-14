import * as ts from 'typescript'
import type { Compiler } from '../../compiler'
import { registerControlFlowStatements } from '../statements/controlFlow'
import { registerLoopStatements } from '../statements/loops'
import { registerDeclarationStatements } from '../statements/declarations'
import { registerSimpleStatements } from '../statements/simple/index'

export type StatementVisitor = (compiler: Compiler, node: ts.Statement) => void

export type StatementVisitorRegistrar = (kind: ts.SyntaxKind, visitor: StatementVisitor) => void

const statementVisitors = new Map<ts.SyntaxKind, StatementVisitor>()
let initialized = false

export function registerStatementVisitor(kind: ts.SyntaxKind, visitor: StatementVisitor) {
  statementVisitors.set(kind, visitor)
}

export function getStatementVisitor(kind: ts.SyntaxKind): StatementVisitor | undefined {
  if (!initialized) {
    ensureStatementVisitorsInitialized()
  }
  return statementVisitors.get(kind)
}

export function ensureStatementVisitorsInitialized() {
  if (initialized) {
    return
  }
  initialized = true

  registerControlFlowStatements(registerStatementVisitor)
  registerLoopStatements(registerStatementVisitor)
  registerDeclarationStatements(registerStatementVisitor)
  registerSimpleStatements(registerStatementVisitor)
}
