import { BytecodeWriter } from './bytecode';
import { JSAtom, JS_ATOM_NULL } from './atom';
import { FunctionKind } from './env';

const JS_MAX_LOCAL_VARS = 65534;

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
  varIdx: number;
  isConst: boolean;
  isLexical: boolean;
  isCaptured: boolean;
  isStaticPrivate?: boolean;
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

export interface JumpSlot {
  op: number;
  size: number;
  pos: number;
  label: number;
}

export interface JSValue {
  type: 'string' | 'number' | 'bigint' | 'null' | 'undefined' | 'boolean' | 'object' | 'function';
  value: any;
}

export interface LineNumberSlot {
  pc: number;
  sourcePos: number;
  line: number;
  column: number;
}

export interface ColumnNumberSlot {
  pc: number;
  sourcePos: number;
}

export interface JSGlobalVar {
  cpoolIdx: number;
  forceInit: boolean;
  isLexical: boolean;
  isConst: boolean;
  scopeLevel: number;
  varName: JSAtom;
}

export interface JSVarScope {
  parent: number;
  first: number;
}

export interface GetLineColCache {
  ptr: number;
  lineNum: number;
  colNum: number;
  bufStart: number;
}

export interface JSFunctionDefInit {
  filenameAtom?: JSAtom;
  funcKind?: FunctionKind;
  jsMode?: number;
  isEval?: boolean;
  stripDebug?: boolean;
}

export interface AddVarOptions {
  scopeLevel?: number;
  isConst?: boolean;
  isLexical?: boolean;
  isCaptured?: boolean;
  isStaticPrivate?: boolean;
  varKind?: JSVarKind;
  funcPoolIdx?: number;
}

export interface AddScopeVarOptions extends AddVarOptions {
  scopeLevel?: number;
}

export interface AddClosureVarOptions {
  isLocal?: boolean;
  isArg?: boolean;
  isConst?: boolean;
  isLexical?: boolean;
  varKind?: JSVarKind;
  varIdx: number;
  varName: JSAtom;
}

export class JSFunctionDef {
  ctx: any;
  parent: JSFunctionDef | null = null;
  children: JSFunctionDef[] = [];

  parentCpoolIdx: number = -1;
  parentScopeLevel: number = 0;

  isEval = false;
  evalType = 0;
  isGlobalVar = false;
  isFuncExpr = false;
  hasHomeObject = false;
  hasPrototype = false;
  hasSimpleParameterList = false;
  hasParameterExpressions = false;
  hasUseStrict = false;
  hasEvalCall = false;
  hasArgumentsBinding = false;
  hasThisBinding = false;
  newTargetAllowed = false;
  superCallAllowed = false;
  superAllowed = false;
  argumentsAllowed = false;
  isDerivedClassConstructor = false;
  needHomeObject = false;
  inFunctionBody = false;

  funcKind: FunctionKind = FunctionKind.JS_FUNC_NORMAL;
  jsMode = 0;
  funcName: JSAtom = JS_ATOM_NULL;

  vars: JSVarDef[] = [];
  args: JSVarDef[] = [];
  definedArgCount = 0;
  varObjectIdx = -1;
  argVarObjectIdx = -1;
  argumentsVarIdx = -1;
  argumentsArgIdx = -1;
  funcVarIdx = -1;
  evalRetIdx = -1;
  thisVarIdx = -1;
  newTargetVarIdx = -1;
  thisActiveFuncVarIdx = -1;
  homeObjectVarIdx = -1;

  scopeLevel = 0;
  scopeFirst = -1;
  scopeSize = 0;
  scopeCount = 0;
  scopes: JSVarScope[] = [];
  bodyScope = -1;

  globalVars: JSGlobalVar[] = [];

  byteCode: BytecodeWriter;
  lastOpcodePos = -1;
  lastOpcodeSourcePos = 0;
  lastOp = 0;
  lastOpArgs: number[] = [];
  lastOpPos = 0;
  useShortOpcodes = false;

  labelSlots: LabelSlot[] = [];
  labelCount = 0;

  cpool: JSValue[] = [];
  closureVar: JSClosureVar[] = [];

