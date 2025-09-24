
import { Atom } from './atoms';
import { FunctionDef } from './functionDef';

export class FunctionBytecode {
  headerSize: number = 0;
  bytecodeLen: number = 0;
  cpoolLen: number = 0;
  filenameLen: number = 0;
  nCpool: number = 0;
  nVardefs: number = 0;
  nChildFuncs: number = 0;
  nClosureVars: number = 0;
  nLiterals: number = 0;

  functionName: number = 0;
  lineNum: number = 0;
  pc2lineLen: number = 0;
  pc2lineBuf: number[] = [];
  lastOpcodeLineNum: number = 0;
  sourceLen: number = 0;
  source: string = '';

  argCount: number = 0;
  varCount: number = 0;
  definedArgCount: number = 0;
  stackSize: number = 0;
  closureVarCount: number = 0;
  hasThis: number = 0;
  newTargetVarIdx: number = 0;
  thisVarIdx: number = 0;
  argumentsVarIdx: number = 0;
  hasEvalCall: number = 0;
  hasArgumentsBinding: number = 0;
  hasThisBinding: number = 0;
  isFuncExpr: number = 0;
  hasHomeObject: number = 0;
  funcKind: number = 0;
  isDerivedClassConstructor: number = 0;
  needHomeObject: number = 0;
  backtraceVarIdx: number = 0;
  sourceFilenameIdx: number = 0;
  cpoolIdx: number = 0;
  prologueSize: number = 0;
  prologueStackSize: number = 0;
  prologuePc: number = 0;
  epiloguePc: number = 0;
  sourceFileIndex: number = 0;

  buffer: number[] = [];
  cpool: (string | number | boolean | null | undefined)[] = [];
  vardefs: any[] = [];
  closureVars: any[] = [];
  childFuncs: FunctionBytecode[] = [];
  literals: any[] = [];
}

