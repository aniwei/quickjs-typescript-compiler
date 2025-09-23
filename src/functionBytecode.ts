
import { Atom } from './atoms';
import { FunctionDef } from './functionDef';

export class FunctionBytecode {
  header_size: number = 0;
  function_name: Atom = 0;
  line_num: number = 0;
  pc2line_len: number = 0;
  pc2line_buf: number[] = [];
  stack_size: number = 0;
  arg_count: number = 0;
  var_count: number = 0;
  defined_arg_count: number = 0;
  js_mode: number = 0;
  has_prototype: boolean = false;
  has_parameter_expressions: boolean = false;
  has_use_strict: boolean = false;
  is_derived_class_constructor: boolean = false;
  need_home_object: boolean = false;
  func_kind: number = 0;
  closure_var_count: number = 0;
  closure_var: any[] = []; // JSClosureVar
  cpool_count: number = 0;
  cpool: any[] = [];
  bytecode_len: number = 0;
  bytecode_buf: number[] = [];
  vardefs_len: number = 0;
  vardefs: any[] = []; // JSVarDef
}
