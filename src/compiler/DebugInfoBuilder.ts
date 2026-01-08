/**
 * DebugInfoBuilder - 调试信息生成器
 * 
 * 对应 QuickJS 源码:
 * - parser.c:10842-10854 (add_pc2line_info)
 * - parser.c:10862-10912 (compute_pc2line_info)
 * - parser.c:128-146 (get_line_col)
 * - parser.c:148-180 (get_line_col_cached)
 * 
 * 功能:
 * 1. 收集行号/列号信息 (add_pc2line_info)
 * 2. 计算 pc2line 表 (compute_pc2line_info)
 * 3. 计算 pc2column 表
 * 4. 行列号缓存优化 (get_line_col_cached)
 */

import { BytecodeBuilder } from './BytecodeBuilder'
import {
  FunctionDef,
  LineNumberSlot,
  GetLineColCache,
} from './FunctionDef'
import { PC2Line } from '../env'
import {
  qtsTracePc2lineBegin,
  qtsTracePc2lineEnd,
  qtsTracePc2lineInit,
  qtsTracePc2lineSlot,
} from '../qtsTrace'

// ============================================================================
// 常量定义 - 从 env.ts 的 PC2Line 枚举导入
// ============================================================================

/** PC2LINE 编码常量 */
export const PC2LINE_BASE = PC2Line.PC2LINE_BASE
export const PC2LINE_RANGE = PC2Line.PC2LINE_RANGE
export const PC2LINE_OP_FIRST = PC2Line.PC2LINE_OP_FIRST
export const PC2LINE_DIFF_PC_MAX = PC2Line.PC2LINE_DIFF_PC_MAX

// ============================================================================
// DebugInfoBuilder 类
// ============================================================================

/**
 * DebugInfoBuilder - 构建调试信息
 * 
 * 对应 QuickJS parser.c 中的调试信息相关函数
 */
export class DebugInfoBuilder {
  /**
   * 添加 pc2line 信息
   * 
   * 对应 parser.c:10842-10854 的 add_pc2line_info
   * 
   * @param fd 函数定义
   * @param pc 程序计数器
   * @param sourcePos 源码位置
   */
  static addPc2LineInfo(fd: FunctionDef, pc: number, sourcePos: number): void {
    // parser.c:10844-10853
    if (fd.lineNumberSlots != null &&
        fd.lineNumberCount < fd.lineNumberSize &&
        pc >= fd.lineNumberLastPc &&
        sourcePos !== fd.lineNumberLast) {
      // 确保数组有足够空间
      if (fd.lineNumberCount >= fd.lineNumberSlots.length) {
        const newSize = Math.max(fd.lineNumberSlots.length * 2, 16)
        const newSlots = new Array<LineNumberSlot>(newSize)
        for (let i = 0; i < fd.lineNumberSlots.length; i++) {
          newSlots[i] = fd.lineNumberSlots[i]
        }
        for (let i = fd.lineNumberSlots.length; i < newSize; i++) {
          newSlots[i] = new LineNumberSlot()
        }
        fd.lineNumberSlots = newSlots
        fd.lineNumberSize = newSize
      }
      
      fd.lineNumberSlots[fd.lineNumberCount].pc = pc
      fd.lineNumberSlots[fd.lineNumberCount].sourcePos = sourcePos
      fd.lineNumberCount++
      fd.lineNumberLastPc = pc
      fd.lineNumberLast = sourcePos
    }
  }
  
  /**
   * 初始化行号槽数组
   * 
   * @param fd 函数定义
   * @param initialSize 初始大小
   */
  static initLineNumberSlots(fd: FunctionDef, initialSize: number = 16): void {
    fd.lineNumberSlots = new Array<LineNumberSlot>(initialSize)
    for (let i = 0; i < initialSize; i++) {
      fd.lineNumberSlots[i] = new LineNumberSlot()
    }
    fd.lineNumberSize = initialSize
    fd.lineNumberCount = 0
    fd.lineNumberLast = 0
    fd.lineNumberLastPc = 0
  }
  
