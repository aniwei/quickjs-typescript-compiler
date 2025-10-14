import { OpFormat, type Opcode } from '../../env'
import type { Instruction } from '../../functionBytecode'
import { getOpcodeDefinition } from '../../utils/opcode'
import { getJumpBaseOffset } from './branches'

export interface PendingJump {
  index: number
  label: string
  opcode: Opcode
}

interface ResolvePendingJumpsParams {
  pendingJumps: PendingJump[]
  labelPositions: Map<string, number>
  instructionOffsets: number[]
  instructions: Instruction[]
}

export function resolvePendingJumps(params: ResolvePendingJumpsParams): void {
  const { pendingJumps, labelPositions, instructionOffsets, instructions } = params
  for (const pending of pendingJumps) {
    const target = labelPositions.get(pending.label)
    if (target === undefined) {
      throw new Error(`Unresolved label ${pending.label}`)
    }
    const def = getOpcodeDefinition(pending.opcode)
    if (!def) {
      throw new Error(`Unknown opcode ${pending.opcode}`)
    }
    const start = instructionOffsets[pending.index]
    const baseOffset = getJumpBaseOffset(def)
    const offset = target - (start + baseOffset)
    if (def.format === OpFormat.label8) {
      if (offset < -128 || offset > 127) {
        throw new Error('Jump offset out of range for label8')
      }
    }
    const instruction = instructions[pending.index]
    if (instruction.operands.length === 0) {
      instruction.operands.push(offset)
    } else {
      instruction.operands[instruction.operands.length - 1] = offset
    }
  }
}
