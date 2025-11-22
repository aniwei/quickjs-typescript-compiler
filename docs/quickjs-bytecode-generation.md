# QuickJS 字节码生成全景指南

> 基于仓库 `third_party/QuickJS` 当前版本（2025-11-22）源码梳理，覆盖 `src/core/parser.c`、`function.c`、`bytecode.cpp/h`、`types.h` 与 `include/QuickJS/quickjs-opcode.h` 中的全部分支逻辑。本文聚焦 **字节码生成**，即从源代码到 `JSFunctionBytecode` 的全过程。

- **编译入口**：`js_parse_program()` -> `js_create_function()`。
- **核心阶段**：词法扫描 → 递归下降语法 & 即时字节码生成（Phase 1）→ 作用域/变量解析（Phase 2）→ 标签/跳转折叠与短指令（Phase 3）→ 栈深度/调试表 → `JSFunctionBytecode` 物化。
- **数据结构**：`JSParseState`、`JSFunctionDef`、`JSVarDef/Scope`、`BlockEnv`、`LabelSlot`、`JumpSlot`、`LineNumberSlot`、`InlineCache`、`JSGlobalVar`。

---

## 1. 顶层流程

| 步骤 | 入口函数/文件 | 产物 | 关键点 |
| --- | --- | --- | --- |
| 词法扫描 | `next_token()` 及 `js_parse_*` 家族 (`parser.c`) | `JSToken` | 识别 `TOK_*`、模板、正则、数字、私有名。支持 `simple_next_token()` 快速窥视模块关键字。|
| 语法+初级字节码 | `js_parse_program()` & `js_parse_*` | `JSFunctionDef.byte_code`（含 `OP_label/OP_scope_*` 等临时指令） | 递归下降直接发射字节码，伴随 `BlockEnv`、`Scope`、`LabelSlot` 管理。|
| 作用域&变量解析 | `resolve_variables()` | 替换 `OP_scope_*` / `OP_with_*` / 全局定义，补充 hoist、闭包捕获、全局/模块定义检查。|
| 标签/跳转/短指令 | `resolve_labels()` | 去除 `OP_label`、裁剪死代码、生成短跳 | 同时插入 `OP_special_object*` 初始化、Tail-call 优化、常量判断折叠。|
| 栈深度 & PC 映射 | `compute_stack_size()`、`compute_pc2line_info()` | `stack_size`、`pc2line`/`pc2column` | 基于 `ss_check()` 预防栈溢出；`pc2line` 记录源映射。|
| 函数字节码物化 | `js_create_function()` (`parser.c` & `function.c`) | `JSFunctionBytecode` | 写入常量池、变量表、闭包表、最终指令流、inline cache、调试信息。|

## 2. 词法分析

* **Token 集合**（`parser.h` `TOK_*`）：数字、字符串、模板、标识符/私有名、RegExp，运算符（含 `??`, `?.`, `**`, 复合赋值）、关键字（`TOK_NULL`..`TOK_AWAIT`）。
* **扫描函数**：
	* `next_token()` 主循环，调用 `js_parse_string()`、`js_parse_template_part()`、`js_parse_regexp()`、`unicode_from_utf8()`。
	* `simple_next_token()` 用于 `import/export/of` 等 lookahead，保证 `import.meta` 与 `import()` 区分。
	* JSON/模板特殊态：`ext_json`、`allow_html_comments`、`got_lf` 控制自动分号插入。
* **词法错误**：`js_parse_error*` 统一抛 `JS_SYNTAX_ERROR` 并带源位置信息（`GetLineColCache`）。

## 3. 解析状态与核心结构

