import { FunctionDef } from './functionDef';
import { VarDef } from './var';
import { VarScope } from './scopes';
import { Atom, AtomTable } from './atoms';

export class ScopeManager {
  private atomTable: AtomTable;

  constructor(private fd: FunctionDef) {
    this.atomTable = fd.atomTable;
  }

  createNewScope(isGlobal: boolean = false): number {
    const scope = new VarScope();
    scope.first = -1; // first var in scope
    this.fd.scopes.push(scope);
    this.fd.scopeLevel = this.fd.scopes.length - 1;
    return this.fd.scopeLevel;
  }

  endScope() {
    if (this.fd.scopeLevel > 0) {
      this.fd.scopeLevel = this.fd.scopes[this.fd.scopeLevel].parent;
    }
  }

  findScopeFor(varName: string): VarScope | null {
    const atom = this.atomTable.getAtomId(varName);
    if (atom === undefined) {
      return null;
    }

    let scopeIndex = this.fd.scopeLevel;
    while (scopeIndex >= 0) {
      const scope = this.fd.scopes[scopeIndex];
      let varIndex = scope.first;
      while (varIndex >= 0) {
        const varDef = this.fd.vars[varIndex];
        if (varDef.varName === atom) {
          return scope;
        }
        varIndex = varDef.scopeNext;
      }
      scopeIndex = scope.parent;
    }

    return null;
  }

  addVar(varName: string, isLet: boolean, isConst: boolean): number {
    const atom = this.atomTable.addAtom(varName);

    // QuickJS adds all atoms as vars, even for globals that are not declared.
    // We check if it already exists to avoid duplicates.
    const existingIndex = this.fd.vars.findIndex(v => v.varName === atom);
    if (existingIndex !== -1) {
      return existingIndex;
    }

    const vd = new VarDef();
    vd.varName = atom;
    vd.isLexical = isLet || isConst;
    vd.isConst = isConst;
    this.fd.vars.push(vd);
    return this.fd.vars.length - 1;
  }

  findVar(varName: string): number {
    const atom = this.atomTable.getAtomId(varName);
    if (atom === undefined) return -1;
    for (let i = this.fd.vars.length - 1; i >= 0; i--) {
      if (this.fd.vars[i].varName === atom) {
        return i;
      }
    }
    return -1;
  }

  addScopeVar(varName: string, isLet: boolean, isConst: boolean): number {
    const varIdx = this.addVar(varName, isLet, isConst);
    const scope = this.fd.scopes[this.fd.scopeLevel];
    this.fd.vars[varIdx].scopeNext = scope.first;
    scope.first = varIdx;
    return varIdx;
  }
}
