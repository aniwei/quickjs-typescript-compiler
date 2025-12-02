import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { TypeScriptCompiler } from '../../src'
import { BytecodeComparator } from '../../scripts/compareWithWasm'

jest.setTimeout(120_000)

const fixtureNames = ['trace-smoke', 'empty-program'] as const

function getFixturePath(name: (typeof fixtureNames)[number]): string {
  return path.join(__dirname, 'fixtures', `${name}.ts`)
}

async function pathExists(target: string): Promise<boolean> {
  try {
    await fs.access(target)
    return true
  } catch {
    return false
  }
}

describe('serializer guardrail', () => {
  test.each(fixtureNames)('serializes %s fixture into bytecode', async (fixtureName) => {
    const compiler = new TypeScriptCompiler()
    const bytecode = await compiler.compileFile(getFixturePath(fixtureName))
    expect(bytecode).toBeInstanceOf(Uint8Array)
    expect(bytecode.byteLength).toBeGreaterThan(0)
  })

  test.each(fixtureNames)('compareWithWasm archives artifacts for %s fixture', async (fixtureName) => {
    const artifactsDir = await fs.mkdtemp(path.join(os.tmpdir(), `${fixtureName}-artifacts-`))
    const fixturePath = getFixturePath(fixtureName)

    try {
      const comparator = new BytecodeComparator({
        inputTs: fixturePath,
        disasm: true,
        showDiff: true,
        artifactsDir,
      })
      const summary = await comparator.compare()

      expect(summary.tsSize).toBeGreaterThan(0)
      expect(summary.wasmSize).toBeGreaterThan(0)

      const expectedFiles = [
        `${fixtureName}.ts.qbc`,
        `${fixtureName}.wasm.qbc`,
        `${fixtureName}.analysis.json`,
        `${fixtureName}.report.md`,
      ]

      for (const file of expectedFiles) {
        const filePath = path.join(artifactsDir, file)
        expect(await pathExists(filePath)).toBe(true)
      }

      const analysisPath = path.join(artifactsDir, `${fixtureName}.analysis.json`)
      const analysis = JSON.parse(await fs.readFile(analysisPath, 'utf8'))
      expect(analysis.inputFile).toContain(`${fixtureName}.ts`)
      expect(analysis.compilation.typescript.size).toBe(summary.tsSize)
      expect(Array.isArray(analysis.differences)).toBe(true)
      expect(analysis.differences.length).toBeGreaterThanOrEqual(0)
    } finally {
      await fs.rm(artifactsDir, { recursive: true, force: true })
    }
  })
})
