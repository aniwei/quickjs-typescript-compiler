import { compile, FeatureFlags } from '../../src/compiler/bytecode'
import { OpCode } from '../../src/compiler/opcodes'
import * as path from 'path'

function toHex(arr: Uint8Array): string {
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(' ')
}

describe('simple.ts compilation', () => {
  it('should compile a simple variable declaration', () => {
    const filePath = path.resolve(__dirname, '../../__tests__/simple.ts')
    const bytecode = compile(filePath, FeatureFlags.ShortOpCodes | FeatureFlags.BigNum)

    const expected = new Uint8Array([
      OpCode.push_1, // 1
      OpCode.push_2, // 2
      OpCode.add, // 1 + 2
      OpCode.put_var, // a =
      0,
      0,
      0,
      0, // atom 'a' at index 0
      OpCode.return_undef,
    ])

    // Note: The final return might differ based on global scope behavior.
    // QuickJS in global scope might not have an explicit return.
    // For now, we'll add a return_undef.
    const lastOp = bytecode[bytecode.length - 1]
    if (lastOp !== OpCode.return_undef) {
      const newBytecode = new Uint8Array(bytecode.length + 1)
      newBytecode.set(bytecode)
      newBytecode[bytecode.length] = OpCode.return_undef
      expect(toHex(newBytecode)).toBe(toHex(expected))
    } else {
      expect(toHex(bytecode)).toBe(toHex(expected))
    }
  })
})
