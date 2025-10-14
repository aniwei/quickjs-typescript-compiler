# QuickJS 字节码 TypeScript 迁移技术方案

## 1. 背景与目标
- 对 `third_party/QuickJS/src/core` 中的字节码生成逻辑进行函数级拆解，排除词法、语法解析部分。
- 在 TypeScript 侧以类（class）为组织形式重写相同的流程，保持 QuickJS 字节码格式与运行时兼容。
- 为关键 C 函数提供逐个流程图，作为 TypeScript 实现的蓝图。

## 2. TypeScript 类设计摘要
- `BytecodeBuffer`：封装指令写入、源位置行列信息维护，对应 `emit_u8/emit_op/emit_atom/emit_source_pos` 逻辑。
- `AtomTable`：管理原子重用与引用计数，对应 `emit_atom` 与常量池管理。
- `InlineCacheTable`：抽象 `emit_ic` 逻辑及内联缓存槽的生成。
- `LabelManager`：提供标签分配、引用计数与地址回填，对应 `new_label_fd/emit_label/emit_goto/update_label`。
- `ConstantPool`：维护 `cpool_add` 和常量推入操作，支持序列化为 QuickJS 常量池结构。
- `ScopeManager`：处理 `push_scope/pop_scope/close_scopes` 与变量、闭包、全局绑定。
- `VarResolver`：实现 `find_var/define_var/resolve_variables` 等变量解析阶段。
- `LabelResolver`：实现 `resolve_labels` 的跳转优化与调试信息压缩。
- `StackAnalyzer`：实现 `compute_stack_size`，计算最大栈深度。
- `FunctionAssembler`：对标 `js_create_function`，汇聚常量池、变量定义、闭包变量与最终字节码缓冲，输出 `JSFunctionBytecode` 兼容对象。

## 3. TypeScript 中间表示（IR）定义
- `FunctionIR`：描述单个函数的高阶结构，包含 `id`、`parentId`、`funcKind`、`flags`、`parameters`、`bodyBlocks`、`scopeGraph`、`typeEnvironment` 等字段。
- `BlockIR`：基本块结构，包含 `label`、`pred/succ`、`opcodeList`、`phiNodes`、`blockKind`（普通、异常、finally、generator checkpoint）。
- `InstructionIR`：统一指令格式，字段包括 `op`、`operands`、`result`、`sourceSpan`、`tsType`、`deoptLabel`。
- `OperandRef`：引用常量、临时寄存器、局部变量、闭包变量或常量池索引。
- `ScopeIR`：词法作用域树节点，跟踪捕获变量、可见性、标记 `ScopeKind`（函数体、块、循环、catch、class、module）。
- `ClosureCapture`：记录捕获变量来源（本地、祖先、全局）与捕获方式（by value/by ref）。
- `TypeFacts`：与 TypeScript 类型系统对接的事实表，为每条指令提供约束（例如 `mustBeNumber`、`mayBeUndefined` 等）。
- `IRMetadata`：聚合 `pc2line`、`pc2column`、`inlineCacheSlots`、`diagnostics` 等额外信息。

### 3.1 IR 生成流程概览
```
TypeScript AST -> (Semantic Pass) SymbolTable + TypeChecker
              -> (Lowering Pass) FunctionIR 构建
              -> (Block Builder) 基本块切分，插入控制流边
              -> (Type Refinement) 结合类型系统写入 TypeFacts
              -> (Emit Pass) 转换为 QuickJS BytecodeBuffer
```

- **Semantic Pass**：利用 TS Compiler API 获取 `TypeChecker`、`Symbol`、`Type`，记录节点映射。
- **Lowering Pass**：遍历语句 AST，根据控制流创建 `BlockIR`，为表达式生成 `InstructionIR`，同时填充 `ScopeIR`。
- **Type Refinement**：对 `if`、`switch`、`typeof`、`instanceof` 等语句提炼类型事实，写入 `TypeFacts`，支持后续优化。
- **Emit Pass**：将 `InstructionIR` 按块顺序线性化，映射为 QuickJS 指令序列，交给 `VarResolver`、`LabelResolver`。

## 4. 表达式与语句降级流程

### 4.1 表达式类别

| AST 节点 | IR 生成策略 | 字节码序列要点 |
|----------|-------------|----------------|
| `Identifier` | 查找 `ScopeIR` 中绑定，生成 `LOAD_LOCAL/LOAD_ARG/LOAD_CLOSURE/LOAD_GLOBAL` | 对应 `OP_get_loc`/`OP_get_arg`/`OP_get_var_ref`/`OP_get_var` |
| `Literal` | 常量池插入或短指令 | 数字字面量优先 `OP_push_i8/i16/i32`，字符串尝试 `AtomTable` 共用 |
| `BinaryExpression` | 按操作符映射 IR：`Add`、`Sub` 等 -> `BINARY_OP`，比较 -> `COMPARE_OP` | 根据操作符选择 `OP_add`、`OP_sub` 等，结合类型事实决定是否插入显式转换 |
| `LogicalExpression` | 短路构造基本块：`lhs` 计算后条件跳转 | 使用 `LabelManager` 创建跳转，`VarResolver` 合并结果 |
| `ConditionalExpression` | 生成 `cond`、`consequent`、`alternate` 三个块 | 最终合并到同一 `tmp` 寄存器 |
| `CallExpression` | 处理 `callee`、参数求值、spread 展开 | 根据 call 类型选 `OP_call`/`OP_call_method`/`OP_apply_eval`；类型信息可推进 inline cache |
| `NewExpression` | 与 Call 类似，额外注入构造器处理 | `OP_new` 或 `OP_call_constructor` |
| `ArrowFunction` | 生成子 `FunctionIR` 并存入常量池 | `FunctionAssembler` 递归处理，插入 `OP_closure_make` |
| `ObjectLiteral` | 逐属性生成 `OP_put_field` 或 `OP_define_field` | 对 computed key 尝试提前计算，常量 key 用 atom |
| `ArrayLiteral` | 预分配长度并逐项写入 | `OP_array_from` + `OP_put_array_el` |
| `AssignmentExpression` | 区分简单/解构，基于目标写不同指令 | 结合类型事实避免重复类型检查 |
| `YieldExpression`/`AwaitExpression` | 标记生成器/异步函数，插入状态机节点 | `OP_yield`、`OP_await`，并与 `BlockIR` 的暂停点对齐 |
| `TemplateExpression` | 转换为字符串拼接调用 | 类型系统用于确定最终类型 |

