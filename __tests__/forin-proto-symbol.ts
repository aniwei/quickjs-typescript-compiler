'use strict'

export function forInProto(o: Record<string, unknown>) {
  const base = Object.create({ inherited: 1 })
  ;(base as Record<string, unknown>).own = 2
  const keys: string[] = []
  for (const k in base) {
    keys.push(k)
  }
  return keys
}

export function forInSymbol() {
  const s = Symbol('s')
  const o: Record<string, unknown> = { a: 1 }
  ;(o as Record<string, unknown> & { [k: symbol]: unknown })[s] = 2
  const keys: (string|symbol)[] = []
  for (const k in o) {
    // 规范 for-in 不枚举 symbol key
    keys.push(k)
  }
  return keys
}
