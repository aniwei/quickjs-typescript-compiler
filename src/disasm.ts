import { parseQuickJS } from './parseQuickJS'
import { OPCODE_META, OpCode } from './opcodes'
import { readFileSync } from 'node:fs'

function hex(b: number) { return b.toString(16).padStart(2, '0') }

export function disassemble(buf: Buffer, opts?: { showCFG?: boolean, dot?: boolean }): string {
  const fn = parseQuickJS(buf)
  const bc = fn.bytecode ?? new Uint8Array()
  const out: string[] = []

  out.push(`BC_VERSION=${fn.version} atoms=${fn.atoms.length} name=${fn.funcName}`)
  // first pass: collect jump targets
  const targets = new Set<number>()
  for (let pc = 0; pc < bc.length;) {
    const op = bc[pc]
    const meta = (OPCODE_META as any[])[op]
    if (!meta) break
    if (meta.imm && meta.imm.length > 0) {
      const sz = meta.imm[0].size
      if ((op === OpCode.OP_jmp || op === OpCode.OP_jmp_if_false) && sz > 0) {
        let val = 0
        for (let i = 0; i < sz; i++) val |= bc[pc + 1 + i] << (8 * i)
        if (sz === 2 && (val & 0x8000)) val = val - 0x10000
        const target = pc + meta.size + val
        if (target >= 0 && target < bc.length) targets.add(target)
      }
    }
    pc += meta.size
  }
  const labels = new Map<number, string>()
  Array.from(targets).sort((a,b)=>a-b).forEach((pc, i) => labels.set(pc, 'L'+i))

  // 可选：构建基本块与 CFG
  let blocks: Array<{ start: number; end: number; succ: number[] }> = []
  if (opts?.showCFG || opts?.dot) {
    const leaders = new Set<number>([0])
    for (let pc = 0; pc < bc.length;) {
      const op = bc[pc]
      const meta = (OPCODE_META as any[])[op]
      if (!meta) break
      if (op === OpCode.OP_jmp || op === OpCode.OP_jmp_if_false) {
        const sz = meta.imm?.[0]?.size ?? 0
        let val = 0
        for (let i = 0; i < sz; i++) val |= bc[pc + 1 + i] << (8 * i)
        if (sz === 2 && (val & 0x8000)) val = val - 0x10000
        const target = pc + meta.size + val
        leaders.add(target)
        // 条件跳转有 fallthrough，非条件跳转无
        if (op === OpCode.OP_jmp_if_false) leaders.add(pc + meta.size)
      }
      pc += meta.size
    }
    const leaderList = Array.from(leaders).sort((a,b)=>a-b)
    for (let i = 0; i < leaderList.length; i++) {
      const start = leaderList[i]
      const end = i + 1 < leaderList.length ? leaderList[i+1] : bc.length
      const succ: number[] = []
      // 找到该块内最后一条指令的起始 pc
      let lastPc = start
      for (let pc = start; pc < end;) {
        lastPc = pc
        const op = bc[pc]
        const meta = (OPCODE_META as any[])[op]
        if (!meta) break
        pc += meta.size
      }
      const lastOp = bc[lastPc]
      const lastMeta = (OPCODE_META as any[])[lastOp]
      if (lastMeta) {
        if (lastOp === OpCode.OP_jmp || lastOp === OpCode.OP_jmp_if_false) {
          const sz = lastMeta.imm?.[0]?.size ?? 0
          let val = 0
          for (let i = 0; i < sz; i++) val |= bc[lastPc + 1 + i] << (8 * i)
          if (sz === 2 && (val & 0x8000)) val = val - 0x10000
          const target = lastPc + lastMeta.size + val
          if (target >= 0 && target <= bc.length) succ.push(target)
          if (lastOp === OpCode.OP_jmp_if_false) {
            const fall = lastPc + lastMeta.size
            if (fall < bc.length) succ.push(fall)
          }
        } else if (lastOp === OpCode.OP_return_undef) {
          // 无后继
        } else {
          // 普通指令，后继为下一个块起点（即 end）
          if (end < bc.length) succ.push(end)
        }
      }
      blocks.push({ start, end, succ })
    }
  }

  for (let pc = 0; pc < bc.length;) {
    const op = bc[pc]
    const meta = (OPCODE_META as any[])[op]

    if (!meta) { 
      out.push(pc.toString().padStart(4)+' ??')
      break 
    }

    const lbl = labels.get(pc)
    if (lbl) {
      out.push(lbl + ':')
    }

    const bytes = [bc[pc]]
    let immStr = ''
    if (meta.imm && meta.imm.length > 0) {
      const sz = meta.imm[0].size
      for (let i = 0; i < sz; i++) {
         bytes.push(bc[pc + 1 + i])
      }
      let val = bytes.slice(1).reduce((a, b, i) => a | (b << (8 * i)), 0)
      // sign-extend for 16-bit jumps
      if ((op === OpCode.OP_jmp || op === OpCode.OP_jmp_if_false) && sz === 2 && (val & 0x8000)) val = val - 0x10000
      if (op === OpCode.OP_push_const) {
        const c = fn.constants[val]
        immStr = ` index=${val} (${JSON.stringify(c)})`
      } else if (op === OpCode.OP_jmp || op === OpCode.OP_jmp_if_false) {
        const target = pc + meta.size + val
        const lab = labels.get(target)
        immStr = ` off=${val} -> pc=${target}${lab?` (${lab})`:''}`
      } else {
        immStr = ' ' + meta.imm[0].name + '=' + val
      }
    }

    out.push(pc.toString().padStart(4) + ' ' + meta.name + '  ' + bytes.map(hex).join(' ') + immStr)
    pc += meta.size
  }
  if (opts?.dot && blocks.length) {
    out.push('\nDOT (CFG):')
    out.push(generateCFGDOT(blocks, labels))
  } else if (opts?.showCFG && blocks.length) {
    out.push('\nCFG:')
    for (const b of blocks) {
      const name = labels.get(b.start) ?? `B${b.start}`
      const succNames = b.succ.map(s => labels.get(s) ?? `B${s}`)
      out.push(`${name} -> ${succNames.join(', ')}`)
    }
  }

  return out.join('\n')
}

if (require.main === module) {
  const path = process.argv[2] || 'output.bin'
  const buf = readFileSync(path)
  const showCFG = process.argv.includes('--showCFG')
  const dot = process.argv.includes('--dot')
  console.log(disassemble(buf, { showCFG, dot }))
}

export function generateCFGDOT(blocks: Array<{ start: number; end: number; succ: number[] }>, labels: Map<number, string>): string {
  const lines: string[] = []
  lines.push('digraph CFG {')
  lines.push('  rankdir=TB;')
  for (const b of blocks) {
    const name = labels.get(b.start) ?? `B${b.start}`
    lines.push(`  "${name}" [label="${name}\\n[${b.start}, ${b.end})"];`)
  }
  for (const b of blocks) {
    const from = labels.get(b.start) ?? `B${b.start}`
    for (const s of b.succ) {
      const to = labels.get(s) ?? `B${s}`
      lines.push(`  "${from}" -> "${to}";`)
    }
  }
  lines.push('}')
  return lines.join('\n')
}
