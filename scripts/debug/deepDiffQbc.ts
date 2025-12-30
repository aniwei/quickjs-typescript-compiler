import fs from "node:fs";
import path from "node:path";
import { parseBytecodeModule } from "../../src/bytecodeReader";

type Diff = {
  path: string;
  a: unknown;
  b: unknown;
  note?: string;
};

function isUint8Array(v: any): v is Uint8Array {
  // Note: Node.js Buffer is a Uint8Array subclass, but constructor.name is "Buffer".
  // Use instanceof so we treat both Buffer and Uint8Array as byte arrays.
  return v instanceof Uint8Array;
}

function isPlainObject(v: any): v is Record<string, any> {
  return v !== null && typeof v === "object" && !Array.isArray(v) && !isUint8Array(v);
}

function firstByteDiff(a: Uint8Array, b: Uint8Array): number {
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    if (a[i] !== b[i]) return i;
  }
  return a.length === b.length ? -1 : n;
}

function previewBytes(u8: Uint8Array, start: number, count: number): string {
  const end = Math.min(u8.length, start + count);
  const slice = u8.slice(start, end);
  return Array.from(slice)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(" ");
}

function diff(a: any, b: any, p: string, seen: Set<any>): Diff | null {
  if (a === b) return null;

  const ta = typeof a;
  const tb = typeof b;

  if (ta !== tb) {
    return { path: p, a, b, note: `type ${ta} vs ${tb}` };
  }

  if (a === null || b === null) {
    return { path: p, a, b };
  }

  if (isUint8Array(a) && isUint8Array(b)) {
    const di = firstByteDiff(a, b);
    if (di === -1) return null;
    return {
      path: p,
      a: { len: a.length, firstDiff: di, bytes: previewBytes(a, Math.max(0, di - 8), 32) },
      b: { len: b.length, firstDiff: di, bytes: previewBytes(b, Math.max(0, di - 8), 32) },
      note: "Uint8Array differs",
    };
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { path: p + ".length", a: a.length, b: b.length };
    }
    for (let i = 0; i < a.length; i++) {
      const d = diff(a[i], b[i], `${p}[${i}]`, seen);
      if (d) return d;
    }
    return null;
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    if (seen.has(a) || seen.has(b)) {
      // avoid cycles; treat as equal if we've seen either side
      return null;
    }
    seen.add(a);
    seen.add(b);

    const aKeys = Object.keys(a).sort();
    const bKeys = Object.keys(b).sort();
    if (aKeys.length !== bKeys.length) {
      return { path: p + ".keys", a: aKeys, b: bKeys };
    }
    for (let i = 0; i < aKeys.length; i++) {
      if (aKeys[i] !== bKeys[i]) {
        return { path: p + ".keys", a: aKeys, b: bKeys };
      }
    }
    for (const k of aKeys) {
      const d = diff(a[k], b[k], p ? `${p}.${k}` : k, seen);
      if (d) return d;
    }
    return null;
  }

  // primitive mismatch (number/string/boolean/bigint/symbol/function/other)
  return { path: p, a, b };
}

function main() {
  const [aPath, bPath] = process.argv.slice(2);
  if (!aPath || !bPath) {
    console.error("Usage: tsx scripts/debug/deepDiffQbc.ts <a.qbc> <b.qbc>");
    process.exit(2);
  }

  const aBuf = fs.readFileSync(aPath);
  const bBuf = fs.readFileSync(bPath);

  const aMod = parseBytecodeModule(aBuf);
  const bMod = parseBytecodeModule(bBuf);

  const d = diff(aMod as any, bMod as any, "root", new Set());
  if (!d) {
    console.log("OK: modules structurally identical");
    return;
  }

  console.log("First structural diff:");
  console.log(JSON.stringify(d, null, 2));
  console.log("\nFiles:");
  console.log("A:", path.resolve(aPath));
  console.log("B:", path.resolve(bPath));
}

main();
