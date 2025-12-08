import { BytecodeBuilder } from './BytecodeBuilder'
import { JSAtom } from '../env'

export enum JSVarKind {
  JS_VAR_NORMAL = 0,
  JS_VAR_FUNCTION_DECL = 1,
  JS_VAR_NEW_FUNCTION_DECL = 2,
  JS_VAR_CATCH = 3,
  JS_VAR_FUNCTION_NAME = 4,
  JS_VAR_PRIVATE_FIELD = 5,
  JS_VAR_PRIVATE_METHOD = 6,
  JS_VAR_PRIVATE_GETTER = 7,
  JS_VAR_PRIVATE_SETTER = 8,
  JS_VAR_PRIVATE_GETTER_SETTER = 9,
}

export class JSVarDef {
  varName: number = 0 // JSAtom
  scopeLevel: number = 0
  scopeNext: number = -1
  isConst: boolean = false
  isLexical: boolean = false
  isCaptured: boolean = false
  isStaticPrivate: boolean = false
  varKind: JSVarKind = 0 // JSVarKindEnum
  funcPoolIdx: number = 0
  localIdx: number = -1 // Stack slot index (if not captured)
  isModuleVar: boolean = false
}

export class JSClosureVar {
  isLocal: boolean = false
  isArg: boolean = false
  isConst: boolean = false
  isLexical: boolean = false
  varKind: JSVarKind = 0 // JSVarKindEnum
  varIdx: number = 0
  varName: number = 0 // JSAtom
}

export class JSGlobalVar {
  cpoolIdx: number = 0
  forceInit: boolean = false
  isLexical: boolean = false
  isConst: boolean = false
  scopeLevel: number = 0
  varName: number = 0 // JSAtom
}

export class BlockEnv {
  prev: BlockEnv | null = null
  labelName: number = 0 // JSAtom
  labelBreak: number = -1
  labelCont: number = -1
  dropCount: number = 0
  labelFinally: number = -1
  scopeLevel: number = 0
  hasIterator: boolean = false
  isRegularStmt: boolean = false
}

export class LabelSlot {
  refCount: number = 0
  pos: number = -1
  pos2: number = -1
  addr: number = -1
  firstReloc: any = null // RelocEntry*
}

export class JumpSlot {
  op: number = 0
  size: number = 0
  pos: number = 0
  label: number = 0
}

export class LineNumberSlot {
  pc: number = 0
  sourcePos: number = 0
}

export class ColumnNumberSlot {
  pc: number = 0
  sourcePos: number = 0
}

export class JSVarScope {
  parent: number = 0
  first: number = -1
}

export class FunctionDef {
  parent: FunctionDef | null = null
  parentCpoolIdx: number = -1
  parentScopeLevel: number = 0
  childList: any = null // list_head
  link: any = null // list_head

  isEval: boolean = false
  evalType: number = 0
  isGlobalVar: boolean = false
  isFuncExpr: boolean = false
  hasHomeObject: boolean = false
  hasPrototype: boolean = false
  hasSimpleParameterList: boolean = false
  hasParameterExpressions: boolean = false
  hasUseStrict: boolean = false
  hasEvalCall: boolean = false
  hasArgumentsBinding: boolean = false
  hasThisBinding: boolean = false
  newTargetAllowed: boolean = false
  superCallAllowed: boolean = false
  superAllowed: boolean = false
  argumentsAllowed: boolean = false
  isDerivedClassConstructor: boolean = false
  inFunctionBody: boolean = false
  funcKind: number = 0 // JSFunctionKindEnum
  funcType: number = 0 // JSParseFunctionEnum
  jsMode: number = 0
  funcName: number = 0 // JSAtom

  vars: JSVarDef[] = []
  varSize: number = 0
  varCount: number = 0
  localCount: number = 0 // Number of stack slots used by locals
  args: JSVarDef[] = []
  argSize: number = 0
  argCount: number = 0
  definedArgCount: number = 0
  varObjectIdx: number = -1
  argVarObjectIdx: number = -1
  argumentsVarIdx: number = -1
  argumentsArgIdx: number = -1
  funcVarIdx: number = -1
  evalRetIdx: number = -1
  thisVarIdx: number = -1
  newTargetVarIdx: number = -1
  thisActiveFuncVarIdx: number = -1
  homeObjectVarIdx: number = 0
  needHomeObject: boolean = false

  stackSize: number = 0
  stackLevel: number = 0
  stackSizeMax: number = 0
  scopeLevel: number = 0
  scopeFirst: number = 0
  scopeSize: number = 0
  scopeCount: number = 0
  scopes: JSVarScope[] = []
  defScopeArray: JSVarScope[] = [] // JSVarScope[4]
  bodyScope: number = 0

  globalVarCount: number = 0
  globalVarSize: number = 0
  globalVars: JSGlobalVar[] = []

  byteCode: BytecodeBuilder = new BytecodeBuilder()
  lastOpcodePos: number = -1
  lastOpcodeSourcePtr: any = null
  useShortOpcodes: boolean = false

  labelSlots: LabelSlot[] = []
  labelSize: number = 0
  labelCount: number = 0
  topBreak: BlockEnv | null = null

  cpool: any[] = []
  cpoolCount: number = 0
  cpoolSize: number = 0

  closureVarCount: number = 0
  closureVarSize: number = 0
  closureVar: JSClosureVar[] = []

  jumpSlots: JumpSlot[] = []
  jumpSize: number = 0
  jumpCount: number = 0

  lineNumberSlots: LineNumberSlot[] = []
  lineNumberSize: number = 0
  lineNumberCount: number = 0
  lineNumberLast: number = 0
  lineNumberLastPc: number = 0

  columnNumberSlots: ColumnNumberSlot[] = []
  columnNumberSize: number = 0
  columnNumberCount: number = 0
  columnNumberLast: number = 0
  columnNumberLastPc: number = 0

  stripDebug: boolean = false
  stripSource: boolean = false
  filename: number = 0 // JSAtom
  sourcePos: number = -1
  getLineColCache: any = null
  pc2line: BytecodeBuilder = new BytecodeBuilder()
  pc2column: BytecodeBuilder = new BytecodeBuilder()

  source: string = ""
  sourceLen: number = 0

  module: any = null // JSModuleDef*
  hasAwait: boolean = false

  hasDebug: boolean = false
  isDirectOrIndirectEval: boolean = false

  ic: any = null // InlineCache*

  constructor(parent: FunctionDef | null = null) {
    this.parent = parent
    this.scopeCount = 1
    if (parent) {
      this.parentCpoolIdx = parent.cpoolCount
    }
    // Initialize scopes
    for (let i = 0; i < 100; i++) {
      this.scopes.push(new JSVarScope())
    }
  }
}
