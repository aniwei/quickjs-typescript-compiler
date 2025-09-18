import { OpCode, OPCODE_META } from '../opcodes'

// Minimal interpreter for a subset of opcodes to validate semantics
export interface ExecResult { stack: any[]; locals: any[] }

export function run(code: number[], constants: any[], localCount: number): ExecResult {
  const stack: any[] = []
  const locals = new Array(localCount).fill(undefined)
  const readImm = (pc: number, bytes: number) => {
    let v = 0
    for (let i = 0; i < bytes; i++) v |= code[pc + 1 + i] << (8 * i)
    // treat as signed for 2-byte jumps if needed by tests later
    if (bytes === 2 && v & 0x8000) v = v - 0x10000
    if (bytes === 4 && v & 0x80000000) v = v - 0x100000000
    return v
  }

  for (let pc = 0; pc < code.length;) {
    const op = code[pc]
    const meta = (OPCODE_META as any[])[op]
    const size = meta.size
    switch (op) {
      case OpCode.OP_jmp: {
        const off = readImm(pc, meta.imm[0].size)
        const next = pc + size
        pc = next + off
        continue
      }
      case OpCode.OP_jmp_if_false: {
        const off = readImm(pc, meta.imm[0].size)
        const cond = stack.pop()
        const next = pc + size
        if (!cond) pc = next + off
        else pc = next
        continue
      }
      case OpCode.OP_push_const: {
        const idx = readImm(pc, meta.imm[0].size)
        stack.push(constants[idx])
        break
      }
      case OpCode.OP_get_loc: {
        const i = readImm(pc, meta.imm[0].size)
        stack.push(locals[i])
        break
      }
      case OpCode.OP_put_loc: {
        const i = readImm(pc, meta.imm[0].size)
        const v = stack.pop()
        locals[i] = v
        break
      }
      case OpCode.OP_add: {
        const b = stack.pop()
        const a = stack.pop()
        stack.push(Number(a) + Number(b))
        break
      }
      case OpCode.OP_to_number: {
        const a = stack.pop()
        stack.push(Number(a))
        break
      }
      case OpCode.OP_to_string: {
        const a = stack.pop()
        stack.push(String(a))
        break
      }
      case OpCode.OP_lt: {
        const b = stack.pop()
        const a = stack.pop()
        stack.push(a < b)
        break
      }
      case OpCode.OP_le: {
        const b = stack.pop()
        const a = stack.pop()
        stack.push(a <= b)
        break
      }
      case OpCode.OP_gt: {
        const b = stack.pop()
        const a = stack.pop()
        stack.push(a > b)
        break
      }
      case OpCode.OP_ge: {
        const b = stack.pop()
        const a = stack.pop()
        stack.push(a >= b)
        break
      }
      case OpCode.OP_eq: {
        const b = stack.pop()
        const a = stack.pop()
        // Abstract equality like JS
        // eslint-disable-next-line eqeqeq
        stack.push(a == b)
        break
      }
      case OpCode.OP_strict_eq: {
        const b = stack.pop()
        const a = stack.pop()
        stack.push(a === b)
        break
      }
      case OpCode.OP_array_new: {
        stack.push([])
        break
      }
      case OpCode.OP_array_push: {
        const v = stack.pop()
        const arr = stack.pop()
        arr.push(v)
        stack.push(arr)
        break
      }
      case OpCode.OP_drop: {
        stack.pop()
        break
      }
      case OpCode.OP_return_undef: {
        // function return: clear stack to emulate leaving frame
        stack.length = 0
        pc = code.length
        continue
      }
      default:
        throw new Error('Interpreter unsupported opcode ' + op)
    }
    pc += size
  }

  return { stack, locals }
}
