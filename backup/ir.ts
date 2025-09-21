// Intermediate Representation nodes for minimal TS -> QuickJS-style bytecode

export type IRNode =
  | IRLoadConst
  | IRDeclareLocal
  | IRGetLocal
  | IRSetLocal
  | IRInitLocal
  | IRAdd
  | IRLessThan
  | IRLessEqual
  | IRGreaterThan
  | IRGreaterEqual
  | IRArrayNew
  | IRDefineArrayEl
  | IRAppend
  | IRGetField2
  | IRObjectNew
  | IRPutField
  | IRDefineField
  | IRGetArrayEl
  | IRPutArrayEl
  | IRMethodCall
  | IRCall
  | IRDrop
  | IRDup
  | IRDup1
  | IRInc
  | IRPushI32
  | IRIncLocal
  | IRSwap
  | IRRot3R
  | IRRot4L
  | IRJump
  | IRJumpIfFalse
  | IRLabel
  | IRReturnUndef
  | IRReturn
  | IREqual
  | IRStrictEqual
  | IRSetEnvVar
  | IRGetEnvVar
  | IRCheckDefineVar
  | IRFunctionDecl
  | IRDefineFunc
  | IRFunctionObject
  | IRGetArg
  | IRPutArg

export interface IRLoadConst { kind: 'LoadConst'; value: any }
export interface IRDeclareLocal { kind: 'DeclareLocal'; name: string; declKind?: 'var' | 'let' | 'const' }
export interface IRGetLocal { kind: 'GetLocal'; name: string }
export interface IRSetLocal { kind: 'SetLocal'; name: string }
export interface IRInitLocal { kind: 'InitLocal'; name: string }
export interface IRAdd { kind: 'Add' }
export interface IRLessThan { kind: 'LessThan' }
export interface IRLessEqual { kind: 'LessEqual' }
export interface IRGreaterThan { kind: 'GreaterThan' }
export interface IRGreaterEqual { kind: 'GreaterEqual' }
export interface IRArrayNew { kind: 'ArrayNew'; initialCapacity: number }
export interface IRDefineArrayEl { kind: 'DefineArrayEl' }
export interface IRAppend { kind: 'Append' }
export interface IRGetField2 { kind: 'GetField2'; field: string }
export interface IRObjectNew { kind: 'ObjectNew' }
export interface IRPutField { kind: 'PutField'; name: string }
export interface IRDefineField { kind: 'DefineField'; name: string }
export interface IRGetArrayEl { kind: 'GetArrayEl' }
export interface IRPutArrayEl { kind: 'PutArrayEl' }
export interface IRMethodCall { kind: 'MethodCall'; argc: number }
export interface IRCall { kind: 'Call'; argc: number }
export interface IRDrop { kind: 'Drop' }
export interface IRDup { kind: 'Dup' }
export interface IRDup1 { kind: 'Dup1' }
export interface IRInc { kind: 'Inc' }
export interface IRPushI32 { kind: 'PushI32'; value: number }
export interface IRIncLocal { kind: 'IncLocal'; name: string }
export interface IRSwap { kind: 'Swap' }
export interface IRRot3R { kind: 'Rot3R' }
export interface IRRot4L { kind: 'Rot4L' }
export interface IRJump { kind: 'Jump'; label: string }
export interface IRJumpIfFalse { kind: 'JumpIfFalse'; label: string }
export interface IRLabel { kind: 'Label'; name: string }
export interface IRReturnUndef { kind: 'ReturnUndef' }
export interface IRReturn { kind: 'Return' }
export interface IREqual { kind: 'Equal' }
export interface IRStrictEqual { kind: 'StrictEqual' }
export interface IRSetEnvVar { kind: 'SetEnvVar'; name: string; strict?: boolean }
export interface IRGetEnvVar { kind: 'GetEnvVar'; name: string; strict?: boolean }
export interface IRCheckDefineVar { kind: 'CheckDefineVar'; name: string; flags?: number }
export interface IRFunctionDecl { kind: 'FunctionDecl'; name: string; argCount: number }
export interface IRDefineFunc { kind: 'DefineFunc'; name: string; flags?: number }
export interface IRFunctionObject { kind: 'FunctionObject'; name: string; argCount: number; argNames?: string[]; body: IRProgram }
export interface IRGetArg { kind: 'GetArg'; index: number }
export interface IRPutArg { kind: 'PutArg'; index: number }

export type IRProgram = IRNode[]
