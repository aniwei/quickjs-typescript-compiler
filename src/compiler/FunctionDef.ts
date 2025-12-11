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
  static nextId = 0
  id: number = FunctionDef.nextId++
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
  funcKind: number
  funcType: number
  jsMode: number
  funcName: number

  vars: JSVarDef[]
  varSize: number
  varCount: number
  localCount: number
  args: JSVarDef[]
  argSize: number
  argCount: number
  definedArgCount: number
  varObjectIdx: number
  argVarObjectIdx: number
  argumentsVarIdx: number
  argumentsArgIdx: number
  funcVarIdx: number
  evalRetIdx: number
  thisVarIdx: number
  newTargetVarIdx: number
  thisActiveFuncVarIdx: number
  homeObjectVarIdx: number
  needHomeObject: boolean
  fieldsInitClosureIdx: number

  stackSize: number
  stackLevel: number
  stackSizeMax: number
  scopeLevel: number
  scopeFirst: number
  scopeSize: number
  scopeCount: number
  scopes: JSVarScope[]
  defScopeArray: JSVarScope[] 
  bodyScope: number
  globalVarCount: number
  globalVarSize: number
  globalVars: JSGlobalVar[]

  byteCode: BytecodeBuilder
  lastOpcodePos: number
  lastOpcodeSourcePtr: any
  useShortOpcodes: boolean

  labelSlots: LabelSlot[]
  labelSize: number
  labelCount: number
  topBreak: BlockEnv | null

  cpool: any[]
  cpoolCount: number
  cpoolSize: number

  closureVarCount: number
  closureVarSize: number
  closureVar: JSClosureVar[]

  jumpSlots: JumpSlot[]
  jumpSize: number
  jumpCount: number
  lineNumberSlots: LineNumberSlot[]
  lineNumberSize: number
  lineNumberCount: number
  lineNumberLast: number
  lineNumberLastPc: number

  columnNumberSlots: ColumnNumberSlot[]
  columnNumberSize: number
  columnNumberCount: number
  columnNumberLast: number
  columnNumberLastPc: number

  stripDebug: boolean
  stripSource: boolean
  filename: number
  sourcePos: number
  getLineColCache: any
  pc2line: BytecodeBuilder = new BytecodeBuilder()
  pc2column: BytecodeBuilder = new BytecodeBuilder()

  source: string
  sourceLen: number

  module: any
  hasAwait: boolean

  hasDebug: boolean
  isDirectOrIndirectEval: boolean

  ic: any

  constructor(parent: FunctionDef | null = null) {
    this.parent = parent
    
  }
}
