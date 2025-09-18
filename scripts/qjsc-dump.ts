import { spawnSync } from 'node:child_process'
import { readFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve, basename, extname } from 'node:path'

function die (msg: string): never { console.error(msg); process.exit(1) }

const args = process.argv.slice(2)
if (args.length === 0) die('Usage: tsx scripts/qjsc-dump.ts <input.js> [--qjsc <path-to-qjsc>]')

let input = args[0]
let qjscPathIdx = args.indexOf('--qjsc')
let qjsc = qjscPathIdx !== -1 ? args[qjscPathIdx + 1] : 'cpp/QuickJS/qjsc'

input = resolve(process.cwd(), input)
qjsc = resolve(process.cwd(), qjsc)

if (!existsSync(input)) die('Input file not found: ' + input)
if (!existsSync(qjsc)) {
  // 尝试使用 PATH 中的 qjsc
  const which = spawnSync(process.platform === 'win32' ? 'where' : 'which', ['qjsc'], { encoding: 'utf8' })
  if (which.status === 0) {
    const cand = which.stdout.trim().split(/\n/)[0]
    if (cand) {
      qjsc = cand
      console.error('[info] 使用 PATH 中的 qjsc: ' + qjsc)
    }
  }
  if (!existsSync(qjsc)) die('qjsc not found: ' + qjsc + '\n请确保已安装并在 PATH 中可用')
}

// 创建临时输出 C 文件
const tmpDir = mkdtempSync(join(tmpdir(), 'qjsc-dump-'))
const outC = join(tmpDir, 'out.c')

// 使用 -c 生成 C 源码 (包含字节码数组)
// qjsc 常见参数: -c 只生成 C；-o 指定输出；不指定 -m 则当作脚本；
const res = spawnSync(qjsc, ['-c', '-o', outC, input], { stdio: 'inherit' })
if (res.status !== 0) die('qjsc 执行失败')

if (!existsSync(outC)) die('未生成 C 输出: ' + outC)

const content = readFileSync(outC, 'utf8')

// 简单提取形如: const uint8_t <name>[N] = { 0x.., 0x.., ... } 段
const arrayRegex = /const uint8_t ([a-zA-Z0-9_]+)\[(\d+)\] = \{([\s\S]*?)\};/g
const arrays: Array<{ name: string; size: number; bytes: number[] }> = []
let m: RegExpExecArray | null
while ((m = arrayRegex.exec(content)) !== null) {
  const name = m[1]
  const size = parseInt(m[2], 10)
  const body = m[3]
  const bytes: number[] = []
  body.split(/[,\n]/).map(s => s.trim()).filter(s => s.startsWith('0x')).forEach(hex => {
    const v = parseInt(hex, 16)
    if (!Number.isNaN(v)) bytes.push(v)
  })
  if (bytes.length === size) arrays.push({ name, size, bytes })
}

if (arrays.length === 0) die('未在生成的 C 中找到字节数组 (可能 qjsc 版本或参数不同)')

for (const a of arrays) {
  console.log(`ARRAY ${a.name} size=${a.size}`)
  let line: string[] = []
  a.bytes.forEach((b, i) => {
    line.push(b.toString(16).padStart(2, '0'))
    if (line.length === 16) { console.log(line.join(' ')); line = [] }
  })
  if (line.length) console.log(line.join(' '))
  console.log('---')
}

// 清理临时目录（保留用于调试可注释掉）
try { rmSync(tmpDir, { recursive: true, force: true }) } catch {}
