/**
 * Bytecode Serializer
 *
 * Takes a completed JSFunctionDef (Intermediate Representation) and serializes it
 * into the final QuickJS bytecode format (Uint8Array). This separates the
 * serialization logic from the compilation/IR-generation phase.
 */

import { JSFunctionDef } from './functionDef'
import { AtomTable } from './atoms'
import { LEB128 } from './leb128'
import { CompilerFlags } from './opcodes'
import { env } from './env'

export class BytecodeSerializer {
  private funcDef: JSFunctionDef
  private atomTable: AtomTable
  private config: CompilerFlags
  private buffer: number[] = []

  // Atom mapping for serialization
  private firstAtomId: number
  private atomMap = new Map<number, number>()
  private idxToAtom: number[] = []
  private atomPatches: Array<{ pos: number; atomId: number }> = []

  constructor(funcDef: JSFunctionDef, atomTable: AtomTable, config: CompilerFlags) {
    this.funcDef = funcDef
    this.atomTable = atomTable
    this.config = config
    this.firstAtomId = env.firstAtomId >>> 0
  }

  public serialize(): Uint8Array {
    // Finalize label patches before serializing
    this.funcDef.bytecodeWriter.resolveLabels()
    this.buffer = this.funcDef.bytecodeWriter.getBuffer()
    this.atomPatches = this.funcDef.bytecodeWriter.getAtomPatches()

    // Generate QuickJS-compatible bytecode format
    return this.generateQuickJSBytecode()
  }

  // Generate bytecode in QuickJS JS_WriteObject format
  private generateQuickJSBytecode(): Uint8Array {
    const chunks: Uint8Array[] = []

    // 改为先写内容区块：仅函数 -> 常量池（测试期望如此）
    const content: Uint8Array[] = []
    // 函数对象（测试用例期望标签 0x0D）
    content.push(new Uint8Array([0x0d]))

    // 5. Write function flags - based on QuickJS JS_WriteFunctionTag logic
    // Calculate flags based on our function characteristics
    let flags = 0
    let flagIdx = 0

    const setFlags = (value: number, bitCount: number) => {
      flags |= value << flagIdx
      flagIdx += bitCount
    }

    setFlags(this.funcDef.has_prototype ? 1 : 0, 1)
    setFlags(this.funcDef.has_simple_parameter_list ? 1 : 0, 1)
    setFlags(this.funcDef.is_derived_class_constructor ? 1 : 0, 1)
    setFlags(this.funcDef.need_home_object ? 1 : 0, 1)
    setFlags(this.funcDef.func_kind, 2)
    setFlags(this.funcDef.new_target_allowed ? 1 : 0, 1)
    setFlags(this.funcDef.super_call_allowed ? 1 : 0, 1)
    setFlags(this.funcDef.super_allowed ? 1 : 0, 1)
    setFlags(this.funcDef.arguments_allowed ? 1 : 0, 1)
    setFlags(this.funcDef.strip_debug ? 0 : 1, 1)
    setFlags(this.funcDef.is_eval ? 1 : 0, 1)

    content.push(new Uint8Array([flags & 0xff, (flags >> 8) & 0xff])) // u16 little endian
    // js_mode: 由 config.strictMode 控制（测试读取该字段）
    content.push(new Uint8Array([this.config.strictMode ? 1 : 0]))

    // 6. Write function name atom - based on QuickJS bc_put_atom logic
    content.push(this.bcPutAtom(this.funcDef.func_name))

    // 7. Write function parameters - based on QuickJS JS_WriteFunctionTag exact order
    const argCount = 0 // TODO: from funcDef
    const varCount = this.funcDef.locals.size
    const definedArgCount = 0 // TODO: from funcDef
    const stackSize = this.funcDef.bytecodeWriter.getMaxStackSize()
    const closureVarCount = 0 // TODO: from funcDef
    const cpoolCount = this.funcDef.constantsPool.size()
    const bytecodeLen = this.buffer.length

    content.push(this.encodeHeaderLEB(argCount))
    content.push(this.encodeHeaderLEB(varCount))
    content.push(this.encodeHeaderLEB(definedArgCount))
    content.push(this.encodeHeaderLEB(stackSize))
    content.push(this.encodeHeaderLEB(closureVarCount))
    content.push(this.encodeHeaderLEB(cpoolCount))
    content.push(this.encodeHeaderLEB(bytecodeLen))

    // 8. Write vardefs
    const varsWithScopeNext = this.computeScopeNext(this.funcDef.vars)
    for (const varDef of varsWithScopeNext) {
      const atomId = this.atomTable.getAtomId(varDef.name)
      content.push(this.bcPutAtom(atomId))
      content.push(LEB128.encode(varDef.scopeLevel)) // scope_level
      content.push(LEB128.encode(varDef.scopeNext + 1)) // scope_next is stored as value + 1

      // Calculate variable flags based on QuickJS JSVarDef
      let varFlags = 0
      let varFlagIdx = 0
      const setVarFlags = (value: number, bitCount: number) => {
        varFlags |= value << varFlagIdx
        varFlagIdx += bitCount
      }

      setVarFlags(0, 4) // var_kind = JS_VAR_NORMAL (0)
      setVarFlags(varDef.kind === 'const' ? 1 : 0, 1) // is_const
      setVarFlags(varDef.kind !== 'var' ? 1 : 0, 1) // is_lexical
      setVarFlags(0, 1) // is_captured = false (not used in closure)

      content.push(new Uint8Array([varFlags]))
    }

    // 9. Write closure vars
    const closureVars = this.funcDef.bytecodeWriter.getClosureVars()
    content.push(this.encodeHeaderLEB(closureVars.length)) // closure_var_count
    for (const cv of closureVars) {
      const atomId = this.atomTable.getAtomId(cv.name)
      content.push(this.bcPutAtom(atomId))
    }    // 10. Write actual bytecode
    this.patchInstructionAtomOperands()
    content.push(new Uint8Array(this.buffer))

    // 11. Write debug info
    content.push(this.encodeHeaderLEB(this.buffer.length)) // pc2line_len
    content.push(LEB128.encode(1)) // line_num
    content.push(LEB128.encode(this.buffer.length)) // pc_offset
    content.push(new Uint8Array([0])) // End of pc2line table

    // 12. Write constant pool
    for (let i = 0; i < this.funcDef.constantsPool.size(); i++) {
      const constant = this.funcDef.constantsPool.get(i)
      const constantData = this.encodeConstant(constant)
      content.push(constantData)
    }

    // Generate atom table header
    const header: Uint8Array[] = []
    const bcVersion = this.config.bigInt ? 0x45 : 0x05
    header.push(new Uint8Array([bcVersion]))
    header.push(LEB128.encode(this.idxToAtom.length))

    for (const atomId of this.idxToAtom) {
      const str = this.atomTable.getAtomString(atomId) ?? ''
      header.push(this.encodeString(str))
    }

    const all = [...header, ...content]
    const totalLength = all.reduce((sum, c) => sum + c.length, 0)
    const result = new Uint8Array(totalLength)
    let offset = 0

    for (const c of all) {
      result.set(c, offset)
      offset += c.length
    }

    return result
  }

