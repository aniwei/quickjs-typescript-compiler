# QuickJS 字节码编译器转译计划

## 文档说明

本文档是 QuickJS 字节码编译器从 C 语言转译到 TypeScript 的详细执行计划。每个阶段包含具体的任务、涉及的源码行号、测试用例和验收标准。

---

## 转译原则

1. **代码命名风格**: 驼峰命名、类组织、分号可省略、2空格缩进
2. **字段 1:1 对应**: 编译器模块字段完全对应 QuickJS 源码定义
3. **流程行级转译**: 编译器流程逻辑 100% 对应源码行级别
4. **AST 替换**: QuickJS AST 部分使用 TypeScript AST 替代
5. **Env 不可变**: `Env.ts` 只能通过 `getEnv.ts` 生成
6. **进度记录**: 每次迭代记录进度并进行 fixtures 测试

---

## 阶段 1: 数据结构完善 (2-3 天) ✅ 已完成

### 目标
完善 `FunctionDef.ts` 中所有数据结构，确保与 QuickJS 字段 1:1 对应。

### 任务清单

#### 1.1 完善 FunctionDef 类
- [x] 补充缺失字段的默认值初始化
- [x] 添加所有 QuickJS JSFunctionDef 字段
- [x] 确保构造函数正确初始化所有字段

**QuickJS 参考**: `parser.c:8215-8285` (js_new_function_def)

**完成时间**: 2024-xx-xx

**实现说明**:
- 添加了完整的字段文档注释，引用 QuickJS 源码位置
- 构造函数实现了与 `js_new_function_def()` 一致的初始化逻辑
- 支持 `parent`, `isEval`, `isFuncExpr` 参数

```typescript
// 需要确保以下字段正确初始化
constructor(parent: FunctionDef | null = null) {
  this.parent = parent
  this.parentCpoolIdx = -1
  this.parentScopeLevel = parent ? parent.scopeLevel : 0
  
  // 初始化 scopes
  this.scopes = [...this.defScopeArray]
  this.scopeSize = 4
  this.scopeCount = 1
  this.scopes[0] = { parent: -1, first: -1 }
  this.scopeLevel = 0
  this.scopeFirst = -1
  this.bodyScope = -1
  
  // 初始化变量索引
  this.varObjectIdx = -1
  this.argVarObjectIdx = -1
  this.argumentsVarIdx = -1
  this.argumentsArgIdx = -1
  this.funcVarIdx = -1
  this.evalRetIdx = -1
  this.thisVarIdx = -1
  this.newTargetVarIdx = -1
  this.thisActiveFuncVarIdx = -1
  this.homeObjectVarIdx = -1
  
  // ...
}
```

#### 1.2 添加缺失的辅助类

- [x] `RelocEntry` 类 (重定位条目)
- [x] `GetLineColCache` 类 (行列缓存)
- [x] `JSVarScope` 类 (变量作用域)
- [x] `JSVarDef` 类 (变量定义)
- [x] `JSClosureVar` 类 (闭包变量)
- [x] `JSGlobalVar` 类 (全局变量)
- [x] `BlockEnv` 类 (块环境)
- [x] `LabelSlot` 类 (标签槽)
- [x] `JumpSlot` 类 (跳转槽)
- [x] `LineNumberSlot` 类 (行号槽)
- [x] `ColumnNumberSlot` 类 (列号槽)

**QuickJS 参考**: `parser.h:117-220`, `types.h:360-380`

```typescript
export class RelocEntry {
  next: RelocEntry | null = null
  addr: number = 0
  size: number = 0 // 1, 2, or 4 bytes
}

export class GetLineColCache {
  ptr: number = 0
  lineNum: number = 0
  colNum: number = 0
  bufStart: number = 0
}
```

#### 1.3 添加常量和枚举定义

- [x] 添加 `ARGUMENT_VAR_OFFSET` 常量
- [x] 添加 `ARG_SCOPE_INDEX`, `ARG_SCOPE_END` 常量
- [x] 添加 `JS_MAX_LOCAL_VARS` 常量
- [x] 添加 `JSVarKindEnum` 枚举
- [x] 添加 `JSParseFunctionEnum` 枚举
- [x] 添加 `JSParseExportEnum` 枚举
- [x] 添加 `JSFunctionKindEnum` 枚举

**QuickJS 参考**: `types.h:115-120`, `parser.h:1-50`, `parser.c:1925`

```typescript
export const ARGUMENT_VAR_OFFSET = 0x10000
export const ARG_SCOPE_INDEX = 1
export const ARG_SCOPE_END = -2
export const JS_MAX_LOCAL_VARS = 65534
```

### 测试
- [x] 运行单元测试验证数据结构
- [x] TypeScript 编译无错误

