# QuickJS 字节码对齐清单（WIP）

目标：TypeScript -> QuickJS 字节码完全对齐（不经 JS），跨 qjsc 和 wasm 反汇编一致，调试信息可用。

## 头部/函数元数据
- func_name / filename 原子
  - 期望：qjsc 写入 use strict、源文件名（.js），函数名可为空或 `input`。
  - 现状：自编译 atoms 顺序不同（见 compute.ts、call.ts 对比），需要对齐原子表构造与 first_atom 偏移策略。
- flags（JSFunctionBytecode.flags）
  - 期望：1536（JS_CALL_FLAG_GENERATOR=0 仅示例），与 qjsc 一致。
  - 现状：两边均为 1536；通过。
- js_mode（严格模式）
  - 期望：包含 JS_MODE_STRICT。
  - 现状：两边均为 1；通过。
- arg_count / var_count / defined_arg_count / stack_size / closure_var_count
  - 期望：匹配 qjsc。stack_size 常见差异点需复核。
  - 现状：compute.ts 匹配；call.ts stack_size 自编译为 4，qjsc 为 3；待核对栈高估计逻辑。

## 原子表（atoms）/ first_atom
- 期望：
  - 顺序匹配 qjsc 的构建策略：['use strict', <源.js名>, ...标识符/属性名...]；first_atom 偏移在 BC_VERSION=5 下与 qjsc 相同。
- 现状：
  - compute.ts 列表不同：我方把 'results','push','input.ts','input','i','a'；qjsc 为 'i','a','results','use strict','push','__tests__/compute.js'。
  - 任务：
    1) 统一源文件名（.ts -> .js）还是保持 .ts 但确保 first_atom 及引用编号一致。
    2) 复用 qjsc 的原子去重与排序策略（见 parser.c 中 new_atom / add_closure_var 时机）。

## 常量池（cpool）编码
- 期望：与 qjsc 完全一致（u8 tag + uleb 长度 + 数据，或内联数值/双精度编码）。
- 现状：compute.ts cpoolCount=0；call.ts cpoolCount=1（存在数值常量）；需要检查我方编码是否与 qjsc 一致，尤其小数与双精度。

## 指令集与短指令映射
- 期望：
  - 助记符序列逐条一致（允许跳转位移不同但语义等价时需规范化）。
  - 使用与 qjsc 相同的短指令（如 get_loc0/set_loc0、goto8/if_false8、push_i8 等），并正确回退到长格式。
- 现状（compute.ts）：
  - 我方起始为 OP_check_define_var -> OP_array_from -> OP_dup -> OP_put_loc_check_init ...
  - qjsc 启发式反汇编显示存在更多 OP_put_loc 序列，且使用 put_field 等；指令排序与选择不一致。
  - 需要：
    1) 对 `results.push(a + i)` 的 lowering 与 qjsc 对齐（qjsc 通常 pattern：get_loc/dup/put_loc/...；检查 method 调用前 receiver/func/args 入栈顺序）。
    2) 自增 i 的序列：我们是 get/dup/inc/put/drop；qjsc 可能用 set_loc0 或不同短指令。补规范化映射或调整 emitter。
- 现状（call.ts）：
  - 我方生成 OP_call 路径，但 qjsc 起始是 get_field/push_const 等（函数体/调用位点的选择不同）。
  - 函数 foo 空体导致我们仍序列化了额外常量与指令；需对齐 qjsc 的空函数处理。

## 跳转与标签（goto/if_false）
- 期望：
  - 采用 if_false8/goto8 短跳时机一致；位移不同不影响语义。
- 现状：
  - compute.ts 我方用了 if_false8/goto8；qjsc 用长格式（或不同布局）。
  - 建议：比较规范化助记符后再聚焦非规范化差异。

## 词法/TDZ 与全局变量
- 期望：
  - 顶层 let/const 使用 put_loc_check_init 等；全局变量定义前使用 check_define_var，put_var_strict；与 qjsc 的 flags 一致。
- 现状：
  - compute.ts 我方已生成 OP_check_define_var、OP_put_var_strict；符合预期。
  - 仍需验证：函数/块级作用域下 var/let/const 的 var_defs 写入时机与 scope_level/next 链接。

## 闭包变量（closure_var）
- 期望：
  - is_local/is_arg/var_idx/is_const/is_lexical 与 qjsc 一致；引用层级正确。
- 现状：
  - 本次样例未涉及；后续通过闭包测试覆盖。

## pc2line/调试信息
- 期望：
  - has_debug=true 时，pc2line_buf 与 source/filename 与 qjsc 一致；find_line_num 和 col_num 可还原。
- 现状：
  - compute.ts 两边 has_debug 均为 true；需进一步对比 pc2line 序列是否一致（后续增加 dump 比对）。

## 模块/函数序列化标签
- 期望：
  - BC_VERSION=5 下函数标签 0x0C、模块标签 0x13 等与 qjsc 一致，嵌套函数引用与 fclosure 索引一致。
- 现状：
  - compare 输出显示 qjsc 二进制命中 0x0C/0x13；我方结构化解析成功读取自身布局；需补“对 qjsc 的启发式解析”或直接用 wasm 文字反汇编核对。

---

## 近期修正优先级
1) 原子表顺序与源文件名规范（.js/.ts）对齐；first_atom 偏移与引用统一。
2) `results.push(a + i)` 的指令入栈顺序与 call_method 序列对齐；补齐/规范短指令映射。
3) 自增（i++）的 lowering 与短指令选择；stack_size 估计对齐。
4) call.ts 空函数与顶层调用的编码策略对齐（常量池与 op 序列）。
5) 增加 pc2line 文字对比（wasm dump），确认行列映射一致。

## 验证用例覆盖（建议）
- 变量与作用域：var/let/const、TDZ、块级、函数参数默认值。
- 闭包：捕获本地/参数、父级索引、多层闭包。
- 控制流：if/else、for/while、break/continue、短跳与长跳边界。
- 调用族：直接调用、方法调用、new、call/apply、this 绑定。
- 常量：整数、双精度、字符串（宽/UTF-8）、模板字面量、对象/数组字面量。
- 调试：pc2line 断点映射、sourceURL、文件名。
