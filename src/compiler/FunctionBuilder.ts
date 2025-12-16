/**
 * FunctionBuilder - 函数字节码最终构建器
 * 
 * 对应 QuickJS 源码:
 * - parser.c:12439-12705 (js_create_function)
 * - bytecode.cpp:337-380 (JS_WriteFunctionBytecode)
 * - bytecode.cpp:450-530 (JS_WriteFunctionTag)
 * 
 * 功能:
 * 1. 重新计算作用域链接
 * 2. 创建子函数
 * 3. 解析变量 (resolve_variables)
 * 4. 解析标签 (resolve_labels)
 * 5. 计算栈大小 (compute_stack_size)
 * 6. 生成最终 JSFunctionBytecode 结构
 */

import { BytecodeBuilder } from './BytecodeBuilder'
import {
  FunctionDef,
  JSVarDef,
  JSClosureVar,
  ARG_SCOPE_INDEX,
  ARG_SCOPE_END,
} from './FunctionDef'
import {
  BytecodeTag,
  PC2Line,
  env,
} from '../env'

// ============================================================================
// 常量定义 - 从 env.ts 导入
// ============================================================================

/** BC_VERSION - 字节码版本号 (从 env 读取) */
export const BC_VERSION = env.bytecodeVersion

/** PC2LINE 编码常量 - 从 env.ts 的 PC2Line 枚举导入 */
export const PC2LINE_BASE = PC2Line.PC2LINE_BASE
export const PC2LINE_RANGE = PC2Line.PC2LINE_RANGE
export const PC2LINE_OP_FIRST = PC2Line.PC2LINE_OP_FIRST
export const PC2LINE_DIFF_PC_MAX = PC2Line.PC2LINE_DIFF_PC_MAX

// ============================================================================
// JSFunctionBytecode 结构 - 对应 types.h:464-510
// ============================================================================

/**
 * JSFunctionBytecode - 最终的函数字节码结构
 * 
 * 对应 QuickJS types.h:464-510 的 JSFunctionBytecode 结构
 */
export class JSFunctionBytecode {
  /** js_mode (bitmap of JS_MODE_x) */
  jsMode: number = 0
  
  /** true if a prototype field is necessary */
  hasPrototype: boolean = false
  
  /** 是否有简单参数列表 */
  hasSimpleParameterList: boolean = true
  
  /** 是否为派生类构造函数 */
  isDerivedClassConstructor: boolean = false
  
  /** true if home_object needs to be initialized */
  needHomeObject: boolean = false
  
  /** 函数种类 (2 bits) */
  funcKind: number = 0
  
  /** 是否允许 new.target */
  newTargetAllowed: boolean = false
  
  /** 是否允许 super() 调用 */
  superCallAllowed: boolean = false
  
  /** 是否允许 super 访问 */
  superAllowed: boolean = false
  
  /** 是否允许 arguments */
  argumentsAllowed: boolean = true
  
  /** 是否有调试信息 */
  hasDebug: boolean = false
  
  /** 是否为直接或间接 eval */
  isDirectOrIndirectEval: boolean = false
  
  /** 字节码缓冲区 */
  byteCodeBuf: Uint8Array = new Uint8Array(0)
  
  /** 字节码长度 */
  byteCodeLen: number = 0
  
  /** 函数名 (JSAtom) */
  funcName: number = 0
  
  /** 变量定义 (args + vars) */
  vardefs: JSVarDef[] = []
  
  /** 闭包变量列表 */
  closureVar: JSClosureVar[] = []
  
  /** 参数数量 */
  argCount: number = 0
  
  /** 变量数量 */
  varCount: number = 0
  
  /** 已定义的参数数量 */
  definedArgCount: number = 0
  
  /** 栈大小 */
  stackSize: number = 0
  
  /** 常量池 */
  cpool: any[] = []
  
  /** 常量池计数 */
  cpoolCount: number = 0
  
  /** 闭包变量计数 */
  closureVarCount: number = 0
  
