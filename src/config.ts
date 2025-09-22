/**
 * Configuration Management for QuickJS TypeScript Compiler
 * 根据 QuickJS 编译配置逻辑实现配置生成
 */

import { CompilerFlags } from './opcodes'

// QuickJS 编译时特性标志
export interface CompileFlags {
  // BigInt support
  CONFIG_BIGNUM: boolean
  
  // String normalization
  CONFIG_UNICODE_NORMALIZATION: boolean
  
  // Dump bytecode
  DUMP_BYTECODE: boolean
  
  // Short opcodes optimization
  SHORT_OPCODES: boolean
  
  // Debug features
  DEBUG: boolean
  
  // Memory management
  CONFIG_STACK_CHECK: boolean
  
  // Module system
  CONFIG_MODULES: boolean
  
  // Promise support
  CONFIG_PROMISE: boolean
  
  // Debugger support
  CONFIG_DEBUGGER: boolean
  
  // Atomics and SharedArrayBuffer
  CONFIG_ATOMICS: boolean
  
  // Proxy support
  CONFIG_PROXY: boolean
  
  // Reflect API
  CONFIG_REFLECT: boolean
  
  // Map/Set support
  CONFIG_MAP_SET: boolean
  
  // Typed arrays
  CONFIG_TYPEDARRAY: boolean
  
  // Regular expressions
  CONFIG_REGEXP: boolean
  
  // Date API
  CONFIG_DATE: boolean
  
  // JSON support
  CONFIG_JSON: boolean
  
  // Eval function
  CONFIG_EVAL: boolean
  
  // String template literals
  CONFIG_STRING_NORMALIZE: boolean
  
  // Operator overloading
  CONFIG_OPERATOR_OVERLOADING: boolean
  
  // Test262 compatibility
  CONFIG_TEST262: boolean
}

// 默认 QuickJS 配置
export const DEFAULT_COMPILE_FLAGS: CompileFlags = {
  CONFIG_BIGNUM: false,
  CONFIG_UNICODE_NORMALIZATION: true,
  DUMP_BYTECODE: false,
  SHORT_OPCODES: true,
  DEBUG: false,
  CONFIG_STACK_CHECK: true,
  CONFIG_MODULES: true,
  CONFIG_PROMISE: true,
  CONFIG_DEBUGGER: false,
  CONFIG_ATOMICS: true,
  CONFIG_PROXY: true,
  CONFIG_REFLECT: true,
  CONFIG_MAP_SET: true,
  CONFIG_TYPEDARRAY: true,
  CONFIG_REGEXP: true,
  CONFIG_DATE: true,
  CONFIG_JSON: true,
  CONFIG_EVAL: true,
  CONFIG_STRING_NORMALIZE: true,
  CONFIG_OPERATOR_OVERLOADING: false,
  CONFIG_TEST262: false
}

// QuickJS 字节码格式版本
export const BYTECODE_VERSION = 14

// QuickJS 字节码魔数
export const BYTECODE_MAGIC = 0x02014a53 // 'JS\x01\x02'

// 内存配置
export interface MemoryConfig {
  maxStackSize: number
  maxHeapSize: number
  gcThreshold: number
}

export const DEFAULT_MEMORY_CONFIG: MemoryConfig = {
  maxStackSize: 256 * 1024, // 256KB
  maxHeapSize: 16 * 1024 * 1024, // 16MB
  gcThreshold: 256 * 1024 // 256KB
}

// 配置管理器
export class ConfigManager {
  private flags: CompileFlags
  private memoryConfig: MemoryConfig
  
  constructor(
    flags: Partial<CompileFlags> = {},
    memoryConfig: Partial<MemoryConfig> = {}
  ) {
    this.flags = { ...DEFAULT_COMPILE_FLAGS, ...flags }
    this.memoryConfig = { ...DEFAULT_MEMORY_CONFIG, ...memoryConfig }
  }
  
  // 从 CompilerFlags 创建 QuickJS 配置
  static fromCompilerFlags(config: CompilerFlags): ConfigManager {
    const flags: Partial<CompileFlags> = {
      CONFIG_BIGNUM: config.bigInt,
      DUMP_BYTECODE: config.dump,
      SHORT_OPCODES: config.shortCode,
      DEBUG: config.debug
    }
    
    return new ConfigManager(flags)
  }
  
  // 生成编译时宏定义
  generateCompileDefines(): Record<string, string | number | boolean> {
    const defines: Record<string, string | number | boolean> = {}
    
    // 将配置标志转换为宏定义
    for (const [key, value] of Object.entries(this.flags)) {
      defines[key] = value ? 1 : 0
    }
    
    // 添加版本信息
    defines.BYTECODE_VERSION = BYTECODE_VERSION
    defines.BYTECODE_MAGIC = BYTECODE_MAGIC
    
    // 内存配置
    defines.MAX_STACK_SIZE = this.memoryConfig.maxStackSize
    defines.MAX_HEAP_SIZE = this.memoryConfig.maxHeapSize
    defines.GC_THRESHOLD = this.memoryConfig.gcThreshold
    
    return defines
  }
  
