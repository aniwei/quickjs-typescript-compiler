import { FunctionDef, JSVarDef, JSClosureVar, LineNumberSlot } from './FunctionDef'
import { Opcode, env, BytecodeTag, JSAtom, PC2Line, OPCODE_DEFS } from '../env'
import { BytecodeBuilder } from './BytecodeBuilder'
import ts from 'typescript'

export class Compiler {
  atoms: string[] = []
  atomMap: Map<string, number> = new Map()
  firstAtomId: number = env.firstAtomId
  sourceFile: ts.SourceFile | null = null

  constructor(options?: { firstAtomId?: number }) {
    if (options?.firstAtomId) {
      this.firstAtomId = options.firstAtomId
    }
  }

  setSourceFile(sourceFile: ts.SourceFile) {
    this.sourceFile = sourceFile
  }

  addPc2LineInfo(fd: FunctionDef, pc: number, sourcePos: number) {
    const slot = new LineNumberSlot()
    slot.pc = pc
    slot.sourcePos = sourcePos
    fd.lineNumberSlots.push(slot)
    fd.lineNumberCount++
  }

  computePc2LineInfo(fd: FunctionDef) {
    if (!this.sourceFile) return

    let lastLineNum = 0
    let lastColNum = 0
    let lastPc = 0
    
    // Initial line/col from sourcePos of function
    if (fd.sourcePos >= 0) {
      const pos = ts.getLineAndCharacterOfPosition(this.sourceFile, fd.sourcePos)
      lastLineNum = pos.line
      lastColNum = pos.character
    }

    fd.pc2line.putULEB128(lastLineNum)
    fd.pc2line.putULEB128(lastColNum)

    for (const slot of fd.lineNumberSlots) {
      const pc = slot.pc
      const sourcePos = slot.sourcePos
      
      if (sourcePos === -1) continue
      
      const diffPc = pc - lastPc
      if (diffPc < 0) continue
      
        const pos = ts.getLineAndCharacterOfPosition(this.sourceFile, sourcePos)
        const lineNum = pos.line
        const colNum = pos.character
        
        const diffLine = lineNum - lastLineNum
        const diffCol = colNum - lastColNum
        
        if (diffLine === 0 && diffCol === 0) continue
        
        if (diffLine >= PC2Line.PC2LINE_BASE && 
        diffLine < PC2Line.PC2LINE_BASE + PC2Line.PC2LINE_RANGE &&
        diffPc <= PC2Line.PC2LINE_DIFF_PC_MAX) {
        
        const op = (diffLine - PC2Line.PC2LINE_BASE) + 
                    (diffPc * PC2Line.PC2LINE_RANGE) + 
                    PC2Line.PC2LINE_OP_FIRST
        fd.pc2line.putByte(op)
        fd.pc2line.putULEB128((diffCol << 1) ^ (diffCol >> 31))
      } else {
        fd.pc2line.putByte(0)
        fd.pc2line.putULEB128(diffPc)
        fd.pc2line.putULEB128((diffLine << 1) ^ (diffLine >> 31))
        fd.pc2line.putULEB128((diffCol << 1) ^ (diffCol >> 31))
      }
      
      lastPc = pc
      lastLineNum = lineNum
      lastColNum = colNum
    }
  }

  addAtom(s: string): number {
    // Check built-in atoms
    const builtInName = 'JS_ATOM_' + s
    // @ts-ignore
    if (JSAtom[builtInName]) {
        // @ts-ignore
        return JSAtom[builtInName]
    }

    if (this.atomMap.has(s)) {
      return this.atomMap.get(s)! + this.firstAtomId
    }
    const idx = this.atoms.length
    this.atoms.push(s)
    this.atomMap.set(s, idx)
    return idx + this.firstAtomId
  }

  addVar(fd: FunctionDef, name: string, isConst: boolean = false, isLexical: boolean = false, scopeLevel: number = 0): number {
    const atom = this.addAtom(name)
    return this.addVarWithAtom(fd, atom, isConst, isLexical, scopeLevel)
  }

