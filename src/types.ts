import { Atom } from './atoms';

export interface Scope {
  type: 'function' | 'block' | 'module';
  locals: Set<string>;
  parent?: Scope;
}

export interface LoopContext {
  breakLabel: string;
  continueLabel: string;
  type: 'for' | 'while' | 'for-in' | 'for-of';
}

export type JSFunctionKind = 0 | 1 | 2 | 3; // JS_FUNC_NORMAL, JS_FUNC_GENERATOR, JS_FUNC_ASYNC, JS_FUNC_ASYNC_GENERATOR

export interface VarDef {
    var_name: Atom,
    scope_level: number,
    scope_next: number,
    var_kind: number, // JSVarKindEnum
    is_const: boolean,
    is_lexical: boolean,
    is_captured: boolean,
}
