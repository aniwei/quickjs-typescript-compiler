# QuickJS TypeScript Compiler TODO

> 目标：完全按 `third_party/QuickJS` 源码的数据结构与流程，实现 TypeScript 字节码编译器；最后对所有 fixtures 做字节码对比并收敛至一致。

## 阶段 0 · 基线与工具
- [x] 接入 QuickJS WASM，用于字节码基线与对比（scripts/QuickJSLib.ts 已有）
- [x] 提供最小可用编译管线（先通过 WASM 生成字节码，确保对比脚本可跑）
  - [x] 新增 `src/index.ts` 暴露 `TypeScriptCompiler`（TS 去类型后委托 WASM 编译）
  - [x] 新增 `src/serializer.ts`（serialize(entryPath) -> 字节码），调整 `scripts/compile.ts` 使用
- [x] 校验 CLI 与 compare 脚本在本机跑通（产出 artifacts 与报告）
  - [x] 新增 `scripts/compareAll.ts` 与 `pnpm compare:all`，对比全部 fixtures 并输出 `artifacts/summary.json`

## 阶段 1 · 数据结构对齐 QuickJS
- [x] 定义 `JSFunctionBytecode` 等价结构（参照：third_party/QuickJS/src/core/bytecode.cpp/.h）
  - [x] `flags/js_mode/func_name`、`arg_count/var_count/defined_arg_count/stack_size`
  - [x] `closure_var`、`cpool`、`byte_code_buf/len`、`debug` 与可选 pc2line/source（接口已对齐，序列化待实现）
- [x] 定义 `JSFunctionDef` 等价结构（参照：third_party/QuickJS/src/core/parser.h）
  - [x] 变量表 vars/args、scopes/labels/jumps、cpool/closure_var（接口骨架）
  - [ ] `use_short_opcodes`、`pc2line/pc2column` 与 strip_debug/strip_source（待接入）
- [x] atoms 表（参照 QuickJS Atom 机制）
  - [x] `firstAtomId = env.firstAtomId` 阈值
  - [x] 用户原子重定位到 `[firstAtomId + rank]`（`AtomTable.toWritableIndex` 已实现）

## 阶段 2 · 字节码写入器（完全对齐 QuickJS）
- [ ] `bytecodeWriter.ts`：实现与 `JS_WriteObject2/JS_WriteFunctionTag/JS_WriteFunctionBytecode` 同构的写入
  - [x] LEB128 正负数写入（已有 `src/leb128.ts` 可用）
  - [ ] 大小端处理、短指令字节序列重定位
  - [x] 原子表收集与写入（容器级 header/atoms 已支持）与索引重定位（`toWritableIndex` 已实现）
  - [ ] 函数头/locals/closure vars/cpool/debug 段落完整写出（进行中）
  - [ ] `supportsShortOpcodes = env.supportsShortOpcodes` 控制短指令
  - [x] 容器重写器：`rewriteContainerHeader`（用于过渡对齐与验证）

## 阶段 3 · 前端与代码生成（覆盖 fixtures 所需子集）
- [ ] 解析/归约：先用简单 TS 去类型文本 + 轻量 AST/遍历（或 TypeScript AST）
- [ ] 生成最小语义子集字节码（严格按 env.ts OPCODE/格式/尺寸）：
  - [ ] 字面量/一元/二元（例如 `1 + 2`）
  - [ ] 数组字面量（例如 `[1,2,3]`）
  - [ ] 变量声明/初始化（`const x = 1`）
  - [ ] 简单调用与成员访问（`console.log(…)`）
  - [ ] for-of（fixtures 若涉及）
- [ ] 保证 `use_short_opcodes` 时使用短指令变体（如 push_i8/loc 短格式）

## 阶段 4 · 编译管线切换与对比
- [ ] 将 `TypeScriptCompiler` 切换为：前端解析 + 我们的 `bytecodeWriter` 落盘（不再依赖 WASM）
- [x] 增加编译后端切换开关：`backend = wasm | writer-container | writer`
  - [x] `wasm`（默认）：当前所有 fixtures 10/10 对齐
  - [x] `writer-container`：仅重写容器 header/atoms（用于过渡与验证）
  - [ ] `writer`：完整 TS 写入（待实现）
- [ ] 跑 `scripts/compareWithWasm.ts` 对所有 fixtures：
  - [ ] 产出 `<name>.ts.qbc` vs `<name>.wasm.qbc` 与 disasm/asm/analysis 报告
  - [ ] 开启 `--normalize-short` 对齐短指令差异进行归一
  - [ ] 定位并修复差异（按字节、按结构分层）

## 阶段 5 · 测试与质量
- [ ] 为每个受支持语义补最小单测（__tests__/compiler/...）
- [ ] 增加反汇编（src/disasm.ts）完善：基于 env.ts 的 opcode 解码与参数解析
- [ ] CI：构建、lint、单测；对比报告作为 artifacts

## 交付与扩展
- [ ] README：介绍编译流程、字节码格式、如何对比与调试
- [ ] 性能：短指令启用/禁用、原子池去重、常量池合并等
- [ ] 覆盖更完整语法（类、闭包、异常、模块等）

---

### 当前状态
- 阶段 0 已完成，compare:all 通过（10/10）。
- 阶段 1 数据结构与原子表对齐完成（接口层面）。
- 阶段 2 写入器骨架就绪，容器 header/atoms 可重写；函数字节码完整序列化进行中。

### 下一步
- 完成 `bytecodeWriter.ts` 的函数字节码写入（flags/js_mode/func_name 重定位、arg/var/stack、vardefs、closure_var、cpool、byte_code_buf，先不写 debug）。
- 在 `TypeScriptCompiler` 开启 `backend=writer-container` 与 `backend=wasm` 的 A/B 验证，保证 compare 继续 10/10；随后推进 `backend=writer`。
- 增加 LEB128 与 Atom 重定位的最小单测，确保序列化/反序列化回归稳定。