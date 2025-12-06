# QuickJS 字节码编译器转译技术方案

## 1. 项目目标
将 QuickJS 的 C 语言字节码编译器（主要位于 `parser.c`, `quickjs.c` 等）转译为 TypeScript 实现。
目标是生成与 QuickJS 原生编译器完全兼容的字节码，能够在 QuickJS 运行时中执行。

## 2. 核心原则
1.  **代码组织**：采用类（Class）进行组织，参照现有的 TypeScript 代码风格。
2.  **命名规范**：使用驼峰命名法（CamelCase），保持与现有代码一致。
3.  **数据结构**：编译器模块字段必须 **1:1** 对应 `third_party/QuickJS` 源码中的定义（如 `JSFunctionDef`, `JSParseState` 等结构体），不得缺失字段。
4.  **逻辑转译**：编译器流程逻辑 **100% 1:1** 转译自 QuickJS 源码。
    *   **例外**：AST 解析部分不转译，直接使用 TypeScript Compiler API 生成的 AST。
    *   这意味着我们将跳过 QuickJS 的 `token` 解析和 `parser` 递归下降部分，直接在 AST 遍历过程中调用对应的代码生成逻辑。
5.  **颗粒度**：
    *   **模块级**：以 QuickJS 源码函数为单位进行转译（例如 `js_create_function_def` -> `createFunctionDef`）。
    *   **实现级**：函数内部实现以行为单位进行转译，保持逻辑流的一致性。
6.  **字节码对齐**：
    *   禁止通过 fixture 反推。
    *   必须通过阅读和分析 QuickJS 源码来解决字节码对齐问题。
7.  **环境依赖**：
    *   `Env.ts` 不允许修改。
    *   所有环境常量（Opcode, Atom 等）通过 `getEnv.ts` 调用 WASM 版 QuickJS 获取。

## 3. 架构设计

### 3.1 核心类映射
我们将 C 结构体映射为 TypeScript 类：

| C 结构体 | TypeScript 类 | 描述 |
| :--- | :--- | :--- |
| `JSContext` | `Context` | 全局上下文，管理 Atom, Class 等 |
| `JSParseState` | `CompilerState` | 编译状态，持有当前 Token（在 TS 版中对应当前 AST 节点上下文） |
| `JSFunctionDef` | `FunctionDef` | 函数定义，包含字节码、常量池、变量表等 |
| `JSVarDef` | `VarDef` | 变量定义 |
| `BlockEnv` | `BlockEnv` | 块级作用域环境 |

### 3.2 编译流程
QuickJS 的编译流程通常是：
`js_parse_program` -> `js_parse_source_element` -> `js_parse_function_def` -> ...

TypeScript 版流程：
1.  **初始化**：创建 `Context` 和顶层 `FunctionDef` (`<eval>` 或 module)。
2.  **AST 遍历**：使用 TypeScript AST Walker 遍历源代码。
3.  **代码生成**：
    *   当遍历到 `FunctionDeclaration` 时，调用对应 `js_parse_function_def` 的转译逻辑。
    *   当遍历到 `BinaryExpression` 时，调用对应 `emit_op` 逻辑。
4.  **字节码输出**：将 `FunctionDef` 中的指令流序列化为 Buffer。

### 3.3 字段映射示例
```typescript
// C: typedef struct JSFunctionDef { ... } JSFunctionDef;
class FunctionDef {
    ctx: Context;
    parent: FunctionDef | null;
    
    // 1:1 字段映射
    byte_code: BytecodeBuilder; // 对应 DynBuf byte_code
    last_opcode_pos: number;    // 对应 int last_opcode_pos
    
    var_defs: VarDef[];         // 对应 JSVarDef *vars
    arg_count: number;          // 对应 int arg_count
    stack_size: number;         // 对应 int stack_size
    // ... 其他所有字段
}
```

## 4. 关键技术点

### 4.1 AST 桥接
QuickJS 是边解析边生成（Single Pass），而 TS AST 是预先解析好的。
我们需要编写一个 `ASTTransformer` 或 `Visitor`，它模拟 QuickJS 的解析顺序。
例如，QuickJS 解析 `if` 语句时：
1.  `emit_goto` (跳过 then)
2.  解析 condition
3.  patch goto
TS 版：
1.  访问 `IfStatement`
2.  执行对应 QuickJS 的 `emit_goto` 逻辑
3.  访问 `condition` 节点
4.  执行 patch 逻辑

### 4.2 作用域与变量解析
QuickJS 手动管理作用域链 (`BlockEnv`)。我们需要完全复刻这一逻辑，而不是依赖 TypeScript 的绑定分析，以确保生成的变量索引（var_idx）与 QuickJS 一致。

### 4.3 字节码对齐
QuickJS 的字节码生成依赖于很多细节（如 `short_opcode` 优化，`line_number` 编码）。
*   **Line Number**: 需要从 TS AST 节点获取行号，并调用 QuickJS 对应的行号编码逻辑。
*   **Short Opcode**: 必须复刻 `emit_op` 中的优化逻辑。

## 5. 测试策略
*   **Fixture 测试**：使用 `scripts/compareWithWasm.ts` 运行测试。
*   **验证标准**：生成的字节码必须与 WASM 版 QuickJS 生成的字节码完全一致（逐字节对比）。
*   **调试**：使用 `dump_pc2line`, `disasm` 等工具分析差异。

## 6. 进度管理
*   每次迭代针对特定语法特性（如 ES2020）。
*   每次提交前必须跑通对应的 fixture。
*   记录 `TODO.md` 和 `PROGRESS.md`。
