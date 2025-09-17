'use strict'

// 1. 空对象 for-in 不执行
// 2. 循环中删除属性不影响后续已列出 key
// 3. 动态新增属性不被当前枚举捕获（实现依赖 VM 枚举策略）

export function probe() {
  const o: Record<string, any> = {}
  const seq: string[] = []
  for (const k in o) { // should not run
    seq.push('X')
  }

  const a: Record<string, any> = { a: 1, b: 2, c: 3 }
  const seen: string[] = []
  for (const k in a) {
    seen.push(k)
    if (k === 'b') {
      delete a.c
      a.d = 4 // 动态新增
    }
  }
  return { empty: seq, seen }
}