  /** 调试信息 */
  debug: {
    filename: number
    sourceLen: number
    pc2lineLen: number
    pc2columnLen: number
    pc2lineBuf: Uint8Array
    pc2columnBuf: Uint8Array
    source: string
  } = {
    filename: 0,
    sourceLen: 0,
    pc2lineLen: 0,
    pc2columnLen: 0,
    pc2lineBuf: new Uint8Array(0),
    pc2columnBuf: new Uint8Array(0),
    source: '',
  }
}

// ============================================================================
// FunctionBuilder 类
// ============================================================================

/**
 * FunctionBuilder - 构建最终的函数字节码
 * 
 * 对应 QuickJS parser.c:12439-12705 的 js_create_function
 */
export class FunctionBuilder {
  /**
   * 构建函数字节码
   * 
   * 对应 parser.c:12439-12705 的 js_create_function
   * 
   * @param fd 函数定义
   * @returns JSFunctionBytecode 结构
   */
  build(fd: FunctionDef): JSFunctionBytecode {
    const b = new JSFunctionBytecode()
    
    // 1. 重新计算作用域链接 - parser.c:12448-12471
    this.recomputeScopeLinkage(fd)
    
    // 2. 递归创建子函数 - 对应 parser.c:12485-12497
    // 先递归构建所有子函数，然后将它们放入 cpool
    for (const childFd of fd.childList) {
      const cpoolIdx = childFd.parentCpoolIdx
      if (cpoolIdx >= 0 && cpoolIdx < fd.cpool.length) {
        const childBytecode = this.build(childFd)
        fd.cpool[cpoolIdx] = childBytecode
      }
    }
    
    // 3. 复制字节码 - parser.c:12572-12577
    b.byteCodeBuf = fd.byteCode.data()
    b.byteCodeLen = fd.byteCode.size
    
    // 4. 复制函数名 - parser.c:12579
    b.funcName = fd.funcName
    
    // 5. 复制变量定义 - parser.c:12580-12603
    if (fd.argCount + fd.varCount > 0) {
      if (!fd.stripDebug || fd.hasEvalCall) {
        // 合并 args 和 vars
        b.vardefs = [...fd.args, ...fd.vars]
      }
      b.varCount = fd.varCount
      b.argCount = fd.argCount
      b.definedArgCount = fd.definedArgCount
    }
    
    // 6. 复制常量池 - parser.c:12604-12610
    b.cpoolCount = fd.cpoolCount
    if (b.cpoolCount > 0) {
      b.cpool = [...fd.cpool]
    }
    
    // 7. 设置栈大小 - parser.c:12613
    b.stackSize = fd.stackSize
    
    // 8. 处理调试信息 - parser.c:12615-12650
    if (!fd.stripDebug) {
      b.hasDebug = true
      b.debug.filename = fd.filename
      b.debug.pc2lineBuf = fd.pc2line.data()
      b.debug.pc2lineLen = fd.pc2line.size
      b.debug.pc2columnBuf = fd.pc2column.data()
      b.debug.pc2columnLen = fd.pc2column.size
      b.debug.source = fd.source
      b.debug.sourceLen = fd.sourceLen
    }
    
    // 9. 复制闭包变量 - parser.c:12655-12662
    b.closureVarCount = fd.closureVarCount
    if (b.closureVarCount > 0) {
      b.closureVar = [...fd.closureVar]
    }
    
    // 10. 复制各种标志 - parser.c:12664-12678
    b.hasPrototype = fd.hasPrototype
    b.hasSimpleParameterList = fd.hasSimpleParameterList
    b.jsMode = fd.jsMode
    b.isDerivedClassConstructor = fd.isDerivedClassConstructor
    b.funcKind = fd.funcKind
    b.needHomeObject = fd.homeObjectVarIdx >= 0 || fd.needHomeObject
    b.newTargetAllowed = fd.newTargetAllowed
    b.superCallAllowed = fd.superCallAllowed
    b.superAllowed = fd.superAllowed
    b.argumentsAllowed = fd.argumentsAllowed
    b.isDirectOrIndirectEval = fd.isDirectOrIndirectEval
    
    return b
  }
  
