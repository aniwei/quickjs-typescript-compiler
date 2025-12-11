# QuickJS 字节码编译器转译技术方案

## 1. 概述

### 1.1 项目目标
将 QuickJS C 语言字节码编译器 100% 行级别转译为 TypeScript，使用 TypeScript AST 替代 QuickJS 自有的词法分析和语法分析部分，生成与 QuickJS WASM 完全一致的字节码。

### 1.2 转译原则
1. **字段完全对应**: 编译器模块字段必须 1:1 对应 QuickJS 源码定义
2. **流程逻辑等价**: 编译器流程逻辑 100% 对应 QuickJS 源码行级别转译
3. **AST 替换**: QuickJS 词法/语法分析部分使用 TypeScript AST 替代
4. **Env 不可变**: `Env.ts` 内容不允许更新，只能通过 `getEnv.ts` 调用 WASM QuickJS 生成
5. **代码风格**: 驼峰命名、类组织、分号可省略、2空格缩进

---

## 2. 源码结构分析

### 2.1 QuickJS 编译器核心文件

| QuickJS 文件 | 行数 | 主要功能 |
|-------------|-----|---------|
| `src/core/parser.c` | 13697 | 词法分析、语法分析、字节码生成、变量解析、标签解析 |
| `src/core/parser.h` | ~400 | 编译器数据结构定义 |
| `src/core/types.h` | 1004 | 核心类型定义 (JSFunctionDef, JSVarDef, etc.) |
| `src/core/bytecode.h` | ~50 | 字节码相关函数声明 |
| `src/core/function.h` | ~180 | 函数调用相关常量定义 |
| `include/QuickJS/quickjs-opcode.h` | - | 操作码定义 |
| `include/QuickJS/quickjs-atom.h` | - | Atom 定义 |

### 2.2 QuickJS 核心数据结构

```
JSFunctionDef (函数定义)
├── ctx: JSContext*
├── parent: JSFunctionDef*
├── child_list: list_head
├── is_eval, is_func_expr, ...
├── func_kind, func_type, js_mode
├── func_name: JSAtom
├── vars: JSVarDef[]
├── args: JSVarDef[]
├── closure_var: JSClosureVar[]
├── global_vars: JSGlobalVar[]
├── byte_code: DynBuf
├── label_slots: LabelSlot[]
├── cpool: JSValue[]
├── scopes: JSVarScope[]
├── jump_slots: JumpSlot[]
├── line_number_slots: LineNumberSlot[]
├── pc2line, pc2column: DynBuf
└── ic: InlineCache*

JSVarDef (变量定义)
├── var_name: JSAtom
├── scope_level: int
├── scope_next: int
├── is_const, is_lexical, is_captured
├── var_kind: JSVarKindEnum
└── func_pool_idx: int

JSClosureVar (闭包变量)
├── is_local, is_arg, is_const, is_lexical
├── var_kind: JSVarKindEnum
├── var_idx: uint16_t
└── var_name: JSAtom

BlockEnv (块环境)
├── prev: BlockEnv*
├── label_name: JSAtom
├── label_break, label_cont: int
├── drop_count, label_finally: int
├── scope_level: int
└── has_iterator, is_regular_stmt: bool
```

---

## 3. 模块划分与函数对照表

### 3.1 模块对照总览

| TypeScript 模块 | QuickJS 源文件 | 主要功能 |
|----------------|---------------|---------|
| `FunctionDef.ts` | `parser.h`, `types.h` | 函数定义数据结构 |
| `BytecodeBuilder.ts` | `cutils.c` (DynBuf) | 字节码缓冲区构建 |
| `Compiler.ts` | `parser.c` | 主编译器入口 |
| `CompilerContext.ts` | `parser.c` (JSParseState) | 编译器上下文 |
| `ScopeManager.ts` | `parser.c` | 作用域管理 |
| `LabelManager.ts` | `parser.c` | 标签管理 |
| `VariableResolver.ts` | `parser.c` | 变量解析 |
| `AtomTable.ts` | `quickjs.c` | Atom 表管理 |
| `visitors/*.ts` | `parser.c` | AST 访问器 |

