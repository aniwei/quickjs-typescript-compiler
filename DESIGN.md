# QuickJS TypeScript Compiler 技术设计方案

## 1. 项目目标
构建一个纯 TypeScript 实现的编译器，将 TypeScript/JavaScript 源码编译为 QuickJS 字节码。
**核心原则：** 本项目是对 `third_party/QuickJS` 中 C 语言实现（主要是 `src/core/parser.c`, `src/core/parser.h`, `src/core/bytecode.h` 等）的 **直接转译 (Porting)**，而非全新设计。
*   **代码结构**：类和数据结构应尽可能与 C 源码中的 `struct` 保持一致。
*   **逻辑流程**：编译流程、字节码生成逻辑、辅助函数应尽可能保留 C 源码的原貌，仅将输入源从“词法分析器(Lexer)”替换为“TypeScript AST”。

## 2. 核心类与数据结构映射

代码组织将采用 Class 形式，严格映射 C 语言中的核心结构体。

### 2.1. `Compiler` (对应 `JSParseState`)
在 C 源码中，`JSParseState` 保存了解析器的全局状态。在 TypeScript 实现中，`Compiler` 类将承担这一角色。

*   **职责**：管理编译上下文，持有 `JSContext` (模拟)，管理 `JSFunctionDef` 栈。
*   **关键成员**：
    *   `ctx`: `JSContext` (模拟上下文，用于管理 Atom 等)
    *   `cur_func`: `JSFunctionDef` (当前正在编译的函数)
    *   `source`: `ts.SourceFile` (TypeScript AST)
*   **关键方法** (对应 C 函数):
    *   `js_parse_program()` -> `compileProgram()`
    *   `js_parse_function()` -> `compileFunction()`
    *   `js_parse_statement()` -> `compileStatement()`
    *   `js_parse_expr()` -> `compileExpression()`

### 2.2. `JSFunctionDef` (对应 `struct JSFunctionDef`)
这是编译器中最核心的数据结构，保存了一个函数的编译期状态。

*   **成员变量** (需严格对齐 C 结构体):
    *   `parent`: `JSFunctionDef` (父函数)
    *   `byte_code`: `DynBuf` (字节码缓冲区)
    *   `locals`: `JSVarDef[]` (局部变量定义)
    *   `args`: `JSVarDef[]` (参数定义)
    *   `upvalues`: `JSUpVarDef[]` (闭包捕获变量)
    *   `consts`: `JSValue[]` (常量池)
    *   `label_slots`: `LabelSlot[]` (跳转标签)
    *   `stack_size`: `number` (最大栈深)
    *   `func_kind`: `JSFunctionKindEnum`
    *   `js_mode`: `number` (Strict mode 等标志位)
    *   ...以及其他标志位 (`is_eval`, `is_global_var` 等)

### 2.3. `JSVarDef` & `JSUpVarDef` (对应同名 C 结构体)
用于描述变量定义和闭包捕获。

*   `JSVarDef`: `{ atom: Atom, scope_level: number, scope_next: number, ... }`
*   `JSUpVarDef`: `{ atom: Atom, is_local: boolean, index: number, ... }`

### 2.4. `BytecodeWriter` (对应 `DynBuf` 及相关 emit 函数)
C 源码中使用 `DynBuf` 结构和 `dbuf_*` 函数族来写入字节码。TS 中可以使用 `BytecodeWriter` 类封装 `Uint8Array` 的操作。

*   **方法映射**:
    *   `emit_op(op)` -> `emitOp(op)`
    *   `emit_u8(val)` -> `emitU8(val)`
    *   `emit_u16(val)` -> `emitU16(val)`
    *   `emit_u32(val)` -> `emitU32(val)`
    *   `emit_goto()` / `emit_label()`: 跳转指令处理

## 3. 编译流程详解

编译过程本质上是遍历 TypeScript AST，并调用对应的 `emit_*` 函数生成字节码。逻辑应照搬 C 源码中的 `switch(token)` 分支处理逻辑。

### 3.1. 初始化
1.  创建 `Compiler` 实例。
2.  初始化全局 Atom 表 (参考 `JS_InitAtoms`)。
3.  创建顶层 `JSFunctionDef` (Global/Module)。

