import { IRProgram, IRNode } from './ir'
import { OpCode, OPCODE_META, OPCODE_LOOKUP } from './opcodes'
import { AtomTable } from './atom'
import { ConstTable, type ConstValue } from './const'

export interface EmitResult {
  code: number[]
  constants: ConstValue[]
  atoms: string[]
  localCount: number
  locals: Map<string, number>
  localKinds?: Map<string, 'var' | 'let' | 'const'>
  stackSize: number
  labels: Map<string, number>
  sourceMarks: Array<{ pc: number; line: number; col: number }>
  subFunctions?: Array<SubFunction>
  labelKinds?: Map<string, string>
}

export interface SubFunction {
  name: string
  atoms: string[]
  code: number[]
  constants: ConstValue[]
  localCount: number
  stackSize: number
  argCount?: number
  argNames?: string[]
}

export class BytecodeEmitter {
  private code: number[] = []
  private constants = new ConstTable()
  private locals = new Map<string, number>()
  private localKinds = new Map<string, 'var' | 'let' | 'const'>()
  private localCount = 0
  private labels = new Map<string, number>()
  private fixups: Array<{ pos: number; label: string }> = []
  private currentLoc?: { line: number; col: number }
  private lastLoc?: { line: number; col: number }
  private sourceMarks: Array<{ pc: number; line: number; col: number }> = []
  private subFunctions: Array<SubFunction> = []
  private labelKinds?: Map<string, string>

  emit (ir: IRProgram): EmitResult {
    // 透传编译阶段导出的标签语义（用于 disasm 注解）
    const lk = (ir as any).__labelKinds as Map<string, string> | undefined
    if (lk) this.labelKinds = lk
    for (const node of ir) {
      this.process(node)
    }

    this.patchFixups()
    // 二次优化：选择短指令并重映射 PC（保守版本，仅少量常见指令）
    this.selectShortOpcodesAndRemap()

    return {
      code: this.code,
      constants: this.constants.getAll(),
      atoms: this.atomTable.getAll(),
      localCount: this.localCount,
      locals: this.locals,
      localKinds: this.localKinds,
      stackSize: this.computeStackSize(),
      labels: this.labels,
      sourceMarks: this.sourceMarks,
      subFunctions: this.subFunctions
      , labelKinds: this.labelKinds
    }
  }

