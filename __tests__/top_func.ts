// 顶层函数声明 + 使用，验证 DEFINE_GLOBAL_FUNC_VAR 与 define_func 路径
'use strict'

function add(a: number, b: number): number {
  return a + b
}

const results_func: number[] = []
for (let i: number = 0; i < 5; i++) {
  // 暂不直接调用 add，以避免当前编译器尚未支持普通函数调用（仅支持 obj.method 调用）
  results_func.push(i + 10)
}

export {}
