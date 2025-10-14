# `StatementLowerer.emitVariableStatement` 实现蓝图

> 本笔记拆解 QuickJS `js_parse_var`/`define_var`/`emit_op(OP_scope_put_var[_init])` 流程，明确 TypeScript 侧实现与字节码生成的严格映射关系。所有步骤完成后需配套 fixture（建议 `__tests__/compiler/fixtures/var-basic.ts`）并通过 `pnpm -s compare:fixtures` 校验。

## 1. QuickJS 参考路径
-
- `js_parse_var`（`third_party/QuickJS/src/core/parser.c` 第 ~7000 行）：解析 `var/let/const` 声明列表。
- `js_define_var` / `define_var`：根据变量类别将 binding 注册到 `JSFunctionDef`。
- `need_var_reference`：在 `with` 等场景下强制变量以引用形式存在。
- `emit_op(OP_scope_put_var[_init])`：初始化或赋值局部/作用域变量。
- `js_parse_destructuring_element`：处理解构赋值。

## 2. QuickJS 流程拆解

1. **遍历声明列表**：循环解析 `BindingElement`，逗号分隔。
2. **标识符分支**：
   - 校验保留字/`let` 限制。
   - 调用 `js_define_var` 注册 binding，内部决定目标 scope & slot。
   - 若 export 标记，写入模块导出表。
   - 如果存在 `=` 初始值：
     - `need_var_reference` 为 true 时，先 `OP_scope_get_var` 取引用，再走 `get_lvalue` / `put_lvalue`。
     - 否则直接编译表达式，并基于 `let/const/var` 选择 `OP_scope_put_var_init` 或 `OP_scope_put_var`。
   - `const` 无初始值时报错；`let` 无初始值得先写入 `undefined` + `OP_scope_put_var_init`。
3. **解构分支**：
   - `emit_op(OP_undefined)` 预推默认值。
   - 调用 `js_parse_destructuring_element`，内部保证 `let/const` 初始化规则。
4. **循环尾处理**：遇到 `,` 继续；否则退出。

## 3. TypeScript 对应设计

| QuickJS 调用 | TypeScript 类/方法 | 备注 |
|--------------|--------------------|------|
| `js_parse_var` | `StatementLowerer.emitVariableStatement` | 驱动顶层循环与 export 标记；遍历 `ts.VariableDeclarationList` |
| `js_define_var` | `ScopeManager.declare(name, kind)` | 返回 binding 句柄（需扩展接口含 slot、lexical 信息） |
| `need_var_reference` | `ScopeManager.requiresReference(name)` | 结合 `with`/`eval` 等 state |
| `get_lvalue`/`put_lvalue` | `LValueBuilder.build`/`emitAssignment` | 处理引用赋值场景 |
| `js_parse_destructuring_element` | `DestructuringLowerer.emitBinding` | 进入前压入 `undefined`，根据 bindingKind 选择指令 |
| `emit_op(OP_scope_put_var[_init])` | `BytecodeEmitter.emitOp('OP_scope_put_var[_init]', [...])` | 结合 binding slot、scope depth |

## 4. 实现步骤

1. **扩展 `ScopeManager.declare`**：返回结构包含 `slot: number`, `scopeDepth: number`, `kind: BindingKind`, `needsInit: boolean`。若 QuickJS 规则触发错误（如重复定义）应抛异常。
2. **更新 `StatementLowerer.emitVariableStatement`**：
   - 映射 `ts.VariableDeclarationList.declarations` → QuickJS 循环。
   - 根据 `node.flags` 设置 `bindingKind` (`var`/`let`/`const`)。
   - 对每个 `VariableDeclaration` 调用 `emitDeclarationBinding`。
3. **实现 `emitDeclarationBinding`**：
   - 区分 `ts.Identifier` 与 `ts.BindingPattern`。
   - 标识符流程：
     1. `const` + 无 initializer → 抛错。
     2. 调用 `scope.declare` 获取 binding meta。
     3. 若有 initializer：
        - 若 `scope.requiresReference` → 构建 LValue 引用（`LValueBuilder.build`），编译表达式，调用 `emitAssignment`。
        - 否则编译表达式并调用 `emitStoreToBinding`（新 helper）写入 `OP_scope_put_var` 或 `OP_scope_put_var_init`。
     4. `let` 未初始化 → 推 `undefined` + `OP_scope_put_var_init`。
   - 解构流程：
     1. `scope.declarePattern`（后续需在 `ScopeManager` 中实现）注册所有 binding。
     2. 若无 initializer 且 kind 为 `const` → 抛错。
     3. 若有 initializer：编译表达式；否则推 `undefined`。
     4. 调用 `destructuring.emitBinding(pattern, value, { bindingKind, isArgument: false, allowInitializer: true })`。
4. **辅助方法 `emitStoreToBinding`**：根据 binding meta 调用 `bytecode.emitOp` 写 `OP_scope_put_var(_init)` 并写入 atom/level。当前 IR 实现中以 `IRBytecodeEmitter.storeBinding` 封装。
5. **析构支持**：初步实现 `DestructuringLowerer.emitBinding`，支持对象/数组基础模式；`rest`、默认初始值、计算属性仍待补充，需要相应指令（`OP_array_rest` 等）并依赖 `ExpressionLowerer` 执行默认表达式。
6. **Fixture 设计**：
   - `var-basic.ts`（已添加至 `__tests__/compiler/fixtures`）：
     ```ts
     var a = 1;
     let b;
     const c = 2;
     ```
   - 比对期望：
     - `var` 使用 `OP_scope_put_var`。
     - `let` 无初始值 → `OP_undefined` + `OP_scope_put_var_init`。
     - `const` + 初始值 → `OP_scope_put_var_init`。
7. **验证**：执行 `pnpm -s compare:fixtures -- --filter var-basic` 并确认无差异。

## 5. 残余问题

- `need_var_reference`/`with` 语义依赖后续 `ScopeManager` 状态机。
- `export`/`module` 语义需在模块模式中补齐。
- `eval`/`arguments` 捕获需与 `VarResolver` 协同。

> 完成上述实现并通过 fixture 校验后，可勾选 `docs/lowering-todo.md` 中相应条目。若遇到 QuickJS 行为与 TypeScript AST 不一致的情况，需在文档中补充分支说明。