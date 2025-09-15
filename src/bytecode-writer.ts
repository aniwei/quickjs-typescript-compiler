import { AtomTable } from './atoms'
import { FunctionIR, ConstEntry } from './ir'
import { BufferWriter } from './utils'
import { BYTECODE_MAGIC, BYTECODE_VERSION, FUN_KIND_BYTECODE, FUN_KIND_MODULE } from './op'

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
    const body = this.writeFunctionOrModule(ir)
    w.u32(body.length)
    w.raw(body)

    return { 
      buffer: w.concat() 
    }
  }

  private writeFunctionOrModule(ir: FunctionIR): Buffer {
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
    w.u32(ir.constPool.list.length)
    for (const c of ir.constPool.list) {
      this.writeConst(w, c)
    }

    // Closures
    w.u32(ir.closures.length)
    for (const c of ir.closures) {
      w.u8(c.isVar ? 1 : 0)
      w.u32(c.idx >>> 0)
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
    w.u8(1) // compressed flag
    if (ir.pc2loc.length === 0) {
      w.u32(0)
    } else {
      const entries = compressPC2Loc(ir)
      w.u32(entries.length)
      for (const e of entries) {
        w.i32(e.pc_delta)
        w.i32(e.line_delta)
        w.i32(e.column)
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

  private writeConst(w: BufferWriter, c: ConstEntry) {
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