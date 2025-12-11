import { FunctionDef, JSVarDef, JSClosureVar, LineNumberSlot, JSVarKind } from './FunctionDef'
import { Opcode, env, BytecodeTag, JSAtom, PC2Line, OPCODE_DEFS } from '../env'
import { BytecodeBuilder } from './BytecodeBuilder'
import { AtomTable } from './AtomTable'
import ts from 'typescript'


interface PendingJump {
  fd: FunctionDef
  pos: number
  size: number
}

export interface RecordedJump {
  fd: FunctionDef
  pos: number
  size: number
  op: number
  label: Label
}

export class Label {
  addr: number = -1
  jumps: PendingJump[] = []
  fd: FunctionDef | null = null
}

export class Compiler {
  atoms: string[] = []
  builtInAtoms: Map<string, number> = new Map()
  firstAtomId: number = env.firstAtomId
  sourceFile: ts.SourceFile | null = null
  
  
  constructor(options?: { firstAtomId?: number }) {
    if (options?.firstAtomId) {
      this.firstAtomId = options.firstAtomId
    }
    this.ensureInitializedBuiltinAtoms()
  }

  ensureInitializedBuiltinAtoms() {
    this.builtInAtoms.set('null', JSAtom.JS_ATOM_null)
    this.builtInAtoms.set('false', JSAtom.JS_ATOM_false)
    this.builtInAtoms.set('true', JSAtom.JS_ATOM_true)
    this.builtInAtoms.set('if', JSAtom.JS_ATOM_if)
    this.builtInAtoms.set('else', JSAtom.JS_ATOM_else)
    this.builtInAtoms.set('return', JSAtom.JS_ATOM_return)
    this.builtInAtoms.set('var', JSAtom.JS_ATOM_var)
    this.builtInAtoms.set('this', JSAtom.JS_ATOM_this)
    this.builtInAtoms.set('delete', JSAtom.JS_ATOM_delete)
    this.builtInAtoms.set('void', JSAtom.JS_ATOM_void)
    this.builtInAtoms.set('typeof', JSAtom.JS_ATOM_typeof)
    this.builtInAtoms.set('new', JSAtom.JS_ATOM_new)
    this.builtInAtoms.set('in', JSAtom.JS_ATOM_in)
    this.builtInAtoms.set('instanceof', JSAtom.JS_ATOM_instanceof)
    this.builtInAtoms.set('do', JSAtom.JS_ATOM_do)
    this.builtInAtoms.set('while', JSAtom.JS_ATOM_while)
    this.builtInAtoms.set('for', JSAtom.JS_ATOM_for)
    this.builtInAtoms.set('break', JSAtom.JS_ATOM_break)
    this.builtInAtoms.set('continue', JSAtom.JS_ATOM_continue)
    this.builtInAtoms.set('switch', JSAtom.JS_ATOM_switch)
    this.builtInAtoms.set('case', JSAtom.JS_ATOM_case)
    this.builtInAtoms.set('default', JSAtom.JS_ATOM_default)
    this.builtInAtoms.set('throw', JSAtom.JS_ATOM_throw)
    this.builtInAtoms.set('try', JSAtom.JS_ATOM_try)
    this.builtInAtoms.set('catch', JSAtom.JS_ATOM_catch)
    this.builtInAtoms.set('finally', JSAtom.JS_ATOM_finally)
    this.builtInAtoms.set('function', JSAtom.JS_ATOM_function)
    this.builtInAtoms.set('debugger', JSAtom.JS_ATOM_debugger)
    this.builtInAtoms.set('with', JSAtom.JS_ATOM_with)
    this.builtInAtoms.set('class', JSAtom.JS_ATOM_class)
    this.builtInAtoms.set('const', JSAtom.JS_ATOM_const)
    this.builtInAtoms.set('enum', JSAtom.JS_ATOM_enum)
    this.builtInAtoms.set('export', JSAtom.JS_ATOM_export)
    this.builtInAtoms.set('extends', JSAtom.JS_ATOM_extends)
    this.builtInAtoms.set('import', JSAtom.JS_ATOM_import)
    this.builtInAtoms.set('super', JSAtom.JS_ATOM_super)
    this.builtInAtoms.set('implements', JSAtom.JS_ATOM_implements)
    this.builtInAtoms.set('interface', JSAtom.JS_ATOM_interface)
    this.builtInAtoms.set('let', JSAtom.JS_ATOM_let)
    this.builtInAtoms.set('package', JSAtom.JS_ATOM_package)
    this.builtInAtoms.set('private', JSAtom.JS_ATOM_private)
    this.builtInAtoms.set('protected', JSAtom.JS_ATOM_protected)
    this.builtInAtoms.set('public', JSAtom.JS_ATOM_public)
    this.builtInAtoms.set('static', JSAtom.JS_ATOM_static)
    this.builtInAtoms.set('yield', JSAtom.JS_ATOM_yield)
    this.builtInAtoms.set('await', JSAtom.JS_ATOM_await)
    this.builtInAtoms.set('', JSAtom.JS_ATOM_empty_string)
    this.builtInAtoms.set('length', JSAtom.JS_ATOM_length)
    this.builtInAtoms.set('fileName', JSAtom.JS_ATOM_fileName)
    this.builtInAtoms.set('lineNumber', JSAtom.JS_ATOM_lineNumber)
    this.builtInAtoms.set('columnNumber', JSAtom.JS_ATOM_columnNumber)
    this.builtInAtoms.set('message', JSAtom.JS_ATOM_message)
    this.builtInAtoms.set('cause', JSAtom.JS_ATOM_cause)
    this.builtInAtoms.set('errors', JSAtom.JS_ATOM_errors)
    this.builtInAtoms.set('stack', JSAtom.JS_ATOM_stack)
    this.builtInAtoms.set('name', JSAtom.JS_ATOM_name)
    this.builtInAtoms.set('toString', JSAtom.JS_ATOM_toString)
    this.builtInAtoms.set('toLocaleString', JSAtom.JS_ATOM_toLocaleString)
    this.builtInAtoms.set('valueOf', JSAtom.JS_ATOM_valueOf)
    this.builtInAtoms.set('eval', JSAtom.JS_ATOM_eval)
    this.builtInAtoms.set('prototype', JSAtom.JS_ATOM_prototype)
    this.builtInAtoms.set('constructor', JSAtom.JS_ATOM_constructor)
    this.builtInAtoms.set('configurable', JSAtom.JS_ATOM_configurable)
    this.builtInAtoms.set('writable', JSAtom.JS_ATOM_writable)
    this.builtInAtoms.set('enumerable', JSAtom.JS_ATOM_enumerable)
    this.builtInAtoms.set('value', JSAtom.JS_ATOM_value)
    this.builtInAtoms.set('get', JSAtom.JS_ATOM_get)
    this.builtInAtoms.set('set', JSAtom.JS_ATOM_set)
    this.builtInAtoms.set('of', JSAtom.JS_ATOM_of)
    this.builtInAtoms.set('__proto__', JSAtom.JS_ATOM___proto__)
    this.builtInAtoms.set('undefined', JSAtom.JS_ATOM_undefined) // Allow undefined as user atom
    this.builtInAtoms.set('number', JSAtom.JS_ATOM_number)
    this.builtInAtoms.set('boolean', JSAtom.JS_ATOM_boolean)
    this.builtInAtoms.set('string', JSAtom.JS_ATOM_string)
    this.builtInAtoms.set('object', JSAtom.JS_ATOM_object)
    this.builtInAtoms.set('symbol', JSAtom.JS_ATOM_symbol)
    this.builtInAtoms.set('integer', JSAtom.JS_ATOM_integer)
    this.builtInAtoms.set('unknown', JSAtom.JS_ATOM_unknown)
    this.builtInAtoms.set('arguments', JSAtom.JS_ATOM_arguments)
    this.builtInAtoms.set('callee', JSAtom.JS_ATOM_callee)
    this.builtInAtoms.set('caller', JSAtom.JS_ATOM_caller)
    this.builtInAtoms.set('<eval>', JSAtom.JS_ATOM__eval_)
    this.builtInAtoms.set('<ret>', JSAtom.JS_ATOM__ret_)
    this.builtInAtoms.set('<var>', JSAtom.JS_ATOM__var_)
    this.builtInAtoms.set('<arg_var>', JSAtom.JS_ATOM__arg_var_)
    this.builtInAtoms.set('<with>', JSAtom.JS_ATOM__with_)
    this.builtInAtoms.set('lastIndex', JSAtom.JS_ATOM_lastIndex)
    this.builtInAtoms.set('target', JSAtom.JS_ATOM_target)
    this.builtInAtoms.set('index', JSAtom.JS_ATOM_index)
    this.builtInAtoms.set('input', JSAtom.JS_ATOM_input)
    this.builtInAtoms.set('defineProperties', JSAtom.JS_ATOM_defineProperties)
    this.builtInAtoms.set('apply', JSAtom.JS_ATOM_apply)
    this.builtInAtoms.set('join', JSAtom.JS_ATOM_join)
    this.builtInAtoms.set('concat', JSAtom.JS_ATOM_concat)
    this.builtInAtoms.set('split', JSAtom.JS_ATOM_split)
    this.builtInAtoms.set('construct', JSAtom.JS_ATOM_construct)
    this.builtInAtoms.set('getPrototypeOf', JSAtom.JS_ATOM_getPrototypeOf)
    this.builtInAtoms.set('setPrototypeOf', JSAtom.JS_ATOM_setPrototypeOf)
    this.builtInAtoms.set('isExtensible', JSAtom.JS_ATOM_isExtensible)
    this.builtInAtoms.set('preventExtensions', JSAtom.JS_ATOM_preventExtensions)
    this.builtInAtoms.set('has', JSAtom.JS_ATOM_has)
    this.builtInAtoms.set('deleteProperty', JSAtom.JS_ATOM_deleteProperty)
    this.builtInAtoms.set('defineProperty', JSAtom.JS_ATOM_defineProperty)
    this.builtInAtoms.set('getOwnPropertyDescriptor', JSAtom.JS_ATOM_getOwnPropertyDescriptor)
    this.builtInAtoms.set('ownKeys', JSAtom.JS_ATOM_ownKeys)
    this.builtInAtoms.set('add', JSAtom.JS_ATOM_add)
    this.builtInAtoms.set('done', JSAtom.JS_ATOM_done)
    this.builtInAtoms.set('next', JSAtom.JS_ATOM_next)
    this.builtInAtoms.set('values', JSAtom.JS_ATOM_values)
    this.builtInAtoms.set('source', JSAtom.JS_ATOM_source)
    this.builtInAtoms.set('flags', JSAtom.JS_ATOM_flags)
    this.builtInAtoms.set('global', JSAtom.JS_ATOM_global)
    this.builtInAtoms.set('unicode', JSAtom.JS_ATOM_unicode)
    this.builtInAtoms.set('raw', JSAtom.JS_ATOM_raw)
    this.builtInAtoms.set('new.target', JSAtom.JS_ATOM_new_target)
    this.builtInAtoms.set('this.active_func', JSAtom.JS_ATOM_this_active_func)
    this.builtInAtoms.set('<home_object>', JSAtom.JS_ATOM_home_object)
    this.builtInAtoms.set('<computed_field>', JSAtom.JS_ATOM_computed_field)
    this.builtInAtoms.set('<static_computed_field>', JSAtom.JS_ATOM_static_computed_field)
    this.builtInAtoms.set('<class_fields_init>', JSAtom.JS_ATOM_class_fields_init)
    this.builtInAtoms.set('<brand>', JSAtom.JS_ATOM_brand)
    this.builtInAtoms.set('#constructor', JSAtom.JS_ATOM_hash_constructor)
    this.builtInAtoms.set('as', JSAtom.JS_ATOM_as)
    this.builtInAtoms.set('from', JSAtom.JS_ATOM_from)
    this.builtInAtoms.set('meta', JSAtom.JS_ATOM_meta)
    this.builtInAtoms.set('*default*', JSAtom.JS_ATOM__default_)
    this.builtInAtoms.set('*', JSAtom.JS_ATOM__star_)
    this.builtInAtoms.set('Module', JSAtom.JS_ATOM_Module)
    this.builtInAtoms.set('then', JSAtom.JS_ATOM_then)
    this.builtInAtoms.set('resolve', JSAtom.JS_ATOM_resolve)
    this.builtInAtoms.set('reject', JSAtom.JS_ATOM_reject)
    this.builtInAtoms.set('promise', JSAtom.JS_ATOM_promise)
    this.builtInAtoms.set('proxy', JSAtom.JS_ATOM_proxy)
    this.builtInAtoms.set('revoke', JSAtom.JS_ATOM_revoke)
    this.builtInAtoms.set('async', JSAtom.JS_ATOM_async)
    this.builtInAtoms.set('exec', JSAtom.JS_ATOM_exec)
    this.builtInAtoms.set('groups', JSAtom.JS_ATOM_groups)
    this.builtInAtoms.set('indices', JSAtom.JS_ATOM_indices)
    this.builtInAtoms.set('status', JSAtom.JS_ATOM_status)
    this.builtInAtoms.set('reason', JSAtom.JS_ATOM_reason)
    this.builtInAtoms.set('globalThis', JSAtom.JS_ATOM_globalThis)
    this.builtInAtoms.set('bigint', JSAtom.JS_ATOM_bigint)
    this.builtInAtoms.set('Object', JSAtom.JS_ATOM_Object)
    this.builtInAtoms.set('Array', JSAtom.JS_ATOM_Array)
    this.builtInAtoms.set('Error', JSAtom.JS_ATOM_Error)
    this.builtInAtoms.set('Number', JSAtom.JS_ATOM_Number)
    this.builtInAtoms.set('String', JSAtom.JS_ATOM_String)
    this.builtInAtoms.set('Boolean', JSAtom.JS_ATOM_Boolean)
    this.builtInAtoms.set('Symbol', JSAtom.JS_ATOM_Symbol)
    this.builtInAtoms.set('Arguments', JSAtom.JS_ATOM_Arguments)
    this.builtInAtoms.set('Math', JSAtom.JS_ATOM_Math)
    this.builtInAtoms.set('JSON', JSAtom.JS_ATOM_JSON)
    this.builtInAtoms.set('Date', JSAtom.JS_ATOM_Date)
    this.builtInAtoms.set('Function', JSAtom.JS_ATOM_Function)
    this.builtInAtoms.set('GeneratorFunction', JSAtom.JS_ATOM_GeneratorFunction)
    this.builtInAtoms.set('ForInIterator', JSAtom.JS_ATOM_ForInIterator)
    this.builtInAtoms.set('RegExp', JSAtom.JS_ATOM_RegExp)
    this.builtInAtoms.set('ArrayBuffer', JSAtom.JS_ATOM_ArrayBuffer)
    this.builtInAtoms.set('SharedArrayBuffer', JSAtom.JS_ATOM_SharedArrayBuffer)
    this.builtInAtoms.set('Uint8ClampedArray', JSAtom.JS_ATOM_Uint8ClampedArray)
    this.builtInAtoms.set('Int8Array', JSAtom.JS_ATOM_Int8Array)
    this.builtInAtoms.set('Uint8Array', JSAtom.JS_ATOM_Uint8Array)
    this.builtInAtoms.set('Int16Array', JSAtom.JS_ATOM_Int16Array)
    this.builtInAtoms.set('Uint16Array', JSAtom.JS_ATOM_Uint16Array)
    this.builtInAtoms.set('Int32Array', JSAtom.JS_ATOM_Int32Array)
    this.builtInAtoms.set('Uint32Array', JSAtom.JS_ATOM_Uint32Array)
    this.builtInAtoms.set('Float16Array', JSAtom.JS_ATOM_Float16Array)
    this.builtInAtoms.set('Float32Array', JSAtom.JS_ATOM_Float32Array)
    this.builtInAtoms.set('Float64Array', JSAtom.JS_ATOM_Float64Array)
    this.builtInAtoms.set('DataView', JSAtom.JS_ATOM_DataView)
    this.builtInAtoms.set('BigInt', JSAtom.JS_ATOM_BigInt)
    this.builtInAtoms.set('WeakRef', JSAtom.JS_ATOM_WeakRef)
    this.builtInAtoms.set('FinalizationRegistry', JSAtom.JS_ATOM_FinalizationRegistry)
    this.builtInAtoms.set('Map', JSAtom.JS_ATOM_Map)
    this.builtInAtoms.set('Set', JSAtom.JS_ATOM_Set)
    this.builtInAtoms.set('WeakMap', JSAtom.JS_ATOM_WeakMap)
    this.builtInAtoms.set('WeakSet', JSAtom.JS_ATOM_WeakSet)
    this.builtInAtoms.set('Map Iterator', JSAtom.JS_ATOM_Map_Iterator)
    this.builtInAtoms.set('Set Iterator', JSAtom.JS_ATOM_Set_Iterator)
    this.builtInAtoms.set('Array Iterator', JSAtom.JS_ATOM_Array_Iterator)
    this.builtInAtoms.set('String Iterator', JSAtom.JS_ATOM_String_Iterator)
    this.builtInAtoms.set('RegExp String Iterator', JSAtom.JS_ATOM_RegExp_String_Iterator)
    this.builtInAtoms.set('Generator', JSAtom.JS_ATOM_Generator)
    this.builtInAtoms.set('Proxy', JSAtom.JS_ATOM_Proxy)
    this.builtInAtoms.set('Promise', JSAtom.JS_ATOM_Promise)
    this.builtInAtoms.set('PromiseResolveFunction', JSAtom.JS_ATOM_PromiseResolveFunction)
    this.builtInAtoms.set('PromiseRejectFunction', JSAtom.JS_ATOM_PromiseRejectFunction)
    this.builtInAtoms.set('AsyncFunction', JSAtom.JS_ATOM_AsyncFunction)
    this.builtInAtoms.set('AsyncFunctionResolve', JSAtom.JS_ATOM_AsyncFunctionResolve)
    this.builtInAtoms.set('AsyncFunctionReject', JSAtom.JS_ATOM_AsyncFunctionReject)
    this.builtInAtoms.set('AsyncGeneratorFunction', JSAtom.JS_ATOM_AsyncGeneratorFunction)
    this.builtInAtoms.set('AsyncGenerator', JSAtom.JS_ATOM_AsyncGenerator)
    this.builtInAtoms.set('EvalError', JSAtom.JS_ATOM_EvalError)
    this.builtInAtoms.set('RangeError', JSAtom.JS_ATOM_RangeError)
    this.builtInAtoms.set('ReferenceError', JSAtom.JS_ATOM_ReferenceError)
    this.builtInAtoms.set('SyntaxError', JSAtom.JS_ATOM_SyntaxError)
    this.builtInAtoms.set('TypeError', JSAtom.JS_ATOM_TypeError)
    this.builtInAtoms.set('URIError', JSAtom.JS_ATOM_URIError)
    this.builtInAtoms.set('InternalError', JSAtom.JS_ATOM_InternalError)
    this.builtInAtoms.set('Private_brand', JSAtom.JS_ATOM_Private_brand)
    this.builtInAtoms.set('Symbol.toPrimitive', JSAtom.JS_ATOM_Symbol_toPrimitive)
    this.builtInAtoms.set('Symbol.iterator', JSAtom.JS_ATOM_Symbol_iterator)
    this.builtInAtoms.set('Symbol.match', JSAtom.JS_ATOM_Symbol_match)
    this.builtInAtoms.set('Symbol.matchAll', JSAtom.JS_ATOM_Symbol_matchAll)
    this.builtInAtoms.set('Symbol.replace', JSAtom.JS_ATOM_Symbol_replace)
    this.builtInAtoms.set('Symbol.search', JSAtom.JS_ATOM_Symbol_search)
    this.builtInAtoms.set('Symbol.split', JSAtom.JS_ATOM_Symbol_split)
    this.builtInAtoms.set('Symbol.toStringTag', JSAtom.JS_ATOM_Symbol_toStringTag)
    this.builtInAtoms.set('Symbol.isConcatSpreadable', JSAtom.JS_ATOM_Symbol_isConcatSpreadable)
    this.builtInAtoms.set('Symbol.hasInstance', JSAtom.JS_ATOM_Symbol_hasInstance)
    this.builtInAtoms.set('Symbol.species', JSAtom.JS_ATOM_Symbol_species)
    this.builtInAtoms.set('Symbol.unscopables', JSAtom.JS_ATOM_Symbol_unscopables)
    this.builtInAtoms.set('Symbol.asyncIterator', JSAtom.JS_ATOM_Symbol_asyncIterator)
  }

