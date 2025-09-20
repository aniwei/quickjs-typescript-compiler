import { writeFileSync } from 'node:fs'
import { writeUleb, writeSleb } from './leb128'
import { ConstValue } from './const'
import { FIRST_ATOM } from './env'
import { OPCODE_LOOKUP } from './opcodes'

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


interface DebugOptions { 
  filename?: string
  strict?: boolean
  embedSource?: boolean
  sourceText?: string,
  bignum?: boolean
}

interface SourceMark { 
  pc: number
  line: number
  col: number 
}

interface ClosureVar {
  name: string
  varIdx: number
  isConst?: boolean
  isLexical?: boolean
  isArg?: boolean
  isLocal?: boolean
  varKind?: number
}

interface ContextOptions {
  code: number[]
  constants: ConstValue[]
  atoms: string[]
  localCount: number
  stackSize: number
  sourceMarks?: Array<SourceMark>
  debug?: DebugOptions
  localsMap?: Record<string, number>
  localKindsMap?: Record<string, 'var' | 'let' | 'const'>
  capturedLocals?: string[]
  closureVars?: ClosureVar[]
  functionName?: string
  argCount?: number
  definedArgCount?: number
  // When provided, the created context will share the parent's atom table and index map
  // so that nested functions contribute atoms to the same global atom section.
  parentCtx?: Context
}

interface Context {
  code: number[]
  constants: ConstValue[]
  atoms: string[]
  oldAtoms: string[]
  atomIndexMap: Map<string, number>
  localCount: number
  stackSize: number
  debug?: DebugOptions
  closureVars: ClosureVar[]
  localsMap?: Record<string, number>
  localKindsMap?: Record<string, 'var' | 'let' | 'const'>
  capturedLocals?: string[]
  remappedCode: number[]
  vardefsCount: number
  version: number
  firstAtom: number
  sourceMarks: SourceMark[]
  // BC_VERSION,
  // JS_ATOM_END_SIM,
  debugFilename: string
  funcName?: string
  argCount: number
  definedArgCount: number
}

interface SerializedFunction {
  name: string
  code: number[]
  constants: ConstValue[]
  atoms: string[]
  localCount: number
  stackSize: number
}

export interface SerializedModule {
  buffer: Buffer
}

export class Assembler {
  write (mod: SerializedModule, path: string) {
    writeFileSync(path, mod.buffer)
  }

  // Realistic QuickJS-like serialization (subset) replicating JS_WriteObject2 order.
  // NOTE: This is still a reimplementation; not all tags covered. Focus on FunctionBytecode + atom table.
  // 新增支持: localsMap + capturedLocals -> 自动合成 closureVars (除非显式提供 closureVars 覆盖)
  serialize (p: ContextOptions): SerializedModule {
    const ctx = this.createContext(p)
    const fnBody: number[] = []

  // Attach parent context on the buffer handle for nested constant serialization
  ;(fnBody as any).__parentCtx = ctx
  this.writeFunctionTag(fnBody, ctx)
    this.writeHeaderCounts(fnBody, ctx)
    this.writeVarDefs(fnBody, ctx)
    this.writeClosureVars(fnBody, ctx)
    this.writeBytecode(fnBody, ctx)
    
  // 允许通过环境变量禁用调试块以便隔离问题
  const DISABLE_DEBUG = process.env.QJS_DISABLE_DEBUG === '1' || process.env.QJS_DISABLE_DEBUG === 'true'
  if (ctx.debug && !DISABLE_DEBUG) this.writeDebugBlock(fnBody, ctx)
    
    this.writeConstants(fnBody, ctx)
    const atomsSection = this.buildAtomSection(ctx)
    const out = Buffer.from([...atomsSection, ...fnBody])
    // 自校验：尝试解析刚刚序列化的字节码，定位潜在的原子引用/布局问题
    try {
      const { parseQuickJS } = require('./parseQuickJS') as typeof import('./parseQuickJS')
      const parsed = parseQuickJS(out)
      // 轻量断言：版本、atom 数、基本计数与已知值的形状一致
      if (typeof parsed.version !== 'number' || !Array.isArray(parsed.atoms)) {
        throw new Error('Sanity check failed: invalid header/atoms')
      }

      if (parsed.byteCodeLen <= 0) {
        throw new Error('Sanity check failed: invalid byteCodeLen')
      }
    } catch (e: any) {
      // 抛出富上下文错误，便于快速定位
      const msg = e && e.stack ? e.stack : String(e)
      throw new Error('[Assembler.serialize] self-parse failed: ' + msg)
    }
    return { buffer: out }
  }

