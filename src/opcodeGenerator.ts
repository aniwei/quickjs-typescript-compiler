import { getAllOpcodes, OpcodeDefinition, CompilerFlags } from './opcodes'
import { OPCODE_NAME_TO_CODE } from './env'

export interface OpcodeGenerator {
  getOpcode: (id: string) => OpcodeDefinition
  getOpcodeValue: (id: string) => number | undefined
}

export function createOpcodeGenerator(
  flags: CompilerFlags,
  opcodeOverride?: Map<string, number>
): OpcodeGenerator {
  const opcodes = getAllOpcodes(flags)
  const opcodeMap = new Map<string, OpcodeDefinition>()
  for (const opcode of Object.values(opcodes)) {
    opcodeMap.set(opcode.id, opcode)
  }

  return {
    getOpcode: (id: string): OpcodeDefinition => {
      const opcode = opcodeMap.get(id)
      if (!opcode) {
        throw new Error(`Opcode not found: ${id}`)
      }
      return opcode
    },
    getOpcodeValue: (id: string): number | undefined => {
      // 优先使用 override 映射
      if (opcodeOverride?.has(id)) {
        return opcodeOverride.get(id)
      }
      // 否则从全局映射中查找
      return OPCODE_NAME_TO_CODE[id]
    },
  }
}