# TypeScript → QuickJS 字节码编译器原理（TS 实现，中文）

> 目标：把 TypeScript 源码编译为 QuickJS `.qbc`，并在可比对场景下做到与 QuickJS WASM 输出 byte-for-byte 一致（包括 atoms 表、字节码、常量池、pc2line/pc2column/source 等调试信息）。

## 1. 总体架构

编译管线核心入口在 [src/TypeScriptCompiler.ts](../src/TypeScriptCompiler.ts)：

- **解析**：使用 TypeScript 官方 AST（`ts.createSourceFile`）
- **发射临时字节码**：Visitor 遍历 AST，调用 `Compiler.emitOp/emitAtom/emitUxx` 写入 `FunctionDef.byteCodeBuf`
- **解析/修补**：
  - `VariableResolver`：把编译阶段的“临时操作码/临时占位”解析成最终字节码等价物
  - `LabelResolver`：回填跳转目标、收缩长/短跳转（对齐 QuickJS）
  - `StackSizeComputer`：计算最大栈深（对齐 QuickJS `compute_stack_size`）
- **构建最终结构**：`FunctionBuilder.build(fd)` 生成 `JSFunctionBytecode`
- **序列化**：`BytecodeWriter.write(...)` 写出二进制 `.qbc`

对应关系（便于读代码）：
- QuickJS `parser.c`：解析/发射字节码、生成调试槽（line/column slots）
- QuickJS `bytecode.cpp`：序列化函数/模块、atoms 表、常量池

## 2. 核心数据结构

- `FunctionDef`（[src/compiler/FunctionDef.ts](../src/compiler/FunctionDef.ts)）：
  - 近似 QuickJS `JSFunctionDef`：保存作用域、变量、闭包变量、字节码缓冲、常量池、调试槽等
- `Compiler`（[src/compiler/Compiler.ts](../src/compiler/Compiler.ts)）：
  - 发射工具层：`emitOp/emitAtom/emitU8/emitU16/emitU32/emitSourcePos` 等
  - `emitSourcePos` 负责产生 `OP_line_num`（或避免产生），最终影响 pc2line/pc2column

## 3. 从源码位置到调试信息（pc2line/pc2column）

调试信息的关键输入是 **sourcePos（源码偏移）**，它来自 TS AST 节点的 `getStart/getEnd` 等，并在发射 op 时作为可选参数传给 `emitOp`。

- `Compiler.emitOp(fd, op, sourcePos?)`：若传入 sourcePos，会先触发 `emitSourcePos`，再写入 op。
- `emitSourcePos` 会做去重：同一个 `sourcePos` 不重复插槽。
- `DebugInfoBuilder`（[src/compiler/DebugInfoBuilder.ts](../src/compiler/DebugInfoBuilder.ts)）：
  - 负责把 `FunctionDef` 中收集到的行/列槽编码成 QuickJS 格式的 `pc2line/pc2column`。
  - 编码细节（短/长指令、LEB128、zigzag）要与 QuickJS 严格一致，否则会出现“只差 1-2 bytes”的对齐失败。

实践要点：
- **哪些 op 绑定 sourcePos**（哪些不绑定）会直接改变 pc2line 表长度与内容。
- 很多对齐修复，本质是“把 sourcePos 锚到与 QuickJS 相同的 token 上”，例如 `.`、`[`、反引号、`for/if/while` 等关键字是否形成独立采样点。

## 4. atoms 表与序列化一致性

`BytecodeWriter`（位于 [src/compiler/FunctionBuilder.ts](../src/compiler/FunctionBuilder.ts)）负责写 atoms 表：

- `< firstAtomId (=228)` 的内置 atom：**直接写原值**，不进入用户 atoms 表
- `>= firstAtomId` 的用户 atom：写入 atoms 表并映射为序列化索引

这一步如果做错，会出现 atoms 表膨胀、索引漂移，从而导致整个 `.qbc` 结构大范围差异。

## 5. AST → 字节码：Visitor 体系

Visitor 入口在 [src/TypeScriptCompiler.ts](../src/TypeScriptCompiler.ts) 的 `visitStatement/visitExpression`（以及内部拆分的 visitors）。实现集中在：