  private createContext(p: ContextOptions) : Context {
    const { 
      code, 
      constants, 
      atoms, 
      localCount, 
      stackSize, 
      debug, 
      sourceMarks 
    } = p
    
    let { closureVars = [] } = p
    const useBigNum = !!process.env.ENABLE_BIGNUM || (debug as DebugOptions)?.bignum
    const BC_VERSION = useBigNum ? 0x45 : 5
    const debugFilename = debug?.filename || 'input.ts'
  const oldAtoms = atoms.slice()

    let atomList: string[]
    let atomIndexMap: Map<string, number>

    if (p.parentCtx) {
      // 共享父级原子表与索引映射：子函数使用同一全局原子段
      atomList = p.parentCtx.atoms
      atomIndexMap = p.parentCtx.atomIndexMap
    } else {
      // 构建 qjsc 风格的原子顺序（近似）：
      //   debug 文件名 -> locals -> env 定义的全局(atom) -> 其它原子
      const merged: string[] = []
      const seen = new Set<string>()

      // 0) 把 debug 文件名尽量前置（qjsc 常见布局）
      if (debugFilename && !seen.has(debugFilename)) { seen.add(debugFilename); merged.push(debugFilename) }

      // 1) 按 localsMap 索引顺序加入局部变量名（参数优先，其后本地）
      if (p.localsMap) {
        const indexToName: string[] = []
        for (const [name, idx] of Object.entries(p.localsMap)) {
          indexToName[idx] = name
        }
        for (let i = 0; i < indexToName.length; i++) {
          const n = indexToName[i]
          if (n && !seen.has(n)) { seen.add(n); merged.push(n) }
        }
      }

      // 2) 扫描字节码，收集与 env/global 相关的原子（put/get/check_define_var/define_func）
      //    这些原子在 qjsc 中通常位于 locals 之后，优先于其它属性名/字符串等
      try {
        const codeArr = Array.isArray(code) ? code : []
        const envOps = new Set<number>()
        // 相关操作：OP_put_var, OP_put_var_strict, OP_get_var, OP_get_var_undef, OP_check_define_var, OP_define_func
        const pickOps = ['OP_put_var', 'OP_put_var_strict', 'OP_get_var', 'OP_get_var_undef', 'OP_check_define_var', 'OP_define_func']
        for (const [, m] of Object.entries(OPCODE_LOOKUP) as any) {
          if (pickOps.includes((m as any).name)) envOps.add((m as any).code >>> 0)
        }

        for (let pc = 0; pc < codeArr.length;) {
          const op = codeArr[pc] >>> 0
          const meta: any = OPCODE_LOOKUP[op]
          if (!meta || !meta.size) break
          if (envOps.has(op)) {
            if (meta.fmt === 'atom') {
              const v = (codeArr[pc + 1] | (codeArr[pc + 2] << 8) | (codeArr[pc + 3] << 16) | (codeArr[pc + 4] << 24)) >>> 0
              const name = oldAtoms[v]
              if (name && !seen.has(name)) { seen.add(name); merged.push(name) }
            }
          }
          pc += meta.size
        }
      } catch {}

      // 3) 不再硬性加入 'use strict'

      // 4) 合并发射阶段产生的其它原子（保持出现顺序）
      for (const a of oldAtoms) {
        if (!seen.has(a)) { seen.add(a); merged.push(a) }
      }

      // 5) debug 文件名已在开头处理，末尾不再追加

      atomList = merged
      atomIndexMap = new Map<string, number>()
      atomList.forEach((a: string, i: number) => atomIndexMap.set(a, i))
    }
  const firstAtom = FIRST_ATOM >>> 0
    
    // 如果未显式提供 closureVars 但给出了 capturedLocals + localsMap，则自动合成
    if (!closureVars.length && p.capturedLocals && p.capturedLocals.length && p.localsMap) {
      closureVars = p.capturedLocals
        .filter((n: string) => n in p.localsMap!)
        .map((n: string) => {
          const kind = p.localKindsMap ? p.localKindsMap[n] : undefined
          const isLexical = kind !== 'var'
          const isConst = kind === 'const'
          return {
            name: n,
            varIdx: p.localsMap![n],
            isLocal: true,
            isLexical,
            isConst,
            varKind: isLexical ? 1 : 0,
          }
        })
    }

    return {
      code: [...code],
      constants,
      atoms: atomList,
      oldAtoms,
      atomIndexMap,
      localCount,
      stackSize,
      debug,
      closureVars,
      localsMap: p.localsMap,
      localKindsMap: p.localKindsMap,
      capturedLocals: p.capturedLocals,
      remappedCode: [...code],
      vardefsCount: 0,
      version: BC_VERSION,
      firstAtom,
      sourceMarks: sourceMarks ?? [],
      // BC_VERSION,
      // JS_ATOM_END_SIM,
      debugFilename,
      funcName: p.functionName,
      argCount: (p.argCount ?? 0) >>> 0,
      definedArgCount: (p.definedArgCount ?? 0) >>> 0,
    }
  }

