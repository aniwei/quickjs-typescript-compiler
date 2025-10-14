import * as ts from 'typescript'
import type { Compiler } from '../../../compiler'
import { Opcode } from '../../../env'

type EmitDebugInfoOptions = Parameters<Compiler['emitInstruction']>[3]

export function compilePropertyAccessExpression(compiler: Compiler, expression: ts.PropertyAccessExpression) {
  compiler.withSourceNode(expression.expression, () => {
    compiler.compileExpression(expression.expression)
  })
  const propertyAtom = compiler.getAtomId(expression.name.text)
  const operatorPos = compiler.getPropertyAccessOperatorPos(expression)
  const debug: EmitDebugInfoOptions | undefined = operatorPos !== undefined
    ? { tsSourcePos: operatorPos }
    : undefined
  compiler.emitInstruction(Opcode.OP_get_field, [propertyAtom], expression.name, debug)
}