  setSourceFile(sourceFile: ts.SourceFile) {
    this.sourceFile = sourceFile
  }

  addPc2LineInfo(fd: FunctionDef, pc: number, sourcePos: number) {
    if (sourcePos === -1) {
      return
    }

    // Mirror QuickJS add_pc2line_info: only record monotonically increasing PCs
    // and skip identical source positions to avoid noisy entries.
    if (pc < fd.lineNumberLastPc || sourcePos === fd.lineNumberLast) {
      return
    }

    if (fd.sourcePos === -1) {
      fd.sourcePos = sourcePos
    }

    const slot = new LineNumberSlot()
    slot.pc = pc
    slot.sourcePos = sourcePos
    fd.lineNumberSlots.push(slot)
    fd.lineNumberCount++
    fd.lineNumberLastPc = pc
    fd.lineNumberLast = sourcePos

    if (this.sourceFile) {
      const pos = ts.getLineAndCharacterOfPosition(this.sourceFile, sourcePos)
      // console.log(`[DEBUG] addPc2LineInfo: pc=${pc}, line=${pos.line + 1}, col=${pos.character + 1}`)
    }
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
        fd.pc2line.putSLEB128(diffCol)
      } else {
        fd.pc2line.putByte(0)
        fd.pc2line.putULEB128(diffPc)
        fd.pc2line.putSLEB128(diffLine)
        fd.pc2line.putSLEB128(diffCol)
      }
      