  private putAtomRef(dst: number[], name: string, ctx: Context) {
    if (/^(?:0|[1-9][0-9]*)$/.test(name)) {
      const num = Number(name)

      if (num >= 0 && num <= 0x7fffffff) { 
        writeUleb(dst, (num << 1) | 1)
        return 
      }
    }

    const idx = ctx.atomIndexMap.get(name)
    if (idx === undefined) {
      throw new Error('Missing atom: ' + name)
    }
    // 与 QuickJS 写入一致：对象流中的 atom 引用同样写为 (first_atom + local_idx) << 1。
    // parseQuickJS 中对 object 流也使用 firstAtom 回退，因此保持一致。
    writeUleb(dst, (((ctx.firstAtom + (idx >>> 0)) >>> 0) << 1))
  }

  private buildFlags(ctx: Context): number {
    const d = (process.env.QJS_DISABLE_DEBUG === '1' || process.env.QJS_DISABLE_DEBUG === 'true') ? undefined : ctx.debug
    let flags = 0
    // 近似 qjsc 的脚本函数 flags：
    // bit 9: arguments_allowed, bit 10: has_debug
    // 常见再加：bit 5: strict (部分版本)，bit 6: module?（此处不设置），保持与 jsMode 严格位一致
    const ARGUMENTS_ALLOWED_BIT = 1 << 9
    const HAS_DEBUG_BIT = 1 << 10
    const STRICT_BIT_LIKE = 1 << 5

    if (true) flags |= ARGUMENTS_ALLOWED_BIT
    if (d) flags |= HAS_DEBUG_BIT
    if (ctx.debug?.strict) flags |= STRICT_BIT_LIKE

    return flags
  }

  private writeFunctionTag(out: number[], ctx: Context){
    const BC_TAG_FUNCTION_BYTECODE = 0x0c
    out.push(BC_TAG_FUNCTION_BYTECODE)

    const flags = this.buildFlags(ctx)
    out.push(flags & 0xff, (flags>>>8)&0xff)

    const jsMode = ctx.debug?.strict ? 0x01 : 0x00
    out.push(jsMode)
    
    // 顶层函数名在 qjsc 中通常为空（<eval>），此处对齐为写入 0（tagged-int 0）代表 JS_ATOM_NULL
    if (ctx.funcName && ctx.funcName.length > 0) {
      const name = ctx.funcName
      if (!ctx.atomIndexMap.has(name)) { ctx.atoms.push(name); ctx.atomIndexMap.set(name, ctx.atoms.length - 1) }
      this.putAtomRef(out, name, ctx)
    } else {
      // 写入 JS_ATOM_NULL 的引用：0（偶数，表示 atom 引用，索引 0 落在内建原子表范围）
      writeUleb(out, 0)
    }
  }

