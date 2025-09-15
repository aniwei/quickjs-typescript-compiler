import * as ts from 'typescript';

/* 强类型（加强型）：禁止 any；i32/u32/i64 驱动收窄与 BigInt 语义。 */
export type StrongType = 'i32'|'u32'|'i64'|'f64'|'bool'|'string'|'null'|'undefined'|'object'|'unknown';

export class StrongTypeChecker {
  constructor(private checker: ts.TypeChecker) {}

  ensureNoAny(node: ts.Node) {
    const t = this.checker.getTypeAtLocation(node);
    if ((t.flags & ts.TypeFlags.Any) !== 0) {
      const sf = node.getSourceFile();
      const p = sf.getLineAndCharacterOfPosition(node.getStart());
      throw new Error(`禁止 any：${sf.fileName}:${p.line+1}:${p.character+1}`);
    }
  }

  classify(node: ts.Node): StrongType {
    const t = this.checker.getTypeAtLocation(node);
    if ((t.flags & ts.TypeFlags.Any) !== 0) this.ensureNoAny(node);
    const s = this.checker.typeToString(t);
    if (/\bi32\b/.test(s)) return 'i32';
    if (/\bu32\b/.test(s)) return 'u32';
    if (/\bi64\b/.test(s)) return 'i64';
    if (s === 'bigint') return 'i64';
    if (s === 'number') return 'f64';
    if (s === 'boolean') return 'bool';
    if (s === 'string') return 'string';
    if (s === 'null') return 'null';
    if (s === 'undefined' || s === 'void') return 'undefined';
    if (s.startsWith('{') || s === 'object') return 'object';
    return 'unknown';
  }
}