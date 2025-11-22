# ES2023 语法与语义支持差异报告

> 交叉对比 `third_party/QuickJS`（C 端参考实现）与 `src/compiler`（TypeScript 编译器后端），按 ECMA-262 Edition 14（ES2023）语法特性梳理。QuickJS 侧的能力以 `docs/quickjs-bytecode-generation.md`、`parser.c`、`function.c` 为依据；TS 后端状态来源于本仓编译器源码（具体文件见备注列）。

## 方法说明

1. 建立 ES2023 语法清单：涵盖语句、表达式、类/私有成员、模块与顶层异步、运行时特殊对象等 5 大类。
2. 逐项校验 QuickJS C 侧：只要 `js_parse_*` / Phase 2 / Phase 3 提供完整实现，即标记为 ✅。
3. 逐项检查 TS 后端：若 `src/compiler` 尚未覆盖、明确 `throw new Error`，或语义与 QuickJS 不符，则标记为 ❌；部分覆盖则记 ⚠️ 并列出缺失场景。
4. 针对缺口，引用代码位置与行为描述，为后续迭代提供直接入口。

## 摘要

| 类别 | QuickJS 覆盖 | TS 编译器覆盖 | 备注 |
| --- | --- | --- | --- |
| 语句与声明 | ✅（除 Annex-B 细节外完整） | ⚠️（仅 11 种基础语句） | 缺少 `try/catch/finally`、`with`、`debugger`、`import`/`export*`、`for await`、空语句等 |
| 表达式 / 运算符 | ✅ | ❌ | 无 `delete/typeof/await/yield/import()/super/[]/?.` 等，实现覆盖率 < 40% |
| 类与私有成员 | ✅ | ❌ | 无字段、静态块、私有成员、computed 名称、brand 检查 |
| 模块与顶层 async | ✅（含 top-level await、`import.meta`） | ❌ | `import` 声明、动态 import、`export default expr`、module hoist 元数据均缺失 |
| 运行时特殊对象/Hoist | ✅ | ⚠️ | 仅实现 `_eval_` 模块 prologue；`special_object`、`JSGlobalVar`、closure hoist 元数据尚未串联 |
| 编译流程（Phase 1/2/3） | ✅（解析→变量解析→标签/短跳→栈/调试→物化） | ⚠️ | 仅 Phase 1 雏形；Phase 2/3/物化步骤大部分缺失，下节详述 |

后续章节提供逐项明细与优先级建议。

## 0. QuickJS 编译流程差异

| 流程阶段 | QuickJS 行为（见 `docs/quickjs-bytecode-generation.md`） | TS 编译器现状 | 缺失风险 |
| --- | --- | --- | --- |
| Phase 1：递归下降即时发射 | `js_parse_*` 直接写入 `byte_code`，插入 `OP_enter_scope`/`OP_label`/`OP_scope_*`、`BlockEnv` 管理 hoist 与 control flow | `Compiler` 只实现“边遍历 AST 边 emit 指令”的粗略版本，缺少 `OP_enter_scope`/`OP_leave_scope`、`scope_*` 标记以及 `BlockEnv` 等辅助结构 | 后续 Phase 2 无法获知词法作用域，导致 `let/const` 初始化和 `with/eval` 语义缺失 |
| Phase 2：`resolve_variables()` | 解析 `OP_scope_*`→`get/put_loc/var_ref`，注入 `OP_special_object`、`instantiate_hoisted_definitions()`，处理 `with`/`eval`、闭包捕获、Annex-B hoist | 未实现；`compiler.ts` 没有变量解析 pass，`emitStoreToLexical` 等直接输出最终指令，也未插入 `OP_special_object` | 无法对 `arguments/new.target/import.meta` 等特殊对象做懒注入；闭包捕获/hoist 序列与 QuickJS 不一致 |
| Phase 3：`resolve_labels()` | 消解 `OP_label`、折叠 goto、生成短跳、尾调优化 (`OP_tail_call*`)、死代码删除、`pc2line` 采集 | 仅有 `resolvePendingJumps()` 简单填充 label；没有短指令、尾调、死码清理、`pc2line` 精简 | 生成的字节码更长且无法命中 QuickJS 的优化路径，`pc2line`/调试符号也未压缩 |
| 栈高度 & 异常路径 | `compute_stack_size()`/`StackState` 覆盖 `catch`、`for-await`、`iterator_close`，失败即抛内部错 | `computeFunctionStackSize()` 已存在但输入指令缺 `OP_catch`/`OP_iterator_close` 等，且 `LoopCleanupManager` 只在 `for-of/in` 使用 | 一旦实现 try/finally/async，缺乏统一 cleanup 会导致栈分析不可信 |
| 常量池 / Inline Cache | Phase 1 通过 `cpool_add()`、`emit_ic()` 收集；Phase 4 写入 `JSFunctionBytecode` | 当前直接把常量嵌入指令，未实现 `ConstantTable`、`Atom` 去重、IC 槽 | 输出的 `.qbc` 常量序列与 QuickJS 完全不同，无法比较 diff，也失去运行期性能优化 |
| 模块与 global hoist | `instantiate_hoisted_definitions()` + `add_module_variables()` 统一写入 `OP_define_func/var`、`OP_put_var`、`global_vars` 及闭包捕获 | `buildHoistedDefinitionInstructions` 仅处理 body scope 函数；`global_vars` / `_var_` / `_arg_var_` / 模块导出索引尚未串联 | 模块产物缺少全局注册与导出表，导致 wasm/QuickJS diff 以及 runtime 导入失败 |
| Debug & 元数据 | `LineNumberSlot`→`pc2line`, `pc2column`, `source` 存档，`hasDebug`/`strip_flags` 决定输出 | 仅记录 `LineRecorder` 数据，尚未物化到 `FunctionBytecode.debug`；`pc2column`、`source` 均缺 | 调试工具（`disasm.ts`）无法还原与 QuickJS 相同的定位信息 |

