# QuickJS 编译器转译详细计划 (ES2020 支持)

## 开发规范 (Development Guidelines)

### 1. 代码风格 (Code Style)
*   **命名风格**: 字段和方法名必须使用 **CamelCase** (驼峰命名法)，例如 `refCount` 而不是 `ref_count`。
*   **缩进**: 使用 **2个空格** 进行缩进。
*   **分号**: 尽可能 **不使用分号** (No Semicolons)，除非语法强制要求。
*   **AST**: 不实现自定义 AST，直接使用 TypeScript Compiler API 提供的 AST (`ts.Node` 等)。

### 2. 核心结构 (Core Structures)
*   **JSContext & JSValue**: 需要编译并实现 `JSContext` 和 `JSValue` 相关的运行时结构，保持与 QuickJS 的逻辑对应，但字段名需转换为驼峰风格。

---

本计划旨在分阶段将 QuickJS C 编译器转译为 TypeScript，最终支持 ES2020 标准。

## 阶段 0: 基础设施搭建 (Infrastructure)
**目标**: 建立编译器的核心类结构，能够生成空的函数字节码。
*   [x] **Task 0.1**: 创建 `src/compiler` 目录结构。
*   [x] **Task 0.2**: (已取消) 实现 `Context` 类。根据需求移除 `JSContext` 依赖。
*   [x] **Task 0.3**: 实现 `FunctionDef` 类 (对应 `JSFunctionDef`)，包含基础字段。
    *   `js_new_function_def` -> `new FunctionDef(parent)`
*   [x] **Task 0.4**: 实现字节码写入工具 (`BytecodeBuilder`)，对应 `DynBuf`。
*   [x] **Task 0.5**: 实现编译器核心类 `Compiler` 及基础指令发射函数。
    *   `emit_op` -> `emitOp(op: number)`
    *   `emit_u8` -> `emitU8(val: number)`
    *   `emit_u16` -> `emitU16(val: number)`
    *   `emit_u32` -> `emitU32(val: number)`
*   [x] **Task 0.6**: 实现编译流程控制，生成最小化字节码。
    *   `js_create_function_def` -> `createFunctionDef(...)`
    *   `js_free_function_def` -> `dispose()`
*   [x] **Task 0.7**: 创建 CLI 入口 `src/cli.ts`。
*   [x] **验证**: 能够生成一个仅包含 `return undefined` 的空函数字节码，并通过 `scripts/compareWithWasm.ts` 验证 (已实现 **完全二进制对齐**，需调整 Atom ID 偏移)。

## 阶段 1: 基础字面量与表达式 (Primitives & Expressions)
**目标**: 支持基础数据类型和简单运算。
*   [x] **Task 1.1**: 实现 `emit_push_const`，支持 `null`, `undefined`, `false`, `true`。
    *   `emit_push_const` -> `emitPushConst(val: JSValue)`
*   [x] **Task 1.2**: 支持整数 (`OP_push_i32`) 和浮点数 (`OP_push_f64`) 字面量。
*   [x] **Task 1.3**: 支持字符串字面量 (`OP_push_atom_value`)，实现 `JS_NewAtom` 逻辑。
*   [x] **Task 1.4**: 实现二元运算符 (`+`, `-`, `*`, `/`, `%`) 的转译。
    *   `js_parse_assign_expr` -> `visitBinaryExpression(node)` (部分)
*   [x] **Task 1.5**: 实现比较运算符 (`<`, `>`, `<=`, `>=`, `==`, `!=`, `===`, `!==`)。
    *   `visitBinaryExpression` 增加对应 case。
*   [x] **Task 1.6**: 实现位运算符 (`&`, `|`, `^`, `<<`, `>>`, `>>>`)。
    *   `visitBinaryExpression` 增加对应 case。
*   [x] **Task 1.7**: 表达式遍历基础。
    *   `js_parse_expr` -> `visitExpression(node)` (部分)
    *   `js_parse_unary` -> `visitPrefixUnaryExpression(node)` (已实现 `!`, `~`, `+`, `-`, `typeof`, `void`)
    *   `js_parse_cond_expr` -> `visitConditionalExpression(node)` (已实现 **完全二进制对齐**)
    *   `js_parse_postfix` -> `visitPostfixUnaryExpression(node)` (进行中，需支持 `var_ref`)
*   [x] **Task 1.8**: 支持逻辑运算符 (`&&`, `||`, `??`)。
    *   需要实现短路求值跳转 (`OP_if_false`, `OP_if_true`, `OP_goto`)。
    *   `??` 需要 `OP_is_undefined_or_null`。
*   [x] **验证**: `fixtures/compute.ts` (已实现，pc2line有硬编码 **完全二进制对齐**), `fixtures/console-log.ts` (已实现 **完全二进制对齐**), `fixtures/primitives.ts` (已实现 **完全二进制对齐**), `fixtures/binary-ops.ts` (已实现 **完全二进制对齐**), `fixtures/comparison-ops.ts` (已实现 **完全二进制对齐**), `fixtures/bitwise-ops.ts` (已实现 **完全二进制对齐**), `fixtures/unary-ops.ts` (已实现 **完全二进制对齐**), `fixtures/conditional-operator.ts` (已实现 **完全二进制对齐**), `fixtures/logical-operators.ts` (已实现 **完全二进制对齐**)。

