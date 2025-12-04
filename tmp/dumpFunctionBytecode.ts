import { TypeScriptCompiler } from '../src'
import { JSFunctionDef } from '../src/functionDef'
import { Opcode, OPCODE_DEFS, SHORT_OPCODE_DEFS, OpFormat } from '../src/env'

const opcodeNames = Opcode as unknown as Record<number, string>

type OpcodeDef = typeof OPCODE_DEFS[string]
const opcodeDefsByCode: Array<OpcodeDef | undefined> = []
const buildOpcodeTable = () => {
  const opMap = Opcode as unknown as Record<string, number>
  for (const [name, def] of Object.entries(OPCODE_DEFS)) {
    const code = opMap[name]
    if (typeof code === 'number') {
      opcodeDefsByCode[code] = def
    }
  }
  for (const [name, def] of Object.entries(SHORT_OPCODE_DEFS)) {
    const code = opMap[name]
    if (typeof code === 'number') {
      opcodeDefsByCode[code] = def
    }
  }
}

buildOpcodeTable()

const readU16 = (buf: Uint8Array, offset: number) => buf[offset] | (buf[offset + 1] << 8)
const readI8 = (value: number) => (value << 24) >> 24
const readI16 = (value: number) => (value << 16) >> 16
const readI32 = (buf: Uint8Array, offset: number) =>
  (buf[offset] | (buf[offset + 1] << 8) | (buf[offset + 2] << 16) | (buf[offset + 3] << 24))

function formatOpcode(op: number) {
  const name = opcodeNames[op]
  return name ? name.replace(/^OP_/, '') : `op_${op}`
}

function disassemble(func: JSFunctionDef, atoms: (id: number) => string) {
  const buf = func.byteCode.buffer
  let pos = 0
  const lines: string[] = []
  while (pos < buf.length) {
    const op = buf[pos]
    const def = opcodeDefsByCode[op]
    if (!def) {
      lines.push(`${pos.toString().padStart(4, '0')}: <unknown ${op}>`)
      pos += 1
      continue
    }
    let operands: string | undefined
    switch (def.format) {
      case OpFormat.atom:
      case OpFormat.atom_u8:
      case OpFormat.atom_u16:
      case OpFormat.atom_label_u8:
      case OpFormat.atom_label_u16: {
        const atom = readI32(buf, pos + 1) >>> 0
        operands = atoms(atom)
        break
      }
      case OpFormat.loc:
      case OpFormat.loc8: {
        const loc = def.format === OpFormat.loc ? readU16(buf, pos + 1) : buf[pos + 1]
        operands = `loc[${loc}]`
        break
      }
      case OpFormat.arg: {
        const arg = buf[pos + 1]
        operands = `arg[${arg}]`
        break
      }
      case OpFormat.label8: {
        const delta = readI8(buf[pos + 1])
        const target = pos + 2 + delta
        operands = `${delta >= 0 ? '+' : ''}${delta} -> ${target}`
        break
      }
      case OpFormat.label16: {
        const delta = readI16(readU16(buf, pos + 1))
        const target = pos + 3 + delta
        operands = `${delta >= 0 ? '+' : ''}${delta} -> ${target}`
        break
      }
      case OpFormat.label: {
        const delta = readI32(buf, pos + 1)
        const target = pos + 5 + delta
        operands = `${delta >= 0 ? '+' : ''}${delta} -> ${target}`
        break
      }
      case OpFormat.npop:
      case OpFormat.npop_u16: {
        const imm = readU16(buf, pos + 1)
        operands = `${imm}`
        break
      }
      default:
        break
    }
    lines.push(`${pos.toString().padStart(4, '0')}: ${formatOpcode(op)}${operands ? ' ' + operands : ''}`)
    pos += def.size
  }
  return lines
}

function collectFunctions(root: JSFunctionDef, list: JSFunctionDef[] = []) {
  list.push(root)
  root.cpool.forEach(entry => {
    if (entry.type === 'function' && entry.value) {
      collectFunctions(entry.value as JSFunctionDef, list)
    }
  })
  return list
}

async function main() {
  const [ , , fixture, targetName ] = process.argv
  if (!fixture) {
    console.error('Usage: tsx tmp/dumpFunctionBytecode.ts <fixture.ts> [functionName]')
    process.exit(1)
  }
  const compiler = new TypeScriptCompiler({})
  const { functionDef } = await compiler.compileFileWithArtifacts(fixture)
  const atomManager = compiler.atomManager
  const funcs = collectFunctions(functionDef)
  for (const func of funcs) {
    const name = atomManager.getString(func.funcName)
    if (targetName && name !== targetName)
      continue
    console.log(`\nFunction: ${name || '<anonymous>'}`)
    const lines = disassemble(func, atom => atomManager.getString(atom))
    for (const line of lines) {
      console.log(line)
    }
    if (targetName)
      break
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
