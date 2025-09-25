import { TextDecoder } from 'node:util'
import {
  ATOM_STRINGS,
  BytecodeTag,
  env,
  FunctionKind,
  JSMode,
  Opcode,
  OPCODE_DEFS,
  OpFormat,
  type OpcodeDefinition,
} from './env'
import { VarKind } from './vars'

const BUILTIN_ATOMS = new Map<number, string>(
  Object.entries(ATOM_STRINGS).map(([id, value]) => [Number(id), value])
)

const opcodeInfoByCode = new Map<number, OpcodeDefinition>()
for (const [key, def] of Object.entries(OPCODE_DEFS)) {
  const opcodeValue = (Opcode as unknown as Record<string, number>)[key]
  if (typeof opcodeValue === 'number') {
    opcodeInfoByCode.set(opcodeValue, def)
  }
}

const utf8Decoder = new TextDecoder()

type AtomRef =
  | { type: 'atom'; id: number; name: string | null }
  | { type: 'tagged-int'; value: number }

type ParsedTaggedValue = {
  tag: string
  value?: unknown
}

export interface ParsedInstruction {
  offset: number
  size: number
  opcode: number
  opcodeName: string
  operand?: unknown
}

export interface ParsedVarDef {
  name: AtomRef
  scopeLevel: number
  scopeNext: number
  isConst: boolean
  isLexical: boolean
  isCaptured: boolean
  kind: {
    value: number
    name: string | null
  }
}

export interface ParsedClosureVar {
  name: AtomRef
  varIndex: number
  isLocal: boolean
  isArgument: boolean
  isConst: boolean
  isLexical: boolean
  kind: {
    value: number
    name: string | null
  }
}

export interface ParsedDebugInfo {
  filename: AtomRef
  pc2line: number[]
  sourceLength: number
  source?: string | null
}

export interface ParsedFunction {
  type: 'function'
  flags: {
    raw: number
    hasPrototype: boolean
    hasSimpleParameterList: boolean
    isDerivedClassConstructor: boolean
    needHomeObject: boolean
    funcKind: {
      value: number
      name: string | null
    }
    newTargetAllowed: boolean
    superCallAllowed: boolean
    superAllowed: boolean
    argumentsAllowed: boolean
    hasDebug: boolean
    isDirectOrIndirectEval: boolean
  }
  jsMode: number
  jsModeFlags: string[]
  name: AtomRef
  argCount: number
  varCount: number
  definedArgCount: number
  stackSize: number
  closureVarCount: number
  constantPoolCount: number
  instructionLength: number
  varDefs: ParsedVarDef[]
  closureVars: ParsedClosureVar[]
  instructions: ParsedInstruction[]
  debug?: ParsedDebugInfo
  constantPool: ParsedTaggedValue[]
}

export interface ParsedModuleObject {
  type: 'module'
  moduleName: AtomRef
  requireEntries: Array<{
    module: AtomRef
    attributes: ParsedTaggedValue
  }>
  exportEntries: Array<
    | {
        type: 'local'
        exportedName: AtomRef
        localVarIndex: number
      }
    | {
        type: 'indirect'
        exportedName: AtomRef
        reqModuleIndex: number
        localName: AtomRef
      }
  >
  starExportEntries: Array<{ reqModuleIndex: number }>
  importEntries: Array<{
    varIndex: number
    isStar: boolean
    importName: AtomRef
    reqModuleIndex: number
  }>
  hasTopLevelAwait: boolean
  function: ParsedFunction
}

export interface ParsedBytecodeModule {
  version: number
  atoms: Array<{ id: number; value: string }>
  root: ParsedModuleObject
}

class ByteReader {
  private offset = 0
  private readonly view: DataView

  constructor(private readonly bytes: Uint8Array) {
    this.view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  }

  tell(): number {
    return this.offset
  }

  isEOF(): boolean {
    return this.offset >= this.bytes.length
  }

  private ensure(length: number) {
    if (this.offset + length > this.bytes.length) {
      throw new Error('Unexpected end of bytecode stream')
    }
  }

  readU8(): number {
    this.ensure(1)
    const value = this.bytes[this.offset]
    this.offset += 1
    return value
  }

  readInt8(): number {
    const value = this.readU8()
    return (value << 24) >> 24
  }

  readU16(): number {
    this.ensure(2)
    const value = this.view.getUint16(this.offset, true)
    this.offset += 2
    return value
  }

  readInt16(): number {
    this.ensure(2)
    const value = this.view.getInt16(this.offset, true)
    this.offset += 2
    return value
  }

