'use strict'

// 基础函数编译：应生成局部变量初始化、简单算术、return。
// 目前 Phase1 子集：var/let/const 区分暂未完全实现，仅放入局部槽。

function add(a: number, b: number) {
  const c = a + b
  return c
}

export function callAdd() {
  return add(3, 4)
}