  jumpSlots: JumpSlot[] = [];
  lineNumberSlots: LineNumberSlot[] = [];
  columnNumberSlots: ColumnNumberSlot[] = [];
  lineNumberLastSourcePos = 0;
  lineNumberLastPc = 0;
  columnNumberLast = 0;
  columnNumberLastPc = 0;

  stripDebug = false;
  stripSource = false;
  filename: JSAtom = JS_ATOM_NULL;
  sourcePos = 0;
  getLineColCache: GetLineColCache = { ptr: 0, lineNum: 0, colNum: 0, bufStart: 0 };
  pc2line: BytecodeWriter;
  pc2column: BytecodeWriter;
  initialLineNum = 1;
  initialColumnNum = 1;
  initialSourcePos = 0;
  lastLineNum = 1;
  lastColumnNum = 1;
  pc2lineLastPc = 0;
  pc2lineFinalized = false;

  source: string | null = null;
  sourceLen = 0;

  module: any = null;
  hasAwait = false;
  ic: any = null;

  // Extras used by existing TypeScript compiler
  anonymousLocalsCount = 0;
  stackSize = 0;
  stackLevel = 0;
  argCount = -1;
  pendingLineNum = 0;
  pendingColumnNum = 0;
  pendingSourcePos = 0;
  hasPendingLineInfo = false;

  constructor(ctx: any, parent: JSFunctionDef | null, init: JSFunctionDefInit = {}) {
    this.ctx = ctx;
    this.parent = parent;
    if (parent) {
      parent.children.push(this);
      this.parentScopeLevel = parent.scopeLevel;
    }
    this.funcKind = init.funcKind ?? this.funcKind;
    this.jsMode = init.jsMode ?? this.jsMode;
    this.isEval = init.isEval ?? this.isEval;
    this.stripDebug = init.stripDebug ?? this.stripDebug;
    this.filename = init.filenameAtom ?? this.filename;
    this.byteCode = new BytecodeWriter('bytecode');
    this.pc2line = new BytecodeWriter('pc2line', { trackStack: false });
    this.pc2column = new BytecodeWriter('pc2column', { trackStack: false });
    this.initializeScopes();
  }

  get varCount(): number {
    return this.vars.length;
  }

  get closureVarCount(): number {
    return this.closureVar.length;
  }

  enterScope(): number {
    const newScope = this.createScopeEntry(this.scopeLevel);
    this.scopeLevel = newScope;
    return newScope;
  }

  leaveScope(): number {
    const current = this.scopeLevel;
    const parentScope = current >= 0 ? this.scopes[current]?.parent ?? -1 : -1;
    this.scopeLevel = parentScope;
    this.scopeFirst = this.getFirstLexicalVar(parentScope);
    return parentScope;
  }

  addVar(varName: JSAtom, options: AddVarOptions = {}): number {
    if (this.vars.length >= JS_MAX_LOCAL_VARS)
      throw new Error('too many local variables');
    const varIdx = this.vars.length;
    const def: JSVarDef = {
      varName,
      scopeLevel: options.scopeLevel ?? 0,
      scopeNext: -1,
      varIdx,
      isConst: options.isConst ?? false,
      isLexical: options.isLexical ?? false,
      isCaptured: options.isCaptured ?? false,
      isStaticPrivate: options.isStaticPrivate,
      varKind: options.varKind ?? JSVarKind.JS_VAR_NORMAL,
      funcPoolIdx: options.funcPoolIdx ?? -1,
    };
    this.vars.push(def);
    return varIdx;
  }

  addScopeVar(
    varName: JSAtom,
    varKind: JSVarKind = JSVarKind.JS_VAR_NORMAL,
    options: AddScopeVarOptions = {},
  ): number {
    const idx = this.addVar(varName, { ...options, varKind });
    const scopeLevel = options.scopeLevel ?? this.scopeLevel;
    this.attachVarToScope(idx, scopeLevel);
    return idx;
  }

  setVarScopeIndex(varIdx: number, scopeIndex: number) {
    const vd = this.vars[varIdx];
    if (vd)
      vd.scopeNext = scopeIndex;
  }

  markVarCaptured(varIdx: number, opts: { isArg?: boolean } = {}) {
    const isArg = opts.isArg ?? false;
    const collection = isArg ? this.args : this.vars;
    const def = collection[varIdx];
    if (def)
      def.isCaptured = true;
  }