  readU32(): number {
    this.ensure(4)
    const value = this.view.getUint32(this.offset, true)
    this.offset += 4
    return value
  }

  readInt32(): number {
    this.ensure(4)
    const value = this.view.getInt32(this.offset, true)
    this.offset += 4
    return value
  }

  readFloat64(): number {
    this.ensure(8)
    const value = this.view.getFloat64(this.offset, true)
    this.offset += 8
    return value
  }

  readBytes(length: number): Uint8Array {
    this.ensure(length)
    const slice = this.bytes.subarray(this.offset, this.offset + length)
    this.offset += length
    return new Uint8Array(slice)
  }

  readULEB128(): number {
    let result = 0
    let shift = 0
    while (true) {
      const byte = this.readU8()
      result |= (byte & 0x7f) << shift
      if ((byte & 0x80) === 0) {
        break
      }
      shift += 7
      if (shift > 35) {
        throw new Error('ULEB128 value is too large')
      }
    }
    return result >>> 0
  }

  readSLEB128(): number {
    let result = 0
    let shift = 0
    let byte = 0
    const size = 32

    while (true) {
      byte = this.readU8()
      result |= (byte & 0x7f) << shift
      shift += 7
      if ((byte & 0x80) === 0) {
        break
      }
      if (shift > 35) {
        throw new Error('SLEB128 value is too large')
      }
    }

    if (shift < size && (byte & 0x40) !== 0) {
      result |= (~0 << shift)
    }

    return result | 0
  }

  readBCString(): string {
    const encodedLength = this.readULEB128()
    const length = encodedLength >>> 1
    const isWide = (encodedLength & 1) === 1
    if (length === 0) {
      return ''
    }
    if (isWide) {
      let result = ''
      for (let i = 0; i < length; i++) {
        const codePoint = this.readU16()
        result += String.fromCharCode(codePoint)
      }
      return result
    }
    const bytes = this.readBytes(length)
    return utf8Decoder.decode(bytes)
  }
}

function getAtomName(atomId: number, customAtoms: Map<number, string>): string | null {
  return customAtoms.get(atomId) ?? BUILTIN_ATOMS.get(atomId) ?? null
}

function readAtomRef(reader: ByteReader, customAtoms: Map<number, string>): AtomRef {
  const encoded = reader.readULEB128()
  if ((encoded & 1) === 1) {
    return { type: 'tagged-int', value: encoded >> 1 }
  }
  const atomId = encoded >> 1
  const name = getAtomName(atomId, customAtoms)
  return { type: 'atom', id: atomId, name }
}

function readFlags(value: number, bit: number): boolean {
  return (value & (1 << bit)) !== 0
}

function decodeJsModeFlags(jsMode: number): string[] {
  const names: string[] = []
  for (const key of Object.keys(JSMode)) {
    if (!Number.isNaN(Number(key))) continue
    const bit = (JSMode as unknown as Record<string, number>)[key]
    if ((jsMode & bit) !== 0) {
      names.push(key)
    }
  }
  return names
}

function parseModuleObjectBody(reader: ByteReader, customAtoms: Map<number, string>): ParsedModuleObject {
  const moduleName = readAtomRef(reader, customAtoms)

  const requireCount = reader.readULEB128()
  const requireEntries: ParsedModuleObject['requireEntries'] = []
  for (let i = 0; i < requireCount; i++) {
    const dependency = readAtomRef(reader, customAtoms)
    const attributes = parseTaggedValue(reader, customAtoms)
    requireEntries.push({ module: dependency, attributes })
  }

  const exportCount = reader.readULEB128()
  const exportEntries: ParsedModuleObject['exportEntries'] = []
  for (let i = 0; i < exportCount; i++) {
    const exportType = reader.readU8()
    if (exportType === 0) {
      const localIndex = reader.readULEB128()
      const exportedName = readAtomRef(reader, customAtoms)
      exportEntries.push({
        type: 'local',
        exportedName,
        localVarIndex: localIndex,
      })
    } else {
      const reqModuleIndex = reader.readULEB128()
      const localName = readAtomRef(reader, customAtoms)
      const exportedName = readAtomRef(reader, customAtoms)
      exportEntries.push({
        type: 'indirect',
        exportedName,
        reqModuleIndex,
        localName,
      })
    }
  }

  const starExportCount = reader.readULEB128()
  const starExportEntries: ParsedModuleObject['starExportEntries'] = []
  for (let i = 0; i < starExportCount; i++) {
    starExportEntries.push({ reqModuleIndex: reader.readULEB128() })
  }

  const importCount = reader.readULEB128()
  const importEntries: ParsedModuleObject['importEntries'] = []
  for (let i = 0; i < importCount; i++) {
    const varIndex = reader.readULEB128()
    const isStar = reader.readU8() !== 0
    const importName = readAtomRef(reader, customAtoms)
    const reqModuleIndex = reader.readULEB128()
    importEntries.push({ varIndex, isStar, importName, reqModuleIndex })
  }

  const hasTopLevelAwait = reader.readU8() !== 0
  const fn = parseFunctionBytecode(reader, customAtoms, false)

  return {
    type: 'module',
    moduleName,
    requireEntries,
    exportEntries,
    starExportEntries,
    importEntries,
    hasTopLevelAwait,
    function: fn,
  }
}

