# QuickJS TypeScript 字节码优化器技术方案

## 目标与约束
- **性能**：在保持语义一致性的前提下，减少 QuickJS 字节码指令数与运行时开销，目标是关键基准（compute、array-literal-mixed 等）平均提速 ≥ 15%。
- **类型安全**：完整利用 TypeScript 强类型信息，确保任意优化后仍满足类型推断与运行时约束。
- **可维护性**：优化管线模块化，支持增量编译、调试、回退。
- **可验证性**：为每个阶段提供自动化验证手段（单元、快照、性能、类型一致性）。

## 总体流水线
````mermaid
flowchart LR
    A[TypeScript 源文件] --> B[ts.Program & TypeChecker]
    B --> C[Typed AST 抽取]
    C --> D[SSA Typed IR 构建]
    D --> E[类型驱动优化阶段]
    E --> F[指令选择与寄存器分配]
    F --> G[QuickJS 字节码生成]
    G --> H[SourceMap & 优化报告]
    E --> I[优化摘要缓存]
    I --> D
````

### 关键资源
- `ts.Program`：用于获取符号表、类型、增量编译信息。
- `TypedAstNode`：AST 节点，携带 TypeScript 类型、常量值、副作用标记。
- `TypedSSAValue`：SSA 值，包含类型域（标量、复合、联合、字面量）、可空性、捕获信息。
- 常量池 & Shape 表：指导后端重用对象形状、字面量。

## Typed IR 设计
- **节点类别**：表达式、语句、控制流块、函数定义、闭包环境。每个节点挂载 `resolvedType` / `literalValue` / `effectKind`。
- **SSA 形式**：对可变变量、临时值统一 SSA 化，Phi 节点记录类型交集，实现精准的流敏感分析。
- **类型域**：
  - 标量：`number`（区分 `int32` / `float64`）、`boolean`、`bigint`、`string`。
  - 复合：对象（含属性 shape）、数组/元组（含长度、元素类型）、枚举。
  - 字面量：`42`、`"hi"`、`{ label: "hi" }` 等。
  - 修饰：`readonly`、可空性(`nullable`)、副作用标签(`pure`/`impure`)。
- **元数据**：捕获闭包变量、模块导出、异常路径、CFG 邻接信息。

## 类型驱动优化阶段
1. **ConstPropagation**
   - 利用 `typeChecker.getConstantValue`、字面量类型以及 `as const` 信息做常量折叠。
   - 合并算术、比较、字符串模板，记录折叠来源以便报告。
2. **BranchRefinement**
   - 对类型守卫(`typeof`/`instanceof`/`in`)进行流敏感收窄，移除不可达分支。
   - 对字面量布尔条件立即折叠跳转，并尝试合并邻接块。
3. **PureInline**
   - 针对 `const` 且标记 `@inline` 或自动判定纯函数的调用点进行内联。
   - 实参类型驱动特化：例如 `add(a: number, b: number)` 内联后选择整数算术指令。
4. **LoopSpecialization**
   - 识别 `for` / `for...of` / `Array.prototype.forEach` 等固定上界循环。
   - 抽取数组长度、迭代器初始化，减少重复属性访问。
   - 针对 `ReadonlyArray<number>` 支持展开或换用寄存器自增。
5. **DeadStoreElim & DCE**
   - 基于 SSA 活性分析删除未使用赋值、纯副作用块。
   - 对 `readonly` 字段或纯对象字面量允许提早折叠/缓存。
6. **ObjectLiteral Folding**
   - 将无副作用的对象/数组字面量转化为常量池表达，映射为 `preload_const_object` 指令。
   - 利用属性 shape，生成 QuickJS hidden class 预热数据。
7. **Inter-Module Summary**
   - 每个模块输出 Type Signature Hash；当依赖变更时触发相关函数的内联无效化。
   - 支持跨文件常量折叠与静态导出内联。