### 3.2 详细函数对照表

#### 3.2.1 FunctionDef.ts ← parser.h, types.h

| TypeScript | QuickJS | 说明 |
|-----------|---------|------|
| `class FunctionDef` | `struct JSFunctionDef` | 函数定义结构 |
| `class JSVarDef` | `struct JSVarDef` | 变量定义 |
| `class JSClosureVar` | `struct JSClosureVar` | 闭包变量 |
| `class JSGlobalVar` | `struct JSGlobalVar` | 全局变量 |
| `class BlockEnv` | `struct BlockEnv` | 块环境 |
| `class LabelSlot` | `struct LabelSlot` | 标签槽 |
| `class JumpSlot` | `struct JumpSlot` | 跳转槽 |
| `class LineNumberSlot` | `struct LineNumberSlot` | 行号槽 |
| `class JSVarScope` | `struct JSVarScope` | 变量作用域 |
| `enum JSVarKind` | `enum JSVarKindEnum` | 变量类型枚举 |

#### 3.2.2 BytecodeBuilder.ts ← cutils.c

| TypeScript | QuickJS | 说明 |
|-----------|---------|------|
| `putByte(c)` | `dbuf_putc(s, c)` | 写入单字节 |
| `putU16(val)` | `dbuf_put_u16(s, val)` | 写入 16 位整数 |
| `putU32(val)` | `dbuf_put_u32(s, val)` | 写入 32 位整数 |
| `putULEB128(val)` | - | 写入 ULEB128 编码 |
| `putSLEB128(val)` | - | 写入 SLEB128 编码 |
| `realloc(size)` | `dbuf_realloc(s, size)` | 重新分配缓冲区 |

#### 3.2.3 Compiler.ts ← parser.c (核心编译)

| TypeScript | QuickJS | 行号 | 说明 |
|-----------|---------|-----|------|
| `jsNewFunctionDef()` | `js_new_function_def()` | 8215 | 创建函数定义 |
| `jsFreeFunctionDef()` | `js_free_function_def()` | 8286 | 释放函数定义 |
| `jsCreateFunction()` | `js_create_function()` | 12439 | 创建函数对象 |
| `emitOp(op)` | `emit_op(s, val)` | 1788 | 发射操作码 |
| `emitU8(val)` | `emit_u8(s, val)` | 1764 | 发射 8 位值 |
| `emitU16(val)` | `emit_u16(s, val)` | 1768 | 发射 16 位值 |
| `emitU32(val)` | `emit_u32(s, val)` | 1772 | 发射 32 位值 |
| `emitAtom(name)` | `emit_atom(s, name)` | 1795 | 发射 Atom |
| `emitLabel(label)` | `emit_label(s, label)` | 1851 | 发射标签 |
| `emitGoto(opcode, label)` | `emit_goto(s, opcode, label)` | 1862 | 发射跳转 |
| `emitPushConst(val)` | `emit_push_const(s, val, as_atom)` | 1893 | 发射常量推送 |
| `newLabel()` | `new_label(s)` | 1835 | 创建新标签 |
| `newLabelFd()` | `new_label_fd(fd)` | 1814 | 创建新标签(fd) |
| `cpoolAdd(val)` | `cpool_add(s, val)` | 1880 | 添加常量池 |

#### 3.2.4 ScopeManager.ts ← parser.c (作用域管理)

