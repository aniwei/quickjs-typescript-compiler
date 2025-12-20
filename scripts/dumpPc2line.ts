#!/usr/bin/env tsx

import { promises as fs } from 'node:fs'
import path from 'node:path'

const PC2LINE_BASE = -1
const PC2LINE_RANGE = 5
const PC2LINE_OP_FIRST = 1

interface Pc2LineEntry {
  pc: number
  line: number
  column: number
  deltaPc: number
  deltaLine: number
  deltaColumn: number
}

async function main() {
  const [, , inputFile] = process.argv
  if (!inputFile) {
    console.error('用法: tsx scripts/dumpPc2line.ts <file.qbc>')
    process.exit(1)
  }

  const filePath = path.resolve(inputFile)
  const data = new Uint8Array(await fs.readFile(filePath))
  const parser = new Parser(data)

  try {
    const { pc2line, hasDebug } = parser.readModule()
    if (!hasDebug || !pc2line) {
      console.log('⚠️  字节码中没有调试信息 (pc2line)。')
      return
    }

    console.log(`📄 文件: ${path.relative(process.cwd(), filePath)}`)
    console.log(`🔢 pc2line 长度: ${pc2line.length} 字节`)
    console.log('原始字节:', [...pc2line].map((b) => `0x${b.toString(16).padStart(2, '0')}`).join(' '))

    const entries = decodePc2line(pc2line)
    console.log('┏━━╸PC ╺━━╸行 ╺━━╸列 ╺━━╸ΔPC ╺━━╸Δ行 ╺━━╸Δ列')
    for (const entry of entries) {
      const pcText = entry.pc.toString().padStart(4, ' ')
      const lineText = (entry.line + 1).toString().padStart(3, ' ')
      const colText = (entry.column + 1).toString().padStart(3, ' ')
      const deltaPc = entry.deltaPc.toString().padStart(3, ' ')
      const deltaLine = entry.deltaLine.toString().padStart(3, ' ')
      const deltaColumn = entry.deltaColumn.toString().padStart(3, ' ')
      console.log(`┃ ${pcText} → ${lineText} : ${colText}  [Δpc=${deltaPc} Δ行=${deltaLine} Δ列=${deltaColumn}]`)
    }
  } catch (error) {
    console.error('❌ 解析失败:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

class Parser {
  private offset = 0

  constructor(private readonly buffer: Uint8Array) {}

  readModule(): { pc2line: Uint8Array | null; hasDebug: boolean } {
    this.readU8() // version
    const atomCount = this.readULEB()
    for (let i = 0; i < atomCount; i++) {
      const sizeInfo = this.readULEB()
      const byteLength = sizeInfo >> 1
      const isWide = (sizeInfo & 1) === 1
      const bytesToSkip = isWide ? byteLength * 2 : byteLength
      this.skip(bytesToSkip)
    }

    const tag = this.readU8()
    if (tag === BytecodeTag.TC_TAG_FUNCTION_BYTECODE) {
      // 直接是函数
      this.offset-- // 回退 tag
      return this.readFunction()
    }

    if (tag !== BytecodeTag.TC_TAG_MODULE) {
      throw new Error(`预期模块标签(${BytecodeTag.TC_TAG_MODULE}), 实际 ${tag}`)
    }

    this.readULEB() // module atom
    this.readULEB() // req_module_entries_count
    this.readULEB() // export_entries_count
    this.readULEB() // star_export_entries_count
    this.readULEB() // import_entries_count
    this.readU8() // has_tla

    return this.readFunction()
  }

  private readFunction(): { pc2line: Uint8Array | null; hasDebug: boolean } {
    const tag = this.readU8()
    if (tag !== BytecodeTag.TC_TAG_FUNCTION_BYTECODE) {
      throw new Error(`预期函数标签(${BytecodeTag.TC_TAG_FUNCTION_BYTECODE}), 实际 ${tag}`)
    }

    const flags = this.readU16()
    const jsMode = this.readU8() // js_mode
    const nameAtom = this.readULEB() // name atom

    const argCount = this.readULEB() // arg_count
    const varCount = this.readULEB() // var_count
    const definedArgCount = this.readULEB() // defined_arg_count
    const stackSize = this.readULEB() // stack_size
    const closureVarCount = this.readULEB()
    const constantPoolCount = this.readULEB()
    const bytecodeLen = this.readULEB()

    console.log(`\n--- Function (Atom ${nameAtom}) ---`)
    console.log(`Flags: 0x${flags.toString(16)}`)
    console.log(`Args: ${argCount}, Vars: ${varCount}, Stack: ${stackSize}`)
    console.log(`Closure Vars: ${closureVarCount}, Constants: ${constantPoolCount}, Bytecode: ${bytecodeLen}`)

    const varDefCount = this.readULEB()
    console.log(`Var Defs: ${varDefCount}`)
    for (let i = 0; i < varDefCount; i++) {
      const name = this.readULEB() // name atom
      const scopeLevel = this.readULEB() // scope level
      const scopeNext = this.readULEB() // scope next + 1
      const flags = this.readU8() // flags
      console.log(`  Var ${i}: Atom ${name}, Scope ${scopeLevel}, Next ${scopeNext}, Flags 0x${flags.toString(16)}`)
    }

    for (let i = 0; i < closureVarCount; i++) {
      this.readULEB()
      this.readULEB()
      this.readU8()
    }

    this.skip(bytecodeLen)

    const hasDebug = (flags & (1 << 10)) !== 0
    let pc2line: Uint8Array | null = null

    if (hasDebug) {
      this.readULEB() // filename atom
      const pc2lineLen = this.readULEB()
      console.log(`[DEBUG] Reading pc2line len=${pc2lineLen}`)
      pc2line = this.buffer.slice(this.offset, this.offset + pc2lineLen)
      this.skip(pc2lineLen)
      this.readULEB() // source length (ignored)
    }

    // 跳过常量池内容
    for (let i = 0; i < constantPoolCount; i++) {
      this.skipConstant()
    }

    return { pc2line, hasDebug }
  }

  private skipConstant() {
    const tag = this.readU8()
    switch (tag) {
      case BytecodeTag.TC_TAG_NULL:
      case BytecodeTag.TC_TAG_UNDEFINED:
      case BytecodeTag.TC_TAG_BOOL_FALSE:
      case BytecodeTag.TC_TAG_BOOL_TRUE:
        return
      case BytecodeTag.TC_TAG_INT32:
        this.readSLEB()
        return
      case BytecodeTag.TC_TAG_FLOAT64:
        this.skip(8)
        return
      case BytecodeTag.TC_TAG_STRING: {
        const lenInfo = this.readULEB()
        const byteLength = lenInfo >> 1
        const isWide = (lenInfo & 1) === 1
        this.skip(isWide ? byteLength * 2 : byteLength)
        return
      }
      case BytecodeTag.TC_TAG_ARRAY: {
        const length = this.readULEB()
        for (let i = 0; i < length; i++) {
          this.skipConstant()
        }
        return
      }
      case BytecodeTag.TC_TAG_TEMPLATE_OBJECT: {
        const length = this.readULEB()
        for (let i = 0; i < length; i++) {
          this.skipConstant()
        }
        this.skipConstant()
        return
      }
      case BytecodeTag.TC_TAG_OBJECT: {
        const propCount = this.readULEB()
        for (let i = 0; i < propCount; i++) {
          this.readULEB() // atom
          this.skipConstant()
        }
        return
      }
      case BytecodeTag.TC_TAG_FUNCTION_BYTECODE:
        this.offset--
        const func = this.readFunction()
        if (func.pc2line) {
            console.log(`\n--- Nested Function ---`)
            console.log(`🔢 pc2line 长度: ${func.pc2line.length} 字节`)
            console.log('原始字节:', [...func.pc2line].map((b) => `0x${b.toString(16).padStart(2, '0')}`).join(' '))
            const entries = decodePc2line(func.pc2line)
            for (const entry of entries) {
                console.log(`┃ ${entry.pc} → ${entry.line+1} : ${entry.column+1} ...`)
            }
        }
        return
      default:
        throw new Error(`暂不支持跳过常量标记 ${tag}`)
    }
  }

  private readU8(): number {
    if (this.offset >= this.buffer.length) {
      throw new Error('读取越界')
    }
    return this.buffer[this.offset++]
  }

  private readU16(): number {
    const value = this.buffer[this.offset] | (this.buffer[this.offset + 1] << 8)
    this.offset += 2
    return value
  }

  private readULEB(): number {
    let result = 0
    let shift = 0
    while (true) {
      const byte = this.readU8()
      result |= (byte & 0x7f) << shift
      if ((byte & 0x80) === 0) break
      shift += 7
    }
    return result >>> 0
  }

  private readSLEB(): number {
    let result = 0
    let shift = 0
    let byte: number
    do {
      byte = this.readU8()
      result |= (byte & 0x7f) << shift
      shift += 7
    } while (byte & 0x80)
    if (shift < 32 && (byte & 0x40)) {
      result |= (~0 << shift)
    }
    return result | 0
  }

  private skip(length: number) {
    this.offset += length
    if (this.offset > this.buffer.length) {
      throw new Error('跳过超出缓冲区范围')
    }
  }
}

function decodePc2line(buffer: Uint8Array): Pc2LineEntry[] {
  let offset = 0
  const readULEB = (): number => {
    let result = 0
    let shift = 0
    while (true) {
      const byte = buffer[offset++]
      result |= (byte & 0x7f) << shift
      if ((byte & 0x80) === 0) break
      shift += 7
    }
    return result >>> 0
  }
  const readSLEB = (): number => {
    const encoded = readULEB()
    return ((encoded >>> 1) ^ -(encoded & 1)) | 0
  }

  const entries: Pc2LineEntry[] = []
  let pc = 0
  let line = readULEB()
  let column = readULEB()
  entries.push({ pc, line, column, deltaPc: 0, deltaLine: 0, deltaColumn: 0 })

  while (offset < buffer.length) {
    const op = buffer[offset++]
    let diffPc: number
    let diffLine: number

    if (op === 0) {
      diffPc = readULEB()
      diffLine = readSLEB()
    } else {
      const encoded = op - PC2LINE_OP_FIRST
      diffPc = Math.floor(encoded / PC2LINE_RANGE)
      diffLine = (encoded % PC2LINE_RANGE) + PC2LINE_BASE
    }
    const diffColumn = readSLEB()

    pc += diffPc
    line += diffLine
    column += diffColumn

    entries.push({
      pc,
      line,
      column,
      deltaPc: diffPc,
      deltaLine: diffLine,
      deltaColumn: diffColumn,
    })
  }

  return entries
}

enum BytecodeTag {
  TC_TAG_NULL = 1,
  TC_TAG_UNDEFINED = 2,
  TC_TAG_BOOL_FALSE = 3,
  TC_TAG_BOOL_TRUE = 4,
  TC_TAG_INT32 = 5,
  TC_TAG_FLOAT64 = 6,
  TC_TAG_STRING = 7,
  TC_TAG_OBJECT = 8,
  TC_TAG_ARRAY = 9,
  TC_TAG_BIG_INT = 10,
  TC_TAG_TEMPLATE_OBJECT = 11,
  TC_TAG_FUNCTION_BYTECODE = 12,
  TC_TAG_MODULE = 13,
}

main()
