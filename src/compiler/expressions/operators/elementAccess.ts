import * as ts from 'typescript'
import type { Compiler } from '../../../compiler'
import { Opcode } from '../../../env'

export function compileElementAccessExpression(
  compiler: Compiler,
  expression: ts.ElementAccessExpression,
  optionalChainEndLabel?: string
) {
  compiler.compileExpression(expression.expression, optionalChainEndLabel)

  if (expression.questionDotToken && optionalChainEndLabel) {
    compiler.emitInstruction(Opcode.OP_dup)
    compiler.emitInstruction(Opcode.OP_is_undefined_or_null)
    const continueLabel = compiler.createLabel()
    compiler.emitJump(Opcode.OP_if_false8, continueLabel)
    compiler.emitInstruction(Opcode.OP_drop)
    compiler.emitInstruction(Opcode.OP_undefined)
    compiler.emitJump(Opcode.OP_goto8, optionalChainEndLabel)
    compiler.markLabel(continueLabel)
  }

  compiler.compileExpression(expression.argumentExpression)
  compiler.emitInstruction(Opcode.OP_get_array_el, [], expression)
}