> 结论：即使语法覆盖补齐，如果不恢复 QuickJS 的 Phase 2/3/物化流程，仍然无法与 wasm 参考输出对齐，也无法提供正确的作用域/调试/运行时元数据。因此在实施 ES2023 语法时，需要同步推进以上流程层面的工作。

## 1. 语句与声明差异

| 特性 (ES2023) | QuickJS 状态 | TS 编译器状态 | 证据 / 备注 |
| --- | --- | --- | --- |
| 空语句 `;` | ✅ `js_parse_statement_or_decl()` 直接跳过 | ❌ 未注册 `ts.SyntaxKind.EmptyStatement` | `statementVisitors` 未包含该 kind，遇到裸分号即抛 “Unsupported statement kind” |
| `debugger` | ✅ `emit_op(OP_debugger)` | ❌ 未实现 `DebuggerStatement` | `statements` 目录无对应 visitor |
| `with` | ✅（严格模式下抛错，兼容非严格） | ❌ 无 `WithStatement` visitor | QuickJS 在 `parser.c` 中受 `strict` 控制；TS 端完全缺失 |
| `try/catch/finally` | ✅ `BlockEnv` + `OP_catch/OP_gosub` | ❌ 完全缺失 | `src/compiler/statements` 无 `TryStatement` 编译逻辑，`ControlFlowBuilder` 也未支持 finally unwind |
| `throw` | ✅ | ✅ | `compileThrowStatement` 已实现 |
| `return` | ✅ | ✅ | `compileReturnStatement` | 
| `break/continue` + label | ✅ | ⚠️ | 仅支持循环/switch label；`try/finally` 场景缺 unwind | `ControlFlowBuilder` 只有 Loop/Switch/Label，未与 `LoopCleanupManager` 以外的 unwind 结合 |
| `if/else` | ✅ | ✅ | `compileIfStatement` | |
| `switch` (default 任意位置、fallthrough、Annex-B hoist) | ✅ | ⚠️ | 控制流基本对齐，但 case 内声明、函数 hoist 缺失 | `compileSwitchStatement` 尚未处理 case 内 function decl、`default` hoist、`return` 以外的 stack drop |
| `while/do/for` | ✅ | ✅ | `loops.ts` 覆盖 while/do/for | 但 `for` init/condition/step 中的解构、`await` 未实现 |
| `for...in` | ✅ | ⚠️ | 仅支持单标识符，拒绝解构 | `compileForInStatement` 对非 identifier `throw new Error('Destructuring ... not supported')` |
| `for...of` | ✅ | ⚠️ | 不支持解构/`for await`；loop var 仅限 identifier | `compileForOfStatement` 内直接 `throw new Error('for await is not supported yet')`，并禁止 destructuring |
| 顶层 `await` + `for await...of` | ✅ | ❌ | 模块/async 函数中允许 | TS 端完全抛错 |
| `import` 声明（默认、命名、namespace、with attributes） | ✅ | ❌ | `statements` 未实现 `ImportDeclaration` 路径 |
| `export {}`, `export * from`, `export default <expr>` | ✅ | ⚠️ | 仅支持 `export` 绑定（无 re-export）、`export default` 仅限 identifier | `compileExportDeclaration/Assignment` 内部禁止 `moduleSpecifier`、要求表达式为 Identifier |
| `class` 声明 | ✅（含字段/私有/静态块） | ⚠️ | 仅支持方法 + getter/setter；字段、私有、computed 全拒绝 | `classes.ts` 遇到 `PropertyDeclaration` 有 initializer 直接 `throw`；`PrivateIdentifier` 也未处理 |
| `var/let/const` 声明（含解构和默认值） | ✅ | ❌ | `compileVariableStatement` 仅接受 Identifier，`const` 强制 initializer，但无解构/默认值 | |

