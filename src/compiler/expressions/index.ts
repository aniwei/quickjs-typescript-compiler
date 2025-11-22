import * as ts from 'typescript'
import type { Compiler } from '../../compiler'
import {
  compileBooleanLiteral,
  compileNoSubstitutionTemplateLiteral,
  compileNullLiteral,
  compileNumericLiteral,
  compileStringLiteral,
  compileTemplateExpression,
  compileThisExpression,
} from './literals'
import { compileCallExpression, compileNewExpression } from './calls'
import { compileArrayLiteralExpression, compileObjectLiteralExpression } from './collections'
import {
  compileBinaryExpression,
  compilePostfixUnaryExpression,
  compilePrefixUnaryExpression,
  compilePropertyAccessExpression,
  compileElementAccessExpression,
  compileVoidExpression,
  compileConditionalExpression,
  compileTypeOfExpression,
  compileDeleteExpression,
} from './operators'
import { compileArrowFunctionExpression, compileFunctionExpression } from './function'
import { assertSupportedNode } from '../utils/syntaxGuard'

export function compileExpression(
  compiler: Compiler,
  expression: ts.Expression,
  optionalChainEndLabel?: string
): void {
  assertSupportedNode(expression)

  if (ts.isOptionalChain(expression) && !optionalChainEndLabel) {
    const endLabel = compiler.createLabel()
    compileExpressionInternal(compiler, expression, endLabel)
    compiler.markLabel(endLabel)
    return
  }

  compileExpressionInternal(compiler, expression, optionalChainEndLabel)
}

function compileExpressionInternal(
  compiler: Compiler,
  expression: ts.Expression,
  optionalChainEndLabel?: string
): void {
  if (ts.isParenthesizedExpression(expression)) {
    compiler.compileExpression(expression.expression, optionalChainEndLabel)
    return
  }

  if (ts.isNumericLiteral(expression)) {
    compileNumericLiteral(compiler, expression)
    return
  }

  if (expression.kind === ts.SyntaxKind.TrueKeyword || expression.kind === ts.SyntaxKind.FalseKeyword) {
    compileBooleanLiteral(compiler, expression)
    return
  }

  if (ts.isStringLiteral(expression)) {
    compileStringLiteral(compiler, expression)
    return
  }

  if (ts.isNoSubstitutionTemplateLiteral(expression)) {
    compileNoSubstitutionTemplateLiteral(compiler, expression)
    return
  }

  if (ts.isTemplateExpression(expression)) {
    compileTemplateExpression(compiler, expression)
    return
  }

  if (expression.kind === ts.SyntaxKind.NullKeyword) {
    compileNullLiteral(compiler, expression)
    return
  }

  if (expression.kind === ts.SyntaxKind.ThisKeyword) {
    compileThisExpression(compiler, expression)
    return
  }

  if (ts.isArrayLiteralExpression(expression)) {
    compileArrayLiteralExpression(compiler, expression)
    return
  }

  if (ts.isObjectLiteralExpression(expression)) {
    compileObjectLiteralExpression(compiler, expression)
    return
  }

  if (ts.isIdentifier(expression)) {
    compiler.emitLoadIdentifier(expression)
    return
  }

  if (ts.isBinaryExpression(expression)) {
    compileBinaryExpression(compiler, expression)
    return
  }

  if (ts.isCallExpression(expression)) {
    compileCallExpression(compiler, expression, optionalChainEndLabel)
    return
  }

  if (ts.isNewExpression(expression)) {
    compileNewExpression(compiler, expression)
    return
  }

  if (ts.isPropertyAccessExpression(expression)) {
    compilePropertyAccessExpression(compiler, expression, optionalChainEndLabel)
    return
  }

  if (ts.isElementAccessExpression(expression)) {
    compileElementAccessExpression(compiler, expression, optionalChainEndLabel)
    return
  }

  if (ts.isFunctionExpression(expression)) {
    compileFunctionExpression(compiler, expression)
    return
  }

  if (ts.isArrowFunction(expression)) {
    compileArrowFunctionExpression(compiler, expression)
    return
  }

  if (ts.isAsExpression(expression)) {
    compiler.compileExpression(expression.expression)
    return
  }

  if (ts.isTypeAssertionExpression(expression)) {
    compiler.compileExpression(expression.expression)
    return
  }

  if (ts.isVoidExpression(expression)) {
    compileVoidExpression(compiler, expression)
    return
  }

  if (ts.isPrefixUnaryExpression(expression)) {
    compilePrefixUnaryExpression(compiler, expression)
    return
  }

  if (ts.isPostfixUnaryExpression(expression)) {
    compilePostfixUnaryExpression(compiler, expression)
    return
  }

  if (ts.isConditionalExpression(expression)) {
    compileConditionalExpression(compiler, expression)
    return
  }

  if (ts.isTypeOfExpression(expression)) {
    compileTypeOfExpression(compiler, expression)
    return
  }

  if (ts.isDeleteExpression(expression)) {
    compileDeleteExpression(compiler, expression)
    return
  }

  throw new Error(`Unsupported expression kind: ${ts.SyntaxKind[expression.kind]}`)
}
