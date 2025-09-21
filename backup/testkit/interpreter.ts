import { OpCode, OPCODE_META } from '../opcodes'

// Minimal interpreter for a subset of opcodes to validate semantics
export interface ExecResult { stack: any[]; locals: any[] }

export function run(
  code: number[], 
  constants: any[], 
  localCount: number
): ExecResult {
  const stack: any[] = []
  const locals = new Array(localCount).fill(undefined)
  const readImm = (pc: number, bytes: number) => {
    let v = 0
    let mul = 1
    
    for (let i = 0; i < bytes; i++) { 
      v += code[pc + 1 + i] * mul
      mul *= 256 
    }

    if (bytes === 2 && v >= 0x8000) v -= 0x10000
    if (bytes === 4 && v >= 0x80000000) v -= 0x100000000
    
    return v
  }

  for (let pc = 0; pc < code.length;) {
    const op = code[pc]
    const meta = (OPCODE_META as any[])[op]

    if (!meta) {
      throw new Error('Interpreter unsupported opcode value ' + op + ' at pc=' + pc)
    }

    const size = meta.size
    switch (op) {
      case OpCode.OP_goto: {
        const off = readImm(pc, meta.imm[0].size)
        const next = pc + size
        pc = next + off
        continue
      }

      case OpCode.OP_if_false:
      case OpCode.OP_if_false8: {
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
      case OpCode.OP_push_const8: {
        const idx = readImm(pc, meta.imm[0].size)
        stack.push(constants[idx])
        break
      }
      case OpCode.OP_push_i32: {
        const v = readImm(pc, meta.imm[0].size)
        stack.push(v | 0)
        break
      }

      case OpCode.OP_get_loc:
      case OpCode.OP_get_loc8: {
        const i = readImm(pc, meta.imm[0].size)
        stack.push(locals[i])
        break
      }
      case OpCode.OP_get_loc_check: {
        const i = readImm(pc, meta.imm[0].size)
        // Minimal interpreter: treat as get_loc (no TDZ runtime)
        stack.push(locals[i])
        break
      }

      case OpCode.OP_put_loc:
      case OpCode.OP_put_loc8: {
        const i = readImm(pc, meta.imm[0].size)
        const v = stack.pop()
        locals[i] = v
        break
      }
      case OpCode.OP_get_loc0: { stack.push(locals[0]); break }
      case OpCode.OP_get_loc1: { stack.push(locals[1]); break }
      case OpCode.OP_get_loc2: { stack.push(locals[2]); break }
      case OpCode.OP_put_loc0: { locals[0] = stack.pop(); break }
      case OpCode.OP_put_loc1: { locals[1] = stack.pop(); break }
      case OpCode.OP_put_loc2: { locals[2] = stack.pop(); break }

      case OpCode.OP_push_0: { stack.push(0); break }
      case OpCode.OP_push_i8: { const v = readImm(pc, meta.imm[0].size); stack.push((v<<24)>>24); break }

      case OpCode.OP_goto8: {
        const off = readImm(pc, meta.imm[0].size)
        const next = pc + size
        pc = next + off
        continue
      }
      case OpCode.OP_call: {
        const argc = readImm(pc, meta.imm[0].size)
        const args: any[] = []
        for (let i = 0; i < argc; i++) args.unshift(stack.pop())
        const thisArg = stack.pop()
        const func = stack.pop()
        const ret = (typeof func === 'function') ? func.apply(thisArg, args) : undefined
        stack.push(ret)
        break
      }

      case OpCode.OP_fclosure:
      case OpCode.OP_fclosure8: {
        // For tests, we store function bytecode objects in constants via emitter; interpreter won't execute them.
        // Push a stub callable that returns undefined to let call sites proceed.
        const idx = readImm(pc, meta.imm[0].size)
        const fnObj = constants[idx]
        const stub = function() { return undefined }
        ;(stub as any).__qjs = fnObj
        stack.push(stub)
        break
      }

      case OpCode.OP_define_func: {
        // Consumes function object on TOS; in tests we simply drop it.
        stack.pop()
        break
      }

      case OpCode.OP_put_var:
      case OpCode.OP_put_var_strict: {
        // Ignore env; consume value
        const _atom = readImm(pc, meta.imm[0].size)
        const v = stack.pop()
        // emulate env by writing into a hidden globals object if needed in future
        break
      }
      case OpCode.OP_get_var:
      case OpCode.OP_get_var_undef: {
        // return undefined for now (no env)
        const _atom = readImm(pc, meta.imm[0].size)
        stack.push(undefined)
        break
      }

      case OpCode.OP_check_define_var: {
        // atom + flags (ignored in test interpreter)
        // no stack effects
        break
      }

      // TDZ variants: treat as plain get/put in test interpreter
      case OpCode.OP_get_loc_check: {
        const i = readImm(pc, meta.imm[0].size)
        stack.push(locals[i])
        break
      }
      case OpCode.OP_put_loc_check:
      case OpCode.OP_put_loc_check_init: {
        const i = readImm(pc, meta.imm[0].size)
        const v = stack.pop()
        locals[i] = v
        break
      }

      case OpCode.OP_nip: {
        // a b -> b ; remove second from top
        const a = stack.pop()
        stack.pop()
        stack.push(a)
        break
      }

      case OpCode.OP_dup: {
        stack.push(stack[stack.length - 1])
        break
      }
      case OpCode.OP_dup1: {
        // a b -> a a b
        const b = stack.pop()
        const a = stack.pop()
        stack.push(a)
        stack.push(a)
        stack.push(b)
        break
      }
      case OpCode.OP_add: {
        const b = stack.pop()
        const a = stack.pop()
        stack.push(Number(a) + Number(b))
        break
      }
      case OpCode.OP_inc_loc: {
        const i = readImm(pc, meta.imm[0].size)
        const v = locals[i]
        const n = typeof v === 'number' ? v + 1 : Number(v) + 1
        locals[i] = n
        break
      }
      case OpCode.OP_inc: {
        const a = stack.pop()
        // align with QuickJS: ++ on int fast path else numeric coercion
        const n = typeof a === 'number' ? a : Number(a)
        stack.push(n + 1)
        break
      }

      case OpCode.OP_lt: {
        const b = stack.pop()
        const a = stack.pop()
        stack.push(a < b)
        break
      }

      case OpCode.OP_lte: {
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

      case OpCode.OP_gte: {
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

      case OpCode.OP_array_from: {
        const argc = readImm(pc, meta.imm[0].size)
        const arr: any[] = []
        for (let i = argc - 1; i >= 0; i--) {
          arr.unshift(stack.pop())
        }
        stack.push(arr)
        break
      }

      case OpCode.OP_object: {
        stack.push({})
        break
      }

      // QuickJS array helpers used during array literal/spread lowering
      case OpCode.OP_define_array_el: {
        // Stack: [arr, index, value] -> [arr, index]
        const value = stack.pop()
        const index = stack.pop()
        const arr = stack.pop()
        if (Array.isArray(arr)) {
          arr[index] = value
          // emulate C_W_E define: ignore attributes in interpreter
        } else if (arr && typeof arr === 'object') {
          ;(arr as any)[index] = value
        }
        stack.push(arr)
        stack.push(index)
        break
      }

      case OpCode.OP_append: {
        // Stack: [arr, pos, enumobj] -> [arr, pos]
        const enumobj = stack.pop()
        const pos = stack.pop()
        const arr = stack.pop()
        let next = pos
        if (Array.isArray(arr)) {
          if (Array.isArray(enumobj)) {
            for (let i = 0; i < enumobj.length; i++) arr[next++] = enumobj[i]
          } else if (enumobj && typeof (enumobj as any)[Symbol.iterator] === 'function') {
            for (const v of enumobj as any) arr[next++] = v
          }
        }
        stack.push(arr)
        stack.push(next)
        break
      }

      case OpCode.OP_define_field: {
        const imm = readImm(pc, meta.imm[0].size) >>> 0
        const SIM = 1 << 24
        const idx = imm - SIM
        const atomName = String(idx)
        const value = stack.pop()
        const obj = stack.pop()
        obj[atomName] = value
        stack.push(obj)
        break
      }

      case OpCode.OP_put_field: {
        const imm = readImm(pc, meta.imm[0].size) >>> 0
        const SIM = 1 << 24
        const idx = imm - SIM
        const atomName = String(idx)
        const value = stack.pop()
        const obj = stack.pop()
        obj[atomName] = value
        // put_field does not push object back
        break
      }

      case OpCode.OP_get_field2: {
        const imm = readImm(pc, meta.imm[0].size) >>> 0
        const SIM = 1 << 24
        const idx = imm - SIM
        const atomName = String(idx)
        const obj = stack.pop()
        const v = obj[atomName]
        stack.push(v)
        break
      }

      case OpCode.OP_get_array_el: {
        const index = stack.pop()
        const arr = stack.pop()
        const v = (arr as any)[index]
        stack.push(v)
        break
      }

      case OpCode.OP_put_array_el: {
        const value = stack.pop()
        const index = stack.pop()
        const arr = stack.pop()
        ;(arr as any)[index] = value
        break
      }

      case OpCode.OP_swap: {
        const a = stack.pop()
        const b = stack.pop()
        stack.push(a)
        stack.push(b)
        break
      }

      case OpCode.OP_rot3r: {
        const c = stack.pop()
        const b = stack.pop()
        const a = stack.pop()
        // a b c -> c a b
        stack.push(c)
        stack.push(a)
        stack.push(b)
        break
      }

      case OpCode.OP_rot4l: {
        const d = stack.pop()
        const c = stack.pop()
        const b = stack.pop()
        const a = stack.pop()
        // a b c d -> b c d a
        stack.push(b)
        stack.push(c)
        stack.push(d)
        stack.push(a)
        break
      }

      case OpCode.OP_call_method: {
        const argc = readImm(pc, meta.imm[0].size)
        // QuickJS: stack [..., obj, func, arg1, ..., argN]
        const args: any[] = []
        for (let i = 0; i < argc; i++) args.unshift(stack.pop())
        const func = stack.pop()
        const obj = stack.pop()

        if (Array.isArray(obj) && typeof func === 'function') {
          // handle common pattern: Array.prototype.push
          if (func === Array.prototype.push) {
            const newLen = func.apply(obj, args)
            stack.push(newLen)
          } else {
            const ret = func.apply(obj, args)
            stack.push(ret)
          }
        } else if (typeof func === 'function') {
          const ret = func.apply(obj, args)
          stack.push(ret)
        } else {
          stack.push(undefined)
        }

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
