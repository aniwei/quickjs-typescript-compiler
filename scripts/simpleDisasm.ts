import * as fs from 'fs'
import { parseBytecodeModule, FunctionBytecode } from '../src/bytecodeReader'
import { OPCODE_NAME_TO_CODE, Opcode, OPCODE_DEFS } from '../src/env'

const args = process.argv.slice(2)
if (args.length < 1) {
  console.error('Usage: tsx scripts/simpleDisasm.ts <file.qbc>')
  process.exit(1)
}

const buffer = fs.readFileSync(args[0])
const mod = parseBytecodeModule(new Uint8Array(buffer))

function disasmFunction(func: FunctionBytecode, indent = '') {
  console.log(`${indent}Function: ${func.name}`)
  console.log(`${indent}  Bytecode Len: ${func.bytecodeLen}`)
  
  let pc = 0
  while (pc < func.bytecode.length) {
    const op = func.bytecode[pc]
    const opName = Opcode[op] || `OP_${op}`
    const opDef = OPCODE_DEFS[opName]
    
    let args = ''
    let size = 1
    if (opDef) {
      size = opDef.size
      // TODO: Decode args based on format
      // For now just print raw bytes
      for (let i = 1; i < size; i++) {
        if (pc + i < func.bytecode.length) {
          args += ` ${func.bytecode[pc + i].toString(16).padStart(2, '0')}`
        }
      }
    } else {
      // Unknown opcode, assume 1 byte?
      // This might desync
    }
    
    console.log(`${indent}  ${pc.toString().padStart(4)}: ${opName}${args}`)
    pc += size
  }
  
  if (func.cpool) {
    for (const item of func.cpool) {
      if (typeof item === 'object' && item.tag === 12) { // TC_TAG_FUNCTION_BYTECODE
        disasmFunction(item, indent + '  ')
      }
    }
  }
}

disasmFunction(mod.func)
