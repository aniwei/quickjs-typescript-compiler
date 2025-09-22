/**
 * QuickJS Bytecode Generation
 * Based on third_party/QuickJS/src/core/bytecode.h and bytecode.cpp
 */

import { OpcodeDefinition, OpcodeFormat, CompilerFlags } from './opcodes'
import { AtomTable } from './atoms'
import { OpcodeGenerator } from './opcodeGenerator'

// LEB128 encoding/decoding utilities
export class LEB128 {
  static encode(value: number): Uint8Array {
    const bytes: number[] = []
    let remaining = value >>> 0 // Convert to unsigned 32-bit
    
    do {
      let byte = remaining & 0x7F
      remaining >>>= 7
      if (remaining !== 0) {
        byte |= 0x80
      }
      bytes.push(byte)
    } while (remaining !== 0)
    
    return new Uint8Array(bytes)
  }
  
  static encodeSigned(value: number): Uint8Array {
    const bytes: number[] = []
    let remaining = value
    let more = true
    
    while (more) {
      let byte = remaining & 0x7F
      remaining >>= 7
      
      if ((remaining === 0 && (byte & 0x40) === 0) ||
          (remaining === -1 && (byte & 0x40) !== 0)) {
        more = false
      } else {
        byte |= 0x80
      }
      bytes.push(byte)
    }
    
    return new Uint8Array(bytes)
  }
  
  static decode(bytes: Uint8Array, offset = 0): { value: number, length: number } {
    let result = 0
    let shift = 0
    let length = 0
    
    while (offset + length < bytes.length) {
      const byte = bytes[offset + length]
      length++
      
      result |= (byte & 0x7F) << shift
      shift += 7
      
      if ((byte & 0x80) === 0) {
        break
      }
    }
    
    return { value: result >>> 0, length }
  }
}

// Instruction representation
export interface Instruction {
  opcode: OpcodeDefinition
  args: number[]
  lineNumber?: number
}

// Label management
export class LabelManager {
  private labels = new Map<string, number>()
  private patches = new Map<string, number[]>()
  private nextId = 0
  
  createLabel(name?: string): string {
    const label = name || `L${this.nextId++}`
    if (!this.labels.has(label)) {
      this.patches.set(label, [])
    }
    return label
  }
  
  setLabel(label: string, address: number): void {
    this.labels.set(label, address)
    
    // Patch all references
    const patchList = this.patches.get(label) || []
    for (const patchAddr of patchList) {
      // Will be handled by bytecode writer
    }
  }
  
  addPatch(label: string, address: number): void {
    if (!this.patches.has(label)) {
      this.patches.set(label, [])
    }
    this.patches.get(label)!.push(address)
  }
  
  getAddress(label: string): number | undefined {
    return this.labels.get(label)
  }
  
  getPatches(): Map<string, number[]> {
    return this.patches
  }
}

export type ConstantValue = number | boolean | string | null | undefined

// Constants pool
export class Constants {
  private values: ConstantValue[] = []
  private map = new Map<string, number>()
  
  add(value: ConstantValue): number {
    const key = JSON.stringify(value)
    const existing = this.map.get(key)
    if (existing !== undefined) {
      return existing
    }
    
    const index = this.values.length
    this.values.push(value)
    this.map.set(key, index)
    return index
  }

  get(index: number): ConstantValue {
    return this.values[index]
  }
  
  getAll(): ConstantValue[] {
    return [...this.values]
  }
  
  size(): number {
    return this.values.length
  }
}

// Bytecode writer
export class BytecodeWriter {
  private buffer: number[] = []
  private instructions: Instruction[] = []
  private config: CompilerFlags
  private atomTable: AtomTable
  private constants: Constants
  private labelManager: LabelManager
  private opcodeGenerator?: OpcodeGenerator
  
