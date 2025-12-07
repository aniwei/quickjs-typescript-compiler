import { FunctionDef, JSVarDef, JSClosureVar, LineNumberSlot } from './FunctionDef'
import { Opcode, env, BytecodeTag, JSAtom, PC2Line, OPCODE_DEFS } from '../env'
import { BytecodeBuilder } from './BytecodeBuilder'
import { AtomReorderer } from './AtomReorderer'
import ts from 'typescript'

export class Label {
  addr: number = -1
  jumps: { fd: FunctionDef, pos: number, size: number }[] = []
}

export class Compiler {
  atoms: string[] = []
  atomMap: Map<string, number> = new Map()
  firstAtomId: number = env.firstAtomId
  sourceFile: ts.SourceFile | null = null

  constructor(options?: { firstAtomId?: number }) {
    if (options?.firstAtomId) {
      this.firstAtomId = options.firstAtomId
    }
    this.initBuiltinAtoms()
  }

  initBuiltinAtoms() {
    this.atomMap.set('null', JSAtom.JS_ATOM_null)
    this.atomMap.set('false', JSAtom.JS_ATOM_false)
    this.atomMap.set('true', JSAtom.JS_ATOM_true)
    this.atomMap.set('if', JSAtom.JS_ATOM_if)
    this.atomMap.set('else', JSAtom.JS_ATOM_else)
    this.atomMap.set('return', JSAtom.JS_ATOM_return)
    this.atomMap.set('var', JSAtom.JS_ATOM_var)
    this.atomMap.set('this', JSAtom.JS_ATOM_this)
    this.atomMap.set('delete', JSAtom.JS_ATOM_delete)
    this.atomMap.set('void', JSAtom.JS_ATOM_void)
    this.atomMap.set('typeof', JSAtom.JS_ATOM_typeof)
    this.atomMap.set('new', JSAtom.JS_ATOM_new)
    this.atomMap.set('in', JSAtom.JS_ATOM_in)
    this.atomMap.set('instanceof', JSAtom.JS_ATOM_instanceof)
    this.atomMap.set('do', JSAtom.JS_ATOM_do)
    this.atomMap.set('while', JSAtom.JS_ATOM_while)
    this.atomMap.set('for', JSAtom.JS_ATOM_for)
    this.atomMap.set('break', JSAtom.JS_ATOM_break)
    this.atomMap.set('continue', JSAtom.JS_ATOM_continue)
    this.atomMap.set('switch', JSAtom.JS_ATOM_switch)
    this.atomMap.set('case', JSAtom.JS_ATOM_case)
    this.atomMap.set('default', JSAtom.JS_ATOM_default)
    this.atomMap.set('throw', JSAtom.JS_ATOM_throw)
    this.atomMap.set('try', JSAtom.JS_ATOM_try)
    this.atomMap.set('catch', JSAtom.JS_ATOM_catch)
    this.atomMap.set('finally', JSAtom.JS_ATOM_finally)
    this.atomMap.set('function', JSAtom.JS_ATOM_function)
    this.atomMap.set('debugger', JSAtom.JS_ATOM_debugger)
    this.atomMap.set('with', JSAtom.JS_ATOM_with)
    this.atomMap.set('class', JSAtom.JS_ATOM_class)
    this.atomMap.set('const', JSAtom.JS_ATOM_const)
    this.atomMap.set('enum', JSAtom.JS_ATOM_enum)
    this.atomMap.set('export', JSAtom.JS_ATOM_export)
    this.atomMap.set('extends', JSAtom.JS_ATOM_extends)
    this.atomMap.set('import', JSAtom.JS_ATOM_import)
    this.atomMap.set('super', JSAtom.JS_ATOM_super)
    this.atomMap.set('implements', JSAtom.JS_ATOM_implements)
    this.atomMap.set('interface', JSAtom.JS_ATOM_interface)
    this.atomMap.set('let', JSAtom.JS_ATOM_let)
    this.atomMap.set('package', JSAtom.JS_ATOM_package)
    this.atomMap.set('private', JSAtom.JS_ATOM_private)
    this.atomMap.set('protected', JSAtom.JS_ATOM_protected)
    this.atomMap.set('public', JSAtom.JS_ATOM_public)
    this.atomMap.set('static', JSAtom.JS_ATOM_static)
    this.atomMap.set('yield', JSAtom.JS_ATOM_yield)
    this.atomMap.set('await', JSAtom.JS_ATOM_await)
    this.atomMap.set('', JSAtom.JS_ATOM_empty_string)
    this.atomMap.set('length', JSAtom.JS_ATOM_length)
    this.atomMap.set('fileName', JSAtom.JS_ATOM_fileName)
    this.atomMap.set('lineNumber', JSAtom.JS_ATOM_lineNumber)
    this.atomMap.set('columnNumber', JSAtom.JS_ATOM_columnNumber)
    this.atomMap.set('message', JSAtom.JS_ATOM_message)
    this.atomMap.set('cause', JSAtom.JS_ATOM_cause)
    this.atomMap.set('errors', JSAtom.JS_ATOM_errors)
    this.atomMap.set('stack', JSAtom.JS_ATOM_stack)
    this.atomMap.set('name', JSAtom.JS_ATOM_name)
    this.atomMap.set('toString', JSAtom.JS_ATOM_toString)
    this.atomMap.set('toLocaleString', JSAtom.JS_ATOM_toLocaleString)
    this.atomMap.set('valueOf', JSAtom.JS_ATOM_valueOf)
    this.atomMap.set('eval', JSAtom.JS_ATOM_eval)
    this.atomMap.set('prototype', JSAtom.JS_ATOM_prototype)
    this.atomMap.set('constructor', JSAtom.JS_ATOM_constructor)
    this.atomMap.set('configurable', JSAtom.JS_ATOM_configurable)
    this.atomMap.set('writable', JSAtom.JS_ATOM_writable)
    this.atomMap.set('enumerable', JSAtom.JS_ATOM_enumerable)
    this.atomMap.set('value', JSAtom.JS_ATOM_value)
    this.atomMap.set('get', JSAtom.JS_ATOM_get)
    this.atomMap.set('set', JSAtom.JS_ATOM_set)
    this.atomMap.set('of', JSAtom.JS_ATOM_of)
    this.atomMap.set('__proto__', JSAtom.JS_ATOM___proto__)
    this.atomMap.set('undefined', JSAtom.JS_ATOM_undefined)
    this.atomMap.set('number', JSAtom.JS_ATOM_number)
    this.atomMap.set('boolean', JSAtom.JS_ATOM_boolean)
    this.atomMap.set('string', JSAtom.JS_ATOM_string)
    this.atomMap.set('object', JSAtom.JS_ATOM_object)
    this.atomMap.set('symbol', JSAtom.JS_ATOM_symbol)
    this.atomMap.set('integer', JSAtom.JS_ATOM_integer)
    this.atomMap.set('unknown', JSAtom.JS_ATOM_unknown)
    this.atomMap.set('arguments', JSAtom.JS_ATOM_arguments)
    this.atomMap.set('callee', JSAtom.JS_ATOM_callee)
    this.atomMap.set('caller', JSAtom.JS_ATOM_caller)
    this.atomMap.set('<eval>', JSAtom.JS_ATOM__eval_)
    this.atomMap.set('<ret>', JSAtom.JS_ATOM__ret_)
    this.atomMap.set('<var>', JSAtom.JS_ATOM__var_)
    this.atomMap.set('<arg_var>', JSAtom.JS_ATOM__arg_var_)
    this.atomMap.set('<with>', JSAtom.JS_ATOM__with_)
    this.atomMap.set('lastIndex', JSAtom.JS_ATOM_lastIndex)
    this.atomMap.set('target', JSAtom.JS_ATOM_target)
    this.atomMap.set('index', JSAtom.JS_ATOM_index)
    this.atomMap.set('input', JSAtom.JS_ATOM_input)
    this.atomMap.set('defineProperties', JSAtom.JS_ATOM_defineProperties)
    this.atomMap.set('apply', JSAtom.JS_ATOM_apply)
    this.atomMap.set('join', JSAtom.JS_ATOM_join)
    this.atomMap.set('concat', JSAtom.JS_ATOM_concat)
    this.atomMap.set('split', JSAtom.JS_ATOM_split)
    this.atomMap.set('construct', JSAtom.JS_ATOM_construct)
    this.atomMap.set('getPrototypeOf', JSAtom.JS_ATOM_getPrototypeOf)
    this.atomMap.set('setPrototypeOf', JSAtom.JS_ATOM_setPrototypeOf)
    this.atomMap.set('isExtensible', JSAtom.JS_ATOM_isExtensible)
    this.atomMap.set('preventExtensions', JSAtom.JS_ATOM_preventExtensions)
    this.atomMap.set('has', JSAtom.JS_ATOM_has)
    this.atomMap.set('deleteProperty', JSAtom.JS_ATOM_deleteProperty)
    this.atomMap.set('defineProperty', JSAtom.JS_ATOM_defineProperty)
    this.atomMap.set('getOwnPropertyDescriptor', JSAtom.JS_ATOM_getOwnPropertyDescriptor)
    this.atomMap.set('ownKeys', JSAtom.JS_ATOM_ownKeys)
    this.atomMap.set('add', JSAtom.JS_ATOM_add)
    this.atomMap.set('done', JSAtom.JS_ATOM_done)
    this.atomMap.set('next', JSAtom.JS_ATOM_next)
    this.atomMap.set('values', JSAtom.JS_ATOM_values)
    this.atomMap.set('source', JSAtom.JS_ATOM_source)
    this.atomMap.set('flags', JSAtom.JS_ATOM_flags)
    this.atomMap.set('global', JSAtom.JS_ATOM_global)
    this.atomMap.set('unicode', JSAtom.JS_ATOM_unicode)
    this.atomMap.set('raw', JSAtom.JS_ATOM_raw)
    this.atomMap.set('new.target', JSAtom.JS_ATOM_new_target)
    this.atomMap.set('this.active_func', JSAtom.JS_ATOM_this_active_func)
    this.atomMap.set('<home_object>', JSAtom.JS_ATOM_home_object)
    this.atomMap.set('<computed_field>', JSAtom.JS_ATOM_computed_field)
    this.atomMap.set('<static_computed_field>', JSAtom.JS_ATOM_static_computed_field)
    this.atomMap.set('<class_fields_init>', JSAtom.JS_ATOM_class_fields_init)
    this.atomMap.set('<brand>', JSAtom.JS_ATOM_brand)
    this.atomMap.set('#constructor', JSAtom.JS_ATOM_hash_constructor)
    this.atomMap.set('as', JSAtom.JS_ATOM_as)
    this.atomMap.set('from', JSAtom.JS_ATOM_from)
    this.atomMap.set('meta', JSAtom.JS_ATOM_meta)
    this.atomMap.set('*default*', JSAtom.JS_ATOM__default_)
    this.atomMap.set('*', JSAtom.JS_ATOM__star_)
    this.atomMap.set('Module', JSAtom.JS_ATOM_Module)
    this.atomMap.set('then', JSAtom.JS_ATOM_then)
    this.atomMap.set('resolve', JSAtom.JS_ATOM_resolve)
    this.atomMap.set('reject', JSAtom.JS_ATOM_reject)
    this.atomMap.set('promise', JSAtom.JS_ATOM_promise)
    this.atomMap.set('proxy', JSAtom.JS_ATOM_proxy)
    this.atomMap.set('revoke', JSAtom.JS_ATOM_revoke)
    this.atomMap.set('async', JSAtom.JS_ATOM_async)
    this.atomMap.set('exec', JSAtom.JS_ATOM_exec)
    this.atomMap.set('groups', JSAtom.JS_ATOM_groups)
    this.atomMap.set('indices', JSAtom.JS_ATOM_indices)
    this.atomMap.set('status', JSAtom.JS_ATOM_status)
    this.atomMap.set('reason', JSAtom.JS_ATOM_reason)
    this.atomMap.set('globalThis', JSAtom.JS_ATOM_globalThis)
    this.atomMap.set('bigint', JSAtom.JS_ATOM_bigint)
    this.atomMap.set('Object', JSAtom.JS_ATOM_Object)
    this.atomMap.set('Array', JSAtom.JS_ATOM_Array)
    this.atomMap.set('Error', JSAtom.JS_ATOM_Error)
    this.atomMap.set('Number', JSAtom.JS_ATOM_Number)
    this.atomMap.set('String', JSAtom.JS_ATOM_String)
    this.atomMap.set('Boolean', JSAtom.JS_ATOM_Boolean)
    this.atomMap.set('Symbol', JSAtom.JS_ATOM_Symbol)
    this.atomMap.set('Arguments', JSAtom.JS_ATOM_Arguments)
    this.atomMap.set('Math', JSAtom.JS_ATOM_Math)
    this.atomMap.set('JSON', JSAtom.JS_ATOM_JSON)
    this.atomMap.set('Date', JSAtom.JS_ATOM_Date)
    this.atomMap.set('Function', JSAtom.JS_ATOM_Function)
    this.atomMap.set('GeneratorFunction', JSAtom.JS_ATOM_GeneratorFunction)
    this.atomMap.set('ForInIterator', JSAtom.JS_ATOM_ForInIterator)
    this.atomMap.set('RegExp', JSAtom.JS_ATOM_RegExp)
    this.atomMap.set('ArrayBuffer', JSAtom.JS_ATOM_ArrayBuffer)
    this.atomMap.set('SharedArrayBuffer', JSAtom.JS_ATOM_SharedArrayBuffer)
    this.atomMap.set('Uint8ClampedArray', JSAtom.JS_ATOM_Uint8ClampedArray)
    this.atomMap.set('Int8Array', JSAtom.JS_ATOM_Int8Array)
    this.atomMap.set('Uint8Array', JSAtom.JS_ATOM_Uint8Array)
    this.atomMap.set('Int16Array', JSAtom.JS_ATOM_Int16Array)
    this.atomMap.set('Uint16Array', JSAtom.JS_ATOM_Uint16Array)
    this.atomMap.set('Int32Array', JSAtom.JS_ATOM_Int32Array)
    this.atomMap.set('Uint32Array', JSAtom.JS_ATOM_Uint32Array)
    this.atomMap.set('Float16Array', JSAtom.JS_ATOM_Float16Array)
    this.atomMap.set('Float32Array', JSAtom.JS_ATOM_Float32Array)
    this.atomMap.set('Float64Array', JSAtom.JS_ATOM_Float64Array)
    this.atomMap.set('DataView', JSAtom.JS_ATOM_DataView)
    this.atomMap.set('BigInt', JSAtom.JS_ATOM_BigInt)
    this.atomMap.set('WeakRef', JSAtom.JS_ATOM_WeakRef)
    this.atomMap.set('FinalizationRegistry', JSAtom.JS_ATOM_FinalizationRegistry)
    this.atomMap.set('Map', JSAtom.JS_ATOM_Map)
    this.atomMap.set('Set', JSAtom.JS_ATOM_Set)
    this.atomMap.set('WeakMap', JSAtom.JS_ATOM_WeakMap)
    this.atomMap.set('WeakSet', JSAtom.JS_ATOM_WeakSet)
    this.atomMap.set('Map Iterator', JSAtom.JS_ATOM_Map_Iterator)
    this.atomMap.set('Set Iterator', JSAtom.JS_ATOM_Set_Iterator)
    this.atomMap.set('Array Iterator', JSAtom.JS_ATOM_Array_Iterator)
    this.atomMap.set('String Iterator', JSAtom.JS_ATOM_String_Iterator)
    this.atomMap.set('RegExp String Iterator', JSAtom.JS_ATOM_RegExp_String_Iterator)
    this.atomMap.set('Generator', JSAtom.JS_ATOM_Generator)
    this.atomMap.set('Proxy', JSAtom.JS_ATOM_Proxy)
    this.atomMap.set('Promise', JSAtom.JS_ATOM_Promise)
    this.atomMap.set('PromiseResolveFunction', JSAtom.JS_ATOM_PromiseResolveFunction)
    this.atomMap.set('PromiseRejectFunction', JSAtom.JS_ATOM_PromiseRejectFunction)
    this.atomMap.set('AsyncFunction', JSAtom.JS_ATOM_AsyncFunction)
    this.atomMap.set('AsyncFunctionResolve', JSAtom.JS_ATOM_AsyncFunctionResolve)
    this.atomMap.set('AsyncFunctionReject', JSAtom.JS_ATOM_AsyncFunctionReject)
    this.atomMap.set('AsyncGeneratorFunction', JSAtom.JS_ATOM_AsyncGeneratorFunction)
    this.atomMap.set('AsyncGenerator', JSAtom.JS_ATOM_AsyncGenerator)
    this.atomMap.set('EvalError', JSAtom.JS_ATOM_EvalError)
    this.atomMap.set('RangeError', JSAtom.JS_ATOM_RangeError)
    this.atomMap.set('ReferenceError', JSAtom.JS_ATOM_ReferenceError)
    this.atomMap.set('SyntaxError', JSAtom.JS_ATOM_SyntaxError)
    this.atomMap.set('TypeError', JSAtom.JS_ATOM_TypeError)
    this.atomMap.set('URIError', JSAtom.JS_ATOM_URIError)
    this.atomMap.set('InternalError', JSAtom.JS_ATOM_InternalError)
    this.atomMap.set('Private_brand', JSAtom.JS_ATOM_Private_brand)
    this.atomMap.set('Symbol.toPrimitive', JSAtom.JS_ATOM_Symbol_toPrimitive)
    this.atomMap.set('Symbol.iterator', JSAtom.JS_ATOM_Symbol_iterator)
    this.atomMap.set('Symbol.match', JSAtom.JS_ATOM_Symbol_match)
    this.atomMap.set('Symbol.matchAll', JSAtom.JS_ATOM_Symbol_matchAll)
    this.atomMap.set('Symbol.replace', JSAtom.JS_ATOM_Symbol_replace)
    this.atomMap.set('Symbol.search', JSAtom.JS_ATOM_Symbol_search)
    this.atomMap.set('Symbol.split', JSAtom.JS_ATOM_Symbol_split)
    this.atomMap.set('Symbol.toStringTag', JSAtom.JS_ATOM_Symbol_toStringTag)
    this.atomMap.set('Symbol.isConcatSpreadable', JSAtom.JS_ATOM_Symbol_isConcatSpreadable)
    this.atomMap.set('Symbol.hasInstance', JSAtom.JS_ATOM_Symbol_hasInstance)
    this.atomMap.set('Symbol.species', JSAtom.JS_ATOM_Symbol_species)
    this.atomMap.set('Symbol.unscopables', JSAtom.JS_ATOM_Symbol_unscopables)
    this.atomMap.set('Symbol.asyncIterator', JSAtom.JS_ATOM_Symbol_asyncIterator)
  }

