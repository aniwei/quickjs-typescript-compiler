import { spawnSync } from 'node:child_process'
import { readFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs'
import { resolve, basename, join } from 'node:path'
import { tmpdir } from 'node:os'

function die(msg: string): never { console.error(msg); process.exit(1) }

const args = process.argv.slice(2)
if (args.length === 0) die('Usage: tsx scripts/qjsc-dump.ts <input.js> [--text]')

const input = resolve(process.cwd(), args[0])
if (!existsSync(input)) die('Input file not found: ' + input)

// Prefer wasm: third_party/QuickJS/bytecode_wasm/output/quickjs_bytecode.js
const wasmModPath = resolve(process.cwd(), 'third_party/QuickJS/bytecode_wasm/output/quickjs_bytecode.js')
const wantText = args.includes('--text')

// Auto-build wasm if missing
if (!existsSync(wasmModPath)) {
  try {
    const buildScript = resolve(process.cwd(), 'scripts/build-bytecode-wasm.ts')
    const br = spawnSync('npx', ['tsx', buildScript], { stdio: 'inherit', encoding: 'utf8' })
    if (br.status !== 0) {
      // continue to fallback
    }
  } catch {}
}

if (existsSync(wasmModPath)) {
  const runner = `
    (async () => {
      const fs = require('fs');
      const path = require('path');
      const src = fs.readFileSync(${JSON.stringify(input)}, 'utf8');
      const wasm = require(${JSON.stringify(wasmModPath)});
      const mod = await wasm();
      const qjs = new mod.QuickJSBytecode();
      if (${JSON.stringify(wantText)}) {
        const text = qjs.dump(src, path.basename(${JSON.stringify(input)}), new mod.StringArray());
        process.stdout.write(String(text || ''));
        return;
      }
      const bytes = qjs.compile(src, path.basename(${JSON.stringify(input)}), new mod.StringArray());
      const n = bytes.size ? bytes.size() : bytes.length;
      let line = '';
      for (let i = 0; i < n; i++) {
        const b = bytes.size ? bytes.get(i) : bytes[i];
        line += b.toString(16).padStart(2, '0');
        if ((i + 1) % 16 === 0) { console.log(line.match(/.{2}/g).join(' ')); line=''; }
        else line += ' ';
      }
      if (line.trim()) console.log(line.trim());
    })().catch(e => { console.error(e.stack || String(e)); process.exit(2); });
  `
  const r = spawnSync(process.execPath, ['-e', runner], { encoding: 'utf8' })
  process.stdout.write(r.stdout)
  process.stderr.write(r.stderr)
  process.exit(r.status ?? 1)
}

// Fallback: try qjsc if wasm not available (emit C and parse byte array)
const which = spawnSync(process.platform === 'win32' ? 'where' : 'which', ['qjsc'], { encoding: 'utf8' })

if (which.status !== 0) die('No wasm and qjsc not found in PATH')

const qjsc = which.stdout.trim().split(/\n/)[0]
const tmp = mkdtempSync(join(tmpdir(), 'qjsc-dump-'))
const outC = join(tmp, 'out.c')
const res = spawnSync(qjsc, ['-c', '-o', outC, input], { encoding: 'utf8' })

if (res.status !== 0 || !existsSync(outC)) {
  rmSync(tmp, { recursive: true, force: true })
  die('qjsc -c failed')
}

const content = readFileSync(outC, 'utf8')
const re = /(?:static\s+)?(?:const\s+)?(?:uint8_t|unsigned\s+char)\s+\w+\s*\[\s*(?:\d+)?\s*\]\s*=\s*\{([\s\S]*?)\};/g
let best: number[] | null = null
let m: RegExpExecArray | null

while ((m = re.exec(content)) !== null) {
  const body = m[1]
  const bytes: number[] = []
  const rx = /(0x[0-9a-fA-F]+|\d+)/g
  let t: RegExpExecArray | null

  while ((t = rx.exec(body)) !== null) {
    const lit = t[1]
    const v = lit.startsWith('0x') ? parseInt(lit, 16) : parseInt(lit, 10)
    if (!Number.isNaN(v)) bytes.push(v & 0xff)
  }

  if (!best || bytes.length > best.length) best = bytes
}

if (!best) die('Failed to extract byte array from qjsc output')

let line = ''
for (let i = 0; i < best.length; i++) {
  line += best[i].toString(16).padStart(2, '0')

  if ((i + 1) % 16 === 0) { 
    console.log(line.match(/.{2}/g)!.join(' '))
    line = '' 
  } else {
    line += ' '
  }
}

if (line.trim()) console.log(line.trim())
rmSync(tmp, { recursive: true, force: true })