  constructor(
    config: CompilerFlags,
    atomTable: AtomTable,
    constants: Constants,
    labelManager: LabelManager,
    opcodeGenerator?: OpcodeGenerator
  ) {
    this.config = config
    this.atomTable = atomTable
    this.constants = constants
    this.labelManager = labelManager
    this.opcodeGenerator = opcodeGenerator
  }
  
  // Write instruction with arguments
  writeInstruction(opcode: OpcodeDefinition, ...args: number[]): void {
    const instruction: Instruction = { opcode, args }
    this.instructions.push(instruction)
    
    // Write opcode
    this.writeUint8(this.getOpcodeValue(opcode))
    
    // Write arguments based on format
    this.writeInstructionArgs(opcode, args)
  }
  
  private writeInstructionArgs(opcode: OpcodeDefinition, args: number[]): void {
    switch (opcode.format) {
      case OpcodeFormat.NONE:
      case OpcodeFormat.NONE_INT:
      case OpcodeFormat.NONE_LOC:
      case OpcodeFormat.NONE_ARG:
      case OpcodeFormat.NONE_VAR_REF:
        // No arguments
        break
        
      case OpcodeFormat.U8:
      case OpcodeFormat.LOC8:
      case OpcodeFormat.CONST8:
      case OpcodeFormat.LABEL8:
        this.writeUint8(args[0] || 0)
        break
        
      case OpcodeFormat.I8:
        this.writeInt8(args[0] || 0)
        break
        
      case OpcodeFormat.U16:
      case OpcodeFormat.LABEL16:
        this.writeUint16(args[0] || 0)
        break
        
      case OpcodeFormat.I16:
        this.writeInt16(args[0] || 0)
        break
        
      case OpcodeFormat.U32:
        this.writeUint32(args[0] || 0)
        break
        
      case OpcodeFormat.I32:
        this.writeInt32(args[0] || 0)
        break
        
      case OpcodeFormat.ATOM:
        this.writeUint32(args[0] || 0) // Atom ID
        break
        
      case OpcodeFormat.CONST:
        this.writeUint32(args[0] || 0) // Constants pool index
        break
        
      case OpcodeFormat.LABEL:
        this.writeUint32(args[0] || 0) // Label address (will be patched)
        break
        
      case OpcodeFormat.NPOP:
      case OpcodeFormat.NPOPX:
        this.writeUint16(args[0] || 0) // Number of arguments to pop
        break
        
      case OpcodeFormat.NPOP_U16:
        this.writeUint16(args[0] || 0)
        break
        
      case OpcodeFormat.LOC:
      case OpcodeFormat.ARG:
      case OpcodeFormat.VAR_REF:
        this.writeUint16(args[0] || 0)
        break
        
      case OpcodeFormat.ATOM_U8:
        this.writeUint32(args[0] || 0) // Atom ID
        this.writeUint8(args[1] || 0)
        break
        
      case OpcodeFormat.ATOM_U16:
        this.writeUint32(args[0] || 0) // Atom ID
        this.writeUint16(args[1] || 0)
        break
        
      case OpcodeFormat.ATOM_LABEL_U8:
        this.writeUint32(args[0] || 0) // Atom ID
        this.writeUint32(args[1] || 0) // Label address
        this.writeUint8(args[2] || 0)
        break
        
      case OpcodeFormat.ATOM_LABEL_U16:
        this.writeUint32(args[0] || 0) // Atom ID
        this.writeUint32(args[1] || 0) // Label address
        this.writeUint16(args[2] || 0)
        break
        
      case OpcodeFormat.LABEL_U16:
        this.writeUint32(args[0] || 0) // Label address
        this.writeUint16(args[1] || 0)
        break
        
      default:
        throw new Error(`Unsupported opcode format: ${opcode.format}`)
    }
  }
  
