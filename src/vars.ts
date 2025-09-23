import { Atom } from './atoms';

export class VarDef {
  varName: Atom = 0;
  scopeLevel: number = 0;
  scopeNext: number = 0;
  varKind: number = 0; // VarKindEnum
  isConst: boolean = false;
  isLexical: boolean = false;
  isCaptured: boolean = false;
}

export class ClosureVar {
  varName: Atom = 0;
  varIdx: number = 0;
  isLocal: boolean = false;
  isArg: boolean = false;
  isConst: boolean = false;
  isLexical: boolean = false;
  varKind: number = 0; // VarKindEnum
}
