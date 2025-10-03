import { readFileSync } from 'node:fs'

function decodePc2line(buffer: number[]): { pc: number; line: number; column: number }[] {
  let offset = 0

  const readULEB = (): number => {
    let result = 0
    let shift = 0
    while (true) {
      const byte = buffer[offset++]
      result |= (byte & 0x7f) << shift
      if ((byte & 0x80) === 0) {
        break
      }
      shift += 7
    }
    return result >>> 0
  }

  const readSLEB = (): number => {
    const encoded = readULEB()
    return ((encoded >>> 1) ^ -(encoded & 1)) | 0
  }

  const entries: { pc: number; line: number; column: number }[] = []
  let pc = 0
  let line = readULEB()
  let column = readULEB()
  entries.push({ pc, line, column })

  while (offset < buffer.length) {
    const op = buffer[offset++]
    let diffPc: number
    let diffLine: number
    if (op === 0) {
      diffPc = readULEB()
      diffLine = readSLEB()
    } else {
      const encoded = op - 1
      const diffPcCandidate = Math.floor(encoded / 5)
      const diffLineCandidate = (encoded % 5) - 1
      diffPc = diffPcCandidate
      diffLine = diffLineCandidate
    }
    const diffColumn = readSLEB()
    pc += diffPc
    line += diffLine
    column += diffColumn
    entries.push({ pc, line, column })
  }

  return entries
}

function main() {
  const [jsonPath, key] = process.argv.slice(2)
  if (!jsonPath || !key) {
    console.error('Usage: tsx decodePc2line.ts <json> <path.to.pc2line>')
    process.exit(1)
  }

  const data = JSON.parse(readFileSync(jsonPath, 'utf8'))
  const segments = key.split('.')
  let current: any = data
  for (const segment of segments) {
    if (segment.match(/^\d+$/)) {
      current = current[Number(segment)]
    } else {
      current = current[segment]
    }
    if (!current) {
      throw new Error(`Missing segment ${segment}`)
    }
  }

  if (!Array.isArray(current)) {
    throw new Error('Target is not an array')
  }

  const entries = decodePc2line(current)
  for (const entry of entries) {
    console.log(`pc=${entry.pc} line=${entry.line + 1} column=${entry.column + 1}`)
  }
}

main()