| TypeScript | QuickJS | 行号 | 说明 |
|-----------|---------|-----|------|
| `pushScope()` | `push_scope(s)` | 2031 | 进入作用域 |
| `popScope()` | `pop_scope(s)` | 2069 | 退出作用域 |
| `closeScopes()` | `close_scopes(s, scope, scope_stop)` | 2084 | 关闭作用域 |
| `addVar()` | `add_var(ctx, fd, name)` | 2092 | 添加变量 |
| `addScopeVar()` | `add_scope_var(ctx, fd, name, var_kind)` | 2111 | 添加作用域变量 |
| `addFuncVar()` | `add_func_var(ctx, fd, name)` | 2126 | 添加函数变量 |
| `addArgumentsVar()` | `add_arguments_var(ctx, fd)` | 2138 | 添加 arguments 变量 |
| `findVar()` | `find_var(ctx, fd, name)` | 1937 | 查找变量 |
| `findArg()` | `find_arg(ctx, fd, name)` | 1929 | 查找参数 |
| `findVarInScope()` | `find_var_in_scope(ctx, fd, name, scope)` | 1951 | 在作用域中查找变量 |
| `findGlobalVar()` | `find_global_var(fd, name)` | 1999 | 查找全局变量 |
| `findLexicalDecl()` | `find_lexical_decl(ctx, fd, name, scope, check)` | 2016 | 查找词法声明 |

#### 3.2.5 VariableResolver.ts ← parser.c (变量解析)

| TypeScript | QuickJS | 行号 | 说明 |
|-----------|---------|-----|------|
| `resolveVariables()` | `resolve_variables(ctx, s)` | 10456 | 解析变量 |
| `resolveScopeVar()` | `resolve_scope_var(ctx, s, var_name, scope, op, bc, ...)` | 9140 | 解析作用域变量 |
| `resolvePseudoVar()` | `resolve_pseudo_var(ctx, s, var_name)` | 9077 | 解析伪变量 |
| `addClosureVar()` | `add_closure_var(ctx, fd, is_local, ...)` | 8812 | 添加闭包变量 |
| `getClosureVar()` | `get_closure_var(ctx, s, fd, is_arg, var_idx, ...)` | 8876 | 获取闭包变量 |
| `addEvalVariables()` | `add_eval_variables(ctx, fd)` | 10306 | 添加 eval 变量 |
| `markEvalCapturedVariables()` | `mark_eval_captured_variables(ctx, s, scope)` | 10100 | 标记 eval 捕获变量 |

#### 3.2.6 LabelManager.ts ← parser.c (标签/跳转解析)

| TypeScript | QuickJS | 行号 | 说明 |
|-----------|---------|-----|------|
| `resolveLabels()` | `resolve_labels(ctx, s)` | 11088 | 解析标签 |
| `computeStackSize()` | `compute_stack_size(ctx, fd, pstack_size)` | 12196 | 计算栈大小 |
| `updateLabel()` | `update_label(s, label, delta)` | 1805 | 更新标签引用计数 |
| `skipDeadCode()` | `skip_dead_code(s, bc_buf, bc_len, pos, line)` | 10625 | 跳过死代码 |

#### 3.2.7 visitors/StatementVisitor.ts ← parser.c (语句编译)

| TypeScript | QuickJS | 行号 | 说明 |
|-----------|---------|-----|------|
| `visitBlock()` | `js_parse_block(s)` | 6491 | 编译块语句 |
| `visitIfStatement()` | (js_parse_statement_or_decl) | 6914+ | 编译 if 语句 |
| `visitWhileStatement()` | (js_parse_statement_or_decl) | 6914+ | 编译 while 语句 |
| `visitDoStatement()` | (js_parse_statement_or_decl) | 6914+ | 编译 do-while 语句 |
| `visitForStatement()` | (js_parse_statement_or_decl) | 6914+ | 编译 for 语句 |
| `visitForOfStatement()` | (js_parse_statement_or_decl) | 6914+ | 编译 for-of 语句 |
| `visitForInStatement()` | (js_parse_statement_or_decl) | 6914+ | 编译 for-in 语句 |
| `visitSwitchStatement()` | (js_parse_statement_or_decl) | 6914+ | 编译 switch 语句 |
| `visitTryStatement()` | (js_parse_statement_or_decl) | 6914+ | 编译 try 语句 |
| `visitReturnStatement()` | (js_parse_statement_or_decl) | 6914+ | 编译 return 语句 |
| `visitThrowStatement()` | (js_parse_statement_or_decl) | 6914+ | 编译 throw 语句 |
| `visitBreakStatement()` | (js_parse_statement_or_decl) | 6914+ | 编译 break 语句 |
| `visitContinueStatement()` | (js_parse_statement_or_decl) | 6914+ | 编译 continue 语句 |
| `visitLabeledStatement()` | (js_parse_statement_or_decl) | 6914+ | 编译带标签语句 |
| `visitVariableStatement()` | (js_parse_statement_or_decl) | 6914+ | 编译变量声明 |