| 结构 | 关键字段 | 职责 |
| --- | --- | --- |
| `JSParseState` | `token/got_lf/buf_ptr`, `cur_func`, `is_module`, `allow_html_comments`, `ext_json` | 维护当前词法游标、指向正在生成字节码的 `JSFunctionDef`。|
| `JSFunctionDef` | `byte_code` (DynBuf), `label_slots`, `vars/args/scopes`, `closure_var`, `global_vars`, `BlockEnv* top_break`, `jump_slots`, `line_number_slots`, `pc2line`, `ic` | 函数级编译单元。包含常量池(`cpool`)、作用域图(`JSVarScope`)、闭包、Inline Cache、调试/源码缓存、`child_list`（嵌套函数）。|
| `JSVarDef` & `JSVarScope` | `var_name`, `scope_level/next`, `is_const/is_lexical/is_captured`, `var_kind` | 表示本地变量/参数/捕获变量，`scope_level` 与 `scope_next` 串联词法链。|
| `BlockEnv` | `prev`, `label_name`, `label_break/cont/finally`, `drop_count`, `scope_level`, `has_iterator`, `is_regular_stmt` | 控制 `break/continue/finally` 以及 `for-of` iterator 清理。|
| `LabelSlot` & `JumpSlot` | `ref_count`, `pos/pos2/addr`, `first_reloc`; `JumpSlot{op,size,pos,label}` | Phase 1~3 之间跟踪跳转目标，为 `resolve_labels` 生成短跳或回填。|
| `LineNumberSlot`/`ColumnNumberSlot` | `pc`, `source_pos` | 保存 PC→源位置映射，供 `compute_pc2line_info()` 压缩。|
| `JSGlobalVar` | `var_name`, `cpool_idx`, `force_init`, `is_lexical/is_const`, `scope_level` | 记录 var/let/const/hoisted function 的全局声明，Phase 2–3 才真正生成 `OP_define_var`，模块下还要塞进 `closure_var`。|
| `InlineCache` (`ic.h`) | 哈希槽/环形槽/监视点 | 由 `emit_ic()`/`add_ic_slot1()` 标记的属性访问在 `js_create_function` 结束时 `rebuild_ic()`。|

## 4. 字节码写入原语（Phase 1）

* `emit_u8/u16/u32()`：写入 `JSFunctionDef.byte_code`。
* `emit_source_pos()`：必要时插入 `OP_line_num`（Phase 3 会搬去调试表）。
* `emit_op()`：记录 `last_opcode_pos`，供 `js_is_live_code()` 判断死代码。
* `emit_atom()`：写入 `JSAtom`（dup），常配合 `OP_get_field` 等；`emit_ic()` 为属性访问增加 IC 槽。
* `emit_label()`/`emit_label_raw()`：发射临时 `OP_label` 并填 `LabelSlot.pos`。
* `emit_goto()`：若当前不是死代码则分配标签 + `OP_goto/OP_if_*`，并增加 `ref_count`。
* `cpool_add()` + `emit_push_const()`：常量池支持字符串、数字、函数；字符串在 `as_atom=true` 时优先尝试 `OP_push_atom_value` + IC。
* `js_is_live_code()`：检查上一个 opcode 是否 `return/throw/goto/ret`，避免重复发射。

## 5. 作用域、变量与闭包

### 5.1 作用域栈

* `push_scope()/pop_scope()`：写 `OP_enter_scope`/`OP_leave_scope`（Phase 2 移除）。
* `scope_level/scope_first`：指向 `JSVarDef` 链表头，用于 `find_var_in_scope/child_scope`。
* `get_first_lexical_var()`：离当前 scope 最近的 `let/const` 起始位。

### 5.2 变量声明

* `add_var()`：限制 16-bit 索引（`JS_MAX_LOCAL_VARS`），根据 `JSVarKindEnum` 标记 function decl / catch / private field。
* `find_var/find_arg/find_global_var`：按 `scope_level`、`JSFunctionDef.global_vars` 查询。
* `resolve_pseudo_var()`：为 `this/new.target/home_object/this.active_func` 创建专属 `var_idx` 并在 Phase 3 注入 `OP_special_object` 初始化。
* `var_object_test()` & `resolve_scope_var()`：`with`/`eval` 情况通过 `OP_scope_*` 访问 var 对象或全局对象，Phase 2 展开。
* `optimize_scope_make_ref()/optimize_scope_make_global_ref()`：解析 `a += expr` 等会创建引用的情况，尽量转成直接 `get/put`。

### 5.3 闭包

* `add_closure_var()/get_closure_var2()`：把父函数的局部/闭包变量变成当前 `closure_var`，记录 `is_local/is_arg/is_const/is_lexical`。
* `find_closure_var()`：供 `add_module_variables` / `export` 查找。
* `add_eval_variables()`：函数含 `eval()` 时需把所有可捕获变量写入 closure，保持与 runtime eval 一致。

### 5.4 BlockEnv & 跳转

* `BlockEnv` 栈位于 `JSFunctionDef.top_break`，每个循环/try/finally/label 推入，保存 `label_break/label_cont/drop_count/finally`。
* `emit_break/continue` 直接根据当前 BlockEnv 产生 goto 或 gosub+goto（try-finally）。

