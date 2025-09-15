'use strict';

// for-of/iterator 降级 + await/yield（需配置 QJS_OP_AWAIT / QJS_OP_YIELD）

export function sumForOf(arr: any[]): any /* i32 */ {
  let s /* i32 */ = 0;
  for (const v of arr) {
    s += v as any /* i32 */;
  }
  return s as any /* i32 */;
}

export async function asyncAdd(a: number, b: number) {
  // 需要设置环境变量 QJS_OP_AWAIT（并与 quickjs-opcode.h 对齐），否则编译报错
  const x = await a;
  const y = await b;
  return x + y;
}

export function* genCounter(n: number) {
  // 需要设置 QJS_OP_YIELD；否则编译报错
  let i = 0;
  while (i < n) {
    yield i++;
  }
}