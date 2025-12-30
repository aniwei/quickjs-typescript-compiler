import { OPCODE_BY_CODE, TEMP_OPCODE_BY_CODE, TEMP_OPCODE_MAX, TEMP_OPCODE_MIN, type OpcodeDefinition, OpFormat } from './env'
import { parseBytecodeModule, type FunctionBytecode, type ParsedBytecodeModule } from './bytecodeReader'

function readU8(buf: Uint8Array, pos: number): number {
  return buf[pos] ?? 0
}

function readI8(buf: Uint8Array, pos: number): number {
  const v = readU8(buf, pos)
  return (v << 24) >> 24
}

function readU16(buf: Uint8Array, pos: number): number {
  return (readU8(buf, pos) | (readU8(buf, pos + 1) << 8)) >>> 0
}

function readI16(buf: Uint8Array, pos: number): number {
  const v = readU16(buf, pos)
  return (v << 16) >> 16
}

function readU32(buf: Uint8Array, pos: number): number {
  return (readU8(buf, pos) | (readU8(buf, pos + 1) << 8) | (readU8(buf, pos + 2) << 16) | (readU8(buf, pos + 3) << 24)) >>> 0
}

function readI32(buf: Uint8Array, pos: number): number {
  return (readU8(buf, pos) | (readU8(buf, pos + 1) << 8) | (readU8(buf, pos + 2) << 16) | (readU8(buf, pos + 3) << 24)) | 0
}

function getOpDef(op: number): OpcodeDefinition | undefined {
  // IMPORTANT: for serialized/resolved bytecode, prefer the real opcode table.
  // Temp opcodes intentionally overlap with short opcodes (182..200), so using
  // TEMP_OPCODE_BY_CODE first will desynchronize the stream.
  const normal = OPCODE_BY_CODE[op]
  if (normal) return normal

  if (op >= TEMP_OPCODE_MIN && op <= TEMP_OPCODE_MAX) {
    return TEMP_OPCODE_BY_CODE[op]
  }

  return undefined
}

function parseTrailingNumber(id: string): number | undefined {
  const m = id.match(/(\d+)$/)
  if (!m) return undefined
  const n = Number(m[1])
  return Number.isFinite(n) ? n : undefined
}

function formatOperand(buf: Uint8Array, pc: number, op: number, def: OpcodeDefinition): string {
  const operandLen = Math.max(0, def.size - 1)
  const readUnsignedByLen = (): number => {
    switch (operandLen) {
      case 0:
        return 0
      case 1:
        return readU8(buf, pc + 1)
      case 2:
        return readU16(buf, pc + 1)
      case 4:
        return readU32(buf, pc + 1)
      default:
        return readU32(buf, pc + 1)
    }
  }
  const readSignedByLen = (): number => {
    switch (operandLen) {
      case 0:
        return 0
      case 1:
        return readI8(buf, pc + 1)
      case 2:
        return readI16(buf, pc + 1)
      case 4:
        return readI32(buf, pc + 1)
      default:
        return readI32(buf, pc + 1)
    }
  }

  switch (def.format) {
    case OpFormat.none:
      return ''
    case OpFormat.u8:
      return `${readU8(buf, pc + 1)}`
    case OpFormat.i8:
      return `${readI8(buf, pc + 1)}`
    case OpFormat.u16:
    case OpFormat.npop:
    case OpFormat.label16:
    case OpFormat.label_u16:
      return `${readU16(buf, pc + 1)}`
    case OpFormat.i16:
      return `${readI16(buf, pc + 1)}`
    case OpFormat.u32:
      return `${readU32(buf, pc + 1)}`
    case OpFormat.i32:
      return `${readI32(buf, pc + 1)}`
    case OpFormat.const:
    case OpFormat.label:
    case OpFormat.atom:
    case OpFormat.loc:
    case OpFormat.arg:
    case OpFormat.var_ref:
      return `${readUnsignedByLen()}`
    case OpFormat.loc8:
    case OpFormat.const8:
    case OpFormat.label8:
    case OpFormat.atom_u8:
      return `${readU8(buf, pc + 1)}`
    case OpFormat.atom_u16:
      return `${readU16(buf, pc + 1)}`
    case OpFormat.atom_label_u8: {
      const atom = readU32(buf, pc + 1)
      const label = readU8(buf, pc + 5)
      return `atom=${atom} label8=${label}`
    }
    case OpFormat.atom_label_u16: {
      const atom = readU32(buf, pc + 1)
      const label = readU16(buf, pc + 5)
      return `atom=${atom} label16=${label}`
    }
    case OpFormat.npop_u16:
      return `npop=${readU16(buf, pc + 1)}`
    case OpFormat.npopx: {
      const n = parseTrailingNumber(def.id)
      return n === undefined ? '' : `npop=${n}`
    }
    case OpFormat.none_int: {
      // Most short immediates have the value encoded in the opcode (e.g. push_0..push_7).
      const n = parseTrailingNumber(def.id)
      return n === undefined ? '' : `${n}`
    }
    case OpFormat.none_loc: {
      const n = parseTrailingNumber(def.id)
      return n === undefined ? '' : `loc=${n}`
    }
    case OpFormat.none_arg: {
      const n = parseTrailingNumber(def.id)
      return n === undefined ? '' : `arg=${n}`
    }
    case OpFormat.none_var_ref: {
      const n = parseTrailingNumber(def.id)
      return n === undefined ? '' : `var_ref=${n}`
    }
    default:
      return `op=0x${op.toString(16)}`
  }
}

