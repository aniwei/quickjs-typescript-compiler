import { Atom } from './atoms';
import { VarDef } from './var';

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
