/**
 * Opcode Generation Logic
 * 根据 QuickJS 编译配置逻辑生成 opcode，严格对齐 QuickJS 实现
 */

import { ConfigManager, CompileFlags } from './config'
import { CompilerFlags, OpcodeDefinition, OpcodeFormat } from './opcodes'

// Opcode 值映射 - 根据 QuickJS 源码定义
export enum OpcodeValue {
  // 基础 opcodes (0-127)
  OP_INVALID = 0,
  OP_PUSH_I32 = 1,
  OP_PUSH_CONST = 2,
  OP_FCLOSURE = 3,
  OP_PUSH_ATOM_VALUE = 4,
  OP_PRIVATE_SYMBOL = 5,
  OP_UNDEFINED = 6,
  OP_NULL = 7,
  OP_PUSH_THIS = 8,
  OP_PUSH_FALSE = 9,
  OP_PUSH_TRUE = 10,
  OP_OBJECT = 11,
  OP_SPECIAL_OBJECT = 12,
  OP_REST = 13,
  OP_DROP = 14,
  OP_NIP = 15,
  OP_NIP1 = 16,
  OP_DUP = 17,
  OP_DUP1 = 18,
  OP_DUP2 = 19,
  OP_DUP3 = 20,
  OP_INSERT2 = 21,
  OP_INSERT3 = 22,
  OP_INSERT4 = 23,
  OP_PERM3 = 24,
  OP_PERM4 = 25,
  OP_PERM5 = 26,
  OP_SWAP = 27,
  OP_SWAP2 = 28,
  OP_ROT3L = 29,
  OP_ROT3R = 30,
  OP_ROT4L = 31,
  OP_ROT5L = 32,
  
  // Function calls
  OP_CALL_CONSTRUCTOR = 33,
  OP_CALL = 34,
  OP_TAIL_CALL = 35,
  OP_CALL_METHOD = 36,
  OP_TAIL_CALL_METHOD = 37,
  OP_ARRAY_FROM = 38,
  OP_APPLY = 39,
  OP_RETURN = 40,
  OP_RETURN_UNDEF = 41,
  
  // Variables
  OP_GET_VAR = 42,
  OP_PUT_VAR = 43,
  OP_PUT_VAR_INIT = 44,
  OP_PUT_VAR_STRICT = 45,
  
  // Locals
  OP_GET_LOC = 46,
  OP_PUT_LOC = 47,
  OP_SET_LOC = 48,
  
  // Arguments
  OP_GET_ARG = 49,
  OP_PUT_ARG = 50,
  OP_SET_ARG = 51,
  
  // Object/Array operations
  OP_GET_FIELD = 52,
  OP_GET_FIELD2 = 53,
  OP_PUT_FIELD = 54,
  OP_GET_ARRAY_EL = 55,
  OP_PUT_ARRAY_EL = 56,
  OP_DEFINE_FIELD = 57,
  OP_DEFINE_ARRAY_EL = 58,
  OP_APPEND = 59,
  
  // Control flow
  OP_IF_FALSE = 60,
  OP_IF_TRUE = 61,
  OP_GOTO = 62,
  
  // Arithmetic operations
  OP_NEG = 63,
  OP_PLUS = 64,
  OP_DEC = 65,
  OP_INC = 66,
  OP_NOT = 67,
  OP_LNOT = 68,
  OP_MUL = 69,
  OP_DIV = 70,
  OP_MOD = 71,
  OP_ADD = 72,
  OP_SUB = 73,
  OP_POW = 74,
  OP_SHL = 75,
  OP_SAR = 76,
  OP_SHR = 77,
  
  // Comparison operations
  OP_LT = 78,
  OP_LTE = 79,
  OP_GT = 80,
  OP_GTE = 81,
  OP_EQ = 82,
  OP_NEQ = 83,
  OP_STRICT_EQ = 84,
  OP_STRICT_NEQ = 85,
  
