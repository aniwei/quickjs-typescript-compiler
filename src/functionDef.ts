import { Atom } from './atoms';
import { FunctionBytecode, type ConstantEntry } from './functionBytecode';
import { Scope } from './scopes';
import { ClosureVar, Var } from './vars';

export interface FunctionDefOptions {
  parent?: FunctionDef | null;
  sourcePos?: number;
  isEval?: boolean;
  isFuncExpr?: boolean;
  moduleRecord?: ModuleRecord;
}

export enum ModuleExportType {
  Local = 0,
  Indirect = 1,
}

export interface ModuleRequireEntry {
  moduleName: Atom;
  attributes?: ConstantEntry;
}

export interface ModuleExportEntryLocal {
  type: ModuleExportType.Local;
  exportedName: Atom;
  localVarIndex: number;
}

export interface ModuleExportEntryIndirect {
  type: ModuleExportType.Indirect;
  exportedName: Atom;
  reqModuleIndex: number;
  localName: Atom;
}

export type ModuleExportEntry = ModuleExportEntryLocal | ModuleExportEntryIndirect;

export interface ModuleStarExportEntry {
  reqModuleIndex: number;
}

export interface ModuleImportEntry {
  varIndex: number;
  isStar: boolean;
  importName: Atom;
  reqModuleIndex: number;
}

export interface ModuleRecord {
  moduleName?: Atom;
  requireEntries: ModuleRequireEntry[];
  exportEntries: ModuleExportEntry[];
  starExportEntries: ModuleStarExportEntry[];
  importEntries: ModuleImportEntry[];
  hasTopLevelAwait: boolean;
}

export function createEmptyModuleRecord(): ModuleRecord {
  return {
    moduleName: undefined,
    requireEntries: [],
    exportEntries: [],
    starExportEntries: [],
    importEntries: [],
    hasTopLevelAwait: false,
  };
}

export class FunctionDef {
  parent: FunctionDef | null;
  children: FunctionDef[] = [];

  isEval: boolean;
  isFuncExpr: boolean;
  isGlobalVar = false;
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
  globalVars: GlobalVar[] = [];
  private readonly globalVarMap = new Map<string, GlobalVar>();

  closureVars: ClosureVar[] = [];

  bytecode: FunctionBytecode;

  sourcePos: number;
  module: ModuleRecord | null;

  constructor(name: Atom, source: string, sourceFile: string, options: FunctionDefOptions = {}) {
    this.parent = options.parent ?? null;
    this.isEval = options.isEval ?? false;
    this.isFuncExpr = options.isFuncExpr ?? false;
    this.funcName = name;
    this.bytecode = new FunctionBytecode(name, { source, sourceFile });
    this.sourcePos = options.sourcePos ?? 0;
    if (options.moduleRecord) {
      this.module = options.moduleRecord;
    } else if (!this.parent) {
      this.module = createEmptyModuleRecord();
    } else {
      this.module = null;
    }
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

  addOrUpdateGlobalVar(name: Atom, options: GlobalVarUpdate): GlobalVar {
    const scopeLevel = options.scopeLevel;
    const key = `${name}:${scopeLevel}`;
    let entry = this.globalVarMap.get(key);
    if (!entry) {
      entry = {
        name,
        scopeLevel,
        funcPoolIndex: -1,
        forceInit: false,
        isLexical: false,
        isConst: false,
      };
      this.globalVars.push(entry);
      this.globalVarMap.set(key, entry);
      this.globalVarCount = this.globalVars.length;
    } else if (scopeLevel !== entry.scopeLevel) {
      entry.scopeLevel = scopeLevel;
    }

    if (options.funcPoolIndex !== undefined) {
      entry.funcPoolIndex = options.funcPoolIndex;
    }
    if (options.forceInit !== undefined) {
      entry.forceInit = entry.forceInit || options.forceInit;
    }
    if (options.isLexical !== undefined) {
      entry.isLexical = options.isLexical;
    }
    if (options.isConst !== undefined) {
      entry.isConst = options.isConst;
    }

    return entry;
  }
}

export interface GlobalVar {
  name: Atom;
  scopeLevel: number;
  funcPoolIndex: number;
  forceInit: boolean;
  isLexical: boolean;
  isConst: boolean;
}

export interface GlobalVarUpdate {
  scopeLevel: number;
  funcPoolIndex?: number;
  forceInit?: boolean;
  isLexical?: boolean;
  isConst?: boolean;
}
