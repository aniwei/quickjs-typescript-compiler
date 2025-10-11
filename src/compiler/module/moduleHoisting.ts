import { JSAtom, type Atom } from '../../atoms'
import type { Instruction } from '../../functionBytecode'
import type { FunctionDef } from '../../functionDef'
import { Opcode, env } from '../../env'
import { getIndexedOpcode } from '../../utils/opcodeVariants'

const JS_PROP_CONFIGURABLE = 1 << 0
const JS_PROP_WRITABLE = 1 << 1
const DEFINE_GLOBAL_LEX_VAR = 1 << 7

export interface ModuleHoistContext {
  func: FunctionDef
  closureVarIndices: Map<Atom, number>
}

export function buildHoistedDefinitionInstructions(context: ModuleHoistContext): Instruction[] {
  const { func, closureVarIndices } = context
  const instructions: Instruction[] = []

  for (let index = 0; index < func.args.length; index++) {
    const arg = func.args[index]
    if (arg.funcPoolIndex >= 0) {
      instructions.push(buildFclosureInstruction(arg.funcPoolIndex))
      instructions.push({ opcode: Opcode.OP_put_arg, operands: [index] })
    }
  }

  const bodyScope = func.bodyScope
  for (let varIndex = 0; varIndex < func.vars.length; varIndex++) {
    const variable = func.vars[varIndex]
    if (variable.funcPoolIndex < 0) {
      continue
    }
    if (bodyScope >= 0 && variable.scopeLevel !== bodyScope) {
      continue
    }
    instructions.push(buildFclosureInstruction(variable.funcPoolIndex))
    if (variable.isCaptured) {
      const closureIndex = closureVarIndices.get(variable.name)
      if (closureIndex === undefined) {
        throw new Error(`Hoisted captured variable missing closure index for ${varIndex}`)
      }
      instructions.push(buildPutClosureInstruction(closureIndex))
    } else {
      if (variable.localSlot < 0) {
        throw new Error(`Hoisted variable missing local slot for index ${varIndex}`)
      }
      instructions.push(buildStoreToLocalInstruction(variable.localSlot))
    }
  }

  instructions.push(...buildGlobalHoistInstructions(func, closureVarIndices))

  return instructions
}

function buildGlobalHoistInstructions(
  func: FunctionDef,
  closureVarIndices: Map<Atom, number>
): Instruction[] {
  if (func.globalVars.length === 0) {
    return []
  }

  const instructions: Instruction[] = []
  const closureIndexByAtom = closureVarIndices

  const varEnvIndex = closureIndexByAtom.get(JSAtom.JS_ATOM__var_)
  const argVarEnvIndex = closureIndexByAtom.get(JSAtom.JS_ATOM__arg_var_)
  const isModule = Boolean(func.module)

  for (const globalVar of func.globalVars) {
    let hasClosure = 0
    let closureIndex: number | undefined
    let envIndex: number | undefined
    let forceInit = globalVar.forceInit

    if (closureIndexByAtom.has(globalVar.name)) {
      hasClosure = 2
      closureIndex = closureIndexByAtom.get(globalVar.name)
      forceInit = false
    } else if (varEnvIndex !== undefined) {
      hasClosure = 1
      envIndex = varEnvIndex
      forceInit = true
    } else if (argVarEnvIndex !== undefined) {
      hasClosure = 1
      envIndex = argVarEnvIndex
      forceInit = true
    }

    if (hasClosure === 1 && envIndex !== undefined) {
      instructions.push(buildGetVarRefInstruction(envIndex))
    }

    let flags = isModule ? JS_PROP_CONFIGURABLE : 0
    if (globalVar.isLexical) {
      flags |= DEFINE_GLOBAL_LEX_VAR
      if (!globalVar.isConst) {
        flags |= JS_PROP_WRITABLE
      }
    }

    if (globalVar.isLexical && hasClosure === 2 && closureIndex !== undefined) {
      continue
    }

    const skipGlobalDefine = hasClosure === 2 && closureIndex !== undefined

    if (!skipGlobalDefine) {
      if (globalVar.funcPoolIndex >= 0 && !globalVar.isLexical) {
        instructions.push(buildFclosureInstruction(globalVar.funcPoolIndex))
        instructions.push({ opcode: Opcode.OP_define_func, operands: [globalVar.name, flags] })
      } else {
        instructions.push({ opcode: Opcode.OP_define_var, operands: [globalVar.name, flags] })
      }
    }

    const needsInit = globalVar.funcPoolIndex >= 0 || forceInit

    if (needsInit) {
      if (globalVar.funcPoolIndex >= 0) {
        instructions.push(buildFclosureInstruction(globalVar.funcPoolIndex))
        if (globalVar.name === JSAtom.JS_ATOM__default_) {
          instructions.push({ opcode: Opcode.OP_set_name, operands: [JSAtom.JS_ATOM_default] })
        }
      } else {
        instructions.push({ opcode: Opcode.OP_undefined, operands: [] })
      }

      if (hasClosure === 2 && closureIndex !== undefined) {
        instructions.push(buildPutClosureInstruction(closureIndex))
      } else if (hasClosure === 1) {
        instructions.push({ opcode: Opcode.OP_define_field, operands: [globalVar.name] })
        instructions.push({ opcode: Opcode.OP_drop, operands: [] })
      } else {
        instructions.push({ opcode: Opcode.OP_put_var, operands: [globalVar.name] })
      }
    }
  }

  return instructions
}

function buildPutClosureInstruction(index: number): Instruction {
  const shortOpcode = getIndexedOpcode('OP_put_var_ref', index)
  if (shortOpcode !== undefined) {
    return { opcode: shortOpcode, operands: [] }
  }
  return { opcode: Opcode.OP_put_var_ref, operands: [index] }
}

function buildGetVarRefInstruction(index: number): Instruction {
  const shortOpcode = getIndexedOpcode('OP_get_var_ref', index)
  if (shortOpcode !== undefined) {
    return { opcode: shortOpcode, operands: [] }
  }
  return { opcode: Opcode.OP_get_var_ref, operands: [index] }
}

function buildFclosureInstruction(constantIndex: number): Instruction {
  if (env.supportsShortOpcodes && constantIndex <= 0xff) {
    return { opcode: Opcode.OP_fclosure8, operands: [constantIndex] }
  }
  return { opcode: Opcode.OP_fclosure, operands: [constantIndex] }
}

function buildStoreToLocalInstruction(slot: number): Instruction {
  const shortOpcode = slot <= 3 ? getIndexedOpcode('OP_put_loc', slot) : undefined
  if (shortOpcode !== undefined) {
    return { opcode: shortOpcode, operands: [] }
  }
  if (env.supportsShortOpcodes && slot <= 0xff) {
    return { opcode: Opcode.OP_put_loc8, operands: [slot] }
  }
  return { opcode: Opcode.OP_put_loc, operands: [slot] }
}
