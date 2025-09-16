import { OP } from './op'
import { getDetectedOpcode } from './env'

// 动态探测可选短指令（存在才启用对应规则）
const OP_NEG = getDetectedOpcode('neg')
const OP_INC = getDetectedOpcode('inc')
const OP_DEC = getDetectedOpcode('dec')
const OP_POST_INC = getDetectedOpcode('post_inc')
const OP_POST_DEC = getDetectedOpcode('post_dec')
const OP_INC_LOC = getDetectedOpcode('inc_loc')
const OP_DEC_LOC = getDetectedOpcode('dec_loc')
const OP_ADD_LOC = getDetectedOpcode('add_loc')
const OP_IS_NULL = getDetectedOpcode('is_null')
const OP_IS_UNDEFINED = getDetectedOpcode('is_undefined')
const OP_PERM3 = getDetectedOpcode('perm3')
const OP_PERM4 = getDetectedOpcode('perm4')
const OP_TYPEOF = getDetectedOpcode('typeof')
const OP_TYPEOF_IS_UNDEFINED = getDetectedOpcode('typeof_is_undefined')
const OP_TYPEOF_IS_FUNCTION = getDetectedOpcode('typeof_is_function')
const OP_SET_ARG = getDetectedOpcode('set_arg')
const OP_INSERT2 = getDetectedOpcode('insert2')

const DYN_2BYTE_SET = new Set<number>([
  ...(OP_INC_LOC != null ? [OP_INC_LOC] : []),
  ...(OP_DEC_LOC != null ? [OP_DEC_LOC] : []),
  ...(OP_ADD_LOC != null ? [OP_ADD_LOC] : []),
])

type Edge = { 
  start_pc: number
  end_pc: number
  target_pc: number 
}

export type OptimizeOptions = {
  enableConstFold?: boolean
  enableDeadCode?: boolean
  aggressiveDupSwapClean?: boolean
  enableHotIC?: boolean
  exceptionEdges?: Edge[]
};

export function optimize(bc: number[], opts: OptimizeOptions = {}) {
  let code = bc.slice()

  // 默认关闭高风险优化（保持与 QuickJS 语义一致）
  if (opts.enableConstFold === true) {
    code = constantFold(code)
  }

  if (opts.aggressiveDupSwapClean) {
    code = cleanDupSwapDrop(code)
  }

  if (opts.enableDeadCode !== false) {
    code = deadCodeElim(code)
  }

  if (opts.enableHotIC === true) {
    code = hotICRewrite(code)
  }

  // 逐条移植（保大小）peephole 规则
  code = peepholeResolveLabelsStyle(code)

  const maxStack = preciseMaxStackWithExceptions(code, opts.exceptionEdges ?? [])
  return { code, maxStack }
}

/* ---- helpers ---- */
function readI32(arr: number[], i: number) { 
  return (arr[i] | (arr[i+1] << 8) | (arr[i+2] << 16) | (arr[i+3] << 24)) | 0; 
}

function writeI32(arr: number[], i: number, v: number) { 
  arr[i] = v & 0xff; 
  arr[i + 1] = (v >>> 8) & 0xff; 
  arr[i + 2] = (v >>> 16) & 0xff; 
  arr[i + 3] = (v >>> 24) & 0xff; 
}

// 统一解码：返回从 pos 开始的整条指令长度（字节数）
function instrSizeAt(bc: number[], pos: number): number {
  const op = bc[pos]
  if (op === undefined) return 0
  // 先识别动态 2 字节短指令
  if (DYN_2BYTE_SET.has(op)) return 2
  switch (op) {
    // i32 (u32 或 s32 立即数，长度=1+4)
    case OP.push_i32:
    case OP.push_const:
    case OP.push_atom_value:
    case OP.get_var:
    case OP.put_var:
    case OP.get_field:
    case OP.get_field2:
    case OP.put_field:
    case OP.get_field_ic:
    case OP.get_field2_ic:
    case OP.put_field_ic:
    case OP.if_false:
    case OP.if_true:
    case OP.goto:
    case OP.catch:
    case OP.gosub:
      return 5

    // u16（长度=1+2）
    case OP.get_loc:
    case OP.put_loc:
    case OP.set_loc:
    case OP.get_arg:
    case OP.put_arg:
    case OP.get_var_ref:
    case OP.put_var_ref:
    case OP.set_var_ref:
    case OP.call:
    case OP.call_method:
    case OP.call_constructor:
    case OP.array_from:
    case OP.eval:
    case OP.goto16:
      return 3

    // i8（长度=1+1）
    case OP.if_false8:
    case OP.if_true8:
    case OP.goto8:
      return 2

    // with_*（atom u32 + rel i32 + scope u8）长度=1+9
    case OP.with_get_var:
    case OP.with_put_var:
    case OP.with_delete_var:
    case OP.with_make_ref:
    case OP.with_get_ref:
      return 10

    default:
      return 1
  }
}

function isWithOp(op: number): boolean {
  return (
    op === OP.with_get_var ||
    op === OP.with_put_var ||
    op === OP.with_delete_var ||
    op === OP.with_make_ref ||
    op === OP.with_get_ref
  )
}

