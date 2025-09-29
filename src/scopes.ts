export enum ScopeKind {
  Module = 'module',
  Function = 'function',
  Block = 'block',
  Catch = 'catch',
  Switch = 'switch',
  Parameter = 'parameter',
}

export interface ScopeOptions {
  parent?: number
  first?: number
  kind?: ScopeKind
  isVarScope?: boolean
  varParent?: number
}

export class Scope {
  parent: number
  first: number
  kind: ScopeKind
  isVarScope: boolean
  varParent: number

  constructor(options: ScopeOptions = {}) {
    this.parent = options.parent ?? -1
    this.first = options.first ?? -1
    this.kind = options.kind ?? ScopeKind.Block
    this.isVarScope = options.isVarScope ?? false
    this.varParent = options.varParent ?? -1
  }
}