## 6. 表达式 → 字节码

### 6.1 总览索引

| 表达式类别 | 主要函数 | 核心指令/特性 | 特殊分支 |
| --- | --- | --- | --- |
| 基础字面量 (`null/undefined/boolean/number/bigint/string`) | `js_parse_postfix_expr()` | `OP_null/undefined/push_true/push_const/push_bigint_i32` | 处理八进制/二进制/十六进制、严格模式禁止八进制、`bigint` 经 `push_bigint_i32`。|
| 模板 & Tagged Template | `js_parse_template()` | 构建字符串常量 + `OP_template_obj`（通过函数调用 path），每段表达式 `js_parse_expr()` | 模板分三类：纯文本、含表达式、Tagged 模式（`call` 前注入 template obj）。|
| 正则字面量 | `js_parse_postfix_expr()` + `js_parse_regexp()` | 延迟到运行时 `OP_regexp` | `u`、`y` 校验均在词法阶段完成。|
| 标识符/变量引用 | `js_parse_postfix_expr()` | `OP_get_loc/get_arg/get_var_ref/get_var` 系列（最终 Phase 2 决定） | 严格模式 `eval/arguments` 限制、模块 `await` 限制。|
| `this/super/new.target/import.meta` | `js_parse_postfix_expr()` | `OP_push_this`，`super` 通过 `OP_get_super`/`OP_get_super_value`，`new.target` & `import.meta` 使用 `OP_special_object` | `super` 仅在允许上下文；`import.meta` 仅模块。|
| 成员/调用表达式 | `js_parse_postfix_expr()` | `OP_get_field/get_array_el/get_private_field`，`OP_call/call_method/call_constructor/tail_*` | 支持 `?.`（生成 `OP_get_field_opt_chain/OP_get_array_el_opt_chain` 等临时 op 在 Phase 2 替换）、`import()`、`eval()` 特判。|
| `new` 表达式 | `js_parse_postfix_expr()` | `OP_call_constructor`、传入 `new.target` | `new import()` 禁止；`new.target` 仅函数体有效。|
| `await` / `yield` / `yield*` | `js_parse_unary()` / `js_parse_assign_expr2()` | `OP_await`、`OP_yield`、`OP_yield_star`/`OP_async_yield_star` | `await` 仅 async 函数 & 模块顶层，`yield` 仅 generator，`yield` 默认当作表达式也可 `yield = x`，`yield*` 强制 `OP_iterator_*` 流。|
| 后缀 `++/--` | `js_parse_postfix_expr()` / `js_parse_unary()` | `OP_post_inc/post_dec`; 对局部优化成 `OP_inc_loc/dec_loc` | 非简单左值会展开为 `make_ref` + `put_ref_value`。|
| 单目（`delete/void/typeof/+/-/~/!`） | `js_parse_unary()` & `js_parse_delete()` | `OP_delete/delete_var`, `OP_void`（由 `undefined`+`drop` 实现），`OP_neg/not/lnot/typeof` | `delete` 私有字段报错、严格模式 `delete identifier` 抛异常、`typeof foo` 在未声明变量不会抛错（使用 `OP_get_var_undef + typeof`）。|
| 幂运算 | `js_parse_expr_binary()`（level=15） | `OP_pow`; 右结合通过 `PF_POW_*` 标志阻止 `++`/`--`。|
| 乘除模加减位移比较等 | `js_parse_expr_binary()` | 根据 level（15→1）发射 `OP_mul/div/.../lt/gte/...`；地位 `in/instanceof` 受 `PF_IN_ACCEPTED` 控制 | `??` 不与 `&&/||` 混用，由 `js_parse_coalesce_expr()` 检查。|
| 等值/严格等值/逻辑 | `js_parse_expr_binary()`、`js_parse_logical_and_or()` | `OP_eq/neq/strict_eq/...`，逻辑短路用 `OP_if_false/OP_if_true` 分支 | `??` 通过 `OP_is_undefined_or_null` + 短路。|
| 条件表达式 `?:` | `js_parse_cond_expr()` | 生成 label + `OP_if_false` + `OP_goto` 结构，两个分支均走 `js_parse_assign_expr2()` | 嵌套 `? :` 左结合。|
| 赋值 & 复合/逻辑赋值 | `js_parse_assign_expr2()` | 简单赋值 -> `OP_put_*`，复合赋值 -> 先 `get` 再 `OP_*` 再 `put`，`??=/||=/&&=` 利用短路 goto | 左值必须是 `js_parse_left_hand_side_expr()` 产生的引用或 `make_ref` 结构；解构走 `js_parse_destructuring_element()`。|
| 逗号表达式 | `js_parse_expr2()` | 顺序求值 + `OP_drop`，最后一个表达式结果保留 | `PF_IN_ACCEPTED` 在 `for ( ; ; )` 中可关闭 `in`。|
| 函数/箭头函数表达式 | `js_parse_function_decl2()` | 建立子 `JSFunctionDef`，放入 `cpool`，通过 `OP_fclosure` 推入栈，经 `set_name` 绑定 | Arrow 在 `js_parse_assign_expr2()` 里探测 `=>`，处理参数 destruct/default、`arguments` 限制、`this` 绑定。|
| 类表达式 | `js_parse_class()` | 详见 §9；会产生 `OP_define_class(_computed)` 与字段/静态块初始化函数。|

