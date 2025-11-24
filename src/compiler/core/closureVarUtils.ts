import type { Atom, AtomTable } from '../../atoms'
import type { FunctionDef } from '../../functionDef'
import type { Instruction } from '../../functionBytecode'
import { Opcode, OpFormat } from '../../env'
import { getOpcodeDefinition, getOpcodeName } from '../../utils/opcode'
import { getIndexedOpcode } from '../../utils/opcodeVariants'

type ClosureVarIndices = Map<Atom, number>

export interface ClosureVarPruneContext {
  atomTable: AtomTable
}

export function pruneUnusedClosureVars(context: ClosureVarPruneContext, func: FunctionDef) {
  const closureVars = func.bytecode.closureVars
  if (closureVars.length === 0) {
    return
  }

  const used = collectClosureVarUsage(func)
  if (used.size === closureVars.length) {
    return
  }

  const remap = new Map<number, number>()
  const filtered: typeof closureVars = []
  for (let index = 0; index < closureVars.length; index++) {
    if (!used.has(index)) {
      continue
    }
    remap.set(index, filtered.length)
    filtered.push(closureVars[index])
  }

  if (filtered.length === closureVars.length) {
    return
  }

  if (process.env.DEBUG_UNUSED_CLOSURE === '1') {
    const nameAtom = func.bytecode.name
    const name = context.atomTable.getAtomString(nameAtom) ?? '<anonymous>'
    console.log('pruneUnusedClosureVars', {
      functionName: name,
      originalCount: closureVars.length,
      used: [...used].sort((a, b) => a - b),
    })
  }

  if (remap.size === 0) {
    func.bytecode.closureVars = []
    func.closureVars = []
    return
  }

  rewriteClosureVarInstructions(func.bytecode.instructions, remap)

  func.bytecode.closureVars = filtered
  func.closureVars = [...filtered]
}

function collectClosureVarUsage(func: FunctionDef): Set<number> {
  const used = new Set<number>()
  for (const instruction of func.bytecode.instructions) {
    const def = getOpcodeDefinition(instruction.opcode)
    if (!def) {
      continue
    }
    if (def.format === OpFormat.var_ref) {
      if (instruction.operands.length === 0) {
        continue
      }
      const index = instruction.operands[instruction.operands.length - 1]
      used.add(index)
      continue
    }
    if (def.format === OpFormat.none_var_ref) {
      const name = getOpcodeName(instruction.opcode)
      if (!name) {
        continue
      }
      const match = name.match(/^(OP_[a-z_]+)(\d)$/)
      if (!match) {
        continue
      }
      const index = Number(match[2])
      used.add(index)
    }
  }
  return used
}

function rewriteClosureVarInstructions(instructions: Instruction[], remap: Map<number, number>) {
  for (const instruction of instructions) {
    const def = getOpcodeDefinition(instruction.opcode)
    if (!def) {
      continue
    }
    if (def.format === OpFormat.var_ref) {
      if (instruction.operands.length === 0) {
        continue
      }
      const oldIndex = instruction.operands[instruction.operands.length - 1]
      const newIndex = remap.get(oldIndex)
      if (newIndex === undefined) {
        continue
      }
      instruction.operands[instruction.operands.length - 1] = newIndex
      continue
    }
    if (def.format === OpFormat.none_var_ref) {
      const name = getOpcodeName(instruction.opcode)
      if (!name) {
        continue
      }
      const match = name.match(/^(OP_[a-z_]+)(\d)$/)
      if (!match) {
        continue
      }
      const oldIndex = Number(match[2])
      const newIndex = remap.get(oldIndex)
      if (newIndex === undefined) {
        continue
      }
      const baseName = match[1]
      const updatedOpcode = getIndexedOpcode(baseName, newIndex)
      if (updatedOpcode !== undefined) {
        instruction.opcode = updatedOpcode
        continue
      }
      const fallbackOpcode = (Opcode as unknown as Record<string, number>)[baseName]
      if (typeof fallbackOpcode === 'number') {
        instruction.opcode = fallbackOpcode
        instruction.operands = [newIndex]
      }
    }
  }
}
