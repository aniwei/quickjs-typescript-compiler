import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { compareModuleTrace } from '../../scripts/compareModuleTrace'

jest.setTimeout(120_000)

async function pathExists(target: string): Promise<boolean> {
  try {
    await fs.access(target)
    return true
  } catch {
    return false
  }
}

const fixtureNames = ['trace-smoke', 'empty-program'] as const

function getFixturePath(name: (typeof fixtureNames)[number]): string {
  return path.join(__dirname, 'fixtures', `${name}.ts`)
}

describe('trace guardrail', () => {
  test.each(fixtureNames)('compareModuleTrace emits trace artifacts for %s fixture', async (fixtureName) => {
    const artifactsDir = await fs.mkdtemp(path.join(os.tmpdir(), `trace-guardrail-${fixtureName}-`))
    const fixturePath = getFixturePath(fixtureName)

    try {
  const result = await compareModuleTrace({ inputTs: fixturePath, artifactsDir })
  expect(await pathExists(result.tsTracePath)).toBe(true)
  expect(await pathExists(result.wasmTracePath)).toBe(true)
  expect(await pathExists(result.summaryPath)).toBe(true)
  expect(result.tsEvents.length).toBeGreaterThan(0)
  expect(result.wasmEvents.length).toBeGreaterThan(0)
  expect(result.differences.length).toBeGreaterThanOrEqual(0)
    } finally {
      await fs.rm(artifactsDir, { recursive: true, force: true })
    }
  })
})