### 6.2 具体要点

1. **模板字面量**：`js_parse_template()` 将 cooked/raw 字符串分别压入常量池，遇 `${}` 递归 `js_parse_expr()`，结束后发 `TOK_TEMPLATE`，Tagged 模式在 `call` 前插 `OP_dup` 保留模板对象。
2. **对象字面量** (`js_parse_object_literal()`)：
	 - 属性名由 `js_parse_property_name()` 解析，可返回 `PROP_TYPE_IDENT/STRING/NUMBER/EXPR` 等。
	 - 支持 Getter/Setter/Method/Async/Generator/Async Gen，分别调用 `js_parse_function_decl()`，并据 `prop_type` 发 `OP_define_method(_computed)`。
	 - 展开（`...expr`）使用 `OP_copy_data_properties`。
	 - `__proto__` 特判成 `OP_set_proto`，重复时报错。
	 - 私有字段/方法（`#x`）使用 `JS_VAR_PRIVATE_*` 和 `OP_private_symbol`/`OP_define_private_field`。
3. **数组字面量** (`js_parse_array_literal()`): 支持空洞、spread、`for` 中表达式。`elision` 通过 `emit_op(OP_undefined)` + `OP_define_array_el` 填补。
4. **可选链**：在 Phase 1 用 `_opt_chain` 临时 op，Phase 2 替换成包含短路标签的序列：`dup`+`is_undefined_or_null`+`if_true`+`drop`。
5. **`new.target`/`import.meta`**：在 `js_parse_postfix_expr()` 直接检测关键字，`import.meta` 要求 `s->is_module=true`。
6. **`super`**：`super()` -> `OP_get_super` + `OP_call_constructor`；`super.prop` -> `OP_get_super_value` / `OP_put_super_value`，必须在 class method 内且 `super_call_allowed`/`super_allowed` 为真。
7. **`await`**：`js_parse_unary()` 若 `JS_MODE_ASYNC` 或模块顶层 `has_await` 开启，否则抛错。`default` 参数内 `await` 需 `parse_flags` 标识。

## 7. 语句/声明 → 字节码

### 7.1 语句索引表

