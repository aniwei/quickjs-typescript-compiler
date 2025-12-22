import { BytecodeBuilder } from './BytecodeBuilder'
import { 
  JSAtom,
  ARGUMENT_VAR_OFFSET as ENV_ARGUMENT_VAR_OFFSET,
  ARG_SCOPE_INDEX as ENV_ARG_SCOPE_INDEX,
  ARG_SCOPE_END as ENV_ARG_SCOPE_END,
  DEBUG_SCOPE_INDEX as ENV_DEBUG_SCOPE_INDEX,
  JS_MAX_LOCAL_VARS as ENV_JS_MAX_LOCAL_VARS,
  JS_STACK_SIZE_MAX as ENV_JS_STACK_SIZE_MAX,
} from '../env'

// ============================================================================
// 常量定义 - 对应 QuickJS types.h / parser.h
// 这些常量从 env.ts 导入，由 WASM 生成确保与 QuickJS C 源码一致
// ============================================================================

/** 
 * 参数变量偏移量，用于区分参数和局部变量
 * C源码: builtins/js-function.h:32 - #define ARGUMENT_VAR_OFFSET 0x20000000
 */
export const ARGUMENT_VAR_OFFSET = ENV_ARGUMENT_VAR_OFFSET

/** 参数作用域索引 - parser.h:ARG_SCOPE_INDEX */
export const ARG_SCOPE_INDEX = ENV_ARG_SCOPE_INDEX

/** 参数作用域结束标记 - parser.h:ARG_SCOPE_END */
export const ARG_SCOPE_END = ENV_ARG_SCOPE_END

/** 调试作用域索引 - parser.h:DEBUG_SCOP_INDEX */
export const DEBUG_SCOPE_INDEX = ENV_DEBUG_SCOPE_INDEX

/** 最大局部变量数 - types.h:JS_MAX_LOCAL_VARS */
export const JS_MAX_LOCAL_VARS = ENV_JS_MAX_LOCAL_VARS

/** 最大栈大小 - types.h:JS_STACK_SIZE_MAX */
export const JS_STACK_SIZE_MAX = ENV_JS_STACK_SIZE_MAX

// ============================================================================
// 枚举定义 - 对应 QuickJS types.h / parser.h
// ============================================================================

/**
 * 变量类型枚举 - 对应 types.h:JSVarKindEnum
 */
export enum JSVarKindEnum {
  JS_VAR_NORMAL = 0,
  JS_VAR_FUNCTION_DECL = 1,      // lexical var with function declaration
  JS_VAR_NEW_FUNCTION_DECL = 2,  // lexical var with async/generator function declaration
  JS_VAR_CATCH = 3,
  JS_VAR_FUNCTION_NAME = 4,      // function expression name
  JS_VAR_PRIVATE_FIELD = 5,
  JS_VAR_PRIVATE_METHOD = 6,
  JS_VAR_PRIVATE_GETTER = 7,
  JS_VAR_PRIVATE_SETTER = 8,     // must come after JS_VAR_PRIVATE_GETTER
  JS_VAR_PRIVATE_GETTER_SETTER = 9, // must come after JS_VAR_PRIVATE_SETTER
}

// 保持向后兼容的别名 (同时作为值和类型)
export const JSVarKind = JSVarKindEnum
export type JSVarKind = JSVarKindEnum

/**
 * 函数类型枚举 - 对应 parser.h:JSParseFunctionEnum
 */
export enum JSParseFunctionEnum {
  JS_PARSE_FUNC_STATEMENT = 0,
  JS_PARSE_FUNC_VAR = 1,
  JS_PARSE_FUNC_EXPR = 2,
  JS_PARSE_FUNC_ARROW = 3,
  JS_PARSE_FUNC_GETTER = 4,
  JS_PARSE_FUNC_SETTER = 5,
  JS_PARSE_FUNC_METHOD = 6,
  JS_PARSE_FUNC_CLASS_STATIC_INIT = 7,
  JS_PARSE_FUNC_CLASS_CONSTRUCTOR = 8,
  JS_PARSE_FUNC_DERIVED_CLASS_CONSTRUCTOR = 9,
}

/**
 * 导出类型枚举 - 对应 parser.h:JSParseExportEnum
 */
export enum JSParseExportEnum {
  JS_PARSE_EXPORT_NONE = 0,
  JS_PARSE_EXPORT_NAMED = 1,
  JS_PARSE_EXPORT_DEFAULT = 2,
}

