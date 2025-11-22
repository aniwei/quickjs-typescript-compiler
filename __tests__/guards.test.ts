import { TypeScriptCompiler } from '../src/index'

describe('Syntax Guards', () => {
  test('should throw error for unsupported syntax', async () => {
    const compiler = new TypeScriptCompiler()
    const code = `
      try {
        console.log('hello')
      } catch (e) {
        console.log('error')
      }
    `
    await expect(compiler.compileSource(code)).rejects.toThrow('Unsupported syntax kind: TryStatement')
  })
})
