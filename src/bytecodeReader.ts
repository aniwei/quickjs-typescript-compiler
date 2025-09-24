import { LEB128 } from './leb128'

class ByteReader {
  constructor(private buf: Uint8Array, public offset = 0) {}
  u8(): number { return this.buf[this.offset++] ?? 0 }
  u16(): number { const a=this.u8(), b=this.u8(); return a | (b<<8) }
  leb(): number { const { value, length } = LEB128.decode(this.buf, this.offset); this.offset += length; return value }
  bytes(len: number): Uint8Array { const out = this.buf.slice(this.offset, this.offset + len); this.offset += len; return out }
  str(): string {
    const lenWithFlag = this.leb()
    const len = lenWithFlag >> 1
    const isWide = (lenWithFlag & 1) !== 0
    if (isWide) {
      const bytes = new Uint8Array(len * 2)
      for (let i = 0; i < len * 2; i++) bytes[i] = this.u8()
      // naive UTF-16LE decode
      let s = ''
      for (let i = 0; i < bytes.length; i += 2) s += String.fromCharCode(bytes[i] | (bytes[i+1] << 8))
      return s
    } else {
      const bytes = this.bytes(len)
      return new TextDecoder().decode(bytes)
    }
  }
}

export interface BCModule {
  version: number
  atoms: string[]
  rest: Uint8Array
}

export function readContainer(input: Uint8Array): BCModule {
  const r = new ByteReader(input)
  const version = r.u8()
  const atomCount = r.leb()
  const atoms: string[] = []
  for (let i = 0; i < atomCount; i++) atoms.push(r.str())
  const rest = input.slice(r.offset)
  return { version, atoms, rest }
}
