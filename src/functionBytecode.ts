import { Atom } from './atoms';
import { BytecodeTag } from './env';
import { ClosureVar, Var, VarKind } from './vars';

export interface VarDefEntry {
  name: Atom;
  scopeLevel: number;
  scopeNext: number;
  isConst: boolean;
  isLexical: boolean;
  isCaptured: boolean;
  kind: VarKind;
}

export interface LineInfoEntry {
  pc: number;
  sourcePos: number;
}

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
  varDefs: VarDefEntry[] = [];
  argDefs: VarDefEntry[] = [];

  lineInfo: LineInfoEntry[] = [];
  columnInfo: LineInfoEntry[] = [];
  pc2line: number[] = [];
  pc2column: number[] = [];
  lineNumberTable: Array<{ pc: number; line: number; column: number; sourcePos: number; instructionIndex: number }> = [];

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

  setVarDefs(vars: Array<Var | VarDefEntry>) {
    this.varDefs = vars.map((entry) => this.normalizeVarEntry(entry));
    this.varCount = this.varDefs.length;
  }

  setArgDefs(args: Array<Var | VarDefEntry>) {
    this.argDefs = args.map((entry) => this.normalizeVarEntry(entry));
    this.argCount = this.argDefs.length;
  }

  getAllVarDefs(): VarDefEntry[] {
    if (this.argDefs.length === 0) {
      return [...this.varDefs];
    }
    return [...this.argDefs, ...this.varDefs];
  }

  addLineInfo(info: LineInfoEntry) {
    this.lineInfo.push(info);
  }

  addColumnInfo(info: LineInfoEntry) {
    this.columnInfo.push(info);
  }

  recordLineNumber(pc: number, line: number, column: number, sourcePos: number, instructionIndex: number) {
    if (line < 0 || column < 0) {
      return;
    }
    const last = this.lineNumberTable[this.lineNumberTable.length - 1];
    if (last) {
      if (pc < last.pc) {
        return;
      }
      if (last.pc === pc) {
        if (last.sourcePos === sourcePos) {
          last.line = line;
          last.column = column;
          last.instructionIndex = instructionIndex;
          return;
        }
        if (last.line === line && last.column === column) {
          return;
        }
      } else {
        if (last.line === line && last.column === column) {
          return;
        }
        if (last.sourcePos === sourcePos) {
          return;
        }
      }
    }
    this.lineNumberTable.push({ pc, line, column, sourcePos, instructionIndex });
  }

  private normalizeVarEntry(entry: Var | VarDefEntry): VarDefEntry {
    const source = entry as Var & VarDefEntry;
    return {
      name: source.name,
      scopeLevel: source.scopeLevel ?? 0,
      scopeNext: source.scopeNext ?? -1,
      isConst: source.isConst ?? false,
      isLexical: source.isLexical ?? false,
      isCaptured: source.isCaptured ?? false,
      kind: source.kind ?? VarKind.NORMAL,
    };
  }
}