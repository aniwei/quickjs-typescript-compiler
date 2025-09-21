import { QuickJSBinding } from './QuickJSBinding.js'
import * as path from 'node:path'
import { promises as fs } from 'node:fs'
import { existsSync } from 'node:fs'
import { normalizeShortOpcodes as normShort, decodeOurs, parseWasmDump } from '../src/compare/decoder.js'

type Options = {
  disasm: boolean
  normalizeShort: boolean
  sideBySide: boolean
  artifactsDir: string
  inputJs?: string
}

function parseArgs(argv: string[]): { tsInput: string, opts: Options } {
  const [ , , tsInput, ...rest] = argv
  const opts: Options = {
    disasm: rest.includes('--disasm'),
    normalizeShort: rest.includes('--normalize-short'),
    sideBySide: rest.includes('--side-by-side'),
    artifactsDir: (() => {
      const i = rest.indexOf('--artifacts-dir')
      return i >= 0 ? (rest[i + 1] || 'artifacts') : 'artifacts'
    })()
  }
  const jsIdx = rest.indexOf('--input-js')
  if (jsIdx >= 0) opts.inputJs = rest[jsIdx + 1]
  return { tsInput: tsInput || '', opts }
}

function hex(buf: Uint8Array) {
  return Array.from(buf).map(b => b.toString(16).padStart(2, '0')).join(' ')
}

// 使用共享的规范化函数

async function writeArtifact(dir: string, name: string, content: string | Uint8Array) {
  await fs.mkdir(dir, { recursive: true })
  const p = path.join(dir, name)
  if (typeof content === 'string') {
    await fs.writeFile(p, content, 'utf-8')
  } else {
    await fs.writeFile(p, content)
  }
  return p
}

async function main() {
  const { tsInput, opts } = parseArgs(process.argv)
  if (!tsInput) {
    console.error('用法：tsx scripts/compare-with-wasm.ts <input.ts> --input-js <compiled.js> [--disasm] [--normalize-short] [--side-by-side] [--artifacts-dir artifacts]')
    process.exit(1)
  }

  // 解析输入路径，容错 VSCode 任务中可能的路径差异
  let absTs = path.resolve(tsInput)
  if (!existsSync(absTs) && /compute\.ts$/.test(tsInput)) {
    const fallback = path.resolve('__tests__/compiler/fixtures/compute.ts')
    if (existsSync(fallback)) absTs = fallback
  }

  // wasm 侧使用 JS 源（若提供），否则退回 TS（某些场景下可能失败）
  let wasmInput = opts.inputJs ? path.resolve(opts.inputJs) : absTs
  if (!existsSync(wasmInput)) {
    const fb = path.resolve('__tests__/compiler/fixtures/compute.js')
    if (existsSync(fb)) wasmInput = fb
    else wasmInput = absTs // 最终兜底用 ts 源（内容通常是 JS 兼容）
  }
  const wasmBin = await QuickJSBinding.compileSourcePath(wasmInput)

  // 我们自己的编译器产物：当前 compile API 在 src/compiler/bytecode.ts 中
  const { compile } = await import('../src/compiler/index.js')
  const oursBin: Uint8Array = compile(absTs)

  // 归一化可选
  const wasmNorm = opts.normalizeShort ? normShort(wasmBin) : wasmBin
  const oursNorm = opts.normalizeShort ? normShort(oursBin) : oursBin

  // 输出制品
  const outDir = path.resolve(opts.artifactsDir)
  const wasmBinPath = await writeArtifact(outDir, 'wasm.bin', wasmBin)
  const oursBinPath = await writeArtifact(outDir, 'ours.bin', oursBin)
  if (opts.normalizeShort) {
    await writeArtifact(outDir, 'wasm.norm.bin', wasmNorm)
    await writeArtifact(outDir, 'ours.norm.bin', oursNorm)
  }

  if (opts.disasm) {
    // wasm：dump 文本 + 十六进制
    const wasmDump = await QuickJSBinding.dumpBytesToString(wasmNorm)
    await writeArtifact(outDir, 'wasm.disasm.txt', wasmDump)
    await writeArtifact(outDir, 'wasm.hex.txt', hex(wasmNorm))

    // ours：输出伪反汇编（基于共享 decoder）
    const oursInstr = decodeOurs(oursNorm)
    const lines: string[] = oursInstr.map(x => {
      const args = x.args.length ? ' ' + x.args.join(' ') : ''
      return x.pc.toString().padStart(4, ' ') + ': ' + x.name + args
    })
    await writeArtifact(outDir, 'ours.disasm.txt', lines.join('\n'))
  }

  if (opts.sideBySide) {
    // 结构化对齐：解析 wasm dump 与 ours 字节码为指令数组
    type Instr = { pc: number, name: string, args: (number|string)[] }
    const wasmDumpText = await fs.readFile(path.join(outDir, 'wasm.disasm.txt'), 'utf-8').catch(() => '')
    const wasmInstr = parseWasmDump(wasmDumpText)
    const oursInstr = decodeOurs(oursNorm)

    // JSON 产物
    await writeArtifact(outDir, 'instr.json', JSON.stringify({ wasm: wasmInstr, ours: oursInstr }, null, 2))

    // 指令级并排（按索引对齐，基础版）
    const n = Math.max(wasmInstr.length, oursInstr.length)
    const W = 48
    const rows: string[] = []
    const fmt = (x?: Instr) => {
      if (!x) return ''
      const args = x.args.map(a => String(a)).join(', ')
      return `${x.name}${args ? ' ' + args : ''}`
    }
    rows.push('WASM'.padEnd(W) + ' | ' + 'OURS')
    rows.push('-'.repeat(W) + '-+-' + '-'.repeat(W))
    for (let i = 0; i < n; i++) {
      const a = fmt(wasmInstr[i]).slice(0, W)
      const b = fmt(oursInstr[i]).slice(0, W)
      rows.push(a.padEnd(W) + ' | ' + b)
    }
    await writeArtifact(outDir, 'side-by-side.txt', rows.join('\n'))
    console.log(`Side-by-side (instruction-level) written: ${path.relative(process.cwd(), path.join(outDir, 'side-by-side.txt'))}`)
  }

  console.log(`Artifacts written to: ${path.relative(process.cwd(), outDir)}`)
  console.log(`  wasm: ${path.relative(process.cwd(), wasmBinPath)} (${wasmBin.byteLength} bytes)\n  ours: ${path.relative(process.cwd(), oursBinPath)} (${oursBin.byteLength} bytes)`) 
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
