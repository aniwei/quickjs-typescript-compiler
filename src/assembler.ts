import { writeFileSync } from 'node:fs'
import { writeUleb, writeSleb } from './leb128'
import { ConstValue } from './const'

/**
 * QuickJS-like 字节码序列化（quickjs-only）：
 *
 * 外层布局（与 JS_WriteObject2 写入顺序一致）：
 *   [BC_VERSION: u8]
 *   [atom_count: uleb]
 *   repeat atom_count x: [len: uleb][utf8 bytes]
 *   [FunctionBytecode: tag=0x13]
 *       u16 flags, u8 js_mode, func_name(atom)
 *       uleb arg_count, uleb var_count, uleb defined_arg_count, uleb stack_size
 *       uleb closure_var_count, uleb cpool_count, uleb byte_code_len
 *       uleb vardefs_count
 *       repeat vardefs_count x: [var_name(atom)][scope_level: uleb][scope_next+1: uleb][flags: u8]
 *       repeat closure_var_count x: [name(atom)][varIdx: uleb][flags: u8]
 *       [bytecode bytes...]
 *       if (flags.has_debug): [filename(atom)][pc2line_len: uleb][pc2line bytes][source_len: uleb][source bytes]
 *       repeat cpool_count x: [const_tag: u8][payload...]
 *
 * 关键对齐点：
 * - first_atom 模拟：QuickJS 运行时通过 first_atom 偏移编码原子引用。我们在文件中不显式写 first_atom，
 *   但对原子引用使用 (JS_ATOM_END_SIM + idx) << 1 编码（其中 JS_ATOM_END_SIM=1<<24 作为占位大偏移），
 *   解析时再减去该偏移得到真实的本地 atom 索引。对十进制数字串使用 tagged-int ((n<<1)|1)。
 * - pc2line：当前按每条指令生成一个扩展条目 op=0，pc_delta=该指令字节长度，line/col delta=0。
 * - js_mode：最低位表示 strict，可由 debug.strict 控制。
 * - 常量池：支持 null/undefined/bool/int32/float64/string（后续可扩展 BigInt/对象等）。
 * - 闭包变量：支持直接传入 closureVars；若未提供且存在 localsMap + capturedLocals，则自动合成 closureVars（isLocal/isLexical=true）。
 */

export interface SerializedModule {
  buffer: Buffer
}

interface ClosureVar {}

interface SerializeOptions {
  code: number[]
  constants: ConstValue[]
  atoms: string[]
  localCount: number
  stackSize: number
  debug?: { 
    filename?: string; 
    strict?: boolean; 
    embedSource?: boolean; 
    sourceText?: string 
  }
  localsMap?: Record<string, number>
  capturedLocals?: string[]
  closureVars?: { 
    name: string; 
    varIdx: number; 
    isConst?: boolean; 
    isLexical?: boolean; 
    isArg?: boolean; 
    isLocal?: boolean; 
    varKind?: number 
  }[]
}

export class Assembler {

  write (mod: SerializedModule, path: string) {
    writeFileSync(path, mod.buffer)
  }

  // Realistic QuickJS-like serialization (subset) replicating JS_WriteObject2 order.
  // NOTE: This is still a reimplementation; not all tags covered. Focus on FunctionBytecode + atom table.
  // 新增支持: localsMap + capturedLocals -> 自动合成 closureVars (除非显式提供 closureVars 覆盖)
  serializeQuickJS (p: SerializeOptions): SerializedModule {
    const ctx = this.createContext(p)
    const fnBody: number[] = []
    this.writeFunctionTag(fnBody, ctx)
    this.writeHeaderCounts(fnBody, ctx)
    this.writeVarDefs(fnBody, ctx)
    this.writeClosureVars(fnBody, ctx)
    this.writeBytecode(fnBody, ctx)
    if (ctx.debug) this.writeDebugBlock(fnBody, ctx)
    this.writeConststants(fnBody, ctx)
    const atomsSection = this.buildAtomSection(ctx)
    const out = Buffer.from([...atomsSection, ...fnBody])
    return { buffer: out }
  }