function getBranchTargets(bc: number[], pos: number): number[] {
  const op = bc[pos]
  const targets: number[] = []
  switch (op) {
    case OP.if_false:
    case OP.if_true:
    case OP.goto: {
      const rel = readI32(bc, pos + 1)
      const after = pos + 5
      targets.push(after + rel)
      break
    }
    case OP.if_false8:
    case OP.if_true8:
    case OP.goto8: {
      const r8 = (bc[pos + 1] << 24) >> 24
      const after = pos + 2
      targets.push(after + r8)
      break
    }
    case OP.goto16: {
      const lo = bc[pos + 1]
      const hi = bc[pos + 2]
      const r16 = (hi << 8) | lo
      const rel = (r16 << 16) >> 16
      const after = pos + 3
      targets.push(after + rel)
      break
    }
    // 注意：本工程的 with_* 使用的是 “afterLabel=pos+9” 的相对基准（见 assemble.ts）
    case OP.with_get_var:
    case OP.with_put_var:
    case OP.with_delete_var:
    case OP.with_make_ref:
    case OP.with_get_ref: {
      const diff = readI32(bc, pos + 1 + 4) // 在 atom 之后
      const after = pos + 9 // op(1)+atom(4)+rel(4)
      targets.push(after + diff)
      break
    }
    case OP.catch: {
      // 这里遵循一般 i32 相对跳转格式（与 assemble 行为一致）
      const rel = readI32(bc, pos + 1)
      const after = pos + 5
      targets.push(after + rel)
      break
    }
    default:
      break
  }
  return targets
}

function copyOneInstr(out: number[], bc: number[], pos: number): number {
  const sz = instrSizeAt(bc, pos)
  for (let k = 0; k < sz; k++) out.push(bc[pos + k])
  return sz
}

function hasI32Imm(op: number): boolean {
  return (
    op === OP.push_const || 
    op === OP.push_atom_value ||
    op === OP.get_var || 
    op === OP.put_var ||
    op === OP.get_field || 
    op === OP.get_field2 || 
    op === OP.put_field ||
    op === OP.get_field_ic || 
    op === OP.get_field2_ic || 
    op === OP.put_field_ic ||
    op === OP.if_false || 
    op === OP.if_true || 
    op === OP.goto
  )
}
function hasU16Imm(op: number): boolean {
  return (
    op === OP.get_loc || 
    op === OP.put_loc ||
    op === OP.call || 
    op === OP.call_method ||
    op === OP.array_from || 
    op === OP.eval || 
    op === OP.goto16
  )
}

function hasI8Imm(op: number): boolean {
  return (
    op === OP.if_false8 || 
    op === OP.if_true8 || 
    op === OP.goto8
  );
}

function emitNop(out: number[], n: number) {
  for (let k = 0; k < n; k++) out.push(OP.nop)
}

function emitDropWithPad(out: number[], totalSize: number) {
  // 将一条 push/load 指令替换为 drop + 填充 NOP，保持字节数不变
  if (totalSize <= 0) return
  out.push(OP.drop)
  emitNop(out, totalSize - 1)
}

/* const folding (i32) */
function constantFold(bc: number[]): number[] {
  const out: number[] = [];
  for (let i = 0; i < bc.length; ) {
    const op = bc[i];
    // 尝试匹配：push_i32, push_i32, 二元算术
    if (op === OP.push_i32 && i + 5 <= bc.length) {
      const a = readI32(bc, i + 1);
      const i1 = i + 5
      if (i1 < bc.length && bc[i1] === OP.push_i32 && i1 + 5 <= bc.length) {
        const b = readI32(bc, i1 + 1)
        const i2 = i1 + 5
        if (i2 < bc.length) {
          const k = bc[i2]
          if (k === OP.add || k === OP.sub || k === OP.mul || k === OP.div || k === OP.mod) {
            // 注意：该折叠默认被禁用（需 enableConstFold=true），且使用与原实现一致的 i32 折叠；
            // 这与 JS Number 语义不同，使用时需确保不破坏语义。
            let v = 0
            switch (k) {
              case OP.add: v = (a + b) | 0; break
              case OP.sub: v = (a - b) | 0; break
              case OP.mul: v = (a * b) | 0; break
              case OP.div: v = (b !== 0 ? (a / b) | 0 : 0); break
              case OP.mod: v = (b !== 0 ? (a % b) | 0 : 0); break
            }
            out.push(OP.push_i32, v & 0xff, (v >>> 8) & 0xff, (v >>> 16) & 0xff, (v >>> 24) & 0xff)
            i = i2 + 1
            continue
          }
        }
      }
    }
    // 未匹配：按一条指令拷贝
    i += copyOneInstr(out, bc, i)
  }
  return out
}

function cleanDupSwapDrop(bc: number[]): number[] {
  const out: number[] = []
  for (let i = 0; i < bc.length; ) {
    const op = bc[i]
    if (op === OP.push_i32 && i + 5 < bc.length && bc[i + 5] === OP.drop) { 
      // push_i32 imm; drop -> 用 NOP 保大小
      emitNop(out, 5 + 1)
      i += 6
      continue
    }
    i += copyOneInstr(out, bc, i)
  }
  return out
}

/* dead code */
function deadCodeElim(bc: number[]): number[] {
  const targets = new Set<number>()
  // 收集所有跳转目标
  for (let i = 0; i < bc.length; ) {
    const pos = i
    const op = bc[i]
    const sz = instrSizeAt(bc, i)
    for (const t of getBranchTargets(bc, pos)) {
      targets.add(t)
    }
    i += sz
  }

  const out: number[] = []
  let dead = false
  for (let i = 0; i < bc.length; ) {
    if (targets.has(i)) dead = false
    const pos = i
    const op = bc[i]
    const sz = instrSizeAt(bc, i)

    if (!dead) {
      // 复制整条指令
      for (let k = 0; k < sz; k++) out.push(bc[i + k])
    } else {
      // 保持布局：用 NOP 填充死代码的字节
      emitNop(out, sz)
    }

    // 终止指令集合（到达后后续线性代码为死代码，直到遇到 target）
    if (!dead) {
      if (
        op === OP.return || 
        op === OP.return_undef ||
        op === OP.throw || 
        op === OP.goto || 
        op === OP.goto8 || 
        op === OP.goto16
      ) {
        dead = true
      }
    }

    i = pos + sz
  }

  return out
}

