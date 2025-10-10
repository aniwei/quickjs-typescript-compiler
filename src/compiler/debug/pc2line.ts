import { PC2Line } from '../../env'
import type { FunctionDef } from '../../functionDef'
import type { Instruction } from '../../functionBytecode'

const PC2LINE_BASE = PC2Line.PC2LINE_BASE
const PC2LINE_OP_FIRST = PC2Line.PC2LINE_OP_FIRST
const PC2LINE_RANGE = PC2Line.PC2LINE_RANGE
const PC2LINE_DIFF_PC_MAX = PC2Line.PC2LINE_DIFF_PC_MAX

interface BuildDebugInfoContext {
  func: FunctionDef
  getInstructionSize: (instruction: Instruction) => number
  getLineColumnFromUtf8Offset: (offset: number) => { line: number; column: number }
}

export function buildFunctionDebugInfo(context: BuildDebugInfoContext): void {
  const { func, getInstructionSize, getLineColumnFromUtf8Offset } = context
  const instructions = func.bytecode.instructions
  const instructionOffsets: number[] = new Array(instructions.length)
  let runningOffset = 0
  for (let index = 0; index < instructions.length; index += 1) {
    instructionOffsets[index] = runningOffset
    runningOffset += getInstructionSize(instructions[index])
  }

  const sortedEntries = [...func.bytecode.lineNumberTable]
    .filter((entry) => entry.sourcePos >= 0)
    .map((entry) => {
      const actualPc = entry.instructionIndex < instructionOffsets.length ? instructionOffsets[entry.instructionIndex] : entry.pc
      return {
        pc: actualPc,
        line: entry.line,
        column: entry.column,
        sourcePos: entry.sourcePos,
      }
    })
    .sort((a, b) => a.pc - b.pc)

  const baseSourcePos = func.sourcePos ?? 0
  const baseLinePos = getLineColumnFromUtf8Offset(baseSourcePos)

  const combinedEntries: typeof sortedEntries = [
    {
      pc: 0,
      line: baseLinePos.line,
      column: baseLinePos.column,
      sourcePos: baseSourcePos,
    },
    ...sortedEntries,
  ]

  const normalized: typeof combinedEntries = []
  if (process.env.DEBUG_PC2LINE === '1') {
    console.log('pc2line:rawTable', combinedEntries.map((entry) => ({ ...entry })))
  }
  for (const entry of combinedEntries) {
    const previous = normalized[normalized.length - 1]
    if (previous) {
      if (entry.sourcePos === previous.sourcePos && entry.pc === previous.pc) {
        continue
      }
      if (previous.line === entry.line && previous.column === entry.column) {
        continue
      }
      if (previous.sourcePos === entry.sourcePos) {
        continue
      }
    }
    normalized.push({ ...entry })
  }

  if (normalized.length === 0) {
    func.bytecode.pc2line = []
    func.bytecode.pc2column = []
    return
  }

  const pc2line: number[] = []
  const pc2column: number[] = []
  if (process.env.DEBUG_PC2LINE === '1') {
    console.log('pc2line:lineNumberTable', normalized.map((entry) => ({ ...entry })))
  }

  const first = normalized[0]
  const firstLine = first.line
  const firstColumn = first.column
  pc2line.push(...encodeULEB128(firstLine))
  pc2line.push(...encodeULEB128(firstColumn))
  pc2column.push(...encodeULEB128(firstColumn))

  let lastPc = first.pc
  let lastLine = firstLine
  let lastColumn = firstColumn

  for (let index = 1; index < normalized.length; index++) {
    const entry = normalized[index]
    if (entry.pc < lastPc) {
      continue
    }
    const diffPc = entry.pc - lastPc
    const currentLine = entry.line
    const diffLine = currentLine - lastLine
    const currentColumn = entry.column
    const diffColumn = currentColumn - lastColumn

    if (diffLine === 0 && diffColumn === 0) {
      continue
    }

    if (
      diffPc >= 0 &&
      diffPc <= PC2LINE_DIFF_PC_MAX &&
      diffLine >= PC2LINE_BASE &&
      diffLine < PC2LINE_BASE + PC2LINE_RANGE
    ) {
      const op = PC2LINE_OP_FIRST + diffPc * PC2LINE_RANGE + (diffLine - PC2LINE_BASE)
      pc2line.push(op)
    } else {
      pc2line.push(0)
      pc2line.push(...encodeULEB128(diffPc))
      pc2line.push(...encodeSLEB128(diffLine))
    }

    pc2line.push(...encodeSLEB128(diffColumn))
    pc2column.push(...encodeSLEB128(diffColumn))

    lastPc = entry.pc
    lastLine = currentLine
    lastColumn = currentColumn
  }

  func.bytecode.pc2line = pc2line
  func.bytecode.pc2column = pc2column
  if (process.env.DEBUG_PC2LINE === '1') {
    console.log('pc2line:encoded', pc2line)
  }
  func.bytecode.source = ''
  func.bytecode.sourceLength = 0
}

function encodeULEB128(value: number): number[] {
  const result: number[] = []
  let v = value >>> 0
  do {
    let byte = v & 0x7f
    v >>>= 7
    if (v !== 0) {
      byte |= 0x80
    }
    result.push(byte)
  } while (v !== 0)
  return result
}

function encodeSLEB128(value: number): number[] {
  const result: number[] = []
  let encoded = ((value << 1) ^ (value >> 31)) >>> 0
  do {
    let byte = encoded & 0x7f
    encoded >>>= 7
    if (encoded !== 0) {
      byte |= 0x80
    }
    result.push(byte)
  } while (encoded !== 0)
  return result
}