  /**
   * 重新计算作用域链接
   * 
   * 对应 parser.c:12448-12471 的作用域链接重新计算
   * 
   * @param fd 函数定义
   */
  private recomputeScopeLinkage(fd: FunctionDef): void {
    // 重置所有作用域的 first 指针 - parser.c:12448-12450
    for (let scope = 0; scope < fd.scopeCount; scope++) {
      fd.scopes[scope].first = -1
    }
    
    // 如果有参数表达式，设置参数作用域的特殊标记 - parser.c:12451-12454
    if (fd.hasParameterExpressions) {
      fd.scopes[ARG_SCOPE_INDEX].first = ARG_SCOPE_END
    }
    
    // 构建变量链表 - parser.c:12455-12459
    for (let idx = 0; idx < fd.varCount; idx++) {
      const vd = fd.vars[idx]
      vd.scopeNext = fd.scopes[vd.scopeLevel].first
      fd.scopes[vd.scopeLevel].first = idx
    }
    
    // 对于空作用域，继承父作用域的 first - parser.c:12460-12464
    for (let scope = 2; scope < fd.scopeCount; scope++) {
      const sd = fd.scopes[scope]
      if (sd.first < 0) {
        sd.first = fd.scopes[sd.parent].first
      }
    }
    
    // 对于没有下一个变量的变量，设置为父作用域的 first - parser.c:12465-12471
    for (let idx = 0; idx < fd.varCount; idx++) {
      const vd = fd.vars[idx]
      if (vd.scopeNext < 0 && vd.scopeLevel > 1) {
        const scope = fd.scopes[vd.scopeLevel].parent
        vd.scopeNext = fd.scopes[scope].first
      }
    }
  }
}

// ============================================================================
// BytecodeWriter 类 - 序列化字节码
// ============================================================================

import { Compiler } from './Compiler'
import { OpFormat, OPCODE_BY_CODE, firstAtomId } from '../env'

/**
 * BytecodeWriter - 将 JSFunctionBytecode 序列化为二进制格式
 * 
 * 对应 QuickJS bytecode.cpp:450-530 的 JS_WriteFunctionTag
 * 
 * 关键点:
 * 1. 内置 atoms (< firstAtomId=228) 直接使用原值，不加入 atoms 表
 * 2. 用户 atoms (>= 228) 需要加入 atoms 表，并使用映射索引
 * 3. bc_put_atom 使用 LEB128 编码，值左移1位
 * 4. 字节码中的 atom 需要转换为索引
 */
export class BytecodeWriter {
  private out: BytecodeBuilder
  /** atom -> 序列化后的索引 (对于 >= firstAtomId 的 atom) */
  private atomToIdx: Map<number, number>
  /** 用户 atoms 列表 (只包含 >= firstAtomId 的 atom) */
  private idxToAtom: number[]
  private compiler: Compiler | null
  /** firstAtomId = 228, 内置 atoms 阈值 */
  private firstAtom: number
  
  constructor(compiler?: Compiler) {
    this.out = new BytecodeBuilder()
    this.atomToIdx = new Map()
    this.idxToAtom = []
    this.compiler = compiler || null
    this.firstAtom = firstAtomId // 228
  }
  
  /**
   * 写入整个模块/脚本字节码
   * 
   * @param b 函数字节码
   * @returns 序列化后的字节数组
   */
  write(b: JSFunctionBytecode): Uint8Array {
    this.out.reset()
    this.atomToIdx.clear()
    this.idxToAtom = []
    
    // 写入函数字节码
    this.writeFunctionBytecode(b)
    
    // 写入 atoms 表到开头
    return this.finalizeWithAtoms()
  }
  
