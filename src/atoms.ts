import { BufferWriter } from './buffer'

// QuickJS 预定义原子枚举，与 quickjs-atom.h 完全对齐
// Note: first atoms are considered as keywords in the parser
export enum JSAtom {
  JS_ATOM_NULL = 0,
  
  // Keywords - must be first (per QuickJS comment)
  JS_ATOM_null,           // "null" - must be first
  JS_ATOM_false,          // "false"
  JS_ATOM_true,           // "true"
  JS_ATOM_if,             // "if"
  JS_ATOM_else,           // "else"
  JS_ATOM_return,         // "return"
  JS_ATOM_var,            // "var"
  JS_ATOM_this,           // "this"
  JS_ATOM_delete,         // "delete"
  JS_ATOM_void,           // "void"
  JS_ATOM_typeof,         // "typeof"
  JS_ATOM_new,            // "new"
  JS_ATOM_in,             // "in"
  JS_ATOM_instanceof,     // "instanceof"
  JS_ATOM_do,             // "do"
  JS_ATOM_while,          // "while"
  JS_ATOM_for,            // "for"
  JS_ATOM_break,          // "break"
  JS_ATOM_continue,       // "continue"
  JS_ATOM_switch,         // "switch"
  JS_ATOM_case,           // "case"
  JS_ATOM_default,        // "default"
  JS_ATOM_throw,          // "throw"
  JS_ATOM_try,            // "try"
  JS_ATOM_catch,          // "catch"
  JS_ATOM_finally,        // "finally"
  JS_ATOM_function,       // "function"
  JS_ATOM_debugger,       // "debugger"
  JS_ATOM_with,           // "with"
  
  // FutureReservedWord
  JS_ATOM_class,          // "class"
  JS_ATOM_const,          // "const"
  JS_ATOM_enum,           // "enum"
  JS_ATOM_export,         // "export"
  JS_ATOM_extends,        // "extends"
  JS_ATOM_import,         // "import"
  JS_ATOM_super,          // "super"
  
  // FutureReservedWords when parsing strict mode code
  JS_ATOM_implements,     // "implements"
  JS_ATOM_interface,      // "interface"
  JS_ATOM_let,            // "let"
  JS_ATOM_package,        // "package"
  JS_ATOM_private,        // "private"
  JS_ATOM_protected,      // "protected"
  JS_ATOM_public,         // "public"
  JS_ATOM_static,         // "static"
  JS_ATOM_yield,          // "yield"
  JS_ATOM_await,          // "await"

  // empty string
  JS_ATOM_empty_string,   // ""
  
