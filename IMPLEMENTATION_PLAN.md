## QuickJS→TypeScript 编译器转译方案

> 目标：以 **1:1 逻辑复制** `third_party/QuickJS` 中的编译流程，仅将输入端替换为 TypeScript AST，其余所有状态机、作用域、字节码生成、常量池与调试结构均按照 C 源码实现。任何与 QuickJS 行为不一致的实现都需要回滚并对照源码重新规划。

### 1. 约束与风格守则

1. **类组织 + 驼峰命名**：所有 `struct` / 模块以 class 复刻（例如 `JSParseState`→`ParseState`，`JSFunctionDef`→`JSFunctionDef` Class），方法、字段使用 camelCase，对应名称保持可追溯。
2. **流程 100% 对齐**：`parser.c`, `bytecode.cpp`, `function.c`, `module.c` 中的关键函数（`js_parse_program`, `emit_op`, `resolve_scope` 等）按函数粒度转译。禁止根据 fixtures 反推逻辑。
3. **AST 直接复用 TypeScript**：语法树来源为 TypeScript 编译器 API (`ts.SourceFile`)；在 QuickJS 逻辑与 TS AST 之间增加最薄抽象层，只做节点迭代与 token 映射，不新增自定义 AST。
4. **模块边界 = QuickJS C 函数边界**：每个 TS 模块/类方法与 QuickJS 源中单个函数一一对应，便于对照源码 diff。
5. **调试与差异定位**：字节码差异（尤其是 `compute.ts`）只能通过阅读 QuickJS 源并加入额外调试日志/trace（参考 `third_party/QuickJS/src/core/qts_trace.*`）定位。
6. **测试口径**：所有 fixtures 作为“验收”，只能验证等价性，不得被用来推测实现细节。
7. **env 代码禁止手改**：`src/env.ts` 及其衍生常量完全由 `scripts/getEnv.ts` 从 wasm/QuickJS 导出生成，严禁直接在仓库中修改（如需变更请改生成脚本并重新导出）。

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