  private process (node: IRNode) {
    // capture source location for this IR node (if any)
    const maybeLoc = (node as any).loc as { line: number; col: number } | undefined
    this.currentLoc = maybeLoc
    switch (node.kind) {
      case 'DeclareLocal': return this.processDeclareLocal(node)
      case 'LoadConst': return this.processLoadConst(node)
      case 'SetLocal': return this.processSetLocal(node)
      case 'InitLocal': return this.processInitLocal(node)
      case 'GetLocal': return this.processGetLocal(node)
      case 'Add': return this.pushOp(OpCode.OP_add)
      case 'LessThan': return this.pushOp(OpCode.OP_lt)
      case 'LessEqual': return this.pushOp(OpCode.OP_lte)
      case 'GreaterThan': return this.pushOp(OpCode.OP_gt)
      case 'GreaterEqual': return this.pushOp(OpCode.OP_gte)
      // 其它比较先复用 OP_lt 变换：le/ge/gt/eq/strict_eq 可在后续加入独立 IR 再替换
      case 'ArrayNew': return this.pushOp(OpCode.OP_array_from, (node as any).initialCapacity ?? 0)
      case 'ObjectNew': return this.pushOp(OpCode.OP_object)
      case 'PushI32': return this.pushOp(OpCode.OP_push_i32, (node as any).value | 0)
      case 'DefineArrayEl': return this.pushOp(OpCode.OP_define_array_el)
      case 'Append': return this.pushOp(OpCode.OP_append)
      case 'Dup': return this.pushOp(OpCode.OP_dup)
      case 'Dup1': return this.pushOp(OpCode.OP_dup1)
      case 'Inc': return this.pushOp(OpCode.OP_inc)
      case 'Swap': return this.pushOp(OpCode.OP_swap)
      case 'Rot3R': return this.pushOp(OpCode.OP_rot3r)
      case 'Rot4L': return this.pushOp(OpCode.OP_rot4l)
      case 'PutField': {
        const atom = this.internAtom(node.name)
        return this.pushOp(OpCode.OP_put_field, atom)
      }
      case 'DefineField': {
        const atom = this.internAtom(node.name)
        return this.pushOp(OpCode.OP_define_field, atom)
      }
      case 'GetField2': {
        const atom = this.internAtom(node.field)
        return this.pushOp(OpCode.OP_get_field2, atom)
      }
      case 'Drop': return this.pushOp(OpCode.OP_drop)
      case 'IncLocal': return this.processIncLocal(node)
      case 'Label': return this.processLabel(node)
      case 'Jump': return this.emitJump(OpCode.OP_goto, node.label)
      case 'JumpIfFalse': return this.emitJump(OpCode.OP_if_false, node.label)
      case 'ReturnUndef': return this.pushOp(OpCode.OP_return_undef)
      case 'Return': return this.pushOp(OpCode.OP_return)
      case 'Equal': return this.pushOp(OpCode.OP_eq)
      case 'StrictEqual': return this.pushOp(OpCode.OP_strict_eq)
      case 'MethodCall':
        // For method calls, the expected stack shape before OP_call_method is [obj, func, ...args].
        // Upstream QuickJS uses get_field2 to produce [obj, func] directly; we rely on IR to have prepared that.
        return this.pushOp(OpCode.OP_call_method, node.argc)
      case 'GetArrayEl':
        return this.pushOp(OpCode.OP_get_array_el)
      case 'PutArrayEl':
        return this.pushOp(OpCode.OP_put_array_el)
      case 'Call':
        // Caller must prepare [func, this, ...args] in IR lowering.
        return this.pushOp(OpCode.OP_call, node.argc)
      case 'GetArg': return this.pushOp(OpCode.OP_get_arg, node.index)
      case 'PutArg': return this.pushOp(OpCode.OP_put_arg, node.index)
      case 'SetEnvVar': return this.processSetEnvVar(node)
      case 'GetEnvVar': return this.processGetEnvVar(node)
      case 'CheckDefineVar': return this.processCheckDefineVar(node)
      case 'DefineFunc': {
        const atom = this.internAtom(node.name)
        return this.pushOp(OpCode.OP_define_func, { atom, flags: (node.flags ?? 0) & 0xff } as any)
      }
      case 'FunctionObject': {
        return this.processFunctionObject(node as any)
      }
      // NOTE: FunctionDecl lowering is currently handled at compile stage as
      // LoadConst placeholder + local alias + env store. Future: emit OP_define_func
      // (atom_u8) paired with OP_fclosure/OP_fclosure8 once multi-function serialization
      // is supported in assembler.
      default: { 
        const exhaust: never = node as never
        throw new Error('Unhandled IR node '+ JSON.stringify(exhaust)) 
      }
    }
  }

  private processDeclareLocal (node: { name: string; declKind?: 'var' | 'let' | 'const' }) { 
    const idx = this.ensureLocal(node.name)
    if (node.declKind) this.localKinds.set(node.name, node.declKind)
  }

  private processLoadConst (node: { value: any }) {
    const v = (node as any).value
    if (v === undefined) {
      this.pushOp(OpCode.OP_undefined)
      return
    }
    if (typeof v === 'number' && Number.isFinite(v) && Number.isInteger(v) && v >= -0x80000000 && v <= 0x7fffffff) {
      // 优先使用 OP_push_i32 与 qjsc 对齐（qjsc 会尽量用立即数推入小整数）
      this.pushOp(OpCode.OP_push_i32, v | 0)
    } else {
      // 其它类型（字符串、大整数、对象等）仍走常量池
      const idx = this.constants.add(v)
      this.pushOp(OpCode.OP_push_const, idx)
    }
  }

