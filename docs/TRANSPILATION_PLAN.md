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

## 阶段 2: 核心编译器方法 (3-4 天)

### 目标
实现 `Compiler.ts` 中的核心字节码发射方法。

### 任务清单

#### 2.1 字节码发射方法

- [ ] `emitOp(fd, val, sourcePos)` - 发射操作码
- [ ] `emitU8(fd, val)` - 发射 8 位值
- [ ] `emitU16(fd, val)` - 发射 16 位值
- [ ] `emitU32(fd, val)` - 发射 32 位值
- [ ] `emitAtom(fd, name)` - 发射 Atom
- [ ] `emitSourcePos(fd, sourcePos)` - 发射源位置

**QuickJS 参考**: `parser.c:1764-1810`

```typescript
emitOp(fd: FunctionDef, val: number, sourcePos: number = -1) {
  fd.lastOpcodePos = fd.byteCode.size
  fd.byteCode.putByte(val)
  
  if (sourcePos !== -1) {
    this.addPc2LineInfo(fd, fd.lastOpcodePos, sourcePos)
  }
}

emitAtom(fd: FunctionDef, name: number) {
  // Atom 需要 4 字节，小端序
  fd.byteCode.putU32(name)
}
```

#### 2.2 标签管理方法

- [ ] `newLabelFd(fd)` - 创建新标签
- [ ] `newLabel(fd)` - 创建新标签 (带错误处理)
- [ ] `emitLabel(fd, label)` - 发射标签
- [ ] `emitLabelRaw(fd, label)` - 发射原始标签
- [ ] `emitGoto(fd, opcode, label)` - 发射跳转
- [ ] `updateLabel(fd, label, delta)` - 更新标签引用计数

**QuickJS 参考**: `parser.c:1805-1875`

```typescript
newLabelFd(fd: FunctionDef): number {
  const label = fd.labelCount++
  const ls = new LabelSlot()
  ls.refCount = 0
  ls.pos = -1
  ls.pos2 = -1
  ls.addr = -1
  ls.firstReloc = null
  fd.labelSlots.push(ls)
  return label
}

emitGoto(fd: FunctionDef, opcode: number, label: number): number {
  if (label < 0) {
    label = this.newLabel(fd)
    if (label < 0) return -1
  }
  this.emitOp(fd, opcode)
  this.emitU32(fd, label)
  fd.labelSlots[label].refCount++
  return label
}
```

#### 2.3 常量池方法

- [ ] `cpoolAdd(fd, val)` - 添加常量到池
- [ ] `emitPushConst(fd, val, asAtom)` - 发射推送常量

**QuickJS 参考**: `parser.c:1880-1920`

```typescript
cpoolAdd(fd: FunctionDef, val: any): number {
  const idx = fd.cpoolCount++
  fd.cpool.push(val)
  return idx
}

emitPushConst(fd: FunctionDef, val: any, asAtom: boolean = false) {
  if (typeof val === 'string' && asAtom) {
    const atom = this.getAtom(val)
    if (atom !== null) {
      this.emitOp(fd, Opcode.OP_push_atom_value)
      this.emitU32(fd, atom)
      return
    }
  }
  
  const idx = this.cpoolAdd(fd, val)
  this.emitOp(fd, Opcode.OP_push_const)
  this.emitU32(fd, idx)
}
```

### 测试
- [ ] 运行 `fixtures/compute.ts` 测试
- [ ] 验证生成的字节码与 WASM 版本匹配

### 验收标准
- 所有字节码发射方法正确实现
- 标签管理方法正确实现
- 常量池方法正确实现

---

## 阶段 3: 作用域与变量管理 (2-3 天)

### 目标
实现 `ScopeManager.ts` 中的作用域管理功能。

### 任务清单

#### 3.1 作用域操作

- [ ] `pushScope(fd)` - 进入作用域
- [ ] `popScope(fd)` - 退出作用域
- [ ] `closeScopes(fd, scope, scopeStop)` - 关闭作用域

**QuickJS 参考**: `parser.c:2031-2091`

