import * as ts from 'typescript'
import type { Compiler } from '../../../compiler'
import { Opcode, env } from '../../../env'

type EmitDebugInfoOptions = Parameters<Compiler['emitInstruction']>[3]

export function compileBinaryExpression(compiler: Compiler, expression: ts.BinaryExpression) {
  const operator = expression.operatorToken.kind
  if (operator >= ts.SyntaxKind.FirstAssignment && operator <= ts.SyntaxKind.LastAssignment) {
    compileAssignmentExpression(compiler, expression)
    return
  }

  if (
    operator === ts.SyntaxKind.BarBarToken ||
    operator === ts.SyntaxKind.AmpersandAmpersandToken ||
    operator === ts.SyntaxKind.QuestionQuestionToken
  ) {
    compileLogicalBinaryExpression(compiler, expression)
    return
  }

  const opcode = getBinaryOperationOpcode(operator)
  if (opcode === null) {
    throw new Error(`Unsupported binary operator: ${ts.SyntaxKind[operator]}`)
  }
  compiler.compileExpression(expression.left)
  compiler.compileExpression(expression.right)
  compiler.emitInstruction(opcode, [], expression.operatorToken)
}

function compileAssignmentExpression(compiler: Compiler, expression: ts.BinaryExpression) {
  const operator = expression.operatorToken.kind
  const left = expression.left

  if (isLogicalAssignmentOperator(operator)) {
    if (ts.isIdentifier(left)) {
      compileLogicalAssignmentIdentifier(compiler, left, expression.right, operator, expression)
      return
    }
    if (ts.isPropertyAccessExpression(left)) {
      compileLogicalAssignmentProperty(compiler, left, expression.right, operator, expression)
      return
    }
    throw new Error(`Unsupported logical assignment target: ${ts.SyntaxKind[left.kind]}`)
  }

  if (ts.isIdentifier(left)) {
    compileIdentifierAssignment(compiler, left, expression.right, operator, expression)
    return
  }
  if (ts.isPropertyAccessExpression(left)) {
    compilePropertyAssignment(compiler, left, expression.right, operator, expression)
    return
  }
  throw new Error(`Unsupported assignment target: ${ts.SyntaxKind[left.kind]}`)
}

function compileIdentifierAssignment(
  compiler: Compiler,
  left: ts.Identifier,
  right: ts.Expression,
  operator: ts.SyntaxKind,
  expression: ts.BinaryExpression
) {
  const atom = compiler.getAtomId(left.text)

  if (operator === ts.SyntaxKind.EqualsToken) {
    compiler.compileExpression(right)
  } else {
    const opcode = getCompoundAssignmentOpcode(operator)
    compiler.emitLoadIdentifier(left)
    compiler.compileExpression(right)
    compiler.emitInstruction(opcode, [], expression.operatorToken)
  }

  compiler.emitInstruction(Opcode.OP_dup)
  compiler.emitStoreIdentifier(atom, left)
}

function compilePropertyAssignment(
  compiler: Compiler,
  left: ts.PropertyAccessExpression,
  right: ts.Expression,
  operator: ts.SyntaxKind,
  expression: ts.BinaryExpression
) {
  const propertyAtom = compiler.getAtomId(left.name.text)
  const propertyOperatorPos = compiler.getPropertyAccessOperatorPos(left)
  const propertyDebug: EmitDebugInfoOptions | undefined = propertyOperatorPos !== undefined
    ? { tsSourcePos: propertyOperatorPos }
    : undefined

  compiler.withSourceNode(left.expression, () => {
    compiler.compileExpression(left.expression)
  })

  if (operator === ts.SyntaxKind.EqualsToken) {
    compiler.compileExpression(right)
  } else {
    const opcode = getCompoundAssignmentOpcode(operator)
    compiler.emitInstruction(Opcode.OP_dup)
    compiler.emitInstruction(Opcode.OP_get_field, [propertyAtom], left.name, propertyDebug)
    compiler.compileExpression(right)
    compiler.emitInstruction(opcode, [], expression.operatorToken)
  }

  compiler.emitInstruction(Opcode.OP_dup)
  compiler.emitInstruction(Opcode.OP_rot3r)
  compiler.emitInstruction(Opcode.OP_put_field, [propertyAtom], left.name, propertyDebug)
}

