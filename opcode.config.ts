// 手工维护：QuickJS opcode 子集，对齐 quickjs-opcode.h 顺序的数值（不可自动解析头文件）
// 仅列出当前编译 compute.ts 所需 + 控制流/比较。
// size 对应 quickjs-opcode.h 中第二个参数；fmt 在生成代码时推导立即数字节数。
// feature: bigint / short / always
export interface OpcodeConfigEntry {
  name: string
  code: number
  size: number
  fmt: 'none'|'i32'|'const'|'loc'|'loc8'|'label'|'i16'|'i8'|'u8'|'atom'|'u16'
  feature?: 'bigInt' | 'short'
  doc?: string
}

export const OPCODE_CONFIG: OpcodeConfigEntry[] = [
  // QuickJS opcode 0 是 invalid，占位不使用。若需要 nop (实际代码=181) 可后续加入。
  { name: 'push_i32', code: 1, size: 5, fmt: 'i32', doc: 'push int32 literal' },
  { name: 'push_const', code: 2, size: 5, fmt: 'const', doc: 'push const pool entry (u32 index)' },
  { name: 'push_atom_value', code: 4, size: 5, fmt: 'atom', doc: 'push global atom value' },
  { name: 'push_false', code: 9, size: 1, fmt: 'none' },
  { name: 'push_true', code: 10, size: 1, fmt: 'none' },
  { name: 'drop', code: 14, size: 1, fmt: 'none' },
  { name: 'dup', code: 17, size: 1, fmt: 'none' },
  { name: 'swap', code: 27, size: 1, fmt: 'none', doc: 'swap top two stack values' },
  { name: 'call_constructor', code: 33, size: 3, fmt: 'u16', doc: 'call constructor (u16 argc)' },
  { name: 'call', code: 34, size: 3, fmt: 'u16', doc: 'call function (u16 argc)' },
  { name: 'tail_call', code: 35, size: 3, fmt: 'u16', doc: 'tail call (u16 argc)' },
  { name: 'call_method', code: 36, size: 3, fmt: 'u16', doc: 'call method (u16 argc)' },
  { name: 'tail_call_method', code: 37, size: 3, fmt: 'u16', doc: 'tail call method (u16 argc)' },
  { name: 'return_undef', code: 41, size: 1, fmt: 'none' },
  { name: 'get_field', code: 66, size: 5, fmt: 'atom', doc: 'obj . atom -> value' },
  { name: 'get_field2', code: 67, size: 5, fmt: 'atom', doc: 'obj . atom -> obj value' },
  { name: 'get_loc', code: 90, size: 3, fmt: 'loc' },
  { name: 'put_loc', code: 91, size: 3, fmt: 'loc' },
  { name: 'if_false', code: 108, size: 5, fmt: 'label' },
  { name: 'goto', code: 110, size: 5, fmt: 'label' },
  { name: 'inc_loc', code: 149, size: 2, fmt: 'loc8', feature: 'short' },
  { name: 'add', code: 159, size: 1, fmt: 'none' },
  { name: 'lt', code: 165, size: 1, fmt: 'none' },
  { name: 'push_bigint_i32', code: 188, size: 5, fmt: 'i32', feature: 'bigInt' }
]