## 2. 表达式 / 运算符差异

| 特性 | QuickJS | TS 编译器 | 证据 / 备注 |
| --- | --- | --- | --- |
| 数字字面量（含 BigInt、二进制/八进制、数字分隔符） | ✅ | ❌ | `compileNumericLiteral` 将文本 `Number()`，BigInt/分隔符均丢失；不支持 `123n` | |
| 正则字面量 | ✅ `js_parse_regexp` | ❌ | `compileExpression` 无 `RegularExpressionLiteral` 分支 |
| 模板字符串（表达式/模板对象） | ✅ | ⚠️ | 仅支持简单模板拼接；无 tagged template 处理 | 未构建 `template object` 常量，也未处理 `ts.TaggedTemplateExpression` |
| `array` 字面量（洞、spread） | ✅ | ❌ | `compileArrayLiteralExpression` 遇到洞 `throw`，无 spread 支持 |
| `object` 字面量（computed、spread、`__proto__`、accessor、method shorthand） | ✅ | ❌ | 仅接受 identifier/string/number 名；拒绝 computed、spread、getter/setter、private | `collections.ts` 明确 `throw new Error('Unsupported ...')` |
| `FunctionExpression` / `ArrowFunction` | ✅ | ⚠️ | 子函数可生成，但未实现参数解构、默认值、rest、`arguments`/`new.target` 限制 | `compileChildFunction` 只被动接受 AST，周边语义缺失 |
| `ClassExpression` | ✅ | ⚠️ | 复用 `ClassDeclaration`，但字段/私有问题同上 |
| `super.prop` / `super[...]` / `super()` | ✅ | ⚠️ | 仅 `super()` 在派生构造器中可用；`super.prop` 未实现 | `compileExpression` 无 `SuperProperty` 支持；仅 `compileCallExpression` 特判 `callee.kind === SuperKeyword` |
| `new.target` | ✅ | ⚠️ | 仅在派生构造器 helper 中写入；表达式层面 `compileExpression` 无 `NewTarget` 处理 | QuickJS 允许 `new.target` 任意函数；TS 端不可用 |
| `import.meta` | ✅ | ❌ | `compileExpression` 无 `ImportKeyword` 处理；`SpecialObject.ImportMeta` 未使用 |
| 动态 `import()` | ✅ | ❌ | `compileExpression` 不识别 `ImportKeyword` |
| `await` / `yield` / `yield*` | ✅ | ❌ | 无 `AwaitExpression` / `YieldExpression` 分支 | async/generator 函数仍输出同步字节码 |
| `delete` / `typeof` / `void` | ✅ | ⚠️ | 仅 `void` 通过 `compileVoidExpression`; `delete`/`typeof` 缺失 | `operators` 目录无相关实现 |
| 前缀/后缀 `++/--` | ✅ | ❌ | `compilePostfixUnaryExpression` 直接 `throw`，前缀仅支持 `+ - ~ !` |
| 条件表达式 `?:` / 逗号表达式 | ✅ | ❌ | 无 `ConditionalExpression` / `CommaListExpression` 处理 |
| 可选链 `?.`（property / element / call） | ✅ | ❌ | 无 `OptionalChain` 节点处理 |
| Nullish 合并 `??` | ✅ | ✅ | `compileLogicalBinaryExpression` 覆盖 | 仅限普通表达式，不含 `??=` 左值多样性 |
| 逻辑赋值 `&&=`/`||=`/`??=` | ✅ | ⚠️ | 仅 identifier / property，且 property 仅点号 | 无数组元素 / `super` / destructuring |
| 元素访问 `obj[prop]` / `obj?.[prop]` | ✅ | ❌ | `compileExpression` 无 `ElementAccessExpression` 分支 |
| Destructuring（赋值/for头/参数/rest） | ✅ | ❌ | 全局拒绝 destructuring（`VariableStatement`, `For*`, 函数参数） |
| Spread (`[...arr]`, `{...obj}`, 函数/数组实参) | ✅ | ❌ | 未在字面量或调用位置实现 spread 逻辑 |
| Private brand check `#x in obj` | ✅ (`OP_private_in`) | ❌ | 无 `PrivateIdentifier` 支持 |
| `BigInt` 运算 (`**`, `<<`, etc.) | ✅ | ⚠️ | 没有 `BigInt` 常量/类型，运算始终走 `Number` |

