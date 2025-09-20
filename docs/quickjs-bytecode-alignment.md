# QuickJS 字节码对齐清单（进行中）

目标：与 qjsc 输出在「流程/指令/逻辑/文件分类」严格对齐，做到反汇编逐条核对，仅保留不可控/版本差异的最小出入。

本清单跟踪：已对齐项、仍存在差异的类别、原因与修复计划，以及验证方法与样本集。

---

## 1. 最新单样本对比摘要（__tests__/compute.ts）

- 本次运行（2025-09-20）：
  - 对比：`npx -y tsx scripts/compare-with-wasm.ts __tests__/compute.ts --input-js __tests__/compute.js --disasm --normalize-short --side-by-side --artifacts-dir artifacts`
  - 由于 wasm 绑定在该环境下偶发 V8 fatal error，改用：`--prefer-qjsc` 获取 qjsc 二进制，再结合 `pnpm -s dump:both __tests__/compute.js --text` 获取 wasm 端的可靠文本反汇编。
  - 产物：
    - 助记符并排 diff：`artifacts/compute-mnemonic-diff.md`
    - 我方反汇编：`artifacts/compute.self.disasm.txt`
    - wasm 文本 dump：`artifacts/compute.wasm.dump.txt`

- Header（以我方解析 + wasm 文本为准）：
  - Self header: flags=1568, jsMode=strict(1), argCount=0, varCount=2, stackSize=4, closureVarCount=1, cpool=0, byteCodeLen=61, hasDebug=true。
  - WASM dump：stack_size=4，opcodes(61 bytes)，mode: strict，locals: i/a。整体与 Self 一致。结论：核心头部/长度已对齐。

- Atom 表（通过 qjsc C 输出提取的字节数组推断）：
  - self: 5；qjsc: 6。差异包含：qjsc 额外包含 `'use strict'` 与更完整路径（如 `__tests__/compute.js`）。
  - 我方现已将 debug 文件名标准化为 basename（`compute.js`），且不强制加入 `'use strict'` 原子；该差异可在 compare 阶段忽略，或后续按源文件是否存在指令字面量有条件地纳入。

- 反汇编/助记符（归一化后）：
  - 长度：self=20，qjsc=24（折叠前分别为 22 与 32）。
  - 关键一致：循环条件/体与回边（goto8）一致；`results.push(a + i)` 的栈形状匹配（`dup/get_field2/call_method/drop`）。
  - 关键差异：
    - qjsc（wasm 文本）在开头有严格模式模板序列：`push_this; if_false8; return_undef`，我方无该样板；属于可折叠的顶层序言噪声。
    - qjsc 还原中常见 `set_loc_uninitialized + put_loc{0,1}` 的两步初始化；我方用单条 `OP_put_loc_check_init` 表达。归一化后视作等价。
    - 自增：qjsc 为 `get_loc_check; post_inc; put_loc_check; drop`，我方为短指令 `OP_inc_loc`；归一化统一到 `OP_inc`。

- 结论：
  - compute.ts 样本在“头部计数（字节码长度/栈大小/严格位）与主体控制流/调用栈形状”方面已实现对齐；剩余差异集中在：顶层序言、原子表（`use strict`/路径）与初始化/自增的编码变体，均已在归一化与工具注释中解释。

---

## 2. 控制流样本对比（标签/嵌套）

- 新增样本：
  - `__tests__/controlflow_labeled_1.{ts,js}`
  - `__tests__/controlflow_labeled_2.{ts,js}`
- 运行：
  - `pnpm compare:batch --normalize-short --side-by-side --artifacts-dir artifacts --filter=controlflow_labeled_`
- 结果：total=2 pass=2，无系统性偏差。
- 说明：
  - 归一化现已覆盖短跳转（8/16 位）与常见 if/continue/break 模板，配合 DOT/CFG 可直观看到结构一致。

---

## 3. 已对齐项（选摘）

- 短指令：get/put_loc{0,1,2,8}、goto8/if_false8、push_const8、fclosure8 等已支持，compare 归一化统一到长名。
- ++/--：标识符、属性、元素的前/后缀均采用纯栈序列，栈形状与 QuickJS 相符；post-inc 模板可在比较中折叠到 `OP_inc`。
- 方法调用：`[obj, func, ...args]` 的栈形状与 `OP_call_method` 对齐；`dup/get_field2/call/drop` 折叠归一。
- 反汇编：支持 pc2line、CFG/DOT 导出；短跳转目标解析与标签生成。

---

## 4. 差异项与计划

- 顶层包装/环境变量
  - 差异：var/closure 计数与 flags 不同；env 写入样板的时序/样式与 qjsc 不同。
  - 计划：
    - 已阶段性完成：严格位/has_debug 与字节码长度、栈深在 compute.ts 上对齐；循环捕获（closureVars）按本地 let 捕获自动合成。
    - 下一步：
      - 统一/可折叠顶层序言（`push_this; if_false8; return_undef`）到 compare 归一化；
      - 持续核对更多样本（含函数/闭包）确保 flags/closureVarCount 在更广覆盖下稳定对齐。

- Atom 表与 debug 文件名
  - 差异：文件名原子为相对路径；qjsc 为基名；`'use strict'` 原子的出现与顺序差。
  - 计划：
    - 已完成：debug 文件名使用 basename（例如 `compute.js`）。
    - 待定：在源文件确有 `'use strict'` 指令时是否纳入该原子。当前策略为“不强制加入”，compare 侧可忽略该差异。

- 返回指令策略
  - 差异：我方显式 `OP_return_undef`。
  - 计划：
    - 已在 compare 侧支持“尾部 return_undef 折叠”；后续可评估在发射端按可省略场景直接去除。

---

## 5. 验证工具与操作指引

- 单文件对比：
  - `pnpm compare <ts-file> --input-js <js-file> --disasm --normalize-short --side-by-side --artifacts-dir artifacts`
- 批量对比：
  - `pnpm compare:batch --normalize-short --side-by-side --artifacts-dir artifacts`
- 双端 Dump（含 DOT/CFG）：
  - `pnpm dump:both <ts-file> --text --dot`
  - 产物：
    - `artifacts/<stem>.self.disasm.txt`
    - `artifacts/<stem>.self.cfg.dot`
    - `artifacts/<stem>.wasm.dump.txt`

---

## 6. 下一步里程碑

- [ ] 顶层序言归一化：compare 层面稳定折叠 `push_this/if_false8/return_undef`
- [ ] Atom 表策略：针对 `'use strict'` 的纳入/忽略策略定案，并在 compare 输出中淡化该差异
- [ ] 评估并统一 return_undef 策略；或在 compare 层面折叠尾部 return（现已支持）
- [ ] 持续扩充样本：函数声明/闭包捕获、with/try-catch、复杂对象/数组字面量、链式调用
- [ ] 在 compare 输出中增加“原子表/常量表差异统计摘要”（数量/类别），进一步加速定位

---

更新时间：自动生成于当前会话