```typescript
pushScope(fd: FunctionDef): number {
  const scope = fd.scopeCount
  
  if (fd.scopeCount + 1 > fd.scopeSize) {
    // 扩展 scopes 数组
    const newSize = Math.max(fd.scopeCount + 1, fd.scopeSize * 2)
    fd.scopeSize = newSize
  }
  
  fd.scopeCount++
  fd.scopes[scope] = {
    parent: fd.scopeLevel,
    first: fd.scopeFirst
  }
  
  this.compiler.emitOp(fd, Opcode.OP_enter_scope)
  this.compiler.emitU16(fd, scope)
  
  return fd.scopeLevel = scope
}

popScope(fd: FunctionDef) {
  const scope = fd.scopeLevel
  this.compiler.emitOp(fd, Opcode.OP_leave_scope)
  this.compiler.emitU16(fd, scope)
  fd.scopeLevel = fd.scopes[scope].parent
  fd.scopeFirst = this.getFirstLexicalVar(fd, fd.scopeLevel)
}
```

#### 3.2 变量添加

- [ ] `addVar(fd, name)` - 添加变量
- [ ] `addScopeVar(fd, name, varKind)` - 添加作用域变量
- [ ] `addFuncVar(fd, name)` - 添加函数名变量
- [ ] `addArgumentsVar(fd)` - 添加 arguments 变量
- [ ] `addArg(fd, name)` - 添加参数

**QuickJS 参考**: `parser.c:2092-2162`

```typescript
addVar(fd: FunctionDef, name: number): number {
  if (fd.varCount >= JS_MAX_LOCAL_VARS) {
    throw new Error('Too many local variables')
  }
  
  const vd = new JSVarDef()
  vd.varName = name
  vd.funcPoolIdx = -1
  
  const idx = fd.varCount++
  fd.vars.push(vd)
  return idx
}

addScopeVar(fd: FunctionDef, name: number, varKind: JSVarKind): number {
  const idx = this.addVar(fd, name)
  if (idx >= 0) {
    const vd = fd.vars[idx]
    vd.varKind = varKind
    vd.scopeLevel = fd.scopeLevel
    vd.scopeNext = fd.scopeFirst
    fd.scopes[fd.scopeLevel].first = idx
    fd.scopeFirst = idx
  }
  return idx
}
```

#### 3.3 变量查找

- [ ] `findVar(fd, name)` - 查找变量
- [ ] `findArg(fd, name)` - 查找参数
- [ ] `findVarInScope(fd, name, scopeLevel)` - 在作用域中查找变量
- [ ] `findGlobalVar(fd, name)` - 查找全局变量
- [ ] `findLexicalDecl(fd, name, scopeIdx, checkCatchVar)` - 查找词法声明

**QuickJS 参考**: `parser.c:1929-2029`

```typescript
findArg(fd: FunctionDef, name: number): number {
  for (let i = fd.argCount - 1; i >= 0; i--) {
    if (fd.args[i].varName === name) {
      return i | ARGUMENT_VAR_OFFSET
    }
  }
  return -1
}

findVar(fd: FunctionDef, name: number): number {
  for (let i = fd.varCount - 1; i >= 0; i--) {
    if (fd.vars[i].varName === name && fd.vars[i].scopeLevel === 0) {
      return i
    }
  }
  return this.findArg(fd, name)
}
```

### 测试
- [ ] 运行 `fixtures/variables-let-block.ts` 测试
- [ ] 运行 `fixtures/closure-basic.ts` 测试

### 验收标准
- 作用域进入/退出正确
- 变量添加/查找正确
- 闭包变量正确处理

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

**QuickJS 参考**: `parser.c:5925-5980` (js_parse_coalesce_expr)

```typescript
visitBinaryExpression(node: ts.BinaryExpression) {
  const fd = this.context.funcDef!
  const op = node.operatorToken.kind
  
  // 短路逻辑运算需要特殊处理
  if (op === ts.SyntaxKind.AmpersandAmpersandToken ||
      op === ts.SyntaxKind.BarBarToken ||
      op === ts.SyntaxKind.QuestionQuestionToken) {
    this.visitLogicalExpression(node)
    return
  }
  
  // 编译左操作数
  this.context.visit(node.left)
  // 编译右操作数
  this.context.visit(node.right)
  // 发射操作码
  this.emitBinaryOp(fd, op)
}
```

#### 4.4 条件表达式

- [ ] `visitConditionalExpression()` - 条件表达式 (? :)

**QuickJS 参考**: `parser.c:5954-5980` (js_parse_cond_expr)

#### 4.5 赋值表达式

- [ ] `visitAssignmentExpression()` - 赋值表达式
- [ ] 复合赋值: +=, -=, *=, /=, etc.

**QuickJS 参考**: `parser.c:5982-6275` (js_parse_assign_expr2)

#### 4.6 调用表达式

- [ ] `visitCallExpression()` - 函数调用
- [ ] `visitNewExpression()` - new 表达式

**QuickJS 参考**: `parser.c:4818-5493` (js_parse_postfix_expr)

