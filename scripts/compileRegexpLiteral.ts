#!/usr/bin/env tsx

import { QuickJSLib } from './QuickJSLib'
import { parseBytecodeModuleRawStrings, type ParsedRawString } from '../src/bytecodeReaderRawStrings'
import { parseBytecodeModule } from '../src/bytecodeReader'
import { BytecodeTag, Opcode } from '../src/env'

type Input = {
  literalText: string
}

type Output = {
  patternUtf8Base64: string
  bytecodeUtf8Base64: string
}

function readStdin(): string {
  const chunks: Buffer[] = []
  const buf = require('node:fs').readFileSync(0)
  return buf.toString('utf8')
}

function b64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString('base64')
}

function readU32LE(bytes: Uint8Array, offset: number): number {
  return (
    (bytes[offset] |
      (bytes[offset + 1] << 8) |
      (bytes[offset + 2] << 16) |
      (bytes[offset + 3] << 24)) >>> 0
  )
}

function readConstIndex(bytes: Uint8Array, pc: number): { idx: number; size: number } | null {
  const op = bytes[pc]
  if (op === Opcode.OP_push_const) {
    if (pc + 4 >= bytes.length) return null
    return { idx: readU32LE(bytes, pc + 1), size: 5 }
  }
  if (op === Opcode.OP_push_const8) {
    if (pc + 1 >= bytes.length) return null
    return { idx: bytes[pc + 1] >>> 0, size: 2 }
  }
  return null
}

function isRawString(v: unknown): v is ParsedRawString {
  return (
    !!v &&
    typeof v === 'object' &&
    (v as any).tag === BytecodeTag.TC_TAG_STRING &&
    typeof (v as any).isWideChar === 'boolean' &&
    (v as any).bytes instanceof Uint8Array
  )
}

async function main() {
  const raw = readStdin().trim()
  const input: Input = raw ? JSON.parse(raw) : { literalText: '' }

  if (!input.literalText || typeof input.literalText !== 'string') {
    throw new Error('Expected stdin JSON: {"literalText": string}')
  }

  const literalText = input.literalText

  // Compile as script so we get a plain root function body.
  const source = `${literalText};\n`
  const { result: qbc } = await QuickJSLib.withCapturedOutput(() =>
    QuickJSLib.compileSourceAsScript(source, '<regexp-literal>.js')
  )

  const modRaw = parseBytecodeModuleRawStrings(qbc)
  const mod = parseBytecodeModule(qbc)

  // Use the normal reader for bytecode scanning (it is stable), and the raw reader
  // for constant pool extraction (so regexp bytecode strings stay unmodified).
  const bc = mod.func.bytecode
  const cpool = modRaw.func.cpool ?? []

  // Find: push_const* idx1; push_const* idx2; regexp
  let idxPattern: number | null = null
  let idxBytecode: number | null = null

  for (let pc = 0; pc < bc.length; pc++) {
    const c1 = readConstIndex(bc, pc)
    if (!c1) continue
    const pc2 = pc + c1.size
    const c2 = pc2 < bc.length ? readConstIndex(bc, pc2) : null
    if (!c2) continue
    const pc3 = pc2 + c2.size
    if (pc3 >= bc.length) continue
    if (bc[pc3] !== Opcode.OP_regexp) continue

    idxPattern = c1.idx
    idxBytecode = c2.idx
    break
  }

  if (idxPattern == null || idxBytecode == null) {
    throw new Error(`Unable to locate OP_regexp sequence in compiled bytecode (len=${bc.length})`)
  }

  const pat = cpool[idxPattern]
  const bcStr = cpool[idxBytecode]

  if (!isRawString(pat) || !isRawString(bcStr)) {
    throw new Error('Expected cpool entries for regexp to be raw strings')
  }

  const out: Output = {
    patternUtf8Base64: b64(pat.bytes),
    bytecodeUtf8Base64: b64(bcStr.bytes),
  }

  process.stdout.write(JSON.stringify(out))
}

main().catch((err) => {
  process.stderr.write(String(err?.stack || err) + '\n')
  process.exit(1)
})
