import * as ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { Opcode } from '../../env'
import { CompilerContext } from '../CompilerContext'

export class ExpressionVisitor extends VisitorContext {
  constructor(context: CompilerContext) {
    super(context)
  }

  private getCompoundOpcode(kind: ts.SyntaxKind): Opcode | null {
    switch (kind) {
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
      case ts.SyntaxKind.AsteriskAsteriskEqualsToken:
        return Opcode.OP_pow
      case ts.SyntaxKind.LessThanLessThanEqualsToken:
        return Opcode.OP_shl
      case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
        return Opcode.OP_sar
      case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
        return Opcode.OP_shr
      case ts.SyntaxKind.AmpersandEqualsToken:
        return Opcode.OP_and
      case ts.SyntaxKind.BarEqualsToken:
        return Opcode.OP_or
      case ts.SyntaxKind.CaretEqualsToken:
        return Opcode.OP_xor
      default:
        return null
    }
  }

  visitBigIntLiteral(node: ts.BigIntLiteral) {
    
  }

  visitBinaryExpression(node: ts.BinaryExpression) {
    
  }

  visitPrefixUnaryExpression(node: ts.PrefixUnaryExpression) {
   
  }

  visitPostfixUnaryExpression(node: ts.PostfixUnaryExpression) {
    
  }

  visitConditionalExpression(node: ts.ConditionalExpression) {
    
  }

  visitCallExpression(node: ts.CallExpression, isTailCall: boolean = false, tailCallPos: number = -1) {
    
  }

  visitPropertyAccessExpression(node: ts.PropertyAccessExpression) {
    
  }

  visitElementAccessExpression(node: ts.ElementAccessExpression) {
    
  }

  visitArrayLiteralExpression(node: ts.ArrayLiteralExpression) {
    
  }

  visitObjectLiteralExpression(node: ts.ObjectLiteralExpression) {
    
  }

  visitNewExpression(node: ts.NewExpression) {
    
  }

  visitVoidExpression(node: ts.VoidExpression) {
    
  }

  visitDeleteExpression(node: ts.DeleteExpression) {
    
  }

  visitTypeOfExpression(node: ts.TypeOfExpression) {
    
  }
}
