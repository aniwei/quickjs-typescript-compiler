import fs from 'fs'
import { initWasm, QuickJSWasmModule } from '../src/wasm'

// 从 opcodes.json 加载操作码
const opcodes = JSON.parse(fs.readFileSync('opcodes.json', 'utf8'))

// 构建 opcode 表
const opcodeTable: {[key: number]: {name: string, args: string}} = {}
for (const op of opcodes) {
  opcodeTable[op.opcode] = { name: op.name, args: op.fmt || '' }
}

// 指令长度计算
function getInstructionLength(opcode: number, data: Uint8Array, offset: number): number {
  const op = opcodeTable[opcode]
  if (!op) return 1
  
  const fmt = op.args
  let len = 1 // opcode itself
  
  // Parse format string
  for (let i = 0; i < fmt.length; i++) {
    switch (fmt[i]) {
      case 'a': len += 4; break  // atom (u32)
      case 'b': len += 1; break  // byte
      case 's': len += 2; break  // short (u16)
      case 'i': len += 4; break  // int (i32)
      case 'l': len += 4; break  // label (i32)
      default: break
    }
  }
  return len
}

async function main() {
  const bytecode = [
    0x40, 0xe4, 0x00, 0x00, 0x00, 0x80, 0x3f, 0xe4, 0x00, 0x00, 0x00, 0x80,
    0xb8, 0xb9, 0xba, 0x26, 0x03, 0x00, 0x3b, 0xe4, 0x00, 0x00, 0x00, 0x39,
    0xe5, 0x00, 0x00, 0x00, 0x43, 0xe6, 0x00, 0x00, 0x00, 0x39, 0xe4, 0x00,
    0x00, 0x00, 0xb8, 0x48, 0x24, 0x01, 0x00, 0xcf, 0x28
  ]

  console.log("=== Disassembly ===")
  console.log("Source: const arr = [1, 2, 3];")
  console.log("        console.log(arr[1]);")
  console.log("")
  
  let pc = 0
  const data = new Uint8Array(bytecode)
  
  while (pc < bytecode.length) {
    const opcode = data[pc]
    const op = opcodeTable[opcode]
    const name = op?.name || `unknown_${opcode.toString(16)}`
    const len = getInstructionLength(opcode, data, pc)
    
    const bytes = []
    for (let i = 0; i < len && pc + i < bytecode.length; i++) {
      bytes.push(data[pc + i].toString(16).padStart(2, '0'))
    }
    
    console.log(`pc=${pc.toString().padStart(2)}: ${bytes.join(' ').padEnd(20)} ${name}`)
    pc += len
  }

  // Now show what pc2line entries mean
  console.log("\n=== pc2line Comparison ===")
  console.log("TS pc2line entries (decoded):")
  console.log("  pc=12 → line=0, col=26  (push_1)")
  console.log("  pc=13 → line=0, col=32  (push_2)")
  console.log("  pc=14 → line=0, col=38  (push_3)")
  console.log("  pc=38 → line=1, col=43  (get_array_el)") 
  console.log("  pc=40 → line=1, col=74  (call_method)")
  console.log("")
  console.log("WASM pc2line entries (decoded):")
  console.log("  pc=23 → line=1, col=0   (?)")
  console.log("  pc=28 → line=1, col=14  (?)")
  console.log("  pc=33 → line=1, col=24  (?)")
  console.log("  pc=39 → line=1, col=30  (get_array_el)")
  console.log("  pc=40 → line=1, col=37  (call_method)")
}

main()
