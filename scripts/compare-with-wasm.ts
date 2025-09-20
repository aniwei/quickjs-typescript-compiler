import { spawnSync } from 'node:child_process'
import { resolve, join } from 'node:path'
import { tmpdir } from 'node:os'
import { readFileSync, existsSync, mkdtempSync, mkdirSync, writeFileSync, accessSync, constants } from 'node:fs'
import { parseQuickJS } from '../src/parseQuickJS'
import { disassemble } from '../src/disasm'

function which(cmd: string): string | null {
  const r = spawnSync('which', [cmd], { encoding: 'utf8' })

  if (r.status === 0) return r.stdout.trim() || null
  // Environment override
  
  const envPath = process.env.QJSC
  if (envPath) return envPath
  
  // Fallbacks for common Homebrew locations
  const fallbacks = ['/opt/homebrew/bin/qjsc', '/usr/local/bin/qjsc']

  for (const p of fallbacks) {
    try {
      accessSync(p, constants.X_OK)
      return p
    } catch {}
  }

  return null
}

function compileSelf(
  input: string, 
  opts: { debug: boolean; format: 'quickjs' | 'legacy' }
) {
  const cli = resolve(process.cwd(), 'src/cli.ts')
  const args = ['tsx', cli, input, `--format=${opts.format}`]

  if (opts.debug) args.push('--debug')

  const r = spawnSync('npx', args, { env: { ...process.env }, encoding: 'utf8' })

  if (r.status !== 0) throw new Error('self compile failed:\n' + r.stdout + '\n' + r.stderr)
  
  const buf = readFileSync('output.bin')
  return buf
}

function compileWithQjsc(input: string) {
  const qjscPath = which('qjsc')
  if (!qjscPath) return null
  
  // 生成 C 并解析其中的字节数组更稳定（不同版本的 qjsc 标志不一致）
  const tmp = mkdtempSync(join(tmpdir(), 'qjsc-'))
  const cOut = join(tmp, 'out.c')
  const r = spawnSync(qjscPath, ['-c', '-o', cOut, input], { encoding: 'utf8' })
  
  if (r.status !== 0) {
    throw new Error('qjsc C emit failed:\n' + r.stdout + '\n' + r.stderr)
  }

  const c = readFileSync(cOut, 'utf8')
  const arr = extractByteArrayFromC(c)
  
  if (!arr) {
    throw new Error('failed to extract byte array from qjsc C output')
  }

  return Buffer.from(arr)
}

// Try using QuickJS wasm binding to compile JS into bytecode buffer.
function compileWithWasm(input: string): Buffer | null {
  try {
    const modPath = resolve(process.cwd(), 'third_party/QuickJS/bytecode_wasm/output/quickjs_bytecode.js')
    if (!existsSync(modPath)) {
      // auto-build wasm if missing
      try {
        const buildScript = resolve(process.cwd(), 'scripts/build-bytecode-wasm.ts')
        const r = spawnSync('npx', ['tsx', buildScript], { stdio: 'inherit', encoding: 'utf8' })
        if (r.status !== 0) return null
      } catch {}
      if (!existsSync(modPath)) return null
    }
    // Run a tiny Node loader to execute the wasm module and return bytecode via stdout
    const runner = `
      const fs = require('fs');
      const mpath = ${JSON.stringify('' as any)} + ${JSON.stringify('')};
    `
    // Simpler: require the wasm module in a child process file and print base64
    const code = `
      (async () => {
        const fs = require('fs');
        const path = require('path');
        const input = ${JSON.stringify(input)};
        const src = fs.readFileSync(input, 'utf8');
        const wasm = require(${JSON.stringify(modPath)});
        const mod = await wasm();
        const qjs = new mod.QuickJSBytecode();
        const vec = qjs.compile(src, path.basename(input), new mod.StringArray());
        const len = vec.size ? vec.size() : vec.length; const out = Buffer.alloc(len);
        if (vec.size) { for (let i = 0; i < len; i++) out[i] = vec.get(i); }
        else { for (let i = 0; i < len; i++) out[i] = vec[i]; }
        console.log(out.toString('base64'));
      })().catch(e => { console.error(e.stack || String(e)); process.exit(2); });
    `
    const r = spawnSync(process.execPath, ['-e', code], { encoding: 'utf8' })

    if (r.status !== 0) return null
    const b64 = (r.stdout || '').trim()
    
    if (!b64) return null

    return Buffer.from(b64, 'base64')
  } catch {
    return null
  }
}

