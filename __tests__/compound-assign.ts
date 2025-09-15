'use strict'

export function elemPlusAssign(o: any, i: any) {
  // 读-改-写栈序：使用临时局部保存 obj 与 idx
  o[i] += 1
  return o[i]
}

export function propPlusAssign(o: any) {
  o.x += 2
  return o.x
}
