#!/usr/bin/env tsx

import { QuickJSLib } from './QuickJSLib'

async function main() {
  const [ , , binaryPath] = process.argv
  if (!binaryPath) {
    console.error('Usage: tsx scripts/dumpBinary.ts <bytecode-file>')
    process.exit(1)
  }

  await QuickJSLib.dumpWithBinaryPath(binaryPath)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
