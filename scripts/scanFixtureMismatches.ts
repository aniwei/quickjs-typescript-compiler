#!/usr/bin/env tsx

/**
 * 扫描 artifacts/ 下的所有 fixture，对 TS 编译器输出与 QuickJS WASM 输出进行结构级别对比。
 *
 * 输出：
 * - artifacts/_scan_mismatches.json
 * - artifacts/_scan_mismatches.latest.txt
 * - artifacts/mismatch-structure-summary.json
 */

import fs from 'node:fs/promises'
import path from 'node:path'

import { parseBytecodeModule } from '../src/bytecodeReader'
import { safeJsonStringify } from './utils/safeJson'

type DiffTag = 'debug' | 'semantics' | 'scope' | 'func-meta' | 'error'

type DiffItem = {
  path: string
  kind: 'bytes' | 'number' | 'json' | 'text'
  summary: string
}

type MismatchEntry = {
  fixture: string
  tsSize: number
  wasmSize: number
  delta: number
  tags: DiffTag[]
  diffs: DiffItem[]
  error?: { message: string }
}

function toHexPrefix(bytes: Uint8Array, max = 24): string {
  const head = bytes.subarray(0, Math.min(max, bytes.length))
  const s = Array.from(head).map((b) => b.toString(16).padStart(2, '0')).join(' ')
  return bytes.length > head.length ? `${s} …` : s
}

function eqBytes(a?: Uint8Array, b?: Uint8Array): boolean {
  if (a === b) return true
  if (!a || !b) return false
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
}

function jsonLike(v: unknown): unknown {
  if (typeof v === 'bigint') return `${v.toString()}n`
  if (v instanceof Uint8Array) return { __type: 'Uint8Array', length: v.length }
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(v)) return { __type: 'Buffer', length: v.length }
  if (Array.isArray(v)) return v.map(jsonLike)
  if (v && typeof v === 'object') {
    const out: Record<string, unknown> = {}
    for (const k of Object.keys(v as any).sort()) out[k] = jsonLike((v as any)[k])
    return out
  }
  return v
}

function addTag(set: Set<DiffTag>, tag: DiffTag) {
  set.add(tag)
}

