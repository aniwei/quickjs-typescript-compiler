# Fixtures 对齐清单（按 QuickJS 源码归类）

本项目的目标是：自研 TypeScript → QuickJS bytecode（.qbc）输出与 QuickJS WASM 参考编译输出逐字节一致（包含 atoms/常量池/pc2line 等）。

本文不是逐条解释 84 个 fixtures 的“现象”，而是按 **QuickJS 源码（权威实现）** 的模块/函数族来归类说明：
- 每类语法/行为在 QuickJS 哪些源码文件里实现
- TS 编译器侧对应的实现位置
- fixtures 中覆盖该类行为的代表用例

> QuickJS 源码路径以本仓库 vendored 版本为准：`third_party/QuickJS/...`

---

## 1. 变量/作用域/闭包（resolve_variables 系列）

**QuickJS 源码（权威）**
- `third_party/QuickJS/src/core/parser.c`
  - `resolve_variables`：两遍扫描、全局变量检查、scope 临时 opcode → 最终 opcode
  - `resolve_scope_var`：scope var 的解析与降级路径
  - `instantiate_hoisted_definitions`：提升函数/全局变量的 define 逻辑（其中 `eval_type != JS_EVAL_TYPE_GLOBAL` 才会给 flags 加 `JS_PROP_CONFIGURABLE`）
- `third_party/QuickJS/src/core/runtime.h`
  - `DEFINE_GLOBAL_LEX_VAR` / `DEFINE_GLOBAL_FUNC_VAR`（全局变量定义 flags）
- `third_party/QuickJS/include/QuickJS/quickjs.h`
  - `JS_PROP_CONFIGURABLE` / `JS_PROP_WRITABLE`（属性 flags；全局 var/func define 时会用到）
  - `JS_EVAL_TYPE_GLOBAL` / `JS_EVAL_TYPE_MODULE`（`JS_Eval()` 的 eval_type；global 的权威值是 0）

**TS 编译器侧对应实现**
- `src/compiler/VariableResolver.ts`
- `src/compiler/compiler.ts`
- `src/compiler/FunctionDef.ts`（变量表/作用域结构编码相关）
- `src/TypeScriptCompiler.ts`（根 FunctionDef 的 eval_type 初始化）

**代表 fixtures（非穷举）**
- `__tests__/fixtures/variables-var.ts`
- `__tests__/fixtures/variables-let-block.ts`
- `__tests__/fixtures/closure-*.ts`

**对齐要点（byte-identical 关注）**
- 临时 opcode 范围与解析必须与 QuickJS 完全一致（最终 bytecode 不得残留 temp opcode）。
- 全局变量模式下 `check_define_var` / `define_var` / `define_func` / `put_var_init` 的发射顺序与 flags 必须一致。
- 变量表编码（scopeNext 初值、isConst、isLexical 等）会影响最终序列化字节。

---

## 2. 解构（含 rest/default/nested）与对象属性拷贝

**QuickJS 源码（权威）**
- `third_party/QuickJS/src/core/parser.c`
  - 解构赋值/解构声明的 lowering（含 `{...rest}` / `[...]`）
  - 对象 rest 会走 `copy_data_properties` 路径，并通过 `emit_u8` 编码 flags：
    - `0 | ((depth_lvalue + 1) << 2) | ((depth_lvalue + 2) << 5)`

**TS 编译器侧对应实现**
- `src/compiler/visitors/StatementVisitor.ts`

**代表 fixtures（非穷举）**
- `__tests__/fixtures/destructuring-nested.ts`
- `__tests__/fixtures/destructuring-rest-defaults.ts`
- `__tests__/fixtures/for-of-destructuring.ts`

**对齐要点（byte-identical 关注）**
- `{...rest}` 的 flags 编码属于典型“魔数来源”，必须保持与 QuickJS 公式一致。
- 解构过程中的 atom 插入顺序（包括一些“看似无用”的 atom）也会影响 atom 表与后续 bytecode。

---

## 3. 类（class / private / static block / fields init helper）

**QuickJS 源码（权威）**
- `third_party/QuickJS/src/core/parser.c`
  - `js_parse_class` 及其内部流程（classFlags、define_class、fields init helper、private brand、method 定义等）
- `third_party/QuickJS/src/core/exception.h`
  - `JS_DEFINE_CLASS_HAS_HERITAGE`（classFlags）

**TS 编译器侧对应实现**
- `src/compiler/visitors/ClassVisitor.ts`

**代表 fixtures（非穷举）**
- `__tests__/fixtures/class-basic.ts`
- `__tests__/fixtures/class-inheritance.ts`
- `__tests__/fixtures/class-private-fields.ts`
- `__tests__/fixtures/class-static-block.ts`