  /**
   * 写入函数字节码
   * 
   * 对应 bytecode.cpp:450-530 的 JS_WriteFunctionTag
   * 
   * @param b 函数字节码
   */
  private writeFunctionBytecode(b: JSFunctionBytecode): void {
    // 写入标签 - bytecode.cpp:453
    this.out.putByte(BytecodeTag.TC_TAG_FUNCTION_BYTECODE)
    
    // 构建标志位 - bytecode.cpp:455-470
    let flags = 0
    let idx = 0
    flags = this.setFlags(flags, idx++, b.hasPrototype ? 1 : 0, 1)
    flags = this.setFlags(flags, idx++, b.hasSimpleParameterList ? 1 : 0, 1)
    flags = this.setFlags(flags, idx++, b.isDerivedClassConstructor ? 1 : 0, 1)
    flags = this.setFlags(flags, idx++, b.needHomeObject ? 1 : 0, 1)
    flags = this.setFlags(flags, idx, b.funcKind, 2)
    idx += 2
    flags = this.setFlags(flags, idx++, b.newTargetAllowed ? 1 : 0, 1)
    flags = this.setFlags(flags, idx++, b.superCallAllowed ? 1 : 0, 1)
    flags = this.setFlags(flags, idx++, b.superAllowed ? 1 : 0, 1)
    flags = this.setFlags(flags, idx++, b.argumentsAllowed ? 1 : 0, 1)
    flags = this.setFlags(flags, idx++, b.hasDebug ? 1 : 0, 1)
    flags = this.setFlags(flags, idx++, b.isDirectOrIndirectEval ? 1 : 0, 1)
    
    // 写入标志和模式 - bytecode.cpp:471-472
    this.out.putU16(flags)
    this.out.putByte(b.jsMode)
    
    // 写入函数名 - bytecode.cpp:473
    this.putAtom(b.funcName)
    
    // 写入参数和变量信息 - bytecode.cpp:475-481
    this.out.putULEB128(b.argCount)
    this.out.putULEB128(b.varCount)
    this.out.putULEB128(b.definedArgCount)
    this.out.putULEB128(b.stackSize)
    this.out.putULEB128(b.closureVarCount)
    this.out.putULEB128(b.cpoolCount)
    this.out.putULEB128(b.byteCodeLen)
    
    // 写入变量定义 - bytecode.cpp:482-495
    if (b.vardefs.length > 0) {
      this.out.putULEB128(b.argCount + b.varCount)
      for (let i = 0; i < b.argCount + b.varCount; i++) {
        const vd = b.vardefs[i]
        this.putAtom(vd.varName)
        this.out.putULEB128(vd.scopeLevel)
        this.out.putULEB128(vd.scopeNext + 1)
        
        let vdFlags = 0
        let vdIdx = 0
        vdFlags = this.setFlags(vdFlags, vdIdx, vd.varKind, 4)
        vdIdx += 4
        vdFlags = this.setFlags(vdFlags, vdIdx++, vd.isConst ? 1 : 0, 1)
        vdFlags = this.setFlags(vdFlags, vdIdx++, vd.isLexical ? 1 : 0, 1)
        vdFlags = this.setFlags(vdFlags, vdIdx++, vd.isCaptured ? 1 : 0, 1)
        this.out.putByte(vdFlags)
      }
    } else {
      this.out.putULEB128(0)
    }
    
    // 写入闭包变量 - bytecode.cpp:497-505
    for (let i = 0; i < b.closureVarCount; i++) {
      const cv = b.closureVar[i]
      this.putAtom(cv.varName)
      this.out.putULEB128(cv.varIdx)
      
      let cvFlags = 0
      let cvIdx = 0
      cvFlags = this.setFlags(cvFlags, cvIdx++, cv.isLocal ? 1 : 0, 1)
      cvFlags = this.setFlags(cvFlags, cvIdx++, cv.isArg ? 1 : 0, 1)
      cvFlags = this.setFlags(cvFlags, cvIdx++, cv.isConst ? 1 : 0, 1)
      cvFlags = this.setFlags(cvFlags, cvIdx++, cv.isLexical ? 1 : 0, 1)
      cvFlags = this.setFlags(cvFlags, cvIdx, cv.varKind, 4)
      this.out.putByte(cvFlags)
    }
    
    // 写入字节码 - bytecode.cpp:506-507
    this.writeBytecodeBuf(b.byteCodeBuf, b.byteCodeLen)
    
    // 写入调试信息 - bytecode.cpp:509-522
    if (b.hasDebug) {
      this.putAtom(b.debug.filename)
      this.out.putULEB128(b.debug.pc2lineLen)
      this.out.put(b.debug.pc2lineBuf)
      // source_len (0 表示没有源码)
      this.out.putULEB128(0)
    }
    
    // 写入常量池 - bytecode.cpp:524-527
    for (let i = 0; i < b.cpoolCount; i++) {
      this.writeConstant(b.cpool[i])
    }
  }
  
