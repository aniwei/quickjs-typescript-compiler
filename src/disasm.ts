/**
 * Advanced Disassembler for QuickJS Bytecode
 * Generates detailed assembly output similar to QuickJS WASM output
 */

import { LEB128 } from './leb128'
import { ATOM_STRINGS, JSMode, OpFormat, env, type OpcodeDefinition } from './env'
import { getOpcodeDefinition, getOpcodeName } from './utils/opcode'

const BUILTIN_ATOMS = new Map<number, string>(
  Object.entries(ATOM_STRINGS).map(([id, value]) => [Number(id), value])
)

const utf8Decoder = new TextDecoder()

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
  private readonly view: DataView
  private readonly customAtoms = new Map<number, string>()

  constructor(bytecode: Uint8Array) {
    this.bytecode = bytecode
    this.view = new DataView(bytecode.buffer, bytecode.byteOffset, bytecode.byteLength)
  }

  disassemble(): DisassemblyResult {
    this.offset = 0
    this.customAtoms.clear()
    
    // Parse header
    const bcVersion = this.readU8()
  const atomCount = this.readULEB128()
    
    // Parse atoms
    const atoms: string[] = []
    for (let i = 0; i < atomCount; i++) {
  const value = this.readBCString()
  const atomId = env.firstAtomId + i
  this.customAtoms.set(atomId, value)
  atoms.push(value)
    }
    
    // Parse function header
    const functionTag = this.readU8() // BC_TAG_FUNCTION_BYTECODE
    const flags = this.readU16()
    const jsMode = this.readU8()
  const funcNameAtom = this.readULEB128()
  const argCount = this.readULEB128()
  const varCount = this.readULEB128()
  const definedArgCount = this.readULEB128()
  const stackSize = this.readULEB128()
  const closureVarCount = this.readULEB128()
  const cpoolCount = this.readULEB128()
  const bytecodeLen = this.readULEB128()
  const vardefsCount = this.readULEB128()
    
    // Parse vardefs
    const locals: LocalInfo[] = []
    for (let i = 0; i < vardefsCount; i++) {
  const varNameAtom = this.readULEB128()
  const scopeLevel = this.readULEB128()
  const scopeNext = this.readULEB128()
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
    const modeFlags: string[] = []
    if ((jsMode & JSMode.JS_MODE_STRICT) !== 0) {
      modeFlags.push('strict')
    } else {
      modeFlags.push('sloppy')
    }
    if ((jsMode & JSMode.JS_MODE_ASYNC) !== 0) {
      modeFlags.push('async')
    }
    if ((jsMode & JSMode.JS_MODE_BACKTRACE_BARRIER) !== 0) {
      modeFlags.push('backtrace_barrier')
    }

    const functionInfo: FunctionInfo = {
      fileName: atoms[0] || '<unknown>',
      mode: modeFlags.join(' '),
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
    this.ensure(1)
    const value = this.bytecode[this.offset]
    this.offset += 1
    return value
  }

  private readInt8(): number {
    const value = this.readU8()
    return (value << 24) >> 24
  }

  private readU16(): number {
    this.ensure(2)
    const value = this.view.getUint16(this.offset, true)
    this.offset += 2
    return value
  }

  private readInt16(): number {
    this.ensure(2)
    const value = this.view.getInt16(this.offset, true)
    this.offset += 2
    return value
  }

  private readU32(): number {
    this.ensure(4)
    const value = this.view.getUint32(this.offset, true)
    this.offset += 4
    return value
  }

  private readInt32(): number {
    this.ensure(4)
    const value = this.view.getInt32(this.offset, true)
    this.offset += 4
    return value
  }

  private readBytes(length: number): Uint8Array {
    this.ensure(length)
    const slice = this.bytecode.subarray(this.offset, this.offset + length)
    this.offset += length
    return new Uint8Array(slice)
  }

  private readULEB128(): number {
    const { value, length } = LEB128.decode(this.bytecode, this.offset)
    this.offset += length
    return value >>> 0
  }

  private readBCString(): string {
    const lenWithFlags = this.readULEB128()
    const len = lenWithFlags >> 1
    const isWideChar = (lenWithFlags & 1) !== 0

    if (isWideChar) {
      const chars: number[] = []
      for (let i = 0; i < len; i++) {
        chars.push(this.readU16())
      }
      return String.fromCharCode(...chars)
    }
    const bytes = this.readBytes(len)
    return utf8Decoder.decode(bytes)
  }

  private formatInstruction(opcode: number, pc: number): string {
    const def = getOpcodeDefinition(opcode)
    const opcodeName =
      getOpcodeName(opcode) ??
      (def?.id !== undefined ? `OP_${def.id}` : `opcode_${opcode.toString(16).padStart(2, '0')}`)

    if (!def) {
      return opcodeName
    }

    const operand = this.readOperand(def, pc)
    if (!operand) {
      return opcodeName
    }
    return `${opcodeName} ${operand}`
  }

  private readOperand(def: OpcodeDefinition, pc: number): string | null {
    switch (def.format) {
      case OpFormat.none:
      case OpFormat.none_arg:
      case OpFormat.none_int:
      case OpFormat.none_loc:
      case OpFormat.none_var_ref:
        return null
      case OpFormat.loc8:
      case OpFormat.const8:
      case OpFormat.u8:
        return `${this.readU8()}`
      case OpFormat.i8:
        return `${this.readInt8()}`
      case OpFormat.label8: {
        const delta = this.readInt8()
        return this.formatRelativeLabel(delta, def, pc)
      }
      case OpFormat.u16:
      case OpFormat.npop_u16:
      case OpFormat.loc:
      case OpFormat.arg:
      case OpFormat.var_ref:
        return `${this.readU16()}`
      case OpFormat.label16: {
        const delta = this.readInt16()
        return this.formatRelativeLabel(delta, def, pc)
      }
      case OpFormat.i16:
        return `${this.readInt16()}`
      case OpFormat.u32:
      case OpFormat.const:
        return `${this.readU32()}`
      case OpFormat.i32:
        return `${this.readInt32()}`
      case OpFormat.label: {
        const delta = this.readInt32()
        return this.formatRelativeLabel(delta, def, pc)
      }
      case OpFormat.npop:
        return `${this.readU16()}`
      case OpFormat.npopx:
        return null
      case OpFormat.atom:
        return this.formatAtomOperand()
      case OpFormat.atom_u8: {
        const atom = this.formatAtomOperand()
        const value = this.readU8()
        return `${atom}, ${value}`
      }
      case OpFormat.atom_u16: {
        const atom = this.formatAtomOperand()
        const value = this.readU16()
        return `${atom}, ${value}`
      }
      case OpFormat.atom_label_u8: {
        const atom = this.formatAtomOperand()
        const label = this.readU32()
        const delta = this.readInt8()
        return `${atom}, label=${label}, delta=${delta}`
      }
      case OpFormat.atom_label_u16: {
        const atom = this.formatAtomOperand()
        const label = this.readU32()
        const value = this.readU16()
        return `${atom}, label=${label}, value=${value}`
      }
      case OpFormat.label_u16: {
        const label = this.readU32()
        const value = this.readU16()
        return `label=${label}, value=${value}`
      }
      default:
        return null
    }
  }

  private formatAtomOperand(): string {
    const encoded = this.readU32()
    if ((encoded & 1) === 1) {
      return `tagged-int(${encoded >> 1})`
    }
    const atomId = encoded >>> 1
    const name = this.resolveAtomName(atomId)
    return name ? `atom(${name})` : `atom#${atomId}`
  }

  private resolveAtomName(atomId: number): string | undefined {
    return this.customAtoms.get(atomId) ?? BUILTIN_ATOMS.get(atomId)
  }

  private formatRelativeLabel(delta: number, def: OpcodeDefinition, pc: number): string {
    const target = pc + this.getJumpBaseOffset(def) + delta
    const sign = delta >= 0 ? '+' : ''
    return `${sign}${delta} (-> ${target})`
  }

  private getJumpBaseOffset(def: OpcodeDefinition): number {
    switch (def.format) {
      case OpFormat.label:
      case OpFormat.label8:
      case OpFormat.label16:
      case OpFormat.label_u16:
        return 1
      case OpFormat.atom_label_u8:
      case OpFormat.atom_label_u16:
        return 5
      default:
        return def.size
    }
  }

  private ensure(length: number) {
    if (this.offset + length > this.bytecode.length) {
      throw new Error('Unexpected end of bytecode stream')
    }
  }
}

export function createAdvancedDisassembly(bytecode: Uint8Array): string {
  const disassembler = new QuickJSDisassembler(bytecode)
  const result = disassembler.disassemble()
  return result.assembly.join('\n')
}