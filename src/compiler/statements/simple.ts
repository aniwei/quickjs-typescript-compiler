import * as ts from 'typescript'
import type { Compiler } from '../../compiler'
import { Opcode } from '../../env'
import { ScopeKind } from '../../scopes'
import type { StatementVisitor, StatementVisitorRegistrar } from '../visitors/statementVisitors'

export function compileBlockStatement(
  compiler: Compiler,
  node: ts.Block,
  options: { createScope?: boolean } = {}
) {
  const shouldCreateScope = options.createScope ?? true
  if (shouldCreateScope) {
    compiler.pushScope(ScopeKind.Block)
  }

  try {
    for (const statement of node.statements) {
      compiler.compileStatement(statement)
    }
  } finally {
    if (shouldCreateScope) {
      compiler.popScope()
    }
  }
}

export function compileExpressionStatement(compiler: Compiler, node: ts.ExpressionStatement) {
  compiler.recordExpressionStatementDebug(node.expression)
  compiler.compileExpression(node.expression)
  compiler.emitInstruction(Opcode.OP_drop, [], node.expression)
}

const simpleStatementVisitors = new Map<ts.SyntaxKind, StatementVisitor>([
  [ts.SyntaxKind.Block, (compiler, node) => compileBlockStatement(compiler, node as ts.Block)],
  [ts.SyntaxKind.ExpressionStatement, (compiler, node) => compileExpressionStatement(compiler, node as ts.ExpressionStatement)],
])

export function registerSimpleStatements(register: StatementVisitorRegistrar) {
  for (const [kind, visitor] of simpleStatementVisitors) {
    register(kind, visitor)
  }
}