function parseModuleObject(reader: ByteReader, customAtoms: Map<number, string>): ParsedModuleObject {
  const tag = reader.readU8()
  if (tag !== BytecodeTag.TC_TAG_MODULE) {
    throw new Error(`Expected module tag (${BytecodeTag.TC_TAG_MODULE}), got ${tag}`)
  }
  return parseModuleObjectBody(reader, customAtoms)
}

function parseVarDefs(reader: ByteReader, count: number, customAtoms: Map<number, string>): ParsedVarDef[] {
  const varDefs: ParsedVarDef[] = []
  for (let i = 0; i < count; i++) {
    const name = readAtomRef(reader, customAtoms)
    const scopeLevel = reader.readULEB128()
    const scopeNextEncoded = reader.readULEB128()
    const scopeNext = scopeNextEncoded === 0 ? -1 : scopeNextEncoded - 1
    const flags = reader.readU8()
    const kind = flags & 0x0f
    const isConst = readFlags(flags, 4)
    const isLexical = readFlags(flags, 5)
    const isCaptured = readFlags(flags, 6)

    const kindName = typeof (VarKind as unknown as Record<number, string>)[kind] === 'string'
      ? (VarKind as unknown as Record<number, string>)[kind]
      : null

    varDefs.push({
      name,
      scopeLevel,
      scopeNext,
      isConst,
      isLexical,
      isCaptured,
      kind: {
        value: kind,
        name: kindName,
      },
    })
  }
  return varDefs
}

function parseClosureVars(reader: ByteReader, count: number, customAtoms: Map<number, string>): ParsedClosureVar[] {
  const closureVars: ParsedClosureVar[] = []
  for (let i = 0; i < count; i++) {
    const name = readAtomRef(reader, customAtoms)
    const varIndex = reader.readULEB128()
    const flags = reader.readU8()
    const isLocal = readFlags(flags, 0)
    const isArgument = readFlags(flags, 1)
    const isConst = readFlags(flags, 2)
    const isLexical = readFlags(flags, 3)
    const kind = (flags >> 4) & 0x0f

    const kindName = typeof (VarKind as unknown as Record<number, string>)[kind] === 'string'
      ? (VarKind as unknown as Record<number, string>)[kind]
      : null

    closureVars.push({
      name,
      varIndex,
      isLocal,
      isArgument,
      isConst,
      isLexical,
      kind: {
        value: kind,
        name: kindName,
      },
    })
  }
  return closureVars
}

function parseDebugInfo(reader: ByteReader, customAtoms: Map<number, string>): ParsedDebugInfo {
  const filename = readAtomRef(reader, customAtoms)
  const pc2lineLength = reader.readULEB128()
  const pc2line = Array.from(reader.readBytes(pc2lineLength))
  const sourceLength = reader.readULEB128()
  let source: string | null = null
  if (sourceLength > 0) {
    const sourceBytes = reader.readBytes(sourceLength)
    source = utf8Decoder.decode(sourceBytes)
  }
  return {
    filename,
    pc2line,
    sourceLength,
    source,
  }
}

