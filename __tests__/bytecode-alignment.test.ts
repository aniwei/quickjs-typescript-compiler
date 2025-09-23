// __tests__/bytecode-alignment.test.ts

import { BytecodeGenerator, Constants, LabelManager } from '../src/bytecode'
import { AtomTable, JSAtom } from '../src/atoms'
import { CompilerFlags, OPCODES } from '../src/opcodes'

describe('Bytecode Alignment with QuickJS', () => {
  let generator: BytecodeGenerator
  let atomTable: AtomTable
  let constants: Constants
  let labelManager: LabelManager
  let config: CompilerFlags

  beforeEach(() => {
    config = {
      bigInt: false,
      dump: false,
      shortCode: false,
      debug: false,
      strictMode: false,
      firstAtomId: JSAtom.JS_ATOM_END
    }
    atomTable = new AtomTable()
    constants = new Constants()
    labelManager = new LabelManager()
    generator = new BytecodeGenerator(config, atomTable, constants, labelManager)
  })

  describe('Atom Ordering', () => {
    test('should order atoms based on usage position', () => {
      // Add vardefs first
      generator.addVarDef('arr', 'const')
      generator.addVarDef('item', 'const')
      
      // Use atoms in instructions
      const consoleAtom = atomTable.getAtomId('console')
      const logAtom = atomTable.getAtomId('log')
      
      generator.writeInstruction(OPCODES.GET_VAR, consoleAtom)
      generator.writeInstruction(OPCODES.GET_FIELD, logAtom)
      
      const bytecode = generator.finalize()
      
      // Extract atom table
      let offset = 1 // Skip BC_VERSION
      const { value: atomCount } = readLEB128(bytecode, offset)
      
      // Verify atom count includes all user atoms
      expect(atomCount).toBeGreaterThanOrEqual(4) // arr, item, console, log
    })
    
    test('should prioritize vardef atoms in ordering', () => {
      // Scenario: vardefs should come before instruction atoms
      generator.addVarDef('localVar', 'let')
      
      const fieldAtom = atomTable.getAtomId('field')
      generator.writeInstruction(OPCODES.GET_FIELD, fieldAtom)
      
      generator.addVarDef('anotherVar', 'const')
      
      const bytecode = generator.finalize()
      const atoms = extractAtomStrings(bytecode)
      
      // localVar and anotherVar should come before field
      const localVarIdx = atoms.indexOf('localVar')
      const anotherVarIdx = atoms.indexOf('anotherVar')
      const fieldIdx = atoms.indexOf('field')
      
      expect(localVarIdx).toBeLessThan(fieldIdx)
      expect(anotherVarIdx).toBeLessThan(fieldIdx)
    })
  })

  describe('Function Header Format', () => {
    test('should generate correct function header structure', () => {
      generator.addVarDef('x', 'let')
      generator.writeInstruction(OPCODES.PUSH_I32, 42)
      generator.writeInstruction(OPCODES.PUT_LOC, 0)
      
      const bytecode = generator.finalize()
      
      // Skip atom table to find function header
      const functionOffset = findFunctionOffset(bytecode)
      
      // Verify BC_TAG_FUNCTION_BYTECODE
      expect(bytecode[functionOffset]).toBe(0x0D)
      
      // Verify flags (16 bits)
      const flags = bytecode[functionOffset + 1] | (bytecode[functionOffset + 2] << 8)
      
      // Check specific flags
      const hasSimpleParameterList = (flags >> 1) & 1
      expect(hasSimpleParameterList).toBe(1)
      
      // Verify js_mode
      const jsMode = bytecode[functionOffset + 3]
      expect(jsMode).toBe(config.strictMode ? 1 : 0)
    })
    
    test('should include local_count field', () => {
      generator.addVarDef('a', 'const')
      generator.addVarDef('b', 'let')
      generator.addVarDef('c', 'var')
      
      const bytecode = generator.finalize()
      const functionOffset = findFunctionOffset(bytecode)
      
      // Skip to local_count field (after other fields)
      // This is the 12th field in the function header
      let offset = functionOffset + 4 // Skip tag, flags, js_mode
      
      // Skip func_name atom
      const { bytesRead: nameBytes } = readLEB128(bytecode, offset)
      offset += nameBytes
      
      // Read arg_count, var_count, etc.
      const { value: argCount } = readLEB128(bytecode, offset)
      offset += 1
      
      const { value: varCount } = readLEB128(bytecode, offset)
      offset += 1
      
      // Skip to local_count
      offset += 5 // Skip other fields
      
      const { value: localCount } = readLEB128(bytecode, offset)
      
      // local_count should equal arg_count + var_count
      expect(localCount).toBe(argCount + varCount)
      expect(varCount).toBe(3) // We added 3 variables
    })
  })

  describe('VarDef Encoding', () => {
    test('should encode vardefs with correct flags', () => {
      generator.addVarDef('constVar', 'const')
      generator.addVarDef('letVar', 'let')
      generator.addVarDef('varVar', 'var')
      
      const bytecode = generator.finalize()
      
      // Parse vardefs from bytecode
      const vardefs = parseVardefs(bytecode)
      
      expect(vardefs).toHaveLength(3)
      
      // Check const variable
      const constDef = vardefs.find(v => v.name === 'constVar')
      expect(constDef?.isConst).toBe(true)
      expect(constDef?.isLexical).toBe(true)
      
      // Check let variable
      const letDef = vardefs.find(v => v.name === 'letVar')
      expect(letDef?.isConst).toBe(false)
      expect(letDef?.isLexical).toBe(true)
      
      // Check var variable
      const varDef = vardefs.find(v => v.name === 'varVar')
      expect(varDef?.isConst).toBe(false)
      expect(varDef?.isLexical).toBe(false)
    })
    
    test('should encode scope_next as value + 1', () => {
      generator.addVarDef('test', 'let')
      
      const bytecode = generator.finalize()
      const vardefs = parseVardefs(bytecode)
      
      // scope_next should be encoded as 0 (meaning -1)
      expect(vardefs[0]?.scopeNext).toBe(0)
    })
  })

  describe('Constant Pool Encoding', () => {
    test('should encode integers as BC_TAG_INT32', () => {
      const idx = constants.add(42)
      generator.writeInstruction(OPCODES.PUSH_CONST, idx)
      
      const bytecode = generator.finalize()
      const constantPool = parseConstantPool(bytecode)
      
      expect(constantPool).toHaveLength(1)
      expect(constantPool[0].tag).toBe(0x05) // BC_TAG_INT32
      expect(constantPool[0].value).toBe(42)
    })
    
    test('should encode strings as BC_TAG_STRING', () => {
      const idx = constants.add('Hello')
      generator.writeInstruction(OPCODES.PUSH_CONST, idx)
      
      const bytecode = generator.finalize()
      const constantPool = parseConstantPool(bytecode)
      
      expect(constantPool).toHaveLength(1)
      expect(constantPool[0].tag).toBe(0x07) // BC_TAG_STRING
      expect(constantPool[0].value).toBe('Hello')
    })
  })
})