  findVarInScope(varName: JSAtom, scopeLevel: number): number {
    if (scopeLevel < 0)
      return -1;
    const scope = this.scopes[scopeLevel];
    if (!scope)
      return -1;
    let scopeIdx = scope.first;
    while (scopeIdx >= 0) {
      const vd = this.vars[scopeIdx];
      if (!vd)
        break;
      if (vd.scopeLevel !== scopeLevel)
        break;
      if (vd.varName === varName)
        return scopeIdx;
      scopeIdx = vd.scopeNext;
    }
    return -1;
  }

  findLexicalDecl(
    varName: JSAtom,
    scopeIdx: number,
    checkCatchVar = false,
  ): number {
    let idx = scopeIdx;
    while (idx >= 0) {
      const vd = this.vars[idx];
      if (!vd)
        break;
      const matchesCatch = checkCatchVar && vd.varKind === JSVarKind.JS_VAR_CATCH;
      if (vd.varName === varName && (vd.isLexical || matchesCatch))
        return idx;
      idx = vd.scopeNext;
    }
    return -1;
  }

  addClosureVar(options: AddClosureVarOptions): number {
    if (this.closureVar.length >= JS_MAX_LOCAL_VARS)
      throw new Error('too many closure variables');
    const isLocal = options.isLocal ?? true;
    const isArg = options.isArg ?? false;
    const varKind = options.varKind ?? JSVarKind.JS_VAR_NORMAL;
    const existingIdx = this.closureVar.findIndex(
      (cv) =>
        cv.varName === options.varName &&
        cv.varIdx === options.varIdx &&
        cv.isLocal === isLocal &&
        cv.isArg === isArg,
    );
    if (existingIdx >= 0)
      return existingIdx;
    const cv: JSClosureVar = {
      isLocal,
      isArg,
      isConst: options.isConst ?? false,
      isLexical: options.isLexical ?? false,
      varKind,
      varIdx: options.varIdx,
      varName: options.varName,
    };
    this.closureVar.push(cv);
    if (isLocal && options.varIdx >= 0) {
      this.markVarCaptured(options.varIdx, { isArg });
    }
    return this.closureVar.length - 1;
  }

  findClosureVar(varName: JSAtom): number {
    return this.closureVar.findIndex((cv) => cv.varName === varName);
  }

  private initializeScopes() {
    if (this.scopes.length === 0) {
      this.scopes.push({ parent: -1, first: -1 });
    } else if (!this.scopes[0]) {
      this.scopes[0] = { parent: -1, first: -1 };
    } else {
      this.scopes[0].parent = -1;
      this.scopes[0].first = -1;
    }
    this.scopeCount = Math.max(1, this.scopes.length);
    this.scopeSize = Math.max(this.scopeSize, this.scopeCount);
    this.scopeLevel = 0;
    this.scopeFirst = -1;
    if (this.bodyScope < 0)
      this.bodyScope = -1;
  }

  private createScopeEntry(parent: number): number {
    const scope: JSVarScope = {
      parent,
      first: this.scopeFirst,
    };
    const scopeIndex = this.scopes.length;
    this.scopes.push(scope);
    this.scopeCount = this.scopes.length;
    this.scopeSize = Math.max(this.scopeSize, this.scopeCount);
    return scopeIndex;
  }

  private attachVarToScope(varIdx: number, scopeLevel: number) {
    if (scopeLevel < 0)
      return;
    const scope = this.scopes[scopeLevel];
    if (!scope)
      throw new Error(`scope ${scopeLevel} is not initialized`);
    const vd = this.vars[varIdx];
    if (!vd)
      throw new Error(`variable ${varIdx} is not defined`);
    vd.scopeLevel = scopeLevel;
    vd.scopeNext = this.scopeFirst;
    scope.first = varIdx;
    this.scopeFirst = varIdx;
  }

  private getFirstLexicalVar(scopeLevel: number): number {
    let scope = scopeLevel;
    while (scope >= 0) {
      const entry = this.scopes[scope];
      if (!entry)
        break;
      if (entry.first >= 0)
        return entry.first;
      scope = entry.parent;
    }
    return -1;
  }
}