### 4.2 语句类别

| AST 节点 | 控制流与 IR 方案 | 字节码序列 |
|----------|------------------|-------------|
| `BlockStatement` | 为子语句维护 `ScopeIR`，顺序发射 | `ScopeManager.enter/leave` 对应 `OP_enter_scope/OP_leave_scope` |
| `VariableStatement` | 依据声明类型调用 `ScopeManager.declare`，若带初始值生成赋值指令 | 对 `const` 检查必须初始化，再转换为 `OP_put_loc` 等 |
| `IfStatement` | 构造条件块与分支块，记录类型缩窄信息 | 使用 `LabelManager` 创建真/假跳转，`TypeFacts` 保存 guard 信息 |
| `SwitchStatement` | 生成判定块 + case 块 + default | 若 case 常量可快速比较，利用 type narrowing 优化 string/number 案例 |
| `For/While/DoWhile` | 维护循环入口、条件、步进块；处理 `continue`/`break` | `LabelManager` 管理 loop label，生成 `OP_goto`/`OP_if_false` |
| `ForOf/ForIn` | 使用迭代器协议指令，创建异常块处理 | 对于数组类型（来自 TypeFacts）可改用 `OP_for_of_fast_array` 优化路径 |
| `TryCatchFinally` | 生成 try、catch、finally 基本块，填充异常跳转 | `LabelResolver` 负责 `OP_catch`、`OP_finally_end` 等指令回填 |
| `ReturnStatement` | 表达式求值后调用 `OP_return`/`OP_return_undef` | 对 async 函数使用 `OP_return_async` |
| `ThrowStatement` | 直接 `OP_throw`，保留 source map 信息 | 类型事实可决定是否需要包装 Error |
| `ClassDeclaration` | 构建 `ClassIR`，处理基类、字段、静态块 | 字节码包含 `OP_class_start`、`OP_define_field`、`OP_class_end` |
| `Import/Export`（模块） | 通过 Module IR 记录，最终映射 `OP_import`/`OP_export` | 需要与 `module.c` 结构保持一致 |

## 5. TypeScript 类型驱动的字节码优化

- **数值运算专化**：当 `TypeFacts` 指出操作数为 `number`，选择 `OP_add`、`OP_mul` 等不带 ToNumber 转换的快速路径；否则退回通用序列。
- **字符串拼接内联**：类型系统确认两端为 `string`，直接调用 `OP_add` 字符串实现，减少 `toString` 逻辑。
- **Nullable 消解**：在控制流中确认变量非 `null/undefined` 后，后续块生成的 `LOAD` 指令可省略显式 `OP_is_null_or_undef` 检测。
- **对象属性访问缓存**：通过类型检查判断对象类型（接口/类），提前建立固定 shape，映射到 `OP_get_field` + 内联缓存槽，降低原型链查找成本。
- **数组快速路径**：若数组类型标记为 `number[]`、`string[]` 等，生成 `OP_array_unrolled`、`OP_for_of_fast_array`。
- **常量折叠**：借助 TypeScript 编译器的字面量类型执行在编译期求值，直接落入 `ConstantPool`。
- **分支消解**：在类型窄化后判定分支恒真/恒假，可跳过不可能的 `BlockIR`。
- **非抛异常推断**：当 TypeChecker 确认调用不会 throw，可移除 `try` 包裹以及栈追踪指令。
- **Enum Switch 优化**：枚举类型 switch 转换为跳表（Dense map），减少比较次数。

## 6. 函数级拆解（含流程图与 TypeScript 迁移要点）

### 6.1 `emit_u8` / `emit_u16` / `emit_u32`
- 功能：向当前函数 `byte_code` 动态缓冲写入定长整数，并记录调试 trace。
- 流程图：
```
+-------------------------+
| emit_uX 调用入口        |
+-------------------------+
           |
           v
+-------------------------+
| dbuf_put*(byte_code)    |
+-------------------------+
           |
           v
+-------------------------------+
| 若存在 cur_func -> 记录 trace |
+-------------------------------+
```
- TypeScript 方案：`BytecodeBuffer.writeU8/U16/U32` 方法封装写入与可选日志，通过构造函数注入 trace 回调。

### 6.2 `emit_source_pos`
- 功能：在行号发生变化时插入 `OP_line_num` 元信息。
- 流程图：
```
+-----------------------------+
| emit_source_pos 调用入口    |
+-----------------------------+
           |
           v
+-------------------------------+
| 比较 last_opcode_source_ptr  |
+-------------------------------+
      |否                           |是
      v                             v
+------------------------------+  +------------------------------+
| emit OP_line_num 与位置偏移 |  | 不写入任何内容             |
+------------------------------+  +------------------------------+
```
- TypeScript 方案：`BytecodeBuffer.noteSource(ptr)`，内部维护上一次源位置，必要时写入调试指令并更新缓存。

### 6.3 `emit_op`
- 功能：记录最后 opcode 位置并写入操作码。
- 流程图：
```
+--------------------+
| emit_op 调用入口  |
+--------------------+
          |
          v
+------------------------------+
| 记录 last_opcode_pos         |
+------------------------------+
          |
          v
+------------------------------+
| dbuf_putc(当前 opcode)       |
+------------------------------+
```
- TypeScript 方案：`BytecodeBuffer.emitOp(opcode)` 保存 last opcode 偏移，为 `js_is_live_code` 等检查提供支持。