// Helper functions for parsing bytecode
function readLEB128(buffer: Uint8Array, offset: number): { value: number, bytesRead: number } {
  let result = 0
  let shift = 0
  let bytesRead = 0
  
  while (offset + bytesRead < buffer.length) {
    const byte = buffer[offset + bytesRead]
    result |= (byte & 0x7F) << shift
    bytesRead++
    
    if ((byte & 0x80) === 0) break
    shift += 7
  }
  
  return { value: result, bytesRead }
}

function extractAtomStrings(bytecode: Uint8Array): string[] {
  const atoms: string[] = []
  let offset = 1 // Skip BC_VERSION
  
  const { value: atomCount, bytesRead } = readLEB128(bytecode, offset)
  offset += bytesRead
  
  for (let i = 0; i < atomCount && offset < bytecode.length; i++) {
    const { value: encodedLen, bytesRead: lenBytes } = readLEB128(bytecode, offset)
    offset += lenBytes
    
    const actualLen = encodedLen >> 1
    if (offset + actualLen <= bytecode.length) {
      const str = new TextDecoder().decode(bytecode.slice(offset, offset + actualLen))
      atoms.push(str)
      offset += actualLen
    }
  }
  
  return atoms
}

function findFunctionOffset(bytecode: Uint8Array): number {
  let offset = 1 // Skip BC_VERSION
  
  // Skip atom table
  const { value: atomCount, bytesRead } = readLEB128(bytecode, offset)
  offset += bytesRead
  
  for (let i = 0; i < atomCount; i++) {
    const { value: encodedLen, bytesRead: lenBytes } = readLEB128(bytecode, offset)
    offset += lenBytes
    const actualLen = encodedLen >> 1
    offset += actualLen
  }
  
  return offset
}

