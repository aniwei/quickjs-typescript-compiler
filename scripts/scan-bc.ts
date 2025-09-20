import { readFileSync } from 'node:fs'
import { OPCODE_META } from '../src/opcodes'

function readUleb(buf: Buffer, ref: { off: number }): number {
  let v = 0
  let shift = 0
  for (;;) {
    const b = buf[ref.off++]
    v |= (b & 0x7f) << shift
    if ((b & 0x80) === 0) break
    shift += 7
  }
  return v >>> 0
}

function main(path = 'output.bin') {
  const buf = readFileSync(path)
  const r = { off: 0 }
  const version = buf[r.off++]
  const atomCount = readUleb(buf, r)
  const atoms: string[] = []
  for (let i = 0; i < atomCount; i++) {
    const enc = readUleb(buf, r)
    const isWide = (enc & 1) !== 0
    const len = enc >>> 1
    const s = buf.toString(isWide ? 'utf16le' : 'utf8', r.off, r.off + (isWide ? len * 2 : len))
    r.off += isWide ? len * 2 : len
    atoms.push(s)
  }

  const tag = buf[r.off++]
  const flags = buf[r.off] | (buf[r.off + 1] << 8)
  r.off += 2
  const jsMode = buf[r.off++]

  // func_name atom (skip)
  readUleb(buf, r)

  const argCount = readUleb(buf, r)
  const varCount = readUleb(buf, r)
  const definedArgCount = readUleb(buf, r)
  const stackSize = readUleb(buf, r)
  const closureVarCount = readUleb(buf, r)
  const cpoolCount = readUleb(buf, r)
  const byteCodeLen = readUleb(buf, r)
  const vardefsCount = readUleb(buf, r)

  for (let i = 0; i < vardefsCount; i++) {
    readUleb(buf, r) // name
    readUleb(buf, r) // scope_level
    readUleb(buf, r) // scope_next+1
    r.off += 1 // flags
  }
  for (let i = 0; i < closureVarCount; i++) {
    readUleb(buf, r) // name
    readUleb(buf, r) // idx
    r.off += 1 // flags
  }

  const bcStart = r.off
  const bcEnd = r.off + byteCodeLen
  const bc = buf.subarray(bcStart, bcEnd)

  // FIRST_ATOM is JS_ATOM_END at runtime; for our build without bignum it's 228.
  const FIRST_ATOM = 228 >>> 0

  const bad: Array<{ pc: number, name: string, raw: number, idx: number }> = []
  let pc = 0
  while (pc < bc.length) {
    const op = bc[pc]
    const meta = OPCODE_META[op]
    if (!meta) break
    // check atom-bearing opcodes (we use name heuristic to keep this script decoupled from fmt mapping)
    const isAtomOp = [
      'OP_put_var','OP_put_var_strict','OP_get_var','OP_get_var_undef','OP_check_define_var','OP_define_func',
      'OP_define_field','OP_get_field2','OP_put_field',
    ].includes(meta.name)
    if (isAtomOp) {
      const v = (bc[pc+1] | (bc[pc+2] << 8) | (bc[pc+3] << 16) | (bc[pc+4] << 24)) >>> 0
      const idx = (v - FIRST_ATOM) >>> 0
      if (v < FIRST_ATOM || idx >= atomCount) {
        bad.push({ pc, name: meta.name, raw: v, idx })
      }
    }
    pc += meta.size
  }

  console.log({ version, atomCount, atoms, byteCodeLen, bcStart, bcEnd, bad })
}

if (require.main === module) main(process.argv[2])
