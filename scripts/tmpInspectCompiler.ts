#!/usr/bin/env tsx

import { readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { Compiler } from '../src/compiler'

async function main() {
  const [file, ...rest] = process.argv.slice(2)
  if (!file) {
    console.error('Usage: tsx scripts/tmpInspectCompiler.ts <input.ts> [--no-reference]')
    process.exit(1)
  }

  const useReference = !rest.includes('--no-reference')
  const absPath = path.resolve(process.cwd(), file)
  const source = await readFile(absPath, 'utf8')
  let referenceJsSource: string | null | undefined
  if (useReference) {
    const jsPath = absPath.replace(/\.ts$/i, '.js')
    try {
      referenceJsSource = await readFile(jsPath, 'utf8')
    } catch {
      referenceJsSource = undefined
    }
  } else {
    referenceJsSource = null
  }

  const compiler = new Compiler(absPath, source, { referenceJsSource })
  ;(compiler as any).compile()

  const strippedSource = new TextDecoder().decode((compiler as any).sourceUtf8)
  const columnAdjustments: Map<number, Array<{ startColumn: number; delta: number }>> = (compiler as any).columnAdjustments

  console.log('=== strippedSource ===')
  console.log(strippedSource)
  console.log('=== columnAdjustments ===')
  const adjustmentsArray = Array.from(columnAdjustments.entries()).map(([line, entries]) => ({
    line,
    entries: entries.map(({ startColumn, delta }) => ({ startColumn, delta })),
  }))
  console.log(JSON.stringify(adjustmentsArray, null, 2))
}

main().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})
