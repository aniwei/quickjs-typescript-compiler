/**
 * Opcode Generation Logic
 * 根据 QuickJS 编译配置逻辑生成 opcode，严格对齐 QuickJS 实现
 */

import { ConfigManager, CompileFlags } from './config'
import { CompilerFlags, OpcodeDefinition, OpcodeFormat } from './opcodes'
import { OPCODE_NAME_TO_CODE } from './env'

export class OpcodeGenerator {
  private configManager: ConfigManager
  private opcodeMap = new Map<string, number>()
  private overrideMap?: Map<string, number>
  
  constructor(configManager: ConfigManager, overrideMap?: Map<string, number>) {
    this.configManager = configManager
    this.overrideMap = overrideMap
    this.generateOpcodeMap()
  }
  
  // 根据配置生成 opcode 映射
  private generateOpcodeMap(): void {
    const flags = this.configManager.getFlags()
    
    // 基础 opcodes (always included)
    this.addBaseOpcodes()
    
    // 条件 opcodes
    if (flags.CONFIG_BIGNUM) {
      this.addBigIntOpcodes()
    }
    
    if (flags.SHORT_OPCODES) {
      this.addShortOpcodes()
    }
    
    if (flags.DEBUG) {
      this.addDebugOpcodes()
    }
    
    if (flags.CONFIG_MODULES) {
      this.addModuleOpcodes()
    }
    
    if (flags.CONFIG_PROMISE) {
      this.addPromiseOpcodes()
    }
    
    if (flags.CONFIG_PROXY) {
      this.addProxyOpcodes()
    }
    
    if (flags.CONFIG_TYPEDARRAY) {
      this.addTypedArrayOpcodes()
    }
  }
  
