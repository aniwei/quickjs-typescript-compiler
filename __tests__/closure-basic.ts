'use strict'

// 基础闭包捕获：内层访问外层变量 a 与参数 b

export function outer(b: number) {
  const a = 10
  function inner(x: number) {
    return a + b + x
  }
  return inner(5)
}