type Loop = { start: number; end: number }

function hotICRewrite(bc: number[]): number[] {
  const n = bc.length
  const loops: Array<Loop> = [];
  for (let i = 0; i < n; ) {
    const pc = i
    const op = bc[i++]
    if (op === OP.goto) {
      const rel = readI32(bc, i)
      i += 4
      const tgt = i + rel
      if (tgt < pc) {
        loops.push({ start: tgt, end: i })
      }
    } else if (op === OP.goto8) {
      const rel8 = (bc[i++] << 24) >> 24
      const tgt = i + rel8
      if (tgt < pc) {
        loops.push({ start: tgt, end: i })
      }
    } else if (op === OP.goto16) {
      const lo = bc[i++]
      const hi = bc[i++]
      const rel16 = (hi << 8) | lo
      const rel = (rel16 << 16) >> 16
      const tgt = i + rel
      if (tgt < pc) {
        loops.push({ start: tgt, end: i })
      }
    } else if (instrSizeAt(bc, i - 1) > 1) {
      // 快速跳过立即数
      i = (i - 1) + instrSizeAt(bc, i - 1)
    }
  }
  if (!loops.length) {
    return bc
  }

  const out = bc.slice()
  for (const lp of loops) {
    for (let i = lp.start; i < lp.end; ) {
      const op = out[i]
      const sz = instrSizeAt(out, i)
      const next = i + sz

      // 注意：QuickJS 在运行时自修补 *_ic；编译期改写属于高风险，默认不启用
      // 此函数仅在 enableHotIC===true 时被调用。
      if (op === OP.get_loc && i + 3 <= lp.end) {
        const op2 = out[i + 3 - 1] // 粗略模式跟随，保持旧逻辑
        if (op2 === OP.get_field && i + 3 - 1 + 5 <= lp.end) {
          out[i + 3 - 1] = OP.get_field_ic
        } else if (op2 === OP.get_field2 && i + 3 - 1 + 5 <= lp.end) {
          out[i + 3 - 1] = OP.get_field2_ic
        }
      }
      if (op === OP.put_field && i + 5 <= lp.end) {
        out[i] = OP.put_field_ic
      }

      i = next
    }
  }
  return out
}


// ===== QuickJS resolve_labels 风格（保字节大小）的 peephole 规则 =====
function isConstProducer(op: number): boolean {
  return (
    op === OP.undefined ||
    op === OP.null ||
    op === OP.push_true ||
    op === OP.push_false ||
    op === OP.push_i32 ||
    op === OP.push_const ||
    op === OP.push_atom_value
  )
}

function isSideEffectFreeLoad(op: number): boolean {
  // 仅局部与参数读取，无副作用
  return op === OP.get_loc || op === OP.get_arg
}

function getConstTruthiness(bc: number[], pos: number): boolean | null {
  const op = bc[pos]
  switch (op) {
    case OP.undefined:
    case OP.null:
    case OP.push_false:
      return false
    case OP.push_true:
      return true
    case OP.push_i32: {
      const v = readI32(bc, pos + 1)
      return v !== 0
    }
    // 其他常量（push_const/push_atom_value）在不解析具体值的情况下不折叠
    default:
      return null
  }
}

function u16At(bc: number[], pos: number): number {
  return (bc[pos] | (bc[pos + 1] << 8)) >>> 0
}

