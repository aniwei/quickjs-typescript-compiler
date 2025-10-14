import * as ts from 'typescript'
import type { StatementVisitor, StatementVisitorRegistrar } from '../../visitors/statementVisitors'
import { compileBlockStatement } from './block'
import { compileExpressionStatement } from './expression'

export { compileBlockStatement } from './block'
export { compileExpressionStatement } from './expression'

const simpleStatementVisitors = new Map<ts.SyntaxKind, StatementVisitor>([
  [ts.SyntaxKind.Block, (compiler, node) => compileBlockStatement(compiler, node as ts.Block)],
  [ts.SyntaxKind.ExpressionStatement, (compiler, node) => compileExpressionStatement(compiler, node as ts.ExpressionStatement)],
])

export function registerSimpleStatements(register: StatementVisitorRegistrar) {
  for (const [kind, visitor] of simpleStatementVisitors) {
    register(kind, visitor)
  }
}