  // Get numeric opcode value based on QuickJS encoding
  private getOpcodeValue(opcode: OpcodeDefinition): number {
    // Use the opcode generator if available
    if (this.opcodeGenerator) {
      const value = this.opcodeGenerator.getOpcodeValue(opcode.id)
      if (value !== undefined) {
        return value
      }
    }
    
    // Fallback to hash-based approach
    let hash = 0
    for (let i = 0; i < opcode.id.length; i++) {
      hash = ((hash << 5) - hash + opcode.id.charCodeAt(i)) & 0xFF
    }
    return hash
  }
  
  // Basic data type writers
  writeUint8(value: number): void {
    this.buffer.push(value & 0xFF)
  }
  
  writeInt8(value: number): void {
    this.buffer.push((value << 24) >> 24) // Sign extend
  }
  
  writeUint16(value: number): void {
    if (this.config.bigInt) {
      // Little endian
      this.buffer.push(value & 0xFF)
      this.buffer.push((value >> 8) & 0xFF)
    } else {
      this.buffer.push(value & 0xFF)
      this.buffer.push((value >> 8) & 0xFF)
    }
  }
  
  writeInt16(value: number): void {
    const unsigned = (value << 16) >> 16 // Sign extend to 16 bits
    this.writeUint16(unsigned)
  }
  
  writeUint32(value: number): void {
    // Little endian
    this.buffer.push(value & 0xFF)
    this.buffer.push((value >> 8) & 0xFF)
    this.buffer.push((value >> 16) & 0xFF)
    this.buffer.push((value >> 24) & 0xFF)
  }
  
  writeInt32(value: number): void {
    this.writeUint32(value >>> 0)
  }
  
  // LEB128 support
  writeLEB128(value: number): void {
    const bytes = LEB128.encode(value)
    for (const byte of bytes) {
      this.buffer.push(byte)
    }
  }
  
  writeLEB128Signed(value: number): void {
    const bytes = LEB128.encodeSigned(value)
    for (const byte of bytes) {
      this.buffer.push(byte)
    }
  }
  
  // Get current position for label management
  getCurrentPosition(): number {
    return this.buffer.length
  }
  
  // Patch label reference
  patchLabel(position: number, address: number): void {
    // Patch 4-byte label reference at position
    this.buffer[position] = address & 0xFF
    this.buffer[position + 1] = (address >> 8) & 0xFF
    this.buffer[position + 2] = (address >> 16) & 0xFF
    this.buffer[position + 3] = (address >> 24) & 0xFF
  }
  
  // Finalize and get bytecode in QuickJS JS_WriteObject format
  finalize(): Uint8Array {
    // Resolve all label patches first
    for (const [label, patches] of this.labelManager.getPatches()) {
      const address = this.labelManager.getAddress(label)
      if (address !== undefined) {
        for (const patchPos of patches) {
          this.patchLabel(patchPos, address)
        }
      }
    }
    
    // Generate QuickJS-compatible bytecode format
    return this.generateQuickJSBytecode()
  }
  
