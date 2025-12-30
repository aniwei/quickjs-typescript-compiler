# QuickJS TypeScript 编译器转译复盘分析报告

**分析日期**: 2025-12-18
**分析范围**: 编译流程各阶段对照 QuickJS C 源码

---

## 1. 总体评估

### 1.1 转译完成度概览

| 模块 | C源文件 | TS实现 | 状态 | 关键问题 |
|------|---------|--------|------|----------|
| 函数定义 | `types.h:JSFunctionDef` | `FunctionDef.ts` | ⚠️ 需审查 | 常量定义不一致 |
| 字节码生成 | `cutils.c:DynBuf` | `BytecodeBuilder.ts` | ✅ 正确 | - |
| 变量解析 | `parser.c:resolve_variables` | `VariableResolver.ts` | ⚠️ 需审查 | 导入错误常量 |
| 标签解析 | `parser.c:resolve_labels` | `LabelResolver.ts` | 待验证 | - |
| 栈大小计算 | `parser.c:compute_stack_size` | `StackSizeComputer.ts` | 待验证 | - |

---

## 2. 关键常量对照分析

### 2.1 发现的严重问题

#### 🔴 ARGUMENT_VAR_OFFSET 定义不一致

**C源码定义** (正确):
```c
// third_party/QuickJS/src/core/builtins/js-function.h:32
#define ARGUMENT_VAR_OFFSET 0x20000000  // = 536870912
```

**env.ts** (正确，来自WASM):
```typescript
// src/env.ts:6
export const ARGUMENT_VAR_OFFSET = 536870912  // 0x20000000 ✅
```

**FunctionDef.ts** (❌ 错误):
```typescript
// src/compiler/FunctionDef.ts:9
export const ARGUMENT_VAR_OFFSET = 0x10000  // = 65536 ❌
```

**影响范围**:
- `VariableResolver.ts` 从 `FunctionDef.ts` 导入此常量
- `Compiler.ts` 从 `FunctionDef.ts` 导入此常量
- `visitors/ExpressionVisitor.ts` 从 `FunctionDef.ts` 导入此常量
- `visitors/FunctionVisitor.ts` 从 `FunctionDef.ts` 导入此常量

**后果**: 所有涉及参数变量索引的位运算都会产生错误的结果，导致字节码不一致。

#### ✅ GLOBAL_VAR_OFFSET 定义正确

**C源码定义**:
```c
// third_party/QuickJS/src/core/builtins/js-function.h:31
#define GLOBAL_VAR_OFFSET 0x40000000  // = 1073741824
```

**Compiler.ts** (正确):
```typescript
// src/compiler/Compiler.ts:68
export const GLOBAL_VAR_OFFSET = 0x40000000  // ✅
```

**env.ts** (正确):
```typescript
// src/env.ts:5
export const GLOBAL_VAR_OFFSET = 1073741824  // 0x40000000 ✅
```

### 2.2 其他常量验证

| 常量名 | C源码值 | env.ts值 | 状态 |
|--------|---------|----------|------|
| `GLOBAL_VAR_OFFSET` | 0x40000000 | 1073741824 | ✅ 正确 |
| `ARGUMENT_VAR_OFFSET` | 0x20000000 | 536870912 | ✅ 正确 |
| `ARG_SCOPE_INDEX` | 1 | 1 | ✅ 正确 |
| `ARG_SCOPE_END` | -2 | -2 | ✅ 正确 |
| `DEBUG_SCOPE_INDEX` | -3 | -3 | ✅ 正确 |
| `JS_MAX_LOCAL_VARS` | 65534 | 65534 | ✅ 正确 |
| `JS_STACK_SIZE_MAX` | 65534 | 65534 | ✅ 正确 |
| `PC2LINE_BASE` | -1 | -1 | ✅ 正确 |
| `PC2LINE_RANGE` | 5 | 5 | ✅ 正确 |
| `PC2LINE_OP_FIRST` | 1 | 1 | ✅ 正确 |
| `PC2LINE_DIFF_PC_MAX` | 50 | 50 | ✅ 正确 (计算: (255-1)/5=50) |

---

## 3. WASM 导出枚举验证

### 3.1 CompileFlags

**C源码** (`QuickJSBinding.h`):
```cpp
enum CompileFlags {
  COMPILE_FLAG_NONE = 0,
  COMPILE_FLAG_DUMP = 1 << 0,    // 1
  COMPILE_FLAG_BIGNUM = 1 << 1,  // 2
  COMPILE_FLAG_SHORT_OPCODES = 1 << 2,  // 4
};
```

**env.ts** (验证结果):
```typescript
export enum CompileFlags {
  COMPILE_FLAG_NONE = 0,        // ✅
  COMPILE_FLAG_DUMP = 1,        // ✅
  COMPILE_FLAG_BIGNUM = 2,      // ✅
  COMPILE_FLAG_SHORT_OPCODES = 4,  // ✅
}
```