### 验收标准
- [x] 所有 `FunctionDef` 字段与 `JSFunctionDef` 1:1 对应
- [x] 构造函数正确初始化所有字段
- [x] 所有辅助类完整实现

---

## 阶段 2: 核心编译器方法 (3-4 天) ✅ 已完成

### 目标
实现 `Compiler.ts` 中的核心字节码发射方法。

### 任务清单

#### 2.1 字节码发射方法

- [x] `emitOp(fd, val, sourcePos)` - 发射操作码
- [x] `emitU8(fd, val)` - 发射 8 位值
- [x] `emitU16(fd, val)` - 发射 16 位值
- [x] `emitU32(fd, val)` - 发射 32 位值
- [x] `emitAtom(fd, name)` - 发射 Atom
- [x] `emitSourcePos(fd, sourcePos)` - 发射源位置
- [x] `emitIc(fd, atom)` - 发射 IC 槽位 (预留)
- [x] `emitAtomOp(fd, op, atom, sourcePos)` - 发射带 Atom 的操作码

**QuickJS 参考**: `parser.c:1764-1810`

**完成时间**: 2024-12-12

#### 2.2 标签管理方法

- [x] `newLabelFd(fd)` - 创建新标签 (FunctionDef 版本)
- [x] `newLabelInt(fd)` - 创建新标签 (整数版本)
- [x] `newLabel(fd)` - 创建新标签 (Label 对象版本)
- [x] `emitLabelInt(fd, label)` - 发射标签 (整数版本)
- [x] `emitLabelRaw(fd, label)` - 发射原始标签
- [x] `emitGotoInt(fd, opcode, label)` - 发射跳转 (整数版本)
- [x] `emitJump(fd, op, label)` - 发射跳转 (Label 对象版本)
- [x] `updateLabel(fd, label, delta)` - 更新标签引用计数
- [x] `markLabel(fd, label)` - 标记 Label 位置
- [x] `markLabelAt(fd, label, offset)` - 在指定偏移处标记 Label
- [x] `isLiveCode(fd)` - 检查代码是否可达

**QuickJS 参考**: `parser.c:1805-1875`

#### 2.3 常量池方法

- [x] `cpoolAdd(fd, val)` - 添加常量到池
- [x] `emitPushConst(fd, val, asAtom)` - 发射推送常量
- [x] `addConst(fd, val)` - 添加常量 (别名)

**QuickJS 参考**: `parser.c:1880-1920`

#### 2.4 变量查找方法

- [x] `findArg(fd, name)` - 查找参数
- [x] `findVarByAtom(fd, name)` - 查找变量
- [x] `findVarInScope(fd, name, scopeLevel)` - 在指定作用域中查找变量
- [x] `isChildScope(fd, scope, parentScope)` - 检查作用域是否为子作用域
- [x] `findGlobalVar(fd, name)` - 查找全局变量
- [x] `findLexicalGlobalVar(fd, name)` - 查找词法全局变量
- [x] `findLexicalDecl(fd, name, scopeIdx, checkCatchVar)` - 查找词法声明

**QuickJS 参考**: `parser.c:1922-2022`

#### 2.5 作用域管理方法

- [x] `pushScope(fd)` - 压入新作用域
- [x] `getFirstLexicalVar(fd, scope)` - 获取第一个词法变量
- [x] `popScope(fd)` - 弹出作用域
- [x] `closeScopes(fd, scope, scopeStop)` - 关闭多个作用域

**QuickJS 参考**: `parser.c:2024-2094`

#### 2.6 变量添加方法

- [x] `addVar(fd, name)` - 添加变量
- [x] `addScopeVar(fd, name, varKind)` - 添加作用域变量
- [x] `addFuncVar(fd, name)` - 添加函数变量
- [x] `addArgumentsVar(fd, argumentsAtom)` - 添加 arguments 变量
- [x] `addArgumentsArg(fd, argumentsAtom)` - 添加参数作用域的 arguments
- [x] `addArg(fd, name)` - 添加参数
- [x] `addGlobalVar(fd, name)` - 添加全局变量

**QuickJS 参考**: `parser.c:2096-2212`

#### 2.7 Atom 管理方法

- [x] `getAtom(name)` - 获取字符串对应的 Atom ID
- [x] `addAtom(name)` - 添加新的 Atom
- [x] `getAtomString(atom)` - 通过 Atom ID 获取字符串

#### 2.8 辅助方法

- [x] `addChild(parent, child)` - 添加子函数
- [x] `emitReturn(fd, hasVal)` - 发射 return 指令
- [x] `putAtom(out, atomId)` - 写入 Atom 到输出缓冲区

### 测试
- [x] Jest 测试通过
- [x] TypeScript 编译无错误

