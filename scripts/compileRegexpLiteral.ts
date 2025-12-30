#!/usr/bin/env tsx

import { QuickJSLib } from './QuickJSLib'
import { BytecodeTag, JS_FUNCTION_BYTECODE_FLAG_HAS_DEBUG } from '../src/env'

type Input = { literalText: string }

type StringRaw = { isWideChar: boolean; bytes: Uint8Array }

class Reader {
  ptr = 0
  constructor(readonly buf: Uint8Array) {}

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

  readAtom(): number {
    const v = this.readULEB128() >>> 0
    return (v >>> 1) >>> 0
  }

  readStringRaw(): StringRaw {
    const lenTag = this.readULEB128()
    const isWideChar = (lenTag & 1) !== 0
    const byteLen = lenTag >> 1

    if (isWideChar) {
      // Wide-char strings are u16 code units.
      // Return UTF-16LE bytes so callers can still reconstruct deterministically.
      const bytes = this.readBytes(byteLen * 2)
      return { isWideChar: true, bytes }
    }

    const bytes = this.readBytes(byteLen)
    return { isWideChar: false, bytes }
  }
}

type ParsedFunction = { bytecode: Uint8Array; cpool: unknown[] }

function parseRootFunction(bytes: Uint8Array): ParsedFunction {
  const r = new Reader(bytes)

  // module header
  r.readU8() // version
  const atomCount = r.readULEB128()
  for (let i = 0; i < atomCount; i++) {
    r.readStringRaw() // skip atoms
  }

  const tag = r.readU8()
  if (tag !== BytecodeTag.TC_TAG_FUNCTION_BYTECODE) {
    throw new Error(`Unexpected root tag=${tag}; expected function bytecode`)
  }

  const flags = r.readU16LE()
  r.readU8() // jsMode
  r.readAtom() // funcNameAtom

  r.readULEB128() // argCount
  r.readULEB128() // varCount
  r.readULEB128() // definedArgCount
  r.readULEB128() // stackSize
  const closureVarCount = r.readULEB128()
  const cpoolCount = r.readULEB128()
  const bytecodeLen = r.readULEB128()

  const vardefCount = r.readULEB128()
  for (let i = 0; i < vardefCount; i++) {
    r.readAtom() // nameAtom
    r.readULEB128() // scopeLevel
    r.readULEB128() // scopeNextPlus1
    r.readU8() // flags
  }

  for (let i = 0; i < closureVarCount; i++) {
    r.readAtom() // nameAtom
    r.readULEB128() // varIdx
    r.readU8() // flags
  }

  const bytecode = r.readBytes(bytecodeLen)

  if ((flags & JS_FUNCTION_BYTECODE_FLAG_HAS_DEBUG) !== 0) {
    r.readAtom() // filenameAtom
    const pc2lineLen = r.readULEB128()
    r.readBytes(pc2lineLen)
    const sourceLen = r.readULEB128()
    if (sourceLen > 0) r.readBytes(sourceLen)
  }

  const cpool: unknown[] = []
  for (let i = 0; i < cpoolCount; i++) {
    const ctag = r.readU8()
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
        cpool.push((r.readU32LE() | 0) as number)
        break
      case BytecodeTag.TC_TAG_FLOAT64: {
        // skip f64
        r.readBytes(8)
        cpool.push(null)
        break
      }
      case BytecodeTag.TC_TAG_STRING: {
        const s = r.readStringRaw()
        cpool.push(s)
        break
      }
      case BytecodeTag.TC_TAG_BIG_INT: {
        const len = r.readULEB128()
        r.readBytes(len)
        cpool.push(null)
        break
      }
      case BytecodeTag.TC_TAG_TEMPLATE_OBJECT: {
        const len = r.readULEB128()
        // Recursively skip contained values using the same tag reader.
        // For our regexp extraction we don't need template literals.
        for (let j = 0; j < len; j++) {
          // best-effort: treat nested items as any object, but we only need to keep alignment.
          // The simplest safe approach: re-enter the switch by pushing back one byte.
          // Instead we just parse one value by calling a local helper.
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          void readCpoolAny(r)
        }
        void readCpoolAny(r)
        cpool.push(null)
        break
      }
      case BytecodeTag.TC_TAG_FUNCTION_BYTECODE:
        // Nested functions are not needed for regexp literal compilation.
        // We must still consume them to keep alignment.
        r.ptr -= 1
        void parseFunctionAndDiscard(r)
        cpool.push(null)
        break
      default:
        // Unknown tag: cannot safely continue.
        throw new Error(`Unsupported cpool tag=${ctag} at index ${i}`)
    }
  }

  return { bytecode, cpool }
}