**对齐要点（byte-identical 关注）**
- QuickJS 在某些 opcode 发射点不会绑定 `sourcePos`（例如部分 class 相关 opcode），否则会影响 pc2line。
- class fields init helper 的序列化 flags/closure 捕获与 peephole（如存在）会直接影响最终字节。

---

## 4. 可选链（optional chaining / optional call）

**QuickJS 源码（权威）**
- `third_party/QuickJS/src/core/parser.c`
  - optional chaining 的解析与短路控制流

**TS 编译器侧对应实现**
- `src/compiler/visitors/ExpressionVisitor.ts`

**代表 fixtures（非穷举）**
- `__tests__/fixtures/optional-chaining.ts`
- `__tests__/fixtures/optional-chain-call.ts`
- `__tests__/fixtures/optional-chaining-delete.ts`

**对齐要点（byte-identical 关注）**
- optional call 的源码文本级识别（例如 `?.(`）如果用字符扫描实现，必须确保边界条件与 QuickJS 解析一致。

---

## 5. 模板字符串（template literals）

**QuickJS 源码（权威）**
- `third_party/QuickJS/src/core/parser.c`
  - 模板字符串/字符串常量的 atom 化与 concat/call_method 组合

**TS 编译器侧对应实现**
- `src/compiler/visitors/ExpressionVisitor.ts`

**代表 fixtures（非穷举）**
- `__tests__/fixtures/template-literals.ts`

**对齐要点（byte-identical 关注）**
- 模板片段字符串必须走与 QuickJS 一致的 atom/常量路径（否则 atom 表或 opcode 序列会漂移）。

---

## 5.1 表达式与运算符（unary/binary/logical/??=/++/-- 等）

**QuickJS 源码（权威）**
- `third_party/QuickJS/src/core/parser.c`
  - 表达式解析（`js_parse_expr` / `js_parse_assign_expr*` / `js_parse_binary_expr` / `js_parse_unary` 等函数族）
  - 逻辑运算与短路（`&&` / `||` / `??`）
  - 复合赋值与自增自减（compound assign / postfix/prefix）

**TS 编译器侧对应实现**
- `src/compiler/visitors/ExpressionVisitor.ts`
- `src/compiler/visitors/IdentifierVisitor.ts`
- `src/compiler/visitors/LiteralVisitor.ts`

**代表 fixtures（非穷举）**
- `__tests__/fixtures/unary-ops.ts`
- `__tests__/fixtures/binary-ops.ts`
- `__tests__/fixtures/comparison-ops.ts`
- `__tests__/fixtures/bitwise-ops.ts`
- `__tests__/fixtures/logical-operators.ts`
- `__tests__/fixtures/logical-assignment.ts`
- `__tests__/fixtures/nullish-coalescing.ts`
- `__tests__/fixtures/nullish-assignment.ts`
- `__tests__/fixtures/prefix-unary.ts`
- `__tests__/fixtures/postfix-unary.ts`
- `__tests__/fixtures/exponentiation-ops.ts`
- `__tests__/fixtures/exponentiation-assignment.ts`

**对齐要点（byte-identical 关注）**
- 任何“语法糖” lowering 的顺序变化（例如 `a &&= b`、`a ??= b`）都会改变跳转/栈效果，从而影响最终 bytecode。

---

## 5.2 异步/生成器（async/await / for-await-of / async generator）

**QuickJS 源码（权威）**
- `third_party/QuickJS/src/core/parser.c`
  - async/await lowering（await 的挂起/恢复控制流）
  - `for await (...) of ...` 的解析与迭代器协议

**TS 编译器侧对应实现**
- `src/compiler/visitors/StatementVisitor.ts`
- `src/compiler/visitors/ExpressionVisitor.ts`
- `src/compiler/FunctionBuilder.ts`（序列化与函数标志位相关）

**代表 fixtures（非穷举）**
- `__tests__/fixtures/async-await.ts`
- `__tests__/fixtures/for-await-of.ts`
- `__tests__/fixtures/async-generator-basic.ts`

**对齐要点（byte-identical 关注）**
- async/await 的状态机结构对 label/reloc/pc2line 都很敏感，建议结合 QuickJS trace 的 emit 与 label 输出定位。

---

## 5.3 数字/BigInt/字面量（numeric separators / BigInt 运算）

**QuickJS 源码（权威）**
- `third_party/QuickJS/src/core/parser.c`
  - 数字字面量解析（包含 numeric separators）
  - BigInt 字面量与运算符组合

