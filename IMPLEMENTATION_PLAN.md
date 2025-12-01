## QuickJS→TypeScript 编译器转译方案

> 目标：以 **1:1 逻辑复制** `third_party/QuickJS` 中的编译流程，仅将输入端替换为 TypeScript AST，其余所有状态机、作用域、字节码生成、常量池与调试结构均按照 C 源码实现。任何与 QuickJS 行为不一致的实现都需要回滚并对照源码重新规划。

### 1. 约束与风格守则

1. **类组织 + 驼峰命名**：所有 `struct` / 模块以 class 复刻（例如 `JSParseState`→`ParseState`，`JSFunctionDef`→`JSFunctionDef` Class），方法、字段使用 camelCase，对应名称保持可追溯。
2. **流程 100% 对齐**：`parser.c`, `bytecode.cpp`, `function.c`, `module.c` 中的关键函数（`js_parse_program`, `emit_op`, `resolve_scope` 等）按函数粒度转译。禁止根据 fixtures 反推逻辑。
3. **AST 直接复用 TypeScript**：语法树来源为 TypeScript 编译器 API (`ts.SourceFile`)；在 QuickJS 逻辑与 TS AST 之间增加最薄抽象层，只做节点迭代与 token 映射，不新增自定义 AST。
4. **模块边界 = QuickJS C 函数边界**：每个 TS 模块/类方法与 QuickJS 源中单个函数一一对应，便于对照源码 diff。
5. **调试与差异定位**：字节码差异（尤其是 `compute.ts`）只能通过阅读 QuickJS 源并加入额外调试日志/trace（参考 `third_party/QuickJS/src/core/qts_trace.*`）定位。
6. **测试口径**：所有 fixtures 作为“验收”，只能验证等价性，不得被用来推测实现细节。

### 2. QuickJS 源码→TS 模块映射

| QuickJS 文件/函数 | 计划中的 TS 模块/类 | 说明 |
| --- | --- | --- |
| `parser.c`: `js_parse_init`, `js_parse_program`, `js_parse_source_element`, `js_parse_statement`, `js_parse_expr` | `src/compiler/parseState.ts`, `src/compiler/programBuilder.ts`, `src/compiler/statementEmitter.ts`, `src/compiler/expressionEmitter.ts` | 每个方法直接翻译，保留相同参数/返回值契约，内部驱动 TS AST 游标而非手写 tokenizer。 |
| `parser.c`: 控制流（`emit_loop`, `push_scope`, `pop_scope`, `label` 系列） | `src/compiler/scopeManager.ts`, `src/compiler/labelManager.ts` | 作用域栈、label patching 与 JumpSlot/LabelSlot 结构保持一致。 |
| `bytecode.cpp/h`: `emit_op`, `emit_u8/u16/u32`, `add_pc2line_info`, `set_last_opcode` | `src/bytecode/bytecodeWriter.ts`, `src/bytecode/opcodeInfo.ts`, `src/bytecode/debugInfo.ts` | `BytecodeWriter` 重新实现为 DynBuf 包装，记录栈增减、pc2line。 |
| `function.c/h`: `js_new_function_def`, `add_var`, `add_closure_variable`, `add_scope` 等 | `src/function/functionDef.ts`, `src/function/varAllocator.ts`, `src/function/closurePlanner.ts` | 照搬结构体字段、初始化逻辑、父子函数链表。 |
| `module.c`: 导出/导入、`add_export_entry` | `src/module/moduleLinker.ts` | 模块、全局变量处理保持与 QuickJS 一致。 |
| `qjs.c` Eval 入口、`js_parse_eval`, `JS_EvalFunctionInternal` | `src/cli/runtimeEntry.ts` | CLI 构建入口，确保 options/flags 与 QuickJS 行为一致。 |
| `qts_trace.c` | `src/debug/traceLogger.ts` | 提供与 QuickJS 相同的 trace 格式，帮助定位差异。 |

### 3. 架构分层设计

1. **AST 游标层 (`TsAstCursor`)**
	- 输入 `ts.SourceFile`，提供 `enterNode`, `leaveNode`, `currentToken` 接口来喂给 QuickJS 风格的解析函数。
	- 在 `parser.c` 中对 token 的访问全部改写为从游标读取（例如 `next_token` 对应 `cursor.nextToken()`）。