### 3.2 PutLValueEnum

**C源码**:
```cpp
enum PutLValueEnum {
  PUT_LVALUE_NOKEEP = 0,
  PUT_LVALUE_NOKEEP_DEPTH = 1,
  PUT_LVALUE_KEEP_TOP = 2,
  PUT_LVALUE_KEEP_SECOND = 3,
  PUT_LVALUE_NOKEEP_BOTTOM = 4,
};
```

**env.ts** (验证结果): ✅ 完全一致

### 3.3 JSFunctionKindEnum

**C源码** (`taro_js_types.h`):
```c
typedef enum JSFunctionKindEnum {
  JS_FUNC_NORMAL = 0,
  JS_FUNC_GENERATOR = (1 << 0),      // 1
  JS_FUNC_ASYNC = (1 << 1),          // 2
  JS_FUNC_ASYNC_GENERATOR = (JS_FUNC_GENERATOR | JS_FUNC_ASYNC),  // 3
} JSFunctionKindEnum;
```

**env.ts** (验证结果): ✅ 完全一致

### 3.4 JSMode

**C源码** (`taro_js_types.h`):
```c
#define JS_MODE_STRICT (1 << 0)              // 1
#define JS_MODE_ASYNC  (1 << 2)              // 4
#define JS_MODE_BACKTRACE_BARRIER (1 << 3)   // 8
```

**env.ts** (验证结果): ✅ 完全一致

### 3.5 PC2Line 常量

**C源码** (`taro_js_types.h`):
```c
#define PC2LINE_BASE (-1)
#define PC2LINE_RANGE 5
#define PC2LINE_OP_FIRST 1
#define PC2LINE_DIFF_PC_MAX ((255 - PC2LINE_OP_FIRST) / PC2LINE_RANGE)  // = 50
```

**env.ts** (验证结果): ✅ 完全一致

### 3.6 OPSpecialObjectEnum

**C源码** (`function.h`):
```c
typedef enum OPSpecialObjectEnum {
  OP_SPECIAL_OBJECT_ARGUMENTS,           // 0
  OP_SPECIAL_OBJECT_MAPPED_ARGUMENTS,    // 1
  OP_SPECIAL_OBJECT_THIS_FUNC,           // 2
  OP_SPECIAL_OBJECT_NEW_TARGET,          // 3
  OP_SPECIAL_OBJECT_HOME_OBJECT,         // 4
  OP_SPECIAL_OBJECT_VAR_OBJECT,          // 5
  OP_SPECIAL_OBJECT_IMPORT_META,         // 6
} OPSpecialObjectEnum;
```

**env.ts** (验证结果): ✅ 完全一致

### 3.7 BytecodeTag (BC_TAG_*)

**WASM导出** (`QuickJSBinding.cpp:getBytecodeTags`):
```cpp
BC_TAG_NULL = 1
BC_TAG_UNDEFINED = 2
BC_TAG_BOOL_FALSE = 3
BC_TAG_BOOL_TRUE = 4
BC_TAG_INT32 = 5
BC_TAG_FLOAT64 = 6
BC_TAG_STRING = 7
BC_TAG_OBJECT = 8
BC_TAG_ARRAY = 9
BC_TAG_BIG_INT = 10
BC_TAG_TEMPLATE_OBJECT = 11
BC_TAG_FUNCTION_BYTECODE = 12
BC_TAG_MODULE = 13
BC_TAG_TYPED_ARRAY = 14
BC_TAG_ARRAY_BUFFER = 15
BC_TAG_SHARED_ARRAY_BUFFER = 16
BC_TAG_DATE = 17
BC_TAG_OBJECT_VALUE = 18
BC_TAG_OBJECT_REFERENCE = 19
```

**env.ts** (验证结果): ✅ 完全一致

### 3.8 JSVarKindEnum

**C源码** (`types.h:363-375`):
```c
typedef enum {
  JS_VAR_NORMAL,                  // 0
  JS_VAR_FUNCTION_DECL,           // 1
  JS_VAR_NEW_FUNCTION_DECL,       // 2
  JS_VAR_CATCH,                   // 3
  JS_VAR_FUNCTION_NAME,           // 4
  JS_VAR_PRIVATE_FIELD,           // 5
  JS_VAR_PRIVATE_METHOD,          // 6
  JS_VAR_PRIVATE_GETTER,          // 7
  JS_VAR_PRIVATE_SETTER,          // 8
  JS_VAR_PRIVATE_GETTER_SETTER,   // 9
} JSVarKindEnum;
```

**FunctionDef.ts** (验证结果): ✅ 完全一致