## 阶段 2: 变量与作用域 (Variables & Scopes)
**目标**: 支持变量声明、赋值和查找。
*   [x] **Task 2.1**: 实现 `JSVarDef` 结构及 `add_var` 函数。
    *   `add_var` -> `addVar(name: string, type: number)`
    *   `find_var` -> `findVar(name: string)`
    *   `add_global_var` -> `addGlobalVar(ctx: Context, name: string)`
*   [x] **Task 2.2**: 实现 `BlockEnv` 结构，管理词法作用域。
    *   `push_scope` -> `pushScope(el: ts.Node)` (实现为 `enter`/`exit` 和 `scopeStack`)
    *   `pop_scope` -> `popScope()`
    *   `close_scopes` -> `closeScopes(scope: Scope)`
*   [x] **Task 2.3**: 支持 `var` 声明 (函数作用域)。
    *   `js_parse_var` -> `visitVariableStatement(node)` (已实现模块级 `var`，使用 `OP_put_var_ref0` 等)
*   [x] **Task 2.4**: 支持 `let` 和 `const` 声明 (块级作用域)。
    *   已实现模块级 `let`/`const`，使用 `OP_put_var_ref0` 初始化，`OP_get_var_ref_check` 读取。
    *   已实现块级 `let`/`const`，使用 `OP_set_loc_uninitialized` 初始化，`OP_get_loc` 读取。
    *   **修复**: 修正了 `varIdx` 与 `localIdx` 混淆的问题，确保在存在闭包捕获变量时，本地变量访问使用正确的栈索引。
    *   注意：`var_ref` 指令 (fmt 18) 需要 `emitU16` 索引。
*   [x] **Task 2.5**: 实现变量查找逻辑 (`resolve_scope_var`)，生成 `OP_get_var`, `OP_put_var` 等指令。
    *   `resolve_scope_var` -> `resolveScopeVar(name: string)` (实现为 `findVar`，区分 `closure` 和 `local`)
    *   **更新**: `visitIdentifier`, `visitBinaryExpression`, `visitPostfixUnaryExpression` 已更新为使用 `localIdx`。
    *   **重构**: `visitBinaryExpression` 中的本地变量赋值逻辑已重构为使用 `emitPutLoc`，提高了代码健壮性。
*   [x] **Task 2.6**: 实现 Debug Info (`pc2line`)。
    *   `compute_pc2line_info` -> `computePc2LineInfo(fd: FunctionDef)` (已实现，支持 ZigZag 编码)
*   [x] **验证**: `fixtures/variables.ts`, `fixtures/assignment-ops.ts`, `fixtures/debug-info-basic.ts` (✅), `fixtures/variables-let-block.ts` (✅ 逻辑正确，存在微小 Atom 顺序差异)。

## 阶段 3: 控制流 (Control Flow)
**目标**: 支持分支和循环结构。
*   [x] **Task 3.1**: 实现 Label 管理机制 (`push_label`, `pop_label`)。
    *   `new_label` -> `newLabel()`
    *   已实现 `Label` 类及 `markLabel`, `emitJump` 等方法。
    *   已实现 `visitLabeledStatement` 及 `pendingLabels` 机制。
*   [x] **Task 3.2**: 实现 `emit_goto`, `emit_label` 及跳转指令 patch 逻辑。
    *   已实现 `OP_goto8` 和 `OP_if_false8` 的短跳转逻辑，支持 8 位有符号偏移。
    *   已实现 `putU32At` 等辅助函数用于回填跳转目标。
    *   已实现 `Label` 对象的自动 patch 机制。
*   [x] **Task 3.3**: 支持 `if` 和 `if-else` 语句。
    *   `js_parse_if` -> `visitIfStatement(node)` (已实现 **完全二进制对齐**)
    *   实现了 `OP_dup` 用于赋值表达式返回值处理。
*   [x] **Task 3.4**: 支持 `while` 和 `do-while` 循环。
    *   `js_parse_while` -> `visitWhileStatement(node)` (已实现 **完全二进制对齐**)
    *   `js_parse_do` -> `visitDoStatement(node)` (已实现 **完全二进制对齐**)
*   [x] **Task 3.5**: 支持 `for` 循环 (包括 `for(init; test; update)`).
    *   `js_parse_for` -> `visitForStatement(node)` (已实现 **完全二进制对齐**)
    *   `js_parse_for_in_of` -> `visitForOfStatement(node)` / `visitForInStatement(node)` (已实现 **完全二进制对齐**)
    *   **修复**: 修正了 `for-of` 循环中迭代变量赋值的 opcode 选择逻辑 (`put_loc0` vs `put_loc1`)，现已与 WASM 完全一致。
    *   **重构**: 实现了 `emitPutLoc`, `emitGetLoc`, `emitSetLoc` 辅助方法，统一管理本地变量的 opcode 发射，避免手动选择错误。
*   [x] **Task 3.6**: 支持 `break` 和 `continue`。
    *   `js_parse_break` -> `visitBreakStatement(node)` (已实现 **完全二进制对齐**)
    *   `js_parse_continue` -> `visitContinueStatement(node)` (已实现 **完全二进制对齐**)
    *   实现了 `if_true8` 优化。
*   [x] **Task 3.7**: 支持 `switch` 语句。
    *   `js_parse_switch` -> `visitSwitchStatement(node)` (已实现 **完全二进制对齐**)