  private createContext(p: any) {
    const { code, constants, atoms, localCount, stackSize, debug } = p
    let { closureVars = [] } = p
    const useBigNum = !!process.env.ENABLE_BIGNUM || (debug as any)?.bignum
    const BC_VERSION = useBigNum ? 0x45 : 5
    const debugFilename = debug?.filename || 'input.ts'
    const atomList = atoms.slice()

    if (debug && !atomList.includes(debugFilename)) {
      atomList.push(debugFilename)
    }
    
    const atomIndexMap = new Map<string, number>()
    atomList.forEach((a: string, i: number) => atomIndexMap.set(a, i))
    const JS_ATOM_END_SIM = 1 << 24
    
    // 如果未显式提供 closureVars 但给出了 capturedLocals + localsMap，则自动合成
    if (!closureVars.length && p.capturedLocals && p.capturedLocals.length && p.localsMap) {
      closureVars = p.capturedLocals.filter((n: string) => n in p.localsMap!)
        .map((n: string) => ({
          name: n,
          varIdx: p.localsMap![n],
          isLocal: true,
          isLexical: true,
          isConst: false,
          varKind: 0
        }))
    }

    return {
      code: [...code],
      constants,
      atoms: atomList,
      atomIndexMap,
      localCount,
      stackSize,
      debug,
      closureVars,
      version: BC_VERSION,
      jsAtomEndSim: JS_ATOM_END_SIM,
      // BC_VERSION,
      // JS_ATOM_END_SIM,
      debugFilename
    }
  }

  private putAtomRef(dst: number[], name: string, ctx: any) {
    if (/^(?:0|[1-9][0-9]*)$/.test(name)) {
      const num = Number(name)
      if (num >= 0 && num <= 0x7fffffff) { writeUleb(dst, (num << 1) | 1); return }
    }
    const idx = ctx.atomIndexMap.get(name)
    if (idx === undefined) throw new Error('missing atom: '+name)
  writeUleb(dst, (ctx.jsAtomEndSim + idx) << 1)
  }

  private buildFlags(ctx: any) {
    const d = ctx.debug
    let f = 0
    const setBit = (b:number,on?:boolean)=>{ if(on) f |= (1<<b) }
    setBit(1, true) // has_simple_parameter_list
    setBit(6, true) // new_target_allowed
    setBit(9, true) // arguments_allowed
    setBit(10, !!d)
    return f & 0xffff
  }

  private writeFunctionTag(out:number[], ctx:any){
    const BC_TAG_FUNCTION_BYTECODE = 0x13
    out.push(BC_TAG_FUNCTION_BYTECODE)
    const flags = this.buildFlags(ctx)
    out.push(flags & 0xff, (flags>>>8)&0xff)
    const jsMode = ctx.debug?.strict ? 0x01 : 0x00
    out.push(jsMode)
    // func name
    let funcName = ctx.atoms[0] || ''
    if (ctx.debugFilename) {
      const base = ctx.debugFilename.replace(/\\/g,'/').split('/').pop()!
      const dot = base.lastIndexOf('.')
      const stem = dot>=0?base.slice(0,dot):base
      if (stem) funcName = stem
      if (!ctx.atomIndexMap.has(funcName)) { ctx.atoms.push(funcName); ctx.atomIndexMap.set(funcName, ctx.atoms.length-1) }
    }
    this.putAtomRef(out, funcName, ctx)
  }

  private remapBytecodeAtoms(ctx:any){
    const remap = [...ctx.code]
    try {
      const { OPCODE_LOOKUP } = require('./opcodes')
      for (let pc=0; pc<remap.length;){
        const op = remap[pc]; const meta = OPCODE_LOOKUP[op]; if(!meta) break
        if (meta.fmt === 'atom') {
          const off = pc+1
          const v = remap[off] | (remap[off+1]<<8) | (remap[off+2]<<16) | (remap[off+3]<<24)
          const mapped = (ctx.JS_ATOM_END_SIM + v) >>>0
          remap[off]=mapped &0xff; remap[off+1]=(mapped>>8)&0xff; remap[off+2]=(mapped>>16)&0xff; remap[off+3]=(mapped>>24)&0xff
        }
        pc += meta.size
      }
    } catch {}
    ctx.remappedCode = remap
  }

  private writeHeaderCounts(out:number[], ctx:any){
    this.remapBytecodeAtoms(ctx)
    const argCount=0, varCount=ctx.localCount, definedArgCount=0
    const closureVarCount = ctx.closureVars.length
    const cpoolCount = ctx.constants.length
    const byteCodeLen = ctx.remappedCode.length
    writeUleb(out,argCount); writeUleb(out,varCount); writeUleb(out,definedArgCount); writeUleb(out,ctx.stackSize)
    writeUleb(out,closureVarCount); writeUleb(out,cpoolCount); writeUleb(out,byteCodeLen)
    ctx._vardefsCount = varCount + argCount
  }

  private writeVarDefs(out:number[], ctx:any){
    writeUleb(out, ctx._vardefsCount)
    for (let i=0;i<ctx._vardefsCount;i++){
      const vname = 'v'+i
      if (!ctx.atomIndexMap.has(vname)) { ctx.atoms.push(vname); ctx.atomIndexMap.set(vname, ctx.atoms.length-1) }
      this.putAtomRef(out,vname,ctx)
      writeUleb(out,0); writeUleb(out,1) // scope_level, scope_next+1
      const var_kind=0,is_const=0,is_lexical=1,is_captured=0
      const flagsByte = (var_kind &0x0f)|(is_const<<4)|(is_lexical<<5)|(is_captured<<6)
      out.push(flagsByte)
    }
  }

