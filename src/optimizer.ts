import { OP } from './op-codes';

/**
 * Optimizer:
 * - const fold (i32 subset)
 * - dup/swap/drop cleanup
 * - dead code (post-return/throw/goto)
 * - hot loop IC rewrite (*_ic on back-edges)
 * - precise max stack with exception edges
 * - supports goto16 immediates if present
 */

export type OptimizeOptions = {
  enableConstFold?: boolean;
  enableDeadCode?: boolean;
  aggressiveDupSwapClean?: boolean;
  enableHotIC?: boolean;
  exceptionEdges?: { start_pc: number; end_pc: number; target_pc: number }[];
};

export function optimizeBytecode(bc: number[], opts: OptimizeOptions = {}) {
  let code = bc.slice();
  if (opts.enableConstFold !== false) code = constFold(code);
  if (opts.aggressiveDupSwapClean) code = cleanDupSwapDrop(code);
  if (opts.enableDeadCode !== false) code = deadCodeElim(code);
  if (opts.enableHotIC !== false) code = hotICRewrite(code);
  const maxStack = preciseMaxStackWithExceptions(code, opts.exceptionEdges ?? []);
  return { code, maxStack };
}

/* ---- helpers ---- */
function readI32(arr: number[], i: number) { return (arr[i] | (arr[i+1]<<8) | (arr[i+2]<<16) | (arr[i+3]<<24)) | 0; }
function writeI32(arr: number[], i: number, v: number) { arr[i]=v&0xff; arr[i+1]=(v>>>8)&0xff; arr[i+2]=(v>>>16)&0xff; arr[i+3]=(v>>>24)&0xff; }

function hasI32Imm(op: number): boolean {
  return op === OP.push_const || op === OP.push_atom_value ||
         op === OP.get_var || op === OP.put_var ||
         op === OP.get_field || op === OP.get_field2 || op === OP.put_field ||
         op === OP.get_field_ic || op === OP.get_field2_ic || op === OP.put_field_ic ||
         op === OP.if_false || op === OP.if_true || op === OP.goto;
}
function hasU16Imm(op: number): boolean {
  return op === OP.get_loc || op === OP.put_loc ||
         op === OP.call || op === OP.call_method ||
         op === OP.array_from || op === OP.eval || op === OP.goto16;
}
function hasI8Imm(op: number): boolean {
  return op === OP.if_false8 || op === OP.if_true8 || op === OP.goto8;
}

/* const folding (i32) */
function constFold(bc: number[]): number[] {
  const out: number[] = [];
  for (let i = 0; i < bc.length; ) {
    const op = bc[i++];
    if (op === OP.push_i32 && i + 4 <= bc.length) {
      const a = readI32(bc, i); i += 4;
      if (i < bc.length && bc[i] === OP.push_i32 && i + 5 <= bc.length) {
        i++; const b = readI32(bc, i); i += 4;
        if (i < bc.length) {
          const k = bc[i];
          if (k === OP.add || k === OP.sub || k === OP.mul || k === OP.div || k === OP.mod) {
            i++;
            let v = 0;
            switch (k) {
              case OP.add: v = (a + b) | 0; break;
              case OP.sub: v = (a - b) | 0; break;
              case OP.mul: v = (a * b) | 0; break;
              case OP.div: v = (b !== 0 ? (a / b) | 0 : 0); break;
              case OP.mod: v = (b !== 0 ? (a % b) | 0 : 0); break;
            }
            out.push(OP.push_i32, v & 0xff, (v>>>8)&0xff, (v>>>16)&0xff, (v>>>24)&0xff);
            continue;
          } else {
            out.push(OP.push_i32, a & 0xff, (a>>>8)&0xff, (a>>>16)&0xff, (a>>>24)&0xff);
            out.push(OP.push_i32, b & 0xff, (b>>>8)&0xff, (b>>>16)&0xff, (b>>>24)&0xff);
            out.push(k); i++;
            continue;
          }
        }
      }
      out.push(OP.push_i32, a & 0xff, (a>>>8)&0xff, (a>>>16)&0xff, (a>>>24)&0xff);
      continue;
    }
    out.push(op);
    if (hasI32Imm(op)) { for (let k=0;k<4;k++,i++) out.push(bc[i]); }
    else if (hasU16Imm(op)) { out.push(bc[i++], bc[i++]); }
    else if (hasI8Imm(op)) { out.push(bc[i++]); }
  }
  return out;
}

