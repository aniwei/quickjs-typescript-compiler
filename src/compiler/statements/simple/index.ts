import * as ts from 'typescript'
import type { StatementVisitor, StatementVisitorRegistrar } from '../../visitors/statementVisitors'

export { compileBlockStatement } from './block'
export { compileExpressionStatement } from './expression'

const simpleStatementVisitors = new Map<ts.SyntaxKind, StatementVisitor>([
  [ts.SyntaxKind.Block, (compiler, node) => compiler.compileBlock(node as ts.Block)],
  [
    ts.SyntaxKind.ExpressionStatement,
    (compiler, node) => compiler.compileExpressionStatement(node as ts.ExpressionStatement),
  ],
])

export function registerSimpleStatements(register: StatementVisitorRegistrar) {
  for (const [kind, visitor] of simpleStatementVisitors) {
    register(kind, visitor)
  }
}