function compileLogicalBinaryExpression(compiler: Compiler, expression: ts.BinaryExpression) {
  const operator = expression.operatorToken.kind
  const endLabel = compiler.createLabel()

  compiler.compileExpression(expression.left)

  switch (operator) {
    case ts.SyntaxKind.BarBarToken: {
      compiler.emitInstruction(Opcode.OP_dup, [], expression.operatorToken)
      compiler.emitJump(getIfTrueOpcode(), endLabel)
      compiler.emitInstruction(Opcode.OP_drop)
      compiler.compileExpression(expression.right)
      break
    }
    case ts.SyntaxKind.AmpersandAmpersandToken: {
      compiler.emitInstruction(Opcode.OP_dup, [], expression.operatorToken)
      compiler.emitJump(getIfFalseOpcode(), endLabel)
      compiler.emitInstruction(Opcode.OP_drop)
      compiler.compileExpression(expression.right)
      break
    }
    case ts.SyntaxKind.QuestionQuestionToken: {
      compiler.emitInstruction(Opcode.OP_dup, [], expression.operatorToken)
      compiler.emitInstruction(Opcode.OP_is_undefined_or_null, [], expression.operatorToken)
      compiler.emitJump(getIfFalseOpcode(), endLabel)
      compiler.emitInstruction(Opcode.OP_drop)
      compiler.compileExpression(expression.right)
      break
    }
    default:
      throw new Error(`Unsupported logical operator: ${ts.SyntaxKind[operator]}`)
  }

  compiler.markLabel(endLabel)
}

function compileLogicalAssignmentIdentifier(
  compiler: Compiler,
  left: ts.Identifier,
  right: ts.Expression,
  operator: ts.SyntaxKind,
  expression: ts.BinaryExpression
) {
  const atom = compiler.getAtomId(left.text)
  const skipLabel = compiler.createLabel()

  compiler.emitLoadIdentifier(left)

  switch (operator) {
    case ts.SyntaxKind.BarBarEqualsToken: {
      compiler.emitInstruction(Opcode.OP_dup, [], expression.operatorToken)
      compiler.emitJump(getIfTrueOpcode(), skipLabel)
      compiler.emitInstruction(Opcode.OP_drop)
      compiler.compileExpression(right)
      compiler.emitInstruction(Opcode.OP_dup)
      compiler.emitStoreIdentifier(atom, left)
      break
    }
    case ts.SyntaxKind.AmpersandAmpersandEqualsToken: {
      compiler.emitInstruction(Opcode.OP_dup, [], expression.operatorToken)
      compiler.emitJump(getIfFalseOpcode(), skipLabel)
      compiler.emitInstruction(Opcode.OP_drop)
      compiler.compileExpression(right)
      compiler.emitInstruction(Opcode.OP_dup)
      compiler.emitStoreIdentifier(atom, left)
      break
    }
    case ts.SyntaxKind.QuestionQuestionEqualsToken: {
      compiler.emitInstruction(Opcode.OP_dup, [], expression.operatorToken)
      compiler.emitInstruction(Opcode.OP_is_undefined_or_null, [], expression.operatorToken)
      compiler.emitJump(getIfFalseOpcode(), skipLabel)
      compiler.emitInstruction(Opcode.OP_drop)
      compiler.compileExpression(right)
      compiler.emitInstruction(Opcode.OP_dup)
      compiler.emitStoreIdentifier(atom, left)
      break
    }
    default:
      throw new Error(`Unsupported logical assignment operator: ${ts.SyntaxKind[operator]}`)
  }

  compiler.markLabel(skipLabel)
}

function compileLogicalAssignmentProperty(
  compiler: Compiler,
  left: ts.PropertyAccessExpression,
  right: ts.Expression,
  operator: ts.SyntaxKind,
  expression: ts.BinaryExpression
) {
  const propertyAtom = compiler.getAtomId(left.name.text)
  const propertyOperatorPos = compiler.getPropertyAccessOperatorPos(left)
  const propertyDebug: EmitDebugInfoOptions | undefined = propertyOperatorPos !== undefined
    ? { tsSourcePos: propertyOperatorPos }
    : undefined

  const skipLabel = compiler.createLabel()
  const endLabel = compiler.createLabel()

  compiler.withSourceNode(left.expression, () => {
    compiler.compileExpression(left.expression)
  })

  compiler.emitInstruction(Opcode.OP_dup, [], expression.operatorToken)
  compiler.emitInstruction(Opcode.OP_get_field, [propertyAtom], left.name, propertyDebug)

  switch (operator) {
    case ts.SyntaxKind.BarBarEqualsToken: {
      compiler.emitInstruction(Opcode.OP_dup, [], expression.operatorToken)
      compiler.emitJump(getIfTrueOpcode(), skipLabel)
      compiler.emitInstruction(Opcode.OP_drop)
      compiler.compileExpression(right)
      compiler.emitInstruction(Opcode.OP_dup)
      compiler.emitInstruction(Opcode.OP_rot3r)
      compiler.emitInstruction(Opcode.OP_put_field, [propertyAtom], left.name, propertyDebug)
      compiler.emitGoto(endLabel)
      break
    }
    case ts.SyntaxKind.AmpersandAmpersandEqualsToken: {
      compiler.emitInstruction(Opcode.OP_dup, [], expression.operatorToken)
      compiler.emitJump(getIfFalseOpcode(), skipLabel)
      compiler.emitInstruction(Opcode.OP_drop)
      compiler.compileExpression(right)
      compiler.emitInstruction(Opcode.OP_dup)
      compiler.emitInstruction(Opcode.OP_rot3r)
      compiler.emitInstruction(Opcode.OP_put_field, [propertyAtom], left.name, propertyDebug)
      compiler.emitGoto(endLabel)
      break
    }
    case ts.SyntaxKind.QuestionQuestionEqualsToken: {
      compiler.emitInstruction(Opcode.OP_dup, [], expression.operatorToken)
      compiler.emitInstruction(Opcode.OP_is_undefined_or_null, [], expression.operatorToken)
      compiler.emitJump(getIfFalseOpcode(), skipLabel)
      compiler.emitInstruction(Opcode.OP_drop)
      compiler.compileExpression(right)
      compiler.emitInstruction(Opcode.OP_dup)
      compiler.emitInstruction(Opcode.OP_rot3r)
      compiler.emitInstruction(Opcode.OP_put_field, [propertyAtom], left.name, propertyDebug)
      compiler.emitGoto(endLabel)
      break
    }
    default:
      throw new Error(`Unsupported logical assignment operator: ${ts.SyntaxKind[operator]}`)
  }

  compiler.markLabel(skipLabel)
  compiler.emitInstruction(Opcode.OP_swap)
  compiler.emitInstruction(Opcode.OP_drop)
  compiler.markLabel(endLabel)
}

