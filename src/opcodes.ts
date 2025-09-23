/**
 * QuickJS Opcode Definitions
 * Based on third_party/QuickJS/include/QuickJS/quickjs-opcode.h
 * 
 * 根据 QuickJS 编译配置逻辑生成 opcode，不依赖分析 QuickJS 文件
 */

import { OpFormat as OpcodeFormat } from './env'
// Re-export for existing imports
export { OpFormat as OpcodeFormat } from './env'

// Opcode definition structure
export interface OpcodeDefinition {
  id: string
  size: number
  nPop: number
  nPush: number
  format: OpcodeFormat
}

// 编译配置
export interface CompilerFlags {
  bigInt: boolean
  dump: boolean
  shortCode: boolean
  debug: boolean
  strictMode: boolean
  firstAtomId?: number
}

// QuickJS Opcodes - 基于头文件定义
export const OPCODES: Record<string, OpcodeDefinition> = {
  // Invalid opcode
  INVALID: { id: 'invalid', size: 1, nPop: 0, nPush: 0, format: OpcodeFormat.NONE },

  // Push values
  PUSH_I32: { id: 'push_i32', size: 5, nPop: 0, nPush: 1, format: OpcodeFormat.I32 },
  PUSH_CONST: { id: 'push_const', size: 5, nPop: 0, nPush: 1, format: OpcodeFormat.CONST },
  FCLOSURE: { id: 'fclosure', size: 5, nPop: 0, nPush: 1, format: OpcodeFormat.CONST },
  PUSH_ATOM_VALUE: { id: 'push_atom_value', size: 5, nPop: 0, nPush: 1, format: OpcodeFormat.ATOM },
  PRIVATE_SYMBOL: { id: 'private_symbol', size: 5, nPop: 0, nPush: 1, format: OpcodeFormat.ATOM },
  UNDEFINED: { id: 'undefined', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE },
  NULL: { id: 'null', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE },
  PUSH_THIS: { id: 'push_this', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE },
  PUSH_FALSE: { id: 'push_false', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE },
  PUSH_TRUE: { id: 'push_true', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE },
  OBJECT: { id: 'object', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE },
  SPECIAL_OBJECT: { id: 'special_object', size: 2, nPop: 0, nPush: 1, format: OpcodeFormat.U8 },
  REST: { id: 'rest', size: 3, nPop: 0, nPush: 1, format: OpcodeFormat.U16 },

  // Stack operations
  DROP: { id: 'drop', size: 1, nPop: 1, nPush: 0, format: OpcodeFormat.NONE },
  NIP: { id: 'nip', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  NIP1: { id: 'nip1', size: 1, nPop: 3, nPush: 2, format: OpcodeFormat.NONE },
  DUP: { id: 'dup', size: 1, nPop: 1, nPush: 2, format: OpcodeFormat.NONE },
  DUP1: { id: 'dup1', size: 1, nPop: 2, nPush: 3, format: OpcodeFormat.NONE },
  DUP2: { id: 'dup2', size: 1, nPop: 2, nPush: 4, format: OpcodeFormat.NONE },
  DUP3: { id: 'dup3', size: 1, nPop: 3, nPush: 6, format: OpcodeFormat.NONE },
  INSERT2: { id: 'insert2', size: 1, nPop: 2, nPush: 3, format: OpcodeFormat.NONE },
  INSERT3: { id: 'insert3', size: 1, nPop: 3, nPush: 4, format: OpcodeFormat.NONE },
  INSERT4: { id: 'insert4', size: 1, nPop: 4, nPush: 5, format: OpcodeFormat.NONE },
  PERM3: { id: 'perm3', size: 1, nPop: 3, nPush: 3, format: OpcodeFormat.NONE },
  PERM4: { id: 'perm4', size: 1, nPop: 4, nPush: 4, format: OpcodeFormat.NONE },
  PERM5: { id: 'perm5', size: 1, nPop: 5, nPush: 5, format: OpcodeFormat.NONE },
  SWAP: { id: 'swap', size: 1, nPop: 2, nPush: 2, format: OpcodeFormat.NONE },
  SWAP2: { id: 'swap2', size: 1, nPop: 4, nPush: 4, format: OpcodeFormat.NONE },
  ROT3L: { id: 'rot3l', size: 1, nPop: 3, nPush: 3, format: OpcodeFormat.NONE },
  ROT3R: { id: 'rot3r', size: 1, nPop: 3, nPush: 3, format: OpcodeFormat.NONE },
  ROT4L: { id: 'rot4l', size: 1, nPop: 4, nPush: 4, format: OpcodeFormat.NONE },
  ROT5L: { id: 'rot5l', size: 1, nPop: 5, nPush: 5, format: OpcodeFormat.NONE },

  // Function calls
  CALL_CONSTRUCTOR: { id: 'call_constructor', size: 3, nPop: 2, nPush: 1, format: OpcodeFormat.NPOP },
  CALL: { id: 'call', size: 3, nPop: 1, nPush: 1, format: OpcodeFormat.NPOP },
  TAIL_CALL: { id: 'tail_call', size: 3, nPop: 1, nPush: 0, format: OpcodeFormat.NPOP },
  CALL_METHOD: { id: 'call_method', size: 3, nPop: 2, nPush: 1, format: OpcodeFormat.NPOP },
  TAIL_CALL_METHOD: { id: 'tail_call_method', size: 3, nPop: 2, nPush: 0, format: OpcodeFormat.NPOP },
  ARRAY_FROM: { id: 'array_from', size: 3, nPop: 0, nPush: 1, format: OpcodeFormat.NPOP },
  APPLY: { id: 'apply', size: 3, nPop: 3, nPush: 1, format: OpcodeFormat.U16 },
  RETURN: { id: 'return', size: 1, nPop: 1, nPush: 0, format: OpcodeFormat.NONE },
  RETURN_UNDEF: { id: 'return_undef', size: 1, nPop: 0, nPush: 0, format: OpcodeFormat.NONE },

  // Variables
  GET_VAR: { id: 'get_var', size: 5, nPop: 0, nPush: 1, format: OpcodeFormat.ATOM },
  PUT_VAR: { id: 'put_var', size: 5, nPop: 1, nPush: 0, format: OpcodeFormat.ATOM },
  PUT_VAR_INIT: { id: 'put_var_init', size: 5, nPop: 1, nPush: 0, format: OpcodeFormat.ATOM },
  PUT_VAR_STRICT: { id: 'put_var_strict', size: 5, nPop: 2, nPush: 0, format: OpcodeFormat.ATOM },
  
  // Locals
  GET_LOC: { id: 'get_loc', size: 3, nPop: 0, nPush: 1, format: OpcodeFormat.LOC },
  PUT_LOC: { id: 'put_loc', size: 3, nPop: 1, nPush: 0, format: OpcodeFormat.LOC },
  SET_LOC: { id: 'set_loc', size: 3, nPop: 1, nPush: 1, format: OpcodeFormat.LOC },
  
  // Arguments
  GET_ARG: { id: 'get_arg', size: 3, nPop: 0, nPush: 1, format: OpcodeFormat.ARG },
  PUT_ARG: { id: 'put_arg', size: 3, nPop: 1, nPush: 0, format: OpcodeFormat.ARG },
  SET_ARG: { id: 'set_arg', size: 3, nPop: 1, nPush: 1, format: OpcodeFormat.ARG },

  // Object/Array operations
  GET_FIELD: { id: 'get_field', size: 5, nPop: 1, nPush: 1, format: OpcodeFormat.ATOM },
  GET_FIELD2: { id: 'get_field2', size: 5, nPop: 1, nPush: 2, format: OpcodeFormat.ATOM },
  PUT_FIELD: { id: 'put_field', size: 5, nPop: 2, nPush: 0, format: OpcodeFormat.ATOM },
  GET_ARRAY_EL: { id: 'get_array_el', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  PUT_ARRAY_EL: { id: 'put_array_el', size: 1, nPop: 3, nPush: 0, format: OpcodeFormat.NONE },
  DEFINE_FIELD: { id: 'define_field', size: 5, nPop: 2, nPush: 1, format: OpcodeFormat.ATOM },
  DEFINE_ARRAY_EL: { id: 'define_array_el', size: 1, nPop: 3, nPush: 2, format: OpcodeFormat.NONE },
  APPEND: { id: 'append', size: 1, nPop: 3, nPush: 2, format: OpcodeFormat.NONE },

  // Control flow
  IF_FALSE: { id: 'if_false', size: 5, nPop: 1, nPush: 0, format: OpcodeFormat.LABEL },
  IF_TRUE: { id: 'if_true', size: 5, nPop: 1, nPush: 0, format: OpcodeFormat.LABEL },
  GOTO: { id: 'goto', size: 5, nPop: 0, nPush: 0, format: OpcodeFormat.LABEL },
  
  // Arithmetic operations
  NEG: { id: 'neg', size: 1, nPop: 1, nPush: 1, format: OpcodeFormat.NONE },
  PLUS: { id: 'plus', size: 1, nPop: 1, nPush: 1, format: OpcodeFormat.NONE },
  DEC: { id: 'dec', size: 1, nPop: 1, nPush: 1, format: OpcodeFormat.NONE },
  INC: { id: 'inc', size: 1, nPop: 1, nPush: 1, format: OpcodeFormat.NONE },
  NOT: { id: 'not', size: 1, nPop: 1, nPush: 1, format: OpcodeFormat.NONE },
  LNOT: { id: 'lnot', size: 1, nPop: 1, nPush: 1, format: OpcodeFormat.NONE },

  MUL: { id: 'mul', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  DIV: { id: 'div', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  MOD: { id: 'mod', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  ADD: { id: 'add', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  SUB: { id: 'sub', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  POW: { id: 'pow', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  SHL: { id: 'shl', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  SAR: { id: 'sar', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  SHR: { id: 'shr', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },

  // Comparison operations
  LT: { id: 'lt', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  LTE: { id: 'lte', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  GT: { id: 'gt', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  GTE: { id: 'gte', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  EQ: { id: 'eq', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  NEQ: { id: 'neq', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  STRICT_EQ: { id: 'strict_eq', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  STRICT_NEQ: { id: 'strict_neq', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },

  // Logical operations
  AND: { id: 'and', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  XOR: { id: 'xor', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },
  OR: { id: 'or', size: 1, nPop: 2, nPush: 1, format: OpcodeFormat.NONE },

  // For loops
  FOR_IN_START: { id: 'for_in_start', size: 1, nPop: 1, nPush: 1, format: OpcodeFormat.NONE },
  FOR_OF_START: { id: 'for_of_start', size: 1, nPop: 1, nPush: 3, format: OpcodeFormat.NONE },
  FOR_IN_NEXT: { id: 'for_in_next', size: 1, nPop: 1, nPush: 3, format: OpcodeFormat.NONE },
  FOR_OF_NEXT: { id: 'for_of_next', size: 2, nPop: 3, nPush: 5, format: OpcodeFormat.U8 },

  // BigInt support (根据 bigInt 配置)
  PUSH_BIGINT_I32: { id: 'push_bigint_i32', size: 5, nPop: 0, nPush: 1, format: OpcodeFormat.I32 },

  // Special opcode
  NOP: { id: 'nop', size: 1, nPop: 0, nPush: 0, format: OpcodeFormat.NONE }
}

// 根据编译配置生成 short opcodes
export function getShortOpcodes(config: CompilerFlags): Record<string, OpcodeDefinition> {
  if (!config.shortCode) {
    return {}
  }

  return {
    // Push small integers
    PUSH_MINUS1: { id: 'push_minus1', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE_INT },
    PUSH_0: { id: 'push_0', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE_INT },
    PUSH_1: { id: 'push_1', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE_INT },
    PUSH_2: { id: 'push_2', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE_INT },
    PUSH_3: { id: 'push_3', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE_INT },
    PUSH_4: { id: 'push_4', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE_INT },
    PUSH_5: { id: 'push_5', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE_INT },
    PUSH_6: { id: 'push_6', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE_INT },
    PUSH_7: { id: 'push_7', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE_INT },
    PUSH_I8: { id: 'push_i8', size: 2, nPop: 0, nPush: 1, format: OpcodeFormat.I8 },
    PUSH_I16: { id: 'push_i16', size: 3, nPop: 0, nPush: 1, format: OpcodeFormat.I16 },
    PUSH_CONST8: { id: 'push_const8', size: 2, nPop: 0, nPush: 1, format: OpcodeFormat.CONST8 },
    PUSH_EMPTY_STRING: { id: 'push_empty_string', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE },

    // Short local operations
    GET_LOC8: { id: 'get_loc8', size: 2, nPop: 0, nPush: 1, format: OpcodeFormat.LOC8 },
    PUT_LOC8: { id: 'put_loc8', size: 2, nPop: 1, nPush: 0, format: OpcodeFormat.LOC8 },
    SET_LOC8: { id: 'set_loc8', size: 2, nPop: 1, nPush: 1, format: OpcodeFormat.LOC8 },

    // Optimized local access for first 4 locals
    GET_LOC0: { id: 'get_loc0', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE_LOC },
    GET_LOC1: { id: 'get_loc1', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE_LOC },
    GET_LOC2: { id: 'get_loc2', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE_LOC },
    GET_LOC3: { id: 'get_loc3', size: 1, nPop: 0, nPush: 1, format: OpcodeFormat.NONE_LOC },
    PUT_LOC0: { id: 'put_loc0', size: 1, nPop: 1, nPush: 0, format: OpcodeFormat.NONE_LOC },
    PUT_LOC1: { id: 'put_loc1', size: 1, nPop: 1, nPush: 0, format: OpcodeFormat.NONE_LOC },
    PUT_LOC2: { id: 'put_loc2', size: 1, nPop: 1, nPush: 0, format: OpcodeFormat.NONE_LOC },
    PUT_LOC3: { id: 'put_loc3', size: 1, nPop: 1, nPush: 0, format: OpcodeFormat.NONE_LOC },

    // Short jump operations
    IF_FALSE8: { id: 'if_false8', size: 2, nPop: 1, nPush: 0, format: OpcodeFormat.LABEL8 },
    IF_TRUE8: { id: 'if_true8', size: 2, nPop: 1, nPush: 0, format: OpcodeFormat.LABEL8 },
    GOTO8: { id: 'goto8', size: 2, nPop: 0, nPush: 0, format: OpcodeFormat.LABEL8 },
    GOTO16: { id: 'goto16', size: 3, nPop: 0, nPush: 0, format: OpcodeFormat.LABEL16 },

    // Short call operations
    CALL0: { id: 'call0', size: 1, nPop: 1, nPush: 1, format: OpcodeFormat.NPOPX },
    CALL1: { id: 'call1', size: 1, nPop: 1, nPush: 1, format: OpcodeFormat.NPOPX },
    CALL2: { id: 'call2', size: 1, nPop: 1, nPush: 1, format: OpcodeFormat.NPOPX },
    CALL3: { id: 'call3', size: 1, nPop: 1, nPush: 1, format: OpcodeFormat.NPOPX },

    // Type checks
    IS_UNDEFINED: { id: 'is_undefined', size: 1, nPop: 1, nPush: 1, format: OpcodeFormat.NONE },
    IS_NULL: { id: 'is_null', size: 1, nPop: 1, nPush: 1, format: OpcodeFormat.NONE },
    TYPEOF_IS_UNDEFINED: { id: 'typeof_is_undefined', size: 1, nPop: 1, nPush: 1, format: OpcodeFormat.NONE },
    TYPEOF_IS_FUNCTION: { id: 'typeof_is_function', size: 1, nPop: 1, nPush: 1, format: OpcodeFormat.NONE }
  }
}

// 根据配置获取完整的 opcode 集合
export function getAllOpcodes(config: CompilerFlags): Record<string, OpcodeDefinition> {
  const opcodes = { ...OPCODES }
  
  if (config.shortCode) {
    Object.assign(opcodes, getShortOpcodes(config))
  }
  
  return opcodes
}