#### 3.2.8 visitors/ExpressionVisitor.ts ← parser.c (表达式编译)

| TypeScript | QuickJS | 行号 | 说明 |
|-----------|---------|-----|------|
| `visitBinaryExpression()` | `js_parse_coalesce_expr()` | 5925 | 编译二元表达式 |
| `visitPrefixUnaryExpression()` | `js_parse_unary(s, parse_flags)` | 5584 | 编译前缀一元表达式 |
| `visitPostfixUnaryExpression()` | `js_parse_postfix_expr(s, parse_flags)` | 4818 | 编译后缀表达式 |
| `visitConditionalExpression()` | `js_parse_cond_expr(s, parse_flags)` | 5954 | 编译条件表达式 |
| `visitCallExpression()` | (js_parse_postfix_expr) | 4818+ | 编译函数调用 |
| `visitPropertyAccessExpression()` | (js_parse_postfix_expr) | 4818+ | 编译属性访问 |
| `visitElementAccessExpression()` | (js_parse_postfix_expr) | 4818+ | 编译元素访问 |
| `visitArrayLiteralExpression()` | `js_parse_array_literal(s)` | 3743 | 编译数组字面量 |
| `visitObjectLiteralExpression()` | `js_parse_object_literal(s)` | 2912 | 编译对象字面量 |
| `visitNewExpression()` | (js_parse_postfix_expr) | 4818+ | 编译 new 表达式 |
| `visitDeleteExpression()` | `js_parse_delete(s)` | 5495 | 编译 delete 表达式 |
| `visitTypeOfExpression()` | (js_parse_unary) | 5584+ | 编译 typeof 表达式 |
| `visitVoidExpression()` | (js_parse_unary) | 5584+ | 编译 void 表达式 |
| `visitAssignmentExpression()` | `js_parse_assign_expr2(s, parse_flags)` | 5982 | 编译赋值表达式 |
| `visitSpreadElement()` | `js_emit_spread_code(s, depth)` | 4189 | 编译展开元素 |
| `visitTemplateExpression()` | `js_parse_template(s, call, argc)` | 2437 | 编译模板字符串 |

#### 3.2.9 visitors/FunctionVisitor.ts ← parser.c (函数编译)

| TypeScript | QuickJS | 行号 | 说明 |
|-----------|---------|-----|------|
| `visitFunctionDeclaration()` | `js_parse_function_decl(s, type, export, pname, first_name)` | 13474 | 编译函数声明 |
| `visitFunctionExpression()` | `js_parse_function_decl2(s, type, export, pname, first_name)` | 12892 | 编译函数表达式 |
| `visitArrowFunction()` | (js_parse_function_decl2) | 12892+ | 编译箭头函数 |
| `visitMethodDeclaration()` | (js_parse_function_decl2) | 12892+ | 编译方法声明 |
| `visitGetAccessor()` | (js_parse_function_decl2) | 12892+ | 编译 getter |
| `visitSetAccessor()` | (js_parse_function_decl2) | 12892+ | 编译 setter |
| `parseDirectives()` | `js_parse_directives(s)` | 12709 | 解析指令 |
| `parseFunctionCheckNames()` | `js_parse_function_check_names(s, fd, func_type)` | 12804 | 检查函数名 |
| `parseDestructuringElement()` | `js_parse_destructuring_element(s, tok, is_arg, ...)` | 4277 | 解析解构元素 |

