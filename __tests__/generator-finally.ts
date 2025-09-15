'use strict'

export function* genWithFinally(n: number) {
  try {
    let i = 0
    while (i < n) {
      yield i++
    }
  } finally {
    // 仅用于覆盖 finally 与 yield 的并存情形
    const noop = 0
  }
}
