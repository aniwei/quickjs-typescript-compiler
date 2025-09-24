import { Atom } from './atoms';

export enum JSVarKindEnum {
  VAR,     /* var */
  LET,     /* let */
  CONST,   /* const */
  PRIVATE, /* private field */
};

export class VarDef {
  varName: Atom = 0;
  scopeLevel: number = 0;
  scopeNext: number = 0;
  isLexical: boolean = false;
  isConst: boolean = false;
  isFuncDecl: boolean = false;
  isNewField: boolean = false;
  isCaptured: boolean = false;
  isParam: boolean = false;
}

export class ClosureVar {
  varName: Atom = 0;
  varIdx: number = 0;
  isLocal: boolean = false;
  isArg: boolean = false;
}