function extractByteArrayFromC(c: string): number[] | null {
  // 支持以下几种形式：
  //   const uint8_t name[SIZE] = { ... };
  //   static const uint8_t name[] = { ... };
  //   const unsigned char name[SIZE] = { ... };
  const re = /(?:static\s+)?(?:const\s+)?(?:uint8_t|unsigned\s+char)\s+\w+\s*\[\s*(?:\d+)?\s*\]\s*=\s*\{([\s\S]*?)\};/g
  let best: number[] | null = null
  let m: RegExpExecArray | null

  while ((m = re.exec(c)) !== null) {
    const body = m[1]
    const bytes: number[] = []
    const regex = /(0x[0-9a-fA-F]+|\d+)/g
    let t: RegExpExecArray | null

    while ((t = regex.exec(body)) !== null) {
      const lit = t[1]
      const v = lit.startsWith('0x') ? parseInt(lit, 16) : parseInt(lit, 10)

      if (!Number.isNaN(v)) bytes.push(v & 0xff)
    }

    if (!best || bytes.length > best.length) best = bytes
  }

  return best
}

function parseAtoms(buf: Buffer) {
  // Our layout: [version u8][atom_count uleb][atoms...] ; QuickJS: same when allowing bytecode.
  let off = 0
  const version = buf[off]; off += 1
  // decode uleb
  function readUleb(): number {
    let res = 0, shift = 0

    while (true) {
      const b = buf[off++]
      res |= (b & 0x7f) << shift

      if (!(b & 0x80)) break
      shift += 7
    }

    return res
  }

  const atomCount = readUleb()
  const atoms: string[] = []

  for (let i = 0; i < atomCount; i++) {
    const encLen = readUleb()
    const isWide = (encLen & 1) !== 0
    const len = encLen >>> 1

    if (isWide) {
      const byteLen = len * 2
      const s = buf.toString('utf16le', off, off + byteLen)
      off += byteLen
      atoms.push(s)
      continue
    }

    const s = buf.slice(off, off + len).toString('utf8')
    off += len
    atoms.push(s)
  }

  return { version, atomCount, atoms, offsetAfterAtoms: off }
}

function scanTags(buf: Buffer, start: number) {
  const tags: Record<string, number> = {}

  for (let i = start; i < buf.length; i++) {
    const t = buf[i]
    tags[t] = (tags[t] || 0) + 1
  }

  return tags
}

