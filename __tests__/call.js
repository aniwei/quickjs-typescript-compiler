'use strict'

function foo(a, b) {
  // 简单加法返回（当前函数体我们尚未降级真实 body，这里占位供 call 路径验证）
}

// 顶层简单调用（忽略返回值）
foo(1, 2)