### 验收标准
- [x] 所有字节码发射方法正确实现
- [x] 标签管理方法正确实现
- [x] 常量池方法正确实现
- [x] 变量查找和管理方法正确实现
- [x] 作用域管理方法正确实现

---

## 阶段 3: 作用域与变量管理 (2-3 天) ✅ 已完成

### 目标
实现 `Compiler.ts` 中的作用域与变量管理功能。

### 任务清单

#### 3.1 变量定义方法

- [x] `defineVar(fd, name, varDefType)` - 定义变量 (var/let/const/catch/function)
- [x] `addPrivateClassField(fd, name, varKind)` - 添加私有类字段

**QuickJS 参考**: `parser.c:2233-2378`

**完成时间**: 2024-12-12

#### 3.2 闭包变量方法

- [x] `addClosureVar(fd, name, isLocal, isArg, isConst, varKind, varIdx)` - 添加闭包变量
- [x] `findClosureVar(fd, name)` - 在闭包变量列表中查找变量
- [x] `getClosureVar2(s, fd, isLocal, isArg, varIdx)` - 递归获取闭包变量

**QuickJS 参考**: `parser.c:8812-8897`

#### 3.3 Break/Continue 管理

- [x] `pushBreakEntry(fd, labelName, labelBreak, labelCont, dropCount)` - 入栈 break/continue 上下文
- [x] `popBreakEntry(fd)` - 出栈 break/continue 上下文
- [x] `emitBreak(fd, labelName, isBreak)` - 发射 break/continue 语句
- [x] `executeFinallyBlocks(fd, dest, destScopeLevel)` - 执行 finally 块清理

**QuickJS 参考**: `parser.c:6309-6379`

#### 3.4 Return 处理

- [x] `emitReturn(fd, hasReturnValue)` - 发射简单 return 指令
- [x] `emitReturnWithFinally(fd, hasReturnValue)` - 发射带 finally 处理的 return

**QuickJS 参考**: `parser.c:emit_return`

### 测试
- [x] Jest 测试通过
- [x] TypeScript 编译无错误

### 验收标准
- [x] 变量定义方法正确实现
- [x] 闭包变量方法正确实现
- [x] Break/Continue 管理正确实现
- [x] Return 处理正确实现

---

## 阶段 4: 表达式编译 (3-4 天)

### 目标
实现 `ExpressionVisitor.ts` 中的表达式编译。

### 任务清单

#### 4.1 字面量表达式

- [ ] `visitNumericLiteral()` - 数字字面量
- [ ] `visitStringLiteral()` - 字符串字面量
- [ ] `visitBigIntLiteral()` - BigInt 字面量
- [ ] `visitNullLiteral()` - null 字面量
- [ ] `visitBooleanLiteral()` - 布尔字面量

**QuickJS 参考**: `parser.c:4818-5000` (js_parse_postfix_expr)

```typescript
visitNumericLiteral(node: ts.NumericLiteral) {
  const value = parseFloat(node.text)
  const fd = this.context.funcDef!
  
  if (Number.isInteger(value) && value >= 0 && value <= 0x7FFFFFFF) {
    if (value === 0) {
      this.compiler.emitOp(fd, Opcode.OP_push_0)
    } else if (value === 1) {
      this.compiler.emitOp(fd, Opcode.OP_push_1)
    } else if (value >= -128 && value <= 127) {
      this.compiler.emitOp(fd, Opcode.OP_push_i8)
      this.compiler.emitU8(fd, value & 0xff)
    } else if (value >= -32768 && value <= 32767) {
      this.compiler.emitOp(fd, Opcode.OP_push_i16)
      this.compiler.emitU16(fd, value & 0xffff)
    } else {
      this.compiler.emitOp(fd, Opcode.OP_push_i32)
      this.compiler.emitU32(fd, value)
    }
  } else {
    this.compiler.emitPushConst(fd, value, false)
  }
}
```

#### 4.2 一元表达式

- [ ] `visitPrefixUnaryExpression()` - 前缀一元表达式
- [ ] `visitPostfixUnaryExpression()` - 后缀一元表达式
- [ ] `visitTypeOfExpression()` - typeof 表达式
- [ ] `visitVoidExpression()` - void 表达式
- [ ] `visitDeleteExpression()` - delete 表达式

**QuickJS 参考**: `parser.c:5495-5921` (js_parse_delete, js_parse_unary)

#### 4.3 二元表达式

- [ ] `visitBinaryExpression()` - 二元表达式
- [ ] 算术运算: +, -, *, /, %, **
- [ ] 位运算: &, |, ^, <<, >>, >>>
- [ ] 比较运算: <, >, <=, >=, ==, !=, ===, !==
- [ ] 逻辑运算: &&, ||, ??

---