function main() {
  const preferQjsc = process.argv.includes('--prefer-qjsc') || process.argv.includes('--no-wasm')
  // ensure wasm built if not present (unless explicitly skipped)
  if (!preferQjsc) {
    try {
      const modPath = resolve(process.cwd(), 'third_party/QuickJS/bytecode_wasm/output/quickjs_bytecode.js')
      if (!existsSync(modPath)) {
        const buildScript = resolve(process.cwd(), 'scripts/build-bytecode-wasm.ts')
        spawnSync('npx', ['tsx', buildScript], { stdio: 'inherit', encoding: 'utf8' })
      }
    } catch {}
  }
  const input = process.argv[2] || '__tests__/compute.ts'
  const debug = process.argv.includes('--debug')
  const wantDisasm = process.argv.includes('--disasm')
  const sideBySide = process.argv.includes('--side-by-side')
  const wantDot = process.argv.includes('--dot')
  const normalize = process.argv.includes('--normalize') || process.argv.includes('--normalize-short')
  const artIdx = process.argv.indexOf('--artifacts-dir')
  const artifactsDir = artIdx >= 0 ? process.argv[artIdx + 1] : 'artifacts'
  const self = compileSelf(input, { debug, format: 'quickjs' })
  const jsArgIdx = process.argv.indexOf('--input-js')
  const qjsInput = jsArgIdx >= 0 ? process.argv[jsArgIdx + 1] : input.replace(/\.ts$/, '.js')
  // Prefer wasm if built; fall back to qjsc
  let qjscBin: Buffer | null = null

  if (existsSync(qjsInput)) {
    if (preferQjsc) {
      qjscBin = compileWithQjsc(qjsInput)
    } else {
      qjscBin = compileWithWasm(qjsInput)
      if (!qjscBin) qjscBin = compileWithQjsc(qjsInput)
    }
  }

  const selfAtoms = parseAtoms(self)
  console.log('[SELF] version=', selfAtoms.version, 'atomCount=', selfAtoms.atomCount, 'size=', self.length)
  
  if (qjscBin) {
    const qAtoms = parseAtoms(qjscBin)

    console.log('[QJSC] version=', qAtoms.version, 'atomCount=', qAtoms.atomCount, 'size=', qjscBin.length)
    console.log('AtomCount diff =', selfAtoms.atomCount - qAtoms.atomCount)
    console.log('Size diff bytes =', self.length - qjscBin.length)
    
    const selfTags = scanTags(self, selfAtoms.offsetAfterAtoms)
    const qTags = scanTags(qjscBin, qAtoms.offsetAfterAtoms)
    
    console.log('Tag frequency (raw byte heuristic) SELF:', selfTags)
    console.log('Tag frequency (raw byte heuristic) QJSC:', qTags)
    
    // 调试：在 qjscBuf 中从原子表末尾起扫描函数标签 0x0C/0x13 并打印邻域
    const TAGS = [0x0c, 0x13]
    const view = new Uint8Array(qjscBin)
    const hits: number[] = []

    for (let i = qAtoms.offsetAfterAtoms; i < view.length; i++) {
      if (TAGS.includes(view[i])) hits.push(i)
    }

    console.log('QJSC candidate function tag positions:', hits)
    
    if (hits.length > 0) {
      const i = hits[0]
      const start = Math.max(qAtoms.offsetAfterAtoms, i - 16)
      const end = Math.min(view.length, i + 64)
      const hex = Array.from(view.slice(start, end)).map(b => b.toString(16).padStart(2, '0')).join(' ')
      console.log(`Hexdump around first tag @${i}:`, hex)
    }

    try {
      // 字段级对比（我方格式）
      const S = parseQuickJS(self)
      console.log('Self header:', {
        funcName: S.funcName, flags: S.flags, jsMode: S.jsMode,
        argCount: S.argCount, varCount: S.varCount, definedArgCount: S.definedArgCount,
        stackSize: S.stackSize, closureVarCount: S.closureVarCount, cpoolCount: S.cpoolCount,
        byteCodeLen: S.byteCodeLen, hasDebug: S.hasDebug,
      })
      // 尝试解析 qjsc 的二进制（若布局不同可能失败）
      try {
        const Q = parseQuickJS(qjscBin)
        const headerDiff = {
          funcName: { self: S.funcName, qjsc: Q.funcName },
          flags: { self: S.flags, qjsc: Q.flags },
          jsMode: { self: S.jsMode, qjsc: Q.jsMode },
          argCount: { self: S.argCount, qjsc: Q.argCount },
          varCount: { self: S.varCount, qjsc: Q.varCount },
          definedArgCount: { self: S.definedArgCount, qjsc: Q.definedArgCount },
          stackSize: { self: S.stackSize, qjsc: Q.stackSize },
          closureVarCount: { self: S.closureVarCount, qjsc: Q.closureVarCount },
          cpoolCount: { self: S.cpoolCount, qjsc: Q.cpoolCount },
          byteCodeLen: { self: S.byteCodeLen, qjsc: Q.byteCodeLen },
          hasDebug: { self: S.hasDebug, qjsc: Q.hasDebug },
        }

        console.log('Header diff:', headerDiff)
        if ((Q as any).closureVars && (Q as any).closureVars.length) {
          try {
            console.log('QJSC closureVars:', (Q as any).closureVars)
          } catch {}
        }
        // Atom/Const 表逐项对比
        const maxAtoms = Math.max(S.atoms.length, Q.atoms.length)
        const atomDiff: Array<{ i: number, self?: string, qjsc?: string }> = []

        for (let i = 0; i < maxAtoms; i++) {
          if (S.atoms[i] !== Q.atoms[i]) {
            atomDiff.push({ i, self: S.atoms[i], qjsc: Q.atoms[i] })
          }
        }

        if (atomDiff.length) {
          console.log('Atom table diffs:', atomDiff)
        }
        
        const maxConsts = Math.max(S.constants.length, Q.constants.length)
        const constDiff: Array<{ i: number, self?: any, qjsc?: any }> = []
        
        for (let i = 0; i < maxConsts; i++) { 
          const sv = S.constants[i]
          const qv = Q.constants[i] 

          if (JSON.stringify(sv) !== JSON.stringify(qv)) {
            constDiff.push({ i, self: sv, qjsc: qv }) 
          }
        }
        
        if (constDiff.length) {
          console.log('Const pool diffs:', constDiff)
        }
        
        let selfMnRaw = getMnemonics(self)
        let qjsMnRaw = getMnemonics(qjscBin, /*useQjsMeta*/ true)
        let selfMn = selfMnRaw.slice()
        let qjsMn = qjsMnRaw.slice()

        if (normalize) {
          selfMn = normalizeMnemonics(selfMn)
          qjsMn = normalizeMnemonics(qjsMn)
        }

        console.log('Mnemonic lengths: self=', selfMn.length, ' qjsc=', qjsMn.length)
        if (normalize) {
          const foldDeltaSelf = selfMnRaw.length - selfMn.length
          const foldDeltaQ = qjsMnRaw.length - qjsMn.length
          console.log('Normalization summary:')
          console.log('  Self:  before=', selfMnRaw.length, ' after=', selfMn.length, ' folded=', foldDeltaSelf)
          console.log('  QJSC:  before=', qjsMnRaw.length, ' after=', qjsMn.length, ' folded=', foldDeltaQ)
        }
        
        if (sideBySide) {
          console.log('\n-- SIDE-BY-SIDE (LCS) --')
          if (normalize) {
            console.log('(Note) Displaying normalized/"folded" mnemonics side-by-side. Use --no-normalize to inspect raw sequences.')
          }
          printSideBySide(selfMn, qjsMn)

          // 保存为 markdown
          try {
            mkdirSync(artifactsDir, { recursive: true })

            const base = (input.split(/[\\/]/).pop() || 'input').replace(/\.[^.]+$/, '')
            const mdPath = join(artifactsDir, `${base}-mnemonic-diff.md`)
            const headerNote = normalize ? '\n\nNote: Mnemonics shown are normalized (folded). Use --no-normalize to see raw sequences.\n' : ''
            const md = generateSideBySideMarkdown(selfMn, qjsMn) + headerNote
            
            writeFileSync(mdPath, md, 'utf8')
            console.log('Saved mnemonic side-by-side to', mdPath)
          } catch (e) {
            console.log('Warn: failed to write side-by-side markdown:', e instanceof Error ? e.message : String(e))
          }
        } else if (selfMn.join(',') !== qjsMn.join(',')) {
          const maxM = Math.max(selfMn.length, qjsMn.length)
          const list: Array<{ i: number, self?: string, qjsc?: string }> = []

          for (let i = 0; i < maxM; i++) {
            if (selfMn[i] !== qjsMn[i]) {
              list.push({ i, self: selfMn[i], qjsc: qjsMn[i] })
            }
          }

          console.log('Mnemonic diffs:', list)
        }

        if (wantDisasm) {
          console.log('\n-- SELF DISASM --')
          console.log(disassemble(self, { showCFG: false }))
          // 我们的结构化解析可能无法读取 qjsc 的布局。尝试启发式反汇编（只提取助记符序列）。
          let qJsMnems = getMnemonics(qjscBin, /*useQjsMeta*/ true)
          if (normalize) {
            qJsMnems = normalizeMnemonics(qJsMnems)
          }
          
          if (qJsMnems) {
            console.log('\n-- QJSC (heuristic mnemonics) --')
            console.log(qJsMnems.join('\n'))
          } else {
            console.log('\n-- QJSC DISASM --')
            console.log(disassemble(qjscBin, { showCFG: false }))
          }
        }

          if (wantDot) {
          try {
            mkdirSync(artifactsDir, { recursive: true })

            const base = (input.split(/[\\/]/).pop() || 'input').replace(/\.[^.]+$/, '')
            const selfAsm = disassemble(self, { dot: true }) as string
            const qAsm = disassemble(qjscBin, { dot: true, useQjsMeta: true }) as string
            const selfDot = extractDot(selfAsm)
            const qDot = extractDot(qAsm)
            
            if (selfDot) {
              writeFileSync(join(artifactsDir, `${base}-self.cfg.dot`), selfDot, 'utf8')
              console.log('Saved self DOT to', join(artifactsDir, `${base}-self.cfg.dot`))
            }
            
            if (qDot) {
              writeFileSync(join(artifactsDir, `${base}-qjsc.cfg.dot`), qDot, 'utf8')
              console.log('Saved qjsc DOT to', join(artifactsDir, `${base}-qjsc.cfg.dot`))
            } else {
              console.log('Note: qjsc DOT unavailable (parse/disasm may have failed).')
            }
          } catch (e) {
            console.log('Warn: failed to write DOT artifacts:', e instanceof Error ? e.message : String(e))
          }
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        console.log('Note: qjsc binary layout not recognized by our minimal parser; skipping field-level/detailed diff for qjsc. Details:', msg)
        
        if (wantDisasm) {
          console.log('\n-- SELF DISASM --')
          console.log(disassemble(self, { showCFG: false }))
          const qJsMnems = tryHeuristicMnemonics(qjscBin)
          
          if (qJsMnems) {
            console.log('\n-- QJSC (heuristic mnemonics) --')
            console.log(qJsMnems.join('\n'))
          }
        }
        
        // 仍然尝试按助记符进行 side-by-side 对比
        let selfMn = getMnemonics(self)
        let qjsMn = getMnemonics(qjscBin)
        if (normalize) { 
          selfMn = normalizeMnemonics(selfMn); qjsMn = normalizeMnemonics(qjsMn) 
        }

        if (sideBySide) {
          console.log('\n-- SIDE-BY-SIDE (LCS) --')
          printSideBySide(selfMn, qjsMn)
          try {
            mkdirSync(artifactsDir, { recursive: true })
            
            const base = (input.split(/[\\\/]/).pop() || 'input').replace(/\.[^.]+$/, '')
            const mdPath = join(artifactsDir, `${base}-mnemonic-diff.md`)
            const md = generateSideBySideMarkdown(selfMn, qjsMn)
            
            writeFileSync(mdPath, md, 'utf8')
            console.log('Saved mnemonic side-by-side to', mdPath)
          } catch (e) {
            console.log('Warn: failed to write side-by-side markdown:', e instanceof Error ? e.message : String(e))
          }
        }
      }
    } catch (e) {
      console.log('Unexpected error during deep diff:', e instanceof Error ? e.message : String(e))
    }
  } else {
    console.log('qjsc not found. Install suggestions:')
    console.log('  brew install quickjs  (macOS, 若官方 formula 不可用则源码构建)')
    console.log('源码构建:')
    console.log('  git clone https://github.com/bellard/quickjs.git && cd quickjs')
    console.log('  make -j && cp qjsc /usr/local/bin/')
  }
}

if (require.main === module) main()

// LCS-based pretty side-by-side diff for mnemonic arrays
function printSideBySide(a: string[], b: string[]) {
  const lcs = buildLCS(a, b)
  const rows: Array<{ left?: string, right?: string, tag: ' ' | '-' | '+' }>=[]
  let i = 0, j = 0

  for (const [ai, bi] of lcs) {
    while (i < ai) rows.push({ left: a[i++], tag: '-' })
    while (j < bi) rows.push({ right: b[j++], tag: '+' })
    if (ai < a.length) {
      rows.push({ left: a[i++], right: b[j++], tag: ' ' })
    }
  }

  while (i < a.length) {
    rows.push({ left: a[i++], tag: '-' })
  }

  while (j < b.length) {
    rows.push({ right: b[j++], tag: '+' })
  }

  const w = Math.max(5, Math.min(40, Math.max(...a.map(s=>s.length), ...b.map(s=>s.length) )))
  
  for (const r of rows) {
    const L = (r.left ?? '').padEnd(w)
    const R = (r.right ?? '').padEnd(w)
    const mark = r.tag === ' ' ? ' ' : r.tag
    console.log(`${mark} ${L} | ${R}`)
  }
}

function buildLCS(a: string[], b: string[]): Array<[number, number]> {
  const n = a.length, m = b.length
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0))

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? 1 + dp[i + 1][j + 1] : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }

  const path: Array<[number, number]> = []
  let i = 0, j = 0
  
  while (i < n && j < m) {
    if (a[i] === b[j]) { 
      path.push([i, j])
      i++ 
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      i++
    } else {
      j++
    }
  }

  return path
}

