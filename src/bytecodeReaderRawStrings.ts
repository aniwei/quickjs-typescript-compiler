import { BytecodeTag, FIRST_ATOM_ID, JS_FUNCTION_BYTECODE_FLAG_HAS_DEBUG } from './env'
import type {
  ClosureVar,
  FunctionBytecode,
  ParsedBytecodeModule,
  ParsedExportEntry,
  ParsedImportEntry,
  ParsedModuleBytecode,
  ParsedReqModuleEntry,
  ParsedStarExportEntry,
  VarDef,
} from './bytecodeReader'

export interface ParsedRawString {
  tag: BytecodeTag.TC_TAG_STRING
  isWideChar: boolean
  bytes: Uint8Array
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

  /**
   * QuickJS bytecode string encoding: ULEB128((len<<1)|wideFlag) + bytes.
   * Used for the atom table where we want decoded JS strings.
   */
  readString(): string {
    const lenTag = this.readULEB128()
    const isWideChar = (lenTag & 1) !== 0
    const charLen = lenTag >> 1

    if (isWideChar) {
      const chars: number[] = []
      for (let i = 0; i < charLen; i++) {
        chars.push(this.readU16LE())
      }
      return String.fromCharCode(...chars)
    }

    const bytes = this.readBytes(charLen)
    return new TextDecoder('utf-8').decode(bytes)
  }

  /**
   * Same encoding as readString(), but returns raw bytes instead of decoding.
   * For wide strings, bytes are little-endian UTF-16 code units.
   */
  readRawString(): ParsedRawString {
    const lenTag = this.readULEB128()
    const isWideChar = (lenTag & 1) !== 0
    const charLen = lenTag >> 1

    const byteLen = isWideChar ? charLen * 2 : charLen
    const bytes = this.readBytes(byteLen)

    return {
      tag: BytecodeTag.TC_TAG_STRING,
      isWideChar,
      bytes,
    }
  }
}

