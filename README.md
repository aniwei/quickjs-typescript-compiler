# QuickJS TypeScript Bytecode (Minimal Prototype)

本项目实现一个极小型的 *TypeScript -> QuickJS 风格字节码* 编译器原型，**不经由 TS->JS 再转**，而是直接基于 TypeScript AST 构造自定义 IR，再发射与 QuickJS 指令命名风格一致的可配置指令集合并序列化为与 QuickJS FunctionBytecode 排列接近的二进制格式 `output.bin`。

> 目标：验证从 TS 直接到 QuickJS 字节码的流水线结构与配置化指令生成体系。当前仅覆盖 `__tests__/compute.ts` 所需语法子集。

## 已支持语法子集
- 顶层 `const/let` 数组初始化（仅 `[]`）
- `for (let i = 0; i < N; i++) { ... }` 结构，条件已降为真实比较与条件跳转：
  - 关系运算 `<` 直接发射 `OP_lt`
  - 编译期按需插入 `OP_to_number` 以模拟 JS ToNumber 语义（基于简单类型跟踪）
  - `==` 与 `===` 分别降为 `OP_eq` 与 `OP_strict_eq`
- 变量声明与局部槽分配
- 数字常量
- 简单加法表达式 `a + i`
- `array.push(expr)` 调用

## 指令配置化生成
文件 `opcodes.config.json`：
```json
{
  "features": { "bigInt": false, "shortOpcodes": true }
}
```
执行 `pnpm exec tsx scripts/gen-opcodes.ts` 生成 `src/opcodes.ts`。
- `shortOpcodes` 控制是否生成 1 字节局部槽索引版本（如 `OP_get_loc` / `OP_put_loc` / `OP_inc_loc`）。
- `bigInt` 未来可加入 BigInt 专用算术指令（示例 `OP_add_bigint` 已在脚本中预留条件条目）。

## 编译流程
1. 解析 TS 源码：`src/compile.ts` -> 产生 IR (`src/ir.ts` 定义)。
2. IR 发射：`src/bytecode.ts` 将 IR 转换为 opcode 序列 + 常量池。
3. 序列化：`src/assembler.ts` 直接输出 QuickJS-like 布局：
  - `BC_VERSION` (1 byte) 目前 5 或 0x45 (CONFIG_BIGNUM)
  - `atom_count` (LEB128)
  - 每个 atom: `len(LEB128)` + `utf8`
  - 函数字节码对象：`tag=0x13` + flags/js_mode + 计数字段 + vardefs + closureVars + bytecode + debug(pc2line + optional source) + const pool
4. CLI：`src/cli.ts` 入口，输出 `output.bin`（仅 quickjs 格式）。

## 运行
```bash
pnpm install
pnpm build
pnpm validate   # 生成并打印字节码十六进制
```
设置环境变量 `DUMP_ASM=1` 会输出 locals / capturedLocals / 常量池 / 指令字节。

## 设计取舍 / 与 QuickJS 对齐点
- 指令命名、短索引优化思路、常量池机制、返回 `OP_return_undef` 的风格参考 QuickJS。
- 未直接解析 C 头文件，而是 **手工维护** opcode 列表，并以脚本生成枚举+元信息，方便后续特性切分。
- 未来可拆分多段：函数表、Atom 表、行列号映射等；当前为最小可行集合。

## 当前已知局限
| 类型 | 描述 |
| ---- | ---- |
| 比较覆盖 | 仅 `<` 已严格对齐；`<=`/`>`/`>=` 仍通过占位路径（可等价转换后续补完）。|
| 类型系统 | 未利用 TS 类型做优化（如常量折叠、slot 分析）。|
| GC/对象模型 | 无运行时执行器；生成的字节码仅做结构展示。|
| 控制流 | 条件跳转已用于 `for` 条件；更复杂布尔表达式暂未覆盖。|
| 错误处理 | 缺少语法越界与诊断机制。|

## 下一步建议
1. 完善比较族：为 `<=`/`>`/`>=` 引入独立 IR 与 op（或做等价变换）并对齐 QuickJS 栈效果。  
2. 常量池扩展：支持字符串、BigInt、浮点常量，与特性开关协同。  
3. BigInt 支持：当配置 `bigInt:true` 时替换加法为 `OP_add_bigint` 并在运行时标记。  
4. CFG 优化与 Peephole：模仿 QuickJS 的 `parser.c` 优化路径（短跳转折叠、inc/dec 合并等）。  
5. 符号/Atom 表：引入类似 `JSAtom` 的字符串池，支持属性访问、方法名。  
6. 函数与作用域：多函数/闭包、参数、返回值管理。  
7. 序列化对齐：扩展二进制格式贴近 QuickJS 真正的 FunctionBytecode 结构，加入 flag、stack size、局部变量数、行列映射。  
8. 测试与微执行器：使用 `src/testkit/interpreter.ts` 做语义回归（ToNumber、NaN、==/===）。  
9. 安全与诊断：AST 走查 + 错误信息 (位置、建议修复)。  
10. 性能：为常见模式（i++ / a[i]）增加专用 opcode。  

## 目录概览
- `scripts/gen-opcodes.ts` 指令生成器
- `opcodes.config.json` 特性开关
- `src/opcodes.ts` 生成结果
- `src/ir.ts` IR 定义
- `src/compile.ts` TS -> IR
- `src/bytecode.ts` IR -> 指令/常量池
- `src/assembler.ts` 序列化（仅 quickjs-like；已移除旧 QJBC 格式）
- `src/cli.ts` CLI 入口

## 免责声明
这是一个教学/探索用原型，并非可直接运行于 QuickJS VM 的正式字节码。进一步工作需严谨对齐 QuickJS 的真实内部结构与执行语义。
