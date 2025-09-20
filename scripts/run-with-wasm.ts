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

async function runWithWasm(jsPath: string) {
  const modPath = ensureWasmBuilt()
  if (!modPath) throw new Error('QuickJS wasm binding not available')

  const wasm = await import(modPath)
  const mod = await wasm.default()
  const qjs = new mod.QuickJSBytecode()
  const src = readFileSync(jsPath)

  const input = new mod.Uint8Array()
  for (let i = 0; i < src.length; i++) {
    input.push_back(src[i])
  }

  qjs.run(input, new mod.StringArray())
}

async function main() {
  const inputTs = resolve(process.cwd(), process.argv[2])
  const inputBin = inputTs.replace(/\.ts$/, '.bin')

  if (!existsSync(inputBin)) {
    throw new Error('Input binary file does not exist')
  }

  try {
    await runWithWasm(inputBin)
  } catch (e: any) {
    throw new Error('Failed to run with WASM: ' + e.message)
  }
}

main().catch(e => { console.error(e.stack || String(e)); process.exit(1) })