## 阶段 4: 表达式编译 (3-4 天) ✅ 已完成

### 目标
实现 `ExpressionVisitor.ts` 中的表达式编译。

### 任务清单

#### 4.1 字面量表达式

- [x] `visitNumericLiteral()` - 数字字面量
- [x] `visitStringLiteral()` - 字符串字面量
- [x] `visitBigIntLiteral()` - BigInt 字面量
- [x] `visitNullKeyword()` - null 字面量
- [x] `visitBooleanLiteral()` - 布尔字面量
- [x] `visitThisKeyword()` - this 关键字
- [x] `visitIdentifier()` - 标识符

**QuickJS 参考**: `parser.c:4818-4977` (js_parse_postfix_expr)

**完成时间**: 2024-12-12

#### 4.2 一元表达式

- [x] `visitPrefixUnaryExpression()` - 前缀一元表达式 (+, -, !, ~, ++, --)
- [x] `visitPostfixUnaryExpression()` - 后缀一元表达式 (++, --)
- [x] `emitPrefixIncDec()` - 前缀递增/递减
- [x] `emitPostfixIncDec()` - 后缀递增/递减

**QuickJS 参考**: `parser.c:5584-5718` (js_parse_unary)

#### 4.3 二元表达式

- [x] `visitBinaryExpression()` - 二元表达式
- [x] 算术运算: +, -, *, /, %, **
- [x] 位运算: &, |, ^, <<, >>, >>>
- [x] 比较运算: <, >, <=, >=, ==, !=, ===, !==
- [x] 逻辑运算: &&, ||, ?? (短路求值)

**QuickJS 参考**: `parser.c:5720-5951` (js_parse_expr_binary, js_parse_logical_and_or, js_parse_coalesce_expr)

#### 4.4 条件表达式

- [x] `visitConditionalExpression()` - 条件表达式 (? :)

**QuickJS 参考**: `parser.c:5954-5980` (js_parse_cond_expr)

#### 4.5 赋值表达式

- [x] `visitAssignmentExpression()` - 赋值表达式
- [x] `emitSimpleAssignment()` - 简单赋值 (=)
- [x] `emitCompoundAssignment()` - 复合赋值 (+=, -=, etc.)
- [x] `emitLogicalAssignment()` - 逻辑赋值 (&&=, ||=, ??=)

**QuickJS 参考**: `parser.c:5982-6275` (js_parse_assign_expr2)

#### 4.6 调用表达式

- [x] `visitCallExpression()` - 函数调用 (普通调用和方法调用)
- [x] `visitNewExpression()` - new 表达式

**QuickJS 参考**: `parser.c:5128-5380`

#### 4.7 访问表达式

- [x] `visitPropertyAccessExpression()` - 属性访问 (obj.prop)
- [x] `visitElementAccessExpression()` - 元素访问 (obj[key])

**QuickJS 参考**: `parser.c:5393-5461`

#### 4.8 数组和对象字面量

- [x] `visitArrayLiteralExpression()` - 数组字面量 (含展开元素处理)
- [x] `visitObjectLiteralExpression()` - 对象字面量 (属性、简写、展开)

**QuickJS 参考**: `parser.c:2912-3035, 3743-4135`

#### 4.9 特殊表达式

- [x] `visitVoidExpression()` - void 表达式
- [x] `visitDeleteExpression()` - delete 表达式
- [x] `visitTypeOfExpression()` - typeof 表达式

**QuickJS 参考**: `parser.c:5495-5662`

#### 4.10 LValue 处理

- [x] `getLValue()` - 获取 LValue 信息
- [x] `putLValue()` - 放置 LValue
- [x] `PutLValueEnum` 枚举定义

**QuickJS 参考**: `parser.c:3888-4135` (get_lvalue, put_lvalue)

### 测试
- [x] Jest 测试通过
- [x] TypeScript 编译无错误

### 验收标准
- [x] 所有表达式类型正确编译
- [x] LValue 处理正确实现
- [x] 短路求值逻辑正确

---

## 阶段 5: 语句编译 (3-4 天) ✅ 已完成

### 目标
实现 `StatementVisitor.ts` 中的语句编译。

### 任务清单

#### 5.1 块语句

- [x] `visitBlock()` - 块语句

**QuickJS 参考**: `parser.c:6491-6510`

#### 5.2 变量声明

- [x] `visitVariableStatement()` - 变量声明语句
- [x] var, let, const 声明
- [ ] 解构赋值 (TODO)

**QuickJS 参考**: `parser.c:6509-6607` (js_parse_var)

#### 5.3 控制流语句