function generateSideBySideMarkdown(a: string[], b: string[]): string {
  const lcs = buildLCS(a, b)
  const rows: Array<{ left?: string; right?: string; tag: ' ' | '-' | '+' }> = []
  let i = 0, j = 0
  
  for (const [ai, bi] of lcs) {
    while (i < ai) {
      rows.push({ left: a[i++], tag: '-' })
    }
    
    while (j < bi) {
      rows.push({ right: b[j++], tag: '+' })
    }

    if (ai < a.length) {
      rows.push({ left: a[i++], right: b[j++], tag: ' ' })
    }
  }

  while (i < a.length) {
    rows.push({ left: a[i++], tag: '-' })
  }

  while (j < b.length) {
    rows.push({ right: b[j++], tag: '+' })
  }

  const header = '| Tag | Self | QJSC |\n|---|---|---|\n'
  const body = rows.map(r => `| ${r.tag} | ${r.left ?? ''} | ${r.right ?? ''} |`).join('\n')
  
  return header + body + '\n'
}

function extractDot(disasmText: string): string | null {
  const marker = 'DOT (CFG):\n'
  const i = disasmText.indexOf(marker)

  if (i < 0) return null
  
  const dot = disasmText.slice(i + marker.length).trim()
  return dot || null
}

function readUlebFromBufNode(buf: Buffer, ref: { off: number }): number {
  let res = 0, shift = 0

  for (;;) {
    const b = buf[ref.off++]
    res |= (b & 0x7f) << shift
    if (!(b & 0x80)) break
    shift += 7
  }

  return res >>> 0
}

