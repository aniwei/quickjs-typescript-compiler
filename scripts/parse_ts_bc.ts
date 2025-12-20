import { OPCODE_BY_CODE } from '../src/env'

// TS bytecode from error message + more bytes
const bytes = [0x08, 0xcb, 0x2b, 0x68, 0x00, 0x00, 0x11, 0xec, 0x06, 0xc7, 0x1b, 0x24, 0x00, 0x00, 0x0e, 0xd3, 0x15, 0x44, 0xe6, 0x00, 0x00, 0x00, 0x00, 0xc7, 0xd4, 0x44]

console.log('TS bytecode:')
let pos = 0
let stackDepth = 0
while (pos < bytes.length) {
  const op = bytes[pos]
  const def = OPCODE_BY_CODE[op]
  if (def) {
    const size = def.size
    const params = bytes.slice(pos+1, pos+size).map(b => '0x'+b.toString(16).padStart(2,'0')).join(' ')
    stackDepth = stackDepth - def.nPop + def.nPush
    console.log('pos=' + pos + ': ' + def.id + ' (size=' + size + ', stack=' + stackDepth + ') ' + params)
    pos += size
  } else {
    console.log('pos=' + pos + ': UNKNOWN 0x' + op.toString(16))
    pos++
  }
}
