import { TypeScriptCompilerCore } from '../../src/compiler'
import { CompilerFlags } from '../../src/opcodes'

describe('TypeScript Compiler', () => {
  test('should compile variable declaration', () => {
    const config: CompilerFlags = {
      bigInt: false,
      dump: false,
      shortCode: false,
      debug: false,
      strictMode: false
    }
    
    const compiler = new TypeScriptCompilerCore(config)
    
    const code = 'let x = 42'
    const result = compiler.compile(code)
    
    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(0)
  })
  
  test('should handle string literals', () => {
    const config: CompilerFlags = {
      bigInt: false,
      dump: false,
      shortCode: false,
      debug: false,
      strictMode: false
    }
    
    const compiler = new TypeScriptCompilerCore(config)
    
    const code = 'let message = "Hello World"'
    const result = compiler.compile(code)
    
    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(0)
  })
  
  test('should compile function declaration', () => {
    const config: CompilerFlags = {
      bigInt: false,
      dump: false,
      shortCode: false,
      debug: false,
      strictMode: false
    }
    
    const compiler = new TypeScriptCompilerCore(config)
    
    const code = `
      function add(a: number, b: number): number {
        return a + b
      }
    `
    const result = compiler.compile(code)
    
    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(0)
  })
  
  test('should handle different configurations', () => {
    const config: CompilerFlags = {
      bigInt: true,
      dump: true,
      shortCode: true,
      debug: true,
      strictMode: true
    }
    
    const compiler = new TypeScriptCompilerCore(config)
    
    const code = 'let x = 42'
    const result = compiler.compile(code)
    
    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(0)
  })
})