// 尝试直接从 qjsc 原始缓冲中抽取第一个 FunctionBytecode 的指令区
function tryExtractQjscBytecode(buf: Buffer): Uint8Array | null {
  const TAGS = [0x13, 0x0c]

  for (let i = 0; i < buf.length - 16; i++) {
    if (!TAGS.includes(buf[i])) continue

    const r = { off: i + 1 }
    if (r.off + 3 >= buf.length) continue
    
    // flags u16, jsMode u8
    const flags = buf[r.off] | (buf[r.off + 1] << 8); r.off += 2
    const jsMode = buf[r.off++]
    
    // funcName atomref (uleb)
    readUlebFromBufNode(buf, r)
    
    // counts
    const argCount = readUlebFromBufNode(buf, r)
    const varCount = readUlebFromBufNode(buf, r)
    const definedArgCount = readUlebFromBufNode(buf, r)
    const stackSize = readUlebFromBufNode(buf, r)
    const closureVarCount = readUlebFromBufNode(buf, r)
    const cpoolCount = readUlebFromBufNode(buf, r)
    const byteCodeLen = readUlebFromBufNode(buf, r)
    const vardefsCount = readUlebFromBufNode(buf, r)
    
    // skip vardefs
    for (let k = 0; k < vardefsCount; k++) {
      readUlebFromBufNode(buf, r) // atom ref
      readUlebFromBufNode(buf, r) // scope_level
      readUlebFromBufNode(buf, r) // scope_next+1
      r.off += 1 // flags
    }

    // skip closure vars
    for (let k = 0; k < closureVarCount; k++) {
      readUlebFromBufNode(buf, r) // name atomref
      readUlebFromBufNode(buf, r) // varIdx
      r.off += 1 // flags
    }

    if (r.off + byteCodeLen <= buf.length && byteCodeLen > 0 && byteCodeLen < 65536) {
      const bc = buf.slice(r.off, r.off + byteCodeLen)
      // 粗验：能否解码出一定数量的指令
      const { OPCODE_META } = require('../src/opcodes') as typeof import('../src/opcodes')
      let cnt = 0

      for (let pc = 0; pc < bc.length;) {
        const op = bc[pc]
        const meta = OPCODE_META[op]

        if (!meta || !meta.size) break
        if (meta.size <= 0) break
        
        pc += meta.size
        cnt++
        
        if (cnt >= 16) break
      }

      if (cnt >= 8) return bc
    }
  }

  return null
}

