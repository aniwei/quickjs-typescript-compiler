import * as ts from 'typescript'
import type { Compiler } from '../../compiler'

export function compileFunctionExpression(compiler: Compiler, node: ts.FunctionExpression) {
  // QuickJS stores anonymous function names as atom 0 (JS_ATOM_NULL sentinel).
  const nameAtom = node.name ? compiler.getAtomId(node.name.text) : 0
  const childFunction = compiler.compileChildFunction(node, nameAtom, { isExpression: true })
  const constantIndex = compiler.addFunctionConstant(childFunction)
  compiler.emitFunctionClosure(constantIndex, node)
}

export function compileArrowFunctionExpression(compiler: Compiler, node: ts.ArrowFunction) {
  const nameAtom = 0
  const childFunction = compiler.compileChildFunction(node, nameAtom, { isExpression: true })
  const constantIndex = compiler.addFunctionConstant(childFunction)
  compiler.emitFunctionClosure(constantIndex, node)
}