  // 添加基础 opcodes
  private addBaseOpcodes(): void {
    const code = (name: string) => OPCODE_NAME_TO_CODE[name]
    this.opcodeMap.set('invalid', code('invalid'))
    this.opcodeMap.set('push_i32', code('push_i32'))
    this.opcodeMap.set('push_const', code('push_const'))
    this.opcodeMap.set('fclosure', code('fclosure'))
    this.opcodeMap.set('push_atom_value', code('push_atom_value'))
    this.opcodeMap.set('private_symbol', code('private_symbol'))
    this.opcodeMap.set('undefined', code('undefined'))
    this.opcodeMap.set('null', code('null'))
    this.opcodeMap.set('push_this', code('push_this'))
    this.opcodeMap.set('push_false', code('push_false'))
    this.opcodeMap.set('push_true', code('push_true'))
    this.opcodeMap.set('object', code('object'))
    this.opcodeMap.set('special_object', code('special_object'))
    this.opcodeMap.set('rest', code('rest'))
    
    // Stack operations
  this.opcodeMap.set('drop', code('drop'))
  this.opcodeMap.set('nip', code('nip'))
  this.opcodeMap.set('nip1', code('nip1'))
  this.opcodeMap.set('dup', code('dup'))
  this.opcodeMap.set('dup1', code('dup1'))
  this.opcodeMap.set('dup2', code('dup2'))
  this.opcodeMap.set('dup3', code('dup3'))
  this.opcodeMap.set('insert2', code('insert2'))
  this.opcodeMap.set('insert3', code('insert3'))
  this.opcodeMap.set('insert4', code('insert4'))
  this.opcodeMap.set('perm3', code('perm3'))
  this.opcodeMap.set('perm4', code('perm4'))
  this.opcodeMap.set('perm5', code('perm5'))
  this.opcodeMap.set('swap', code('swap'))
  this.opcodeMap.set('swap2', code('swap2'))
  this.opcodeMap.set('rot3l', code('rot3l'))
  this.opcodeMap.set('rot3r', code('rot3r'))
  this.opcodeMap.set('rot4l', code('rot4l'))
  this.opcodeMap.set('rot5l', code('rot5l'))
    
    // Function calls
  this.opcodeMap.set('call_constructor', code('call_constructor'))
  this.opcodeMap.set('call', code('call'))
  this.opcodeMap.set('tail_call', code('tail_call'))
  this.opcodeMap.set('call_method', code('call_method'))
  this.opcodeMap.set('tail_call_method', code('tail_call_method'))
  this.opcodeMap.set('array_from', code('array_from'))
  this.opcodeMap.set('apply', code('apply'))
  this.opcodeMap.set('return', code('return'))
  this.opcodeMap.set('return_undef', code('return_undef'))
    
    // Variables
  this.opcodeMap.set('get_var', code('get_var'))
  this.opcodeMap.set('put_var', code('put_var'))
  this.opcodeMap.set('put_var_init', code('put_var_init'))
  this.opcodeMap.set('put_var_strict', code('put_var_strict'))
    
    // Locals
  this.opcodeMap.set('get_loc', code('get_loc'))
  this.opcodeMap.set('put_loc', code('put_loc'))
  this.opcodeMap.set('set_loc', code('set_loc'))
    
    // Arguments
  this.opcodeMap.set('get_arg', code('get_arg'))
  this.opcodeMap.set('put_arg', code('put_arg'))
  this.opcodeMap.set('set_arg', code('set_arg'))
    
    // Object/Array operations
  this.opcodeMap.set('get_field', code('get_field'))
  this.opcodeMap.set('get_field2', code('get_field2'))
  this.opcodeMap.set('put_field', code('put_field'))
  this.opcodeMap.set('get_array_el', code('get_array_el'))
  this.opcodeMap.set('put_array_el', code('put_array_el'))
  this.opcodeMap.set('define_field', code('define_field'))
  this.opcodeMap.set('define_array_el', code('define_array_el'))
  this.opcodeMap.set('append', code('append'))
    
    // Control flow
  this.opcodeMap.set('if_false', code('if_false'))
  this.opcodeMap.set('if_true', code('if_true'))
  this.opcodeMap.set('goto', code('goto'))
    
    // Arithmetic operations
  this.opcodeMap.set('neg', code('neg'))
  this.opcodeMap.set('plus', code('plus'))
  this.opcodeMap.set('dec', code('dec'))
  this.opcodeMap.set('inc', code('inc'))
  this.opcodeMap.set('not', code('not'))
  this.opcodeMap.set('lnot', code('lnot'))
  this.opcodeMap.set('mul', code('mul'))
  this.opcodeMap.set('div', code('div'))
  this.opcodeMap.set('mod', code('mod'))
  this.opcodeMap.set('add', code('add'))
  this.opcodeMap.set('sub', code('sub'))
  this.opcodeMap.set('pow', code('pow'))
  this.opcodeMap.set('shl', code('shl'))
  this.opcodeMap.set('sar', code('sar'))
  this.opcodeMap.set('shr', code('shr'))
    
    // Comparison operations
  this.opcodeMap.set('lt', code('lt'))
  this.opcodeMap.set('lte', code('lte'))
  this.opcodeMap.set('gt', code('gt'))
  this.opcodeMap.set('gte', code('gte'))
  this.opcodeMap.set('eq', code('eq'))
  this.opcodeMap.set('neq', code('neq'))
  this.opcodeMap.set('strict_eq', code('strict_eq'))
  this.opcodeMap.set('strict_neq', code('strict_neq'))
    
    // Logical operations
  this.opcodeMap.set('and', code('and'))
  this.opcodeMap.set('xor', code('xor'))
  this.opcodeMap.set('or', code('or'))
    
    // For loops
  this.opcodeMap.set('for_in_start', code('for_in_start'))
  this.opcodeMap.set('for_of_start', code('for_of_start'))
  this.opcodeMap.set('for_in_next', code('for_in_next'))
  this.opcodeMap.set('for_of_next', code('for_of_next'))
    
    // Special opcode
    this.opcodeMap.set('nop', code('nop'))
  }
  
  // 添加 BigInt opcodes
  private addBigIntOpcodes(): void {
    const code = (name: string) => OPCODE_NAME_TO_CODE[name]
    this.opcodeMap.set('push_bigint_i32', code('push_bigint_i32'))
  }
  
