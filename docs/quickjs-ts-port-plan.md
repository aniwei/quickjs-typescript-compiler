# QuickJS → TypeScript 编译器转译技术方案

> 目标：在保持 QuickJS C 端功能/语义/字节码输出一致性的前提下，复刻其编译后端（Phase 1/2/3 + 物化）为 TypeScript 实现。解析阶段继续依赖 TypeScript Compiler API，不重写 QuickJS 词法/语法；重点在于把 QuickJS `JSFunctionDef` 管线映射到 `src/compiler`。本文定义范围、阶段、关键技术设计、依赖、验证策略与风险。

## 1. 范围与成功标准

### 1.1 范围

- **输入**：TypeScript/JavaScript 源（经 `ts.createSourceFile` 解析的 AST）。
- **输出**：与 QuickJS wasm 参考产物比对无差异的 `.qbc`（含常量池、子函数、pc2line、ic、global vars 等）。
- **对齐对象**：`third_party/QuickJS/src/core/parser.c` + `function.c` + `bytecode.*` 描述的 Phase 1~3、`js_create_function()` 物化逻辑。
- **非目标**：重新实现 QuickJS 词法/语法、运行时 VM、GC；保持 wasm 用于验证/元数据抽取。

### 1.2 成功判定

1. **字节码一致性**：`scripts/compareWithWasm.ts` 针对 ES2023 fixture 集合（含 async/class/module/私有/try 等）差异为零。
2. **语义一致**：对 `pnpm start <fixture>` 的运行输出与 QuickJS wasm 相同，并通过 `__tests__/compiler` 单测。
3. **调试元数据一致**：`pc2line`/`pc2column`、`source`、`stackSize` 与 wasm 匹配；`disasm.ts` 解析结果一致。
4. **可扩展性**：核心组件（ScopeManager、LValueBuilder、ConstantTable 等）松耦合，可复用于后续 ES2024+。

## 2. 实施阶段与里程碑

| 阶段 | 目标 | 关键交付 | 依赖 |
| --- | --- | --- | --- |
| Phase 0 基线对齐 | 建立语法/流程矩阵、守卫、自动 diff 工具 | `docs/es2023-feature-gap.md`、`assertSupported`、`compareAllFixtures` | 已完成差异梳理；需增加守卫 & CI 钩子 |
| Phase 1 语法覆盖 & LValue 基建 | 覆盖剩余 ES2023 AST 节点，统一左值与表达式生成 | LValueBuilder、OptionalChain、ElementAccess、TryStatement、Import/Export、Class fields、Await/Yield | `typescript` AST、ScopeManager 扩展 |
| Phase 2 编译流程回填 | 复刻 QuickJS Phase 2/3：作用域解析、hoist、special objects、短跳、tailcall、pc2line、常量池 | `resolveVariables.ts`, `labelResolver.ts`, `ConstantTable`, `InlineCacheBuilder`, `pc2lineBuilder` | Phase1 完成的语法节点，env 元数据 |
| Phase 3 模块 & 全局语义 | 实现 `JSGlobalVar`, module prologue/exports, import graph | `ModuleHoist`, `ModuleExportTable`, `_var_/_arg_var_` closure 写入 | Phase2 产出的 hoist/closure 结构 |
| Phase 4 验证与性能 | 全量 fixture、CI、性能 profiling、文档收官 | compareAllFixtures、pc2line diff、执行测试 | 前述阶段完成 |

每阶段结束需运行：`pnpm compare:fixtures`, `pnpm test -r __tests__/compiler`, 及 `pnpm start` 基准。

## 3. 架构与关键技术设计

### 3.1 AST → LValueBuilder → Opcode 序

- **LValueBuilder**：抽象 QuickJS `make_ref()`，统一处理 identifier/property/element/super/destructuring。
  - 接口：`buildLValue(node)` 返回 `load()`, `store(valueEmitter)`, `dupForCompound()` 等操作。
  - 支撑逻辑赋值、`delete/typeof`, `++/--`, destructuring, optional chain。
- **OptionalChainEmitter**：生成与 QuickJS 相同的 `dup`+`is_undefined_or_null`+短跳序列，收敛到 LValueBuilder。
- **Spread/Rest**：在数组/对象/参数/调用处统一实现，借助 `Opcode.OP_copy_data_properties`, `OP_append`, `OP_apply` 等。

### 3.2 作用域与变量管理

- **ScopeManager2.0**：跟踪 QuickJS `ScopeKind`（Function/Module/Parameter/Block/Catch/Class/With）。
  - 为 `var`, `let/const`, `function`, `class`, `catch`, `parameter` 分配正确 scopeLevel/scopeNext。
  - `pseudo variables`：`this`, `arguments`, `new.target`, `home_object`, `_var_`, `_arg_var_`。