function parseFunctionAndDiscard(r: Reader): void {
  const tag = r.readU8()
  if (tag !== BytecodeTag.TC_TAG_FUNCTION_BYTECODE) {
    throw new Error('Expected function bytecode tag while discarding')
  }

  const flags = r.readU16LE()
  r.readU8() // jsMode
  r.readAtom() // funcNameAtom

  r.readULEB128() // argCount
  r.readULEB128() // varCount
  r.readULEB128() // definedArgCount
  r.readULEB128() // stackSize
  const closureVarCount = r.readULEB128()
  const cpoolCount = r.readULEB128()
  const bytecodeLen = r.readULEB128()

  const vardefCount = r.readULEB128()
  for (let i = 0; i < vardefCount; i++) {
    r.readAtom()
    r.readULEB128()
    r.readULEB128()
    r.readU8()
  }

  for (let i = 0; i < closureVarCount; i++) {
    r.readAtom()
    r.readULEB128()
    r.readU8()
  }

  r.readBytes(bytecodeLen)

  if ((flags & JS_FUNCTION_BYTECODE_FLAG_HAS_DEBUG) !== 0) {
    r.readAtom()
    const pc2lineLen = r.readULEB128()
    r.readBytes(pc2lineLen)
    const sourceLen = r.readULEB128()
    if (sourceLen > 0) r.readBytes(sourceLen)
  }

  // discard cpool values
  for (let i = 0; i < cpoolCount; i++) {
    void readCpoolAny(r)
  }
}

function readCpoolAny(r: Reader): void {
  const tag = r.readU8()
  switch (tag) {
    case BytecodeTag.TC_TAG_NULL:
    case BytecodeTag.TC_TAG_UNDEFINED:
    case BytecodeTag.TC_TAG_BOOL_FALSE:
    case BytecodeTag.TC_TAG_BOOL_TRUE:
      return
    case BytecodeTag.TC_TAG_INT32:
      r.readU32LE();
      return
    case BytecodeTag.TC_TAG_FLOAT64:
      r.readBytes(8)
      return
    case BytecodeTag.TC_TAG_STRING:
      r.readStringRaw()
      return
    case BytecodeTag.TC_TAG_BIG_INT: {
      const len = r.readULEB128()
      r.readBytes(len)
      return
    }
    case BytecodeTag.TC_TAG_TEMPLATE_OBJECT: {
      const len = r.readULEB128()
      for (let i = 0; i < len; i++) readCpoolAny(r)
      readCpoolAny(r)
      return
    }
    case BytecodeTag.TC_TAG_FUNCTION_BYTECODE:
      r.ptr -= 1
      parseFunctionAndDiscard(r)
      return
    case BytecodeTag.TC_TAG_MODULE:
      throw new Error('Unexpected module tag inside cpool')
    default:
      throw new Error(`Unsupported nested cpool tag=${tag}`)
  }
}

