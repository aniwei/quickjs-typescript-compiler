type TraceLevel = 1 | 2 | 3

type TraceCategories = {
  EMIT: boolean
  VARIABLE: boolean
  CLOSURE: boolean
  LABEL: boolean
  STACK: boolean
  PC2LINE: boolean
  SCOPE: boolean
  ASSIGN: boolean
}

type TraceConfig = {
  enabled: boolean
  level: TraceLevel
  categories: TraceCategories
}

let cached: TraceConfig | null = null

function readBoolEnv(key: string, defaultValue: boolean): boolean {
  const v = process.env[key]
  if (v === '0') return false
  if (v === '1') return true
  return defaultValue
}

function getConfig(): TraceConfig {
  if (cached) return cached

  const enabled = process.env.QTS_TRACE_ENABLED === '1'

  const level: TraceLevel = (() => {
    const v = process.env.QTS_TRACE_LEVEL
    if (v === '1' || v === '2' || v === '3') return Number(v) as TraceLevel
    return 1
  })()

  const defaultCategory = enabled

  cached = {
    enabled,
    level,
    categories: {
      EMIT: readBoolEnv('QTS_TRACE_EMIT', defaultCategory),
      VARIABLE: readBoolEnv('QTS_TRACE_VARIABLE', defaultCategory),
      CLOSURE: readBoolEnv('QTS_TRACE_CLOSURE', defaultCategory),
      LABEL: readBoolEnv('QTS_TRACE_LABEL', defaultCategory),
      STACK: readBoolEnv('QTS_TRACE_STACK', defaultCategory),
      PC2LINE: readBoolEnv('QTS_TRACE_PC2LINE', defaultCategory),
      SCOPE: readBoolEnv('QTS_TRACE_SCOPE', defaultCategory),
      ASSIGN: readBoolEnv('QTS_TRACE_ASSIGN', defaultCategory),
    },
  }

  return cached
}

function writeLine(line: string) {
  // Match QuickJS qts_trace.h: uses stderr.
  process.stderr.write(line + '\n')
}

export function qtsTraceResetForTests() {
  cached = null
}

export function qtsTraceEnabled(): boolean {
  return getConfig().enabled
}

export function qtsTraceLevel(): TraceLevel {
  return getConfig().level
}

export function qtsTraceEmitOp(op: number, pos: number) {
  const cfg = getConfig()
  if (!cfg.enabled || !cfg.categories.EMIT) return
  writeLine(`[QTS:EMIT] pos=${pos} op=${op}`)
}

export function qtsTraceEmitU8(val: number, pos: number) {
  const cfg = getConfig()
  if (!cfg.enabled || !cfg.categories.EMIT) return
  const b = val & 0xff
  writeLine(`[QTS:EMIT] pos=${pos} u8=0x${b.toString(16).padStart(2, '0')}`)
}

export function qtsTraceEmitU16(val: number, pos: number) {
  const cfg = getConfig()
  if (!cfg.enabled || !cfg.categories.EMIT) return
  const u16 = val & 0xffff
  writeLine(`[QTS:EMIT] pos=${pos} u16=0x${u16.toString(16).padStart(4, '0')} (${val | 0})`)
}

export function qtsTraceEmitU32(val: number, pos: number) {
  const cfg = getConfig()
  if (!cfg.enabled || !cfg.categories.EMIT) return
  const u32 = val >>> 0
  writeLine(`[QTS:EMIT] pos=${pos} u32=0x${u32.toString(16).padStart(8, '0')} (${val | 0})`)
}

export function qtsTraceEmitAtom(atom: number, pos: number) {
  const cfg = getConfig()
  if (!cfg.enabled || !cfg.categories.EMIT) return
  writeLine(`[QTS:EMIT] pos=${pos} atom=${atom | 0}`)
}

export function qtsTracePc2lineBegin(slotCount: number, sourcePos: number) {
  const cfg = getConfig()
  if (!cfg.enabled || !cfg.categories.PC2LINE) return
  if (cfg.level < 2) return
  writeLine(`[QTS:PC2LINE] begin: slots=${slotCount | 0} source_pos=${sourcePos >>> 0}`)
}

export function qtsTracePc2lineInit(lineNum: number, colNum: number) {
  const cfg = getConfig()
  if (!cfg.enabled || !cfg.categories.PC2LINE) return
  if (cfg.level < 2) return
  writeLine(`[QTS:PC2LINE] init: line=${lineNum | 0} col=${colNum | 0}`)
}

export function qtsTracePc2lineEnd(outLen: number) {
  const cfg = getConfig()
  if (!cfg.enabled || !cfg.categories.PC2LINE) return
  if (cfg.level < 2) return
  writeLine(`[QTS:PC2LINE] end: pc2line_len=${outLen | 0}`)
}

export function qtsTracePc2lineSlot(
  i: number,
  pc: number,
  sourcePos: number,
  lineNum: number,
  colNum: number,
  diffPc: number,
  diffLine: number,
  diffCol: number,
  isShort: boolean,
  op: number,
) {
  const cfg = getConfig()
  if (!cfg.enabled || !cfg.categories.PC2LINE) return
  if (cfg.level < 3) return
  writeLine(
    `[QTS:PC2LINE] slot[${i | 0}]: pc=${pc >>> 0} src=${sourcePos >>> 0} ` +
      `line=${lineNum | 0} col=${colNum | 0} dpc=${diffPc | 0} dline=${diffLine | 0} dcol=${diffCol | 0} ` +
      `${isShort ? 'short' : 'long'} op=0x${(op & 0xff).toString(16).padStart(2, '0')}`,
  )
}
