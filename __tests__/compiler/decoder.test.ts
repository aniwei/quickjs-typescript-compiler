import { decodeOurs, parseWasmDump, normalizeShortOpcodes } from '../../src/compare/decoder'
import { compile } from '../../src/compiler'
import * as path from 'node:path'

describe('decoder', () => {
  const fixture = path.resolve(__dirname, 'fixtures/compute.ts')

  it('decode ours and parse wasm dump yield arrays', async () => {
    const ours = compile(fixture)
    const norm = normalizeShortOpcodes(ours)
    const oursInstr = decodeOurs(norm)
    expect(Array.isArray(oursInstr)).toBe(true)
    expect(oursInstr.length).toBeGreaterThan(0)

    // wasm dump parsing - use compare script to generate wasm.disasm.txt first is not ideal in unit tests
    // so we use a tiny mock snippet similar to QuickJS dump style
    const sample = `opcodes:\n  0: push_1 1\n  1: get_var console\n  2: get_field2 log\n  3: call_method 1\n  4: goto8 12\n  5: if_false8 4\n  6: return_async\n`
    const wasmInstr = parseWasmDump(sample)
    expect(Array.isArray(wasmInstr)).toBe(true)
    expect(wasmInstr[0].name).toBe('push_i32')
    expect(wasmInstr[2].name).toBe('get_field')
    expect(wasmInstr[3].name).toBe('call')
    expect(wasmInstr[4].name).toBe('goto')
    expect(wasmInstr[5].name).toBe('if_false')
    expect(wasmInstr[6].name).toBe('return_undef')
  })
})
