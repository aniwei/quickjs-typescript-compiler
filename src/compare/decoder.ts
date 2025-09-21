import { OpCode } from '../compiler/opcodes'

export type Instr = { pc: number, name: string, args: (number|string)[] }

export function normalizeShortOpcodes(bytes: Uint8Array): Uint8Array {
  const out: number[] = []
  for (let i = 0; i < bytes.length; i++) {
    const op = bytes[i]
    if (op >= 0xc0 && op <= 0xc8) {
      const val = (op === 0xc0) ? -1 : (op - 0xc1)
      out.push(OpCode.push_i32)
      const u = val >>> 0
      out.push(u & 0xff, (u >> 8) & 0xff, (u >> 16) & 0xff, (u >> 24) & 0xff)
    } else {
      out.push(op)
    }
  }
  return new Uint8Array(out)
}

export function decodeOurs(bytes: Uint8Array): Instr[] {
  const bc = Array.from(bytes)
  const out: Instr[] = []
  const rev: Record<number, string> = {}
  for (const k of Object.keys(OpCode)) {
    // @ts-ignore
    const v = (OpCode as any)[k]
    if (typeof v === 'number') rev[v] = k
  }
  for (let i = 0; i < bc.length; i++) {
    const pc = i
    const op = bc[i]
    const name = rev[op] || 'op_' + op.toString(16)
    const args: (number|string)[] = []
    if (
      op === OpCode.push_i32 ||
      op === OpCode.get_var ||
      op === OpCode.put_var ||
      op === OpCode.get_field ||
      op === OpCode.put_field
    ) {
      const v0 = bc[i+1], v1 = bc[i+2], v2 = bc[i+3], v3 = bc[i+4]
      const u = (v0 | (v1<<8) | (v2<<16) | (v3<<24)) >>> 0
      args.push(u)
      i += 4
    } else if (op === OpCode.call) {
      const lo = bc[i+1], hi = bc[i+2]
      const argc = lo | (hi<<8)
      args.push(argc)
      i += 2
    } else if (op === OpCode.for_of_next) {
      const off = bc[i+1]
      args.push(off)
      i += 1
    } else if (op === OpCode.if_false || op === OpCode.goto) {
      const v0 = bc[i+1], v1 = bc[i+2], v2 = bc[i+3], v3 = bc[i+4]
      const rel = (v0 | (v1<<8) | (v2<<16) | (v3<<24)) | 0
      args.push(rel)
      i += 4
    }
    out.push({ pc, name, args })
  }
  return out
}

export function parseWasmDump(txt: string): Instr[] {
  const lines = txt.split(/\r?\n/)
  const start = lines.findIndex(l => /\bopcodes:/.test(l))
  const parts = start >= 0 ? lines.slice(start + 1) : lines
  const out: Instr[] = []
  let pc = 0
  for (const raw of parts) {
    const s = raw.trim()
    if (!s) continue
    const m = s.match(/^([0-9]+):\s+(.*)$/)
    const body = m ? m[2] : s
    if (!/^\w/.test(body)) continue
    const tokens = body.split(/\s+/)
    let name = tokens[0]
    // 过滤非指令行（例如额外注释/空行）
    if (!name) continue
    const rest = tokens.slice(1)
    // 归一化名称
    const NAME_MAP: Record<string, string> = {
      if_false8: 'if_false',
      goto8: 'goto',
      get_field2: 'get_field',
      call_method: 'call',
      return_async: 'return_undef',
    }
    if (NAME_MAP[name]) name = NAME_MAP[name]
    // push_数字 常量归一化
    const mPush = name.match(/^push_(-?\d+)$/)
    const args: (number|string)[] = []
    if (mPush) {
      name = 'push_i32'
      args.push(Number(mPush[1]))
    } else {
      for (const t of rest) {
        // 去掉 "0:" 这类索引前缀
        const t2 = t.replace(/^[0-9]+:$/, '')
        if (!t2) continue
        if (/^-?\d+$/.test(t2)) args.push(Number(t2))
        else args.push(t2)
      }
    }
    out.push({ pc, name, args })
    pc++
  }
  return out
}
