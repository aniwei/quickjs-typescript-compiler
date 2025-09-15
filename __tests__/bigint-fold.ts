'use strict'

export function divByZeroFold() {
  // 不应在编译期折叠为异常；保持运行期语义
  const a = 1n
  const b = 0n
  // a / b 在运行期抛错（Division by zero），我们只验证编译成功
  return [a, b]
}
