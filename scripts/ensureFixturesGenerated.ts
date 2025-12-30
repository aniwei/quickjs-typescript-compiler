#!/usr/bin/env tsx

import fs from 'node:fs/promises'
import path from 'node:path'
import * as ts from 'typescript'

const FIXTURES_DIR = path.resolve('__tests__/fixtures')
const OUT_DIR = path.resolve('__tests__/fixtures_generated')

type FixtureInfo = {
  id: string
  srcPath: string
  outTsPath: string
  outJsPath: string
}

function findFixtureId(fileName: string): string | null {
  const m = fileName.match(/-(\d{3})\.ts$/)
  return m?.[1] ?? null
}

function transpileToJs(tsCode: string, fileName: string): string {
  const transpiled = ts.transpileModule(tsCode, {
    fileName,
    reportDiagnostics: false,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      jsx: ts.JsxEmit.Preserve,
      importHelpers: false,
      esModuleInterop: false,
    },
  })
  return transpiled.outputText || ''
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })

  const entries = await fs.readdir(FIXTURES_DIR, { withFileTypes: true })
  const fixtures: FixtureInfo[] = []
  const byId = new Map<string, FixtureInfo>()

  for (const ent of entries) {
    if (!ent.isFile()) continue
    if (!ent.name.endsWith('.ts')) continue

    const id = findFixtureId(ent.name)
    if (!id) continue

    const srcPath = path.join(FIXTURES_DIR, ent.name)
    const outTsPath = path.join(OUT_DIR, `complex-${id}.ts`)
    const outJsPath = path.join(OUT_DIR, `complex-${id}.js`)

    const info: FixtureInfo = { id, srcPath, outTsPath, outJsPath }
    if (byId.has(id)) {
      const prev = byId.get(id)!
      throw new Error(`Duplicate fixture id -${id}.ts: ${prev.srcPath} and ${srcPath}`)
    }
    byId.set(id, info)
    fixtures.push(info)
  }

  fixtures.sort((a, b) => a.id.localeCompare(b.id))

  let wrote = 0
  for (const f of fixtures) {
    const tsCode = await fs.readFile(f.srcPath, 'utf8')
    const jsCode = transpileToJs(tsCode, f.srcPath)

    await fs.writeFile(f.outTsPath, tsCode)
    await fs.writeFile(f.outJsPath, jsCode)
    wrote++
  }

  console.log(`ensureFixturesGenerated: wrote ${wrote} fixture pairs into ${OUT_DIR}`)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