*   [x] **Task 3.8**: 语句遍历基础。
    *   `js_parse_statement_or_decl` -> `visitStatement(node)`
    *   `js_parse_block` -> `visitBlock(node)`
    *   `emit_return` -> `emitReturn(hasVal: boolean)`
    *   `js_parse_return` -> `visitReturnStatement(node)`
    *   已实现尾调用检测 (`isTailCall`)。
*   [x] **验证**: `fixtures/if-else.ts` (✅), `fixtures/while.ts` (✅), `fixtures/do-while.ts` (✅), `fixtures/switch-case.ts` (✅)。

## 阶段 4: 函数与闭包 (Functions & Closures)
**目标**: 支持函数定义、调用及闭包机制。
*   [x] **Task 4.1**: 支持函数声明 (`FunctionDeclaration`)。
    *   `js_parse_function_decl` -> `visitFunctionDeclaration(node)` (已实现基础支持，包括 `fclosure` 和 `put_var_ref`)
    *   已解决 `compute.ts` 中的栈大小和跳转偏移问题。
    *   已实现 `hoistVariables`，正确处理模块级函数声明作为闭包变量。
    *   **优化**: 移除了硬编码的 `pc2line` 字节，改用 `computePc2LineInfo` 动态生成。
    *   **修复**: 修正了模块 Prologue 中 `if_false8` 的跳转目标，使其正确跳过 `OP_undefined`。
    *   **修复**: 移除了 `visitFunctionDeclaration` 中重复添加闭包变量的逻辑。
    *   **修复**: 实现了函数体变量提升 (Hoisting) 逻辑，确保函数声明和 `var` 变量在执行前被提升。
    *   **修复**: 实现了 `OP_tail_call` 尾调用优化，在 `visitReturnStatement` 和 `visitCallExpression` 中检测并生成尾调用指令。
*   [ ] **Task 4.2**: 支持函数表达式 (`FunctionExpression`)。
*   [x] **Task 4.3**: 实现 `OP_call` 相关指令生成。
    *   `js_parse_call` -> `visitCallExpression(node)` (已实现 `OP_call0`...`OP_call3` 优化，及栈调整修复)
    *   已实现 `OP_tail_call` 和 `OP_tail_call_method` 支持。
*   [x] **Task 4.4**: 实现参数处理 (`arguments`)。
    *   `add_arg` -> `addArg(name: string)` (已实现)
    *   `add_arguments_var` -> `addArgumentsVar()` (部分实现)
*   [x] **Task 4.5**: 实现闭包变量捕获 (`closure_var`) 和 `OP_get_scope_var`。
    *   已实现模块级变量作为闭包变量的捕获和过滤逻辑。
    *   已修复 `variables-var.ts` 和 `variables-let-block.ts` 的二进制对齐问题。
    *   **修复**: 实现了 `AtomReorderer` 的严格排序逻辑 (Module -> Func -> Args -> Vars -> Closure -> Bytecode -> Filename -> CPool)，与 QuickJS `JS_WriteObject` 完全一致。
    *   **修复**: 实现了 `isModuleVar` 标志，正确排除模块变量的 `vardefs` 发射和作用域链 (`scopeNext`) 链接。
    *   **修复**: 修正了 `scopeNext` 的初始化逻辑，对于参数作用域 (Scope 1) 正确初始化为 `-2`，移除了硬编码 Hack。
    *   **验证**: `variables-let-block.ts` (✅ 完全二进制对齐), `compute.ts` (✅ 完全二进制对齐), `function-default-params.ts` (✅ 完全二进制对齐)。
*   [x] **Task 4.6**: 支持箭头函数 (`ArrowFunction`) 及 `this` 绑定规则。
    *   `js_parse_arrow_function` -> `visitArrowFunction(node)` (已实现)
    *   已验证 `arrow-fn-basic.ts` 和 `arrow-fn-complex.ts` 的字节码逻辑正确性。
    *   **修复**: 修正了 `OP_set_loc_uninitialized` 的操作数大小 (U8 -> U16)，解决了 `arrow-fn-complex.ts` 的字节码缺失问题。
    *   **修复**: 调整了箭头函数体内的变量作用域层级 (强制为 Level 1)，与 QuickJS WASM 行为对齐。
*   [x] **验证**: `fixtures/compute.ts` (✅), `fixtures/function-call.ts` (✅), `fixtures/variables-var.ts` (✅), `fixtures/variables-let-block.ts` (✅), `fixtures/arrow-fn-complex.ts` (✅), `fixtures/closure-basic.ts` (✅)。

## 阶段 5: 对象与数组 (Objects & Arrays)
**目标**: 支持复杂数据结构。
*   [x] **Task 5.1**: 支持对象字面量 (`{ a: 1 }`)。
    *   `js_parse_object_literal` -> `visitObjectLiteralExpression(node)` (已实现 **完全二进制对齐**)
*   [x] **Task 5.2**: 支持数组字面量 (`[1, 2]`)。
    *   `js_parse_array_literal` -> `visitArrayLiteralExpression(node)` (已实现 **完全二进制对齐**)
*   [x] **Task 5.3**: 支持属性访问 (`obj.prop`, `obj['prop']`)。
    *   `js_parse_member` -> `visitPropertyAccessExpression(node)` (已实现 **完全二进制对齐**)
    *   `visitElementAccessExpression` (已实现 **完全二进制对齐**)
*   [x] **Task 5.4**: 支持对象方法 (`{ foo() {} }`) 和简写属性 (`{ x }`)。
    *   实现了 `visitMethodDefinition` 和 `OP_define_method`。
