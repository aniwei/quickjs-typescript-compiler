'use strict'

export function forInProto(o: any) {
  const base = Object.create({ inherited: 1 })
  base.own = 2
  const keys: string[] = []
  for (const k in base) {
    keys.push(k)
  }
  return keys
}

export function forInSymbol() {
  const s = Symbol('s')
  const o: any = { a: 1 }
  o[s] = 2
  const keys: (string|symbol)[] = []
  for (const k in o) {
    // 规范 for-in 不枚举 symbol key
    keys.push(k)
  }
  return keys
}