### 6.4 `emit_atom`
- 功能：向指令流写入原子 ID，并保证引用计数；可输出 trace。
- 流程图：
```
+--------------------+
| emit_atom 入口    |
+--------------------+
          |
          v
+------------------------------+
| 确保缓冲区扩容成功           |
+------------------------------+
          |
          v
+------------------------------+
| 写入 JS_DupAtom(name)        |
+------------------------------+
          |
          v
+------------------------------+
| 可选 trace 输出              |
+------------------------------+
```
- TypeScript 方案：`AtomTable` 负责 `dup`/`free`，`BytecodeBuffer.emitAtom(atomId)` 仅处理缓冲，日志由 `AtomTable` 提供。

### 6.5 `emit_ic`
- 功能：为属性访问添加内联缓存槽。
- 流程图：
```
+--------------------+
| emit_ic 入口      |
+--------------------+
          |
          v
+--------------------------------+
| 调用 add_ic_slot1(closure,atom)|
+--------------------------------+
          |
          v
+------------------------------+
| 可选 trace 输出              |
+------------------------------+
```
- TypeScript 方案：`InlineCacheTable.reserveSlot(atomId)` 返回槽位 ID，`BytecodeEmitter` 在生成相应指令时写入槽位引用。

### 6.6 `new_label_fd` / `emit_label` / `emit_goto`
- 功能：分配标签、记录位置、生成跳转并维护引用计数。
- 流程图：
```
+------------------+
| new_label_fd     |
+------------------+
          |
          v
+------------------------------+
| resize label_slots 并初始化  |
+------------------------------+

+------------------+
| emit_label       |
+------------------+
          |
          v
+------------------------------+
| emit OP_label + label id     |
+------------------------------+
          |
          v
+------------------------------+
| 记录 label.pos               |
+------------------------------+

+------------------+
| emit_goto        |
+------------------+
          |
          v
+------------------------------+
| 检查 js_is_live_code         |
+------------------------------+
          |
          v
+------------------------------+
| emit opcode + label id       |
+------------------------------+
          |
          v
+------------------------------+
| label.ref_count++            |
+------------------------------+
```
- TypeScript 方案：`LabelManager.create() -> labelId`，`mark(labelId, offset)`，`emitJump(op,label)`；内部维护引用次数与位置，便于 `resolve_labels` 阶段回填。

### 6.7 `cpool_add`
- 功能：将常量加入函数常量池，返回索引。
- 流程图：
```
+--------------------+
| cpool_add 入口    |
+--------------------+
          |
          v
+------------------------------+
| resize 常量池数组            |
+------------------------------+
          |
          v
+------------------------------+
| 存储 JS_DupValue(val)        |
+------------------------------+
          |
          v
+------------------------------+
| 返回索引                     |
+------------------------------+
```
- TypeScript 方案：`ConstantPool.add(value)` 负责扩容、去重策略以及与 AtomTable 的交互。

### 6.8 `emit_push_const`
- 功能：根据常量类型选择 `OP_push_atom_value` 或 `OP_push_const`。
- 流程图：
```
+-------------------------+
| emit_push_const 入口    |
+-------------------------+
           |
           v
+-----------------------------+
| 若字符串且 as_atom -> 新建 atom|
+-----------------------------+
      |成功                          |失败
      v                              v
+-----------------------------+   +-----------------------------+
| emit OP_push_atom_value     |   | 常量加入 cpool              |
+-----------------------------+   +-----------------------------+
      |                              |
      v                              v
+-----------------------------+   +-----------------------------+
| emit atom id + emit_ic      |   | emit OP_push_const + idx    |
+-----------------------------+   +-----------------------------+
```
- TypeScript 方案：`BytecodeEmitter.pushConst(value, preferAtom)` 中委托 `AtomTable` 创建原子或 `ConstantPool` 存储索引，并写入对应指令。

### 6.9 `push_scope` / `pop_scope` / `close_scopes`
- 功能：维护词法作用域栈、生成 `OP_enter_scope/OP_leave_scope` 并更新作用域链。
- 流程图（`push_scope`）：
```
+---------------------+
| push_scope 入口    |
+---------------------+
          |
          v
+------------------------------+
| resize scopes, 更新 parent   |
+------------------------------+
          |
          v
+------------------------------+
| emit OP_enter_scope + id     |
+------------------------------+
          |
          v
+------------------------------+
| 更新 scope_level/first       |
+------------------------------+
```
- TypeScript 方案：`ScopeManager.enter()` 返回 scopeId，并在 `BytecodeBuffer` 中写入指令；`leave()` 与 `closeUntil(scopeStop)` 实现 `pop_scope/close_scopes` 行为。

### 6.10 `add_var` / `add_scope_var` / `define_var`
- 功能：声明局部/作用域变量、函数声明、`var` 与 `let/const` 封装，处理多种语义规则。
- 流程图（`define_var` 核心）：
```
+---------------------+
| define_var 入口    |
+---------------------+
          |
          v
+------------------------------+
| 根据 var_def_type 分支       |
+------------------------------+
          |
          v
+------------------------------+
| 检查重定义、作用域合法性     |
+------------------------------+
          |
          v
+------------------------------+
| 调用 add_scope_var / add_var |
+------------------------------+
          |
          v
+------------------------------+
| 更新 is_lexical/is_const 等  |
+------------------------------+
```
- TypeScript 方案：`ScopeManager.declare(name, kind)` 实现语义检查，内部委托 `BindingTable` 维护变量元数据；对 `var` 全局绑定则交给 `GlobalBindingTracker`。

