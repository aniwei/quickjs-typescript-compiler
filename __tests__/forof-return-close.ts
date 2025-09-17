'use strict'

// 目的：验证 for-of 在 break / return / throw 下触发 iterator.return（如果存在）
// fallback 分支与原生指令分支都应保持行为一致（原生命令由 VM 保证，fallback 由 finally + return 调用）

class TracingIterator implements Iterator<number> {
  i = 0
  closed: string[] = []
  next(): IteratorResult<number> {
    if (this.i < 3) return { value: this.i++, done: false }
    return { value: undefined as any, done: true }
  }
  return(): IteratorResult<number> {
    this.closed.push('close')
    return { value: undefined as any, done: true }
  }
}

export function breakCase() {
  const it = new TracingIterator()
  const acc: number[] = []
  for (const v of it as any) {
    acc.push(v)
    break
  }
  return { acc, closed: it.closed }
}

export function returnCase() {
  const it = new TracingIterator()
  function inner() {
    for (const v of it as any) {
      if (v === 1) return v
    }
    return -1
  }
  const r = inner()
  return { r, closed: it.closed }
}

export function throwCase() {
  const it = new TracingIterator()
  try {
    for (const v of it as any) {
      if (v === 1) throw new Error('boom')
    }
  } catch (e) {
    return { err: (e as Error).message, closed: it.closed }
  }
  return { err: 'no', closed: it.closed }
}