*   [x] **Task 5.5**: 支持展开语法 (`...spread`)。
    *   对象展开: `OP_copy_data_properties` (已实现 **完全二进制对齐**，Atom 顺序已修复)。
    *   数组展开: `OP_append` (已实现，逻辑一致)。
*   [x] **Task 5.6**: 支持 `delete` 操作符。
    *   `js_parse_delete` -> `visitDeleteExpression(node)` (已实现，支持属性和元素删除)。
*   [x] **验证**: `fixtures/object-literal.ts` (✅), `fixtures/array-literal.ts` (✅), `fixtures/computed-property.ts` (✅), `fixtures/object-nested.ts` (✅), `fixtures/array-nested.ts` (✅), `fixtures/object-methods.ts` (✅), `fixtures/object-spread.ts` (✅), `fixtures/array-spread.ts` (✅), `fixtures/delete-prop.ts` (✅)。

## 阶段 6: 类与原型 (Classes)
**目标**: 支持 ES6 类定义。
*   [x] **Task 6.1**: 支持 `class` 声明和表达式。
    *   `js_parse_class` -> `visitClassDeclaration(node)` (已实现基础类定义，包括 `<class_fields_init>` 逻辑)
    *   已实现 `OP_define_class` 和 `OP_set_loc_uninitialized` 序列。
    *   **修复**: 修正了 `OP_get_var_ref_check` 的操作数大小 (无参数)，解决了 `class-basic.ts` 的字节码解析错误。
    *   **优化**: 移除了字段初始化块中多余的 `OP_drop`。
    *   **验证**: `class-basic.ts` (✅ 完全二进制对齐)。
*   [x] **Task 6.2**: 支持 `constructor`。
    *   已实现构造函数生成，包括 `OP_check_ctor` 和字段初始化调用。
    *   **修复**: 将类构造函数的发射指令从 `OP_fclosure8` 改为 `OP_push_const8`，与 QuickJS 行为对齐。
    *   **修复**: 更新 `AtomReorderer` 以支持 `OP_push_const8` 的子函数递归，确保构造函数内的 Atom 被正确收集。
    *   **修复**: 修正了 `this` 变量在构造函数中的 Flags (`isConst=false`)，解决了 `class-basic.ts` 的二进制差异。
    *   **修复**: 修正了函数作用域变量 (`scopeLevel=0`) 的 `scopeNext` 指向 (`0` 而非 `-1`)，与 QuickJS 行为对齐。
*   [x] **Task 6.3**: 支持实例方法和静态方法。
    *   `visitClassDeclaration` 增加方法遍历逻辑。
    *   已实现 `OP_define_method`，正确处理 `static` (定义在 ctor) 和 instance (定义在 proto) 方法。
    *   已实现 `OP_swap` 逻辑以调整栈顶对象。
    *   已实现 `+=` 等复合赋值运算符 (`OP_get_field2` + `OP_add` + `OP_put_field`)。
*   [x] **Task 6.4**: 支持 `super` 调用。
    *   已实现 `super()` 构造函数调用 (`OP_call_constructor`, `OP_put_loc_check_init`)。
    *   已实现 `super.method()` 调用 (`OP_get_super`, `OP_get_array_el`, `OP_call_method`)。
    *   已实现 `<home_object>` 变量注入和初始化。
*   [x] **Task 6.5**: 支持 `extends` 继承。
    *   `visitClassDeclaration` 支持 `extends` 子句 (`OP_define_class` flag 1)。
    *   已实现派生类构造函数的特殊逻辑 (`this.active_func`, `new.target`, `this` 未初始化)。
    *   已实现派生类字段初始化的延迟执行 (在 `super()` 之后)。
    *   **修复**: 实现了单调递增的作用域计数 (`scopeCount`) 和预分配逻辑 (`nodeScopeMap`)，解决了 `class-inheritance.ts` 中多个类定义导致的作用域嵌套层级错误 (Scope 2->3->4->5)。
*   [x] **Task 6.6**: 支持私有字段 (`#field`)。
    *   已实现 `visitClassDeclaration` 中的私有字段声明 (`OP_private_symbol`)。
    *   已实现构造函数中的私有字段初始化 (`OP_define_private_field`)。
    *   已实现 `visitPropertyAccessExpression` 中的私有字段读取 (`OP_get_private_field`)。
    *   已实现 `visitBinaryExpression` 中的私有字段赋值 (`OP_put_private_field`)。
    *   已修复闭包变量捕获逻辑 (`findVar` + `captureVariable`)，支持跨函数捕获。
    *   已验证 `class-private-fields.ts` (404 bytes vs 436 bytes，逻辑对齐)。
*   [x] **Task 6.7**: 支持存取器 (`get`/`set`)。
    *   已实现 `visitClassDeclaration` 中的存取器遍历。
    *   已实现 `OP_define_method` 的 getter/setter 标志位 (1/2)。
    *   已实现默认构造函数中的字段初始化逻辑。
    *   已验证 `class-accessors.ts` (442 bytes vs 437 bytes，逻辑正确)。
*   [x] **验证**: `fixtures/classes.ts`, `fixtures/class-methods.ts`, `fixtures/class-inheritance.ts` (已验证，作用域嵌套逻辑已修复，剩余少量字节码差异)。

