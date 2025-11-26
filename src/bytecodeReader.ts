export type AtomRef = any;
export type ParsedClosureVar = any;
export type ParsedInstruction = any;
export type ParsedTaggedValue = any;
export type ParsedVarDef = any;

export interface ParsedFunction {
  atoms: any[];
  instructions: any[];
  varDefs: any[];
  closureVars: any[];
  constantPool: any[];
  flags: any;
  debug: any;
  jsModeFlags: any[];
  name: any;
  stackSize: number;
  argCount: number;
  definedArgCount: number;
  varCount: number;
  closureVarCount: number;
}

export interface ParsedModuleObject {
  requireEntries: any[];
  importEntries: any[];
  exportEntries: any[];
  starExportEntries: any[];
  moduleName: any;
  hasTopLevelAwait: any;
  function: ParsedFunction;
}

export function parseBytecodeModule(buffer: Uint8Array): {
  version: number;
  atoms: any[];
  instructions: any[];
  requireEntries: any[];
  importEntries: any[];
  exportEntries: any[];
  starExportEntries: any[];
  varDefs: any[];
  closureVars: any[];
  constantPool: any[];
  root: ParsedModuleObject;
} {
  return { 
    version: 0,
    atoms: [], 
    instructions: [],
    requireEntries: [],
    importEntries: [],
    exportEntries: [],
    starExportEntries: [],
    varDefs: [],
    closureVars: [],
    constantPool: [],
    root: {
      requireEntries: [],
      importEntries: [],
      exportEntries: [],
      starExportEntries: [],
      moduleName: null,
      hasTopLevelAwait: false,
      function: {
        atoms: [],
        instructions: [],
        varDefs: [],
        closureVars: [],
        constantPool: [],
        flags: {},
        debug: null,
        jsModeFlags: [],
        name: null,
        stackSize: 0,
        argCount: 0,
        definedArgCount: 0,
        varCount: 0,
        closureVarCount: 0
      }
    }
  };
}
