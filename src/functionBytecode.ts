import { Atom } from './atoms';
import { Instruction } from './bytecode';
import { Constants } from './constant';

export type VarKind = 'var' | 'let' | 'const';

export interface JSVarDef {
  name: Atom;
  scopeLevel: number;
  scopeNext: number;
  kind: VarKind;
  isCaptured: boolean;
}

export interface JSClosureVar {
  name: Atom;
  isLocal: boolean;
  isArg: boolean;
  kind: VarKind;
  varKind: 'normal' | 'function_name' | 'this' | 'new.target' | 'home_object';
  idx: number;
}

export class JSFunctionBytecode {
  // Function properties
  funcName: Atom = 0;
  source?: string;
  sourceLen?: number;
  
  // Flags
  jsMode: 'strict' | 'sloppy' = 'strict';
  hasPrototype: boolean = false;
  hasSimpleParameterList: boolean = true;
  isDerivedClassConstructor: boolean = false;
  needHomeObject: boolean = false;
  funcKind: 'normal' | 'generator' | 'async' | 'async_generator' = 'normal';
  newTargetAllowed: boolean = false;
  superCallAllowed: boolean = false;
  superAllowed: boolean = false;
  argumentsAllowed: boolean = false;
  hasDebug: boolean = true; // Default to true for line numbers
  isDirectOrIndirectEval: boolean = false;

  // Counts and sizes
  argCount: number = 0;
  varCount: number = 0;
  definedArgCount: number = 0;
  stackSize: number = 0;
  closureVarCount: number = 0;
  cpoolCount: number = 0;
  bytecodeLen: number = 0;

  // Data buffers
  vardefs: JSVarDef[] = [];
  closureVars: JSClosureVar[] = [];
  cpool: Constants[] = [];
  instructions: Instruction[] = [];
  pc2line: { pc: number; line: number }[] = [];

  // Module info
  moduleNameAtom: Atom = 0;

  constructor(name: Atom = 0) {
    this.funcName = name;
  }
}