/* dup/swap/drop cleanup */
function cleanDupSwapDrop(bc: number[]): number[] {
  const out: number[] = [];
  for (let i = 0; i < bc.length; ) {
    const op = bc[i++];
    if (op === OP.push_i32 && i + 4 < bc.length && bc[i+4] === OP.drop) { i += 5; continue; }
    out.push(op);
    if (hasI32Imm(op)) { for (let k=0;k<4;k++,i++) out.push(bc[i]); }
    else if (hasU16Imm(op)) { out.push(bc[i++], bc[i++]); }
    else if (hasI8Imm(op)) { out.push(bc[i++]); }
  }
  return out;
}

/* dead code */
function deadCodeElim(bc: number[]): number[] {
  const targets = new Set<number>();
  for (let i = 0; i < bc.length; ) {
    const op = bc[i++];
    if (op === OP.if_false || op === OP.if_true || op === OP.goto) {
      const rel = readI32(bc, i); i += 4; targets.add(i + rel);
    } else if (op === OP.if_false8 || op === OP.if_true8 || op === OP.goto8) {
      const rel8 = (bc[i++] << 24) >> 24; targets.add(i + rel8);
    } else if (op === OP.goto16) {
      const lo = bc[i++], hi = bc[i++]; const rel16 = (hi<<8)|lo; const rel = (rel16<<16)>>16;
      targets.add(i + rel);
    } else if (hasI32Imm(op)) i += 4; else if (hasU16Imm(op)) i += 2;
  }
  const out: number[] = [];
  let dead = false;
  for (let i = 0; i < bc.length; ) {
    if (targets.has(i)) dead = false;
    const op = bc[i++];
    if (dead) {
      if (hasI32Imm(op)) i += 4; else if (hasU16Imm(op)) i += 2; else if (hasI8Imm(op)) i += 1;
      continue;
    }
    out.push(op);
    if (op === OP.return || op === OP.throw || op === OP.goto || op === OP.goto8 || op === OP.goto16) dead = true;
    if (hasI32Imm(op)) { for (let k=0;k<4;k++,i++) out.push(bc[i]); }
    else if (hasU16Imm(op)) { out.push(bc[i++], bc[i++]); }
    else if (hasI8Imm(op)) { out.push(bc[i++]); }
  }
  return out;
}

/* hot loop IC rewrite */
function hotICRewrite(bc: number[]): number[] {
  const n = bc.length;
  const loops: Array<{ start: number; end: number }> = [];
  for (let i = 0; i < n; ) {
    const pc = i;
    const op = bc[i++];
    if (op === OP.goto) {
      const rel = readI32(bc, i); i += 4;
      const tgt = i + rel; if (tgt < pc) loops.push({ start: tgt, end: i });
    } else if (op === OP.goto8) {
      const rel8 = (bc[i++] << 24) >> 24;
      const tgt = i + rel8; if (tgt < pc) loops.push({ start: tgt, end: i });
    } else if (op === OP.goto16) {
      const lo = bc[i++], hi = bc[i++]; const rel16 = (hi<<8)|lo; const rel = (rel16<<16)>>16;
      const tgt = i + rel; if (tgt < pc) loops.push({ start: tgt, end: i });
    } else if (hasI32Imm(op)) i += 4;
    else if (hasU16Imm(op)) i += 2;
  }
  if (!loops.length) return bc;

  const out = bc.slice();
  for (const lp of loops) {
    for (let i = lp.start; i < lp.end; ) {
      const op = out[i++];
      if (op === OP.get_loc && i + 2 <= lp.end) {
        const saveI = i; i += 2;
        if (i < lp.end) {
          const op2 = out[i++];
          if (op2 === OP.get_field && i + 4 <= lp.end) { out[i-1] = OP.get_field_ic; i += 4; continue; }
          if (op2 === OP.get_field2 && i + 4 <= lp.end) { out[i-1] = OP.get_field2_ic; i += 4; continue; }
          i = saveI;
        }
      }
      if (op === OP.put_field && i + 4 <= lp.end) { out[i-1] = OP.put_field_ic; i += 4; continue; }
      if (hasI32Imm(op)) i += 4; else if (hasU16Imm(op)) i += 2; else if (hasI8Imm(op)) i += 1;
    }
  }
  return out;
}

