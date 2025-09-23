
import { Atom } from './atoms';
import { FunctionBytecode } from './functionBytecode';
import { JSVarScope } from './scope';
import { ClosureVar, VarDef } from './var';

export type JSFunctionKind = 0 | 1 | 2 | 3; // JS_FUNC_NORMAL, JS_FUNC_GENERATOR, JS_FUNC_ASYNC, JS_FUNC_ASYNC_GENERATOR

export enum JSParseFunctionEnum {
  JS_PARSE_FUNC_STATEMENT,
  JS_PARSE_FUNC_VAR,
  JS_PARSE_FUNC_EXPR,
  JS_PARSE_FUNC_ARROW,

  JS_PARSE_FUNC_GETTER,
  JS_PARSE_FUNC_SETTER,
  JS_PARSE_FUNC_METHOD,
  JS_PARSE_FUNC_CLASS_STATIC_INIT,
  JS_PARSE_FUNC_CLASS_CONSTRUCTOR,
  JS_PARSE_FUNC_DERIVED_CLASS_CONSTRUCTOR,
}

export class FunctionDef {
  parent: FunctionDef | null = null;
  parent_cpool_idx: number = 0;
  parent_scope_level: number = 0;

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
  arguments_allowed: boolean = false;
  is_derived_class_constructor: boolean = false;
  in_function_body: boolean = false;
  func_kind: JSFunctionKind = 0;
  func_type: JSParseFunctionEnum = JSParseFunctionEnum.JS_PARSE_FUNC_STATEMENT;
  js_mode: number = 0;
  func_name: Atom = 0;

  vars: VarDef[] = [];
  args: VarDef[] = [];
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
  scopes: JSVarScope[] = [];
  body_scope: number = 0;

  global_vars: any[] = []; // JSGlobalVar

  byte_code: number[] = [];
  last_opcode_pos: number = -1;
  last_opcode_source_ptr: any = null;
  use_short_opcodes: boolean = false;

  label_slots: any[] = []; // LabelSlot
  top_break: any = null; // BlockEnv

  cpool: any[] = [];

  closure_var: ClosureVar[] = [];

  jump_slots: any[] = []; // JumpSlot
  line_number_slots: any[] = []; // LineNumberSlot
  column_number_slots: any[] = []; // ColumnNumberSlot

  line_number_last: number = 0;
  line_number_last_pc: number = 0;
  column_number_last: number = 0;
  column_number_last_pc: number = 0;

  strip_debug: boolean = false;
  strip_source: boolean = false;
  filename: Atom = 0;
  source_pos: number = 0;

  source: string = '';

  module: any = null; // JSModuleDef
  has_await: boolean = false;

  constructor(public parent_fd: FunctionDef | null) {
    this.parent = parent_fd;
  }

  toBytecode(): FunctionBytecode {
    const bc = new FunctionBytecode();
    // TODO: fill bytecode
    return bc;
  }
}
