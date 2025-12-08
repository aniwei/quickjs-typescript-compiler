import ts from 'typescript'
import { Compiler } from './Compiler'
import { FunctionDef } from './FunctionDef'
import { ScopeManager } from './ScopeManager'
import { LabelManager } from './LabelManager'

export interface CompilerContext {
  compiler: Compiler
  scopeManager: ScopeManager
  labelManager: LabelManager
  funcDef: FunctionDef | null
  currentNode: ts.Node | null
  isTerminated: boolean
  
  visit(node: ts.Node): void
  visitCallExpression(node: ts.CallExpression, isTailCall?: boolean, position?: number): void
  setFuncDef(funcDef: FunctionDef | null): void
  setIsTerminated(value: boolean): void
}