  // Logical operations
  OP_AND = 86,
  OP_XOR = 87,
  OP_OR = 88,
  
  // For loops
  OP_FOR_IN_START = 89,
  OP_FOR_OF_START = 90,
  OP_FOR_IN_NEXT = 91,
  OP_FOR_OF_NEXT = 92,
  
  // BigInt support (conditional)
  OP_PUSH_BIGINT_I32 = 93,
  
  // Special opcode
  OP_NOP = 94,
  
  // Short opcodes start (when SHORT_OPCODES enabled)
  OP_PUSH_MINUS1 = 128,
  OP_PUSH_0 = 129,
  OP_PUSH_1 = 130,
  OP_PUSH_2 = 131,
  OP_PUSH_3 = 132,
  OP_PUSH_4 = 133,
  OP_PUSH_5 = 134,
  OP_PUSH_6 = 135,
  OP_PUSH_7 = 136,
  OP_PUSH_I8 = 137,
  OP_PUSH_I16 = 138,
  OP_PUSH_CONST8 = 139,
  OP_FCLOSURE8 = 140,
  OP_PUSH_EMPTY_STRING = 141,
  
  // Short local operations
  OP_GET_LOC8 = 142,
  OP_PUT_LOC8 = 143,
  OP_SET_LOC8 = 144,
  
  // Optimized local access for first 4 locals
  OP_GET_LOC0 = 145,
  OP_GET_LOC1 = 146,
  OP_GET_LOC2 = 147,
  OP_GET_LOC3 = 148,
  OP_PUT_LOC0 = 149,
  OP_PUT_LOC1 = 150,
  OP_PUT_LOC2 = 151,
  OP_PUT_LOC3 = 152,
  OP_SET_LOC0 = 153,
  OP_SET_LOC1 = 154,
  OP_SET_LOC2 = 155,
  OP_SET_LOC3 = 156,
  
  // Short jump operations
  OP_IF_FALSE8 = 157,
  OP_IF_TRUE8 = 158,
  OP_GOTO8 = 159,
  OP_GOTO16 = 160,
  
  // Short call operations
  OP_CALL0 = 161,
  OP_CALL1 = 162,
  OP_CALL2 = 163,
  OP_CALL3 = 164,
  
  // Type checks
  OP_IS_UNDEFINED = 165,
  OP_IS_NULL = 166,
  OP_TYPEOF_IS_UNDEFINED = 167,
  OP_TYPEOF_IS_FUNCTION = 168,
  
  // 其他优化的 opcodes...
  OP_COUNT = 256  // 总数限制
}

export class OpcodeGenerator {
  private configManager: ConfigManager
  private opcodeMap = new Map<string, number>()
  
