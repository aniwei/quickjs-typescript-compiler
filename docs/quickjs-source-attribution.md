# QuickJS 源码对照（出处标注）

生成/维护日期：2025-12-20

目标：将本仓与 QuickJS 行为对齐的关键改动，明确映射到 QuickJS 源码位置，满足“基于 QuickJS 源码分析 + 全量共性修复 + 可追溯出处”的要求。

## 1) pc2line / debug-info 相关

### 1.1 resolve_labels：pc2line slot 采样点与固定容量 gate

- QuickJS 行为：
  - `add_pc2line_info(JSFunctionDef* s, uint32_t pc, uint32_t source_pos)` 只有在：
    - `line_number_slots != NULL`
    - `line_number_count < line_number_size`
    - `pc >= last_pc`
    - `source_pos != last_source_pos`
    时才记录；并允许 `pc == last_pc`（从而可能产生同一 pc 的多条 entry）。
  - 源码：third_party/QuickJS/src/core/parser.c（`add_pc2line_info`）

- 本仓对应：
  - [src/compiler/LabelResolver.ts](../src/compiler/LabelResolver.ts) 的 `addPc2lineInfo()` 与 `resolve()` 初始化 `lineNumberSlots/lineNumberSize`。

### 1.2 pass2（resolve_variables）里的 `line_number_size` 计数来源

- QuickJS 行为：
  - `line_number_size` 来自 pass2 扫描 `OP_line_num` 的计数（并在特定优化/跳过死代码路径中补写 `OP_line_num`）。
  - 源码：third_party/QuickJS/src/core/parser.c（resolve_variables 主循环：遇到 `OP_line_num` 时 `s->line_number_size++` 等）

- 本仓对应：
  - 当前策略：在 `resolve_labels` 前（本仓 `LabelResolver.resolve()`）预扫描 `TempOpcode.OP_line_num` 数量并固定分配 `fd.lineNumberSlots`。

## 2) Label / jump 预估（影响短跳转选择与对齐）

### 2.1 `OP_label` 的 `pos2` 计算

- QuickJS 行为：
  - pass2（resolve_variables）中：
    - `ls->pos2 = bc_out.size + opcode_info[op].size;`
  - 源码：third_party/QuickJS/src/core/parser.c（resolve_variables：`case OP_label:`）

- 本仓修复：
  - [src/compiler/LabelResolver.ts](../src/compiler/LabelResolver.ts)
  - 将 `ls.pos2` 从“输入 pos + len 的估算”改为“`bcOut.size + len` 的等价模拟”，以贴近 QuickJS 的 `bc_out` 语义。

## 3) 表达式 / member access 的 sourcePos 采样点（影响 pc2line-len / pc2line-bytes）

### 3.1 属性访问 `obj.prop` 的 sourcePos：应绑定到 `.` token

- QuickJS 行为：
  - `js_parse_postfix_expr()` 中当 `s->token.val == '.'`：
    - `op_token_ptr = s->token.ptr;`
    - `emit_source_pos(s, op_token_ptr);`
    - `emit_op(s, OP_get_field);`
  - 源码：third_party/QuickJS/src/core/parser.c（`js_parse_postfix_expr` 的 `.` 分支）

- 本仓修复：
  - [src/compiler/visitors/ExpressionVisitor.ts](../src/compiler/visitors/ExpressionVisitor.ts) `visitPropertyAccessExpression()`
  - 将 `sourcePos` 从 `name.getStart()` 调整为在 `expression.end..name.start` 范围内回扫定位 `.` / `?.` token 的位置（best-effort），再用于 `emitOp(OP_get_field, sourcePos)`。

### 3.2 元素访问 `obj[expr]` 的 sourcePos：应绑定到 `[` token

- QuickJS 行为：
  - `js_parse_postfix_expr()` 中当 `s->token.val == '['`：
    - `op_token_ptr = s->token.ptr;`
    - 解析 `expr` 与 `]` 后：`emit_source_pos(s, op_token_ptr); emit_op(s, OP_get_array_el);`
  - 源码：third_party/QuickJS/src/core/parser.c（`js_parse_postfix_expr` 的 `[` 分支）

- 本仓修复：
  - [src/compiler/visitors/ExpressionVisitor.ts](../src/compiler/visitors/ExpressionVisitor.ts) `visitElementAccessExpression()`
  - 将 `sourcePos` 从 `node.getStart()` 调整为在 `expression.end..argument.start` 范围内回扫定位 `[` 的位置。

## 4) object/array literal 的结构性 opcode 是否绑定 sourcePos

### 4.1 object literal

- QuickJS 行为：
  - `js_parse_object_literal()` 中大量结构性 opcode 使用 `emit_op()` 直接发射（不调用 `emit_source_pos()`），例如：
    - `OP_object`、`OP_define_field`、`OP_define_array_el`、`OP_copy_data_properties` 等。
  - 源码：third_party/QuickJS/src/core/parser.c（`js_parse_object_literal`）

