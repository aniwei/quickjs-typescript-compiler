import * as ts from 'typescript'
import type { Compiler } from '../../../compiler'
import { Opcode } from '../../../env'

export function compilePrefixUnaryExpression(compiler: Compiler, expression: ts.PrefixUnaryExpression) {
  const operator = expression.operator

  switch (operator) {
    case ts.SyntaxKind.PlusToken:
    case ts.SyntaxKind.MinusToken:
    case ts.SyntaxKind.TildeToken:
    case ts.SyntaxKind.ExclamationToken:
      break
    default:
      throw new Error(`Unsupported prefix unary operator: ${ts.SyntaxKind[operator]}`)
  }

  compiler.compileExpression(expression.operand)

  switch (operator) {
    case ts.SyntaxKind.PlusToken:
      compiler.emitInstruction(Opcode.OP_plus, [], expression)
      break
    case ts.SyntaxKind.MinusToken:
      compiler.emitInstruction(Opcode.OP_neg, [], expression)
      break
    case ts.SyntaxKind.TildeToken:
      compiler.emitInstruction(Opcode.OP_not, [], expression)
      break
    case ts.SyntaxKind.ExclamationToken:
      compiler.emitInstruction(Opcode.OP_lnot, [], expression)
      break
    default:
      throw new Error(`Unsupported prefix unary operator: ${ts.SyntaxKind[operator]}`)
  }
}

export function compilePostfixUnaryExpression(_: Compiler, expression: ts.PostfixUnaryExpression): never {
  throw new Error(`Unsupported postfix unary operator: ${ts.SyntaxKind[expression.operator]}`)
}
