#!/usr/bin/env tsx

import fs from 'node:fs'
import { parseBytecodeModule } from '../../src/bytecodeReader'

// pc2line v2 constants (matches scripts/analyzePc2lineMismatches.ts)
const PC2LINE_BASE = -3
const PC2LINE_RANGE = 15
const PC2LINE_OP_FIRST = 1

type Pc2LineEntry = {
  pc: number
  line: number
  column: number
  deltaPc: number
  deltaLine: number
  deltaColumn: number
}

function decodePc2line(buffer: Uint8Array): Pc2LineEntry[] {
  let offset = 0
  const readULEB = (): number => {
    let result = 0
    let shift = 0
    while (true) {
      const byte = buffer[offset++]
      result |= (byte & 0x7f) << shift
      if ((byte & 0x80) === 0) break
      shift += 7
    }
    return result >>> 0
  }
  const readSLEB = (): number => {
    const encoded = readULEB()
    return ((encoded >>> 1) ^ -(encoded & 1)) | 0
  }

  const entries: Pc2LineEntry[] = []
  let pc = 0
  let line = readULEB()
  let column = readULEB()
  entries.push({ pc, line, column, deltaPc: 0, deltaLine: 0, deltaColumn: 0 })

  while (offset < buffer.length) {
    const op = buffer[offset++]
    let diffPc: number
    let diffLine: number

    if (op === 0) {
      diffPc = readULEB()
      diffLine = readSLEB()
    } else {
      const encoded = op - PC2LINE_OP_FIRST
      diffPc = Math.floor(encoded / PC2LINE_RANGE)
      diffLine = (encoded % PC2LINE_RANGE) + PC2LINE_BASE
    }
    const diffColumn = readSLEB()

    pc += diffPc
    line += diffLine
    column += diffColumn

    entries.push({ pc, line, column, deltaPc: diffPc, deltaLine: diffLine, deltaColumn: diffColumn })
  }

  return entries
}

function formatEntry(e: Pc2LineEntry): string {
  return `pc=${e.pc} line=${e.line} col=${e.column} (dpc=${e.deltaPc} dline=${e.deltaLine} dcol=${e.deltaColumn})`
}

function snippet(entries: Pc2LineEntry[], idx: number, radius = 12): string {
  const start = Math.max(0, idx - radius)
  const end = Math.min(entries.length, idx + radius + 1)
  const out: string[] = []
  for (let i = start; i < end; i++) {
    const mark = i === idx ? '>>' : '  '
    out.push(`${mark} [${i}] ${formatEntry(entries[i])}`)
  }
  return out.join('\n')
}

function getByPath(root: any, pathExpr: string): any {
  // Only support root.cpool[<n>](.cpool[<n>])*
  let cur = root
  const re = /\.cpool\[(\d+)\]/g
  let m: RegExpExecArray | null
  while ((m = re.exec(pathExpr))) {
    const idx = Number(m[1])
    cur = cur?.cpool?.[idx]
  }
  return cur
}

const tsQbc = process.argv[2]
const wasmQbc = process.argv[3]
const funcPath = process.argv[4] ?? 'root.cpool[32]'

if (!tsQbc || !wasmQbc) {
  console.error('usage: pnpm -s exec tsx scripts/debug/comparePc2lineFunction.ts <ts.qbc> <wasm.qbc> [funcPath]')
  process.exit(2)
}

const tsMod = parseBytecodeModule(fs.readFileSync(tsQbc))
const wasmMod = parseBytecodeModule(fs.readFileSync(wasmQbc))

const tsFunc = getByPath(tsMod.func, funcPath)
const wasmFunc = getByPath(wasmMod.func, funcPath)

if (!tsFunc || !wasmFunc) {
  console.error('could not resolve function at path', funcPath)
  process.exit(2)
}

const tsPc2: Uint8Array = tsFunc.debug?.pc2line ?? new Uint8Array()
const wasmPc2: Uint8Array = wasmFunc.debug?.pc2line ?? new Uint8Array()

const tsEntries = decodePc2line(tsPc2)
const wasmEntries = decodePc2line(wasmPc2)

let firstDiff = -1
const n = Math.min(tsEntries.length, wasmEntries.length)
for (let i = 0; i < n; i++) {
  const a = tsEntries[i]
  const b = wasmEntries[i]
  if (a.pc !== b.pc || a.line !== b.line || a.column !== b.column) {
    firstDiff = i
    break
  }
}
if (firstDiff === -1 && tsEntries.length !== wasmEntries.length) firstDiff = n

console.log(JSON.stringify({
  funcPath,
  funcName: tsFunc.funcName ?? null,
  bytecodeLen: tsFunc.bytecodeLen ?? tsFunc.bytecode?.length ?? null,
  ts: { pc2lineBytes: tsPc2.length, pc2lineEntries: tsEntries.length },
  wasm: { pc2lineBytes: wasmPc2.length, pc2lineEntries: wasmEntries.length },
  firstDiff,
}, null, 2))

if (firstDiff !== -1) {
  console.log('\n--- TS snippet ---')
  console.log(snippet(tsEntries, Math.min(firstDiff, Math.max(0, tsEntries.length - 1))))
  console.log('\n--- WASM snippet ---')
  console.log(snippet(wasmEntries, Math.min(firstDiff, Math.max(0, wasmEntries.length - 1))))
}