      lastPc = pc
      lastLineNum = lineNum
      lastColNum = colNum
    }
  }

  addVar(fd: FunctionDef, name: string, isConst: boolean = false, isLexical: boolean = false, scopeLevel: number = 0, varKind: JSVarKind = JSVarKind.JS_VAR_NORMAL, isCaptured: boolean = false, isModuleVar: boolean = false): number {
    throw new Error('Not implemented')
  }

  addVarWithAtom(fd: FunctionDef, atom: number, isConst: boolean = false, isLexical: boolean = false, scopeLevel: number = 0, varKind: JSVarKind = JSVarKind.JS_VAR_NORMAL, isCaptured: boolean = false, isModuleVar: boolean = false): number {
    throw new Error('Not implemented')
  }

  addArg(fd: FunctionDef, name: string): number {
    throw new Error('Not implemented')
  }

  addClosureVar(fd: FunctionDef, name: string, isLocal: boolean, isArg: boolean, varIdx: number, varKind: number, isConst: boolean, isLexical: boolean): number {
    throw new Error('Not implemented')
  }

  addClosureVarWithAtom(fd: FunctionDef, atom: number, isLocal: boolean, isArg: boolean, varIdx: number, varKind: number, isConst: boolean, isLexical: boolean): number {
    throw new Error('Not implemented')
  }

  findVar(fd: FunctionDef, name: string): { idx: number, isArg: boolean } | null {
    throw new Error('Not implemented')
  }

  addChild(parent: FunctionDef, child: FunctionDef): number {
    throw new Error('Not implemented')
  }

  addConst(fd: FunctionDef, val: any): number {
    throw new Error('Not implemented')
  }

  emitOp(s: FunctionDef, val: number, sourcePos: number = -1): void {
    throw new Error('Not implemented')
  }

  emitU8(s: FunctionDef, val: number, sourcePos: number = -1): void {
    throw new Error('Not implemented')
  }

  emitU16(s: FunctionDef, val: number): void {
    throw new Error('Not implemented')
  }

  emitU32(s: FunctionDef, val: number, sourcePos: number = -1): void {
    throw new Error('Not implemented')
  }

  emitPushConst(s: FunctionDef, val: any, asAtom: boolean = false): void {
    throw new Error('Not implemented')
  }

  emitAtomOp(s: FunctionDef, val: number, atom: number, sourcePos: number = -1): void {
    throw new Error('Not implemented')
  }

  emitReturn(s: FunctionDef, hasVal: boolean): void {
    throw new Error('Not implemented')
  }

  putAtom(out: BytecodeBuilder, atomId: number): void {
    throw new Error('Not implemented')
  }

  writeOutput(fd: FunctionDef): Uint8Array {
    throw new Error('Not implemented')
  }

  newLabel(fd: FunctionDef): Label {
    throw new Error('Not implemented')
  }

  markLabel(fd: FunctionDef, label: Label): void {
    throw new Error('Not implemented')
  }

  markLabelAt(fd: FunctionDef, label: Label, offset: number): void {
    throw new Error('Not implemented')
  }

  emitJump(fd: FunctionDef, op: number, label: Label): void {
    throw new Error('Not implemented')
  }

  writeFunctionBytecode(out: BytecodeBuilder, fd: FunctionDef) {
    
    const setFlag = (val: boolean | number, n: number) => {
      
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
    
    for (const arg of fd.args) {
      this.putAtom(out, arg.varName)
      out.putULEB128(arg.scopeLevel)
      out.putULEB128(arg.scopeNext + 1)
      
      let flags = 0
      let idx = 0
      const setLocalFlag = (val: boolean | number, n: number) => {
        
      }
      
      setLocalFlag(arg.varKind, 4)
      setLocalFlag(arg.isConst, 1)
      setLocalFlag(arg.isLexical, 1)
      setLocalFlag(arg.isCaptured, 1)
      out.putByte(flags)
    }
    
    
  }

  writeUnitOfWork(out: BytecodeBuilder, unitOfWork: any): void {
    
  }


  
  
}