  /**
   * 写入字节码缓冲区 (转换 atom 索引)
   * 
   * 对应 bytecode.cpp:337-380 的 JS_WriteFunctionBytecode
   * 
   * 关键逻辑: 遍历字节码，将 atom 格式的操作码中的 atom 值转换为序列化索引
   * 
   * @param bcBuf 字节码缓冲区
   * @param bcLen 字节码长度
   */
  private writeBytecodeBuf(bcBuf: Uint8Array, bcLen: number): void {
    // 创建副本以便修改 atom 引用
    const buf = new Uint8Array(bcLen)
    buf.set(bcBuf.subarray(0, bcLen))
    
    // 遍历字节码，转换 atom 索引
    let pos = 0
    while (pos < bcLen) {
      const op = buf[pos]
      const opDef = OPCODE_BY_CODE[op]
      
      if (!opDef) {
        // 未知操作码，跳过1字节
        pos++
        continue
      }
      
      const fmt = opDef.format
      
      // 检查是否包含 atom
      switch (fmt) {
        case OpFormat.atom:
        case OpFormat.atom_u8:
        case OpFormat.atom_u16:
        case OpFormat.atom_label_u8:
        case OpFormat.atom_label_u16: {
          // atom 在 pos+1 位置，占4字节
          const atom = this.getU32(buf, pos + 1)
          const idx = this.bcAtomToIdx(atom)
          this.putU32(buf, pos + 1, idx)
          break
        }
        default:
          break
      }
      
      pos += opDef.size
    }
    
    this.out.put(buf)
  }
  
  /** 从缓冲区读取 little-endian U32 */
  private getU32(buf: Uint8Array, pos: number): number {
    return buf[pos] | (buf[pos + 1] << 8) | (buf[pos + 2] << 16) | (buf[pos + 3] << 24)
  }
  
  /** 向缓冲区写入 little-endian U32 */
  private putU32(buf: Uint8Array, pos: number, val: number): void {
    buf[pos] = val & 0xff
    buf[pos + 1] = (val >> 8) & 0xff
    buf[pos + 2] = (val >> 16) & 0xff
    buf[pos + 3] = (val >> 24) & 0xff
  }
  
  /**
   * 写入常量值
   * 
   * @param val 常量值
   */
  private writeConstant(val: any): void {
    if (val === null) {
      this.out.putByte(BytecodeTag.TC_TAG_NULL)
    } else if (val === undefined) {
      this.out.putByte(BytecodeTag.TC_TAG_UNDEFINED)
    } else if (typeof val === 'boolean') {
      this.out.putByte(val ? BytecodeTag.TC_TAG_BOOL_TRUE : BytecodeTag.TC_TAG_BOOL_FALSE)
    } else if (typeof val === 'number') {
      if (Number.isInteger(val) && val >= -2147483648 && val <= 2147483647) {
        this.out.putByte(BytecodeTag.TC_TAG_INT32)
        this.out.putU32(val | 0)
      } else {
        this.out.putByte(BytecodeTag.TC_TAG_FLOAT64)
        this.putFloat64(val)
      }
    } else if (typeof val === 'string') {
      this.out.putByte(BytecodeTag.TC_TAG_STRING)
      this.writeString(val)
    } else if (val instanceof JSFunctionBytecode) {
      // 嵌套函数
      this.writeFunctionBytecode(val)
    } else {
      // 其他类型暂不支持
      this.out.putByte(BytecodeTag.TC_TAG_NULL)
    }
  }
  
