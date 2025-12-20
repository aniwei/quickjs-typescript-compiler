import { BytecodeTag, firstAtomId } from './env'

export interface ParsedBytecodeModule {
  version: number
  atoms: string[]
  func: FunctionBytecode
}

export interface FunctionDebugInfo {
  filenameAtom: number
  filename?: string
  pc2line: Uint8Array
  source?: Uint8Array
}

export interface VarDef {
  nameAtom: number
  name?: string
  scopeLevel: number
  scopeNextPlus1: number
  flags: number
}

export interface ClosureVar {
  nameAtom: number
  name?: string
  varIdx: number
  flags: number
}

export interface FunctionBytecode {
  tag: BytecodeTag.TC_TAG_FUNCTION_BYTECODE
  flags: number
  jsMode: number
  funcNameAtom: number
  funcName?: string
  argCount: number
  varCount: number
  definedArgCount: number
  stackSize: number
  closureVarCount: number
  cpoolCount: number
  bytecodeLen: number
  bytecode: Uint8Array
  varDefs: VarDef[]
  closureVars: ClosureVar[]
  hasDebug: boolean
  debug?: FunctionDebugInfo
  cpool?: Array<unknown>
}

class Reader {
  ptr = 0

  constructor(private readonly buf: Uint8Array) {}

  readU8(): number {
    return this.buf[this.ptr++]
  }

  readU16LE(): number {
    const v = this.buf[this.ptr] | (this.buf[this.ptr + 1] << 8)
    this.ptr += 2
    return v
  }

  readU32LE(): number {
    const v =
      (this.buf[this.ptr] |
        (this.buf[this.ptr + 1] << 8) |
        (this.buf[this.ptr + 2] << 16) |
        (this.buf[this.ptr + 3] << 24)) >>>
      0
    this.ptr += 4
    return v
  }

  readF64LE(): number {
    const view = new DataView(this.buf.buffer, this.buf.byteOffset + this.ptr, 8)
    const v = view.getFloat64(0, true)
    this.ptr += 8
    return v
  }

  readBytes(len: number): Uint8Array {
    const out = this.buf.subarray(this.ptr, this.ptr + len)
    this.ptr += len
    return out
  }

  readULEB128(): number {
    let val = 0
    let shift = 0
    while (true) {
      const b = this.readU8()
      val |= (b & 0x7f) << shift
      if ((b & 0x80) === 0) break
      shift += 7
    }
    return val >>> 0
  }

  readString(): string {
    const lenTag = this.readULEB128()
    const isWideChar = (lenTag & 1) !== 0
    const byteLen = lenTag >> 1

    if (isWideChar) {
      const chars: number[] = []
      for (let i = 0; i < byteLen; i++) {
        const u16 = this.readU16LE()
        chars.push(u16)
      }
      return String.fromCharCode(...chars)
    }

    const bytes = this.readBytes(byteLen)
    return new TextDecoder('utf-8').decode(bytes)
  }
}

const HAS_DEBUG_MASK = 1 << 10

function decodeAtomName(atom: number, atoms: string[]): string | undefined {
  if (atom >= firstAtomId) {
    const idx = atom - firstAtomId
    return atoms[idx]
  }
  return undefined
}

function readAtom(reader: Reader): number {
  const v = reader.readULEB128() >>> 0
  return (v >>> 1) >>> 0
}