/**
 * 函数种类枚举 - 对应 quickjs.h:JSFunctionKindEnum
 */
export enum JSFunctionKindEnum {
  JS_FUNC_NORMAL = 0,
  JS_FUNC_GENERATOR = 1,
  JS_FUNC_ASYNC = 2,
  JS_FUNC_ASYNC_GENERATOR = 3,
}

// ============================================================================
// 数据结构定义 - 对应 QuickJS types.h / parser.h
// ============================================================================

/**
 * 变量定义 - 对应 types.h:JSVarDef
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/types.h:388-416
 */
export class JSVarDef {
  /** 变量名 (JSAtom) */
  varName: number = 0
  
  /** 
   * 变量词法作用域索引 (index into fd->scopes)
   * - 编译期间 scope_level = 0: 变量定义所在的作用域
   * - 编译期间 scope_level != 0: fd->vars 中下一个同级或外层作用域变量的索引
   */
  scopeLevel: number = 0
  
  /**
   * 同级或外层词法作用域中下一个变量的索引
   * - 编译期间: 如果 scope_level = 0，则为变量定义所在作用域
   * - 字节码函数中: fd->vars 中下一个变量的索引
   */
  scopeNext: number = -1
  
  /** 是否为 const 变量 */
  isConst: boolean = false
  
  /** 是否为词法变量 (let/const) */
  isLexical: boolean = false
  
  /** 是否被闭包捕获 */
  isCaptured: boolean = false
  
  /** 是否为静态私有字段 (仅在私有类字段解析期间使用) */
  isStaticPrivate: boolean = false
  
  /** 变量类型 (JSVarKindEnum) */
  varKind: JSVarKindEnum = JSVarKindEnum.JS_VAR_NORMAL
  
  /**
   * 仅在编译期间使用:
   * - 对于 var_kind = JS_VAR_FUNCTION_DECL/JS_VAR_NEW_FUNCTION_DECL: 函数池索引
   * - 对于 var 变量 (scope_level = 0): 定义的作用域级别
   * 常量池中提升函数定义的索引
   */
  funcPoolIdx: number = -1
}

/**
 * 闭包变量 - 对应 types.h:JSClosureVar
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/types.h:350-361
 */
export class JSClosureVar {
  /** 是否为局部变量 */
  isLocal: boolean = false
  
  /** 是否为参数 */
  isArg: boolean = false
  
  /** 是否为 const */
  isConst: boolean = false
  
  /** 是否为词法变量 */
  isLexical: boolean = false
  
  /** 变量类型 (JSVarKindEnum) */
  varKind: JSVarKindEnum = JSVarKindEnum.JS_VAR_NORMAL
  
  /**
   * 变量索引:
   * - is_local = TRUE: 父函数普通变量的索引
   * - is_local = FALSE: 父函数闭包变量的索引
   */
  varIdx: number = 0
  
  /** 变量名 (JSAtom) */
  varName: number = 0
}

/**
 * 全局变量 - 对应 parser.h:JSGlobalVar
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/parser.h:157-164
 */
export class JSGlobalVar {
  /** 常量池索引 (>= 0 时为提升函数定义的索引) */
  cpoolIdx: number = -1
  
  /** 强制初始化为 undefined */
  forceInit: boolean = false
  
  /** 是否为全局 let/const 定义 */
  isLexical: boolean = false
  
  /** 是否为 const 定义 */
  isConst: boolean = false
  
  /** 定义的作用域 */
  scopeLevel: number = 0
  
  /** 变量名 (JSAtom) */
  varName: number = 0
}

/**
 * 块环境 - 对应 parser.h:BlockEnv
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/parser.h:145-155
 */
export class BlockEnv {
  /** 前一个块环境 */
  prev: BlockEnv | null = null
  
  /** 标签名 (JS_ATOM_NULL if none) */
  labelName: number = 0
  
  /** break 标签 (-1 if none) */
  labelBreak: number = -1
  
  /** continue 标签 (-1 if none) */
  labelCont: number = -1
  
  /** 需要弹出的栈元素数量 */
  dropCount: number = 0
  
  /** finally 标签 (-1 if none) */
  labelFinally: number = -1
  
  /** 作用域级别 */
  scopeLevel: number = 0
  
