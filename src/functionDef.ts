import { Atom } from './atoms';
import { FunctionBytecode } from './functionBytecode';
import { Scope } from './scopes';
import { Var } from './vars';



// ...existing code...
export class FunctionDef {
  parent: FunctionDef | null = null;
  childs: FunctionDef[] = [];

  bytecode: FunctionBytecode;
  name: Atom;
  vars: Var[] = [];
  scopes: Scope[] = [];

  constructor(name: Atom, source: string, sourceFile: string) {
    this.name = name;
    this.bytecode = new FunctionBytecode(name, {
      source,
      sourceFile,
    });
  }
}
