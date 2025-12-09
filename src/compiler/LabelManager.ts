import { Compiler } from './Compiler'
import { FunctionDef } from './FunctionDef'
import { Opcode } from '../env'
import { Label } from './Compiler'

export interface LoopInfo {
  type: 'loop' | 'switch' | 'block'
  labels: string[]
  breakLabel: Label
  continueLabel?: Label
}

export class LabelManager {
  private compiler: Compiler
  private loopStack: LoopInfo[] = []
  private pendingLabels: string[] = []

  constructor(compiler: Compiler) {
    this.compiler = compiler
  }

  reset() {
    this.loopStack = []
    this.pendingLabels = []
  }

  get currentLoopStack() {
    return this.loopStack
  }

  get currentPendingLabels() {
    return this.pendingLabels
  }

  set currentLoopStack(stack: LoopInfo[]) {
    this.loopStack = stack
  }

  set currentPendingLabels(labels: string[]) {
    this.pendingLabels = labels
  }

  pushLoop(type: 'loop' | 'switch' | 'block', funcDef: FunctionDef, continueLabel?: Label): LoopInfo {
    // Filter user labels
    const userLabels = this.pendingLabels.filter(l => !l.startsWith('goto_end_') && !l.startsWith('goto8_end_'))
    
    if (type === 'loop' && !continueLabel) {
      continueLabel = this.compiler.createLabel(funcDef)
    }

    const loopInfo: LoopInfo = {
      type,
      labels: userLabels,
      breakLabel: this.compiler.createLabel(funcDef),
      continueLabel
    }
    this.loopStack.push(loopInfo)
    
    // Remove user labels from pendingLabels
    this.pendingLabels = this.pendingLabels.filter(l => l.startsWith('goto_end_') || l.startsWith('goto8_end_'))

    return loopInfo
  }

  popLoop() {
    return this.loopStack.pop()
  }

  addPendingLabel(label: string) {
    this.pendingLabels.push(label)
  }

  removePendingLabel(label: string) {
    const index = this.pendingLabels.indexOf(label)
    if (index !== -1) {
      this.pendingLabels.splice(index, 1)
    }
  }

  filterPendingLabels(predicate: (label: string) => boolean) {
    this.pendingLabels = this.pendingLabels.filter(predicate)
  }

  findBreakTarget(labelText?: string): LoopInfo | undefined {
    if (labelText) {
      for (let i = this.loopStack.length - 1; i >= 0; i--) {
        if (this.loopStack[i].labels.includes(labelText)) {
          return this.loopStack[i]
        }
      }
    } else {
      for (let i = this.loopStack.length - 1; i >= 0; i--) {
        if (this.loopStack[i].type === 'loop' || this.loopStack[i].type === 'switch') {
          return this.loopStack[i]
        }
      }
    }
    return undefined
  }

  findContinueTarget(labelText?: string): LoopInfo | undefined {
    if (labelText) {
      for (let i = this.loopStack.length - 1; i >= 0; i--) {
        if (this.loopStack[i].type === 'loop' && this.loopStack[i].labels.includes(labelText)) {
          return this.loopStack[i]
        }
      }
      // Check if label exists but is not a loop
      for (let i = this.loopStack.length - 1; i >= 0; i--) {
        if (this.loopStack[i].labels.includes(labelText)) {
           throw new Error(`Label '${labelText}' is not a loop label`)
        }
      }
    } else {
      for (let i = this.loopStack.length - 1; i >= 0; i--) {
        if (this.loopStack[i].type === 'loop') {
          return this.loopStack[i]
        }
      }
    }
    return undefined
  }
}
