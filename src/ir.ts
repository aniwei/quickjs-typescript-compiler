export type ConstKind = 'number' | 'string' | 'function' | 'atom'

export interface ConstEntry {
  kind: ConstKind;
  num?: number;
  data?: string|Buffer;
  atomId?: number;
}

export class ConstantList {
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

// 更丰富的闭包捕获信息，兼容原有字段
export type VarKind = 'var' | 'let' | 'const'
export interface CaptureInfo { 
  // 兼容字段：是否来自 var 环境与其索引
  isVar: boolean; 
  idx: number; 
  // 新增：变量名与性质（与 QuickJS JSClosureVar 对齐）
  nameAtom?: number;      // 变量名原子 id
  isLocal?: boolean;      // 是否在当前函数内定义，否则来自父级
  isArg?: boolean;        // 是否为参数
  isConst?: boolean;      // 是否 const
  isLexical?: boolean;    // 是否 lexical（let/const）
  varKind?: VarKind;      // 变量种类
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

// 调试/源码输出选项
export interface DebugOptions {
  stripDebug?: boolean;   // 仅尺寸最小化，不输出调试信息
  emitPC2Loc?: boolean;   // 是否写入 pc->行号映射
  emitColumns?: boolean;  // 是否写入列号
  embedSource?: boolean;  // 是否内嵌源码（与 QuickJS 可选源一致）
}

export class FunctionIR {
  isModule = false;

  // 函数形态标志（便于与 QuickJS 函数属性对齐）
  isAsync = false;        // async function/async generator
  isGenerator = false;    // generator
  isArrow = false;        // 箭头函数

  flags = 0;
  argCount = 0;
  varCount = 0;
  definedArgCount = 0;
  stackSize = 0;

  bytecode: number[] = [];

  readonly ConstantList = new ConstantList();
  readonly closures: CaptureInfo[] = [];

  varRefs: VarRefEntry[] = [];
  varRefIndexByNameAtom = new Map<number, number>();

  readonly exceptions: ExceptionEntry[] = [];
  readonly pc2loc: PC2LocEntry[] = [];

  // 调试/源码：控制是否写入 pc2loc、列、嵌入源码
  debug: DebugOptions = { stripDebug: false, emitPC2Loc: true, emitColumns: true, embedSource: false };
  sourceText?: string; // 可选：用于 embedSource

  functionNameAtomId = 0;
  filenameAtomId = 0;
  paramNameAtoms: number[] = [];
  localNameAtoms: number[] = [];

  imports: ImportEntry[] = [];
  exports: ExportEntry[] = [];
}