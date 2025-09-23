
import { Atom } from './atoms';

export class VarDef {
  var_name: Atom = 0;
  scope_level: number = 0;
  scope_next: number = 0;
  var_kind: number = 0; // JSVarKindEnum
  is_const: boolean = false;
  is_lexical: boolean = false;
  is_captured: boolean = false;
}

export class ClosureVar {
  var_name: Atom = 0;
  var_idx: number = 0;
  is_local: boolean = false;
  is_arg: boolean = false;
  is_const: boolean = false;
  is_lexical: boolean = false;
  var_kind: number = 0; // JSVarKindEnum
}
