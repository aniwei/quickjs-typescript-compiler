import { IRProgram, IRNode } from './ir'
import { OpCode, OPCODE_META } from './opcodes'
// 根据当前 auto-generated opcodes.ts 形态构造数值->元信息的查找表
type Meta = (typeof OPCODE_META)[number] & { code: number; fmt?: string }
const OPCODE_LOOKUP: Record<number, Meta> = Object.fromEntries(
  OPCODE_META.map((m, i) => {
    // 简单从名称推断 fmt，便于发射/解析统一
    let fmt: string | undefined
    if (m.name === 'OP_push_i32') fmt = 'i32'
    else if (m.name === 'OP_push_const') fmt = 'const'
    else if (m.name.startsWith('OP_get_loc') || m.name.startsWith('OP_put_loc') || m.name.startsWith('OP_inc_loc')) {
      fmt = m.name.endsWith('_u16') ? 'loc' : 'loc8'
    } else if (m.name === 'OP_jmp' || m.name === 'OP_jmp_if_false') fmt = 'label'
    else if (m.name === 'OP_array_new') fmt = 'u16'
    return [i, { ...m, code: i, fmt }]
  })
) as any
import { AtomTable } from './atom'
import { ConstTable, type ConstValue } from './const'

export interface EmitResult {
  code: number[]
  constants: ConstValue[]
  atoms: string[]
  localCount: number
  locals: Map<string, number>
  stackSize: number
}

export class BytecodeEmitter {
  private code: number[] = []
  private constants = new ConstTable()
  private locals = new Map<string, number>()
  private localCount = 0
  private labels = new Map<string, number>()
  private fixups: Array<{ pos: number; label: string }> = []

  emit (ir: IRProgram): EmitResult {
    for (const node of ir) {
      this.process(node)
    }

    this.patchFixups()

    return {
      code: this.code,
      constants: this.constants.getAll(),
      atoms: this.atomTable.getAll(),
      localCount: this.localCount,
      locals: this.locals,
      stackSize: this.computeStackSize()
    }
  }

  private process (node: IRNode) {
    switch (node.kind) {
      case 'DeclareLocal': return this.processDeclareLocal(node)
      case 'LoadConst': return this.processLoadConst(node)
      case 'SetLocal': return this.processSetLocal(node)
      case 'GetLocal': return this.processGetLocal(node)
      case 'Add': return this.pushOp(OpCode.OP_add)
      case 'LessThan': return this.pushOp(OpCode.OP_lt)
      case 'LessEqual': return this.pushOp(OpCode.OP_le)
      case 'GreaterThan': return this.pushOp(OpCode.OP_gt)
      case 'GreaterEqual': return this.pushOp(OpCode.OP_ge)
      // 其它比较先复用 OP_lt 变换：le/ge/gt/eq/strict_eq 可在后续加入独立 IR 再替换
      
      case 'ArrayNew': return this.processArrayNew()
      case 'ArrayPush': return this.processArrayPush()
      case 'Drop': return this.pushOp(OpCode.OP_drop)
      case 'IncLocal': return this.processIncLocal(node)
      case 'Label': return this.processLabel(node)
      case 'Jump': return this.emitJump(OpCode.OP_jmp, node.label)
      case 'JumpIfFalse': return this.emitJump(OpCode.OP_jmp_if_false, node.label)
      case 'ReturnUndef': return this.pushOp(OpCode.OP_return_undef)
      case 'ToNumber': return this.pushOp(OpCode.OP_to_number)
      case 'Equal': return this.pushOp(OpCode.OP_eq)
      case 'StrictEqual': return this.pushOp(OpCode.OP_strict_eq)
      case 'ToString': return this.pushOp(OpCode.OP_to_string)
      default: { const _exhaust: never = node as never; throw new Error('Unhandled IR node '+ JSON.stringify(_exhaust)) }
    }
  }

