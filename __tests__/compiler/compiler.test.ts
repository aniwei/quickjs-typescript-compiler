import { TypeScriptCompiler } from '../../src'

describe('TypeScriptCompiler', () => {
  test('compiles simple module to bytecode', async () => {
    const compiler = new TypeScriptCompiler()
    const result = await compiler.compileSource('const value: number = 1;', 'inline.ts')
    expect(result).toBeInstanceOf(Uint8Array)
    expect(result.length).toBeGreaterThan(0)
  })
})