  private remapBytecodeAtomsAndOpcodes(ctx: Context){
    // 第一步：将我们内部发射的字节码重写为 QuickJS 官方 opcode 编号，
    // 同时把携带 atom 的立即数重写为 (firstAtom + newIdx)
    const inCode = [...ctx.code]
    const outCode: number[] = []

    try {
      const { OPCODE_LOOKUP } = require('./opcodes') as typeof import('./opcodes')
      const { QJS_OPCODE_META } = require('./qjs_opcodes') as typeof import('./qjs_opcodes')
      // name -> QuickJS opcode 编号（按头文件顺序的数组下标）
      const QJS_INDEX: Record<string, number> = Object.fromEntries(QJS_OPCODE_META.map((m: any, i: number) => [m.name, i]))

      for (let pc = 0; pc < inCode.length;) {
        const op = inCode[pc] >>> 0
        const meta = OPCODE_LOOKUP[op]
        if (!meta || !meta.size) break

        const qjsCode = QJS_INDEX[meta.name]
        if (qjsCode === undefined) {
          throw new Error('No QuickJS opcode mapping for ' + String(meta.name))
        }

        // 写入 QuickJS 的 opcode 编号
        outCode.push(qjsCode & 0xff)

        // 拷贝/重写立即数
        if (meta.size > 1) {
          if (meta.fmt === 'atom') {
            // 重写 atom: u32 载荷
            const off = pc + 1
            const v = (inCode[off] | (inCode[off+1] << 8) | (inCode[off+2] << 16) | (inCode[off+3] << 24)) >>> 0
            const name = ctx.oldAtoms[v]
            const newIdx = (name !== undefined) ? (ctx.atomIndexMap.get(name) as number) : v
            const mapped = (ctx.firstAtom + (newIdx >>> 0)) >>> 0
            outCode.push(mapped & 0xff, (mapped >>> 8) & 0xff, (mapped >>> 16) & 0xff, (mapped >>> 24) & 0xff)
          } else {
            // 其它立即数按原始字节长度直接拷贝（我们与 QuickJS 的 size/格式已对齐）
            for (let i = 1; i < meta.size; i++) outCode.push(inCode[pc + i] & 0xff)
          }
        }

        pc += meta.size
      }
    } catch (e) {
      // 回退：若发生异常，至少把原字节码原样写出，便于定位问题
      ctx.remappedCode = inCode
      throw e
    }

    ctx.remappedCode = outCode
  }

  private writeHeaderCounts(out: number[], ctx: Context){
    // 在写计数与正文前完成 opcode 和 atom 立即数的整体重写
    this.remapBytecodeAtomsAndOpcodes(ctx)
    const argCount=ctx.argCount, varCount=ctx.localCount, definedArgCount=ctx.definedArgCount
    const closureVarCount = ctx.closureVars.length
    const cpoolCount = ctx.constants.length
    const byteCodeLen = ctx.remappedCode.length
    writeUleb(out,argCount); writeUleb(out,varCount); writeUleb(out,definedArgCount); writeUleb(out,ctx.stackSize)
    writeUleb(out,closureVarCount); writeUleb(out,cpoolCount); writeUleb(out,byteCodeLen)
    ctx.vardefsCount = varCount + argCount
  }

  private writeVarDefs(out: number[], ctx: Context){
    writeUleb(out, ctx.vardefsCount)
    // 若提供 localsMap，则按 index->name 的顺序写出真实变量名，否则回退为 v{idx}
    const indexToName: string[] = []

    if (ctx.localsMap) {
      const lm = ctx.localsMap as Record<string, number>

      for (const name of Object.keys(lm)) {
        const idx = lm[name] as number

        if (typeof idx === 'number') indexToName[idx] = name
      }
    }

  const capturedList: string[] = ctx.capturedLocals ?? (ctx.closureVars?.map((x: any) => x.name) ?? [])
    const capturedSet = new Set<string>(capturedList)

    for (let i = 0;i < ctx.vardefsCount; i++){
      const vname = indexToName[i] ?? ('v' + i)

      if (!ctx.atomIndexMap.has(vname)) { 
        ctx.atoms.push(vname)
        ctx.atomIndexMap.set(vname, ctx.atoms.length-1) 
      }

      this.putAtomRef(out, vname,ctx)
      writeUleb(out, 0)
      writeUleb(out, 1) // scope_level, scope_next+1

      // QuickJS: flags = var_kind(0..3) | (is_const<<4) | (is_lexical<<5) | (is_captured<<6)
      const kind = ctx.localKindsMap ? ctx.localKindsMap[vname] : undefined
      // var_kind: 0=var/function, 1=let/const, 2=class, 3=catch
      const var_kind = kind === 'var' ? 0 : 1
      const is_const = kind === 'const' ? 1 : 0
      const is_lexical = kind === 'var' ? 0 : 1
      const is_captured = capturedSet.has(vname) ? 1 : 0
      const flagsByte = (var_kind & 0x0f) | (is_const << 4) | (is_lexical << 5) | (is_captured << 6)

      out.push(flagsByte)
    }
  }