  private processDeclareLocal (node: { name: string }) { this.ensureLocal(node.name) }
  private processLoadConst (node: { value: any }) {
    // 使用常量池 + push_const，便于后续 QuickJS 结构对齐
    const idx = this.constants.add(node.value)
    this.pushOp(OpCode.OP_push_const, idx)
  }
  private processSetLocal (node: { name: string }) {
    const idx = this.ensureLocal(node.name)
    this.pushOp(OpCode.OP_put_loc, idx)
  }
  private processGetLocal (node: { name: string }) {
    const idx = this.ensureLocal(node.name)
    this.pushOp(OpCode.OP_get_loc, idx)
  }
  private processArrayNew () { this.pushOp(OpCode.OP_array_new, 0) }
  private processArrayPush () { this.pushOp(OpCode.OP_array_push) }
  // no-op: real OP_lt used
  private processIncLocal (node: { name: string }) {
    const idx = this.ensureLocal(node.name)
    this.pushOp(OpCode.OP_get_loc, idx)
    const oneIdx = this.constants.add(1)
    this.pushOp(OpCode.OP_push_const, oneIdx)
    this.pushOp(OpCode.OP_add)
    this.pushOp(OpCode.OP_put_loc, idx)
  }
  private processLabel (node: { name: string }) { this.labels.set(node.name, this.code.length) }

  private ensureLocal (name: string) {
    if (!this.locals.has(name)) this.locals.set(name, this.localCount++)
    return this.locals.get(name)!
  }

  private internAtom (name: string): number { return this.atomTable.intern(name) }
  private atomTable = new AtomTable()

  private pushOp (op: OpCode, imm?: number) {
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
      const v = imm ?? 0
      const bytes = meta.imm[0].size
      for (let i = 0; i < bytes; i++) this.code.push((v >> (8 * i)) & 0xff)
    }
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
      if (target === undefined) throw new Error('Unknown label ' + f.label)
      const meta = OPCODE_LOOKUP[this.code[f.pos]]
      const size = meta.size // e.g. 5 for label
      const nextPC = f.pos + size
      const rel = target - nextPC
      const off = f.pos + 1 // opcode 后立即数起始
      const bytes = meta.imm && meta.imm[0] ? meta.imm[0].size : 2
      let v = rel | 0
      for (let i = 0; i < bytes; i++) this.code[off + i] = (v >> (8 * i)) & 0xff
    }
  }

  // 计算最大栈深：基于已发射的指令序列和我们已知的栈效果。
  // 注意：真实 QuickJS 需考虑异常路径/可选操作数，这里先处理线性路径。
  private computeStackSize (): number {
    let sp = 0
    let max = 0
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
        
          sp += 1; break
        case OpCode.OP_dup:
          if (sp > 0) sp += 1; break
        // no swap opcode in current set
        case OpCode.OP_get_loc:
        case OpCode.OP_put_loc: // put_loc consumes value and does not push (already value on stack before store) -> net 0 effect
          // get_loc pushes
          if (op === OpCode.OP_get_loc) sp += 1
          break
        case OpCode.OP_add:
        case OpCode.OP_lt:
          // binary op: pop 2 push 1 => net -1
          sp -= 1; break
        case OpCode.OP_le:
        case OpCode.OP_gt:
        case OpCode.OP_ge:
        case OpCode.OP_eq:
        case OpCode.OP_strict_eq:
          sp -= 1; break
        // no get_field2 in current set
        // no call_* in current set
        case OpCode.OP_array_new:
          sp += 1; break
        case OpCode.OP_array_push:
          // [arr, value] -> [arr]
          sp -= 1; break
        case OpCode.OP_to_number:
          // consumes 1, produces 1
          break
        case OpCode.OP_to_string:
          // consumes 1, produces 1
          break
        case OpCode.OP_drop:
          sp -= 1; break
        case OpCode.OP_jmp_if_false:
          // pop condition
          sp -= 1; break
        case OpCode.OP_jmp:
          // no stack effect
          break
        case OpCode.OP_return_undef:
          // pop? (这里我们返回 undefined 不消耗已有) 设为不变
          break
      }
      if (sp > max) max = sp
      pc += meta.size
    }
    return max < 0 ? 0 : max
  }
}

export function emitBytecode (ir: IRProgram): EmitResult {
  return new BytecodeEmitter().emit(ir)
}
