'use strict'


export async function asyncAdd(a: number, b: number) {
  // 需要设置环境变量 QJS_OP_AWAIT（并与 quickjs-opcode.h 对齐），否则编译报错
  const x = await a

  const y = await b

  return x + y

}

export function* genCounter(n: number) {
  // 需要设置 QJS_OP_YIELD；否则编译报错
  let i = 0

  while (i < n) {
    yield i++

  }
}