import { AtomTable } from './atoms'
import { FunctionIR, ConstEntry } from './ir'
import { BufferWriter } from './buffer'
import { BYTECODE_VERSION, FUN_KIND_BYTECODE, FUN_KIND_MODULE } from './env'

export interface BytecodeBundle { 
  buffer: Buffer 
}

export class BytecodeWriter {
  constructor(private atoms: AtomTable) {}

  writeTop(ir: FunctionIR): BytecodeBundle {
    const w = new BufferWriter()
    w.u8(BYTECODE_VERSION)
    this.atoms.writeTo(w)
    // 1=function/script, 2=module
    w.u8(ir.isModule ? 2 : 1)
    const body = writeFunctionOrModule(ir)
    w.u32(body.length)
    w.raw(body)

    return { 
      buffer: w.concat() 
    }
  }
}

function writeConstant(w: BufferWriter, c: ConstEntry) {
  switch (c.kind) {
    case 'number':
      w.u8(0)
      w.f64(c.num ?? 0)
      break
    case 'string': {
      w.u8(1)
      const b = Buffer.from(String(c.data ?? ''), 'utf8')
      w.u32(b.length)
      w.raw(b)
      break
    }
    case 'function': {
      w.u8(2)
      const fb = c.data as Buffer
      w.u32(fb.length)
      w.raw(fb)
      break
    }
    case 'atom':
      w.u8(3)
      w.u32(c.atomId ?? 0)
      break
    default:
      throw new Error('Unknown const kind')
  }
}