2. **解析状态层 (`ParseState`)**
	- Class 版本的 `JSParseState`，字段同 `parser.h`，含 `curFunc`, `token`, `bufPtr`（由 AST 位置信息虚拟出来）。
	- 重写 `skipShebang`, `js_parse_directives`, `pushScope`, `popScope` 等辅助函数。

3. **函数定义层 (`JSFunctionDef` class)**
	- 完整迁移 `JSFunctionDef` 字段，包含 `DynBuf byteCode`, `LabelSlot[]`, `JumpSlot[]`, `LineNumberSlot[]` 等。
	- 在构造器中套用 TypeScript `DynBuffer` 实现，以 `Uint8Array` + 自动扩容方式替代。

4. **字节码发射层 (`BytecodeEmitter`)**
	- 严格使用 `bytecode.cpp` 中的 `emit` 族函数（包括 `emit_goto`, `emit_label`, `emit_return`）。
	- 栈高度通过 `opcodeInfo.ts`（生成自 `third_party/QuickJS/src/core/bytecode.h`）来维护，保持 `stack_level`、`stack_size` 逻辑一致。

5. **作用域与变量解析 (`ScopeResolver`)**
	- 直接转译 `find_var`, `add_var`, `define_var`, `resolve_scope`，并保持 `scope_level`, `scope_next` 的位运算。
	- 捕获变量时，沿 `parent` 链上推，生成 `JSClosureVar[]`，复刻 `add_closure_variables`。

6. **常量池与函数池 (`ConstantPoolBuilder`)**
	- 参考 `cpool_add`, `add_closure_variables`，构建 `JSValue` union 的 TS 对象表示。

7. **序列化 (`BytecodeSerializer`)**
	- 继续沿用现有 `serializer.ts`，但其输入结构必须更新为全量 QuickJS 字段，确保 `.qbc` 输出与官方一致。

### 4. 详细模块计划（按 QuickJS 函数）

1. **`src/compiler/parseState.ts`**
	- `parseProgram()`：转译 `js_parse_program`，含 `eval_ret_idx`、`emit_return`、`is_module` 分支。
	- `parseSourceElement()` / `parseStatement()` / `parseExpression()`：分别对应 `js_parse_source_element`, `js_parse_statement`, `js_parse_expr`，内部 switch 以 `ts.SyntaxKind` 驱动，但逻辑与 C 源保持顺序。
	- `reparseIdentToken()`、`nextToken()`：利用 AST 游标实现。

2. **`src/compiler/statementEmitter.ts`**
	- `emitIf`, `emitWhile`, `emitFor`, `emitSwitch`, `emitTry`：直译 `parser.c` 中的 `case TOK_*` 逻辑，保留 label 与 drop stack 数处理。

3. **`src/compiler/expressionEmitter.ts`**
	- 负责 `assign`, `binary`, `unary`, `call`, `new`, `member`, `literal`, `function`, `class`，按 `js_parse_postfix_expr`, `js_parse_unary_expr`, ... 分层重写。

4. **`src/function/functionDef.ts` & `src/function/functionBuilder.ts`**
	- 构造/初始化：以 `js_new_function_def` 为模板。
	- `closeFunction()`：移植 `js_function_end`, `add_closure_variables`, 栈/作用域回填。

5. **`src/bytecode/bytecodeWriter.ts`**
	- `emitOp`, `emitU8/16/32`, `emitAtom`, `emitGoto`, `emitLabel`, `emitReturn`, `emitScopePutVar` 等全部保持参数顺序。
	- `pc2line`：仿照 `emit_line_info`，对接 `ts.SourceFile.getLineAndCharacterOfPosition`。

6. **`src/compiler/labelManager.ts`**
	- 实现 `LabelSlot`, `JumpSlot` 与 `patchJump`, `newGoto`，保证三阶段地址解析（pos→pos2→addr）。

7. **`src/compiler/scopeManager.ts`**
	- 移植 `BlockEnv`, `push_scope`, `push_break_entry`, `pop_break_entry`, `label_identifiers`。

8. **`src/debug/traceLogger.ts`**
	- `emitTracePoint`、`emitBytecodeDiff`，输出与 `qts_trace.c` 同格式 JSONL，方便与 `scripts/compareWithWasm.ts` 对齐。

### 5. TypeScript AST 融合策略