### 11. 迭代进度同步（2025-12-04）

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
- Phase 3 迭代（新增）：`expressionEmitter` 继续覆盖 `PrefixUnaryExpression`/`PostfixUnaryExpression` 与 `++/--` 更新表达式，直接委托宿主 `compilePrefixUnaryExpression`/`compilePostfixUnaryExpression`，并在 `dropResult` 场景提前处理 `++/--`，为完全迁移 `js_parse_unary_expr` 铺路。
- Phase 3 迭代（新增）：`TypeScriptCompiler` 新增 `JS_DEFINE_CLASS_HAS_HERITAGE`/`DefineMethodKind` 常量与 `compileClassDeclaration`/`compileClassExpression`/`compileMethodFunction` 等 helper，支持 constructor/method/accessor 以 QuickJS `define_class` 流程发射；`statementEmitter` 增加 `TOK_CLASS` 宿主钩子后即可直连这些 helper，并通过 `pnpm -s tsc --noEmit` 与 `pnpm -s start __tests__/compiler/fixtures/compute.ts --disasm --cfg --pc2line --debug` 双验证确认 CLI 回归。
- Phase 3 迭代（新增）：类声明现在默认以 `OP_set_loc_uninitialized` 预热 TDZ，并将 `statementEmitter` 的 `TOK_CLASS` case 直接绑定到宿主 helper；同步落地静态字段初始化（按 QuickJS 栈约定 swap constructor，再以 `OP_define_field` 写入，缺省值补 `undefined`），为后续下沉派生类 BlockEnv cleanup 与实例字段初始化打前站。
- Phase 3 迭代（新增）：类 helper 会在生成 constructor 之前先行扫描实例字段并缓存初始化 AST，随后将初始化序列注入 constructor block prelude，保证基础 `class_fields_init` 语义真正执行，为下一步 BlockEnv cleanup / `super()` 校验提供依托。
- Phase 3 迭代（新增）：实例字段初始化已提升为独立 `<class_fields_init>` 闭包：先将字段列表编译成专属 JSFunctionDef 并缓存到常量池，constructor 通过 `call_method` 触发该闭包，彻底摆脱内联初始化，为后续品牌注入与派生类路径复用打基础。
- Phase 3 迭代（新增）：类声明现拥有独立 BlockEnv，用于存储 `<class_fields_init>` 闭包并由 constructor 通过闭包变量驱动调用；同时在 constructor 入口发射 `OP_check_ctor`/`OP_init_ctor` 并强制派生类显式 `super()`，让 `new.target`/`super()` 约束与 QuickJS 行为保持一致。
- Phase 3 迭代（新增）：完成私有字段 brand 链路：`ClassCompilationContext` 记录实例/静态 `#` 成员，`<class_fields_init>` 即使仅负责品牌也会生成且在入口发射 `OP_add_brand`，prototype/class 两侧分别插入 `OP_dup` + `OP_null`/`OP_dup` 序列触发 `OP_add_brand`，并在存储闭包前补上 `OP_set_home_object`，确保 brand 注入依照 QuickJS 栈约定执行；`pnpm -s tsc --noEmit` 与 compute fixture 双验证通过。
- Phase 3 迭代（新增）：补齐私有符号与访问语义：类声明阶段为每个 `#` 成员发射 `OP_private_symbol` 并把符号存入私有 scope，私有方法/访问器以 `OP_scope_put_var_init` 绑定闭包，实例/静态字段分别在 `<class_fields_init>` 与构造函数上使用 `OP_define_private_field`；表达式侧新增 `OP_scope_get/put_private_field(2)` 与 `OP_scope_in_private_field`，让 `obj.#x`、`obj.#x()`、`obj.#x = v` 与 `#x in obj` 的字节码与 QuickJS 对齐。
- Phase 3 迭代（新增）：接入 QuickJS `resolve_scope_var`/`resolve_scope_private_field` 逻辑，新增 `ScopeResolver` passes 在 serializer 之前逐条替换 `OP_scope_*` 临时指令，支持伪变量/参数/闭包/全局回退、`scope_make_ref/get_ref` 译码及私有字段引用语义，配套在 `TypeScriptCompiler.compile()` 中串联，实现与 QuickJS 相同的作用域折叠管线。
- Scope Guardrail（新增）：修复 `scripts/runComputeGuardrail.ts` 的临时指令检测逻辑（过滤短指令别名、校验 atom/scope 操作数），并重新运行 compute guardrail，确认 CLI/Bytecode/Trace 全量输出与 QuickJS wasm 完全一致且 `temporaryScopeAnalysis.totalCount = 0`。
- Serializer/Trace Guardrail（新增）：`__tests__/compiler/serializer.guardrail.test.ts` 与 `trace.guardrail.test.ts` 通过 `BytecodeComparator`、`compareModuleTrace.ts` 验证 `trace-smoke` fixture，确保 `.qbc` 与 trace JSONL 工件始终生成，并将 TS/wasm trace 结构归档至 `artifacts/<fixture>.*trace.*` 以支撑后续差异定位。
- Serializer/Trace 差异验证（新增）：新增 `empty-program` fixture，并让 serializer/trace guardrail 覆盖 `trace-smoke` 与空程序两种输入，`compareWithWasm`/`compareModuleTrace` 现在会对两个样例生成 `.qbc`/trace/报告，从 smoke test 扩展到“空程序”场景，验证完全无语句时的序列化/Trace 行为。
- Compute 差异归档（新增）：新增 `scripts/runComputeGuardrail.ts`，串联 CLI 编译（写入 `.qbc`/disasm/pc2line）、`BytecodeComparator` 以及 `compareModuleTrace`，并以 `__tests__/compiler/compute.guardrail.test.ts` 固化管线，可一键生成并校验 `compute.ts` 的 CLI/字节码/trace 全量工件。
- Compute 差异定位（新增）：利用 `runComputeGuardrail` 落盘的 disasm/pc2line 确认 PC4 首个偏差来自顶层 `const arr`，TS 侧发射 `OP_set_loc_uninitialized` + `OP_put_loc0/OP_get_loc_check`，而 QuickJS 按 `parser.c/js_parse_var` → `resolve_scope` 折叠到 `OP_scope_put_var_init` → `OP_put_var_ref0/OP_get_var_ref_check`，导致整个 for-of 前缀与 wasm 不对齐。
- Scope Block 清理 + guardrail 扩展（新增）：`ScopeResolver` 现在在 rewrite 阶段直接回收 `OP_enter_scope/leave_scope` 及其余临时 `OP_scope_*` 指令，并通过 operand 校验避免与 `push_*` 等短指令混淆；`scripts/runComputeGuardrail.ts` 与 `__tests__/compiler/compute.guardrail.test.ts` 已扩展到 `console-log.ts`、`arrow-fn-basic.ts`，三套夹具的 CLI/Trace/pc2line 工件均可稳定生成且 `temporaryScopeAnalysis.totalCount = 0`，为后续字节级对齐提供可靠的护栏。
- **arrow-fn-basic Guardrail（新增）**：修复 `JSFunctionDef.args` 的 `scopeNext` 序列，保持与 QuickJS 一致（参数链表无需反向链接），重新生成 `arrow-fn-basic` CLI/bytecode/disasm，并通过 `compareWithWasm` 任务验证四处 00→01 差异全部消除，核心夹具 guardrail 现可强制 `Bytecode identical: ✅`。
- compareAllFixtures Guardrail（新增）：`scripts/compareAllFixtures.ts` 已串联 CLI 编译（含 disasm、pc2line）、`BytecodeComparator` 与 `compareModuleTrace`，并以 `--side-by-side --normalize-short` 默认跑通全部 `__tests__/compiler/fixtures/*`；最新一次全量运行在 `artifacts/full-run/` 导出了 per-fixture 守护摘要，结果统计为 **15 个完全一致 / 28 个字节差异 / 14 个 stack underflow 错误**，为后续集中修复提供了明确清单（错误主要集中在 `set_var_ref*` 与 `call_constructor` 路径）。
- Stack Guardrail（新增）：撤销对 `src/env.ts`/`src/opcodeInfo.ts` 的手工 `set_var_ref*` 栈元数据改动，重新采用 QuickJS 头文件导出的 `nPop=1/nPush=1` 设置，并以 `pnpm -s exec tsx scripts/compareWithWasm.ts __tests__/compiler/fixtures/unary-ops.ts --disasm --normalize-short --side-by-side --artifacts-dir artifacts/unary-ops-debug` 回归验证，确认 unary-ops fixture 再无 stack underflow（`stack_size=7`），仅剩 -1 字节差异作为后续字节级对齐的输入。
- assignment-operators pc2line 收敛（新增）：收紧 `ExpressionStatement` 的行号对齐策略，仅在复用 pending store 且语句为赋值/更新表达式时才回填前一条 store 指令的 PC，重新生成 `assignment-operators` 工件后，TS 侧字节码与 pc2line 均与 WASM 完全一致。
- trace-smoke Stack Guardrail（新增）：修复 `compileNewExpression` 新建流程，像 QuickJS 一样在发射参数前 `OP_dup` 一份构造函数以充当 `new.target`，`OP_call_constructor` 现在拥有期望的三个入栈元素；`trace-smoke` 再次运行 `compareWithWasm` 不再触发 `stack underflow near call_constructor`，仅剩闭包元数据差异待后续收敛。
- module-exports-class（新增）：`compileClassDeclaration` 现会识别顶层 `export`/`export default` 类，复刻 QuickJS 在声明后 `set_loc`+`put_var_ref` 的写入顺序，同时通过 `ensureModuleExportClosure` 复用现有局部槽位，让 `Counter`/`DefaultCounter` 的闭包元数据与 wasm 一致，为 `module-exports-class` fixture 的 35 字节差异清零打下基础。
- module-exports-class 顶层词法顺序（新增）：`compileProgram` 引入 `collectTopLevelLexicalEntries`/`registerModuleTopLevelLexicals`，并限制预扫描阶段不再在模块顶层抢先注册变量，确保 `let/const/class` 绑定与闭包槽按照 QuickJS 源序进入匿名局部表，为后续 atom 表顺序与导出类 fixture 的剩余字节差对齐铺平道路。
- module-exports 导出顺序追踪（新增）：`compileVariableDeclarationList`/`registerModuleLocalExport` 现会在捕获导出绑定时记录源顺序，`functionDef.ModuleExportEntry` 增加 `order` 字段，`serializer` 根据该字段排序导出表并与 QuickJS `add_export_entry` 输出来回对齐；最新 `module-exports-class` 比对显示顶层 `Counter`/`createCounter` 原子顺序已一致，仅剩闭包字段 atom 尚未收敛。
- Serializer atom 重写（新增）：`src/serializer.ts` 新增 `rewriteBytecodeBuffer`，在写出每个函数前按 QuickJS `JS_WriteFunctionBytecode` 逻辑逐条重写 atom 操作数，并补全 `writeFunction` 以输出 stack/closure/const pool/bytecode/debug/常量池序列，帮助后续导出类/atom 顺序差异定位回到 QuickJS 参考结构。
- compareAllFixtures 全量回归（新增 2025-12-04）：使用 `pnpm -s exec tsx scripts/compareAllFixtures.ts --side-by-side --normalize-short --artifacts-dir artifacts/full-run` 重新生成 67 个 fixture 的 TS/WASM bytecode 与 trace；本次统计 **5 个完全一致 / 48 个存在字节差 / 4 个报错**，新增错误集中在 `delete-operator`（drop 栈回收）、`labeled-statements`（pc=12 栈不一致）、`module-exports-class`（pc=42 仍会爆栈）以及 `regex-literal`（call_constructor 入栈不足），所有对比工件已写入 `artifacts/full-run/` 供后续逐案剖析。
- delete-operator Stack Guardrail（新增）：仿照 QuickJS `js_parse_delete` 流程为 `DeleteExpression` 实现属性/元素/标识符三种分支，属性改为显式推入 prop key + `OP_delete`，标识符在非严格模式下改写为 `OP_scope_delete_var`，并在严格模块直接报错；`compareWithWasm delete-operator` 现仅剩 10 字节差异，栈下溢已清零，工件保存在 `artifacts/delete-operator-debug/`。
- labeled-statements Guardrail（新增）：补齐模块级 `var` 的 hoist 语义，变量声明只要位于模块根函数内（即便包在 `for`/`if` 等语句中）都会复用 `ensureModuleTopLevelSlot` + `addClosureVar` 注册成 `var_ref`，彻底摆脱将其误判为 block local 的 `set_loc*` 流程；`labeled-statements` fixture 重新运行不再触发 `pc=12` 栈不一致，现仅剩字节差供后续整理。
- module-exports-class Stack 跟踪（新增）：依照 Next Steps 再次运行 `compareWithWasm module-exports-class`，Serializer 仍在 `pc=42` 抛出 `inconsistent stack state`；随后以 `DEBUG_STACK_ALLOW_INCONSISTENT=1` 重跑并将 disasm/side-by-side/qbc 输出归档到 `artifacts/module-exports-class-debug/`，便于聚焦派生类导出阶段 `set_var_ref` 的栈平衡问题。
- regex-literal 复现（新增）：`compareWithWasm regex-literal` 依旧在 `call_constructor` 前少推 `new.target`，`BytecodeSerializer.computeMaxStack` 在 `pc=13` 抛出 `stack underflow near call_constructor`，即便允许栈不一致也因 compute 阶段提前终止而无法生成工件；需先补齐 `compileNewExpression` 的 `OP_dup`/`new.target` 入栈逻辑再继续对比。

