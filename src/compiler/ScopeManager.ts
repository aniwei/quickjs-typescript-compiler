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

  reset() {
    this.stack = []
    this.vars = new Map()
    
    // Initialize module scope
    this.stack.push({
      type: 'module',
      vars: new Map(),
      parent: null,
      scopeIndex: 0
    })
  }

  get currentScope(): Scope {
    return this.stack[this.stack.length - 1]
  }
  
  get stackDepth(): number {
    return this.stack.length
  }

  getScope(index: number): Scope {
    return this.stack[index]
  }

  enter(type: 'module' | 'block' | 'function', funcDef: FunctionDef | null, scopeIndex?: number) {
    const parent = this.stack.length > 0 ? this.stack[this.stack.length - 1] : null
    
    let idx = 0
    if (scopeIndex !== undefined) {
      idx = scopeIndex
    } else if (funcDef) {
      idx = funcDef.scopeCount++
    }
    // console.log(`enter: type=${type} idx=${idx} scopeCount=${funcDef?.scopeCount}`)

    // Initialize scope with parent linkage
    if (funcDef) {
      let parentFirst = -1
      let parentIdx = -1
      if (parent && parent.scopeIndex >= 0) {
        parentIdx = parent.scopeIndex
        if (funcDef.scopes[parentIdx]) {
          parentFirst = funcDef.scopes[parentIdx].first
        }
      }
      // Always update/overwrite because scopes are pre-allocated
      funcDef.scopes[idx] = { first: parentFirst, parent: parentIdx }
    }

    this.stack.push({
      type,
      vars: new Map(),
      parent,
      funcDef: funcDef || undefined,
      scopeIndex: idx
    })

    // Populate pre-hoisted variables for this scope
    const preHoisted = this.vars.get(idx)
    if (preHoisted) {
      const currentScope = this.stack[this.stack.length - 1]
      for (const item of preHoisted) {
        // console.log(`enter: populating ${item.name} in scope ${idx}`)
        currentScope.vars.set(item.name, item.info)
      }
    }
  }

  exit() {
    this.stack.pop()
  }
  
  addPreHoistedVar(scopeIndex: number, name: string, info: VarInfo) {
    if (!this.vars.has(scopeIndex)) {
      this.vars.set(scopeIndex, [])
    }
    this.vars.get(scopeIndex)!.push({ name, info })
  }

  findVar(name: string, currentFuncDef: FunctionDef): VarInfo | null {
    for (let i = this.stack.length - 1; i >= 0; i--) {
      const scope = this.stack[i]
      if (scope.vars.has(name)) {
        const varInfo = scope.vars.get(name)!
        
        if (scope.funcDef && currentFuncDef && scope.funcDef !== currentFuncDef) {
          const closureIdx = this.captureVariable(currentFuncDef, name, scope.funcDef, varInfo)
          return {
            type: 'closure',
            idx: closureIdx,
            isLexical: varInfo.isLexical,
            isConst: varInfo.isConst
          }
        }
        
        return varInfo
      }
    }
    return null
  }

  captureVariable(targetFd: FunctionDef, name: string, sourceFd: FunctionDef, varInfo: VarInfo): number {
    if (targetFd === sourceFd) {
      return varInfo.idx
    }
    
    if (!targetFd.parent) {
      throw new Error(`Cannot capture variable '${name}': parent function not found`)
    }
    
    // Check if already captured in targetFd
    const atomIdx = this.compiler.atomMap.get(name)
    if (atomIdx !== undefined) {
      const atomId = atomIdx + this.compiler.firstAtomId
      for (let k = 0; k < targetFd.closureVar.length; k++) {
        if (targetFd.closureVar[k].varName === atomId) {
          return k
        }
      }
    }
    
    let parentIdx: number
    let isLocalInParent: boolean
    
    if (targetFd.parent === sourceFd) {
      parentIdx = varInfo.idx
      isLocalInParent = varInfo.type === 'local'
      
      // Mark as captured in sourceFd if it's a local
      if (isLocalInParent) {
        if (varInfo.isArg) {
          if (parentIdx < sourceFd.args.length) {
            sourceFd.args[parentIdx].isCaptured = true
          }
        } else {
          if (parentIdx < sourceFd.vars.length) {
            sourceFd.vars[parentIdx].isCaptured = true
          }
        }
      }
    } else {
      // Recurse
      parentIdx = this.captureVariable(targetFd.parent, name, sourceFd, varInfo)
      isLocalInParent = false // It's a closure in parent
    }
    
    // Add closure var to targetFd
    const closureIdx = this.compiler.addClosureVar(
      targetFd,
      name,
      isLocalInParent,
      false,
      parentIdx,
      0,
      varInfo.isConst,
      varInfo.isLexical
    )
    
    return closureIdx
  }
}