- 本仓修复：
  - [src/compiler/visitors/ExpressionVisitor.ts](../src/compiler/visitors/ExpressionVisitor.ts) `visitObjectLiteralExpression()`
  - 对上述结构性 opcode 调用 `emitOp(fd, opcode)`（不传 `sourcePos`），减少/对齐 `OP_line_num` 插入点。

### 4.2 array literal

- QuickJS 行为：
  - `js_parse_array_literal()` 对 `OP_array_from` 使用 `emit_op()` 直接发射（不绑定 `emit_source_pos()`）。
  - 源码：third_party/QuickJS/src/core/parser.c（`js_parse_array_literal`）

- 本仓修复：
  - [src/compiler/visitors/ExpressionVisitor.ts](../src/compiler/visitors/ExpressionVisitor.ts) `visitArrayLiteralExpression()`
  - `OP_array_from` 不再绑定 `sourcePos`。

## 5) class 解析的结构性 opcode 是否绑定 sourcePos

### 5.1 `OP_define_class`（class 语句/表达式）

- QuickJS 行为：
  - `js_parse_class()` 中直接 `emit_op(s, OP_define_class)`，该函数体内没有 `emit_source_pos(s, ...)` 调用，因此 class 结构性 opcode 默认不产生新的 `OP_line_num` 采样点。
  - 源码：third_party/QuickJS/src/core/parser.c（`js_parse_class`）

- 本仓修复：
  - [src/compiler/visitors/ClassVisitor.ts](../src/compiler/visitors/ClassVisitor.ts)
  - `OP_define_class` 改为不绑定 `sourcePos`，以减少/对齐 pc2line entry。

### 5.2 class 成员闭包 `OP_fclosure`

- QuickJS 行为：
  - class 相关路径中闭包发射使用 `emit_op(s, OP_fclosure)`（例如 `emit_class_init_end()`），同样不绑定 `emit_source_pos`。
  - 源码：third_party/QuickJS/src/core/parser.c（`emit_class_init_end`）

- 本仓修复：
  - [src/compiler/visitors/ClassVisitor.ts](../src/compiler/visitors/ClassVisitor.ts)
  - 方法/访问器的 `OP_fclosure` 改为不绑定 `sourcePos`。

## 6) unary / delete / typeof 的 sourcePos 采样点

### 6.1 postfix `x++` / `x--` 的 sourcePos：应绑定到 `++/--` token

- QuickJS 行为：
  - `js_parse_unary()` 在解析 postfix `TOK_INC/TOK_DEC` 时：
    - `op_token_ptr = s->token.ptr; emit_source_pos(s, op_token_ptr); emit_op(s, OP_post_dec + ...)`
  - 源码：third_party/QuickJS/src/core/parser.c（`js_parse_unary`，postfix 分支）

- 本仓修复：
  - [src/compiler/visitors/ExpressionVisitor.ts](../src/compiler/visitors/ExpressionVisitor.ts) `visitPostfixUnaryExpression()`
  - 从 `operand.end..node.end` 区间回扫定位 `++/--` token 的起始位置作为 `sourcePos`。

### 6.1.1 prefix/postfix `++x/--x/x++/x--`：operand（标识符）也会产生采样点

- QuickJS 行为：
  - `js_parse_unary()` 处理 `TOK_INC/TOK_DEC` 时的顺序是“先解析 operand，再对 `++/--` token 做 `emit_source_pos(op_token_ptr)` 再发射 inc/dec opcode”。
  - 这意味着：即使 operand 只是一个标识符（`x`），解析 operand 的路径也会贡献一个采样点（与 operand 位置一致），随后 `++/--` token 位置再贡献一个采样点。
  - 源码：third_party/QuickJS/src/core/parser.c（`js_parse_unary`，`TOK_INC/TOK_DEC` 分支）

- 本仓修复：
  - [src/compiler/visitors/ExpressionVisitor.ts](../src/compiler/visitors/ExpressionVisitor.ts)
  - 在 prefix/postfix inc/dec 的 `Identifier` 快路径中补齐一次 `emitSourcePos(fd, operand.getStart())`，避免因“跳过 operand 解析”导致 pc2line entries 缺失。

### 6.2 `!expr` / `typeof expr` / `delete expr`：不应额外绑定 sourcePos

- QuickJS 行为：
  - `js_parse_unary()`：
    - `!` 分支只 `emit_op(s, OP_lnot)`（无 `emit_source_pos`）
    - `typeof` 分支只 `emit_op(s, OP_typeof)`（无 `emit_source_pos`，且会对前一条 get_var 做 patch）
  - `js_parse_delete()`：只 `emit_op(s, OP_delete)`（无 `emit_source_pos`），并可能就地改写 `OP_scope_get_var -> OP_scope_delete_var`
  - 源码：third_party/QuickJS/src/core/parser.c（`js_parse_unary`, `js_parse_delete`）

- 本仓修复：
  - [src/compiler/visitors/ExpressionVisitor.ts](../src/compiler/visitors/ExpressionVisitor.ts)
  - `OP_lnot` / `OP_typeof` / `OP_delete` / `OP_scope_delete_var` 改为不绑定 `sourcePos`，减少/对齐 pc2line entry。