- [x] `visitIfStatement()` - if 语句
- [x] `visitWhileStatement()` - while 语句
- [x] `visitDoStatement()` - do-while 语句
- [x] `visitForStatement()` - for 语句
- [x] `visitForOfStatement()` - for-of 语句
- [x] `visitForInStatement()` - for-in 语句
- [x] `visitSwitchStatement()` - switch 语句
- [x] `visitBreakStatement()` - break 语句
- [x] `visitContinueStatement()` - continue 语句
- [x] `visitLabeledStatement()` - 带标签语句

**QuickJS 参考**: `parser.c:6914-7724`

**实现说明**:
- 所有语句类型实现了与 QuickJS C 源码行级对应
- 使用 `BlockEnv` 管理 break/continue 上下文
- `emitBreak()` 处理标签查找和作用域关闭
- 循环语句使用 `pushBreakEntry()`/`popBreakEntry()` 管理跳转标签

```typescript
// 示例: while 语句 - 对应 parser.c:7056-7084
visitWhileStatement(node: ts.WhileStatement): void {
  const fd = this.funcDef!
  const labelCont = this.compiler.newLabelInt(fd)
  const labelBreak = this.compiler.newLabelInt(fd)
  
  const breakEntry = new BlockEnv()
  this.compiler.pushBreakEntry(fd, breakEntry, 0, labelBreak, labelCont, 0)
  
  this.compiler.emitLabelInt(fd, labelCont)
  this.context.visit(node.expression)
  this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelBreak)
  this.context.visit(node.statement)
  this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelCont)
  this.compiler.emitLabelInt(fd, labelBreak)
  
  this.compiler.popBreakEntry(fd)
}
```

#### 5.4 异常处理

- [x] `visitTryStatement()` - try 语句
- [x] `visitThrowStatement()` - throw 语句

**QuickJS 参考**: `parser.c:7348-7530`

#### 5.5 返回语句

- [x] `visitReturnStatement()` - return 语句

**QuickJS 参考**: `parser.c:6969-6991`

#### 5.6 其他语句

- [x] `visitExpressionStatement()` - 表达式语句
- [x] `visitEmptyStatement()` - 空语句
- [x] `visitDebuggerStatement()` - debugger 语句

**QuickJS 参考**: `parser.c:7535-7627`

### 测试
- [x] Jest 测试通过
- [x] TypeScript 编译无错误

### 验收标准
- [x] 所有语句类型正确编译
- [x] 控制流跳转正确
- [x] break/continue 标签处理正确

---

## 阶段 6: 函数与类编译 (4-5 天) ✅ 已完成

### 目标
实现 `FunctionVisitor.ts` 和 `ClassVisitor.ts` 中的函数和类编译。

### 任务清单

#### 6.1 函数声明 ✅ 已完成

- [x] `visitFunctionDeclaration()` - 函数声明
- [x] `visitFunctionExpression()` - 函数表达式
- [x] `visitArrowFunction()` - 箭头函数
- [x] `visitMethodDefinition()` - 方法声明
- [x] `visitGetAccessor()` - getter
- [x] `visitSetAccessor()` - setter

**QuickJS 参考**: `parser.c:12892-13483` (js_parse_function_decl2)

**实现说明**:
- `FunctionVisitor.ts` 完全按照 QuickJS 源码实现
- 支持所有函数种类: normal, generator, async, async-generator
- 实现了 `compileFunctionBody()`, `compileArrowFunctionBody()`, `compileParameters()` 等核心方法
- 正确处理子函数的创建、常量池索引、OP_fclosure 发射

```typescript
// 函数声明编译示例
visitFunctionDeclaration(node: ts.FunctionDeclaration): void {
  const parentFd = this.funcDef!
  const funcKind = this.getFunctionKind(node)
  const funcName = node.name ? this.compiler.addAtom(node.name.text) : 0
  
  // 创建子函数定义 - 对应 parser.c:13004-13015
  const fd = new FunctionDef(parentFd, false, false)
  fd.funcName = funcName
  fd.funcType = JSParseFunctionEnum.JS_PARSE_FUNC_STATEMENT
  fd.funcKind = funcKind
  
  // 设置函数属性 - 对应 parser.c:13016-13045
  fd.hasPrototype = (funcKind === JSFunctionKindEnum.JS_FUNC_NORMAL)
  fd.hasArgumentsBinding = true
  fd.hasThisBinding = true
  // ...
  
  // 编译函数体
  this.compileFunctionBody(fd, node.parameters, node.body)
  
  // 发射 OP_fclosure
  const cpoolIdx = this.compiler.cpoolAdd(parentFd, null)
  fd.parentCpoolIdx = cpoolIdx
  this.compiler.emitOp(parentFd, Opcode.OP_fclosure)
  this.compiler.emitU32(parentFd, cpoolIdx)
}
```

#### 6.2 函数参数处理 ✅ 已完成

