import { TypeScriptCompiler } from './TypeScriptCompiler'
import fs from 'fs'
import path from 'path'
import { createAdvancedDisassembly } from './disasm'

const args = process.argv.slice(2)
const filename = args[0]

if (!filename) {
  console.error('Usage: tsx src/cli.ts <filename> [--disasm] [--debug]')
  process.exit(1)
}

const source = fs.readFileSync(filename, 'utf-8')
const compiler = new TypeScriptCompiler()
const bytecode = compiler.compile(source, filename)

if (args.includes('--disasm')) {
  console.log('Bytecode size:', bytecode.length)
  console.log(createAdvancedDisassembly(bytecode))
} else {
  const outFile = filename.replace(/\.ts$/, '.qbc')
  fs.writeFileSync(outFile, bytecode)
  console.log(`Compiled to ${outFile}`)
}
