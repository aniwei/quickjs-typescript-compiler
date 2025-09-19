// Minimal QuickJS bytecode container parser focused on extracting the first function bytecode
import { readUlebFrom, readSlebFrom } from './leb128'
import { FIRST_ATOM } from './env'

export interface ParsedQuickJSFunction {
  version: number
  atoms: string[]
  flags: number
  jsMode: number
  funcName: string
  argCount: number
  varCount: number
  definedArgCount: number
  stackSize: number
  closureVarCount: number
  cpoolCount: number
  byteCodeLen: number
  bytecode?: Uint8Array
  hasDebug: boolean
  constants: any[]
  closureVars?: { name: string; varIdx: number; flags: number }[]
  debugFilename?: string
  pc2line?: Uint8Array
}

interface ClosureVar {
  name: string
  varIdx: number
  flags: number
}

type ConstValue = number | string | boolean | null | undefined

// FIRST_ATOM is generated at build time in src/env.ts

export function parseQuickJS(buf: Buffer): ParsedQuickJSFunction {
  // QuickJS bytecode container layout:
  // [BC_VERSION u8][atom_count uleb][atoms: (len<<1)|is_wide, bytes...] [object stream...]
  // We read atoms, then parse the first object. If it's a Module, we dive to its func_obj; otherwise,
  // we return the first encountered FunctionBytecode object.

  const offRef0 = { off: 0 }
  const version = buf[offRef0.off++]
  const readUleb0 = () => readUlebFrom(buf, offRef0)
  const atomCount = readUleb0()
  const atoms: string[] = []
  for (let i = 0; i < atomCount; i++) {
    const encLen = readUleb0()
    const isWide = (encLen & 1) !== 0
    const len = encLen >>> 1

    if (isWide) {
      const byteLen = len * 2
      const s = buf.toString('utf16le', offRef0.off, offRef0.off + byteLen)
      offRef0.off += byteLen
      atoms.push(s)
    } else {
      const s = buf.slice(offRef0.off, offRef0.off + len).toString('utf8')
      offRef0.off += len
      atoms.push(s)
    }
  }

  const firstAtom = FIRST_ATOM >>> 0
  const res = readObjectStream(buf, offRef0, atoms, version, firstAtom)
  if (!res) throw new Error('No FunctionBytecode found in object stream')
  return res
}

function parseFunctionFrom(
  buf: Buffer,
  offRef: { off: number },
  atoms: string[],
  version: number,
  firstAtom?: number
): ParsedQuickJSFunction {
  const readUleb = () => readUlebFrom(buf, offRef)
  const readSleb = () => readSlebFrom(buf, offRef)

  const tag = buf[offRef.off++]
  if (tag !== 0x13 && tag !== 0x0c) throw new Error('Not a function bytecode tag: ' + tag)

  const flags = buf[offRef.off] | (buf[offRef.off + 1] << 8); offRef.off += 2
  const jsMode = buf[offRef.off++]

  function readAtomRef(): string {
    const v = readUleb()
    if (v & 1) {
      // tagged int
      return String(v >> 1)
    }
    let idx = v >> 1
    // map through firstAtom if provided (QuickJS format)
    if (firstAtom && idx >= firstAtom) idx -= firstAtom
    // 兼容我们早期的 SIM 偏移（已废弃，保留以提升健壮性）
    const SIM = 1 << 24
    if (idx >= SIM) idx -= SIM
    if (idx === 0) return undefined as any // JS_ATOM_NULL
    return atoms[idx]
  }

  const funcName = readAtomRef()
  const argCount = readUleb()
  const varCount = readUleb()
  const definedArgCount = readUleb()
  const stackSize = readUleb()
  const closureVarCount = readUleb()
  const cpoolCount = readUleb()
  const byteCodeLen = readUleb()
  const vardefsCount = readUleb()

  // vardefs
  for (let i = 0; i < vardefsCount; i++) {
    ;(function skipAtom(){ readUleb() })() // atom ref (skip)
    readUleb() // scope_level
    readUleb() // scope_next+1
    offRef.off += 1 // flags
  }

  // closure vars
  const closureVars: ClosureVar[] = []
  for (let i = 0; i < closureVarCount; i++) {
    const name = readAtomRef()
    const varIdx = readUleb()
    const f = buf[offRef.off++]
    closureVars.push({ name, varIdx, flags: f })
  }

  // bytecode blob
  if (byteCodeLen <= 0 || offRef.off + byteCodeLen > buf.length) {
    throw new Error('Invalid byteCodeLen')
  }
  const bytecode = buf.slice(offRef.off, offRef.off + byteCodeLen)
  offRef.off += byteCodeLen

  // debug block
  const hasDebug = (flags & (1 << 10)) !== 0
  let debugFilename: string | undefined
  let pc2line: Uint8Array | undefined
  if (hasDebug) {
    debugFilename = readAtomRef()
    const pc2len = readUleb()
    
    if (pc2len < 0 || offRef.off + pc2len > buf.length) {
      throw new Error('Invalid pc2line length')
    }

    pc2line = buf.slice(offRef.off, offRef.off + pc2len)
    offRef.off += pc2len

    const sourceLen = readUleb()
    if (sourceLen < 0 || offRef.off + sourceLen > buf.length) {
      throw new Error('Invalid source length')
    }
    
      offRef.off += sourceLen
  }

  // const pool: in QuickJS, constants are generic objects serialized by the same writer.
  const constants: ConstValue[] = []
  for (let i = 0; i < cpoolCount; i++) {
    // We don't need actual values for disasm; just skip them properly.
    skipObjectRec(buf, offRef)
    constants.push(undefined)
  }

  return {
    version,
    atoms,
    flags,
    jsMode,
    funcName,
    argCount,
    varCount,
    definedArgCount,
    stackSize,
    closureVarCount,
    cpoolCount,
    byteCodeLen,
    bytecode,
    hasDebug,
    constants,
    closureVars,
    debugFilename,
    pc2line,
  }
}