  // identifiers
  JS_ATOM_length,         // "length"
  JS_ATOM_fileName,       // "fileName"
  JS_ATOM_lineNumber,     // "lineNumber"
  JS_ATOM_columnNumber,   // "columnNumber"
  JS_ATOM_message,        // "message"
  JS_ATOM_cause,          // "cause"
  JS_ATOM_errors,         // "errors"
  JS_ATOM_stack,          // "stack"
  JS_ATOM_name,           // "name"
  JS_ATOM_toString,       // "toString"
  JS_ATOM_toLocaleString, // "toLocaleString"
  JS_ATOM_valueOf,        // "valueOf"
  JS_ATOM_eval,           // "eval"
  JS_ATOM_prototype,      // "prototype"
  JS_ATOM_constructor,    // "constructor"
  JS_ATOM_configurable,  // "configurable"
  JS_ATOM_writable,       // "writable"
  JS_ATOM_enumerable,     // "enumerable"
  JS_ATOM_value,          // "value"
  JS_ATOM_get,            // "get"
  JS_ATOM_set,            // "set"
  JS_ATOM_of,             // "of"
  JS_ATOM___proto__,      // "__proto__"
  JS_ATOM_undefined,      // "undefined"
  JS_ATOM_number,         // "number"
  JS_ATOM_boolean,        // "boolean"
  JS_ATOM_string,         // "string"
  JS_ATOM_object,         // "object"
  JS_ATOM_symbol,         // "symbol"
  JS_ATOM_integer,        // "integer"
  JS_ATOM_unknown,        // "unknown"
  JS_ATOM_arguments,      // "arguments"
  JS_ATOM_callee,         // "callee"
  JS_ATOM_caller,         // "caller"
  JS_ATOM__eval_,         // "<eval>"
  JS_ATOM__ret_,          // "<ret>"
  JS_ATOM__var_,          // "<var>"
  JS_ATOM__arg_var_,      // "<arg_var>"
  JS_ATOM__with_,         // "<with>"
  JS_ATOM_lastIndex,      // "lastIndex"
  JS_ATOM_target,         // "target"
  JS_ATOM_index,          // "index"
  JS_ATOM_input,          // "input"
  JS_ATOM_defineProperties, // "defineProperties"
  JS_ATOM_apply,          // "apply"
  JS_ATOM_join,           // "join"
  JS_ATOM_concat,         // "concat"
  JS_ATOM_split,          // "split"
  JS_ATOM_construct,      // "construct"
  JS_ATOM_getPrototypeOf, // "getPrototypeOf"
  JS_ATOM_setPrototypeOf, // "setPrototypeOf"
  JS_ATOM_isExtensible,   // "isExtensible"
  JS_ATOM_preventExtensions, // "preventExtensions"
  JS_ATOM_has,            // "has"
  JS_ATOM_deleteProperty, // "deleteProperty"
  JS_ATOM_defineProperty, // "defineProperty"
  JS_ATOM_getOwnPropertyDescriptor, // "getOwnPropertyDescriptor"
  JS_ATOM_ownKeys,        // "ownKeys"
  JS_ATOM_add,            // "add"
  JS_ATOM_done,           // "done"
  JS_ATOM_next,           // "next"
  JS_ATOM_values,         // "values"
  JS_ATOM_source,         // "source"
  JS_ATOM_flags,          // "flags"
  JS_ATOM_global,         // "global"
  JS_ATOM_unicode,        // "unicode"
  JS_ATOM_raw,            // "raw"
  JS_ATOM_new_target,     // "new.target"
  JS_ATOM_this_active_func, // "this.active_func"
  JS_ATOM_home_object,    // "<home_object>"
  JS_ATOM_computed_field, // "<computed_field>"
  JS_ATOM_static_computed_field, // "<static_computed_field>"
  JS_ATOM_class_fields_init, // "<class_fields_init>"
  JS_ATOM_brand,          // "<brand>"
  JS_ATOM_hash_constructor, // "#constructor"
  JS_ATOM_as,             // "as"
  JS_ATOM_from,           // "from"
  JS_ATOM_meta,           // "meta"
  JS_ATOM__default_,      // "*default*"
  JS_ATOM__star_,         // "*"
  JS_ATOM_Module,         // "Module"
  JS_ATOM_then,           // "then"
  JS_ATOM_resolve,        // "resolve"
  JS_ATOM_reject,         // "reject"
  JS_ATOM_promise,        // "promise"
  JS_ATOM_proxy,          // "proxy"
  JS_ATOM_revoke,         // "revoke"
  JS_ATOM_async,          // "async"
  JS_ATOM_exec,           // "exec"
  JS_ATOM_groups,         // "groups"
  JS_ATOM_indices,        // "indices"
  JS_ATOM_status,         // "status"
  JS_ATOM_reason,         // "reason"
  JS_ATOM_globalThis,     // "globalThis"
  JS_ATOM_bigint,         // "bigint"
  JS_ATOM_minus_zero,     // "-0"
  JS_ATOM_Infinity,       // "Infinity"
  JS_ATOM_minus_Infinity, // "-Infinity"
  JS_ATOM_NaN,            // "NaN"
  JS_ATOM_hasIndices,     // "hasIndices"
  JS_ATOM_ignoreCase,     // "ignoreCase"
  JS_ATOM_multiline,      // "multiline"
  JS_ATOM_dotAll,         // "dotAll"
  JS_ATOM_sticky,         // "sticky"
  JS_ATOM_unicodeSets,    // "unicodeSets"
  
  // the following 3 atoms are only used with CONFIG_ATOMICS
  JS_ATOM_not_equal,      // "not-equal"
  JS_ATOM_timed_out,      // "timed-out"
  JS_ATOM_ok,             // "ok"
  
  JS_ATOM_toJSON,         // "toJSON"
  
