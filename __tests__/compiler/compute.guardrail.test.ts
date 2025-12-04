import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { runComputeGuardrail } from '../../scripts/runComputeGuardrail'

jest.setTimeout(180_000)

async function pathExists(target: string): Promise<boolean> {
  try {
    await fs.access(target)
    return true
  } catch {
    return false
  }
}

describe('compute guardrail', () => {
  test('runComputeGuardrail archives compute fixture artifacts', async () => {
    const artifactsDir = await fs.mkdtemp(path.join(os.tmpdir(), 'compute-guardrail-'))

    try {
      const result = await runComputeGuardrail({ artifactsDir })

      expect(result.cli.bytecodeSize).toBeGreaterThan(0)
      expect(result.cli.pc2lineLength).toBeGreaterThan(0)
      expect(await pathExists(result.cli.bytecodePath)).toBe(true)
      expect(await pathExists(result.cli.disassemblyPath)).toBe(true)
      expect(await pathExists(result.cli.pc2lineBinaryPath)).toBe(true)
      expect(await pathExists(result.cli.pc2lineTablePath)).toBe(true)

      expect(result.bytecode.summary.tsSize).toBeGreaterThan(0)
      expect(result.bytecode.summary.wasmSize).toBeGreaterThan(0)
      expect(await pathExists(path.join(result.bytecode.artifactsDir, 'compute.analysis.json'))).toBe(true)
      expect(await pathExists(path.join(result.bytecode.artifactsDir, 'compute.ts.qbc'))).toBe(true)
      expect(await pathExists(path.join(result.bytecode.artifactsDir, 'compute.wasm.qbc'))).toBe(true)

      expect(result.trace.tsEventCount).toBeGreaterThan(0)
      expect(result.trace.wasmEventCount).toBeGreaterThan(0)
      expect(await pathExists(result.trace.summaryPath)).toBe(true)
      expect(await pathExists(result.trace.tsTracePath)).toBe(true)
      expect(await pathExists(result.trace.wasmTracePath)).toBe(true)

      expect(await pathExists(result.summaryPath)).toBe(true)

      expect(result.cli.temporaryScopeAnalysis.totalCount).toBe(0)
      expect(result.cli.temporaryScopeAnalysis.hasTemporaryScopeOpcodes).toBe(false)
      expect(result.cli.temporaryScopeAnalysis.occurrences.length).toBe(0)
    } finally {
      await fs.rm(artifactsDir, { recursive: true, force: true })
    }
  })
})

const FIXTURE_DIR = path.resolve(__dirname, 'fixtures')

const EXTRA_FIXTURES = [
  { name: 'console-log', file: path.join(FIXTURE_DIR, 'console-log.ts') },
  { name: 'arrow-fn-basic', file: path.join(FIXTURE_DIR, 'arrow-fn-basic.ts') },
]

describe.each(EXTRA_FIXTURES)('%s guardrail', ({ name, file }) => {
  test('bytecode parity without temporary scope opcodes', async () => {
    const artifactsDir = await fs.mkdtemp(path.join(os.tmpdir(), `${name}-guardrail-`))
    try {
      const result = await runComputeGuardrail({ inputTs: file, artifactsDir })
      expect(result.cli.bytecodeSize).toBeGreaterThan(0)
      expect(result.cli.temporaryScopeAnalysis.totalCount).toBe(0)
      expect(result.bytecode.summary.sizeDiff).toBe(0)
      expect(result.trace.differenceCount).toBe(0)
    } finally {
      await fs.rm(artifactsDir, { recursive: true, force: true })
    }
  })
})
