import * as fs from 'node:fs'
import * as path from 'node:path'
import { spawnSync } from 'node:child_process'

function hex8(u: number) { return '0x' + (u & 0xff).toString(16).padStart(2, '0') }

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
  if (bytes.length < 1) throw new Error('C 数组长度不足')

  const verQ = bytes[0] & 0xff
  console.log(`[qjsc] bc_version=${hex8(verQ)}`)

  const binPath = path.resolve('output.bin')
  if (!fs.existsSync(binPath)) {
    console.log('未找到 output.bin，跳过本地产物比较。')
    process.exit(0)
  }
  const buf = fs.readFileSync(binPath)
  const verL = buf[0] & 0xff
  console.log(`[local] bc_version=${hex8(verL)}`)

  if (verL !== verQ) {
    console.warn('BC_VERSION 不一致，请设置环境变量 QJS_BIGNUM=1 或 QJS_BC_VERSION 对齐。')
    process.exit(2)
  } else {
    console.log('BC_VERSION 一致。')
  }
}

if (require.main === module) main()
