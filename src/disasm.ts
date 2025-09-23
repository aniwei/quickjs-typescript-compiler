/**
 * Advanced Disassembler for QuickJS Bytecode
 * Generates detailed assembly output similar to QuickJS WASM output
 */

import { LEB128 } from './leb128'

export interface DisassemblyResult {
  functionInfo: FunctionInfo
  assembly: string[]
}

export interface FunctionInfo {
  fileName: string
  mode: string
  locals: LocalInfo[]
  closureVars: ClosureVarInfo[]
  stackSize: number
  atoms: string[]
}

export interface LocalInfo {
  index: number
  name: string
  type: string
  level?: number
  next?: number
}

export interface ClosureVarInfo {
  index: number
  name: string
  localRef: string
  type: string
}

export class QuickJSDisassembler {
  private bytecode: Uint8Array
  private offset: number = 0

  constructor(bytecode: Uint8Array) {
    this.bytecode = bytecode
  }

  disassemble(): DisassemblyResult {
    this.offset = 0
    
    // Parse header
    const bcVersion = this.readU8()
    const atomCount = this.readLEB128()
    
    // Parse atoms
    const atoms: string[] = []
    for (let i = 0; i < atomCount; i++) {
      atoms.push(this.readString())
    }
    
    // Parse function header
    const functionTag = this.readU8() // BC_TAG_FUNCTION_BYTECODE
    const flags = this.readU16()
    const jsMode = this.readU8()
    const funcNameAtom = this.readLEB128()
    const argCount = this.readLEB128()
    const varCount = this.readLEB128()
    const definedArgCount = this.readLEB128()
    const stackSize = this.readLEB128()
    const closureVarCount = this.readLEB128()
    const cpoolCount = this.readLEB128()
    const bytecodeLen = this.readLEB128()
    const vardefsCount = this.readLEB128()
    
    // Parse vardefs
    const locals: LocalInfo[] = []
    for (let i = 0; i < vardefsCount; i++) {
      const varNameAtom = this.readLEB128()
      const scopeLevel = this.readLEB128()
      const scopeNext = this.readLEB128()
      const varFlags = this.readU8()
      
      locals.push({
        index: i,
        name: atoms[varNameAtom] || `atom${varNameAtom}`,
        type: 'const', // Simplified
        level: scopeLevel,
        next: scopeNext > 0 ? scopeNext - 1 : -1
      })
    }
    
    // Create function info
    const functionInfo: FunctionInfo = {
      fileName: atoms[0] || '<unknown>',
      mode: jsMode === 0 ? 'strict' : 'sloppy',
      locals,
      closureVars: [], // Simplified
      stackSize,
      atoms
    }
    
    // Generate assembly
    const assembly: string[] = []
    assembly.push(`${functionInfo.fileName}:1:1: function: <eval>`)
    assembly.push(`  mode: ${functionInfo.mode}`)
    
    if (functionInfo.locals.length > 0) {
      assembly.push(`  locals:`)
      functionInfo.locals.forEach(local => {
        assembly.push(`    ${local.index}: ${local.type} ${local.name} [level:${local.level} next:${local.next}]`)
      })
    }
    
    if (functionInfo.closureVars.length > 0) {
      assembly.push(`  closure vars:`)
      functionInfo.closureVars.forEach(cv => {
        assembly.push(`    ${cv.index}: ${cv.name} ${cv.localRef} ${cv.type}`)
      })
    }
    
    assembly.push(`  stack_size: ${functionInfo.stackSize}`)
    assembly.push(`  opcodes:`)
    
    // Parse and disassemble opcodes
    const opcodeStart = this.offset
    const opcodeEnd = opcodeStart + bytecodeLen
    let pc = 0
    
    while (this.offset < opcodeEnd && this.offset < this.bytecode.length) {
      const instrStart = this.offset
      const opcode = this.readU8()
      
      assembly.push(`    ${pc.toString().padStart(4)}: ${this.formatInstruction(opcode, pc)}`)
      
      pc = this.offset - opcodeStart
    }
    
    return {
      functionInfo,
      assembly
    }
  }

  private readU8(): number {
    if (this.offset >= this.bytecode.length) return 0
    return this.bytecode[this.offset++]
  }

  private readU16(): number {
    const low = this.readU8()
    const high = this.readU8()
    return low | (high << 8)
  }

  private readLEB128(): number {
    const result = LEB128.decode(this.bytecode, this.offset)
    this.offset += result.length
    return result.value
  }

  private readString(): string {
    const lenWithFlags = this.readLEB128()
    const len = lenWithFlags >> 1 // Remove wide char flag
    const isWideChar = (lenWithFlags & 1) !== 0
    
    if (isWideChar) {
      // Wide character string (UTF-16)
      const chars: number[] = []
      for (let i = 0; i < len; i++) {
        chars.push(this.readU16())
      }
      return String.fromCharCode(...chars)
    } else {
      // Regular string (UTF-8)
      const bytes: number[] = []
      for (let i = 0; i < len; i++) {
        bytes.push(this.readU8())
      }
      return new TextDecoder().decode(new Uint8Array(bytes))
    }
  }

  private formatInstruction(opcode: number, pc: number): string {
    // Simplified instruction formatting
    return `opcode_${opcode.toString(16).padStart(2, '0')}`
  }
}

export function createAdvancedDisassembly(bytecode: Uint8Array): string {
  const disassembler = new QuickJSDisassembler(bytecode)
  const result = disassembler.disassemble()
  return result.assembly.join('\n')
}