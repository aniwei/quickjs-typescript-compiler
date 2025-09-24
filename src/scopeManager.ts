import { Atom } from './atoms'
import { FunctionDef } from './functionDef'
import { Scope } from './scopes'

export class ScopeManager {
  private readonly scopeStack: number[] = []
  private readonly bindings = new Map<number, Map<Atom, number>>()

  constructor(private readonly func: FunctionDef) {
    if (func.scopes.length === 0) {
      const rootScope = new Scope({ parent: -1 })
      const rootIndex = func.addScope(rootScope)
      this.scopeStack.push(rootIndex)
      this.bindings.set(rootIndex, new Map())
      func.scopeLevel = rootIndex
      func.scopeFirst = rootScope.first
    } else if (func.scopeLevel >= 0) {
      this.scopeStack.push(func.scopeLevel)
      this.bindings.set(func.scopeLevel, new Map())
    }
  }

  enterScope(): number {
    const parent = this.currentScope()
    const scope = new Scope({ parent })
    const index = this.func.addScope(scope)
    this.scopeStack.push(index)
    this.func.scopeLevel = index
    if (this.func.bodyScope === -1) {
      this.func.bodyScope = index
    }
    this.bindings.set(index, new Map())
    return index
  }

  leaveScope(): number | undefined {
    if (this.scopeStack.length <= 1) {
      return undefined
    }
    const popped = this.scopeStack.pop()
    if (popped !== undefined) {
      this.bindings.delete(popped)
    }
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
  this.bindings.get(current)?.set(variable.name, varIndex)
  }

  hasBindingInCurrentScope(atom: Atom): boolean {
    const current = this.currentScope()
    if (current < 0) return false
    return this.bindings.get(current)?.has(atom) ?? false
  }

  lookup(atom: Atom): { scopeIndex: number; varIndex: number } | null {
    for (let i = this.scopeStack.length - 1; i >= 0; i--) {
      const scopeIndex = this.scopeStack[i]
      const map = this.bindings.get(scopeIndex)
      const varIndex = map?.get(atom)
      if (varIndex !== undefined) {
        return { scopeIndex, varIndex }
      }
    }
    return null
  }
}
