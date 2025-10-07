import * as ts from 'typescript'
import type { Compiler } from '../../compiler'
import type { StatementVisitor, StatementVisitorRegistrar } from '../visitors/statementVisitors'

const simpleStatementVisitors = new Map<ts.SyntaxKind, StatementVisitor>([
  [ts.SyntaxKind.Block, (compiler, node) => compiler.compileBlock(node as ts.Block)],
  [ts.SyntaxKind.ExpressionStatement, (compiler, node) => compiler.compileExpressionStatement(node as ts.ExpressionStatement)],
])

export function registerSimpleStatements(register: StatementVisitorRegistrar) {
  for (const [kind, visitor] of simpleStatementVisitors) {
    register(kind, visitor)
  }
}
