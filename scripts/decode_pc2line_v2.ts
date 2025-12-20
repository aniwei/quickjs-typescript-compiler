const PC2LINE_BASE = -1
const PC2LINE_RANGE = 5
const PC2LINE_OP_FIRST = 1

function readULEB128(data: number[], offset: { val: number }): number {
  let result = 0, shift = 0
  while (offset.val < data.length) {
    const byte = data[offset.val++]
    result |= (byte & 0x7f) << shift
    if ((byte & 0x80) === 0) break
    shift += 7
  }
  return result
}

function readSLEB128(data: number[], offset: { val: number }): number {
  let result = 0, shift = 0, byte: number
  do {
    byte = data[offset.val++]
    result |= (byte & 0x7f) << shift
    shift += 7
  } while ((byte & 0x80) !== 0)
  if (shift < 32 && (byte & 0x40) !== 0) {
    result |= (~0 << shift)
  }
  return result
}

function decodePc2line(name: string, data: number[]) {
  console.log(`\n=== ${name} ===`)
  console.log(`Raw bytes: ${data.map(b => b.toString(16).padStart(2, '0')).join(' ')}`)
  
  const offset = { val: 0 }
  const initLine = readULEB128(data, offset)
  const initCol = readULEB128(data, offset)
  
  console.log(`Initial: line=${initLine}, col=${initCol}`)
  
  let pc = 0, line = initLine, col = initCol
  
  while (offset.val < data.length) {
    const startPos = offset.val
    const op = data[offset.val++]
    
    if (op === 0) {
      if (offset.val >= data.length) {
        console.log(`  [end marker at offset ${startPos}]`)
        break
      }
      const diffPc = readULEB128(data, offset)
      const diffLine = readSLEB128(data, offset)
      const diffCol = readSLEB128(data, offset)
      pc += diffPc
      line += diffLine
      col += diffCol
      console.log(`  Long format: op=0x00, pc=${pc}, line=${line}, col=${col} (Δpc=${diffPc}, Δline=${diffLine}, Δcol=${diffCol})`)
    } else {
      const opVal = op - PC2LINE_OP_FIRST
      const diffPc = Math.floor(opVal / PC2LINE_RANGE)
      const diffLine = (opVal % PC2LINE_RANGE) + PC2LINE_BASE
      const diffCol = readSLEB128(data, offset)
      pc += diffPc
      line += diffLine
      col += diffCol
      console.log(`  Short format: op=0x${op.toString(16)}, pc=${pc}, line=${line}, col=${col} (Δpc=${diffPc}, Δline=${diffLine}, Δcol=${diffCol})`)
    }
  }
}

console.log("Source code:")
console.log(`const arr = [1, 2, 3];`)
console.log(`console.log(arr[1]);`)
console.log(``)

// TS pc2line: 00 00 3e 1a 07 06 07 06 7b 05 0c 1f
decodePc2line("TS", [0x00, 0x00, 0x3e, 0x1a, 0x07, 0x06, 0x07, 0x06, 0x7b, 0x05, 0x0c, 0x1f])

// WASM pc2line: 00 00 76 00 1b 0e 1b 0a 20 06 07 07
decodePc2line("WASM", [0x00, 0x00, 0x76, 0x00, 0x1b, 0x0e, 0x1b, 0x0a, 0x20, 0x06, 0x07, 0x07])
