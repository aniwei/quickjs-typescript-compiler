import { Opcode } from '../../env'

export type LoopCleanupKind = 'for-of' | 'for-in'
export interface LoopCleanupInfo {
  kind: LoopCleanupKind
}

export class LoopCleanupManager {
  private readonly cleanupByBreakLabel = new Map<string, LoopCleanupInfo>()

  register(breakLabel: string, info: LoopCleanupInfo): void {
    this.cleanupByBreakLabel.set(breakLabel, info)
  }

  clear(breakLabel: string): void {
    this.cleanupByBreakLabel.delete(breakLabel)
  }

  reset(): void {
    this.cleanupByBreakLabel.clear()
  }

  getEntries(): Array<[string, LoopCleanupInfo]> {
    return Array.from(this.cleanupByBreakLabel.entries())
  }

  restoreEntries(entries: Array<[string, LoopCleanupInfo]>): void {
    this.cleanupByBreakLabel.clear()
    for (const [label, info] of entries) {
      this.cleanupByBreakLabel.set(label, info)
    }
  }

  emitLoopCleanup(breakLabel: string, emitOpcode: (opcode: Opcode) => void): void {
    const cleanup = this.cleanupByBreakLabel.get(breakLabel)
    if (!cleanup) {
      return
    }
    switch (cleanup.kind) {
      case 'for-of':
        emitOpcode(Opcode.OP_iterator_close)
        break
      case 'for-in':
        emitOpcode(Opcode.OP_drop)
        break
      default:
        throw new Error(`Unsupported loop cleanup kind '${cleanup.kind}'`)
    }
  }
}