  /**
   * 初始化行列缓存
   * 
   * @param fd 函数定义
   * @param source 源码
   */
  static initLineColCache(fd: FunctionDef, source: string): void {
    fd.getLineColCache = new GetLineColCache()
    fd.getLineColCache.ptr = 0
    fd.getLineColCache.lineNum = 1
    fd.getLineColCache.colNum = 0
    fd.getLineColCache.bufStart = 0
    fd.source = source
    fd.sourceLen = source.length
  }
  
  /**
   * 计算行列号
   * 
   * 对应 parser.c:128-146 的 get_line_col
   * 
   * @param source 源码
   * @param start 开始位置
   * @param len 长度
   * @returns [行号增量, 列号]
   */
  static getLineCol(source: string, start: number, len: number): [number, number] {
    let lineNum = 0
    let colNum = 0
    
    for (let i = 0; i < len && start + i < source.length; i++) {
      const c = source.charCodeAt(start + i)
      if (c === 10) { // '\n'
        lineNum++
        colNum = 0
      } else if (c < 0x80 || c >= 0xc0) {
        // ASCII 或 UTF-8 起始字节
        colNum++
      }
    }
    
    return [lineNum, colNum]
  }
  
  /**
   * 使用缓存计算行列号
   * 
   * 对应 parser.c:148-180 的 get_line_col_cached
   * 
   * @param cache 缓存对象
   * @param source 源码
   * @param ptr 目标位置
   * @returns [行号, 列号]
   */
  static getLineColCached(
    cache: GetLineColCache,
    source: string,
    ptr: number
  ): [number, number] {
    if (ptr >= cache.ptr) {
      // 向前搜索
      const [lineNum, colNum] = this.getLineCol(source, cache.ptr, ptr - cache.ptr)
      if (lineNum === 0) {
        cache.colNum += colNum
      } else {
        cache.lineNum += lineNum
        cache.colNum = colNum
      }
    } else {
      // 向后搜索
      const [lineNum, colNum] = this.getLineCol(source, ptr, cache.ptr - ptr)
      if (lineNum === 0) {
        cache.colNum -= colNum
      } else {
        cache.lineNum -= lineNum
        // 找到绝对列位置
        let col = 0
        for (let p = ptr - 1; p >= cache.bufStart; p--) {
          const c = source.charCodeAt(p)
          if (c === 10) { // '\n'
            break
          } else if (c < 0x80 || c >= 0xc0) {
            col++
          }
        }
        cache.colNum = col
      }
    }
    
    cache.ptr = ptr
    // QuickJS get_line_col_cached returns (line_number_minus_1, column_number_minus_1).
    // Our cache.lineNum is 1-based; cache.colNum is already effectively (col - 1).
    return [cache.lineNum - 1, cache.colNum]
  }
  
