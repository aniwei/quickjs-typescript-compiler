/**
 * QuickJS Atom Definitions
 * Based on third_party/QuickJS/include/QuickJS/quickjs-atom.h
 */

export enum JSAtom {
  // Keywords - must be first
  JS_ATOM_null = 0,
  JS_ATOM_false,
  JS_ATOM_true,
  JS_ATOM_if,
  JS_ATOM_else,
  JS_ATOM_return,
  JS_ATOM_var,
  JS_ATOM_this,
  JS_ATOM_delete,
  JS_ATOM_void,
  JS_ATOM_typeof,
  JS_ATOM_new,
  JS_ATOM_in,
  JS_ATOM_instanceof,
  JS_ATOM_do,
  JS_ATOM_while,
  JS_ATOM_for,
  JS_ATOM_break,
  JS_ATOM_continue,
  JS_ATOM_switch,
  JS_ATOM_case,
  JS_ATOM_default,
  JS_ATOM_throw,
  JS_ATOM_try,
  JS_ATOM_catch,
  JS_ATOM_finally,
  JS_ATOM_function,
  JS_ATOM_debugger,
  JS_ATOM_with,
  // FutureReservedWord
  JS_ATOM_class,
  JS_ATOM_const,
  JS_ATOM_enum,
  JS_ATOM_export,
  JS_ATOM_extends,
  JS_ATOM_import,
  JS_ATOM_super,
  // FutureReservedWords when parsing strict mode code
  JS_ATOM_implements,
  JS_ATOM_interface,
  JS_ATOM_let,
  JS_ATOM_package,
  JS_ATOM_private,
  JS_ATOM_protected,
  JS_ATOM_public,
  JS_ATOM_static,
  JS_ATOM_yield,
  JS_ATOM_await,

  // Empty string
  JS_ATOM_empty_string,

  // Identifiers
  JS_ATOM_length,
  JS_ATOM_fileName,
  JS_ATOM_lineNumber,
  JS_ATOM_columnNumber,
  JS_ATOM_message,
  JS_ATOM_cause,
  JS_ATOM_errors,
  JS_ATOM_stack,
  JS_ATOM_name,
  JS_ATOM_toString,
  JS_ATOM_toLocaleString,
  JS_ATOM_valueOf,
  JS_ATOM_eval,
  JS_ATOM_prototype,
  JS_ATOM_constructor,
  JS_ATOM_configurable,
  JS_ATOM_writable,
  JS_ATOM_enumerable,
  JS_ATOM_value,
  JS_ATOM_get,
  JS_ATOM_set,
  JS_ATOM_of,
  JS_ATOM_Symbol_iterator,
  JS_ATOM_Symbol_match,
  JS_ATOM_Symbol_matchAll,
  JS_ATOM_Symbol_replace,
  JS_ATOM_Symbol_search,
  JS_ATOM_Symbol_split,
  JS_ATOM_Symbol_toStringTag,
  JS_ATOM_Symbol_isConcatSpreadable,
  JS_ATOM_Symbol_hasInstance,
  JS_ATOM_Symbol_species,
  JS_ATOM_Symbol_unscopables,
  JS_ATOM_Symbol_asyncIterator,
  JS_ATOM_Symbol_toPrimitive,
  JS_ATOM_Module,
  JS_ATOM_meta,
  JS_ATOM_star,
  JS_ATOM_Error,
  JS_ATOM_ReferenceError,
  JS_ATOM_TypeError,
  JS_ATOM_SyntaxError,
  JS_ATOM_RangeError,
  JS_ATOM_EvalError,
  JS_ATOM_URIError,
  JS_ATOM_InternalError,
  JS_ATOM_console,
  JS_ATOM_log,
  JS_ATOM_debug,
  JS_ATOM_info,
  JS_ATOM_warn,
  JS_ATOM_error,
  JS_ATOM_exception,
  JS_ATOM_assert,
  JS_ATOM_count,
  JS_ATOM_countReset,
  JS_ATOM_group,
  JS_ATOM_groupCollapsed,
  JS_ATOM_groupEnd,
  JS_ATOM_table,
  JS_ATOM_time,
  JS_ATOM_timeLog,
  JS_ATOM_timeEnd,
  JS_ATOM_clear,
  JS_ATOM_dir,
  JS_ATOM_dirxml,
  JS_ATOM_trace,
  // End marker - this should match QuickJS quickjs-atom.h
  JS_ATOM_END
}

