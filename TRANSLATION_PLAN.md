# QuickJS TypeScript Compiler Translation Plan

## Phase 1: Basic Types & Expressions (✅ Completed)
- [x] Primitives (number, string, boolean, null, undefined)
- [x] Binary Expressions (+, -, *, /, %, <, >, <=, >=, ===, !==, &&, ||)
- [x] Unary Expressions (!, -, +, typeof, void)
- [x] Conditional Expression (ternary)

## Phase 2: Functions & Variables (✅ Completed)
- [x] Variable Declaration (let, const, var)
- [x] Function Declaration
- [x] Function Call
- [x] Scope Management (Block, Function, Global)
- [x] Closure Variables

## Phase 3: Control Flow (✅ Completed)
- [x] IfStatement
- [x] WhileStatement
- [x] ForStatement
- [x] ForOfStatement
- [x] ForInStatement
- [x] DoWhileStatement
- [x] SwitchStatement
- [x] Break/Continue (Label support implemented)

## Phase 4: Objects & Arrays (✅ Completed)
- [x] ObjectLiteral
- [x] ArrayLiteral
- [x] PropertyAccessExpression
- [x] ElementAccessExpression
- [x] Computed Property Names

## Phase 5: Classes (🚧 In Progress)
- [x] Class Declaration (Basic structure)
- [x] Constructor
- [x] Method Definition
- [x] Property Declaration (Field initialization logic implemented, refining bytecode)
- [x] Inheritance (extends) (Implemented, refining bytecode size)
- [x] Super Call (Implemented, refining bytecode size)
- [ ] Static Members
- [ ] Private Fields

## Phase 5.1: Class Static/私有对齐（🆕 Planned）
- [ ] 按 QuickJS `js_parse_class_fields`/`emit_class_init` 生成静态块：为 static block 创建子函数并插入类初始化序列。
- [ ] 按 C 源使用 `OP_scope_put_private_field`/`OP_put_private_method` 等指令初始化私有字段/方法，补齐 `booted/#bump` 等辅助 atom 与指令顺序。
- [ ] 验证 `class-static-block.ts`、`class-private-fields.ts`、`class-methods.ts`、`class-inheritance.ts` 指令与 pc2line 完全对齐。

## Phase 6: Async/Await (🚧 Pending)
- [ ] Async Function
- [ ] Await Expression
- [ ] Promise Integration

## Phase 6.1: Async/For-Await 对齐（🆕 Planned）
- [ ] 按 QuickJS `js_parse_for_statement` 的 for-await 分支复刻：`get_iterator/async_iterator`、try/finally 迭代器 close、`OP_for_await_of` 包装。
- [ ] 按 `js_parse_function_body` async 路径生成 `OP_await` 与异常处理模板，保证指令/栈深一致。
- [ ] 回归 `async-await.ts`、`for-await-of.ts`、含 await 的 class/方法场景。

## Phase 7: Exceptions (✅ Completed)
- [x] Try/Catch/Finally
- [x] Throw Statement
- [ ] Error Objects

## Phase 8: Advanced Features (🚧 Pending)
- [ ] Generators (yield)
- [ ] Destructuring Assignment
- [ ] Spread/Rest Operators
- [ ] Modules (import/export)
- [ ] Decorators (Future)

## Phase 9: Optimization & Polish (🚧 In Progress)
- [ ] Peephole Optimizations
- [ ] Source Map Support
- [ ] Error Reporting Improvements

## Phase 14: QuickJS Parity Fixlist（🆕 In Progress）
- [ ] 统一 pc2line/sourcePos：去除可选链等特例偏移，使用 AST token 起始位对齐 QuickJS `emit_line_info`，回归 array/closure/loop 等小型 fixture 的列号差异。
- [ ] 数字/BigInt 常量生成：按 QuickJS `js_parse_number`/`emit_push_const` 选择 `push_i32`/`push_const*`/BigInt，保持常量池顺序，修复 `numeric-separators`、`es2020_bigint*`。
- [ ] 短路序列模板化：??、逻辑赋值沿用 QuickJS guard/跳转模板，与可选链一致不再人工偏移。
- [ ] 回归 sweep：`array-*`、`closure-*`、`for-loop`、`labeled-statements`、`optional-catch-binding` 等全量再跑 compare 确认零差异。