function hexBytes(buf: Uint8Array, start: number, end: number): string {
  return Array.from(buf.slice(start, end)).map(b => b.toString(16).padStart(2, '0')).join(' ')
}

function disassembleFunctionBytecode(bytecode: Uint8Array): string {
  const lines: string[] = []
  let pc = 0
  while (pc < bytecode.length) {
    const op = bytecode[pc]
    const def = getOpDef(op)
    if (!def) {
      lines.push(`${pc.toString().padStart(6, ' ')}  <unknown 0x${op.toString(16).padStart(2, '0')}>`)
      pc += 1
      continue
    }

    const size = Math.max(1, def.size)
    const end = Math.min(bytecode.length, pc + size)
    const bytes = hexBytes(bytecode, pc, end)
    const operand = formatOperand(bytecode, pc, op, def)
    const effect = `pop=${def.nPop} push=${def.nPush}`
    lines.push(`${pc.toString().padStart(6, ' ')}  ${def.id.padEnd(24, ' ')} ${operand.padEnd(18, ' ')}  ${effect.padEnd(16, ' ')}  ${bytes}`.trimEnd())
    pc += size
  }
  return lines.join('\n')
}

function collectInnerFunctions(func: FunctionBytecode): FunctionBytecode[] {
  const out: FunctionBytecode[] = []
  const cpool = func.cpool ?? []
  for (const entry of cpool) {
    if (entry && typeof entry === 'object' && (entry as any).tag === 12 && (entry as any).bytecode instanceof Uint8Array) {
      out.push(entry as FunctionBytecode)
    }
  }
  return out
}

function disassembleModule(mod: ParsedBytecodeModule): string {
  const lines: string[] = []
  lines.push(`Module bytecode version: ${mod.version}`)
  lines.push(`Atom count: ${mod.atoms.length}`)
  lines.push('')

  lines.push('=== Outer Function ===')
  lines.push(`bytecodeLen=${mod.func.bytecodeLen} stackSize=${mod.func.stackSize} varCount=${mod.func.varCount} argCount=${mod.func.argCount}`)
  lines.push(disassembleFunctionBytecode(mod.func.bytecode))

  const inner = collectInnerFunctions(mod.func)
  for (let i = 0; i < inner.length; i++) {
    const f = inner[i]
    lines.push('')
    lines.push(`=== Inner Function #${i} ===`)
    lines.push(`bytecodeLen=${f.bytecodeLen} stackSize=${f.stackSize} varCount=${f.varCount} argCount=${f.argCount}`)
    lines.push(disassembleFunctionBytecode(f.bytecode))
  }

  return lines.join('\n')
}

export function createAdvancedDisassembly(bytecode: Uint8Array): string {
  // Most call sites pass a full .qbc module buffer.
  try {
    const mod = parseBytecodeModule(bytecode)
    return disassembleModule(mod)
  } catch {
    // Fallback: treat input as a raw function bytecode stream.
    return disassembleFunctionBytecode(bytecode)
  }
}