#### 3.2.10 visitors/ClassVisitor.ts ← parser.c (类编译)

| TypeScript | QuickJS | 行号 | 说明 |
|-----------|---------|-----|------|
| `visitClassDeclaration()` | `js_parse_class(s, is_class_expr, export_flag)` | 3213 | 编译类声明 |
| `visitClassExpression()` | `js_parse_class(s, is_class_expr, export_flag)` | 3213 | 编译类表达式 |
| `visitClassDefaultCtor()` | `js_parse_class_default_ctor(s, has_extends, fd)` | 3044 | 编译默认构造函数 |
| `visitClassFieldsInit()` | `js_parse_function_class_fields_init(s)` | 12860 | 编译类字段初始化 |
| `visitPropertyName()` | `js_parse_property_name(s, pname, allow_method, ...)` | 2571 | 编译属性名 |

#### 3.2.11 visitors/LiteralVisitor.ts ← parser.c (字面量编译)

| TypeScript | QuickJS | 行号 | 说明 |
|-----------|---------|-----|------|
| `visitNumericLiteral()` | - | - | 编译数字字面量 |
| `visitStringLiteral()` | - | - | 编译字符串字面量 |
| `visitBigIntLiteral()` | - | - | 编译 BigInt 字面量 |
| `visitRegExpLiteral()` | `js_parse_regexp(s)` | 464 | 编译正则表达式字面量 |
| `visitNullLiteral()` | - | - | 编译 null 字面量 |
| `visitBooleanLiteral()` | - | - | 编译布尔字面量 |

#### 3.2.12 visitors/IdentifierVisitor.ts ← parser.c (标识符编译)

| TypeScript | QuickJS | 行号 | 说明 |
|-----------|---------|-----|------|
| `visitIdentifier()` | - | - | 编译标识符 |
| `emitScopeGetVar()` | (resolve_scope_var) | - | 发射获取变量 |
| `emitScopePutVar()` | (resolve_scope_var) | - | 发射设置变量 |

---

## 4. 字段完整性对照

### 4.1 JSFunctionDef 字段对照

