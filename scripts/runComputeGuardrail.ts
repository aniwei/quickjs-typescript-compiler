#!/usr/bin/env tsx

import fs from 'fs/promises'
import path from 'path'
import { TypeScriptCompiler, JSFunctionDef } from '../src'
import { createAdvancedDisassembly } from '../src/disasm'
import { BytecodeComparator, ComparisonSummary } from './compareWithWasm'
import { compareModuleTrace, ModuleTraceComparisonResult } from './compareModuleTrace'
import { Opcode, OPCODE_DEFS, PC2Line, SHORT_OPCODE_DEFS, type OpcodeDefinition } from '../src/env'

interface ComputeGuardrailOptions {
  inputTs?: string
  artifactsDir?: string
  allowTemporaryScopeOpcodes?: boolean
}

interface CliStageSummary {
  bytecodePath: string
  disassemblyPath: string
  pc2lineBinaryPath: string
  pc2lineTablePath: string
  bytecodeSize: number
  pc2lineLength: number
  stackMax: number
  temporaryScopeAnalysis: TemporaryScopeOpcodeAnalysis
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

interface TemporaryScopeOpcodeOccurrence {
  functionName: string
  opcode: string
  offset: number
}

export interface TemporaryScopeOpcodeAnalysis {
  hasTemporaryScopeOpcodes: boolean
  totalCount: number
  uniqueOpcodes: string[]
  occurrences: TemporaryScopeOpcodeOccurrence[]
}

class TemporaryScopeOpcodeError extends Error {
  constructor(public readonly analysis: TemporaryScopeOpcodeAnalysis) {
    super(
      `Detected ${analysis.totalCount} temporary scope opcode${analysis.totalCount === 1 ? '' : 's'} (${analysis.uniqueOpcodes.join(', ') || 'unknown'})`,
    )
    this.name = 'TemporaryScopeOpcodeError'
  }
}

const TEMPORARY_SCOPE_OPCODE_SET: ReadonlySet<Opcode> = new Set([
  Opcode.OP_enter_scope,
  Opcode.OP_leave_scope,
  Opcode.OP_scope_get_var_undef,
  Opcode.OP_scope_get_var,
  Opcode.OP_scope_put_var,
  Opcode.OP_scope_delete_var,
  Opcode.OP_scope_make_ref,
  Opcode.OP_scope_get_ref,
  Opcode.OP_scope_put_var_init,
  Opcode.OP_scope_get_var_checkthis,
  Opcode.OP_scope_get_private_field,
  Opcode.OP_scope_get_private_field2,
  Opcode.OP_scope_put_private_field,
  Opcode.OP_scope_in_private_field,
])

const TEMPORARY_SCOPE_OPCODE_SIZES: Partial<Record<Opcode, number>> = {
  [Opcode.OP_enter_scope]: 3,
  [Opcode.OP_leave_scope]: 3,
  [Opcode.OP_scope_get_var_undef]: 7,
  [Opcode.OP_scope_get_var]: 7,
  [Opcode.OP_scope_put_var]: 7,
  [Opcode.OP_scope_delete_var]: 7,
  [Opcode.OP_scope_make_ref]: 11,
  [Opcode.OP_scope_get_ref]: 7,
  [Opcode.OP_scope_put_var_init]: 7,
  [Opcode.OP_scope_get_var_checkthis]: 7,
  [Opcode.OP_scope_get_private_field]: 7,
  [Opcode.OP_scope_get_private_field2]: 7,
  [Opcode.OP_scope_put_private_field]: 7,
  [Opcode.OP_scope_in_private_field]: 7,
};

const opcodeDefsByCode: Array<OpcodeDefinition | undefined> = buildOpcodeDefinitionTable()
const opcodeNamesByCode: Record<number, string> = buildOpcodeNameMap()

export async function runComputeGuardrail(options: ComputeGuardrailOptions = {}): Promise<ComputeGuardrailResult> {
  const fixturePath = path.resolve(options.inputTs ?? DEFAULT_FIXTURE)
  const artifactsDir = path.resolve(options.artifactsDir ?? path.join(process.cwd(), 'artifacts', 'compute'))
  await fs.mkdir(artifactsDir, { recursive: true })

  const cli = await runCliStage(
    fixturePath,
    path.join(artifactsDir, 'cli'),
    options.allowTemporaryScopeOpcodes === true,
  )
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

async function runCliStage(
  fixturePath: string,
  outDir: string,
  allowTemporaryScopeOpcodes: boolean,
): Promise<CliStageSummary> {
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

  const temporaryScopeAnalysis = analyzeTemporaryScopeOpcodes(functionDef)
  if (temporaryScopeAnalysis.hasTemporaryScopeOpcodes && !allowTemporaryScopeOpcodes) {
    throw new TemporaryScopeOpcodeError(temporaryScopeAnalysis)
  }

  return {
    bytecodePath,
    disassemblyPath,
    pc2lineBinaryPath,
    pc2lineTablePath,
    bytecodeSize: bytecode.length,
    pc2lineLength: pc2lineBytes.length,
    stackMax: functionDef.byteCode.stackMax,
    temporaryScopeAnalysis,
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

function analyzeTemporaryScopeOpcodes(rootFunc: JSFunctionDef): TemporaryScopeOpcodeAnalysis {
  const occurrences: TemporaryScopeOpcodeOccurrence[] = []
  const pending: JSFunctionDef[] = [rootFunc]
  const visited = new Set<JSFunctionDef>()

  while (pending.length > 0) {
    const func = pending.pop()!
    if (visited.has(func))
      continue
    visited.add(func)

    if (Array.isArray(func.children) && func.children.length > 0)
      pending.push(...func.children)

    const buffer = func.byteCode.buffer
    const hasAtom = getAtomChecker(func)
    let pc = 0
    while (pc < buffer.length) {
      const opcode = buffer[pc]
      const def = opcodeDefsByCode[opcode]
      if (!def)
        throw new Error(`Unknown opcode ${opcode} at pc=${pc}`)

      if (
        TEMPORARY_SCOPE_OPCODE_SET.has(opcode as Opcode) &&
        isLikelyTemporaryScopeOpcode(func, buffer, pc, opcode as Opcode, hasAtom)
      ) {
        occurrences.push({
          functionName: describeFunctionName(func),
          opcode: opcodeNamesByCode[opcode] ?? `opcode#${opcode}`,
          offset: pc,
        })
        const skipSize = TEMPORARY_SCOPE_OPCODE_SIZES[opcode as Opcode] ?? def.size
        pc += skipSize
        continue
      }

      pc += def.size
    }
  }

  const uniqueOpcodes = Array.from(new Set(occurrences.map((occ) => occ.opcode))).sort()
  return {
    hasTemporaryScopeOpcodes: occurrences.length > 0,
    totalCount: occurrences.length,
    uniqueOpcodes,
    occurrences,
  }
}

function describeFunctionName(func: JSFunctionDef): string {
  const atomManager = func.ctx?.atomManager
  const nameAtom = func.funcName
  if (atomManager && typeof atomManager.getString === 'function' && typeof nameAtom === 'number') {
    const maybeName = atomManager.getString(nameAtom)
    if (maybeName)
      return maybeName
  }
  return '<anonymous>'
}

function buildOpcodeDefinitionTable(): Array<OpcodeDefinition | undefined> {
  const table: Array<OpcodeDefinition | undefined> = []
  for (const [name, def] of Object.entries(OPCODE_DEFS)) {
    const code = (Opcode as any)[name]
    if (typeof code === 'number')
      table[code] = def
  }
  for (const [name, def] of Object.entries(SHORT_OPCODE_DEFS)) {
    const code = (Opcode as any)[name]
    if (typeof code === 'number')
      table[code] = def
  }
  return table
}

function buildOpcodeNameMap(): Record<number, string> {
  const map: Record<number, string> = {}
  for (const key of Object.keys(Opcode)) {
    const value = (Opcode as any)[key]
    if (typeof value === 'number')
      map[value] = key
  }
  return map
}

type AtomChecker = (atom: number) => boolean

function isLikelyTemporaryScopeOpcode(
  func: JSFunctionDef,
  buffer: Uint8Array,
  pc: number,
  opcode: Opcode,
  hasAtom: AtomChecker,
): boolean {
  const scopeIsValid = (scopeIdx: number) => {
    const scopeLimit = Array.isArray(func.scopes) && func.scopes.length > 0
      ? func.scopes.length
      : func.scopeCount > 0
        ? func.scopeCount
        : Math.max(func.scopeLevel + 1, 0)
    return scopeIdx >= 0 && scopeIdx < scopeLimit
  }

  switch (opcode) {
    case Opcode.OP_enter_scope:
    case Opcode.OP_leave_scope: {
      if (pc + 3 > buffer.length)
        return false
      const scope = readU16(buffer, pc + 1)
      return scopeIsValid(scope)
    }
    case Opcode.OP_scope_get_var_undef:
    case Opcode.OP_scope_get_var:
    case Opcode.OP_scope_put_var:
    case Opcode.OP_scope_delete_var:
    case Opcode.OP_scope_get_ref:
    case Opcode.OP_scope_put_var_init:
    case Opcode.OP_scope_get_var_checkthis:
    case Opcode.OP_scope_get_private_field:
    case Opcode.OP_scope_get_private_field2:
    case Opcode.OP_scope_put_private_field:
    case Opcode.OP_scope_in_private_field: {
      if (pc + 7 > buffer.length)
        return false
      const atom = readU32(buffer, pc + 1)
      if (!hasAtom(atom))
        return false
      const scope = readU16(buffer, pc + 5)
      return scopeIsValid(scope)
    }
    case Opcode.OP_scope_make_ref: {
      if (pc + 11 > buffer.length)
        return false
      const atom = readU32(buffer, pc + 1)
      if (!hasAtom(atom))
        return false
      const scope = readU16(buffer, pc + 9)
      return scopeIsValid(scope)
    }
    default:
      return true
  }
}

function readU32(buffer: Uint8Array, offset: number): number {
  return (
    buffer[offset] |
    (buffer[offset + 1] << 8) |
    (buffer[offset + 2] << 16) |
    (buffer[offset + 3] << 24)
  ) >>> 0
}

function readU16(buffer: Uint8Array, offset: number): number {
  return (buffer[offset] | (buffer[offset + 1] << 8)) & 0xffff
}

function getAtomChecker(func: JSFunctionDef): AtomChecker {
  const atomManager = func.ctx?.atomManager
  if (atomManager && typeof atomManager.hasAtom === 'function')
    return (atom: number) => atomManager.hasAtom(atom)
  return () => true
}

async function main() {
  const args = process.argv.slice(2)
  let inputTs: string | undefined
  let artifactsDir: string | undefined
  let allowTemporaryScopeOpcodes = false
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
      case '--allow-temporary-scope-opcodes':
      case '--allow-temp-scope-opcodes':
      case '--allow-temp-scope':
        allowTemporaryScopeOpcodes = true
        break
      default:
        console.warn(`Unknown option: ${arg}`)
    }
  }

  try {
    const result = await runComputeGuardrail({ inputTs, artifactsDir, allowTemporaryScopeOpcodes })
    console.log('Compute guardrail complete:')
    console.log(`  Fixture:    ${result.fixturePath}`)
    console.log(`  Artifacts:  ${result.artifactsDir}`)
    console.log(`  Summary:    ${result.summaryPath}`)
    console.log(`  CLI bytes:  ${result.cli.bytecodeSize}`)
    console.log(`  Bytecode Δ: ${result.bytecode.summary.sizeDiff} bytes`)
    console.log(`  Trace diff: ${result.trace.differenceCount}`)
    if (result.cli.temporaryScopeAnalysis.hasTemporaryScopeOpcodes) {
      console.warn(
        `⚠️  Temporary scope opcodes detected (${result.cli.temporaryScopeAnalysis.totalCount}).` +
          ' Re-run without --allow-temp-scope to enforce failure.',
      )
    }
  } catch (error) {
    if (error instanceof TemporaryScopeOpcodeError) {
      console.error('Failed to run compute guardrail: temporary scope opcodes detected.')
      console.error(`  Unique opcodes: ${error.analysis.uniqueOpcodes.join(', ') || '(unknown)'}`)
      error.analysis.occurrences.slice(0, 10).forEach((occurrence, index) => {
        console.error(
          `  [${index + 1}] ${occurrence.opcode} at offset ${occurrence.offset} in ${occurrence.functionName}`,
        )
      })
      if (error.analysis.totalCount > 10)
        console.error(`  …and ${error.analysis.totalCount - 10} more occurrences.`)
      console.error('  Pass --allow-temp-scope to collect artifacts without enforcing the guardrail.')
    } else {
      console.error('Failed to run compute guardrail:', error)
    }
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}
