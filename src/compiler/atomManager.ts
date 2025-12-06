import { env, ATOM_STRINGS } from '../env'

export class AtomManager {
  atomMap: Map<string, number>
  reverseMap: Map<number, string>
  nextAtomId: number
  firstAtomId: number

  constructor(firstAtomId: number = env.firstAtomId) {
    this.atomMap = new Map()
    this.reverseMap = new Map()
    this.firstAtomId = firstAtomId
    this.nextAtomId = firstAtomId
    
    // Initialize with built-in atoms
    for (const [id, str] of Object.entries(ATOM_STRINGS)) {
      const atomId = Number(id)
      this.atomMap.set(str, atomId)
      this.reverseMap.set(atomId, str)
    }
  }

  getAtom(str: string): number {
    if (this.atomMap.has(str)) {
      return this.atomMap.get(str)!
    }
    const id = this.nextAtomId++
    this.atomMap.set(str, id)
    this.reverseMap.set(id, str)
    // console.log(`AtomManager: Added ${str} -> ${id}`)
    return id
  }

  getString(id: number): string | undefined {
    const str = this.reverseMap.get(id)
    // console.log(`AtomManager: getString(${id}) -> ${str}`)
    return str
  }
}