  private writeClosureVars(out:number[], ctx:any){
    for (const cv of ctx.closureVars){ if(!ctx.atomIndexMap.has(cv.name)){ ctx.atoms.push(cv.name); ctx.atomIndexMap.set(cv.name, ctx.atoms.length-1) } }
    for (const cv of ctx.closureVars){
      this.putAtomRef(out, cv.name, ctx)
      writeUleb(out, cv.varIdx>>>0)
      const is_local=cv.isLocal?1:0, is_arg=cv.isArg?1:0, is_const=cv.isConst?1:0, is_lexical=cv.isLexical!==false?1:0, var_kind=(cv.varKind??0)&0x0f
      const flags = is_local | (is_arg<<1) | (is_const<<2) | (is_lexical<<3) | (var_kind<<4)
      out.push(flags)
    }
  }

  private writeBytecode(out:number[], ctx:any){ out.push(...ctx.remappedCode) }

  private buildPc2Line(ctx:any){
    const pc2:number[]=[]
    const firstLine=1, firstCol=1
    writeUleb(pc2, firstLine-1); writeUleb(pc2, firstCol-1)
    if (ctx.remappedCode.length){
      try { const { OPCODE_LOOKUP } = require('./opcodes'); for (let pc=0; pc<ctx.remappedCode.length;){ const op=ctx.remappedCode[pc]; const meta=OPCODE_LOOKUP[op]; if(!meta) break; pc2.push(0); writeUleb(pc2, meta.size); writeSleb(pc2,0); writeSleb(pc2,0); pc+=meta.size } }
      catch { pc2.push(0); writeUleb(pc2, ctx.remappedCode.length); writeSleb(pc2,0); writeSleb(pc2,0) }
    }
    return pc2
  }

  private writeDebugBlock(out:number[], ctx:any){
    this.putAtomRef(out, ctx.debugFilename, ctx)
    const pc2 = this.buildPc2Line(ctx)
    writeUleb(out, pc2.length)
    out.push(...pc2)
    if (ctx.debug?.embedSource){
      const buf = Buffer.from(ctx.debug.sourceText ?? '')
      writeUleb(out, buf.length)
      for (const b of buf) {
        out.push(b)
      }
    } else { 
      writeUleb(out,0) 
    }
  }

  private writeConststants(out:number[], ctx:any){
    for (const v of ctx.constants) {
      this.writeConstObject(out, v)
    }
  }

  private writeConstObject(out:number[], v:any){
    const BC_TAG_NULL=1, BC_TAG_UNDEFINED=2, BC_TAG_BOOL_FALSE=3, BC_TAG_BOOL_TRUE=4, BC_TAG_INT32=5, BC_TAG_FLOAT64=6, BC_TAG_STRING=7
    if (v===null) out.push(BC_TAG_NULL)
    else if (v===undefined) out.push(BC_TAG_UNDEFINED)
    else if (v===true) out.push(BC_TAG_BOOL_TRUE)
    else if (v===false) out.push(BC_TAG_BOOL_FALSE)
    else if (typeof v==='number'){
      if (Number.isInteger(v) && v>=-0x80000000 && v<=0x7fffffff){ out.push(BC_TAG_INT32); writeSleb(out, v|0) }
      else { out.push(BC_TAG_FLOAT64); const buf=Buffer.allocUnsafe(8); (buf as any).writeDoubleLE(v,0); for (const b of buf) out.push(b) }
    } else if (typeof v==='string') {
      out.push(BC_TAG_STRING); const utf8=Buffer.from(v,'utf8'); writeUleb(out, utf8.length); for (const b of utf8) out.push(b)
    } else { throw new Error('unsupported constant type: '+String(v)) }
  }

  private buildAtomSection(ctx:any){
  const section:number[]=[]; section.push(ctx.version); writeUleb(section, ctx.atoms.length)
    for (const a of ctx.atoms){ const utf8=Buffer.from(a,'utf8'); writeUleb(section, utf8.length); for (const b of utf8) section.push(b) }
    return section
  }
}

export function writeModule (mod: SerializedModule, path: string) {
  new Assembler().write(mod, path)
}

export function serializeQuickJS (p: {
  code: number[]
  constants: ConstValue[]
  atoms: string[]
  localCount: number
  stackSize: number
  debug?: { filename?: string; strict?: boolean; embedSource?: boolean; sourceText?: string }
  localsMap?: Record<string, number>
  capturedLocals?: string[]
  closureVars?: { name: string; varIdx: number; isConst?: boolean; isLexical?: boolean; isArg?: boolean; isLocal?: boolean; varKind?: number }[]
}) {
  return new Assembler().serializeQuickJS(p)
}