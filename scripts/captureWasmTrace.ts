#!/usr/bin/env tsx

import fs from 'node:fs/promises'
import path from 'node:path'
import { QuickJSLib } from './QuickJSLib'

function getArgValue(argv: string[], name: string): string | undefined {
  const idx = argv.indexOf(name)
  if (idx === -1) return undefined
  return argv[idx + 1]
}

async function main() {
  const argv = process.argv.slice(2)
  const inputPath = getArgValue(argv, '--input')
  const sourcePath = getArgValue(argv, '--source-path') ?? inputPath
  const isModuleRaw = getArgValue(argv, '--is-module')

  if (!inputPath) {
    throw new Error('Missing required arg: --input <path>')
  }
  if (!sourcePath) {
    throw new Error('Missing required arg: --source-path <path>')
  }
  if (isModuleRaw !== '0' && isModuleRaw !== '1') {
    throw new Error('Missing/invalid arg: --is-module 0|1')
  }

  const code = await fs.readFile(inputPath, 'utf8')
  const absSourcePath = path.isAbsolute(sourcePath) ? sourcePath : path.resolve(sourcePath)

  if (isModuleRaw === '1') {
    await QuickJSLib.compileSource(code, absSourcePath)
  } else {
    await QuickJSLib.compileSourceAsScript(code, absSourcePath)
  }
}

main().catch((err) => {
  // Keep errors visible to parent capture.
  console.error(String(err?.stack || err?.message || err))
  process.exitCode = 1
})