---

## 4. 编译流程各阶段对照

### 4.1 阶段 1: AST 到初始字节码

**C源码位置**: `parser.c:js_parse_program()` → `js_parse_source_element()` → 各语句/表达式处理

**关键函数对照**:

| C函数 | 行号 | TS实现 | 状态 |
|-------|------|--------|------|
| `emit_op(s, val)` | 1788 | `Compiler.emitOp()` | 待验证 |
| `emit_u8(s, val)` | 1765 | `Compiler.emitU8()` | ✅ |
| `emit_u16(s, val)` | 1769 | `Compiler.emitU16()` | ✅ |
| `emit_u32(s, val)` | 1773 | `Compiler.emitU32()` | ✅ |
| `emit_atom(s, name)` | 1795 | `Compiler.emitAtom()` | 待验证 |
| `emit_label(s, label)` | 1857 | `Compiler.emitLabel()` | 待验证 |
| `emit_goto(s, opcode, label)` | 1867 | `Compiler.emitGoto()` | 待验证 |
| `new_label(s)` | 1840 | `Compiler.newLabel()` | 待验证 |

### 4.2 阶段 2: 变量解析 (resolve_variables)

**C源码位置**: `parser.c:10456 resolve_variables()`

**关键流程**:
1. 遍历字节码中的临时 scope 操作码
2. 解析变量引用，替换为正确的 `get_loc/get_arg/get_var_ref` 等
3. 处理闭包变量捕获

**关键函数对照**:

| C函数 | 行号 | TS实现 | 状态 |
|-------|------|--------|------|
| `resolve_variables(ctx, s)` | 10456 | `VariableResolver.resolveVariables()` | ⚠️ 使用错误的 ARGUMENT_VAR_OFFSET |
| `resolve_scope_var(...)` | 9148 | `VariableResolver.resolveScopeVar()` | ⚠️ 使用错误的 ARGUMENT_VAR_OFFSET |
| `resolve_pseudo_var(ctx, s, var_name)` | 9077 | `VariableResolver.resolvePseudoVar()` | 待验证 |
| `add_closure_var(ctx, fd, ...)` | 8812 | `VariableResolver.addClosureVar()` | 待验证 |
| `get_closure_var(ctx, s, fd, ...)` | 8876 | `VariableResolver.getClosureVar()` | 待验证 |

**C源码关键代码** (`parser.c:9220-9285`):
```c
if (var_idx >= 0) {
  if ((op == OP_scope_put_var || op == OP_scope_make_ref) &&
      !(var_idx & ARGUMENT_VAR_OFFSET) && s->vars[var_idx].is_const) {
    // ...
  }
  switch (op) {
    case OP_scope_get_var:
    case OP_scope_put_var:
      is_put = (op == OP_scope_put_var || op == OP_scope_put_var_init);
      if (var_idx & ARGUMENT_VAR_OFFSET) {
        dbuf_putc(bc, OP_get_arg + is_put);
        dbuf_put_u16(bc, var_idx - ARGUMENT_VAR_OFFSET);
      } else {
        // ...
      }
      break;
  }
}
```

**问题**: TS实现使用了错误的 `ARGUMENT_VAR_OFFSET` (0x10000)，应该是 (0x20000000)。

### 4.3 阶段 3: 标签解析 (resolve_labels)

**C源码位置**: `parser.c:11088 resolve_labels()`

**关键流程**:
1. 遍历字节码，解析标签位置
2. 计算跳转偏移
3. 优化短跳转

**关键函数对照**:

| C函数 | 行号 | TS实现 | 状态 |
|-------|------|--------|------|
| `resolve_labels(ctx, s)` | 11088 | `LabelResolver.resolveLabels()` | 待验证 |
| `skip_dead_code(s, bc_buf, bc_len, pos, line)` | 10625 | `LabelResolver.skipDeadCode()` | 待验证 |

### 4.4 阶段 4: 栈大小计算 (compute_stack_size)

**C源码位置**: `parser.c:12196 compute_stack_size()`

**关键函数对照**:

| C函数 | 行号 | TS实现 | 状态 |
|-------|------|--------|------|
| `compute_stack_size(ctx, fd, pstack_size)` | 12196 | `StackSizeComputer.compute()` | 待验证 |

### 4.5 阶段 5: 字节码序列化

**C源码位置**: `quickjs.c:js_create_function()` → `JS_WriteObject()`

**关键流程**:
1. 写入字节码版本
2. 写入 atom 表
3. 写入函数字节码头
4. 写入字节码和调试信息

---

## 5. C 文件调试日志添加方案

### 5.1 在 parser.c 添加编译阶段日志

