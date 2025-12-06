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
    *   `push_scope` -> `pushScope(el: ts.Node)` (实现为 `enterScope`/`exitScope` 和 `scopeStack`)
    *   `pop_scope` -> `popScope()`
    *   `close_scopes` -> `closeScopes(scope: Scope)`
*   [x] **Task 2.3**: 支持 `var` 声明 (函数作用域)。
    *   `js_parse_var` -> `visitVariableStatement(node)` (已实现模块级 `var`，使用 `OP_put_var_ref0` 等)
*   [x] **Task 2.4**: 支持 `let` 和 `const` 声明 (块级作用域)。
    *   已实现模块级 `let`/`const`，使用 `OP_put_var_ref0` 初始化，`OP_get_var_ref_check` 读取。
    *   已实现块级 `let`/`const`，使用 `OP_set_loc_uninitialized` 初始化，`OP_get_loc` 读取。
    *   注意：`var_ref` 指令 (fmt 18) 需要 `emitU16` 索引。
*   [x] **Task 2.5**: 实现变量查找逻辑 (`resolve_scope_var`)，生成 `OP_get_var`, `OP_put_var` 等指令。
    *   `resolve_scope_var` -> `resolveScopeVar(name: string)` (实现为 `findVarInScope`，区分 `closure` 和 `local`)
*   [x] **Task 2.6**: 实现 Debug Info (`pc2line`)。
    *   `compute_pc2line_info` -> `computePc2LineInfo(fd: FunctionDef)` (已实现，支持 ZigZag 编码)
*   [ ] **验证**: `fixtures/variables.ts`, `fixtures/assignment-ops.ts`, `fixtures/debug-info-basic.ts` (✅)。

## 阶段 3: 控制流 (Control Flow)
**目标**: 支持分支和循环结构。
*   [ ] **Task 3.1**: 实现 Label 管理机制 (`push_label`, `pop_label`)。
    *   `new_label` -> `newLabel()`
*   [x] **Task 3.2**: 实现 `emit_goto`, `emit_label` 及跳转指令 patch 逻辑。
    *   已实现 `OP_goto8` 和 `OP_if_false8` 的短跳转逻辑，支持 8 位有符号偏移。
    *   已实现 `putU32At` 等辅助函数用于回填跳转目标。
*   [x] **Task 3.3**: 支持 `if` 和 `if-else` 语句。
    *   `js_parse_if` -> `visitIfStatement(node)` (已实现 **完全二进制对齐**)
    *   实现了 `OP_dup` 用于赋值表达式返回值处理。
*   [x] **Task 3.4**: 支持 `while` 和 `do-while` 循环。
    *   `js_parse_while` -> `visitWhileStatement(node)` (已实现 **完全二进制对齐**)
    *   `js_parse_do` -> `visitDoStatement(node)` (已实现 **完全二进制对齐**)
*   [x] **Task 3.5**: 支持 `for` 循环 (包括 `for(init; test; update)`).
    *   `js_parse_for` -> `visitForStatement(node)` (已实现 **完全二进制对齐**)
*   [x] **Task 3.6**: 支持 `break` 和 `continue`。
    *   `js_parse_break` -> `visitBreakStatement(node)` (已实现 **完全二进制对齐**)
    *   `js_parse_continue` -> `visitContinueStatement(node)` (已实现 **完全二进制对齐**)
    *   实现了 `if_true8` 优化。
*   [ ] **Task 3.7**: 支持 `switch` 语句。
    *   `js_parse_switch` -> `visitSwitchStatement(node)`
*   [ ] **Task 3.8**: 语句遍历基础。
    *   `js_parse_statement_or_decl` -> `visitStatement(node)`
    *   `js_parse_block` -> `visitBlock(node)`
    *   `emit_return` -> `emitReturn(hasVal: boolean)`
    *   `js_parse_return` -> `visitReturnStatement(node)`
*   [x] **验证**: `fixtures/if-else.ts` (✅), `fixtures/while.ts` (✅), `fixtures/do-while.ts` (✅), `fixtures/loop.ts`, `fixtures/branching.ts`。

## 阶段 4: 函数与闭包 (Functions & Closures)
**目标**: 支持函数定义、调用及闭包机制。
*   [x] **Task 4.1**: 支持函数声明 (`FunctionDeclaration`)。
    *   `js_parse_function_decl` -> `visitFunctionDeclaration(node)` (已实现基础支持，包括 `fclosure` 和 `put_var_ref`)
    *   已解决 `compute.ts` 中的栈大小和跳转偏移问题。
    *   已实现 `hoistVariables`，正确处理模块级函数声明作为闭包变量。