  private writeClosureVars(out:number[], ctx: any){
    for (const cv of ctx.closureVars) { 
      if(!ctx.atomIndexMap.has(cv.name)){ 
        ctx.atoms.push(cv.name)
        ctx.atomIndexMap.set(cv.name, ctx.atoms.length-1) 
      } 
    }

    for (const cv of ctx.closureVars){
      this.putAtomRef(out, cv.name, ctx)
      writeUleb(out, cv.varIdx >>> 0)

      const is_local = cv.isLocal ? 1 : 0
      const is_arg = cv.isArg ? 1 : 0
      const is_const = cv.isConst ? 1 : 0 
      const is_lexical = cv.isLexical !== false ? 1 : 0 
      const var_kind = (cv.varKind ?? 0) & 0x0f
      const flags = is_local | (is_arg << 1) | (is_const << 2) | (is_lexical << 3) | (var_kind << 4)
      
      out.push(flags)
    }
  }

  private writeBytecode(out: number[], ctx: Context){ 
    out.push(...ctx.remappedCode) 
  }

  private buildPc2Line(ctx: Context){
    const pc2: number[] = []
    const firstLine = 1
    const firstCol = 1

    writeUleb(pc2, firstLine - 1)
    writeUleb(pc2, firstCol - 1)

    if (ctx.remappedCode.length){
      const PC2LINE_BASE = -1
      const PC2LINE_RANGE = 5
      const PC2LINE_OP_FIRST = 1
      const PC2LINE_DIFF_PC_MAX = Math.floor((255 - PC2LINE_OP_FIRST) / PC2LINE_RANGE)
      
      // 使用 sourceMarks 计算真实 diff
      if (ctx.sourceMarks && ctx.sourceMarks.length){
        let lastPc = 0
        let lastLine = firstLine
        let lastCol = firstCol
        for (const m of ctx.sourceMarks) {
          const diff_pc = m.pc - lastPc
          
          if (diff_pc < 0) continue
          
          const diff_line = m.line - lastLine
          const diff_col = m.col - lastCol
          
          if (diff_line === 0 && diff_col === 0) { 
            lastPc = m.pc
            continue 
          }

          if (diff_line >= PC2LINE_BASE && diff_line < PC2LINE_BASE + PC2LINE_RANGE && diff_pc <= PC2LINE_DIFF_PC_MAX) {
            const byte = (diff_line - PC2LINE_BASE) + diff_pc * PC2LINE_RANGE + PC2LINE_OP_FIRST
            pc2.push(byte & 0xff)
          } else {
            pc2.push(0)
            writeUleb(pc2, diff_pc)
            writeSleb(pc2, diff_line)
          }

          writeSleb(pc2, diff_col)
          lastPc = m.pc
          lastLine = m.line
          lastCol = m.col
        }
      } else {
        // 无 marks 时写一个长编码占位，保持结构
        pc2.push(0)
        writeUleb(pc2, ctx.remappedCode.length)
        writeSleb(pc2, 0)
        writeSleb(pc2, 0)
      }
    }

    return pc2
  }

  private writeDebugBlock(out: number[], ctx: Context) {
    this.putAtomRef(out, ctx.debugFilename, ctx)

    const pc2 = this.buildPc2Line(ctx)
    
    writeUleb(out, pc2.length)
    out.push(...pc2)

    if (ctx.debug?.embedSource) {
      const buf = Buffer.from(ctx.debug.sourceText ?? '')
      writeUleb(out, buf.length)

      for (const b of buf) {
        out.push(b)
      }
    } else {
      writeUleb(out, 0)
    }
  }

  private writeConstants(out: number[], ctx: Context) {
    for (const v of ctx.constants) {
      this.writeConstObject(out, v)
    }
  }

