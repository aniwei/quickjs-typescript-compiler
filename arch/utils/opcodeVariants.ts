import { Opcode } from '../env'

const opcodeEnum = Opcode as unknown as Record<string, number>

const PUSH_INT_OPCODE_NAMES = new Map<number, string>([
  [-1, 'OP_push_minus1'],
  [0, 'OP_push_0'],
  [1, 'OP_push_1'],
  [2, 'OP_push_2'],
  [3, 'OP_push_3'],
  [4, 'OP_push_4'],
  [5, 'OP_push_5'],
  [6, 'OP_push_6'],
  [7, 'OP_push_7'],
])

function getOpcodeByName(name: string): Opcode | undefined {
  const value = opcodeEnum[name]
  return typeof value === 'number' ? (value as Opcode) : undefined
}

export function getIndexedOpcode(baseName: string, index: number): Opcode | undefined {
  return getOpcodeByName(`${baseName}${index}`)
}

export function getPushIntOpcode(value: number): Opcode | undefined {
  const name = PUSH_INT_OPCODE_NAMES.get(value)
  return name ? getOpcodeByName(name) : undefined
}