1. **Token 映射表**：建立 `SyntaxKind→QuickJS TOK_*` 对照，放入 `src/compiler/tokenMap.ts`，使现有 `switch(token)` 可直接迁移。
2. **节点遍历顺序**：保持 QuickJS 的“shift-reduce”顺序，例如 `js_parse_if_statement` 先编译条件、再 emit goto、再 then/else。TS AST 仅提供节点结构，不改变执行顺序。
3. **缺失语法处理**：若 QuickJS 语法覆盖< TypeScript 子集，先限制 fixtures 范围，后续按 QuickJS 新增函数扩展。


| 类型 | 说明 | 触发方式 |
| --- | --- | --- |
| 单元测试 | 针对 `BytecodeWriter`, `ScopeResolver`, `AtomManager` 的 API，对齐 QuickJS 辅助函数行为 | `pnpm test -- workspace-root` (Jest) |
| Fixture 集成测试 | `__tests__/compiler/fixtures/*.ts` 全量跑通，输出 `.qbc` 与 wasm 参考比对 | `pnpm -s exec tsx scripts/compareAllFixtures.ts` |
| 关键 fixture 快速验证 | `compute.ts`, `console-log.ts`, `arrow-fn-basic.ts` | 已存在的 VS Code Task（如 “Run CLI quick validation”） |

### 8. 迭代步骤与状态


### 9. 风险与对策

1. **TS AST 与 QuickJS Token 定义差异**：通过中间映射层保持两边字段对齐，必要时在 `ts.Node` 上模拟 token（start/end/flags）。
2. **字节码短指令（short opcodes）**：从 `third_party/QuickJS/src/core/opcode_info` 生成元数据，自动判定可否使用短指令，防止手工遗漏触发 `compute.ts` 差异。
3. **作用域/闭包 bug**：增加最小化单元测试与 trace，确保 `scope_level`, `scope_next` 变化跟踪。
4. **调试噪声**：将额外日志封装在 `debug` flag 下，默认关闭，避免污染正式输出。

### 10. 成功判定

* `.qbc` 输出与 QuickJS wasm 逐字节一致（含 pc2line、const pool）。
* 所有 fixture 通过 `scripts/compareAllFixtures.ts`，`compute.ts` 差异清零。
* 代码结构与 QuickJS C 源建立清晰映射，便于后续继续移植其它内建特性。

### 11. 迭代进度同步（2025-12-01）

**已完成**

