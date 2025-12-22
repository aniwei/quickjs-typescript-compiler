#!/usr/bin/env tsx

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { parseBytecodeModule, FunctionBytecode, VarDef, ClosureVar } from '../src/bytecodeReader'

type DiffKind =
  | 'module.version'
  | 'module.atoms'
  | 'func.flags'
  | 'func.jsMode'
  | 'func.funcNameAtom'
  | 'func.signature'
  | 'func.varDefs'
  | 'func.closureVars'
  | 'func.bytecode'
  | 'func.debug.present'
  | 'func.debug.filenameAtom'
  | 'func.debug.pc2line'
  | 'func.debug.source'
  | 'func.cpool.count'
  | 'func.cpool.itemTag'
  | 'func.cpool.nestedFunc'

interface Diff {
  kind: DiffKind
  path: string
  details: string
}

function bytesEqual(a?: Uint8Array, b?: Uint8Array): boolean {
  if (!a || !b) return a === b
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

function summarizeBytes(buf: Uint8Array, max = 16): string {
  const head = [...buf.slice(0, max)].map((x) => x.toString(16).padStart(2, '0')).join(' ')
  return `${buf.length} bytes: ${head}${buf.length > max ? ' …' : ''}`
}

function safeStringify(v: unknown): string {
  // JSON.stringify() does not support BigInt.
  return JSON.stringify(v, (_key, value) => {
    if (typeof value === 'bigint') return `${value.toString()}n`
    return value
  })
}

function varDefsEqual(a: VarDef[], b: VarDef[]): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    const x = a[i]
    const y = b[i]
    if (
      x.nameAtom !== y.nameAtom ||
      x.scopeLevel !== y.scopeLevel ||
      x.scopeNextPlus1 !== y.scopeNextPlus1 ||
      x.flags !== y.flags
    ) {
      return false
    }
  }
  return true
}

function closureVarsEqual(a: ClosureVar[], b: ClosureVar[]): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    const x = a[i]
    const y = b[i]
    if (x.nameAtom !== y.nameAtom || x.varIdx !== y.varIdx || x.flags !== y.flags) return false
  }
  return true
}

function isNestedFunc(v: unknown): v is FunctionBytecode {
  return typeof v === 'object' && v !== null && (v as any).tag === 12
}

