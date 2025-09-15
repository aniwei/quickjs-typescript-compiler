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

// === QuickJS opcode 自动探测（从 cpp/QuickJS/include/QuickJS/quickjs-opcode.h 推导）===
// - 默认开启（QJS_AUTO_DETECT_OPCODES != '0'），失败则回退到环境变量或空值
// - 通过 QJS_SHORT_OPCODES 控制是否认为 SHORT_OPCODES 开启（默认开启）
const AUTO_DETECT = process.env.QJS_AUTO_DETECT_OPCODES !== '0'
const ASSUME_SHORT_OPCODES = process.env.QJS_SHORT_OPCODES !== '0'

function tryDetectOpcodesFromHeader(): Record<string, number> | null {
  try {
    const headerPath = path.resolve(__dirname, '../cpp/QuickJS/include/QuickJS/quickjs-opcode.h')
    if (!fs.existsSync(headerPath)) return null
    const text = fs.readFileSync(headerPath, 'utf8')
    const lines = text.split(/\r?\n/)

    let inShortBlock = false
    const names: string[] = []

    for (let raw of lines) {
      const line = raw.trim()
      if (line.startsWith('#if')) {
        if (/^#if\s+SHORT_OPCODES/.test(line)) {
          inShortBlock = true
        }
      } else if (line.startsWith('#endif')) {
        if (inShortBlock) inShortBlock = false
      }

      // 只在 SHORT_OPCODES 区间内根据 ASSUME_SHORT_OPCODES 决定是否计入
      if (inShortBlock && !ASSUME_SHORT_OPCODES) continue

      // 只统计 DEF 宏（忽略临时 def）
      const m = line.match(/^DEF\s*\(\s*([a-zA-Z0-9_]+)\s*,/)
      if (m) {
        const name = m[1]
        names.push(name)
      }
    }

    // 将收集到的名称顺序映射为编号，从 0 开始
    const map: Record<string, number> = Object.create(null)
    names.forEach((n, i) => { map[n] = i })

    // 与本项目内置常量做一组校验，若不匹配则认为探测不可靠
    const expected: Record<string, number> = {
      // 取一些我们在 src/op.ts 中已固定的操作码进行抽样验证
      if_false: 108,
      if_true: 109,
      goto: 110,
      add: 159,
      lnot: 179,
      goto16: 239,
      get_field_ic: 248,
      debugger: 251,
    }
    for (const k of Object.keys(expected)) {
      if (map[k] !== expected[k]) {
        return null
      }
    }

    return map
  } catch {
    return null
  }
}

const OPCMAP = AUTO_DETECT ? tryDetectOpcodesFromHeader() : null

// Feature flags from env，若未显式设置则依据是否检测到 goto16 自动开启
export const HAS_GOTO16 = process.env.QJS_HAS_GOTO16
  ? process.env.QJS_HAS_GOTO16 === '1'
  : !!(OPCMAP && OPCMAP['goto16'] != null)

// Optional advanced opcodes (await/yield)
// 优先环境变量覆盖；否则尝试从自动探测映射获取；若仍不可得，则为 null（编译相关语法时会报错）。
function parseMaybeOpcode(name: string): number | null {
  const v = process.env[name]
  if (!v) return null
  try { return parseHexOrDec(v) } catch { return null }
}

const DETECTED_AWAIT = OPCMAP ? OPCMAP['await'] : undefined
const DETECTED_YIELD = OPCMAP ? OPCMAP['yield'] : undefined

export const OP_AWAIT: number | null = (parseMaybeOpcode('QJS_OP_AWAIT') ?? (DETECTED_AWAIT ?? null))
export const OP_YIELD: number | null = (parseMaybeOpcode('QJS_OP_YIELD') ?? (DETECTED_YIELD ?? null))