*   [ ] **Task 4.2**: 支持函数表达式 (`FunctionExpression`)。
*   [x] **Task 4.3**: 实现 `OP_call` 相关指令生成。
    *   `js_parse_call` -> `visitCallExpression(node)` (已实现 `OP_call0`...`OP_call3` 优化)
*   [ ] **Task 4.4**: 实现参数处理 (`arguments`)。
    *   `add_arg` -> `addArg(name: string)`
    *   `add_arguments_var` -> `addArgumentsVar()`
*   [ ] **Task 4.5**: 实现闭包变量捕获 (`closure_var`) 和 `OP_get_scope_var`。
*   [ ] **Task 4.6**: 支持箭头函数 (`ArrowFunction`) 及 `this` 绑定规则。
    *   `js_parse_arrow_function` -> `visitArrowFunction(node)`
*   [x] **验证**: `fixtures/compute.ts` (✅), `fixtures/function-call.ts` (逻辑正确，字节码大小接近), `fixtures/closure.ts`。

## 阶段 5: 对象与数组 (Objects & Arrays)
**目标**: 支持复杂数据结构。
*   [x] **Task 5.1**: 支持对象字面量 (`{ a: 1 }`)。
    *   `js_parse_object_literal` -> `visitObjectLiteralExpression(node)` (已实现 **完全二进制对齐**)
*   [x] **Task 5.2**: 支持数组字面量 (`[1, 2]`)。
    *   `js_parse_array_literal` -> `visitArrayLiteralExpression(node)` (已实现 **完全二进制对齐**)
*   [x] **Task 5.3**: 支持属性访问 (`obj.prop`, `obj['prop']`)。
    *   `js_parse_member` -> `visitPropertyAccessExpression(node)` (已实现 **完全二进制对齐**)
    *   `visitElementAccessExpression` (已实现 **完全二进制对齐**)
*   [ ] **Task 5.4**: 支持 `delete` 操作符。
*   [x] **验证**: `fixtures/object-literal.ts` (✅), `fixtures/array-literal.ts` (✅), `fixtures/computed-property.ts` (✅)。

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
    *   `js_parse_try` -> `visitTryStatement(node)`
*   [ ] **Task 10.2**: 实现异常表 (`exception_frames`) 的生成。
*   [ ] **Task 10.3**: 支持 `throw` 语句。
    *   `js_parse_throw` -> `visitThrowStatement(node)`
*   [ ] **验证**: `fixtures/exceptions.ts`。

## 11. 调试信息 (Debug Info)
*   [x] **Task 11.1**: 实现行号表 (`pc2line`) 生成。
    *   已实现 `computePc2LineInfo`，支持 ZigZag 编码。
*   [x] **Task 11.2**: 支持 `source` 文件名记录。
*   [x] **验证**: 检查生成的字节码中的调试信息段。

## 12. 基础设施优化 (Infrastructure Optimization)
*   [x] **Task 12.1**: 动态栈大小计算 (Dynamic Stack Calculation)。
    *   在 `FunctionDef` 中实现 `stackLevel` 跟踪。
    *   在 `emitOp` 中根据 `OPCODE_DEFS` 自动更新栈深度。
    *   移除了硬编码的栈大小设置。


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

## 附录：函数实现对照表 (Function Implementation Mapping)

本表列出了 QuickJS C 源码中的关键函数与 TypeScript 编译器实现的对应关系。

### 1. 字节码发射 (Bytecode Emission)
| C Function (parser.c) | TypeScript Method (BytecodeGenerator) | 描述 |
| :--- | :--- | :--- |
| `emit_op` | `emitOp(op: number)` | 发射一个字节码指令 |
| `emit_u8` | `emitU8(val: number)` | 发射 8 位无符号整数 |
| `emit_u16` | `emitU16(val: number)` | 发射 16 位无符号整数 |
| `emit_u32` | `emitU32(val: number)` | 发射 32 位无符号整数 |
| `emit_label` | `emitLabel(label: number)` | 标记当前位置为 Label 目标 |
| `emit_goto` | `emitGoto(opcode: number, label: number)` | 发射跳转指令 |
| `new_label` | `newLabel()` | 分配一个新的 Label ID |
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

