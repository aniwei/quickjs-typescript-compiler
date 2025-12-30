# Fixtures 覆盖矩阵（按 QuickJS 语法域）

目标：`__tests__/fixtures/*.ts` 覆盖尽量多的 QuickJS 编译路径，并且所有 fixtures 都必须通过 `pnpm -s compare:fixtures`（bytecode + trace 差异为 0）。

本清单的侧重点是：
- 当前 fixtures 已覆盖的语法域
- 明确缺口（但只有在 TS 侧已实现/准备实现时才新增 fixture）

> QuickJS 源码以 vendored 路径为准：`third_party/QuickJS/src/core/parser.c`

---

## 已覆盖（代表性）

- 变量/作用域/闭包：`variables-var.ts`、`variables-let-block.ts`、`closure-*.ts`
- 控制流（if/switch/loop/try）：`if-else.ts`、`switch-*.ts`、`while.ts`、`do-while*.ts`、`for-loop.ts`、`loop-break-continue.ts`、`try-*.ts`
- `for-of` / `for-await-of`：`for-of.ts`、`for-of-destructuring.ts`、`for-await-of.ts`
- `for-in`：`for-in.ts`
- 运算符与赋值：`unary-ops.ts`、`binary-ops.ts`、`comparison-ops.ts`、`logical-operators.ts`、`logical-assignment.ts`、`nullish-*.ts`、`exponentiation-*.ts`
- 对象/数组/解构：`object-literal.ts`、`object-spread.ts`、`array-*.ts`、`destructuring-*.ts`
- 类（含 private/static）：`class-*.ts`、`class-private-*.ts`、`class-static-*.ts`
- 可选链：`optional-chaining*.ts`、`optional-chain-call.ts`
- 模板字符串：`template-literals.ts`
- 异步/生成器：`async-await.ts`、`async-generator-basic.ts`

---

## 新增的“复杂组合”fixtures

这些用例不是为了覆盖新语法，而是为了覆盖 QuickJS 中更复杂的 lowering 组合路径：
- `complex-control-flow.ts`：labeled loop + switch + try/finally + continue/break 组合
- `complex-class-optional.ts`：class(private+static block) + optional chaining + ?? + logical assignment 组合
- `complex-async-flow.ts`：async generator + for-await-of + try/finally + continue 组合

---

## 明确缺口（暂不加 fixture，除非先实现）

- RegExp 字面量：QuickJS 侧有 `js_parse_regexp`，但 TS 侧目前未看到对应实现入口（先实现再加 fixture）。
- 其他未实现语法：以 `docs/TRANSPILATION_SPEC.md` 中标注的“未实现/Unsupported”为准（例如 `with` 语句）。