  setSourceFile(sourceFile: ts.SourceFile) {
    this.sourceFile = sourceFile
  }

  addPc2LineInfo(fd: FunctionDef, pc: number, sourcePos: number) {
    if (fd.sourcePos === -1) {
      fd.sourcePos = sourcePos
    }

    const slot = new LineNumberSlot()
    slot.pc = pc
    slot.sourcePos = sourcePos
    fd.lineNumberSlots.push(slot)
    fd.lineNumberCount++
  }

  computePc2LineInfo(fd: FunctionDef) {
    if (!this.sourceFile) {
      return
    }

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
      
      if (sourcePos === -1) {
        continue
      }
      
      const diffPc = pc - lastPc
      if (diffPc < 0) {
        continue
      }
      
      const pos = ts.getLineAndCharacterOfPosition(this.sourceFile, sourcePos)
      const lineNum = pos.line
      const colNum = pos.character
      
      const diffLine = lineNum - lastLineNum
      const diffCol = colNum - lastColNum
        
      if (diffLine === 0 && diffCol === 0) {
        continue
      }
        
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
    
    // Find scope_next: nearest previous variable with lower scope level
    let scopeNext = -1
    for (let i = fd.vars.length - 1; i >= 0; i--) {
      if (fd.vars[i].scopeLevel < scopeLevel) {
        scopeNext = i
        break
      }
    }
    v.scopeNext = scopeNext

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
    return this.addClosureVarWithAtom(fd, atom, isLocal, isArg, varIdx, varKind, isConst, isLexical)
  }