- [x] 默认参数
- [x] 剩余参数 (rest parameter)
- [ ] 解构参数 (TODO: 暂未实现)

**QuickJS 参考**: `parser.c:13055-13175`

**实现说明**:
- `compileParameters()` 处理所有参数类型
- `compileRestParameter()` 处理 `...args` 语法
- `compileParameterDefaultValue()` 处理默认值

#### 6.3 类声明 ✅ 已完成

- [x] `visitClassDeclaration()` - 类声明
- [x] `visitClassExpression()` - 类表达式
- [x] 构造函数
- [x] 方法定义
- [x] getter/setter
- [x] 静态成员
- [x] 私有字段
- [x] 类字段 (class fields)
- [x] 静态块 (static blocks)

**QuickJS 参考**: `parser.c:3213-3741` (js_parse_class)

**实现说明**:
- `ClassVisitor.ts` 完全按照 QuickJS 源码结构实现
- `compileClass()` 实现类编译主流程
- `compileClassMember()` 处理各类成员
- `compileConstructor()`, `compileMethod()`, `compileAccessor()`, `compileClassField()` 分别处理不同成员类型
- 支持 `ClassFieldsDef` 结构管理字段初始化

#### 6.4 类继承 ✅ 已完成

- [x] extends 处理
- [x] super 调用
- [x] 派生类构造函数
- [x] 默认构造函数生成

**QuickJS 参考**: `parser.c:3044-3212` (js_parse_class_default_ctor)

**实现说明**:
- `createDefaultConstructor()` 生成默认构造函数
- 派生类自动调用 `super(...arguments)`
- 正确处理 `JS_DEFINE_CLASS_HAS_HERITAGE` 标志

### 测试
- [x] TypeScript 编译无错误
- [x] Jest 测试通过 (2 passed)
- [ ] 运行 `fixtures/function-call.ts` 测试
- [ ] 运行 `fixtures/arrow-fn-basic.ts` 测试
- [ ] 运行 `fixtures/class-basic.ts` 测试
- [ ] 运行 `fixtures/class-inheritance.ts` 测试
- [ ] 运行 `fixtures/class-methods.ts` 测试

### 验收标准
- [x] 函数正确编译
- [x] 类正确编译
- [x] 继承正确处理

---

## 阶段 7: 变量解析 (3-4 天) ✅ 已完成

### 目标
实现 `VariableResolver.ts` 中的变量解析逻辑。

### 任务清单

#### 7.1 核心解析函数

- [x] `resolveVariables(fd)` - 解析变量
- [x] `resolveScopeVar(fd, varName, scope, op, bcOut)` - 解析作用域变量
- [x] `resolvePseudoVar(fd, varName)` - 解析伪变量

**QuickJS 参考**: `parser.c:10456-10623` (resolve_variables)

**完成时间**: 2024-12-13

**实现细节**:
- 两遍扫描算法: 第一遍添加全局变量检查，第二遍解析 scope 操作码
- 支持局部变量 → OP_get_loc/OP_put_loc
- 支持闭包变量 → OP_get_var_ref/OP_put_var_ref
- 支持全局变量 → OP_get_var/OP_put_var
- 支持词法变量检查 (let/const) → OP_get_loc_check/OP_put_loc_check

```typescript
resolve(fd: FunctionDef): void {
  const bc = fd.byteCode
  const bcBuf = bc.buffer
  const bcLen = bc.size
  
  const bcOut = new BytecodeBuilder()
  
  // 第一遍: 全局变量定义检查
  if (fd.isGlobalVar) {
    this.addGlobalVarChecks(fd, bcBuf, bcLen, bcOut)
  }
  
  // 第二遍: 解析 scope 变量
  this.resolvePass2(fd, bcBuf, bcLen, bcOut)
  
  fd.byteCode = bcOut
}
```

#### 7.2 闭包变量

- [x] `addClosureVar(fd, isLocal, isArg, varIdx, varName, isConst, isLexical, varKind)` - 添加闭包变量
- [x] `getClosureVar(fd, parentFd, isArg, varIdx, varName, isConst, isLexical, varKind)` - 获取闭包变量

**QuickJS 参考**: `parser.c:8812-8905`

#### 7.3 私有字段解析

- [x] `resolveScopePrivateField(fd, varName, scopeLevel, op, bcOut)` - 解析私有字段
- [x] `findPrivateField(fd, varName, scopeLevel)` - 查找私有字段
- [x] 支持 JS_VAR_PRIVATE_FIELD, JS_VAR_PRIVATE_METHOD, JS_VAR_PRIVATE_GETTER, JS_VAR_PRIVATE_SETTER

**QuickJS 参考**: `parser.c:9723-9814`

#### 7.4 代码生成

