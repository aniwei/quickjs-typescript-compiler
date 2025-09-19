import { parseQuickJS } from './parseQuickJS'
import { OPCODE_META, OpCode } from './opcodes'
import { QJS_OPCODE_META } from './qjs_opcodes'
import { readFileSync } from 'node:fs'
import { readFileSync as readFileSyncFs } from 'node:fs'

function hex(b: number) { 
  return b.toString(16).padStart(2, '0') 
}

function readImmLE(
  bytes: Uint8Array, 
  start: number, 
  size: number, 
  signed = false
): number {
  let v = 0
  let mul = 1

  for (let i = 0; i < size; i++) {
    v += bytes[start + i] * mul
    mul *= 256
  }

  if (signed) {
    if (size === 2 && v >= 0x8000) v -= 0x10000
    if (size === 4 && v >= 0x80000000) v -= 0x100000000
  }
  return v
}

function readUlebFromBuf(b: Uint8Array, ref: { off: number }): number {
  let v = 0
  let shift = 0

  for (;;) {
    const byte = b[ref.off++]
    v |= (byte & 0x7f) << shift
    if ((byte & 0x80) === 0) break
    shift += 7
  }

  return v >>> 0
}

function readSlebFromBuf(b: Uint8Array, ref: { off: number }): number {
  let result = 0
  let shift = 0
  let byte = 0

  for (;;) {
    byte = b[ref.off++]
    result |= (byte & 0x7f) << shift
    shift += 7
    if ((byte & 0x80) === 0) break
  }

  // sign extend
  if (shift < 32 && (byte & 0x40)) result |= (~0 << shift)

  return result | 0
}

function decodePc2Line(pc2: Uint8Array): Array<{ pc: number, line: number, col: number, diff_pc: number, diff_line: number, diff_col: number, kind: 'short'|'long' }>{
  const r = { off: 0 }
  const firstLine0 = readUlebFromBuf(pc2, r)
  const firstCol0 = readUlebFromBuf(pc2, r)
  let line = firstLine0 + 1
  let col = firstCol0 + 1
  let pc = 0
  const events: Array<{ pc: number, line: number, col: number, diff_pc: number, diff_line: number, diff_col: number, kind: 'short'|'long' }> = []
  const PC2LINE_BASE = -1, PC2LINE_RANGE = 5, PC2LINE_OP_FIRST = 1

  while (r.off < pc2.length) {
    const b0 = pc2[r.off++]
    let diff_pc = 0
    let diff_line = 0
    let kind: 'short' | 'long'

    if (b0 === 0) {
      diff_pc = readUlebFromBuf(pc2, r)
      diff_line = readSlebFromBuf(pc2, r)
      kind = 'long'
    } else {
      const op = b0 - PC2LINE_OP_FIRST
      const dq = Math.floor(op / PC2LINE_RANGE)
      const dr = op % PC2LINE_RANGE

      diff_pc = dq
      diff_line = dr + PC2LINE_BASE
      kind = 'short'
    }

    const diff_col = readSlebFromBuf(pc2, r)
    pc += diff_pc
    line += diff_line
    col += diff_col
    events.push({ pc, line, col, diff_pc, diff_line, diff_col, kind })
  }

  return events
}