  addClosureVarWithAtom(fd: FunctionDef, atom: number, isLocal: boolean, isArg: boolean, varIdx: number, varKind: number, isConst: boolean, isLexical: boolean): number {
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
    if (atomIdx === undefined) {
      return null
    }
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
    console.error(`addChild: parent=${parent.funcName}, child=${child.funcName}, new count=${parent.cpoolCount}`)
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

  adjustStack(s: FunctionDef, delta: number) {
    s.stackLevel += delta
    if (s.stackLevel < 0) {
      // console.warn('Stack underflow')
    }
    if (s.stackLevel > s.stackSizeMax) {
      s.stackSizeMax = s.stackLevel
    }
  }

  emitU8(s: FunctionDef, val: number, sourcePos: number = -1): void {
    if (sourcePos !== -1) {
      this.addPc2LineInfo(s, s.byteCode.size, sourcePos)
    }
    s.byteCode.putByte(val)
  }

  emitU16(s: FunctionDef, val: number): void {
    s.byteCode.putU16(val)
  }

  emitU32(s: FunctionDef, val: number, sourcePos: number = -1): void {
    if (sourcePos !== -1) {
      this.addPc2LineInfo(s, s.byteCode.size, sourcePos)
    }
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

  newLabel(): Label {
    return new Label()
  }

  markLabel(fd: FunctionDef, label: Label): void {
    label.addr = fd.byteCode.size
    // Patch existing jumps
    for (const jump of label.jumps) {
      if (jump.fd !== fd) {
        throw new Error('Jump cross function boundary')
      }
      const offset = label.addr - jump.pos
      if (jump.size === 1) {
        if (offset > 127 || offset < -128) {
          throw new Error('Jump offset too large for 8-bit jump')
        }
        fd.byteCode.buffer[jump.pos] = offset
      } else if (jump.size === 4) {
        fd.byteCode.buffer[jump.pos] = offset & 0xff
        fd.byteCode.buffer[jump.pos + 1] = (offset >> 8) & 0xff
        fd.byteCode.buffer[jump.pos + 2] = (offset >> 16) & 0xff
        fd.byteCode.buffer[jump.pos + 3] = (offset >> 24) & 0xff
      }
    }
    label.jumps = []
  }

  emitJump(fd: FunctionDef, op: number, label: Label): void {
    this.emitOp(fd, op)
    const jumpPos = fd.byteCode.size
    
    let size = 4
    if (op === Opcode.OP_goto8 || op === Opcode.OP_if_true8 || op === Opcode.OP_if_false8) {
      size = 1
        this.emitU8(fd, 0)
    } else {
      this.emitU32(fd, 0)
    }

    if (label.addr !== -1) {
      const offset = label.addr - jumpPos
      if (size === 1) {
        if (offset > 127 || offset < -128) {
          throw new Error('Jump offset too large for 8-bit jump')
        }
        fd.byteCode.buffer[jumpPos] = offset
      } else {
        fd.byteCode.buffer[jumpPos] = offset & 0xff
        fd.byteCode.buffer[jumpPos + 1] = (offset >> 8) & 0xff
        fd.byteCode.buffer[jumpPos + 2] = (offset >> 16) & 0xff
        fd.byteCode.buffer[jumpPos + 3] = (offset >> 24) & 0xff
      }
    } else {
      label.jumps.push({ fd, pos: jumpPos, size })
    }
  }

  writeFunctionBytecode(out: BytecodeBuilder, fd: FunctionDef) {
    // Filter vars that are self-captured (in closureVar as local)
    // This mimics QuickJS behavior where module/eval vars are promoted to closure vars
    // and removed from the locals list in the bytecode, even though they occupy stack slots.
    const varsToEmit = fd.vars.filter((v, i) => {
      const varIdx = fd.argCount + i
      return !fd.closureVar.some(cv => cv.isLocal && cv.varIdx === varIdx && cv.varName === v.varName)
    })
    const emittedVarCount = varsToEmit.length

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
    out.putULEB128(emittedVarCount)
    out.putULEB128(fd.definedArgCount)
    out.putULEB128(fd.stackSizeMax)
    out.putULEB128(fd.closureVarCount)
    out.putULEB128(fd.cpoolCount)
    out.putULEB128(fd.byteCode.size)

    console.error(`Writing function atom ${fd.funcName}. CPool count: ${fd.cpoolCount}`)
    console.error(`Closure vars: ${fd.closureVar.map(cv => cv.varName).join(', ')}`)

    // Locals (arg_count + var_count)
    out.putULEB128(fd.argCount + emittedVarCount)
    
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
    
    for (const v of varsToEmit) {
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
      if (cv.isLocal) {
        flags |= 1
      }
      if (cv.isArg) {
        flags |= 2
      }
      if (cv.isConst) {
        flags |= 4
      }
      if (cv.isLexical) {
        flags |= 8
      }
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
      for(let i=0; i<8; i++) {
        out.putByte(u8[i])
      }
    } else {
      // TODO: Support other CPool types
      throw new Error('Unsupported CPool item type: ' + typeof item)
    }
  }

  writeModule(fd: FunctionDef, moduleNameAtom: number): Uint8Array {
    // Reorder atoms to match QuickJS serialization order
    const reorderer = new AtomReorderer(this)
    reorderer.reorder(fd, [moduleNameAtom])
    moduleNameAtom = reorderer.getNewId(moduleNameAtom)

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
