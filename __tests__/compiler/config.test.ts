import { compile, FeatureFlags } from '../../src/compiler/bytecode'
import { OpCode } from '../../src/compiler/opcodes'
import * as path from 'path'

function toHex(arr: Uint8Array): string {
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(' ')
}

describe('BytecodeGenerator with shortOpcodes', () => {
  it('should use short opcodes for small integers when enabled', () => {
    const filePath = path.resolve(__dirname, 'fixtures/simple-add.ts')
    const bytecode = compile(filePath,  FeatureFlags.ShortOpCodes | FeatureFlags.BigNum)

    const expected = new Uint8Array([
      OpCode.push_1, // push_1
      OpCode.push_2, // push_2
      OpCode.add, // add
      OpCode.return, // return
    ])

    expect(toHex(bytecode)).toBe(toHex(expected))
  })

  it('should use i32 opcodes for small integers when disabled', () => {
    const filePath = path.resolve(__dirname, 'fixtures/simple-add.ts')
    const bytecode = compile(filePath,  FeatureFlags.ShortOpCodes | FeatureFlags.BigNum)

    const expected = new Uint8Array([
      OpCode.push_i32,
      1,
      0,
      0,
      0, // push_i32 1
      OpCode.push_i32,
      2,
      0,
      0,
      0, // push_i32 2
      OpCode.add, // add
      OpCode.return, // return
    ])

    expect(toHex(bytecode)).toBe(toHex(expected))
  })
})
