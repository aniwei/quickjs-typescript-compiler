import ts from 'typescript'
import { TypeScriptCompiler } from '../src/TypeScriptCompiler'
import { Opcode, OPCODE_BY_CODE } from '../src/compiler/Opcode'
import * as fs from 'fs'

// 读取 binary-ops.ts
const source = fs.readFileSync('__tests__/fixtures/binary-ops.ts', 'utf-8')

const comp = new TypeScriptCompiler()

try {
  const bc = comp.compile(source, 'binary-ops.ts')
  console.log('Success! Bytecode length:', bc.length)
} catch (e: any) {
  console.log('Error:', e.message)
  console.log(e.stack)
}
