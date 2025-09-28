# QuickJS `instantiate_hoisted_definitions` 行为梳理

本文记录 QuickJS 前端在 `instantiate_hoisted_definitions` 中对 hoist 定义所做的指令注入逻辑，便于 TypeScript 编译器复刻。

## 函数与参数中的 hoist 处理

1. **函数实参**：遍历 `JSFunctionDef::args`，若 `func_pool_idx >= 0`，依次发射：
   - `OP_fclosure` + 常量池索引（32 位），构造函数对象；
   - `OP_put_arg` + 参数位序（16 位），写回对应形参槽位。
2. **函数体内变量**：扫描 `JSFunctionDef::vars`，筛选 `scope_level == 0`（即 body scope）且 `func_pool_idx >= 0` 的记录，发射：
   - `OP_fclosure` + 常量池索引；
   - `OP_put_loc` + 局部变量槽位（16 位）。

> QuickJS 始终写入宽指令（`OP_fclosure`/`OP_put_arg`/`OP_put_loc`），后续由 `resolve_labels` 决定是否收缩成短指令。TS 侧保持同样策略更利于对齐。

## 模块前言（module guard）

当 `JSFunctionDef::module != NULL` 时，QuickJS 在 hoist 阶段首部插入：

```text
OP_push_this
OP_if_false label_next
OP_return_undef
label_next:
```

- `label_next` 由 `new_label_fd` 分配，使用 32 位偏移；
- `update_label` 与 `s->jump_size++` 记录跳转信息，保证随后的 `resolve_labels` 可以重写为短跳 (`OP_if_false8`)；
- 该 guard 确保在重复执行模块代码时，hoist 分支仅运行一次。

我们的 `emitModulePrologue` 已提前发射同序列，但需在 hoist 注入后将 `label_next` 对齐到 guard 后的第一条真实指令。

## 全局变量与闭包交互

当 `JSFunctionDef::is_global_var` 为真（模块、全局 eval 或非严格脚本）时，会遍历 `s->global_vars`，对每个 `JSGlobalVar` 做以下处理：

1. **检测闭包捕获**：若 `closure_var` 中存在同名条目：
   - 命中普通闭包时，设置 `has_closure = 2`，后续直接 `OP_put_var_ref`；
   - 若遇到 `_var_` / `_arg_var_` 伪变量，则说明需要落在变量环境对象里，记录 `has_closure = 1` 并强制初始化。
2. **非闭包路径**：
   - 若 `cpool_idx >= 0` 且 `!is_lexical`，发射 `OP_fclosure` + `OP_define_func`，保证函数属性具有期望 flag；
   - 否则根据 `is_lexical` / `is_const` 组合拼出 `OP_define_var` 的 flag。
3. **初始化**（当 `cpool_idx >= 0` 或 `force_init == TRUE`）：
   - `cpool_idx >= 0`：再次 `OP_fclosure`，如变量名为 `_default_` 需补 `OP_set_name` -> `default`；
   - `force_init`：写入 `OP_undefined` 作为占位；
   - 根据闭包类型分别落地：
     - `has_closure == 2`：`OP_put_var_ref` + 闭包索引；
     - `has_closure == 1`：`OP_define_field` + 原子名 + `OP_drop`；
     - 否则：`OP_put_var` + 原子名。
4. **清理**：每个条目末尾 `JS_FreeAtom`，保持引用计数正确。

> `force_init` 主要出现在严格模式下的 Annex B 行为，对应 `function` 声明在 `var` 环境中的覆盖需求。

## 收尾

- 若 `module != NULL`，在 hoist 区块末尾发射 `OP_return_undef` 并立刻落地 `OP_label label_next`，与 guard 配合实现“只执行一次”逻辑；
- 最终释放 `global_vars` 数组，防止重复插入。

## 对 TypeScript 编译器的启示

- 需要在 `FunctionDef` 中维护一份等价于 `JSGlobalVar` 的结构，记录常量池索引、词法/常量标志、闭包环境、强制初始化等信息；
- hoist 注入阶段应拆分为三步：参数、局部函数、模块/全局变量；
- Guard 跳转仍以长跳形式写入，交由后续 label 收缩逻辑统一管理；
- 需要补充闭包检测与 `_var_` / `_arg_var_` 伪变量对应的行为，确保 eval/模块环境与 QuickJS 一致；
- `OP_define_func` / `OP_define_var` / `OP_put_var` 等 opcode 的 flag 与参数宽度需严格对齐 `env.ts` 元数据。

下一步：在编译阶段补足 `global_vars` 数据收集与闭包判定，复刻上述指令插入流程，并更新回归测试确保差异收敛。