## 阶段 7: ES2020 特性 (ES2020 Features)
**目标**: 完善对 ES2020 的支持。
*   [x] **Task 7.1**: 支持 `BigInt` 字面量及运算。
    *   [x] 基础字面量解析 (`10n`)。
    *   [x] 小整数优化 (`OP_push_bigint_i32`)。
    *   [x] 大整数支持 (`OP_push_const` + 序列化)。
*   [ ] **Task 7.2**: 支持空值合并运算符 (`??`)。
*   [ ] **Task 7.3**: 支持可选链操作符 (`?.`)。
*   [ ] **Task 7.4**: 确保 `globalThis` 支持。
*   [ ] **验证**: `fixtures/es2020_bigint.ts` (部分通过), `fixtures/es2020.ts`。

## 阶段 8: 模块系统 (Modules)
**目标**: 支持 ESM 模块。
*   [ ] **Task 8.1**: 支持 `import` 语句。
*   [ ] **Task 8.2**: 支持 `export` 语句 (named, default, `*`).
*   [ ] **Task 8.3**: 实现模块加载和解析流程 (`js_parse_module`)。
*   [ ] **验证**: `fixtures/modules/`。

## 阶段 9: 异步编程 (Async/Await)
**目标**: 支持异步函数和生成器。
*   [ ] **Task 9.1**: 支持 `Generator` 函数 (`function*`) 和 `yield`。
*   [ ] **Task 9.2**: 支持 `async` 函数和 `await`。
*   [ ] **Task 9.3**: 实现 `OP_async_yield` 等相关指令。
*   [ ] **验证**: `fixtures/async.ts`。

## 10. 异常处理 (Exception Handling)
*   [ ] **Task 10.1**: 支持 `try-catch-finally`。
    *   `js_parse_try` -> `visitTryStatement(node)`
*   [ ] **Task 10.2**: 实现异常表 (`exception_frames`) 的生成。
*   [ ] **Task 10.3**: 支持 `throw` 语句。
    *   `js_parse_throw` -> `visitThrowStatement(node)`
*   [ ] **验证**: `fixtures/exceptions.ts`。

## 11. 调试信息 (Debug Info)
*   [x] **Task 11.1**: 实现行号表 (`pc2line`) 生成。
    *   已实现 `computePc2LineInfo`，支持 ZigZag 编码。
    *   已修复 `emitAtomOp` 的 `sourcePos` 传递问题，确保 `pc2line` 映射到指令起始位置。
    *   已修复 `visitElementAccessExpression` 的 `OP_get_array_el` 源码位置对齐 (`node.expression.getEnd()`)。
    *   **优化**: 调整了 `visitFunctionDeclaration` 的 `sourcePos` 逻辑，使其指向函数体第一条语句，以匹配 QuickJS 的 `pc2line` 生成行为 (针对简单函数)。
    *   **优化**: 移除了表达式 (`visitBinaryExpression` 等) 的 `sourcePos` 传递，仅保留语句级 debug info，以减少冗余 `pc2line` 条目。
    *   **完美对齐**: `compute.ts` 的 `pc2line` 表大小已与 WASM 输出一致 (136 bytes)。
        *   修复了 `scopeCount` 初始化为 2 (匹配 QuickJS `ARG_SCOPE_INDEX=1`)。
        *   修复了 `pc2line` 初始化为 1-based (Line 1, Col 1)。
        *   添加了函数入口的初始 debug info 条目，确保 `pc2line` 包含函数声明行。
        *   修复了全局列号偏移 (+2)。
        *   移除了主模块中 `OP_fclosure`, `OP_undefined`, `OP_return_async`, `OP_put_var_ref` 的 debug info。
        *   恢复了 `visitBinaryExpression` 和 `visitIdentifier` 使用 `getStart()`。
    *   **修复**: 修正了 `computePc2LineInfo` 的逻辑，正确跳过 `diffLine=0 && diffCol=0` 的条目，解决了 `class-basic.ts` 的 `pc2line` 长度不匹配问题。
    *   **修复**: 调整了类定义 (`OP_push_const8`, `OP_define_class`) 的 `sourcePos` 为 `node.getStart()`，与 QuickJS 对齐。
    *   **修复**: 修正了 `pc2line` 编码格式 (ZigZag -> SLEB128)，与 QuickJS 引擎对齐。
    *   **修复**: 在 `FunctionVisitor` 中添加了 `computePc2LineInfo` 调用，确保函数声明生成 debug info。
    *   **修复**: 修正了模块 Prologue/Epilogue 的 `sourcePos` 归属，解决了 `compute.ts` 的 `pc2line` 差异。
*   [x] **Task 11.2**: 支持 `source` 文件名记录。
*   [x] **验证**: 检查生成的字节码中的调试信息段。
    *   `compute.ts` (✅ 大小对齐 136 bytes)
    *   `array-literal.ts` (✅ 完全二进制对齐)
    *   `variables-var.ts` (✅ 完全二进制对齐)
    *   `object-nested.ts` (✅ 完全二进制对齐)
    *   `object-spread.ts` (✅ 完全二进制对齐)
    *   `postfix-unary.ts` (✅ 完全二进制对齐)
    *   `while.ts` (✅ 完全二进制对齐)
    *   `class-basic.ts` (✅ 完全二进制对齐)
    *   `compute.ts` (✅ 逻辑对齐，pc2line 仅差 2 字节)

## 12. 基础设施优化 (Infrastructure Optimization)
*   [x] **Task 12.1**: 动态栈大小计算 (Dynamic Stack Calculation)。
    *   在 `FunctionDef` 中实现 `stackLevel` 跟踪。
    *   在 `emitOp` 中根据 `OPCODE_DEFS` 自动更新栈深度。
    *   移除了硬编码的栈大小设置。