function getMnemonics(buf: Buffer, useQjsMeta = false): string[] {
  try {
    const f = parseQuickJS(buf)
    const bc = f.bytecode ?? new Uint8Array()
    const r: string[] = []

    if (useQjsMeta) {
      const { QJS_OPCODE_META } = require('../src/qjs_opcodes') as typeof import('../src/qjs_opcodes')

      for (let pc = 0; pc < bc.length; ) { 
        const op = bc[pc]
        const meta = QJS_OPCODE_META[op]
        if (!meta) break
        r.push(meta.name)
        pc += meta.size 
      }
    } else {
      const { OPCODE_META } = require('../src/opcodes') as typeof import('../src/opcodes')
      
      for (let pc = 0; pc < bc.length;) { 
        const op = bc[pc]
        const meta = OPCODE_META[op]
        if (!meta) break
        r.push(meta.name)
        pc += meta.size
      }
    }

    return r
  } catch {}
  const bc = tryExtractQjscBytecode(buf)

  if (bc) {
    const r: string[] = []

    if (useQjsMeta) {
      const { QJS_OPCODE_META } = require('../src/qjs_opcodes') as typeof import('../src/qjs_opcodes')

      for (let pc = 0; pc < bc.length;) { 
        const op = bc[pc]
        const meta = QJS_OPCODE_META[op]
        if (!meta) break 
        r.push(meta.name)
        pc += meta.size 
      }
    } else {
      const { OPCODE_META } = require('../src/opcodes') as typeof import('../src/opcodes')

      for (let pc = 0; pc < bc.length;) {
        const op = bc[pc]
        const meta = OPCODE_META[op]
        if (!meta) break
        r.push(meta.name)
        pc += meta.size
      }
    }

    return r
  }

  const h = tryHeuristicMnemonics(buf)
  return h ?? []
}