function parseFunctionBytecode(
  reader: ByteReader,
  customAtoms: Map<number, string>,
  tagAlreadyConsumed: boolean
): ParsedFunction {
  if (!tagAlreadyConsumed) {
    const tag = reader.readU8()
    if (tag !== BytecodeTag.TC_TAG_FUNCTION_BYTECODE) {
      throw new Error(`Expected function bytecode tag (${BytecodeTag.TC_TAG_FUNCTION_BYTECODE}), got ${tag}`)
    }
  }

  const flagsValue = reader.readU16()
  const jsMode = reader.readU8()
  const name = readAtomRef(reader, customAtoms)

  const argCount = reader.readULEB128()
  const varCount = reader.readULEB128()
  const definedArgCount = reader.readULEB128()
  const stackSize = reader.readULEB128()
  const closureVarCount = reader.readULEB128()
  const constantPoolCount = reader.readULEB128()
  const instructionLength = reader.readULEB128()

  const varDefsCount = reader.readULEB128()
  const varDefs = parseVarDefs(reader, varDefsCount, customAtoms)
  const closureVars = parseClosureVars(reader, closureVarCount, customAtoms)

  const instructionsBytes = reader.readBytes(instructionLength)
  const instructions = parseInstructions(instructionsBytes, customAtoms)

  let debugInfo: ParsedDebugInfo | undefined
  if (readFlags(flagsValue, 10)) {
    debugInfo = parseDebugInfo(reader, customAtoms)
  }

  const constantPool: ParsedTaggedValue[] = []
  for (let i = 0; i < constantPoolCount; i++) {
    constantPool.push(parseTaggedValue(reader, customAtoms))
  }

  const funcKindValue = (flagsValue >> 4) & 0x3
    const funcKindName = typeof (FunctionKind as unknown as Record<number, string>)[funcKindValue] === 'string'
      ? (FunctionKind as unknown as Record<number, string>)[funcKindValue]
      : null
  return {
    type: 'function',
    flags: {
      raw: flagsValue,
      hasPrototype: readFlags(flagsValue, 0),
      hasSimpleParameterList: readFlags(flagsValue, 1),
      isDerivedClassConstructor: readFlags(flagsValue, 2),
      needHomeObject: readFlags(flagsValue, 3),
      funcKind: {
        value: funcKindValue,
          name: funcKindName,
      },
      newTargetAllowed: readFlags(flagsValue, 6),
      superCallAllowed: readFlags(flagsValue, 7),
      superAllowed: readFlags(flagsValue, 8),
      argumentsAllowed: readFlags(flagsValue, 9),
      hasDebug: readFlags(flagsValue, 10),
      isDirectOrIndirectEval: readFlags(flagsValue, 11),
    },
    jsMode,
    jsModeFlags: decodeJsModeFlags(jsMode),
    name,
    argCount,
    varCount,
    definedArgCount,
    stackSize,
    closureVarCount,
    constantPoolCount,
    instructionLength,
    varDefs,
    closureVars,
    instructions,
    debug: debugInfo,
    constantPool,
  }
}

function parseFunction(reader: ByteReader, customAtoms: Map<number, string>): ParsedFunction {
  return parseFunctionBytecode(reader, customAtoms, false)
}

function parseTaggedValue(reader: ByteReader, customAtoms: Map<number, string>): ParsedTaggedValue {
  const tag = reader.readU8()
  const tagName = (BytecodeTag as unknown as Record<number, string>)[tag] ?? `UNKNOWN_${tag}`

  switch (tag) {
    case BytecodeTag.TC_TAG_NULL:
      return { tag: tagName, value: null }
    case BytecodeTag.TC_TAG_UNDEFINED:
      return { tag: tagName, value: 'undefined' }
    case BytecodeTag.TC_TAG_BOOL_FALSE:
      return { tag: tagName, value: false }
    case BytecodeTag.TC_TAG_BOOL_TRUE:
      return { tag: tagName, value: true }
    case BytecodeTag.TC_TAG_INT32:
      return { tag: tagName, value: reader.readSLEB128() }
    case BytecodeTag.TC_TAG_FLOAT64:
      return { tag: tagName, value: reader.readFloat64() }
    case BytecodeTag.TC_TAG_STRING:
      return { tag: tagName, value: reader.readBCString() }
    case BytecodeTag.TC_TAG_ARRAY: {
      const length = reader.readULEB128()
      const elements: ParsedTaggedValue[] = []
      for (let i = 0; i < length; i++) {
        elements.push(parseTaggedValue(reader, customAtoms))
      }
      return { tag: tagName, value: elements }
    }
    case BytecodeTag.TC_TAG_TEMPLATE_OBJECT: {
      const length = reader.readULEB128()
      const elements: ParsedTaggedValue[] = []
      for (let i = 0; i < length; i++) {
        elements.push(parseTaggedValue(reader, customAtoms))
      }
      const raw = parseTaggedValue(reader, customAtoms)
      return { tag: tagName, value: { elements, raw } }
    }
    case BytecodeTag.TC_TAG_OBJECT: {
      const length = reader.readULEB128()
      const properties: Array<{ name: AtomRef; value: ParsedTaggedValue }> = []
      for (let i = 0; i < length; i++) {
        const name = readAtomRef(reader, customAtoms)
        const value = parseTaggedValue(reader, customAtoms)
        properties.push({ name, value })
      }
      return { tag: tagName, value: properties }
    }
    case BytecodeTag.TC_TAG_FUNCTION_BYTECODE: {
      const func = parseFunctionBytecode(reader, customAtoms, true)
      return { tag: tagName, value: func }
    }
    case BytecodeTag.TC_TAG_MODULE: {
      const moduleValue = parseModuleObjectBody(reader, customAtoms)
      return { tag: tagName, value: moduleValue }
    }
    case BytecodeTag.TC_TAG_BIG_INT: {
      const byteLength = reader.readULEB128()
      const bytes = reader.readBytes(byteLength)
      const hex = Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
      return { tag: tagName, value: { byteLength, littleEndianHex: hex } }
    }
    default:
      throw new Error(`Unsupported bytecode tag: ${tagName} (${tag})`)
  }
}

