import * as ts from 'typescript'
import type { Compiler } from '../../../compiler'
import { Opcode } from '../../../env'

export function compileExpressionStatement(compiler: Compiler, node: ts.ExpressionStatement) {
  compiler.recordExpressionStatementDebug(node.expression)
  compiler.compileExpression(node.expression)
  compiler.emitInstruction(Opcode.OP_drop, [], node.expression)
}