function peepholeResolveLabelsStyle(bc: number[]): number[] {
  const out: number[] = []
  for (let i = 0; i < bc.length;) {
    const op = bc[i]
    const sz = instrSizeAt(bc, i)

    // A) push_i32; neg => push_i32(-imm) + NOP （保大小）
    if (op === OP.push_i32 && OP_NEG != null) {
      const i2 = i + 5
      if (i2 < bc.length && bc[i2] === OP_NEG) {
        const v = readI32(bc, i + 1)
        const nv = (-v) | 0
        out.push(OP.push_i32, nv & 0xff, (nv >>> 8) & 0xff, (nv >>> 16) & 0xff, (nv >>> 24) & 0xff)
        emitNop(out, 1)
        i = i2 + 1
        continue
      }
      // A.1) push_i32; neg; drop => NOP*7
      const i2b = i + 5
      if (OP_NEG != null && i2b + 1 < bc.length && bc[i2b] === OP_NEG && bc[i2b + 1] === OP.drop) {
        emitNop(out, 7)
        i += 7
        continue
      }
    }

    // A.2) goto to next => NOPs（适配 5/3/2 字节）
    if (op === OP.goto || op === OP.goto16 || op === OP.goto8) {
      const targets = getBranchTargets(bc, i)
      if (targets.length && targets[0] === i + sz) {
        emitNop(out, sz)
        i += sz
        continue
      }
    }

    // B) undefined; return => return_undef (+pad)
    if (op === OP.undefined) {
      const i2 = i + sz
      if (i2 < bc.length && bc[i2] === OP.return) {
        out.push(OP.return_undef)
        emitNop(out, (1 + 1) - 1)
        i = i2 + 1
        continue
      }
    }

    // B.1) drop; return_undef => NOP + return_undef
    if (op === OP.drop) {
      const i2 = i + 1
      if (i2 < bc.length && bc[i2] === OP.return_undef) {
        emitNop(out, 1)
        out.push(OP.return_undef)
        i = i2 + 1
        continue
      }
    }

    // C) 常量 if（true/false/null/undefined/i32）重写
    if (isConstProducer(op)) {
      const truth = getConstTruthiness(bc, i)
      const i2 = i + sz
      if (i2 < bc.length) {
        const op2 = bc[i2]
        const sz2 = instrSizeAt(bc, i2)
        if (op2 === OP.if_true || op2 === OP.if_false) {
          if (truth === true && op2 === OP.if_true) {
            emitNop(out, sz)
            out.push(OP.goto)
            for (let k = 0; k < 4; k++) out.push(bc[i2 + 1 + k])
            i = i2 + sz2
            continue
          } else if (truth === false && op2 === OP.if_false) {
            emitNop(out, sz)
            emitNop(out, sz2)
            i = i2 + sz2
            continue
          }
        } else if (op2 === OP.if_true8 || op2 === OP.if_false8) {
          if (truth === true && op2 === OP.if_true8) {
            emitNop(out, sz)
            out.push(OP.goto8, bc[i2 + 1])
            i = i2 + sz2
            continue
          } else if (truth === false && op2 === OP.if_false8) {
            emitNop(out, sz)
            emitNop(out, sz2)
            i = i2 + sz2
            continue
          }
        }
      }
    }

    // C.1) if_true/if_false to nextPC => drop + pad
    if (op === OP.if_true || op === OP.if_false) {
      const t = getBranchTargets(bc, i)[0]
      if (t === i + sz) {
        out.push(OP.drop)
        emitNop(out, sz - 1)
        i += sz
        continue
      }
      // C.2) if_x L1; goto L2; (L1 == after_goto) => invert if_x to L2, NOP goto
      const i2 = i + sz
      if (i2 < bc.length && (bc[i2] === OP.goto || bc[i2] === OP.goto16 || bc[i2] === OP.goto8)) {
        const afterGoto = i2 + instrSizeAt(bc, i2)
        if (t === afterGoto) {
          const dest2 = getBranchTargets(bc, i2)[0]
          const afterIf = i + 5
          const rel = dest2 - afterIf
          const newIf = (op === OP.if_true) ? OP.if_false : OP.if_true
          out.push(newIf)
          out.push(rel & 0xff, (rel >>> 8) & 0xff, (rel >>> 16) & 0xff, (rel >>> 24) & 0xff)
          emitNop(out, instrSizeAt(bc, i2))
          i = afterGoto
          continue
        }
      }
    } else if (op === OP.if_true8 || op === OP.if_false8) {
      const t = getBranchTargets(bc, i)[0]
      if (t === i + sz) {
        out.push(OP.drop)
        emitNop(out, sz - 1)
        i += sz
        continue
      }
    }

    // D) null/undefined 严格比较特化为 is_null/is_undefined（同分支变体）
    if ((op === OP.null || op === OP.undefined)) {
      const i2 = i + sz
      if (i2 < bc.length) {
        const op2 = bc[i2]
        if (op2 === OP.strict_eq || op2 === OP.strict_neq) {
          const isNull = (op === OP.null)
          const code = isNull ? OP_IS_NULL : OP_IS_UNDEFINED
          if (code != null) {
            const i3 = i2 + 1
            // 分支变体：strict_neq 后接 if_true/if_false
            if (op2 === OP.strict_neq && i3 < bc.length && (bc[i3] === OP.if_true || bc[i3] === OP.if_false)) {
              out.push(code)
              emitNop(out, 1) // 占位 strict_neq
              const inv = bc[i3] === OP.if_true ? OP.if_false : OP.if_true
              out.push(inv)
              for (let k = 0; k < 4; k++) out.push(bc[i3 + 1 + k])
              i = i3 + 5
              continue
            }
            if (op2 === OP.strict_neq && i3 < bc.length && (bc[i3] === OP.if_true8 || bc[i3] === OP.if_false8)) {
              out.push(code)
              emitNop(out, 1)
              const inv8 = bc[i3] === OP.if_true8 ? OP.if_false8 : OP.if_true8
              out.push(inv8, bc[i3 + 1])
              i = i3 + 2
              continue
            }
            // 非分支：与原有规则一致
            out.push(code)
            if (op2 === OP.strict_eq) {
              emitNop(out, 1)
            } else {
              out.push(OP.lnot)
            }
            i = i2 + 1
            continue
          }
        }
      }
    }

    // E) push/load 与 drop 成对删除（保大小 -> 两者 NOP）
    if ((isConstProducer(op) || isSideEffectFreeLoad(op)) && i + sz < bc.length) {
      const op2 = bc[i + sz]
      if (op2 === OP.drop) {
        emitNop(out, sz)
        emitNop(out, 1)
        i += sz + 1
        continue
      }
    }

    // E.1) to_propkey 冗余去除：to_propkey; X; put_array_el -> NOP + X + put_array_el
    if (op === OP.to_propkey) {
      const i2 = i + 1
      if (i2 < bc.length) {
        const xop = bc[i2]
        const szx = instrSizeAt(bc, i2)
        const i3 = i2 + szx
        const isSimpleX = (
          xop === OP.get_loc || xop === OP.get_arg || xop === OP.get_var_ref ||
          xop === OP.push_i32 || xop === OP.push_const || xop === OP.push_atom_value ||
          xop === OP.undefined || xop === OP.null || xop === OP.push_true || xop === OP.push_false
        )
        if (isSimpleX && i3 < bc.length && bc[i3] === OP.put_array_el) {
          emitNop(out, 1)
          // 复制 X 与 put_array_el
          i += 1
          i += copyOneInstr(out, bc, i)
          i += copyOneInstr(out, bc, i)
          continue
        }
      }
    }

    // F) insert2; put_field/put_var_strict; drop => put_* + pad
    if (OP_INSERT2 != null && op === OP_INSERT2) {
      const i2 = i + 1
      if (i2 + 5 < bc.length && (bc[i2] === OP.put_field || bc[i2] === OP.put_var_strict)) {
        const i3 = i2 + 5
        if (i3 < bc.length && bc[i3] === OP.drop) {
          // emit put_* (5 bytes) then pad 2 NOPs
          for (let k = 0; k < 5; k++) out.push(bc[i2 + k])
          emitNop(out, 2)
          i = i3 + 1
          continue
        }
      }
    }

    // G) dup; put_x; drop => put_x （dup/drop 变 NOP）
    if (op === OP.dup) {
      const i2 = i + sz
      if (i2 < bc.length) {
        const op2 = bc[i2]
        const sz2 = instrSizeAt(bc, i2)
        const i3 = i2 + sz2
        if (i3 < bc.length && bc[i3] === OP.drop) {
          if (op2 === OP.put_loc || op2 === OP.put_arg || op2 === OP.put_var || op2 === OP.put_var_ref) {
            emitNop(out, sz)
            for (let k = 0; k < sz2; k++) out.push(bc[i2 + k])
            emitNop(out, 1)
            i = i3 + 1
            continue
          }
        }
      }
    }

    // G.1) dup; put_loc => set_loc（+NOP） / dup; put_var_ref => set_var_ref（+NOP）
    if (op === OP.dup) {
      const i2 = i + sz
      if (i2 < bc.length) {
        const op2 = bc[i2]
        const sz2 = instrSizeAt(bc, i2)
        if (op2 === OP.put_loc) {
          out.push(OP.set_loc)
          out.push(bc[i2 + 1], bc[i2 + 2])
          emitNop(out, 1)
          i = i2 + sz2
          continue
        } else if (op2 === OP.put_var_ref) {
          out.push(OP.set_var_ref)
          out.push(bc[i2 + 1], bc[i2 + 2])
          emitNop(out, 1)
          i = i2 + sz2
          continue
        }
      }
    }

    // G.2) dup; put_x; drop; get_x -> set_x + pad
    if (op === OP.dup) {
      const i2 = i + 1
      if (i2 < bc.length) {
        const op2 = bc[i2]
        const sz2 = instrSizeAt(bc, i2)
        const i3 = i2 + sz2
        if (i3 + 1 < bc.length && bc[i3] === OP.drop) {
          const i4 = i3 + 1
          // loc
          if (op2 === OP.put_loc && bc[i4] === OP.get_loc && bc[i4 + 1] === bc[i2 + 1] && bc[i4 + 2] === bc[i2 + 2]) {
            out.push(OP.set_loc, bc[i2 + 1], bc[i2 + 2])
            emitNop(out, (1 + sz2 + 1 + 3) - 3)
            i = i4 + 3
            continue
          }
          // var_ref
          if (op2 === OP.put_var_ref && bc[i4] === OP.get_var_ref && bc[i4 + 1] === bc[i2 + 1] && bc[i4 + 2] === bc[i2 + 2]) {
            out.push(OP.set_var_ref, bc[i2 + 1], bc[i2 + 2])
            emitNop(out, (1 + sz2 + 1 + 3) - 3)
            i = i4 + 3
            continue
          }
          // arg（仅在探测到 set_arg 时启用）
          if (OP_SET_ARG != null && op2 === OP.put_arg && bc[i4] === OP.get_arg && bc[i4 + 1] === bc[i2 + 1] && bc[i4 + 2] === bc[i2 + 2]) {
            out.push(OP_SET_ARG, bc[i2 + 1], bc[i2 + 2])
            emitNop(out, (1 + sz2 + 1 + 3) - 3)
            i = i4 + 3
            continue
          }
        }
      }
    }

    // H) get_loc idx; inc/dec; set_loc idx => inc_loc/dec_loc（+NOP 填充）
    if (op === OP.get_loc && (OP_INC_LOC != null || OP_DEC_LOC != null) && i + 3 < bc.length) {
      const idx = u16At(bc, i + 1)
      const i2 = i + 3
      const op2 = bc[i2]
      if ((op2 === OP_INC || op2 === OP_DEC) && i2 + 1 < bc.length) {
        const i3 = i2 + 1
        if (bc[i3] === OP.set_loc && u16At(bc, i3 + 1) === idx) {
          if (idx < 256) {
            if (op2 === OP_INC && OP_INC_LOC != null) {
              out.push(OP_INC_LOC, idx & 0xff)
              emitNop(out, (3 + 1 + 3) - 2)
              i = i3 + 3
              continue
            } else if (op2 === OP_DEC && OP_DEC_LOC != null) {
              out.push(OP_DEC_LOC, idx & 0xff)
              emitNop(out, (3 + 1 + 3) - 2)
              i = i3 + 3
              continue
            }
          }
        }
      }
    }

    // H.1) get_loc idx; post_inc/dec; put_loc idx; drop => inc_loc/dec_loc
    if (op === OP.get_loc && (OP_INC_LOC != null || OP_DEC_LOC != null) && (OP_POST_INC != null || OP_POST_DEC != null)) {
      const idx = u16At(bc, i + 1)
      const i2 = i + 3
      if (i2 < bc.length) {
        const p = bc[i2]
        const i3 = i2 + 1
        if (i3 + 4 <= bc.length && (p === OP_POST_INC || p === OP_POST_DEC) && bc[i3] === OP.put_loc && u16At(bc, i3 + 1) === idx && bc[i3 + 3] === OP.drop) {
          if (idx < 256) {
            if (p === OP_POST_INC && OP_INC_LOC != null) {
              out.push(OP_INC_LOC, idx & 0xff)
              emitNop(out, (3 + 1 + 3 + 1) - 2)
              i = i3 + 4
              continue
            } else if (p === OP_POST_DEC && OP_DEC_LOC != null) {
              out.push(OP_DEC_LOC, idx & 0xff)
              emitNop(out, (3 + 1 + 3 + 1) - 2)
              i = i3 + 4
              continue
            }
          }
        }
      }
    }

    // H.2) get_loc idx; inc/dec; dup; put_loc idx; drop => inc_loc/dec_loc
    if (op === OP.get_loc && (OP_INC_LOC != null || OP_DEC_LOC != null) && i + 3 < bc.length) {
      const idx = u16At(bc, i + 1)
      const i2 = i + 3
      const op2 = bc[i2]
      if ((op2 === OP_INC || op2 === OP_DEC) && i2 + 3 < bc.length && bc[i2 + 1] === OP.dup && bc[i2 + 2] === OP.put_loc && u16At(bc, i2 + 3) === idx && bc[i2 + 5] === OP.drop) {
        if (idx < 256) {
          const dyn = (op2 === OP_INC) ? OP_INC_LOC : OP_DEC_LOC
          if (dyn != null) {
            out.push(dyn, idx & 0xff)
            emitNop(out, (3 + 1 + 1 + 3 + 1) - 2)
            i = i2 + 6
            continue
          }
        }
      }
    }

    // I) get_loc idx; push_i32 imm; add; set_loc idx / dup+put_loc 变体
    if (op === OP.get_loc && i + 3 < bc.length) {
      const idx = u16At(bc, i + 1)
      const i2 = i + 3
      // set_loc 变体
      if (i2 + 5 + 1 + 3 <= bc.length && bc[i2] === OP.push_i32 && bc[i2 + 5] === OP.add && bc[i2 + 6] === OP.set_loc && u16At(bc, i2 + 7) === idx) {
        const imm = readI32(bc, i2 + 1)
        if (idx < 256) {
          if (imm === 1 && OP_INC_LOC != null) {
            out.push(OP_INC_LOC, idx & 0xff)
            emitNop(out, (3 + 5 + 1 + 3) - 2)
            i = i2 + 5 + 1 + 3
            continue
          } else if (imm === -1 && OP_DEC_LOC != null) {
            out.push(OP_DEC_LOC, idx & 0xff)
            emitNop(out, (3 + 5 + 1 + 3) - 2)
            i = i2 + 5 + 1 + 3
            continue
          } else if (OP_ADD_LOC != null) {
            out.push(OP.push_i32, bc[i2 + 1], bc[i2 + 2], bc[i2 + 3], bc[i2 + 4])
            out.push(OP_ADD_LOC, idx & 0xff)
            emitNop(out, (3 + 5 + 1 + 3) - (5 + 2))
            i = i2 + 5 + 1 + 3
            continue
          }
        }
      }
      // dup + put_loc 变体 -> add_loc
      if (i2 + 5 + 1 + 1 + 3 + 1 <= bc.length && bc[i2] === OP.push_i32 && bc[i2 + 5] === OP.add && bc[i2 + 6] === OP.dup && bc[i2 + 7] === OP.put_loc && u16At(bc, i2 + 8) === idx && bc[i2 + 10] === OP.drop) {
        const imm = readI32(bc, i2 + 1)
        if (idx < 256 && OP_ADD_LOC != null) {
          out.push(OP.push_i32, bc[i2 + 1], bc[i2 + 2], bc[i2 + 3], bc[i2 + 4])
          out.push(OP_ADD_LOC, idx & 0xff)
          emitNop(out, (3 + 5 + 1 + 1 + 3 + 1) - (5 + 2))
          i = i2 + 11
          continue
        }
      }
    }

    // I.1) get_loc idx; push_atom_value imm; add; dup put_loc idx drop => push_atom_value imm; add_loc idx
    if (op === OP.get_loc && i + 3 < bc.length && OP_ADD_LOC != null) {
      const idx = u16At(bc, i + 1)
      const i2 = i + 3
      if (i2 + 5 + 1 + 1 + 3 + 1 <= bc.length && bc[i2] === OP.push_atom_value && bc[i2 + 5] === OP.add && bc[i2 + 6] === OP.dup && bc[i2 + 7] === OP.put_loc && u16At(bc, i2 + 8) === idx && bc[i2 + 10] === OP.drop) {
        if (idx < 256) {
          out.push(OP.push_atom_value, bc[i2 + 1], bc[i2 + 2], bc[i2 + 3], bc[i2 + 4])
          out.push(OP_ADD_LOC, idx & 0xff)
          emitNop(out, (3 + 5 + 1 + 1 + 3 + 1) - (5 + 2))
          i = i2 + 11
          continue
        }
      }
      // get_loc/arg/var_ref X; add; dup put_loc idx drop => get_X; add_loc idx
      if (i2 + 3 + 1 + 1 + 3 + 1 <= bc.length && (bc[i2] === OP.get_loc || bc[i2] === OP.get_arg || bc[i2] === OP.get_var_ref) && bc[i2 + instrSizeAt(bc, i2)] === OP.add) {
        const xop = bc[i2]
        const szx = instrSizeAt(bc, i2)
        const j = i2 + szx
        if (bc[j] === OP.add && bc[j + 1] === OP.dup && bc[j + 2] === OP.put_loc && u16At(bc, j + 3) === idx && bc[j + 5] === OP.drop) {
          if (idx < 256) {
            // emit get_X
            for (let k = 0; k < szx; k++) out.push(bc[i2 + k])
            out.push(OP_ADD_LOC, idx & 0xff)
            emitNop(out, (3 + szx + 1 + 1 + 3 + 1) - (szx + 2))
            i = j + 6
            continue
          }
        }
      }
    }

    // J) push_i32 imm; get_loc idx; add; set_loc idx => 与上相同结果
    if (op === OP.push_i32 && i + 5 < bc.length) {
      const imm = readI32(bc, i + 1)
      const i2 = i + 5
      if (i2 + 3 + 1 + 3 <= bc.length && bc[i2] === OP.get_loc && bc[i2 + 3] === OP.add && bc[i2 + 4] === OP.set_loc) {
        const idx = u16At(bc, i2 + 1)
        if (u16At(bc, i2 + 5) === idx && idx < 256) {
          if (imm === 1 && OP_INC_LOC != null) {
            out.push(OP_INC_LOC, idx & 0xff)
            emitNop(out, (5 + 3 + 1 + 3) - 2)
            i = i2 + 3 + 1 + 3
            continue
          } else if (imm === -1 && OP_DEC_LOC != null) {
            out.push(OP_DEC_LOC, idx & 0xff)
            emitNop(out, (5 + 3 + 1 + 3) - 2)
            i = i2 + 3 + 1 + 3
            continue
          } else if (OP_ADD_LOC != null) {
            out.push(OP.push_i32, bc[i + 1], bc[i + 2], bc[i + 3], bc[i + 4])
            out.push(OP_ADD_LOC, idx & 0xff)
            emitNop(out, (5 + 3 + 1 + 3) - (5 + 2))
            i = i2 + 3 + 1 + 3
            continue
          }
        }
      }
    }

    // K) put_x idx; get_x idx -> set_x idx + pad
    if (op === OP.put_loc || op === OP.put_var_ref || op === OP.put_arg) {
      const idx = u16At(bc, i + 1)
      const i2 = i + 3
      if (i2 < bc.length) {
        if (op === OP.put_loc && bc[i2] === OP.get_loc && u16At(bc, i2 + 1) === idx) {
          out.push(OP.set_loc, bc[i + 1], bc[i + 2])
          emitNop(out, 3)
          i = i2 + 3
          continue
        }
        if (op === OP.put_var_ref && bc[i2] === OP.get_var_ref && u16At(bc, i2 + 1) === idx) {
          out.push(OP.set_var_ref, bc[i + 1], bc[i + 2])
          emitNop(out, 3)
          i = i2 + 3
          continue
        }
        if (OP_SET_ARG != null && op === OP.put_arg && bc[i2] === OP.get_arg && u16At(bc, i2 + 1) === idx) {
          out.push(OP_SET_ARG, bc[i + 1], bc[i + 2])
          emitNop(out, 3)
          i = i2 + 3
          continue
        }
      }
    }

    // L) post_inc/dec 模式
    if ((op === OP_POST_INC || op === OP_POST_DEC)) {
      const incdec = (op === OP_POST_INC) ? OP_INC : OP_DEC
      const i2 = i + 1
      if (i2 < bc.length) {
        // post_*; put_loc/arg/var_ref idx; drop => inc/dec; put_* idx + pad
        const op2 = bc[i2]
        const sz2 = instrSizeAt(bc, i2)
        if ((op2 === OP.put_loc || op2 === OP.put_arg || op2 === OP.put_var_ref) && i2 + sz2 < bc.length && bc[i2 + sz2] === OP.drop) {
          if (incdec != null) { out.push(incdec) } else { emitNop(out, 1) }
          for (let k = 0; k < sz2; k++) out.push(bc[i2 + k])
          emitNop(out, 1)
          i = i2 + sz2 + 1
          continue
        }
        // post_*; perm3; put_field/put_var_strict; drop
        if (OP_PERM3 != null && bc[i2] === OP_PERM3 && i2 + 1 < bc.length && (bc[i2 + 1] === OP.put_field || bc[i2 + 1] === OP.put_var_strict) && i2 + 6 < bc.length && bc[i2 + 6] === OP.drop) {
          if (incdec != null) { out.push(incdec) } else { emitNop(out, 1) }
          out.push(bc[i2 + 1])
          for (let k = 0; k < 4; k++) out.push(bc[i2 + 2 + k])
          emitNop(out, 2)
          i = i2 + 7
          continue
        }
        // post_*; perm4; put_array_el; drop
        if (OP_PERM4 != null && bc[i2] === OP_PERM4 && i2 + 1 < bc.length && bc[i2 + 1] === OP.put_array_el && i2 + 2 < bc.length && bc[i2 + 2] === OP.drop) {
          if (incdec != null) { out.push(incdec) } else { emitNop(out, 1) }
          out.push(OP.put_array_el)
          emitNop(out, 1)
          i = i2 + 3
          continue
        }
      }
    }

    // 未匹配规则：按指令原样拷贝
    i += copyOneInstr(out, bc, i)
  }
  return out
}


