import ts from 'typescript'
import { Compiler } from './Compiler'
import { FunctionDef } from './FunctionDef'
import { ScopeManager } from './ScopeManager'
import { LabelManager } from './LabelManager'
import { VariableResolver } from './VariableResolver'

export interface CompilerContext {
  compiler: Compiler
  scopeManager: ScopeManager
  labelManager: LabelManager
  variableResolver: VariableResolver
  funcDef: FunctionDef | null
  currentNode: ts.Node | null
  isTerminated: boolean

  /**
   * Whether the current expression's value is required by its parent context.
   * Used for statement-level optimizations (e.g. `obj.x = v;`) where QuickJS
   * emits no value and therefore no trailing `drop`.
   */
  expressionValueUsed: boolean
  
  visit(node: ts.Node): void
  setFuncDef(funcDef: FunctionDef | null): void
  setIsTerminated(value: boolean): void
}
