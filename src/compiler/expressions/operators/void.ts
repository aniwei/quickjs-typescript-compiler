import * as ts from 'typescript'
import type { Compiler } from '../../../compiler'
import { Opcode } from '../../../env'

export function compileVoidExpression(compiler: Compiler, expression: ts.VoidExpression) {
  compiler.compileExpression(expression.expression)
  compiler.emitInstruction(Opcode.OP_drop)
  compiler.emitInstruction(Opcode.OP_undefined, [], expression)
}
