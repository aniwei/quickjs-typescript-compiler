import * as ts from 'typescript'
import type { Compiler } from '../../compiler'
import { Opcode } from '../../env'
import { VarKind } from '../../vars'
import type { StatementVisitor, StatementVisitorRegistrar } from '../visitors/statementVisitors'

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

export function compileVariableStatement(compiler: Compiler, node: ts.VariableStatement) {
  const flags = node.declarationList.flags
  const isConst = (flags & ts.NodeFlags.Const) !== 0
  const isLet = (flags & ts.NodeFlags.Let) !== 0
  const hasExportModifier = node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false
  const isModuleTopLevel = compiler.isModuleTopLevelScope()

  for (const declaration of node.declarationList.declarations) {
    compiler.withSourceNode(declaration, () => {
      if (!ts.isIdentifier(declaration.name)) {
        throw new Error('Destructuring is not supported yet')
      }

      const nameText = declaration.name.text
      const atom = compiler.getAtomId(nameText)

      if ((isConst || isLet) && compiler.hasBindingInCurrentScope(atom)) {
        throw new Error(`Identifier '${nameText}' has already been declared in this scope`)
      }

      if (isConst && !declaration.initializer) {
        throw new Error(`Missing initializer in const declaration for '${nameText}'`)
      }

      const capture = isModuleTopLevel
      const varIndex = compiler.declareLexicalVariable(atom, { isConst, isLet, capture })
      const variable = compiler.getFunctionVar(varIndex)

      if (compiler.isGlobalVarContext() && isModuleTopLevel) {
        const forceInit = variable.isLexical && !declaration.initializer
        compiler.registerGlobalVar(atom, {
          scopeLevel: variable.scopeLevel,
          isLexical: variable.isLexical,
          isConst: variable.isConst,
          forceInit,
        })
      }

      if (isModuleTopLevel && hasExportModifier) {
        compiler.registerModuleLocalExport(atom, varIndex)
      }

      const suppressInitializerDebug =
        isModuleTopLevel && compiler.shouldSuppressTopLevelInitializerDebug(declaration.initializer)

      const localSlot = compiler.getLocalVarSlot(atom)
      if (localSlot !== undefined && (isConst || isLet)) {
        compiler.emitSetLocalUninitialized(localSlot, variable.scopeLevel)
      }

      if (declaration.initializer) {
        const emitInitializer = () => {
          compiler.compileExpression(declaration.initializer!)
          compiler.emitStoreToLexical(atom)
        }

        if (suppressInitializerDebug) {
          compiler.withoutDebugRecording(emitInitializer)
        } else {
          emitInitializer()
        }
        return
      }

      if (isConst || isLet) {
        const emitDefaultInitializer = () => {
          compiler.emitInstruction(Opcode.OP_undefined)
          compiler.emitStoreToLexical(atom)
        }

        if (isModuleTopLevel) {
          compiler.withoutDebugRecording(emitDefaultInitializer)
        } else {
          emitDefaultInitializer()
        }
      }
    })
  }
}

const declarationVisitors = new Map<ts.SyntaxKind, StatementVisitor>([
  [ts.SyntaxKind.FunctionDeclaration, (compiler, node) => compileFunctionDeclaration(compiler, node as ts.FunctionDeclaration)],
  [ts.SyntaxKind.VariableStatement, (compiler, node) => compileVariableStatement(compiler, node as ts.VariableStatement)],
  [ts.SyntaxKind.ExportDeclaration, (compiler, node) => compileExportDeclaration(compiler, node as ts.ExportDeclaration)],
  [ts.SyntaxKind.ExportAssignment, (compiler, node) => compileExportAssignment(compiler, node as ts.ExportAssignment)],
])

export function registerDeclarationStatements(register: StatementVisitorRegistrar) {
  for (const [kind, visitor] of declarationVisitors) {
    register(kind, visitor)
  }
}