  addVarWithAtom(fd: FunctionDef, atom: number, isConst: boolean = false, isLexical: boolean = false, scopeLevel: number = 0): number {
    const idx = fd.vars.length
    const v = new JSVarDef()
    v.varName = atom
    v.scopeLevel = scopeLevel
    v.scopeNext = -1
    v.isConst = isConst
    v.isLexical = isLexical
    fd.vars.push(v)
    fd.varCount++
    return idx
  }

  addArg(fd: FunctionDef, name: string): number {
    const atom = this.addAtom(name)
    const idx = fd.args.length
    const v = new JSVarDef()
    v.varName = atom
    v.scopeNext = 0 // Default to 0 (matches WASM for non-last args?)
    fd.args.push(v)
    fd.argCount++
    fd.definedArgCount++
    return idx
  }

  addClosureVar(fd: FunctionDef, name: string, isLocal: boolean, isArg: boolean, varIdx: number, varKind: number, isConst: boolean, isLexical: boolean): number {
    const atom = this.addAtom(name)
    const idx = fd.closureVar.length
    const cv = new JSClosureVar()
    cv.varName = atom
    cv.isLocal = isLocal
    cv.isArg = isArg
    cv.varIdx = varIdx
    cv.varKind = varKind
    cv.isConst = isConst
    cv.isLexical = isLexical
    fd.closureVar.push(cv)
    fd.closureVarCount++
    return idx
  }

  findVar(fd: FunctionDef, name: string): { idx: number, isArg: boolean } | null {
    const atomIdx = this.atomMap.get(name)
    if (atomIdx === undefined) return null
    const atomId = atomIdx + this.firstAtomId
    
    for (let i = 0; i < fd.args.length; i++) {
      if (fd.args[i].varName === atomId) {
        return { idx: i, isArg: true }
      }
    }
    
    for (let i = 0; i < fd.vars.length; i++) {
      if (fd.vars[i].varName === atomId) {
        return { idx: i, isArg: false }
      }
    }
    
    return null
  }

  addChild(parent: FunctionDef, child: FunctionDef): number {
    const idx = parent.cpool.length
    parent.cpool.push(child)
    parent.cpoolCount++
    return idx
  }

  addConst(fd: FunctionDef, val: any): number {
    // Check if already exists
    for (let i = 0; i < fd.cpool.length; i++) {
      if (fd.cpool[i] === val) return i
    }
    const idx = fd.cpool.length
    fd.cpool.push(val)
    fd.cpoolCount++
    return idx
  }

  emitOp(s: FunctionDef, val: number, sourcePos: number = -1): void {
    if (sourcePos !== -1) {
        this.addPc2LineInfo(s, s.byteCode.size, sourcePos)
    }
    s.byteCode.putByte(val)

    // Update stack level
    const opName = Opcode[val]
    const opInfo = OPCODE_DEFS[opName]
    if (opInfo) {
        // console.log(`[Stack] ${opName} (${val}): ${s.stackLevel} -> ${s.stackLevel - opInfo.nPop + opInfo.nPush} (Pop: ${opInfo.nPop}, Push: ${opInfo.nPush})`)
        // Pop
        s.stackLevel -= opInfo.nPop
        if (s.stackLevel < 0) {
            // console.warn(`Stack underflow at op ${opInfo.id}`)
            // s.stackLevel = 0
        }
        
        // Push
        s.stackLevel += opInfo.nPush
        if (s.stackLevel > s.stackSizeMax) {
            s.stackSizeMax = s.stackLevel
        }
    } else {
        console.warn(`Unknown opcode for stack calc: ${val}`)
    }
  }

  emitU8(s: FunctionDef, val: number): void {
    s.byteCode.putByte(val)
  }

  emitU16(s: FunctionDef, val: number): void {
    s.byteCode.putU16(val)
  }