### 6.11 `resolve_variables`
- 功能：二次遍历字节码，完成变量捕获、全局绑定校验、死代码移除及部分 peephole 优化。
- 流程图：
```
+--------------------------------+
| resolve_variables 入口         |
+--------------------------------+
              |
              v
+--------------------------------+
| 初始化 bc_out 与辅助结构       |
+--------------------------------+
              |
              v
+--------------------------------+
| 预处理 global_vars -> 生成检查 |
+--------------------------------+
              |
              v
+--------------------------------+
| 遍历字节码指令                 |
+--------------------------------+
              |
              v
+---------------------------------------------+
| 根据 op 类型:                               |
| - scope 指令 -> resolve_scope_var           |
| - eval 指令 -> mark_eval_captured           |
| - goto/return -> skip_dead_code             |
| - label -> 更新位置                         |
| - 其他 -> 复制或优化                        |
+---------------------------------------------+
              |
              v
+--------------------------------+
| 写回新的 byte_code、记录行号信息           |
+--------------------------------+
```
- TypeScript 方案：`VarResolver.resolve(functionIR)`，对 IR 指令流执行第二遍转换；实现 `ScopeRefResolver`、`DeadCodeEliminator`、`EvalCaptureMarker` 等子组件，最终生成优化后的 `InstructionStream`。

### 6.12 `resolve_labels`
- 功能：回填标签偏移、执行跳转优化、生成短指令，并初始化函数上下文变量。
- 流程图：
```
+--------------------------------+
| resolve_labels 入口            |
+--------------------------------+
              |
              v
+--------------------------------+
| 初始化 jump_slots, line_slots   |
+--------------------------------+
              |
              v
+---------------------------------------------+
| 若需初始化特殊绑定 -> emit 对应指令         |
+---------------------------------------------+
              |
              v
+--------------------------------+
| 遍历字节码:                     |
| - 处理 OP_line_num              |
| - Label -> 回填 relocation      |
| - goto/if -> 目标折叠/短指令    |
| - call -> 尾调用优化            |
+--------------------------------+
              |
              v
+--------------------------------+
| 更新 pc2line / use_short_opcodes |
+--------------------------------+
```
- TypeScript 方案：`LabelResolver.optimize(stream, labelMgr)` 输出新的 `InstructionStream`，支持短跳转指令、尾调用与初始化注入；整合 `LineInfoBuilder`。

### 6.13 `compute_stack_size`
- 功能：广度优先遍历字节码路径，计算最大操作数栈深度并检测异常栈操作。
- 流程图：
```
+--------------------------------+
| compute_stack_size 入口        |
+--------------------------------+
              |
              v
+--------------------------------+
| 初始化 stack_level_tab 等结构  |
+--------------------------------+
              |
              v
+--------------------------------+
| 入队起始 PC=0, 栈深=0          |
+--------------------------------+
              |
              v
+---------------------------------------------+
| 循环: 弹出 PC -> 读取指令 -> 更新栈深       |
| - 检查下溢/上溢                          |
| - 根据跳转指令 -> ss_check 入队           |
| - 维护 catch_pos                          |
+---------------------------------------------+
              |
              v
+--------------------------------+
| 记录最大栈深并写入 pstack_size            |
+--------------------------------+
```
- TypeScript 方案：`StackAnalyzer.analyze(stream)` 返回最大栈深及异常信息，供 `FunctionAssembler` 写入 `JSFunctionBytecode.stack_size`。

### 6.14 `js_create_function`
- 功能：将 `JSFunctionDef` 最终转换为 `JSFunctionBytecode` 对象，负责子函数构建、变量解析、标签解析、栈深分析与内存布局。
- 流程图：
```
+--------------------------------+
| js_create_function 入口        |
+--------------------------------+
              |
              v
+---------------------------------------------+
| 重建 scope 链、必要时添加 eval/module 变量 |
+---------------------------------------------+
              |
              v
+---------------------------------------------+
| 递归构建子函数 -> 保存到常量池              |
+---------------------------------------------+
              |
              v
+---------------------------------------------+
| resolve_variables -> resolve_labels         |
+---------------------------------------------+
              |
              v
+--------------------------------+
| compute_stack_size                          |
+--------------------------------+
              |
              v
+---------------------------------------------+
| 根据 strip_debug 等构造 JSFunctionBytecode  |
| - 拷贝字节码 buffer                         |
| - 拷贝常量池、vardefs、closure_var          |
| - 填充调试信息                              |
+---------------------------------------------+
              |
              v
+--------------------------------+
| 释放 JSFunctionDef 资源，返回 func_obj     |
+--------------------------------+
```
- TypeScript 方案：`FunctionAssembler.build(funcDefIR)` 负责 orchestrate 全流程，输出与 C 结构兼容的对象；内部调用前述 `VarResolver`、`LabelResolver`、`StackAnalyzer`。

## 7. 实施路线
- 阶段 1：实现 `BytecodeBuffer`、`AtomTable`、`ConstantPool`、`LabelManager` 等基础类，确保能够按 QuickJS 格式写出指令与常量池。
- 阶段 2：将解析阶段产出的 AST 转换为 `FunctionIR`，在 TypeScript 中实现 `ScopeManager` 与初次指令生成（对应 C 中编译第一阶段）。
- 阶段 3：实现 `VarResolver` 与 `LabelResolver`，复现第二、第三遍优化及回填流程；引入单元测试对比 `.qbc/.disasm`。
- 阶段 4：补齐 `StackAnalyzer` 与 `FunctionAssembler`，完成 `JSFunctionBytecode` 序列化；对接现有 CLI 比对脚本。
- 阶段 5：覆盖闭包、模块、异步/生成器、异常处理等高级特性，迭代测试夹具。

## 8. 文档与测试建议
- 每个 TypeScript 类编写 README 注释描述其对标的 QuickJS 函数与结构。
- 在 `__tests__/compiler/fixtures` 基础上增加断言：
  - 常量池、闭包变量、pc2line 信息与 QuickJS C 实现保持一致。
  - 比较 `emit_push_const` 的字符串常量路径是否共享 Atom。
- 对 `resolve_variables`、`resolve_labels` 编写快照测试，验证优化后的指令序列。
- 为 `StackAnalyzer` 构造异常栈用例，确保能复现 QuickJS 的错误提示。

