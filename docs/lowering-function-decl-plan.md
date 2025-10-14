# `StatementLowerer` 函数声明与 Annex B 处理蓝图

> 目标：复刻 QuickJS `js_parse_function_decl2`/`define_func` 及 Annex B.3.3/3.4 允许的块级函数声明行为，使 TypeScript 侧 `StatementLowerer` 在 `if`、`block` 等结构中生成与 QuickJS 等价的函数绑定与重绑定逻辑。

## 1. QuickJS 参考路径

- `js_parse_function_decl2` 与裹挟的 `add_func_var`、`add_func_arg` 用于创建 `JSFunctionDef`、注册参数、捕获外部变量。
- `define_func`、`define_var`：将函数名绑定到当前或父作用域插槽（非严格模式下允许提升到变种作用域）。
- `DECL_MASK_FUNC`、`DECL_MASK_FUNC_WITH_LABEL`：控制单语句上下文是否允许函数声明（Annex B 入口）。
- `js_parse_statement_or_decl` 中 `TOK_IF`、`TOK_BLOCK` 分支：推入临时 scope、根据 `mask` 决定是否允许函数声明，并在 `pop_scope` 前调用 `add_hoisted_definitions` 将 Annex B 函数重新绑定。

## 2. QuickJS 行为拆解

1. **严格模式 vs. 非严格模式**：
   - 严格模式：块级函数声明非法；QuickJS 直接报错。
   - 非严格模式：允许函数声明，但需遵循 Annex B 重绑定。
2. **Scope 处理**：
   - 进入 `if`/`block` 时 `push_scope` 创建词法作用域。
   - 声明 `function f(){}` 时先在当前 scope 注册 `let` 风格 binding（写入函数对象）。
   - 若满足 Annex B 条件，则在 `pop_scope` 时调用 `add_hoisted_definitions` 再次向 var 作用域 `define_var`，确保 `let f; if (...) function f(){}` 执行后 `f` 可见。
3. **字节码生成**：
   - 函数体编译为子 `JSFunctionDef`，生成 `OP_closure`（或 `OP_fclosure`）并写入常量池。
   - 存入作用域时使用 `OP_scope_put_var_init`（初始声明）或 `OP_scope_put_var`（再赋值）。

## 3. TypeScript 对应设计

| QuickJS 流程 | TypeScript 对应 | 备注 |
|---------------|-----------------|------|
| `js_parse_function_decl2` | 新建 `FunctionLowerer`（或在 `ExpressionLowerer.emitFunctionExpression` 复用） | 返回 `OperandRef` 指向函数对象常量 |
| `define_func` + `define_var` | `ScopeManager.declare(name, 'function')` / `declareAnnexB` | 需要扩展 `ScopeManager`，记录 Annex B 待提升队列 |
| `add_hoisted_definitions` | 新增 `ScopeManager.popFunctionDeclarations()` | 在 `StatementLowerer.leaveScope` 触发第二次写入 |
| `emit_op(OP_scope_put_var[_init])` | `BytecodeEmitter.storeBinding` | 复用既有接口 |
| `mask` 控制 | `StatementLowerer` 维护 `declMask` | 和 `LoweringContext` 一起传递严格模式/Annex B 许可信息 |

## 4. 实现步骤

1. **扩展上下文/作用域管理**：
   - 在 `LoweringContext` 引入 `CompilationMode`（strict / non-strict）。
   - `ScopeManager` 增加：
     - `beginFunctionDeclaration(scopeNode, name, isAnnexB)`：记录待重绑定列表。
     - `popFunctionDeclarations()`：返回需要在父作用域执行的再绑定条目。
   - `ScopeFrame` 结构新增 `hoistedFunctions: BindingInfo[]`。
2. **`StatementLowerer.emitFunctionDeclaration`**：
   - 解析 `ts.FunctionDeclaration`，调用 `FunctionLowerer` 生成子函数 `OperandRef`。（**当前进度**：`FunctionLowerer` 已创建 `BasicFunctionIR`、派生子函数严格模式、为标识符参数登记 `param` 绑定并记录默认值/剩余参数占位（`OP_param_default_pending`、`OP_param_rest_pending`）写入 `FunctionIR.parameters`，随后发出 `OP_make_closure` 注册到 `nestedFunctions`；下一步填充真实函数体、解构参数及默认值求值实现。）
   - 将函数对象写入当前 scope（`storeBinding` with `init`）。
   - 若当前上下文允许 Annex B（非严格 + mask 包含 `allowFunctions`）则调用 `ScopeManager.registerAnnexB(binding)`。
3. **scope 结束时的 Annex B 再绑定**：
   - 在 `emitBlock`/`emitIfStatement` 的 `finally` 中，调用 `scope.leave(node)` 前或后 `ScopeManager.popFunctionDeclarations()`。
   - 对返回的 `BindingInfo` 列表，再次写入 `storeBinding`（`mode: 'assign'`）指向相同函数对象。
4. **DeclMask 管理**：
   - 新建 `DeclContext`（类似 QuickJS `decl_mask`），标记当前语句是否允许函数声明。
   - `emitIfStatement` 在非严格模式下向 then/else 递归传入包含 Annex B 许可的上下文。
5. **Fixture 设计**：
   - `__tests__/compiler/fixtures/annex-b-fn.ts`
     ```ts
     function outer() {
       let tag = 'init'
       if (true) {
         tag = f()
         function f() { return 'inner' }
       }
       return typeof f === 'function' && tag
     }
     export default outer()
     ```
   - 预期：QuickJS 与 TS 编译器输出一致，`f` 在 `if` 外仍可访问。

## 5. 后续依赖

- `FunctionLowerer` 尚未实现；需先提供最小版支持 FunctionDeclaration/Expression。
- `ScopeManager.requiresReference` 与闭包捕获将在后续任务补全。
- 上述功能完成后，才能继续 LoopEmitter 与 `Opcode` 枚举对齐。