// Atom string mapping (excludes JS_ATOM_END which is just a marker)
export const ATOM_STRINGS: Partial<Record<JSAtom, string>> = {
  [JSAtom.JS_ATOM_null]: 'null',
  [JSAtom.JS_ATOM_false]: 'false',
  [JSAtom.JS_ATOM_true]: 'true',
  [JSAtom.JS_ATOM_if]: 'if',
  [JSAtom.JS_ATOM_else]: 'else',
  [JSAtom.JS_ATOM_return]: 'return',
  [JSAtom.JS_ATOM_var]: 'var',
  [JSAtom.JS_ATOM_this]: 'this',
  [JSAtom.JS_ATOM_delete]: 'delete',
  [JSAtom.JS_ATOM_void]: 'void',
  [JSAtom.JS_ATOM_typeof]: 'typeof',
  [JSAtom.JS_ATOM_new]: 'new',
  [JSAtom.JS_ATOM_in]: 'in',
  [JSAtom.JS_ATOM_instanceof]: 'instanceof',
  [JSAtom.JS_ATOM_do]: 'do',
  [JSAtom.JS_ATOM_while]: 'while',
  [JSAtom.JS_ATOM_for]: 'for',
  [JSAtom.JS_ATOM_break]: 'break',
  [JSAtom.JS_ATOM_continue]: 'continue',
  [JSAtom.JS_ATOM_switch]: 'switch',
  [JSAtom.JS_ATOM_case]: 'case',
  [JSAtom.JS_ATOM_default]: 'default',
  [JSAtom.JS_ATOM_throw]: 'throw',
  [JSAtom.JS_ATOM_try]: 'try',
  [JSAtom.JS_ATOM_catch]: 'catch',
  [JSAtom.JS_ATOM_finally]: 'finally',
  [JSAtom.JS_ATOM_function]: 'function',
  [JSAtom.JS_ATOM_debugger]: 'debugger',
  [JSAtom.JS_ATOM_with]: 'with',
  [JSAtom.JS_ATOM_class]: 'class',
  [JSAtom.JS_ATOM_const]: 'const',
  [JSAtom.JS_ATOM_enum]: 'enum',
  [JSAtom.JS_ATOM_export]: 'export',
  [JSAtom.JS_ATOM_extends]: 'extends',
  [JSAtom.JS_ATOM_import]: 'import',
  [JSAtom.JS_ATOM_super]: 'super',
  [JSAtom.JS_ATOM_implements]: 'implements',
  [JSAtom.JS_ATOM_interface]: 'interface',
  [JSAtom.JS_ATOM_let]: 'let',
  [JSAtom.JS_ATOM_package]: 'package',
  [JSAtom.JS_ATOM_private]: 'private',
  [JSAtom.JS_ATOM_protected]: 'protected',
  [JSAtom.JS_ATOM_public]: 'public',
  [JSAtom.JS_ATOM_static]: 'static',
  [JSAtom.JS_ATOM_yield]: 'yield',
  [JSAtom.JS_ATOM_await]: 'await',
  [JSAtom.JS_ATOM_empty_string]: '',
  [JSAtom.JS_ATOM_length]: 'length',
  [JSAtom.JS_ATOM_fileName]: 'fileName',
  [JSAtom.JS_ATOM_lineNumber]: 'lineNumber',
  [JSAtom.JS_ATOM_columnNumber]: 'columnNumber',
  [JSAtom.JS_ATOM_message]: 'message',
  [JSAtom.JS_ATOM_cause]: 'cause',
  [JSAtom.JS_ATOM_errors]: 'errors',
  [JSAtom.JS_ATOM_stack]: 'stack',
  [JSAtom.JS_ATOM_name]: 'name',
  [JSAtom.JS_ATOM_toString]: 'toString',
  [JSAtom.JS_ATOM_toLocaleString]: 'toLocaleString',
  [JSAtom.JS_ATOM_valueOf]: 'valueOf',
  [JSAtom.JS_ATOM_eval]: 'eval',
  [JSAtom.JS_ATOM_prototype]: 'prototype',
  [JSAtom.JS_ATOM_constructor]: 'constructor',
  [JSAtom.JS_ATOM_configurable]: 'configurable',
  [JSAtom.JS_ATOM_writable]: 'writable',
  [JSAtom.JS_ATOM_enumerable]: 'enumerable',
  [JSAtom.JS_ATOM_value]: 'value',
  [JSAtom.JS_ATOM_get]: 'get',
  [JSAtom.JS_ATOM_set]: 'set',
  [JSAtom.JS_ATOM_of]: 'of',
  [JSAtom.JS_ATOM_Symbol_iterator]: 'Symbol.iterator',
  [JSAtom.JS_ATOM_Symbol_match]: 'Symbol.match',
  [JSAtom.JS_ATOM_Symbol_matchAll]: 'Symbol.matchAll',
  [JSAtom.JS_ATOM_Symbol_replace]: 'Symbol.replace',
  [JSAtom.JS_ATOM_Symbol_search]: 'Symbol.search',
  [JSAtom.JS_ATOM_Symbol_split]: 'Symbol.split',
  [JSAtom.JS_ATOM_Symbol_toStringTag]: 'Symbol.toStringTag',
  [JSAtom.JS_ATOM_Symbol_isConcatSpreadable]: 'Symbol.isConcatSpreadable',
  [JSAtom.JS_ATOM_Symbol_hasInstance]: 'Symbol.hasInstance',
  [JSAtom.JS_ATOM_Symbol_species]: 'Symbol.species',
  [JSAtom.JS_ATOM_Symbol_unscopables]: 'Symbol.unscopables',
  [JSAtom.JS_ATOM_Symbol_asyncIterator]: 'Symbol.asyncIterator',
  [JSAtom.JS_ATOM_Symbol_toPrimitive]: 'Symbol.toPrimitive',
  [JSAtom.JS_ATOM_Module]: 'Module',
  [JSAtom.JS_ATOM_meta]: 'meta',
  [JSAtom.JS_ATOM_star]: '*',
  [JSAtom.JS_ATOM_Error]: 'Error',
  [JSAtom.JS_ATOM_ReferenceError]: 'ReferenceError',
  [JSAtom.JS_ATOM_TypeError]: 'TypeError',
  [JSAtom.JS_ATOM_SyntaxError]: 'SyntaxError',
  [JSAtom.JS_ATOM_RangeError]: 'RangeError',
  [JSAtom.JS_ATOM_EvalError]: 'EvalError',
  [JSAtom.JS_ATOM_URIError]: 'URIError',
  [JSAtom.JS_ATOM_InternalError]: 'InternalError',
  [JSAtom.JS_ATOM_console]: 'console',
  [JSAtom.JS_ATOM_log]: 'log',
  [JSAtom.JS_ATOM_debug]: 'debug',
  [JSAtom.JS_ATOM_info]: 'info',
  [JSAtom.JS_ATOM_warn]: 'warn',
  [JSAtom.JS_ATOM_error]: 'error',
  [JSAtom.JS_ATOM_exception]: 'exception',
  [JSAtom.JS_ATOM_assert]: 'assert',
  [JSAtom.JS_ATOM_count]: 'count',
  [JSAtom.JS_ATOM_countReset]: 'countReset',
  [JSAtom.JS_ATOM_group]: 'group',
  [JSAtom.JS_ATOM_groupCollapsed]: 'groupCollapsed',
  [JSAtom.JS_ATOM_groupEnd]: 'groupEnd',
  [JSAtom.JS_ATOM_table]: 'table',
  [JSAtom.JS_ATOM_time]: 'time',
  [JSAtom.JS_ATOM_timeLog]: 'timeLog',
  [JSAtom.JS_ATOM_timeEnd]: 'timeEnd',
  [JSAtom.JS_ATOM_clear]: 'clear',
  [JSAtom.JS_ATOM_dir]: 'dir',
  [JSAtom.JS_ATOM_dirxml]: 'dirxml',
  [JSAtom.JS_ATOM_trace]: 'trace'
  // Note: JS_ATOM_END is not included as it's just a marker
}

