import { createOpcodeGenerator } from '../src/opcodeGenerator'
import { CompilerFlags } from '../src/opcodes'

describe('OpcodeGenerator', () => {
  test('should create opcode generator with default config', () => {
    const config: CompilerFlags = {
      bigInt: false,
      dump: false,
      shortCode: false,
      debug: false,
      strictMode: false
    }
    
    const generator = createOpcodeGenerator(config)
    expect(generator).toBeDefined()
  })

  test('should generate valid opcode values', () => {
    const config: CompilerFlags = {
      bigInt: false,
      dump: false,
      shortCode: false,
      debug: false,
      strictMode: false
    }
    
    const generator = createOpcodeGenerator(config)
    
    const value = generator.getOpcodeValue('push_i32')
    expect(value).toBeDefined()
    expect(typeof value).toBe('number')
  })

  test('should return consistent values for same opcode', () => {
    const config: CompilerFlags = {
      bigInt: false,
      dump: false,
      shortCode: false,
      debug: false,
      strictMode: false
    }
    
    const generator = createOpcodeGenerator(config)
    
    const value1 = generator.getOpcodeValue('push_i32')
    const value2 = generator.getOpcodeValue('push_i32')
    
    expect(value1).toBe(value2)
  })

  test('should return undefined for invalid opcode', () => {
    const config: CompilerFlags = {
      bigInt: false,
      dump: false,
      shortCode: false,
      debug: false,
      strictMode: false
    }
    
    const generator = createOpcodeGenerator(config)
    
    const value = generator.getOpcodeValue('invalid_opcode')
    expect(value).toBeUndefined()
  })

  test('should handle different configurations', () => {
    const configs = [
      { bigInt: true, dump: false, shortCode: false, debug: false, strictMode: false },
      { bigInt: false, dump: true, shortCode: false, debug: false, strictMode: false },
      { bigInt: false, dump: false, shortCode: true, debug: false, strictMode: false },
      { bigInt: false, dump: false, shortCode: false, debug: true, strictMode: false },
      { bigInt: false, dump: false, shortCode: false, debug: false, strictMode: true }
    ]
    
    for (const config of configs) {
      const generator = createOpcodeGenerator(config)
      expect(generator).toBeDefined()
      
      const value = generator.getOpcodeValue('push_i32')
      expect(value).toBeDefined()
    }
  })
})