function readFunctionBytecode(reader: Reader, atoms: string[]): FunctionBytecode {
  const tag = reader.readU8()
  if (tag !== BytecodeTag.TC_TAG_FUNCTION_BYTECODE) {
    throw new Error(`Unsupported tag: ${tag} (expected TC_TAG_FUNCTION_BYTECODE=12)`)
  }

  const flags = reader.readU16LE()
  const jsMode = reader.readU8()
  const funcNameAtom = readAtom(reader)

  const argCount = reader.readULEB128()
  const varCount = reader.readULEB128()
  const definedArgCount = reader.readULEB128()
  const stackSize = reader.readULEB128()
  const closureVarCount = reader.readULEB128()
  const cpoolCount = reader.readULEB128()
  const bytecodeLen = reader.readULEB128()

  const varDefs: VarDef[] = []
  const vardefCount = reader.readULEB128()
  for (let i = 0; i < vardefCount; i++) {
    const nameAtom = readAtom(reader)
    const scopeLevel = reader.readULEB128()
    const scopeNextPlus1 = reader.readULEB128()
    const flags = reader.readU8()
    varDefs.push({
      nameAtom,
      name: decodeAtomName(nameAtom, atoms),
      scopeLevel,
      scopeNextPlus1,
      flags,
    })
  }

  const closureVars: ClosureVar[] = []
  for (let i = 0; i < closureVarCount; i++) {
    const nameAtom = readAtom(reader)
    const varIdx = reader.readULEB128()
    const flags = reader.readU8()
    closureVars.push({ nameAtom, name: decodeAtomName(nameAtom, atoms), varIdx, flags })
  }

  const bytecode = reader.readBytes(bytecodeLen)

  const hasDebug = (flags & HAS_DEBUG_MASK) !== 0
  let debug: FunctionDebugInfo | undefined
  if (hasDebug) {
    const filenameAtom = readAtom(reader)
    const pc2lineLen = reader.readULEB128()
    const pc2line = reader.readBytes(pc2lineLen)
    const sourceLen = reader.readULEB128()
    const source = sourceLen > 0 ? reader.readBytes(sourceLen) : undefined

    debug = {
      filenameAtom,
      filename: decodeAtomName(filenameAtom, atoms),
      pc2line,
      source,
    }
  }

  const cpool: unknown[] = []
  for (let i = 0; i < cpoolCount; i++) {
    const ctag = reader.readU8()
    switch (ctag) {
      case BytecodeTag.TC_TAG_NULL:
        cpool.push(null)
        break
      case BytecodeTag.TC_TAG_UNDEFINED:
        cpool.push(undefined)
        break
      case BytecodeTag.TC_TAG_BOOL_FALSE:
        cpool.push(false)
        break
      case BytecodeTag.TC_TAG_BOOL_TRUE:
        cpool.push(true)
        break
      case BytecodeTag.TC_TAG_INT32:
        cpool.push((reader.readU32LE() | 0) as number)
        break
      case BytecodeTag.TC_TAG_FLOAT64:
        cpool.push(reader.readF64LE())
        break
      case BytecodeTag.TC_TAG_STRING:
        cpool.push(reader.readString())
        break
      case BytecodeTag.TC_TAG_FUNCTION_BYTECODE:
        reader.ptr -= 1
        cpool.push(readFunctionBytecode(reader, atoms))
        break
      default:
        cpool.push(null)
        break
    }
  }

  return {
    tag: BytecodeTag.TC_TAG_FUNCTION_BYTECODE,
    flags,
    jsMode,
    funcNameAtom,
    funcName: decodeAtomName(funcNameAtom, atoms),
    argCount,
    varCount,
    definedArgCount,
    stackSize,
    closureVarCount,
    cpoolCount,
    bytecodeLen,
    bytecode,
    varDefs,
    closureVars,
    hasDebug,
    debug,
    cpool,
  }
}

export function parseBytecodeModule(input: Uint8Array | ArrayBuffer | Buffer): ParsedBytecodeModule {
  const buf =
    input instanceof Uint8Array
      ? input
      : input instanceof ArrayBuffer
        ? new Uint8Array(input)
        : new Uint8Array(input)

  const reader = new Reader(buf)
  const version = reader.readU8()

  const atomCount = reader.readULEB128()
  const atoms: string[] = []
  for (let i = 0; i < atomCount; i++) {
    atoms.push(reader.readString())
  }

  const func = readFunctionBytecode(reader, atoms)
  return { version, atoms, func }
}
