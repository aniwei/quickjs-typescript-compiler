import fs from "node:fs";
import { parseBytecodeModule } from "../../src/bytecodeReader";

type OpInfo = { code: number; name: string; size: number };

type DecodedOp = {
  pc: number;
  code: number;
  name: string;
  size: number;
  raw: number[];
};

function hex(raw: number[]): string {
  return raw.map((b) => b.toString(16).padStart(2, "0")).join(" ");
}

function decode(bytes: Uint8Array, opMap: Map<number, OpInfo>): DecodedOp[] {
  const out: DecodedOp[] = [];
  for (let pc = 0; pc < bytes.length; ) {
    const code = bytes[pc]!;
    const info = opMap.get(code);
    const size = info?.size ?? 1;
    out.push({
      pc,
      code,
      name: info?.name ?? `op_${code}`,
      size,
      raw: Array.from(bytes.slice(pc, pc + size)),
    });
    pc += size;
  }
  return out;
}

function getFuncBytecode(qbcPath: string, cpoolIndex: number): Uint8Array {
  const mod = parseBytecodeModule(fs.readFileSync(qbcPath));
  const func: any = (mod.func.cpool || [])[cpoolIndex];
  if (!func || typeof func !== "object" || func.tag !== 12) {
    throw new Error(`cpool[${cpoolIndex}] is not a function (tag 12)`);
  }
  return func.bytecode as Uint8Array;
}

function main() {
  const [aPath, bPath, idxStr] = process.argv.slice(2);
  if (!aPath || !bPath || !idxStr) {
    console.error(
      "Usage: tsx scripts/debug/compareFuncBytecode.ts <a.qbc> <b.qbc> <cpoolIndex>"
    );
    process.exit(2);
  }

  const cpoolIndex = Number(idxStr);
  if (!Number.isInteger(cpoolIndex) || cpoolIndex < 0) {
    throw new Error(`Invalid cpoolIndex: ${idxStr}`);
  }

  const opList = JSON.parse(fs.readFileSync("opcodes.json", "utf8")) as OpInfo[];
  const opMap = new Map(opList.map((o) => [o.code, o]));

  const a = getFuncBytecode(aPath, cpoolIndex);
  const b = getFuncBytecode(bPath, cpoolIndex);

  const da = decode(a, opMap);
  const db = decode(b, opMap);

  const n = Math.min(da.length, db.length);
  let diffIndex = -1;
  for (let i = 0; i < n; i++) {
    const A = da[i]!;
    const B = db[i]!;
    const sameName = A.name === B.name;
    const sameRaw =
      A.raw.length === B.raw.length && A.raw.every((x, j) => x === B.raw[j]);
    if (!sameName || !sameRaw) {
      diffIndex = i;
      break;
    }
  }

  console.log(
    JSON.stringify(
      {
        a: { path: aPath, byteLen: a.length, opCount: da.length },
        b: { path: bPath, byteLen: b.length, opCount: db.length },
        diffIndex,
      },
      null,
      2
    )
  );

  const full = process.env.FULL === "1";
  const start = full ? 0 : Math.max(0, diffIndex === -1 ? 0 : diffIndex - 6);
  const end = full
    ? n
    : Math.min(n, diffIndex === -1 ? Math.min(n, 20) : diffIndex + 10);

  console.log("\n--- TS ops ---");
  for (let i = start; i < end; i++) {
    const o = da[i]!;
    console.log(String(i).padStart(4), String(o.pc).padStart(4), o.name.padEnd(22), hex(o.raw));
  }

  console.log("\n--- WASM ops ---");
  for (let i = start; i < end; i++) {
    const o = db[i]!;
    console.log(String(i).padStart(4), String(o.pc).padStart(4), o.name.padEnd(22), hex(o.raw));
  }

  if (full && da.length !== db.length) {
    console.log("\n--- Extra ops ---");
    if (da.length > db.length) {
      for (let i = n; i < da.length; i++) {
        const o = da[i]!;
        console.log("TS  ", String(i).padStart(4), String(o.pc).padStart(4), o.name.padEnd(22), hex(o.raw));
      }
    } else {
      for (let i = n; i < db.length; i++) {
        const o = db[i]!;
        console.log("WASM", String(i).padStart(4), String(o.pc).padStart(4), o.name.padEnd(22), hex(o.raw));
      }
    }
  }
}

main();
