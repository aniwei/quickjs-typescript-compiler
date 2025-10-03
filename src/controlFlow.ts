import type * as ts from 'typescript'

export enum ControlFlowTargetKind {
  Loop = 'loop',
  Switch = 'switch',
  Label = 'label',
}

interface ControlFlowTargetBase {
  readonly kind: ControlFlowTargetKind
  readonly breakLabel: string
  readonly labelName?: string
}

export interface LoopControlFlowTarget extends ControlFlowTargetBase {
  readonly kind: ControlFlowTargetKind.Loop
  readonly continueLabel: string
}

export interface SwitchControlFlowTarget extends ControlFlowTargetBase {
  readonly kind: ControlFlowTargetKind.Switch
}

export interface LabelControlFlowTarget extends ControlFlowTargetBase {
  readonly kind: ControlFlowTargetKind.Label
}

export type ControlFlowTarget = LoopControlFlowTarget | SwitchControlFlowTarget | LabelControlFlowTarget

export interface ControlFlowHooks {
  emitGoto(label: string): void
}

export interface BreakResolution {
  target: ControlFlowTarget
  unwindTargets: ControlFlowTarget[]
}

export interface ContinueResolution {
  target: LoopControlFlowTarget
  unwindTargets: ControlFlowTarget[]
}

export class ControlFlowBuilder {
  private readonly targets: ControlFlowTarget[] = []

  constructor(private readonly hooks: ControlFlowHooks) {}

  reset(): void {
    this.targets.length = 0
  }

  pushLoop(breakLabel: string, continueLabel: string, options: { labelName?: string } = {}): void {
    this.targets.push({
      kind: ControlFlowTargetKind.Loop,
      breakLabel,
      continueLabel,
      labelName: options.labelName,
    })
  }

  pushSwitch(breakLabel: string, options: { labelName?: string } = {}): void {
    this.targets.push({
      kind: ControlFlowTargetKind.Switch,
      breakLabel,
      labelName: options.labelName,
    })
  }

  pushLabel(labelName: string, breakLabel: string): void {
    this.targets.push({ kind: ControlFlowTargetKind.Label, labelName, breakLabel })
  }

  pop(expectedKind?: ControlFlowTargetKind): void {
    const target = this.targets.pop()
    if (!target) {
      throw new Error('Control flow target stack underflow')
    }
    if (expectedKind && target.kind !== expectedKind) {
      throw new Error(`Unexpected control flow target kind. Expected ${expectedKind} but got ${target.kind}`)
    }
  }

  emitBreak(node?: ts.BreakStatement): void {
    const { target } = this.resolveBreak(node)
    this.hooks.emitGoto(target.breakLabel)
  }

  emitContinue(node?: ts.ContinueStatement): void {
    const { target } = this.resolveContinue(node)
    this.hooks.emitGoto(target.continueLabel)
  }

  resolveBreak(node?: ts.BreakStatement): BreakResolution {
    const labelName = node?.label?.text
    const { target, unwind } = this.findBreakPath(labelName)
    if (!target) {
      if (labelName) {
        throw new Error(`Unknown break label '${labelName}'`)
      }
      throw new Error('`break` statement used outside of loop or switch')
    }
    return { target, unwindTargets: unwind }
  }

  resolveContinue(node?: ts.ContinueStatement): ContinueResolution {
    const labelName = node?.label?.text
    const { target, unwind } = this.findContinuePath(labelName)
    if (!target) {
      if (labelName) {
        throw new Error(`Unknown continue label '${labelName}'`)
      }
      throw new Error('`continue` statement used outside of loop')
    }
    return { target, unwindTargets: unwind }
  }

  createSnapshot(): ControlFlowTarget[] {
    return this.targets.map((target) => ({ ...target }))
  }

  restoreSnapshot(snapshot: ControlFlowTarget[]): void {
    this.targets.length = 0
    for (const target of snapshot) {
      this.targets.push({ ...target })
    }
  }

  private findBreakPath(labelName?: string): { target?: ControlFlowTarget; unwind: ControlFlowTarget[] } {
    const unwind: ControlFlowTarget[] = []
    for (let index = this.targets.length - 1; index >= 0; index -= 1) {
      const target = this.targets[index]
      if (labelName) {
        if (target.labelName === labelName) {
          return { target, unwind }
        }
        unwind.push(target)
        continue
      }
      if (target.kind === ControlFlowTargetKind.Loop || target.kind === ControlFlowTargetKind.Switch) {
        return { target, unwind }
      }
      unwind.push(target)
    }
    return { target: undefined, unwind }
  }

  private findContinuePath(labelName?: string): { target?: LoopControlFlowTarget; unwind: ControlFlowTarget[] } {
    const unwind: ControlFlowTarget[] = []
    for (let index = this.targets.length - 1; index >= 0; index -= 1) {
      const target = this.targets[index]
      if (target.kind !== ControlFlowTargetKind.Loop) {
        unwind.push(target)
        continue
      }
      if (labelName) {
        if (target.labelName === labelName) {
          return { target, unwind }
        }
        unwind.push(target)
        continue
      }
      return { target, unwind }
    }
    return { target: undefined, unwind }
  }
}