/* precise max stack with exception edges */
export function preciseMaxStackWithExceptions(bc: number[], exceptions: { start_pc: number; end_pc: number; target_pc: number }[]): number {
  type Node = { pc: number; nextPCs: number[]; delta: (sp:number)=>number };
  const nodes: Node[] = [];
  const n = bc.length;
  const indexByPC = new Map<number, number>();

  for (let i = 0; i < n; ) {
    const pc = i;
    const op = bc[i++];
    let nextPCs: number[] = [];
    let delta = (sp:number)=>sp;
    const rdI32 = () => { const v = readI32(bc, i); i += 4; return v; };
    const rdU16 = () => { i += 2; };

    switch (op) {
      case OP.push_i32: i += 4; delta=sp=>sp+1; break;
      case OP.push_const: i += 4; delta=sp=>sp+1; break;
      case OP.push_atom_value: i += 4; delta=sp=>sp+1; break;
      case OP.undefined: case OP.null: case OP.push_true: case OP.push_false: case OP.object:
        delta=sp=>sp+1; break;

      case OP.define_field: i += 4; delta=sp=>sp-1; break;
      case OP.get_field: i += 4; delta=sp=>sp; break;
      case OP.get_field2: i += 4; delta=sp=>sp+1; break;
      case OP.put_field: i += 4; delta=sp=>sp-2; break;
      case OP.get_field_ic: i += 4; delta=sp=>sp; break;
      case OP.get_field2_ic: i += 4; delta=sp=>sp+1; break;
      case OP.put_field_ic: i += 4; delta=sp=>sp-2; break;

      case OP.get_var: i += 4; delta=sp=>sp+1; break;
      case OP.put_var: i += 4; delta=sp=>sp-1; break;

      case OP.get_loc: rdU16(); delta=sp=>sp+1; break;
      case OP.put_loc: rdU16(); delta=sp=>sp-1; break;

      case OP.get_array_el: delta=sp=>sp-1; break;
      case OP.put_array_el: delta=sp=>sp-3; break;

      case OP.add: case OP.sub: case OP.mul: case OP.div: case OP.mod:
      case OP.lt: case OP.lte: case OP.gt: case OP.gte:
      case OP.eq: case OP.neq: case OP.strict_eq: case OP.strict_neq:
      case OP.and: case OP.or: case OP.xor:
      case OP.shl: case OP.shr: case OP.sar:
        delta=sp=>sp-1; break;

      case OP.not: case OP.lnot: delta=sp=>sp; break;

      case OP.array_from: rdU16(); delta=sp=>sp + 1; break;
      case OP.call: case OP.call_method: rdU16(); delta=sp=>sp + 1; break;

      case OP.if_false: { const rel=rdI32(); const tgt=i+rel; nextPCs=[i,tgt]; delta=sp=>sp-1; break; }
      case OP.if_true:  { const rel=rdI32(); const tgt=i+rel; nextPCs=[i,tgt]; delta=sp=>sp-1; break; }
      case OP.goto:     { const rel=rdI32(); const tgt=i+rel; nextPCs=[tgt]; break; }

      case OP.if_false8: { const r8=(bc[i++]<<24)>>24; const tgt=i+r8; nextPCs=[i,tgt]; delta=sp=>sp-1; break; }
      case OP.if_true8:  { const r8=(bc[i++]<<24)>>24; const tgt=i+r8; nextPCs=[i,tgt]; delta=sp=>sp-1; break; }
      case OP.goto8:     { const r8=(bc[i++]<<24)>>24; const tgt=i+r8; nextPCs=[tgt]; break; }
      case OP.goto16:    { const lo=bc[i++],hi=bc[i++]; const rel16=(hi<<8)|lo; const rel=(rel16<<16)>>16; const tgt=i+rel; nextPCs=[tgt]; break; }

      case OP.return: delta=sp=>Math.max(0,sp-1); nextPCs=[]; break;
      case OP.return_undef: delta=sp=>sp; nextPCs=[]; break;

      default:
        if (hasI32Imm(op)) i += 4;
        else if (hasU16Imm(op)) i += 2;
        else if (hasI8Imm(op)) i += 1;
        break;
    }
    if (nextPCs.length === 0) nextPCs = [i];
    nodes.push({ pc, nextPCs, delta });
  }
  nodes.forEach((n,idx)=>indexByPC.set(n.pc, idx));

  const addEdge = (fromPC: number, toPC: number) => {
    const i = indexByPC.get(fromPC); const j = indexByPC.get(toPC);
    if (i===undefined || j===undefined) return;
    if (!nodes[i].nextPCs.includes(toPC)) nodes[i].nextPCs.push(toPC);
  };
  for (const ex of exceptions) addEdge(ex.start_pc, ex.target_pc);

  const inStack = new Map<number, number>();
  const work: number[] = [];
  if (nodes.length) { inStack.set(nodes[0].pc, 0); work.push(0); }
  let max = 0;

  while (work.length) {
    const i = work.pop()!;
    const stIn = inStack.get(nodes[i].pc)!;
    const stOut = nodes[i].delta(stIn);
    if (stOut > max) max = stOut;
    for (const npc of nodes[i].nextPCs) {
      const j = indexByPC.get(npc);
      if (j === undefined) continue;
      const prev = inStack.get(nodes[j].pc);
      if (prev === undefined || prev < stOut) {
        inStack.set(nodes[j].pc, stOut);
        work.push(j);
      }
    }
  }
  return Math.max(1, max);
}