  private processSetLocal (node: { name: string }) {
    const idx = this.ensureLocal(node.name)
    // 根据变量种类选择 put 指令：对 let/const 采用 *_check（运行时 TDZ 检查）
    const kind = this.localKinds.get(node.name)
    if (kind && kind !== 'var') {
      this.pushOp(OpCode.OP_put_loc_check, idx)
    } else {
      this.pushOp(OpCode.OP_put_loc, idx)
    }
  }

  private processInitLocal (node: { name: string }) {
    const idx = this.ensureLocal(node.name)
    const kind = this.localKinds.get(node.name)
    if (kind && kind !== 'var') {
      // 第一次初始化 let/const：使用 *_check_init
      this.pushOp(OpCode.OP_put_loc_check_init, idx)
    } else {
      this.pushOp(OpCode.OP_put_loc, idx)
    }
  }

  private processGetLocal (node: { name: string }) {
    const idx = this.ensureLocal(node.name)
    // 读取 let/const 使用 TDZ 检查变体
    const kind = this.localKinds.get(node.name)
    if (kind && kind !== 'var') {
      this.pushOp(OpCode.OP_get_loc_check, idx)
    } else {
      this.pushOp(OpCode.OP_get_loc, idx)
    }
  }

  // array literal: handled via OP_array_from with argc emitted directly
  // no-op: real OP_lt used
  private processIncLocal (node: { name: string }) {
    const idx = this.ensureLocal(node.name)
    if (idx >= 0 && idx <= 0xff && OpCode.OP_inc_loc !== undefined) {
      // 使用 QuickJS 的短指令对本地变量自增
      this.pushOp(OpCode.OP_inc_loc, idx)
    } else {
      // 退回通用序列：load + add 1 + store
      this.pushOp(OpCode.OP_get_loc, idx)
      this.pushOp(OpCode.OP_push_i32, 1)
      this.pushOp(OpCode.OP_add)
      this.pushOp(OpCode.OP_put_loc, idx)
    }
  }
  
  private processLabel (node: { name: string }) { 
    this.labels.set(node.name, this.code.length) 
  }

  private ensureLocal (name: string) {
    if (!this.locals.has(name)) this.locals.set(name, this.localCount++)
    return this.locals.get(name)!
  }

  private internAtom (name: string): number { 
    return this.atomTable.intern(name) 
  }

  private atomTable = new AtomTable()

  private pushOp (op: OpCode, imm?: number) {
    // mark source map before emitting the instruction if location changes
    if (this.currentLoc) {
      const same = this.lastLoc && this.lastLoc.line === this.currentLoc.line && this.lastLoc.col === this.currentLoc.col
      
      if (!same) {
        this.sourceMarks.push({ pc: this.code.length, line: this.currentLoc.line, col: this.currentLoc.col })
        this.lastLoc = this.currentLoc
      }
    }
    const meta = OPCODE_LOOKUP[op]

    if (!meta) {
      // debug dump
      // eslint-disable-next-line no-console
      console.error('OPCODE_LOOKUP keys=', Object.keys(OPCODE_LOOKUP))
      throw new Error('Unknown opcode meta for value ' + op)
    }

    this.code.push(op)
    // 根据元信息 imm 字段精确写入立即数字节
    if (meta.imm && meta.imm.length > 0) {
      // Support multiple immediate fields (e.g., atom_u8)
      if (meta.imm.length === 1) {
        const v = imm ?? 0
        const bytes = meta.imm[0].size

        for (let i = 0; i < bytes; i++) {
          this.code.push((v >> (8 * i)) & 0xff)
        }
      } else if (meta.imm.length >= 2 && typeof imm === 'object' && imm !== null) {
        // imm as object: { a0, a1 } but we use conventional names
        const fields = meta.imm
        const values: number[] = []

        for (let k = 0; k < fields.length; k++) {
          const name = fields[k].name
          const v = (imm as any)[name]
          values.push(v | 0)
        }

        let off = 0
        for (let k = 0; k < fields.length; k++) {
          const sz = fields[k].size
          const v = values[k]
          
          for (let i = 0; i < sz; i++) {
            this.code.push((v >> (8 * i)) & 0xff)
          }

          off += sz
        }
      } else {
        // Fallback: write first field only
        const v = (typeof imm === 'number' ? imm : 0)
        const bytes = meta.imm[0].size

        for (let i = 0; i < bytes; i++) {
          this.code.push((v >> (8 * i)) & 0xff)
        }
      }
    }
  }