| 语句/声明 | 入口函数 | 指令骨架 | 特殊分支 |
| --- | --- | --- | --- |
| 空语句 `;` | `js_parse_statement_or_decl()` | 无输出 | - |
| 块语句 `{}` | `js_parse_block()` | `push_scope` + 语句列表 + `pop_scope` | 静态初始化块（类）在 `js_parse_class` 内创建专属函数。|
| 变量声明 `var/let/const` | `js_parse_var()` | 每个绑定：绑定名/解构 → `JSVarDef`，初始化则发赋值；`const` 无初值报错 | `export` 模式将 `global_vars.is_lexical/is_const` 置位；`var` 会 hoist 到函数体 scope 0。|
| 函数声明 | `js_parse_function_decl2()` | Hoist：生成子 `JSFunctionDef` 放 `cpool`，`JSGlobalVar.cpool_idx` 指向；最终 `instantiate_hoisted_definitions()` 用 `OP_define_func` | `export default function` 通过 `JS_ATOM__default_` + `OP_set_name JS_ATOM_default`。|
| 类声明 | `js_parse_class()` | 创建 class builder 函数 + `OP_define_class(_computed)`；字段初始化函数 `js_parse_function_class_fields_init()` | Derived ctor / static block / 私有字段全部逐个 `define_*`。|
| 表达式语句 | `js_parse_statement_or_decl()` | `js_parse_expr()` + `OP_drop` | `export default expr` 需要 `OP_put_var` 到 `JS_ATOM_default`。|
| `if/else` | `js_parse_statement_or_decl()` | `test -> OP_if_false label_else; then; goto end; label_else; else; label_end` | `else if` 自然嵌套。|
| `switch` | `js_parse_statement_or_decl()` | `test` 入栈；每个 case 生成 `OP_if_strict_eq`/`OP_if_true` + goto；`default` 单独记录 label；`BlockEnv` 管 `break` | `switch` 中允许 function decl（Annex B）时 `DECL_MASK_FUNC_WITH_LABEL` 控制。|
| `while` / `do-while` | `js_parse_statement()` | `label_cont -> condition -> if_false break; body; goto label_cont`；`do-while` 先 body 后 `expr` | `BlockEnv.has_iterator=false`。|
| `for (;;)` | `js_parse_statement()` | init（可能是 var/lexical）→ `label_cond` -> condition -> body -> increment -> goto | `let` 声明在循环头创建额外 scope 屏蔽外层。|
| `for-in/of` | `js_parse_for_in_of()` | 拆成迭代器协议：`OP_for_in_start`/`OP_for_of_start`/`OP_for_await_of_start` + `OP_for_*_next` + `iterator_close` | `for-await-of` 需要 `is_async`，`for-of` 若左值是 `var`/`let`/`const` 解构则调用 `js_parse_destructuring_element()`。|
| `break/continue` | `js_parse_statement_or_decl()` | 查找 `BlockEnv`，生成 goto 或 goto+drop+gosub | 带标签需 `label_name` 匹配；若不存在抛错。|
| `return` | `js_parse_statement_or_decl()` | `expr?` -> push -> `OP_return`/`OP_return_undef` | 模块/顶层禁止；`static block` 禁止 return。|
| `throw` | 同上 | `expr` -> `OP_throw`，禁止行终止符 | - |
| `try/catch/finally` | `js_parse_statement()` | `OP_gosub` + `BlockEnv.label_finally`；`catch` 使用 `OP_catch`，`finally` 用 `gosub+ret` | `catch` 解构绑定通过 `JS_VAR_CATCH`，`catch (e if ...)` 不支持。|
| `with` | `js_parse_statement()` | `expr` -> `OP_to_object` -> push 到 BlockEnv，生成 `OP_with_*` 系列 | 严格模式报错；`js_parse_with_clause()` 用于 import attributes，不同概念。|
| `debugger` | `js_parse_statement()` | `OP_debugger` | - |
| `import` | `js_parse_import()` | 解析 `import ... from`，写 `JSModuleDef.import_entries` + `global_vars` 标记；运行期由模块实例化填充值 | 支持 `import.meta` attributes（`with` 子句），`import * as ns`，`import { a as b }`，`import('foo')` 在表达式路径处理。|
| `export` | `js_parse_export()` | 根据类型生成：`export {}` 只填模块表；`export default` -> 如上；`export *` -> `JSStarExportEntry`；`export class/function/var` -> 复用对应声明逻辑 | `with` 子句附加 import attributes；`export * as ns` 亦支持。|
| 模块顶层 await | `js_parse_program()` | `JSFunctionDef.has_await` 标记 + `module->has_tla` | Phase 3 选择 `OP_return_async`。|

### 7.2 DECL_MASK & 语句控制

* `DECL_MASK_FUNC/DECL_MASK_FUNC_WITH_LABEL/DECL_MASK_OTHER` 控制当前上下文允许的声明类型（处理 `if (0) function` 等 Annex B 行为）。
* `js_parse_statement_or_decl()` 根据 `token` 路由：label → 递归允许 `function`；`let` lookahead 通过 `is_let()`，避免把 `let` 标识符误判为声明。

## 8. 解构与形参

* `js_parse_destructuring_var()`
	* 针对绑定模式（参数/let/const）与赋值模式区分，参数模式会调用 `js_parse_check_duplicate_parameter()`。