### 3.2. 表达式编译 (`compileExpression`)
对应 `js_parse_expr` 等函数。
*   **二元运算** (`BinaryExpression`):
    *   递归编译左子节点。
    *   递归编译右子节点。
    *   根据操作符 (`token`) 发射对应 Opcode (如 `OP_add`, `OP_mul`)。
*   **标识符** (`Identifier`):
    *   调用 `resolve_variables` (对应 C 中的变量解析逻辑)。
    *   根据解析结果 (Local, Global, Upvalue) 发射 `OP_get_loc`, `OP_get_var` 等。
*   **字面量**:
    *   发射 `OP_push_i32`, `OP_push_const` 等。

### 3.3. 语句编译 (`compileStatement`)
对应 `js_parse_statement`。
*   **IfStatement**:
    *   编译 Condition。
    *   `emit_goto(OP_if_false, else_label)`。
    *   编译 Then Block。
    *   `emit_goto(OP_goto, end_label)`。
    *   `emit_label(else_label)`。
    *   编译 Else Block。
    *   `emit_label(end_label)`。
*   **Block**:
    *   `push_scope()` (对应 `js_parse_block` 中的作用域处理)。
    *   遍历编译语句。
    *   `pop_scope()` (处理 `OP_leave_scope` 等)。

### 3.4. 函数定义
对应 `js_parse_function_decl`。
1.  `new JSFunctionDef()`，链接到 `parent`。
2.  处理参数列表，添加到 `args`。
3.  编译函数体。
4.  `close_function()`:
    *   计算 `stack_size`。
    *   解析 `upvalues`。
    *   生成 `OP_fclosure` 指令。

## 4. 关键逻辑移植指南

### 4.1. 变量解析 (`resolve_variables`)
这是最复杂的逻辑之一。C 源码中通过遍历 `fd->scopes` 和 `fd->parent` 来查找变量。
*   **TS 实现**: 必须完全复刻这一查找过程，包括 `scope_level` 的处理，以及何时将变量标记为 `is_lexical` 或捕获为 `upvalue`。

### 4.2. 栈平衡 (`stack_size`)
C 源码在 emit 指令时会更新 `fd->stack_level` 和 `fd->stack_size`。
*   **TS 实现**: 在 `emitOp` 中查表获取指令的栈增减量 (Stack Delta)，自动更新当前栈深，并记录最大值。

### 4.3. 标签与跳转 (`Label`)
C 源码使用 `LabelSlot` 结构体和 `emit_goto` / `emit_label` 函数。
*   **TS 实现**: 维护一个 `labels` 数组。`emit_goto` 写入占位符 (0)，记录 patch 位置。`emit_label` 确定目标位置后，回填所有引用该 Label 的跳转指令。

## 5. 开发路线图

1.  **基础结构 (Week 1)**:
    *   定义 `JSFunctionDef`, `JSVarDef`, `Compiler` 类。
    *   实现 `BytecodeWriter` 和基础 `emit` 函数。
    *   移植 `Atom` 管理逻辑。
2.  **基础编译 (Week 2)**:
    *   实现 `compileExpression` (基础运算, 字面量)。
    *   实现 `compileStatement` (Block, Return)。
3.  **控制流 (Week 3)**:
    *   移植 `Label` 机制。
    *   实现 `If`, `While`, `For`。
4.  **作用域与变量 (Week 4)**:
    *   实现 `resolve_variables`。
    *   支持 Local/Global 变量读写。
5.  **函数与闭包 (Week 5)**:
    *   实现 `compileFunction`。
    *   支持 Upvalue 捕获。

## 6. 现有文件对应关系
*   `src/compiler.ts`: `Compiler` 类 (对应 `JSParseState` 逻辑)。
*   `src/functionDef.ts`: `JSFunctionDef` 类。
*   `src/bytecode.ts`: `BytecodeWriter` 类。
*   `src/atom.ts`: Atom 管理。
*   `src/env.ts`: Opcode 定义 (已存在)。



通读 third_party/QuickJS 源码，给 third_party/QuickJS 源码 核心实现函数增加更多调试日志编译为 wasm 追踪问题，专注完全消除 compute.ts 中最后的字节码差异。