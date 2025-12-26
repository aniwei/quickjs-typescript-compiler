#!/usr/bin/env tsx

import fs from 'node:fs'
import path from 'node:path'
import { parseBytecodeModule, type FunctionBytecode } from '../../src/bytecodeReader'

type OpcodeInfo = {
  name: string
  code: number
  size: number
  fmt: number
  nPop: number
  nPush: number
}

type DecodedOp = {
  pc: number
  code: number
  name: string
  size: number
  bytes: Uint8Array
}

function hex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(' ')
}

function loadOpcodeMap(): Map<number, OpcodeInfo> {
  const p = path.resolve('opcodes.json')
  const raw = fs.readFileSync(p, 'utf8')
  const list = JSON.parse(raw) as OpcodeInfo[]
  const map = new Map<number, OpcodeInfo>()
  for (const op of list) map.set(op.code, op)
  return map
}

function decodeBytecode(bytecode: Uint8Array, opcodeMap: Map<number, OpcodeInfo>): DecodedOp[] {
  const out: DecodedOp[] = []
  let pc = 0
  while (pc < bytecode.length) {
    const code = bytecode[pc]
    const info = opcodeMap.get(code)
    const size = info?.size ?? 1
    const bytes = bytecode.slice(pc, Math.min(bytecode.length, pc + size))
    out.push({
      pc,
      code,
      name: info?.name ?? `unknown_0x${code.toString(16)}`,
      size,
      bytes,
    })
    pc += size
  }
  return out
}

function getInnerFunc(mod: any, cpoolIndex: number): FunctionBytecode {
  const f = mod.func.cpool?.[cpoolIndex]
  if (!f || typeof f !== 'object' || (f as any).tag !== 12) {
    throw new Error(`Expected func.cpool[${cpoolIndex}] to be a function (tag=12)`)
  }
  return f as FunctionBytecode
}

function findFirstOpDiff(a: DecodedOp[], b: DecodedOp[]): number {
  const n = Math.min(a.length, b.length)
  for (let i = 0; i < n; i++) {
    if (a[i].code !== b[i].code) return i
    if (a[i].size !== b[i].size) return i
    if (hex(a[i].bytes) !== hex(b[i].bytes)) return i
  }
  if (a.length !== b.length) return n
  return -1
}

function main() {
  const tsPath = process.argv[2]
  const wasmPath = process.argv[3]
  const cpoolIndex = process.argv[4] ? Number(process.argv[4]) : 0
  const context = process.argv[5] ? Number(process.argv[5]) : 12

  if (!tsPath || !wasmPath) {
    console.error('Usage: tsx scripts/debug/decodeFunctionBytecode.ts <ts.qbc> <wasm.qbc> [cpoolIndex=0] [context=12]')
    process.exit(1)
  }

  const opcodeMap = loadOpcodeMap()

  const tsMod = parseBytecodeModule(fs.readFileSync(tsPath))
  const wasmMod = parseBytecodeModule(fs.readFileSync(wasmPath))

  const tsFunc = getInnerFunc(tsMod, cpoolIndex)
  const wasmFunc = getInnerFunc(wasmMod, cpoolIndex)

  const tsOps = decodeBytecode(tsFunc.bytecode, opcodeMap)
  const wasmOps = decodeBytecode(wasmFunc.bytecode, opcodeMap)

  const diffIdx = findFirstOpDiff(tsOps, wasmOps)

  console.log(JSON.stringify({
    ts: { file: tsPath, cpoolIndex, funcName: tsFunc.funcName, funcNameAtom: tsFunc.funcNameAtom, bytecodeLen: tsFunc.bytecodeLen, stackSize: tsFunc.stackSize, opCount: tsOps.length },
    wasm: { file: wasmPath, cpoolIndex, funcName: wasmFunc.funcName, funcNameAtom: wasmFunc.funcNameAtom, bytecodeLen: wasmFunc.bytecodeLen, stackSize: wasmFunc.stackSize, opCount: wasmOps.length },
    firstOpDiffIndex: diffIdx,
  }, null, 2))

  if (diffIdx < 0) {
    console.log('No differences found at opcode granularity.')
    return
  }

  const start = Math.max(0, diffIdx - context)
  const end = Math.max(diffIdx + context, start + 1)

  console.log('\n--- TS ops (around diff) ---')
  for (let i = start; i < Math.min(tsOps.length, end); i++) {
    const o = tsOps[i]
    const mark = i === diffIdx ? '>>' : '  '
    console.log(`${mark} [${i.toString().padStart(4)}] pc=${o.pc.toString().padStart(4)} op=0x${o.code.toString(16).padStart(2, '0')} ${o.name.padEnd(24)} size=${o.size} bytes=${hex(o.bytes)}`)
  }

  console.log('\n--- WASM ops (around diff) ---')
  for (let i = start; i < Math.min(wasmOps.length, end); i++) {
    const o = wasmOps[i]
    const mark = i === diffIdx ? '>>' : '  '
    console.log(`${mark} [${i.toString().padStart(4)}] pc=${o.pc.toString().padStart(4)} op=0x${o.code.toString(16).padStart(2, '0')} ${o.name.padEnd(24)} size=${o.size} bytes=${hex(o.bytes)}`)
  }
}

main()