- **Hoist Planner**：记录 body scope function declarations、var declarations、module exports，用于 Phase 2 插入。
- **Closure Tracker**：仿 `add_closure_var()`，在需要捕获时登记 `ClosureVar`，提供给 `buildHoistedDefinitionInstructions` 与 constant writer。

### 3.3 Phase 2：变量解析与 special objects

- **resolveVariables.ts**：遍历 `FunctionBytecode`，执行：
  1. `OP_enter_scope/leave_scope` → 真实位置，并调用 `insertLexicalInitialization`。
  2. `scope` 指令替换为 `get_loc/get_arg/get_var_ref`, `put_loc/put_var_ref`。
  3. `with`/`eval` fallback：生成 `OP_scope_make_ref` 等。
  4. `instantiateHoistedDefinitions`：在 module/function prologue插入 `OP_fclosure` + `OP_put_*`。
  5. `OP_special_object` 注入：`arguments`, `new.target`, `home_object`, `import.meta`。

### 3.4 Phase 3：标签解析、短指令、pc2line

- **LabelResolver**：移除 `OP_label`, 解析 goto 链、短跳(`OP_if_false8`)、尾调用（`call`+`return` → `tail_call`）。
- **DeadCodeTrimmer**：仿 `skip_dead_code()`，在 return/throw/goto 后剔除指令/调试点。
- **pc2line/pc2column Builder**：基于 `LineRecorder` & label resolver的 offset 生成 LEB128 映射。
- **Stack Analyzer**：完善 `computeFunctionStackSize`，支持 try/catch/finally、`iterator_close`、`for_await`。

### 3.5 常量池与 Inline Cache

- **ConstantTable**：跟踪字符串/数值/对象字面量、函数、模板对象等；提供 `getOrAddConstant(tag, value)`。
- **AtomTable**：确保与 QuickJS `env.firstAtomId` 同步，所有 identifier/property 名使用 atom id。
- **InlineCacheBuilder**：在 `emitInstruction(OP_get_field)` 等路径同时记录 `icSlot`，Phase 4 物化为 QuickJS 结构。

### 3.6 模块与全局输出

- **ModuleGraph**：记录 `import/export` 语义，生成 `JSModuleDef.req_module_entries/import_entries/export_entries` 等等价结构。
- **GlobalVarWriter**：根据 `JSGlobalVar` 结构输出 `OP_define_var/func`、`OP_put_var`、`OP_define_field`（针对 `_var_/_arg_var_`）。
- **Top-level await**：标记 `rootFunc.bytecode.funcKind = JS_FUNC_ASYNC`，结尾使用 `OP_return_async`。

### 3.7 文件/模块组织建议

| 模块 | 责任 |
| --- | --- |
| `src/compiler/core/lvalue.ts` | LValueBuilder、OptionalChainEmitter |
| `src/compiler/core/constantTable.ts` | 常量池管理 |
| `src/compiler/analysis/resolveVariables.ts` | Phase 2 主过程 |
| `src/compiler/analysis/resolveLabels.ts` | Phase 3 标签/短指令 |
| `src/compiler/analysis/deadCode.ts` | Dead code removal |
| `src/compiler/module/globalVars.ts` | Global var/hoist 输出 |
| `src/compiler/module/exportTable.ts` | 模块导出记录 |
| `src/compiler/debug/pc2lineBuilder.ts` | pc2line/pc2column |

## 4. 阶段详细任务

### 4.1 Phase 0：守卫与工具

1. **SyntaxKind 守卫**：`compiler.compileExpression/Statement` 中维护 `SUPPORTED_*` Set；遇到未实现节点输出 actionable error。
2. **Fixture 扩展**：引入 ES2023 全覆盖 fixture（async/class fields/private/import/export/try/with/for-await 等）。
3. **Diff 自动化**：把 `scripts/compareAllFixtures.ts` 接入 CI，新增 `pnpm compare:fixtures -- --all`。

### 4.2 Phase 1：语法覆盖

- `ElementAccessExpression`, `OptionalChain`, `AwaitExpression`, `YieldExpression`, `ConditionalExpression`, `CommaListExpression`, `Delete/TypeOfExpression`, `PostfixUnaryExpression`, `TaggedTemplateExpression`, `MetaProperty`, `ImportKeyword`。
- 语句：`EmptyStatement`, `DebuggerStatement`, `WithStatement`, `TryStatement`, `ImportDeclaration`, `ExportDeclaration` (re-export), `ExportAssignment` (expr), `ClassStaticBlockDeclaration`, `ForOfStatement` + `await`, `Switch` Annex-B function hoist。
- 类：字段/初始值、私有成员、静态块、computed 属性、brand check。
- 字面量：支持 array holes/spread、对象 spread/getter/setter/private。

