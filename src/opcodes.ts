/**
 * QuickJS Opcode Definitions
 * Based on third_party/QuickJS/include/QuickJS/quickjs-opcode.h
 * 
 * 根据 QuickJS 编译配置逻辑生成 opcode，不依赖分析 QuickJS 文件
 */

import { OpFormat as OpcodeFormat, OPCODE_DEFS, type OpcodeDefinition } from './env'
// Re-export for existing imports and types
export { OpFormat as OpcodeFormat } from './env'
export type { OpcodeDefinition } from './env'

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
export const OPCODES: Record<string, OpcodeDefinition> = OPCODE_DEFS

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