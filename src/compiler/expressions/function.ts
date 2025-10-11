import * as ts from 'typescript'
import type { Compiler } from '../../compiler'

export function compileFunctionExpression(compiler: Compiler, node: ts.FunctionExpression) {
  const nameAtom = node.name ? compiler.getAtomId(node.name.text) : compiler.getAtomId('')
  const childFunction = compiler.compileChildFunction(node, nameAtom, { isExpression: true })
  const constantIndex = compiler.addFunctionConstant(childFunction)
  compiler.emitFunctionClosure(constantIndex, node)
}

export function compileArrowFunctionExpression(compiler: Compiler, node: ts.ArrowFunction) {
  const nameAtom = compiler.getAtomId('')
  const childFunction = compiler.compileChildFunction(node, nameAtom, { isExpression: true })
  const constantIndex = compiler.addFunctionConstant(childFunction)
  compiler.emitFunctionClosure(constantIndex, node)
}