#### 4.7 访问表达式

- [ ] `visitPropertyAccessExpression()` - 属性访问
- [ ] `visitElementAccessExpression()` - 元素访问
- [ ] `visitOptionalChain()` - 可选链

**QuickJS 参考**: `parser.c:4818-5493`

#### 4.8 数组和对象字面量

- [ ] `visitArrayLiteralExpression()` - 数组字面量
- [ ] `visitObjectLiteralExpression()` - 对象字面量
- [ ] `visitSpreadElement()` - 展开元素

**QuickJS 参考**: `parser.c:2912-3035, 3743-4135`

### 测试
- [ ] 运行 `fixtures/binary-ops.ts` 测试
- [ ] 运行 `fixtures/unary-ops.ts` 测试
- [ ] 运行 `fixtures/comparison-ops.ts` 测试
- [ ] 运行 `fixtures/conditional-operator.ts` 测试
- [ ] 运行 `fixtures/array-literal.ts` 测试
- [ ] 运行 `fixtures/object-literal.ts` 测试

### 验收标准
- 所有表达式类型正确编译
- 生成的字节码与 WASM 版本匹配

---

## 阶段 5: 语句编译 (3-4 天)

### 目标
实现 `StatementVisitor.ts` 中的语句编译。

### 任务清单

#### 5.1 块语句

- [ ] `visitBlock()` - 块语句

**QuickJS 参考**: `parser.c:6491-6910`

#### 5.2 变量声明

- [ ] `visitVariableStatement()` - 变量声明语句
- [ ] var, let, const 声明
- [ ] 解构赋值

**QuickJS 参考**: `parser.c:6914-7724` (js_parse_statement_or_decl)

#### 5.3 控制流语句

- [ ] `visitIfStatement()` - if 语句
- [ ] `visitWhileStatement()` - while 语句
- [ ] `visitDoStatement()` - do-while 语句
- [ ] `visitForStatement()` - for 语句
- [ ] `visitForOfStatement()` - for-of 语句
- [ ] `visitForInStatement()` - for-in 语句
- [ ] `visitSwitchStatement()` - switch 语句
- [ ] `visitBreakStatement()` - break 语句
- [ ] `visitContinueStatement()` - continue 语句
- [ ] `visitLabeledStatement()` - 带标签语句

**QuickJS 参考**: `parser.c:6914-7724`

```typescript
visitIfStatement(node: ts.IfStatement) {
  const fd = this.context.funcDef!
  const labelElse = this.compiler.newLabel(fd)
  const labelEnd = this.compiler.newLabel(fd)
  
  // 编译条件
  this.context.visit(node.expression)
  
  // 条件为假跳转到 else
  this.compiler.emitGoto(fd, Opcode.OP_if_false, labelElse)
  
  // 编译 then 分支
  this.context.visit(node.thenStatement)
  
  if (node.elseStatement) {
    // 跳转到 end
    this.compiler.emitGoto(fd, Opcode.OP_goto, labelEnd)
    // else 标签
    this.compiler.emitLabel(fd, labelElse)
    // 编译 else 分支
    this.context.visit(node.elseStatement)
    // end 标签
    this.compiler.emitLabel(fd, labelEnd)
  } else {
    // else 标签 (无 else 分支时)
    this.compiler.emitLabel(fd, labelElse)
  }
}
```

#### 5.4 异常处理

- [ ] `visitTryStatement()` - try 语句
- [ ] `visitThrowStatement()` - throw 语句

**QuickJS 参考**: `parser.c:6914-7724`

#### 5.5 返回语句

- [ ] `visitReturnStatement()` - return 语句

**QuickJS 参考**: `parser.c:6914-7724`

### 测试
- [ ] 运行 `fixtures/if-else.ts` 测试
- [ ] 运行 `fixtures/while.ts` 测试
- [ ] 运行 `fixtures/for-loop.ts` 测试
- [ ] 运行 `fixtures/switch-case.ts` 测试
- [ ] 运行 `fixtures/try-catch.ts` 测试

### 验收标准
- 所有语句类型正确编译
- 控制流跳转正确

---

## 阶段 6: 函数与类编译 (4-5 天)

### 目标
实现 `FunctionVisitor.ts` 和 `ClassVisitor.ts` 中的函数和类编译。

### 任务清单

#### 6.1 函数声明

- [ ] `visitFunctionDeclaration()` - 函数声明
- [ ] `visitFunctionExpression()` - 函数表达式
- [ ] `visitArrowFunction()` - 箭头函数
- [ ] `visitMethodDeclaration()` - 方法声明
- [ ] `visitGetAccessor()` - getter
- [ ] `visitSetAccessor()` - setter

