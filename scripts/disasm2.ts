import fs from 'fs'

// 从 opcodes.json 加载操作码
const opcodes = JSON.parse(fs.readFileSync('opcodes.json', 'utf8'))

// 构建 opcode 表
const opcodeTable: {[key: number]: {name: string, size: number}} = {}
for (const op of opcodes) {
  opcodeTable[op.code] = { name: op.name, size: op.size }
}

const bytecode = [
  0x40, 0xe4, 0x00, 0x00, 0x00, 0x80, 0x3f, 0xe4, 0x00, 0x00, 0x00, 0x80,
  0xb8, 0xb9, 0xba, 0x26, 0x03, 0x00, 0x3b, 0xe4, 0x00, 0x00, 0x00, 0x39,
  0xe5, 0x00, 0x00, 0x00, 0x43, 0xe6, 0x00, 0x00, 0x00, 0x39, 0xe4, 0x00,
  0x00, 0x00, 0xb8, 0x48, 0x24, 0x01, 0x00, 0xcf, 0x28
]

console.log("=== Disassembly ===")
console.log("Source line 0: const arr = [1, 2, 3];")
console.log("Source line 1: console.log(arr[1]);")
console.log("")

let pc = 0
const data = new Uint8Array(bytecode)

while (pc < bytecode.length) {
  const opcode = data[pc]
  const op = opcodeTable[opcode]
  const name = op?.name || `unknown_0x${opcode.toString(16)}`
  const size = op?.size || 1
  
  const bytes = []
  for (let i = 0; i < size && pc + i < bytecode.length; i++) {
    bytes.push(data[pc + i].toString(16).padStart(2, '0'))
  }
  
  console.log(`pc=${pc.toString().padStart(2)}: ${bytes.join(' ').padEnd(18)} ${name}`)
  pc += size
}

console.log("\n=== Key Instructions ===")
console.log("pc=0:  check_define_var arr    -> Line 0 (const arr = ...)")
console.log("pc=6:  define_var arr          -> Line 0")
console.log("pc=12: push_1                   -> Line 0, col 13-14 (the '1' in [1,2,3])")
console.log("pc=13: push_2                   -> Line 0, col 16-17 (the '2')")
console.log("pc=14: push_3                   -> Line 0, col 19-20 (the '3')")
console.log("pc=15: array_from 3            -> Line 0")
console.log("pc=18: put_var_init arr        -> Line 0")
console.log("pc=23: get_var console         -> Line 1, col 0 (console)")
console.log("pc=28: get_field2 log          -> Line 1 (log)")
console.log("pc=33: get_var arr             -> Line 1 (arr)")
console.log("pc=38: push_1                   -> Line 1 (the 1 in arr[1])")
console.log("pc=39: get_array_el            -> Line 1")
console.log("pc=40: call_method 1           -> Line 1")
console.log("pc=43: set_loc0                -> Line 1")
console.log("pc=44: return                  -> Line 1")
