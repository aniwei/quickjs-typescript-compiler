import * as ts from 'typescript'
import type { Compiler } from '../../../compiler'
import { Opcode } from '../../../env'

export function compileConditionalExpression(compiler: Compiler, expression: ts.ConditionalExpression) {
  const falseLabel = compiler.createLabel()
  const endLabel = compiler.createLabel()

  // Condition
  compiler.compileExpression(expression.condition)
  compiler.emitJump(Opcode.OP_if_false8, falseLabel)

  // True branch
  compiler.compileExpression(expression.whenTrue)
  compiler.emitJump(Opcode.OP_goto8, endLabel)

  // False branch
  compiler.markLabel(falseLabel)
  compiler.compileExpression(expression.whenFalse)

  // End
  compiler.markLabel(endLabel)
}