## 9. 构建与运行环境说明
- **字节码生成流水线集成**：在 `pnpm run build:wasm` 前挂接 TypeScript 字节码生成步骤，产出 QuickJS 兼容 `.qbc`。
- **运行变量参数生成 QuickJS**：
      1. 执行 `pnpm run build:wasm -- --emit-types`，确保 TypeScript 类型信息在生成过程中可访问。
      2. 完成构建后执行 `pnpm -s run getEnv`，生成 `arch/env.ts` 所需的环境文件，该文件会注入运行参数（如 `ENV_MODE`, `QJS_FEATURE_FLAGS`）。
      3. `getEnv` 产物应包含 QuickJS wasm 模块路径、默认 CLI 参数、内置 fixture 清单，供新字节码管线加载与对比。
- **QuickJS wasm 输出校验**：
      - 使用 `pnpm -s start __tests__/compiler/fixtures/compute.ts --disasm --cfg --pc2line --debug` 验证新管线输出与 C 实现一致。
      - 通过 `pnpm -s compare:fixtures` 对所有夹具执行并分析差异，确保 TypeScript 类型驱动优化未破坏语义。

      ## 10. QuickJS 函数映射明细

      下表按阶段列出 QuickJS C 端涉及的核心函数，说明其职责、主要流程以及在 TypeScript 管线中的对应实现方式。

      ### 10.1 辅助写入与调试

      | 函数 | 作用 | 关键流程 | TypeScript 对应 |
      |------|------|----------|------------------|
      | `dbuf_put_leb128` / `dbuf_put_sleb128` (`runtime.c`) | 向动态缓冲写入 LEB128 编码 | 循环截取 7bit，最高位标志是否继续，入缓冲 | `BytecodeBuffer.writeULEB128/SLEB128` |
      | `emit_u8/u16/u32` (`parser.c`) | 写入固定长度字节 | 调用 `dbuf_put*`，可选 trace | `BytecodeBuffer.writeU8/U16/U32` |
      | `emit_source_pos` | 插入调试行号 | 比较 `last_opcode_source_ptr`，需要时写 `OP_line_num` | `BytecodeBuffer.noteSource` |
      | `add_pc2line_info` (`parser.c`) | 构建压缩的 pc→行号表 | 比较 pc 差值与行列差值，选择编码形式 | `LineInfoBuilder.add(pc, line, column)` |

      ### 10.2 指令发射阶段

      | 函数 | 作用 | 关键流程 | TypeScript 对应 |
      |------|------|----------|------------------|
      | `emit_op` | 写入 opcode | 记录 `last_opcode_pos`，写入单字节 opcode | `BytecodeBuffer.emitOp` |
      | `emit_atom` | 将 `JSAtom` 写入指令流 | 确保缓冲扩容，写入 `JS_DupAtom` | `AtomTable.emit(atomId)` + `BytecodeBuffer.writeAtom` |
      | `emit_ic` | 注册 inline cache | 调用 `add_ic_slot1`，trace 原子 | `InlineCacheTable.reserve(atom)` |
      | `emit_label_raw` / `emit_label` | 标记标签位置 | 写 `OP_label` + id，记录 `label_slots[label].pos` | `LabelManager.mark(labelId, offset)` |
      | `emit_goto` | 生成跳转指令 | 若活动代码，则 emit opcode + label，`ref_count++` | `LabelManager.emitJump(opcode, labelId)` |
      | `cpool_add` | 常量池写入 | `js_resize_array` 扩容，保存 `JS_DupValue` | `ConstantPool.add(value)` |
      | `emit_push_const` | 常量加载 | 字符串尝试走 atom 路径，否则写 `OP_push_const` + index | `BytecodeEmitter.pushConst` |

      ### 10.3 作用域与变量处理

      | 函数 | 作用 | 关键流程 | TypeScript 对应 |
      |------|------|----------|------------------|
      | `push_scope` / `pop_scope` / `close_scopes` | 维护词法作用域 | 扩容 `scopes`，写 `OP_enter_scope/OP_leave_scope`，更新 `scope_level` | `ScopeManager.enter/leave/closeUntil` |
      | `add_var` | 新增局部变量 | 扩容 `vars`，复制 atom，初始化元数据 | `BindingTable.addLocal(name)` |
      | `add_scope_var` | 在当前作用域新增变量 | 调用 `add_var`，设置 `scope_level`、链表 | `ScopeManager.addScopedBinding` |
      | `add_arguments_var` / `add_arguments_arg` | 管理 `arguments` 绑定 | 在函数/参数 scope 中插入变量，维护作用域链 | `ScopeManager.ensureArgumentsBinding` |
      | `define_var` | 根据声明类型注册变量 | 针对 `let/const/var/function` 做冲突检查、插入全局或局部 | `ScopeManager.declare(name, kind)` |
      | `find_var` / `find_arg` / `find_var_in_scope` | 查找变量索引 | 遍历局部/参数数组、作用域链 | `BindingTable.lookup` |
      | `find_global_var` / `add_global_var` | 处理 eval/global 变量 | 在 `global_vars` 中查找或插入 | `GlobalBindingTracker.register` |

      ### 10.4 字节码优化与解析阶段

      | 函数 | 作用 | 关键流程 | TypeScript 对应 |
      |------|------|----------|------------------|
      | `js_is_live_code` | 判断当前指令是否仍在可达路径 | 查看 `last_opcode` 是否为终止指令 | `ControlFlowAnalyzer.isLive()` |
      | `skip_dead_code` | 跳过不可达代码 | 遍历后续 opcode，维护标签引用并释放 atom | `DeadCodeEliminator.skipUntilLabel` |
      | `resolve_scope_var` | 将 `scope_*` 指令转换为局部或闭包访问 | 分析变量捕获情况，输出最终指令序列 | `ScopeRefResolver.lowerScopeOp` |
      | `mark_eval_captured_variables` | 标记 eval 捕获变量 | 遍历 scope，将变量设置为 `is_captured` | `EvalCaptureMarker.tagScopes` |
      | `resolve_variables` | 第二遍遍历字节码 | 预处理全局定义、转换 scope 指令、移除死代码 | `VarResolver.resolve(functionIR)` |
      | `find_jump_target` (`parser.c`) | 解析跳转目标 | 跟随 label 链，处理 goto 到 goto | `LabelResolver.followTarget` |
      | `resolve_labels` | 回填 label、执行 peephole | 处理 `OP_label` relocation、尾调用优化、短指令替换 | `LabelResolver.optimize(stream)` |
      | `compute_stack_size` | 计算最大栈深度 | 宽度优先遍历 bytecode，跟踪栈变化和 catch | `StackAnalyzer.analyze(stream)` |

      ### 10.5 函数对象构建与序列化

      | 函数 | 作用 | 关键流程 | TypeScript 对应 |
      |------|------|----------|------------------|
      | `instantiate_hoisted_definitions` (`parser.c`) | 初始化提升的函数/变量 | 遍历 hoisted 列表，生成赋值指令 | `HoistInitializer.emit` |
      | `js_new_function_def` (`parser.c`) | 分配函数编译结构 | 初始化 `JSFunctionDef` 字段，链接父子关系 | `FunctionIRBuilder.createFunction` |
      | `js_parse_function_decl2` | 处理函数声明（包含语法） | 设置 `func_kind`、参数作用域、字节码缓冲 | `ASTLowerer.buildFunctionIR`（语法部分依赖 TS AST） |
      | `js_create_function` | 将 `JSFunctionDef` 转为 `JSFunctionBytecode` | 递归处理子函数、调用 `resolve_variables`/`resolve_labels`、设置 debug 信息 | `FunctionAssembler.build(functionIR)` |
      | `free_function_bytecode` (`bytecode.cpp`) | 释放函数字节码资源 | 释放 atom、常量、closure 变量等 | `FunctionAssembler.dispose()` |
      | `JS_WriteFunctionBytecode` (`bytecode.cpp`) | 序列化函数字节码 | 遍历指令替换原子索引、执行大端转换 | `BytecodeSerializer.write(functionIR)` |
      | `JS_ReadObjectRec` (`bytecode.cpp`) | 反序列化函数 | 解析字节码、常量池、调试信息 | `BytecodeDeserializer.read()`（用于验证） |

      ### 10.6 异常/闭包相关函数

      | 函数 | 作用 | 关键流程 | TypeScript 对应 |
      |------|------|----------|------------------|
      | `add_closure_var` (`parser.c`) | 记录闭包捕获变量 | 查找或新增 `closure_var` 项，设置捕获类型 | `ClosureCollector.register(name, kind)` |
      | `get_closure_var` | 查找闭包变量索引 | 遍历 `closure_var`，比较 atom | `ClosureCollector.lookup` |
      | `close_lexical_scope` | 关闭词法作用域 | 在 `resolve_variables` 中插入 `OP_leave_scope` | `ScopeManager.finalizeScope` |
      | `emit_return` (`parser.c`) | 处理 return 语义 | 判断 async/generator，选用合适 opcode | `BytecodeEmitter.emitReturn(valueKind)` |
      | `emit_throw` | 处理 throw | 写入 `OP_throw` 并保留源位置信息 | `BytecodeEmitter.emitThrow(valueRef)` |

      ### 10.7 模块与运行时链接函数

      | 函数 | 作用 | 关键流程 | TypeScript 对应 |
      |------|------|----------|------------------|
      | `JS_ReadFunctionTag` (`bytecode.cpp`) | 判断序列化标签 | 读取 `BC_TAG_FUNCTION` 等标签 | `BytecodeSerializer.writeTag/tag` |
      | `JS_InitModule` (`module.c`) | 初始化模块字节码 | 绑定 import/export，生成模块函数 | `ModuleAssembler.build` |
      | `JS_ResolveModule` | 解析模块依赖 | 递归加载依赖模块 | `ModuleLoader.resolve` |

      > 注：语法解析阶段（如 `next_token`、`js_parse_statement`）不在本方案范围，TypeScript 侧直接使用编译器 AST。

      ### 10.8 转换策略总结
      - **流程划分**：QuickJS 将函数编译划分为 emit → resolve variables → resolve labels → stack compute → assemble。TypeScript 复刻该阶段顺序，保证输出结构一致。
      - **数据结构对齐**：`JSFunctionDef` 中的 `vars/args/closure_var/cpool` 等数组需用 TypeScript 类 `FunctionIR` 的字段直观映射，以便后续序列化。
      - **异常处理**：`resolve_variables` 与 `resolve_labels` 中的 `try/finally`、`catch` 指令处理需逐条映射，保持 `catch_pos` 语义；TypeScript 侧借助 `BlockIR` 的异常块类型确保一致。
      - **闭包捕获**：`add_closure_var` 等逻辑决定变量捕获方式，TypeScript 侧在 IR 生成时即确定，并在 emit 阶段输出相同的 `OP_closure_make` 等指令。
      - **调试信息**：QuickJS 通过 `pc2line`/`pc2column` 记录调试映射；TypeScript 在 `LineInfoBuilder` 中维持同样的增量编码，便于 disasm 对齐。

