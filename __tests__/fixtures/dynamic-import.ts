// ES2020+: 动态 import()
// 仅验证编译与字节码一致性（不依赖运行时模块加载）。

const p1 = import('dep1.js')
const p2 = import('dep2.js', { assert: { type: 'json' } } as any)

void p1
void p2
