export type ConstKind = 'number' | 'string' | 'function' | 'atom'

export interface ConstEntry {
  kind: ConstKind;
  num?: number;
  data?: string|Buffer;
  atomId?: number;
}

export class ConstPool {
  list: ConstEntry[] = []

  indexNumber (n: number): number {
    const i = this.list.findIndex(e => e.kind === 'number' && Object.is(e.num, n))
    if (i >= 0) {
      return i
    }

    this.list.push({ kind: 'number', num: n })
    return this.list.length - 1
  }

  indexString (s: string): number {
    const i = this.list.findIndex(e => e.kind === 'string' && e.data === s)
    if (i >= 0) {
      return i
    }

    this.list.push({ kind: 'string', data: s })
    return this.list.length - 1
  }

  indexFunctionBytes (buf: Buffer): number {
    this.list.push({ kind: 'function', data: buf })
    return this.list.length - 1
  }

  indexAtom (atomId: number): number {
    this.list.push({ kind: 'atom', atomId })
    return this.list.length - 1
  }
}

export interface ExceptionEntry { 
  start_pc: number; 
  end_pc: number; 
  target_pc: number; 
}

export interface PC2LocEntry { 
  pc: number; 
  line: number; 
  column: number; 
}

export interface CaptureInfo { 
  isVar: boolean; 
  idx: number; 
}

export interface VarRefEntry { 
  nameAtom: number; 
  fromParentIsVar: boolean; 
  fromParentIndex: number; 
}

export interface ImportEntry {
  moduleRequestAtom: number;
  importNameAtom: number;   // 'default' | '*' | named
  localNameAtom: number;
  isNamespace?: boolean;
  isAll?: boolean;
}

export interface ExportEntry {
  localNameAtom: number;
  exportNameAtom: number;
  isReExport?: boolean;
  fromModuleAtom?: number;
}

export class FunctionIR {
  isModule = false;

  flags = 0;
  argCount = 0;
  varCount = 0;
  definedArgCount = 0;
  stackSize = 0;

  bytecode: number[] = [];

  readonly constPool = new ConstPool();
  readonly closures: CaptureInfo[] = [];

  varRefs: VarRefEntry[] = [];
  varRefIndexByNameAtom = new Map<number, number>();

  readonly exceptions: ExceptionEntry[] = [];
  readonly pc2loc: PC2LocEntry[] = [];

  functionNameAtomId = 0;
  filenameAtomId = 0;
  paramNameAtoms: number[] = [];
  localNameAtoms: number[] = [];

  imports: ImportEntry[] = [];
  exports: ExportEntry[] = [];
}