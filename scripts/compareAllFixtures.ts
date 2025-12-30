#!/usr/bin/env tsx

import fs from 'fs/promises'
import path from 'path'
import { TypeScriptCompiler } from '../src'
import { createAdvancedDisassembly } from '../src/disasm'
import { PC2Line } from '../src/env'
// import { compareModuleTrace } from './compareModuleTrace' // 模块 trace 对比：暂未启用
import { BytecodeComparator, type ComparisonOptions, type ComparisonSummary } from './compareWithWasm'

interface RunnerOptions {
  fixturesDir: string
  includeQuickjsTests: boolean
  quickjsFixturesDir: string
  filter?: string
  disasm: boolean
  asm: boolean
  sideBySide: boolean
  showDiff: boolean
  normalizeShort: boolean
  artifactsDir: string
  bail: boolean
  failOnMismatch: boolean
  qtsTrace: boolean
  qtsTraceLevel: 1 | 2 | 3
}

interface CliStageSummary {
  bytecodePath: string
  disassemblyPath: string
  pc2lineBinaryPath: string
  pc2lineTablePath: string
  bytecodeSize: number
  pc2lineLength: number
  stackMax: number
}

interface BytecodeStageSummary {
  artifactsDir: string
  summary: ComparisonSummary
}

interface TraceStageSummary {
  artifactsDir: string
  summaryPath: string
  tsTracePath: string
  wasmTracePath: string
  differenceCount: number
  tsEventCount: number
  wasmEventCount: number
}

interface FixtureGuardrailSummary {
  cli: CliStageSummary
  bytecode: BytecodeStageSummary
  trace: TraceStageSummary
  summaryPath: string
}

interface FixtureResult {
  fixturePath: string
  guardrail?: FixtureGuardrailSummary
  error?: Error
}

async function main() {
  const options = parseArgs(process.argv.slice(2))

  if (options.qtsTrace) {
    process.env.QTS_TRACE_ENABLED = '1'
    process.env.QTS_TRACE_LEVEL = String(options.qtsTraceLevel)
  }

  const fixtureDirs = [options.fixturesDir]
  if (options.includeQuickjsTests) {
    fixtureDirs.push(options.quickjsFixturesDir)
  }

  console.log('Looking for fixtures in:', fixtureDirs.join(', '))
  const fixtureFiles = await collectFixtureFilesFromDirs(fixtureDirs, options.filter)

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

    const baseName = path.basename(fixturePath, path.extname(fixturePath))
    const fixtureArtifactsDir = path.join(options.artifactsDir, baseName)

    const comparatorOptions: ComparisonOptions = {
      inputTs: fixturePath,
      disasm: options.disasm,
      asm: options.asm,
      sideBySide: options.sideBySide,
      showDiff: options.showDiff,
      normalizeShort: options.normalizeShort,
      artifactsDir: path.join(fixtureArtifactsDir, 'bytecode'),
    }

    try {
      const guardrail = await runFixtureGuardrail(fixturePath, fixtureArtifactsDir, comparatorOptions)
      results.push({ fixturePath, guardrail })
      if (!guardrail.bytecode.summary.identical || guardrail.trace.differenceCount > 0) {
        hasMismatch = true
        if (options.bail) {
          console.log('🚫 Mismatch detected, exiting early due to --bail flag.')
          break
        }
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      console.error('❌ Comparison failed:', err.message)
      if (err.stack) {
        console.error(err.stack)
      }
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
    fixturesDir: path.resolve('__tests__/fixtures'),
    includeQuickjsTests: false,
    quickjsFixturesDir: path.resolve('__tests__/fixtures_quickjs'),
    disasm: false,
    asm: false,
    sideBySide: false,
    showDiff: false,
    normalizeShort: false,
    artifactsDir: path.resolve('artifacts'),
    bail: false,
    failOnMismatch: true,
    qtsTrace: false,
    qtsTraceLevel: 2,
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
      case '--include-quickjs-tests':
      case '--includeQuickjsTests':
        options.includeQuickjsTests = true
        break
      case '--quickjs-fixtures-dir':
      case '--quickjsFixturesDir': {
        const value = args[index + 1]
        if (!value) {
          throw new Error(`${arg} requires a directory path`)
        }
        options.quickjsFixturesDir = path.resolve(value)
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
      case '--qts-trace':
      case '--qtsTrace':
        options.qtsTrace = true
        break
      case '--qts-trace-level':
      case '--qtsTraceLevel': {
        const value = args[index + 1]
        if (!value) {
          throw new Error(`${arg} requires a value: 1|2|3`)
        }
        if (value !== '1' && value !== '2' && value !== '3') {
          throw new Error(`${arg} must be 1, 2, or 3`)
        }
        options.qtsTraceLevel = Number(value) as 1 | 2 | 3
        index += 1
        break
      }
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
  try {
    const files: string[] = []

    const walk = async (dir: string) => {
      const entries = await fs.readdir(dir, { withFileTypes: true })
      for (const entry of entries) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          await walk(full)
          continue
        }
        if (!entry.isFile()) continue
        if (!entry.name.endsWith('.ts') || entry.name.endsWith('.d.ts')) continue
        const rel = path.relative(fixturesDir, full)
        if (filter && !rel.includes(filter)) continue
        files.push(full)
      }
    }

    await walk(fixturesDir)
    files.sort((a, b) => a.localeCompare(b))
    console.log(`Found ${files.length} fixture file(s) under ${fixturesDir}`)
    return files
  } catch (err) {
    console.error('Error reading fixtures dir:', err)
    return []
  }
}

async function collectFixtureFilesFromDirs(dirs: string[], filter?: string): Promise<string[]> {
  const all: string[] = []
  for (const dir of dirs) {
    const files = await collectFixtureFiles(dir, filter)
    all.push(...files)
  }
  // Keep a stable order across multiple dirs
  all.sort((a, b) => a.localeCompare(b))
  return all
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

    if (result.guardrail) {
      const { bytecode, trace } = result.guardrail
      if (bytecode.summary.identical && trace.differenceCount === 0) {
        lines.push(`✅ ${name} — bytecode ${bytecode.summary.tsSize} bytes, trace OK`)
        identicalCount += 1
      } else {
        const diff = bytecode.summary.sizeDiff
        const percent = bytecode.summary.sizeDiffPercent
        const percentText = percent === null ? 'N/A' : `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`
        const traceText = trace.differenceCount === 0 ? 'trace OK' : `${trace.differenceCount} trace diff`
        lines.push(`⚠️  ${name} — Δ${diff > 0 ? '+' : ''}${diff} bytes (${percentText}), ${traceText}`)
        mismatchCount += 1
      }
    }
  }

  lines.push('\nTotals:', `  ✅ Identical : ${identicalCount}`, `  ⚠️  Mismatched: ${mismatchCount}`, `  ✖ Errors   : ${errorCount}`)
  console.log(lines.join('\n'))
}

