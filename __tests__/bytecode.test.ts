import { BytecodeWriter, LabelManager, Constants } from '../src/bytecode'
import { AtomTable } from '../src/atoms'
import { CompilerFlags, OPCODES } from '../src/opcodes'

describe('BytecodeWriter', () => {
  let writer: BytecodeWriter
  let atomTable: AtomTable
  let constantsPool: Constants
  let labelManager: LabelManager
  let config: CompilerFlags

  beforeEach(() => {
    config = {
      bigInt: false,
      dump: false,
      shortCode: false,
      debug: false,
      strictMode: false
    }
    atomTable = new AtomTable()
    constantsPool = new Constants()
    labelManager = new LabelManager()
    writer = new BytecodeWriter(config, atomTable, constantsPool, labelManager)
  })

  test('should write instruction correctly', () => {
    writer.writeInstruction(OPCODES.PUSH_I32, 42)
    const bytes = writer.finalize()
    expect(bytes.length).toBeGreaterThan(0)
  })

  test('should write multiple instructions', () => {
    writer.writeInstruction(OPCODES.PUSH_I32, 1)
    writer.writeInstruction(OPCODES.PUSH_I32, 2)
    writer.writeInstruction(OPCODES.ADD)
    
    const bytes = writer.finalize()
    expect(bytes.length).toBeGreaterThan(5) // At least 3 opcodes + data
  })

  test('should get instructions array', () => {
    writer.writeInstruction(OPCODES.PUSH_I32, 42)
    writer.writeInstruction(OPCODES.ADD)
    
    const instructions = writer.getInstructions()
    expect(instructions).toHaveLength(2)
    expect(instructions[0].opcode).toBe(OPCODES.PUSH_I32)
    expect(instructions[1].opcode).toBe(OPCODES.ADD)
  })

  test('should track current position', () => {
    const pos1 = writer.getCurrentPosition()
    writer.writeInstruction(OPCODES.PUSH_I32, 42)
    const pos2 = writer.getCurrentPosition()
    
    expect(pos2).toBeGreaterThan(pos1)
  })
})

describe('LabelManager', () => {
  let labelManager: LabelManager

  beforeEach(() => {
    labelManager = new LabelManager()
  })

  test('should create new label', () => {
    const label = labelManager.createLabel()
    expect(typeof label).toBe('string')
    expect(label.length).toBeGreaterThan(0)
  })

  test('should create unique labels', () => {
    const label1 = labelManager.createLabel()
    const label2 = labelManager.createLabel()
    expect(label1).not.toBe(label2)
  })

  test('should set and get label address', () => {
    const label = labelManager.createLabel()
    labelManager.setLabel(label, 100)
    expect(labelManager.getAddress(label)).toBe(100)
  })

  test('should handle undefined label address', () => {
    const label = labelManager.createLabel()
    expect(labelManager.getAddress(label)).toBeUndefined()
  })

  test('should track patches', () => {
    const label = labelManager.createLabel()
    labelManager.addPatch(label, 50)
    labelManager.addPatch(label, 75)
    
    const patches = labelManager.getPatches()
    expect(patches.has(label)).toBe(true)
    expect(patches.get(label)).toEqual([50, 75])
  })
})

describe('Constants', () => {
  let constantsPool: Constants

  beforeEach(() => {
    constantsPool = new Constants()
  })

  test('should add constant and return index', () => {
    const index1 = constantsPool.add(42)
    const index2 = constantsPool.add('hello')
    
    expect(index1).toBe(0)
    expect(index2).toBe(1)
  })

  test('should return same index for duplicate constants', () => {
    const index1 = constantsPool.add(42)
    const index2 = constantsPool.add(42)
    
    expect(index1).toBe(index2)
  })

  test('should handle different types of constants', () => {
    const numIndex = constantsPool.add(123)
    const strIndex = constantsPool.add('test')
    const boolIndex = constantsPool.add(true)
    const nullIndex = constantsPool.add(null)
    
    expect(numIndex).toBe(0)
    expect(strIndex).toBe(1)
    expect(boolIndex).toBe(2)
    expect(nullIndex).toBe(3)
  })

  test('should get constant by index', () => {
    constantsPool.add(42)
    constantsPool.add('hello')
    
    expect(constantsPool.get(0)).toBe(42)
    expect(constantsPool.get(1)).toBe('hello')
  })

  test('should get all constants', () => {
    constantsPool.add(42)
    constantsPool.add('hello')
    constantsPool.add(true)
    
    const constants = constantsPool.getAll()
    expect(constants).toEqual([42, 'hello', true])
  })

  test('should return pool size', () => {
    expect(constantsPool.size()).toBe(0)
    
    constantsPool.add(42)
    expect(constantsPool.size()).toBe(1)
    
    constantsPool.add('hello')
    expect(constantsPool.size()).toBe(2)
  })
})