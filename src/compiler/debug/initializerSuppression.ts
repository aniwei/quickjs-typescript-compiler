import * as ts from 'typescript'

export function shouldSuppressTopLevelInitializerDebug(
  initializer?: ts.Expression
): boolean {
  if (!initializer) {
    return true
  }

  while (ts.isParenthesizedExpression(initializer)) {
    initializer = initializer.expression
  }

  if (ts.isFunctionExpression(initializer) || ts.isArrowFunction(initializer)) {
    return true
  }

  if (ts.isLiteralExpression(initializer)) {
    return true
  }

  if (ts.isArrayLiteralExpression(initializer)) {
    if (initializer.elements.some((element) => ts.isOmittedExpression(element) || ts.isSpreadElement(element))) {
      return false
    }
    return initializer.elements
      .filter((element): element is ts.Expression => !ts.isOmittedExpression(element) && !ts.isSpreadElement(element))
      .every((element) => shouldSuppressTopLevelInitializerDebug(element))
  }

  if (ts.isObjectLiteralExpression(initializer)) {
    for (const property of initializer.properties) {
      if (ts.isPropertyAssignment(property)) {
        const name = property.name
        if (!name || ts.isComputedPropertyName(name) || ts.isPrivateIdentifier(name)) {
          return false
        }
        if (!property.initializer) {
          return false
        }
        if (!shouldSuppressTopLevelInitializerDebug(property.initializer)) {
          return false
        }
        continue
      }

      if (ts.isShorthandPropertyAssignment(property)) {
        const name = property.name
        if (!name || ts.isPrivateIdentifier(name)) {
          return false
        }
        if (!shouldSuppressTopLevelInitializerDebug(name)) {
          return false
        }
        continue
      }

      return false
    }
    return true
  }

  switch (initializer.kind) {
    case ts.SyntaxKind.TrueKeyword:
    case ts.SyntaxKind.FalseKeyword:
    case ts.SyntaxKind.NullKeyword:
      return true
    default:
      break
  }

  if (ts.isIdentifier(initializer)) {
    return true
  }

  if (ts.isPrefixUnaryExpression(initializer)) {
    switch (initializer.operator) {
      case ts.SyntaxKind.PlusToken:
      case ts.SyntaxKind.MinusToken:
        return shouldSuppressTopLevelInitializerDebug(initializer.operand)
      default:
        return false
    }
  }

  return false
}