  constructor(configManager: ConfigManager) {
    this.configManager = configManager
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
    this.opcodeMap.set('invalid', OpcodeValue.OP_INVALID)
    this.opcodeMap.set('push_i32', OpcodeValue.OP_PUSH_I32)
    this.opcodeMap.set('push_const', OpcodeValue.OP_PUSH_CONST)
    this.opcodeMap.set('fclosure', OpcodeValue.OP_FCLOSURE)
    this.opcodeMap.set('push_atom_value', OpcodeValue.OP_PUSH_ATOM_VALUE)
    this.opcodeMap.set('private_symbol', OpcodeValue.OP_PRIVATE_SYMBOL)
    this.opcodeMap.set('undefined', OpcodeValue.OP_UNDEFINED)
    this.opcodeMap.set('null', OpcodeValue.OP_NULL)
    this.opcodeMap.set('push_this', OpcodeValue.OP_PUSH_THIS)
    this.opcodeMap.set('push_false', OpcodeValue.OP_PUSH_FALSE)
    this.opcodeMap.set('push_true', OpcodeValue.OP_PUSH_TRUE)
    this.opcodeMap.set('object', OpcodeValue.OP_OBJECT)
    this.opcodeMap.set('special_object', OpcodeValue.OP_SPECIAL_OBJECT)
    this.opcodeMap.set('rest', OpcodeValue.OP_REST)
    
    // Stack operations
    this.opcodeMap.set('drop', OpcodeValue.OP_DROP)
    this.opcodeMap.set('nip', OpcodeValue.OP_NIP)
    this.opcodeMap.set('nip1', OpcodeValue.OP_NIP1)
    this.opcodeMap.set('dup', OpcodeValue.OP_DUP)
    this.opcodeMap.set('dup1', OpcodeValue.OP_DUP1)
    this.opcodeMap.set('dup2', OpcodeValue.OP_DUP2)
    this.opcodeMap.set('dup3', OpcodeValue.OP_DUP3)
    this.opcodeMap.set('insert2', OpcodeValue.OP_INSERT2)
    this.opcodeMap.set('insert3', OpcodeValue.OP_INSERT3)
    this.opcodeMap.set('insert4', OpcodeValue.OP_INSERT4)
    this.opcodeMap.set('perm3', OpcodeValue.OP_PERM3)
    this.opcodeMap.set('perm4', OpcodeValue.OP_PERM4)
    this.opcodeMap.set('perm5', OpcodeValue.OP_PERM5)
    this.opcodeMap.set('swap', OpcodeValue.OP_SWAP)
    this.opcodeMap.set('swap2', OpcodeValue.OP_SWAP2)
    this.opcodeMap.set('rot3l', OpcodeValue.OP_ROT3L)
    this.opcodeMap.set('rot3r', OpcodeValue.OP_ROT3R)
    this.opcodeMap.set('rot4l', OpcodeValue.OP_ROT4L)
    this.opcodeMap.set('rot5l', OpcodeValue.OP_ROT5L)
    
    // Function calls
    this.opcodeMap.set('call_constructor', OpcodeValue.OP_CALL_CONSTRUCTOR)
    this.opcodeMap.set('call', OpcodeValue.OP_CALL)
    this.opcodeMap.set('tail_call', OpcodeValue.OP_TAIL_CALL)
    this.opcodeMap.set('call_method', OpcodeValue.OP_CALL_METHOD)
    this.opcodeMap.set('tail_call_method', OpcodeValue.OP_TAIL_CALL_METHOD)
    this.opcodeMap.set('array_from', OpcodeValue.OP_ARRAY_FROM)
    this.opcodeMap.set('apply', OpcodeValue.OP_APPLY)
    this.opcodeMap.set('return', OpcodeValue.OP_RETURN)
    this.opcodeMap.set('return_undef', OpcodeValue.OP_RETURN_UNDEF)
    
    // Variables
    this.opcodeMap.set('get_var', OpcodeValue.OP_GET_VAR)
    this.opcodeMap.set('put_var', OpcodeValue.OP_PUT_VAR)
    this.opcodeMap.set('put_var_init', OpcodeValue.OP_PUT_VAR_INIT)
    this.opcodeMap.set('put_var_strict', OpcodeValue.OP_PUT_VAR_STRICT)
    
    // Locals
    this.opcodeMap.set('get_loc', OpcodeValue.OP_GET_LOC)
    this.opcodeMap.set('put_loc', OpcodeValue.OP_PUT_LOC)
    this.opcodeMap.set('set_loc', OpcodeValue.OP_SET_LOC)
    
    // Arguments
    this.opcodeMap.set('get_arg', OpcodeValue.OP_GET_ARG)
    this.opcodeMap.set('put_arg', OpcodeValue.OP_PUT_ARG)
    this.opcodeMap.set('set_arg', OpcodeValue.OP_SET_ARG)
    
    // Object/Array operations
    this.opcodeMap.set('get_field', OpcodeValue.OP_GET_FIELD)
    this.opcodeMap.set('get_field2', OpcodeValue.OP_GET_FIELD2)
    this.opcodeMap.set('put_field', OpcodeValue.OP_PUT_FIELD)
    this.opcodeMap.set('get_array_el', OpcodeValue.OP_GET_ARRAY_EL)
    this.opcodeMap.set('put_array_el', OpcodeValue.OP_PUT_ARRAY_EL)
    this.opcodeMap.set('define_field', OpcodeValue.OP_DEFINE_FIELD)
    this.opcodeMap.set('define_array_el', OpcodeValue.OP_DEFINE_ARRAY_EL)
    this.opcodeMap.set('append', OpcodeValue.OP_APPEND)
    
    // Control flow
    this.opcodeMap.set('if_false', OpcodeValue.OP_IF_FALSE)
    this.opcodeMap.set('if_true', OpcodeValue.OP_IF_TRUE)
    this.opcodeMap.set('goto', OpcodeValue.OP_GOTO)
    
    // Arithmetic operations
    this.opcodeMap.set('neg', OpcodeValue.OP_NEG)
    this.opcodeMap.set('plus', OpcodeValue.OP_PLUS)
    this.opcodeMap.set('dec', OpcodeValue.OP_DEC)
    this.opcodeMap.set('inc', OpcodeValue.OP_INC)
    this.opcodeMap.set('not', OpcodeValue.OP_NOT)
    this.opcodeMap.set('lnot', OpcodeValue.OP_LNOT)
    this.opcodeMap.set('mul', OpcodeValue.OP_MUL)
    this.opcodeMap.set('div', OpcodeValue.OP_DIV)
    this.opcodeMap.set('mod', OpcodeValue.OP_MOD)
    this.opcodeMap.set('add', OpcodeValue.OP_ADD)
    this.opcodeMap.set('sub', OpcodeValue.OP_SUB)
    this.opcodeMap.set('pow', OpcodeValue.OP_POW)
    this.opcodeMap.set('shl', OpcodeValue.OP_SHL)
    this.opcodeMap.set('sar', OpcodeValue.OP_SAR)
    this.opcodeMap.set('shr', OpcodeValue.OP_SHR)
    
    // Comparison operations
    this.opcodeMap.set('lt', OpcodeValue.OP_LT)
    this.opcodeMap.set('lte', OpcodeValue.OP_LTE)
    this.opcodeMap.set('gt', OpcodeValue.OP_GT)
    this.opcodeMap.set('gte', OpcodeValue.OP_GTE)
    this.opcodeMap.set('eq', OpcodeValue.OP_EQ)
    this.opcodeMap.set('neq', OpcodeValue.OP_NEQ)
    this.opcodeMap.set('strict_eq', OpcodeValue.OP_STRICT_EQ)
    this.opcodeMap.set('strict_neq', OpcodeValue.OP_STRICT_NEQ)
    
    // Logical operations
    this.opcodeMap.set('and', OpcodeValue.OP_AND)
    this.opcodeMap.set('xor', OpcodeValue.OP_XOR)
    this.opcodeMap.set('or', OpcodeValue.OP_OR)
    
    // For loops
    this.opcodeMap.set('for_in_start', OpcodeValue.OP_FOR_IN_START)
    this.opcodeMap.set('for_of_start', OpcodeValue.OP_FOR_OF_START)
    this.opcodeMap.set('for_in_next', OpcodeValue.OP_FOR_IN_NEXT)
    this.opcodeMap.set('for_of_next', OpcodeValue.OP_FOR_OF_NEXT)
    
    // Special opcode
    this.opcodeMap.set('nop', OpcodeValue.OP_NOP)
  }
  