**进行中 / 下一步**

1. **堆栈守护修复（stack underflow 专项）**：在 delete-operator、labeled-statements 已回归的基础上，集中精力处理 compareAllFixtures 仍然报错的 `module-exports-class` 与 `regex-literal`（前者在派生类导出路径仍有 `set_var_ref` 栈起伏，后者 `call_constructor` 路径缺少 `new.target`），修复后需复跑 `scripts/compareWithWasm.ts` 并同步 `artifacts/full-run/` 差异，力争将堆栈异常清零，为后续纯字节差问题让路。
2. **module-exports-class atom 顺序**：最新 `compareWithWasm` 运行仍有 63 字节差，集中在用户 atom 表尾部（`increment/current/initial/step`）与 `<class_fields_init>` 派生闭包的导出缓存顺序；需进一步对齐 ParseState 注册 atom 的时机，并复查闭包缓存入栈顺序以匹配 QuickJS `module.c` 的 `add_export_entry`/`sort_export_entries` 行为。
3. **compareAllFixtures 回归跟进**：依照 2025-12-04 全量运行的统计结果，优先剖析剩余 3 个报错 fixture（`labeled-statements`、`module-exports-class`、`regex-literal`），整理各自的堆栈/作用域 trace，并在定位修复后再次触发 `scripts/compareAllFixtures.ts` 以验证统计项能从 5/48/4 持续回落。

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
- [x] 让 `statementEmitter` 的 `TOK_CLASS` case 成为唯一入口并为类声明绑定 TDZ + 静态字段 helper（含 `OP_set_loc_uninitialized` 与 `OP_define_field` swap 序列），验证 `pnpm -s tsc --noEmit` / CLI compute 通过。
- [x] 下沉 QuickJS `TOK_CLASS` 的实例字段初始化路径：类 helper 现会收集实例字段并在 constructor 中注入初始化前奏，行为对齐 `class_fields_init` 基础逻辑；`pnpm -s tsc --noEmit` / CLI compute 均回归。
- [x] 接入私有字段 brand：当类声明含 `#` 成员时，在 `<class_fields_init>` 闭包与 prototype/class 上发射 `OP_add_brand`，并为闭包补齐 `OP_set_home_object`，确保 brand 检查与 QuickJS 行为一致。
- [x] 私有符号与访问语义：实现 `OP_private_symbol`/`OP_define_private_field` 路径并将 `#` 成员引用挂到 Scope/Atom 表，打通私有字段读写与 `#x in obj` 判定。
- [x] Serializer/Trace guardrail：扩展 smoke test 覆盖空程序 `.qbc` 与 trace 生成，对接 `scripts/compareWithWasm.ts` / `compareModuleTrace.ts` 自动归档差异。
- [x] compute 差异归档：将 `pnpm -s start __tests__/compiler/fixtures/compute.ts --disasm --cfg --pc2line --debug` 的等价流程移入 `scripts/runComputeGuardrail.ts`，并新增 guardrail 测试保证 CLI/Bytecode/Trace 工件可重复生成。
- [x] compute 差异定位：利用 `runComputeGuardrail` 的 disasm/pc2line 找到 PC4 首差（顶层 `const arr` 被当作局部变量），并圈定 QuickJS 参考路径（`js_parse_var` → `OP_scope_put_var_init` → `OP_put_var_ref0`）。
- [x] compute 模块 lexical → var_ref 修复：模块级 `const/let` 现在会分配专属匿名 local slot 并将闭包变量标记为 `isLocal`，TS 端 `put_var_ref0/get_var_ref_check` 与 QuickJS 完全一致，`closure` 元数据从 `parent loc65535` 修正为 `local loc0`，`compute` guardrail 字节码差异缩小到 11 字节（仅剩 scope 临时 opcode），为后续 scope 清理打下基础。
- [x] compute pc2line 1 字节差异：重构 `emitLineCol`/`flushLineCol`，改为收集 `LineNumberSlot` 并在 serializer 内复刻 QuickJS `add_pc2line_info`→`compute_pc2line_info` 两阶段编码；`pc2line` 缓冲不再即时写入，待 bytecode 完全对齐即可复用 QuickJS 差分表，无需额外补丁（原 `Remaining difference in compute.ts: 1 byte at start of pc2line table` 已清除）。
- [x] assignment-operators pc2line 收敛：基于最新 compareWithWasm 输出，梳理 `OP_put/set_var_ref*` 语句的行号锚点，将 `emitLineCol` 的 `pendingLinePcOverride` 改为引用最近一次 store PC，并在 `flushLineCol` 阶段去重/保持排序，重新生成 `assignment-operators` 工件验证 pc2line slot 0x155 之后的差异清零。
- [x] compareAllFixtures 回归巡检：以 `scripts/compareAllFixtures.ts --side-by-side --normalize-short --artifacts-dir artifacts/full-run` 重新落地 67 个 fixture 的工件，记录 **5/48/4** 统计并归档 `delete-operator` / `labeled-statements` / `module-exports-class` / `regex-literal` 四个报错案例，作为后续堆栈专项输入。
- [ ] 报错 fixture 逐案复现：`module-exports-class` 已获得 `artifacts/module-exports-class-debug/*`（含 disasm/report/qbc），`regex-literal` 仍停留在 `pc=13` 栈下溢阶段需补齐 `new.target`；继续梳理 compare trace 与 ScopeResolver log，定位根因后修复并回归 `scripts/compareAllFixtures.ts` 更新统计。

**风控 / 依赖**

- QuickJS `bytecode.h` / `opcode_info` 中的短指令策略需脚本化导入，避免 Phase 1 后期返工；可通过 `scripts/generateOpcodeInfo.ts` 自动生成。
- Trace 对比依赖 `third_party/QuickJS/wasm` 带调试日志的构建，需同步记录编译指令和 commit，以便 Phase 4 快速复现。