  // class names
  JS_ATOM_Object,         // "Object"
  JS_ATOM_Array,          // "Array"
  JS_ATOM_Error,          // "Error"
  JS_ATOM_Number,         // "Number"
  JS_ATOM_String,         // "String"
  JS_ATOM_Boolean,        // "Boolean"
  JS_ATOM_Symbol,         // "Symbol"
  JS_ATOM_Arguments,      // "Arguments"
  JS_ATOM_Math,           // "Math"
  JS_ATOM_JSON,           // "JSON"
  JS_ATOM_Date,           // "Date"
  JS_ATOM_Function,       // "Function"
  JS_ATOM_GeneratorFunction, // "GeneratorFunction"
  JS_ATOM_ForInIterator,  // "ForInIterator"
  JS_ATOM_RegExp,         // "RegExp"
  JS_ATOM_ArrayBuffer,    // "ArrayBuffer"
  JS_ATOM_SharedArrayBuffer, // "SharedArrayBuffer"
  
  // must keep same order as class IDs for typed arrays
  JS_ATOM_Uint8ClampedArray, // "Uint8ClampedArray"
  JS_ATOM_Int8Array,      // "Int8Array"
  JS_ATOM_Uint8Array,     // "Uint8Array"
  JS_ATOM_Int16Array,     // "Int16Array"
  JS_ATOM_Uint16Array,    // "Uint16Array"
  JS_ATOM_Int32Array,     // "Int32Array"
  JS_ATOM_Uint32Array,    // "Uint32Array"
  JS_ATOM_BigInt64Array,  // "BigInt64Array"
  JS_ATOM_BigUint64Array, // "BigUint64Array"
  JS_ATOM_Float16Array,   // "Float16Array"
  JS_ATOM_Float32Array,   // "Float32Array"
  JS_ATOM_Float64Array,   // "Float64Array"
  JS_ATOM_DataView,       // "DataView"
  JS_ATOM_BigInt,         // "BigInt"
  JS_ATOM_WeakRef,        // "WeakRef"
  JS_ATOM_FinalizationRegistry, // "FinalizationRegistry"
  JS_ATOM_Map,            // "Map"
  JS_ATOM_Set,            // "Set" /* Map + 1 */
  JS_ATOM_WeakMap,        // "WeakMap" /* Map + 2 */
  JS_ATOM_WeakSet,        // "WeakSet" /* Map + 3 */
  JS_ATOM_Map_Iterator,   // "Map Iterator"
  JS_ATOM_Set_Iterator,   // "Set Iterator"
  JS_ATOM_Array_Iterator, // "Array Iterator"
  JS_ATOM_String_Iterator, // "String Iterator"
  JS_ATOM_RegExp_String_Iterator, // "RegExp String Iterator"
  JS_ATOM_Generator,      // "Generator"
  JS_ATOM_Proxy,          // "Proxy"
  JS_ATOM_Promise,        // "Promise"
  JS_ATOM_PromiseResolveFunction, // "PromiseResolveFunction"
  JS_ATOM_PromiseRejectFunction, // "PromiseRejectFunction"
  JS_ATOM_AsyncFunction,  // "AsyncFunction"
  JS_ATOM_AsyncFunctionResolve, // "AsyncFunctionResolve"
  JS_ATOM_AsyncFunctionReject, // "AsyncFunctionReject"
  JS_ATOM_AsyncGeneratorFunction, // "AsyncGeneratorFunction"
  JS_ATOM_AsyncGenerator, // "AsyncGenerator"
  JS_ATOM_EvalError,      // "EvalError"
  JS_ATOM_RangeError,     // "RangeError"
  JS_ATOM_ReferenceError, // "ReferenceError"
  JS_ATOM_SyntaxError,    // "SyntaxError"
  JS_ATOM_TypeError,      // "TypeError"
  JS_ATOM_URIError,       // "URIError"
  JS_ATOM_InternalError,  // "InternalError"
  
  // private symbols
  JS_ATOM_Private_brand,  // "<brand>"
  
