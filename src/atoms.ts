import { BufferWriter } from './utils'

const ATOM_KIND_STRING = 1

export class AtomTable {
  private list: string[] = []           // id 从 1 开始
  private map = new Map<string, number>()

  add(str: string): number {
    let id = this.map.get(str)
    
    if (id) {
      return id
    }

    id = this.list.length + 1
    this.list.push(str)
    this.map.set(str, id)
    return id
  }

  get count(): number { 
    return this.list.length
  }
  getAll(): string[] { 
    return this.list.slice()
  }

  writeTo(w: BufferWriter) {
    w.u32(this.count)
    for (const s of this.list) {
      const b = Buffer.from(s, 'utf8')
      w.u8(ATOM_KIND_STRING)
      w.u32(b.length)
      w.raw(b)
    }
  }
}