function compareFunctions(tsFunc: FunctionBytecode, wasmFunc: FunctionBytecode, p: string): Diff[] {
  const diffs: Diff[] = []

  if (tsFunc.flags !== wasmFunc.flags) {
    diffs.push({
      kind: 'func.flags',
      path: p,
      details: `flags TS=0x${tsFunc.flags.toString(16)} WASM=0x${wasmFunc.flags.toString(16)}`,
    })
  }

  if (tsFunc.jsMode !== wasmFunc.jsMode) {
    diffs.push({
      kind: 'func.jsMode',
      path: p,
      details: `jsMode TS=${tsFunc.jsMode} WASM=${wasmFunc.jsMode}`,
    })
  }

  if (tsFunc.funcNameAtom !== wasmFunc.funcNameAtom) {
    diffs.push({
      kind: 'func.funcNameAtom',
      path: p,
      details: `funcNameAtom TS=${tsFunc.funcNameAtom}(${tsFunc.funcName ?? '<?>“'}) WASM=${wasmFunc.funcNameAtom}(${wasmFunc.funcName ?? '<?>“'})`,
    })
  }

  if (
    tsFunc.argCount !== wasmFunc.argCount ||
    tsFunc.varCount !== wasmFunc.varCount ||
    tsFunc.definedArgCount !== wasmFunc.definedArgCount ||
    tsFunc.stackSize !== wasmFunc.stackSize
  ) {
    diffs.push({
      kind: 'func.signature',
      path: p,
      details: `sig TS(arg=${tsFunc.argCount} var=${tsFunc.varCount} defArg=${tsFunc.definedArgCount} stack=${tsFunc.stackSize}) vs WASM(arg=${wasmFunc.argCount} var=${wasmFunc.varCount} defArg=${wasmFunc.definedArgCount} stack=${wasmFunc.stackSize})`,
    })
  }

  if (!varDefsEqual(tsFunc.varDefs, wasmFunc.varDefs)) {
    diffs.push({
      kind: 'func.varDefs',
      path: p,
      details: `varDefs differ (TS=${tsFunc.varDefs.length}, WASM=${wasmFunc.varDefs.length})`,
    })
  }

  if (!closureVarsEqual(tsFunc.closureVars, wasmFunc.closureVars)) {
    diffs.push({
      kind: 'func.closureVars',
      path: p,
      details: `closureVars differ (TS=${tsFunc.closureVars.length}, WASM=${wasmFunc.closureVars.length})`,
    })
  }

  if (!bytesEqual(tsFunc.bytecode, wasmFunc.bytecode)) {
    diffs.push({
      kind: 'func.bytecode',
      path: p,
      details: `bytecode differ (TS ${summarizeBytes(tsFunc.bytecode)} vs WASM ${summarizeBytes(wasmFunc.bytecode)})`,
    })
  }

  if (tsFunc.hasDebug !== wasmFunc.hasDebug) {
    diffs.push({
      kind: 'func.debug.present',
      path: p,
      details: `hasDebug TS=${tsFunc.hasDebug} WASM=${wasmFunc.hasDebug}`,
    })
  }

  if (tsFunc.hasDebug && wasmFunc.hasDebug) {
    if (tsFunc.debug!.filenameAtom !== wasmFunc.debug!.filenameAtom) {
      diffs.push({
        kind: 'func.debug.filenameAtom',
        path: p,
        details: `debug.filenameAtom TS=${tsFunc.debug!.filenameAtom}(${tsFunc.debug!.filename ?? '<?>“'}) WASM=${wasmFunc.debug!.filenameAtom}(${wasmFunc.debug!.filename ?? '<?>“'})`,
      })
    }

    if (!bytesEqual(tsFunc.debug!.pc2line, wasmFunc.debug!.pc2line)) {
      diffs.push({
        kind: 'func.debug.pc2line',
        path: p,
        details: `pc2line differ (TS ${summarizeBytes(tsFunc.debug!.pc2line)} vs WASM ${summarizeBytes(wasmFunc.debug!.pc2line)})`,
      })
    }

    const tsSrc = tsFunc.debug!.source
    const wasmSrc = wasmFunc.debug!.source
    if (!bytesEqual(tsSrc, wasmSrc)) {
      diffs.push({
        kind: 'func.debug.source',
        path: p,
        details: `debug.source differ (TS ${tsSrc ? summarizeBytes(tsSrc) : 'none'} vs WASM ${wasmSrc ? summarizeBytes(wasmSrc) : 'none'})`,
      })
    }
  }

  if (tsFunc.cpoolCount !== wasmFunc.cpoolCount) {
    diffs.push({
      kind: 'func.cpool.count',
      path: p,
      details: `cpoolCount TS=${tsFunc.cpoolCount} WASM=${wasmFunc.cpoolCount}`,
    })
  }

  const n = Math.min(tsFunc.cpool?.length ?? 0, wasmFunc.cpool?.length ?? 0)
  for (let i = 0; i < n; i++) {
    const a = tsFunc.cpool![i]
    const b = wasmFunc.cpool![i]

    const aIsF = isNestedFunc(a)
    const bIsF = isNestedFunc(b)
    if (aIsF !== bIsF) {
      diffs.push({
        kind: 'func.cpool.itemTag',
        path: `${p}.cpool[${i}]`,
        details: `cpool item type mismatch (TS ${aIsF ? 'func' : typeof a} vs WASM ${bIsF ? 'func' : typeof b})`,
      })
      continue
    }

    if (aIsF && bIsF) {
      diffs.push(...compareFunctions(a, b, `${p}.cpool[${i}](func)`))
    } else {
      // Primitive constants: compare via JSON
      const sa = safeStringify(a)
      const sb = safeStringify(b)
      if (sa !== sb) {
        diffs.push({
          kind: 'func.cpool.itemTag',
          path: `${p}.cpool[${i}]`,
          details: `cpool item mismatch TS=${sa} WASM=${sb}`,
        })
      }
    }
  }

  return diffs
}

function classify(diffs: Diff[]): string[] {
  const kinds = new Set(diffs.map((d) => d.kind))

  const tags: string[] = []
  if ([...kinds].some((k) => k.startsWith('func.debug.'))) tags.push('debug')
  if (kinds.has('func.flags') || kinds.has('func.funcNameAtom') || kinds.has('func.jsMode')) tags.push('func-meta')
  if (kinds.has('func.varDefs') || kinds.has('func.closureVars')) tags.push('scope')
  if (kinds.has('func.bytecode')) tags.push('semantics')
  if (kinds.has('func.cpool.count') || kinds.has('func.cpool.itemTag') || kinds.has('func.cpool.nestedFunc')) tags.push('cpool')

  if (tags.length === 0) tags.push('unknown')
  return tags
}

