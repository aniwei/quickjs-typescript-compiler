import { compile, FeatureFlags } from '../../src/compiler/bytecode'
import { OpCode } from '../../src/compiler/opcodes'
import * as path from 'path'

function toHex(arr: Uint8Array): string {
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(' ')
}

describe('Array Literal Compilation', () => {
  it('should compile an array literal', () => {
    const filePath = path.resolve(__dirname, 'fixtures/simple-array.ts')
    const bytecode = compile(filePath, FeatureFlags.ShortOpCodes | FeatureFlags.BigNum)

    const expected = new Uint8Array([
      OpCode.object,
      OpCode.push_1,
      OpCode.define_array_el,
      OpCode.push_2,
      OpCode.define_array_el,
      OpCode.push_3,
      OpCode.define_array_el,
      OpCode.return,
    ])

    expect(toHex(bytecode)).toBe(toHex(expected))
  })
})
