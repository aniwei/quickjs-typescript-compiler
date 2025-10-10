import * as ts from 'typescript'
import type { Compiler } from '../../../compiler'
import { VarKind } from '../../../vars'
import { compileExpressionStatement } from '../simple/index'
import {
  createConstructorFunctionExpression,
  createElementAccessFromSource,
  createIdentifierFromSource,
  createInternalIdentifier,
  createMemberContainerExpression,
  createMethodFunctionExpression,
  createPropertyAccessFromSource,
  createPropertyNameLiteral,
  setRangeFrom,
} from './helpers'

export function compileClassDeclaration(compiler: Compiler, node: ts.ClassDeclaration) {
  const hasExportModifier = node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false
  const hasDefaultModifier = node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword) ?? false
  const isModuleTopLevel = compiler.isModuleTopLevelScope()

  let classIdentifier = node.name ?? null
  if (!classIdentifier) {
    if (!hasDefaultModifier) {
      throw new Error('Class declaration must have a name unless it is a default export')
    }
    classIdentifier = createInternalIdentifier('default_class', node)
  }

  const classAtom = compiler.getAtomId(classIdentifier.text)
  if (compiler.hasBindingInCurrentScope(classAtom)) {
    throw new Error(`Identifier '${classIdentifier.text}' has already been declared in this scope`)
  }

  const capture = isModuleTopLevel
  const classVarIndex = compiler.declareLexicalVariable(classAtom, { isConst: true, isLet: true, capture })
  const classVar = compiler.getFunctionVar(classVarIndex)

  if (compiler.isGlobalVarContext() && isModuleTopLevel) {
    compiler.registerGlobalVar(classAtom, {
      scopeLevel: classVar.scopeLevel,
      isLexical: classVar.isLexical,
      isConst: classVar.isConst,
      forceInit: false,
    })
  }

  const classLocalSlot = compiler.getLocalVarSlot(classAtom)
  if (classLocalSlot !== undefined) {
    compiler.emitSetLocalUninitialized(classLocalSlot, classVar.scopeLevel)
  }

  if (isModuleTopLevel && hasExportModifier) {
    const exportedAtom = hasDefaultModifier ? compiler.getAtomId('default') : classAtom
    compiler.registerModuleLocalExport(exportedAtom, classVarIndex)
  }

  let baseIdentifier: ts.Identifier | null = null
  let baseAtom: number | null = null
  const heritageClause = node.heritageClauses?.find((clause) => clause.token === ts.SyntaxKind.ExtendsKeyword)
  if (heritageClause) {
    const baseType = heritageClause.types[0]
    if (!baseType) {
      throw new Error('Extends clause must specify a base type')
    }
    baseIdentifier = createInternalIdentifier(`${classIdentifier.text}_base`, node)
    baseAtom = compiler.getAtomId(baseIdentifier.text)
    const baseVarIndex = compiler.declareLexicalVariable(baseAtom, { isConst: true, isLet: true, capture: false })
    const baseVar = compiler.getFunctionVar(baseVarIndex)
    const baseLocalSlot = compiler.getLocalVarSlot(baseAtom)
    if (baseLocalSlot !== undefined) {
      compiler.emitSetLocalUninitialized(baseLocalSlot, baseVar.scopeLevel)
    }

    compiler.withSourceNode(baseType.expression, () => {
      compiler.compileExpression(baseType.expression)
    })
    compiler.emitStoreToLexical(baseAtom)
  }

  const constructorDecl = node.members.find((member): member is ts.ConstructorDeclaration => ts.isConstructorDeclaration(member))
  const constructorExpression = createConstructorFunctionExpression(node, classIdentifier, constructorDecl, baseIdentifier)

  compiler.withSourceNode(constructorDecl ?? node, () => {
    compiler.compileExpression(constructorExpression)
  })
  compiler.emitStoreToLexical(classAtom)

  const classIdForUsage = createIdentifierFromSource(classIdentifier.text, node)

  if (baseIdentifier && baseAtom !== null) {
    const baseIdForUsage = createIdentifierFromSource(baseIdentifier.text, node)

    const setPrototypeCallExpression = setRangeFrom(
      ts.factory.createCallExpression(
          createPropertyAccessFromSource(
            createIdentifierFromSource('Object', node),
            'setPrototypeOf',
            node
          ),
          undefined,
          [classIdForUsage, baseIdForUsage]
        ),
      node
    )
    const setPrototypeCall = setRangeFrom(
      ts.factory.createExpressionStatement(setPrototypeCallExpression),
      node
    )
  compileExpressionStatement(compiler, setPrototypeCall)

    const prototypeCreateCall = setRangeFrom(
      ts.factory.createCallExpression(
        createPropertyAccessFromSource(
          createIdentifierFromSource('Object', node),
          'create',
          node
        ),
        undefined,
        [createPropertyAccessFromSource(baseIdForUsage, 'prototype', node)]
      ),
      node
    )
    const prototypeAssignmentBinary = setRangeFrom(
      ts.factory.createBinaryExpression(
          createPropertyAccessFromSource(classIdForUsage, 'prototype', node),
          ts.SyntaxKind.EqualsToken,
          prototypeCreateCall
        ),
      node
    )
    const createPrototypeAssignment = setRangeFrom(
      ts.factory.createExpressionStatement(prototypeAssignmentBinary),
      node
    )
  compileExpressionStatement(compiler, createPrototypeAssignment)

    const constructorResetBinary = setRangeFrom(
      ts.factory.createBinaryExpression(
          createPropertyAccessFromSource(
            createPropertyAccessFromSource(classIdForUsage, 'prototype', node),
            'constructor',
            node
          ),
          ts.SyntaxKind.EqualsToken,
          classIdForUsage
        ),
      node
    )
    const constructorReset = setRangeFrom(
      ts.factory.createExpressionStatement(constructorResetBinary),
      node
    )
  compileExpressionStatement(compiler, constructorReset)
  }

  for (const member of node.members) {
    if (ts.isConstructorDeclaration(member)) {
      continue
    }
    const modifiers = ts.canHaveModifiers(member) ? ts.getModifiers(member) : undefined
    const isStaticMember = modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.StaticKeyword) ?? false

    if (ts.isMethodDeclaration(member)) {
      const propertyName = member.name
      const functionExpression = createMethodFunctionExpression(member)
      const container = createMemberContainerExpression(classIdentifier, member, isStaticMember)
      const target = ts.isIdentifier(propertyName)
        ? createPropertyAccessFromSource(container, propertyName, member)
        : createElementAccessFromSource(container, createPropertyNameLiteral(propertyName, member), member)
      const assignmentBinary = setRangeFrom(
        ts.factory.createBinaryExpression(target, ts.SyntaxKind.EqualsToken, functionExpression),
        member
      )
      const assignment = setRangeFrom(ts.factory.createExpressionStatement(assignmentBinary), member)
  compileExpressionStatement(compiler, assignment)
      continue
    }

    if (ts.isGetAccessorDeclaration(member) || ts.isSetAccessorDeclaration(member)) {
      const accessorKind = ts.isGetAccessorDeclaration(member) ? 'get' : 'set'
      const descriptorProperties: ts.PropertyAssignment[] = [
        setRangeFrom(
          ts.factory.createPropertyAssignment(accessorKind, createMethodFunctionExpression(member)),
          member
        ),
        setRangeFrom(ts.factory.createPropertyAssignment('enumerable', ts.factory.createFalse()), member),
        setRangeFrom(ts.factory.createPropertyAssignment('configurable', ts.factory.createTrue()), member),
      ]
      const descriptor = setRangeFrom(
        ts.factory.createObjectLiteralExpression(descriptorProperties, true),
        member
      )
      const container = createMemberContainerExpression(classIdentifier, member, isStaticMember)
      const propertyNameExpr = createPropertyNameLiteral(member.name, member)
      const definePropertyCall = setRangeFrom(
        ts.factory.createCallExpression(
          createPropertyAccessFromSource(
            createIdentifierFromSource('Object', member),
            'defineProperty',
            member
          ),
          undefined,
          [container, propertyNameExpr, descriptor]
        ),
        member
      )
      const call = setRangeFrom(ts.factory.createExpressionStatement(definePropertyCall), member)
  compileExpressionStatement(compiler, call)
      continue
    }

    if (ts.isPropertyDeclaration(member)) {
      if (ts.isPrivateIdentifier(member.name)) {
        throw new Error('Private class fields are not supported yet')
      }

      if (!member.initializer) {
        continue
      }

      if (!isStaticMember) {
        throw new Error('Instance property initializers are not supported yet')
      }

      const container = createMemberContainerExpression(classIdentifier, member, true)
      const propertyTarget = ts.isIdentifier(member.name)
        ? createPropertyAccessFromSource(container, member.name, member)
        : createElementAccessFromSource(container, createPropertyNameLiteral(member.name, member), member)
      const assignmentBinary = setRangeFrom(
        ts.factory.createBinaryExpression(propertyTarget, ts.SyntaxKind.EqualsToken, member.initializer),
        member
      )
      const assignment = setRangeFrom(ts.factory.createExpressionStatement(assignmentBinary), member)
  compileExpressionStatement(compiler, assignment)
      continue
    }

    throw new Error(`Unsupported class member kind: ${ts.SyntaxKind[member.kind]}`)
  }
}