  /** 是否有迭代器 */
  hasIterator: boolean = false
  
  /** 是否为常规语句 (非循环语句) */
  isRegularStmt: boolean = false
}

/**
 * 重定位条目 - 对应 parser.h:RelocEntry
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/parser.h:166-170
 */
export class RelocEntry {
  /** 下一个重定位条目 */
  next: RelocEntry | null = null
  
  /** 需要修补的地址 */
  addr: number = 0
  
  /** 地址大小: 1, 2 或 4 字节 */
  size: number = 0
}

/**
 * 标签槽 - 对应 parser.h:LabelSlot
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/parser.h:178-184
 */
export class LabelSlot {
  /** 引用计数 */
  refCount: number = 0
  
  /** 阶段1地址 (-1 表示未解析) */
  pos: number = -1
  
  /** 阶段2地址 (-1 表示未解析) */
  pos2: number = -1
  
  /** 阶段3地址 (-1 表示未解析) */
  addr: number = -1
  
  /** 重定位链表头 */
  firstReloc: RelocEntry | null = null
}

/**
 * 跳转槽 - 对应 parser.h:JumpSlot
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/parser.h:172-177
 */
export class JumpSlot {
  /** 操作码 */
  op: number = 0
  
  /** 大小 */
  size: number = 0
  
  /** 位置 */
  pos: number = 0
  
  /** 标签 */
  label: number = 0
}

/**
 * 行号槽 - 对应 parser.h:LineNumberSlot
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/parser.h:186-189
 */
export class LineNumberSlot {
  /** 程序计数器 */
  pc: number = 0
  
  /** 源码位置 */
  sourcePos: number = 0
}

/**
 * 列号槽 - 对应 parser.h:ColumnNumberSlot
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/parser.h:191-194
 */
export class ColumnNumberSlot {
  /** 程序计数器 */
  pc: number = 0
  
  /** 源码位置 */
  sourcePos: number = 0
}

/**
 * 行列缓存 - 对应 parser.h:GetLineColCache
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/parser.h:196-202
 */
export class GetLineColCache {
  /** 最后的源码位置指针 */
  ptr: number = 0
  
  /** 行号 */
  lineNum: number = 0
  
  /** 列号 */
  colNum: number = 0
  
  /** 缓冲区起始位置 */
  bufStart: number = 0
}

/**
 * 变量作用域 - 对应 types.h:JSVarScope
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/types.h:367-370
 */
export class JSVarScope {
  /** 父作用域索引 (index into fd->scopes of the enclosing scope) */
  parent: number = -1
  
  /** 该作用域最后一个变量的索引 (index into fd->vars) */
  first: number = -1
}

/**
 * 内联缓存 (InlineCache) - 对应 types.h:InlineCache
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/ic.h
 * 
 * 用于优化属性访问，编译期间只需要存储 atom 信息，
 * 运行时的缓存由 QuickJS 运行时管理。
 * 
 * 注意：在纯 TypeScript 编译器中，只需跟踪已添加的属性名 atoms，
 * 实际的 IC 缓存查找在 QuickJS 运行时完成。
 */
export class InlineCache {
  /** 已添加的 atom 槽位 */
  slots: Map<number, number> = new Map() // atom -> index
  
  /** 槽位计数 */
  count: number = 0

  /**
   * 添加一个 IC 槽位 - 对应 add_ic_slot1
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/ic.h:108-127
   * 
   * @param atom 属性名原子
   * @returns 槽位索引，如果已存在返回 -1
   */
  addSlot(atom: number): number {
    if (this.slots.has(atom)) {
      // 已存在，返回 -1 (fail)
      return -1
    }
    const index = this.count++
    this.slots.set(atom, index)
    return index
  }

  /**
   * 获取 atom 的 IC 索引
   * 
   * @param atom 属性名原子
   * @returns 索引，如果不存在返回 -1
   */
  getSlotIndex(atom: number): number {
    return this.slots.get(atom) ?? -1
  }
}

/**
 * 函数定义 - 对应 parser.h:JSFunctionDef
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/parser.h:222-320
 * 初始化逻辑参考: third_party/QuickJS/src/core/parser.c:8215-8285 (js_new_function_def)
 */
export class FunctionDef {
  // ========== 内部标识 (TypeScript 特有) ==========
  static nextId = 0
  id: number = FunctionDef.nextId++