export function disassemble(buf: Buffer, opts?: { showCFG?: boolean, dot?: boolean, labelComments?: Record<string, 'loop-start'|'loop-end'|'loop-continue'>, pcAnnotations?: Record<number, string>, printPc2Line?: boolean, useQjsMeta?: boolean }): string {
  const fn = parseQuickJS(buf)
  const bc = fn.bytecode ?? new Uint8Array()
  const out: string[] = []

  out.push(`BC_VERSION=${fn.version} atoms=${fn.atoms.length} name=${fn.funcName}`)

  if (opts?.printPc2Line && fn.pc2line) {
    out.push(`PC2LINE: file=${fn.debugFilename ?? ''}`)
    const events = decodePc2Line(fn.pc2line)
    events.forEach((e, i) => {
      out.push(`  #${i} pc=${e.pc} line=${e.line} col=${e.col}  [dpc=${e.diff_pc} dln=${e.diff_line} dcol=${e.diff_col} ${e.kind}]`)
    })
  }

  // first pass: collect jump targets
  const META = (opts?.useQjsMeta ? (QJS_OPCODE_META as any[]) : (OPCODE_META as any[]))
  const targets = new Set<number>()
  for (let pc = 0; pc < bc.length;) {
    const op = bc[pc]
    const meta = META[op]

    if (!meta) break
    
    if (meta.imm && meta.imm.length > 0) {
      const sz = meta.imm[0].size

      if ((op === OpCode.OP_goto || op === OpCode.OP_if_false) && sz > 0) {
        const val = readImmLE(bc, pc + 1, sz, true)
        const target = pc + meta.size + val

        if (target >= 0 && target < bc.length) targets.add(target)
      }
    }

    pc += meta.size
  }

  const labels = new Map<number, string>()
  Array.from(targets).sort((a, b) => a - b).forEach((pc, i) => labels.set(pc, 'L'+i))

  // 可选：构建基本块与 CFG
  let blocks: Array<{ start: number; end: number; succ: number[] }> = []
  if (opts?.showCFG || opts?.dot) {
  const leaders = new Set<number>([0])

    for (let pc = 0; pc < bc.length;) {
      const op = bc[pc]
  const meta = META[op]
      
      if (!meta) break
      if (op === OpCode.OP_goto || op === OpCode.OP_if_false) {
        const sz = meta.imm?.[0]?.size ?? 0
        const val = readImmLE(bc, pc + 1, sz, true)
        const target = pc + meta.size + val

        leaders.add(target)
        // 条件跳转有 fallthrough，非条件跳转无
        if (op === OpCode.OP_if_false) leaders.add(pc + meta.size)
      }
      pc += meta.size
    }
    
    const leaderList = Array.from(leaders).sort((a, b) => a - b)

    for (let i = 0; i < leaderList.length; i++) {
      const start = leaderList[i]
      const end = i + 1 < leaderList.length ? leaderList[i + 1] : bc.length
      const succ: number[] = []
      // 找到该块内最后一条指令的起始 pc
      let lastPc = start

      for (let pc = start; pc < end;) {
        lastPc = pc
        const op = bc[pc]
  const meta = META[op]
        if (!meta) break
        pc += meta.size
      }

      const lastOp = bc[lastPc]
  const lastMeta = META[lastOp]

      if (lastMeta) {
        if (lastOp === OpCode.OP_goto || lastOp === OpCode.OP_if_false) {
          const sz = lastMeta.imm?.[0]?.size ?? 0
          const val = readImmLE(bc, lastPc + 1, sz, true)
          const target = lastPc + lastMeta.size + val

          if (target >= 0 && target <= bc.length) succ.push(target)
            if (lastOp === OpCode.OP_if_false) {
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
  const meta = META[op]

    if (!meta) { 
      out.push(pc.toString().padStart(4)+' ??')
      break 
    }

    const lbl = labels.get(pc)
    if (lbl) {
      const kindByName = opts?.labelComments?.[lbl]
      const kindByPc = opts?.pcAnnotations?.[pc]
      const note = kindByPc || kindByName
      out.push(lbl + ':' + (note ? `  ; ${note}` : ''))
    }

    const bytes = [bc[pc]]
    let immStr = ''
    if (meta.imm && meta.imm.length > 0) {
      const sz = meta.imm[0].size

      for (let i = 0; i < sz; i++) {
         bytes.push(bc[pc + 1 + i])
      }

      const signed = (op === OpCode.OP_goto || op === OpCode.OP_if_false)
      let val = readImmLE(bc, pc + 1, sz, signed)

      if (op === OpCode.OP_push_const) {
        const c = fn.constants[val]
        immStr = ` index=${val} (${JSON.stringify(c)})`
      } else if (op === OpCode.OP_goto || op === OpCode.OP_if_false) {
        const target = pc + meta.size + val
        const lab = labels.get(target)
        const annByName = lab && opts?.labelComments?.[lab] ? ` ; ${opts?.labelComments?.[lab]}` : ''
        const annByPc = opts?.pcAnnotations?.[target] ? ` ; ${opts?.pcAnnotations?.[target]}` : ''
        
        immStr = ` off=${val} -> pc=${target}${lab?` (${lab})`:''}${annByName || annByPc}`
      } else if (op === OpCode.OP_define_field || op === OpCode.OP_get_field2) {
        // 现在字节码中的立即数是 first_atom + idx（无符号32位）
        const firstAtom =  computeFirstAtomSafe()
        const raw = (val >>> 0)
        const idx = raw - firstAtom
        const name = (idx >= 0 && idx < fn.atoms.length) ? (fn.atoms[idx] ?? `atom#${idx}`) : `atom#${idx}`
        immStr = ` atom=${val} (${name})`
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

function computeFirstAtomSafe(): number {
  try {
    const path = require('node:path').resolve(process.cwd(), 'cpp/QuickJS/include/QuickJS/quickjs-atom.h')
    const text = readFileSyncFs(path, 'utf8')
    const count = (text.match(/\bDEF\s*\(/g) || []).length
    return (count + 1) >>> 0
  } catch {
    return 512
  }
}