**QuickJS 参考**: `parser.c:12892-13483` (js_parse_function_decl2)

```typescript
visitFunctionDeclaration(node: ts.FunctionDeclaration) {
  const fd = this.context.funcDef!
  const funcName = node.name ? node.name.text : ''
  const funcAtom = this.compiler.getAtom(funcName)
  
  // 创建子函数定义
  const childFd = new FunctionDef(fd)
  childFd.funcName = funcAtom
  childFd.funcType = JSParseFunctionEnum.JS_PARSE_FUNC_STATEMENT
  
  // 添加到常量池
  const cpoolIdx = this.compiler.cpoolAdd(fd, null) // placeholder
  childFd.parentCpoolIdx = cpoolIdx
  
  // 处理参数
  this.processParameters(childFd, node.parameters)
  
  // 编译函数体
  this.compileFunctionBody(childFd, node.body)
  
  // 发射 fclosure
  this.compiler.emitOp(fd, Opcode.OP_fclosure)
  this.compiler.emitU32(fd, cpoolIdx)
  
  // 定义变量
  this.compiler.emitOp(fd, Opcode.OP_define_var)
  this.compiler.emitAtom(fd, funcAtom)
  this.compiler.emitU8(fd, 0) // flags
}
```

#### 6.2 函数参数处理

- [ ] 默认参数
- [ ] 剩余参数
- [ ] 解构参数

**QuickJS 参考**: `parser.c:12892-13100`

#### 6.3 类声明

- [ ] `visitClassDeclaration()` - 类声明
- [ ] `visitClassExpression()` - 类表达式
- [ ] 构造函数
- [ ] 方法定义
- [ ] getter/setter
- [ ] 静态成员
- [ ] 私有字段

**QuickJS 参考**: `parser.c:3213-3741` (js_parse_class)

#### 6.4 类继承

- [ ] extends 处理
- [ ] super 调用
- [ ] 派生类构造函数

**QuickJS 参考**: `parser.c:3044-3212` (js_parse_class_default_ctor)

### 测试
- [ ] 运行 `fixtures/function-call.ts` 测试
- [ ] 运行 `fixtures/arrow-fn-basic.ts` 测试
- [ ] 运行 `fixtures/class-basic.ts` 测试
- [ ] 运行 `fixtures/class-inheritance.ts` 测试
- [ ] 运行 `fixtures/class-methods.ts` 测试

### 验收标准
- 函数正确编译
- 类正确编译
- 继承正确处理

---

## 阶段 7: 变量解析 (3-4 天)

### 目标
实现 `VariableResolver.ts` 中的变量解析逻辑。

### 任务清单

#### 7.1 核心解析函数

- [ ] `resolveVariables(fd)` - 解析变量
- [ ] `resolveScopeVar(fd, varName, scope, op, bcOut)` - 解析作用域变量
- [ ] `resolvePseudoVar(fd, varName)` - 解析伪变量

**QuickJS 参考**: `parser.c:10456-10623` (resolve_variables)

```typescript
resolveVariables(fd: FunctionDef) {
  const bcBuf = fd.byteCode.data()
  const bcLen = fd.byteCode.size
  const bcOut = new BytecodeBuilder()
  
  // 第一遍: 运行时检查
  for (let i = 0; i < fd.globalVarCount; i++) {
    const hf = fd.globalVars[i]
    // 检查全局变量
    // ...
  }
  
  // 第二遍: 解析变量引用
  for (let pos = 0; pos < bcLen; ) {
    const op = bcBuf[pos]
    const len = OPCODE_DEFS[op].size
    
    switch (op) {
      case Opcode.OP_scope_get_var:
      case Opcode.OP_scope_put_var:
      case Opcode.OP_scope_delete_var:
        // 解析作用域变量
        const varName = getU32(bcBuf, pos + 1)
        const scope = getU16(bcBuf, pos + 5)
        this.resolveScopeVar(fd, varName, scope, op, bcOut)
        break
      // ...
    }
    
    pos += len
  }
  
  // 替换字节码
  fd.byteCode = bcOut
}
```

#### 7.2 闭包变量

- [ ] `addClosureVar(fd, isLocal, isArg, varIdx, varName, isConst, isLexical, varKind)` - 添加闭包变量
- [ ] `getClosureVar(fd, parentFd, isArg, varIdx, varName, isConst, isLexical, varKind)` - 获取闭包变量