  /**
   * 计算 pc2line 信息
   * 
   * 对应 parser.c:10862-10912 的 compute_pc2line_info
   * 
   * @param fd 函数定义
   */
  static computePc2LineInfo(fd: FunctionDef): void {
    if (fd.stripDebug) {
      return
    }
    
    const cache = fd.getLineColCache
    if (!cache) {
      return
    }
    
    const source = fd.source
    
    // 初始化 pc2line 缓冲区 - parser.c:10868
    fd.pc2line = new BytecodeBuilder()

    // Trace mirrors QuickJS pc2line tracing.
    qtsTracePc2lineBegin(fd.lineNumberCount ?? 0, fd.sourcePos >>> 0)
    
    // 获取初始行列号 - parser.c:10870-10871
    const [initLineNum, initColNum] = this.getLineColCached(
      cache,
      source,
      fd.sourcePos
    )
    let lastLineNum = initLineNum
    let lastColNum = initColNum
    let lastPc = 0
    
    // 写入初始行列号 (line_num - 1, col_num - 1) - parser.c:10872-10873
    fd.pc2line.putULEB128(lastLineNum)
    fd.pc2line.putULEB128(lastColNum)

    qtsTracePc2lineInit(lastLineNum | 0, lastColNum | 0)
    
    // 遍历行号槽 - parser.c:10875-10911
    let outIndex = 0
    for (let i = 0; i < fd.lineNumberCount; i++) {
      const slot = fd.lineNumberSlots[i]
      const pc = slot.pc
      const sourcePos = slot.sourcePos
      
      // 跳过无效条目 - parser.c:10879-10880
      if (sourcePos === -1) {
        continue
      }
      
      const diffPc = pc - lastPc
      if (diffPc < 0) {
        continue
      }
      
      // 获取行列号 - parser.c:10886-10887
      const [lineNum, colNum] = this.getLineColCached(cache, source, sourcePos)
      const diffLine = lineNum - lastLineNum
      const diffCol = colNum - lastColNum
      
      // 跳过没有变化的条目 - parser.c:10889-10890
      if (diffLine === 0 && diffCol === 0) {
        continue
      }
      
      // 编码 pc2line 条目 - parser.c:10893-10907
      let isShort = false
      let opByte = 0
      if (diffLine >= PC2LINE_BASE &&
          diffLine < PC2LINE_BASE + PC2LINE_RANGE &&
          diffPc <= PC2LINE_DIFF_PC_MAX) {
        // 短编码 - parser.c:10896-10899
        isShort = true
        opByte = (diffLine - PC2LINE_BASE) + diffPc * PC2LINE_RANGE + PC2LINE_OP_FIRST
        fd.pc2line.putByte(opByte)
      } else {
        // 长编码 - parser.c:10901-10904
        isShort = false
        opByte = 0
        fd.pc2line.putByte(0)
        fd.pc2line.putULEB128(diffPc)
        fd.pc2line.putSLEB128(diffLine)
      }
      
      // 写入列号差值 - parser.c:10905
      fd.pc2line.putSLEB128(diffCol)

      qtsTracePc2lineSlot(
        outIndex,
        pc >>> 0,
        sourcePos >>> 0,
        lineNum | 0,
        colNum | 0,
        diffPc | 0,
        diffLine | 0,
        diffCol | 0,
        isShort,
        opByte & 0xff,
      )
      outIndex++
      
      // 更新上一个值 - parser.c:10907-10909
      lastPc = pc
      lastLineNum = lineNum
      lastColNum = colNum
    }

    qtsTracePc2lineEnd(fd.pc2line.size | 0)
  }
  
  /**
   * 从 PC 获取源码位置
   * 
   * 解码 pc2line 表，根据 PC 值获取行列号
   * 
   * @param pc2lineBuf pc2line 缓冲区
   * @param pc 程序计数器
   * @returns [行号, 列号] 或 null
   */
  static getSourcePosFromPc(
    pc2lineBuf: Uint8Array,
    pc: number
  ): [number, number] | null {
    if (pc2lineBuf.length === 0) {
      return null
    }
    
    let pos = 0
    
    // 读取初始行列号
    const [lineNum0, len1] = this.readULEB128(pc2lineBuf, pos)
    pos += len1
    const [colNum0, len2] = this.readULEB128(pc2lineBuf, pos)
    pos += len2
    
    let lineNum = lineNum0
    let colNum = colNum0
    let currentPc = 0
    
    // 遍历 pc2line 表
    while (pos < pc2lineBuf.length && currentPc < pc) {
      const op = pc2lineBuf[pos++]
      
      let diffPc: number
      let diffLine: number
      
      if (op >= PC2LINE_OP_FIRST) {
        // 短编码
        const code = op - PC2LINE_OP_FIRST
        diffPc = Math.floor(code / PC2LINE_RANGE)
        diffLine = (code % PC2LINE_RANGE) + PC2LINE_BASE
      } else {
        // 长编码 (op === 0)
        const [dpc, len3] = this.readULEB128(pc2lineBuf, pos)
        pos += len3
        const [dline, len4] = this.readSLEB128(pc2lineBuf, pos)
        pos += len4
        diffPc = dpc
        diffLine = dline
      }
      
      // 读取列号差值
      const [diffCol, len5] = this.readSLEB128(pc2lineBuf, pos)
      pos += len5
      
      currentPc += diffPc
      
      if (currentPc <= pc) {
        lineNum += diffLine
        colNum += diffCol
      }
    }
    
    return [lineNum, colNum]
  }
  