* `js_parse_destructuring_element()`
	* 递归处理 Array/Object。Array：`[]` + `rest`（最后一个）→ `OP_rest`；Object：属性名 + 默认值 + rest (`...rest`) → `OP_copy_data_properties`。
	* `is_arg`/`has_initializer` 标志决定是否在参数作用域初始化。
	* 左值是表达式（赋值场景）时会使用 `js_parse_left_hand_side_expr()` 生成 reference，再发 `OP_put_ref_value`。
	* 复杂模式若 `js_parse_skip_parens_token()` 无法正确解析会抛 “too complicated destructuring expression”。
* `function` 形参列表在 `js_parse_function_decl2()` 处理中：
	* 支持默认值、解构、rest。
	* `has_simple_parameter_list` -> 是否可拥有 `arguments` 映射 & `'use strict'` 检查。
	* `has_parameter_expressions` -> 创建 `argument scope`（`ARG_SCOPE_INDEX`）。

## 9. 函数、类与模块语义

### 9.1 函数

* `JSParseFunctionEnum`：区分声明上下文（语句、var、表达式、箭头、getter、setter、method、class constructor/static init）。
* `JSFunctionKindEnum`：`JS_FUNC_NORMAL/GENERATOR/ASYNC/ASYNC_GENERATOR`，影响 `func_kind` 位、`has_use_strict`、`has_this_binding`。
* `js_parse_function_decl2()`：
	* 建立新 `JSFunctionDef child`，继承父 `js_mode`，`init_ic()`。
	* 处理 `name`（匿名函数表达式也可能生成 `JS_VAR_FUNCTION_NAME`）。
	* 形参解析 + `arguments` / `new.target` / `super` 限制。
	* `body_scope` 记录函数体块，`use strict` directive 通过 `js_parse_directives()` 检测。
	* 嵌套函数通过 `parent_cpool_idx` 引用，`js_create_function()` 时将子函数对象写回父常量池。

### 9.2 类

* `js_parse_class()` 处理 `class {}`：
	* 解析 `extends`：若存在则 `is_derived_class_constructor=TRUE`，强制 `super` 限制。
	* `prop_type` 区分 `method/get/set/async/generator/async generator/field/private/static/class fields init`。
	* 私有字段：`JS_VAR_PRIVATE_*` 放入 `JSVarDef`，`define_private_field`/`get_private_field`/`put_private_field` 指令。
	* 静态块 -> `JS_PARSE_FUNC_CLASS_STATIC_INIT` 函数，通过 `OP_define_class` 过程中 `add_brand`、`check_brand`。
	* 默认构造函数由 `js_parse_class_default_ctor()` 生成（派生类 `return super(...args)`），字段初始化函数由 `js_parse_function_class_fields_init()` 构建。

### 9.3 模块、导入导出

* `JS_DetectModule()`：基于首个 token 是 `import`/`export` 判定是否模块，驱动 `s->is_module`。
* `js_parse_import()`：
	* 处理 `import default`, `import * as ns`, `import {a as b}`, `import foo, {}`、`import foo from`、`import` + `with` clause (attributes)；解析字符串模块名 -> `JSModuleDef.req_module_entries`。
	* 为每个绑定生成 `add_var/add_closure_var`，标 `JSGlobalVar.is_lexical`。
* `js_parse_export()`：
	* `export { ... } from` -> `JSExportEntry` + `JSImportEntry`。
	* `export *`/`export * as ns` -> `JSStarExportEntry`。
	* `export default`：若是 `function/class` 传 `JS_PARSE_EXPORT_DEFAULT`，否则 `expr` 结果写入 `JS_ATOM_default`。
* `add_module_variables()`：Phase 4 之前把所有模块级 `global_vars` 加入 closure，并将本地 export 解析成闭包索引。
* `import.meta`：`OP_special_object OP_SPECIAL_OBJECT_IMPORT_META`，运行时落到模块 meta 对象。

## 10. 控制流整理与优化（Phase 2 & 3）

1. **`instantiate_hoisted_definitions()`**（`resolve_variables()` 内调用）：为 body scope 的 hoisted 函数生成 `OP_fclosure` + `OP_put_loc`/`OP_define_field`。
2. **`resolve_variables()`**：
	 * 遍历 bytecode：
		 * 将 `OP_scope_*` 根据 `scope` + `var_name` 替换成 `OP_get_loc/get_var_ref/get_var` 等。
		 * `OP_with_*`/`OP_scope_make_ref` 优化为直接读写局部或全局，必要时插入 `OP_check_var/OP_put_var_strict`。
		 * `OP_enter_scope/OP_leave_scope`：进入 scope 时对每个 `JSVarDef` 执行初始化或 `OP_set_loc_uninitialized`；离开 scope 关闭捕获变量（`OP_close_loc`）。
		 * 清理 `OP_label` 记 `pos2`，`OP_line_num` 计数增 `line_number_size`。
		 * 识别 `OP_gosub` 指向空 finally 并删除。