  /**
   * 写入字符串
   * 
   * @param str 字符串
   */
  private writeString(str: string): void {
    // 转换为 UTF-8
    const encoder = new TextEncoder()
    const bytes = encoder.encode(str)
    
    // 长度 << 1 | is_wide_char (UTF-8 不是 wide char)
    this.out.putULEB128(bytes.length << 1)
    this.out.put(bytes)
  }
  
  /**
   * 写入 Float64
   * 
   * @param val 浮点数值
   */
  private putFloat64(val: number): void {
    const buf = new ArrayBuffer(8)
    const view = new DataView(buf)
    view.setFloat64(0, val, true) // little endian
    this.out.put(new Uint8Array(buf))
  }
  
  /**
   * 写入 Atom (转换为索引) - 对应 bytecode.cpp:268-278 的 bc_put_atom
   * 
   * 关键逻辑:
   * 1. 如果 atom < firstAtom (228)，直接使用原值
   * 2. 如果 atom >= firstAtom，需要映射到用户 atom 索引
   * 3. 使用 LEB128 编码，值左移1位 (v <<= 1)
   * 
   * @param atom Atom 值
   */
  private putAtom(atom: number): void {
    let v: number
    
    // 检查是否为 tagged int (QuickJS 特有，这里暂不处理)
    // if (__JS_AtomIsTaggedInt(atom)) { v = (atom << 1) | 1; }
    
    if (atom < this.firstAtom) {
      // 内置 atom，直接使用原值
      v = atom
    } else {
      // 用户 atom，需要映射
      v = this.bcAtomToIdx(atom)
    }
    
    // 左移1位后使用 LEB128 编码
    this.out.putULEB128(v << 1)
  }
  
  /**
   * 将 atom 转换为序列化索引 - 对应 bytecode.cpp:225-264 的 bc_atom_to_idx
   * 
   * @param atom 原始 atom 值
   * @returns 序列化后的索引值
   */
  private bcAtomToIdx(atom: number): number {
    // 如果是内置 atom，直接返回
    if (atom < this.firstAtom) {
      return atom
    }
    
    // 检查是否已经映射
    const cached = this.atomToIdx.get(atom)
    if (cached !== undefined) {
      return cached
    }
    
    // 添加新的用户 atom
    const v = this.idxToAtom.length
    this.idxToAtom.push(atom)
    // 索引需要加上 firstAtom 偏移
    const idx = v + this.firstAtom
    this.atomToIdx.set(atom, idx)
    
    return idx
  }
  
  /**
   * 设置标志位
   * 
   * 对应 bytecode.cpp 的 bc_set_flags
   * 
   * @param flags 当前标志
   * @param idx 位索引
   * @param val 值
   * @param bits 位数
   * @returns 更新后的标志
   */
  private setFlags(flags: number, idx: number, val: number, bits: number): number {
    return flags | ((val & ((1 << bits) - 1)) << idx)
  }
  
  /**
   * 添加 atoms 表到输出开头
   * 
   * 对应 bytecode.cpp:844-871 的 JS_WriteObjectAtoms
   * 
   * @returns 最终字节数组
   */
  private finalizeWithAtoms(): Uint8Array {
    // 创建 atoms 头部
    const atomsOut = new BytecodeBuilder()
    
    // 写入版本号
    atomsOut.putByte(BC_VERSION)
    
    // 写入 atom 数量
    atomsOut.putULEB128(this.idxToAtom.length)
    
    // 写入每个 atom 字符串
    const encoder = new TextEncoder()
    for (const atom of this.idxToAtom) {
      // 从 Compiler 获取 atom 对应的字符串
      const str = this.compiler?.getAtomString(atom) || ''
      const bytes = encoder.encode(str)
      // 长度 << 1 | is_wide_char (UTF-8 不是 wide char)
      atomsOut.putULEB128(bytes.length << 1)
      atomsOut.put(bytes)
    }
    
    // 合并: atoms 头部 + 函数体
    const body = this.out.data()
    const result = new Uint8Array(atomsOut.size + body.length)
    result.set(atomsOut.data())
    result.set(body, atomsOut.size)
    
    return result
  }
}