// ---- Minimal outer object reader (subset) ----

const enum BCTag {
  NULL = 1,
  UNDEFINED = 2,
  BOOL_FALSE = 3,
  BOOL_TRUE = 4,
  INT32 = 5,
  FLOAT64 = 6,
  STRING = 7,
  OBJECT = 8,
  ARRAY = 9,
  BIG_INT = 10,
  TEMPLATE_OBJECT = 11,
  FUNCTION_BYTECODE = 12, // 0x0C
  MODULE = 13,
  TYPED_ARRAY = 14,
  ARRAY_BUFFER = 15,
  SHARED_ARRAY_BUFFER = 16,
  DATE = 17,
  OBJECT_VALUE = 18,
  OBJECT_REFERENCE = 19,
}

function readObjectStream(
  buf: Buffer,
  offRef: { off: number },
  atoms: string[],
  version: number,
  firstAtom: number
): ParsedQuickJSFunction | null {
  // Read the next tag and dispatch; return the first function encountered.
  if (offRef.off >= buf.length) return null
  const tag = buf[offRef.off++]
  if (tag === BCTag.FUNCTION_BYTECODE || tag === 0x13 /* legacy tag in our early code */) {
    // rewind by 1 to let parseFunctionFrom consume the tag
    offRef.off -= 1
    return parseFunctionFrom(buf, offRef, atoms, version, firstAtom)
  }
  switch (tag) {
    case BCTag.NULL:
    case BCTag.UNDEFINED:
    case BCTag.BOOL_FALSE:
    case BCTag.BOOL_TRUE:
      return null
    case BCTag.INT32:
      readSlebFrom(buf, offRef) // value
      return null
    case BCTag.FLOAT64:
      offRef.off += 8
      return null
    case BCTag.STRING: {
      // JS_WriteString encoding
      const enc = readUlebFrom(buf, offRef)
      const isWide = (enc & 1) !== 0
      const len = enc >>> 1
      offRef.off += isWide ? len * 2 : len
      return null
    }
    case BCTag.OBJECT: {
      const propCount = readUlebFrom(buf, offRef)
      for (let i = 0; i < propCount; i++) {
        // atom key
        readAtomRefRaw(buf, offRef, firstAtom)
        // value
        const r = readObjectStream(buf, offRef, atoms, version, firstAtom)
        if (r) return r
      }
      return null
    }
    case BCTag.ARRAY:
    case BCTag.TEMPLATE_OBJECT: {
      const len = readUlebFrom(buf, offRef)
      for (let i = 0; i < len; i++) {
        const r = readObjectStream(buf, offRef, atoms, version, firstAtom)
        if (r) return r
      }
      if (tag === BCTag.TEMPLATE_OBJECT) {
        // additional "raw" property
        const r = readObjectStream(buf, offRef, atoms, version, firstAtom)
        if (r) return r
      }
      return null
    }
    case BCTag.MODULE: {
      // module_name atom
      readAtomRefRaw(buf, offRef, firstAtom)
      // req_module_entries
      const reqCount = readUlebFrom(buf, offRef)
      for (let i = 0; i < reqCount; i++) {
        readAtomRefRaw(buf, offRef, firstAtom)
        const r = readObjectStream(buf, offRef, atoms, version, firstAtom) // attributes
        if (r) return r
      }
      // export_entries
      const exportCount = readUlebFrom(buf, offRef)
      for (let i = 0; i < exportCount; i++) {
        const exportType = buf[offRef.off++] // u8
        if (exportType === 0 /* LOCAL */) {
          // var_idx
          readUlebFrom(buf, offRef)
        } else if (exportType === 1 /* INDIRECT */) {
          // req_module_idx + local_name atom
          readUlebFrom(buf, offRef)
          readAtomRefRaw(buf, offRef, firstAtom)
        } else if (exportType === 2 /* STAR (rare here; usually separate) */) {
          // Some QuickJS versions keep STAR exports in separate list; be permissive.
          readUlebFrom(buf, offRef)
        } else {
          // Unknown type: best-effort skip a uleb and optionally an atom if it looks like an atom ref (lowest bit 0)
          readUlebFrom(buf, offRef)
          // Try to read one atom index defensively: we can't peek without consuming LEB reliably.
          // We skip this to avoid desync; export_name read below will realign if needed.
        }
        // export_name atom (always present)
        readAtomRefRaw(buf, offRef, firstAtom)
      }
      // star_export_entries
      const starCount = readUlebFrom(buf, offRef)
      for (let i = 0; i < starCount; i++) readUlebFrom(buf, offRef)
      // import_entries
      const importCount = readUlebFrom(buf, offRef)
      for (let i = 0; i < importCount; i++) {
        readUlebFrom(buf, offRef) // var_idx
        const isStar = buf[offRef.off++] // u8
        if (!isStar) {
          readAtomRefRaw(buf, offRef, firstAtom) // import_name
        }
        readUlebFrom(buf, offRef) // req_module_idx
      }
      // has_tla
      offRef.off += 1
      // func_obj follows
      const r = readObjectStream(buf, offRef, atoms, version, firstAtom)
      if (r) return r
      return null
    }
    case BCTag.TYPED_ARRAY: {
      offRef.off += 1 // array_tag
      readUlebFrom(buf, offRef) // len
      readUlebFrom(buf, offRef) // offset
      // buffer object
      const r = readObjectStream(buf, offRef, atoms, version, firstAtom)
      if (r) return r
      return null
    }
    case BCTag.ARRAY_BUFFER: {
      const byteLen = readUlebFrom(buf, offRef)
      offRef.off += byteLen
      return null
    }
    case BCTag.SHARED_ARRAY_BUFFER: {
      const byteLen = readUlebFrom(buf, offRef)
      offRef.off += 8 // pointer
      // no payload; track externally in runtime
      return null
    }
    case BCTag.DATE: {
      const r = readObjectStream(buf, offRef, atoms, version, firstAtom) // numeric value
      if (r) return r
      return null
    }
    case BCTag.OBJECT_VALUE: {
      const r = readObjectStream(buf, offRef, atoms, version, firstAtom) // inner value
      if (r) return r
      return null
    }
    case BCTag.BIG_INT: {
      const len = readUlebFrom(buf, offRef)
      offRef.off += len
      return null
    }
    case BCTag.OBJECT_REFERENCE: {
      readUlebFrom(buf, offRef) // index
      return null
    }
    default:
      // Unknown tag: give up gracefully
      return null
  }
}

