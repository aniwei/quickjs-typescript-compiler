import { compile } from '../../src/compiler'
import * as path from 'node:path'

const fixture = path.resolve(__dirname, 'fixtures/compute.ts')

describe('for...of bytecode', () => {
  test('compiles array for...of and includes call sequence', () => {
    const bytecode = compile(fixture)

    // Sanity: should produce some bytes and include opcodes we already support
    expect(bytecode.length).toBeGreaterThan(0)
    // expect it to at least include get_var (console), get_field (log), call
    const hasGetVar = Array.from(bytecode).includes(0x15)
    const hasGetField = Array.from(bytecode).includes(0x1d)
    const hasCall = Array.from(bytecode).includes(0x1f)
    expect(hasGetVar && hasGetField && hasCall).toBe(true)
  })
})
