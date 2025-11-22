# QuickJS TypeScript Port Development Tasks# QuickJS 对齐路线图



Based on `docs/quickjs-ts-port-plan.md`.我们需要逐步实现与 QuickJS 前端等价的 TypeScript 编译管线，同时保持 wasm 仅用于元数据生成与回归对比。以下任务按优先顺序展开，完成一项后再进入下一项。



## Phase 0: Guard & Tools (基线对齐)## 📌 阶段 1：序列化基础设施

- [x] **SyntaxKind Guards**: Implement `assertSupported` in `compiler.ts` to flag unsupported syntax nodes with actionable errors.- [x] 重构 `BytecodeWriter` 常量池写出逻辑，覆盖基础标量、数组、对象、子函数常量。

- [x] **Fixture Expansion**: Add comprehensive ES2023 fixtures (async, class fields, private members, import/export, try/catch, with, for-await, etc.) to `__tests__/compiler/fixtures`.- [x] 补齐模块/函数头、闭包、pc2line、子函数等字段的完整写出逻辑，严格依据 `env.ts` 定义。

- [x] **Diff Automation**: Integrate `scripts/compareAllFixtures.ts` into CI pipeline. Add `pnpm compare:fixtures -- --all` command.- [x] 编写辅助脚本，将 QuickJS wasm 生成的 `.qbc` 解析成 JSON，便于比对字段差异。

- [x] 调整模块函数前言（`push_this`/`if_false8`/`return_undef`）的插入逻辑，与 QuickJS `instantiate_hoisted_definitions` 条件保持一致。

## Phase 1: Syntax Coverage & LValue Infrastructure (语法覆盖 & LValue 基建)

- [x] **LValueBuilder**: Implement `LValueBuilder` to abstract `make_ref()` logic.
    - [x] Support identifier, property access, element access.
    - [ ] Support `super` property access.
    - [ ] Support destructuring assignment.
- [ ] **Expression Support**: Implement missing expressions:
    - [x] `OptionalChain` (with `dup` + `is_undefined_or_null` + short jump).
    - [x] `ElementAccessExpression`.
    - [ ] `AwaitExpression` / `YieldExpression`.
    - [x] `ConditionalExpression` (ternary).
    - [x] `CommaListExpression` (SequenceExpression).
    - [x] `TypeOfExpression`.
    - [x] `DeleteExpression`.
    - [ ] `PostfixUnaryExpression` (`++`, `--`).
    - [ ] `TaggedTemplateExpression`.
    - [ ] `MetaProperty` (`new.target`, `import.meta`).## 📌 阶段 2：作用域与符号系统

- [ ] **Statement Support**: Implement missing statements:- [ ] 扩展 `ScopeManager`/`Var`/`ClosureVar`，支持 `var/let/const`、函数声明/表达式、块级作用域、捕获变量、参数列表等。

    - [ ] `TryStatement` (try-catch-finally).	- [x] catch 块作用域与 `var` 提升/`catch` 形参绑定（2025-09-29）

    - [ ] `WithStatement`.- [x] 引入独立的参数作用域，补充 `ScopeManager` 单元测试验证 `var` 提升与 `let/const` 词法隔离。

    - [ ] `ForOfStatement` (including `await`).- [ ] 针对 `catch`、`switch`、传统 `for`/`while` 等结构完善作用域划分与变量捕获策略，并补充对应 fixture 校验。

    - [ ] `SwitchStatement` (Annex-B function hoist support).- [x] 与 QuickJS 的 `JSFunctionDef` 对齐：补齐 `funcKind`、`hasSimpleParameterList`、`newTargetAllowed`、`argumentsAllowed` 等标志位，由 wasm 暴露的枚举生成到 `env.ts`。

    - [ ] `DebuggerStatement`.- [ ] 调整变量槽位/闭包索引分配策略，使其与 QuickJS 行为一致。

    - [ ] `EmptyStatement`.- [ ] 复刻 QuickJS 对未初始化 `const` 的语义（抛错/指令序列），修复 `simple-decl-init.ts` fixture 的差异。

