// Intermediate Representation nodes for minimal TS -> QuickJS-style bytecode

export type IRNode =
  | IRLoadConst
  | IRDeclareLocal
  | IRGetLocal
  | IRSetLocal
  | IRAdd
  | IRLessThan
  | IRLessEqual
  | IRGreaterThan
  | IRGreaterEqual
  | IRArrayNew
  | IRArrayPush
  | IRGetField2
  | IRMethodCall
  | IRDrop
  | IRIncLocal
  | IRJump
  | IRJumpIfFalse
  | IRLabel
  | IRReturnUndef
  | IRToNumber
  | IRToString
  | IREqual
  | IRStrictEqual

export interface IRLoadConst { kind: 'LoadConst'; value: any }
export interface IRDeclareLocal { kind: 'DeclareLocal'; name: string }
export interface IRGetLocal { kind: 'GetLocal'; name: string }
export interface IRSetLocal { kind: 'SetLocal'; name: string }
export interface IRAdd { kind: 'Add' }
export interface IRLessThan { kind: 'LessThan' }
export interface IRLessEqual { kind: 'LessEqual' }
export interface IRGreaterThan { kind: 'GreaterThan' }
export interface IRGreaterEqual { kind: 'GreaterEqual' }
export interface IRArrayNew { kind: 'ArrayNew'; initialCapacity: number }
export interface IRArrayPush { kind: 'ArrayPush' }
export interface IRGetField2 { kind: 'GetField2'; object: string; field: string }
export interface IRMethodCall { kind: 'MethodCall'; argc: number }
export interface IRDrop { kind: 'Drop' }
export interface IRIncLocal { kind: 'IncLocal'; name: string }
export interface IRJump { kind: 'Jump'; label: string }
export interface IRJumpIfFalse { kind: 'JumpIfFalse'; label: string }
export interface IRLabel { kind: 'Label'; name: string }
export interface IRReturnUndef { kind: 'ReturnUndef' }
export interface IRToNumber { kind: 'ToNumber' }
export interface IRToString { kind: 'ToString' }
export interface IREqual { kind: 'Equal' }
export interface IRStrictEqual { kind: 'StrictEqual' }

export type IRProgram = IRNode[]
