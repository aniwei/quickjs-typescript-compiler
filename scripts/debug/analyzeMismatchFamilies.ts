#!/usr/bin/env tsx

import fs from 'node:fs/promises'
import path from 'node:path'
import { parseBytecodeModule } from '../../src/bytecodeReader'

type GuardrailSummary = {
  fixturePath: string
  artifactsDir: string
  bytecode?: {
    identical?: boolean
    tsSize?: number
    wasmSize?: number
    sizeDiff?: number
    sizeDiffPercent?: number | null
  }
  trace?: {
    differenceCount?: number
  }
}

type Diff = {
  path: string
  a: unknown
  b: unknown
  note?: string
}

function isUint8Array(v: any): v is Uint8Array {
  return v instanceof Uint8Array
}

function isPlainObject(v: any): v is Record<string, any> {
  return v !== null && typeof v === 'object' && !Array.isArray(v) && !isUint8Array(v)
}

function firstByteDiff(a: Uint8Array, b: Uint8Array): number {
  const n = Math.min(a.length, b.length)
  for (let i = 0; i < n; i++) {
    if (a[i] !== b[i]) return i
  }
  return a.length === b.length ? -1 : n
}

function previewBytes(u8: Uint8Array, start: number, count: number): string {
  const end = Math.min(u8.length, start + count)
  const slice = u8.slice(start, end)
  return Array.from(slice)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join(' ')
}

function diff(a: any, b: any, p: string, seen: Set<any>): Diff | null {
  if (a === b) return null

  const ta = typeof a
  const tb = typeof b

  if (ta !== tb) {
    return { path: p, a, b, note: `type ${ta} vs ${tb}` }
  }

  if (a === null || b === null) {
    return { path: p, a, b }
  }

  if (isUint8Array(a) && isUint8Array(b)) {
    const di = firstByteDiff(a, b)
    if (di === -1) return null
    return {
      path: p,
      a: {
        len: a.length,
        firstDiff: di,
        bytes: previewBytes(a, Math.max(0, di - 8), 32),
      },
      b: {
        len: b.length,
        firstDiff: di,
        bytes: previewBytes(b, Math.max(0, di - 8), 32),
      },
      note: 'Uint8Array differs',
    }
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { path: p + '.length', a: a.length, b: b.length }
    }
    for (let i = 0; i < a.length; i++) {
      const d = diff(a[i], b[i], `${p}[${i}]`, seen)
      if (d) return d
    }
    return null
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    if (seen.has(a) || seen.has(b)) {
      return null
    }
    seen.add(a)
    seen.add(b)

    const aKeys = Object.keys(a).sort()
    const bKeys = Object.keys(b).sort()
    if (aKeys.length !== bKeys.length) {
      return { path: p + '.keys', a: aKeys, b: bKeys }
    }
    for (let i = 0; i < aKeys.length; i++) {
      if (aKeys[i] !== bKeys[i]) {
        return { path: p + '.keys', a: aKeys, b: bKeys }
      }
    }
    for (const k of aKeys) {
      const d = diff(a[k], b[k], p ? `${p}.${k}` : k, seen)
      if (d) return d
    }
    return null
  }

  return { path: p, a, b }
}

async function collectFilesRecursive(rootDir: string, suffix: string): Promise<string[]> {
  const out: string[] = []
  const stack = [rootDir]
  while (stack.length) {
    const dir = stack.pop()!
    let entries
    try {
      entries = await fs.readdir(dir, { withFileTypes: true })
    } catch {
      continue
    }
    for (const ent of entries) {
      const full = path.join(dir, ent.name)
      if (ent.isDirectory()) {
        stack.push(full)
        continue
      }
      if (ent.isFile() && ent.name.endsWith(suffix)) {
        out.push(full)
      }
    }
  }
  out.sort((a, b) => a.localeCompare(b))
  return out
}

function normalizeDiffPath(p: string): string {
  // Keep the overall shape but remove high-cardinality indices.
  // Example: root.func.cpool[15].debug.pc2line -> root.func.cpool[*].debug.pc2line
  return p.replace(/\[(\d+)\]/g, '[*]')
}

function quickjsAnchorForFamily(normPath: string): { title: string; anchors: { file: string; hint: string }[] } {
  // Anchors are coarse-grained; we refine per-family when debugging a representative.
  if (normPath.includes('.debug.pc2line')) {
    return {
      title: 'pc2line/debug 映射差异',
      anchors: [
        { file: 'third_party/QuickJS/src/core/parser.c', hint: 'emit_source_pos() 写入 OP_line_num；以及 pc2line 生成/编码逻辑（debug info 相关段落）' },
      ],
    }
  }

  if (normPath.includes('.label') || normPath.includes('label_slots') || normPath.includes('.reloc') || normPath.includes('goto')) {
    return {
      title: 'label/goto/控制流布局差异',
      anchors: [
        { file: 'third_party/QuickJS/src/core/parser.c', hint: 'emit_label()/emit_goto() + resolve_labels/控制流优化相关逻辑' },
      ],
    }
  }

  if (normPath.includes('vars') || normPath.includes('var') || normPath.includes('scope')) {
    return {
      title: '作用域/变量解析差异',
      anchors: [
        { file: 'third_party/QuickJS/src/core/parser.c', hint: 'push_scope/pop_scope, js_define_var, resolve_variables 等' },
      ],
    }
  }

  if (normPath.includes('bytecode')) {
    return {
      title: '字节码指令流差异',
      anchors: [
        { file: 'third_party/QuickJS/src/core/parser.c', hint: '语句/表达式 lowering（js_parse_statement_or_decl/js_parse_expr 等），以及 emit_op 系列' },
      ],
    }
  }

  return {
    title: '其他结构差异',
    anchors: [{ file: 'third_party/QuickJS/src/core/parser.c', hint: '根据代表样本再精确定位' }],
  }
}

