/**
 * Represents the definition of a function during compilation, analogous to
 * `JSFunctionDef` in QuickJS's `parser.h`. This class serves as a workspace
 * for collecting all information needed to compile a single function.
 */

import { AtomTable, Atom } from './atoms';
import { Constants } from './constant';
import { LabelManager } from './label';
import { OpcodeGenerator } from './opcodeGenerator';
import { BytecodeWriter, Instruction } from './bytecode';
import { CompilerFlags } from './opcodes';
import { ConfigManager } from './config';
import { LoopContext, Scope } from './types';

type JSFunctionKind = 0 | 1 | 2 | 3; // JS_FUNC_NORMAL, JS_FUNC_GENERATOR, JS_FUNC_ASYNC, JS_FUNC_ASYNC_GENERATOR

export class JSFunctionDef {
  ctx: any; // JSContext
  parent?: JSFunctionDef;
  parent_cpool_idx: number = -1;
  parent_scope_level: number = 0;
  child_list: JSFunctionDef[] = [];
  link: any; // list_head

  is_eval: boolean = false;
  eval_type: number = 0;
  is_global_var: boolean = false;
  is_func_expr: boolean = false;
  has_home_object: boolean = false;
  has_prototype: boolean = false;
  has_simple_parameter_list: boolean = true;
  has_parameter_expressions: boolean = false;
  has_use_strict: boolean = false;
  has_eval_call: boolean = false;
  has_arguments_binding: boolean = false;
  has_this_binding: boolean = false;
  new_target_allowed: boolean = false;
  super_call_allowed: boolean = false;
  super_allowed: boolean = false;
  arguments_allowed: boolean = true;
  is_derived_class_constructor: boolean = false;
  in_function_body: boolean = false;
  func_kind: JSFunctionKind = 0; // JSFunctionKindEnum
  func_type: number = 0; // JSParseFunctionEnum
  js_mode: number = 0;
  func_name: Atom = 0;

  vars: any[] = []; // JSVarDef
  var_size: number = 0;
  var_count: number = 0;
  args: any[] = []; // JSVarDef
  arg_size: number = 0;
  arg_count: number = 0;
  defined_arg_count: number = 0;
  var_object_idx: number = -1;
  arg_var_object_idx: number = -1;
  arguments_var_idx: number = -1;
  arguments_arg_idx: number = -1;
  func_var_idx: number = -1;
  eval_ret_idx: number = -1;
  this_var_idx: number = -1;
  new_target_var_idx: number = -1;
  this_active_func_var_idx: number = -1;
  home_object_var_idx: number = -1;
  need_home_object: boolean = false;

  scope_level: number = 0;
  scope_first: number = 0;
  scope_size: number = 0;
  scope_count: number = 0;
  scopes: any[] = []; // JSVarScope
  def_scope_array: any[] = []; // JSVarScope[4]
  body_scope: number = 0;

  global_var_count: number = 0;
  global_var_size: number = 0;
  global_vars: any[] = []; // JSGlobalVar

  byte_code: any; // DynBuf
  last_opcode_pos: number = -1;
  last_opcode_source_ptr: any; // uint8_t*
  use_short_opcodes: boolean = false;

  label_slots: any[] = []; // LabelSlot
  label_size: number = 0;
  label_count: number = 0;
  top_break: any; // BlockEnv*

  cpool: any[] = []; // JSValue
  cpool_count: number = 0;
  cpool_size: number = 0;

  closure_var_count: number = 0;
  closure_var_size: number = 0;
  closure_var: any[] = []; // JSClosureVar

  jump_slots: any[] = []; // JumpSlot
  jump_size: number = 0;
  jump_count: number = 0;

  line_number_slots: any[] = []; // LineNumberSlot
  line_number_size: number = 0;
  line_number_count: number = 0;
  line_number_last: number = 0;
  line_number_last_pc: number = 0;

  column_number_slots: any[] = []; // ColumnNumberSlot
  column_number_size: number = 0;
  column_number_count: number = 0;
  column_number_last: number = 0;
  column_number_last_pc: number = 0;

  strip_debug: boolean = false;
  strip_source: boolean = false;
  filename: Atom = 0;
  source_pos: number = 0;
  get_line_col_cache: any; // GetLineColCache*
  pc2line: any; // DynBuf
  pc2column: any; // DynBuf

  source: string = '';
  source_len: number = 0;

  module: any; // JSModuleDef*
  has_await: boolean = false;

  ic: any; // InlineCache*

  // TypeScript specific fields
  bytecodeWriter: BytecodeWriter;
  opcodeGenerator: OpcodeGenerator;
  constantsPool: Constants;
  labelManager: LabelManager;
  locals: Map<string, number> = new Map()
  nextLocalIndex: number = 0
  varKinds: Map<string, 'var' | 'let' | 'const'> = new Map()
  moduleScopeLocals: Set<string> = new Set()
  loopStack: LoopContext[] = []

  constructor(atomTable: AtomTable, opcodeGenerator: OpcodeGenerator, flags: CompilerFlags, parent?: JSFunctionDef) {
    this.parent = parent;
    this.opcodeGenerator = opcodeGenerator;
    this.constantsPool = new Constants();
    this.labelManager = new LabelManager();
    this.bytecodeWriter = new BytecodeWriter(flags, atomTable, this.constantsPool, this.labelManager, opcodeGenerator);
  }

  // Scope management methods
  enterScope(type: Scope['type']): void {
    const scope: Scope = {
      type,
      locals: new Set(),
      parent: this.scopes[this.scopes.length - 1],
    };
    this.scopes.push(scope);
  }

  exitScope(): void {
    this.scopes.pop();
  }

  getCurrentScope(): Scope | undefined {
    return this.scopes[this.scopes.length - 1];
  }

  // Local variable management methods
  declareLocal(name: string): number {
    const index = this.var_count++;
    this.locals.set(name, index);

    const scope = this.getCurrentScope();
    if (scope) {
      scope.locals.add(name);
      if (scope.type === 'module') {
        this.moduleScopeLocals.add(name);
      }
    }

    return index;
  }

  getLocalIndex(name: string): number | undefined {
    return this.locals.get(name);
  }

  isModuleVar(name: string): boolean {
    return this.moduleScopeLocals.has(name);
  }
}
