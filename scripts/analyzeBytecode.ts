#!/usr/bin/env tsx

import { readFile } from 'node:fs/promises'
import { parseBytecodeModule } from '../src/bytecodeReader'
import { PC2Line } from '../src/env'

async function main() {
  const target = process.argv[2]
  if (!target) {
    console.error('Usage: tsx scripts/analyzeBytecode.ts <bytecode-file>')
    process.exit(1)
  }
  const data = await readFile(target)
  const parsed = parseBytecodeModule(data)
  const debug = parsed.root.function.debug
  console.log('filename', debug?.filename)
  console.log('pc2line', debug?.pc2line)
  console.log('decoded', decodePc2Line(debug?.pc2line ?? []))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

function decodePc2Line(data: number[]) {
  if (data.length === 0) {
    return []
  }
  let offset = 0
  const readULEB = () => {
    let result = 0
    let shift = 0
    while (offset < data.length) {
      const byte = data[offset++]!
      result |= (byte & 0x7f) << shift
      if ((byte & 0x80) === 0) {
        break
      }
      shift += 7
    }
    return result >>> 0
  }
  const readSLEB = () => {
    const encoded = readULEB()
    return ((encoded >>> 1) ^ -(encoded & 1)) | 0
  }

  const entries: Array<{ pc: number; line: number; column: number }> = []
  let pc = 0
  let line = readULEB()
  let column = readULEB()
  entries.push({ pc, line, column })
  while (offset < data.length) {
    const op = data[offset++]!
    let diffPc = 0
    let diffLine = 0
    if (op === 0) {
      diffPc = readULEB()
      diffLine = readSLEB()
    } else {
      const delta = op - PC2Line.PC2LINE_OP_FIRST
      diffPc = Math.floor(delta / PC2Line.PC2LINE_RANGE)
      diffLine = PC2Line.PC2LINE_BASE + (delta % PC2Line.PC2LINE_RANGE)
    }
    const diffColumn = readSLEB()
    pc += diffPc
    line += diffLine
    column += diffColumn
    entries.push({ pc, line, column })
  }
  return entries
}
