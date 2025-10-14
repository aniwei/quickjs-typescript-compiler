# Lowering 任务清单

参考 `docs/quickjs-bytecode-ts-plan.md` 第 10-11 节与新建的 `src/compiler/lowering` 目录，逐步实现 QuickJS 前端到 TypeScript 的降级逻辑。每个条目紧贴 QuickJS 对应函数族，完成后应在此文档打勾，同时保持与 `TODO.md` 总路线的一致性。

> **验收要求**：每次勾选前必须补充或更新至少一个 fixture（位于 `__tests__/compiler/fixtures`）并使用 `pnpm -s compare:fixtures` 校验字节码输出与 QuickJS 基准一致；若新增语义较小，可在既有 fixture 上追加断言并记录到提交说明中。

## StatementLowerer
- [x] 建立 `StatementLowerer.emitStatement` 分派结构，覆盖 QuickJS `js_parse_statement_or_decl` 的语句种类，需严格对齐 QuickJS 转译流程。
- [x] 复刻表达式语句尾部的 `OP_drop`（对应 QuickJS `emit_op(OP_drop)`），在 `consumeResult` 中实现，需严格对齐 QuickJS 转译流程。
- [x] 实现块语句 `emitBlock`（映射 QuickJS `js_parse_block`，维护 `ScopeManager` 进入/退出），需严格对齐 QuickJS 转译流程。
- [ ] 实现变量声明 `emitVariableStatement` 与 `emitDeclarationBinding`（映射 QuickJS `js_parse_var` + `define_var` 流程，需附 fixture 验证，实施前参考 `docs/lowering-variable-plan.md`；基础标识符路径已完成，解构支持覆盖对象/数组基本形态，`rest`/默认值/引用写回仍待补充），需严格对齐 QuickJS 转译流程。
- [ ] 实现 `emitIfStatement` 控制流（映射 QuickJS `js_parse_if`；基础 `OP_if_false`/`OP_goto` 流程已落地，并已接入初级类型事实缩窄；**当前进度**：已在作用域退出时刷写 Annex B 重新绑定队列，下一步补齐函数主体再绑定与 fixture 验证；Annex B 函数声明处理需按照 `docs/lowering-function-decl-plan.md` 落实），需严格对齐 QuickJS 转译流程。
- [ ] 引入函数声明降级与 Annex B 兼容（参考 QuickJS `js_parse_function_decl2`，详见 `docs/lowering-function-decl-plan.md`；**当前进度**：`FunctionLowerer` 已生成子 `BasicFunctionIR`、派生子函数严格模式、为标识符参数登记到 `FunctionIR.parameters` 并对默认值/剩余生成占位指令，随后发出 `OP_make_closure`；函数声明写入当前作用域且按需登记 `registerAnnexB`；下一步降级真实函数体及解构参数并补充 fixture 校验），需严格对齐 QuickJS 转译流程。
- [ ] 实现 `emitSwitch`，含 `case` label 回填（映射 QuickJS `js_parse_switch`），需严格对齐 QuickJS 转译流程。
- [ ] 实现 `emitBranch` 处理 `break/continue`（映射 QuickJS `emit_break`），需严格对齐 QuickJS 转译流程。
- [ ] 实现 `emitReturn`，根据函数类型选择 `OP_return/OP_return_async`（映射 QuickJS `emit_return`），需严格对齐 QuickJS 转译流程。

## ExpressionLowerer
- [ ] 实现逗号、逻辑、空值合并表达式（对应 QuickJS `js_parse_expr2`/`js_parse_logical_and_or`/`js_parse_coalesce_expr`），需严格对齐 QuickJS 转译流程。
- [ ] 实现算术与比较表达式（对应 QuickJS `js_parse_expr_binary`），需严格对齐 QuickJS 转译流程。
- [ ] 实现条件表达式（对应 QuickJS `js_parse_cond_expr`），需严格对齐 QuickJS 转译流程。
- [ ] 实现一元/后缀运算与左值加载（对应 QuickJS `js_parse_unary`/`js_parse_postfix_expr`），需严格对齐 QuickJS 转译流程。
- [ ] 实现调用与构造（对应 QuickJS `js_parse_call`, `js_parse_new` 相关分支），需严格对齐 QuickJS 转译流程。
- [ ] 实现对象/数组字面量、模板字符串降级（对应 QuickJS `js_parse_object_literal`、`js_parse_array_literal`、`js_parse_template`），需严格对齐 QuickJS 转译流程。
- [ ] 实现 `emitFunctionExpression`，构建子 `FunctionIR` 并注册常量池（对应 QuickJS `js_parse_function_decl2`/`js_create_function`），需严格对齐 QuickJS 转译流程。

## LValueBuilder & DestructuringLowerer
- [ ] 补齐 `LValueBuilder.build`，支持局部变量、参数、闭包变量、属性访问等（对应 QuickJS `get_lvalue`），需严格对齐 QuickJS 转译流程。
- [ ] 实现 `emitAssignment`/`emitDelete`，复刻 `put_lvalue` 与 `OP_delete` 序列，需严格对齐 QuickJS 转译流程。
- [ ] 在 `DestructuringLowerer.emitBinding` 中复刻数组、对象解构（对应 QuickJS `js_parse_destructuring_element`），需严格对齐 QuickJS 转译流程。

## LoopEmitter
- [ ] 实现 `emitWhile`/`emitDoWhile` (`js_parse_while`/`js_parse_do`)，需严格对齐 QuickJS 转译流程。
- [ ] 实现传统 `for` 循环与增量块搬移（`js_parse_for`），需严格对齐 QuickJS 转译流程。
- [ ] 实现 `emitForInOf`，覆盖 `for-in`/`for-of`/`for-await-of` 三类（`js_parse_for_in_of`），需严格对齐 QuickJS 转译流程。

## ExceptionEmitter
- [ ] 实现 `emitTryStatement`（`js_parse_try`），含 `catch`/`finally` 流程，需严格对齐 QuickJS 转译流程。
- [ ] 实现 `emitThrowStatement`（`emit_throw`），需严格对齐 QuickJS 转译流程。

## LoweringContext & IR
- [ ] 在 `FunctionIR` 中补齐块/指令写入实现，支持 label 回填与 `StackAnalyzer` 所需信息，需严格对齐 QuickJS 转译流程。
- [ ] 在 `BytecodeEmitter`/`ScopeManager` 的具体实现中对接 QuickJS 结构（落地在后续 PR 中），需严格对齐 QuickJS 转译流程。

> 更新流程：每当完成上述条目之一，先提交实现，再勾选对应任务，保持代码与 TODO 文档同步。
