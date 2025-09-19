import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// Dev-only generator: parse quickjs-opcode.h (present in repo) and emit TS meta used only for disassembling qjsc output.
// This script is not used at runtime. The generated file is checked in.

function main() {
  const hdr = readFileSync(resolve(process.cwd(), 'cpp/QuickJS/include/QuickJS/quickjs-opcode.h'), 'utf8')
  const lines = hdr.split(/\r?\n/)
  const defs: Array<{ name: string; size: number; fmt: string }> = []
  for (const ln of lines) {
    const m = ln.match(/\bDEF\s*\(\s*([a-zA-Z0-9_]+)\s*,\s*(\d+)\s*,\s*\d+\s*,\s*\d+\s*,\s*([a-zA-Z0-9_]+)\s*\)/)
    if (!m) continue
    const [, name, sizeStr, fmt] = m
    if (name === 'invalid') continue
    defs.push({ name: 'OP_' + name, size: parseInt(sizeStr, 10), fmt: 'OP_FMT_' + fmt })
  }
  const out = `// Auto-generated from QuickJS headers by scripts/extract-quickjs-opcodes.ts\n` +
`// NOTE: This file is used only for disassembling qjsc outputs.\n` +
`// Do not edit manually.\n` +
`export interface QJSMeta { name: string; size: number; fmt: string }\n` +
`export const QJS_OPCODE_META: QJSMeta[] = [\n` +
  defs.map(d => `  { name: '${d.name}', size: ${d.size}, fmt: '${d.fmt}' }`).join(',\n') +
`\n];\n`
  writeFileSync(resolve(process.cwd(), 'src/qjs_opcodes.ts'), out, 'utf8')
}

if (require.main === module) main()