// Atom table management
export class AtomTable {
  private atoms = new Map<string, number>()
  private nextAtomId = JSAtom.JS_ATOM_END // Start after predefined atoms
  
  constructor() {
    // Initialize with predefined atoms (excluding JS_ATOM_END)
    for (const [atomId, atomStr] of Object.entries(ATOM_STRINGS)) {
      if (atomStr) { // Only add if atomStr is defined
        this.atoms.set(atomStr, parseInt(atomId))
      }
    }
  }

  // Get or create atom ID for a string
  getAtomId(str: string): number {
    const existing = this.atoms.get(str)
    if (existing !== undefined) {
      return existing
    }
    
    const newId = this.nextAtomId++
    this.atoms.set(str, newId)
    return newId
  }

  // Get atom string by ID
  getAtomString(id: number): string | undefined {
    for (const [str, atomId] of this.atoms) {
      if (atomId === id) {
        return str
      }
    }
    return undefined
  }

  // Check if string is a predefined atom
  isPredefinedAtom(str: string): boolean {
    const id = this.atoms.get(str)
    return id !== undefined && id < JSAtom.JS_ATOM_END
  }

  // Get all atoms for bytecode generation
  getAllAtoms(): Map<string, number> {
    return new Map(this.atoms)
  }
  
  // Get total atom count
  getAtomCount(): number {
    return this.atoms.size
  }
  
  // Get user-defined atoms (for bytecode generation)
  getUserAtoms(): Map<string, number> {
    const userAtoms = new Map<string, number>()
    for (const [str, id] of this.atoms) {
      if (id >= JSAtom.JS_ATOM_END) {
        userAtoms.set(str, id)
      }
    }
    return userAtoms
  }
  
  // Get user atom count (only atoms >= JS_ATOM_END)
  getUserAtomCount(): number {
    let count = 0
    for (const [, id] of this.atoms) {
      if (id >= JSAtom.JS_ATOM_END) {
        count++
      }
    }
    return count
  }
}