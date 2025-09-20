import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function ensureWasmBuilt(): string | null {
  const modPath = resolve(process.cwd(), 'third_party/QuickJS/bytecode_wasm/output/quickjs_bytecode.js')
  if (existsSync(modPath)) return modPath
  try {
    const { spawnSync } = require('node:child_process')
    const buildScript = resolve(process.cwd(), 'scripts/build-bytecode-wasm.ts')
    const r = spawnSync('npx', ['tsx', buildScript], { stdio: 'inherit', encoding: 'utf8' })
    if (r.status !== 0) return null
  } catch {}
  return existsSync(modPath) ? modPath : null
}

async function main() {
  const binPath = resolve(process.cwd(), process.argv[2] || 'output.bin')
  if (!existsSync(binPath)) {
    console.error('Binary not found:', binPath)
    process.exit(2)
  }
  const modPath = ensureWasmBuilt()
  if (!modPath) {
    console.error('QuickJS wasm binding not available')
    process.exit(2)
  }
  const src = readFileSync(binPath)
  const wasm = await import(modPath)
  const mod = await wasm.default()
  const qjs = new mod.QuickJSBytecode()
  const vec = new mod.Uint8Array()
  for (let i = 0; i < src.length; i++) vec.push_back(src[i])
  const msg = qjs.validate(vec)
  if (msg && String(msg).trim().length > 0) {
    console.error('[VALIDATE] error:', String(msg))
    process.exit(1)
  } else {
    console.log('[VALIDATE] ok')
  }
}

main().catch(e => { console.error(e.stack || String(e)); process.exit(1) })