interface ParsedVarDef {
  name: string
  scopeLevel: number
  scopeNext: number
  isConst: boolean
  isLexical: boolean
  isCaptured: boolean
}

function parseVardefs(bytecode: Uint8Array): ParsedVarDef[] {
  const vardefs: ParsedVarDef[] = []
  const atoms = extractAtomStrings(bytecode)
  
  let offset = findFunctionOffset(bytecode)
  
  // Skip function header to get to vardefs
  offset += 4 // Skip tag, flags, js_mode
  
  // Skip func_name
  const { bytesRead: nameBytes } = readLEB128(bytecode, offset)
  offset += nameBytes
  
  // Read counts
  const { value: argCount, bytesRead: argBytes } = readLEB128(bytecode, offset)
  offset += argBytes
  
  const { value: varCount, bytesRead: varBytes } = readLEB128(bytecode, offset)
  offset += varBytes
  
  // Skip other header fields
  for (let i = 0; i < 6; i++) {
    const { bytesRead } = readLEB128(bytecode, offset)
    offset += bytesRead
  }
  
  // Now parse vardefs
  const totalVars = argCount + varCount
  
  for (let i = 0; i < totalVars && offset < bytecode.length; i++) {
    // Read var_name atom
    const { value: atomIdx, bytesRead: atomBytes } = readLEB128(bytecode, offset)
    offset += atomBytes
    
    // Decode atom index
    let actualAtomIdx: number
    if (atomIdx & 1) {
      // Predefined atom
      actualAtomIdx = atomIdx >> 1
    } else {
      // User atom
      actualAtomIdx = atomIdx >> 1
    }
    
    const name = atoms[actualAtomIdx] || `var${i}`
    
    // Read scope_level
    const { value: scopeLevel, bytesRead: scopeBytes } = readLEB128(bytecode, offset)
    offset += scopeBytes
    
    // Read scope_next
    const { value: scopeNext, bytesRead: nextBytes } = readLEB128(bytecode, offset)
    offset += nextBytes
    
    // Read flags
    const flags = bytecode[offset++]
    
    const varKind = flags & 0x0F
    const isConst = (flags >> 4) & 1
    const isLexical = (flags >> 5) & 1
    const isCaptured = (flags >> 6) & 1
    
    vardefs.push({
      name,
      scopeLevel,
      scopeNext,
      isConst: !!isConst,
      isLexical: !!isLexical,
      isCaptured: !!isCaptured
    })
  }
  
  return vardefs
}

interface ParsedConstant {
  tag: number
  value: any
}

function parseConstantPool(bytecode: Uint8Array): ParsedConstant[] {
  const constants: ParsedConstant[] = []
  
  // Find the constant pool location (after bytecode)
  let offset = findFunctionOffset(bytecode)
  
  // Skip through function header, vardefs, and bytecode to get to constants
  // This is simplified - in real implementation we'd need to parse more carefully
  
  // For now, search for constant tags
  for (let i = offset; i < bytecode.length; i++) {
    const tag = bytecode[i]
    
    if (tag === 0x05) { // BC_TAG_INT32
      const { value, bytesRead } = readLEB128(bytecode, i + 1)
      constants.push({ tag, value })
      i += bytesRead
    } else if (tag === 0x07) { // BC_TAG_STRING
      const { value: encodedLen, bytesRead: lenBytes } = readLEB128(bytecode, i + 1)
      const actualLen = encodedLen >> 1
      const str = new TextDecoder().decode(bytecode.slice(i + 1 + lenBytes, i + 1 + lenBytes + actualLen))
      constants.push({ tag, value: str })
      i += lenBytes + actualLen
    }
  }
  
  return constants
}