| QuickJS 字段 | TypeScript 字段 | 类型 | 状态 |
|-------------|----------------|-----|------|
| `ctx` | (implicit) | JSContext* | N/A |
| `parent` | `parent` | FunctionDef\|null | ✅ |
| `parent_cpool_idx` | `parentCpoolIdx` | int | ✅ |
| `parent_scope_level` | `parentScopeLevel` | int | ✅ |
| `child_list` | `childList` | list_head | ✅ |
| `link` | `link` | list_head | ✅ |
| `is_eval` | `isEval` | BOOL | ✅ |
| `eval_type` | `evalType` | int | ✅ |
| `is_global_var` | `isGlobalVar` | BOOL | ✅ |
| `is_func_expr` | `isFuncExpr` | BOOL | ✅ |
| `has_home_object` | `hasHomeObject` | BOOL | ✅ |
| `has_prototype` | `hasPrototype` | BOOL | ✅ |
| `has_simple_parameter_list` | `hasSimpleParameterList` | BOOL | ✅ |
| `has_parameter_expressions` | `hasParameterExpressions` | BOOL | ✅ |
| `has_use_strict` | `hasUseStrict` | BOOL | ✅ |
| `has_eval_call` | `hasEvalCall` | BOOL | ✅ |
| `has_arguments_binding` | `hasArgumentsBinding` | BOOL | ✅ |
| `has_this_binding` | `hasThisBinding` | BOOL | ✅ |
| `new_target_allowed` | `newTargetAllowed` | BOOL | ✅ |
| `super_call_allowed` | `superCallAllowed` | BOOL | ✅ |
| `super_allowed` | `superAllowed` | BOOL | ✅ |
| `arguments_allowed` | `argumentsAllowed` | BOOL | ✅ |
| `is_derived_class_constructor` | `isDerivedClassConstructor` | BOOL | ✅ |
| `in_function_body` | `inFunctionBody` | BOOL | ✅ |
| `func_kind` | `funcKind` | uint8_t | ✅ |
| `func_type` | `funcType` | uint8_t | ✅ |
| `js_mode` | `jsMode` | uint8_t | ✅ |
| `func_name` | `funcName` | JSAtom | ✅ |
| `vars` | `vars` | JSVarDef[] | ✅ |
| `var_size` | `varSize` | int | ✅ |
| `var_count` | `varCount` | int | ✅ |
| `args` | `args` | JSVarDef[] | ✅ |
| `arg_size` | `argSize` | int | ✅ |
| `arg_count` | `argCount` | int | ✅ |
| `defined_arg_count` | `definedArgCount` | int | ✅ |
| `var_object_idx` | `varObjectIdx` | int | ✅ |
| `arg_var_object_idx` | `argVarObjectIdx` | int | ✅ |
| `arguments_var_idx` | `argumentsVarIdx` | int | ✅ |
| `arguments_arg_idx` | `argumentsArgIdx` | int | ✅ |
| `func_var_idx` | `funcVarIdx` | int | ✅ |
| `eval_ret_idx` | `evalRetIdx` | int | ✅ |
| `this_var_idx` | `thisVarIdx` | int | ✅ |
| `new_target_var_idx` | `newTargetVarIdx` | int | ✅ |
| `this_active_func_var_idx` | `thisActiveFuncVarIdx` | int | ✅ |
| `home_object_var_idx` | `homeObjectVarIdx` | int | ✅ |
| `need_home_object` | `needHomeObject` | BOOL | ✅ |
| `scope_level` | `scopeLevel` | int | ✅ |
| `scope_first` | `scopeFirst` | int | ✅ |
| `scope_size` | `scopeSize` | int | ✅ |
| `scope_count` | `scopeCount` | int | ✅ |
| `scopes` | `scopes` | JSVarScope[] | ✅ |
| `def_scope_array` | `defScopeArray` | JSVarScope[4] | ✅ |
| `body_scope` | `bodyScope` | int | ✅ |
| `global_var_count` | `globalVarCount` | int | ✅ |
| `global_var_size` | `globalVarSize` | int | ✅ |
| `global_vars` | `globalVars` | JSGlobalVar[] | ✅ |
| `byte_code` | `byteCode` | DynBuf | ✅ |
| `last_opcode_pos` | `lastOpcodePos` | int | ✅ |
| `last_opcode_source_ptr` | `lastOpcodeSourcePtr` | uint8_t* | ✅ |
| `use_short_opcodes` | `useShortOpcodes` | BOOL | ✅ |
| `label_slots` | `labelSlots` | LabelSlot[] | ✅ |
| `label_size` | `labelSize` | int | ✅ |
| `label_count` | `labelCount` | int | ✅ |
| `top_break` | `topBreak` | BlockEnv* | ✅ |
| `cpool` | `cpool` | JSValue[] | ✅ |
| `cpool_count` | `cpoolCount` | int | ✅ |
| `cpool_size` | `cpoolSize` | int | ✅ |
| `closure_var_count` | `closureVarCount` | int | ✅ |
| `closure_var_size` | `closureVarSize` | int | ✅ |
| `closure_var` | `closureVar` | JSClosureVar[] | ✅ |
| `jump_slots` | `jumpSlots` | JumpSlot[] | ✅ |
| `jump_size` | `jumpSize` | int | ✅ |
| `jump_count` | `jumpCount` | int | ✅ |
| `line_number_slots` | `lineNumberSlots` | LineNumberSlot[] | ✅ |
| `line_number_size` | `lineNumberSize` | int | ✅ |
| `line_number_count` | `lineNumberCount` | int | ✅ |
| `line_number_last` | `lineNumberLast` | int | ✅ |
| `line_number_last_pc` | `lineNumberLastPc` | int | ✅ |
| `column_number_slots` | `columnNumberSlots` | ColumnNumberSlot[] | ✅ |
| `column_number_size` | `columnNumberSize` | int | ✅ |
| `column_number_count` | `columnNumberCount` | int | ✅ |
| `column_number_last` | `columnNumberLast` | int | ✅ |
| `column_number_last_pc` | `columnNumberLastPc` | int | ✅ |
| `strip_debug` | `stripDebug` | BOOL | ✅ |
| `strip_source` | `stripSource` | BOOL | ✅ |
| `filename` | `filename` | JSAtom | ✅ |
| `source_pos` | `sourcePos` | uint32_t | ✅ |
| `get_line_col_cache` | `getLineColCache` | GetLineColCache* | ✅ |
| `pc2line` | `pc2line` | DynBuf | ✅ |
| `pc2column` | `pc2column` | DynBuf | ✅ |
| `source` | `source` | char* | ✅ |
| `source_len` | `sourceLen` | int | ✅ |
| `module` | `module` | JSModuleDef* | ✅ |
| `has_await` | `hasAwait` | BOOL | ✅ |
| `ic` | `ic` | InlineCache* | ✅ |

