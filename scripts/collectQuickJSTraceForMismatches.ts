#!/usr/bin/env tsx

import fs from 'node:fs/promises'
import path from 'node:path'
import { QuickJSLib } from './QuickJSLib'

type MismatchEntry = {
  fixture: string
  identical: boolean
  tags: string[]
}

function parseArgs(argv: string[]) {
  const opts = {
    artifactsDir: path.resolve('artifacts'),
    mismatchesFile: path.resolve('artifacts/mismatch-structure-summary.json'),
    traceDirName: 'trace',
    overwrite: false,
    onlyFixture: '' as string,
  }

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    switch (a) {
      case '--artifacts-dir':
      case '--artifacts': {
        const v = argv[++i]
        if (!v) throw new Error(`${a} requires a path`)
        opts.artifactsDir = path.resolve(v)
        break
      }
      case '--mismatches': {
        const v = argv[++i]
        if (!v) throw new Error('--mismatches requires a path')
        opts.mismatchesFile = path.resolve(v)
        break
      }
      case '--overwrite':
        opts.overwrite = true
        break
      case '--only': {
        const v = argv[++i]
        if (!v) throw new Error('--only requires a fixture name')
        opts.onlyFixture = v
        break
      }
      default:
        throw new Error(`Unknown arg: ${a}`)
    }
  }

  return opts
}

async function fileExists(p: string) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))

  // Enable trace build & runtime output.
  // Note: build-time enabling is handled by QuickJSLib.ensureWasmBuilt() which
  // will rebuild wasm with -DQTS_TRACE_* based on these env vars.
  process.env.QTS_TRACE_ENABLED = process.env.QTS_TRACE_ENABLED || '1'
  process.env.QTS_TRACE_LEVEL = process.env.QTS_TRACE_LEVEL || '1'
  // Default to the most useful categories for locating bytecode drift.
  process.env.QTS_TRACE_EMIT = process.env.QTS_TRACE_EMIT || '1'
  process.env.QTS_TRACE_LABEL = process.env.QTS_TRACE_LABEL || '1'
  process.env.QTS_TRACE_SCOPE = process.env.QTS_TRACE_SCOPE || '1'

  const raw = await fs.readFile(opts.mismatchesFile, 'utf8')
  const entries = JSON.parse(raw) as MismatchEntry[]

  const mismatches = entries.filter((e) => !e.identical)
  const selected = opts.onlyFixture ? mismatches.filter((e) => e.fixture === opts.onlyFixture) : mismatches

  if (!selected.length) {
    console.log('No mismatches selected. (All identical or filter mismatch)')
    return
  }

  console.log(`Collecting QuickJS [QTS:*] trace for ${selected.length} mismatched fixture(s)...`)

  for (const entry of selected) {
    const fixtureName = entry.fixture
    const fixtureTs = path.resolve('__tests__/fixtures', `${fixtureName}.ts`)
    const outDir = path.join(opts.artifactsDir, fixtureName, opts.traceDirName)
    const outPath = path.join(outDir, `${fixtureName}.quickjs.qts-trace.log`)

    await fs.mkdir(outDir, { recursive: true })

    if (!opts.overwrite && (await fileExists(outPath))) {
      console.log(`- ${fixtureName}: skip (exists)`)
      continue
    }

    console.log(`- ${fixtureName}: compiling with QTS trace... tags=${entry.tags.join(',')}`)

    const referenceTs = await fs.readFile(fixtureTs, 'utf8')
    // Use .js path to match existing behavior.
    const fakeJsPath = path.relative(process.cwd(), fixtureTs).replace(/\.ts$/i, '.js')

    const { result, stderr } = await QuickJSLib.withCapturedOutput(async () => {
      const wasm = await QuickJSLib.getWasmInstance()
      const args = new wasm.StringArray()
      // Keep output stable; tracing is emitted via printErr in QuickJS.
      return wasm.QuickJSBinding.compile(referenceTs, fakeJsPath, args)
    })

    // Filter to QTS lines only to keep logs small.
    const qtsLines = stderr.filter((l) => String(l).startsWith('[QTS]') || String(l).startsWith('[QTS:'))

    await fs.writeFile(outPath, qtsLines.join('\n') + (qtsLines.length ? '\n' : ''), 'utf8')

    // Keep a tiny sidecar for tooling.
    await fs.writeFile(
      path.join(outDir, `${fixtureName}.quickjs.qts-trace.meta.json`),
      JSON.stringify(
        {
          fixture: fixtureName,
          input: path.relative(process.cwd(), fixtureTs),
          tags: entry.tags,
          lines: qtsLines.length,
        },
        null,
        2,
      ),
      'utf8',
    )

    // Avoid unused var warning while still ensuring compilation happens.
    void result
  }

  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
