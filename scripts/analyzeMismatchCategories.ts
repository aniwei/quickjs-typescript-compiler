import fs from 'node:fs/promises'
import path from 'node:path'

import { parseBytecodeModule } from '../src/bytecodeReader'

type Pair = {
  fixture: string
  tsPath: string
  wasmPath: string
}

function eqBytes(a?: Uint8Array, b?: Uint8Array): boolean {
  if (a === b) return true
  if (!a || !b) return false
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

function eqNumber(a: number, b: number): boolean {
  return Object.is(a, b)
}

function eqJsonLike(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (typeof a !== typeof b) return false
  if (a == null || b == null) return false

  if (typeof a === 'number' && typeof b === 'number') return eqNumber(a, b)
  if (typeof a === 'string' && typeof b === 'string') return a === b
  if (typeof a === 'boolean' && typeof b === 'boolean') return a === b

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) if (!eqJsonLike(a[i], b[i])) return false
    return true
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const ak = Object.keys(a as any).sort()
    const bk = Object.keys(b as any).sort()
    if (!eqJsonLike(ak, bk)) return false
    for (const k of ak) {
      if (!eqJsonLike((a as any)[k], (b as any)[k])) return false
    }
    return true
  }

  return false
}

function functionEq(a: ReturnType<typeof parseBytecodeModule>['func'], b: ReturnType<typeof parseBytecodeModule>['func']): boolean {
  if (a.flags !== b.flags) return false
  if (a.jsMode !== b.jsMode) return false
  if (a.funcNameAtom !== b.funcNameAtom) return false
  if (a.argCount !== b.argCount) return false
  if (a.varCount !== b.varCount) return false
  if (a.definedArgCount !== b.definedArgCount) return false
  if (a.stackSize !== b.stackSize) return false
  if (a.closureVarCount !== b.closureVarCount) return false
  if (a.cpoolCount !== b.cpoolCount) return false
  if (a.bytecodeLen !== b.bytecodeLen) return false

  if (!eqJsonLike(a.varDefs, b.varDefs)) return false
  if (!eqJsonLike(a.closureVars, b.closureVars)) return false
  if (!eqBytes(a.bytecode, b.bytecode)) return false

  // debug
  if (a.hasDebug !== b.hasDebug) return false
  if (a.hasDebug) {
    if (!a.debug || !b.debug) return false
    if (a.debug.filenameAtom !== b.debug.filenameAtom) return false
    if (!eqBytes(a.debug.pc2line, b.debug.pc2line)) return false
    if (!eqBytes(a.debug.source, b.debug.source)) return false
  }

  // cpool (best-effort; includes nested functions)
  if (!eqJsonLike(a.cpool ?? [], b.cpool ?? [])) return false

  return true
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

function fixtureFromQbcFilename(filename: string): { fixture: string; kind: 'ts' | 'wasm' } | null {
  if (filename.endsWith('.ts.qbc')) {
    return { fixture: filename.slice(0, -'.ts.qbc'.length), kind: 'ts' }
  }
  if (filename.endsWith('.wasm.qbc')) {
    return { fixture: filename.slice(0, -'.wasm.qbc'.length), kind: 'wasm' }
  }
  return null
}

async function findPairs(artifactsDir: string): Promise<Pair[]> {
  const allFiles = await walk(artifactsDir)
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
    const rank = normalized.includes('/bytecode/') ? 0 : normalized.includes('/cli/') ? 2 : 1
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

type Category =
  | 'identical'
  | 'atoms'
  | 'bytecode'
  | 'debug'
  | 'atoms+bytecode'
  | 'atoms+debug'
  | 'bytecode+debug'
  | 'atoms+bytecode+debug'

type Row = {
  fixture: string
  category: Category
  debugDiff?: string
  ts: {
    atoms: number
    bytecodeLen: number
    hasDebug: boolean
    pc2lineLen: number
  }
  wasm: {
    atoms: number
    bytecodeLen: number
    hasDebug: boolean
    pc2lineLen: number
  }
}

function debugDiffKinds(
  tsFunc: ReturnType<typeof parseBytecodeModule>['func'],
  wasmFunc: ReturnType<typeof parseBytecodeModule>['func'],
): string[] {
  const out: string[] = []
  if (tsFunc.hasDebug !== wasmFunc.hasDebug) return ['hasDebug']
  if (!tsFunc.hasDebug) return out

  const tsDbg = tsFunc.debug
  const wasmDbg = wasmFunc.debug
  if (!tsDbg || !wasmDbg) return ['debug-missing']

  if (tsDbg.filenameAtom !== wasmDbg.filenameAtom) out.push('filenameAtom')

  const tsPc2 = tsDbg.pc2line ?? new Uint8Array()
  const wasmPc2 = wasmDbg.pc2line ?? new Uint8Array()
  if (tsPc2.length !== wasmPc2.length) out.push('pc2line-len')
  else if (!eqBytes(tsPc2, wasmPc2)) out.push('pc2line-bytes')

  const tsSrc = tsDbg.source ?? new Uint8Array()
  const wasmSrc = wasmDbg.source ?? new Uint8Array()
  if (tsSrc.length !== wasmSrc.length) out.push('source-len')
  else if (!eqBytes(tsSrc, wasmSrc)) out.push('source-bytes')

  return out
}

function categorize(tsMod: ReturnType<typeof parseBytecodeModule>, wasmMod: ReturnType<typeof parseBytecodeModule>): Category {
  const atomsEq = tsMod.atoms.length === wasmMod.atoms.length && tsMod.atoms.every((a, i) => a === wasmMod.atoms[i])

  const fullEq = functionEq(tsMod.func, wasmMod.func)
  if (atomsEq && fullEq) return 'identical'

  const atomsDiff = !atomsEq

  // Split “function diff” into debug vs non-debug components for clustering.
  const debugEq =
    tsMod.func.hasDebug === wasmMod.func.hasDebug &&
    (!tsMod.func.hasDebug ||
      (tsMod.func.debug?.filenameAtom === wasmMod.func.debug?.filenameAtom &&
        eqBytes(tsMod.func.debug?.pc2line, wasmMod.func.debug?.pc2line) &&
        eqBytes(tsMod.func.debug?.source, wasmMod.func.debug?.source)))

  const nonDebugEq = functionEq(
    { ...tsMod.func, hasDebug: false, debug: undefined } as any,
    { ...wasmMod.func, hasDebug: false, debug: undefined } as any,
  )

  const bytecodeDiff = !nonDebugEq
  const debugDiff = !debugEq

  if (atomsDiff && !bytecodeDiff && !debugDiff) return 'atoms'
  if (!atomsDiff && bytecodeDiff && !debugDiff) return 'bytecode'
  if (!atomsDiff && !bytecodeDiff && debugDiff) return 'debug'
  if (atomsDiff && bytecodeDiff && !debugDiff) return 'atoms+bytecode'
  if (atomsDiff && !bytecodeDiff && debugDiff) return 'atoms+debug'
  if (!atomsDiff && bytecodeDiff && debugDiff) return 'bytecode+debug'
  return 'atoms+bytecode+debug'
}

function mdEscape(s: string): string {
  return s.replaceAll('|', '\\|')
}

async function main() {
  const repoRoot = path.resolve(__dirname, '..')
  const artifactsDir = path.join(repoRoot, 'artifacts')
  const outPath = path.join(repoRoot, 'docs', 'mismatch-categories.md')

  const pairs = await findPairs(artifactsDir)
  const rows: Row[] = []

  for (const pair of pairs) {
    const tsBuf = await fs.readFile(pair.tsPath)
    const wasmBuf = await fs.readFile(pair.wasmPath)

    const tsMod = parseBytecodeModule(tsBuf)
    const wasmMod = parseBytecodeModule(wasmBuf)

    const category = categorize(tsMod, wasmMod)
    const dbgKinds = debugDiffKinds(tsMod.func, wasmMod.func)
    const debugDiff = dbgKinds.length > 0 ? dbgKinds.join('+') : undefined

    rows.push({
      fixture: pair.fixture,
      category,
      debugDiff,
      ts: {
        atoms: tsMod.atoms.length,
        bytecodeLen: tsMod.func.bytecodeLen,
        hasDebug: tsMod.func.hasDebug,
        pc2lineLen: tsMod.func.debug?.pc2line.length ?? 0,
      },
      wasm: {
        atoms: wasmMod.atoms.length,
        bytecodeLen: wasmMod.func.bytecodeLen,
        hasDebug: wasmMod.func.hasDebug,
        pc2lineLen: wasmMod.func.debug?.pc2line.length ?? 0,
      },
    })
  }

  const counts = new Map<Category, number>()
  for (const r of rows) counts.set(r.category, (counts.get(r.category) ?? 0) + 1)

  const order: Category[] = [
    'identical',
    'debug',
    'bytecode',
    'bytecode+debug',
    'atoms',
    'atoms+debug',
    'atoms+bytecode',
    'atoms+bytecode+debug',
  ]

  let md = ''
  md += '# mismatch categories (TS compiler vs QuickJS WASM)\n\n'
  md += `Generated by scripts/analyzeMismatchCategories.ts at ${new Date().toISOString()}\n\n`

  md += '## Summary\n\n'
  for (const cat of order) {
    if (!counts.has(cat)) continue
    md += `- ${cat}: ${counts.get(cat)}\n`
  }

  md += '\n## QuickJS source mapping (why these categories exist)\n\n'
  md += '- debug / *+debug: pc2line / debug info emission differences. QuickJS emits OP_line_num in emit_source_pos() during parse (third_party/QuickJS/src/core/parser.c#L1777-L1788) and later uses pc2line lookup during disasm (find_line_num()/dump_byte_code, third_party/QuickJS/src/core/parser.c#L8391-L8460).\n'
  md += '- bytecode / *+bytecode: semantic lowering / control-flow / peephole differences. Ground truth lives in parser.c resolve passes + opcode constraints (temporary vs short opcodes) in third_party/QuickJS/include/QuickJS/quickjs-opcode.h.\n'
  md += '- atoms / *+atoms: user atom table ordering/content differences. FunctionDef interns filename early (third_party/QuickJS/src/core/parser.c#L8240-L8288); module serialization is in third_party/QuickJS/src/core/bytecode.cpp.\n'
  md += '\n## Details\n\n'

  md += '| fixture | category | debug diff | ts bytecode | wasm bytecode | ts pc2line | wasm pc2line |\n'
  md += '|---|---:|---|---:|---:|---:|---:|\n'
  for (const r of rows) {
    md += `| ${mdEscape(r.fixture)} | ${r.category} | ${mdEscape(r.debugDiff ?? '')} | ${r.ts.bytecodeLen} | ${r.wasm.bytecodeLen} | ${r.ts.pc2lineLen} | ${r.wasm.pc2lineLen} |\n`
  }

  md += '\n## Per-category fixture lists\n\n'
  for (const cat of order) {
    const names = rows.filter((r) => r.category === cat).map((r) => r.fixture)
    if (names.length === 0) continue
    md += `### ${cat} (${names.length})\n\n`

    // For debug-related categories, also group by which debug fields differ.
    if (cat.includes('debug')) {
      const byKind = new Map<string, string[]>()
      for (const r of rows.filter((r) => r.category === cat)) {
        const k = r.debugDiff ?? '(unknown)'
        const arr = byKind.get(k) ?? []
        arr.push(r.fixture)
        byKind.set(k, arr)
      }

      const kinds = [...byKind.keys()].sort((a, b) => {
        const na = byKind.get(a)?.length ?? 0
        const nb = byKind.get(b)?.length ?? 0
        if (nb !== na) return nb - na
        return a.localeCompare(b)
      })

      for (const k of kinds) {
        md += `- ${mdEscape(k)}: ${(byKind.get(k) ?? []).map((n) => mdEscape(n)).join(', ')}\n`
      }
    } else {
      md += names.map((n) => `- ${mdEscape(n)}`).join('\n')
      md += '\n'
    }
    md += '\n\n'
  }

  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, md, 'utf8')

  // Also print short console summary for quick iteration
  const consoleSummary = order
    .filter((c) => counts.has(c))
    .map((c) => `${c}=${counts.get(c)}`)
    .join(' ')
  console.log(consoleSummary)
  console.log(`wrote ${path.relative(repoRoot, outPath)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