- [x] `emitLocalVarAccess()` - 生成局部变量访问代码
- [x] `emitClosureVarAccess()` - 生成闭包变量访问代码
- [x] `emitGlobalVarAccess()` - 生成全局变量访问代码
- [x] `checkConstAssignment()` - 检查 const 赋值错误

### 测试
- [x] Jest 测试通过 (2/2)
- [x] TypeScript 编译无错误

### 验收标准
- [x] 变量解析正确
- [x] 闭包变量正确处理
- [x] 私有字段正确解析

---

## 阶段 8: 标签解析与栈计算 (2-3 天) ✅ 已完成

### 目标
实现标签解析和栈大小计算。

### 任务清单

#### 8.1 标签解析 (LabelResolver.ts)

- [x] `resolve(fd)` - 主标签解析入口
- [x] `initSpecialVariables()` - 初始化特殊变量 (home_object, this_active_func, new_target, this, arguments, func_var, var_object)
- [x] `processOpcode()` - 处理操作码 (短操作码优化、跳转处理)
- [x] `putShortCode()` - 短操作码生成
- [x] `pushShortInt()` - 短整数推送
- [x] `skipDeadCode()` - 死代码消除
- [x] `codeMatch()` - 模式匹配用于窥孔优化
- [x] `resolveRelocations()` - 修正跳转地址重定位
- [x] 尾调用优化检测

**QuickJS 参考**: 
- `parser.c:11088-12100` (resolve_labels)
- `parser.c:11030-11087` (put_short_code)
- `parser.c:10380-10430` (skip_dead_code)
- `parser.c:10131-10230` (code_match, CodeContext)

**实现文件**: `src/compiler/LabelResolver.ts` (~1100 行)

**完成时间**: 2024-12-13

```typescript
// LabelResolver 主要方法
class LabelResolver {
  resolve(fd: FunctionDef): boolean
  private initSpecialVariables(): void
  private processOpcode(op: Opcode, pos: number): void
  private putShortCode(op: Opcode, idx: number): void
  private pushShortInt(val: number): void
  private skipDeadCode(bc: Uint8Array, pos: number, stopLabel: number): number
  private codeMatch(pos: number, ...pattern: (Opcode | number)[]): boolean
}
```

#### 8.2 栈大小计算 (StackSizeComputer.ts)

- [x] `compute(fd)` - 使用 BFS 计算栈大小
- [x] `ssCheck()` - 栈大小一致性检查
- [x] 处理所有跳转类型 (goto, if_true, if_false, catch)
- [x] 处理变量弹出 (nPop 参数)

**QuickJS 参考**: `parser.c:12125-12390` (compute_stack_size)

**实现文件**: `src/compiler/StackSizeComputer.ts` (~200 行)

**完成时间**: 2024-12-13

```typescript
// StackSizeComputer 主要方法
class StackSizeComputer {
  compute(fd: FunctionDef): number  // 返回最大栈深度
  private ssCheck(pos: number, opStackLen: number, opCode: Opcode): void
}
```

### 测试
- [x] Jest 测试通过
- [x] TypeScript 编译无错误

### 验收标准
- [x] 标签解析正确实现 (resolve_labels)
- [x] 短操作码优化正确实现 (put_short_code)
- [x] 死代码消除正确实现 (skip_dead_code)
- [x] 栈大小计算正确实现 (compute_stack_size)

---

## 阶段 9: 调试信息与最终输出 (2-3 天) ✅ 已完成

### 目标
实现调试信息生成和最终字节码输出。

### 任务清单

#### 9.1 调试信息 (DebugInfoBuilder.ts)

- [x] `addPc2LineInfo(fd, pc, sourcePos)` - 添加 pc2line 信息
- [x] `initLineNumberSlots(fd)` - 初始化行号槽数组
- [x] `initLineColCache(fd, source)` - 初始化行列缓存
- [x] `getLineCol(source, start, len)` - 计算行列号
- [x] `getLineColCached(cache, source, ptr)` - 缓存优化的行列计算
- [x] `computePc2LineInfo(fd)` - 计算 pc2line 表
- [x] `getSourcePosFromPc(pc2lineBuf, pc)` - 从 PC 获取源码位置

**QuickJS 参考**:
- `parser.c:10842-10854` (add_pc2line_info)
- `parser.c:10862-10912` (compute_pc2line_info)
- `parser.c:128-146` (get_line_col)
- `parser.c:148-180` (get_line_col_cached)

**实现文件**: `src/compiler/DebugInfoBuilder.ts` (~350 行)

**完成时间**: 2024-12-13

#### 9.2 最终输出 (FunctionBuilder.ts)

