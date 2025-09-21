import { OpCode } from './opcodes'

// Based on quickjs-opcode.h `opcode_info`
export interface OpCodeInfo {
  name: string
  n_pop: number
  n_push: number
  fmt: string
}

// A function to calculate dynamic n_pop, e.g., for call
export type DynamicPop = (bytecode: Uint8Array, index: number) => number

// Maps OpCode to its info or a dynamic pop calculator
export const opCodeInfoMap: Map<OpCode, OpCodeInfo | DynamicPop> = new Map()

// TODO: Populate this map with data from quickjs-opcode.h
// Example:
// opCodeInfoMap.set(OpCode.push_i32, { name: 'push_i32', n_pop: 0, n_push: 1, fmt: 'i32' })
// opCodeInfoMap.set(OpCode.add, { name: 'add', n_pop: 2, n_push: 1, fmt: 'none' })

/**
 * Validates the stack balance for a given bytecode sequence.
 * Throws an error if a stack underflow is detected.
 * @param bytecode The bytecode to validate.
 */
export function validateStack(bytecode: Uint8Array) {
  let stackDepth = 0
  let i = 0

  while (i < bytecode.length) {
    const opcode = bytecode[i]
    const info = opCodeInfoMap.get(opcode)

    if (!info) {
      // For now, we'll just skip opcodes we don't have info for.
      // In a stricter mode, we might throw an error.
      i++
      continue
    }

    let n_pop: number
    if (typeof info === 'function') {
      n_pop = info(bytecode, i)
    } else {
      n_pop = info.n_pop
      stackDepth += info.n_push
    }

    stackDepth -= n_pop
    if (stackDepth < 0) {
      throw new Error(
        `Stack underflow at offset ${i} with opcode ${OpCode[opcode]}. Stack depth became ${stackDepth}.`
      )
    }

    // TODO: Advance 'i' based on opcode format (fmt)
    i++
  }

  return stackDepth
}