async function main() {
  const args = process.argv.slice(2)
  const artifactsDir = (() => {
    const idx = args.indexOf('--artifacts-dir')
    if (idx >= 0 && args[idx + 1]) return path.resolve(args[idx + 1])
    return path.resolve('artifacts')
  })()

  const onlyPrefix = (() => {
    const idx = args.indexOf('--only-prefix')
    if (idx >= 0 && args[idx + 1]) return String(args[idx + 1])
    return null
  })()

  const outPath = (() => {
    const idx = args.indexOf('--out')
    if (idx >= 0 && args[idx + 1]) return path.resolve(args[idx + 1])
    return path.join(artifactsDir, 'mismatch_families.json')
  })()

  let summaryFiles = await collectFilesRecursive(artifactsDir, '.guardrail.summary.json')
  if (onlyPrefix) {
    summaryFiles = summaryFiles.filter((f) => {
      const rel = path.relative(artifactsDir, f)
      // Normalize path separators so prefix matching is stable across platforms.
      const relNorm = rel.split(path.sep).join('/')
      const prefixNorm = onlyPrefix.split(path.sep).join('/')
      return relNorm.startsWith(prefixNorm)
    })
  }
  if (!summaryFiles.length) {
    console.error(`No guardrail summaries found under: ${artifactsDir}`)
    process.exit(2)
  }

  const mismatches: any[] = []
  const errors: any[] = []

  for (const file of summaryFiles) {
    let raw: any
    try {
      raw = JSON.parse(await fs.readFile(file, 'utf8'))
    } catch (e) {
      errors.push({ file, error: String(e) })
      continue
    }

    const summary = raw as GuardrailSummary
    const identical = summary.bytecode?.identical === true
    const traceDiff = (summary.trace?.differenceCount ?? 0) > 0
    const isMismatch = !identical || traceDiff

    if (!isMismatch) continue

    const baseName = path.basename(summary.fixturePath, path.extname(summary.fixturePath))
    const bytecodeDir = path.join(summary.artifactsDir, 'bytecode')
    const tsQbc = path.join(bytecodeDir, `${baseName}.ts.qbc`)
    const wasmQbc = path.join(bytecodeDir, `${baseName}.wasm.qbc`)

    try {
      const [aBuf, bBuf] = await Promise.all([
        fs.readFile(tsQbc),
        fs.readFile(wasmQbc),
      ])
      const aMod = parseBytecodeModule(aBuf)
      const bMod = parseBytecodeModule(bBuf)
      const d = diff(aMod as any, bMod as any, 'root', new Set())
      if (!d) {
        // Should not happen: summary says mismatch but modules identical.
        mismatches.push({
          fixturePath: summary.fixturePath,
          artifactsDir: summary.artifactsDir,
          bytecode: summary.bytecode,
          trace: summary.trace,
          diff: null,
          normalizedPath: 'root',
          family: quickjsAnchorForFamily('root'),
          note: 'guardrail marked mismatch but deep diff found no structural differences',
        })
      } else {
        const norm = normalizeDiffPath(d.path)
        mismatches.push({
          fixturePath: summary.fixturePath,
          artifactsDir: summary.artifactsDir,
          bytecode: summary.bytecode,
          trace: summary.trace,
          diff: d,
          normalizedPath: norm,
          family: quickjsAnchorForFamily(norm),
        })
      }
    } catch (e) {
      mismatches.push({
        fixturePath: summary.fixturePath,
        artifactsDir: summary.artifactsDir,
        bytecode: summary.bytecode,
        trace: summary.trace,
        diffError: String(e),
      })
    }
  }

  const familyMap = new Map<string, { count: number; title: string; anchors: any[]; examples: string[] }>()
  for (const m of mismatches) {
    const key = m.normalizedPath ?? 'unknown'
    const info = familyMap.get(key)
    if (!info) {
      familyMap.set(key, {
        count: 1,
        title: m.family?.title ?? 'unknown',
        anchors: m.family?.anchors ?? [],
        examples: [m.fixturePath],
      })
    } else {
      info.count += 1
      if (info.examples.length < 8) info.examples.push(m.fixturePath)
    }
  }

  const families = Array.from(familyMap.entries())
    .map(([normalizedPath, info]) => ({ normalizedPath, ...info }))
    .sort((a, b) => b.count - a.count)

  const report = {
    generatedAt: new Date().toISOString(),
    artifactsDir,
    totalSummaries: summaryFiles.length,
    mismatchCount: mismatches.length,
    errors,
    families,
    mismatches,
  }

  await fs.writeFile(outPath, JSON.stringify(report, null, 2), 'utf8')

  console.log(`Analyzed guardrails under: ${artifactsDir}`)
  console.log(`Mismatch count: ${mismatches.length}`)
  console.log(`Report: ${outPath}`)
  console.log('\nTop families:')
  for (const f of families.slice(0, 12)) {
    console.log(`- ${f.count}× ${f.normalizedPath}  (${f.title})`)
    for (const a of f.anchors) {
      console.log(`    - QuickJS: ${a.file} — ${a.hint}`)
    }
    for (const ex of f.examples.slice(0, 3)) {
      console.log(`    - e.g. ${path.relative(process.cwd(), ex)}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
