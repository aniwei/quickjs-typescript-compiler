import * as ts from 'typescript'
import {
  AnnexBRebind,
  BindingInfo,
  BindingKind,
  CompilationMode,
  OperandRef,
  ScopeManager,
} from '../LoweringContext'

export type ScopeFlavor = 'module' | 'function' | 'lexical' | 'catch'

export interface ScopeManagerOptions {
  readonly rootNode: ts.Node
  readonly mode?: CompilationMode
  readonly rootFlavor?: ScopeFlavor
}

interface BindingRecord {
  readonly info: BindingInfo
  initialized: boolean
}

interface ScopeFrame {
  readonly node: ts.Node
  readonly flavor: ScopeFlavor
  readonly depth: number
  readonly parent?: ScopeFrame
  varOwner: ScopeFrame
  nextSlot: number
  readonly bindings: Map<string, BindingRecord>
  readonly annexB: AnnexBRebind[]
}

let nextAtomId = 1

export class ScopeManagerImpl implements ScopeManager {
  private readonly atomTable = new Map<string, number>()
  private readonly frames: ScopeFrame[] = []
  private readonly mode: CompilationMode

  constructor(options: ScopeManagerOptions) {
    this.mode = options.mode ?? 'non-strict'
    const flavor = options.rootFlavor ?? this.detectFlavor(options.rootNode)
    const root: ScopeFrame = {
      node: options.rootNode,
      flavor,
      depth: 0,
      parent: undefined,
      varOwner: undefined as unknown as ScopeFrame,
      nextSlot: 0,
      bindings: new Map(),
      annexB: [],
    }
    root.varOwner = root
    this.frames.push(root)
  }

  enter(node: ts.Node): void {
    const parent = this.currentFrame()
    const flavor = this.detectFlavor(node)
    const frame: ScopeFrame = {
      node,
      flavor,
      depth: parent.depth + 1,
      parent,
      varOwner: flavor === 'function' ? undefined as unknown as ScopeFrame : parent.varOwner,
      nextSlot: 0,
      bindings: new Map(),
      annexB: [],
    }
    frame.varOwner = flavor === 'function' ? frame : parent.varOwner
    this.frames.push(frame)
  }

  leave(node: ts.Node): AnnexBRebind[] {
    const current = this.currentFrame()
    if (current.node !== node) {
      throw new Error('ScopeManager.leave: mismatched scope node')
    }
    this.frames.pop()
    return current.annexB.slice()
  }

  declare(name: ts.Identifier, kind: BindingKind): BindingInfo {
    const frame = this.resolveTargetFrame(kind)
    const existing = frame.bindings.get(name.text)
    if (existing) {
      if (this.isVarLike(existing.info.kind) && this.isVarLike(kind)) {
        return existing.info
      }
      throw new Error(`Duplicate binding for ${name.text} in current scope`)
    }

    const atom = this.ensureAtom(name.text)
    const info: BindingInfo = {
      name,
      kind,
      atom,
      slot: frame.nextSlot,
      scopeDepth: frame.depth,
    }

    frame.nextSlot += 1
    frame.bindings.set(name.text, {
      info,
      initialized: kind === 'catch' || kind === 'param',
    })

    return info
  }

  declarePattern(pattern: ts.BindingName, kind: BindingKind): BindingInfo[] {
    const identifiers: ts.Identifier[] = []
    this.collectIdentifiers(pattern, identifiers)
    return identifiers.map((identifier) => this.declare(identifier, kind))
  }

  resolve(name: ts.Identifier): OperandRef {
    const record = this.lookup(name.text)
    if (!record) {
      throw new Error(`Unresolved identifier ${name.text}`)
    }
    return {
      kind: 'local',
      id: record.info.slot,
    }
  }

  closeUntil(targetDepth: number): void {
    while (this.frames.length > 0 && this.currentFrame().depth > targetDepth) {
      this.frames.pop()
    }
  }

  requiresReference(name: ts.Identifier): boolean {
    void name
    return false
  }

  getStoreMode(binding: BindingInfo): 'init' | 'assign' {
    const record = this.lookup(binding.name.text)
    if (!record || record.info !== binding) {
      return 'init'
    }
    if (!record.initialized || binding.kind === 'const' || binding.kind === 'let') {
      return 'init'
    }
    return 'assign'
  }

  markInitialized(binding: BindingInfo): void {
    const record = this.lookup(binding.name.text)
    if (record && record.info === binding) {
      record.initialized = true
    }
  }

  registerAnnexB(binding: BindingInfo, value: OperandRef): void {
    if (this.mode === 'strict') {
      return
    }
    const current = this.currentFrame()
    current.annexB.push({ binding, value })
  }

  private isVarLike(kind: BindingKind): boolean {
    return kind === 'var' || kind === 'function' || kind === 'param'
  }

  private currentFrame(): ScopeFrame {
    return this.frames[this.frames.length - 1]
  }

  private lookup(name: string): BindingRecord | undefined {
    for (let index = this.frames.length - 1; index >= 0; index -= 1) {
      const frame = this.frames[index]
      const record = frame.bindings.get(name)
      if (record) {
        return record
      }
    }
    return undefined
  }

  private resolveTargetFrame(kind: BindingKind): ScopeFrame {
    if (kind === 'var' || kind === 'function' || kind === 'param') {
      return this.currentFrame().varOwner
    }
    if (kind === 'module') {
      return this.frames[0]
    }
    return this.currentFrame()
  }

  private ensureAtom(name: string): number {
    const existing = this.atomTable.get(name)
    if (existing !== undefined) {
      return existing
    }
    const atom = nextAtomId
    nextAtomId += 1
    this.atomTable.set(name, atom)
    return atom
  }

  private detectFlavor(node: ts.Node): ScopeFlavor {
    if (ts.isSourceFile(node)) {
      return 'module'
    }
    if (ts.isFunctionLike(node)) {
      return 'function'
    }
    if (ts.isCatchClause(node)) {
      return 'catch'
    }
    return 'lexical'
  }

  private collectIdentifiers(name: ts.BindingName, result: ts.Identifier[]): void {
    if (ts.isIdentifier(name)) {
      result.push(name)
      return
    }
    if (ts.isArrayBindingPattern(name)) {
      for (const element of name.elements) {
        if (ts.isOmittedExpression(element)) {
          continue
        }
        this.collectIdentifiers(element.name, result)
      }
      return
    }
    if (ts.isObjectBindingPattern(name)) {
      for (const element of name.elements) {
        this.collectIdentifiers(element.name, result)
      }
    }
  }
}