  // 添加 Short opcodes
  private addShortOpcodes(): void {
    const code = (name: string) => OPCODE_NAME_TO_CODE[name]
    // Push small integers
    this.opcodeMap.set('push_minus1', code('push_minus1'))
    this.opcodeMap.set('push_0', code('push_0'))
    this.opcodeMap.set('push_1', code('push_1'))
    this.opcodeMap.set('push_2', code('push_2'))
    this.opcodeMap.set('push_3', code('push_3'))
    this.opcodeMap.set('push_4', code('push_4'))
    this.opcodeMap.set('push_5', code('push_5'))
    this.opcodeMap.set('push_6', code('push_6'))
    this.opcodeMap.set('push_7', code('push_7'))
    this.opcodeMap.set('push_i8', code('push_i8'))
    this.opcodeMap.set('push_i16', code('push_i16'))
    this.opcodeMap.set('push_const8', code('push_const8'))
    this.opcodeMap.set('fclosure8', code('fclosure8'))
    this.opcodeMap.set('push_empty_string', code('push_empty_string'))
    
    // Short local operations
  this.opcodeMap.set('get_loc8', code('get_loc8'))
  this.opcodeMap.set('put_loc8', code('put_loc8'))
  this.opcodeMap.set('set_loc8', code('set_loc8'))
    
    // Optimized local access for first 4 locals
  this.opcodeMap.set('get_loc0', code('get_loc0'))
  this.opcodeMap.set('get_loc1', code('get_loc1'))
  this.opcodeMap.set('get_loc2', code('get_loc2'))
  this.opcodeMap.set('get_loc3', code('get_loc3'))
  this.opcodeMap.set('put_loc0', code('put_loc0'))
  this.opcodeMap.set('put_loc1', code('put_loc1'))
  this.opcodeMap.set('put_loc2', code('put_loc2'))
  this.opcodeMap.set('put_loc3', code('put_loc3'))
  this.opcodeMap.set('set_loc0', code('set_loc0'))
  this.opcodeMap.set('set_loc1', code('set_loc1'))
  this.opcodeMap.set('set_loc2', code('set_loc2'))
  this.opcodeMap.set('set_loc3', code('set_loc3'))
    
    // Short jump operations
  this.opcodeMap.set('if_false8', code('if_false8'))
  this.opcodeMap.set('if_true8', code('if_true8'))
  this.opcodeMap.set('goto8', code('goto8'))
  this.opcodeMap.set('goto16', code('goto16'))
    
    // Short call operations
  this.opcodeMap.set('call0', code('call0'))
  this.opcodeMap.set('call1', code('call1'))
  this.opcodeMap.set('call2', code('call2'))
  this.opcodeMap.set('call3', code('call3'))
    
    // Type checks
    this.opcodeMap.set('is_undefined', code('is_undefined'))
    this.opcodeMap.set('is_null', code('is_null'))
    this.opcodeMap.set('typeof_is_undefined', code('typeof_is_undefined'))
    this.opcodeMap.set('typeof_is_function', code('typeof_is_function'))
  }
  
  // 添加调试 opcodes (placeholder)
  private addDebugOpcodes(): void {
    // Debug-specific opcodes would be added here
    // These might include line number tracking, breakpoint support, etc.
  }
  
  // 添加模块系统 opcodes (placeholder)
  private addModuleOpcodes(): void {
    // Module-specific opcodes would be added here
  }
  
  // 添加 Promise opcodes (placeholder)
  private addPromiseOpcodes(): void {
    // Promise-specific opcodes would be added here
  }
  
  // 添加 Proxy opcodes (placeholder)
  private addProxyOpcodes(): void {
    // Proxy-specific opcodes would be added here
  }
  
  // 添加 TypedArray opcodes (placeholder)
  private addTypedArrayOpcodes(): void {
    // TypedArray-specific opcodes would be added here
  }
  
  // 获取 opcode 数值
  getOpcodeValue(opcodeId: string): number | undefined {
    // 优先使用 QuickJS 提供的权威映射
    const v = this.overrideMap?.get(opcodeId)
    if (v !== undefined) return v
    return this.opcodeMap.get(opcodeId)
  }
  
  // 检查 opcode 是否可用
  isOpcodeAvailable(opcodeId: string): boolean {
    return this.opcodeMap.has(opcodeId)
  }
  
  // 获取所有可用的 opcodes
  getAvailableOpcodes(): Map<string, number> {
    return new Map(this.opcodeMap)
  }
  
  // 生成 opcode 文档
  generateOpcodeDocumentation(): string {
    let doc = 'Available Opcodes:\n'
    doc += '==================\n\n'
    
    const sorted = Array.from(this.opcodeMap.entries()).sort((a, b) => a[1] - b[1])
    
    for (const [id, value] of sorted) {
      doc += `${value.toString().padStart(3, ' ')}: ${id}\n`
    }
    
    return doc
  }
  
  // 验证 opcode 配置
  validateOpcodeConfiguration(): string[] {
    const warnings: string[] = []
    const flags = this.configManager.getFlags()
    
    // 检查 BigInt 支持
    if (flags.CONFIG_BIGNUM && !this.isOpcodeAvailable('push_bigint_i32')) {
      warnings.push('BigInt support enabled but bigint opcodes not available')
    }
    
    // 检查 Short opcodes 支持
    if (flags.SHORT_OPCODES && !this.isOpcodeAvailable('push_0')) {
      warnings.push('Short opcodes enabled but short opcodes not available')
    }
    
    return warnings
  }
}

// 根据编译器配置创建 opcode 生成器
export function createOpcodeGenerator(config: CompilerFlags, overrideMap?: Map<string, number>): OpcodeGenerator {
  const configManager = ConfigManager.fromCompilerFlags(config)
  return new OpcodeGenerator(configManager, overrideMap)
}