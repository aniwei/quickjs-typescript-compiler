import { TypeScriptCompilerCore } from '../src/compiler'
import { CompilerFlags } from '../src/opcodes'

describe('Bytecode Generation Tests', () => {
  const config: CompilerFlags = {
    bigInt: false,
    dump: false,
    shortCode: false,
    debug: false,
    strictMode: false
  }

  const compiler = new TypeScriptCompilerCore(config)

  test('should compile simple variable declaration', () => {
    const code = 'let x = 42'
    const bytecode = compiler.compile(code)
    
    expect(bytecode).toBeDefined()
    expect(bytecode.length).toBeGreaterThan(0)
    expect(bytecode instanceof Uint8Array).toBe(true)
  })

  test('should compile simple assignment', () => {
    const code = 'let x = 5; x = 10;'
    const bytecode = compiler.compile(code)
    
    expect(bytecode).toBeDefined()
    expect(bytecode.length).toBeGreaterThan(0)
  })

  test('should compile arithmetic assignment', () => {
    const code = 'let sum = 0; sum = sum + 5;'
    const bytecode = compiler.compile(code)
    
    expect(bytecode).toBeDefined()
    expect(bytecode.length).toBeGreaterThan(0)
  })

  test('should compile array iteration with console.log', () => {
    const code = `
      const arr = [1, 2, 3]
      for (const item of arr) {
        console.log(item)
      }
    `
    const bytecode = compiler.compile(code)
    
    expect(bytecode).toBeDefined()
    expect(bytecode.length).toBeGreaterThan(0)
  })

  test('should compile function declaration and call', () => {
    const code = `
      function add(x, y) {
        return x + y
      }
      let result = add(5, 10)
    `
    const bytecode = compiler.compile(code)
    
    expect(bytecode).toBeDefined()
    expect(bytecode.length).toBeGreaterThan(0)
  })

  test('should compile string operations', () => {
    const code = `
      let greeting = "Hello"
      let name = "World"
      let message = greeting + " " + name
    `
    const bytecode = compiler.compile(code)
    
    expect(bytecode).toBeDefined()
    expect(bytecode.length).toBeGreaterThan(0)
  })

  test('should handle the compute.ts fixture', () => {
    // Test our main fixture file that we've been working with
    const code = `
      const arr: number[] = [1, 2, 3]
      for (const item of arr) {
        console.log(item);
      }
    `
    const bytecode = compiler.compile(code)
    
    expect(bytecode).toBeDefined()
    expect(bytecode.length).toBeGreaterThan(0)
  })

  test('should generate valid QuickJS bytecode header', () => {
    const code = 'let x = 42'
    const bytecode = compiler.compile(code)
    
    // Check QuickJS bytecode header
    expect(bytecode[0]).toBe(0x05) // BC_VERSION
    
    // Should have atom count as the second byte (LEB128 encoded)
    expect(bytecode[1]).toBeGreaterThan(0)
  })

  test('should include proper atom table', () => {
    const code = 'let myVariable = "hello"'
    const bytecode = compiler.compile(code)
    
    expect(bytecode).toBeDefined()
    expect(bytecode.length).toBeGreaterThan(10) // Should be substantial with atoms
    
    // Should contain the variable name and string literal in atoms
    const bytecodeBuffer = Buffer.from(bytecode)
    
    // Check if atoms contain our variable name and string
    let containsVariable = false
    let containsHello = false
    
    // Search through entire bytecode for atom strings
    for (let i = 0; i < bytecode.length - 5; i++) {
      const slice = bytecodeBuffer.toString('latin1', i, i + 15)
      if (slice.includes('myVariable')) containsVariable = true
      if (slice.includes('hello')) containsHello = true
    }
    
    expect(containsVariable).toBe(true)
    expect(containsHello).toBe(true)
  })

  test('should generate different bytecode for different inputs', () => {
    const code1 = 'let x = 1'
    const code2 = 'let y = 2'
    
    const bytecode1 = compiler.compile(code1)
    const bytecode2 = compiler.compile(code2)
    
    expect(bytecode1).not.toEqual(bytecode2)
  })
})