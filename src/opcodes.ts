/**
 * QuickJS Opcode Definitions
 * Based on third_party/QuickJS/include/QuickJS/quickjs-opcode.h
 * 
 * 根据 QuickJS 编译配置逻辑生成 opcode，不依赖分析 QuickJS 文件
 */

import { OpFormat as OpcodeFormat, OPCODE_DEFS, SHORT_OPCODE_DEFS, type OpcodeDefinition, env as QJSEnv, Opcode } from './env'
// Re-export for existing imports and types
export { OpFormat as OpcodeFormat, Opcode } from './env'
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
  if (!QJSEnv.supportsShortOpcodes) return {}
  if (!config.shortCode) return {}
  return SHORT_OPCODE_DEFS
}

// 根据配置获取完整的 opcode 集合
export function getAllOpcodes(config: CompilerFlags): Record<string, OpcodeDefinition> {
  const opcodes = { ...OPCODES }
  
  if (config.shortCode) {
    Object.assign(opcodes, getShortOpcodes(config))
  }
  
  return opcodes
}