### 4.3 Phase 2：变量解析

- 重新组织 `FunctionBytecode.instructions`：在 emit 阶段插入 `OP_enter_scope/leave_scope`、`OP_label`，延迟解析。
- 引入 `ScopeInfo` 记录 lexical init insertion points；利用 `insertLexicalInitialization()`。
- 处理 `with`/`eval`：`ScopeManager` 标记 `scope.isWith/hasWith`，生成 `OP_scope_make_ref`。
- `instantiateHoistedDefinitions`：仿 QuickJS，按 body scope 顺序插入 `OP_fclosure` + `OP_put_loc/put_var_ref`，支持捕获变量和 `_var_/_arg_var_`。
- `special_object` 注入：函数入口根据 `functionKind`、`needHomeObject` 等标志插入 `OP_special_object` + `OP_put_loc`。

### 4.4 Phase 3：标签、调试与常量池

- 构建 `resolveLabels()`；支持：
  - goto 链折叠、短跳 (`goto8/16`, `if_true8/if_false8`).
  - 尾调 (`call`+`return` → `tail_call`).
  - 死码清理 + label reuse.
- `pc2line`：利用 `LineRecorder` snapshots + label offsets 生成 QuickJS 兼容格式。
- `ConstantTable` + `InlineCache`：所有 literals/storage 通过常量池；`OP_push_const`/`OP_push_atom_value` 指向常量索引。
- `bytecodeWriter`：最终写出 `FunctionBytecode` → `.qbc` 时按 QuickJS 顺序（func header → ic → vardefs → closure → bytecode → constant pool）。

### 4.5 Phase 4：模块/全局

- `ImportDeclaration`：构建 `ModuleImportEntry`、绑定到 closure，支持 `with attributes`。
- `Export`：`export * from`, `export { } from`, `export default expr`，支持 default alias。
- `ModuleGraph`：`ModuleExportEntryLocal/Indirect/Star`；`registerModuleLocalExport` 与 `buildHoistedDefinitionInstructions` 协同。
- `Top-level await`：根函数 `funcKind = JS_FUNC_ASYNC`，`module->has_tla = true`，确保 `OP_return_async`。

### 4.6 Phase 5：验证/CI

- `compareAllFixtures` 覆盖所有 ES2023 fixture；新增 failure 报告（指令 diff, constant diff, atom diff）。
- `pnpm test` + `pnpm start` smoke。
- 性能：记录构建时间、字节码大小对比 QuickJS，锁定异常。
- 文档：更新 `docs/quickjs-bytecode-generation.md`，附 TypeScript 对应章节；维护 `docs/es2023-feature-gap.md` 进度勾选。

## 5. 风险与缓解

| 风险 | 描述 | 缓解措施 |
| --- | --- | --- |
| AST 与 QuickJS 语义不对齐 | TypeScript AST 与 QuickJS 解析树存在差异（例如 `ts.NodeArray` 与 QuickJS token 流） | 引入中间层（LValueBuilder、ScopeManager）使逻辑更贴近 QuickJS；关键语法写单元测试 |
| Phase 2/3 复杂度 | 需要精确控制指令索引/offset | 建立指令 IR (`FunctionBytecodeInstruction`) + offset table，必要时写快照工具 |
| 模块语义依赖 runtime | QuickJS 模块加载行为复杂 | 复用 wasm metadata (`env.ts`)，通过 compare fixtures + wasm 运行验证 |
| 常量池/IC 写出 | 没有 QuickJS 内部结构 | 依赖 wasm 抽取 `env.ts` 的结构定义，添加断言确保与 wasm 同步 |

## 6. 里程碑验收

| 里程碑 | 验收内容 |
| --- | --- |
| M1（Phase1 完成） | 所有 ES2023 AST 节点在 TS 编译器中有实现/守卫，`pnpm compare:fixtures -- --subset syntax` 通过 |
| M2（Phase2 完成） | `resolveVariables`/`special_object`/hoist 生效，`function-add.ts`、`compute.ts` diff 为零 |
| M3（Phase3 完成） | `switch-branch.ts`, `class-fields.ts`, `async-await.ts` 等字节码 diff zero；`pc2line` 对齐 |
| M4（Phase4 完成） | 模块 fixture（import/export/namespace）diff zero，顶层 await 运行通过 |
| GA | 全部 fixture diff zero，CI 覆盖 compare + tests，文档更新 |

## 7. 后续拓展

- ES2024+ 新特性在相同框架下增量实现。
- 支持自定义插件：在 Phase 1 hook 中插入转换，以 QuickJS IR 为后端。
- 结合 `ConstantTable` 实现 bytecode 压缩/去重策略，提供性能仪表盘。
