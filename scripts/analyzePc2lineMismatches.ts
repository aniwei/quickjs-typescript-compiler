import fs from 'node:fs/promises'
import path from 'node:path'

import { parseBytecodeModule } from '../src/bytecodeReader'

type Pair = {
  fixture: string
  tsPath: string
  wasmPath: string
}

type Pc2LineEntry = {
  pc: number
  line: number
  column: number
  deltaPc: number
  deltaLine: number
  deltaColumn: number
}

// 这里使用的是 pc2line v2 编码常量（用于差异分析）。
// 注意：它与 src/env.ts 里的 PC2Line（base=-1/range=5）不是同一套。
const PC2LINE_BASE = -3
const PC2LINE_RANGE = 15
const PC2LINE_OP_FIRST = 1

async function walk(dir: string): Promise<string[]> {
  const out: string[] = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const ent of entries) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) out.push(...(await walk(p)))
    else out.push(p)
  }
  return out
}

function fixtureFromQbcFilename(filename: string): { fixture: string; kind: 'ts' | 'wasm' } | null {
  if (filename.endsWith('.ts.qbc')) return { fixture: filename.slice(0, -'.ts.qbc'.length), kind: 'ts' }
  if (filename.endsWith('.wasm.qbc')) return { fixture: filename.slice(0, -'.wasm.qbc'.length), kind: 'wasm' }
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

function eqBytes(a?: Uint8Array, b?: Uint8Array): boolean {
  if (a === b) return true
  if (!a || !b) return false
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
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

function debugDiffKinds(tsFunc: ReturnType<typeof parseBytecodeModule>['func'], wasmFunc: ReturnType<typeof parseBytecodeModule>['func']): string[] {
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

function formatEntry(e: Pc2LineEntry): string {
  return `pc=${e.pc} line=${e.line} col=${e.column} (dpc=${e.deltaPc} dline=${e.deltaLine} dcol=${e.deltaColumn})`
}

function snippet(entries: Pc2LineEntry[], idx: number, radius = 3): string[] {
  const start = Math.max(0, idx - radius)
  const end = Math.min(entries.length, idx + radius + 1)
  const out: string[] = []
  for (let i = start; i < end; i++) {
    const mark = i === idx ? '>>' : '  '
    out.push(`${mark} [${i}] ${formatEntry(entries[i])}`)
  }
  return out
}

async function main() {
  const repoRoot = path.resolve(__dirname, '..')
  const artifactsDir = path.join(repoRoot, 'artifacts')
  const outPath = path.join(repoRoot, 'docs', 'pc2line-mismatch-report.md')

  const pairs = await findPairs(artifactsDir)

  const sections: string[] = []
  const kindCounts = new Map<string, number>()

  for (const pair of pairs) {
    const tsBuf = await fs.readFile(pair.tsPath)
    const wasmBuf = await fs.readFile(pair.wasmPath)

    const tsMod = parseBytecodeModule(tsBuf)
    const wasmMod = parseBytecodeModule(wasmBuf)

    const kinds = debugDiffKinds(tsMod.func, wasmMod.func)
    if (!kinds.some((k) => k.startsWith('pc2line'))) continue

    for (const k of kinds) kindCounts.set(k, (kindCounts.get(k) ?? 0) + 1)

    const tsPc2 = tsMod.func.debug?.pc2line ?? new Uint8Array()
    const wasmPc2 = wasmMod.func.debug?.pc2line ?? new Uint8Array()

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
    if (firstDiff === -1 && tsEntries.length !== wasmEntries.length) {
      firstDiff = n
    }

    const title = `${pair.fixture} (${kinds.join('+')})`
    const header = `## ${title}\n\n- ts pc2line bytes: ${tsPc2.length}, entries: ${tsEntries.length}\n- wasm pc2line bytes: ${wasmPc2.length}, entries: ${wasmEntries.length}\n`

    let body = ''
    if (firstDiff === -1) {
      body += '\nDecoded entries identical (unexpected for pc2line diff).\n'
    } else {
      body += `\nFirst decoded diff at index ${firstDiff}.\n\n### TS snippet\n\n\`\`\`\n${snippet(tsEntries, Math.min(firstDiff, Math.max(0, tsEntries.length - 1))).join('\n')}\n\`\`\`\n\n`
      body += `### WASM snippet\n\n\`\`\`\n${snippet(wasmEntries, Math.min(firstDiff, Math.max(0, wasmEntries.length - 1))).join('\n')}\n\`\`\`\n\n`
    }

    sections.push(header + body)
  }

  let md = ''
  md += '# pc2line mismatch report (decoded)\n\n'
  md += `Generated by scripts/analyzePc2lineMismatches.ts at ${new Date().toISOString()}\n\n`
  md += 'QuickJS references:\n\n'
  md += '- pc2line encoding: third_party/QuickJS/src/core/parser.c (compute_pc2line_info / dump_pc2line)\n'
  md += '- pc2line slot capture: third_party/QuickJS/src/core/parser.c add_pc2line_info()\n\n'

  if (kindCounts.size > 0) {
    md += '## Summary\n\n'
    for (const [k, v] of [...kindCounts.entries()].sort((a, b) => b[1] - a[1])) {
      md += `- ${k}: ${v}\n`
    }
    md += '\n'
  }

  if (sections.length === 0) {
    md += 'No pc2line mismatches found.\n'
  } else {
    md += sections.join('\n')
  }

  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, md, 'utf8')

  console.log(`wrote ${path.relative(repoRoot, outPath)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
