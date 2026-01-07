#!/usr/bin/env tsx

import fs from 'node:fs'
import path from 'node:path'
import { parseBytecodeModule } from '../../src/bytecodeReader'

type Mismatch = {
  fixturePath: string
  deltaText: string
}

type DiffKind =
  | 'bytecode_len'
  | 'bytecode_bytes'
  | 'pc2line'
  | 'source'
  | 'atoms'
  | 'atoms_content'
  | 'cpool'
  | 'module_header'
  | 'cpool_meta'
  | 'unknown'

type MismatchAnalysis = {
  fixturePath: string
  artifactKey: string
  baseName: string
  deltaText: string
  tsQbcPath?: string
  wasmQbcPath?: string
  kinds: DiffKind[]
  details: Record<string, unknown>
}

function artifactKeyFromRelativeName(relativeName: string): string {
  return relativeName
    .replace(/\\/g, '/')
    .replace(/\.ts$/i, '')
    .replace(/\//g, '__')
    .replace(/[^a-zA-Z0-9_.-]+/g, '_')
}

function readLogMismatches(logPath: string): Mismatch[] {
  const text = fs.readFileSync(logPath, 'utf8')
  const out: Mismatch[] = []
  for (const line of text.split(/\r?\n/)) {
    // Example line (emoji prefix may vary by platform/encoding):
    // ⚠️  __tests__/fixtures/test_try_catch7.ts — Δ+3 bytes (+0.47%), trace OK
    // We parse by the stable separator: " — Δ".
    const sep = '— Δ'
    const idx = line.indexOf(sep)
    if (idx < 0) continue
    const left = line.slice(0, idx).trim()
    const right = 'Δ' + line.slice(idx + sep.length).trim()

    // left might be like "⚠️  __tests__/fixtures/..." or just "__tests__/fixtures/..."
    let fixturePath = left.replace(/^\s*[^_a-zA-Z0-9./-]+\s*/, '').trim()
    // 日志在某些终端宽度下可能会出现换行/不可见空白；路径不应包含任何空白。
    fixturePath = fixturePath.replace(/\s+/g, '')
    if (!fixturePath) continue
    out.push({ fixturePath, deltaText: right })
  }
  return out
}

function firstDiffIndex(a: Uint8Array, b: Uint8Array): number {
  const n = Math.min(a.length, b.length)
  for (let i = 0; i < n; i++) {
    if (a[i] !== b[i]) return i
  }
  return a.length === b.length ? -1 : n
}

function bytesEqual(a?: Uint8Array, b?: Uint8Array): boolean {
  if (!a || !b) return false
  if (a.length !== b.length) return false
  return firstDiffIndex(a, b) === -1
}

function isUint8Array(v: any): v is Uint8Array {
  return v instanceof Uint8Array
}

function isPlainObject(v: any): v is Record<string, any> {
  return v !== null && typeof v === 'object' && !Array.isArray(v) && !isUint8Array(v)
}

function previewBytes(u8: Uint8Array, start: number, count: number): string {
  const end = Math.min(u8.length, start + count)
  const slice = u8.slice(start, end)
  return Array.from(slice)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(' ')
}

function structuralFirstDiff(a: any, b: any): { path: string; a: unknown; b: unknown; note?: string } | null {
  function walk(x: any, y: any, p: string, seen: Set<any>): any {
    if (x === y) return null
    const tx = typeof x
    const ty = typeof y
    if (tx !== ty) return { path: p, a: x, b: y, note: `type ${tx} vs ${ty}` }
    if (x === null || y === null) return { path: p, a: x, b: y }
    if (isUint8Array(x) && isUint8Array(y)) {
      const di = firstDiffIndex(x, y)
      if (di === -1) return null
      return {
        path: p,
        a: { len: x.length, firstDiff: di, bytes: previewBytes(x, Math.max(0, di - 8), 32) },
        b: { len: y.length, firstDiff: di, bytes: previewBytes(y, Math.max(0, di - 8), 32) },
        note: 'Uint8Array differs',
      }
    }
    if (Array.isArray(x) && Array.isArray(y)) {
      if (x.length !== y.length) return { path: p + '.length', a: x.length, b: y.length }
      for (let i = 0; i < x.length; i++) {
        const d = walk(x[i], y[i], `${p}[${i}]`, seen)
        if (d) return d
      }
      return null
    }
    if (isPlainObject(x) && isPlainObject(y)) {
      if (seen.has(x) || seen.has(y)) return null
      seen.add(x)
      seen.add(y)
      const xKeys = Object.keys(x).sort()
      const yKeys = Object.keys(y).sort()
      if (xKeys.length !== yKeys.length) return { path: p + '.keys', a: xKeys, b: yKeys }
      for (let i = 0; i < xKeys.length; i++) {
        if (xKeys[i] !== yKeys[i]) return { path: p + '.keys', a: xKeys, b: yKeys }
      }
      for (const k of xKeys) {
        const d = walk(x[k], y[k], p ? `${p}.${k}` : k, seen)
        if (d) return d
      }
      return null
    }
    return { path: p, a: x, b: y }
  }

  return walk(a, b, 'root', new Set())
}

function analyzeOne(artifactsDir: string, mismatch: Mismatch): MismatchAnalysis {
  const rel = mismatch.fixturePath
  const baseName = path.basename(rel, path.extname(rel))
  const artifactKey = artifactKeyFromRelativeName(rel)

  const tsQbcPath = path.join(artifactsDir, artifactKey, 'bytecode', `${baseName}.ts.qbc`)
  const wasmQbcPath = path.join(artifactsDir, artifactKey, 'bytecode', `${baseName}.wasm.qbc`)

  const details: Record<string, unknown> = {}
  const kinds = new Set<DiffKind>()

  if (!fs.existsSync(tsQbcPath) || !fs.existsSync(wasmQbcPath)) {
    kinds.add('unknown')
    details.missing = {
      tsExists: fs.existsSync(tsQbcPath),
      wasmExists: fs.existsSync(wasmQbcPath),
    }
    return { fixturePath: rel, artifactKey, baseName, deltaText: mismatch.deltaText, tsQbcPath, wasmQbcPath, kinds: Array.from(kinds), details }
  }

  const tsFile = fs.readFileSync(tsQbcPath)
  const wasmFile = fs.readFileSync(wasmQbcPath)
  details.qbcSize = { ts: tsFile.length, wasm: wasmFile.length }
  const qbcFirstDiff = firstDiffIndex(tsFile, wasmFile)
  if (qbcFirstDiff !== -1) {
    details.qbcFirstDiff = {
      index: qbcFirstDiff,
      ts: { bytes: previewBytes(tsFile, Math.max(0, qbcFirstDiff - 8), 32) },
      wasm: { bytes: previewBytes(wasmFile, Math.max(0, qbcFirstDiff - 8), 32) },
    }
  }

  let tsMod: any
  let wasmMod: any
  try {
    tsMod = parseBytecodeModule(tsFile)
    wasmMod = parseBytecodeModule(wasmFile)
  } catch (e) {
    kinds.add('unknown')
    details.parseError = String((e as any)?.message ?? e)
    return { fixturePath: rel, artifactKey, baseName, deltaText: mismatch.deltaText, tsQbcPath, wasmQbcPath, kinds: Array.from(kinds), details }
  }

  const tsFunc = tsMod.func
  const wasmFunc = wasmMod.func

  details.root = {
    atoms: { ts: tsMod.atoms?.length ?? null, wasm: wasmMod.atoms?.length ?? null },
    bytecodeLen: { ts: tsFunc?.bytecodeLen ?? null, wasm: wasmFunc?.bytecodeLen ?? null },
    cpoolCount: { ts: tsFunc?.cpoolCount ?? null, wasm: wasmFunc?.cpoolCount ?? null },
    hasDebug: { ts: !!tsFunc?.debug, wasm: !!wasmFunc?.debug },
    pc2lineLen: {
      ts: (tsFunc?.debug?.pc2line as Uint8Array | undefined)?.length ?? 0,
      wasm: (wasmFunc?.debug?.pc2line as Uint8Array | undefined)?.length ?? 0,
    },
    sourceLen: {
      ts: typeof tsFunc?.debug?.source === 'string' ? tsFunc.debug.source.length : (tsFunc?.debug?.source as Uint8Array | undefined)?.length ?? 0,
      wasm: typeof wasmFunc?.debug?.source === 'string' ? wasmFunc.debug.source.length : (wasmFunc?.debug?.source as Uint8Array | undefined)?.length ?? 0,
    },
  }

  if ((tsFunc?.bytecodeLen ?? -1) !== (wasmFunc?.bytecodeLen ?? -1)) {
    kinds.add('bytecode_len')
  } else {
    const a = tsFunc?.bytecode as Uint8Array | undefined
    const b = wasmFunc?.bytecode as Uint8Array | undefined
    if (a && b && !bytesEqual(a, b)) {
      kinds.add('bytecode_bytes')
      details.bytecodeFirstDiff = firstDiffIndex(a, b)
    }
  }

  const tsPc2 = tsFunc?.debug?.pc2line as Uint8Array | undefined
  const wasmPc2 = wasmFunc?.debug?.pc2line as Uint8Array | undefined
  if (tsPc2 && wasmPc2 && !bytesEqual(tsPc2, wasmPc2)) {
    kinds.add('pc2line')
    details.pc2lineFirstDiff = firstDiffIndex(tsPc2, wasmPc2)
  }

  const tsSrc = tsFunc?.debug?.source
  const wasmSrc = wasmFunc?.debug?.source
  if (tsSrc != null && wasmSrc != null) {
    const tsText = typeof tsSrc === 'string' ? tsSrc : new TextDecoder('utf-8').decode(tsSrc)
    const wasmText = typeof wasmSrc === 'string' ? wasmSrc : new TextDecoder('utf-8').decode(wasmSrc)
    if (tsText !== wasmText) {
      kinds.add('source')
      details.source = {
        tsLines: tsText.split('\n').length,
        wasmLines: wasmText.split('\n').length,
      }
    }
  }

  if ((tsMod.atoms?.length ?? -1) !== (wasmMod.atoms?.length ?? -1)) {
    kinds.add('atoms')
  }

  // If atom counts match, still check content differences (strings/ids).
  if (!kinds.has('atoms') && Array.isArray(tsMod.atoms) && Array.isArray(wasmMod.atoms)) {
    if (tsMod.atoms.length === wasmMod.atoms.length) {
      for (let i = 0; i < tsMod.atoms.length; i++) {
        if (tsMod.atoms[i] !== wasmMod.atoms[i]) {
          kinds.add('atoms_content')
          details.atomFirstDiff = { index: i, ts: tsMod.atoms[i], wasm: wasmMod.atoms[i] }
          break
        }
      }
    }
  }

  // Meta differences (even if bytecode identical)
  const metaKeys: Array<keyof typeof tsFunc> = ['argCount', 'varCount', 'stackSize', 'closureVarCount', 'definedArgCount'] as any
  const metaDiff: Record<string, { ts: unknown; wasm: unknown }> = {}
  for (const k of metaKeys) {
    const ta = (tsFunc as any)?.[k]
    const wa = (wasmFunc as any)?.[k]
    if (ta !== wa) metaDiff[String(k)] = { ts: ta, wasm: wa }
  }
  if (Object.keys(metaDiff).length > 0) {
    kinds.add('cpool_meta')
    details.metaDiff = metaDiff
  }

  // Structural diff (first mismatch path) to classify the remaining "unknown" cases.
  if (kinds.size === 0) {
    const d = structuralFirstDiff(tsMod, wasmMod)
    if (d) {
      details.firstDiff = d
      if (d.path.includes('.atoms[')) {
        kinds.add('atoms_content')
      } else if (d.path.includes('.func.cpool') || d.path.includes('.cpool')) {
        kinds.add('cpool')
      } else if (d.path.includes('.func.debug') || d.path.includes('.debug')) {
        kinds.add('pc2line')
      } else if (d.path.startsWith('root.') && !d.path.includes('.func')) {
        kinds.add('module_header')
      } else {
        kinds.add('unknown')
      }
    }
  }

  if (kinds.size === 0) kinds.add('unknown')

  return { fixturePath: rel, artifactKey, baseName, deltaText: mismatch.deltaText, tsQbcPath, wasmQbcPath, kinds: Array.from(kinds), details }
}

async function main() {
  const args = process.argv.slice(2)
  const logPath = args[0] || '/tmp/compare_fixtures_full.log'
  const artifactsDir = args[1] || 'artifacts'

  const limitFlag = args.indexOf('--limit')
  const limit = limitFlag >= 0 ? Number(args[limitFlag + 1]) : undefined

  const filterFlag = args.indexOf('--filter')
  const filter = filterFlag >= 0 ? String(args[filterFlag + 1] ?? '') : ''

  let mismatches = readLogMismatches(logPath)
  if (mismatches.length === 0) {
    console.error('No mismatches found in log:', logPath)
    process.exitCode = 1
    return
  }

  if (filter) {
    mismatches = mismatches.filter((m) => m.fixturePath.includes(filter))
  }

  if (Number.isFinite(limit as any) && (limit as number) > 0) {
    mismatches = mismatches.slice(0, limit as number)
  }

  const analyses = mismatches.map((m) => analyzeOne(artifactsDir, m))

  const byKind = new Map<DiffKind, number>()
  for (const a of analyses) {
    for (const k of a.kinds) byKind.set(k, (byKind.get(k) ?? 0) + 1)
  }

  const kindRows = Array.from(byKind.entries()).sort((a, b) => b[1] - a[1])

  console.log('\n=== Mismatch Kind Totals ===')
  for (const [k, n] of kindRows) console.log(String(n).padStart(4), k)

  // Print a compact table for quick scanning
  console.log('\n=== Mismatches (compact) ===')
  for (const a of analyses) {
    console.log(`${a.fixturePath}\t${a.kinds.join(',')}\t${a.deltaText}`)
  }

  const outPath = path.resolve(artifactsDir, 'mismatch-analysis.json')
  fs.writeFileSync(outPath, JSON.stringify({ logPath, artifactsDir, analyses }, null, 2), 'utf8')
  console.log(`\nWrote: ${outPath}`)
}

main().catch((e) => {
  console.error(e)
  process.exitCode = 1
})
