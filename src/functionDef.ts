import { Atom } from './atoms';
import { FunctionBytecode } from './functionBytecode';
import { Scope } from './scopes';
import { Var } from './vars';



// ...existing code...
export class FunctionDef {
  parent: FunctionDef | null = null;
  childs: FunctionDef[] = [];

  funcBytecode: FunctionBytecode;
  funcName: Atom;
  vars: Var[] = [];
  scopes: Scope[] = [];

  constructor(name: Atom, source: string, sourceFile: string) {
    this.funcName = name;
    this.funcBytecode = new FunctionBytecode(name, {
      source,
      sourceFile,
    });
  }
}