  // Compile a nested function body into its own bytecode and constants, insert into const pool as FunctionBytecode object,
  // then emit OP_fclosure(/8) referencing that constant index.
  private processFunctionObject (node: { name: string; argCount: number; argNames?: string[]; body: IRProgram }) {
    // Compile child using a new emitter but sharing the atom table for cross-atom consistency
    const child = new BytecodeEmitter()
    // reuse atom table by assigning instance (Atoms are interned by name)
    ;(child as any).atomTable = this.atomTable
    const childResult = child.emit(node.body)
    const sub: SubFunction = {
      name: node.name,
      atoms: childResult.atoms,
      code: childResult.code,
      constants: childResult.constants,
      localCount: childResult.localCount,
      stackSize: childResult.stackSize,
      argCount: node.argCount,
      argNames: node.argNames,
    }
    const constIndex = this.constants.add({ __function__: sub } as any)
    this.subFunctions.push(sub)
    // emit fclosure referencing constIndex; short form when possible
    if (constIndex >= 0 && constIndex <= 0xff) this.pushOp(OpCode.OP_fclosure8, constIndex)
    else this.pushOp(OpCode.OP_fclosure, constIndex)
  }

  private processSetEnvVar (node: { name: string; strict?: boolean }) {
    const atom = this.internAtom(node.name)
    this.pushOp(node.strict 
      ? OpCode.OP_put_var_strict 
      : OpCode.OP_put_var, atom)
  }

  private processGetEnvVar (node: { name: string; strict?: boolean }) {
    const atom = this.internAtom(node.name)
    this.pushOp(node.strict ? OpCode.OP_get_var : OpCode.OP_get_var_undef, atom)
  }

  private processCheckDefineVar (node: { name: string; flags?: number }) {
    const atom = this.internAtom(node.name)
    const flags = (node.flags ?? 0) & 0xff
    // atom + flags(u8)
    this.pushOp(OpCode.OP_check_define_var, { atom, flags } as any)
  }

  private emitJump (op: OpCode, label: string) {
    // 先写占位 0 (4字节) 后面回填相对偏移 (targetPC - nextPC)
    const pos = this.code.length
    this.pushOp(op, 0)
    this.fixups.push({ pos, label })
  }

  private patchFixups () {
    for (const f of this.fixups) {
      const target = this.labels.get(f.label)

      if (target === undefined) {
        throw new Error('Unknown label ' + f.label)
      }

      const meta = OPCODE_LOOKUP[this.code[f.pos]]
      const size = meta.size // e.g. 5 for label
      const nextPC = f.pos + size
      const rel = target - nextPC
      const off = f.pos + 1 // opcode 后立即数起始
      const bytes = meta.imm && meta.imm[0] ? meta.imm[0].size : 2
      let v = rel | 0

      for (let i = 0; i < bytes; i++) {
        this.code[off + i] = (v >> (8 * i)) & 0xff
      }
    }
  }