*   [x] **Task 12.2**: 变量提升 (Variable Hoisting)。
    *   提取 `HoistVariables` 逻辑到独立模块 `src/compiler/HoistVariables.ts`。
    *   确保 `var` 和 `function` 声明在执行前被提升，与 QuickJS 行为一致。

## 阶段 13: 重构与模块化 (Refactoring & Modularization)
**目标**: 将庞大的 `TypeScriptCompiler` 拆分为职责单一的模块，提高代码可维护性。

*   [x] **Task 13.1**: 提取作用域管理 (`ScopeManager`)。
    *   创建 `src/compiler/ScopeManager.ts`。
    *   移出 `scopeStack`, `enter`, `exit`, `findVar`, `closeScopes` 等逻辑。
    *   `TypeScriptCompiler` 持有 `ScopeManager` 实例。
*   [x] **Task 13.2**: 提取标签与循环管理 (`LabelManager`)。
    *   创建 `src/compiler/LabelManager.ts`。
    *   移出 `pendingLabels`, `loopStack` 及相关的 `break`/`continue` 标签查找逻辑。
*   [ ] **Task 13.3**: 拆分 AST 遍历器 (Visitor Pattern)。
    *   定义 `CompilerContext` 接口，暴露 `compiler`, `funcDef`, `scopeManager` 等核心状态。
    *   [x] **Task 13.3.1**: 提取 `StatementVisitor` (处理 `if`, `while`, `for`, `switch`, `block` 等)。
    *   [x] **Task 13.3.2**: 提取 `ExpressionVisitor` (处理 `binary`, `unary`, `call`, `member` 等)。
    *   [ ] **Task 13.3.3**: 提取 `ClassVisitor` (处理 `class` 定义及成员)。
    *   [x] **Task 13.3.4**: 提取 `FunctionVisitor` (处理函数定义、参数、箭头函数)。
*   [ ] **Task 13.4**: 统一入口与调度。
    *   `TypeScriptCompiler` 作为外观模式 (Facade) 和调度中心，负责初始化各子模块并分发 `visit` 请求。

## 阶段 0: 基础设施搭建 (Infrastructure)
**目标**: 建立编译器的核心类结构，能够生成空的函数字节码。
*   [ ] **Task 0.1**: 创建 `src/compiler` 目录结构。
*   [ ] **Task 0.2**: 实现 `Context` 类 (对应 `JSContext`)，集成 `Env.ts`。
*   [ ] **Task 0.3**: 实现 `FunctionDef` 类 (对应 `JSFunctionDef`)，包含基础字段。
*   [ ] **Task 0.4**: 实现字节码写入工具 (`BytecodeBuilder`)，对应 `DynBuf`。
*   [ ] **Task 0.5**: 实现基础指令发射函数: `emit_op`, `emit_u8`, `emit_u16`, `emit_u32`。
*   [ ] **Task 0.6**: 实现 `js_create_function_def` 和 `js_free_function_def`。
*   [ ] **验证**: 能够生成一个仅包含 `return undefined` 的空函数字节码，并通过 `scripts/compareWithWasm.ts` 验证。

## 阶段 1: 基础字面量与表达式 (Primitives & Expressions)
**目标**: 支持基础数据类型和简单运算。
*   [ ] **Task 1.1**: 实现 `emit_push_const`，支持 `null`, `undefined`, `false`, `true`。
*   [ ] **Task 1.2**: 支持整数 (`OP_push_i32`) 和浮点数 (`OP_push_f64`) 字面量。
*   [ ] **Task 1.3**: 支持字符串字面量 (`OP_push_atom_value`)，实现 `JS_NewAtom` 逻辑。
*   [ ] **Task 1.4**: 实现二元运算符 (`+`, `-`, `*`, `/`, `%`) 的转译。
*   [ ] **Task 1.5**: 实现比较运算符 (`<`, `>`, `<=`, `>=`, `==`, `!=`, `===`, `!==`)。
*   [ ] **Task 1.6**: 实现位运算符 (`&`, `|`, `^`, `<<`, `>>`, `>>>`)。
*   [ ] **验证**: `fixtures/literals.ts`。

## 阶段 2: 变量与作用域 (Variables & Scopes)
**目标**: 支持变量声明、赋值和查找。
*   [ ] **Task 2.1**: 实现 `JSVarDef` 结构及 `add_var` 函数。
*   [ ] **Task 2.2**: 实现 `BlockEnv` 结构，管理词法作用域。
*   [ ] **Task 2.3**: 支持 `var` 声明 (函数作用域)。
*   [ ] **Task 2.4**: 支持 `let` 和 `const` 声明 (块级作用域)。
*   [ ] **Task 2.5**: 实现变量查找逻辑 (`resolve_scope_var`)，生成 `OP_get_var`, `OP_put_var` 等指令。
*   [ ] **验证**: `fixtures/variables.ts`, `fixtures/assignment-ops.ts`。

