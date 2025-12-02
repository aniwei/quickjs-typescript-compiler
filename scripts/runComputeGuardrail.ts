#!/usr/bin/env tsx

import fs from 'fs/promises'
import path from 'path'
import { TypeScriptCompiler } from '../src'
import { createAdvancedDisassembly } from '../src/disasm'
import { BytecodeComparator, ComparisonSummary } from './compareWithWasm'
import { compareModuleTrace, ModuleTraceComparisonResult } from './compareModuleTrace'
import { PC2Line } from '../src/env'

interface ComputeGuardrailOptions {
  inputTs?: string
  artifactsDir?: string
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
  tsEventCount: number
  wasmEventCount: number
  differenceCount: number
}

export interface ComputeGuardrailResult {
  fixturePath: string
  artifactsDir: string
  cli: CliStageSummary
  bytecode: BytecodeStageSummary
  trace: TraceStageSummary
  summaryPath: string
}

const DEFAULT_FIXTURE = path.resolve(__dirname, '../__tests__/compiler/fixtures/compute.ts')

export async function runComputeGuardrail(options: ComputeGuardrailOptions = {}): Promise<ComputeGuardrailResult> {
  const fixturePath = path.resolve(options.inputTs ?? DEFAULT_FIXTURE)
  const artifactsDir = path.resolve(options.artifactsDir ?? path.join(process.cwd(), 'artifacts', 'compute'))
  await fs.mkdir(artifactsDir, { recursive: true })

  const cli = await runCliStage(fixturePath, path.join(artifactsDir, 'cli'))
  const bytecode = await runBytecodeStage(fixturePath, path.join(artifactsDir, 'bytecode'))
  const trace = await runTraceStage(fixturePath, path.join(artifactsDir, 'trace'))

  const summaryPath = path.join(artifactsDir, 'compute.guardrail.summary.json')
  await fs.writeFile(summaryPath, JSON.stringify({
    fixturePath,
    artifactsDir,
    cli,
    bytecode: bytecode.summary,
    trace: {
      tsEventCount: trace.tsEventCount,
      wasmEventCount: trace.wasmEventCount,
      differenceCount: trace.differenceCount,
      summaryPath: trace.summaryPath,
    },
  }, null, 2), 'utf8')

  return {
    fixturePath,
    artifactsDir,
    cli,
    bytecode,
    trace,
    summaryPath,
  }
}

async function runCliStage(fixturePath: string, outDir: string): Promise<CliStageSummary> {
  await fs.mkdir(outDir, { recursive: true })
  const compiler = new TypeScriptCompiler({ debug: true })
  const { bytecode, functionDef } = await compiler.compileFileWithArtifacts(fixturePath)
  const baseName = path.basename(fixturePath, path.extname(fixturePath))

  const bytecodePath = path.join(outDir, `${baseName}.ts.qbc`)
  await fs.writeFile(bytecodePath, bytecode)

  const disassembly = createAdvancedDisassembly(bytecode)
  const disassemblyPath = path.join(outDir, `${baseName}.ts.disasm`)
  await fs.writeFile(disassemblyPath, disassembly, 'utf8')

  const pc2lineBytes = functionDef.pc2line?.toArray?.() ?? []
  const pc2lineBinary = Uint8Array.from(pc2lineBytes)
  const pc2lineBinaryPath = path.join(outDir, `${baseName}.pc2line.bin`)
  await fs.writeFile(pc2lineBinaryPath, pc2lineBinary)

  const pc2lineTablePath = path.join(outDir, `${baseName}.pc2line.txt`)
  await fs.writeFile(pc2lineTablePath, formatPc2lineTable(pc2lineBytes), 'utf8')

  return {
    bytecodePath,
    disassemblyPath,
    pc2lineBinaryPath,
    pc2lineTablePath,
    bytecodeSize: bytecode.length,
    pc2lineLength: pc2lineBytes.length,
    stackMax: functionDef.byteCode.stackMax,
  }
}

async function runBytecodeStage(fixturePath: string, artifactsDir: string): Promise<BytecodeStageSummary> {
  await fs.mkdir(artifactsDir, { recursive: true })
  const comparator = new BytecodeComparator({
    inputTs: fixturePath,
    disasm: true,
    showDiff: true,
    artifactsDir,
  })
  const summary = await comparator.compare()
  return { artifactsDir, summary }
}

async function runTraceStage(fixturePath: string, artifactsDir: string): Promise<TraceStageSummary> {
  await fs.mkdir(artifactsDir, { recursive: true })
  const result: ModuleTraceComparisonResult = await compareModuleTrace({ inputTs: fixturePath, artifactsDir })
  return {
    artifactsDir,
    summaryPath: result.summaryPath,
    tsTracePath: result.tsTracePath,
    wasmTracePath: result.wasmTracePath,
    tsEventCount: result.tsEvents.length,
    wasmEventCount: result.wasmEvents.length,
    differenceCount: result.differences.length,
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

async function main() {
  const args = process.argv.slice(2)
  let inputTs: string | undefined
  let artifactsDir: string | undefined
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if (!arg)
      continue
    if (!arg.startsWith('--')) {
      inputTs = arg
      continue
    }
    switch (arg) {
      case '--artifacts-dir':
      case '--artifacts':
        artifactsDir = args[i + 1]
        i += 1
        break
      case '--input':
      case '--input-ts':
        inputTs = args[i + 1]
        i += 1
        break
      default:
        console.warn(`Unknown option: ${arg}`)
    }
  }

  try {
    const result = await runComputeGuardrail({ inputTs, artifactsDir })
    console.log('Compute guardrail complete:')
    console.log(`  Fixture:    ${result.fixturePath}`)
    console.log(`  Artifacts:  ${result.artifactsDir}`)
    console.log(`  Summary:    ${result.summaryPath}`)
    console.log(`  CLI bytes:  ${result.cli.bytecodeSize}`)
    console.log(`  Bytecode Δ: ${result.bytecode.summary.sizeDiff} bytes`)
    console.log(`  Trace diff: ${result.trace.differenceCount}`)
  } catch (error) {
    console.error('Failed to run compute guardrail:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}