  /**
   * 读取 ULEB128
   * 
   * @param buf 缓冲区
   * @param pos 位置
   * @returns [值, 读取的字节数]
   */
  private static readULEB128(buf: Uint8Array, pos: number): [number, number] {
    let result = 0
    let shift = 0
    let bytesRead = 0
    
    while (pos + bytesRead < buf.length) {
      const byte = buf[pos + bytesRead]
      bytesRead++
      result |= (byte & 0x7f) << shift
      if ((byte & 0x80) === 0) {
        break
      }
      shift += 7
    }
    
    return [result >>> 0, bytesRead]
  }
  
  /**
   * 读取 SLEB128
   * 
   * @param buf 缓冲区
   * @param pos 位置
   * @returns [值, 读取的字节数]
   */
  private static readSLEB128(buf: Uint8Array, pos: number): [number, number] {
    let result = 0
    let shift = 0
    let bytesRead = 0
    let byte: number
    
    do {
      byte = buf[pos + bytesRead]
      bytesRead++
      result |= (byte & 0x7f) << shift
      shift += 7
    } while ((byte & 0x80) !== 0 && pos + bytesRead < buf.length)
    
    // 符号扩展
    if (shift < 32 && (byte & 0x40) !== 0) {
      result |= (~0 << shift)
    }
    
    return [result, bytesRead]
  }
}

// ============================================================================
// SourceMapBuilder 类 - 可选的 Source Map 支持
// ============================================================================

/**
 * SourceMapBuilder - 构建 Source Map (可选功能)
 * 
 * 用于生成标准的 Source Map v3 格式，方便调试
 */
export class SourceMapBuilder {
  private mappings: string[] = []
  private sources: string[] = []
  private names: string[] = []
  
  /**
   * 添加映射
   * 
   * @param generatedLine 生成的行号
   * @param generatedColumn 生成的列号
   * @param sourceIndex 源文件索引
   * @param sourceLine 源文件行号
   * @param sourceColumn 源文件列号
   * @param nameIndex 名称索引 (可选)
   */
  addMapping(
    generatedLine: number,
    generatedColumn: number,
    sourceIndex: number,
    sourceLine: number,
    sourceColumn: number,
    _nameIndex?: number
  ): void {
    // VLQ 编码实现 (简化版)
    const segment = this.encodeVLQ(generatedColumn) +
                   this.encodeVLQ(sourceIndex) +
                   this.encodeVLQ(sourceLine) +
                   this.encodeVLQ(sourceColumn)
    
    // 确保数组足够大
    while (this.mappings.length <= generatedLine) {
      this.mappings.push('')
    }
    
    if (this.mappings[generatedLine]) {
      this.mappings[generatedLine] += ',' + segment
    } else {
      this.mappings[generatedLine] = segment
    }
  }
  
  /**
   * 添加源文件
   * 
   * @param source 源文件路径
   * @returns 源文件索引
   */
  addSource(source: string): number {
    const index = this.sources.indexOf(source)
    if (index >= 0) {
      return index
    }
    this.sources.push(source)
    return this.sources.length - 1
  }
  
  /**
   * 生成 Source Map JSON
   * 
   * @returns Source Map JSON 字符串
   */
  generate(): string {
    return JSON.stringify({
      version: 3,
      sources: this.sources,
      names: this.names,
      mappings: this.mappings.join(';'),
    })
  }
  
  /**
   * VLQ 编码
   * 
   * @param value 值
   * @returns VLQ 编码字符串
   */
  private encodeVLQ(value: number): string {
    const VLQ_BASE_SHIFT = 5
    const VLQ_BASE = 1 << VLQ_BASE_SHIFT
    const VLQ_BASE_MASK = VLQ_BASE - 1
    const VLQ_CONTINUATION_BIT = VLQ_BASE
    
    const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    
    let encoded = ''
    let vlq = value < 0 ? ((-value) << 1) + 1 : (value << 1)
    
    do {
      let digit = vlq & VLQ_BASE_MASK
      vlq >>>= VLQ_BASE_SHIFT
      if (vlq > 0) {
        digit |= VLQ_CONTINUATION_BIT
      }
      encoded += BASE64_CHARS[digit]
    } while (vlq > 0)
    
    return encoded
  }
}
