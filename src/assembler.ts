import { FunctionIR } from './ir'
import { OP, HAS_GOTO16 } from './op'

type LabelRefPatch = {
  instrIndex: number
  operandOffset: number  // from instruction start (incl opcode)
  targetLabel: number
}

type Instr = {
  op: OP
  operands: number[]
  srcLine?: number
  srcCol?: number

  targetLabel?: number
  size?: number
}

export class Assembler {
  private ir: FunctionIR
  private instrs: Instr[] = []
  private labels = new Map<number, number>() // labelId -> instr index
  private pcOffsets: number[] = []
  private patches: LabelRefPatch[] = []
  private nextLabelId = 1

  constructor(ir: FunctionIR) { 
    this.ir = ir
  }

  newLabel(): number { 
    return this.nextLabelId++
  }

  defineLabel(id: number) { 
    this.labels.set(id, this.instrs.length) 
  }

  emit(op: OP, operands: number[] = [], line?: number, col?: number) {
    this.instrs.push({ op, operands, srcLine: line, srcCol: col })
  }
  
  emitIfFalseTo(labelId: number, line?: number, col?: number) {
    this.instrs.push({ op: OP.if_false, operands: [0,0,0,0], targetLabel: labelId, srcLine: line, srcCol: col })
  }

  emitIfTrueTo(labelId: number, line?: number, col?: number) {
    this.instrs.push({ op: OP.if_true, operands: [0,0,0,0], targetLabel: labelId, srcLine: line, srcCol: col })
  }

  emitGotoTo(labelId: number, line?: number, col?: number) {
    this.instrs.push({ op: OP.goto, operands: [0,0,0,0], targetLabel: labelId, srcLine: line, srcCol: col })
  }

  // with_*: atom(u32) + label(i32) + u8(scopeIndex)
  emitWithAtomLabelU8(op: OP, atomId: number, targetLabel: number, scopeIndex: number, line?: number, col?: number) {
    const instrIndex = this.instrs.length
    const operands = [...u32(atomId), 0,0,0,0, (scopeIndex & 0xff)]
    this.instrs.push({ op, operands, srcLine: line, srcCol: col })
    this.patches.push({ instrIndex, operandOffset: 1 + 4, targetLabel })
  }

  assemble(enableShort = true) {
    for (const ins of this.instrs) ins.size = 1 + ins.operands.length

    let changed = true, rounds = 0
    while (changed && rounds < 8) {
      rounds++
      this.computePC()
      changed = false
      for (let i = 0; i < this.instrs.length; i++) {
        const ins = this.instrs[i]
        if ((ins.op === OP.if_false || ins.op === OP.if_true || ins.op === OP.goto) && enableShort) {
          const targetIdx = this.labels.get(ins.targetLabel!)!
          const after = this.pcOffsets[i] + (ins.size ?? 5)
          const target = this.pcOffsets[targetIdx]
          const rel = target - after

          // prefer 8-bit, then 16-bit (if enabled), else 32-bit
          let newSize = 5
          if (rel >= -128 && rel <= 127) {
            newSize = 2
          } else if (HAS_GOTO16 && ins.op === OP.goto && rel >= -32768 && rel <= 32767) {
            newSize = 3
          }

          if ((ins.size ?? 0) !== newSize) { 
            ins.size = newSize; changed = true
          }
        }
      }
    }

    this.computePC()

    this.ir.bytecode.length = 0
    for (let i = 0; i < this.instrs.length; i++) {
      const ins = this.instrs[i]
      const pc = this.pcOffsets[i]

      if (ins.srcLine !== undefined) {
        this.ir.pc2loc.push({ 
          pc, 
          line: ins.srcLine!, 
          column: ins.srcCol ?? 0 
        })
      }

      if (ins.op === OP.if_false || ins.op === OP.if_true || ins.op === OP.goto) {
        const targetIdx = this.labels.get(ins.targetLabel!)!
        const after = pc + (ins.size ?? 5)
        const target = this.pcOffsets[targetIdx]
        const rel = target - after

        if (enableShort && rel >= -128 && rel <= 127) {
          const shortOp = (ins.op === OP.if_false) 
            ? OP.if_false8 
            : (ins.op === OP.if_true ? OP.if_true8 : OP.goto8)
          this.ir.bytecode.push(shortOp, (rel & 0xff))
        } else if (enableShort && HAS_GOTO16 && ins.op === OP.goto && rel >= -32768 && rel <= 32767) {
          // 16-bit only for unconditional goto
          this.ir.bytecode.push(OP.goto16, (rel & 0xff), ((rel >>> 8) & 0xff))
        } else {
          this.ir.bytecode.push(ins.op, ...i32(rel))
        }

        continue
      }

      this.ir.bytecode.push(ins.op, ...ins.operands)
    }

    // patch generic with_* labels
    for (const p of this.patches) {
      const instrPC = this.pcOffsets[p.instrIndex]
      const afterLabel = instrPC + (p.operandOffset + 4)
      const targetPC = this.pcOffsets[this.labels.get(p.targetLabel)!]
      const rel = targetPC - afterLabel
      writeI32LE(this.ir.bytecode, instrPC + p.operandOffset, rel)
    }
  }

  private computePC() {
    this.pcOffsets.length = 0
    let pc = 0
    for (let i = 0; i < this.instrs.length; i++) {
      this.pcOffsets[i] = pc
      pc += (this.instrs[i].size ?? (1 + this.instrs[i].operands.length))
    }
  }
}

function u32(v: number): number[] { 
  const b=Buffer.alloc(4)
  b.writeUInt32LE(v,0)
  return Array.from(b) 
}

function i32(v: number): number[] { 
  const b=Buffer.alloc(4)
  b.writeInt32LE(v,0)
  return Array.from(b)
}

function writeI32LE(arr: number[], at: number, v: number) {
  const b = Buffer.alloc(4)
  b.writeInt32LE(v, 0)
  for (let k = 0; k < 4; k++) {
    arr[at + k] = b[k]
  }
}