import { Atom } from './atoms';

export enum VarKind {
  NORMAL = 0,
  FUNCTION_DECL = 1,
  NEW_FUNCTION_DECL = 2,
  CATCH = 3,
  FUNCTION_NAME = 4,
  PRIVATE_FIELD = 5,
  PRIVATE_METHOD = 6,
  PRIVATE_GETTER = 7,
  PRIVATE_SETTER = 8,
  PRIVATE_GETTER_SETTER = 9,
}

export interface VarOptions {
  scopeLevel?: number;
  scopeNext?: number;
  isConst?: boolean;
  isLexical?: boolean;
  isCaptured?: boolean;
  isStaticPrivate?: boolean;
  kind?: VarKind;
  funcPoolIndex?: number;
}

export class Var {
  name: Atom;
  scopeLevel: number;
  scopeNext: number;
  isConst: boolean;
  isLexical: boolean;
  isCaptured: boolean;
  isStaticPrivate: boolean;
  kind: VarKind;
  funcPoolIndex: number;

  constructor(name: Atom, options: VarOptions = {}) {
    this.name = name;
    this.scopeLevel = options.scopeLevel ?? 0;
    this.scopeNext = options.scopeNext ?? -1;
    this.isConst = options.isConst ?? false;
    this.isLexical = options.isLexical ?? false;
    this.isCaptured = options.isCaptured ?? false;
    this.isStaticPrivate = options.isStaticPrivate ?? false;
    this.kind = options.kind ?? VarKind.NORMAL;
    this.funcPoolIndex = options.funcPoolIndex ?? -1;
  }
}

export interface ClosureVarOptions {
  isLocal?: boolean;
  isArgument?: boolean;
  isConst?: boolean;
  isLexical?: boolean;
  kind?: VarKind;
  varIndex?: number;
}

export class ClosureVar {
  name: Atom;
  isLocal: boolean;
  isArgument: boolean;
  isConst: boolean;
  isLexical: boolean;
  kind: VarKind;
  varIndex: number;

  constructor(name: Atom, options: ClosureVarOptions = {}) {
    this.name = name;
    this.isLocal = options.isLocal ?? true;
    this.isArgument = options.isArgument ?? false;
    this.isConst = options.isConst ?? false;
    this.isLexical = options.isLexical ?? false;
    this.kind = options.kind ?? VarKind.NORMAL;
    this.varIndex = options.varIndex ?? -1;
  }
}