**TS 编译器侧对应实现**
- `src/compiler/visitors/LiteralVisitor.ts`

**代表 fixtures（非穷举）**
- `__tests__/fixtures/number.ts`
- `__tests__/fixtures/numeric-separators.ts`
- `__tests__/fixtures/bigint-numeric-separators.ts`
- `__tests__/fixtures/es2020_bigint.ts`
- `__tests__/fixtures/es2020_bigint_large.ts`
- `__tests__/fixtures/bigint-exponentiation.ts`

**对齐要点（byte-identical 关注）**
- BigInt 与 Number 的常量池编码不同，且大整数会走不同 tag/编码路径；任何偏差都会在常量池或 opcode 参数上体现。

---

## 6. 控制流（if/switch/loops/try/catch/finally）

**QuickJS 源码（权威）**
- `third_party/QuickJS/src/core/parser.c`
  - 语句解析与控制流结构（labels、break/continue、try/finally 的 gosub/ret）

**TS 编译器侧对应实现**
- `src/compiler/visitors/StatementVisitor.ts`
- `src/compiler/LabelResolver.ts`

**代表 fixtures（非穷举）**
- `__tests__/fixtures/if-else.ts`
- `__tests__/fixtures/switch-*.ts`
- `__tests__/fixtures/loop-break-continue.ts`
- `__tests__/fixtures/try-*.ts`

**对齐要点（byte-identical 关注）**
- 跳转修补（reloc）与 label slot 计算必须严格复现 QuickJS 的编码（包含短跳转/长跳转）。
- `try/finally` 的 `gosub`/`ret` 结构对栈与 pc2line 都很敏感。

---

## 7. 调试信息与 pc2line（sourcePos / emit_source_pos）

**QuickJS 源码（权威）**
- `third_party/QuickJS/src/core/parser.c`
  - `emit_source_pos`：pc2line 采样策略与编码

**TS 编译器侧对应实现**
- `src/compiler/DebugInfoBuilder.ts`
- `src/compiler/LabelResolver.ts`

**代表 fixtures（非穷举）**
- `__tests__/fixtures/debug-info-basic.ts`
- 以及所有启用 `--pc2line` 的对比（pc2line 差异会导致“opcode 完全一致但 bytecode 不同”）

**对齐要点（byte-identical 关注）**
- 哪些 opcode 绑定 `sourcePos`、绑定频率、去重策略必须与 QuickJS 一致。

---

## 8. QuickJS 侧埋点（trace）用于定位差异（不改变 bytecode）

本仓库 vendored 的 QuickJS WASM 支持可开关 trace 输出（stderr）。trace 只能用于“观察/定位”，不应改变任何 emit 行为。

**QuickJS 源码（权威）**
- `third_party/QuickJS/src/core/qts_trace.h`：trace 分类与宏
- `third_party/QuickJS/src/core/parser.c`：关键点调用 trace（例如 emit_op / emit_source_pos / assign 相关路径）

**用法建议**
- 构建/复用 wasm：通过 `scripts/buildWasm.ts` 与 `scripts/QuickJSLib.ts` 控制（支持按 trace 分类决定是否需要重建 wasm）。
- 运行对比时打开 trace：按需设置 `QTS_TRACE_ENABLED=1`，并用 `QTS_TRACE_LEVEL` 与 `QTS_TRACE_*` 分类缩小输出。

---

## 维护建议：新增语法/新增 fixtures 时的对齐流程

1. 先用 `pnpm -s compare <fixture>` 观察 bytecode/atoms/pc2line 的差异类型。
2. 如果是 pc2line 差异，优先审查 `emit_source_pos` 的绑定点与去重。
3. 如果是 atom/常量池差异，优先审查“是否在 TS 侧漏掉/提前插入了某些 atom”。
4. 必要时启用 QuickJS trace，将 QuickJS 的 `emit_op/emit_source_pos` 输出与 TS 编译器的 emit 轨迹对齐。

---

## 9. 全量 fixtures 覆盖索引（84/84）

下面按语法域分组列出本仓库全部 `.ts` fixtures（用于保证“全量视角”覆盖，而不是只盯某一个用例）。

### 数组
- `__tests__/fixtures/array-literal.ts`
- `__tests__/fixtures/array-nested.ts`
- `__tests__/fixtures/array-spread.ts`

### 对象/属性
- `__tests__/fixtures/object-literal.ts`
- `__tests__/fixtures/object-methods.ts`
- `__tests__/fixtures/object-nested.ts`
- `__tests__/fixtures/object-spread.ts`
- `__tests__/fixtures/computed-property.ts`
- `__tests__/fixtures/delete-prop.ts`