type Exception = { 
  start_pc: number 
  end_pc: number
  target_pc: number 
}

type Node = { 
  pc: number
  nextPCs: number[]
  delta: (sp:number) => number 
}

export function preciseMaxStackWithExceptions(bc: number[], exceptions: Exception[]): number {
  const nodes: Node[] = []
  const n = bc.length
  const indexByPC = new Map<number, number>()

  for (let i = 0; i < n; ) {
    const pc = i
    const op = bc[i]
    let nextPCs: number[] = []
    let delta = (sp:number) => sp

    // 统一基于指令大小推进
    const size = instrSizeAt(bc, i)

    switch (op) {
      case OP.push_i32: 
      case OP.push_const: 
      case OP.push_atom_value: 
      case OP.undefined: 
      case OP.null: 
      case OP.push_true: 
      case OP.push_false: 
      case OP.object:
        delta = sp => sp + 1
        break

      case OP.define_field: 
        delta = sp => sp - 1
        break
      case OP.get_field: 
      case OP.get_field_ic:
        delta = sp => sp
        break
      case OP.get_field2: 
      case OP.get_field2_ic:
        delta = sp => sp + 1
        break
      case OP.put_field: 
      case OP.put_field_ic: 
        delta = sp => sp - 2
        break
      case OP.get_var: 
        delta = sp => sp + 1
        break
      case OP.put_var: 
        delta = sp => sp - 1
        break

      case OP.get_loc: 
        delta = sp => sp + 1
        break
      case OP.put_loc: 
        delta = sp => sp - 1
        break

      case OP.get_array_el: 
        delta = sp => sp - 1
        break
      case OP.put_array_el: 
        delta = sp => sp - 3
        break

      case OP.add: 
      case OP.sub: 
      case OP.mul: 
      case OP.div: 
      case OP.mod:
      case OP.lt: 
      case OP.lte: 
      case OP.gt: 
      case OP.gte:
      case OP.eq: 
      case OP.neq: 
      case OP.strict_eq: 
      case OP.strict_neq:
      case OP.and: 
      case OP.or: 
      case OP.xor:
      case OP.shl: 
      case OP.shr: 
      case OP.sar:
        delta = sp => sp - 1
        break

      case OP.not: 
      case OP.lnot: 
        delta = sp => sp
        break

      case OP.array_from: 
        // 保守：+1（真实应为 -argc + 1，这里缺少 argc，后续如需精化可在 IR 中携带）
        delta = sp => sp + 1
        break
      case OP.call: 
      case OP.call_method: 
      case OP.call_constructor:
        // 保守近似：+1（真实依赖 argc 与 this 帧布局）
        delta = sp => sp + 1
        break

      case OP.if_false:
      case OP.if_true: {
        const t = getBranchTargets(bc, pc)[0]
        nextPCs = [pc + size, t]
        delta = sp => sp - 1
        break
      }

      case OP.goto: {
        const t = getBranchTargets(bc, pc)[0]
        nextPCs = [t]
        break
      }

      case OP.if_false8:
      case OP.if_true8: {
        const t = getBranchTargets(bc, pc)[0]
        nextPCs = [pc + size, t]
        delta = sp => sp - 1
        break
      }

      case OP.goto8: 
      case OP.goto16: {
        const t = getBranchTargets(bc, pc)[0]
        nextPCs = [t]
        break
      }

      // with_*：分支双出边；为避免低估栈，采用“上界”增量（成功路径更大者）
      case OP.with_get_var: {
        const t = getBranchTargets(bc, pc)[0]
        nextPCs = [pc + size, t]
        // jump: 0, fall: -1 => 取 0
        delta = sp => sp
        break
      }
      case OP.with_put_var: {
        const t = getBranchTargets(bc, pc)[0]
        nextPCs = [pc + size, t]
        // jump: -2, fall: -1 => 取 -1（上界）
        delta = sp => sp - 1
        break
      }
      case OP.with_delete_var: {
        const t = getBranchTargets(bc, pc)[0]
        nextPCs = [pc + size, t]
        // jump: 0, fall: -1 => 取 0
        delta = sp => sp
        break
      }
      case OP.with_make_ref:
      case OP.with_get_ref: {
        const t = getBranchTargets(bc, pc)[0]
        nextPCs = [pc + size, t]
        // jump: +1, fall: -1 => 取 +1
        delta = sp => sp + 1
        break
      }

      case OP.return:
        delta = sp => Math.max(0, sp - 1)
        nextPCs = []
        break
      case OP.return_undef: 
        delta = sp => sp
        nextPCs = []
        break

      default:
        break
    }

    if (nextPCs.length === 0) {
      nextPCs = [pc + size]
    }

    nodes.push({ pc, nextPCs, delta })
    i = pc + size
  }

  nodes.forEach((n,idx) => indexByPC.set(n.pc, idx))

  const addEdge = (fromPC: number, toPC: number) => {
    const i = indexByPC.get(fromPC); const j = indexByPC.get(toPC)

    if (i === undefined || j === undefined) {
      return
    }

    if (!nodes[i].nextPCs.includes(toPC)) {
      nodes[i].nextPCs.push(toPC)
    }
  }

  for (const ex of exceptions) {
    addEdge(ex.start_pc, ex.target_pc)
  }

  const inStack = new Map<number, number>()
  const work: number[] = []
  if (nodes.length) { 
    inStack.set(nodes[0].pc, 0)
    work.push(0) 
  }

  let max = 0
  while (work.length) {
    const i = work.pop()!
    const stIn = inStack.get(nodes[i].pc)!
    const stOut = nodes[i].delta(stIn)

    if (stOut > max) { 
      max = stOut
    }

    for (const npc of nodes[i].nextPCs) {
      const j = indexByPC.get(npc)
      if (j === undefined) {
        continue
      }

      const prev = inStack.get(nodes[j].pc)
      if (prev === undefined || prev < stOut) {
        inStack.set(nodes[j].pc, stOut)
        work.push(j)
      }
    }
  }

  return Math.max(1, max)
}