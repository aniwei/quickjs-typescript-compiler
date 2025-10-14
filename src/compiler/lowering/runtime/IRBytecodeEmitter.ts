import * as ts from 'typescript'
import {
  BindingInfo,
  BytecodeEmitter,
  FunctionIR,
  InstructionIR,
  LabelRef,
  OperandRef,
} from '../LoweringContext'

type ConstKey = string | number | boolean | null | undefined

export class IRBytecodeEmitter implements BytecodeEmitter {
  private readonly functionIR: FunctionIR
  private readonly constants = new Map<ConstKey, OperandRef>()
  private nextConstId = 0

  constructor(func: FunctionIR) {
    this.functionIR = func
  }

  emitOp(opcode: string, operands: readonly OperandRef[] = [], node?: ts.Node): void {
    const instruction: InstructionIR = {
      op: opcode,
      operands,
      node,
    }
    this.functionIR.addInstruction(instruction)
  }

  emitOpWithResult(
    opcode: string,
    operands: readonly OperandRef[] = [],
    node?: ts.Node,
  ): OperandRef {
    const result = this.functionIR.createTemporary(node ?? ts.factory.createIdentifier('_tmp'))
    const instruction: InstructionIR = {
      op: opcode,
      operands,
      node,
      result,
    }
    this.functionIR.addInstruction(instruction)
    return result
  }

  pushConst(value: unknown, node?: ts.Node): OperandRef {
    const key = this.constKey(value)
    let existing = this.constants.get(key)
    if (existing) {
      return existing
    }
    const operand: OperandRef = {
      kind: 'const',
      id: this.nextConstId += 1,
    }
    this.constants.set(key, operand)
    return operand
  }

  emitPushUndefined(node?: ts.Node): OperandRef {
    const operand = this.pushConst(undefined, node)
    this.emitOp('OP_push_undefined', [operand], node)
    return operand
  }

  storeBinding(
    binding: BindingInfo,
    mode: 'init' | 'assign',
    value: OperandRef,
    node?: ts.Node,
  ): void {
    const opcode = mode === 'init' ? 'OP_scope_put_var_init' : 'OP_scope_put_var'
    const bindingOperand: OperandRef = {
      kind: 'local',
      id: binding.slot,
    }
    const depthOperand: OperandRef = {
      kind: 'const',
      id: binding.scopeDepth,
    }
    this.emitOp(opcode, [value, bindingOperand, depthOperand], node)
  }

  labelOperand(label: LabelRef): OperandRef {
    return {
      kind: 'label',
      id: label.id,
    }
  }

  noteSource(node: ts.Node): void {
    void node
  }

  emitAtom(name: ts.__String | string, node?: ts.Node): void {
    const atomOperand: OperandRef = {
      kind: 'const',
      id: this.ensureAtomId(name),
    }
    this.emitOp('OP_emit_atom', [atomOperand], node)
  }

  private constKey(value: unknown): ConstKey {
    if (value === null || value === undefined) {
      return value
    }
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return value
    }
    return JSON.stringify(value)
  }

  private ensureAtomId(name: string | ts.__String): number {
    const text = String(name)
    let operand = this.constants.get(text)
    if (operand) {
      return operand.id
    }
    const atomOperand: OperandRef = {
      kind: 'const',
      id: this.nextConstId += 1,
    }
    this.constants.set(text, atomOperand)
    return atomOperand.id
  }
}
