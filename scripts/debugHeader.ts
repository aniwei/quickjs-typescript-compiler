import { BytecodeGenerator } from '../src/bytecode'
import { AtomTable } from '../src/atoms'
import { Constants } from '../src/constant'
import { LabelManager } from '../src/label'

const gen = new BytecodeGenerator(
  { bigInt: false, dump: false, shortCode: false, debug: false, strictMode: false },
  new AtomTable(),
  new Constants(),
  new LabelManager()
)

gen.addVarDef('a', 'const')
gen.addVarDef('b', 'let')
gen.addVarDef('c', 'var')

const bc = gen.finalize()

function readLEB128(buffer: Uint8Array, offset: number) {
  let result = 0
  let shift = 0
  let bytesRead = 0
  while (offset + bytesRead < buffer.length) {
    const byte = buffer[offset + bytesRead]
    result |= (byte & 0x7F) << shift
    bytesRead++
    if ((byte & 0x80) === 0) break
    shift += 7
  }
  return { value: result, bytesRead }
}

let offset = 0
const version = bc[offset++]
const { value: atomCount, bytesRead: aBytes } = readLEB128(bc, offset); offset += aBytes
for (let i = 0; i < atomCount; i++) { const { value: l, bytesRead } = readLEB128(bc, offset); offset += bytesRead + (l >> 1) }
const tag = bc[offset++]
const flags = bc[offset] | (bc[offset+1] << 8); offset += 2
const jsMode = bc[offset++]
const funcName = readLEB128(bc, offset); offset += funcName.bytesRead
const argCount = readLEB128(bc, offset); offset += 1
const varCount = readLEB128(bc, offset); offset += 1
const defArg = readLEB128(bc, offset); offset += 1
const stackSize = readLEB128(bc, offset); offset += 1
const closure = readLEB128(bc, offset); offset += 1
const cpool = readLEB128(bc, offset); offset += 1
const bcLen = readLEB128(bc, offset); offset += 1
const nextBytes = Array.from(bc.slice(offset, offset + 16))
const localCount = readLEB128(bc, offset);
console.log({version, tag, flags, jsMode, funcName, argCount, varCount, defArg, stackSize, closure, cpool, bcLen, nextBytes, localCount})
