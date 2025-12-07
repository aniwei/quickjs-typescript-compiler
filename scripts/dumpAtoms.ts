import fs from 'fs/promises'

class BytecodeReader {
  ptr: number = 0
  constructor(public buf: Uint8Array) {}

  readByte(): number {
    return this.buf[this.ptr++]
  }

  readULEB128(): number {
    let val = 0
    let shift = 0
    while (true) {
      const b = this.readByte()
      val |= (b & 0x7f) << shift
      if ((b & 0x80) === 0) break
      shift += 7
    }
    return val
  }

  readString(len: number): string {
    let s = ''
    for (let i = 0; i < len; i++) {
      s += String.fromCharCode(this.readByte())
    }
    return s
  }
}

async function main() {
  const file = process.argv[2]
  if (!file) {
    console.error('Usage: tsx scripts/dumpAtoms.ts <file.qbc>')
    process.exit(1)
  }

  const buffer = await fs.readFile(file)
  const reader = new BytecodeReader(buffer)

  // Header
  const version = reader.readByte()
  console.log(`Version: ${version}`)

  // Atoms
  const atomCount = reader.readULEB128()
  console.log(`Atom Count: ${atomCount}`)

  for (let i = 0; i < atomCount; i++) {
    const len = reader.readULEB128()
    const s = reader.readString(len >> 1)
    console.log(`${i}: "${s}"`)
  }
}

main().catch(console.error)
