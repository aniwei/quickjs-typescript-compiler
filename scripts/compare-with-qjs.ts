import { spawnSync } from 'node:child_process'
import { readFileSync, existsSync, mkdtempSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { tmpdir } from 'node:os'
import { parseQuickJS } from '../src/parseQuickJS'
import { disassemble } from '../src/disasm'

function which(cmd: string): string | null {
  const r = spawnSync('which', [cmd], { encoding: 'utf8' })
  if (r.status === 0) return r.stdout.trim() || null
  return null
}

function compileSelf(input: string, opts: { debug: boolean; format: 'quickjs' | 'legacy' }) {
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
  // 优先直接生成字节码；失败则回退生成 C 并解析数组
  const out = resolve(tmpdir(), 'ref.bin')
  let r = spawnSync(qjscPath, ['-c', '-o', out, input], { encoding: 'utf8' })
  if (r.status === 0 && existsSync(out)) {
    return readFileSync(out)
  }
  const tmp = mkdtempSync(join(tmpdir(), 'qjsc-'))
  const cOut = join(tmp, 'out.c')
  r = spawnSync(qjscPath, ['-o', cOut, input], { encoding: 'utf8' })
  if (r.status !== 0) throw new Error('qjsc C emit failed:\n' + r.stdout + '\n' + r.stderr)
  const c = readFileSync(cOut, 'utf8')
  const arr = extractByteArrayFromC(c)
  if (!arr) throw new Error('failed to extract byte array from qjsc C output')
  return Buffer.from(arr)
}

function extractByteArrayFromC(c: string): number[] | null {
  const m = c.match(/static\s+const\s+uint8_t\s+\w+\s*\[\s*\]\s*=\s*\{([\s\S]*?)\};/)
  if (!m) return null
  const body = m[1]
  const bytes: number[] = []
  const regex = /(0x[0-9a-fA-F]+|\d+)/g
  let t: RegExpExecArray | null
  while ((t = regex.exec(body)) !== null) {
    const lit = t[1]
    const v = lit.startsWith('0x') ? parseInt(lit, 16) : parseInt(lit, 10)
    if (!Number.isNaN(v)) bytes.push(v & 0xff)
  }
  return bytes
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
    const len = readUleb()
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
  const input = process.argv[2] || '__tests__/compute.ts'
  const debug = process.argv.includes('--debug')
  const wantDisasm = process.argv.includes('--disasm')
  const sideBySide = process.argv.includes('--side-by-side')
  const self = compileSelf(input, { debug, format: 'quickjs' })
  const jsArgIdx = process.argv.indexOf('--input-js')
  const qjsInput = jsArgIdx >= 0 ? process.argv[jsArgIdx + 1] : input.replace(/\.ts$/, '.js')
  const qjscBin = existsSync(qjsInput) ? compileWithQjsc(qjsInput) : null

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
        // Atom/Const 表逐项对比
        const maxAtoms = Math.max(S.atoms.length, Q.atoms.length)
        const atomDiff: Array<{ i: number, self?: string, qjsc?: string }> = []
        for (let i = 0; i < maxAtoms; i++) if (S.atoms[i] !== Q.atoms[i]) atomDiff.push({ i, self: S.atoms[i], qjsc: Q.atoms[i] })
        if (atomDiff.length) console.log('Atom table diffs:', atomDiff)
        const maxConsts = Math.max(S.constants.length, Q.constants.length)
        const constDiff: Array<{ i: number, self?: any, qjsc?: any }> = []
        for (let i = 0; i < maxConsts; i++) { const sv = S.constants[i]; const qv = Q.constants[i]; if (JSON.stringify(sv) !== JSON.stringify(qv)) constDiff.push({ i, self: sv, qjsc: qv }) }
        if (constDiff.length) console.log('Const pool diffs:', constDiff)
        // 助记符序列（忽略立即数）
        function mnems(buf: Buffer): string[] {
          const f = parseQuickJS(buf)
          const bc = f.bytecode ?? new Uint8Array()
          const r: string[] = []
          const { OPCODE_META } = require('../src/opcodes') as typeof import('../src/opcodes')
          for (let pc = 0; pc < bc.length;) { const op = bc[pc]; const meta = OPCODE_META[op]; if (!meta) break; r.push(meta.name); pc += meta.size }
          return r
        }
        const selfMn = mnems(self); const qjsMn = mnems(qjscBin)
        console.log('Mnemonic lengths: self=', selfMn.length, ' qjsc=', qjsMn.length)
        if (sideBySide) {
          console.log('\n-- SIDE-BY-SIDE (LCS) --')
          printSideBySide(selfMn, qjsMn)
        } else if (selfMn.join(',') !== qjsMn.join(',')) {
          const maxM = Math.max(selfMn.length, qjsMn.length)
          const list: Array<{ i: number, self?: string, qjsc?: string }> = []
          for (let i = 0; i < maxM; i++) if (selfMn[i] !== qjsMn[i]) list.push({ i, self: selfMn[i], qjsc: qjsMn[i] })
          console.log('Mnemonic diffs:', list)
        }
        if (wantDisasm) {
          console.log('\n-- SELF DISASM --')
          console.log(disassemble(self, { showCFG: false }))
          console.log('\n-- QJSC DISASM --')
          console.log(disassemble(qjscBin, { showCFG: false }))
        }
      } catch (e) {
        console.log('Note: qjsc binary layout not recognized by our minimal parser; skipping field-level/detailed diff for qjsc.')
        if (wantDisasm) {
          console.log('\n-- SELF DISASM --')
          console.log(disassemble(self, { showCFG: false }))
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
    if (ai < a.length) rows.push({ left: a[i++], right: b[j++], tag: ' ' })
  }
  while (i < a.length) rows.push({ left: a[i++], tag: '-' })
  while (j < b.length) rows.push({ right: b[j++], tag: '+' })
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
    if (a[i] === b[j]) { path.push([i, j]); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++
    else j++
  }
  return path
}