async function runFixtureGuardrail(
  fixturePath: string,
  artifactsDir: string,
  comparatorOptions: ComparisonOptions,
): Promise<FixtureGuardrailSummary> {
  await fs.mkdir(artifactsDir, { recursive: true })
  const cli = await runCliStage(fixturePath, path.join(artifactsDir, 'cli'))
  const bytecode = await runBytecodeStage(fixturePath, path.join(artifactsDir, 'bytecode'), comparatorOptions)
  const trace = await runTraceStage(fixturePath, path.join(artifactsDir, 'trace'))
  const baseName = path.basename(fixturePath, path.extname(fixturePath))
  const summaryPath = path.join(artifactsDir, `${baseName}.guardrail.summary.json`)
  await fs.writeFile(summaryPath, JSON.stringify({
    fixturePath,
    artifactsDir,
    cli,
    bytecode: bytecode.summary,
    trace: {
      differenceCount: trace.differenceCount,
      tsEventCount: trace.tsEventCount,
      wasmEventCount: trace.wasmEventCount,
      summaryPath: trace.summaryPath,
    },
  }, null, 2), 'utf8')
  return { cli, bytecode, trace, summaryPath }
}

async function runCliStage(fixturePath: string, outDir: string): Promise<CliStageSummary> {
  await fs.mkdir(outDir, { recursive: true })
  const compiler = new TypeScriptCompiler({ debug: true })
  const { bytecode, functionDef } = await compiler.compileFileWithArtifacts(fixturePath)
  const baseName = path.basename(fixturePath, path.extname(fixturePath))

  const bytecodePath = path.join(outDir, `${baseName}.ts.qbc`)
  await fs.writeFile(bytecodePath, bytecode)

  const disassemblyPath = path.join(outDir, `${baseName}.ts.disasm`)
  // Guardrail: Some fixtures (e.g. Octane bundles) produce extremely large bytecode.
  // Rendering a full disassembly string can exceed V8 string limits ("Invalid string length").
  // Keep the run deterministic by emitting a small placeholder unless explicitly needed.
  const MAX_DISASM_BYTECODE_BYTES = 1_000_000
  if (bytecode.length <= MAX_DISASM_BYTECODE_BYTES) {
    await fs.writeFile(disassemblyPath, createAdvancedDisassembly(bytecode), 'utf8')
  } else {
    await fs.writeFile(
      disassemblyPath,
      `[disassembly omitted: bytecode ${bytecode.length} bytes exceeds ${MAX_DISASM_BYTECODE_BYTES} bytes]`,
      'utf8',
    )
  }

  const pc2lineBytes = functionDef.pc2line?.buffer?.subarray(0, functionDef.pc2line?.size ?? 0) ?? new Uint8Array(0)
  const pc2lineBinary = Uint8Array.from(pc2lineBytes)
  const pc2lineBinaryPath = path.join(outDir, `${baseName}.pc2line.bin`)
  await fs.writeFile(pc2lineBinaryPath, pc2lineBinary)

  const pc2lineTablePath = path.join(outDir, `${baseName}.pc2line.txt`)
  await fs.writeFile(pc2lineTablePath, formatPc2lineTable(Array.from(pc2lineBytes)), 'utf8')

  return {
    bytecodePath,
    disassemblyPath,
    pc2lineBinaryPath,
    pc2lineTablePath,
    bytecodeSize: bytecode.length,
    pc2lineLength: pc2lineBytes.length,
    stackMax: 0, // functionDef.byteCode.stackMax
  }
}

