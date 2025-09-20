import { spawnSync } from 'node:child_process'
import { readFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs'
import { resolve, basename, join } from 'node:path'
import { tmpdir } from 'node:os'

function die(msg: string): never { console.error(msg); process.exit(1) }

const args = process.argv.slice(2)

const input = resolve(process.cwd(), args[0])
if (!existsSync(input)) die('Input binary not found: ' + input)

  function ensureWasmBuilt(): string | null {
  const modPath = resolve(process.cwd(), 'third_party/QuickJS/bytecode_wasm/output/quickjs_bytecode.js')
  if (existsSync(modPath)) return modPath
  const buildScript = resolve(process.cwd(), 'scripts/build-bytecode-wasm.ts')
  const r = spawnSync('npx', ['tsx', buildScript], { stdio: 'inherit', encoding: 'utf8' })
  if (r.status !== 0) return null
  return existsSync(modPath) ? modPath : null
}

async function dumpWithWasm(jsPath: string) {
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

  const result = qjs.dumpWithBin(input, new mod.StringArray())
  console.log(result)
}


async function main() {
  const input = resolve(process.cwd(), process.argv[2])

  if (!existsSync(input)) {
    throw new Error('Input file does not exist')
  }

  try {
    await dumpWithWasm(input)
  } catch (e: any) {
    throw new Error('Failed to compile with WASM: ' + e.message)
  }
}

main().catch(e => { console.error(e.stack || String(e)); process.exit(1) })
