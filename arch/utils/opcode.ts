import { Opcode, OPCODE_DEFS, type OpcodeDefinition } from '../env'

const opcodeEnum = Opcode as unknown as Record<string, number>

const opcodeInfoByCode = new Map<number, OpcodeDefinition>()
const opcodeNameByValue = new Map<number, string>()

for (const [name, def] of Object.entries(OPCODE_DEFS)) {
  const value = opcodeEnum[name]
  if (typeof value === 'number') {
    opcodeInfoByCode.set(value, def)
    opcodeNameByValue.set(value, name)
  }
}

export function getOpcodeDefinition(opcode: number): OpcodeDefinition | undefined {
  return opcodeInfoByCode.get(opcode)
}

export function getOpcodeName(opcode: number): string | undefined {
  return opcodeNameByValue.get(opcode) ?? Opcode[opcode]
}

export function forEachOpcodeDefinition(callback: (opcode: number, definition: OpcodeDefinition, name: string) => void) {
  for (const [opcode, definition] of opcodeInfoByCode) {
    const name = opcodeNameByValue.get(opcode) ?? Opcode[opcode]
    callback(opcode, definition, name ?? String(opcode))
  }
}

export const OPCODE_INFO_BY_CODE = opcodeInfoByCode
