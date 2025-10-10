import * as ts from 'typescript'

let internalNameCounter = 0

export function setRangeFrom<T extends ts.Node>(node: T, source: ts.Node): T {
  return ts.setTextRange(node, { pos: source.pos, end: source.end })
}

export function createInternalIdentifier(base: string, source: ts.Node): ts.Identifier {
  internalNameCounter += 1
  return setRangeFrom(ts.factory.createIdentifier(`__${base}_${internalNameCounter}`), source)
}

export function createIdentifierFromSource(name: string, source: ts.Node): ts.Identifier {
  return setRangeFrom(ts.factory.createIdentifier(name), source)
}

export function createPropertyNameLiteral(name: ts.PropertyName, source: ts.Node): ts.Expression {
  if (ts.isIdentifier(name)) {
    return setRangeFrom(ts.factory.createStringLiteral(name.text), source)
  }
  if (ts.isStringLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name)) {
    return setRangeFrom(ts.factory.createStringLiteral(name.text), source)
  }
  if (ts.isNumericLiteral(name)) {
    return setRangeFrom(ts.factory.createStringLiteral(name.text), source)
  }
  throw new Error(`Unsupported class member name kind: ${ts.SyntaxKind[name.kind]}`)
}

export function createPropertyAccessFromSource(
  expression: ts.Expression,
  name: string | ts.Identifier,
  source: ts.Node
): ts.PropertyAccessExpression {
  const exprWithRange = setRangeFrom(expression, source)
  const nameNode = typeof name === 'string'
    ? createIdentifierFromSource(name, source)
    : createIdentifierFromSource(name.text, source)
  return setRangeFrom(ts.factory.createPropertyAccessExpression(exprWithRange, nameNode), source)
}

export function createElementAccessFromSource(
  expression: ts.Expression,
  argument: ts.Expression,
  source: ts.Node
): ts.ElementAccessExpression {
  const exprWithRange = setRangeFrom(expression, source)
  const argumentWithRange = setRangeFrom(argument, source)
  return setRangeFrom(ts.factory.createElementAccessExpression(exprWithRange, argumentWithRange), source)
}

export function createMemberContainerExpression(
  classIdentifier: ts.Identifier,
  member: ts.Node,
  isStatic: boolean
): ts.Expression {
  const classRef = createIdentifierFromSource(classIdentifier.text, member)
  if (isStatic) {
    return classRef
  }
  return createPropertyAccessFromSource(classRef, 'prototype', member)
}

export function createConstructorFunctionExpression(
  node: ts.ClassDeclaration,
  classIdentifier: ts.Identifier,
  constructorDecl: ts.ConstructorDeclaration | undefined,
  baseIdentifier: ts.Identifier | null
): ts.FunctionExpression {
  if (constructorDecl) {
    const statements = constructorDecl.body ? [...constructorDecl.body.statements] : []
    const transformedStatements = baseIdentifier
      ? statements.map((statement) => {
          if (
            ts.isExpressionStatement(statement) &&
            ts.isCallExpression(statement.expression) &&
            statement.expression.expression.kind === ts.SyntaxKind.SuperKeyword
          ) {
                const callArguments = [
                  ts.factory.createThis(),
                  ...statement.expression.arguments.map((arg) => arg),
                ]
                const callExpression = setRangeFrom(
                  ts.factory.createCallExpression(
                    createPropertyAccessFromSource(baseIdentifier, 'call', statement),
                    undefined,
                    callArguments
                  ),
                  statement
                )
                return setRangeFrom(ts.factory.createExpressionStatement(callExpression), statement)
          }
          return statement
        })
      : statements

    const func = ts.factory.createFunctionExpression(
      undefined,
      undefined,
      classIdentifier,
      undefined,
      constructorDecl.parameters,
      undefined,
      ts.factory.createBlock(transformedStatements, true)
    )
    return setRangeFrom(func, constructorDecl)
  }

  if (baseIdentifier) {
    const func = ts.factory.createFunctionExpression(
      undefined,
      undefined,
      classIdentifier,
      undefined,
      [],
      undefined,
      ts.factory.createBlock(
        [
                    setRangeFrom(
                        ts.factory.createExpressionStatement(
                            setRangeFrom(
                                ts.factory.createCallExpression(
                                    createPropertyAccessFromSource(baseIdentifier, 'apply', node),
                                    undefined,
                                    [ts.factory.createThis(), createIdentifierFromSource('arguments', node)]
                                ),
                                node
                            )
                        ),
                        node
                    ),
        ],
        true
      )
    )
    return setRangeFrom(func, node)
  }

  const func = ts.factory.createFunctionExpression(
    undefined,
    undefined,
    classIdentifier,
    undefined,
    [],
    undefined,
    ts.factory.createBlock([], true)
  )
  return setRangeFrom(func, node)
}

export function createMethodFunctionExpression(
  method: ts.MethodDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration
): ts.FunctionExpression {
  const functionName = ts.isIdentifier(method.name) ? method.name : undefined
  const parameters = 'parameters' in method ? method.parameters : []
  const body = method.body ?? ts.factory.createBlock([], true)
  const func = ts.factory.createFunctionExpression(
    undefined,
    undefined,
    functionName,
    undefined,
    parameters,
    undefined,
    body
  )
  return setRangeFrom(func, method)
}