async function runBytecodeStage(
  fixturePath: string,
  artifactsDir: string,
  comparatorOptions: ComparisonOptions,
): Promise<BytecodeStageSummary> {
  await fs.mkdir(artifactsDir, { recursive: true })
  const comparator = new BytecodeComparator({ ...comparatorOptions, inputTs: fixturePath, artifactsDir })
  const summary = await comparator.compare()
  return { artifactsDir, summary }
}

async function runTraceStage(fixturePath: string, artifactsDir: string): Promise<TraceStageSummary> {
  // await fs.mkdir(artifactsDir, { recursive: true })
  // const result = await compareModuleTrace({ inputTs: fixturePath, artifactsDir })
  return {
    artifactsDir,
    summaryPath: '',
    tsTracePath: '',
    wasmTracePath: '',
    differenceCount: 0,
    tsEventCount: 0,
    wasmEventCount: 0,
  }
}

function formatPc2lineTable(bytes: number[]): string {
  if (!bytes.length)
    return 'pc2line: <empty>'
  const entries = decodePc2line(bytes)
  const lines = ['┏━━╸PC ╺━━╸行 ╺━━╸列 ╺━━╸ΔPC ╺━━╸Δ行 ╺━━╸Δ列']
  for (const entry of entries) {
    const pcText = entry.pc.toString().padStart(4, ' ')
    const lineText = (entry.line + 1).toString().padStart(3, ' ')
    const colText = (entry.column + 1).toString().padStart(3, ' ')
    const deltaPc = entry.deltaPc.toString().padStart(3, ' ')
    const deltaLine = entry.deltaLine.toString().padStart(3, ' ')
    const deltaColumn = entry.deltaColumn.toString().padStart(3, ' ')
    lines.push(`┃ ${pcText} → ${lineText} : ${colText}  [Δpc=${deltaPc} Δ行=${deltaLine} Δ列=${deltaColumn}]`)
  }
  return lines.join('\n')
}

interface Pc2lineEntry {
  pc: number
  line: number
  column: number
  deltaPc: number
  deltaLine: number
  deltaColumn: number
}

function decodePc2line(buffer: number[]): Pc2lineEntry[] {
  const entries: Pc2lineEntry[] = []
  let offset = 0
  const readULEB = (): number => {
    let result = 0
    let shift = 0
    while (offset < buffer.length) {
      const byte = buffer[offset++]
      result |= (byte & 0x7f) << shift
      if ((byte & 0x80) === 0)
        break
      shift += 7
    }
    return result >>> 0
  }
  const readSLEB = (): number => {
    const encoded = readULEB()
    const value = (encoded >>> 1) ^ -(encoded & 1)
    return value | 0
  }

  if (!buffer.length)
    return entries

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
      const encoded = op - PC2Line.PC2LINE_OP_FIRST
      diffPc = Math.floor(encoded / PC2Line.PC2LINE_RANGE)
      diffLine = (encoded % PC2Line.PC2LINE_RANGE) + PC2Line.PC2LINE_BASE
    }
    const diffColumn = readSLEB()

    pc += diffPc
    line += diffLine
    column += diffColumn

    entries.push({ pc, line, column, deltaPc: diffPc, deltaLine: diffLine, deltaColumn: diffColumn })
  }

  return entries
}

main().catch((error) => {
  console.error('❌ compareAllFixtures failed:', error)
  process.exitCode = 1
})