  // ========== 父子关系 - parser.h:224-229 ==========
  /** 父函数定义 */
  parent: FunctionDef | null = null
  
  /** 在父函数常量池中的索引 (-1 if none) */
  parentCpoolIdx: number = -1
  
  /** 定义时父函数的作用域级别 */
  parentScopeLevel: number = 0
  
  /** 子函数列表 (list of JSFunctionDef.link) */
  childList: FunctionDef[] = []

  // ========== 函数属性标志 - parser.h:231-252 ==========
  /** TRUE if eval code */
  isEval: boolean = false
  
  /** only valid if is_eval = TRUE */
  evalType: number = 0
  
  /** TRUE if variables are not defined locally: eval global, eval module or non strict eval */
  isGlobalVar: boolean = false
  
  /** TRUE if function expression */
  isFuncExpr: boolean = false
  
  /** TRUE if the home object is available */
  hasHomeObject: boolean = false
  
  /** true if a prototype field is necessary */
  hasPrototype: boolean = false
  
  /** 是否有简单参数列表 */
  hasSimpleParameterList: boolean = true
  
  /** if true, an argument scope is created */
  hasParameterExpressions: boolean = false
  
  /** to reject directive in special cases */
  hasUseStrict: boolean = false
  
  /** true if the function contains a call to eval() */
  hasEvalCall: boolean = false
  
  /** true if the 'arguments' binding is available in the function */
  hasArgumentsBinding: boolean = false
  
  /** true if the 'this' and new.target binding are available in the function */
  hasThisBinding: boolean = false
  
  /** true if the 'new.target' does not throw a syntax error */
  newTargetAllowed: boolean = false
  
  /** true if super() is allowed */
  superCallAllowed: boolean = false
  
  /** true if super. or super[] is allowed */
  superAllowed: boolean = false
  
  /** true if the 'arguments' identifier is allowed */
  argumentsAllowed: boolean = true
  
  /** 是否为派生类构造函数 */
  isDerivedClassConstructor: boolean = false
  
  /** 是否在函数体内 */
  inFunctionBody: boolean = false

  /** 是否抑制源码位置发射 (用于 switch case 表达式等) */
  suppressSourcePos: boolean = false

  // ========== 函数类型信息 - parser.h:253-256 ==========
  /** 函数种类 (JSFunctionKindEnum) - 8 bits */
  funcKind: JSFunctionKindEnum = JSFunctionKindEnum.JS_FUNC_NORMAL
  
  /** 函数类型 (JSParseFunctionEnum) - 8 bits */
  funcType: JSParseFunctionEnum = JSParseFunctionEnum.JS_PARSE_FUNC_STATEMENT
  
  /** JS 模式 (bitmap of JS_MODE_x) - 8 bits */
  jsMode: number = 0
  
  /** 函数名 (JS_ATOM_NULL if no name) */
  funcName: number = 0

  // ========== 变量定义 - parser.h:258-272 ==========
  /** 变量数组 */
  vars: JSVarDef[] = []
  
  /** vars[] 已分配大小 */
  varSize: number = 0
  
  /** 变量数量 */
  varCount: number = 0

  /** 参数数组 */
  args: JSVarDef[] = []
  
  /** args[] 已分配大小 */
  argSize: number = 0
  
  /** 参数数量 */
  argCount: number = 0
  
  /** 已定义的参数数量 */
  definedArgCount: number = 0

  // ========== 特殊变量索引 - parser.h:273-285 ==========
  /** var 对象索引 (-1 if none) */
  varObjectIdx: number = -1
  
  /** 参数作用域的 var 对象索引 (-1 if none) */
  argVarObjectIdx: number = -1
  
  /** arguments 变量索引 (-1 if none) */
  argumentsVarIdx: number = -1
  
  /** 参数作用域中的 arguments 变量定义 (-1 if none) */
  argumentsArgIdx: number = -1
  
  /** 包含当前函数的变量索引 (-1 if none, only used if is_func_expr is true) */
  funcVarIdx: number = -1
  
  /** 包含 eval 返回值的变量索引 (-1 if none) */
  evalRetIdx: number = -1

  /** finally/gosub 保存 eval_ret 的临时变量索引 (-1 if none) */
  gosubRetIdx: number = -1
  
  /** 包含 'this' 值的变量索引 (-1 if none) */
  thisVarIdx: number = -1
  