- 语句： [src/compiler/visitors/StatementVisitor.ts](../src/compiler/visitors/StatementVisitor.ts)
- 表达式： [src/compiler/visitors/ExpressionVisitor.ts](../src/compiler/visitors/ExpressionVisitor.ts)
- 函数： [src/compiler/visitors/FunctionVisitor.ts](../src/compiler/visitors/FunctionVisitor.ts)
- 类： [src/compiler/visitors/ClassVisitor.ts](../src/compiler/visitors/ClassVisitor.ts)
- 字面量： [src/compiler/visitors/LiteralVisitor.ts](../src/compiler/visitors/LiteralVisitor.ts)
- 标识符： [src/compiler/visitors/IdentifierVisitor.ts](../src/compiler/visitors/IdentifierVisitor.ts)
- this/super： [src/compiler/visitors/ThisVisitor.ts](../src/compiler/visitors/ThisVisitor.ts)

操作码定义来自 [src/env.ts](../src/env.ts)（由脚本生成，确保与 QuickJS 一致）。

### 5.1 一个“细到表达式”的示例：模板字符串

位置：[ExpressionVisitor.visitTemplateExpression](../src/compiler/visitors/ExpressionVisitor.ts)

- 无插值模板：等价于 push cooked string（可能走 `OP_push_atom_value`）
- 有插值模板：对齐 QuickJS `js_parse_template(call=0)`
  - push head
  - 取 `concat`（`OP_get_field2` + atom('concat') + ic('concat')，通常不绑定 sourcePos）
  - 依次 push 插值与尾片段
  - `OP_call_method argc`

为什么这能做到 byte-for-byte：
- `concat` 的取值是否绑定 sourcePos、空 tail 是否跳过、argc 计数，都决定最终字节码与 pc2line。

### 5.2 Tagged template（带 tag 调用）

位置：[ExpressionVisitor.visitTaggedTemplateExpression](../src/compiler/visitors/ExpressionVisitor.ts)

要点：
- 先把 callee 按“普通调用/方法调用”布局压栈
- `push_const(template_object)`（通常 suppress sourcePos，避免多余 pc2line 采样）
- push 插值
- `OP_call` 或 `OP_call_method`，并把 sourcePos 锚定到反引号（对齐 QuickJS）

## 6. 模块（import/export）与 module bytecode

- 是否为模块：`sourceFile.externalModuleIndicator != null` 或 `forceModule`
- `fd.module != null` 时：
  - 顶层强制 strict mode，且以 async 形式返回（支持 TLA）
  - `finalizeModule` 会：
    - 将 module globals 追加为闭包变量（与 imports 之后的位置对齐）
    - 将 `LOCAL export` 解析为 closure var index

相关实现：
- [src/TypeScriptCompiler.ts](../src/TypeScriptCompiler.ts)
- [src/compiler/visitors/StatementVisitor.ts](../src/compiler/visitors/StatementVisitor.ts)（import/export 语句发射）
- [src/compiler/FunctionBuilder.ts](../src/compiler/FunctionBuilder.ts)（模块序列化结构）

## 7. 如何“逐表达式”定位字节码与调试信息

推荐工作流（已在仓库脚本中固化）：

- 单个 fixture 对比：`pnpm -s exec tsx scripts/compareWithWasm.ts __tests__/fixtures/<x>.ts --disasm --normalize-short --side-by-side --artifacts-dir artifacts --show-diff`
- 全量 fixtures：`pnpm -s exec tsx scripts/compareAllFixtures.ts --normalize-short --artifacts-dir artifacts`
- pc2line 解码：`pnpm -s exec tsx scripts/dumpPc2line.ts <file.qbc>`

当你想回答“某个表达式生成哪些 op、对应哪一行哪一列”：
1) 在 visitor 中找到对应 `visitXxx`
2) 记录它发射的 opcode 序列（通常是 `emitOp/emitAtom/emitUxx`）
3) 看这些 `emitOp` 是否传入 `sourcePos`（决定 `OP_line_num` 是否出现）
4) 通过 `dumpPc2line` 或 artifacts 的 disasm/diff，验证 PC → (line,col)

## 8. 说明

- 本文档是“原理 + 定位方法”的骨架版：覆盖编译管线、调试信息、atoms/序列化，以及若干典型表达式的精确对齐点。
- 若需要做到“**列出所有表达式/语句的 opcode 模板**”（真正逐节点枚举），建议以 `ts.SyntaxKind` 为索引，按 visitor 分章节补齐；我可以基于当前 visitors 自动梳理一份“节点→实现位置→opcode 模板→sourcePos 锚点”的清单。
