import { Atom } from './atoms'
import { FunctionDef } from './functionDef'
import { Scope, ScopeKind } from './scopes'
import { VarDeclarationKind } from './vars'

type ScopeBinding = {
  kind: VarDeclarationKind
  index: number
}

export class ScopeManager {
  private readonly scopeStack: number[] = []
  private readonly bindings = new Map<number, Map<Atom, ScopeBinding>>()

  constructor(private readonly func: FunctionDef) {
    if (func.scopes.length === 0) {
      const rootScope = new Scope({
        parent: -1,
        kind: func.parent ? ScopeKind.Function : ScopeKind.Module,
        isVarScope: true,
      })
      const rootIndex = func.addScope(rootScope)
      rootScope.varParent = this.findVarScope(rootScope.parent)
      this.scopeStack.push(rootIndex)
      this.bindings.set(rootIndex, new Map())
      func.scopeLevel = rootIndex
      func.scopeFirst = rootScope.first
      if (func.bodyScope === -1 && rootScope.kind !== ScopeKind.Module) {
        func.bodyScope = rootIndex
      }
    } else if (func.scopeLevel >= 0) {
      this.scopeStack.push(func.scopeLevel)
      if (!this.bindings.has(func.scopeLevel)) {
        this.bindings.set(func.scopeLevel, new Map())
      }
    }
  }

  enterScope(kind: ScopeKind): number {
    const parent = this.currentScope()
    const scope = new Scope({
      parent,
      kind,
      isVarScope: this.isVarScopeKind(kind),
    })
    const index = this.func.addScope(scope)
    scope.varParent = this.findVarScope(parent)
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

  bindVariable(varIndex: number, atom: Atom, declarationKind: VarDeclarationKind) {
    const currentScopeIndex = this.currentScope()
    if (currentScopeIndex < 0) {
      throw new Error('No active scope for variable binding')
    }
    const targetScopeIndex = this.getTargetScopeIndex(declarationKind, currentScopeIndex)
    if (targetScopeIndex < 0) {
      throw new Error(`Unable to resolve target scope for declaration ${declarationKind}`)
    }

    const targetScope = this.func.scopes[targetScopeIndex]
    const variable = this.func.vars[varIndex]
  variable.declarationKind = declarationKind
    variable.scopeNext = targetScope.first
    variable.scopeLevel = targetScopeIndex
    targetScope.first = varIndex
    if (targetScopeIndex === this.func.scopeLevel) {
      this.func.scopeFirst = targetScope.first
    }

    const bindingMap = this.ensureBindingMap(targetScopeIndex)
    bindingMap.set(atom, { kind: declarationKind, index: varIndex })
  }

  bindArgumentToCurrentScope(atom: Atom, argIndex: number) {
    const current = this.currentScope()
    if (current < 0) return
    const targetScopeIndex = this.getTargetScopeIndex(VarDeclarationKind.Parameter, current)
    if (targetScopeIndex < 0) return
    const scope = this.func.scopes[targetScopeIndex]
    const arg = this.func.args[argIndex]
    if (!arg) {
      return
    }
    arg.declarationKind = VarDeclarationKind.Parameter
    const varScopeIndex = scope.isVarScope ? scope.varParent : scope.parent
    arg.scopeLevel = varScopeIndex >= 0 ? varScopeIndex : targetScopeIndex
    arg.scopeNext = 0
    const bindingMap = this.ensureBindingMap(targetScopeIndex)
    bindingMap.set(atom, { kind: VarDeclarationKind.Parameter, index: argIndex })
  }

  hasBindingInCurrentScope(atom: Atom): boolean {
    const current = this.currentScope()
    if (current < 0) return false
    return this.bindings.get(current)?.has(atom) ?? false
  }

  lookup(atom: Atom): { scopeIndex: number; binding: ScopeBinding } | null {
    for (let i = this.scopeStack.length - 1; i >= 0; i--) {
      const scopeIndex = this.scopeStack[i]
      const map = this.bindings.get(scopeIndex)
      const binding = map?.get(atom)
      if (binding !== undefined) {
        return { scopeIndex, binding }
      }
    }
    return null
  }

  private ensureBindingMap(scopeIndex: number): Map<Atom, ScopeBinding> {
    let map = this.bindings.get(scopeIndex)
    if (!map) {
      map = new Map()
      this.bindings.set(scopeIndex, map)
    }
    return map
  }

  private isVarScopeKind(kind: ScopeKind): boolean {
    return kind === ScopeKind.Function || kind === ScopeKind.Module || kind === ScopeKind.Parameter
  }

  private getTargetScopeIndex(kind: VarDeclarationKind, currentScopeIndex: number): number {
    switch (kind) {
      case VarDeclarationKind.Var:
      case VarDeclarationKind.Function:
      case VarDeclarationKind.Parameter:
        return this.findVarScope(currentScopeIndex)
      default:
        return currentScopeIndex
    }
  }

  private findVarScope(scopeIndex: number): number {
    let index = scopeIndex
    while (index >= 0) {
      const scope = this.func.scopes[index]
      if (scope.isVarScope) {
        return index
      }
      index = scope.parent
    }
    return -1
  }
}
