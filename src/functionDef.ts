import { BytecodeWriter } from './bytecode';
import { JSAtom, JS_ATOM_NULL } from './atom';
import { FunctionKind } from './env';

export enum JSVarKind {
  JS_VAR_NORMAL,
  JS_VAR_FUNCTION_DECL,
  JS_VAR_NEW_FUNCTION_DECL,
  JS_VAR_CATCH,
  JS_VAR_FUNCTION_NAME,
  JS_VAR_PRIVATE_FIELD,
  JS_VAR_PRIVATE_METHOD,
  JS_VAR_PRIVATE_GETTER,
  JS_VAR_PRIVATE_SETTER,
  JS_VAR_PRIVATE_GETTER_SETTER,
}

export interface JSVarDef {
  varName: JSAtom;
  scopeLevel: number;
  scopeNext: number;
  isConst: boolean;
  isLexical: boolean;
  isCaptured: boolean;
  varKind: JSVarKind;
  funcPoolIdx: number;
}

export interface JSClosureVar {
  isLocal: boolean;
  isArg: boolean;
  isConst: boolean;
  isLexical: boolean;
  varKind: JSVarKind;
  varIdx: number;
  varName: JSAtom;
}

export interface RelocEntry {
  next: RelocEntry | null;
  addr: number;
  size: number;
}

export interface LabelSlot {
  refCount: number;
  pos: number;
  pos2: number;
  addr: number;
  firstReloc: RelocEntry | null;
}

export interface JSValue {
    type: 'string' | 'number' | 'bigint' | 'null' | 'undefined' | 'boolean' | 'object' | 'function';
    value: any;
}

export interface JSVarScope {
  parent: number;
  first: number;
}

export class JSFunctionDef {
  ctx: any; // JSContext placeholder
  parent: JSFunctionDef | null = null;
  
  // Flags
  isEval: boolean = false;
  isGlobalVar: boolean = false;
  isFuncExpr: boolean = false;
  hasHomeObject: boolean = false;
  hasPrototype: boolean = false;
  hasSimpleParameterList: boolean = false;
  hasParameterExpressions: boolean = false;
  hasUseStrict: boolean = false;
  hasEvalCall: boolean = false;
  hasArgumentsBinding: boolean = false;
  hasThisBinding: boolean = false;
  newTargetAllowed: boolean = false;
  superCallAllowed: boolean = false;
  superAllowed: boolean = false;
  argumentsAllowed: boolean = false;
  isDerivedClassConstructor: boolean = false;
  inFunctionBody: boolean = false;
  
  funcKind: FunctionKind = FunctionKind.JS_FUNC_NORMAL;
  jsMode: number = 0;
  funcName: JSAtom = JS_ATOM_NULL;

  vars: JSVarDef[] = [];
  args: JSVarDef[] = [];
  
  // Indices
  varObjectIdx: number = -1;
  argVarObjectIdx: number = -1;
  argumentsVarIdx: number = -1;
  argumentsArgIdx: number = -1;
  funcVarIdx: number = -1;
  evalRetIdx: number = -1;
  thisVarIdx: number = -1;
  newTargetVarIdx: number = -1;
  thisActiveFuncVarIdx: number = -1;
  homeObjectVarIdx: number = -1;

  // Scopes
  scopeLevel: number = 0;
  scopeFirst: number = -1;
  scopes: JSVarScope[] = [];
  
  byteCode: BytecodeWriter = new BytecodeWriter();
  
  // Labels
  labelSlots: LabelSlot[] = [];
  
  // Constant Pool
  cpool: JSValue[] = [];
  
  // Closure Vars
  closureVar: JSClosureVar[] = [];
  
  // Stack
  stackSize: number = 0;
  stackLevel: number = 0;

  // Debug info
  pc2line: BytecodeWriter = new BytecodeWriter();
  pc2column: BytecodeWriter = new BytecodeWriter();
  source: string = '';
  filename: JSAtom = JS_ATOM_NULL;
  lastLineNum: number = 0;
  lastColumnNum: number = 0;
  pc2lineLastPc: number = 0;
  
  // Pending PC2Line state
  pendingLineNum: number = 0;
  pendingColumnNum: number = 0;
  hasPendingLineInfo: boolean = false;

  constructor(ctx: any, parent: JSFunctionDef | null) {
    this.ctx = ctx;
    this.parent = parent;
  }
}
