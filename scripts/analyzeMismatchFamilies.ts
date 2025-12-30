#!/usr/bin/env tsx

/**
 * Generate a mismatch family report from artifacts/mismatch-structure-summary.json.
 *
 * Output:
 * - artifacts/_mismatch_families.latest.md
 */

import fs from 'node:fs/promises'
import path from 'node:path'

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

type ScanSummary = {
  scanRoot?: string
  totalFixtures?: number
  identical?: number
  mismatched?: number
  mismatchTags?: Record<string, number>
}

function normalizeDiffPath(p: string): string {
  // Collapse numeric indices so we can cluster nested-function diffs together.
  return p
    .replace(/\[\d+\]/g, '[*]')
    .replace(/\(func\)/g, '(func)')
}

function uniqSorted(items: string[]): string[] {
  return [...new Set(items)].sort()
}

function classifyFamily(paths: string[], tags: DiffTag[]): { label: string; quickjsAnchors: string[] } {
  const has = (s: string) => paths.some((p) => p.includes(s))

  const anchors = new Set<string>()
  const add = (a: string) => anchors.add(a)

  // QuickJS anchors (grounded in third_party/QuickJS/src/core/parser.c)
  if (has('.debug.pc2line')) {
    add('third_party/QuickJS/src/core/parser.c: add_pc2line_info')
    add('third_party/QuickJS/src/core/parser.c: compute_pc2line_info')
  }

  if (has('.stackSize')) {
    add('third_party/QuickJS/src/core/parser.c: compute_stack_size')
  }

  if (has('.bytecode') || has('.bytecodeLen')) {
    // Bytecode diffs can originate from many emit paths, but the core post-pass is resolve_labels.
    add('third_party/QuickJS/src/core/parser.c: resolve_labels')
    add('third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32')
  }

  if (has('.varDefs') || has('.closureVars') || has('.varCount') || has('.argCount') || has('.definedArgCount') || has('.closureVarCount')) {
    add('third_party/QuickJS/src/core/parser.c: push_scope / pop_scope')
    add('third_party/QuickJS/src/core/parser.c: add_var')
    add('third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables')
    add('third_party/QuickJS/src/core/parser.c: resolve_variables')
  }

  if (has('module.atoms.length')) {
    add('third_party/QuickJS/src/core/parser.c: atom collection / constant pool emission')
  }

  // Label
  let label = ''
  const tagSet = new Set(tags)
  if (tagSet.has('error')) label = 'error'
  else if (tagSet.has('semantics') || has('.bytecode') || has('.bytecodeLen')) {
    label = has('.stackSize') ? 'bytecode+stack(+pc2line?)' : 'bytecode(+pc2line?)'
  } else if (tagSet.has('scope')) {
    label = 'scope/meta(+pc2line?)'
  } else if (tagSet.has('debug')) {
    label = 'pc2line-only'
  } else {
    label = 'other'
  }

  return { label, quickjsAnchors: [...anchors] }
}

async function main() {
  const repoRoot = path.resolve(__dirname, '..')

  const argIdx = process.argv.indexOf('--artifacts-dir')
  const argVal = argIdx >= 0 ? process.argv[argIdx + 1] : undefined
  const artifactsRoot = argVal ? path.resolve(process.cwd(), argVal) : path.join(repoRoot, 'artifacts')

  const structureSummaryPath = path.join(artifactsRoot, 'mismatch-structure-summary.json')
  const scanSummaryPath = path.join(artifactsRoot, '_scan_mismatches.json')

  const [structureRaw, scanRaw] = await Promise.all([
    fs.readFile(structureSummaryPath, 'utf8'),
    fs.readFile(scanSummaryPath, 'utf8').catch(() => ''),
  ])

  const parsed = JSON.parse(structureRaw) as { mismatches: MismatchEntry[] }
  const mismatches = Array.isArray(parsed?.mismatches) ? parsed.mismatches : []

  const scanSummary: ScanSummary | null = scanRaw ? (JSON.parse(scanRaw) as any) : null

  type Family = {
    signature: string
    label: string
    tagsKey: string
    tags: DiffTag[]
    normalizedPaths: string[]
    quickjsAnchors: string[]
    fixtures: string[]
  }

  const bySig = new Map<string, Family>()

  for (const m of mismatches) {
    const tags = uniqSorted(m.tags)
    const normalizedPaths = uniqSorted((m.diffs ?? []).map((d) => normalizeDiffPath(d.path)))

    const { label, quickjsAnchors } = classifyFamily(normalizedPaths, tags as DiffTag[])
    const tagsKey = tags.join(',')
    const signature = `${label} :: tags=${tagsKey} :: ${normalizedPaths.join(' | ')}`

    const existing = bySig.get(signature)
    if (!existing) {
      bySig.set(signature, {
        signature,
        label,
        tagsKey,
        tags: tags as DiffTag[],
        normalizedPaths,
        quickjsAnchors,
        fixtures: [m.fixture],
      })
    } else {
      existing.fixtures.push(m.fixture)
    }
  }

  const families = [...bySig.values()].sort((a, b) => b.fixtures.length - a.fixtures.length || a.signature.localeCompare(b.signature))

  const lines: string[] = []
  lines.push('# Mismatch families (latest scan)')
  lines.push('')
  lines.push(`Artifacts root: ${artifactsRoot}`)
  if (scanSummary?.totalFixtures != null) {
    lines.push(`Total fixtures: ${scanSummary.totalFixtures}`)
    lines.push(`Identical: ${scanSummary.identical}`)
    lines.push(`Mismatched: ${scanSummary.mismatched}`)
  } else {
    lines.push(`Mismatched (from structure summary): ${mismatches.length}`)
  }
  lines.push('')

  if (scanSummary?.mismatchTags) {
    lines.push('## Tag counts')
    for (const [k, v] of Object.entries(scanSummary.mismatchTags).sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))) {
      lines.push(`- ${k}: ${v}`)
    }
    lines.push('')
  }

  lines.push('## Families')
  lines.push('')

  for (const [idx, fam] of families.entries()) {
    const count = fam.fixtures.length
    lines.push(`### Family ${idx + 1}: ${fam.label} (${count} fixtures)`) 
    lines.push('')
    lines.push(`- Tags: ${fam.tagsKey || '(none)'}`)
    lines.push(`- Diff paths: ${fam.normalizedPaths.join(', ') || '(none)'}`)
    if (fam.quickjsAnchors.length) {
      lines.push(`- QuickJS anchors: ${fam.quickjsAnchors.join('; ')}`)
    }
    const samples = fam.fixtures.slice(0, 12)
    lines.push(`- Sample fixtures: ${samples.join(', ')}${count > samples.length ? ` … (+${count - samples.length} more)` : ''}`)
    lines.push('')
  }

  const outPath = path.join(artifactsRoot, '_mismatch_families.latest.md')
  await fs.writeFile(outPath, lines.join('\n'), 'utf8')

  console.log(`Wrote ${outPath}`)
  console.log(`Families: ${families.length}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