  // 添加 BigInt opcodes
  private addBigIntOpcodes(): void {
    this.opcodeMap.set('push_bigint_i32', OpcodeValue.OP_PUSH_BIGINT_I32)
  }
  
  // 添加 Short opcodes
  private addShortOpcodes(): void {
    // Push small integers
    this.opcodeMap.set('push_minus1', OpcodeValue.OP_PUSH_MINUS1)
    this.opcodeMap.set('push_0', OpcodeValue.OP_PUSH_0)
    this.opcodeMap.set('push_1', OpcodeValue.OP_PUSH_1)
    this.opcodeMap.set('push_2', OpcodeValue.OP_PUSH_2)
    this.opcodeMap.set('push_3', OpcodeValue.OP_PUSH_3)
    this.opcodeMap.set('push_4', OpcodeValue.OP_PUSH_4)
    this.opcodeMap.set('push_5', OpcodeValue.OP_PUSH_5)
    this.opcodeMap.set('push_6', OpcodeValue.OP_PUSH_6)
    this.opcodeMap.set('push_7', OpcodeValue.OP_PUSH_7)
    this.opcodeMap.set('push_i8', OpcodeValue.OP_PUSH_I8)
    this.opcodeMap.set('push_i16', OpcodeValue.OP_PUSH_I16)
    this.opcodeMap.set('push_const8', OpcodeValue.OP_PUSH_CONST8)
    this.opcodeMap.set('fclosure8', OpcodeValue.OP_FCLOSURE8)
    this.opcodeMap.set('push_empty_string', OpcodeValue.OP_PUSH_EMPTY_STRING)
    
    // Short local operations
    this.opcodeMap.set('get_loc8', OpcodeValue.OP_GET_LOC8)
    this.opcodeMap.set('put_loc8', OpcodeValue.OP_PUT_LOC8)
    this.opcodeMap.set('set_loc8', OpcodeValue.OP_SET_LOC8)
    
    // Optimized local access for first 4 locals
    this.opcodeMap.set('get_loc0', OpcodeValue.OP_GET_LOC0)
    this.opcodeMap.set('get_loc1', OpcodeValue.OP_GET_LOC1)
    this.opcodeMap.set('get_loc2', OpcodeValue.OP_GET_LOC2)
    this.opcodeMap.set('get_loc3', OpcodeValue.OP_GET_LOC3)
    this.opcodeMap.set('put_loc0', OpcodeValue.OP_PUT_LOC0)
    this.opcodeMap.set('put_loc1', OpcodeValue.OP_PUT_LOC1)
    this.opcodeMap.set('put_loc2', OpcodeValue.OP_PUT_LOC2)
    this.opcodeMap.set('put_loc3', OpcodeValue.OP_PUT_LOC3)
    this.opcodeMap.set('set_loc0', OpcodeValue.OP_SET_LOC0)
    this.opcodeMap.set('set_loc1', OpcodeValue.OP_SET_LOC1)
    this.opcodeMap.set('set_loc2', OpcodeValue.OP_SET_LOC2)
    this.opcodeMap.set('set_loc3', OpcodeValue.OP_SET_LOC3)
    
    // Short jump operations
    this.opcodeMap.set('if_false8', OpcodeValue.OP_IF_FALSE8)
    this.opcodeMap.set('if_true8', OpcodeValue.OP_IF_TRUE8)
    this.opcodeMap.set('goto8', OpcodeValue.OP_GOTO8)
    this.opcodeMap.set('goto16', OpcodeValue.OP_GOTO16)
    
    // Short call operations
    this.opcodeMap.set('call0', OpcodeValue.OP_CALL0)
    this.opcodeMap.set('call1', OpcodeValue.OP_CALL1)
    this.opcodeMap.set('call2', OpcodeValue.OP_CALL2)
    this.opcodeMap.set('call3', OpcodeValue.OP_CALL3)
    
    // Type checks
    this.opcodeMap.set('is_undefined', OpcodeValue.OP_IS_UNDEFINED)
    this.opcodeMap.set('is_null', OpcodeValue.OP_IS_NULL)
    this.opcodeMap.set('typeof_is_undefined', OpcodeValue.OP_TYPEOF_IS_UNDEFINED)
    this.opcodeMap.set('typeof_is_function', OpcodeValue.OP_TYPEOF_IS_FUNCTION)
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
export function createOpcodeGenerator(config: CompilerFlags): OpcodeGenerator {
  const configManager = ConfigManager.fromCompilerFlags(config)
  return new OpcodeGenerator(configManager)
}