import { CompilerFlags, getAllOpcodes, type OpcodeInfo } from './opcodes'

export interface OpcodeGenerator {
  getOpcodeValue(name: string): number | undefined
  getOpcodeDefinition(name: string): OpcodeInfo | undefined
  hasOpcode(name: string): boolean
  listOpcodes(): string[]
}

const DEFAULT_FLAGS: CompilerFlags = {
  bigInt: false,
  dump: false,
  shortCode: false,
  debug: false,
  strictMode: false,
}

function normalizeName(name: string): string {
  return name.replace(/^OP_?/i, '').toLowerCase()
}

export function createOpcodeGenerator(flags: CompilerFlags = DEFAULT_FLAGS): OpcodeGenerator {
  const allOpcodes = getAllOpcodes(flags)
  const lookup = new Map<string, OpcodeInfo>()

  for (const [key, def] of Object.entries(allOpcodes)) {
    lookup.set(normalizeName(key), def)
  }

  return {
    getOpcodeValue(name: string) {
      return lookup.get(normalizeName(name))?.opcode
    },
    getOpcodeDefinition(name: string) {
      return lookup.get(normalizeName(name))
    },
    hasOpcode(name: string) {
      return lookup.has(normalizeName(name))
    },
    listOpcodes() {
      return Array.from(new Set(Array.from(lookup.values()).map(def => def.id)))
    },
  }
}