3. **`skip_dead_code()`**：在遇到 `return/throw/goto/ret` 后，跳过直到下个标签或行信息，期间释放未使用 atom，维护 `label.ref_count`。
4. **`resolve_labels()`**：
	 * 按顺序复制指令到新 `DynBuf bc_out`。
	 * 在输出前注入 `OP_special_object` 初始化 `home_object/this/new.target/arguments/var_object`。
	 * `OP_call/call_method` 若后接 `OP_return` 则改成 `OP_tail_call(_method)` 并删除 return。
	 * `OP_goto/if_true/if_false/catch/with_*`：
		 * 若目标已知且距离适中，用短跳 `OP_if_false8/if_true8/goto8/goto16`。
		 * `find_jump_target()` 跟踪链式 goto，消除 goto-to-return。
	 * 常量优化：
		 * `null/true/false + if_*` 转成直接 goto 或删除整块。
		 * `push_i32` 后紧跟 `neg/drop` 等组合折叠。
		 * `OP_dup + if_false + drop` 场景合并。
		 * `OP_get_field length` -> `OP_get_length`。
		 * `null strict_eq` -> `OP_is_null`。
	 * 删除 `OP_nop/OP_set_class_name` 等仅编译期使用的指令。
	 * 记录 `LineNumberSlot`，`add_pc2line_info()` 在此过程中调用。
5. **`compute_stack_size()`**：
	 * `StackState` (`pc_stack`, `stack_level_tab`, `catch_pos_tab`) 模拟执行所有指令，验证操作数栈上限、`catch` 匹配、`for-await` 特殊栈宽。
	 * 失败抛内部错误。
6. **`compute_pc2line_info()`**：
	 * 以 `line_number_slots` 为输入，生成 LEB128 + `PC2LINE_BASE/RANGE` 编码；若 `strip_debug` 则跳过。

## 11. Inline Cache、调试与 special object

* **Inline Cache**：
	* Phase 1 中每次 `emit_atom()` 伴随 `emit_ic()` 调用 `add_ic_slot1()`，预建哈希槽。
	* `js_create_function()` 调 `rebuild_ic()`，若 `ic->count==0` 则丢弃。
	* `function.c` 的 `OP_get_field_ic/put_field_ic` 借助 `get_ic_prop_offset()` 命中 shape/prototype。
* **调试信息**：
	* `JSRuntime.strip_flags` 控制 `strip_debug/strip_source`。
	* 若保留调试，`JSFunctionBytecode.debug` 持有 `filename`, `pc2line`, `pc2column`, `source`。
	* `LineNumberSlot` 记录 `pc`→`source_pos`，`compute_pc2line_info()` 压缩。
* **`OP_special_object` 枚举（`function.h`）**：`ARGUMENTS/MAPPED_ARGUMENTS/THIS_FUNC/NEW_TARGET/HOME_OBJECT/VAR_OBJECT/IMPORT_META`。Phase 3 在函数入口注入 `OP_special_object` + `OP_put_loc`。

## 12. `JSFunctionBytecode` 物化

执行顺序（`js_create_function()`）：

1. **重新链接 scope**：重建 `JSVarScope.first`，处理 argument scope（`ARG_SCOPE_INDEX`）。
2. **`has_eval_call` & 模块变量**：`add_eval_variables()` 扩充 closure；模块调用 `add_module_variables()` 注入 `global_vars`。
3. **Phase 2 & 3**：`resolve_variables()` → `resolve_labels()` → `compute_stack_size()`。
4. **内存布局**：
	 - 计算 `function_size`，顺序存放 `JSFunctionBytecode` 主体 → `cpool` → `vardefs`（若未 strip）→ `closure_var` → `byte_code_buf`。
	 - `vardefs` 仅在 `strip_debug && !has_eval_call` 才可省略（改为释放 atom）。
