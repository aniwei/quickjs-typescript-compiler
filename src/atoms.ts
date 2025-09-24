/**
 * QuickJS Atom Definitions
 * 现在完全来源于生成文件 src/env.ts，以保证与 WASM/QuickJS 对齐
 */
import { ATOM_STRINGS, env } from './env'

// 兼容导出：提供 JSAtom 常量集，包含 JS_ATOM_END 以及根据原子名派生的 JS_ATOM_xxx 键
function toCompatKey(name: string): string {
  if (name === '') return 'JS_ATOM_empty_string'
  // 保留大小写，与历史命名一致；将非标识符字符替换为下划线
  let k = name.replace(/[^A-Za-z0-9_$]/g, '_')
  if (!/^[A-Za-z_$]/.test(k)) k = '_' + k
  return `JS_ATOM_${k}`
}

const JSAtomObj: Record<string, number> = { JS_ATOM_END: env.firstAtomId }
for (const [idStr, nameAny] of Object.entries(ATOM_STRINGS)) {
  const id = parseInt(idStr, 10)
  if (!Number.isFinite(id)) continue
  if (id >= env.firstAtomId) continue // 仅为预定义原子导出兼容常量
  const name = String(nameAny)
  JSAtomObj[toCompatKey(name)] = id
}

// 兼容：历史测试使用 JS_ATOM_trace 作为“预定义上界”的代表，若 QuickJS 未内置该原子，则用 firstAtomId-1 兜底
if (!("JS_ATOM_trace" in JSAtomObj)) {
  JSAtomObj.JS_ATOM_trace = (env.firstAtomId - 1) >>> 0
}

export const JSAtom = JSAtomObj as Readonly<typeof JSAtomObj>

export type Atom = number;

// Atom table management
export class AtomTable {
  private atoms: (string | undefined)[] = [];
  private atomMap: Map<string, number> = new Map();
  private nextAtomId: number;
  private readonly firstAtomId: number;

  constructor(firstAtomId: number = env.firstAtomId) {
    this.firstAtomId = firstAtomId >>> 0;
    this.nextAtomId = 0; // Will be updated after adding predefined atoms

    // Initialize with predefined atoms (id -> string) from generated env
    for (const [idStr, nameAny] of Object.entries(ATOM_STRINGS)) {
      const id = parseInt(idStr, 10);
      if (!Number.isFinite(id)) continue;
      const name = String(nameAny);
      
      if (id < this.firstAtomId) {
        if (this.atoms[id] === undefined) {
          this.atoms[id] = name;
        }
        this.atomMap.set(name, id);
        if (id >= this.nextAtomId) {
          this.nextAtomId = id + 1;
        }
      }
    }

    if (this.nextAtomId < this.firstAtomId) {
      this.nextAtomId = this.firstAtomId;
    }
  }

  addAtom(str: string): number {
    const existing = this.atomMap.get(str);
    if (existing !== undefined) {
      return existing;
    }
    
    const newId = this.nextAtomId++;
    this.atoms[newId] = str;
    this.atomMap.set(str, newId);
    return newId;
  }

  getAtom(str: string): number {
    let id = this.atomMap.get(str);
    if (id === undefined) {
      id = this.addAtom(str);
    }
    return id;
  }

  getAtomId(str: string): number | undefined {
    return this.atomMap.get(str);
  }

  getAtomString(id: number): string | undefined {
    return this.atoms[id];
  }

  getAtomName(id: number): string | undefined {
    return this.getAtomString(id);
  }

  isPredefinedAtom(str: string): boolean {
    const id = this.atomMap.get(str);
    return id !== undefined && id < this.firstAtomId;
  }

  getAllAtoms(): Map<string, number> {
    return new Map(this.atomMap);
  }
  
  getAtomCount(): number {
    return this.atomMap.size;
  }
  
  getUserAtoms(): Map<string, number> {
    const userAtoms = new Map<string, number>();
    for (const [str, id] of this.atomMap) {
      if (id >= this.firstAtomId) {
        userAtoms.set(str, id);
      }
    }
    return userAtoms;
  }
  
  getUserAtomCount(): number {
    let count = 0;
    for (const [, id] of this.atomMap) {
      if (id >= this.firstAtomId) {
        count++;
      }
    }
    return count;
  }
}