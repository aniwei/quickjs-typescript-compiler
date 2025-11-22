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

export function compileTypeOfExpression(compiler: Compiler, expression: ts.TypeOfExpression) {
  if (ts.isIdentifier(expression.expression)) {
    compiler.emitLoadIdentifier(expression.expression, true)
  } else {
    compiler.compileExpression(expression.expression)
  }
  compiler.emitInstruction(Opcode.OP_typeof, [], expression)
}

export function compileDeleteExpression(compiler: Compiler, expression: ts.DeleteExpression) {
  const target = expression.expression

  if (ts.isPropertyAccessExpression(target)) {
    compiler.compileExpression(target.expression)
    const atom = compiler.getAtomId(target.name.text)
    compiler.emitInstruction(Opcode.OP_push_atom_value, [atom], expression)
    compiler.emitInstruction(Opcode.OP_delete, [], expression)
    return
  }

  if (ts.isElementAccessExpression(target)) {
    compiler.compileExpression(target.expression)
    compiler.compileExpression(target.argumentExpression)
    compiler.emitInstruction(Opcode.OP_delete, [], expression)
    return
  }

  if (ts.isIdentifier(target)) {
    // In strict mode, deleting an identifier is a syntax error.
    // However, we'll emit OP_delete_var for now.
    const atom = compiler.getAtomId(target.text)
    compiler.emitInstruction(Opcode.OP_delete_var, [atom], expression)
    return
  }

  // For other expressions, evaluate and return true
  compiler.compileExpression(target)
  compiler.emitInstruction(Opcode.OP_drop, [], expression)
  compiler.emitInstruction(Opcode.OP_push_true, [], expression)
}
