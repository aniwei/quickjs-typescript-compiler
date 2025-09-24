# QuickJS 对齐路线图

我们需要逐步实现与 QuickJS 前端等价的 TypeScript 编译管线，同时保持 wasm 仅用于元数据生成与回归对比。以下任务按优先顺序展开，完成一项后再进入下一项。

## 📌 阶段 1：序列化基础设施
- [ ] 重构 `BytecodeWriter`，补齐模块/函数头、常量池、闭包、pc2line、子函数等所有字段的写出逻辑，严格依据 `env.ts` 中的格式定义。
- [ ] 实现 `writeConstant`，覆盖数字、字符串、函数、对象、模板字符串等 QuickJS 支持的常量类型。
- [ ] 编写辅助脚本，将 QuickJS wasm 生成的 `.qbc` 解析成 JSON，便于比对字段差异。

## 📌 阶段 2：作用域与符号系统
- [ ] 扩展 `ScopeManager`/`Var`/`ClosureVar`，支持 `var/let/const`、函数声明/表达式、块级作用域、捕获变量、参数列表等。
- [ ] 与 QuickJS 的 `JSFunctionDef` 对齐：补齐 `funcKind`、`hasSimpleParameterList`、`newTargetAllowed`、`argumentsAllowed` 等标志位，由 wasm 暴露的枚举生成到 `env.ts`。
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
- [ ] 实现 `pc2line`、`pc2column` 的构建逻辑，复刻 QuickJS 的行列号处理。
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
