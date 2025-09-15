'use strict'

export function andShort(a: number, b: () => number) {
  // 生成 && 短路分支，右侧有副作用
  const x = a && b()
  return x
}

export function orShort(a: number, b: () => number) {
  // 生成 || 短路分支，右侧有副作用
  const y = a || b()
  return y
}