function findRegexpConstIndexes(bytecode: Uint8Array): { patternIdx: number; bytecodeIdx: number } {
  // Scan decoded bytecode for: push_const* a, push_const* b, OP_regexp
  // OP_regexp = 52 (0x34)
  // OP_push_const8 = 193 (0xc1) [idx:u8]
  // OP_push_const  = 2   (0x02) [idx:u32]
  const OP_regexp = 0x34
  const OP_push_const = 0x02
  const OP_push_const8 = 0xc1

  type Push = { pc: number; idx: number }
  const pushes: Push[] = []

  let pc = 0
  while (pc < bytecode.length) {
    const op = bytecode[pc]
    if (op === OP_push_const8) {
      const idx = bytecode[pc + 1] ?? 0
      pushes.push({ pc, idx })
      pc += 2
      continue
    }
    if (op === OP_push_const) {
      const idx =
        (bytecode[pc + 1] |
          (bytecode[pc + 2] << 8) |
          (bytecode[pc + 3] << 16) |
          (bytecode[pc + 4] << 24)) >>>
        0
      pushes.push({ pc, idx })
      pc += 5
      continue
    }
    if (op === OP_regexp) {
      const last = pushes[pushes.length - 1]
      const prev = pushes[pushes.length - 2]
      if (!last || !prev) throw new Error('Found OP_regexp but missing preceding push_const ops')
      return { patternIdx: prev.idx, bytecodeIdx: last.idx }
    }

    // Fallback: conservatively advance by 1.
    pc += 1
  }

  throw new Error('No OP_regexp found in compiled bytecode')
}

function stringRawToUtf8(s: StringRaw): string {
  if (s.isWideChar) {
    // Interpret as UTF-16LE code units
    const view = new DataView(s.bytes.buffer, s.bytes.byteOffset, s.bytes.byteLength)
    const codeUnits: number[] = []
    for (let i = 0; i + 1 < s.bytes.length; i += 2) {
      codeUnits.push(view.getUint16(i, true))
    }
    return String.fromCharCode(...codeUnits)
  }
  return new TextDecoder('utf-8').decode(s.bytes)
}

async function main() {
  const inputText = await new Promise<string>((resolve) => {
    let s = ''
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', (d) => (s += d))
    process.stdin.on('end', () => resolve(s))
  })

  const input = JSON.parse(inputText) as Input
  if (!input?.literalText || typeof input.literalText !== 'string') {
    throw new Error('Expected stdin JSON: { literalText: string }')
  }

  // Compile as script so the regexp literal appears in the root function.
  const source = `${input.literalText};\n`
  // IMPORTANT: QuickJS WASM may write to stdout via Emscripten `print()`. Our caller
  // expects this script to emit *only* JSON on stdout, so capture/suppress WASM output.
  const { result: qbc } = await QuickJSLib.withCapturedOutput(() =>
    QuickJSLib.compileSourceAsScript(source, '<regexp-literal>')
  )

  const { bytecode, cpool } = parseRootFunction(new Uint8Array(qbc))
  const { patternIdx, bytecodeIdx } = findRegexpConstIndexes(bytecode)

  const patternVal = cpool[patternIdx]
  const bytecodeVal = cpool[bytecodeIdx]

  if (!patternVal || typeof patternVal !== 'object' || !(patternVal as any).bytes) {
    throw new Error(`Expected cpool[${patternIdx}] to be a string for pattern`) 
  }
  if (!bytecodeVal || typeof bytecodeVal !== 'object' || !(bytecodeVal as any).bytes) {
    throw new Error(`Expected cpool[${bytecodeIdx}] to be a string for regexp bytecode`) 
  }

  const patternStr = stringRawToUtf8(patternVal as StringRaw)
  const bytecodeBytes = (bytecodeVal as StringRaw).bytes

  const out = {
    patternUtf8Base64: Buffer.from(patternStr, 'utf8').toString('base64'),
    bytecodeUtf8Base64: Buffer.from(bytecodeBytes).toString('base64'),
  }

  process.stdout.write(JSON.stringify(out))
}

main().catch((e) => {
  console.error(String(e?.stack || e))
  process.exit(1)
})