  emitU32(s: FunctionDef, val: number): void {
    s.byteCode.putU32(val)
  }

  emitPushConst(s: FunctionDef, val: any): void {
    // TODO: Implement full constant pushing logic (integers, floats, strings, etc.)
    // For now, just handle simple cases or throw
    if (val === null) {
      this.emitOp(s, Opcode.OP_null)
    } else if (val === undefined) {
      this.emitOp(s, Opcode.OP_undefined)
    } else if (val === false) {
      this.emitOp(s, Opcode.OP_push_false)
    } else if (val === true) {
      this.emitOp(s, Opcode.OP_push_true)
    } else {
      throw new Error('Unsupported constant type in emitPushConst')
    }
  }

  emitAtomOp(s: FunctionDef, val: number, atom: number, sourcePos: number = -1): void {
    this.emitOp(s, val, sourcePos)
    s.byteCode.putU32(atom)
  }

  emitReturn(s: FunctionDef, hasVal: boolean): void {
    if (hasVal) {
      this.emitOp(s, Opcode.OP_return)
    } else {
      this.emitOp(s, Opcode.OP_return_undef)
    }
  }

  putAtom(out: BytecodeBuilder, atomId: number): void {
    // QuickJS serialization logic:
    // If atom < JS_ATOM_END (228), use atomId directly.
    // If atom >= JS_ATOM_END, map to index in serialized table + 228.
    // Finally, shift left by 1 (bit 0 is for tagged ints).
    
    let v: number
    if (atomId < env.firstAtomId) {
      v = atomId
    } else {
      const idx = atomId - this.firstAtomId
      v = env.firstAtomId + idx
    }
    out.putULEB128(v << 1)
  }

  writeOutput(fd: FunctionDef): Uint8Array {
    const out = new BytecodeBuilder()
    out.putByte(env.bytecodeVersion)

    // Write atom table
    out.putULEB128(this.atoms.length)
    for (const atom of this.atoms) {
      // Simplified string writing (ASCII only for now)
      const len = atom.length
      out.putULEB128(len << 1)
      for (let i = 0; i < len; i++) {
        out.putByte(atom.charCodeAt(i))
      }
    }

    this.writeFunctionBytecode(out, fd)
    return out.data()
  }