## TRANSLATION TODO（按执行顺序）
1) Phase 14 Step 1：pc2line/sourcePos 统一，移除硬编码偏移，验证 array/closure/loop 类 fixture。
2) Phase 14 Step 2：数字/BigInt 常量策略对齐，解决 `numeric-separators`、`es2020_bigint*`。
3) Phase 5.1：重做静态块/私有字段生成，修复 `class-static-block`、`class-private-fields`、`class-methods`、`class-inheritance`。
4) Phase 6.1：for-await 与 async 模板复刻，修复 `for-await-of`、`async-await`。
5) Phase 14 Step 3：短路序列模板化并回归 ??/逻辑赋值/可选链全套。
6) 全量 rerun `pnpm compare:fixtures`，更新 Binary Compatibility 表。

## Phase 13: Refactoring (🚧 In Progress)
- [x] Task 13.1: Extract Scope Management (`ScopeManager`)
- [x] Task 13.2: Extract Label & Loop Management (`LabelManager`)
- [x] Task 13.3: Extract Visitors
    - [x] 13.3.1: StatementVisitor
    - [x] 13.3.2: ExpressionVisitor
    - [x] 13.3.3: FunctionVisitor
    - [x] 13.3.4: ClassVisitor

## Binary Compatibility Tracking (🚧 In Progress)
- [x] Atom Table Alignment (Full initialization of 227 built-in atoms implemented)
- [x] `arrow-fn-basic.ts` (181 bytes, pc2line header aligned)
- [x] `compute.ts` (136 bytes, Perfect Match)
- [x] `console-log.ts` (126 bytes, Perfect Match)
- [x] `variables-let-block.ts` (169 bytes, Perfect Match - Fixed Module Var Atom Order)
- [x] `variables-var.ts` (155 bytes, Perfect Match)
- [x] `object-spread.ts` (167 bytes, Perfect Match)
- [x] `computed-property.ts` (165 bytes, Perfect Match)
- [x] `function-call.ts` (191 bytes, Perfect Match)
- [x] `try-catch.ts` (216 bytes, Perfect Match)
- [x] `if-else.ts` (149 bytes, Perfect Match)
- [x] `switch-fallthrough.ts` (189 bytes, Perfect Match)
- [x] `for-of.ts` (151 bytes, Perfect Match)
- [x] `while.ts` (143 bytes, Perfect Match)
- [x] `do-while.ts` (144 bytes, Perfect Match)
- [x] `for-loop.ts` (150 bytes, Perfect Match)
- [x] `switch-case.ts` (182 bytes, Perfect Match)
- [x] `loop-break-continue.ts` (190 bytes, Perfect Match)
- [x] `function-default-params.ts` (Structurally Correct)
- [x] `binary-ops.ts` (Perfect Match)
- [x] `closure-short.ts` (279 bytes, Perfect Match - Short Opcodes Implemented)
- [x] `closure-vars.ts` (Structurally Correct, Short Opcodes Verified)
- [ ] `class-inheritance.ts` (-25 bytes diff. Structure aligned, debugging const capture opcodes)
- [ ] `class-basic.ts` (205 bytes vs 201 bytes, +4 bytes diff. Constructor bytecode aligned; remaining delta isolated to metadata)
- [x] `primitives.ts` (Perfect Match - pc2line zigzag encoding fixed)
- [ ] `labeled-statements.ts` (Minor mismatch)
- [x] `optional-chaining.ts` (602 bytes, Perfect Match)
- [ ] `array-literal.ts`/`array-nested.ts`/`array-spread.ts` (pc2line 末尾差异)
- [ ] `numeric-separators.ts` (+32 bytes, 常量选择差异)
- [ ] `class-static-block.ts` (-209 bytes, 静态块/私有字段缺失)
- [ ] `async-await.ts`/`for-await-of.ts` (指令模板差异)

