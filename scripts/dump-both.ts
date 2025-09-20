import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { resolve, join, basename } from 'node:path'
import { disassemble } from '../src/disasm'

function compileSelf(inputTs: string): Buffer {
  const cli = resolve(process.cwd(), 'src/cli.ts')
  const r = spawnSync('npx', ['tsx', cli, inputTs, '--format=quickjs'], { encoding: 'utf8' })
  if (r.status !== 0) {
    throw new Error('self compile failed:\n' + r.stdout + '\n' + r.stderr)
  }
  return readFileSync('output.bin')
}

function ensureWasmBuilt(): string | null {
  const modPath = resolve(process.cwd(), 'third_party/QuickJS/bytecode_wasm/output/quickjs_bytecode.js')
  if (existsSync(modPath)) return modPath
  const buildScript = resolve(process.cwd(), 'scripts/build-bytecode-wasm.ts')
  const r = spawnSync('npx', ['tsx', buildScript], { stdio: 'inherit', encoding: 'utf8' })
  if (r.status !== 0) return null
  return existsSync(modPath) ? modPath : null
}

async function dumpWithWasm(jsPath: string, wantText: boolean): Promise<string | Buffer> {
  const modPath = ensureWasmBuilt()
  if (!modPath) throw new Error('QuickJS wasm binding not available')

  const runner = `
    (async () => {
      const fs = require('fs');
      const path = require('path');
      const src = fs.readFileSync(${JSON.stringify(jsPath)}, 'utf8');
      const wasm = require(${JSON.stringify(modPath)});
      const mod = await wasm();
      const qjs = new mod.QuickJSBytecode();
      if (${JSON.stringify(wantText)}) {
        const text = qjs.dump(src, path.basename(${JSON.stringify(jsPath)}), new mod.StringArray());
        // process.stdout.write(String(text || ''));
        return;
      }
      const vec = qjs.compile(src, path.basename(${JSON.stringify(jsPath)}), new mod.StringArray());
      const len = vec.size ? vec.size() : vec.length; const out = Buffer.alloc(len);
      if (vec.size) { for (let i = 0; i < len; i++) out[i] = vec.get(i); }
      else { for (let i = 0; i < len; i++) out[i] = vec[i]; }
      process.stdout.write(out.toString('base64'));
    })().catch(e => { console.error(e.stack || String(e)); process.exit(2); });
  `
  const r = spawnSync(process.execPath, ['-e', runner], { encoding: 'utf8' })
  if (r.status !== 0) throw new Error('wasm dump failed: ' + (r.stderr || r.stdout))
  return wantText ? (r.stdout || '') : Buffer.from((r.stdout || '').trim(), 'base64')
}