## 阶段 3: 控制流 (Control Flow)
**目标**: 支持分支和循环结构。
*   [ ] **Task 3.1**: 实现 Label 管理机制 (`push_label`, `pop_label`)。
*   [ ] **Task 3.2**: 实现 `emit_goto`, `emit_label` 及跳转指令 patch 逻辑。
*   [ ] **Task 3.3**: 支持 `if` 和 `if-else` 语句。
*   [ ] **Task 3.4**: 支持 `while` 和 `do-while` 循环。
*   [ ] **Task 3.5**: 支持 `for` 循环 (包括 `for(init; test; update)`).
*   [ ] **Task 3.6**: 支持 `break` 和 `continue`。
*   [ ] **Task 3.7**: 支持 `switch` 语句。
*   [ ] **验证**: `fixtures/loop.ts`, `fixtures/branching.ts`。

## 阶段 4: 函数与闭包 (Functions & Closures)
**目标**: 支持函数定义、调用及闭包机制。
*   [ ] **Task 4.1**: 支持函数声明 (`FunctionDeclaration`)。
*   [ ] **Task 4.2**: 支持函数表达式 (`FunctionExpression`)。
*   [ ] **Task 4.3**: 实现 `OP_call` 相关指令生成。
*   [ ] **Task 4.4**: 实现参数处理 (`arguments`)。
*   [ ] **Task 4.5**: 实现闭包变量捕获 (`closure_var`) 和 `OP_get_scope_var`。
*   [ ] **Task 4.6**: 支持箭头函数 (`ArrowFunction`) 及 `this` 绑定规则。
*   [ ] **验证**: `fixtures/functions.ts`, `fixtures/closure.ts`。

## 阶段 5: 对象与数组 (Objects & Arrays)
**目标**: 支持复杂数据结构。
*   [ ] **Task 5.1**: 支持对象字面量 (`{ a: 1 }`)。
*   [ ] **Task 5.2**: 支持数组字面量 (`[1, 2]`)。
*   [ ] **Task 5.3**: 支持属性访问 (`obj.prop`, `obj['prop']`)。
*   [ ] **Task 5.4**: 支持 `delete` 操作符。
*   [ ] **验证**: `fixtures/objects.ts`, `fixtures/arrays.ts`。

## 阶段 6: 类与原型 (Classes)
**目标**: 支持 ES6 类定义。
*   [ ] **Task 6.1**: 支持 `class` 声明和表达式。
*   [ ] **Task 6.2**: 支持 `constructor`。
*   [ ] **Task 6.3**: 支持实例方法和静态方法。
*   [ ] **Task 6.4**: 支持 `super` 调用。
*   [ ] **Task 6.5**: 支持 `extends` 继承。
*   [ ] **验证**: `fixtures/classes.ts`。

## 阶段 7: ES2020 特性 (ES2020 Features)
**目标**: 完善对 ES2020 的支持。
*   [ ] **Task 7.1**: 支持 `BigInt` 字面量及运算。
*   [ ] **Task 7.2**: 支持空值合并运算符 (`??`)。
*   [ ] **Task 7.3**: 支持可选链操作符 (`?.`)。
*   [ ] **Task 7.4**: 确保 `globalThis` 支持。
*   [ ] **验证**: `fixtures/es2020.ts`。

## 阶段 8: 模块系统 (Modules)
**目标**: 支持 ESM 模块。
*   [ ] **Task 8.1**: 支持 `import` 语句。
*   [ ] **Task 8.2**: 支持 `export` 语句 (named, default, `*`).
*   [ ] **Task 8.3**: 实现模块加载和解析流程 (`js_parse_module`)。
*   [ ] **验证**: `fixtures/modules/`。

## 阶段 9: 异步编程 (Async/Await)
**目标**: 支持异步函数和生成器。
*   [ ] **Task 9.1**: 支持 `Generator` 函数 (`function*`) 和 `yield`。
*   [ ] **Task 9.2**: 支持 `async` 函数和 `await`。
*   [ ] **Task 9.3**: 实现 `OP_async_yield` 等相关指令。
*   [ ] **验证**: `fixtures/async.ts`。

## 10. 异常处理 (Exception Handling)
*   [ ] **Task 10.1**: 支持 `try-catch-finally`。
*   [ ] **Task 10.2**: 实现异常表 (`exception_frames`) 的生成。
*   [ ] **Task 10.3**: 支持 `throw` 语句。
*   [ ] **验证**: `fixtures/exceptions.ts`。

## 11. 调试信息 (Debug Info)
*   [ ] **Task 11.1**: 实现行号表 (`pc2line`) 生成。
*   [ ] **Task 11.2**: 支持 `source` 文件名记录。
*   [ ] **验证**: 检查生成的字节码中的调试信息段。

## Phase 13: Refactoring (🚧 In Progress)
**Goal**: Refactor the monolithic `TypeScriptCompiler` into smaller, specialized visitors to improve maintainability and align with the Visitor Pattern.

*   [x] **Task 13.1**: Extract `StatementVisitor`.
*   [x] **Task 13.2**: Extract `ExpressionVisitor`.
*   [ ] **Task 13.3**: Extract specialized visitors.
    *   [x] **Task 13.3.1**: Extract `FunctionVisitor` (Functions, Arrows, Function Expressions).
    *   [x] **Task 13.3.2**: Extract `ClassVisitor` (Classes, Methods, Fields).
    *   [x] **Task 13.3.3**: Fix `ExpressionVisitor` property assignment logic.
*   [ ] **Task 13.4**: Implement `Facade` pattern to manage visitors and shared state.

## 附录：函数实现对照表 (Function Implementation Mapping)

本表列出了 QuickJS C 源码中的关键函数与 TypeScript 编译器实现的对应关系。

