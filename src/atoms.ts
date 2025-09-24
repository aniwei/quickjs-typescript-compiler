import { ATOM_STRINGS, JSAtom as GeneratedJSAtom, env } from './env'

export type Atom = number

const JSAtomCompat: Record<string, number> = {}
for (const [key, value] of Object.entries(GeneratedJSAtom)) {
  if (typeof value === 'number') {
    JSAtomCompat[key] = value
    if (key.startsWith('JSAtom')) {
      const legacyKey = key.replace(/^JSAtom/, 'JS_ATOM')
      JSAtomCompat[legacyKey] = value
    }
  }
}

export const JSAtom = JSAtomCompat as Record<string, number>

export class AtomTable {
  private readonly stringToAtom = new Map<string, Atom>()
  private readonly atomToString = new Map<Atom, string>()
  private nextAtomId: number
  private readonly firstCustomAtomId: number

  constructor(firstCustomAtomId: number = env.firstAtomId) {
    this.firstCustomAtomId = firstCustomAtomId
    this.nextAtomId = firstCustomAtomId
    for (const [idStr, key] of Object.entries(ATOM_STRINGS)) {
      const id = Number(idStr)
      this.registerPredefinedAtom(id, key)
    }
    this.nextAtomId = Math.max(this.nextAtomId, this.maxAtomId() + 1)
  }

  private registerPredefinedAtom(id: Atom, key: string) {
    if (!this.stringToAtom.has(key)) {
      this.stringToAtom.set(key, id)
    }
    if (!this.atomToString.has(id)) {
      this.atomToString.set(id, key)
    }
  }

  private maxAtomId(): number {
    let max = -1
    for (const id of this.atomToString.keys()) {
      if (id > max) max = id
    }
    return max
  }

  getAtomId(key: string): Atom {
    const existing = this.stringToAtom.get(key)
    if (existing !== undefined) {
      return existing
    }
    const id = this.nextAtomId++
    this.stringToAtom.set(key, id)
    this.atomToString.set(id, key)
    return id
  }

  getAtomString(atom: Atom): string | undefined {
    return this.atomToString.get(atom)
  }

  isPredefinedAtom(key: string): boolean {
    const atom = this.stringToAtom.get(key)
    return atom !== undefined && atom < this.firstCustomAtomId
  }

  entries(): Iterable<[Atom, string]> {
    return this.atomToString.entries()
  }

  getAllAtoms(): Map<string, Atom> {
    return new Map(this.stringToAtom)
  }
}
