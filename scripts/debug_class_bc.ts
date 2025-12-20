import { OPCODE_BY_CODE } from '../src/env'
import * as fs from 'fs'

function findSequence(buf: Buffer, seq: number[]): number {
  for (let i = 0; i <= buf.length - seq.length; i++) {
    let found = true
    for (let j = 0; j < seq.length; j++) {
      if (buf[i + j] !== seq[j]) {
        found = false
        break
      }
    }
    if (found) return i
  }
  return -1
}

function disasm(bytes: number[], label: string) {
  console.log(label + ':')
  let pos = 0
  let stackDepth = 0
  while (pos < bytes.length && pos < 40) {
    const op = bytes[pos]
    const def = OPCODE_BY_CODE[op]
    if (def) {
      const size = def.size
      const params = bytes.slice(pos+1, pos+size).map(b => '0x'+b.toString(16).padStart(2,'0')).join(' ')
      stackDepth = stackDepth - def.nPop + def.nPush
      console.log('pos=' + pos + ': ' + def.id + ' (stack=' + stackDepth + ') ' + params)
      pos += size
    } else {
      console.log('pos=' + pos + ': UNKNOWN 0x' + op.toString(16))
      pos++
    }
  }
}

// push_this=0x08, put_loc0=0xcb, check_ctor=0x2b
const signature = [0x08, 0xcb, 0x2b]

// WASM
try {
  const wasmBuf = fs.readFileSync('artifacts/class-basic.wasm.qbc')
  const wasmStart = findSequence(wasmBuf, signature)
  if (wasmStart >= 0) {
    console.log('WASM at 0x' + wasmStart.toString(16))
    disasm(Array.from(wasmBuf.slice(wasmStart, wasmStart + 40)), 'WASM')
  }
} catch (e) {
  console.log('WASM file not found')
}