export function writeFunctionOrModule(ir: FunctionIR): Buffer {
  const w = new BufferWriter()

  // Header (align with common bc_write_function layout)
  w.u8(ir.isModule ? FUN_KIND_MODULE : FUN_KIND_BYTECODE)
  w.u32(ir.flags >>> 0)
  w.u32(ir.argCount >>> 0)
  w.u32(ir.varCount >>> 0)
  w.u32(ir.definedArgCount >>> 0)
  w.u32(ir.stackSize >>> 0)

  // Bytecode
  const bc = Buffer.from(ir.bytecode)
  w.u32(bc.length)
  w.raw(bc)

  // Const pool
  w.u32(ir.ConstantList.list.length)
  for (const c of ir.ConstantList.list) {
    writeConstant(w, c)
  }

  // Closures
  w.u32(ir.closures.length)
  for (const c of ir.closures) {
    // 写入扩展闭包信息（向后兼容）：
    // layout: u8(flags) u32(idx) [u32(nameAtom)?]
    // flags: bit0=isVar(legacy) bit1=isLocal bit2=isArg bit3=isConst bit4=isLexical
    // lower 3 bits of kind: var=0 let=1 const=2
    let flags = 0
    if (c.isVar) {
      flags |= 1 << 0
    }

    if (c.isLocal) {
      flags |= 1 << 1
    }
    
    if (c.isArg) {
      flags |= 1 << 2
    }
    if (c.isConst) {
      flags |= 1 << 3
    }
    if (c.isLexical) {
      flags |= 1 << 4
    }
    const kindBits = c.varKind === 'const' ? 2 : (c.varKind === 'let' ? 1 : 0)
    flags |= (kindBits & 0x7) << 5
    w.u8(flags)
    w.u32(c.idx >>> 0)
    w.u8(c.nameAtom ? 1 : 0)
    if (c.nameAtom) w.u32(c.nameAtom >>> 0)
  }

  // Var refs
  w.u32(ir.varRefs.length)
  for (const vr of ir.varRefs) {
    w.u32(vr.nameAtom >>> 0)
    w.u8(vr.fromParentIsVar ? 1 : 0)
    w.u32(vr.fromParentIndex >>> 0)
  }

  // Exceptions
  w.u32(ir.exceptions.length)
  for (const ex of ir.exceptions) {
    w.u32(ex.start_pc >>> 0)
    w.u32(ex.end_pc >>> 0)
    w.u32(ex.target_pc >>> 0)
  }

  // pc2line: QuickJS 压缩格式
  // 参考 quickjs.c: compute_pc2line_info 写入：
  //  - 先写函数起始行(line0-1)与列(col0-1)（unsigned LEB128）
  //  - 对每个条目写 delta：若满足短编码窗口，则写单字节(op)；否则写 0，再写 diff_pc(ULEB128)、diff_line(SLEB128)
  //  - 总是追加 diff_col(SLEB128)
  const emitPC2Loc = !ir.debug.stripDebug && (ir.debug.emitPC2Loc !== false)
  const emitCols = ir.debug.emitColumns !== false
  if (!emitPC2Loc || ir.pc2loc.length === 0) {
    w.u32(0) // pc2line length = 0
  } else {
    const sorted = [...ir.pc2loc].sort((a,b)=>a.pc-b.pc)
    // 函数基线：取第一条记录作为函数定义位置
    const line0 = Math.max(1, sorted[0].line) - 1
    const col0  = Math.max(1, (emitCols ? sorted[0].column : 1)) - 1

    // 先写一个占位的缓冲，收集 pc2line 内容
    const pw = new BufferWriter()
    pw.leb128(line0)
    pw.leb128(col0)

    let last_pc = 0
    let last_line = line0 + 1
    let last_col  = col0 + 1

    // QuickJS 窗口参数
    const PC2LINE_BASE = -1
    const PC2LINE_RANGE = 5
    const PC2LINE_OP_FIRST = 1
    const PC2LINE_DIFF_PC_MAX = Math.floor((255 - PC2LINE_OP_FIRST) / PC2LINE_RANGE)

    for (let i = 0; i < sorted.length; i++) {
      const cur = sorted[i]
      const diff_pc = cur.pc - last_pc
      const diff_line = cur.line - last_line
      const diff_col = (emitCols ? cur.column : last_col) - last_col

      if (diff_line === 0 && diff_col === 0) {
        // 跳过纯 pc 移动且无行列变化的项
        last_pc = cur.pc
        continue
      }

      // 短编码判定
      if (diff_line >= PC2LINE_BASE && diff_line < PC2LINE_BASE + PC2LINE_RANGE && diff_pc <= PC2LINE_DIFF_PC_MAX && diff_pc >= 0) {
        const op = (diff_line - PC2LINE_BASE) + diff_pc * PC2LINE_RANGE + PC2LINE_OP_FIRST
        pw.u8(op)
      } else {
        pw.u8(0)
        pw.leb128(diff_pc >>> 0)
        pw.sleb128(diff_line | 0)
      }
      pw.sleb128(diff_col | 0)

      last_pc = cur.pc
      last_line = cur.line
      last_col = emitCols ? cur.column : last_col
    }

    const pc2 = pw.concat()
    w.u32(pc2.length)
    w.raw(pc2)
  }

  // Names
  w.u32(ir.paramNameAtoms.length)
  for (const a of ir.paramNameAtoms) {
    w.u32(a >>> 0)
  }

  w.u32(ir.localNameAtoms.length)
  for (const a of ir.localNameAtoms) {
    w.u32(a >>> 0)
  }

  // Debug IDs
  w.u8(ir.functionNameAtomId ? 1 : 0)
  if (ir.functionNameAtomId) {
    w.u32(ir.functionNameAtomId >>> 0)
  }
  
  w.u8(ir.filenameAtomId ? 1 : 0)
  if (ir.filenameAtomId) {
    w.u32(ir.filenameAtomId >>> 0)
  }

  // 可选：内嵌源码（与 debug.stripDebug 相斥）
  const embedSource = !!ir.debug.embedSource && !ir.debug.stripDebug
  w.u8(embedSource ? 1 : 0)
  if (embedSource && ir.sourceText != null) {
    const sb = Buffer.from(ir.sourceText, 'utf8')
    w.u32(sb.length)
    w.raw(sb)
  } else {
    w.u32(0)
  }

  // Module tables
  if (ir.isModule) {
    w.u32(ir.imports.length)
    for (const im of ir.imports) {
      w.u32(im.moduleRequestAtom >>> 0)
      w.u32(im.importNameAtom >>> 0)
      w.u32(im.localNameAtom >>> 0)
      w.u8(im.isNamespace ? 1 : 0)
      w.u8(im.isAll ? 1 : 0)
    }
    w.u32(ir.exports.length)
    for (const ex of ir.exports) {
      w.u32(ex.localNameAtom >>> 0)
      w.u32(ex.exportNameAtom >>> 0)
      w.u8(ex.isReExport ? 1 : 0)
      if (ex.isReExport) {
        w.u32(ex.fromModuleAtom! >>> 0)
      }
    }
  }

  return w.concat()
}

type Out = { 
  pc_delta: number
  line_delta: number
  column: number 
}

function compressPC2Loc(ir: FunctionIR): Out[] {
  const out: Out[] = []
  const sorted = [...ir.pc2loc].sort((a,b)=>a.pc-b.pc)
  let prevPC = 0, prevLine = 0

  for (let i = 0; i < sorted.length; i++) {
    const e = sorted[i]
    const pc_delta = (i === 0) ? e.pc : e.pc - prevPC
    const line_delta = (i === 0) ? e.line : e.line - prevLine
    out.push({ pc_delta, line_delta, column: e.column })
    prevPC = e.pc
    prevLine = e.line
  }

  return out
}