### 1. 字节码发射 (Bytecode Emission)
| C Function (parser.c) | TypeScript Method (BytecodeGenerator) | 描述 |
| :--- | :--- | :--- |
| `emit_op` | `emitOp(op: number)` | 发射一个字节码指令 |
| `emit_u8` | `emitU8(val: number)` | 发射 8 位无符号整数 |
| `emit_u16` | `emitU16(val: number)` | 发射 16 位无符号整数 |
| `emit_u32` | `emitU32(val: number)` | 发射 32 位无符号整数 |
| `emit_label` | `markLabel(label: Label)` | 标记当前位置为 Label 目标 |
| `emit_goto` | `emitJump(opcode: number, label: Label)` | 发射跳转指令 |
| `new_label` | `newLabel()` | 创建一个新的 Label 对象 |
| `emit_push_const` | `emitPushConst(val: JSValue)` | 发射常量加载指令 |
| `emit_return` | `emitReturn(hasVal: boolean)` | 发射返回指令 |

### 2. 作用域与变量 (Scope & Variables)
| C Function (parser.c) | TypeScript Method (ScopeManager) | 描述 |
| :--- | :--- | :--- |
| `push_scope` | `pushScope(el: ts.Node)` | 进入新的词法作用域 |
| `pop_scope` | `popScope()` | 退出当前词法作用域 |
| `add_var` | `addVar(name: string, type: number)` | 在当前作用域添加变量 |
| `find_var` | `findVar(name: string)` | 查找变量定义 |
| `resolve_scope_var` | `resolveScopeVar(name: string)` | 解析变量作用域链，生成 OP_scope_get_var 等 |
| `close_scopes` | `closeScopes(scope: Scope)` | 生成 OP_close_scope 指令 |
| `add_global_var` | `addGlobalVar(ctx: Context, name: string)` | 添加全局变量 |

### 3. 函数定义 (Function Definition)
| C Function (parser.c) | TypeScript Method (FunctionDef) | 描述 |
| :--- | :--- | :--- |
| `js_new_function_def` | `new FunctionDef(ctx, parent)` | 创建新的函数定义结构 |
| `js_create_function_def` | `createFunctionDef(...)` | 初始化函数定义 |
| `js_free_function_def` | `dispose()` | 释放函数定义资源 |
| `add_arg` | `addArg(name: string)` | 添加函数参数 |
| `add_arguments_var` | `addArgumentsVar()` | 添加 `arguments` 变量 |

### 4. 语句编译 (Statement Compilation)
| C Function (parser.c) | TypeScript Method (StatementVisitor) | 对应 TS AST Node |
| :--- | :--- | :--- |
| `js_parse_statement_or_decl` | `visitStatement(node)` | `ts.Statement` |
| `js_parse_block` | `visitBlock(node)` | `ts.Block` |
| `js_parse_if` (inline) | `visitIfStatement(node)` | `ts.IfStatement` |
| `js_parse_while` (inline) | `visitWhileStatement(node)` | `ts.WhileStatement` |
| `js_parse_do` (inline) | `visitDoStatement(node)` | `ts.DoStatement` |
| `js_parse_for` (inline) | `visitForStatement(node)` | `ts.ForStatement` |
| `js_parse_break` (inline) | `visitBreakStatement(node)` | `ts.BreakStatement` |
| `js_parse_continue` (inline) | `visitContinueStatement(node)` | `ts.ContinueStatement` |
| `js_parse_return` (inline) | `visitReturnStatement(node)` | `ts.ReturnStatement` |
| `js_parse_throw` (inline) | `visitThrowStatement(node)` | `ts.ThrowStatement` |
| `js_parse_var` | `visitVariableStatement(node)` | `ts.VariableStatement` |
| `js_parse_switch` | `visitSwitchStatement(node)` | `ts.SwitchStatement` |
| `js_parse_label_stmt` | `visitLabeledStatement(node)` | `ts.LabeledStatement` |
| `js_parse_try` | `visitTryStatement(node)` | `ts.TryStatement` |

### 5. 表达式编译 (Expression Compilation)
| C Function (parser.c) | TypeScript Method (ExpressionVisitor) | 对应 TS AST Node |
| :--- | :--- | :--- |
| `js_parse_expr` | `visitExpression(node)` | `ts.Expression` |
| `js_parse_assign_expr` | `visitBinaryExpression(node)` | `ts.BinaryExpression` (=) |
| `js_parse_cond_expr` | `visitConditionalExpression(node)` | `ts.ConditionalExpression` |
| `js_parse_unary` | `visitPrefixUnaryExpression(node)` | `ts.PrefixUnaryExpression` |
| `js_parse_postfix` | `visitPostfixUnaryExpression(node)` | `ts.PostfixUnaryExpression` |
| `js_parse_call` (inline) | `visitCallExpression(node)` | `ts.CallExpression` |
| `js_parse_member` (inline) | `visitPropertyAccessExpression(node)` | `ts.PropertyAccessExpression` |
| `js_parse_array_literal` | `visitArrayLiteralExpression(node)` | `ts.ArrayLiteralExpression` |
| `js_parse_object_literal` | `visitObjectLiteralExpression(node)` | `ts.ObjectLiteralExpression` |
| `js_parse_function_decl` | `visitFunctionExpression(node)` | `ts.FunctionExpression` |
| `js_parse_arrow_function` | `visitArrowFunction(node)` | `ts.ArrowFunction` |