  /** 包含 'new.target' 值的变量索引 (-1 if none) */
  newTargetVarIdx: number = -1
  
  /** 包含 'this.active_func' 值的变量索引 (-1 if none) */
  thisActiveFuncVarIdx: number = -1
  
  /** home object 变量索引 */
  homeObjectVarIdx: number = -1
  
  /** 是否需要 home object */
  needHomeObject: boolean = false

  // ========== 作用域 - parser.h:287-296 ==========
  /** 当前词法作用域的索引 (index into fd->scopes) */
  scopeLevel: number = 0
  
  /** 第一个词法作用域变量的索引 (index into fd->vars) */
  scopeFirst: number = -1
  
  /** fd->scopes 数组的已分配大小 */
  scopeSize: number = 4
  
  /** fd->scopes 数组中使用的条目数 */
  scopeCount: number = 1
  
  /** 作用域数组 */
  scopes: JSVarScope[] = []
  
  /** 默认作用域数组 (内联数组，避免小函数的分配开销) */
  defScopeArray: JSVarScope[] = [
    new JSVarScope(),
    new JSVarScope(),
    new JSVarScope(),
    new JSVarScope()
  ]
  
  /** 函数体或 eval 的作用域 */
  bodyScope: number = -1

  // ========== 全局变量 - parser.h:298-300 ==========
  /** 全局变量数量 */
  globalVarCount: number = 0
  
  /** 全局变量数组已分配大小 */
  globalVarSize: number = 0
  
  /** 全局变量数组 */
  globalVars: JSGlobalVar[] = []

  // ========== 字节码 - parser.h:302-305 ==========
  /** 字节码缓冲区 */
  byteCode: BytecodeBuilder = new BytecodeBuilder()
  
  /** 最后一个操作码的位置 (-1 if no last opcode) */
  lastOpcodePos: number = -1
  
  /** 最后一个操作码的源码指针 */
  lastOpcodeSourcePtr: number = -1  // 初始化为 -1，确保第一次调用 emitSourcePos 总是发射 OP_line_num
  
  /** 最后一个发射的行号 */
  lastLineNum: number = -1
  
  /** true if short opcodes are used in byte_code */
  // 对应 QuickJS 源码 parser.h:305: BOOL use_short_opcodes;
  useShortOpcodes: boolean = false

  // ========== 标签 - parser.h:307-310 ==========
  /** 标签槽数组 */
  labelSlots: LabelSlot[] = []
  
  /** label_slots[] 已分配大小 */
  labelSize: number = 0
  
  /** 标签数量 */
  labelCount: number = 0
  
  /** break/continue 标签栈 */
  topBreak: BlockEnv | null = null

  // ========== 常量池 - parser.h:312-315 ==========
  /** 常量池 (strings, functions, numbers) */
  cpool: any[] = []
  
  /** 常量池计数 */
  cpoolCount: number = 0
  
  /** 常量池已分配大小 */
  cpoolSize: number = 0

  // ========== 闭包变量 - parser.h:317-320 ==========
  /** 闭包变量数量 */
  closureVarCount: number = 0
  
  /** 闭包变量数组已分配大小 */
  closureVarSize: number = 0
  
  /** 闭包变量数组 */
  closureVar: JSClosureVar[] = []

  // ========== 跳转 - parser.h:322-325 ==========
  /** 跳转槽数组 */
  jumpSlots: JumpSlot[] = []
  
  /** 跳转槽已分配大小 */
  jumpSize: number = 0
  
  /** 跳转数量 */
  jumpCount: number = 0

  // ========== 行号信息 - parser.h:327-332 ==========
  /** 行号槽数组 */
  lineNumberSlots: LineNumberSlot[] = []
  
  /** 行号槽已分配大小 */
  lineNumberSize: number = 0
  
  /** 行号槽数量 */
  lineNumberCount: number = 0
  
  /** 最后的行号 */
  lineNumberLast: number = 0
  
  /** 最后行号的 PC */
  lineNumberLastPc: number = 0

  // ========== 列号信息 - parser.h:334-339 ==========
  /** 列号槽数组 */
  columnNumberSlots: ColumnNumberSlot[] = []
  
  /** 列号槽已分配大小 */
  columnNumberSize: number = 0
  
  /** 列号槽数量 */
  columnNumberCount: number = 0
  
  /** 最后的列号 */
  columnNumberLast: number = 0
  
