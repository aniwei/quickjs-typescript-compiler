import * as fs from 'fs'
import * as path from 'path'

export const FUN_FLAG_STRICT = 1 << 0
export const FUN_FLAG_ARROW  = 1 << 4

// 扩展：生成器/异步标志（用于内部对齐；数值无需与 QuickJS 完全一致，因为当前写出格式为自有格式）
export const FUN_FLAG_GENERATOR = 1 << 5
export const FUN_FLAG_ASYNC     = 1 << 6

export const FUN_KIND_BYTECODE = 0 // function/script
export const FUN_KIND_MODULE  = 1  // module

// QuickJS 字节码对象流前导版本：1 字节（BC_VERSION）
// - 非 bignum: 0x05
// - bignum:    0x45
function parseHexOrDec(s: string): number {
  if (/^0x/i.test(s)) return Number(BigInt(s))
  return parseInt(s, 10)
}

const DEFAULT_BC_VERSION = (process.env.QJS_CONFIG_BIGNUM === '1' || process.env.QJS_BIGNUM === '1') ? 0x45 : 0x05

export const BYTECODE_VERSION = process.env.QJS_BC_VERSION ? parseHexOrDec(process.env.QJS_BC_VERSION) : DEFAULT_BC_VERSION

// === QuickJS opcode 配置（静态，按本仓库内置 quickjs-opcode.h 对齐）===
// 目标：去掉运行期嗅探/探测，直接以本仓库的 QuickJS 源码为准，保持稳定、可复现。
// 说明：仅列出本项目需要的可选“短指令”或派生 peephole 所需 opcode；其余由 src/op.ts 固定。
// 如果你切换了 QuickJS 版本且 opcode 序号发生变化，请在此处更新映射。
const STATIC_OPCODES: Record<string, number> = {
  // Short jumps（在 SHORT_OPCODES 启用的构建中存在）
  goto16: 239,
  // typeof/null/undefined 专用测试（位于短指令尾部，顺序与 QuickJS 对齐）
  is_undefined: 244,
  is_null: 245,
  typeof_is_undefined: 246,
  typeof_is_function: 247,
  // IC 与调试（对齐 src/op.ts 中的锚点）
  get_field_ic: 248,
  get_field2_ic: 249,
  put_field_ic: 250,
  debugger: 251,
}

// 是否启用 goto16：默认开启（与本仓库 QuickJS 源一致）；可用环境变量覆盖
export const HAS_GOTO16 = process.env.QJS_HAS_GOTO16
  ? process.env.QJS_HAS_GOTO16 === '1'
  : true

// Optional advanced opcodes (await/yield)
// 优先环境变量覆盖；否则保持 null（编译相关语法时会显式报错提示未配置）。
function parseMaybeOpcode(name: string): number | null {
  const v = process.env[name]
  if (!v) return null
  try { return parseHexOrDec(v) } catch { return null }
}

export const OP_AWAIT: number | null = parseMaybeOpcode('QJS_OP_AWAIT')
export const OP_YIELD: number | null = parseMaybeOpcode('QJS_OP_YIELD')

// 通用查询：返回静态配置到的指定 opcode 数值（若不可得则返回 null）。
export function getDetectedOpcode(name: string): number | null {
  return STATIC_OPCODES[name] ?? null
}