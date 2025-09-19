import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parseQuickJS } from '../src/parseQuickJS'

const file = resolve(process.cwd(), 'output.bin')
const buf = readFileSync(file)
const parsed = parseQuickJS(buf)

console.log('ROUNDTRIP SUMMARY')
console.log({ 
  version: parsed.version, 
  funcName: parsed.funcName, 
  atoms: parsed.atoms, 
  cpoolCount: parsed.cpoolCount, 
  constants: parsed.constants 
})