  // 选择短指令与 PC 重映射（保守实现）：
  // - get_loc/put_loc 对索引 0..2 的替换
  // - goto/if_false 若偏移落在 i8 范围（-128..127）则替换为 8 位版本
  // 注意：我们当前位置的 OPCODE_META 中尚未定义短指令枚举值，保留成同名“长编号”，
  // 仅作为容量/对齐研究。若后续引入真实短枚举，需要拓展 src/opcodes.ts 并在此写入正确编码。
  private selectShortOpcodesAndRemap () {
    const src = this.code
    const META = OPCODE_LOOKUP
    // 先一次扫描，记录每条指令原始 pc 与大小
    const instrs: Array<{ pc: number; op: number; size: number }> = []
    for (let pc = 0; pc < src.length;) {
      const op = src[pc]
      const m = META[op]

      if (!m || !m.size) break
      
      instrs.push({ pc, op, size: m.size })
      pc += m.size
    }

    // 第二步：尝试替换短形式，预估新大小
    type Patch = { kind: 'op' | 'imm'; at: number; value: number }
    const patches: Patch[] = []
    const newSize: number[] = instrs.map(x => x.size)
    const newOp: number[] = instrs.map(x => x.op)

    const setOp = (i: number, op: number, size: number) => { newOp[i] = op; newSize[i] = size }

    // 建立原始 pc -> 指令索引的映射
    const pcToIndex = new Map<number, number>()
    instrs.forEach((it, i) => pcToIndex.set(it.pc, i))

    // 先对 get/put_loc 做短化（不涉及偏移）以及 push_i32 的小整数短化
    for (let i = 0; i < instrs.length; i++) {
      const it = instrs[i]
      const op = it.op

      if (op === OpCode.OP_get_loc || op === OpCode.OP_put_loc) {
        const idx = src[it.pc + 1] | (src[it.pc + 2] << 8)

        if (idx === 0) { 
          setOp(i, op === OpCode.OP_get_loc ? OpCode.OP_get_loc0 : OpCode.OP_put_loc0, 1) 
        } else if (idx === 1) {
          setOp(i, op === OpCode.OP_get_loc ? OpCode.OP_get_loc1 : OpCode.OP_put_loc1, 1)
        } else if (idx === 2) {
          setOp(i, op === OpCode.OP_get_loc ? OpCode.OP_get_loc2 : OpCode.OP_put_loc2, 1)
        } else if (idx >= 0 && idx <= 0xff) {
          setOp(i, op === OpCode.OP_get_loc ? OpCode.OP_get_loc8 : OpCode.OP_put_loc8, 2)
        }
      } else if (op === OpCode.OP_push_i32) {
        const v = src[it.pc + 1] | (src[it.pc + 2] << 8) | (src[it.pc + 3] << 16) | (src[it.pc + 4] << 24)
        if (v === 0) {
          setOp(i, OpCode.OP_push_0, 1)
        } else if (v >= -128 && v <= 127) {
          setOp(i, OpCode.OP_push_i8, 2)
        }
      } else if (op === OpCode.OP_push_const) {
        const idx = src[it.pc + 1] | (src[it.pc + 2] << 8)
        if (idx >= 0 && idx <= 0xff) setOp(i, OpCode.OP_push_const8, 2)
      } else if (op === OpCode.OP_fclosure) {
        const idx = src[it.pc + 1] | (src[it.pc + 2] << 8)
        if (idx >= 0 && idx <= 0xff) setOp(i, OpCode.OP_fclosure8, 2)
      }
    }

    // 计算新 pc 映射（旧 pc -> 新 pc）
    const oldPcToNewPc = new Map<number, number>()
    let acc = 0
    for (let i = 0; i < instrs.length; i++) {
      oldPcToNewPc.set(instrs[i].pc, acc)
      acc += newSize[i]
    }

    // 再对跳转做短化（需要用新 pc 映射重算偏移）
    for (let i = 0; i < instrs.length; i++) {
      const it = instrs[i]
      const op = newOp[i]
      if (op === OpCode.OP_goto || op === OpCode.OP_if_false) {
        // 读取旧偏移（32位有符号）并转换为目标旧 pc
        const off = src[it.pc + 1] | (src[it.pc + 2] << 8) | (src[it.pc + 3] << 16) | (src[it.pc + 4] << 24)
        const oldNext = it.pc + it.size
        const oldTarget = oldNext + (off | 0)
        const targetIdx = pcToIndex.get(oldTarget)

        if (targetIdx === undefined) continue
        // 新 next / 新 target
        const newNext = (oldPcToNewPc.get(it.pc) ?? 0) + newSize[i]
        const newTarget = oldPcToNewPc.get(oldTarget) ?? 0
        const rel = newTarget - newNext

        if (rel >= -128 && rel <= 127) {
          // 可短化
          setOp(i, op === OpCode.OP_goto ? OpCode.OP_goto8 : OpCode.OP_if_false8, 2)
        }
      }
    }

    // 最终重建代码（按 newOp/newSize），并重写跳转的立即数（8位或32位）
    const out: number[] = []
    const idxToNewPc: number[] = []

    for (let i = 0; i < instrs.length; i++) { 
      idxToNewPc[i] = out.length
      out.length += newSize[i] 
    }
    
    out.length = idxToNewPc[instrs.length - 1] + newSize[instrs.length - 1]

    for (let i = 0; i < instrs.length; i++) {
      const it = instrs[i]
      const op = newOp[i]
      const size = newSize[i]
      const dst = idxToNewPc[i]
      out[dst] = op
      const was = it.op

      if (was === OpCode.OP_get_loc || was === OpCode.OP_put_loc) {
        // 根据新指令形式写入相应的立即数
        if (op === OpCode.OP_get_loc0 || op === OpCode.OP_get_loc1 || op === OpCode.OP_get_loc2 || op === OpCode.OP_put_loc0 || op === OpCode.OP_put_loc1 || op === OpCode.OP_put_loc2) {
          // 短 0..2 无立即数
          // nothing to do
        } else if (op === OpCode.OP_get_loc8 || op === OpCode.OP_put_loc8) {
          // 8 位索引
          const v = src[it.pc + 1] | (src[it.pc + 2] << 8)
          out[dst + 1] = (v & 0xff)
        } else {
          // 长形式：复制原始 2 字节 index
          out[dst + 1] = src[it.pc + 1]; out[dst + 2] = src[it.pc + 2]
        }
  } else if (was === OpCode.OP_goto || was === OpCode.OP_if_false) {
        // 重算偏移并写入 8 或 32 位
        const oldOff = src[it.pc + 1] | (src[it.pc + 2] << 8) | (src[it.pc + 3] << 16) | (src[it.pc + 4] << 24)
        const oldNext = it.pc + it.size
        const oldTarget = oldNext + (oldOff | 0)
        const newNext = dst + size
        const newTarget = oldPcToNewPc.get(oldTarget) ?? 0
        const rel = (newTarget - newNext) | 0

        if (op === OpCode.OP_goto8 || op === OpCode.OP_if_false8) {
          out[dst + 1] = (rel & 0xff)
        } else {
          out[dst + 1] = (rel) & 0xff
          out[dst + 2] = (rel >> 8) & 0xff
          out[dst + 3] = (rel >> 16) & 0xff
          out[dst + 4] = (rel >> 24) & 0xff
        }
  } else if (was === OpCode.OP_push_i32) {
        // write adjusted immediate for push_0/push_i8
        if (op === OpCode.OP_push_0) {
          // no imm
        } else if (op === OpCode.OP_push_i8) {
          const v = src[it.pc + 1] | (src[it.pc + 2] << 8) | (src[it.pc + 3] << 16) | (src[it.pc + 4] << 24)
          out[dst + 1] = (v & 0xff)
        } else {
          // unchanged: copy original 4 bytes
          out[dst + 1] = src[it.pc + 1]; out[dst + 2] = src[it.pc + 2]; out[dst + 3] = src[it.pc + 3]; out[dst + 4] = src[it.pc + 4]
        }
      } else if (was === OpCode.OP_push_const) {
        if (op === OpCode.OP_push_const8) {
          const v = src[it.pc + 1] | (src[it.pc + 2] << 8)
          out[dst + 1] = (v & 0xff)
        } else {
          out[dst + 1] = src[it.pc + 1]; out[dst + 2] = src[it.pc + 2]
        }
      } else if (was === OpCode.OP_fclosure) {
        if (op === OpCode.OP_fclosure8) {
          const v = src[it.pc + 1] | (src[it.pc + 2] << 8)
          out[dst + 1] = (v & 0xff)
        } else {
          out[dst + 1] = src[it.pc + 1]; out[dst + 2] = src[it.pc + 2]
        }
      } else {
        // 其它指令：直接复制原始 payload（如果有）
        for (let k = 1; k < size; k++) {
          out[dst + k] = src[it.pc + k] ?? 0
        }
      }
    }

    this.code = out

    // 依据旧->新 PC 映射，同步更新 sourceMarks 与 labels
    const remapPc = (oldPc: number): number => {
      const v = oldPcToNewPc.get(oldPc)
      if (v !== undefined) return v
      // 退化策略：选择不大于 oldPc 的最近指令
      let bestOld = 0
      for (const it of instrs) {
        if (it.pc <= oldPc && it.pc >= bestOld) bestOld = it.pc
      }
      return oldPcToNewPc.get(bestOld) ?? 0
    }
    this.sourceMarks = this.sourceMarks.map(m => ({ ...m, pc: remapPc(m.pc) }))
    const newLabels = new Map<string, number>()
    for (const [name, pc] of this.labels.entries()) newLabels.set(name, remapPc(pc))
    this.labels = newLabels
  }