## 11. QuickJS 表达式与语句编译函数全景

### 11.1 表达式处理函数矩阵

| 函数 | 调用链位置 | 关键控制逻辑与产出 | TypeScript 映射 |
|------|------------|--------------------|-----------------|
| `js_parse_expr` | 所有表达式入口 | 委派至 `js_parse_expr2`，统一处理逗号表达式并维护 `last_opcode_pos` 防止错误的 lvalue 重写 | `ExpressionLowerer.emitExpression(ast, ctx)` 入口，协调逗号表达式与求值顺序 |
| `js_parse_expr2` | 递归处理逗号链 | 循环调用 `js_parse_assign_expr2`，遇逗号发射 `OP_drop`，保持右值在栈顶 | `ExpressionLowerer.emitCommaChain`，在 `InstructionIR` 中插入 `Drop` 指令 |
| `js_parse_assign_expr2` | 赋值与复杂表达式核心 | 处理 `yield/await`、箭头函数探测、解构入口、条件表达式、赋值/复合赋值、逻辑赋值；调用 `get_lvalue/put_lvalue` 完成左值拆解 | `AssignmentEmitter.emit(node, flags)`，维护 `LValueBuilder`、生成 `InstructionIR::Assign`、`InstructionIR::Yield`、`InstructionIR::Await` |
| `js_parse_cond_expr` | 三元运算 | 生成条件跳转 (`emit_goto(OP_if_false)`、`emit_label`) 并复用 `js_parse_assign_expr/assign_expr2` 处理分支 | `ExpressionLowerer.emitConditional` 生成 `BlockIR` 三分支，利用 `LabelManager` 建立汇合块 |
| `js_parse_coalesce_expr` | `??` 短路 | `emit_op(OP_dup)`、`OP_is_undefined_or_null`、`emit_goto(OP_if_false)` 实现空值合并 | `ExpressionLowerer.emitNullish`，在 IR 加入 `IsNullish` + `Branch` 指令 |
| `js_parse_logical_and_or` | `&&/||` 短路 | 使用 `emit_dup/emit_goto` 构建短路标签，禁止与 `??` 混用 | `ExpressionLowerer.emitLogical`，生成 `BlockIR` 与 `Phi` 合并 |
| `js_parse_expr_binary` | 二元运算优先级 | 依据 `level` 递归下降，写入算术/位运算 opcode，支持 `in`/`instanceof` | `BinaryEmitter.emit(level)`，依据 `TypeFacts` 选择算术或通用指令 |
| `js_parse_unary` | 一元运算 | 处理前缀运算、`delete`、`void`、`typeof`、`await`，与 `js_parse_postfix_expr` 协作 | `ExpressionLowerer.emitUnary`，针对 `delete` 调用 `LValueBuilder.emitDelete` |
| `js_parse_postfix_expr` | 后缀与调用 | 负责 `++/--` 后缀、`call/new`、`template`、`super`、`member access`；进入 `js_parse_left_hand_side_expr` | `ExpressionLowerer.emitPostfix`、`CallEmitter.emitInvocation`，根据 `callee` 类型生成 `OP_call` 系列 |
| `js_parse_left_hand_side_expr` | 左值入口 | 允许调用链条 (`PF_POSTFIX_CALL`)，用于 `new`、`call`、成员访问 | `LValueBuilder.parseLeftHandSide` 构造 `InstructionIR::LoadRef` |
| `js_parse_expr_paren` | 括号表达式 | `js_parse_expect('(')` 后调用 `js_parse_expr`，支持 `yield` 语义限制 | `ExpressionLowerer.emitParenthesized`，主要校验 ASI/上下文 |
| `js_parse_template` | 模板字符串 | 循环 `emit_push_atom_value`，在插值点调用 `js_parse_expr`，插入 `OP_add` 拼接 | `TemplateEmitter.emit` 构造 `InstructionIR::Concat` 序列 |
| `js_parse_object_literal` | 对象字面量 | 解析属性名，针对 getter/setter/method 调 `js_parse_function_decl`；普通属性发射 `OP_define_field/OP_put_field` | `ObjectLiteralEmitter.emit`，利用 `AtomTable` 和 `InlineCacheTable` 写入字段 |
| `js_parse_array_literal` | 数组字面量 | 根据空洞、spread、普通元素选择 `OP_array_from` 与 `OP_put_array_el` | `ArrayLiteralEmitter.emit`，在 IR 中标记 `Spread` 类型并映射对应 opcode |
| `js_parse_class` | class 表达式 | 处理继承链、字段、静态块、私有名称；调用 `js_parse_function_decl2` 生成方法字节码 | `ClassEmitter.emit`，输出 `InstructionIR::ClassStart/ClassField/ClassEnd` |
| `js_parse_function_decl` / `js_parse_function_decl2` | 函数表达式 | 根据 func type 设置 `JSParseFunctionEnum`、建立参数 scope、推入 `cur_func`，最终交由 `js_create_function` | `FunctionLowerer.emitNestedFunction`，返回 `FunctionIR` 并在常量池中注册 |

