import * as ts from 'typescript'
import type { Compiler } from '../../../compiler'
import { Opcode, env } from '../../../env'
import { LValueBuilder } from '../../core/lvalue'

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

  if (operator === ts.SyntaxKind.CommaToken) {
    compiler.compileExpression(expression.left)
    compiler.emitInstruction(Opcode.OP_drop)
    compiler.compileExpression(expression.right)
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
  const right = expression.right

  const lvalueBuilder = new LValueBuilder(compiler)
  const lvalue = lvalueBuilder.prepare(left)

  if (isLogicalAssignmentOperator(operator)) {
    // Logical assignment: a ||= b
    // lvalue.loadForCompound() -> [context], value
    lvalue.loadForCompound()
    
    const endLabel = compiler.createLabel()
    
    // Check condition
    compiler.emitInstruction(Opcode.OP_dup) // [context], value, value
    
    if (operator === ts.SyntaxKind.BarBarEqualsToken) {
      // if true, jump to end (result is value)
      compiler.emitJump(getIfTrueOpcode(), endLabel)
    } else if (operator === ts.SyntaxKind.AmpersandAmpersandEqualsToken) {
      // if false, jump to end (result is value)
      compiler.emitJump(getIfFalseOpcode(), endLabel)
    } else if (operator === ts.SyntaxKind.QuestionQuestionEqualsToken) {
      // if not null/undefined, jump to end (result is value)
      compiler.emitInstruction(Opcode.OP_is_undefined_or_null)
      compiler.emitJump(getIfFalseOpcode(), endLabel)
    }

    // If we are here, we need to assign.
    // Stack: [context], value
    compiler.emitInstruction(Opcode.OP_drop) // [context]
    compiler.compileExpression(right) // [context], right
    lvalue.store() // value (result)
    
    compiler.markLabel(endLabel)
    return
  }

  if (operator === ts.SyntaxKind.EqualsToken) {
    compiler.compileExpression(right)
    lvalue.store()
  } else {
    const opcode = getCompoundAssignmentOpcode(operator)
    lvalue.loadForCompound()
    compiler.compileExpression(right)
    compiler.emitInstruction(opcode, [], expression.operatorToken)
    lvalue.store()
  }
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