- [ ] **Class Support**:

    - [ ] Class fields (public/private) and initializers.## 📌 阶段 3：指令生成与控制流

    - [ ] Static blocks.- [ ] 设计基于 label 的控制流生成器，涵盖 `if/else/while/for/switch`、短路逻辑、break/continue 等。

    - [ ] Computed properties.- [ ] 为表达式与语句实现 QuickJS 同义的指令序列（算术、比较、调用、对象/数组字面量等）。

    - [ ] Brand checks.- [ ] 精确维护运行时栈深度，保证 `stackSize` 与 QuickJS 结果一致。

- [ ] **Literal Support**:- [x] 实现乘法 `*` 运算发射，补齐 `complex-functions.ts` fixture 中的 `BinaryExpression` 支持。（2025-09-29）

    - [ ] Array holes / spread.- [x] 支持普通字符串字面量常量写出，解决 `custom-atoms.ts` fixture 的报错。（2025-09-29）

    - [ ] Object spread / getter / setter / private properties.- [x] 修正 switch 默认分支位于中间时的跳转与 pc2line 差异，`tmp-switch-default-middle.ts` / `switch-branch.ts` 均与 QuickJS 对齐。（2025-10-03）

- [ ] 支持普通标识符函数调用与条件判断生成，解除 `complex-functions.ts` “Only property access calls” 限制。

## Phase 2: Compilation Flow Backfill (编译流程回填)- [ ] 复盘 `compute.ts` / `simple-array.ts` 的零字节差异，逐条对齐常量池与调试信息。

- [ ] **ScopeManager 2.0**: Upgrade `ScopeManager` to track QuickJS `ScopeKind` (Function, Module, Parameter, Block, Catch, Class, With).

    - [ ] Handle `pseudo variables` (`this`, `arguments`, `new.target`, `home_object`, `_var_`, `_arg_var_`).## 📌 阶段 4：常量池与原子管理

    - [ ] Implement `Hoist Planner` to record function/var declarations for Phase 2 insertion.- [ ] 在编译流程中引入 `ConstantTable`，并在适当位置填充常量引用。

    - [ ] Implement `Closure Tracker` (similar to `add_closure_var`).	- [ ] 参考 QuickJS `JSFunctionDef.constant_pool` 的写出顺序，整理各常量类型的指令使用场景（2025-10-03）

- [ ] **Resolve Variables Pass**: Create `resolveVariables.ts` to traverse `FunctionBytecode`.	- [ ] 将 `compileLiteral`/`compileArrayLiteral` 等入口改为先写入常量池，再发射 `OP_get_var_ref`/`OP_get_field` 等引用指令

    - [ ] Insert `OP_enter_scope` / `OP_leave_scope` at correct positions.	- [ ] 重新编号常量索引，确保与 wasm 基线的去重规则一致，并在 `scripts/parseBytecode.ts` 中补充校验

    - [ ] Replace `scope` instructions with `get_loc`, `get_arg`, `get_var_ref`, `put_loc`, `put_var_ref`.- [ ] 确保所有标识符/属性名通过 `AtomTable` 管理，原子起始值来源于 `env.firstAtomId`，不再存在手动常量。

    - [ ] Handle `with` / `eval` fallback (`OP_scope_make_ref`).	- [ ] 为 `AtomTable` 增加“已分配 atom → UTF-8` value`”的调试输出，定位遗漏的动态插入点

    - [ ] Implement `instantiateHoistedDefinitions` (insert `OP_fclosure` + `OP_put_*`).	- [ ] 改写 `emitIdentifier`/`emitPropertyAccess` 等路径，统一从 `AtomTable` 获取 ID

    - [ ] Inject `OP_special_object` (`arguments`, `new.target`, etc.).	- [ ] 比对 QuickJS wasm 产出的 atom 列表，确认自增顺序与去重策略一致

- [ ] 支持正则字面量、模板字符串占位符等特殊常量写出。

