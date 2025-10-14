import * as ts from 'typescript'
import {
  BlockIR,
  FunctionIR,
  FunctionKind,
  InstructionIR,
  OperandRef,
  ParameterIR,
} from '../LoweringContext'

let nextFunctionId = 1
let nextOperandId = 1

class BasicBlock implements BlockIR {
  readonly instructions: InstructionIR[] = []

  constructor(
    readonly label: number,
    readonly kind: BlockIR['kind'],
  ) {}
}

export class BasicFunctionIR implements FunctionIR {
  readonly id: number
  readonly blocks: BlockIR[]
  readonly scopeDepth: number
  readonly nestedFunctions: FunctionIR[] = []
  readonly parameters: ParameterIR[] = []

  private readonly temporaries: OperandRef[] = []
  private current: BasicBlock

  constructor(funcKind: FunctionKind = 'normal', scopeDepth = 0) {
    this.id = nextFunctionId += 1
    this.scopeDepth = scopeDepth
    this.blocks = []
    this.current = new BasicBlock(0, 'basic')
    this.blocks.push(this.current)
    this.funcKind = funcKind
  }

  funcKind: FunctionKind

  createTemporary(node: ts.Node, hintedType?: ts.Type): OperandRef {
    void node
    const operand: OperandRef = {
      kind: 'temp',
      id: nextOperandId += 1,
      hintedType,
    }
    this.temporaries.push(operand)
    return operand
  }

  currentBlock(): BlockIR {
    return this.current
  }

  addInstruction(instruction: InstructionIR): void {
    this.current.instructions.push(instruction)
  }

  createBlock(label: number, kind: BlockIR['kind'] = 'basic'): BlockIR {
    const block = new BasicBlock(label, kind)
    this.blocks.push(block)
    return block
  }

  setCurrentBlock(block: BlockIR): void {
    this.current = block as BasicBlock
  }

  addNestedFunction(func: FunctionIR): number {
    this.nestedFunctions.push(func)
    return this.nestedFunctions.length - 1
  }

  addParameter(parameter: ParameterIR): number {
    this.parameters.push(parameter)
    return this.parameters.length - 1
  }
}
