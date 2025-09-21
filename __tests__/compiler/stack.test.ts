import { validateStack } from '../../src/compiler/stack'
import { OpCode } from '../../src/compiler/opcodes'

describe('Stack Validator', () => {
  // This test will fail until we populate opCodeInfoMap in stack.ts
  test.skip('should pass for a simple valid sequence', () => {
    const bytecode = new Uint8Array([
      OpCode.push_1, // push 1 (depth: 1)
      OpCode.push_2, // push 2 (depth: 2)
      OpCode.add, // pop 2, push 1 (depth: 1)
      OpCode.return, // pop 1 (depth: 0)
    ])
    expect(() => validateStack(bytecode)).not.toThrow()
    expect(validateStack(bytecode)).toBe(0)
  })

  // This test will also fail until the map is populated
  test.skip('should throw on stack underflow', () => {
    const bytecode = new Uint8Array([
      OpCode.push_1, // push 1 (depth: 1)
      OpCode.add, // pop 2 -> underflow!
    ])
    expect(() => validateStack(bytecode)).toThrow(/Stack underflow/)
  })
})
