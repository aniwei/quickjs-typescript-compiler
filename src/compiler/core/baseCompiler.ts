import * as ts from 'typescript'
import type { FunctionDef } from '../../functionDef'
import type { Instruction } from '../../functionBytecode'
import { Opcode, OpFormat, type OpcodeDefinition } from '../../env'
import { getOpcodeDefinition } from '../../utils/opcode'

export interface EmitDebugInfoOptions {
  tsSourcePos?: number
}

export abstract class BaseCompiler {
  protected currentFunction!: FunctionDef
  protected currentOffset = 0
  protected instructionOffsets: number[] = []
  protected labelCounter = 0
  protected readonly labelPositions = new Map<string, number>()
  protected readonly pendingJumps: Array<{ index: number; label: string; opcode: Opcode }> = []

  protected abstract emitOpcode(
    opcode: Opcode,
    operands?: number[],
    node?: ts.Node | null,
    debugOptions?: EmitDebugInfoOptions
  ): number

  public emitInstruction(
    opcode: Opcode,
    operands: number[] = [],
    node?: ts.Node | null,
    debugOptions?: EmitDebugInfoOptions
  ): number {
    return this.emitOpcode(opcode, operands, node, debugOptions)
  }

  protected getOpcodeDefinition(opcode: Opcode): OpcodeDefinition | undefined {
    return getOpcodeDefinition(opcode)
  }

  protected getCurrentInstructionOffsets(): number[] {
    return this.instructionOffsets
  }

  protected abstract getCurrentInstructions(): Instruction[]

  public createLabel(): string {
    return `L${this.labelCounter++}`
  }

  public markLabel(label: string) {
    this.labelPositions.set(label, this.currentOffset)
  }

  public emitJump(opcode: Opcode, label: string) {
    const index = this.emitOpcode(opcode, [0], null)
    this.pendingJumps.push({ index, label, opcode })
  }

  public emitGoto(label: string) {
    this.emitJump(Opcode.OP_goto8, label)
  }

  public resolvePendingJumps() {
    const instructions = this.getCurrentInstructions()
    for (const pending of this.pendingJumps) {
      const target = this.labelPositions.get(pending.label)
      if (target === undefined) {
        throw new Error(`Unresolved label ${pending.label}`)
      }
      const def = this.getOpcodeDefinition(pending.opcode)
      if (!def) {
        throw new Error(`Unknown opcode ${pending.opcode}`)
      }
      const instructionOffsets = this.getCurrentInstructionOffsets()
      const start = instructionOffsets[pending.index]
      const baseOffset = this.getJumpBaseOffset(def)
      const offset = target - (start + baseOffset)
      if (def.format === OpFormat.label8) {
        if (offset < -128 || offset > 127) {
          throw new Error('Jump offset out of range for label8')
        }
      }
      const instruction = instructions[pending.index]
      if (instruction.operands.length === 0) {
        instruction.operands.push(offset)
      } else {
        instruction.operands[instruction.operands.length - 1] = offset
      }
    }
  }

  protected getJumpBaseOffset(def: OpcodeDefinition): number {
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
}