function compareFunctionLike(
  diffs: DiffItem[],
  tags: Set<DiffTag>,
  a: any,
  b: any,
  basePath: string,
) {
  const numFields: Array<[string, DiffTag]> = [
    ['flags', 'func-meta'],
    ['jsMode', 'func-meta'],
    ['funcNameAtom', 'func-meta'],
    ['argCount', 'scope'],
    ['varCount', 'scope'],
    ['definedArgCount', 'scope'],
    ['stackSize', 'func-meta'],
    ['closureVarCount', 'scope'],
    ['cpoolCount', 'func-meta'],
    ['bytecodeLen', 'semantics'],
  ]

  for (const [k, tag] of numFields) {
    if ((a?.[k] ?? null) !== (b?.[k] ?? null)) {
      addTag(tags, tag)
      diffs.push({
        path: `${basePath}.${k}`,
        kind: 'number',
        summary: `${k} TS=${a?.[k]} WASM=${b?.[k]}`,
      })
    }
  }

  if (!eqBytes(a?.bytecode, b?.bytecode)) {
    addTag(tags, 'semantics')
    const ta: Uint8Array = a?.bytecode ?? new Uint8Array()
    const tb: Uint8Array = b?.bytecode ?? new Uint8Array()
    diffs.push({
      path: `${basePath}.bytecode`,
      kind: 'bytes',
      summary: `bytecode differ (TS ${ta.length} bytes: ${toHexPrefix(ta)} vs WASM ${tb.length} bytes: ${toHexPrefix(tb)})`,
    })
  }

  const varDefsA = jsonLike(a?.varDefs ?? [])
  const varDefsB = jsonLike(b?.varDefs ?? [])
  if (safeJsonStringify(varDefsA) !== safeJsonStringify(varDefsB)) {
    addTag(tags, 'scope')
    diffs.push({
      path: `${basePath}.varDefs`,
      kind: 'json',
      summary: `varDefs differ (TS=${(a?.varDefs ?? []).length}, WASM=${(b?.varDefs ?? []).length})`,
    })
  }

  const closureVarsA = jsonLike(a?.closureVars ?? [])
  const closureVarsB = jsonLike(b?.closureVars ?? [])
  if (safeJsonStringify(closureVarsA) !== safeJsonStringify(closureVarsB)) {
    addTag(tags, 'scope')
    diffs.push({
      path: `${basePath}.closureVars`,
      kind: 'json',
      summary: `closureVars differ (TS=${(a?.closureVars ?? []).length}, WASM=${(b?.closureVars ?? []).length})`,
    })
  }

  // Debug info
  if ((a?.hasDebug ?? false) !== (b?.hasDebug ?? false)) {
    addTag(tags, 'debug')
    diffs.push({
      path: `${basePath}.hasDebug`,
      kind: 'text',
      summary: `hasDebug TS=${a?.hasDebug} WASM=${b?.hasDebug}`,
    })
  }

  if (a?.hasDebug && b?.hasDebug) {
    if ((a?.debug?.filenameAtom ?? null) !== (b?.debug?.filenameAtom ?? null)) {
      addTag(tags, 'debug')
      diffs.push({
        path: `${basePath}.debug.filenameAtom`,
        kind: 'number',
        summary: `filenameAtom TS=${a?.debug?.filenameAtom} WASM=${b?.debug?.filenameAtom}`,
      })
    }
    if (!eqBytes(a?.debug?.pc2line, b?.debug?.pc2line)) {
      addTag(tags, 'debug')
      const pa: Uint8Array = a?.debug?.pc2line ?? new Uint8Array()
      const pb: Uint8Array = b?.debug?.pc2line ?? new Uint8Array()
      diffs.push({
        path: `${basePath}.debug.pc2line`,
        kind: 'bytes',
        summary: `pc2line differ (TS ${pa.length} bytes: ${toHexPrefix(pa)} vs WASM ${pb.length} bytes: ${toHexPrefix(pb)})`,
      })
    }
    if (!eqBytes(a?.debug?.source, b?.debug?.source)) {
      addTag(tags, 'debug')
      const sa: Uint8Array = a?.debug?.source ?? new Uint8Array()
      const sb: Uint8Array = b?.debug?.source ?? new Uint8Array()
      diffs.push({
        path: `${basePath}.debug.source`,
        kind: 'bytes',
        summary: `source differ (TS ${sa.length} bytes vs WASM ${sb.length} bytes)`,
      })
    }
  }

  // Recurse nested functions in cpool (QuickJS tag 12 => function bytecode)
  const cpA: any[] = Array.isArray(a?.cpool) ? a.cpool : []
  const cpB: any[] = Array.isArray(b?.cpool) ? b.cpool : []
  const max = Math.max(cpA.length, cpB.length)
  for (let i = 0; i < max; i++) {
    const ea = cpA[i]
    const eb = cpB[i]
    const isFuncA = ea && typeof ea === 'object' && (ea as any).tag === 12
    const isFuncB = eb && typeof eb === 'object' && (eb as any).tag === 12
    if (isFuncA || isFuncB) {
      if (!isFuncA || !isFuncB) {
        addTag(tags, 'semantics')
        diffs.push({
          path: `${basePath}.cpool[${i}]`,
          kind: 'text',
          summary: `cpool[${i}] function presence differ (TS=${!!isFuncA} WASM=${!!isFuncB})`,
        })
        continue
      }
      compareFunctionLike(diffs, tags, ea, eb, `${basePath}.cpool[${i}](func)`)
    }
  }
}

async function listArtifactFixtureDirs(artifactsDir: string): Promise<{ fixtureDirs: string[]; skipped: string[] }> {
  const ents = await fs.readdir(artifactsDir, { withFileTypes: true })
  const fixtureDirs: string[] = []
  const skipped: string[] = []
  for (const ent of ents) {
    if (!ent.isDirectory()) continue
    if (ent.name.startsWith('_') || ent.name.startsWith('.')) {
      skipped.push(ent.name)
      continue
    }
    fixtureDirs.push(ent.name)
  }
  fixtureDirs.sort()
  return { fixtureDirs, skipped }
}

