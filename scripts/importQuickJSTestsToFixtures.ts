#!/usr/bin/env tsx

import fs from 'node:fs/promises'
import path from 'node:path'

interface Options {
  srcDir: string
  outDir: string
  clean: boolean
}

async function pathExists(p: string): Promise<boolean> {
  try {
    await fs.stat(p)
    return true
  } catch {
    return false
  }
}

async function collectJsFiles(rootDir: string): Promise<string[]> {
  const out: string[] = []

  async function walk(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        await walk(full)
        continue
      }
      if (entry.isFile() && entry.name.endsWith('.js')) {
        out.push(full)
      }
    }
  }

  await walk(rootDir)
  out.sort((a, b) => a.localeCompare(b))
  return out
}

function parseArgs(argv: string[]): Options {
  const opts: Options = {
    srcDir: path.resolve('third_party/QuickJS/__tests__'),
    outDir: path.resolve('__tests__/fixtures_quickjs'),
    clean: false,
  }

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    switch (arg) {
      case '--src':
      case '--src-dir': {
        const v = argv[i + 1]
        if (!v) throw new Error(`${arg} requires a path`)
        opts.srcDir = path.resolve(v)
        i++
        break
      }
      case '--out':
      case '--out-dir': {
        const v = argv[i + 1]
        if (!v) throw new Error(`${arg} requires a path`)
        opts.outDir = path.resolve(v)
        i++
        break
      }
      case '--clean':
        opts.clean = true
        break
      default:
        throw new Error(`Unknown argument: ${arg}`)
    }
  }

  return opts
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))

  if (!(await pathExists(opts.srcDir))) {
    throw new Error(`Source dir not found: ${opts.srcDir}`)
  }

  if (opts.clean && (await pathExists(opts.outDir))) {
    await fs.rm(opts.outDir, { recursive: true, force: true })
  }

  const jsFiles = await collectJsFiles(opts.srcDir)
  if (jsFiles.length === 0) {
    console.log(`No .js files found under ${opts.srcDir}`)
    return
  }

  let written = 0
  for (const inFile of jsFiles) {
    const rel = path.relative(opts.srcDir, inFile)
    const outRel = rel.replace(/\.js$/i, '.ts')
    const outFile = path.join(opts.outDir, outRel)

    const data = await fs.readFile(inFile)
    await fs.mkdir(path.dirname(outFile), { recursive: true })
    await fs.writeFile(outFile, data)
    written++
  }

  console.log(`Imported ${written} file(s) from ${opts.srcDir} -> ${opts.outDir}`)
}

main().catch((err) => {
  console.error('❌ importQuickJSTestsToFixtures failed:', err)
  process.exitCode = 1
})
