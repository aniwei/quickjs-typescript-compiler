# 技术债与对齐 QuickJS 改造计划 (Phase Consolidation)

> 本文件列出现阶段已识别的与 QuickJS 差异点、技术债与后续实施方案，旨在逐步达到源码级语义/结构对齐。

## 1. 闭包捕获 (Closures)
- 现状：只支持单层父子；`make_var_ref` 现在放在函数前置 prelude，但 parentIndex 映射为追加序号，缺乏真实 param/local 区分。
- QuickJS 目标：
  - 捕获项顺序与父函数局部/参数真实索引一致；
  - 支持多层链：子 -> 祖先逐层 var_ref 解析；
  - Arrow function 需继承 `this`/`arguments` 语义。
- 计划：
  1. ScopeManager 扩展：记录 param/local 原子 id 与逆向 name 映射；
  2. 在子函数创建时解析所有自由变量，构造 capture 列表（静态一次性）；
  3. emitPrelude 时：按确定顺序发射 `make_var_ref`；
  4. 多层祖先：通过 parent 链递归查找并生成中间 level 路径（必要时增加 level 编码或多级 re-export 方案）。

## 2. 子函数语句集拓展
- 现状：子函数 fallback 限制（if/loop/try 未实现）。
- 计划：按粒度解锁：if -> while/for -> break/continue -> try/finally；每步新增测试。

## 3. 类语义深化
- 现状：未处理 extends/super/字段初始值/静态与实例区别/私有字段；brand 一律发射。
- 计划：
  1. extends 表达式：先求值基类（若 undefined 则 proto null）；
  2. super 调用插桩：构造函数内第一条非 super 前插 super() 校验；
  3. 字段初始化顺序：实例字段在构造主执行前初始化；静态字段在类完成后立即；
  4. 区分 static 方法 attach 到 ctor，实例 attach 到 prototype；
  5. 私有字段：引入 brand 管理（如无私有字段不发射 add_brand）。

## 4. 常量折叠与数值语义
- 现状：i32 算术折叠可能偏离 JS Number (双精度) 语义。
- 计划：
  - 除非匹配 (both operands are small int & 运算保持安全整数) 才折叠；
  - 添加 NaN / Infinity / -0 / 溢出测试。

## 5. 栈大小分析精化
- 现状：call/array_from/with_* 保守估计；
- 计划：在 IR 中伴随 call 记录 argc & 布局元数据，汇入 preciseMaxStack；专项测试深度递归/多参数调用。

## 6. Peephole / NOP 策略
- 现状：保持字节数（便于 debug 对齐），可能浪费体积。
- 计划：提供 `optSize=true` 模式：重新布局删除 NOP，重算跳转；保留当前模式为 `optCompat`。

## 7. TDZ 与 let/const
- 现状：未实现访问前报错；
- 计划：为 let/const 分配状态槽，读取前插 `check_tdz`（或通过自定义 opcode/语义型序列模拟）；添加访问前读取测试。

## 8. 生成器 / Async
- 现状：指令占位未使用；
- 计划：待函数语句集完善后再引入 yield/await 流程：暂停点状态保存 + 捕获栈高度元数据。

## 9. make_var_ref 顺序 & 冗余
- 现状：所有捕获无差异发射；
- 计划：去重（已部分）、排序稳定化；引入 deterministic ordering（param -> local -> hoisted）。

## 10. 测试矩阵扩展
- 新增：
  - closure-nested / closure-mutate / closure-chain
  - class-extends / class-fields / class-private / class-static-order
  - tdz-access / const-reassign-error
  - constfold-numeric-semantics
  - opt-size vs compat 字节对比

## 11. 错误报告与源码映射
- 现状：pc2loc 已收集；列与嵌入源码可选。
- 计划：在优化后重映射 pc（size 模式）以及提供简单反汇编工具。

## 12. 私有字段与 brand
- 计划：扫描 ClassElement，若含私有名才插入 add_brand；实现 brand 检查指令序列（或占位）。

## 13. 多层捕获索引
- 计划：CaptureInfo 扩展 `level` 字段；varRefEntry 增加 originalLevel；访问链需要级联查找或父层转 re-export。

---

### 优先级路线（建议）
1. 闭包捕获精化（多层 + 正确索引 + prelude 顺序）
2. 子函数语句集 if/loop/try 解锁 & TDZ 基础
3. 类继承与字段初始化顺序
4. 常量折叠语义收缩 + 测试
5. optSize 模式（NOP 收缩）
6. 多层闭包链 + 私有字段 brand 条件
7. 生成器/async 语义接入

### 交付分批
- Batch A: (1)(2 部分) + 对应测试
- Batch B: (2 余下)(3) + class tests
- Batch C: (4)(5)
- Batch D: (6)(7) 最终对齐

---

> 本文件会在每个 Batch 完成后更新，保持技术债清单与 QuickJS 对齐进度透明。