type Pair = {
  fixture: string
  tsPath: string
  wasmPath: string
}

async function walk(dir: string): Promise<string[]> {
  const out: string[] = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const ent of entries) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      out.push(...(await walk(p)))
    } else {
      out.push(p)
    }
  }
  return out
}

async function listFilesOneLevel(dir: string): Promise<string[]> {
  const out: string[] = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const ent of entries) {
    if (!ent.isFile()) continue
    out.push(path.join(dir, ent.name))
  }
  return out
}

function fixtureFromQbcFilename(filename: string): { fixture: string; kind: 'ts' | 'wasm' } | null {
  if (filename.endsWith('.ts.qbc')) return { fixture: filename.slice(0, -'.ts.qbc'.length), kind: 'ts' }
  if (filename.endsWith('.wasm.qbc')) return { fixture: filename.slice(0, -'.wasm.qbc'.length), kind: 'wasm' }
  return null
}

async function findPairs(artifactsDir: string, options: { rootOnly: boolean }): Promise<Pair[]> {
  const allFiles = options.rootOnly ? await listFilesOneLevel(artifactsDir) : await walk(artifactsDir)
  const tsByFixture = new Map<string, string[]>()
  const wasmByFixture = new Map<string, string[]>()

  for (const p of allFiles) {
    const base = path.basename(p)
    const parsed = fixtureFromQbcFilename(base)
    if (!parsed) continue

    const target = parsed.kind === 'ts' ? tsByFixture : wasmByFixture
    const arr = target.get(parsed.fixture) ?? []
    arr.push(p)
    target.set(parsed.fixture, arr)
  }

  const rankPath = (p: string): [number, number, string] => {
    const normalized = p.split(path.sep).join('/')
    // Prefer guardrail outputs under */bytecode/ (they reflect latest compareAllFixtures runs),
    // then fall back to other locations.
    const rank = normalized.includes('/bytecode/') ? 0 : 1
    return [rank, normalized.length, normalized]
  }

  const pickBest = (paths: string[]): string => {
    return [...paths].sort((a, b) => {
      const ra = rankPath(a)
      const rb = rankPath(b)
      if (ra[0] !== rb[0]) return ra[0] - rb[0]
      if (ra[1] !== rb[1]) return ra[1] - rb[1]
      return ra[2].localeCompare(rb[2])
    })[0]
  }

  const pairs: Pair[] = []
  for (const [fixture, tsPaths] of tsByFixture) {
    const wasmPaths = wasmByFixture.get(fixture)
    if (!wasmPaths) continue
    pairs.push({ fixture, tsPath: pickBest(tsPaths), wasmPath: pickBest(wasmPaths) })
  }

  pairs.sort((a, b) => a.fixture.localeCompare(b.fixture))
  return pairs
}

