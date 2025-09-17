'use strict'

// 基础类骨架：构造 + 实例方法 + 静态方法

class A {
  x: number
  constructor() { this.x = 1 }
  inc() { this.x = this.x + 1 }
  static make() { return new A() }
}

export function testClass() {
  const a = new A()
  a.inc()
  const b = A.make()
  return a instanceof A && b instanceof A
}
