import fs from 'node:fs/promises'
import { Compiler } from '../src/compiler'

async function main() {
  const file = process.argv[2]
  if (!file) throw new Error('provide file')
  const source = await fs.readFile(file, 'utf8')
  const compiler: any = new Compiler(file, source, {})
  // Access private methods via any
  const mapping = compiler.computeDebugSourceMapping ? compiler.computeDebugSourceMapping(source) : null
  if (mapping) {
    const { strippedSource } = mapping as { strippedSource: string }
    console.log('--- stripped ---')
    console.log(strippedSource)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