async function main() {
  const args = process.argv.slice(2)
  // Default to the main artifacts directory produced by scripts/compareAllFixtures.ts.
  // Some repos may also contain helper dirs (e.g. artifacts/_all) that don't follow
  // the per-fixture layout; we skip those.
  const artifactsRoot = args[0] ? path.resolve(args[0]) : path.resolve('artifacts')

  const entries = await fs.readdir(artifactsRoot, { withFileTypes: true })

  const results: Array<{
    fixture: string
    tsBytes: number
    wasmBytes: number
    identical: boolean
    tags: string[]
    diffs: Diff[]
  }> = []

  let skipped = 0

  for (const ent of entries) {
    if (!ent.isDirectory()) continue
    const fixture = ent.name
    const dir = path.join(artifactsRoot, fixture, 'bytecode')

    const tsQbc = path.join(dir, `${fixture}.ts.qbc`)
    const wasmQbc = path.join(dir, `${fixture}.wasm.qbc`)

    try {
      const [tsOk, wasmOk] = await Promise.all([
        fs
          .access(tsQbc)
          .then(() => true)
          .catch(() => false),
        fs
          .access(wasmQbc)
          .then(() => true)
          .catch(() => false),
      ])
      if (!tsOk || !wasmOk) {
        skipped += 1
        continue
      }

      const [tsBuf, wasmBuf] = await Promise.all([fs.readFile(tsQbc), fs.readFile(wasmQbc)])
      const tsMod = parseBytecodeModule(new Uint8Array(tsBuf))
      const wasmMod = parseBytecodeModule(new Uint8Array(wasmBuf))

      const diffs: Diff[] = []
      if (tsMod.version !== wasmMod.version) {
        diffs.push({ kind: 'module.version', path: 'module', details: `version TS=${tsMod.version} WASM=${wasmMod.version}` })
      }

      if (JSON.stringify(tsMod.atoms) !== JSON.stringify(wasmMod.atoms)) {
        diffs.push({ kind: 'module.atoms', path: 'module', details: `atoms differ (TS=${tsMod.atoms.length}, WASM=${wasmMod.atoms.length})` })
      }

      diffs.push(...compareFunctions(tsMod.func, wasmMod.func, 'func'))

      const identical = diffs.length === 0
      const tags = identical ? ['identical'] : classify(diffs)

      results.push({ fixture, tsBytes: tsBuf.length, wasmBytes: wasmBuf.length, identical, tags, diffs })
    } catch (e) {
      // If a directory looks like a fixture but is unreadable/corrupt, keep it visible.
      results.push({
        fixture,
        tsBytes: -1,
        wasmBytes: -1,
        identical: false,
        tags: ['error'],
        diffs: [{ kind: 'module.version', path: 'error', details: (e as Error).message }],
      })
    }
  }

  results.sort((a, b) => a.fixture.localeCompare(b.fixture))

  const mismatched = results.filter((r) => !r.identical)

  const tagCounts = new Map<string, number>()
  for (const r of mismatched) {
    for (const t of r.tags) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1)
  }

  console.log(`Artifacts: ${artifactsRoot}`)
  console.log(`Skipped non-fixture dirs: ${skipped}`)
  console.log(`Total fixtures: ${results.length}`)
  console.log(`Identical: ${results.length - mismatched.length}`)
  console.log(`Mismatched: ${mismatched.length}`)
  console.log('')

  console.log('Mismatch tags:')
  for (const [tag, cnt] of [...tagCounts.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  - ${tag}: ${cnt}`)
  }
  console.log('')

  for (const r of mismatched) {
    const delta = r.tsBytes - r.wasmBytes
    console.log(`- ${r.fixture}: TS=${r.tsBytes} WASM=${r.wasmBytes} Δ${delta >= 0 ? '+' : ''}${delta} tags=${r.tags.join(',')}`)
    const top = r.diffs.slice(0, 4)
    for (const d of top) {
      console.log(`    * ${d.kind} @ ${d.path}: ${d.details}`)
    }
    if (r.diffs.length > top.length) {
      console.log(`    * … (${r.diffs.length - top.length} more diffs)`)
    }
  }

  const outPath = path.join(artifactsRoot, 'mismatch-structure-summary.json')
  await fs.writeFile(outPath, JSON.stringify(results, null, 2), 'utf-8')
  console.log(`\nWrote ${path.relative(process.cwd(), outPath)}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