async function main() {
  const inputTs = resolve(process.cwd(), process.argv[2] || '__tests__/compute.ts')
  const wantText = process.argv.includes('--text') || process.argv.includes('--disasm')
  const wantDot = process.argv.includes('--dot') || process.argv.includes('--cfg')
  const wantRun = process.argv.includes('--run')
  const artifactsIdx = process.argv.indexOf('--artifacts-dir')
  const artifactsDir = artifactsIdx >= 0 ? resolve(process.cwd(), process.argv[artifactsIdx + 1]) : resolve(process.cwd(), 'artifacts')

  const jsOverrideIdx = process.argv.indexOf('--input-js')
  const inputJs = jsOverrideIdx >= 0 ? resolve(process.cwd(), process.argv[jsOverrideIdx + 1]) : inputTs.replace(/\.ts$/, '.js')

  // 1) 编译 TS -> 我方字节码
  const selfBin = compileSelf(inputTs)
  // 从 output.bin 无法直接读取 labelKinds，这里复用 CLI 同步的简单启发式注解（基于指令标签名模式）。
  // 后续可在 serialize/parseQuickJS 中附带 labelKinds 元数据。
  const selfDis = disassemble(selfBin, { showCFG: true, printPc2Line: true, dot: wantDot })

  // 2) 用 wasm 编译 JS 并 dump
  let wasmText: string
  let wasmBin: Buffer | undefined
  try {
    wasmText = String(await dumpWithWasm(inputJs, true))
    if (wantRun) {
      const buf = await dumpWithWasm(inputJs, false)
      if (Buffer.isBuffer(buf)) wasmBin = buf
    }
  } catch (e) {
    // fallback：尝试只取字节码（base64），方便后续离线处理
    const buf = await dumpWithWasm(inputJs, false) as Buffer
    wasmText = '<binary base64>\n' + buf.toString('base64')
    wasmBin = buf
  }

  // 输出
  const stem = basename(inputTs).replace(/\.[^.]+$/, '')
  mkdirSync(artifactsDir, { recursive: true })
  const selfPath = join(artifactsDir, `${stem}.self.disasm.txt`)
  const wasmPath = join(artifactsDir, `${stem}.wasm.dump.txt`)

  writeFileSync(selfPath, String(selfDis), 'utf8')
  writeFileSync(wasmPath, wasmText, 'utf8')
  if (wantDot) {
    // 从自家反汇编文本中提取 DOT
    const extractDot = (txt: string) => {
      const marker = 'DOT (CFG):\n'
      const p = txt.indexOf(marker)
      if (p < 0) return ''
      return txt.slice(p + marker.length).trim()
    }
    const dot = extractDot(String(selfDis))
    if (dot) {
      writeFileSync(join(artifactsDir, `${stem}.self.cfg.dot`), dot, 'utf8')
    }
  }

  console.log('== SELF (our disasm) ==')
  console.log(selfDis)
  console.log('\n== WASM (qjsc dump) ==')
  console.log(wasmText)
  const more = wantDot ? `\n  ${join(artifactsDir, `${stem}.self.cfg.dot`)}` : ''
  console.log(`\nSaved to:\n  ${selfPath}\n  ${wasmPath}${more}`)

  if (wantRun) {
    try {
      // 强制重建以确保包含最新的 run 绑定
      const buildScript = resolve(process.cwd(), 'scripts/build-bytecode-wasm.ts')
      spawnSync('npx', ['tsx', buildScript], { stdio: 'inherit', encoding: 'utf8' })
      const modPath = ensureWasmBuilt()
      if (!modPath) throw new Error('QuickJS wasm binding not available')
      // 运行 wasm 字节码（同一进程内先 compile 再 run，避免跨进程/拷贝误差）
      {
        const runner = `
          (async () => {
            const fs = require('fs');
            const path = require('path');
            const src = fs.readFileSync(${JSON.stringify(inputJs)}, 'utf8');
            const wasm = require(${JSON.stringify(resolve(process.cwd(), 'third_party/QuickJS/bytecode_wasm/output/quickjs_bytecode.js'))});
            const mod = await wasm();
            const qjs = new mod.QuickJSBytecode();
            const vec = qjs.compile(src, path.basename(${JSON.stringify(inputJs)}), new mod.StringArray());
            if (typeof qjs.run !== 'function') throw new Error('QuickJSBytecode.run not found; please rebuild WASM');
            const out = qjs.run(vec, new mod.StringArray());
            console.log(String(out || ''));
          })().catch(e => { console.error(e.stack || String(e)); process.exit(2); });
        `
        const r1 = spawnSync(process.execPath, ['-e', runner], { encoding: 'utf8' })
        if (r1.status === 0) {
          console.log('\n== RUN (wasm bytecode) ==')
          console.log(r1.stdout.trim())
        } else {
          console.log('\n== RUN (wasm bytecode) failed ==')
          console.log((r1.stderr || r1.stdout).trim())
        }
      }
      // 运行我方 TS 编译的 output.bin
      try {
        const buf = readFileSync('output.bin')
        const runner2 = `
          (async () => {
            const fs = require('fs');
            const wasm = require(${JSON.stringify(resolve(process.cwd(), 'third_party/QuickJS/bytecode_wasm/output/quickjs_bytecode.js'))});
            const mod = await wasm();
            const qjs = new mod.QuickJSBytecode();
            const raw = Buffer.from(${JSON.stringify((() => { try { return Buffer.from(readFileSync('output.bin')).toString('base64') } catch { return '' } })())}, 'base64');
            const vec = new mod.Uint8Array();
            if (typeof vec.push_back !== 'function') throw new Error('WASM vector missing push_back; please rebuild WASM');
            for (let i = 0; i < raw.length; i++) vec.push_back(raw[i]);
            if (typeof qjs.run !== 'function') throw new Error('QuickJSBytecode.run not found; please rebuild WASM');
            const out = qjs.run(vec, new mod.StringArray());
            console.log(String(out || ''));
          })().catch(e => { console.error(e.stack || String(e)); process.exit(2); });
        `
        const r2 = spawnSync(process.execPath, ['-e', runner2], { encoding: 'utf8' })
        if (r2.status === 0) {
          console.log('\n== RUN (self bytecode) ==')
          console.log(r2.stdout.trim())
        } else {
          console.log('\n== RUN (self bytecode) failed ==')
          console.log((r2.stderr || r2.stdout).trim())
        }
      } catch {}
    } catch (e) {
      console.log('Warn: --run requested but failed:', e instanceof Error ? e.message : String(e))
    }
  }
}

main().catch(e => { console.error(e.stack || String(e)); process.exit(1) })
