import { QuickJSLib } from '../QuickJSLib'

async function main() {
  const inFile = process.argv[2]
  if (!inFile) {
    console.error('Usage: tsx scripts/debug/dumpQbc.ts <input.qbc>')
    process.exit(1)
  }

  await QuickJSLib.dumpWithBinaryPath(inFile)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