## 3. 类、字段与私有成员

| 特性 | QuickJS | TS 编译器 | 备注 |
| --- | --- | --- | --- |
| Public/Private 字段（实例/静态） | ✅ | ❌ | `ClassDeclaration` 中遇到 `PropertyDeclaration` 直接 `throw` |
| 静态初始化块 (`static {}`) | ✅ | ❌ | 未解析 `ClassStaticBlockDeclaration` |
| 私有方法 / getter / setter | ✅ | ❌ | 缺少 `PrivateIdentifier` 解析及 `OP_define_private_*` 指令 |
| Computed 成员名 | ✅ | ❌ | `classes.ts` 仅接受 Identifier/字符串/数字 |
| `super` property/method 链接 | ✅ | ⚠️ | 只在 `super()` 调用路径注入，属性访问未实现 |
| Brand 检查 (`#x in obj`) | ✅ | ❌ | 未暴露 `Opcode.OP_private_in` |

## 4. 模块、导入导出与顶层异步

| 特性 | QuickJS | TS 编译器 | 备注 |
| --- | --- | --- | --- |
| `import` 语句（default / namespace / named / with attributes） | ✅ | ❌ | 无 `ImportDeclaration` 处理 | 
| `export * from` / `export { ... } from` | ✅ | ❌ | `compileExportDeclaration` 直接 `throw new Error('Re-exporting ... not supported yet')` |
| `export default <expr>` | ✅ | ⚠️ | 仅允许 identifier | `compileExportAssignment` 要求 `ts.isIdentifier(expression)` |
| 动态 `import()` | ✅ | ❌ | 表达式端不识别 |
| `import.meta` | ✅ | ❌ | 未产生 `OP_special_object ImportMeta` |
| 模块全局 hoist (`define_func/define_var/put_var`) | ✅ | ⚠️ | `buildHoistedDefinitionInstructions` 仅处理函数常量，`globalVars.forceInit` 等路径未串联 `Compiler` 阶段 | TODO.md 阶段 1/2 的 “module/global hoist 元数据”仍为未完成状态 |
| 顶层 await | ✅ | ❌ | 没有 `AwaitExpression` 支持，`compile()` 也未设置 `JS_MODE_ASYNC` |

## 5. 运行时字节码元数据

| 特性 | QuickJS | TS 编译器 | 备注 |
| --- | --- | --- | --- |
| `OP_special_object` 注入（`arguments`, `new.target`, `import.meta`, `var_object` 等） | ✅ | ❌/⚠️ | 仅在派生构造器 `super()` 路径调用 `OP_special_object`；函数入口未统一注入 |
| `resolve_variables()` 阶段：`scope_*`→最终指令、`tail_call`、短跳、`pc2line` 搬运 | ✅ | ⚠️ | 仅实现 label 回填 (`resolvePendingJumps`)，无变量解析/短指令优化/`tail_call` 折叠 |
| 常量池 / 原子去重 | ✅ | ❌ | 尚未实现 `ConstantTable`，所有字面量立即发射 |
| Inline Cache (`OP_get_field_ic`) | ✅ | ❌ | 当前只发 `OP_get_field` / `OP_put_field`，未建立 IC 槽 |