---

## 5. 编译流程对照

### 5.1 QuickJS 编译主流程

```
js_parse_program(s)                    // 解析程序入口
├── js_parse_source_element(s)         // 解析源元素
│   ├── js_parse_function_decl(s, ...) // 解析函数声明
│   ├── js_parse_class(s, ...)         // 解析类声明  
│   └── js_parse_statement_or_decl(s)  // 解析语句或声明
│       ├── js_parse_expr(s)           // 解析表达式
│       │   ├── js_parse_assign_expr(s)
│       │   ├── js_parse_cond_expr(s)
│       │   ├── js_parse_coalesce_expr(s)
│       │   ├── js_parse_unary(s)
│       │   └── js_parse_postfix_expr(s)
│       └── ...控制流语句
└── js_create_function(ctx, fd)        // 创建函数对象
    ├── 重建 scope 链表
    ├── add_eval_variables(ctx, fd)    // (如需) 添加 eval 变量
    ├── add_module_variables(ctx, fd)  // (如需) 添加模块变量
    ├── js_create_function(ctx, child) // 递归创建子函数
    ├── resolve_variables(ctx, fd)     // 解析变量
    ├── resolve_labels(ctx, fd)        // 解析标签
    └── compute_stack_size(ctx, fd)    // 计算栈大小
```

### 5.2 TypeScript 编译流程对照

```
compile(sourceFile)                    // 编译入口
├── createRootFunctionDef()            // 创建根函数定义
├── visitSourceFile(sourceFile)        // 访问源文件
│   ├── visitFunctionDeclaration()     // 访问函数声明
│   ├── visitClassDeclaration()        // 访问类声明
│   └── visitStatement()               // 访问语句
│       ├── visitExpression()          // 访问表达式
│       └── ...控制流语句
└── finalize(fd)                       // 完成函数
    ├── rebuildScopeLinks()            // 重建 scope 链表
    ├── addEvalVariables(fd)           // (如需)
    ├── finalize(childFd)              // 递归处理子函数
    ├── resolveVariables(fd)           // 解析变量
    ├── resolveLabels(fd)              // 解析标签
    └── computeStackSize(fd)           // 计算栈大小
```

---

## 6. 关键差异处理

### 6.1 AST 差异
| 方面 | QuickJS | TypeScript | 处理方式 |
|-----|---------|-----------|---------|
| AST 来源 | 自有 lexer/parser | ts.SourceFile | 映射 TS 节点到 QJS 语义 |
| Token | 自定义 TOK_* | ts.SyntaxKind | 建立映射表 |
| 位置信息 | buf_ptr - buf_start | node.getStart() | 使用 TS 位置 API |
| 行列号 | get_line_col() | ts.getLineAndCharacterOfPosition() | 使用 TS API |