  // 计算最大栈深：基于已发射的指令序列和我们已知的栈效果。
  // 注意：真实 QuickJS 需考虑异常路径/可选操作数，这里先处理线性路径。
  private computeStackSize (): number {
    let sp = 0
    let max = 0
    let lastOp: number | null = null

    const readImm = (idx: number, bytes: number) => {
      let v = 0
      for (let i = 0; i < bytes; i++) v |= this.code[idx + 1 + i] << (8 * i)
      return v
    }

    for (let pc = 0; pc < this.code.length;) {
      const op = this.code[pc]
      const meta = OPCODE_LOOKUP[op]

      if (!meta) break

      // 栈效果近似映射
      switch (op) {
        case OpCode.OP_push_i32:
        case OpCode.OP_push_const:
        case OpCode.OP_push_const8:
        case OpCode.OP_push_0:
        case OpCode.OP_push_i8:
        case OpCode.OP_undefined:
        case OpCode.OP_fclosure:
        case OpCode.OP_fclosure8:
          sp += 1
          break
        case OpCode.OP_dup:
          if (sp > 0) sp += 1
          break
        case OpCode.OP_dup1:
          // Duplicate stack[-2]: a b -> a a b ; net +1 when at least 2 items
          if (sp > 1) sp += 1
          break
        case OpCode.OP_return:
          // Return consumes the value and ends the function. Reset stack depth.
          sp = 0
          break
        // no swap opcode in current set
        case OpCode.OP_get_loc:
        case OpCode.OP_get_arg:
          sp += 1
          break
        case OpCode.OP_put_arg:
          sp -= 1
          break
        case OpCode.OP_get_loc8:
        case OpCode.OP_get_loc_check:
        case OpCode.OP_get_loc0:
        case OpCode.OP_get_loc1:
        case OpCode.OP_get_loc2:
          sp += 1
          break
        case OpCode.OP_put_loc:
        case OpCode.OP_put_loc8:
        case OpCode.OP_put_loc_check:
        case OpCode.OP_put_loc_check_init:
        case OpCode.OP_put_loc0:
        case OpCode.OP_put_loc1:
        case OpCode.OP_put_loc2:
          sp -= 1
          break
        case OpCode.OP_add:
        case OpCode.OP_lt:
          // binary op: pop 2 push 1 => net -1
          sp -= 1
          break
        case OpCode.OP_inc:
          // unary ++ on TOS: net 0
          break
        case OpCode.OP_inc_loc:
          // local ++ (short form) updates in-place, no net stack change
          break
        case OpCode.OP_lte:
        case OpCode.OP_gt:
        case OpCode.OP_gte:
        case OpCode.OP_eq:
        case OpCode.OP_strict_eq:
          sp -= 1
          break
        case OpCode.OP_array_from: {
          const argc = readImm(pc, meta.imm?.[0]?.size ?? 2)
          // pops argc and pushes 1 array => net 1 - argc
          sp += 1 - argc
          break
        }
        case OpCode.OP_object:
          sp += 1
          break
        case OpCode.OP_define_field:
          // [obj, value] -> [obj]
          sp -= 1
          break
        case OpCode.OP_put_field:
          // [obj, value] -> [] then push value? Here we model as no push (store)
          sp -= 2
          break
        case OpCode.OP_put_var:
        case OpCode.OP_put_var_strict:
          // [value] consumed
          sp -= 1
          break
        case OpCode.OP_define_array_el:
          // [arr, index, value] -> [arr, index]
          sp -= 1
          break
        case OpCode.OP_append:
          // [arr, pos, enumobj] -> [arr, pos]
          sp -= 1
          break
        case OpCode.OP_get_var:
        case OpCode.OP_get_var_undef:
          sp += 1
          break
        case OpCode.OP_get_field2: {
          // 常见形态：dup; get_field2 产生 [obj, func]，整体净效果与 dup 相抵消
          // 若前一条是 OP_dup，我们将本条视为净 0；否则按 [obj] -> [obj, func] 计 +1
          if (lastOp === OpCode.OP_dup) {
            // no change
          } else {
            sp += 1
          }
          break
        }
        // For expression-level post-inc lowering pattern: get_loc; dup; inc; put_loc -> leaves old value
        // 我们不在此做序列识别，但单指令栈效应组合本就实现 net 0：
        // get_loc(+1); dup(+1); inc(0); put_loc(-1) => +1 overall, old value remains on stack; 但 put_loc 还会额外消费一个值？
        // 注意：我们的 put_loc 消费 1（新值），dup 复制旧值，序列执行后，栈上只剩旧值，净 +0 相对初始。
        case OpCode.OP_drop:
        case OpCode.OP_nip:
          sp -= 1
          break
        case OpCode.OP_if_false:
        case OpCode.OP_if_false8:
          // pop condition
          sp -= 1
          break
        case OpCode.OP_goto:
        case OpCode.OP_goto8:
          // no stack effect
          break
        case OpCode.OP_call_method: {
          const argc = readImm(pc, meta.imm?.[0]?.size ?? 2)
          // consumes obj, func, argc args; pushes result => net -(2+argc) + 1
          sp -= (1 + argc)
          break
        }
        case OpCode.OP_call: {
          const argc = readImm(pc, meta.imm?.[0]?.size ?? 2)
          // expects [func, this, ...args]; consumes (2+argc), pushes result => net -(2+argc) + 1
          sp -= (1 + argc)
          break
        }
        case OpCode.OP_swap:
          // swap does not change stack depth
          break
        case OpCode.OP_rot3r:
          // rotation does not change stack depth
          break
        case OpCode.OP_rot4l:
          // rotation does not change stack depth
          break
        case OpCode.OP_define_func:
          // treat as metadata operation (naming), assume no net stack change in our subset
          break
        case OpCode.OP_get_array_el:
          // [arr, index] -> [value] : pop 2 push 1 => -1
          sp -= 1
          break
        case OpCode.OP_put_array_el:
          // [arr, index, value] -> [] : pop 3 => -3
          sp -= 3
          break
        case OpCode.OP_return_undef:
          // pop? (这里我们返回 undefined 不消耗已有) 设为不变
          break
      }

      if (sp > max) max = sp

      pc += meta.size
      lastOp = op
    }

    return max < 0 ? 0 : max
  }
}

export function emitBytecode (ir: IRProgram): EmitResult {
  return new BytecodeEmitter().emit(ir)
}