  // 检查特性是否启用
  isFeatureEnabled(feature: keyof CompileFlags): boolean {
    return this.flags[feature]
  }
  
  // 获取字节码优化级别
  getOptimizationLevel(): 'none' | 'basic' | 'full' {
    if (!this.flags.SHORT_OPCODES && this.flags.DEBUG) {
      return 'none'
    } else if (this.flags.SHORT_OPCODES && !this.flags.DEBUG) {
      return 'full'
    } else {
      return 'basic'
    }
  }
  
  // 生成条件编译分支
  shouldIncludeFeature(feature: string): boolean {
    switch (feature) {
      case 'bigint':
        return this.flags.CONFIG_BIGNUM
      case 'unicode_normalization':
        return this.flags.CONFIG_UNICODE_NORMALIZATION
      case 'modules':
        return this.flags.CONFIG_MODULES
      case 'promise':
        return this.flags.CONFIG_PROMISE
      case 'proxy':
        return this.flags.CONFIG_PROXY
      case 'reflect':
        return this.flags.CONFIG_REFLECT
      case 'map_set':
        return this.flags.CONFIG_MAP_SET
      case 'typed_array':
        return this.flags.CONFIG_TYPEDARRAY
      case 'regexp':
        return this.flags.CONFIG_REGEXP
      case 'date':
        return this.flags.CONFIG_DATE
      case 'json':
        return this.flags.CONFIG_JSON
      case 'eval':
        return this.flags.CONFIG_EVAL
      case 'atomics':
        return this.flags.CONFIG_ATOMICS
      case 'debugger':
        return this.flags.CONFIG_DEBUGGER
      default:
        return true
    }
  }
  
  // 获取字节码头部信息
  getBytecodeHeader(): {
    magic: number
    version: number
    flags: number
    hash: number
  } {
    // 根据配置计算标志位
    let flags = 0
    if (this.flags.CONFIG_BIGNUM) flags |= 1 << 0
    if (this.flags.SHORT_OPCODES) flags |= 1 << 1
    if (this.flags.DEBUG) flags |= 1 << 2
    if (this.flags.CONFIG_MODULES) flags |= 1 << 3
    
    // 计算配置哈希（用于缓存失效）
    let hash = 0
    const configStr = JSON.stringify(this.flags)
    for (let i = 0; i < configStr.length; i++) {
      hash = ((hash << 5) - hash + configStr.charCodeAt(i)) & 0xFFFFFFFF
    }
    
    return {
      magic: BYTECODE_MAGIC,
      version: BYTECODE_VERSION,
      flags,
      hash: hash >>> 0 // Convert to unsigned
    }
  }
  
  // 获取内存配置
  getMemoryConfig(): MemoryConfig {
    return { ...this.memoryConfig }
  }
  
  // 获取完整配置
  getFlags(): CompileFlags {
    return { ...this.flags }
  }
  
  // 创建针对特定目标的配置
  static createForTarget(target: 'development' | 'production' | 'debug'): ConfigManager {
    switch (target) {
      case 'development':
        return new ConfigManager({
          SHORT_OPCODES: true,
          DEBUG: false,
          DUMP_BYTECODE: false,
          CONFIG_DEBUGGER: false
        })
        
      case 'production':
        return new ConfigManager({
          SHORT_OPCODES: true,
          DEBUG: false,
          DUMP_BYTECODE: false,
          CONFIG_DEBUGGER: false,
          CONFIG_TEST262: false
        })
        
      case 'debug':
        return new ConfigManager({
          SHORT_OPCODES: false,
          DEBUG: true,
          DUMP_BYTECODE: true,
          CONFIG_DEBUGGER: true,
          CONFIG_STACK_CHECK: true
        })
        
      default:
        return new ConfigManager()
    }
  }
  
  // 验证配置兼容性
  validateConfig(): string[] {
    const warnings: string[] = []
    
    // BigNum 需要特殊处理
    if (this.flags.CONFIG_BIGNUM && !this.flags.CONFIG_OPERATOR_OVERLOADING) {
      warnings.push('BigNum support enabled but operator overloading disabled')
    }
    
    // 调试模式下的性能警告
    if (this.flags.DEBUG && this.flags.SHORT_OPCODES) {
      warnings.push('Debug mode with short opcodes may affect debugging experience')
    }
    
    // 模块系统依赖
    if (this.flags.CONFIG_PROMISE && !this.flags.CONFIG_MODULES) {
      warnings.push('Promise support usually requires module system')
    }
    
    return warnings
  }
}