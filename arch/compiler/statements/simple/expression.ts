import * as ts from 'typescript'
import type { Compiler } from '../../../compiler'
import { Opcode } from '../../../env'

export function compileExpressionStatement(compiler: Compiler, node: ts.ExpressionStatement) {
  compiler.recordExpressionStatementDebug(node.expression)
  if (ts.isVoidExpression(node.expression)) {
    compiler.compileExpression(node.expression.expression)
    compiler.emitInstruction(Opcode.OP_drop, [], node.expression.expression)
    return
  }
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