5. **字段赋值**：`b->func_name/js_mode/func_kind/has_prototype/need_home_object/...` 直接拷贝 `JSFunctionDef`；`stack_size` 来源 `compute_stack_size()`。
6. **Inline Cache**：移动 `fd->ic` 至 `b->ic`，`rebuild_ic()` 后若为空则释放。
7. **GC 挂载**：`add_gc_object()` 把 `b` 插入 runtime GC 列表。
8. **子函数处理**：遍历 `child_list` 递归 `js_create_function()`，将结果放回父 `cpool[cpool_idx]`。
9. **返回**：`JS_MKPTR(JS_TAG_FUNCTION_BYTECODE, b)`。

> 注意：根函数（脚本/模块）会在 runtime 额外包裹（`function.c` 中 `JS_EvalFunction`）。若模块含 `await`，最终 `return` opcode 会替换成 `OP_return_async` 并由 runtime 包装成 Promise。

## 13. 操作码索引（`include/QuickJS/quickjs-opcode.h`）

### 13.1 分类

1. **常量/栈操作**：`push_*`, `dup/nip/perm/swap/rot`。
2. **调用/返回**：`call/call_method/call_constructor/tail_call/apply`, `return/return_undef/return_async`, `check_ctor*`。
3. **变量访问**：`get/put/set_loc/arg/var_ref`, `scope_*`（临时）, `with_*`, `make_*_ref`。
4. **对象/属性**：`get/put_field`, `define_var/define_func/define_field/define_method/define_class`, `private_*`, `set_proto/set_home_object`。
5. **控制流**：`if_true/if_false/goto/gosub/ret/catch`, `line_num`（临时）。
6. **迭代器**：`for_in/of/await` 系列、`iterator_*`, `yield*`。
7. **算术/逻辑**：`neg/inc/post_inc/add/mul/...`, `instanceof/in`, `eq/strict_eq`, `and/or/xor`, `is_undefined_or_null`, `private_in`。
8. **模块/运行时**：`import`, `eval/apply_eval`, `special_object`, `rest`, `object`, `copy_data_properties`, `append`, `set_name`。
9. **短指令（`#if SHORT_OPCODES`）**：`push_i8/i16`, `get_loc0..3`, `put_loc0..3`, `call0..3`, `if_false8`, `goto16`, `push_empty_string`, `is_null/is_undefined` 等。

### 13.2 Phase 专属指令

* Phase 1/2 才存在：`enter_scope/leave_scope`, `label`, `scope_*`, `_opt_chain`, `set_class_name`, `line_num`。

## 14. 实践指引

1. **定位表达式/语句**：
	 * 搜 `js_parse_<kind>`（见 §6/§7）可快速跳到实现，并结合 `emit_*` 了解指令序列。
	 * 需要追踪具体 opcode，可在 `resolve_labels()` 之后用 `DUMP_BYTECODE`（编译时宏）或 `js_dump_function_bytecode()`。
2. **调试作用域问题**：
	 * 看 `resolve_scope_var()` 路径，确认 `scope_level`、`JSVarDef.var_kind` 是否按预期。
	 * `with`/`eval` 导致的引用可在 Phase 2 搜 `OP_scope_make_ref`。
3. **模块导出/导入**：
	 * 关注 `JSModuleDef.req_module_entries/import_entries/export_entries`，Phase 4 `add_module_variables()` 会把导出名 resolve 成闭包索引。
4. **Inline Cache 调优**：
	 * 属性访问若未触发 `emit_ic()`，确认是否通过 `OP_get_field`（必须有 `JSAtom`）。计算属性 `[]` 无法提前缓存。
5. **扩展 opcode**：
	 * 新指令需在 `quickjs-opcode.h` 添加，并同步 `opcode_info`（`parser.c` 内定义），确保 Phase 2/3/stack-size 都认识。
6. **跨平台注意**：
	 * 字节序：`bytecode.cpp` 中 `is_be()`、`bc_byte_swap()` 负责在写出/读入时处理。
	 * 调试剥离：`JSRuntime.strip_flags` 可在 `runtime.c` 里配置，影响 `strip_debug/source`。

---

通过以上梳理，可完整追踪 QuickJS 从源码到字节码的每一条路径和分支，实现级联修改或排障时可据此定位到对应 `js_parse_*` / Phase 2 / Phase 3 / 物化阶段的具体代码。若需进一步验证，可配合仓库内 `__tests__/compiler` Fixtures 与 `pnpm start … --disasm` 输出核对。

