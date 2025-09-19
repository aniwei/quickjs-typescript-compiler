#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs'
import { resolve, relative } from 'node:path'
import { compileToIR } from './compile'
import { emitBytecode } from './bytecode'
import { serialize, writeModule } from './assembler'
import { disassemble } from './disasm'



function main () {
  const input = process.argv[2] || '__tests__/compute.ts'
  const cwd = process.cwd()
  const abs = resolve(cwd, input)

  if (!existsSync(abs)) {
    console.error('Input not found:', abs)
    process.exit(1)
  }

  // 使用预生成 build-opcodes.ts 的 opcodes，不再调用旧 gen-opcodes
  const src = readFileSync(abs, 'utf8')
  // 简易指令序言检测：源码开头是否包含 'use strict' 或 "use strict"
  function detectStrictPrologue(text: string): boolean {
    // 允许前导 BOM/空白/换行；匹配首个非空行是 'use strict' 或 "use strict"
    const trimmed = text.replace(/^\uFEFF?/, '')
    // 取前几行检查指令语句
    const lines = trimmed.split(/\r?\n/)
    for (const raw of lines) {
      const line = raw.trim()
      if (!line) continue
      // 只检查第一条非空行；若是字符串字面量则视为指令
      if (line === '\'use strict\'' || line === '"use strict"' || line.startsWith('\'use strict\';') || line.startsWith('"use strict";')) return true
      break
    }
    return false
  }
  const ir = compileToIR(src, abs)

  const { 
    code, 
    constants, 
    atoms, 
    localCount, 
    stackSize, 
    locals,
    localKinds,
    labels,
    sourceMarks
  } = emitBytecode(ir)

  const debug = process.argv.includes('--debug')
  const strict = process.argv.includes('--strict') || detectStrictPrologue(src)
  // 规范化 debug 文件名：使用相对路径，并将 .ts 扩展转换为 .js（对齐 qjsc）
  const relPath = relative(cwd, abs).replace(/\\/g, '/')
  const debugFilename = relPath.replace(/\.ts$/i, '.js')
  const capturedLocals = Array.from(locals.keys()).filter(k => /outer/i.test(k))
  const localsMapObj: Record<string, number> = Object.fromEntries(locals.entries())
  const localKindsObj: Record<string, 'var' | 'let' | 'const'> = localKinds ? Object.fromEntries(localKinds.entries()) as any : {}

  const mod = serialize({ 
    code, 
    constants, 
    atoms, 
    localCount, 
    stackSize, 
    sourceMarks,
    // 当存在严格模式或启用 --debug 时，总是携带规范化的 debug 文件名，确保 has_debug 与文件名原子对齐
    debug: (debug || strict) ? { filename: debugFilename, strict } : undefined as any, 
    localsMap: localsMapObj, 
    localKindsMap: localKindsObj,
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
  const wantPC2 = process.argv.includes('--pc2line')
  
  if (wantDisasm || wantCFG || wantDOT) {
    // 通过发射阶段的 label -> pc 映射构建 pc 注释
    const pcAnnotations: Record<number, string> = {}
    for (const [name, pc] of labels) {
      if (/(_for_start|_while_start)/.test(name)) pcAnnotations[pc] = 'loop-start'
      else if (/(_for_end|_while_end)/.test(name)) pcAnnotations[pc] = 'loop-end'
      else if (/(_for_continue|_while_start)/.test(name)) pcAnnotations[pc] = 'loop-continue'
    }
    const text = disassemble(mod.buffer, { showCFG: wantCFG, dot: wantDOT, pcAnnotations, printPc2Line: wantPC2 })
    console.log(text)
  }
}

if (require.main === module) {
  main()
}
