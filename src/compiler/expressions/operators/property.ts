import * as ts from 'typescript'
import type { Compiler } from '../../../compiler'
import { Opcode } from '../../../env'

type EmitDebugInfoOptions = Parameters<Compiler['emitInstruction']>[3]

export function compilePropertyAccessExpression(
  compiler: Compiler,
  expression: ts.PropertyAccessExpression,
  optionalChainEndLabel?: string
) {
  compiler.withSourceNode(expression.expression, () => {
    compiler.compileExpression(expression.expression, optionalChainEndLabel)
  })

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

  const propertyAtom = compiler.getAtomId(expression.name.text)
  const operatorPos = compiler.getPropertyAccessOperatorPos(expression)
  const debug: EmitDebugInfoOptions | undefined = operatorPos !== undefined
    ? { tsSourcePos: operatorPos }
    : undefined
  compiler.emitInstruction(Opcode.OP_get_field, [propertyAtom], expression.name, debug)
}