## Phase 3: Label Resolution & Debug Info (标签、调试与常量池)	- [ ] 先实现模板字符串（无表达式）写出，补充 fixture 验证

- [ ] **Label Resolver**: Create `LabelResolver` to handle control flow.	- [ ] 解析 `RegExpLiteral`，串联 `ConstantTable` 与 `AtomTable`，验证与 QuickJS 字节码一致

    - [ ] Remove `OP_label`.	- [ ] 新增 `regex-literal.ts`/`template-tag.ts` fixture，并纳入 `compareWithWasm` 回归

    - [ ] Resolve goto chains and short jumps (`goto8`, `if_false8`, etc.).

    - [ ] Implement tail call optimization (`call` + `return` -> `tail_call`).## 📌 阶段 5：调试和元数据

    - [ ] Implement `DeadCodeTrimmer` (remove code after return/throw/goto).- [x] 实现 `pc2line`、`pc2column` 的构建逻辑，复刻 QuickJS 的行列号处理。

- [ ] **PC2Line Builder**: Implement `pc2line` / `pc2column` generation using `LineRecorder` and label offsets.- [ ] 根据编译配置设置 `hasDebug`、`readOnlyBytecode` 等标志，补齐源代码片段写出。

- [ ] **Stack Analyzer**: Improve `computeFunctionStackSize` to support try/catch, iterator close, for-await.

- [ ] **Constant Table**: Implement `ConstantTable` to manage literals, functions, templates.## 📌 阶段 6：测试矩阵与对齐验证

    - [ ] Ensure `AtomTable` syncs with `env.firstAtomId`.- [ ] 维护一组覆盖 ES5/ES6 主要语法的 fixture，与 QuickJS wasm 编译结果做逐字节对比。

- [ ] **Inline Cache**: Implement `InlineCacheBuilder` to record `icSlot` for property access.- [x] 将 `switch-branch.ts` 納入对齐矩阵，验证默认分支位于中间的控制流对齐。（2025-10-03）

- [ ] 在 CI/本地测试中跑完所有 flag 组合（`short opcode`、`bigint`、`strict mode` 等），确保输出稳定。

## Phase 4: Module & Global Semantics (模块/全局)- [ ] 对比失败时输出差异报告，指明模块/函数/指令位置。

- [ ] **Module Graph**: Implement `ModuleGraph` to handle `import` / `export` semantics.- [ ] 当上述差异修复后，重跑 `pnpm compare:fixtures -- --filter simple`，确认退出码回归 0。

    - [ ] Generate `JSModuleDef` structures (`req_module_entries`, `import_entries`, `export_entries`).

    - [ ] Handle `export *`, `export {}`, `export default`.## 📌 阶段 7：硬编码清理

- [ ] **Global Var Writer**: Implement `GlobalVarWriter` for `JSGlobalVar` output (`OP_define_var`, `OP_put_var`).- [ ] 审核现有实现中的硬编码（模块前言、短 opcode 列表等），逐项替换为数据驱动的逻辑。

- [ ] **Top-level Await**: Support top-level await (mark root func as `JS_FUNC_ASYNC`, use `OP_return_async`).- [ ] 确保所有枚举/常量来自 `env.ts`，必要时扩展 `scripts/getEnv.ts` 输出缺失信息。



## Phase 5: Verification & Performance (验证与性能)## 📌 阶段 8：wasm 元数据扩展

- [ ] **Full Verification**: Run `compareAllFixtures` against all ES2023 fixtures.- [ ] 如需额外枚举或内部结构（如 `JSMode`），在 wasm binding 中补充 getter，再在 `env.ts` 中生成对应定义。

- [ ] **Performance Profiling**: Compare build time and bytecode size with QuickJS.- [ ] 保证 wasm 仅参与“生成元数据 + 校验输出”，不会被编译器主链路调用。

- [ ] **Documentation**: Update `docs/quickjs-bytecode-generation.md` and `docs/es2023-feature-gap.md`.

> 完成每个阶段后，都要通过 `compareWithWasm` 脚本与 QuickJS 基准对齐，确认无差异再进入下一阶段。