  private writeConstObject(out: number[], v: any) {
    const BC_TAG_NULL = 1
    const BC_TAG_UNDEFINED = 2
    const BC_TAG_BOOL_FALSE = 3 
    const BC_TAG_BOOL_TRUE = 4
    const BC_TAG_INT32 = 5 
    const BC_TAG_FLOAT64 = 6
    const BC_TAG_STRING = 7

    if (v === null) {
      out.push(BC_TAG_NULL)
    } else if (v === undefined) {
      out.push(BC_TAG_UNDEFINED)
    } else if (v === true) {
      out.push(BC_TAG_BOOL_TRUE)
    } else if (v === false) {
      out.push(BC_TAG_BOOL_FALSE)
    } else if (typeof v === 'number') {
      // -0 必须以 float64 写出以保留符号
      const isNegZero = (v === 0) && (1 / v === -Infinity)
      if (!isNegZero && Number.isInteger(v) && v >= -0x80000000 && v <= 0x7fffffff) { 
        out.push(BC_TAG_INT32)
        writeSleb(out, v | 0) 
      } else { 
        out.push(BC_TAG_FLOAT64); 
        const buf = Buffer.allocUnsafe(8)
        ;(buf as any).writeDoubleLE(v, 0)
        
        for (const b of buf) out.push(b) 
      }
    } else if (typeof v === 'string') {
      out.push(BC_TAG_STRING)
      const utf8 = Buffer.from(v, 'utf8')
      // QuickJS: JS_WriteString -> (len << 1) | is_wide
      writeUleb(out, (utf8.length << 1) | 0)
      for (const b of utf8) out.push(b)
    } else if (typeof v === 'object' && v && (v as any).__function__) {
      // Serialize nested function bytecode object (as constant)
      const sub = (v as any).__function__ as SerializedFunction
      // Build a temporary assembler context for function
      // 构造参数相关元信息：将参数名放入 localsMap 开头位置仅用于 vardefs 呈现（QuickJS 会区分 args/locals；此处近似）
      const maybeArgs: unknown = (sub as any).argNames
      const argNames = Array.isArray(maybeArgs) ? (maybeArgs as string[]) : []
      const localsMap: Record<string, number> = {}
      const localKindsMap: Record<string, 'var' | 'let' | 'const'> = {}

      for (let i = 0; i < argNames.length; i++) { localsMap[argNames[i]] = i; localKindsMap[argNames[i]] = 'var' }
      
      const childCtx = this.createContext({
        code: sub.code,
        constants: sub.constants,
        atoms: sub.atoms,
        localCount: sub.localCount,
        stackSize: sub.stackSize,
        debug: undefined,
        functionName: sub.name,
        argCount: (sub as any).argCount ?? 0,
        definedArgCount: (sub as any).argCount ?? 0,
        localsMap,
        localKindsMap,
        // Share parent's atom table so nested functions use the same global atoms
        parentCtx: (out as any).__parentCtx ?? undefined,
      })

      // Propagate parentCtx to nested writes by attaching it to the out array handle
      ;(childCtx as any).__parentCtx = (out as any).__parentCtx ?? childCtx
      
      const fnBody: number[] = []
      // make nested serialization also see the shared atom table via the output handle
      ;(fnBody as any).__parentCtx = childCtx
      this.writeFunctionTag(fnBody, childCtx)
      this.writeHeaderCounts(fnBody, childCtx)
      this.writeVarDefs(fnBody, childCtx)
      this.writeClosureVars(fnBody, childCtx)
      this.writeBytecode(fnBody, childCtx)
      // no debug/source for nested for now
      this.writeConstants(fnBody, childCtx)
      // Append the serialized function (which already starts with BC_TAG_FUNCTION_BYTECODE)
      for (const b of fnBody) out.push(b)
    } else {
      throw new Error('unsupported constant type: ' + String(v))
    }
  }

  private buildAtomSection(ctx:any){
    const section: number[] = []
    
    section.push(ctx.version) 
    writeUleb(section, ctx.atoms.length)

    for (const a of ctx.atoms) { 
      const utf8=Buffer.from(a,'utf8')
      // JS_WriteString: (len << 1) | is_wide
      writeUleb(section, (utf8.length << 1) | 0)
      for (const b of utf8) section.push(b) 
    }

    return section
  }
}

export function writeModule (mod: SerializedModule, path: string) {
  new Assembler().write(mod, path)
}

export function serialize (p: {
  code: number[]
  constants: ConstValue[]
  atoms: string[]
  localCount: number
  stackSize: number
  sourceMarks?: Array<SourceMark>
  debug?: DebugOptions
  localsMap?: Record<string, number>
  localKindsMap?: Record<string, 'var' | 'let' | 'const'>
  capturedLocals?: string[]
  closureVars?: ClosureVar[]
}) {
  return new Assembler().serialize(p)
}
