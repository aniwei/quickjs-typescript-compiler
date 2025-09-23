import { QuickJSLib } from '../scripts/QuickJSLib'

jest.setTimeout(120_000)

describe('QuickJS wasm binding maps', () => {
  test('atom map contains key identifiers and string aliases', async () => {
    const atoms = await QuickJSLib.getAllAtoms()
    const byKey = new Map(atoms.map(a => [a.key, a.id]))

    // basic presence
    expect(byKey.has('length')).toBe(true)
    expect(byKey.has('constructor')).toBe(true)
    expect(byKey.get('length')).toBeGreaterThan(0)

    // empty string and friendly alias
    expect(byKey.has('')).toBe(true)
    expect(byKey.has('empty_string')).toBe(true)
    expect(byKey.get('')).toBe(byKey.get('empty_string'))

    // well-known symbol: both identifier and string form should map to same id
    // identifier: Symbol_iterator, string: Symbol.iterator
    expect(byKey.has('Symbol_iterator')).toBe(true)
    expect(byKey.has('Symbol.iterator')).toBe(true)
    expect(byKey.get('Symbol_iterator')).toBe(byKey.get('Symbol.iterator'))

    // private brand placeholder should exist
    expect(byKey.has('<private_brand>')).toBe(true)

    // first atom id (JS_ATOM_END) must be greater than any predefined atom id
    const firstAtomId = await QuickJSLib.getFirstAtomId()
    const maxPredef = Math.max(...atoms.map(a => a.id))
    expect(firstAtomId).toBeGreaterThan(maxPredef)
  })

  test('opcode map contains arithmetic ops', async () => {
    const opcodes = await QuickJSLib.getAllOpcodes()
    const byName = new Map(opcodes.map(o => [o.name, o.code]))

    // a few common opcodes that should exist
    for (const name of ['nop', 'add', 'sub', 'mul']) {
      expect(byName.has(name)).toBe(true)
      expect(byName.get(name)).toEqual(expect.any(Number))
    }
  })
})
