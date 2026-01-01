import { readFileSync } from 'node:fs'
import { parseBytecodeModule } from '../src/bytecodeReader'
import { createAdvancedDisassembly } from '../src/disasm'

function main() {
  const inFile = process.argv[2]
  if (!inFile) {
    console.error('Usage: tsx scripts/debug_disasm_outer.ts <input.qbc>')
    process.exit(1)
  }
  const bytes = readFileSync(inFile)
  const mod = parseBytecodeModule(bytes)

  console.log('=== Outer Function Disasm ===')
  console.log(`bytecodeLen=${mod.func.bytecodeLen} stackSize=${mod.func.stackSize} varCount=${mod.func.varCount} argCount=${mod.func.argCount}`)

  // createAdvancedDisassembly already prints outer + inner; that’s what we want.
  console.log(createAdvancedDisassembly(bytes))
}

main()
