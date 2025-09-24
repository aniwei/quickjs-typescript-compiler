import { FunctionDef } from './functionDef'
import { Scope } from './scopes'

export class ScopeManager {
  private readonly scopeStack: number[] = []

  constructor(private readonly func: FunctionDef) {}

  enterScope(): number {
    const parent = this.currentScope()
    const scope = new Scope({ parent })
    const index = this.func.addScope(scope)
    this.scopeStack.push(index)
    this.func.scopeLevel = index
    if (this.func.bodyScope === -1) {
      this.func.bodyScope = index
    }
    return index
  }

  leaveScope(): number | undefined {
    const popped = this.scopeStack.pop()
    const parent = this.currentScope()
    this.func.scopeLevel = parent
    this.func.scopeFirst = parent >= 0 ? this.func.scopes[parent].first : -1
    return popped
  }

  currentScope(): number {
    if (this.scopeStack.length === 0) {
      return -1
    }
    return this.scopeStack[this.scopeStack.length - 1]
  }

  bindVarToCurrentScope(varIndex: number) {
    const current = this.currentScope()
    if (current < 0) return
    const scope = this.func.scopes[current]
    const variable = this.func.vars[varIndex]
    variable.scopeNext = scope.first
    variable.scopeLevel = current
    scope.first = varIndex
    this.func.scopeFirst = scope.first
  }
}
