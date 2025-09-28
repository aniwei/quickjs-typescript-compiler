# QuickJS 对齐路线图

我们需要逐步实现与 QuickJS 前端等价的 TypeScript 编译管线，同时保持 wasm 仅用于元数据生成与回归对比。以下任务按优先顺序展开，完成一项后再进入下一项。

## 📌 阶段 1：序列化基础设施
- [x] 重构 `BytecodeWriter` 常量池写出逻辑，覆盖基础标量、数组、对象、子函数常量。
- [x] 补齐模块/函数头、闭包、pc2line、子函数等字段的完整写出逻辑，严格依据 `env.ts` 定义。
- [x] 编写辅助脚本，将 QuickJS wasm 生成的 `.qbc` 解析成 JSON，便于比对字段差异。
- [x] 调整模块函数前言（`push_this`/`if_false8`/`return_undef`）的插入逻辑，与 QuickJS `instantiate_hoisted_definitions` 条件保持一致。
- [x] 在编译阶段实现 `for...of`、数组字面量、属性访问/方法调用的指令序列，先以 `__tests__/compiler/fixtures/compute.ts` 为基准，输出与 QuickJS 字节码逐字节对齐。
- [x] 提炼复用的枚举值→名称映射工具，避免在 `bytecodeReader` 等模块重复实现。
- [x] 将 TypeScript 编译器产出的字节码交给 QuickJS wasm 运行，验证运行时行为一致。
- [x] 将 `disasm.ts` 与调试脚本的 opcode 解析迁移到共享元数据助手，保持所有指令解码逻辑一致。
- [x] 丰富 `disasm.ts` 输出：解析常量池、闭包子函数与多函数模块，生成更贴近 QuickJS wasm 的完整报告。
- [x] 精读 QuickJS `instantiate_hoisted_definitions`，梳理 hoisted 函数/变量插入的指令序列与短/长跳用法。
- [x] 在 `compiler` 中实现等价的 hoisted 定义注入逻辑，联动 `supportsShortOpcodes` 选择短/长指令。
- [x] 记录 hoist 行为文档，沉淀 `instantiate_hoisted_definitions` 步骤与指令参数（`docs/hoist-behavior.md`）。
- [ ] 在编译阶段补足 module/global hoist 元数据（模拟 `global_vars`），生成 `define_func`/`define_var`/`put_var` 流水并处理 `_var_`/`_arg_var_` 闭包。
- [x] 覆盖 hoisted 定义在闭包捕获、块级作用域及全局变量上的残余差异，确保与 QuickJS 完全一致。
- [ ] 更新 fixtures 与 `compareWithWasm` 脚本验证，确保新增 hoisted 流水与 QuickJS 字节码完全对齐。
- [ ] 对 `function-add.ts`/`compute.ts` 等基准进行二进制 diff，确认模块 guard 与 hoist 序列 100% 匹配。
- [ ] 为 hoisted 函数场景补充更复杂的 fixture（多重函数、嵌套捕获等），并纳入 `compareWithWasm` 差异回归。

## 📌 阶段 2：作用域与符号系统
- [ ] 扩展 `ScopeManager`/`Var`/`ClosureVar`，支持 `var/let/const`、函数声明/表达式、块级作用域、捕获变量、参数列表等。
- [x] 引入独立的参数作用域，补充 `ScopeManager` 单元测试验证 `var` 提升与 `let/const` 词法隔离。
- [ ] 针对 `catch`、`switch`、传统 `for`/`while` 等结构完善作用域划分与变量捕获策略，并补充对应 fixture 校验。
- [x] 与 QuickJS 的 `JSFunctionDef` 对齐：补齐 `funcKind`、`hasSimpleParameterList`、`newTargetAllowed`、`argumentsAllowed` 等标志位，由 wasm 暴露的枚举生成到 `env.ts`。
- [ ] 调整变量槽位/闭包索引分配策略，使其与 QuickJS 行为一致。

## 📌 阶段 3：指令生成与控制流
- [ ] 设计基于 label 的控制流生成器，涵盖 `if/else/while/for/switch`、短路逻辑、break/continue 等。
- [ ] 为表达式与语句实现 QuickJS 同义的指令序列（算术、比较、调用、对象/数组字面量等）。
- [ ] 精确维护运行时栈深度，保证 `stackSize` 与 QuickJS 结果一致。

## 📌 阶段 4：常量池与原子管理
- [ ] 在编译流程中引入 `ConstantTable`，并在适当位置填充常量引用。
- [ ] 确保所有标识符/属性名通过 `AtomTable` 管理，原子起始值来源于 `env.firstAtomId`，不再存在手动常量。
- [ ] 支持正则字面量、模板字符串占位符等特殊常量写出。

## 📌 阶段 5：调试和元数据
- [x] 实现 `pc2line`、`pc2column` 的构建逻辑，复刻 QuickJS 的行列号处理。
- [ ] 根据编译配置设置 `hasDebug`、`readOnlyBytecode` 等标志，补齐源代码片段写出。

## 📌 阶段 6：测试矩阵与对齐验证
- [ ] 维护一组覆盖 ES5/ES6 主要语法的 fixture，与 QuickJS wasm 编译结果做逐字节对比。
- [ ] 在 CI/本地测试中跑完所有 flag 组合（`short opcode`、`bigint`、`strict mode` 等），确保输出稳定。
- [ ] 对比失败时输出差异报告，指明模块/函数/指令位置。

## 📌 阶段 7：硬编码清理
- [ ] 审核现有实现中的硬编码（模块前言、短 opcode 列表等），逐项替换为数据驱动的逻辑。
- [ ] 确保所有枚举/常量来自 `env.ts`，必要时扩展 `scripts/getEnv.ts` 输出缺失信息。

## 📌 阶段 8：wasm 元数据扩展
- [ ] 如需额外枚举或内部结构（如 `JSMode`），在 wasm binding 中补充 getter，再在 `env.ts` 中生成对应定义。
- [ ] 保证 wasm 仅参与“生成元数据 + 校验输出”，不会被编译器主链路调用。

> 完成每个阶段后，都要通过 `compareWithWasm` 脚本与 QuickJS 基准对齐，确认无差异再进入下一阶段。