  // Generate bytecode in QuickJS JS_WriteObject format
  private generateQuickJSBytecode(): Uint8Array {
    const chunks: Uint8Array[] = []
    
    // 1. Write BC_VERSION (1 byte)
    const bcVersion = this.config.bigInt ? 0x45 : 0x05
    chunks.push(new Uint8Array([bcVersion]))
    
    // 2. Write user atom count (LEB128) - only atoms >= JS_ATOM_END
    const userAtomCount = this.atomTable.getUserAtomCount()
    chunks.push(LEB128.encode(userAtomCount))
    
    // 3. Write all user atom strings (only >= JS_ATOM_END)
    const userAtoms = this.atomTable.getUserAtoms()
    const sortedUserAtoms = Array.from(userAtoms.entries()).sort((a, b) => a[1] - b[1])
    
    for (const [atomString, ] of sortedUserAtoms) {
      const atomData = this.encodeString(atomString)
      chunks.push(atomData)
    }
    
    // 4. Write function bytecode tag
    chunks.push(new Uint8Array([0x0C])) // BC_TAG_FUNCTION_BYTECODE
    
    // 5. Write function flags (minimal for simple function)
    chunks.push(new Uint8Array([0x00, 0x00])) // flags: 16 bits
    chunks.push(new Uint8Array([0x00])) // js_mode: strict mode
    
    // 6. Write function name atom (use first atom or create anonymous)
    chunks.push(LEB128.encode(0)) // Anonymous function uses atom 0
    
    // 7. Write function parameters
    chunks.push(LEB128.encode(0)) // arg_count
    chunks.push(LEB128.encode(0)) // var_count
    chunks.push(LEB128.encode(0)) // defined_arg_count
    chunks.push(LEB128.encode(8)) // stack_size (default)
    chunks.push(LEB128.encode(0)) // closure_var_count
    chunks.push(LEB128.encode(this.constants.size())) // cpool_count
    chunks.push(LEB128.encode(this.buffer.length)) // byte_code_len
    
    // 8. Write vardefs (empty for now)
    chunks.push(LEB128.encode(0)) // vardefs count
    
    // 9. Write actual bytecode
    chunks.push(new Uint8Array(this.buffer))
    
    // 10. Write constant pool
    for (let i = 0; i < this.constants.size(); i++) {
      const constant = this.constants.get(i)
      const constantData = this.encodeConstant(constant)
      chunks.push(constantData)
    }
    
    // Combine all chunks
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
    const result = new Uint8Array(totalLength)
    let offset = 0
    
    for (const chunk of chunks) {
      result.set(chunk, offset)
      offset += chunk.length
    }
    
    return result
  }
  
  // Encode string in QuickJS format
  private encodeString(str: string): Uint8Array {
    const utf8 = new TextEncoder().encode(str)
    const chunks: Uint8Array[] = []
    
    // String length (LEB128)
    chunks.push(LEB128.encode(utf8.length))
    
    // String data
    chunks.push(utf8)
    
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
    const result = new Uint8Array(totalLength)
    let offset = 0
    
    for (const chunk of chunks) {
      result.set(chunk, offset)
      offset += chunk.length
    }
    
    return result
  }
  
  // Encode constant value
  private encodeConstant(value: any): Uint8Array {
    if (typeof value === 'number') {
      if (Number.isInteger(value) && value >= -2147483648 && value <= 2147483647) {
        // BC_TAG_INT32
        const chunks: Uint8Array[] = []
        chunks.push(new Uint8Array([0x05])) // BC_TAG_INT32
        chunks.push(LEB128.encodeSigned(value))
        
        const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
        const result = new Uint8Array(totalLength)
        let offset = 0
        
        for (const chunk of chunks) {
          result.set(chunk, offset)
          offset += chunk.length
        }
        
        return result
      } else {
        // BC_TAG_FLOAT64
        const chunks: Uint8Array[] = []
        chunks.push(new Uint8Array([0x06])) // BC_TAG_FLOAT64
        
        const float64Array = new Float64Array([value])
        const uint8Array = new Uint8Array(float64Array.buffer)
        chunks.push(uint8Array)
        
        const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
        const result = new Uint8Array(totalLength)
        let offset = 0
        
        for (const chunk of chunks) {
          result.set(chunk, offset)
          offset += chunk.length
        }
        
        return result
      }
    } else if (typeof value === 'string') {
      // BC_TAG_STRING
      const chunks: Uint8Array[] = []
      chunks.push(new Uint8Array([0x07])) // BC_TAG_STRING
      chunks.push(this.encodeString(value))
      
      const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
      const result = new Uint8Array(totalLength)
      let offset = 0
      
      for (const chunk of chunks) {
        result.set(chunk, offset)
        offset += chunk.length
      }
      
      return result
    }
    
    // Default: null
    return new Uint8Array([0x01]) // BC_TAG_NULL
  }
  
  // Get instructions for debugging
  getInstructions(): Instruction[] {
    return [...this.instructions]
  }
}