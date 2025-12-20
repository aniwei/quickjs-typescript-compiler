import { TypeScriptCompiler } from '../src/index'
import { readFileSync } from 'fs'

const opcodes = JSON.parse(readFileSync('opcodes.json', 'utf-8')) as any[]
const byCode: Record<number, string> = {}
for (const op of opcodes) {
  byCode[op.code] = op.name
}

// 手动添加 TempOpcode 名称
const tempOpcodes: Record<number, string> = {
  185: 'scope_get_var_undef',
  186: 'scope_get_var',
  187: 'scope_get_var_checkthis',
  188: 'scope_get_ref',
  189: 'scope_make_ref',
  190: 'scope_put_var',
  191: 'scope_put_var_init',
}
for (const [code, name] of Object.entries(tempOpcodes)) {
  byCode[parseInt(code)] = name
}

const source = `let v0 = 0
const inner = () => {
  v0++
}
inner()
`

const compiler = new TypeScriptCompiler({ debug: true })
const result = compiler.compile(source, 'test.js')

// 检查内部函数的原始字节码
const fd = compiler.funcDef!
const inner = fd.childList?.[0]
if (inner && inner.bytecode) {
  const bcBuf = inner.bytecode.buf as Uint8Array
  const size = inner.bytecode.size
  console.log('=== Inner Function Raw Bytecode (before resolve) ===')
  console.log('Size:', size)
  let pos = 0
  while (pos < size) {
    const op = bcBuf[pos]
    const opName = byCode[op] || 'unknown'
    console.log('  0x' + pos.toString(16) + ': ' + opName + ' (' + op + ')')
    pos++
  }
} else {
  console.log('No inner function bytecode')
}
