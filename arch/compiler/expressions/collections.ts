import * as ts from 'typescript'
import type { Compiler } from '../../compiler'
import { Opcode } from '../../env'

export function compileArrayLiteralExpression(compiler: Compiler, expression: ts.ArrayLiteralExpression) {
  const elements = expression.elements
  const values = elements.filter((element): element is ts.Expression => !ts.isOmittedExpression(element))
  if (values.length !== elements.length) {
    throw new Error('Array holes are not supported yet')
  }

  compiler.recordExpressionStatementDebug(expression)

  for (const element of values) {
    compiler.compileExpression(element)
  }

  compiler.emitInstruction(Opcode.OP_array_from, [values.length], null)
}

export function compileObjectLiteralExpression(compiler: Compiler, expression: ts.ObjectLiteralExpression) {
  const properties = expression.properties
  if (properties.length === 0) {
    compiler.emitInstruction(Opcode.OP_object, [], expression)
    return
  }

  const assignments = properties.map((property) => {
    if (ts.isPropertyAssignment(property)) {
      const name = property.name
      if (ts.isComputedPropertyName(name)) {
        throw new Error('Computed property names are not supported yet')
      }
      if (ts.isPrivateIdentifier(name)) {
        throw new Error('Private identifiers are not supported in object literals')
      }
      const initializer = property.initializer
      if (!initializer) {
        throw new Error('Property assignments must have an initializer')
      }
      return { property, name, initializer }
    }

    if (ts.isShorthandPropertyAssignment(property)) {
      const name = property.name
      if (ts.isPrivateIdentifier(name)) {
        throw new Error('Private identifiers are not supported in object literals')
      }
      return { property, name, initializer: name }
    }

    throw new Error(`Unsupported object literal property: ${ts.SyntaxKind[property.kind]}`)
  })

  compiler.emitInstruction(Opcode.OP_object, [], expression)

  for (const { property, name, initializer } of assignments) {
    let propertyAtom
    if (ts.isIdentifier(name)) {
      propertyAtom = compiler.getAtomId(name.text)
    } else if (ts.isStringLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name)) {
      propertyAtom = compiler.getAtomId(name.text)
    } else if (ts.isNumericLiteral(name)) {
      propertyAtom = compiler.getAtomId(name.text)
    } else {
      throw new Error(`Unsupported object literal property name kind: ${ts.SyntaxKind[name.kind]}`)
    }

    compiler.withSourceNode(initializer, () => {
      compiler.compileExpression(initializer)
    })

    compiler.emitInstruction(Opcode.OP_define_field, [propertyAtom], property)
  }
}