### 6.2 内存管理差异
| 方面 | QuickJS | TypeScript | 处理方式 |
|-----|---------|-----------|---------|
| 内存分配 | js_mallocz, js_free | new, GC | 依赖 JS GC |
| 引用计数 | JS_DupAtom, JS_FreeAtom | - | 不需要手动管理 |
| DynBuf | dbuf_* | BytecodeBuilder | 类方法封装 |

### 6.3 Atom 处理
| 方面 | QuickJS | TypeScript | 处理方式 |
|-----|---------|-----------|---------|
| Atom 获取 | JS_NewAtom | compiler.getAtom(str) | 使用 AtomTable |
| 内置 Atom | JS_ATOM_* | JSAtom.JS_ATOM_* | 从 Env 导入 |
| Atom 复制 | JS_DupAtom | - | 不需要 |

---

## 7. 测试策略

### 7.1 单元测试
- 每个模块对应测试文件
- 测试数据结构正确性
- 测试函数逻辑正确性

### 7.2 集成测试 (Fixtures)
- 使用 `__tests__/fixtures/` 目录下的测试用例
- 与 WASM QuickJS 生成的字节码进行二进制对比
- 使用 `compareWithWasm.ts` 脚本进行比较

### 7.3 测试用例覆盖
- 基础语法: primitives, variables, operators
- 控制流: if-else, for, while, switch, try-catch
- 函数: function, arrow, method, getter/setter
- 类: class, inheritance, private fields
- 闭包: closure, captured variables
- 模块: import, export

---

## 8. 实施计划概览

详细实施计划请参见 `TRANSPILATION_PLAN.md`。

| 阶段 | 内容 | 估计工时 |
|-----|------|---------|
| 阶段 1 | 数据结构完善 | 2-3 天 |
| 阶段 2 | 核心编译器方法 | 3-4 天 |
| 阶段 3 | 作用域与变量管理 | 2-3 天 |
| 阶段 4 | 表达式编译 | 3-4 天 |
| 阶段 5 | 语句编译 | 3-4 天 |
| 阶段 6 | 函数与类编译 | 4-5 天 |
| 阶段 7 | 变量解析 | 3-4 天 |
| 阶段 8 | 标签解析与栈计算 | 2-3 天 |
| 阶段 9 | 调试信息与最终输出 | 2-3 天 |
| 阶段 10 | 集成测试与修复 | 3-5 天 |

**总计**: 约 27-38 个工作日

---

## 附录 A: QuickJS 操作码格式

```
OP_FMT_none      - 无操作数
OP_FMT_loc       - 16位本地变量索引
OP_FMT_arg       - 16位参数索引
OP_FMT_var_ref   - 16位闭包变量索引
OP_FMT_u8        - 8位无符号整数
OP_FMT_i8        - 8位有符号整数
OP_FMT_u16       - 16位无符号整数
OP_FMT_i16       - 16位有符号整数
OP_FMT_u32       - 32位无符号整数
OP_FMT_i32       - 32位有符号整数
OP_FMT_label     - 32位标签索引
OP_FMT_atom      - 32位 Atom 索引
OP_FMT_atom_u8   - 32位 Atom + 8位值
OP_FMT_atom_u16  - 32位 Atom + 16位值
OP_FMT_atom_label_u8 - 32位 Atom + 32位标签 + 8位值
OP_FMT_label_u16 - 32位标签 + 16位值
OP_FMT_npop      - 16位 pop 计数
OP_FMT_npopx     - 16位 popx 计数
```

---

## 附录 B: 参考资源

- QuickJS 源码: `third_party/QuickJS/`
- QuickJS 文档: https://bellard.org/quickjs/
- TypeScript AST: https://ts-ast-viewer.com/
- 现有实现: `src/compiler/`
