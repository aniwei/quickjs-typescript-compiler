import * as ts from 'typescript'
import type { Compiler } from '../../../compiler'

export function compileExportDeclaration(compiler: Compiler, node: ts.ExportDeclaration) {
  if (!compiler.isModuleTopLevelScope()) {
    throw new Error('Export declarations are only supported at the module top level')
  }
  if (node.isTypeOnly) {
    return
  }
  if (node.moduleSpecifier) {
    throw new Error('Re-exporting from other modules is not supported yet')
  }
  const clause = node.exportClause
  if (!clause) {
    throw new Error('Wildcard export declarations are not supported yet')
  }
  if (!ts.isNamedExports(clause)) {
    throw new Error('Only named export declarations are supported currently')
  }

  for (const element of clause.elements) {
    const exportedIdentifier = element.name
    if (!ts.isIdentifier(exportedIdentifier)) {
      throw new Error('Unsupported export name form')
    }
    const exportedAtom = compiler.getAtomId(exportedIdentifier.text)
    const localName = element.propertyName ?? element.name
    if (!ts.isIdentifier(localName)) {
      throw new Error('Unsupported local export target')
    }
    const localAtom = compiler.getAtomId(localName.text)
    const bindingInfo = compiler.getBindingInfo(localAtom)
    if (!bindingInfo) {
      throw new Error(`Cannot export undeclared identifier '${localName.text}'`)
    }
    const { index: varIndex } = bindingInfo.binding
    if (varIndex < 0 || varIndex >= compiler.getCurrentFunctionVarCount()) {
      throw new Error(`Export target '${localName.text}' is not a module variable`)
    }
    compiler.registerModuleLocalExport(exportedAtom, varIndex)
  }
}

export function compileExportAssignment(compiler: Compiler, node: ts.ExportAssignment) {
  if (node.isExportEquals) {
    throw new Error('CommonJS export assignment is not supported yet')
  }
  if (!compiler.isModuleTopLevelScope()) {
    throw new Error('Export assignments are only supported at the module top level')
  }

  const expression = node.expression
  if (!ts.isIdentifier(expression)) {
    throw new Error('Only identifier default exports are supported currently')
  }

  const localAtom = compiler.getAtomId(expression.text)
  const bindingInfo = compiler.getBindingInfo(localAtom)
  if (!bindingInfo) {
    throw new Error(`Cannot export undeclared identifier '${expression.text}'`)
  }
  const { index: varIndex } = bindingInfo.binding
  if (varIndex < 0 || varIndex >= compiler.getCurrentFunctionVarCount()) {
    throw new Error(`Export target '${expression.text}' is not a module variable`)
  }

  const exportedAtom = compiler.getAtomId('default')
  compiler.registerModuleLocalExport(exportedAtom, varIndex)
}
