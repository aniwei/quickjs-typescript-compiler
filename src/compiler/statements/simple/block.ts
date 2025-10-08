import * as ts from 'typescript'
import type { Compiler } from '../../../compiler'
import { ScopeKind } from '../../../scopes'

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
