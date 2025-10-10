import { Opcode, OpFormat } from '../../env'
import type { Instruction } from '../../functionBytecode'
import { getOpcodeDefinition } from '../../utils/opcode'

export function getInstructionSize(instruction: Instruction): number {
  const def = getOpcodeDefinition(instruction.opcode)
  if (!def) {
    throw new Error(`Unknown opcode: ${instruction.opcode}`)
  }
  return def.size
}

export function getStackEffect(opcode: Opcode, operands: number[] = []): { nPop: number; nPush: number } {
  const def = getOpcodeDefinition(opcode)
  if (!def) {
    throw new Error(`Unknown opcode: ${opcode}`)
  }

  let nPop = def.nPop
  switch (def.format) {
    case OpFormat.npop:
    case OpFormat.npop_u16:
      nPop += operands[0] ?? 0
      break
    case OpFormat.npopx:
      if (opcode >= Opcode.OP_call0 && opcode <= Opcode.OP_call3) {
        nPop += opcode - Opcode.OP_call0
      } else {
        throw new Error(`Unsupported npopx opcode: ${opcode}`)
      }
      break
    default:
      break
  }

  return { nPop, nPush: def.nPush }
}