  /** 最后列号的 PC */
  columnNumberLastPc: number = 0

  // ========== 调试信息 - parser.h:341-349 ==========
  /** strip all debug info (implies strip_source = TRUE) */
  stripDebug: boolean = false
  
  /** strip only source code */
  stripSource: boolean = false
  
  /** 文件名 (JSAtom) */
  filename: number = 0
  
  /** eval() 源码中的指针位置 */
  sourcePos: number = 0
  
  /** 行列缓存 */
  getLineColCache: GetLineColCache | null = null
  
  /** pc2line 表 */
  pc2line: BytecodeBuilder = new BytecodeBuilder()
  
  /** pc2column 表 */
  pc2column: BytecodeBuilder = new BytecodeBuilder()

  // ========== 源码 - parser.h:351-352 ==========
  /** raw source, utf-8 encoded */
  source: string = ''
  
  /** 源码长度 */
  sourceLen: number = 0

  // ========== 模块 - parser.h:354-355 ==========
  /** 模块定义 (!= NULL when parsing a module) */
  module: any = null
  
  /** TRUE if await is used (used in module eval) */
  hasAwait: boolean = false

  // ========== 内联缓存 - parser.h:357 ==========
  /** inline cache for field op */
  ic: InlineCache = new InlineCache()

  // ========== 输出相关 (用于最终字节码生成) ==========
  /** 是否有调试信息 */
  hasDebug: boolean = true
  
  /** 是否为直接或间接 eval */
  isDirectOrIndirectEval: boolean = false

  // ========== 运行时辅助字段 ==========
  /** 栈大小 */
  stackSize: number = 0

  /**
   * 构造函数 - 对应 js_new_function_def
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:8215-8285
   * 
   * @param parent 父函数定义
   * @param isEval 是否为 eval 代码
   * @param isFuncExpr 是否为函数表达式
   */
  constructor(parent: FunctionDef | null = null, isEval: boolean = false, isFuncExpr: boolean = false) {
    // 初始化子函数列表 - parser.c:8229
    this.childList = []

    // 设置父函数关系 - parser.c:8232-8238
    this.parent = parent
    this.parentCpoolIdx = -1
    if (parent) {
      // 继承父函数的 JS 模式
      this.jsMode = parent.jsMode
      this.parentScopeLevel = parent.scopeLevel

      // 继承调试/源码上下文：否则子函数 fd.source 为空字符串，pc2line 将无法生成
      // （TypeScriptCompiler.processFunctionDef 只在 fd.source truthy 时初始化行列缓存）
      this.filename = parent.filename
      this.source = parent.source
      this.sourceLen = parent.sourceLen
      this.stripDebug = parent.stripDebug
      this.stripSource = parent.stripSource
      this.hasDebug = parent.hasDebug
    }

    // 设置 eval 和函数表达式标志 - parser.c:8243-8244
    this.isEval = isEval
    this.isFuncExpr = isFuncExpr

    // 初始化字节码缓冲区 - parser.c:8245
    this.byteCode = new BytecodeBuilder()
    
    // 初始化位置信息 - parser.c:8246
    this.lastOpcodePos = -1
    
    // 初始化函数名 - parser.c:8247
    this.funcName = 0 // JS_ATOM_NULL

    // 初始化特殊变量索引为 -1 - parser.c:8248-8258
    this.varObjectIdx = -1
    this.argVarObjectIdx = -1
    this.argumentsVarIdx = -1
    this.argumentsArgIdx = -1
    this.funcVarIdx = -1
    this.evalRetIdx = -1
    this.gosubRetIdx = -1
    this.thisVarIdx = -1
    this.newTargetVarIdx = -1
    this.thisActiveFuncVarIdx = -1
    this.homeObjectVarIdx = -1

    // 初始化作用域 - parser.c:8261-8268
    // 使用默认作用域数组
    this.scopes = this.defScopeArray
    this.scopeSize = 4 // countof(fd->def_scope_array)
    this.scopeCount = 1
    this.scopes[0].first = -1
    this.scopes[0].parent = -1
    this.scopeLevel = 0 // 0: var/arg scope
    this.scopeFirst = -1
    this.bodyScope = -1

    // 初始化 pc2line 和 pc2column - parser.c:8275-8276
    this.pc2line = new BytecodeBuilder()
    this.pc2column = new BytecodeBuilder()
  }
}