function parseInstructions(bytes: Uint8Array, customAtoms: Map<number, string>): ParsedInstruction[] {
  const reader = new ByteReader(bytes)
  const instructions: ParsedInstruction[] = []

  while (!reader.isEOF()) {
    const offset = reader.tell()
    const opcode = reader.readU8()
    const def = opcodeInfoByCode.get(opcode)
    if (!def) {
      throw new Error(`Unknown opcode encountered: ${opcode}`)
    }

    const operand = readOperandByFormat(reader, def.format, customAtoms)
    const opcodeName = (Opcode as unknown as Record<number, string>)[opcode] ?? def.id ?? `OP_${opcode}`
    const instruction: ParsedInstruction = {
      offset,
      size: def.size,
      opcode,
      opcodeName,
    }
    if (operand !== undefined) {
      instruction.operand = operand
    }
    instructions.push(instruction)
  }

  return instructions
}

function readOperandByFormat(
  reader: ByteReader,
  format: OpFormat,
  customAtoms: Map<number, string>
): unknown {
  switch (format) {
    case OpFormat.none:
    case OpFormat.none_arg:
    case OpFormat.none_int:
    case OpFormat.none_loc:
    case OpFormat.none_var_ref:
      return undefined
    case OpFormat.u8:
    case OpFormat.loc8:
    case OpFormat.const8:
      return reader.readU8()
    case OpFormat.i8:
    case OpFormat.label8:
      return reader.readInt8()
    case OpFormat.u16:
    case OpFormat.npop_u16:
    case OpFormat.loc:
    case OpFormat.arg:
    case OpFormat.var_ref:
    case OpFormat.label16:
      return format === OpFormat.label16 ? reader.readInt16() : reader.readU16()
    case OpFormat.i16:
      return reader.readInt16()
    case OpFormat.u32:
    case OpFormat.const:
      return reader.readU32()
    case OpFormat.npop:
      return reader.readU16()
    case OpFormat.npopx:
      return undefined
    case OpFormat.i32:
    case OpFormat.label:
      return reader.readInt32()
    case OpFormat.atom:
      return readAtomRef(reader, customAtoms)
    case OpFormat.atom_u8:
      return {
        atom: readAtomRef(reader, customAtoms),
        value: reader.readU8(),
      }
    case OpFormat.atom_u16:
      return {
        atom: readAtomRef(reader, customAtoms),
        value: reader.readU16(),
      }
    case OpFormat.atom_label_u8:
      return {
        atom: readAtomRef(reader, customAtoms),
        label: reader.readU32(),
        delta: reader.readInt8(),
      }
    case OpFormat.atom_label_u16:
      return {
        atom: readAtomRef(reader, customAtoms),
        label: reader.readU32(),
        value: reader.readU16(),
      }
    case OpFormat.label_u16:
      return {
        label: reader.readU32(),
        value: reader.readU16(),
      }
    default:
      return undefined
  }
}

export function parseBytecodeModule(buffer: Uint8Array): ParsedBytecodeModule {
  const reader = new ByteReader(buffer)
  const version = reader.readU8()
  const atomCount = reader.readULEB128()

  const customAtoms = new Map<number, string>()
  const atomEntries: Array<{ id: number; value: string }> = []
  for (let i = 0; i < atomCount; i++) {
    const value = reader.readBCString()
    const id = env.firstAtomId + i
    customAtoms.set(id, value)
    atomEntries.push({ id, value })
  }

  const root = parseModuleObject(reader, customAtoms)

  if (!reader.isEOF()) {
    throw new Error(`Unexpected trailing data at offset ${reader.tell()}`)
  }

  return {
    version,
    atoms: atomEntries,
    root,
  }
}
