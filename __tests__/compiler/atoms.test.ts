import { AtomTable, JSAtom } from '../src/atoms'
import { env } from '../src/env'

describe('AtomTable', () => {
  let atomTable: AtomTable

  beforeEach(() => {
    atomTable = new AtomTable()
  })

  test('should create atom table with predefined atoms', () => {
    expect(atomTable.getAtomId('length')).toBe(JSAtom.JS_ATOM_length)
    expect(atomTable.getAtomId('constructor')).toBe(JSAtom.JS_ATOM_constructor)
    expect(atomTable.getAtomId('prototype')).toBe(JSAtom.JS_ATOM_prototype)
  })

  test('should add new atom and return unique id', () => {
    const atomId1 = atomTable.getAtomId('customAtom')
    const atomId2 = atomTable.getAtomId('anotherAtom')

    expect(atomId1).toBeGreaterThanOrEqual(env.firstAtomId)
    expect(atomId2).toBeGreaterThan(atomId1)
    expect(atomId1).not.toBe(atomId2)
  })

  test('should return same id for duplicate atom', () => {
    const atomId1 = atomTable.getAtomId('test')
    const atomId2 = atomTable.getAtomId('test')
    
    expect(atomId1).toBe(atomId2)
  })

  test('should handle empty string atom', () => {
    const atomId = atomTable.getAtomId('')
    expect(atomId).toBeGreaterThan(0)
  })

  test('should handle unicode atom names', () => {
    const atomId1 = atomTable.getAtomId('测试')
    const atomId2 = atomTable.getAtomId('πάντα')
    
    expect(atomId1).toBeGreaterThan(0)
    expect(atomId2).toBeGreaterThan(0)
    expect(atomId1).not.toBe(atomId2)
  })

  test('should get atom string by id', () => {
    const testString = 'testAtom'
    const atomId = atomTable.getAtomId(testString)
    expect(atomTable.getAtomString(atomId)).toBe(testString)
  })

  test('should identify predefined atoms correctly', () => {
    expect(atomTable.isPredefinedAtom('length')).toBe(true)
    expect(atomTable.isPredefinedAtom('constructor')).toBe(true)
    expect(atomTable.isPredefinedAtom('customAtom')).toBe(false)
    
    atomTable.getAtomId('customAtom')
    expect(atomTable.isPredefinedAtom('customAtom')).toBe(false)
  })

  test('should return all atoms map', () => {
    atomTable.getAtomId('test1')
    atomTable.getAtomId('test2')
    
    const allAtoms = atomTable.getAllAtoms()
    expect(allAtoms).toBeInstanceOf(Map)
    expect(allAtoms.has('test1')).toBe(true)
    expect(allAtoms.has('test2')).toBe(true)
    expect(allAtoms.has('length')).toBe(true) // predefined
  })
})