import fs from 'node:fs'
import path from 'node:path'

import { createAdvancedDisassembly } from '../src/disasm'

function loadFixture(name: string): Uint8Array {
  const fixturePath = path.resolve(__dirname, 'compiler/fixtures', name)
  return fs.readFileSync(fixturePath)
}

describe('createAdvancedDisassembly', () => {
  test('renders structured module output for complex functions fixture', () => {
    const bytecode = loadFixture('complex-functions.qbc')
    const output = createAdvancedDisassembly(bytecode)

    expect(output).toContain('module ')
    expect(output).toContain('function[')
    expect(output).toContain('opcodes (')
  })

  test('includes constant pool section when available', () => {
    const bytecode = loadFixture('complex-functions.qbc')
    const output = createAdvancedDisassembly(bytecode)

    expect(output).toContain('constant_pool')
  })
})