function readAtomRefRaw(buf: Buffer, offRef: { off: number }, firstAtom: number): number {
  const v = readUlebFrom(buf, offRef)
  if (v & 1) return v >> 1
  const idx = (v >> 1)
  if (idx >= firstAtom) return idx - firstAtom
  return idx // runtime atom; we just pass through
}

function skipObjectRec(buf: Buffer, offRef: { off: number }) {
  if (offRef.off >= buf.length) return
  const tag = buf[offRef.off++]
  switch (tag) {
    case BCTag.NULL:
    case BCTag.UNDEFINED:
    case BCTag.BOOL_FALSE:
    case BCTag.BOOL_TRUE:
      return
    case BCTag.INT32:
      readSlebFrom(buf, offRef); return
    case BCTag.FLOAT64:
      offRef.off += 8; return
    case BCTag.STRING: {
      const enc = readUlebFrom(buf, offRef)
      const isWide = (enc & 1) !== 0
      const len = enc >>> 1
      offRef.off += isWide ? len * 2 : len
      return
    }
    case BCTag.OBJECT: {
      const propCount = readUlebFrom(buf, offRef)
      for (let i = 0; i < propCount; i++) {
        // key atom
        readUlebFrom(buf, offRef)
        // value
        skipObjectRec(buf, offRef)
      }
      return
    }
    case BCTag.ARRAY:
    case BCTag.TEMPLATE_OBJECT: {
      const len = readUlebFrom(buf, offRef)
      for (let i = 0; i < len; i++) skipObjectRec(buf, offRef)
      if (tag === BCTag.TEMPLATE_OBJECT) skipObjectRec(buf, offRef)
      return
    }
    case BCTag.FUNCTION_BYTECODE: {
      // Skip a function layout without decoding
      // flags u16 + jsMode u8
      offRef.off += 3
      // func_name atom
      readUlebFrom(buf, offRef)
      // counts
      const argCount = readUlebFrom(buf, offRef)
      const varCount = readUlebFrom(buf, offRef)
      const definedArgCount = readUlebFrom(buf, offRef)
      const stackSize = readUlebFrom(buf, offRef)
      const closureVarCount = readUlebFrom(buf, offRef)
      const cpoolCount = readUlebFrom(buf, offRef)
      const byteCodeLen = readUlebFrom(buf, offRef)
      const vardefsCount = readUlebFrom(buf, offRef)
      for (let i = 0; i < vardefsCount; i++) { readUlebFrom(buf, offRef); readUlebFrom(buf, offRef); readUlebFrom(buf, offRef); offRef.off += 1 }
      for (let i = 0; i < closureVarCount; i++) { readUlebFrom(buf, offRef); readUlebFrom(buf, offRef); offRef.off += 1 }
      offRef.off += byteCodeLen
      // Optional debug if flag bit set: we can't know flags here since we skipped, so try both cases is unsafe.
      // For skip-only path, bail out without trying to read debug/cpool further to avoid desync.
      return
    }
    case BCTag.MODULE: {
      // Conservative skip: try to mirror write order best-effort
      readUlebFrom(buf, offRef) // module_name atom
      const reqCount = readUlebFrom(buf, offRef)
      for (let i = 0; i < reqCount; i++) { readUlebFrom(buf, offRef); skipObjectRec(buf, offRef) }
      const exportCount = readUlebFrom(buf, offRef)
      for (let i = 0; i < exportCount; i++) {
        const exportType = buf[offRef.off++] // u8
        if (exportType === 0 /* LOCAL */) {
          readUlebFrom(buf, offRef) // var_idx
        } else if (exportType === 1 /* INDIRECT */) {
          readUlebFrom(buf, offRef) // req_module_idx
          readUlebFrom(buf, offRef) // local_name atom
        } else if (exportType === 2 /* STAR */) {
          readUlebFrom(buf, offRef) // req_module_idx (best-effort)
        } else {
          readUlebFrom(buf, offRef)
        }
        readUlebFrom(buf, offRef) // export_name atom
      }
      const starCount = readUlebFrom(buf, offRef)
      for (let i = 0; i < starCount; i++) readUlebFrom(buf, offRef)
      const importCount = readUlebFrom(buf, offRef)
      for (let i = 0; i < importCount; i++) {
        readUlebFrom(buf, offRef) // var_idx
        const isStar = buf[offRef.off++] // u8
        if (!isStar) {
          readUlebFrom(buf, offRef) // import_name atom
        }
        readUlebFrom(buf, offRef) // req_module_idx
      }
      offRef.off += 1 // has_tla
      skipObjectRec(buf, offRef) // func_obj
      return
    }
    case BCTag.TYPED_ARRAY:
      offRef.off += 1; readUlebFrom(buf, offRef); readUlebFrom(buf, offRef); skipObjectRec(buf, offRef); return
    case BCTag.ARRAY_BUFFER: {
      const n = readUlebFrom(buf, offRef); offRef.off += n; return
    }
    case BCTag.SHARED_ARRAY_BUFFER: {
      const n = readUlebFrom(buf, offRef); offRef.off += 8; return
    }
    case BCTag.DATE:
    case BCTag.OBJECT_VALUE:
      skipObjectRec(buf, offRef); return
    case BCTag.BIG_INT: {
      const n = readUlebFrom(buf, offRef); offRef.off += n; return
    }
    case BCTag.OBJECT_REFERENCE:
      readUlebFrom(buf, offRef); return
    default:
      return
  }
}