function getCompoundAssignmentOpcode(operator: ts.SyntaxKind): Opcode {
  switch (operator) {
    case ts.SyntaxKind.PlusEqualsToken:
      return Opcode.OP_add
    case ts.SyntaxKind.MinusEqualsToken:
      return Opcode.OP_sub
    case ts.SyntaxKind.AsteriskEqualsToken:
      return Opcode.OP_mul
    case ts.SyntaxKind.SlashEqualsToken:
      return Opcode.OP_div
    case ts.SyntaxKind.PercentEqualsToken:
      return Opcode.OP_mod
    case ts.SyntaxKind.AmpersandEqualsToken:
      return Opcode.OP_and
    case ts.SyntaxKind.BarEqualsToken:
      return Opcode.OP_or
    case ts.SyntaxKind.CaretEqualsToken:
      return Opcode.OP_xor
    case ts.SyntaxKind.LessThanLessThanEqualsToken:
      return Opcode.OP_shl
    case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
      return Opcode.OP_sar
    case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
      return Opcode.OP_shr
    case ts.SyntaxKind.AsteriskAsteriskEqualsToken:
      return Opcode.OP_pow
    default:
      throw new Error(`Unsupported assignment operator: ${ts.SyntaxKind[operator]}`)
  }
}

function isLogicalAssignmentOperator(operator: ts.SyntaxKind): boolean {
  return (
    operator === ts.SyntaxKind.BarBarEqualsToken ||
    operator === ts.SyntaxKind.AmpersandAmpersandEqualsToken ||
    operator === ts.SyntaxKind.QuestionQuestionEqualsToken
  )
}

function getIfTrueOpcode(): Opcode {
  return env.supportsShortOpcodes ? Opcode.OP_if_true8 : Opcode.OP_if_true
}

function getIfFalseOpcode(): Opcode {
  return env.supportsShortOpcodes ? Opcode.OP_if_false8 : Opcode.OP_if_false
}

function getBinaryOperationOpcode(operator: ts.SyntaxKind): Opcode | null {
  switch (operator) {
    case ts.SyntaxKind.PlusToken:
      return Opcode.OP_add
    case ts.SyntaxKind.AsteriskToken:
      return Opcode.OP_mul
    case ts.SyntaxKind.AsteriskAsteriskToken:
      return Opcode.OP_pow
    case ts.SyntaxKind.MinusToken:
      return Opcode.OP_sub
    case ts.SyntaxKind.SlashToken:
      return Opcode.OP_div
    case ts.SyntaxKind.PercentToken:
      return Opcode.OP_mod
    case ts.SyntaxKind.LessThanLessThanToken:
      return Opcode.OP_shl
    case ts.SyntaxKind.LessThanToken:
      return Opcode.OP_lt
    case ts.SyntaxKind.LessThanEqualsToken:
      return Opcode.OP_lte
    case ts.SyntaxKind.GreaterThanGreaterThanToken:
      return Opcode.OP_sar
    case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
      return Opcode.OP_shr
    case ts.SyntaxKind.GreaterThanToken:
      return Opcode.OP_gt
    case ts.SyntaxKind.GreaterThanEqualsToken:
      return Opcode.OP_gte
    case ts.SyntaxKind.AmpersandToken:
      return Opcode.OP_and
    case ts.SyntaxKind.BarToken:
      return Opcode.OP_or
    case ts.SyntaxKind.CaretToken:
      return Opcode.OP_xor
    case ts.SyntaxKind.InKeyword:
      return Opcode.OP_in
    case ts.SyntaxKind.InstanceOfKeyword:
      return Opcode.OP_instanceof
    default:
      return null
  }
}
