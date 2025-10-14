import * as ts from 'typescript'
import {
  BytecodeEmitter,
  LabelManager,
  LabelRef,
  OperandRef,
} from '../LoweringContext'

let nextLabelId = 1

class BasicLabelRef implements LabelRef {
  constructor(public readonly id: number) {}
}

export class IRLabelManager implements LabelManager {
  constructor(private readonly emitter: BytecodeEmitter) {}

  createLabel(): LabelRef {
    return new BasicLabelRef(nextLabelId += 1)
  }

  mark(label: LabelRef): void {
    const operand = this.labelOperand(label)
    this.emitter.emitOp('OP_label', [operand])
  }

  emitJump(opcode: string, label: LabelRef, node?: ts.Node): void {
    const operand = this.labelOperand(label)
    this.emitter.emitOp(opcode, [operand], node)
  }

  patchDeferred(label: LabelRef): void {
    void label
  }

  private labelOperand(label: LabelRef): OperandRef {
    return this.emitter.labelOperand(label)
  }
}
