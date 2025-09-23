import { TypeScriptCompilerCore } from '../../src/compiler'
import { CompilerFlags } from '../../src/opcodes'
import { AtomTable } from '../../src/atoms'
import { BytecodeSerializer } from '../../src/serializer'

describe('TypeScript Compiler', () => {
  test('should compile variable declaration', () => {
    const config: CompilerFlags = {
      bigInt: false,
      dump: false,
      shortCode: false,
      debug: false,
      strictMode: false
    }
    const atomTable = new AtomTable(config.firstAtomId)
    const compiler = new TypeScriptCompilerCore(config, atomTable)
    
    const code = 'let x = 42'
    const funcDef = compiler.compile(code)
    const serializer = new BytecodeSerializer(funcDef, atomTable, config)
    const result = serializer.serialize()
    
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
    const atomTable = new AtomTable(config.firstAtomId)
    const compiler = new TypeScriptCompilerCore(config, atomTable)
    
    const code = 'let message = "Hello World"'
    const funcDef = compiler.compile(code)
    const serializer = new BytecodeSerializer(funcDef, atomTable, config)
    const result = serializer.serialize()
    
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
    const atomTable = new AtomTable(config.firstAtomId)
    const compiler = new TypeScriptCompilerCore(config, atomTable)
    
    const code = `
      function add(a: number, b: number): number {
        return a + b
      }
    `
    const funcDef = compiler.compile(code)
    const serializer = new BytecodeSerializer(funcDef, atomTable, config)
    const result = serializer.serialize()
    
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
    const atomTable = new AtomTable(config.firstAtomId)
    const compiler = new TypeScriptCompilerCore(config, atomTable)
    
    const code = 'let x = 42'
    const funcDef = compiler.compile(code)
    const serializer = new BytecodeSerializer(funcDef, atomTable, config)
    const result = serializer.serialize()
    
    expect(result).toBeDefined()
    expect(result.length).toBeGreaterThan(0)
  })
})