### 解构
- `__tests__/fixtures/destructuring-nested.ts`
- `__tests__/fixtures/destructuring-rest-defaults.ts`
- `__tests__/fixtures/for-of-destructuring.ts`

### 函数/闭包
- `__tests__/fixtures/arrow-fn-basic.ts`
- `__tests__/fixtures/arrow-fn-complex.ts`
- `__tests__/fixtures/function-call.ts`
- `__tests__/fixtures/function-default-params.ts`
- `__tests__/fixtures/function-expressions.ts`
- `__tests__/fixtures/closure-basic.ts`
- `__tests__/fixtures/closure-short.ts`
- `__tests__/fixtures/closure-stress.ts`
- `__tests__/fixtures/closure-vars.ts`

### 类（含 private/static）
- `__tests__/fixtures/class-basic.ts`
- `__tests__/fixtures/class-methods.ts`
- `__tests__/fixtures/class-accessors.ts`
- `__tests__/fixtures/class-inheritance.ts`
- `__tests__/fixtures/class-field-initializers.ts`
- `__tests__/fixtures/class-private-fields.ts`
- `__tests__/fixtures/class-private-accessors.ts`
- `__tests__/fixtures/class-static-block.ts`
- `__tests__/fixtures/class-static-private-fields.ts`
- `__tests__/fixtures/class-static-private-accessors.ts`
- `__tests__/fixtures/private-method-basic.ts`
- `__tests__/fixtures/static-private-method-basic.ts`
- `__tests__/fixtures/private-in-operator.ts`

### 可选链/可选调用
- `__tests__/fixtures/optional-chaining.ts`
- `__tests__/fixtures/optional-chaining-nested.ts`
- `__tests__/fixtures/optional-chaining-delete.ts`
- `__tests__/fixtures/optional-chain-call.ts`

### 逻辑/空值合并
- `__tests__/fixtures/logical-operators.ts`
- `__tests__/fixtures/logical-assignment.ts`
- `__tests__/fixtures/nullish-coalescing.ts`
- `__tests__/fixtures/nullish-assignment.ts`

### 运算符与一元/二元
- `__tests__/fixtures/unary-ops.ts`
- `__tests__/fixtures/prefix-unary.ts`
- `__tests__/fixtures/postfix-unary.ts`
- `__tests__/fixtures/binary-ops.ts`
- `__tests__/fixtures/comparison-ops.ts`
- `__tests__/fixtures/bitwise-ops.ts`
- `__tests__/fixtures/exponentiation-ops.ts`
- `__tests__/fixtures/exponentiation-assignment.ts`

### 控制流
- `__tests__/fixtures/if-else.ts`
- `__tests__/fixtures/conditional-operator.ts`
- `__tests__/fixtures/switch-case.ts`
- `__tests__/fixtures/switch-default-first.ts`
- `__tests__/fixtures/switch-default-middle.ts`
- `__tests__/fixtures/switch-fallthrough.ts`
- `__tests__/fixtures/while.ts`
- `__tests__/fixtures/do-while.ts`
- `__tests__/fixtures/do-while-break.ts`
- `__tests__/fixtures/for-loop.ts`
- `__tests__/fixtures/for-of.ts`
- `__tests__/fixtures/loop-break-continue.ts`
- `__tests__/fixtures/labeled-statements.ts`

### 异常处理
- `__tests__/fixtures/try-catch.ts`
- `__tests__/fixtures/try-catch-finally.ts`
- `__tests__/fixtures/try-finally-basic.ts`
- `__tests__/fixtures/optional-catch-binding.ts`

### 异步/生成器
- `__tests__/fixtures/async-await.ts`
- `__tests__/fixtures/for-await-of.ts`
- `__tests__/fixtures/async-generator-basic.ts`

### 字面量/数值/BigInt
- `__tests__/fixtures/primitives.ts`
- `__tests__/fixtures/number.ts`
- `__tests__/fixtures/numeric-separators.ts`
- `__tests__/fixtures/bigint-numeric-separators.ts`
- `__tests__/fixtures/bigint-exponentiation.ts`
- `__tests__/fixtures/es2020_bigint.ts`
- `__tests__/fixtures/es2020_bigint_large.ts`

### 字符串/模板
- `__tests__/fixtures/template-literals.ts`

### 变量/作用域
- `__tests__/fixtures/variables-var.ts`
- `__tests__/fixtures/variables-let-block.ts`

### 其他（回归基线/调试）
- `__tests__/fixtures/compute.ts`
- `__tests__/fixtures/console-log.ts`
- `__tests__/fixtures/debug-info-basic.ts`
- `__tests__/fixtures/empty.ts`