**QuickJS 参考**: `parser.c:8812-8905`

#### 7.3 eval 变量

- [ ] `addEvalVariables(fd)` - 添加 eval 变量
- [ ] `markEvalCapturedVariables(fd, scope)` - 标记 eval 捕获变量

**QuickJS 参考**: `parser.c:10100-10455`

### 测试
- [ ] 运行 `fixtures/closure-basic.ts` 测试
- [ ] 运行 `fixtures/closure-vars.ts` 测试

### 验收标准
- 变量解析正确
- 闭包变量正确处理

---

## 阶段 8: 标签解析与栈计算 (2-3 天)

### 目标
实现标签解析和栈大小计算。

### 任务清单

#### 8.1 标签解析

- [ ] `resolveLabels(fd)` - 解析标签
- [ ] 短操作码优化
- [ ] 跳转地址修正
- [ ] 死代码消除

**QuickJS 参考**: `parser.c:11088-12195` (resolve_labels)

```typescript
resolveLabels(fd: FunctionDef) {
  const bcBuf = fd.byteCode.data()
  const bcLen = fd.byteCode.size
  const bcOut = new BytecodeBuilder()
  
  // Pass 1: 计算标签位置
  for (let pos = 0; pos < bcLen; ) {
    const op = bcBuf[pos]
    // ...
  }
  
  // Pass 2: 修正跳转地址
  for (let pos = 0; pos < bcLen; ) {
    const op = bcBuf[pos]
    // ...
  }
  
  // Pass 3: 生成最终字节码
  for (let pos = 0; pos < bcLen; ) {
    const op = bcBuf[pos]
    // ...
  }
  
  fd.byteCode = bcOut
}
```

#### 8.2 栈大小计算

- [ ] `computeStackSize(fd)` - 计算栈大小

**QuickJS 参考**: `parser.c:12196-12393` (compute_stack_size)

```typescript
computeStackSize(fd: FunctionDef): number {
  const bcBuf = fd.byteCode.data()
  const bcLen = fd.byteCode.size
  let stackMax = 0
  let stack = 0
  
  for (let pos = 0; pos < bcLen; ) {
    const op = bcBuf[pos]
    const info = OPCODE_DEFS[op]
    
    stack -= info.nPop
    stack += info.nPush
    
    if (stack > stackMax) {
      stackMax = stack
    }
    
    pos += info.size
  }
  
  return stackMax
}
```

### 测试
- [ ] 运行所有 fixtures 测试验证栈计算

### 验收标准
- 标签解析正确
- 栈大小计算正确

---

## 阶段 9: 调试信息与最终输出 (2-3 天)

### 目标
实现调试信息生成和最终字节码输出。

### 任务清单

#### 9.1 调试信息

- [ ] `computePc2LineInfo(fd)` - 计算 pc2line 信息
- [ ] `computePc2ColumnInfo(fd)` - 计算 pc2column 信息

**QuickJS 参考**: `parser.c` (pc2line 相关)

#### 9.2 最终输出

- [ ] `jsCreateFunction(fd)` - 创建函数对象
- [ ] `writeOutput(fd)` - 写入最终字节码

**QuickJS 参考**: `parser.c:12439-12705` (js_create_function)

```typescript
writeOutput(fd: FunctionDef): Uint8Array {
  const out = new BytecodeBuilder()
  
  // 写入字节码版本
  out.putByte(BytecodeTag.BC_VERSION)
  
  // 写入函数
  this.writeFunctionBytecode(out, fd)
  
  return out.data()
}

writeFunctionBytecode(out: BytecodeBuilder, fd: FunctionDef) {
  // 写入标志
  let flags = 0
  if (fd.hasPrototype) flags |= (1 << 0)
  if (fd.hasSimpleParameterList) flags |= (1 << 1)
  // ...
  out.putU16(flags)
  
  // 写入参数和变量
  out.putULEB128(fd.argCount)
  out.putULEB128(fd.varCount)
  out.putULEB128(fd.definedArgCount)
  out.putULEB128(fd.stackSize)
  out.putULEB128(fd.closureVarCount)
  out.putULEB128(fd.cpoolCount)
  out.putULEB128(fd.byteCode.size)
  
  // 写入字节码
  out.put(fd.byteCode.data())
  
  // 写入调试信息 (如果有)
  if (fd.hasDebug) {
    // ...
  }
}
```

### 测试
- [ ] 运行所有 fixtures 测试

### 验收标准
- 调试信息正确生成
- 最终字节码格式正确

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