### 11.2 语句处理函数矩阵

| 函数 | 典型输入 | 出口字节码 | TypeScript 映射 |
|------|----------|------------|-----------------|
| `js_parse_statement_or_decl` | 通用语句入口 | 根据 token 分派至特定处理；维护标签、作用域、ASI | `StatementLowerer.emit(node)` 主入口，结合 `ScopeManager` 控制 | 
| `js_parse_block` | `{ ... }` | 调用 `push_scope/pop_scope`，逐条发射内部语句 | `StatementLowerer.emitBlock`，为 `ScopeIR` 新建块 |
| `js_parse_var` | `var/let/const` | 调用 `js_define_var`，根据是否有初始值发射 `OP_scope_put_var(_init)` | `VariableEmitter.emitDeclarations`，创建绑定并写入 `InstructionIR::Store` |
| `js_parse_if` 分支 (`TOK_IF`) | 条件语句 | `emit_goto(OP_if_false)` 建立跳转，支持 Annex B 函数声明 | `StatementLowerer.emitIf`，结合 `TypeFacts` 写入窄化信息 |
| `js_parse_while` / `js_parse_do` | 循环 | 建立 `label_cont/label_break`，使用 `push_break_entry` 管理 continue/break | `LoopEmitter.emitWhile/emitDoWhile`，更新 `ControlFlowGraph` |
| `js_parse_for` | 经典 for | 支持 initializer/test/update 三段，必要时重排增量块，闭包前后 `close_scopes` | `LoopEmitter.emitFor`，在 IR 中划分 `Init/Test/Body/Update` 基本块 |
| `js_parse_for_in_of` | `for-in` / `for-of` / `for-await-of` | 构造枚举器、处理 `has_initializer` 检查、发射 `OP_for_of_start/next` 等 | `LoopEmitter.emitForOf`，调用 `IteratorBuilder` 生成指令序列 |
| `emit_break` | `break/continue` | 逆向遍历 `BlockEnv`，关闭 scopes，发出 `OP_goto/OP_gosub` | `StatementLowerer.emitBreak`，利用 `LabelManager` 与 `ScopeManager` 恢复栈 |
| `js_parse_switch` | `switch` 语句 | 复制表达式值，构建多个 `case` 标签，使用 `OP_strict_eq` 匹配；default 通过回填 label 修正 | `StatementLowerer.emitSwitch`，结合 `TypeFacts` 决定跳表或链式比较 |
| `js_parse_try` | `try/catch/finally` | 建立 `label_catch/label_finally`，`emit_goto(OP_catch)`，在 finally 中使用 `OP_gosub` | `ExceptionEmitter.emitTry`，通过 `BlockIR` 的异常边表示 catch/finally |
| `js_parse_throw` (`TOK_THROW`) | 抛异常 | `emit_op(OP_throw)`，确保没有换行符 | `StatementLowerer.emitThrow`，记录 `InstructionIR::Throw` |
| `js_parse_return` (`TOK_RETURN`) | 返回 | 调 `emit_return`（见 §6.14），按上下文发射 `OP_return`/`OP_return_async` | `StatementLowerer.emitReturn`，在 IR 中标记 `Return` 节点 |
| `js_parse_class` / `js_parse_class_default_ctor` | `class` 声明 | 处理默认构造函数、静态初始化、私有字段 | `ClassEmitter.emitDeclaration`，写入 `ScopeIR` 并注册导出 |
| `js_parse_import`/`js_parse_export` (同文件其他段) | 模块语句 | 在 `ModuleDef` 中登记导入导出，发射 `OP_import` 等 | `ModuleLowerer.emit`，生成模块级 IR |

