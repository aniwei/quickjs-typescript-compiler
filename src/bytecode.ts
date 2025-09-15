import { AtomTable } from './atoms'
import { FunctionIR, ConstEntry } from './ir'
import { BufferWriter } from './buffer'
import { BYTECODE_MAGIC, BYTECODE_VERSION, FUN_KIND_BYTECODE, FUN_KIND_MODULE } from './env'

export interface BytecodeBundle { 
  buffer: Buffer 
}

export class BytecodeWriter {
  constructor(private atoms: AtomTable) {}

  writeTop(ir: FunctionIR): BytecodeBundle {
    const w = new BufferWriter()
    w.u32(BYTECODE_MAGIC)
    w.u32(BYTECODE_VERSION)
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

  // 额外形态标志位（非 QuickJS 标准，仅内部自描述，可在 reader 端使用）
  let extraFlags = 0
  if (ir.isAsync) extraFlags |= 1 << 0
  if (ir.isGenerator) extraFlags |= 1 << 1
  if (ir.isArrow) extraFlags |= 1 << 2
  w.u32(extraFlags >>> 0)

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
    if (c.isVar) flags |= 1 << 0
    if (c.isLocal) flags |= 1 << 1
    if (c.isArg) flags |= 1 << 2
    if (c.isConst) flags |= 1 << 3
    if (c.isLexical) flags |= 1 << 4
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

  // pc2loc compressed + columns
  const emitPC2Loc = ir.debug.emitPC2Loc !== false
  const emitCols = ir.debug.emitColumns !== false
  w.u8(emitPC2Loc ? 1 : 0) // compressed flag
  if (!emitPC2Loc || ir.pc2loc.length === 0) {
    w.u32(0)
  } else {
    const entries = compressPC2Loc(ir)
    w.u32(entries.length)
    for (const e of entries) {
      w.i32(e.pc_delta)
      w.i32(e.line_delta)
      if (emitCols) w.i32(e.column); else w.i32(0)
    }
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