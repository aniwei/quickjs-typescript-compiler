import { QuickJSLib } from '../scripts/QuickJSLib'

jest.setTimeout(120_000)

describe('scripts/QuickJSLib', () => {
  test('getQuickJSModule returns module with binding', async () => {
    const mod = await QuickJSLib.getQuickJSModule()
    expect(mod).toBeTruthy()
    expect(mod.QuickJSBinding).toBeTruthy()
  })

  test('bytecode version and compile options are numbers', async () => {
    const ver = await QuickJSLib.getBytecodeVersion()
    const opts = await QuickJSLib.getCompileOptions()
    expect(typeof ver).toBe('number')
    expect(typeof opts).toBe('number')
  })

  test('first atom id is greater than predefined atoms', async () => {
    const atoms = await QuickJSLib.getAllAtoms()
    const first = await QuickJSLib.getFirstAtomId()
    const maxPredef = Math.max(...atoms.map(a => a.id))
    expect(first).toBeGreaterThan(maxPredef)
  })

  test('opcode list and formats are available', async () => {
    const list = await QuickJSLib.getAllOpcodes()
    const formats = await QuickJSLib.getAllOpcodeFormats()
    expect(list.length).toBeGreaterThan(10)
    expect(Object.keys(formats).length).toBeGreaterThan(5)
    // sample
    const names = list.map(o => o.name)
    expect(names).toContain('nop')
  })

  test('opcode override map returns a Map', async () => {
    const m = await QuickJSLib.getOpcodeOverrideMap()
    expect(m).toBeInstanceOf(Map)
    expect(m.has('nop')).toBe(true)
  })

  test('compileSource compiles a trivial module', async () => {
    const src = 'export const x = 1;\nexport default 42;'
    const buf = await QuickJSLib.compileSource(src, 'unit.ts')
    expect(buf.byteLength).toBeGreaterThan(8)
    const text = await QuickJSLib.dumpBytesToString(buf)
    expect(typeof text).toBe('string')
  })
})
