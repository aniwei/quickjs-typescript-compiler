import * as ts from 'typescript'
import type { Compiler } from '../../../compiler'
import { Opcode } from '../../../env'
import { VarKind } from '../../../vars'

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
