import * as ts from 'typescript'
import type { Compiler } from '../../../compiler'
import { Opcode } from '../../../env'

export function compileExpressionStatement(compiler: Compiler, node: ts.ExpressionStatement) {
  compiler.recordExpressionStatementDebug(node.expression)
  compiler.compileExpression(node.expression)
  if (
    !(
      ts.isCallExpression(node.expression) &&
      node.expression.expression.kind === ts.SyntaxKind.SuperKeyword
    )
  ) {
    compiler.emitInstruction(Opcode.OP_drop, [], node.expression)
  }
}
