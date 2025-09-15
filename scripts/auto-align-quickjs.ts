import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

function hex32(u: number) { return '0x' + (u >>> 0).toString(16).padStart(8, '0'); }
function parseFirstTwoU32FromCArray(cSource: string): { magic: number; version: number } {
  const m = cSource.match(/\{\s*([^}]+)\}/s);
  if (!m) throw new Error('未找到 qjsc 生成的 C 数组');
  const bytes = m[1].split(',').map(x => x.trim()).filter(Boolean).map(x => parseInt(x.replace(/^0x/i,''), 16));
  if (bytes.length < 8) throw new Error('C 数组长度不足 8 字节');
  const rdU32 = (off: number) => (bytes[off] | (bytes[off+1]<<8) | (bytes[off+2]<<16) | (bytes[off+3]<<24)) >>> 0;
  return { magic: rdU32(0), version: rdU32(4) };
}

function main() {
  const tmp = mkdtempSync(join(tmpdir(), 'qjs-align-'));
  try {
    const js = 'export default 1;';
    const sPath = join(tmp, 's.js');
    const outC = join(tmp, 'out.c');
    writeFileSync(sPath, js, 'utf8');

    const r = spawnSync('qjsc', ['-m', '-o', outC, sPath], { stdio: 'inherit' });
    if (r.status !== 0) { console.error('qjsc 运行失败，请确认已安装 bellard/quickjs'); process.exit(1); }

    const cText = readFileSync(outC, 'utf8');
    const { magic, version } = parseFirstTwoU32FromCArray(cText);

    const envOut = `QJS_BC_MAGIC=${hex32(magic)}\nQJS_BC_VERSION=${hex32(version)}\n`;
    writeFileSync('.env.quickjs', envOut, 'utf8');
    writeFileSync('quickjs-alignment.json', JSON.stringify({ magic, version }, null, 2), 'utf8');

    console.log(`探测成功：magic=${hex32(magic)} version=${hex32(version)} 已写入 .env.quickjs 与 quickjs-alignment.json`);
  } finally {
    try { rmSync(tmp, { recursive: true, force: true }); } catch {}
  }
}

if (require.main === module) main();