### 11.3 左值、解构与支撑函数

| 函数 | 作用 | 核心细节 | TypeScript 映射 |
|------|------|----------|-----------------|
| `get_lvalue` / `put_lvalue` | 左值拆解与回写 | 分析局部/闭包/对象属性，生成取值 opcode 与回写策略（`PUT_LVALUE_*`） | `LValueBuilder.build` 与 `LValueEmitter.commit`，输出 `InstructionIR::LoadRef`/`StoreRef` |
| `js_parse_destructuring_element` / `js_parse_destructuring_var` | 解构绑定 | 递归解析数组/对象 pattern，处理 rest、default、参数标记；调用 `emit_op(OP_get_field)` 等 | `DestructuringLowerer.emitPattern`，生成 `InstructionIR::Destructure` 序列，并挂接 `ScopeManager` |
| `js_parse_property_name` | 属性名解析 | 支持 identifier/string/number/computed/private 名称，返回 `JSParseFunctionEnum` | `PropertyNameResolver.resolve`，输出 `Atom` 或 IR 常量 |
| `js_define_var` / `define_var` | 变量注册 | 判断重定义、作用域合法性、export 条件 | `ScopeManager.declare` 与 `BindingTable.add` |
| `push_scope` / `pop_scope` / `close_scopes` | 作用域栈 | 维护 `scope_level`、写入进入/离开指令 | `ScopeManager.enter/leave/closeUntil` |
| `push_break_entry` / `pop_break_entry` | 循环控制链表 | 存储 `label_break/label_cont`、迭代器关闭信息 | `LoopContextStack.push/pop`，管理 IR 中的 `BreakTarget` |
| `set_object_name` | 设置函数 `name` | 赋值时侦测 `OP_set_name` 模式 | `FunctionAssembler.maybeAnnotateName` |
| `need_var_reference` | `with` 语义 | 判断是否需要创建引用以兼容 `with` | `ScopeManager.requiresReference`，驱动 `RefValue` 生成 |

### 11.4 TypeScript 实现落地要点

- **组件划分**：在 `src/compiler` 下新增 `ExpressionLowerer`, `StatementLowerer`, `LValueBuilder`, `DestructuringLowerer`, `LoopEmitter` 等类，分别镜像 QuickJS 函数族，内部依赖已定义的 `BytecodeEmitter`、`ScopeManager`、`LabelManager`。
- **调用顺序对齐**：TypeScript `ExpressionLowerer.emitExpression` 必须按 `js_parse_expr` → `js_parse_expr2` → `js_parse_assign_expr2` 的顺序组织逻辑，确保逗号/短路/赋值语义一致。
- **标签与块映射**：各 `emit_goto/emit_label` 在 TS 侧由 `LabelManager` 产生 `InstructionIR::Jump` 与 `BlockIR` 结构，`resolve_labels` 阶段再统一回填。
- **Yield/Await 管理**：对 `js_parse_assign_expr2` 中的 `yield`、`await` 分支，TypeScript 在 `FunctionIR` 上标记 `funcKind` 并通过 `BlockIR` 插入暂停点，与 `FunctionAssembler` 中的生成器状态机保持一致。
- **解构与参数处理**：`DestructuringLowerer` 调用 `ScopeManager` 注册绑定，与 `js_parse_destructuring_element` 的行为逐条对应，正确处理 TDZ、rest、默认值。
- **控制流资源释放**：`LoopEmitter`、`ExceptionEmitter` 在离开块时调用 `ScopeManager.closeUntil` 和 `LoopContextStack.pop`，对应 QuickJS 的 `close_scopes` 与 `pop_break_entry`。
- **类型事实写入**：在 `StatementLowerer.emitIf`、`LoopEmitter.emitFor` 等位置，将 TypeScript 类型窄化结果写入 `TypeFacts`，供后续优化阶段复用。
- **调试信息收集**：所有 `emit_source_pos` 触发点在 TypeScript 中统一通过 `BytecodeBuffer.noteSource(node)` 调用，保证 `pc2line` 数据与 QuickJS 对齐。
