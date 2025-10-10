import { OpFormat, type OpcodeDefinition } from '../../env'
import type { Instruction } from '../../functionBytecode'

type BranchInstructionLike = Pick<Instruction, 'operands'> | { operands?: number[] }

export function getBranchDelta(instruction: BranchInstructionLike, def: OpcodeDefinition): number {
  const operands = instruction.operands ?? []
  switch (def.format) {
    case OpFormat.label:
    case OpFormat.label8:
    case OpFormat.label16:
    case OpFormat.label_u16:
      return operands[0] ?? 0
    case OpFormat.atom_label_u8:
    case OpFormat.atom_label_u16:
      return operands[1] ?? 0
    default:
      return 0
  }
}

export function getJumpBaseOffset(def: OpcodeDefinition): number {
  switch (def.format) {
    case OpFormat.label:
    case OpFormat.label8:
    case OpFormat.label16:
    case OpFormat.label_u16:
      return 1
    case OpFormat.atom_label_u8:
    case OpFormat.atom_label_u16:
      return 5
    default:
      return def.size
  }
}
