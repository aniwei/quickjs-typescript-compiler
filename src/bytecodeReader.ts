import { BytecodeTag, Opcode, OPCODE_NAME_TO_CODE } from './env'

export interface Pc2LineEntry {
  pc: number
  line: number
}

export interface FunctionBytecode {
  tag: BytecodeTag
  flags: number
  jsMode: number
  name: string
  argCount: number
  varCount: number
  definedArgCount: number
  stackSize: number
  closureVarCount: number
  cpoolCount: number
  bytecodeLen: number
  locals: any[]
  closureVars: any[]
  bytecode: number[]
  debugInfo?: {
    filename: string
    pc2line: Pc2LineEntry[]
    source: string
  }
  cpool: any[]
}

export function parseBytecodeModule(buffer: Uint8Array): any {
  let pos = 0
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength)

  function readU8() {
    return view.getUint8(pos++)
  }

  function readU16() {
    const v = view.getUint16(pos, true)
    pos += 2
    return v
  }

  function readU32() {
    const v = view.getUint32(pos, true)
    pos += 4
    return v
  }

  function readULEB128() {
    let v = 0
    let shift = 0
    while (true) {
      const b = readU8()
      v |= (b & 0x7f) << shift
      shift += 7
      if ((b & 0x80) === 0) break
    }
    return v
  }

  function readAtom() {
    const len = readULEB128()
    const strLen = len >> 1
    const strBytes = buffer.slice(pos, pos + strLen)
    pos += strLen
    return new TextDecoder().decode(strBytes)
  }

  const version = readU8()
  const atomCount = readULEB128()
  const atoms: string[] = []
  for (let i = 0; i < atomCount; i++) {
    atoms.push(readAtom())
  }

  const moduleTag = readU8() // TC_TAG_MODULE
  const moduleNameAtom = readU32() // Atom index
  
  // Skip dependencies, exports, etc.
  readULEB128() // dependencies
  readULEB128() // exports
  readULEB128() // star_exports
  readULEB128() // import_entries
  readU8() // has_tla

  const func = readFunction()

  return {
    version,
    atoms,
    moduleName: atoms[moduleNameAtom],
    func
  }

  function readFunction(): FunctionBytecode {
    const tag = readU8()
    if (tag !== BytecodeTag.TC_TAG_FUNCTION_BYTECODE) {
      throw new Error(`Expected function bytecode tag, got ${tag}`)
    }

    const flags = readU16()
    const jsMode = readU8()
    const nameAtom = readU32() // Atom index
    const argCount = readULEB128()
    const varCount = readULEB128()
    const definedArgCount = readULEB128()
    const stackSize = readULEB128()
    const closureVarCount = readULEB128()
    const cpoolCount = readULEB128()
    const bytecodeLen = readULEB128()
    const localCount = readULEB128()

    const locals: any[] = []
    for (let i = 0; i < localCount; i++) {
      const nameAtom = readU32()
      const scopeLevel = readULEB128()
      const scopeNext = readULEB128()
      const flags = readU8()
      locals.push({ name: atoms[nameAtom], scopeLevel, scopeNext, flags })
    }

    const closureVars: any[] = []
    for (let i = 0; i < closureVarCount; i++) {
      const nameAtom = readU32()
      const varIdx = readULEB128()
      const flags = readU8()
      closureVars.push({ name: atoms[nameAtom], varIdx, flags })
    }

    const bytecode = []
    for (let i = 0; i < bytecodeLen; i++) {
      bytecode.push(readU8())
    }

    let debugInfo
    if (flags & 0x0200) { // has_debug
      const filenameAtom = readU32()
      const pc2lineLen = readULEB128()
      const pc2lineBuf = []
      for (let i = 0; i < pc2lineLen; i++) {
        pc2lineBuf.push(readU8())
      }
      const sourceLen = readULEB128()
      const source = new TextDecoder().decode(buffer.slice(pos, pos + sourceLen))
      pos += sourceLen

      // Parse pc2line
      const pc2line: Pc2LineEntry[] = []
      let pc = 0
      let line = 1
      let p = 0
      while (p < pc2lineLen) {
        const b = pc2lineBuf[p++]
        if (b === 0) { // PC2LINE_BASE
          line += readSLEB128FromBuf(pc2lineBuf, p).val
          p = readSLEB128FromBuf(pc2lineBuf, p).newPos
        } else if (b >= 1 && b <= 5) { // PC2LINE_RANGE
          pc += b
          line += readSLEB128FromBuf(pc2lineBuf, p).val
          p = readSLEB128FromBuf(pc2lineBuf, p).newPos
        } else { // PC2LINE_DIFF
           // b is diff_pc + 6
           // diff_pc = b - 6
           // diff_line = next byte
           pc += (b - 6)
           let diffLine = pc2lineBuf[p++]
           // diffLine is SLEB128? No, it's just a byte in QuickJS implementation for small diffs?
           // Actually QuickJS pc2line compression:
           // tag=0: line_diff (SLEB128)
           // tag=1..5: pc_diff=tag, line_diff (SLEB128)
           // tag=6..127: pc_diff = (tag - 6), line_diff = next byte (int8)
           // tag=128..255: pc_diff = (tag - 128), line_diff = 0
           
           if (b >= 6 && b <= 127) {
             let ld = diffLine
             if (ld >= 128) ld -= 256
             line += ld
           } else {
             // 128..255
             pc += (b - 128)
           }
        }
        pc2line.push({ pc, line })
      }
      
      debugInfo = {
        filename: atoms[filenameAtom],
        pc2line,
        source
      }
    }

    // CPool
    const cpool = []
    for (let i = 0; i < cpoolCount; i++) {
       // Recursive read
       // But we need to know type.
       // QuickJS cpool items are tagged.
       const tag = readU8()
       if (tag === BytecodeTag.TC_TAG_FUNCTION_BYTECODE) {
         // Backtrack 1 byte
         pos--
         cpool.push(readFunction())
       } else if (tag === BytecodeTag.TC_TAG_FLOAT64) {
         const val = view.getFloat64(pos, true)
         pos += 8
         cpool.push(val)
       } else if (tag === BytecodeTag.TC_TAG_STRING) {
         const atom = readU32()
         cpool.push(atoms[atom])
       } else {
         cpool.push({ tag, unknown: true })
       }
    }

    return {
      tag,
      flags,
      jsMode,
      name: atoms[nameAtom],
      argCount,
      varCount,
      definedArgCount,
      stackSize,
      closureVarCount,
      cpoolCount,
      bytecodeLen,
      locals,
      closureVars,
      bytecode,
      debugInfo,
      cpool
    }
  }

  function readSLEB128FromBuf(buf: number[], p: number) {
    let v = 0
    let shift = 0
    while (true) {
      const b = buf[p++]
      v |= (b & 0x7f) << shift
      shift += 7
      if ((b & 0x80) === 0) {
        if (shift < 32 && (b & 0x40)) {
          v |= (~0 << shift)
        }
        break
      }
    }
    return { val: v, newPos: p }
  }
}
