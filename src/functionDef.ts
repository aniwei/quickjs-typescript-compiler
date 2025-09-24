import { Atom } from './atoms';
import { FunctionBytecode } from './functionBytecode';
import { Scope } from './scopes';
import { ClosureVar, Var } from './vars';

export interface FunctionDefOptions {
  parent?: FunctionDef | null;
  sourcePos?: number;
  isEval?: boolean;
  isFuncExpr?: boolean;
}

export class FunctionDef {
  parent: FunctionDef | null;
  children: FunctionDef[] = [];

  isEval: boolean;
  isFuncExpr: boolean;
  jsMode = 0;
  funcName: Atom;

  varCount = 0;
  vars: Var[] = [];
  args: Var[] = [];
  definedArgCount = 0;

  scopes: Scope[] = [];
  scopeLevel = -1;
  scopeFirst = -1;
  bodyScope = -1;

  globalVarCount = 0;

  closureVars: ClosureVar[] = [];

  bytecode: FunctionBytecode;

  sourcePos: number;

  constructor(name: Atom, source: string, sourceFile: string, options: FunctionDefOptions = {}) {
    this.parent = options.parent ?? null;
    this.isEval = options.isEval ?? false;
    this.isFuncExpr = options.isFuncExpr ?? false;
    this.funcName = name;
    this.bytecode = new FunctionBytecode(name, { source, sourceFile });
    this.sourcePos = options.sourcePos ?? 0;
  }

  addVar(variable: Var) {
    this.vars.push(variable);
    this.varCount = this.vars.length;
    this.bytecode.varCount = this.varCount;
    return this.varCount - 1;
  }

  addArg(variable: Var) {
    this.args.push(variable);
    this.bytecode.argCount = this.args.length;
    return this.args.length - 1;
  }

  addScope(scope: Scope) {
    this.scopes.push(scope);
    return this.scopes.length - 1;
  }

  addClosureVar(cv: ClosureVar) {
    this.closureVars.push(cv);
    this.bytecode.addClosureVar(cv);
    return this.closureVars.length - 1;
  }

  appendChild(child: FunctionDef) {
    child.parent = this;
    this.children.push(child);
  }
}