- 完成 Phase 0 设计：输出经 QuickJS 源码审校的模块映射、栈/作用域迁移策略与 trace 流程。
- 明确禁止以 fixture 反推代码的原则，并在测试矩阵中固化验收入口（CLI Task + compareWithWasm）。
- Phase 1 Groundwork：完成 `JSFunctionDef` 类的字段/标志一一映射、实现 `DynBuf` + `BytecodeWriter` 栈追踪、拆分 `src/compiler` 目录并新增 `ParseState` 骨架，确保 TypeScript 结构与 C 源一一对应。
- Phase 1 迭代（新增）：基于 QuickJS `function.c` 落地 `JSFunctionDef` 助手 API（`addVar`/`addScopeVar`/`addClosureVar`/`enterScope`/`leaveScope` 等），`ParseState.pushScope/popScope` 已改用新接口，后续模块可直接复用。
- Phase 1 迭代（新增）：完成 `BytecodeWriter`/`DynBuf` 烟雾测试与 serializer 栈计算联动，复用 `stackMax` 数据并在 `serializer` 中引入 `getEffectiveStackUsage`，保障空程序及短指令流程可回归。
- Phase 1 迭代（新增）：新增 `tokenMap.ts` 复刻 QuickJS `TOK_*` 枚举，`ParseState.nextToken/reparseIdentToken` 改用 TypeScript Scanner 驱动，并将 `TypeScriptCompiler` 顶层流程挂载到 parse-state 光标（同步 token ptr + 基础 `parseState.test.ts` 单测覆盖 LF/atom 行为）。
- Phase 1 迭代（新增）：落地 `ProgramBuilder`，以 ParseState token 流生成 `SourceElementRecord` 计划，并让 `TypeScriptCompiler.compileProgram` 依照该计划区分函数声明/普通语句，保证 `js_parse_program/js_parse_source_element` 的 token 顺序可逐步迁移。
- Phase 3 迭代（新增）：`ScopeManager`/`LabelManager` 已接入 `TypeScriptCompiler` 主流程，`compileBlock`/`compileFor`/`compileForOf`/`compileTry` 统一通过 helper 维护 `scope_level`，为 BlockEnv dropCount、loop break/continue 解析迁移打下基础。
- Phase 3 迭代（新增）：移除遗留 `loopStack`，所有 `break`/`continue`/if-优化跳转改由 `ScopeManager.findBreakTarget` 驱动，并在 `for`/`while`/`for-of` 推送 BlockEnv（含 iterator 标记），确保未来可直接扩展 dropCount、label 解析与 iterator cleanup。
- Phase 3 迭代（新增）：引入 `BlockKind`/BlockEnv 元数据，ScopeManager 支持 dropCount/iterator 标记，并在 `switch` 语句推送 `BlockKind.SWITCH`，让 `break`/`drop` 行为与 QuickJS `push_break_entry` 语义对齐。
- Phase 3 迭代（新增）：ScopeManager 暴露 BlockEnv 栈供 TypeScriptCompiler 统一清理，`break`/`continue` 在进入目标前自动执行 QuickJS 风格的 `dropCount`/`iterator_close`/`gosub finally`，`for-of`/`switch`/`try`/`catch`/`finally` 块已经带上与 `push_break_entry` 对齐的状态，确保离开块时栈深、pc2line 逻辑与 C 端一致。
- Phase 3 迭代（新增）：补完 `label_identifiers`：为循环块挂接 label 元数据、实现带 label 的常规语句包装，并发射 `OP_enter_scope`/`OP_leave_scope` + `close_scopes` 对应的清理序列，保证 `break`/`continue` 穿越任意块时先释放词法作用域再进入迭代器/ finally 清理，行为与 QuickJS C 端一致。
- Phase 3 迭代（新增）：`ProgramBuilder` 输出已经接入新的 `statementEmitter`/`expressionEmitter` 桥接层，`TOK_IF`/`TOK_RETURN` 由 emitter 直接驱动，TypeScriptCompiler 仅作为宿主提供 `emitOp`/`emitLineCol` 等 API；顶层 plan 迭代顺序不再依赖 AST 遍历，`pnpm -s tsc --noEmit` 验证通过，后续可继续按 QuickJS `js_parse_statement` 顺序扩容 case。
- Phase 3 迭代（新增）：`statementEmitter` 已扩展到 `TOK_VAR`/`TOK_BLOCK`/`TOK_BREAK`/`TOK_CONTINUE`/`TOK_WHILE`/`TOK_FOR`，`ProgramBuilder` 产出的顺序直接映射到循环与块语句，legacy `compileStatement` 仅在 emitter 未覆盖时兜底；`pnpm -s start __tests__/compiler/fixtures/compute.ts --disasm --cfg --pc2line --debug` 与 `pnpm -s tsc --noEmit` 均通过，证明新调度不会破坏 CLI。
- Phase 3 迭代（新增）：`statementEmitter` 继续接管 `TOK_SWITCH`/`TOK_TRY`/`TOK_THROW`，ProgramBuilder 驱动直接命中复杂控制流 case，`compileThrowStatement` 仅保留 emitter helper；同时 `expressionEmitter` 现在优先劫持 `BinaryExpression`/`CallExpression`（含赋值场景），由 emitter 调度现有 `compileBinaryExpression`/`compileCallExpression`，为逐步翻译 `js_parse_expr` 奠定入口。
- Phase 3 迭代（新增）：`statementEmitter` 进一步内联 `switch`/`try` 的 BlockEnv & cleanup 细节，直接操控 `ScopeManager`/`LabelManager` 推送的 `break`/`finally` 路径，并追加 `TOK_DEBUGGER` Case，使 TypeScriptCompiler 只暴露底层 helper；该迁移后 `compileSwitchStatement`/`compileTryStatement` 仅充当 emitter 的宿主入口。
- Phase 3 迭代（新增）：`expressionEmitter` 扩展到 `Identifier`/`NumericLiteral`/`StringLiteral`/`ArrayLiteral`/`ObjectLiteral`/`PropertyAccessExpression`/`NewExpression`，并沿用原有 `compile*` helper 发射栈效果，`compileExpression` 大 switch 的命中率进一步降低，为后续接管剩余表达式打基础。
- Phase 3 迭代（新增）：`statementEmitter` 现已接管 `TOK_WITH` 与带 label 的常规语句，宿主在严格模式下直接拒绝 `with`，并提供 `assertLabelAvailable`/`isStrictMode` 等新 API；同时 `expressionEmitter` 新增 `ElementAccessExpression` 拦截点并复用宿主 helper，确保成员访问类表达式统一由 emitter 驱动。
- Phase 3 迭代（新增）：`expressionEmitter` 进一步接管 `this`/`null`/`true`/`false` 字面量访问，宿主暴露 `compileThisExpression`/`compileNullLiteral`/`compileBooleanLiteral`，让基础字面量与成员访问一样在 emitter 层统一调度，为拆分一元/更新表达式打前站。
- Phase 3 迭代（新增）：`expressionEmitter` 继续扩展到模板字面量与条件表达式，`TemplateExpression`/`NoSubstitutionTemplateLiteral`/`ConditionalExpression` 现在都由 emitter 劫持并复用宿主 `compileTemplateExpression`/`compileConditionalExpression` helper，`compileExpression` 的大 switch 进一步收缩。
- Phase 3 迭代（新增）：`expressionEmitter` 已接管 `TypeOfExpression` 与 `VoidExpression`，宿主沿 QuickJS helper 发射 `OP_typeof` 与 `OP_drop`+`OP_undefined`，开始迁移 QuickJS 一元控制流节点。