## 6. 优先级建议

1. **语法守卫与清单驱动**（短期）
   - 建立 `ES2023` 支持矩阵（可导出 JSON），在 `compileExpression/compileStatement` 中集中 `assertSupported`。
   - 任何未实现的 `SyntaxKind` 给出机器可读错误（含 TODO 链接）。

2. **左值/表达式基建**（中期）
   - 抽象 `LValueBuilder`（类似 QuickJS 的 `make_ref`），一次性解锁 element/super/destructuring/逻辑赋值/`delete`。
   - 同步实现 `ElementAccessExpression`、`OptionalChain` 栈序列；增加 spread/destructuring 支持。

3. **语句/模块扩容**（中期）
   - `TryStatement` + unwind builder；`WithStatement`（模块禁止）；`ImportDeclaration` 全量实现。
   - `export * from` & `export default <expr>`；`for await...of` 以及顶层 await。

4. **类与私有成员**（中期）
   - 覆盖字段、私有成员、静态块，复用 QuickJS `define_private_*` 构造。
   - 完成 brand 检查（`#x in obj`）、`super` property/code path。

5. **Phase 2/3 还原**（长期）
   - 按 `docs/quickjs-bytecode-generation.md` 的 Phase 2/3 逐一实现：`resolve_variables`、`tail_call`、`pc2line`、`special_object` 注入、短跳与常量池写出。
   - 补上 `ConstantTable` 与 Inline Cache，保证字节码与 QuickJS wasm diff 为零。

## 7. 附录：ES2023 语法节点覆盖情况

> 以 TypeScript AST `SyntaxKind` 为索引，✅ 表示 `Compiler` 中已有 visitor；⚠️ 表示部分支持（语义或语法受限）；❌ 表示完全缺失。

| 分类 | 语法节点 | 状态 |
| --- | --- | --- |
| 语句 | `Block`, `ExpressionStatement`, `IfStatement`, `SwitchStatement`, `ReturnStatement`, `ThrowStatement`, `BreakStatement`, `ContinueStatement`, `WhileStatement`, `DoStatement`, `ForStatement`, `ForInStatement`, `ForOfStatement`, `LabeledStatement` | ⚠️（`for`/`for-in/of` 存语义限制） |
| 语句 | `TryStatement`, `WithStatement`, `DebuggerStatement`, `EmptyStatement`, `ImportDeclaration`, `ExportDeclaration`(含 re-export), `ExportAssignment`(非 identifier), `ExportDefault`, `ForStatement`+`ForAwait`, `ClassStaticBlockDeclaration` | ❌ |
| 表达式 | Literals (numeric/boolean/string/template/null), `Identifier` | ✅（非 BigInt） |
| 表达式 | `ArrayLiteralExpression`, `ObjectLiteralExpression`, `CallExpression`, `NewExpression`, `PropertyAccessExpression`, `BinaryExpression`, `PrefixUnaryExpression`, `VoidExpression` | ⚠️（缺 spread/元素访问/大部分运算符） |
| 表达式 | `ElementAccessExpression`, `OptionalChain`, `AwaitExpression`, `YieldExpression`, `DeleteExpression`, `TypeOfExpression`, `TaggedTemplateExpression`, `ConditionalExpression`, `CommaListExpression`, `PostfixUnaryExpression`, `ImportKeyword`, `MetaProperty (new.target/import.meta)` | ❌ |
| 类 | `ClassDeclaration`, `ClassExpression`, `PropertyDeclaration`, `PrivateIdentifier`, `StaticBlock`, `ComputedPropertyName`, `AccessorDeclaration` | ⚠️（仅方法型 accessor；其它 ❌） |

---

如需针对特定特性展开实现计划，可基于本表直接定位 `src/compiler` 中的缺口，实现后再使用 `compareWithWasm` Fixtures 校验与 QuickJS C 端的一致性。