  writeFunctionBytecode(out: BytecodeBuilder, fd: FunctionDef) {
    out.putByte(BytecodeTag.TC_TAG_FUNCTION_BYTECODE)
    
    let flags = 0
    let idx = 0
    const setFlag = (val: boolean | number, n: number) => {
      if (typeof val === 'boolean') {
        if (val) flags |= (1 << idx)
      } else {
        flags |= (val << idx)
      }
      idx += n
    }

    setFlag(fd.hasPrototype, 1)
    setFlag(fd.hasSimpleParameterList, 1)
    setFlag(fd.isDerivedClassConstructor, 1)
    setFlag(fd.needHomeObject, 1)
    setFlag(fd.funcKind, 2)
    setFlag(fd.newTargetAllowed, 1)
    setFlag(fd.superCallAllowed, 1)
    setFlag(fd.superAllowed, 1)
    setFlag(fd.argumentsAllowed, 1)
    setFlag(fd.hasDebug, 1)
    setFlag(fd.isDirectOrIndirectEval, 1)

    out.putU16(flags)
    out.putByte(fd.jsMode)
    this.putAtom(out, fd.funcName)
    out.putULEB128(fd.argCount)
    out.putULEB128(fd.varCount)
    out.putULEB128(fd.definedArgCount)
    out.putULEB128(fd.stackSize)
    out.putULEB128(fd.closureVarCount)
    out.putULEB128(fd.cpoolCount)
    out.putULEB128(fd.byteCode.size)

    // Locals (arg_count + var_count)
    out.putULEB128(fd.argCount + fd.varCount)
    
    for (const arg of fd.args) {
      this.putAtom(out, arg.varName)
      out.putULEB128(arg.scopeLevel)
      out.putULEB128(arg.scopeNext + 1)
      
      let flags = 0
      let idx = 0
      const setLocalFlag = (val: boolean | number, n: number) => {
        if (typeof val === 'boolean') {
          if (val) flags |= (1 << idx)
        } else {
          flags |= (val << idx)
        }
        idx += n
      }
      
      setLocalFlag(arg.varKind, 4)
      setLocalFlag(arg.isConst, 1)
      setLocalFlag(arg.isLexical, 1)
      setLocalFlag(arg.isCaptured, 1)
      out.putByte(flags)
    }
    
    for (const v of fd.vars) {
      this.putAtom(out, v.varName)
      out.putULEB128(v.scopeLevel)
      out.putULEB128(v.scopeNext + 1)
      
      let flags = 0
      let idx = 0
      const setLocalFlag = (val: boolean | number, n: number) => {
        if (typeof val === 'boolean') {
          if (val) flags |= (1 << idx)
        } else {
          flags |= (val << idx)
        }
        idx += n
      }
      
      setLocalFlag(v.varKind, 4)
      setLocalFlag(v.isConst, 1)
      setLocalFlag(v.isLexical, 1)
      setLocalFlag(v.isCaptured, 1)
      out.putByte(flags)
    }

    // Closure vars
    // out.putULEB128(fd.closureVarCount) // Already written in header
    for (const cv of fd.closureVar) {
      this.putAtom(out, cv.varName)
      out.putULEB128(cv.varIdx)
      let flags = 0
      if (cv.isLocal) flags |= 1
      if (cv.isArg) flags |= 2
      if (cv.isConst) flags |= 4
      if (cv.isLexical) flags |= 8
      flags |= (cv.varKind << 4)
      out.putByte(flags)
    }

    out.put(fd.byteCode.data())

    // debug_info
    if (fd.hasDebug) {
      this.putAtom(out, fd.filename)
      out.putULEB128(fd.pc2line.size)
      out.put(fd.pc2line.data())
      out.putULEB128(fd.sourceLen)
      // out.put(fd.source) // TODO: Write source if present
    }

    // CPool
    for (const item of fd.cpool) {
      this.writeObjectRec(out, item)
    }
  }

  writeObjectRec(out: BytecodeBuilder, item: any): void {
    if (item instanceof FunctionDef) {
      this.writeFunctionBytecode(out, item)
    } else if (typeof item === 'number') {
      // Handle float64
      out.putByte(BytecodeTag.TC_TAG_FLOAT64)
      const buf = new ArrayBuffer(8)
      const view = new DataView(buf)
      view.setFloat64(0, item, true) // Little endian
      const u8 = new Uint8Array(buf)
      for(let i=0; i<8; i++) out.putByte(u8[i])
    } else {
      // TODO: Support other CPool types
      throw new Error('Unsupported CPool item type: ' + typeof item)
    }
  }

  writeModule(fd: FunctionDef, moduleNameAtom: number): Uint8Array {
    const out = new BytecodeBuilder()
    out.putByte(env.bytecodeVersion)

    // Write atom table
    out.putULEB128(this.atoms.length)
    for (const atom of this.atoms) {
      const len = atom.length
      out.putULEB128(len << 1)
      for (let i = 0; i < len; i++) {
        out.putByte(atom.charCodeAt(i))
      }
    }

    // Write module structure
    out.putByte(BytecodeTag.TC_TAG_MODULE)
    this.putAtom(out, moduleNameAtom)
    
    // Dependencies (none for now)
    out.putULEB128(0) 
    
    // Exports (none for now)
    out.putULEB128(0)
    
    // Star exports (none for now)
    out.putULEB128(0)

    // Import entries (none for now)
    out.putULEB128(0)

    // has_tla (false)
    out.putByte(0)

    // Module init function
    this.writeFunctionBytecode(out, fd)

    return out.data()
  }
}
