import ts from 'typescript'
import { Compiler } from './Compiler'
import { FunctionDef, JSVarKind, JSVarDef, JSClosureVar } from './FunctionDef'
import { JSAtom, Opcode, FunctionKind } from '../env'

export interface VarInfo {
  type: 'closure' | 'local'
  idx: number
  localIdx?: number
  isLexical: boolean
  isConst: boolean
  isCatchVar?: boolean
  isArg?: boolean
}

export interface Scope {
  type: 'module' | 'block' | 'function'
  vars: Map<string, VarInfo>
  parent: Scope | null
  funcDef?: FunctionDef
  scopeIndex: number
}

export class ScopeManager {
  private compiler: Compiler
  private stack: Scope[] = []
  private vars: Map<number, { name: string, info: VarInfo }[]> = new Map()
  
  constructor(compiler: Compiler) {
    this.compiler = compiler
  }

  get scopeStack() {
    return this.stack
  }

  get currentScopeLevel() {
    if (this.stack.length === 0) return 0
    return this.stack[this.stack.length - 1].scopeIndex
  }

  reset() {
    this.stack = []
    this.vars = new Map()
  }

  get currentScope(): Scope {
    return this.stack[this.stack.length - 1]
  }
  
  get depth(): number {
    return this.stack.length
  }

  getScope(index: number): Scope {
    return this.stack[index]
  }

  enter() {
    
  }

  exit() {
  }
}