// ============================================================================
// Pc2LineBuilder 类 - 构建 pc2line 调试信息
// ============================================================================

/**
 * Pc2LineBuilder - 构建 pc2line 调试信息表
 * 
 * 对应 QuickJS parser.c:10862-10912 的 compute_pc2line_info
 */
export class Pc2LineBuilder {
  /**
   * 计算 pc2line 信息
   * 
   * 对应 parser.c:10862-10912 的 compute_pc2line_info
   * 
   * @param fd 函数定义
   */
  compute(fd: FunctionDef): void {
    if (fd.stripDebug) {
      return
    }
    
    // 获取初始行列号
    const cache = fd.getLineColCache
    if (!cache) {
      return
    }
    
    // 初始化 pc2line 缓冲区
    fd.pc2line.reset()
    
    // 计算初始位置的行列号
    let lastLineNum = 1 // 默认从第 1 行开始
    let lastColNum = 0
    let lastPc = 0
    
    // 写入初始行列号 - parser.c:10872-10873
    fd.pc2line.putULEB128(lastLineNum)
    fd.pc2line.putULEB128(lastColNum)
    
    // 遍历行号槽 - parser.c:10875-10911
    for (let i = 0; i < fd.lineNumberCount; i++) {
      const slot = fd.lineNumberSlots[i]
      const pc = slot.pc
      const sourcePos = slot.sourcePos
      
      if (sourcePos === -1) {
        continue
      }
      
      const diffPc = pc - lastPc
      if (diffPc < 0) {
        continue
      }
      
      // 计算行列号 (简化: 从 sourcePos 推断)
      // 完整实现需要解析源码
      const lineNum = this.getLineFromSourcePos(fd, sourcePos)
      const colNum = this.getColFromSourcePos(fd, sourcePos)
      
      const diffLine = lineNum - lastLineNum
      const diffCol = colNum - lastColNum
      
      if (diffLine === 0 && diffCol === 0) {
        continue
      }
      
      // 编码 pc2line 条目 - parser.c:10893-10907
      if (diffLine >= PC2LINE_BASE &&
          diffLine < PC2LINE_BASE + PC2LINE_RANGE &&
          diffPc <= PC2LINE_DIFF_PC_MAX) {
        // 短编码
        fd.pc2line.putByte(
          (diffLine - PC2LINE_BASE) + diffPc * PC2LINE_RANGE + PC2LINE_OP_FIRST
        )
      } else {
        // 长编码
        fd.pc2line.putByte(0)
        fd.pc2line.putULEB128(diffPc)
        fd.pc2line.putSLEB128(diffLine)
      }
      
      // 写入列号差值
      fd.pc2line.putSLEB128(diffCol)
      
      lastPc = pc
      lastLineNum = lineNum
      lastColNum = colNum
    }
  }
  
  /**
   * 从 sourcePos 获取行号
   * 
   * 简化实现：需要解析源码来获取准确行号
   * 
   * @param fd 函数定义
   * @param sourcePos 源码位置
   * @returns 行号
   */
  private getLineFromSourcePos(fd: FunctionDef, sourcePos: number): number {
    // 简化实现：遍历源码计算行号
    const source = fd.source
    let lineNum = 1
    for (let i = 0; i < sourcePos && i < source.length; i++) {
      if (source.charCodeAt(i) === 10) { // '\n'
        lineNum++
      }
    }
    return lineNum
  }
  
  /**
   * 从 sourcePos 获取列号
   * 
   * @param fd 函数定义
   * @param sourcePos 源码位置
   * @returns 列号
   */
  private getColFromSourcePos(fd: FunctionDef, sourcePos: number): number {
    // 简化实现：从上一个换行符开始计算
    const source = fd.source
    let colNum = 0
    for (let i = sourcePos - 1; i >= 0; i--) {
      if (source.charCodeAt(i) === 10) { // '\n'
        break
      }
      // 只计算 ASCII 字符或 UTF-8 起始字节
      const c = source.charCodeAt(i)
      if (c < 0x80 || c >= 0xc0) {
        colNum++
      }
    }
    return colNum
  }
}