**进行中 / 下一步**

1. **StatementEmitter 深度迁移**：在完成 `switch`/`try`+`debugger`、`with` 与 label 语句迁移后，继续补齐 `TOK_CLASS` 等剩余 case（依赖 TypeScriptCompiler 先提供 class 声明/表达式的底层 helper），并将 BlockEnv cleanup/作用域开闭全交由 emitter 驱动，彻底把 legacy `compileStatement` 压缩成 fallback。
2. **ExpressionEmitter 扩展**：在接入成员访问、基础字面量、模板/条件 与 `typeof`/`void` 之后，继续劫持 `PrefixUnaryExpression`、`PostfixUnaryExpression` 以及 `++/--` 更新表达式，为后续完整迁移 `js_parse_unary_expr`/`js_parse_assign_expr` 奠基。
3. **Serializer/Trace 差异验证**：基于 smoke test 扩展空程序 `.qbc` 对照，并准备接入 trace logger（Phase 4 前置），同时对 `compute.ts` 快速验证结果持续归档。

**未来 48h 行动项**

- [x] 基于 QuickJS `function.c` 增加 `JSFunctionDef` 工具方法：`addVar`, `addScope`, `addClosureVar`, `enterScope/leaveScope`，并让 `ParseState` 使用新 API。
- [x] 编写 `BytecodeWriter`/`DynBuf` 的 smoke test（空程序 + 手动指令），并在 serializer 中读取 `stackMax` 直接复用计算结果。
- [x] 扩充 `ParseState`：实现 `nextToken` 的 AST/Scanner 驱动雏形，并将 `TypeScriptCompiler` 顶层流程迁移到新的 parse state。
- [x] 起草 `programBuilder`/`parseSourceElement` 雏形：以 ParseState token 光标驱动空程序/指令直译流程，为后续语句发射做铺垫。
- [x] 输出 `scopeManager`/`labelManager` 数据结构与 API 草稿并与 `TypeScriptCompiler` 主流程连线，完成 `compileBlock/For/Try/ForOf` 的 scope helper 迁移。
- [x] 将 `ProgramBuilder` 输出接入 `statementEmitter`/`expressionEmitter`，完成第一批 `TOK_*` case（如 `if`/`return`）迁移并串联新的作用域栈。
- [x] 将 `break`/`continue` 控制流改造为 `ScopeManager.findBreakTarget`，在 `for`/`while`/`for-of` 推送 BlockEnv 并移除遗留 `loopStack`。
- [x] 将 QuickJS `push_break_entry`/`label_identifiers` 对应的 BlockEnv dropCount、label 解析迁移到 `ScopeManager`，并补上 `switch`/`try/finally` 可跳出块的 drop 逻辑（ScopeManager cleanup 已完成，for-of/switch/try/catch/finally 的 dropCount/iterator/finallyLabel 与 C 源一致）。
- [x] 收尾 `label_identifiers`：实现带 label 的常规语句与 `close_scopes`/`OP_leave_scope` 发射，确保 `break`/`continue` 穿越嵌套 block 时作用域释放与 QuickJS 100% 对齐。

**风控 / 依赖**

- QuickJS `bytecode.h` / `opcode_info` 中的短指令策略需脚本化导入，避免 Phase 1 后期返工；可通过 `scripts/generateOpcodeInfo.ts` 自动生成。
- Trace 对比依赖 `third_party/QuickJS/wasm` 带调试日志的构建，需同步记录编译指令和 commit，以便 Phase 4 快速复现。
