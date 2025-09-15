import * as fs from 'node:fs'
import * as path from 'node:path'
import { spawnSync } from 'node:child_process'

function hex32(u: number) { return '0x' + (u >>> 0).toString(16).padStart(8, '0') }
function readU32LE(buf: Buffer, off: number) { return (buf[off] | (buf[off+1]<<8) | (buf[off+2]<<16) | (buf[off+3]<<24)) >>> 0 }

function main() {
  const tmp = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'qjs-compare-'))
  const jsPath = path.join(tmp, 'a.js')
  const outC = path.join(tmp, 'a.c')
  fs.writeFileSync(jsPath, 'export default 1;\n')

  const r = spawnSync('qjsc', ['-m', '-o', outC, jsPath], { stdio: 'pipe' })
  if (r.status !== 0) {
    console.error('qjsc 运行失败，跳过比较。请确认已安装 QuickJS 并在 PATH 中。')
    process.exit(0)
  }

  const cText = fs.readFileSync(outC, 'utf8')
  const m = cText.match(/\{\s*([^}]+)\}/s)
  if (!m) throw new Error('未找到 C 数组')
  const bytes = m[1].split(',').map(x => x.trim()).filter(Boolean).map(x => parseInt(x.replace(/^0x/i,''), 16))
  if (bytes.length < 8) throw new Error('C 数组长度不足')
  const rdU32 = (off: number) => (bytes[off] | (bytes[off+1]<<8) | (bytes[off+2]<<16) | (bytes[off+3]<<24)) >>> 0

  const magicQ = rdU32(0)
  const verQ = rdU32(4)
  console.log(`[qjsc] magic=${hex32(magicQ)} version=${hex32(verQ)}`)

  const binPath = path.resolve('output.bin')
  if (!fs.existsSync(binPath)) {
    console.log('未找到 output.bin，跳过本地产物比较。')
    process.exit(0)
  }
  const buf = fs.readFileSync(binPath)
  const magicL = readU32LE(buf, 0)
  const verL = readU32LE(buf, 4)
  console.log(`[local] magic=${hex32(magicL)} version=${hex32(verL)}`)

  if (magicL !== magicQ || verL !== verQ) {
    console.warn('magic/version 不一致，请先运行: pnpm align:qjs')
    process.exit(2)
  } else {
    console.log('magic/version 一致。')
  }
}

if (require.main === module) main()
