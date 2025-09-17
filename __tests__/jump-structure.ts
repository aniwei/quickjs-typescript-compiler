'use strict'

// 构造多种 if / goto 组合测试 peephole 规则等价性：
// 1. if 常量折叠后紧跟 goto
// 2. if + goto(next) -> should NOP both
// 3. if_true + goto + target fallthrough invert 规则
// 4. 嵌套 if_true/if_false8 范围

export function variety(x: number, y: number) {
  let acc = 0
  if (1) { acc += 1 }        // 常量真
  if (0) { acc += 100 }      // 常量假
  if (x > y) acc += 2; else acc += 3
  if (x > 0) { if (y > 0) acc += 4 }
  // 人为制造 goto(next) 形式
  while (false) { acc += 999 }
  return acc
}