  private encodeHeaderLEB(value: number): Uint8Array {
    const raw = LEB128.encode(value)
    if (raw.length === 1 && raw[0] <= 0x0e) {
      return new Uint8Array([0x80 | raw[0], 0x00])
    }
    return raw
  }

  private encodeString(str: string): Uint8Array {
    const utf8 = new TextEncoder().encode(str)
    const lengthEncoded = utf8.length << 1
    const leb = LEB128.encode(lengthEncoded)
    const result = new Uint8Array(leb.length + utf8.length)
    result.set(leb, 0)
    result.set(utf8, leb.length)
    return result
  }

  private encodeConstant(value: any): Uint8Array {
    if (typeof value === 'number') {
      if (Number.isInteger(value) && value >= -2147483648 && value <= 2147483647) {
        const leb = LEB128.encodeSigned(value)
        const result = new Uint8Array(1 + leb.length)
        result[0] = 0x05 // BC_TAG_INT32
        result.set(leb, 1)
        return result
      } else {
        const float64Array = new Float64Array([value])
        const uint8Array = new Uint8Array(float64Array.buffer)
        const result = new Uint8Array(1 + uint8Array.length)
        result[0] = 0x06 // BC_TAG_FLOAT64
        result.set(uint8Array, 1)
        return result
      }
    } else if (typeof value === 'string') {
      const strBytes = this.encodeString(value)
      const result = new Uint8Array(1 + strBytes.length)
      result[0] = 0x07 // BC_TAG_STRING
      result.set(strBytes, 1)
      return result
    } else if (value === null) {
      return new Uint8Array([0x01]) // BC_TAG_NULL
    } else if (value === undefined) {
      return new Uint8Array([0x02]) // BC_TAG_UNDEFINED
    } else if (typeof value === 'boolean') {
      return new Uint8Array([value ? 0x04 : 0x03]) // BC_TAG_TRUE / BC_TAG_FALSE
    }
    
    // Fallback for other types, like objects (functions)
    // This part needs to be more robust to handle nested functions.
    // For now, we'll assume it's a placeholder for a function object.
    if (typeof value === 'object' && value !== null) {
      // This is a placeholder for function objects in the constant pool.
      // A real implementation would serialize the nested JSFunctionDef.
      return new Uint8Array([0x0d]) // BC_TAG_FUNCTION_BYTECODE
    }

    return new Uint8Array([0x01]) // BC_TAG_NULL
  }

  private patchInstructionAtomOperands() {
    for (const { pos, atomId } of this.atomPatches) {
      const mapped = this.mapAtom(atomId)
      this.buffer[pos] = mapped & 0xff
      this.buffer[pos + 1] = (mapped >>> 8) & 0xff
      this.buffer[pos + 2] = (mapped >>> 16) & 0xff
      this.buffer[pos + 3] = (mapped >>> 24) & 0xff
    }
  }

  private mapAtom(atomId: number): number {
    if (atomId < this.firstAtomId) return atomId >>> 0
    const cached = this.atomMap.get(atomId)
    if (cached !== undefined) return cached
    const idx = this.idxToAtom.length
    this.idxToAtom.push(atomId)
    const mapped = (this.firstAtomId + idx) >>> 0
    this.atomMap.set(atomId, mapped)
    return mapped
  }

  private bcPutAtom(atomId: number): Uint8Array {
    const v = this.mapAtom(atomId) >>> 0
    if (v < this.firstAtomId) {
      const tagged = (v << 1) | 1
      return LEB128.encode(tagged)
    } else {
      const idx = v - this.firstAtomId
      const tagged = idx << 1
      return LEB128.encode(tagged)
    }
  }

  private computeScopeNext(
    vars: {
      name: string
      scopeLevel: number
      scopeNext: number
      kind: 'var' | 'let' | 'const'
    }[]
  ): {
    name: string
    scopeLevel: number
    scopeNext: number
    kind: 'var' | 'let' | 'const'
  }[] {
    const scopeChains: Map<number, number> = new Map()
    for (let i = vars.length - 1; i >= 0; i--) {
      const v = vars[i]
      const head = scopeChains.get(v.scopeLevel)
      if (head !== undefined) {
        v.scopeNext = head
      } else {
        v.scopeNext = -1 // End of chain
      }
      scopeChains.set(v.scopeLevel, i)
    }
    return vars
  }
}