  // symbols
  JS_ATOM_Symbol_toPrimitive, // "Symbol.toPrimitive"
  JS_ATOM_Symbol_iterator, // "Symbol.iterator"
  JS_ATOM_Symbol_match,   // "Symbol.match"
  JS_ATOM_Symbol_matchAll, // "Symbol.matchAll"
  JS_ATOM_Symbol_replace, // "Symbol.replace"
  JS_ATOM_Symbol_search,  // "Symbol.search"
  JS_ATOM_Symbol_split,   // "Symbol.split"
  JS_ATOM_Symbol_toStringTag, // "Symbol.toStringTag"
  JS_ATOM_Symbol_isConcatSpreadable, // "Symbol.isConcatSpreadable"
  JS_ATOM_Symbol_hasInstance, // "Symbol.hasInstance"
  JS_ATOM_Symbol_species, // "Symbol.species"
  JS_ATOM_Symbol_unscopables, // "Symbol.unscopables"
  JS_ATOM_Symbol_asyncIterator, // "Symbol.asyncIterator"
}

export class AtomTable {
  private table = new Map<string, number>()
  private list: string[] = []

  constructor() {
    // 初始化预定义原子，与 QuickJS 顺序完全对齐
    this.addPredefined('null', JSAtom.JS_ATOM_null)
    this.addPredefined('false', JSAtom.JS_ATOM_false)
    this.addPredefined('true', JSAtom.JS_ATOM_true)
    this.addPredefined('if', JSAtom.JS_ATOM_if)
    this.addPredefined('else', JSAtom.JS_ATOM_else)
    this.addPredefined('return', JSAtom.JS_ATOM_return)
    this.addPredefined('var', JSAtom.JS_ATOM_var)
    this.addPredefined('this', JSAtom.JS_ATOM_this)
    this.addPredefined('delete', JSAtom.JS_ATOM_delete)
    this.addPredefined('void', JSAtom.JS_ATOM_void)
    this.addPredefined('typeof', JSAtom.JS_ATOM_typeof)
    this.addPredefined('new', JSAtom.JS_ATOM_new)
    this.addPredefined('in', JSAtom.JS_ATOM_in)
    this.addPredefined('instanceof', JSAtom.JS_ATOM_instanceof)
    this.addPredefined('do', JSAtom.JS_ATOM_do)
    this.addPredefined('while', JSAtom.JS_ATOM_while)
    this.addPredefined('for', JSAtom.JS_ATOM_for)
    this.addPredefined('break', JSAtom.JS_ATOM_break)
    this.addPredefined('continue', JSAtom.JS_ATOM_continue)
    this.addPredefined('switch', JSAtom.JS_ATOM_switch)
    this.addPredefined('case', JSAtom.JS_ATOM_case)
    this.addPredefined('default', JSAtom.JS_ATOM_default)
    this.addPredefined('throw', JSAtom.JS_ATOM_throw)
    this.addPredefined('try', JSAtom.JS_ATOM_try)
    this.addPredefined('catch', JSAtom.JS_ATOM_catch)
    this.addPredefined('finally', JSAtom.JS_ATOM_finally)
    this.addPredefined('function', JSAtom.JS_ATOM_function)
    this.addPredefined('debugger', JSAtom.JS_ATOM_debugger)
    this.addPredefined('with', JSAtom.JS_ATOM_with)
    this.addPredefined('class', JSAtom.JS_ATOM_class)
    this.addPredefined('const', JSAtom.JS_ATOM_const)
    this.addPredefined('enum', JSAtom.JS_ATOM_enum)
    this.addPredefined('export', JSAtom.JS_ATOM_export)
    this.addPredefined('extends', JSAtom.JS_ATOM_extends)
    this.addPredefined('import', JSAtom.JS_ATOM_import)
    this.addPredefined('super', JSAtom.JS_ATOM_super)
    this.addPredefined('implements', JSAtom.JS_ATOM_implements)
    this.addPredefined('interface', JSAtom.JS_ATOM_interface)
    this.addPredefined('let', JSAtom.JS_ATOM_let)
    this.addPredefined('package', JSAtom.JS_ATOM_package)
    this.addPredefined('private', JSAtom.JS_ATOM_private)
    this.addPredefined('protected', JSAtom.JS_ATOM_protected)
    this.addPredefined('public', JSAtom.JS_ATOM_public)
    this.addPredefined('static', JSAtom.JS_ATOM_static)
    this.addPredefined('yield', JSAtom.JS_ATOM_yield)
    this.addPredefined('await', JSAtom.JS_ATOM_await)
    
    // empty string
    this.addPredefined('', JSAtom.JS_ATOM_empty_string)
    
    // identifiers
    this.addPredefined('length', JSAtom.JS_ATOM_length)
    this.addPredefined('fileName', JSAtom.JS_ATOM_fileName)
    this.addPredefined('lineNumber', JSAtom.JS_ATOM_lineNumber)
    this.addPredefined('columnNumber', JSAtom.JS_ATOM_columnNumber)
    this.addPredefined('message', JSAtom.JS_ATOM_message)
    this.addPredefined('cause', JSAtom.JS_ATOM_cause)
    this.addPredefined('errors', JSAtom.JS_ATOM_errors)
    this.addPredefined('stack', JSAtom.JS_ATOM_stack)
    this.addPredefined('name', JSAtom.JS_ATOM_name)
    this.addPredefined('toString', JSAtom.JS_ATOM_toString)
    this.addPredefined('toLocaleString', JSAtom.JS_ATOM_toLocaleString)
    this.addPredefined('valueOf', JSAtom.JS_ATOM_valueOf)
    this.addPredefined('eval', JSAtom.JS_ATOM_eval)
    this.addPredefined('prototype', JSAtom.JS_ATOM_prototype)
    this.addPredefined('constructor', JSAtom.JS_ATOM_constructor)
    this.addPredefined('configurable', JSAtom.JS_ATOM_configurable)
    this.addPredefined('writable', JSAtom.JS_ATOM_writable)
    this.addPredefined('enumerable', JSAtom.JS_ATOM_enumerable)
    this.addPredefined('value', JSAtom.JS_ATOM_value)
    this.addPredefined('get', JSAtom.JS_ATOM_get)
    this.addPredefined('set', JSAtom.JS_ATOM_set)
    this.addPredefined('of', JSAtom.JS_ATOM_of)
    this.addPredefined('__proto__', JSAtom.JS_ATOM___proto__)
    this.addPredefined('undefined', JSAtom.JS_ATOM_undefined)
    this.addPredefined('number', JSAtom.JS_ATOM_number)
    this.addPredefined('boolean', JSAtom.JS_ATOM_boolean)
    this.addPredefined('string', JSAtom.JS_ATOM_string)
    this.addPredefined('object', JSAtom.JS_ATOM_object)
    this.addPredefined('symbol', JSAtom.JS_ATOM_symbol)
    this.addPredefined('integer', JSAtom.JS_ATOM_integer)
    this.addPredefined('unknown', JSAtom.JS_ATOM_unknown)
    this.addPredefined('arguments', JSAtom.JS_ATOM_arguments)
    this.addPredefined('callee', JSAtom.JS_ATOM_callee)
    this.addPredefined('caller', JSAtom.JS_ATOM_caller)
    this.addPredefined('<eval>', JSAtom.JS_ATOM__eval_)
    this.addPredefined('<ret>', JSAtom.JS_ATOM__ret_)
    this.addPredefined('<var>', JSAtom.JS_ATOM__var_)
    this.addPredefined('<arg_var>', JSAtom.JS_ATOM__arg_var_)
    this.addPredefined('<with>', JSAtom.JS_ATOM__with_)
    this.addPredefined('lastIndex', JSAtom.JS_ATOM_lastIndex)
    this.addPredefined('target', JSAtom.JS_ATOM_target)
    this.addPredefined('index', JSAtom.JS_ATOM_index)
    this.addPredefined('input', JSAtom.JS_ATOM_input)
    this.addPredefined('defineProperties', JSAtom.JS_ATOM_defineProperties)
    this.addPredefined('apply', JSAtom.JS_ATOM_apply)
    this.addPredefined('join', JSAtom.JS_ATOM_join)
    this.addPredefined('concat', JSAtom.JS_ATOM_concat)
    this.addPredefined('split', JSAtom.JS_ATOM_split)
    this.addPredefined('construct', JSAtom.JS_ATOM_construct)
    this.addPredefined('getPrototypeOf', JSAtom.JS_ATOM_getPrototypeOf)
    this.addPredefined('setPrototypeOf', JSAtom.JS_ATOM_setPrototypeOf)
    this.addPredefined('isExtensible', JSAtom.JS_ATOM_isExtensible)
    this.addPredefined('preventExtensions', JSAtom.JS_ATOM_preventExtensions)
    this.addPredefined('has', JSAtom.JS_ATOM_has)
    this.addPredefined('deleteProperty', JSAtom.JS_ATOM_deleteProperty)
    this.addPredefined('defineProperty', JSAtom.JS_ATOM_defineProperty)
    this.addPredefined('getOwnPropertyDescriptor', JSAtom.JS_ATOM_getOwnPropertyDescriptor)
    this.addPredefined('ownKeys', JSAtom.JS_ATOM_ownKeys)
    this.addPredefined('add', JSAtom.JS_ATOM_add)
    this.addPredefined('done', JSAtom.JS_ATOM_done)
    this.addPredefined('next', JSAtom.JS_ATOM_next)
    this.addPredefined('values', JSAtom.JS_ATOM_values)
    this.addPredefined('source', JSAtom.JS_ATOM_source)
    this.addPredefined('flags', JSAtom.JS_ATOM_flags)
    this.addPredefined('global', JSAtom.JS_ATOM_global)
    this.addPredefined('unicode', JSAtom.JS_ATOM_unicode)
    this.addPredefined('raw', JSAtom.JS_ATOM_raw)
    this.addPredefined('new.target', JSAtom.JS_ATOM_new_target)
    this.addPredefined('this.active_func', JSAtom.JS_ATOM_this_active_func)
    this.addPredefined('<home_object>', JSAtom.JS_ATOM_home_object)
    this.addPredefined('<computed_field>', JSAtom.JS_ATOM_computed_field)
    this.addPredefined('<static_computed_field>', JSAtom.JS_ATOM_static_computed_field)
    this.addPredefined('<class_fields_init>', JSAtom.JS_ATOM_class_fields_init)
    this.addPredefined('<brand>', JSAtom.JS_ATOM_brand)
    this.addPredefined('#constructor', JSAtom.JS_ATOM_hash_constructor)
    this.addPredefined('as', JSAtom.JS_ATOM_as)
    this.addPredefined('from', JSAtom.JS_ATOM_from)
    this.addPredefined('meta', JSAtom.JS_ATOM_meta)
    this.addPredefined('*default*', JSAtom.JS_ATOM__default_)
    this.addPredefined('*', JSAtom.JS_ATOM__star_)
    this.addPredefined('Module', JSAtom.JS_ATOM_Module)
    this.addPredefined('then', JSAtom.JS_ATOM_then)
    this.addPredefined('resolve', JSAtom.JS_ATOM_resolve)
    this.addPredefined('reject', JSAtom.JS_ATOM_reject)
    this.addPredefined('promise', JSAtom.JS_ATOM_promise)
    this.addPredefined('proxy', JSAtom.JS_ATOM_proxy)
    this.addPredefined('revoke', JSAtom.JS_ATOM_revoke)
    this.addPredefined('async', JSAtom.JS_ATOM_async)
    this.addPredefined('exec', JSAtom.JS_ATOM_exec)
    this.addPredefined('groups', JSAtom.JS_ATOM_groups)
    this.addPredefined('indices', JSAtom.JS_ATOM_indices)
    this.addPredefined('status', JSAtom.JS_ATOM_status)
    this.addPredefined('reason', JSAtom.JS_ATOM_reason)
    this.addPredefined('globalThis', JSAtom.JS_ATOM_globalThis)
    this.addPredefined('bigint', JSAtom.JS_ATOM_bigint)
    this.addPredefined('-0', JSAtom.JS_ATOM_minus_zero)
    this.addPredefined('Infinity', JSAtom.JS_ATOM_Infinity)
    this.addPredefined('-Infinity', JSAtom.JS_ATOM_minus_Infinity)
    this.addPredefined('NaN', JSAtom.JS_ATOM_NaN)
    this.addPredefined('hasIndices', JSAtom.JS_ATOM_hasIndices)
    this.addPredefined('ignoreCase', JSAtom.JS_ATOM_ignoreCase)
    this.addPredefined('multiline', JSAtom.JS_ATOM_multiline)
    this.addPredefined('dotAll', JSAtom.JS_ATOM_dotAll)
    this.addPredefined('sticky', JSAtom.JS_ATOM_sticky)
    this.addPredefined('unicodeSets', JSAtom.JS_ATOM_unicodeSets)
    this.addPredefined('not-equal', JSAtom.JS_ATOM_not_equal)
    this.addPredefined('timed-out', JSAtom.JS_ATOM_timed_out)
    this.addPredefined('ok', JSAtom.JS_ATOM_ok)
    this.addPredefined('toJSON', JSAtom.JS_ATOM_toJSON)
    
    // class names
    this.addPredefined('Object', JSAtom.JS_ATOM_Object)
    this.addPredefined('Array', JSAtom.JS_ATOM_Array)
    this.addPredefined('Error', JSAtom.JS_ATOM_Error)
    this.addPredefined('Number', JSAtom.JS_ATOM_Number)
    this.addPredefined('String', JSAtom.JS_ATOM_String)
    this.addPredefined('Boolean', JSAtom.JS_ATOM_Boolean)
    this.addPredefined('Symbol', JSAtom.JS_ATOM_Symbol)
    this.addPredefined('Arguments', JSAtom.JS_ATOM_Arguments)
    this.addPredefined('Math', JSAtom.JS_ATOM_Math)
    this.addPredefined('JSON', JSAtom.JS_ATOM_JSON)
    this.addPredefined('Date', JSAtom.JS_ATOM_Date)
    this.addPredefined('Function', JSAtom.JS_ATOM_Function)
    this.addPredefined('GeneratorFunction', JSAtom.JS_ATOM_GeneratorFunction)
    this.addPredefined('ForInIterator', JSAtom.JS_ATOM_ForInIterator)
    this.addPredefined('RegExp', JSAtom.JS_ATOM_RegExp)
    this.addPredefined('ArrayBuffer', JSAtom.JS_ATOM_ArrayBuffer)
    this.addPredefined('SharedArrayBuffer', JSAtom.JS_ATOM_SharedArrayBuffer)
    this.addPredefined('Uint8ClampedArray', JSAtom.JS_ATOM_Uint8ClampedArray)
    this.addPredefined('Int8Array', JSAtom.JS_ATOM_Int8Array)
    this.addPredefined('Uint8Array', JSAtom.JS_ATOM_Uint8Array)
    this.addPredefined('Int16Array', JSAtom.JS_ATOM_Int16Array)
    this.addPredefined('Uint16Array', JSAtom.JS_ATOM_Uint16Array)
    this.addPredefined('Int32Array', JSAtom.JS_ATOM_Int32Array)
    this.addPredefined('Uint32Array', JSAtom.JS_ATOM_Uint32Array)
    this.addPredefined('BigInt64Array', JSAtom.JS_ATOM_BigInt64Array)
    this.addPredefined('BigUint64Array', JSAtom.JS_ATOM_BigUint64Array)
    this.addPredefined('Float16Array', JSAtom.JS_ATOM_Float16Array)
    this.addPredefined('Float32Array', JSAtom.JS_ATOM_Float32Array)
    this.addPredefined('Float64Array', JSAtom.JS_ATOM_Float64Array)
    this.addPredefined('DataView', JSAtom.JS_ATOM_DataView)
    this.addPredefined('BigInt', JSAtom.JS_ATOM_BigInt)
    this.addPredefined('WeakRef', JSAtom.JS_ATOM_WeakRef)
    this.addPredefined('FinalizationRegistry', JSAtom.JS_ATOM_FinalizationRegistry)
    this.addPredefined('Map', JSAtom.JS_ATOM_Map)
    this.addPredefined('Set', JSAtom.JS_ATOM_Set)
    this.addPredefined('WeakMap', JSAtom.JS_ATOM_WeakMap)
    this.addPredefined('WeakSet', JSAtom.JS_ATOM_WeakSet)
    this.addPredefined('Map Iterator', JSAtom.JS_ATOM_Map_Iterator)
    this.addPredefined('Set Iterator', JSAtom.JS_ATOM_Set_Iterator)
    this.addPredefined('Array Iterator', JSAtom.JS_ATOM_Array_Iterator)
    this.addPredefined('String Iterator', JSAtom.JS_ATOM_String_Iterator)
    this.addPredefined('RegExp String Iterator', JSAtom.JS_ATOM_RegExp_String_Iterator)
    this.addPredefined('Generator', JSAtom.JS_ATOM_Generator)
    this.addPredefined('Proxy', JSAtom.JS_ATOM_Proxy)
    this.addPredefined('Promise', JSAtom.JS_ATOM_Promise)
    this.addPredefined('PromiseResolveFunction', JSAtom.JS_ATOM_PromiseResolveFunction)
    this.addPredefined('PromiseRejectFunction', JSAtom.JS_ATOM_PromiseRejectFunction)
    this.addPredefined('AsyncFunction', JSAtom.JS_ATOM_AsyncFunction)
    this.addPredefined('AsyncFunctionResolve', JSAtom.JS_ATOM_AsyncFunctionResolve)
    this.addPredefined('AsyncFunctionReject', JSAtom.JS_ATOM_AsyncFunctionReject)
    this.addPredefined('AsyncGeneratorFunction', JSAtom.JS_ATOM_AsyncGeneratorFunction)
    this.addPredefined('AsyncGenerator', JSAtom.JS_ATOM_AsyncGenerator)
    this.addPredefined('EvalError', JSAtom.JS_ATOM_EvalError)
    this.addPredefined('RangeError', JSAtom.JS_ATOM_RangeError)
    this.addPredefined('ReferenceError', JSAtom.JS_ATOM_ReferenceError)
    this.addPredefined('SyntaxError', JSAtom.JS_ATOM_SyntaxError)
    this.addPredefined('TypeError', JSAtom.JS_ATOM_TypeError)
    this.addPredefined('URIError', JSAtom.JS_ATOM_URIError)
    this.addPredefined('InternalError', JSAtom.JS_ATOM_InternalError)
    this.addPredefined('<brand>', JSAtom.JS_ATOM_Private_brand)
    this.addPredefined('Symbol.toPrimitive', JSAtom.JS_ATOM_Symbol_toPrimitive)
    this.addPredefined('Symbol.iterator', JSAtom.JS_ATOM_Symbol_iterator)
    this.addPredefined('Symbol.match', JSAtom.JS_ATOM_Symbol_match)
    this.addPredefined('Symbol.matchAll', JSAtom.JS_ATOM_Symbol_matchAll)
    this.addPredefined('Symbol.replace', JSAtom.JS_ATOM_Symbol_replace)
    this.addPredefined('Symbol.search', JSAtom.JS_ATOM_Symbol_search)
    this.addPredefined('Symbol.split', JSAtom.JS_ATOM_Symbol_split)
    this.addPredefined('Symbol.toStringTag', JSAtom.JS_ATOM_Symbol_toStringTag)
    this.addPredefined('Symbol.isConcatSpreadable', JSAtom.JS_ATOM_Symbol_isConcatSpreadable)
    this.addPredefined('Symbol.hasInstance', JSAtom.JS_ATOM_Symbol_hasInstance)
    this.addPredefined('Symbol.species', JSAtom.JS_ATOM_Symbol_species)
    this.addPredefined('Symbol.unscopables', JSAtom.JS_ATOM_Symbol_unscopables)
    this.addPredefined('Symbol.asyncIterator', JSAtom.JS_ATOM_Symbol_asyncIterator)
  }

  private addPredefined(str: string, id: number) {
    while (this.list.length <= id) {
      this.list.push('')
    }
    this.list[id] = str
    this.table.set(str, id)
  }

  add(str: string): number {
    const existing = this.table.get(str)
    if (existing !== undefined) {
      return existing
    }
    
    const id = this.list.length
    this.list.push(str)
    this.table.set(str, id)
    return id
  }

  get(id: number): string | undefined {
    return this.list[id]
  }

  has(str: string): boolean {
    return this.table.has(str)
  }

  getId(str: string): number | undefined {
    return this.table.get(str)
  }

  size(): number {
    return this.list.length
  }

  writeToBuffer(buffer: BufferWriter) {
    buffer.u32(this.list.length)
    for (const str of this.list) {
      const utf8 = Buffer.from(str, 'utf8')
      buffer.u32(utf8.length)
      if (utf8.length > 0) {
        buffer.raw(utf8)
      }
    }
  }

  writeTo(buffer: BufferWriter) {
    return this.writeToBuffer(buffer)
  }
}