创建 `qts_trace.h`:
```c
#pragma once

#include <stdio.h>

// 调试开关
#define QTS_TRACE_ENABLED 1

#if QTS_TRACE_ENABLED
#define QTS_TRACE(fmt, ...) fprintf(stderr, "[QTS_TRACE] " fmt "\n", ##__VA_ARGS__)
#define QTS_TRACE_BYTECODE(op, pos) fprintf(stderr, "[QTS_BC] pos=%d op=%d\n", pos, op)
#define QTS_TRACE_VAR(name, val) fprintf(stderr, "[QTS_VAR] %s = %d\n", name, val)
#else
#define QTS_TRACE(fmt, ...)
#define QTS_TRACE_BYTECODE(op, pos)
#define QTS_TRACE_VAR(name, val)
#endif
```

### 5.2 在关键位置添加日志

**parser.c:emit_op()**:
```c
static void emit_op(JSParseState* s, uint8_t val) {
  JSFunctionDef* fd = s->cur_func;
  DynBuf* bc = &fd->byte_code;

  QTS_TRACE("emit_op: op=%d pos=%zu", val, bc->size);
  
  fd->last_opcode_pos = bc->size;
  dbuf_putc(bc, val);
}
```

**parser.c:resolve_scope_var()**:
```c
static int resolve_scope_var(...) {
  QTS_TRACE("resolve_scope_var: var_name=%d scope_level=%d op=%d", 
            var_name, scope_level, op);
  // ...
  if (var_idx >= 0) {
    QTS_TRACE("  found var_idx=%d is_arg=%d", 
              var_idx, (var_idx & ARGUMENT_VAR_OFFSET) != 0);
  }
  // ...
}
```

**parser.c:resolve_variables()**:
```c
static __exception int resolve_variables(JSContext* ctx, JSFunctionDef* s) {
  QTS_TRACE("=== resolve_variables START ===");
  QTS_TRACE("  byte_code.size=%zu var_count=%d arg_count=%d closure_var_count=%d",
            s->byte_code.size, s->var_count, s->arg_count, s->closure_var_count);
  // ...
  QTS_TRACE("=== resolve_variables END ===");
}
```

### 5.3 重新编译 WASM 启用日志

修改 `CMakeLists.txt` 添加调试标志:
```cmake
add_definitions(-DQTS_TRACE_ENABLED=1)
add_definitions(-DDUMP_BYTECODE=255)  # 启用所有字节码dump
```

---

## 6. 修复建议

### 6.1 立即修复: ARGUMENT_VAR_OFFSET

**修复方案**: 删除 `FunctionDef.ts` 中的错误定义，统一从 `env.ts` 导入

**修改 FunctionDef.ts**:
```typescript
// 删除这一行:
// export const ARGUMENT_VAR_OFFSET = 0x10000

// 从 env.ts 导入:
import { ARGUMENT_VAR_OFFSET } from '../env'
// 然后重新导出:
export { ARGUMENT_VAR_OFFSET }
```

**或者直接在 FunctionDef.ts 中使用正确值**:
```typescript
export const ARGUMENT_VAR_OFFSET = 0x20000000  // 536870912
```

### 6.2 验证: 其他导入路径

确保所有使用 `ARGUMENT_VAR_OFFSET` 的文件都从正确的源导入:
- `VariableResolver.ts` 
- `Compiler.ts`
- `visitors/ExpressionVisitor.ts`
- `visitors/FunctionVisitor.ts`

### 6.3 建议: 统一常量管理

将所有常量统一从 `env.ts` 导出，`FunctionDef.ts` 不应该重新定义这些常量。

---

## 7. 下一步验证计划

1. **修复 ARGUMENT_VAR_OFFSET** - 立即执行
2. **添加C日志** - 编译新WASM验证
3. **运行对比测试** - 验证 closure-vars 等闭包测试用例
4. **逐阶段验证** - 分别验证 resolve_variables, resolve_labels, compute_stack_size

---

## 8. 附录: 文件对照表

| QuickJS C 源文件 | TypeScript 实现文件 | 对照状态 |
|------------------|---------------------|----------|
| `parser.c:1765-1880` (emit_*) | `Compiler.ts` | 待详细验证 |
| `parser.c:9077-9500` (resolve_scope_var) | `VariableResolver.ts:250-500` | ⚠️ 常量问题 |
| `parser.c:10456-10620` (resolve_variables) | `VariableResolver.ts` | 待详细验证 |
| `parser.c:11088-11500` (resolve_labels) | `LabelResolver.ts` | 待验证 |
| `parser.c:12196-12400` (compute_stack_size) | `StackSizeComputer.ts` | 待验证 |
| `types.h:350-450` (JSVarDef, JSClosureVar) | `FunctionDef.ts` | ✅ 结构对照完整 |
| `builtins/js-function.h` (常量定义) | `env.ts` | ✅ 正确 |