// 尝试在未知外层封装的缓冲中，启发式提取一段可能的字节码流并返回助记符序列
function tryHeuristicMnemonics(buf: Buffer): string[] | null {
  try {
    const { OPCODE_META } = require('../src/opcodes') as typeof import('../src/opcodes')
    // 简单策略：在缓冲区内滑动，寻找以合法 opcode 开头且能持续解码 >= 8 条指令的窗口
    const bytes = new Uint8Array(buf)
    const minInstr = 8
    const maxScan = Math.min(bytes.length, 4096)
    scan:
    for (let start = 0; start < maxScan; start++) {
      const first = bytes[start]
      const meta0 = OPCODE_META[first]

      if (!meta0 || !meta0.size) continue
      
      const mn: string[] = []
      for (let pc = start; pc < bytes.length;) {
        const op = bytes[pc]
        const meta = OPCODE_META[op]
      
        if (!meta || !meta.size) break
        mn.push(meta.name)
        pc += meta.size
      
        if (mn.length >= 64) break // 足够长，认为找到了
      }
      
      if (mn.length >= minInstr) return mn
    }
  } catch {}
  return null
}

// 将 QuickJS 短指令/带检查变体规范化为“长名”，便于逐条对比
function normalizeMnemonics(m: string[]): string[] {
  const map: Record<string, string> = {
  // 统一 inc_loc 到通用 inc（便于与组合序列对齐）
  OP_inc_loc: 'OP_inc',
    // 短跳转/比较
    OP_goto8: 'OP_goto',
    OP_if_false8: 'OP_if_false',
    OP_goto16: 'OP_goto',
    OP_if_true8: 'OP_if_false', // 将 if_true 统一到 if_false 方向，在折叠阶段处理
    // 局部变量短形式
    OP_put_loc0: 'OP_put_loc',
    OP_put_loc1: 'OP_put_loc',
    OP_put_loc2: 'OP_put_loc',
    OP_get_loc0: 'OP_get_loc',
    OP_get_loc1: 'OP_get_loc',
    OP_get_loc2: 'OP_get_loc',
    OP_get_loc8: 'OP_get_loc',
    OP_put_loc8: 'OP_put_loc',
    // tdz/初始化检查
    OP_put_loc_check: 'OP_put_loc',
    OP_put_loc_check_init: 'OP_put_loc',
    OP_get_loc_check: 'OP_get_loc',
    // 其它近似
    OP_post_inc: 'OP_inc',
    OP_tail_call_method: 'OP_call_method',
    OP_apply: 'OP_call_method',
    OP_nip: 'OP_drop',
    OP_nip1: 'OP_drop',
    // 调用族统一
    OP_call0: 'OP_call',
    OP_call1: 'OP_call',
    OP_call2: 'OP_call',
    OP_call3: 'OP_call',
    OP_call: 'OP_call',
    OP_tail_call: 'OP_call',
    OP_call_constructor: 'OP_call',
    // 统一立即数推入类别
    OP_push_0: 'OP_push_const',
    OP_push_i8: 'OP_push_const',
    OP_push_i32: 'OP_push_const',
    OP_push_const8: 'OP_push_const',
    OP_undefined: 'OP_push_const',
    // fclosure 统一
    OP_fclosure8: 'OP_fclosure',
    // 全局/严格赋值归一到本地写入（仅用于比较对齐，不改变真实语义）
    OP_put_var: 'OP_put_loc',
    OP_put_var_strict: 'OP_put_loc',
    OP_put_var_ref0: 'OP_put_loc',
    OP_put_var_ref_check: 'OP_put_loc',
  }
  const drop = new Set<string>([
    // 模块/顶层样板，非主体算法逻辑
    'OP_define_func',
    'OP_check_define_var',
    'OP_fclosure',
    'OP_private_symbol',
    'OP_null',
    // 函数/构造器模板样板
    'OP_check_ctor_return',
    'OP_throw',
    'OP_push_false',
    'OP_push_true',
    'OP_push_null',
  ])
  // First pass: simple rename & drop
  const stage: string[] = []

  for (const x of m) {
    if (drop.has(x)) continue
    stage.push(map[x] ?? x)
  }

  // Second pass: pattern folding for better alignment
  const out: string[] = []
  
  for (let i = 0; i < stage.length; ) {
    // dup; get_field2; call_method; drop => call_method
    if (stage[i] === 'OP_dup' && stage[i+1] === 'OP_get_field2' && stage[i+2] === 'OP_call_method' && stage[i+3] === 'OP_drop') {
      out.push('OP_call_method')
      i += 4
      continue
    }
  
    // get_loc; dup; inc; put_loc; drop => inc (post-inc pattern)
    if (stage[i] === 'OP_get_loc' && stage[i+1] === 'OP_dup' && stage[i+2] === 'OP_inc' && stage[i+3] === 'OP_put_loc' && stage[i+4] === 'OP_drop') {
      out.push('OP_inc')
      i += 5
      continue
    }

    // put_loc; inc; put_loc; drop => inc （某些场景下 quickjs 优化前的等价序列）
    if (stage[i] === 'OP_put_loc' && stage[i+1] === 'OP_inc' && stage[i+2] === 'OP_put_loc' && stage[i+3] === 'OP_drop') {
      out.push('OP_inc')
      i += 4
      continue
    }

    // 模板：if (cond) { A } else { B }
    // 常见编码： [cond-eval] if_false Lelse ; [A...] ; goto Lend ; Lelse: [B...] ; Lend:
    // 将 if_false/goto/Lelse/Lend 结构性的模式折叠为 OP_if_else，以减少跳转噪声
    if (stage[i] === 'OP_if_false' && stage[i+2] === 'OP_goto') {
      out.push('OP_if_else')
      i += 3
      continue
    }

    // 模板：if (cond) { A }，无 else
    if (stage[i] === 'OP_if_false') {
      out.push('OP_if')
      i += 1
      continue
    }

    // continue 模板经常出现在循环体：... -> OP_goto 到 loop-continue；对比时可弱化为一条 OP_continue
    if (stage[i] === 'OP_goto') {
      out.push('OP_jump')
      i += 1
      continue
    }

    out.push(stage[i])
    i++
  }

  // 第三步：尾部清理
  // - 若末尾为单独一条 OP_return_undef，默认折叠掉（qjsc 常无显式该指令，或布局不同）
  if (out.length > 0 && out[out.length - 1] === 'OP_return_undef') {
    out.pop()
  }

  return out
}
