import * as ts from 'typescript'
import type { Compiler } from '../../../compiler'
import { VarKind } from '../../../vars'

export function compileFunctionDeclaration(compiler: Compiler, node: ts.FunctionDeclaration) {
  if (!node.name) {
    throw new Error('Function declaration must have a name')
  }
  if (!node.body) {
    throw new Error(`Function '${node.name.text}' is missing a body`)
  }

  const hasExportModifier = node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false
  const hasDefaultModifier = node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword) ?? false

  const atom = compiler.getAtomId(node.name.text)
  if (compiler.hasBindingInCurrentScope(atom)) {
    throw new Error(`Identifier '${node.name.text}' has already been declared in this scope`)
  }

  const isModuleTopLevel = compiler.isModuleTopLevelScope()

  const varIndex = compiler.declareLexicalVariable(atom, {
    isConst: false,
    isLet: isModuleTopLevel,
    kind: VarKind.FUNCTION_DECL,
    capture: isModuleTopLevel,
  })
  const variable = compiler.getFunctionVar(varIndex)

  if (compiler.isGlobalVarContext() && isModuleTopLevel) {
    compiler.registerGlobalVar(atom, {
      scopeLevel: variable.scopeLevel,
      isLexical: variable.isLexical,
      isConst: variable.isConst,
    })
  }

  const childFunction = compiler.compileChildFunction(node, atom, { isExpression: false })
  const constantIndex = compiler.addFunctionConstant(childFunction)
  variable.funcPoolIndex = constantIndex

  if (compiler.isGlobalVarContext() && isModuleTopLevel) {
    compiler.registerGlobalVar(atom, {
      scopeLevel: variable.scopeLevel,
      isLexical: variable.isLexical,
      isConst: variable.isConst,
      funcPoolIndex: constantIndex,
    })
  }

  if (isModuleTopLevel && hasExportModifier) {
    const exportedName = hasDefaultModifier ? compiler.getAtomId('default') : atom
    compiler.registerModuleLocalExport(exportedName, varIndex)
  }

  if (isModuleTopLevel) {
    return
  }

  compiler.emitFunctionClosure(constantIndex, node)
  compiler.emitStoreToLexical(atom)
}