## 指令后端策略
- **指令选择**：根据类型域挑选最窄指令（`OP_push_i32`、`OP_push_bool`、`OP_push_const` 等）。
- **寄存器分配**：
  - 标量优先占用本地寄存器，避免装箱。
  - 引用类型使用对象槽，并复用常量池索引。
  - 结合线性扫描 + 类型权重，确保高频标量驻留。
- **常量池管理**：
  - 数值/字符串/shape 分段存储；相同结构共享条目。
  - 支持 `const_object`、`const_array` 指令快速载入。
- **调试/映射**：
  - 对每条指令记录源位置信息。
  - 生成优化注解（如“ConstPropagation: shorthandValue”）。

## 具体优化示例
### 输入 TypeScript (`tmp/object-literal-shorthand.ts`)
````typescript
const shorthandValue = 42
const shorthandInfo = { shorthandValue, label: 'hi' }
````
### Typed IR 片段
| SSA 值 | 类型 | 元信息 |
| --- | --- | --- |
| `%0` | `42` (`number` 字面量) | `pure`, `const` |
| `%1` | `{ shorthandValue: 42, label: "hi" }` | `readonly`, `pure` |

### 优化过程
1. **ConstPropagation**：将 `shorthandValue` 引用直接替换为 `42`。
2. **ObjectLiteral Folding**：字面量无副作用 → 放入常量池，生成 shape = `{"shorthandValue": number, "label": string}`。
3. **指令选择**：
   - `LOAD_CONST_I32 42`
   - `LOAD_CONST_OBJ #Shape0`
   - `STORE_LOCAL 0`

与基础实现相比，省去了运行时对象构造、属性赋值，QuickJS 直接复用常量，减少 GC 压力与指令数量。

## 增量与缓存
- 依赖 `watchProgram` 捕获文件变更，重新生成局部 Typed IR。
- 缓存内容：`TypeHash`、IR 哈希、优化摘要（折叠次数、内联数量、被消除的块）。
- 缓存命中时跳过优化阶段，直接复用字节码与报告，编译时间缩短 ≥ 30%。

## 验证方法论
1. **语义回归**
   - 每个 fixture 同时执行“未优化字节码”和“优化字节码”，比较运行结果与副作用日志。
   - 建立 Jest 快照记录指令序列，确保差异在预期内。
2. **类型一致性检查**
   - 优化后重新对 Typed IR 跑轻量 TypeScript 类型验证器，确保 SSA 值类型未发生非法扩张。
   - 对内联、循环特化等高风险优化追加断言。
3. **性能基准**
   - 基于 `scripts/compareWithWasm.ts` 扩展：记录执行时间、指令计数、常量池命中率。
   - 设定阈值：性能回退 >5% 自动失败，并输出优化摘要。
4. **增量一致性**
   - 缓存命中路径与未命中路径生成的字节码需比对哈希值，若不一致则抛出编译警告。
5. **调试与可观测性**
   - 生成 JSON 报告：包含优化 pass 列表、命中次数、前后指令 diff。
   - VS Code 插件展示“优化时间轴”，支持跳转回源文件。

## 工具链集成
- **CLI**：`pnpm qjs-tsc --emit-bytecode --opt-level=3 --emit-report=artifacts/report.json`。
- **IDE 支持**：
  - 诊断面板展示被消除分支、内联函数位置。
  - 悬浮提示展示 SSA 类型与优化标记。
- **CI 方案**：
  - 构建阶段生成优化报告，对比上次构建的 KPI（执行时间、指令数、常量池大小）。
  - 允许配置白名单（如特定 Pass 在部分模块禁用）。

## 渐进式落地路线

