import { AtomTable } from './atoms'
import { OpFormat } from './env'
import { CompilerFlags, type OpcodeInfo } from './opcodes'

function valueKey(value: unknown): string {
  if (value instanceof Uint8Array) {
    return `bytes:${Array.from(value).join(',')}`
  }
  return `${typeof value}:${JSON.stringify(value)}`
}

class SimpleBuffer {
  private chunks: number[] = []

  writeU8(value: number) {
    this.chunks.push(value & 0xff)
  }

  writeI32(value: number) {
    this.writeU8(value & 0xff)
    this.writeU8((value >>> 8) & 0xff)
    this.writeU8((value >>> 16) & 0xff)
    this.writeU8((value >>> 24) & 0xff)
  }

  toUint8Array(): Uint8Array {
    return Uint8Array.from(this.chunks)
  }

  get length(): number {
    return this.chunks.length
  }
}

export class Constants {
  private readonly values: unknown[] = []
  private readonly indexByKey = new Map<string, number>()

  add(value: unknown): number {
    const key = valueKey(value)
    if (this.indexByKey.has(key)) {
      return this.indexByKey.get(key) as number
    }
    const index = this.values.length
    this.values.push(value)
    this.indexByKey.set(key, index)
    return index
  }

  get(index: number): unknown | undefined {
    return this.values[index]
  }

  getAll(): unknown[] {
    return [...this.values]
  }

  size(): number {
    return this.values.length
  }
}

export class LabelManager {
  private counter = 0
  private readonly labelAddress = new Map<string, number>()
  private readonly patches = new Map<string, number[]>()

  createLabel(): string {
    return `L${this.counter++}`
  }

  setLabel(label: string, address: number): void {
    this.labelAddress.set(label, address)
  }

  getAddress(label: string): number | undefined {
    return this.labelAddress.get(label)
  }

  addPatch(label: string, position: number): void {
    const list = this.patches.get(label) ?? []
    list.push(position)
    this.patches.set(label, list)
  }

  getPatches(): Map<string, number[]> {
    return new Map(this.patches)
  }
}

export interface InstructionRecord {
  opcode: OpcodeInfo
  operands: number[]
}

export class BytecodeWriter {
  private readonly buffer = new SimpleBuffer()
  private readonly instructions: InstructionRecord[] = []

  constructor(
    private readonly _config: CompilerFlags,
    private readonly _atomTable: AtomTable,
    private readonly _constants: Constants,
    private readonly _labels: LabelManager,
  ) {}

  writeInstruction(def: OpcodeInfo, ...operands: number[]): void {
    if (!def) {
      throw new Error('Invalid opcode definition')
    }

    const cleanOperands = operands.filter((value) => value !== undefined)
    this.instructions.push({ opcode: def, operands: cleanOperands })

    // Encode opcode - QuickJS opcodes fit into one byte for tests
    this.buffer.writeU8(def.opcode)

    if (cleanOperands.length === 0) return

    switch (def.format) {
      case OpFormat.i32:
      case OpFormat.u32:
      case OpFormat.npop:
      case OpFormat.npopx:
        this.buffer.writeI32(cleanOperands[0] ?? 0)
        break
      default:
        this.buffer.writeI32(cleanOperands[0] ?? 0)
        break
    }
  }

  getInstructions(): InstructionRecord[] {
  return this.instructions.map((inst) => ({ opcode: inst.opcode, operands: [...inst.operands] }))
  }

  getCurrentPosition(): number {
    return this.buffer.length
  }

  finalize(): Uint8Array {
    return this.buffer.toUint8Array()
  }
}
