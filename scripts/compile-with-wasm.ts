import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { resolve, join, basename } from 'node:path'
import { disassemble } from '../src/disasm'

function ensureWasmBuilt(): string | null {
  const modPath = resolve(process.cwd(), 'third_party/QuickJS/bytecode_wasm/output/quickjs_bytecode.js')
  if (existsSync(modPath)) return modPath
  const buildScript = resolve(process.cwd(), 'scripts/build-bytecode-wasm.ts')
  const r = spawnSync('npx', ['tsx', buildScript], { stdio: 'inherit', encoding: 'utf8' })
  if (r.status !== 0) return null
  return existsSync(modPath) ? modPath : null
}

async function compileWithWasm(jsPath: string, wantText: boolean): Promise<string | Buffer> {
  const modPath = ensureWasmBuilt()
  if (!modPath) throw new Error('QuickJS wasm binding not available')

  const wasm = await import(modPath)
  const mod = await wasm.default()
  const qjs = new mod.QuickJSBytecode()
  const src = readFileSync(jsPath, 'utf8');
  const vec = qjs.compile(src, basename(jsPath), new mod.StringArray())
  const len = vec.size ? vec.size() : vec.length
  const out = Buffer.alloc(len)
  
  if (vec.size) {
    for (let i = 0; i < len; i++) out[i] = vec.get(i)
  } else {
    for (let i = 0; i < len; i++) out[i] = vec[i]
  }

  return out
}

async function main() {
  const inputTs = resolve(process.cwd(), process.argv[2])
  const inputJs = inputTs.replace(/\.ts$/, '.js')
  const outputWasm = inputJs.replace(/\.js$/, '.bin')

  if (!existsSync(inputJs)) {
    throw new Error('Input JavaScript file does not exist')
  }

  try {
    const wasmText = await compileWithWasm(inputJs, true)
    writeFileSync(outputWasm, wasmText, 'utf8')
  } catch (e: any) {
    throw new Error('Failed to compile with WASM: ' + e.message)
  }
}

main().catch(e => { console.error(e.stack || String(e)); process.exit(1) })
