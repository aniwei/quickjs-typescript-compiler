#!/usr/bin/env tsx

import fs from 'node:fs/promises'
import path from 'node:path'

type GuardrailSummary = {
  fixturePath: string
  artifactsDir: string
  bytecode?: {
    identical: boolean
    tsSize: number
    wasmSize: number
    sizeDiff: number
    sizeDiffPercent: number | null
  }
}

async function listSummaryFiles(artifactsRoot: string): Promise<string[]> {
  const results: string[] = []
  const entries = await fs.readdir(artifactsRoot, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const dir = path.join(artifactsRoot, entry.name)
    const inner = await fs.readdir(dir)
    for (const f of inner) {
      if (f.endsWith('.guardrail.summary.json')) results.push(path.join(dir, f))
    }
  }
  results.sort((a, b) => a.localeCompare(b))
  return results
}

async function main() {
  const artifactsRoot = path.resolve('artifacts')
  const files = await listSummaryFiles(artifactsRoot)
  const mismatches: Array<{ fixture: string; base: string; diff: number; percent: number | null; tsSize: number; wasmSize: number }> = []

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8')
    const json = JSON.parse(raw) as GuardrailSummary
    if (!json.bytecode) continue
    if (json.bytecode.identical) continue

    const fixture = path.relative(process.cwd(), json.fixturePath)
    const base = path.relative(process.cwd(), json.artifactsDir)
    mismatches.push({
      fixture,
      base,
      diff: json.bytecode.sizeDiff,
      percent: json.bytecode.sizeDiffPercent,
      tsSize: json.bytecode.tsSize,
      wasmSize: json.bytecode.wasmSize,
    })
  }

  mismatches.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))

  console.log(`mismatched fixtures: ${mismatches.length}`)
  for (const m of mismatches) {
    const pct = m.percent == null ? 'N/A' : `${m.percent >= 0 ? '+' : ''}${m.percent.toFixed(2)}%`
    console.log(`- ${m.fixture} :: Δ${m.diff > 0 ? '+' : ''}${m.diff} bytes (${pct}) ts=${m.tsSize} wasm=${m.wasmSize} artifacts=${m.base}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
