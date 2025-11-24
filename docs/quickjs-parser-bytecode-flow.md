# QuickJS TypeScript Compiler 技术方案

## 1. 项目目标
构建一个纯 TypeScript 实现的编译器，能够将 TypeScript/JavaScript 源码编译为 QuickJS 字节码 (`.qbc` / `.c` 数组)。
**核心约束**：不重新实现词法分析（Lexer）和语法分析（Parser），直接利用 TypeScript Compiler API (`ts.createSourceFile`) 生成的 AST 作为输入。

## 2. 整体架构设计

编译器采用经典的三层架构，针对 QuickJS 的栈式虚拟机特性进行适配。

```mermaid
graph TD
    A[Source Code] -->|TS Parser| B[TypeScript AST]
    B --> C[Compiler Context]
    subgraph "Frontend (Analysis)"
        C --> D[Scope Analysis]
        D --> E[Variable Hoisting & Resolution]
        E --> F[Closure Capture Analysis]
    end
    subgraph "Backend (CodeGen)"
        F --> G[AST Visitor / Transformer]
        G --> H[Opcode Emission]
        H --> I[Bytecode Optimization (Optional)]
    end
    I --> J[Binary Writer]
    J --> K[QuickJS Bytecode (.qbc)]
```

## 3. 核心模块设计

### 3.1. CompilerContext (编译上下文)
对应 QuickJS 中的 `JSContext` 和 `JSCompileState`。
*   **职责**：
    *   管理全局 Atom 表 (`AtomTable`)。
    *   维护当前编译状态（当前正在编译的函数栈）。
    *   提供错误处理和选项配置。

### 3.2. FunctionDef (函数定义)
对应 QuickJS C 源码中的 `JSFunctionDef` 结构体。这是编译的基本单元。
*   **数据结构**：
    *   `byte_code`: `FunctionBytecode` (指令流)。
    *   `constants`: `ConstantTable` (常量池：字符串、数字、对象字面量)。
    *   `vars`: `VarDef[]` (局部变量定义，包含参数)。
    *   `child_functions`: `FunctionDef[]` (嵌套函数)。
    *   `closure_vars`: `ClosureVar[]` (闭包捕获的变量)。
    *   `stack_size`: 最大栈深度计算。
*   **关键逻辑**：
    *   每个函数（包括顶层 Global 代码）都是一个 `FunctionDef`。
    *   编译时维护一个 `FunctionDef` 栈，栈顶为当前编译函数。

### 3.3. ScopeManager (作用域管理)
QuickJS 对变量的处理非常依赖作用域（Global, Local, Arg, Upvalue）。
*   **Scope Tree**：构建与 AST 结构对应的作用域树。
*   **Variable Resolution**：
    *   **Local**: 栈帧偏移量。
    *   **Global**: Atom 查找 (`OP_get_var` / `OP_put_var`)。
    *   **Closure**: 需要标记变量被捕获，并在子函数中生成 `OP_get_scope_var` 等指令。
*   **Hoisting**：模拟 JS 的提升行为，在进入作用域前预先定义 `var` 和 `function`。

## 4. 编译流程详解

采用 **双遍扫描 (Two-Pass)** 策略，这对于处理闭包和变量提升至关重要。

### Phase 1: 静态分析 (Analysis Pass)
遍历 AST，但不生成字节码。
1.  **建立作用域**：为 Block, Function, Catch Clause 创建 Scope。
2.  **变量声明收集**：
    *   收集 `var`, `let`, `const`, `function`, `class` 声明。
    *   处理变量提升（Hoisting）：将 `var` 提升到函数作用域顶部。
3.  **引用解析**：
    *   解析标识符引用。
    *   确定变量的存储位置（栈、上下文/闭包、全局）。
    *   **关键点**：如果一个局部变量被内部函数引用，必须将其标记为 `is_captured`，QuickJS 运行时会将其移入堆中的 Context。

### Phase 2: 代码生成 (Codegen Pass)
再次遍历 AST，生成字节码。
1.  **Expression Visitor**：
    *   将表达式转换为栈操作。
    *   例如 `a + b` -> `get_loc a`, `get_loc b`, `add`。
2.  **Statement Visitor**：
    *   处理控制流 (`if`, `for`, `while`)。
    *   **Label Management**：维护 `break`/`continue` 的跳转目标。QuickJS 使用字节偏移量跳转，生成时先用占位符，块结束时回填（Backpatching）。
3.  **Function Creation**：
    *   遇到函数声明时，递归调用编译过程生成子 `FunctionDef`。
    *   在父函数中生成 `OP_fclosure` 指令，实例化闭包。

## 5. 关键技术难点与映射

| TypeScript AST | QuickJS Concept | 处理方案 |
| :--- | :--- | :--- |
| `Identifier` | `Atom` | 维护全局 `AtomTable`，将字符串映射为整数 ID。 |
| `Literal` (String/Num) | `Constant Pool` | 存入当前 `FunctionDef` 的常量池，生成 `OP_push_const`。 |
| `if` / `loop` | `Jumps` | 使用 `Label` 类管理跳转偏移量。支持前向跳转的回填。 |
| `try` / `catch` | `Exception Handling` | 维护 `try_stack`。生成 `OP_push_catch` 和 `OP_pop_catch`。 |
| `Closure` | `Upvalues` | 分析阶段确定捕获列表。子函数记录 `parent_scope_idx`。 |
| `this` | `OP_this` | 特殊变量处理。 |

## 6. 字节码序列化 (Binary Writer)
最后一步是将内存中的 `FunctionDef` 树序列化为二进制格式。
*   **Header**: Magic Number, Version.
*   **Atoms**: 序列化所有用到的 Atom 字符串。
*   **Object**: 递归序列化顶层函数及其子函数。
    *   指令流编码（变长整数编码）。
    *   调试信息（行号映射 `pc2line`）。

## 7. 开发路线图 (Roadmap)

1.  **基础架构 (Infrastructure)**
    *   [x] Atom 管理 (`atoms.ts`)
    *   [x] 字节码定义 (`opcodes.ts`)
    *   [x] 二进制写入器 (`bytecodeWriter.ts`)
2.  **最小运行时 (Minimal Runtime)**
    *   [ ] 编译空程序。
    *   [ ] 编译简单字面量和返回语句。
3.  **控制流与变量 (Control Flow & Vars)**
    *   [ ] 实现 `ScopeManager`。
    *   [ ] 支持 `var`/`let` 和基本算术运算。
    *   [ ] 支持 `if`/`while` 跳转逻辑。
4.  **函数与闭包 (Functions)**
    *   [ ] 递归编译函数。
    *   [ ] 实现闭包变量捕获分析。
5.  **高级特性 (Advanced)**
    *   [ ] 异常处理 (`try-catch`)。
    *   [ ] ES6 Module 支持。
    *   [ ] 类 (`class`) 支持。