### 6.2.1 `delete obj.prop` / `delete obj[expr]`：QuickJS 采用“回退并改写上一条 get_* opcode”的策略

- QuickJS 行为：
  - `js_parse_delete()` 并不是“直接发射 delete 组合序列”，而是先按普通 member access 解析出 `OP_get_field` / `OP_get_array_el`，随后读取并回退上一次 opcode：
    - 若是 `OP_get_field`：会把字段名 atom 改写为 `OP_push_atom_value(atom)`，并把 `OP_get_field` 改写为 `OP_delete`（使 delete 的 operand/stack 形状与 member access 保持一致）。
    - 若是 `OP_get_array_el`：会把 `OP_get_array_el` 改写为 `OP_delete`。
  - 该策略天然保留了 member access 的 sourcePos（`.`/`[` token 绑定到 `OP_get_field/OP_get_array_el`），同时 delete 本身不额外产生采样点。
  - 源码：third_party/QuickJS/src/core/parser.c（`js_parse_delete`，处理 `OP_get_field` / `OP_get_array_el` / `OP_scope_get_var` 的 opcode 回写分支）

- 本仓对应：
  - [src/compiler/visitors/ExpressionVisitor.ts](../src/compiler/visitors/ExpressionVisitor.ts)
  - `visitDeleteExpression()` 先按 member access 正常生成 `OP_get_field/OP_get_array_el`（因此保留 `.`/`[` token 的 sourcePos），再用 `fd.lastOpcodePos` 回退并截断，按 QuickJS 语义改写为 `OP_delete` 序列。

### 6.3 `-1` 等常量一元负号：应折叠为单条 push_short_int

- QuickJS 行为：
  - `resolve_labels()` 的 peephole 会把 `OP_push_i32(val) OP_neg` 折叠成 `push_short_int(-val)`（并明确排除 `val==0` 以保留 `-0` 语义，排除 `INT32_MIN` 以避免溢出）。
  - 该折叠会让 `-1` 走 `OP_push_minus1`（因为 `push_short_int` 对 `[-1..7]` 使用 `OP_push_0 + val`）。
  - 源码：third_party/QuickJS/src/core/parser.c（`resolve_labels`：`case OP_push_i32`，约 `parser.c:11492-11525`；以及 `push_short_int`，约 `parser.c:11009+`）

- 本仓修复：
  - [src/compiler/LabelResolver.ts](../src/compiler/LabelResolver.ts)
  - 在 `OP_push_i32` 分支加入同等 peephole：`i32(val) neg -> push_short_int(-val)`，用于对齐 `-1` 等常量 unary minus 的字节码与 pc2line。

## 7) var / let / const（变量声明 store opcode 不绑定 sourcePos）

- QuickJS 行为：
  - `js_parse_var()` 在解析 `let/const/var name = <expr>` 时，解析完右侧表达式后直接发射 store opcode：
    - `emit_op(s, OP_scope_put_var_init)`（`let/const`）
    - `emit_op(s, OP_scope_put_var)`（`var`）
  - 该分支没有对上述 store opcode 调用 `emit_source_pos()`。
  - 源码：third_party/QuickJS/src/core/parser.c（`js_parse_var`，大致 `parser.c:6509-6575`）

- 本仓修复：
  - [src/compiler/visitors/StatementVisitor.ts](../src/compiler/visitors/StatementVisitor.ts)
  - `visitVariableStatement()` 中对 `TempOpcode.OP_scope_put_var_init / OP_scope_put_var` 不再传 `sourcePos`，避免系统性多出 `OP_line_num` 槽。

## 8) 控制流语句关键字（if/while/for）不应产生独立 pc2line 采样点

- QuickJS 行为：
  - `js_parse_statement()` 的 `TOK_IF / TOK_WHILE / TOK_FOR` 分支中，本身不显式调用 `emit_source_pos()` 来标记关键字位置；
  - 通常只有后续解析的表达式/子语句内部在需要时才会通过各自路径触发 `emit_source_pos()`。
  - 源码：third_party/QuickJS/src/core/parser.c（`case TOK_IF`, `case TOK_WHILE`, `case TOK_FOR`）

- 本仓修复：
  - [src/compiler/visitors/StatementVisitor.ts](../src/compiler/visitors/StatementVisitor.ts)
  - `visitIfStatement()` / `visitWhileStatement()` / `visitForStatement()` 不再在 `node.getStart()` 处调用 `emitSourcePos()`；
    改为仅预置 `fd.lastOpcodeSourcePtr = node.getStart()`，避免产生“关键字单独一条 OP_line_num”。

## 9) 全量回归与桶化结果（本轮）

- `pnpm -s exec tsx scripts/compareAllFixtures.ts`：
  - ✅ Identical: 24
  - ⚠️  Mismatched: 37
  - ✖ Errors: 0

- 桶化（scripts/analyzeMismatchCategories.ts）：
  - identical=24 debug=5 bytecode=12 bytecode+debug=18 atoms+bytecode+debug=2

- pc2line 解码摘要（scripts/analyzePc2lineMismatches.ts）：
  - pc2line-len: 19
  - pc2line-bytes: 6
