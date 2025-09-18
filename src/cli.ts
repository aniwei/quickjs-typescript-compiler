#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { compileToIR } from './compile'
import { emitBytecode } from './bytecode'
import { serializeQuickJS, writeModule } from './assembler'
import { disassemble } from './disasm'



function main () {
  const input = process.argv[2] || '__tests__/compute.ts'
  const abs = resolve(process.cwd(), input)

  if (!existsSync(abs)) {
    console.error('Input not found:', abs)
    process.exit(1)
  }

  // 使用预生成 build-opcodes.ts 的 opcodes，不再调用旧 gen-opcodes
  const src = readFileSync(abs, 'utf8')
  const ir = compileToIR(src, abs)

  const { 
    code, 
    constants, 
    atoms, 
    localCount, 
    stackSize, 
    locals 
  } = emitBytecode(ir)

  const debug = process.argv.includes('--debug')
  const capturedLocals = Array.from(locals.keys()).filter(k => /outer/i.test(k))
  const localsMapObj: Record<string, number> = Object.fromEntries(locals.entries())

  const mod = serializeQuickJS({ 
    code, 
    constants, 
    atoms, 
    localCount, 
    stackSize, 
    debug: debug ? { filename: abs } : undefined, 
    localsMap: localsMapObj, 
    capturedLocals 
  })

  const outPath = resolve(process.cwd(), 'output.bin')
  writeModule(mod, outPath)
  if (process.env.DUMP_ASM) {
  console.log('=== LOCALS ===')
  console.log('localCount', localCount)
  console.log('localsMap', localsMapObj)
  if (capturedLocals) console.log('capturedLocals', capturedLocals)
  console.log('stackSize', stackSize)
  console.log('debug', debug)
  console.log('=== ATOMS ===')
  atoms.forEach((a, i) => console.log(i, a))
  console.log('=== CONST POOL ===')
  constants.forEach((c, i) => console.log(i, c))
  console.log('=== CODE ===')
  console.log(code.map(b => b.toString(16).padStart(2, '0')).join(' '))
  }
  console.log('Wrote', outPath, 'size=', mod.buffer.length, 'format=quickjs')
  const wantDisasm = process.argv.includes('--disasm')
  const wantCFG = process.argv.includes('--showCFG')
  const wantDOT = process.argv.includes('--dot')
  if (wantDisasm || wantCFG || wantDOT) {
    const text = disassemble(mod.buffer, { showCFG: wantCFG, dot: wantDOT })
    console.log(text)
  }
}

if (require.main === module) {
  main()
}