### 阶段概览
| 阶段 | 时间范围* | 核心目标 | 关键产物 | 验收标准 |
| --- | --- | --- | --- | --- |
| P0 基础设施 | Week 1-2 | 建立 Typed IR、常量折叠能力 | `typed-ir` 模块、IR 快照测试 | 快照与 TypeScript 类型校验通过 |
| P1 优化核心 | Week 3-5 | 完成 BranchRefinement / DCE / 寄存器分配 | 优化 Pass 框架、CLI 报告 | compute/array 基准 ≥10% 提升 |
| P2 进阶能力 | Week 6-8 | 内联、循环优化、跨模块摘要 | Pass 配置系统、VS Code 面板 MVP | 快照稳定；IDE 可视化展示 |
| P3 性能守护 | Week 9-10 | 建立性能回归与 CI 阈值告警 | 基准仪表板、阈值脚本 | CI 阶段自动比对 ±5% 门槛 |

> \* 时间范围按 2 周迭代估算，可根据人力动态调整。

### P0 基础设施（Week 1-2）
- **工作包**
   - 构建 `TypedAstNode` → `TypedSSAValue` 转换链路，完成 SSA 与类型域落地。
   - 实现 `ConstPropagation` 与 `ObjectLiteral Folding`，覆盖 `tmp/object-literal-shorthand.ts`、`array-literal-mixed` fixture。
   - 搭建 Jest 快照测试，用于记录 IR 与字节码输出。
- **依赖**：需要 TypeScript 编译器 API 接入与 QuickJS 指令描述（`env.ts`）。
- **完成定义**（DoD）
   - 基准示例运行通过，优化后字节码与快照一致。
   - 提供首版开发指南，描述 IR 结构与 Pass 接口。

### P1 优化核心（Week 3-5）
- **工作包**
   - 引入 `BranchRefinement`、`DeadStoreElim`、寄存器分配器；实现 Pass pipeline 配置。
   - CLI 支持 `--opt-level`、`--emit-report`，输出 JSON 报告。
   - 构建第一批性能基准（compute、function-add、complex-functions）。
- **风险与缓解**
   - *风险*：寄存器分配与类型域冲突导致运行时崩溃。
   - *缓解*：引入 IR 验证器，对寄存器与类型映射做静态检查。
- **DoD**
   - 基准平均性能提升 ≥10%，且未出现类型一致性回退。
   - CLI 报告包含 Pass 命中统计与变更摘要。

### P2 进阶能力（Week 6-8）
- **工作包**
   - 实现 `PureInline`、`LoopSpecialization`、跨模块 `Type Signature Hash`。
   - VS Code 扩展接入优化日志，提供 hover + 面板视图。
   - 支持缓存命中路径验证（IR 哈希对比）。
- **跨团队协作**：需要工具链团队配合开发 VS Code 插件面板；与运行时团队确认对象 shape 预热数据格式。
- **DoD**
   - IDE 能高亮优化点，悬浮展示 SSA 类型。
   - 缓存命中情况下编译耗时降幅 ≥30%。

### P3 性能守护（Week 9-10）
- **工作包**
   - 集成性能仪表板（可复用现有 `compareWithWasm` 脚本），输出趋势图。
   - 在 CI 中配置性能阈值；当回退 >5% 时阻断主干。
   - 建立回退策略（例如 `--opt-level=0` 热切换）。
- **DoD**
   - CI 报告包含性能指标、常量池规模、指令数曲线。
   - 提供操作手册：如何排查优化导致的回归。

### 持续工作流（贯穿各阶段）
- **技术债跟踪**：使用 GitHub Projects 记录高风险 Pass / 场景，保持每周维护。
- **文档更新**：阶段结束时更新 `bytecode-optimizer-design.md` 与开发者指南，确保信息同步。
- **知识转移**：每阶段举行分享会，沉淀最佳实践和失败案例。

## 后续扩展
- 支持 Typed IR → Wasm 直接生成路线，与 QuickJS 字节码共享优化结果。
- 引入 profile-guided optimization（PGO）：运行时回传热点信息，决定内联与特化策略。
- 结合 QuickJS GC 数据，针对长寿命对象生成更紧凑布局。
