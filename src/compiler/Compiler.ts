import ts from 'typescript'
import { spawnSync } from 'node:child_process'
import { resolve as resolvePath } from 'node:path'
import { 
  FunctionDef, 
  JSVarDef, 
  JSClosureVar, 
  LineNumberSlot, 
  JSVarKindEnum,
  JSFunctionKindEnum,
  LabelSlot,
  JSGlobalVar,
  BlockEnv,
  ARGUMENT_VAR_OFFSET,
  ARG_SCOPE_INDEX,
  JS_MAX_LOCAL_VARS,
} from './FunctionDef'
import { Opcode, TempOpcode, env, JSAtom, JSMode, JS_EVAL_TYPE_GLOBAL, JS_EVAL_TYPE_MODULE } from '../env'
import { BytecodeBuilder } from './BytecodeBuilder'
import { DebugInfoBuilder } from './DebugInfoBuilder'

type CompiledRegexpLiteral = {
  pattern: string
  bytecode: Uint8Array
}

// ============================================================================
// 类型定义
// ============================================================================
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

/**
 * 标签类 - 用于跳转目标管理
 */
export class Label {
  addr: number = -1
  jumps: PendingJump[] = []
  fd: FunctionDef | null = null
}

/**
 * 变量定义类型枚举 - 对应 parser.c:JSVarDefEnum
 * 
 * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2207-2215
 */
export enum JSVarDefEnum {
  JS_VAR_DEF_WITH = 0,
  JS_VAR_DEF_LET = 1,
  JS_VAR_DEF_CONST = 2,
  JS_VAR_DEF_FUNCTION_DECL = 3,      // function declaration
  JS_VAR_DEF_NEW_FUNCTION_DECL = 4,  // async/generator function declaration
  JS_VAR_DEF_CATCH = 5,
  JS_VAR_DEF_VAR = 6,
}

// ============================================================================
// 全局变量偏移常量
// ============================================================================


// 统一从 env.ts 读取，避免在多处重复定义导致偏差

export class Compiler {
  atoms: string[] = []
  builtInAtoms: Map<string, number> = new Map()
  firstAtomId: number = env.firstAtomId
  sourceFile: ts.SourceFile | null = null

  private readonly regexpLiteralCache: Map<string, CompiledRegexpLiteral> = new Map()
  
  
  constructor(options?: { firstAtomId?: number }) {
    if (options?.firstAtomId) {
      this.firstAtomId = options.firstAtomId
    }
    this.ensureInitializedBuiltinAtoms()
  }

