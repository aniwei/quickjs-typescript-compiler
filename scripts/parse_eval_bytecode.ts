import fs from 'fs'

class BytecodeParser {
  private pos = 0
  
  constructor(private data: Uint8Array) {}

  readU8(): number {
    return this.data[this.pos++]
  }

  readU16(): number {
    const lo = this.data[this.pos++]
    const hi = this.data[this.pos++]
    return lo | (hi << 8)
  }

  readU32(): number {
    const a = this.data[this.pos++]
    const b = this.data[this.pos++]
    const c = this.data[this.pos++]
    const d = this.data[this.pos++]
    return a | (b << 8) | (c << 16) | (d << 24)
  }

  readULEB(): number {
    let result = 0, shift = 0
    while (true) {
      const byte = this.data[this.pos++]
      result |= (byte & 0x7f) << shift
      if ((byte & 0x80) === 0) break
      shift += 7
    }
    return result
  }

  skip(n: number) {
    this.pos += n
  }

  readString(len: number): string {
    const bytes = this.data.slice(this.pos, this.pos + len)
    this.pos += len
    return Buffer.from(bytes).toString('utf8')
  }

  getPos(): number {
    return this.pos
  }

  parse() {
    console.log("=== Parsing Bytecode ===")
    
    // 1. Version
    const version = this.readU8()
    console.log(`Version: ${version}`)
    
    // 2. Atom table
    const atomCount = this.readULEB()
    console.log(`Atom count: ${atomCount}`)
    const atoms: string[] = []
    for (let i = 0; i < atomCount; i++) {
      const sizeInfo = this.readULEB()
      const byteLength = sizeInfo >> 1
      const isWide = (sizeInfo & 1) === 1
      const atomBytes = isWide ? byteLength * 2 : byteLength
      const str = this.readString(atomBytes)
      atoms.push(str)
      console.log(`  Atom ${i}: "${str}"`)
    }

    // 3. Tag (should be 12 = TC_TAG_FUNCTION_BYTECODE for eval)
    const tag = this.readU8()
    console.log(`\nTag: ${tag} (${tag === 12 ? 'TC_TAG_FUNCTION_BYTECODE' : tag === 13 ? 'TC_TAG_MODULE' : 'unknown'})`)
    
    if (tag !== 12) {
      console.log("Expected function bytecode tag")
      return
    }

    // 4. Function header
    const flags = this.readU16()
    const jsMode = this.readU8()
    const funcNameAtom = this.readULEB()
    
    console.log(`Flags: 0x${flags.toString(16).padStart(4, '0')}`)
    console.log(`JS Mode: ${jsMode}`)
    console.log(`Func Name Atom: ${funcNameAtom}`)

    const hasDebug = (flags & (1 << 10)) !== 0
    console.log(`Has Debug: ${hasDebug}`)

    const argCount = this.readULEB()
    const varCount = this.readULEB()
    const definedArgCount = this.readULEB()
    const stackSize = this.readULEB()
    const closureVarCount = this.readULEB()
    const cpoolCount = this.readULEB()
    const bytecodeLen = this.readULEB()

    console.log(`\nFunction Info:`)
    console.log(`  argCount: ${argCount}`)
    console.log(`  varCount: ${varCount}`)
    console.log(`  definedArgCount: ${definedArgCount}`)
    console.log(`  stackSize: ${stackSize}`)
    console.log(`  closureVarCount: ${closureVarCount}`)
    console.log(`  cpoolCount: ${cpoolCount}`)
    console.log(`  bytecodeLen: ${bytecodeLen}`)

    // Var defs
    const varDefCount = this.readULEB()
    console.log(`  varDefCount: ${varDefCount}`)
    for (let i = 0; i < varDefCount; i++) {
      const name = this.readULEB()
      const scopeLevel = this.readULEB()
      const scopeNext = this.readULEB()
      const vdFlags = this.readU8()
      console.log(`    var ${i}: atom=${name}("${atoms[name] || '?'}"), scopeLevel=${scopeLevel}, scopeNext=${scopeNext}, flags=0x${vdFlags.toString(16)}`)
    }

    // Closure vars
    for (let i = 0; i < closureVarCount; i++) {
      const name = this.readULEB()
      const varIdx = this.readULEB()
      const cvFlags = this.readU8()
      console.log(`  closure var ${i}: atom=${name}, varIdx=${varIdx}, flags=0x${cvFlags.toString(16)}`)
    }

    // Bytecode
    console.log(`\nBytecode at offset 0x${this.getPos().toString(16)}, length ${bytecodeLen}:`)
    const bytecodeStart = this.getPos()
    const bytecodeBytes: string[] = []
    for (let i = 0; i < bytecodeLen; i++) {
      bytecodeBytes.push(this.data[this.getPos() + i].toString(16).padStart(2, '0'))
    }
    console.log(`  ${bytecodeBytes.join(' ')}`)
    this.skip(bytecodeLen)

    // Debug info
    if (hasDebug) {
      const filenameAtom = this.readULEB()
      const pc2lineLen = this.readULEB()
      console.log(`\nDebug Info:`)
      console.log(`  filename atom: ${filenameAtom} ("${atoms[filenameAtom] || '?'}")`)
      console.log(`  pc2line length: ${pc2lineLen}`)
      
      const pc2lineBytes: string[] = []
      for (let i = 0; i < pc2lineLen; i++) {
        pc2lineBytes.push(this.data[this.getPos() + i].toString(16).padStart(2, '0'))
      }
      console.log(`  pc2line bytes: ${pc2lineBytes.join(' ')}`)
      this.skip(pc2lineLen)

      const sourceLen = this.readULEB()
      console.log(`  source length: ${sourceLen}`)
    }

    console.log(`\nParsing complete at offset 0x${this.getPos().toString(16)}`)
  }
}

const file = process.argv[2]
if (!file) {
  console.log("Usage: parse_eval_bytecode.ts <file.qbc>")
  process.exit(1)
}

const data = new Uint8Array(fs.readFileSync(file))
const parser = new BytecodeParser(data)
parser.parse()
