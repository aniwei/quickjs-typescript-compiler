import { Atom } from './atoms';
import { BytecodeTag } from './env';
import { ClosureVar } from './vars';

export type ConstantEntry =
  | { tag: BytecodeTag.TC_TAG_NULL }
  | { tag: BytecodeTag.TC_TAG_UNDEFINED }
  | { tag: BytecodeTag.TC_TAG_BOOL_FALSE }
  | { tag: BytecodeTag.TC_TAG_BOOL_TRUE }
  | { tag: BytecodeTag.TC_TAG_INT32; value: number }
  | { tag: BytecodeTag.TC_TAG_FLOAT64; value: number }
  | { tag: BytecodeTag.TC_TAG_STRING; value: string }
  | { tag: BytecodeTag.TC_TAG_ARRAY; elements: ConstantEntry[] }
  | { tag: BytecodeTag.TC_TAG_TEMPLATE_OBJECT; elements: ConstantEntry[]; raw: ConstantEntry }
  | { tag: BytecodeTag.TC_TAG_OBJECT; properties: Array<{ name: Atom; value: ConstantEntry }> }
  | { tag: BytecodeTag.TC_TAG_FUNCTION_BYTECODE; value: FunctionBytecode };

export interface LineInfoEntry {
  pc: number;
  sourcePos: number;
}

export interface Instruction {
  opcode: number;
  operands: number[];
}

export class FunctionBytecode {
  readonly name: Atom;
  jsMode = 0;
  hasPrototype = false;
  hasSimpleParameterList = true;
  isDerivedClassConstructor = false;
  needHomeObject = false;
  funcKind = 0;
  newTargetAllowed = false;
  superCallAllowed = false;
  superAllowed = false;
  argumentsAllowed = true;
  hasDebug = false;
  readOnlyBytecode = false;
  isDirectOrIndirectEval = false;

  instructions: Instruction[] = [];
  stackSize = 0;
  argCount = 0;
  varCount = 0;
  definedArgCount = 0;
  constantPool: ConstantEntry[] = [];
  closureVars: ClosureVar[] = [];

  lineInfo: LineInfoEntry[] = [];
  columnInfo: LineInfoEntry[] = [];
  pc2line: number[] = [];
  pc2column: number[] = [];

  filename: Atom | null = null;
  source: string;
  sourceFile: string;
  sourceLength: number;

  constructor(name: Atom, options: { source: string; sourceFile: string }) {
    this.name = name;
    this.source = options.source;
    this.sourceFile = options.sourceFile;
    this.sourceLength = options.source.length;
  }

  pushOpcode(opcode: number, operands: number[] = []) {
    this.instructions.push({ opcode, operands });
  }

  addConstant(entry: ConstantEntry): number {
    this.constantPool.push(entry);
    return this.constantPool.length - 1;
  }

  addClosureVar(entry: ClosureVar): number {
    this.closureVars.push(entry);
    return this.closureVars.length - 1;
  }

  addLineInfo(info: LineInfoEntry) {
    this.lineInfo.push(info);
  }

  addColumnInfo(info: LineInfoEntry) {
    this.columnInfo.push(info);
  }
}