  getOrCompileRegexpLiteral(literalText: string): CompiledRegexpLiteral {
    const cached = this.regexpLiteralCache.get(literalText)
    if (cached) return cached

    const scriptPath = resolvePath(process.cwd(), 'scripts', 'compileRegexpLiteral.ts')

    const r = spawnSync(
      'pnpm',
      ['-s', 'exec', 'tsx', scriptPath],
      {
        input: JSON.stringify({ literalText }),
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024,
      }
    )

    if (r.status !== 0) {
      const stderr = String(r.stderr ?? '').trim()
      throw new Error(`Failed to compile regexp literal via QuickJS WASM (status=${r.status}): ${stderr || '<no stderr>'}`)
    }

    const stdout = String(r.stdout ?? '').trim()
    const parsed = JSON.parse(stdout) as { patternUtf8Base64: string; bytecodeUtf8Base64: string }
    const pattern = Buffer.from(parsed.patternUtf8Base64, 'base64').toString('utf8')
    const bytecodeBuf = Buffer.from(parsed.bytecodeUtf8Base64, 'base64')
    const result: CompiledRegexpLiteral = {
      pattern,
      bytecode: new Uint8Array(bytecodeBuf),
    }

    this.regexpLiteralCache.set(literalText, result)
    return result
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

    // 特殊数值字符串 (QuickJS quickjs-atom.h: 143-146)
    this.builtInAtoms.set('-0', JSAtom.JS_ATOM_minus_zero)
    this.builtInAtoms.set('Infinity', JSAtom.JS_ATOM_Infinity)
    this.builtInAtoms.set('-Infinity', JSAtom.JS_ATOM_minus_Infinity)
    this.builtInAtoms.set('NaN', JSAtom.JS_ATOM_NaN)

    // RegExp flags (QuickJS quickjs-atom.h: 147-152)
    this.builtInAtoms.set('hasIndices', JSAtom.JS_ATOM_hasIndices)
    this.builtInAtoms.set('ignoreCase', JSAtom.JS_ATOM_ignoreCase)
    this.builtInAtoms.set('multiline', JSAtom.JS_ATOM_multiline)
    this.builtInAtoms.set('dotAll', JSAtom.JS_ATOM_dotAll)
    this.builtInAtoms.set('sticky', JSAtom.JS_ATOM_sticky)
    this.builtInAtoms.set('unicodeSets', JSAtom.JS_ATOM_unicodeSets)

    // Atomics 结果标识符 (QuickJS quickjs-atom.h: 153-155)
    this.builtInAtoms.set('not-equal', JSAtom.JS_ATOM_not_equal)
    this.builtInAtoms.set('timed-out', JSAtom.JS_ATOM_timed_out)
    this.builtInAtoms.set('ok', JSAtom.JS_ATOM_ok)

    // toJSON 方法名 (QuickJS quickjs-atom.h: 156)
    this.builtInAtoms.set('toJSON', JSAtom.JS_ATOM_toJSON)

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
    this.builtInAtoms.set('<brand>', JSAtom.JS_ATOM_Private_brand)
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

  // ============================================================================
  // Atom 管理方法
  // ============================================================================

  /**
   * 获取字符串对应的 Atom ID
   * 
   * 首先检查内置 atoms，然后检查用户定义的 atoms
   * 
   * @param name 字符串名称
   * @returns Atom ID，如果不存在返回 null
   */
  getAtom(name: string): number | null {
    // 首先检查内置 atoms
    const builtIn = this.builtInAtoms.get(name)
    if (builtIn !== undefined) {
      return builtIn
    }
    
    // 检查用户定义的 atoms
    const idx = this.atoms.indexOf(name)
    if (idx >= 0) {
      return this.firstAtomId + idx
    }
    
    return null
  }

  /**
   * 添加新的 Atom
   * 
   * 如果字符串已存在于内置 atoms 或用户定义的 atoms 中，返回已有的 ID
   * 
   * @param name 字符串名称
   * @returns Atom ID
   */
  addAtom(name: string): number {
    if (process.env.DEBUG_EMPTY_ATOM && name === '') {
      throw new Error('Unexpected empty-string atom')
    }
    // 首先检查内置 atoms
    const builtIn = this.builtInAtoms.get(name)
    if (builtIn !== undefined) {
      return builtIn
    }
    
    // 检查用户定义的 atoms
    const idx = this.atoms.indexOf(name)
    if (idx >= 0) {
      return this.firstAtomId + idx
    }
    
    // 添加新的 atom
    this.atoms.push(name)
    return this.firstAtomId + this.atoms.length - 1
  }

  /**
   * 通过 Atom ID 获取字符串
   * 
   * @param atom Atom ID
   * @returns 字符串，如果不存在返回 null
   */
  getAtomString(atom: number): string | null {
    // 检查是否为内置 atom
    for (const [name, id] of this.builtInAtoms.entries()) {
      if (id === atom) {
        return name
      }
    }
    
    // 检查用户定义的 atoms
    if (atom >= this.firstAtomId && atom < this.firstAtomId + this.atoms.length) {
      return this.atoms[atom - this.firstAtomId]
    }
    
    return null
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

    if (this.sourceFile && process.env.DEBUG_PC2LINE) {
      const pos = ts.getLineAndCharacterOfPosition(this.sourceFile, sourcePos)
      console.log(`[COMP] addPc2LineInfo: pc=${pc}, line=${pos.line + 1}, col=${pos.character + 1}`)
    }
  }

  /**
   * @deprecated 已冻结：pc2line 生成已切换到 DebugInfoBuilder（QuickJS 对齐实现）。
   * 保留该方法仅为兼容旧调用点；新代码请直接调用 DebugInfoBuilder.computePc2LineInfo。
   */
  computePc2LineInfo(fd: FunctionDef) {
    if (!fd.getLineColCache && fd.source) {
      DebugInfoBuilder.initLineColCache(fd, fd.source)
    }
    DebugInfoBuilder.computePc2LineInfo(fd)
  }

  // ============================================================================
  // 字节码发射方法 - 对应 parser.c:1765-1810
  // ============================================================================

  /**
   * 发射 8 位无符号整数 - 对应 parser.c:emit_u8
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1765-1767
   */
  emitU8(fd: FunctionDef, val: number): void {
    fd.byteCode.putByte(val)
  }

  /**
   * 发射 16 位无符号整数 (小端序) - 对应 parser.c:emit_u16
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1769-1771
   */
  emitU16(fd: FunctionDef, val: number): void {
    fd.byteCode.putU16(val)
  }

  /**
   * 发射 32 位无符号整数 (小端序) - 对应 parser.c:emit_u32
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1773-1775
   */
  emitU32(fd: FunctionDef, val: number): void {
    fd.byteCode.putU32(val)
  }

  /**
   * 发射源码位置信息 - 对应 parser.c:emit_source_pos
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1777-1786
   * 
   * 注意: 如果源码位置与上次不同，则发射 OP_line_num 指令
   */
  emitSourcePos(fd: FunctionDef, sourcePos: number): void {
    if (fd.suppressSourcePos) return

    // Defensive: some synthetic/implicit TS nodes can yield negative positions.
    // QuickJS never emits an OP_line_num for an invalid source pointer.
    if (sourcePos < 0) return

    // Match QuickJS emit_source_pos(): dedup by exact source position.
    // QuickJS compares the source_ptr pointer; our equivalent is `sourcePos`.
    if (fd.lastOpcodeSourcePtr !== sourcePos) {
      fd.byteCode.putByte(TempOpcode.OP_line_num)
      fd.byteCode.putU32(sourcePos)
      fd.lastOpcodeSourcePtr = sourcePos
    }
  }

  /**
   * 发射操作码 - 对应 parser.c:emit_op
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1788-1794
   */
  emitOp(fd: FunctionDef, val: number, sourcePos: number = -1): void {
    // 如果提供了源码位置，先发射 OP_line_num
    // 这与 QuickJS C 版本在调用 emit_op 前调用 emit_source_pos 的行为一致
    if (sourcePos !== -1) {
      this.emitSourcePos(fd, sourcePos)
    }
    
    fd.lastOpcodePos = fd.byteCode.size
    fd.byteCode.putByte(val)
  }

  /**
   * 发射 Atom - 对应 parser.c:emit_atom
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1796-1803
   * 
   * 注意: QuickJS 中会复制 atom，但在 TypeScript 中我们直接使用 atom 值
   */
  emitAtom(fd: FunctionDef, atom: number): void {
    fd.byteCode.putU32(atom)
  }

  /**
   * 发射带 Atom 的操作码 - 组合 emitOp 和 emitAtom
   */
  emitAtomOp(fd: FunctionDef, op: number, atom: number, sourcePos: number = -1): void {
    this.emitOp(fd, op, sourcePos)
    this.emitAtom(fd, atom)
  }

  /**
   * 发射 IC (内联缓存) 槽位 - 对应 parser.c:emit_ic
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1805-1807
   * 
   * 注意: 编译期间仅跟踪属性名 atoms，实际 IC 缓存在 QuickJS 运行时管理
   */
  emitIc(fd: FunctionDef, atom: number): void {
    // 对应 add_ic_slot1(fd->ic, atom)
    // QuickJS 源码位置: third_party/QuickJS/src/core/ic.h:108-127
    fd.ic.addSlot(atom)
  }

  // ============================================================================
  // 标签管理方法 - 对应 parser.c:1809-1875
  // ============================================================================

  /**
   * 更新标签引用计数 - 对应 parser.c:update_label
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1809-1818
   */
  updateLabel(fd: FunctionDef, label: number, delta: number): number {
    if (label < 0 || label >= fd.labelCount) {
      throw new Error(`Invalid label index: ${label}`)
    }
    const ls = fd.labelSlots[label]
    ls.refCount += delta
    if (ls.refCount < 0) {
      throw new Error(`Label ref count went negative: ${ls.refCount}`)
    }
    return ls.refCount
  }

  /**
   * 创建新标签 (FunctionDef 版本) - 对应 parser.c:new_label_fd
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1820-1835
   */
  newLabelFd(fd: FunctionDef): number {
    const label = fd.labelCount++
    const ls = new LabelSlot()
    ls.refCount = 0
    ls.pos = -1
    ls.pos2 = -1
    ls.addr = -1
    ls.firstReloc = null
    fd.labelSlots.push(ls)
    return label
  }

  /**
   * 创建新标签 (整数版本) - 对应 parser.c:new_label
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1837-1844
   */
  newLabelInt(fd: FunctionDef): number {
    return this.newLabelFd(fd)
  }

  /**
   * 发射原始标签 (不更新 last_opcode) - 对应 parser.c:emit_label_raw
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1847-1851
   */
  emitLabelRaw(fd: FunctionDef, label: number): void {
    this.emitU8(fd, TempOpcode.OP_label)
    this.emitU32(fd, label)
    fd.labelSlots[label].pos = fd.byteCode.size
  }

  /**
   * 发射标签 - 对应 parser.c:emit_label
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1854-1863
   * 
   * @returns 标签 ID 偏移量，如果标签无效返回 -1
   */
  emitLabelInt(fd: FunctionDef, label: number): number {
    if (label >= 0) {
      this.emitOp(fd, TempOpcode.OP_label)
      this.emitU32(fd, label)
      fd.labelSlots[label].pos = fd.byteCode.size
      return fd.byteCode.size - 4
    } else {
      return -1
    }
  }

  /**
   * 检查代码是否可达 (非死代码) - 简化版本
   * 
   * QuickJS 中使用 js_is_live_code 检查，这里简化为总是返回 true
   */
  isLiveCode(_fd: FunctionDef): boolean {
    // TODO: 实现更完整的死代码检测
    return true
  }

  /**
   * 发射跳转指令 (整数标签版本) - 对应 parser.c:emit_goto
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1866-1879
   * 
   * @returns 标签索引，如果是死代码返回 -1
   */
  emitGotoInt(fd: FunctionDef, opcode: number, label: number): number {

    if (this.isLiveCode(fd)) {
      if (label < 0) {
        label = this.newLabelInt(fd)
        if (label < 0) return -1
      }
      this.emitOp(fd, opcode)
      this.emitU32(fd, label)
      fd.labelSlots[label].refCount++
      
      // 增加跳转计数 - 对应 parser.c:s->jump_size++
      fd.jumpSize++

      return label
    }

    return -1
  }

  // ============================================================================
  // 常量池方法 - 对应 parser.c:1881-1922
  // ============================================================================

  /**
   * 添加常量到常量池 - 对应 parser.c:cpool_add
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1881-1892
   * 
   * @returns 常量池索引
   */
  cpoolAdd(fd: FunctionDef, val: any): number {
    const idx = fd.cpoolCount++
    fd.cpool.push(val)
    return idx
  }

  /**
   * 发射推送常量指令 - 对应 parser.c:emit_push_const
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1894-1920
   */
  emitPushConst(fd: FunctionDef, val: any, asAtom: boolean = false): number {
    // 如果是字符串且需要作为 atom
    if (typeof val === 'string' && asAtom) {
      const atom = this.getAtom(val)
      if (atom !== null && atom > 0) {
        this.emitOp(fd, Opcode.OP_push_atom_value)
        this.emitU32(fd, atom)
        this.emitIc(fd, atom)
        return 0
      }
    }

    const idx = this.cpoolAdd(fd, val)
    this.emitOp(fd, Opcode.OP_push_const)
    this.emitU32(fd, idx)
    return 0
  }

  // ============================================================================
  // 变量查找方法 - 对应 parser.c:1922-2000
  // ============================================================================

  /**
   * 查找参数 - 对应 parser.c:find_arg
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1925-1932
   * 
   * @returns 参数索引 + ARGUMENT_VAR_OFFSET，未找到返回 -1
   */
  findArg(fd: FunctionDef, name: number): number {
    for (let i = fd.argCount - 1; i >= 0; i--) {
      if (fd.args[i].varName === name) {
        return i | ARGUMENT_VAR_OFFSET
      }
    }
    return -1
  }

  /**
   * 查找变量 - 对应 parser.c:find_var
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1934-1942
   */
  findVarByAtom(fd: FunctionDef, name: number): number {
    for (let i = fd.varCount - 1; i >= 0; i--) {
      if (fd.vars[i].varName === name && fd.vars[i].scopeLevel === 0) {
        return i
      }
    }
    return this.findArg(fd, name)
  }

  /**
   * 在指定作用域中查找变量 - 对应 parser.c:find_var_in_scope
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1945-1956
   */
  findVarInScope(fd: FunctionDef, name: number, scopeLevel: number): number {
    for (let scopeIdx = fd.scopes[scopeLevel].first; scopeIdx >= 0; scopeIdx = fd.vars[scopeIdx].scopeNext) {
      if (fd.vars[scopeIdx].scopeLevel !== scopeLevel) {
        break
      }
      if (fd.vars[scopeIdx].varName === name) {
        return scopeIdx
      }
    }
    return -1
  }

  /**
   * 检查作用域是否为父作用域的子作用域 - 对应 parser.c:is_child_scope
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1960-1968
   */
  isChildScope(fd: FunctionDef, scope: number, parentScope: number): boolean {
    while (scope >= 0) {
      if (scope === parentScope) {
        return true
      }
      scope = fd.scopes[scope].parent
    }
    return false
  }

  /**
   * 查找全局变量 - 对应 parser.c:find_global_var
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1984-1992
   */
  findGlobalVar(fd: FunctionDef, name: number): JSGlobalVar | null {
    for (let i = 0; i < fd.globalVarCount; i++) {
      if (fd.globalVars[i].varName === name) {
        return fd.globalVars[i]
      }
    }
    return null
  }

  /**
   * 查找词法全局变量 - 对应 parser.c:find_lexical_global_var
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1994-2000
   */
  findLexicalGlobalVar(fd: FunctionDef, name: number): JSGlobalVar | null {
    const hf = this.findGlobalVar(fd, name)
    if (hf && hf.isLexical) {
      return hf
    }
    return null
  }

  /**
   * 查找词法声明 - 对应 parser.c:find_lexical_decl
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2002-2022
   */
  findLexicalDecl(fd: FunctionDef, name: number, scopeIdx: number, checkCatchVar: boolean): number {
    while (scopeIdx >= 0) {
      const vd = fd.vars[scopeIdx]
      if (vd.varName === name &&
          (vd.isLexical || (vd.varKind === JSVarKindEnum.JS_VAR_CATCH && checkCatchVar))) {
        return scopeIdx
      }
      scopeIdx = vd.scopeNext
    }

    // 检查全局词法变量
    if (fd.isEval && fd.evalType === JS_EVAL_TYPE_GLOBAL) {
      if (this.findLexicalGlobalVar(fd, name)) {
        return env.globalVarOffset
      }
    }
    return -1
  }

  // ============================================================================
  // 作用域管理方法 - 对应 parser.c:2024-2093
  // ============================================================================

  /**
   * 压入新作用域 - 对应 parser.c:push_scope
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2024-2065
   */
  pushScope(fd: FunctionDef): number {
    const scope = fd.scopeCount

    // 扩展 scopes 数组
    if ((fd.scopeCount + 1) > fd.scopeSize) {
      const newSize = Math.max(fd.scopeCount + 1, Math.floor(fd.scopeSize * 1.5))
      // 如果还在使用默认数组，需要复制
      if (fd.scopes === fd.defScopeArray) {
        fd.scopes = [...fd.defScopeArray]
      }
      fd.scopeSize = newSize
    }

    fd.scopeCount++
    
    // 确保 scopes 数组有足够空间
    while (fd.scopes.length < fd.scopeCount) {
      fd.scopes.push({ parent: -1, first: -1 })
    }

    fd.scopes[scope].parent = fd.scopeLevel
    fd.scopes[scope].first = fd.scopeFirst
    
    this.emitOp(fd, TempOpcode.OP_enter_scope)
    this.emitU16(fd, scope)
    
    fd.scopeLevel = scope
    return scope
  }

  /**
   * 获取第一个词法变量 - 对应 parser.c:get_first_lexical_var
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2067-2076
   */
  getFirstLexicalVar(fd: FunctionDef, scope: number): number {
    while (scope >= 0) {
      const scopeIdx = fd.scopes[scope].first
      if (scopeIdx >= 0) {
        return scopeIdx
      }
      scope = fd.scopes[scope].parent
    }
    return -1
  }

  /**
   * 弹出作用域 - 对应 parser.c:pop_scope
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2078-2087
   */
  popScope(fd: FunctionDef): void {
    const scope = fd.scopeLevel
    this.emitOp(fd, TempOpcode.OP_leave_scope)
    this.emitU16(fd, scope)
    fd.scopeLevel = fd.scopes[scope].parent
    fd.scopeFirst = this.getFirstLexicalVar(fd, fd.scopeLevel)
  }

  /**
   * 关闭多个作用域 - 对应 parser.c:close_scopes
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2089-2094
   */
  closeScopes(fd: FunctionDef, scope: number, scopeStop: number): void {
    while (scope > scopeStop) {
      this.emitOp(fd, TempOpcode.OP_leave_scope)
      this.emitU16(fd, scope)
      scope = fd.scopes[scope].parent
    }
  }

  // ============================================================================
  // 变量添加方法 - 对应 parser.c:2096-2205
  // ============================================================================

  /**
   * 添加变量 - 对应 parser.c:add_var
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2097-2115
   */
  addVar(fd: FunctionDef, name: number): number {
    // 检查局部变量数量限制
    if (fd.varCount >= JS_MAX_LOCAL_VARS) {
      throw new Error('too many local variables')
    }

    const vd = new JSVarDef()
    vd.varName = name
    vd.funcPoolIdx = -1
    
    fd.vars.push(vd)
    return fd.varCount++
  }

  /**
   * 添加作用域变量 - 对应 parser.c:add_scope_var
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2117-2130
   */
  addScopeVar(fd: FunctionDef, name: number, varKind: JSVarKindEnum): number {
    const idx = this.addVar(fd, name)
    if (idx >= 0) {
      const vd = fd.vars[idx]
      vd.varKind = varKind
      vd.scopeLevel = fd.scopeLevel
      vd.scopeNext = fd.scopeFirst
      fd.scopes[fd.scopeLevel].first = idx
      fd.scopeFirst = idx
    }
    return idx
  }

  /**
   * 添加函数变量 - 对应 parser.c:add_func_var
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2132-2142
   */
  addFuncVar(fd: FunctionDef, name: number): number {
    let idx = fd.funcVarIdx
    if (idx < 0) {
      idx = this.addVar(fd, name)
      if (idx >= 0) {
        fd.funcVarIdx = idx
        fd.vars[idx].varKind = JSVarKindEnum.JS_VAR_FUNCTION_NAME
        // 严格模式下，函数名是 const
        if (fd.jsMode & JSMode.JS_MODE_STRICT) {
          fd.vars[idx].isConst = true
        }
      }
    }
    return idx
  }

  /**
   * 添加 arguments 变量 - 对应 parser.c:add_arguments_var
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2144-2151
   */
  addArgumentsVar(fd: FunctionDef, argumentsAtom: number): number {
    let idx = fd.argumentsVarIdx
    if (idx < 0) {
      idx = this.addVar(fd, argumentsAtom)
      if (idx >= 0) {
        fd.argumentsVarIdx = idx
      }
    }
    return idx
  }

  /**
   * 添加参数作用域的 arguments - 对应 parser.c:add_arguments_arg
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2155-2175
   */
  addArgumentsArg(fd: FunctionDef, argumentsAtom: number): number {
    if (fd.argumentsArgIdx < 0) {
      let idx = this.findVarInScope(fd, argumentsAtom, ARG_SCOPE_INDEX)
      if (idx < 0) {
        idx = this.addVar(fd, argumentsAtom)
        if (idx < 0) return -1
        
        fd.vars[idx].scopeNext = fd.scopes[ARG_SCOPE_INDEX].first
        fd.scopes[ARG_SCOPE_INDEX].first = idx
        fd.vars[idx].scopeLevel = ARG_SCOPE_INDEX
        fd.vars[idx].isLexical = true
        
        fd.argumentsArgIdx = idx
      }
    }
    return 0
  }

  /**
   * 添加参数 - 对应 parser.c:add_arg
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2177-2193
   */
  addArg(fd: FunctionDef, name: number): number {
    // 检查参数数量限制
    if (fd.argCount >= JS_MAX_LOCAL_VARS) {
      throw new Error('too many arguments')
    }

    const vd = new JSVarDef()
    vd.varName = name
    vd.funcPoolIdx = -1
    // QuickJS add_arg() does `memset(vd, 0, sizeof(*vd))`, so scope_next
    // defaults to 0 (encoded as scopeNextPlus1=1 in bytecode). This matters
    // for byte-perfect vardef encoding.
    vd.scopeNext = 0
    
    fd.args.push(vd)
    return fd.argCount++
  }

  /**
   * 添加全局变量 - 对应 parser.c:add_global_var
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2196-2212
   */
  addGlobalVar(fd: FunctionDef, name: number): JSGlobalVar | null {
    const hf = new JSGlobalVar()
    hf.cpoolIdx = -1
    hf.forceInit = false
    hf.isLexical = false
    hf.isConst = false
    hf.scopeLevel = fd.scopeLevel
    hf.varName = name
    
    fd.globalVars.push(hf)
    fd.globalVarCount++
    return hf
  }

  // ============================================================================
  // 子函数管理方法
  // ============================================================================

  /**
   * 添加子函数到父函数
   */
  addChild(parent: FunctionDef, child: FunctionDef): number {
    child.parent = parent
    child.parentScopeLevel = parent.scopeLevel
    parent.childList.push(child)
    return parent.childList.length - 1
  }

  /**
   * 添加常量到常量池 (别名)
   */
  addConst(fd: FunctionDef, val: any): number {
    return this.cpoolAdd(fd, val)
  }

  /**
   * 设置 eval 返回值为 undefined - 对应 parser.c:6906-6912
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6906-6912
   * 
   * 在 if/while/do/for/switch/try 等控制流语句前调用，
   * 确保在控制流不执行表达式的情况下返回值是 undefined。
   */
  setEvalRetUndefined(fd: FunctionDef): void {
    if (fd.evalRetIdx >= 0) {
      this.emitOp(fd, Opcode.OP_undefined)
      this.emitOp(fd, Opcode.OP_put_loc)
      this.emitU16(fd, fd.evalRetIdx)
    }
  }

  /**
   * 发射 return 指令
   */
  emitReturn(fd: FunctionDef, hasVal: boolean, sourcePos?: number): void {
    // Mirror QuickJS: third_party/QuickJS/src/core/parser.c: emit_return()

    const isNonNormal = fd.funcKind !== JSFunctionKindEnum.JS_FUNC_NORMAL

    // For non-normal functions, QuickJS forces a value on the stack.
    // This ensures returning from (async/)generator uses OP_return_async.
    if (isNonNormal) {
      if (!hasVal) {
        this.emitOp(fd, Opcode.OP_undefined)
        hasVal = true
      } else if (fd.funcKind === JSFunctionKindEnum.JS_FUNC_ASYNC_GENERATOR) {
        // In async generators, the first await must happen before finally handling.
        this.emitOp(fd, Opcode.OP_await)
      }
    }

    // Derived class constructor return handling.
    // QuickJS: emit_return() special-cases derived constructors so `this` can be
    // accessed only when returning a non-object value.
    if (fd.isDerivedClassConstructor) {
      let labelReturn = -1
      if (hasVal) {
        this.emitOp(fd, Opcode.OP_check_ctor_return)
        labelReturn = this.newLabelInt(fd)
        this.emitGotoInt(fd, Opcode.OP_if_false, labelReturn)
        this.emitOp(fd, Opcode.OP_drop)
      }

      this.emitOp(fd, TempOpcode.OP_scope_get_var_checkthis)
      this.emitAtom(fd, JSAtom.JS_ATOM_this)
      this.emitU16(fd, 0)

      if (labelReturn !== -1) {
        this.emitLabelInt(fd, labelReturn)
      }

      this.emitOp(fd, Opcode.OP_return, sourcePos)
      return
    }

    if (isNonNormal) {
      // At this point, we must return via OP_return_async.
      if (!hasVal) {
        this.emitOp(fd, Opcode.OP_undefined)
      } else if (fd.funcKind === JSFunctionKindEnum.JS_FUNC_ASYNC_GENERATOR) {
        // Async generators await the returned value again just before return.
        this.emitOp(fd, Opcode.OP_await)
      }
      this.emitOp(fd, Opcode.OP_return_async, sourcePos)
      return
    }

    // Normal function.
    if (hasVal) {
      this.emitOp(fd, Opcode.OP_return, sourcePos)
    } else {
      this.emitOp(fd, Opcode.OP_return_undef, sourcePos)
    }
  }

  /**
   * 写入 Atom 到输出缓冲区
   */
  putAtom(out: BytecodeBuilder, atomId: number): void {
    out.putU32(atomId)
  }

  /**
   * 创建 Label 对象 (用于旧式跳转管理)
   */
  newLabel(fd: FunctionDef): Label {
    const label = new Label()
    label.fd = fd
    return label
  }

  /**
   * 标记 Label 位置
   */
  markLabel(fd: FunctionDef, label: Label): void {
    label.addr = fd.byteCode.size
    // 回填所有待处理的跳转
    for (const jump of label.jumps) {
      const offset = label.addr - (jump.pos + jump.size)
      if (jump.size === 4) {
        fd.byteCode.putU32At(jump.pos, offset)
      }
    }
    label.jumps = []
  }

  /**
   * 在指定偏移处标记 Label
   */
  markLabelAt(_fd: FunctionDef, label: Label, offset: number): void {
    label.addr = offset
  }

  /**
   * 发射跳转到 Label
   */
  emitJump(fd: FunctionDef, op: number, label: Label): void {
    this.emitOp(fd, op)
    const pos = fd.byteCode.size
    this.emitU32(fd, 0) // placeholder
    
    // 增加跳转计数 - 对应 parser.c:s->jump_size++
    fd.jumpSize++
    
    if (label.addr >= 0) {
      // Label 已定义，直接计算偏移
      const offset = label.addr - (pos + 4)
      fd.byteCode.putU32At(pos, offset)
    } else {
      // Label 未定义，记录待回填
      label.jumps.push({ fd, pos, size: 4 })
    }
  }

  // ============================================================================
  // 阶段 3: 变量定义方法 - 对应 parser.c:2217-2360
  // ============================================================================

  /**
   * 在子作用域中查找变量 - 对应 parser.c:find_var_in_child_scope
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:1970-1982
   */
  findVarInChildScope(fd: FunctionDef, name: number, scopeLevel: number): number {
    for (let i = 0; i < fd.varCount; i++) {
      const vd = fd.vars[i]
      if (vd.varName === name && vd.scopeLevel === 0) {
        if (this.isChildScope(fd, vd.scopeNext, scopeLevel)) {
          return i
        }
      }
    }
    return -1
  }

  /**
   * 定义变量 - 对应 parser.c:define_var
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2217-2360
   * 
   * 这是 QuickJS 中最核心的变量定义函数，处理所有类型的变量声明
   */
  defineVar(fd: FunctionDef, name: number, varDefType: JSVarDefEnum): number {
    let idx: number

    switch (varDefType) {
      case JSVarDefEnum.JS_VAR_DEF_WITH:
        idx = this.addScopeVar(fd, name, JSVarKindEnum.JS_VAR_NORMAL)
        break

      case JSVarDefEnum.JS_VAR_DEF_LET:
      case JSVarDefEnum.JS_VAR_DEF_CONST:
      case JSVarDefEnum.JS_VAR_DEF_FUNCTION_DECL:
      case JSVarDefEnum.JS_VAR_DEF_NEW_FUNCTION_DECL:
        // 检查词法声明是否重复
        idx = this.findLexicalDecl(fd, name, fd.scopeFirst, true)
        if (idx >= 0) {
          if (idx < env.globalVarOffset) {
            if (fd.vars[idx].scopeLevel === fd.scopeLevel) {
              // 同一作用域: 非严格模式下函数可以重定义 (annex B.3.3.4)
              if (!((fd.jsMode & JSMode.JS_MODE_STRICT) === 0 &&  // !JS_MODE_STRICT
                    varDefType === JSVarDefEnum.JS_VAR_DEF_FUNCTION_DECL &&
                    fd.vars[idx].varKind === JSVarKindEnum.JS_VAR_FUNCTION_DECL)) {
                throw new Error('invalid redefinition of lexical identifier')
              }
            } else if (fd.vars[idx].varKind === JSVarKindEnum.JS_VAR_CATCH &&
                       (fd.vars[idx].scopeLevel + 2) === fd.scopeLevel) {
              throw new Error('invalid redefinition of lexical identifier')
            }
          } else {
            if (fd.scopeLevel === fd.bodyScope) {
              throw new Error('invalid redefinition of lexical identifier')
            }
          }
        }

        // 检查是否重定义参数名
        if (varDefType !== JSVarDefEnum.JS_VAR_DEF_FUNCTION_DECL &&
            varDefType !== JSVarDefEnum.JS_VAR_DEF_NEW_FUNCTION_DECL &&
            fd.scopeLevel === fd.bodyScope && 
            this.findArg(fd, name) >= 0) {
          throw new Error('invalid redefinition of parameter name')
        }

        // 检查子作用域中是否有同名变量
        if (this.findVarInChildScope(fd, name, fd.scopeLevel) >= 0) {
          throw new Error('invalid redefinition of a variable')
        }

        // 检查全局变量冲突
        if (fd.isGlobalVar) {
          const hf = this.findGlobalVar(fd, name)
          if (hf && this.isChildScope(fd, hf.scopeLevel, fd.scopeLevel)) {
            throw new Error('invalid redefinition of global identifier')
          }
        }

        // eval 全局/模块作用域的特殊处理
        if (fd.isEval &&
            (fd.evalType === JS_EVAL_TYPE_GLOBAL ||
             fd.evalType === JS_EVAL_TYPE_MODULE) &&
            fd.scopeLevel === fd.bodyScope) {
          const hf = this.addGlobalVar(fd, name)
          if (!hf) return -1
          hf.isLexical = true
          hf.isConst = (varDefType === JSVarDefEnum.JS_VAR_DEF_CONST)
          idx = env.globalVarOffset
        } else {
          let varKind: JSVarKindEnum
          if (varDefType === JSVarDefEnum.JS_VAR_DEF_FUNCTION_DECL) {
            varKind = JSVarKindEnum.JS_VAR_FUNCTION_DECL
          } else if (varDefType === JSVarDefEnum.JS_VAR_DEF_NEW_FUNCTION_DECL) {
            varKind = JSVarKindEnum.JS_VAR_NEW_FUNCTION_DECL
          } else {
            varKind = JSVarKindEnum.JS_VAR_NORMAL
          }
          idx = this.addScopeVar(fd, name, varKind)
          if (idx >= 0) {
            const vd = fd.vars[idx]
            vd.isLexical = true
            vd.isConst = (varDefType === JSVarDefEnum.JS_VAR_DEF_CONST)
          }
        }
        break

      case JSVarDefEnum.JS_VAR_DEF_CATCH:
        idx = this.addScopeVar(fd, name, JSVarKindEnum.JS_VAR_CATCH)
        break

      case JSVarDefEnum.JS_VAR_DEF_VAR:
        // 检查是否与词法变量冲突
        if (this.findLexicalDecl(fd, name, fd.scopeFirst, false) >= 0) {
          throw new Error('invalid redefinition of lexical identifier')
        }

        if (fd.isGlobalVar) {
          const hf = this.findGlobalVar(fd, name)
          if (hf && hf.isLexical && hf.scopeLevel === fd.scopeLevel &&
              fd.evalType === JS_EVAL_TYPE_MODULE) {
            throw new Error('invalid redefinition of lexical identifier')
          }
          const newHf = this.addGlobalVar(fd, name)
          if (!newHf) return -1
          idx = env.globalVarOffset
        } else {
          // 如果变量已存在，不再添加
          idx = this.findVarByAtom(fd, name)
          if (idx >= 0) break
          
          idx = this.addVar(fd, name)
          if (idx >= 0) {
            // 对于 arguments 变量的特殊处理
            if (name === JSAtom.JS_ATOM_arguments && fd.hasArgumentsBinding) {
              fd.argumentsVarIdx = idx
            }
            fd.vars[idx].scopeNext = fd.scopeLevel
          }
        }
        break

      default:
        throw new Error('Invalid var_def_type')
    }

    return idx
  }

  /**
   * 添加私有类字段 - 对应 parser.c:add_private_class_field
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2363-2378
   */
  addPrivateClassField(fd: FunctionDef, name: number, varKind: JSVarKindEnum, isStatic: boolean): number {
    const idx = this.addScopeVar(fd, name, varKind)
    if (idx < 0) return idx
    
    const vd = fd.vars[idx]
    vd.isLexical = true
    vd.isConst = true
    vd.isStaticPrivate = isStatic
    return idx
  }

  // ============================================================================
  // 阶段 3: 闭包变量方法 - 对应 parser.c:8812-8900
  // ============================================================================

  /**
   * 添加闭包变量 - 对应 parser.c:add_closure_var
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:8812-8848
   */
  addClosureVar(
    fd: FunctionDef,
    isLocal: boolean,
    isArg: boolean,
    varIdx: number,
    varName: number,
    isConst: boolean,
    isLexical: boolean,
    varKind: JSVarKindEnum
  ): number {
    // 闭包变量索引使用 16 位存储
    if (fd.closureVarCount >= JS_MAX_LOCAL_VARS) {
      throw new Error('too many closure variables')
    }

    const cv = new JSClosureVar()
    cv.isLocal = isLocal
    cv.isArg = isArg
    cv.isConst = isConst
    cv.isLexical = isLexical
    cv.varKind = varKind
    cv.varIdx = varIdx
    cv.varName = varName
    
    fd.closureVar.push(cv)
    return fd.closureVarCount++
  }

  /**
   * 查找闭包变量 - 对应 parser.c:find_closure_var
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:8850-8858
   */
  findClosureVar(fd: FunctionDef, varName: number): number {
    for (let i = 0; i < fd.closureVarCount; i++) {
      if (fd.closureVar[i].varName === varName) {
        return i
      }
    }
    return -1
  }

  /**
   * 获取闭包变量 (递归版本) - 对应 parser.c:get_closure_var2
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:8863-8900
   * 
   * 'fd' 必须是 's' 的父函数。在 's' 中创建一个闭包引用
   * 引用 'fd' 中的局部变量 (isLocal = true) 或闭包 (isLocal = false)
   */
  getClosureVar2(
    s: FunctionDef,
    fd: FunctionDef,
    isLocal: boolean,
    isArg: boolean,
    varIdx: number,
    varName: number,
    isConst: boolean,
    isLexical: boolean,
    varKind: JSVarKindEnum
  ): number {
    // 如果 fd 不是 s 的直接父函数，需要递归
    if (fd !== s.parent) {
      if (!s.parent) {
        throw new Error('Invalid parent function')
      }
      varIdx = this.getClosureVar2(
        s.parent,
        fd,
        isLocal,
        isArg,
        varIdx,
        varName,
        isConst,
        isLexical,
        varKind
      )
      if (varIdx < 0) return -1
      isLocal = false
    }

    // 检查是否已存在相同的闭包变量
    for (let i = 0; i < s.closureVarCount; i++) {
      const cv = s.closureVar[i]
      if (cv.varIdx === varIdx && cv.isArg === isArg && cv.isLocal === isLocal) {
        return i
      }
    }

    // 添加新的闭包变量
    return this.addClosureVar(
      s,
      isLocal,
      isArg,
      varIdx,
      varName,
      isConst,
      isLexical,
      varKind
    )
  }

  /**
   * 获取闭包变量 - 对应 parser.c:get_closure_var
   * 
   * 简化版本，从父函数获取闭包变量
   */
  getClosureVar(
    s: FunctionDef,
    fd: FunctionDef,
    isLocal: boolean,
    isArg: boolean,
    varIdx: number,
    varName: number,
    isConst: boolean,
    isLexical: boolean,
    varKind: JSVarKindEnum
  ): number {
    return this.getClosureVar2(s, fd, isLocal, isArg, varIdx, varName, isConst, isLexical, varKind)
  }

  // ============================================================================
  // 阶段 3: Break/Continue 管理方法 - 对应 parser.c:6309-6380
  // ============================================================================

  /**
   * 压入 break 条目 - 对应 parser.c:push_break_entry
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6309-6326
   */
  pushBreakEntry(
    fd: FunctionDef,
    be: BlockEnv,
    labelName: number,
    labelBreak: number,
    labelCont: number,
    dropCount: number
  ): void {
    be.prev = fd.topBreak
    fd.topBreak = be
    be.labelName = labelName
    be.labelBreak = labelBreak
    be.labelCont = labelCont
    be.dropCount = dropCount
    be.labelFinally = -1
    be.scopeLevel = fd.scopeLevel
    be.hasIterator = false
    be.isRegularStmt = false
  }

  /**
   * 弹出 break 条目 - 对应 parser.c:pop_break_entry
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6328-6332
   */
  popBreakEntry(fd: FunctionDef): void {
    const be = fd.topBreak
    if (be) {
      fd.topBreak = be.prev
    }
  }

  /**
   * 发射 break/continue - 对应 parser.c:emit_break
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6334-6380
   * 
   * @param fd 函数定义
   * @param name 标签名 (0 表示 JS_ATOM_NULL)
   * @param isCont true 表示 continue，false 表示 break
   */
  emitBreak(fd: FunctionDef, name: number, isCont: boolean): void {
    let scopeLevel = fd.scopeLevel
    let top = fd.topBreak

    while (top !== null) {
      // 关闭作用域
      this.closeScopes(fd, scopeLevel, top.scopeLevel)
      scopeLevel = top.scopeLevel

      // continue: 查找匹配的循环
      if (isCont && top.labelCont !== -1 &&
          (name === 0 || top.labelName === name)) {
        this.emitGotoInt(fd, Opcode.OP_goto, top.labelCont)
        return
      }

      // break: 查找匹配的循环或 switch
      if (!isCont && top.labelBreak !== -1 &&
          ((name === 0 && !top.isRegularStmt) ||
           top.labelName === name)) {
        this.emitGotoInt(fd, Opcode.OP_goto, top.labelBreak)
        return
      }

      // 处理迭代器和栈清理
      let i = 0
      if (top.hasIterator) {
        this.emitOp(fd, Opcode.OP_iterator_close)
        i += 3
      }
      for (; i < top.dropCount; i++) {
        this.emitOp(fd, Opcode.OP_drop)
      }

      // 处理 finally
      if (top.labelFinally !== -1) {
        this.emitOp(fd, Opcode.OP_undefined)
        this.emitGotoInt(fd, Opcode.OP_gosub, top.labelFinally)
        this.emitOp(fd, Opcode.OP_drop)
      }

      top = top.prev
    }

    // 错误: 找不到匹配的循环或标签
    if (name === 0) {
      if (isCont) {
        throw new Error('continue must be inside loop')
      } else {
        throw new Error('break must be inside loop or switch')
      }
    } else {
      throw new Error('break/continue label not found')
    }
  }

  /**
   * 执行 finally 块后返回 - 对应 parser.c:emit_return
   * 
   * 注意: 这是增强版的 return，处理 finally 块
   */
  emitReturnWithFinally(fd: FunctionDef, hasReturnValue: boolean): void {
    let scopeLevel = fd.scopeLevel
    let top = fd.topBreak

    while (top !== null) {
      // 关闭作用域
      this.closeScopes(fd, scopeLevel, top.scopeLevel)
      scopeLevel = top.scopeLevel

      // 处理迭代器和栈清理
      let i = 0
      if (top.hasIterator) {
        // 使用 OP_iterator_close 加额外参数表示 return 模式
        this.emitOp(fd, Opcode.OP_iterator_close)
        i += 3
      }
      for (; i < top.dropCount; i++) {
        this.emitOp(fd, Opcode.OP_drop)
      }

      // 处理 finally
      if (top.labelFinally !== -1) {
        // 保存返回值，执行 finally，然后恢复
        if (hasReturnValue) {
          this.emitOp(fd, Opcode.OP_nip) // 保存返回值
        }
        this.emitGotoInt(fd, Opcode.OP_gosub, top.labelFinally)
        if (hasReturnValue) {
          this.emitOp(fd, Opcode.OP_drop)
        }
      }

      top = top.prev
    }

    // 关闭到函数作用域
    this.closeScopes(fd, scopeLevel, 0)
    
    // 发射 return
    this.emitReturn(fd, hasReturnValue)
  }


  
  
}
