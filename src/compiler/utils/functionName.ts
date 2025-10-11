import * as ts from 'typescript'

/**
 * Strip parenthesis wrappers that do not affect runtime semantics.
 */
function unwrapParentheses(expression: ts.Expression): ts.Expression {
  let current = expression
  while (ts.isParenthesizedExpression(current)) {
    current = current.expression
  }
  return current
}

export function getAnonymousFunctionExpression(
  expression: ts.Expression
): ts.FunctionExpression | ts.ArrowFunction | null {
  const unwrapped = unwrapParentheses(expression)
  if (ts.isArrowFunction(unwrapped)) {
    return unwrapped
  }
  if (ts.isFunctionExpression(unwrapped) && !unwrapped.name) {
    return unwrapped
  }
  return null
}