function decodeAtomName(atom: number, atoms: string[]): string | undefined {
  if (atom >= FIRST_ATOM_ID) {
    const idx = atom - FIRST_ATOM_ID
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
    throw new Error(
      `Unsupported tag: ${tag} (expected TC_TAG_FUNCTION_BYTECODE=${BytecodeTag.TC_TAG_FUNCTION_BYTECODE})`
    )
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
    closureVars.push({
      nameAtom,
      name: decodeAtomName(nameAtom, atoms),
      varIdx,
      flags,
    })
  }

  const bytecode = reader.readBytes(bytecodeLen)

  const hasDebug = (flags & JS_FUNCTION_BYTECODE_FLAG_HAS_DEBUG) !== 0
  let debug: FunctionBytecode['debug'] | undefined

  if (hasDebug) {
    const filenameAtom = readAtom(reader)
    const pc2lineLen = reader.readULEB128()
    const pc2line = reader.readBytes(pc2lineLen)

    const sourceLen = reader.readULEB128()
    const source = sourceLen === 0 ? undefined : reader.readBytes(sourceLen)

    debug = {
      filenameAtom,
      filename: decodeAtomName(filenameAtom, atoms),
      pc2line,
      source,
    }
  }

  const cpool: unknown[] = []
  for (let i = 0; i < cpoolCount; i++) {
    const readCpoolValue = (): unknown => {
      const ctag = reader.readU8()
      switch (ctag) {
        case BytecodeTag.TC_TAG_NULL:
          return null
        case BytecodeTag.TC_TAG_UNDEFINED:
          return undefined
        case BytecodeTag.TC_TAG_BOOL_FALSE:
          return false
        case BytecodeTag.TC_TAG_BOOL_TRUE:
          return true
        case BytecodeTag.TC_TAG_INT32:
          return (reader.readU32LE() | 0) as number
        case BytecodeTag.TC_TAG_FLOAT64:
          return reader.readF64LE()
        case BytecodeTag.TC_TAG_STRING:
          return reader.readRawString()
        case BytecodeTag.TC_TAG_BIG_INT: {
          const len = reader.readULEB128()
          if (len === 0) return 0n
          const bytes = reader.readBytes(len)
          // two's complement, little-endian
          let x = 0n
          for (let j = 0; j < bytes.length; j++) {
            x |= BigInt(bytes[j]) << (BigInt(j) * 8n)
          }

          const signBit = bytes[bytes.length - 1] & 0x80
          if (signBit !== 0) {
            const bits = BigInt(bytes.length) * 8n
            x -= 1n << bits
          }
          return x
        }
        case BytecodeTag.TC_TAG_TEMPLATE_OBJECT: {
          const len = reader.readULEB128()
          const elements: unknown[] = []
          for (let j = 0; j < len; j++) {
            elements.push(readCpoolValue())
          }
          const raw = readCpoolValue()
          return { tag: 'template_object', elements, raw }
        }
        case BytecodeTag.TC_TAG_FUNCTION_BYTECODE:
          reader.ptr -= 1
          return readFunctionBytecode(reader, atoms)
        default:
          return null
      }
    }

    cpool.push(readCpoolValue())
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

function readAnyObject(reader: Reader, atoms: string[]): unknown {
  const tag = reader.readU8()
  switch (tag) {
    case BytecodeTag.TC_TAG_NULL:
      return null
    case BytecodeTag.TC_TAG_UNDEFINED:
      return undefined
    case BytecodeTag.TC_TAG_BOOL_FALSE:
      return false
    case BytecodeTag.TC_TAG_BOOL_TRUE:
      return true
    case BytecodeTag.TC_TAG_INT32:
      return (reader.readU32LE() | 0) as number
    case BytecodeTag.TC_TAG_FLOAT64:
      return reader.readF64LE()
    case BytecodeTag.TC_TAG_STRING:
      return reader.readRawString()
    case BytecodeTag.TC_TAG_TEMPLATE_OBJECT: {
      const len = reader.readULEB128()
      const elements: unknown[] = []
      for (let i = 0; i < len; i++) elements.push(readAnyObject(reader, atoms))
      const raw = readAnyObject(reader, atoms)
      return { tag: 'template_object', elements, raw }
    }
    case BytecodeTag.TC_TAG_FUNCTION_BYTECODE:
      reader.ptr -= 1
      return readFunctionBytecode(reader, atoms)
    case BytecodeTag.TC_TAG_MODULE:
      reader.ptr -= 1
      return readModuleBytecode(reader, atoms)
    default:
      return null
  }
}

function readModuleBytecode(reader: Reader, atoms: string[]): ParsedModuleBytecode {
  const tag = reader.readU8()
  if (tag !== BytecodeTag.TC_TAG_MODULE) {
    throw new Error(`Unsupported tag: ${tag} (expected TC_TAG_MODULE=${BytecodeTag.TC_TAG_MODULE})`)
  }

  const moduleNameAtom = readAtom(reader)
  const reqCount = reader.readULEB128()
  const reqModuleEntries: ParsedReqModuleEntry[] = []
  for (let i = 0; i < reqCount; i++) {
    const mn = readAtom(reader)
    const attributes = readAnyObject(reader, atoms)
    reqModuleEntries.push({ moduleNameAtom: mn, moduleName: decodeAtomName(mn, atoms), attributes })
  }

  const exportCount = reader.readULEB128()
  const exportEntries: ParsedExportEntry[] = []
  for (let i = 0; i < exportCount; i++) {
    const exportType = reader.readU8()
    if (exportType === 0) {
      const localVarIdx = reader.readULEB128()
      const exportNameAtom = readAtom(reader)
      exportEntries.push({
        exportType,
        localVarIdx,
        exportNameAtom,
        exportName: decodeAtomName(exportNameAtom, atoms),
      })
      continue
    }

    if (exportType === 1) {
      const reqModuleIdx = reader.readULEB128()
      const localNameAtom = readAtom(reader)
      const exportNameAtom = readAtom(reader)
      exportEntries.push({
        exportType,
        reqModuleIdx,
        localNameAtom,
        localName: decodeAtomName(localNameAtom, atoms),
        exportNameAtom,
        exportName: decodeAtomName(exportNameAtom, atoms),
      })
      continue
    }

    if (exportType === 2) {
      const reqModuleIdx = reader.readULEB128()
      const exportNameAtom = readAtom(reader)
      exportEntries.push({
        exportType,
        reqModuleIdx,
        exportNameAtom,
        exportName: decodeAtomName(exportNameAtom, atoms),
      })
      continue
    }

    // fallback: keep parsing stable for unknown export types
    const exportNameAtom = readAtom(reader)
    exportEntries.push({
      exportType,
      exportNameAtom,
      exportName: decodeAtomName(exportNameAtom, atoms),
    })
  }

  const starExportCount = reader.readULEB128()
  const starExportEntries: ParsedStarExportEntry[] = []
  for (let i = 0; i < starExportCount; i++) {
    const reqModuleIdx = reader.readULEB128()
    starExportEntries.push({ reqModuleIdx })
  }

  const importCount = reader.readULEB128()
  const importEntries: ParsedImportEntry[] = []
  for (let i = 0; i < importCount; i++) {
    const varIdx = reader.readULEB128()
    const isStar = reader.readU8() !== 0
    const importNameAtom = readAtom(reader)
    const reqModuleIdx = reader.readULEB128()
    importEntries.push({
      varIdx,
      isStar,
      importNameAtom,
      importName: decodeAtomName(importNameAtom, atoms),
      reqModuleIdx,
    })
  }

  const hasTla = reader.readU8() !== 0
  const funcObj = readAnyObject(reader, atoms) as FunctionBytecode
  if (!funcObj || (funcObj as any).tag !== BytecodeTag.TC_TAG_FUNCTION_BYTECODE) {
    throw new Error('Invalid module func_obj: expected function bytecode')
  }

  return {
    tag: BytecodeTag.TC_TAG_MODULE,
    moduleNameAtom,
    moduleName: decodeAtomName(moduleNameAtom, atoms),
    reqModuleEntries,
    exportEntries,
    starExportEntries,
    importEntries,
    hasTla,
    funcObj,
  }
}

export function parseBytecodeModuleRawStrings(
  input: Uint8Array | ArrayBuffer | Buffer
): ParsedBytecodeModule {
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

  // Root object can be function or module.
  const tag = reader.readU8()
  reader.ptr -= 1
  if (tag === BytecodeTag.TC_TAG_MODULE) {
    const module = readModuleBytecode(reader, atoms)
    return { version, atoms, func: module.funcObj, module }
  }

  const func = readFunctionBytecode(reader, atoms)
  return { version, atoms, func }
}

