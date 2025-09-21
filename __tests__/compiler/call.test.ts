import { compile, FeatureFlags } from '../../src/compiler/bytecode'
import { OpCode } from '../../src/compiler/opcodes'
import * as path from 'path'

function toHex(arr: Uint8Array): string {
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(' ')
}

describe('Property access and call', () => {
  it('should compile console.log(1)', () => {
    const filePath = path.resolve(__dirname, 'fixtures/console-log.ts')
    const bytecode = compile(filePath,  FeatureFlags.ShortOpCodes | FeatureFlags.BigNum)

    // get_var 'console'; get_field 'log'; push_1; call argc=1; return
    const expected = new Uint8Array([
      OpCode.get_var,
      0, 0, 0, 0, // atom 'console'
      OpCode.get_field,
      1, 0, 0, 0, // atom 'log'
      OpCode.push_1,
      OpCode.call, 1, 0,
      OpCode.return,
    ])

    expect(toHex(bytecode)).toBe(toHex(expected))
  })
})