async function main() {
  const repoRoot = path.resolve(__dirname, '..')
  const defaultArtifactsRoot = path.join(repoRoot, 'artifacts')

  const argIdx = process.argv.indexOf('--artifacts-dir')
  const argVal = argIdx >= 0 ? process.argv[argIdx + 1] : undefined
  const scanRoot = argVal ? path.resolve(process.cwd(), argVal) : defaultArtifactsRoot
  const rootOnly = process.argv.includes('--root-only') || !process.argv.includes('--recursive')

  const { skipped } = await listArtifactFixtureDirs(scanRoot)
  const pairs = await findPairs(scanRoot, { rootOnly })

  const mismatches: MismatchEntry[] = []
  let identical = 0
  let total = 0

  for (const pair of pairs) {
    const fixture = pair.fixture
    const tsPath = pair.tsPath
    const wasmPath = pair.wasmPath
    try {
      const [tsBuf, wasmBuf] = await Promise.all([fs.readFile(tsPath), fs.readFile(wasmPath)])
      total += 1

      const tsBytes = new Uint8Array(tsBuf)
      const wasmBytes = new Uint8Array(wasmBuf)
      const delta = tsBytes.length - wasmBytes.length

      if (eqBytes(tsBytes, wasmBytes)) {
        identical += 1
        continue
      }

      // structure-level diff
      const diffs: DiffItem[] = []
      const tags = new Set<DiffTag>()

      const tsMod = parseBytecodeModule(tsBytes)
      const wasmMod = parseBytecodeModule(wasmBytes)

      if (tsMod.version !== wasmMod.version) {
        addTag(tags, 'func-meta')
        diffs.push({ path: 'module.version', kind: 'number', summary: `version TS=${tsMod.version} WASM=${wasmMod.version}` })
      }

      // atoms
      if (tsMod.atoms.length !== wasmMod.atoms.length) {
        addTag(tags, 'func-meta')
        diffs.push({
          path: 'module.atoms.length',
          kind: 'number',
          summary: `atoms length differ (TS=${tsMod.atoms.length}, WASM=${wasmMod.atoms.length})`,
        })
      }

      compareFunctionLike(diffs, tags, tsMod.func, wasmMod.func, 'func')

      const entry: MismatchEntry = {
        fixture,
        tsSize: tsBytes.length,
        wasmSize: wasmBytes.length,
        delta,
        tags: [...tags].sort(),
        diffs,
      }

      mismatches.push(entry)
    } catch (err: any) {
      total += 1
      mismatches.push({
        fixture,
        tsSize: -1,
        wasmSize: -1,
        delta: 0,
        tags: ['error'],
        diffs: [{ path: 'error', kind: 'text', summary: String(err?.message ?? err) }],
        error: { message: String(err?.message ?? err) },
      })
    }
  }

  const tagCounts = new Map<DiffTag, number>()
  for (const m of mismatches) {
    for (const t of m.tags) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)
  }

  // Write JSON summary
  const jsonOutPath = path.join(scanRoot, '_scan_mismatches.json')
  await fs.writeFile(jsonOutPath, safeJsonStringify({
    scanRoot,
    skippedNonFixtureDirs: skipped,
    totalFixtures: total,
    identical,
    mismatched: mismatches.length,
    mismatchTags: Object.fromEntries([...tagCounts.entries()].sort((a, b) => b[1] - a[1])),
    mismatches,
  }, { pretty: true }), 'utf8')

  // Write human readable text summary
  const lines: string[] = []
  lines.push(`Artifacts: ${scanRoot}`)
  lines.push(`Skipped non-fixture dirs: ${skipped.length}`)
  lines.push(`Mode: ${rootOnly ? 'root-only' : 'recursive'}`)
  lines.push(`Total fixtures: ${total}`)
  lines.push(`Identical: ${identical}`)
  lines.push(`Mismatched: ${mismatches.length}`)
  lines.push('')
  lines.push('Mismatch tags:')
  for (const [k, v] of [...tagCounts.entries()].sort((a, b) => b[1] - a[1])) {
    lines.push(`  - ${k}: ${v}`)
  }
  lines.push('')

  for (const m of mismatches.sort((a, b) => a.fixture.localeCompare(b.fixture))) {
    lines.push(`- ${m.fixture}: TS=${m.tsSize} WASM=${m.wasmSize} Δ${m.delta >= 0 ? '+' : ''}${m.delta} tags=${m.tags.join(',')}`)
    for (const d of m.diffs.slice(0, 4)) {
      lines.push(`    * ${d.path}: ${d.summary}`)
    }
    if (m.diffs.length > 4) {
      lines.push(`    * … (${m.diffs.length - 4} more diffs)`) 
    }
  }
  lines.push('')
  lines.push('Wrote artifacts/mismatch-structure-summary.json')
  lines.push('')

  const txtOutPath = path.join(scanRoot, '_scan_mismatches.latest.txt')
  await fs.writeFile(txtOutPath, lines.join('\n'), 'utf8')

  const structureSummaryPath = path.join(scanRoot, 'mismatch-structure-summary.json')
  await fs.writeFile(structureSummaryPath, safeJsonStringify({ mismatches }, { pretty: true }), 'utf8')

  console.log(lines.join('\n'))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
