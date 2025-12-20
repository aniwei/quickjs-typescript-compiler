import fs from 'fs'

// 从 bytecode offset 0x40 开始是函数字节码
const wasmBytes = fs.readFileSync('artifacts/array-literal.wasm.qbc')

// 找到函数字节码开始位置
// 根据 disasm，从 0x40 开始
const bytecodeStart = 0x40

// check_define_var arr, 128
// a6 01 00 00 00 = check_define_var (opcode=166, atom_index=ULEB, flags=byte)
// 40 = 
// 

console.log("Raw bytecode from 0x40:")
for (let i = bytecodeStart; i < 0x70; i += 16) {
  const row = []
  for (let j = 0; j < 16 && i + j < 0x70; j++) {
    row.push(wasmBytes[i + j].toString(16).padStart(2, '0'))
  }
  console.log(`${i.toString(16).padStart(4, '0')}: ${row.join(' ')}`)
}

// 让我用 QuickJS 规范解析
// 从函数头开始
// 函数布局: 
//   - 先是 module header
//   - 然后是 function definitions

// 让我找 function bytecode
// offset 0x40 应该是 check_define_var
// a6 = 166 = OP_check_define_var

console.log("\n=== Parsing bytecode ===")
let pc = 0
let offset = bytecodeStart

// Opcode table (部分)
const opcodes: {[key: number]: [string, string]} = {
  0xa6: ['check_define_var', 'atom_u8'],  // atom, flags
  0xa4: ['define_var', 'atom_u8'],        // atom, flags
  0xb8: ['push_1', ''],
  0xb9: ['push_2', ''],
  0xba: ['push_3', ''],
  0x26: ['array_from', 'u16'],
  0x3b: ['put_var_init', 'atom'],
  0xe4: ['push_atom_value', 'atom'],
  0x39: ['get_var', 'atom'],
  0xe5: ['get_field2', 'atom'],
  0x43: ['get_field2', 'atom'], // may need to verify
  0x48: ['get_array_el', ''],
  0x24: ['call_method', 'u16'],
  0xcf: ['set_loc0', ''],
  0x28: ['return', ''],
}

// 简化解析
const data = wasmBytes.slice(bytecodeStart)
let i = 0
while (i < 0x30) {
  const op = data[i]
  const pcStr = `pc=${pc.toString().padStart(2)}`
  const offsetStr = `offset=0x${(bytecodeStart + i).toString(16)}`
  
  let opName = opcodes[op]?.[0] || `unknown(0x${op.toString(16)})`
  let argDesc = opcodes[op]?.[1] || ''
  let argLen = 0
  
  // 简化的参数长度计算
  if (argDesc === 'atom_u8') argLen = 5  // atom(4) + u8(1)
  else if (argDesc === 'atom') argLen = 4
  else if (argDesc === 'u16') argLen = 2
  else if (argDesc === 'u8') argLen = 1
  
  const args = []
  for (let j = 1; j <= argLen && i + j < data.length; j++) {
    args.push(data[i + j].toString(16).padStart(2, '0'))
  }
  
  console.log(`${pcStr} ${offsetStr}: 0x${op.toString(16).padStart(2, '0')} ${opName} ${args.join(' ')}`)
  
  i += 1 + argLen
  pc += 1 + argLen
  
  if (op === 0x28) break // return
}