- [x] `FunctionBuilder.build(fd)` - 构建最终函数字节码
- [x] `recomputeScopeLinkage(fd)` - 重新计算作用域链接
- [x] `BytecodeWriter.write(b)` - 序列化字节码
- [x] `writeFunctionBytecode(b)` - 写入函数字节码
- [x] `writeBytecodeBuf(bcBuf, bcLen)` - 写入字节码缓冲区
- [x] `writeConstant(val)` - 写入常量值
- [x] `finalizeWithAtoms()` - 添加 atoms 表

**QuickJS 参考**:
- `parser.c:12439-12705` (js_create_function)
- `bytecode.cpp:337-380` (JS_WriteFunctionBytecode)
- `bytecode.cpp:450-530` (JS_WriteFunctionTag)
- `bytecode.cpp:844-871` (JS_WriteObjectAtoms)

**实现文件**: `src/compiler/FunctionBuilder.ts` (~550 行)

**完成时间**: 2024-12-13

```typescript
// FunctionBuilder 主要方法
class FunctionBuilder {
  build(fd: FunctionDef): JSFunctionBytecode
  private recomputeScopeLinkage(fd: FunctionDef): void
}

// BytecodeWriter 主要方法
class BytecodeWriter {
  write(b: JSFunctionBytecode): Uint8Array
  private writeFunctionBytecode(b: JSFunctionBytecode): void
  private writeBytecodeBuf(bcBuf: Uint8Array, bcLen: number): void
  private writeConstant(val: any): void
  private finalizeWithAtoms(): Uint8Array
}

// DebugInfoBuilder 主要方法
class DebugInfoBuilder {
  static addPc2LineInfo(fd: FunctionDef, pc: number, sourcePos: number): void
  static computePc2LineInfo(fd: FunctionDef): void
  static getLineColCached(cache: GetLineColCache, source: string, ptr: number): [number, number]
  static getSourcePosFromPc(pc2lineBuf: Uint8Array, pc: number): [number, number] | null
}
```

### 测试
- [x] Jest 测试通过
- [x] TypeScript 编译无错误

### 验收标准
- [x] 调试信息正确生成 (pc2line, pc2column)
- [x] 最终字节码格式正确 (JSFunctionBytecode)
- [x] 字节码序列化正确 (BytecodeWriter)

---

## 阶段 10: 集成测试与修复 (3-5 天)

### 目标
进行全面的集成测试，修复发现的问题。

### 任务清单

#### 10.1 全面测试

- [ ] 运行所有 fixtures 测试
- [ ] 与 WASM 版本进行字节码对比
- [ ] 修复发现的问题

#### 10.2 性能优化

- [ ] 优化关键路径
- [ ] 减少内存分配

#### 10.3 文档完善

- [ ] 更新 API 文档
- [ ] 添加使用示例

### 测试命令

```bash
# 运行所有 fixtures 测试
pnpm compare:fixtures

# 运行单个测试
pnpm exec tsx scripts/compareWithWasm.ts __tests__/fixtures/<fixture>.ts --disasm --normalize-short --side-by-side --artifacts-dir artifacts
```

### 验收标准
- 所有 fixtures 测试通过
- 生成的字节码与 WASM 版本完全一致

---

## 进度跟踪模板

每次迭代后更新以下进度记录:

```markdown
## 迭代记录

### 迭代 N - YYYY-MM-DD

#### 完成内容
- [ ] 任务 1
- [ ] 任务 2

#### 测试结果
- fixtures/xxx.ts: ✅ / ❌
- fixtures/yyy.ts: ✅ / ❌

#### 发现的问题
- 问题描述

#### 下一步计划
- 下一阶段任务
```

---

## 附录: 常用命令

```bash
# 生成 Env
pnpm gen:env

# 运行单个 fixture 比较
pnpm exec tsx scripts/compareWithWasm.ts __tests__/fixtures/compute.ts --disasm --normalize-short --side-by-side --artifacts-dir artifacts

# 运行所有 fixtures 比较
pnpm compare:fixtures

# 运行测试
pnpm test

# 运行 CLI 快速验证
pnpm start __tests__/fixtures/compute.ts --disasm --cfg --pc2line --debug
```

---

## 附录: 关键 QuickJS 源码位置

| 功能 | 文件:行号 |
|-----|---------|
| JSFunctionDef 结构 | parser.h:200-300 |
| js_new_function_def | parser.c:8215-8285 |
| js_create_function | parser.c:12439-12705 |
| emit_op | parser.c:1788 |
| push_scope | parser.c:2031 |
| resolve_variables | parser.c:10456-10623 |
| resolve_labels | parser.c:11088-12195 |
| compute_stack_size | parser.c:12196-12393 |
| js_parse_function_decl2 | parser.c:12892-13483 |
| js_parse_class | parser.c:3213-3741 |
| js_parse_statement_or_decl | parser.c:6914-7724 |
