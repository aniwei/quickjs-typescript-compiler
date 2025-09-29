#!/usr/bin/env tsx

import fs from 'fs/promises'
import path from 'path'
import { BytecodeComparator, type ComparisonOptions, type ComparisonSummary } from './compareWithWasm'

interface RunnerOptions {
  fixturesDir: string
  filter?: string
  disasm: boolean
  asm: boolean
  sideBySide: boolean
  showDiff: boolean
  normalizeShort: boolean
  artifactsDir?: string
  bail: boolean
  failOnMismatch: boolean
}

interface FixtureResult {
  fixturePath: string
  summary?: ComparisonSummary
  error?: Error
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  const fixtureFiles = await collectFixtureFiles(options.fixturesDir, options.filter)

  if (fixtureFiles.length === 0) {
    console.log('⚠️  No fixture files found that match the current criteria.')
    process.exitCode = 1
    return
  }

  console.log(`🔁 Comparing ${fixtureFiles.length} fixture${fixtureFiles.length === 1 ? '' : 's'} from ${options.fixturesDir}`)

  const results: FixtureResult[] = []
  let hasMismatch = false
  let hasError = false

  for (const fixturePath of fixtureFiles) {
    const relativeName = path.relative(process.cwd(), fixturePath)
    console.log(`\n=== ${relativeName} ===`)

    const comparatorOptions: ComparisonOptions = {
      inputTs: fixturePath,
      disasm: options.disasm,
      asm: options.asm,
      sideBySide: options.sideBySide,
      showDiff: options.showDiff,
      normalizeShort: options.normalizeShort,
      artifactsDir: options.artifactsDir,
    }

    const comparator = new BytecodeComparator(comparatorOptions)

    try {
      const summary = await comparator.compare()
      results.push({ fixturePath, summary })
      if (!summary.identical) {
        hasMismatch = true
        if (options.bail) {
          console.log('🚫 Mismatch detected, exiting early due to --bail flag.')
          break
        }
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      console.error('❌ Comparison failed:', err.message)
      results.push({ fixturePath, error: err })
      hasError = true
      if (options.bail) {
        console.log('🚫 Error encountered, exiting early due to --bail flag.')
        break
      }
    }
  }

  reportSummary(results)

  if (hasError || (hasMismatch && options.failOnMismatch)) {
    process.exitCode = 1
  }
}

function parseArgs(args: string[]): RunnerOptions {
  const options: RunnerOptions = {
    fixturesDir: path.resolve('__tests__/compiler/fixtures'),
    disasm: false,
    asm: false,
    sideBySide: false,
    showDiff: false,
    normalizeShort: false,
    bail: false,
    failOnMismatch: true,
  }

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    if (arg === '--') {
      break
    }
    switch (arg) {
      case '--fixtures-dir':
      case '--fixtures': {
        const value = args[index + 1]
        if (!value) {
          throw new Error(`${arg} requires a directory path`)
        }
        options.fixturesDir = path.resolve(value)
        index += 1
        break
      }
      case '--filter': {
        const value = args[index + 1]
        if (!value) {
          throw new Error('--filter requires a string value')
        }
        options.filter = value
        index += 1
        break
      }
      case '--disasm':
        options.disasm = true
        break
      case '--asm':
        options.asm = true
        break
      case '--side-by-side':
      case '--sideBySide':
        options.sideBySide = true
        break
      case '--show-diff':
      case '--showDiff':
        options.showDiff = true
        break
      case '--normalize-short':
      case '--normalizeShort':
        options.normalizeShort = true
        break
      case '--artifacts-dir':
      case '--artifacts': {
        const value = args[index + 1]
        if (!value) {
          throw new Error(`${arg} requires a directory path`)
        }
        options.artifactsDir = path.resolve(value)
        index += 1
        break
      }
      case '--bail':
        options.bail = true
        break
      case '--no-fail':
      case '--noFail':
        options.failOnMismatch = false
        break
      default:
        throw new Error(`Unknown argument: ${arg}`)
    }
  }

  return options
}

async function collectFixtureFiles(fixturesDir: string, filter?: string): Promise<string[]> {
  const entries = await fs.readdir(fixturesDir)
  const files = entries
    .filter((entry) => entry.endsWith('.ts') && !entry.endsWith('.d.ts'))
    .filter((entry) => (filter ? entry.includes(filter) : true))
    .map((entry) => path.join(fixturesDir, entry))
    .sort((a, b) => a.localeCompare(b))
  return files
}

function reportSummary(results: FixtureResult[]) {
  if (results.length === 0) {
    console.log('\n⚠️  No fixtures were processed.')
    return
  }

  const lines = ['\nSummary:', '────────────']
  let identicalCount = 0
  let mismatchCount = 0
  let errorCount = 0

  for (const result of results) {
    const name = path.relative(process.cwd(), result.fixturePath)
    if (result.error) {
      lines.push(`✖ ${name} — error: ${result.error.message}`)
      errorCount += 1
      continue
    }

    if (result.summary?.identical) {
      lines.push(`✅ ${name} — identical (${result.summary.tsSize} bytes)`) 
      identicalCount += 1
    } else if (result.summary) {
      const diff = result.summary.sizeDiff
      const percent = result.summary.sizeDiffPercent
      const percentText = percent === null ? 'N/A' : `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`
      lines.push(`⚠️  ${name} — differs by ${diff > 0 ? '+' : ''}${diff} bytes (${percentText})`)
      mismatchCount += 1
    }
  }

  lines.push('\nTotals:', `  ✅ Identical : ${identicalCount}`, `  ⚠️  Mismatched: ${mismatchCount}`, `  ✖ Errors   : ${errorCount}`)
  console.log(lines.join('\n'))
}

main().catch((error) => {
  console.error('❌ compareAllFixtures failed:', error)
  process.exitCode = 1
})
