import { BytecodeWriter } from '../bytecode/bytecodeWriter';
import { DynBuf } from '../bytecode/dynBuffer';
import { JSAtom, Opcode, JSMode, OPCODE_DEFS } from '../env';

export enum JSVarKind {
  JS_VAR_NORMAL,
  JS_VAR_FUNCTION_DECL,
  JS_VAR_NEW_FUNCTION_DECL,
  JS_VAR_CATCH,
  JS_VAR_FUNCTION_NAME,
  JS_VAR_PRIVATE_FIELD,
  JS_VAR_PRIVATE_METHOD,
  JS_VAR_PRIVATE_GETTER,
  JS_VAR_PRIVATE_SETTER,
  JS_VAR_PRIVATE_GETTER_SETTER,
}

export enum JSVarDefEnum {
  JS_VAR_DEF_VAR,
  JS_VAR_DEF_LET,
  JS_VAR_DEF_CONST,
  JS_VAR_DEF_FUNCTION_DECL,
  JS_VAR_DEF_NEW_FUNCTION_DECL,
  JS_VAR_DEF_CATCH,
  JS_VAR_DEF_WITH,
}

export const GLOBAL_VAR_OFFSET = 0x40000000;

export interface JSGlobalVar {
  cpool_idx: number;
  force_init: boolean;
  is_lexical: boolean;
  is_const: boolean;
  scope_level: number;
  var_name: number;
}

export interface JSVarDef {
  var_name: number; // JSAtom
  scope_level: number;
  scope_next: number;
  is_const: boolean;
  is_lexical: boolean;
  is_captured: boolean;
  is_static_private: boolean;
  var_kind: JSVarKind;
  func_pool_idx: number;
}

export interface JSVarScope {
  parent: number;
  first: number;
}

export interface RelocEntry {
  next: RelocEntry | null;
  addr: number;
  size: number;
}

export interface LabelSlot {
  ref_count: number;
  pos: number;
  pos2: number;
  addr: number;
  first_reloc: RelocEntry | null;
}

export interface JumpSlot {
  op: Opcode;
  size: number;
  pos: number;
  label: number;
}

export interface BlockEnv {
  prev: BlockEnv | null;
  label_name: number; // JSAtom
  label_break: number; // -1 if none
  label_cont: number; // -1 if none
  drop_count: number;
  label_finally: number; // -1 if none
  scope_level: number;
  has_iterator: boolean;
  is_regular_stmt: boolean;
}

export enum JSFunctionKind {
  JS_FUNC_NORMAL = 0,
  JS_FUNC_GENERATOR = 1,
  JS_FUNC_ASYNC = 2,
  JS_FUNC_ASYNC_GENERATOR = 3,
}

export interface JSClosureVar {
  var_name: number;
  is_local: boolean;
  is_arg: boolean;
  is_const: boolean;
  is_lexical: boolean;
  var_kind: JSVarKind;
  var_idx: number;
}

export interface JSModuleEntry {
  module_name: number; // JSAtom
  local_name: number; // JSAtom
  export_name: number; // JSAtom
}

export class JSFunctionDef {
  parent: JSFunctionDef | null = null;
  parent_cpool_idx: number = -1;
  parent_scope_level: number = 0;
  
  is_eval: boolean = false;
  eval_type: number = 0;
  is_global_var: boolean = false;
  is_module: boolean = false;
  has_debug: boolean = true;
  
  req_module_entries: JSModuleEntry[] = [];
  export_entries: JSModuleEntry[] = [];
  star_export_entries: JSModuleEntry[] = [];
  import_entries: JSModuleEntry[] = [];

  is_func_expr: boolean = false;
  has_home_object: boolean = false;
  has_prototype: boolean = false;
  has_simple_parameter_list: boolean = false;
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
  
  func_kind: JSFunctionKind = JSFunctionKind.JS_FUNC_NORMAL;
  js_mode: number = 0;
  func_name: number = 0; // JSAtom

  vars: JSVarDef[] = [];
  args: JSVarDef[] = [];
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
  scope_first: number = -1;
  scopes: JSVarScope[] = [];
  body_scope: number = -1;

  global_vars: any[] = []; // JSGlobalVar

  byte_code: BytecodeWriter;
  last_opcode_pos: number = -1;
  use_short_opcodes: boolean = false;

  cur_stack: number = 0;
  max_stack: number = 0;

  updateStack(op: Opcode) {
    const def = OPCODE_DEFS[Opcode[op]];
    if (def) {
        const stackLen = def.nPush - def.nPop;
        this.cur_stack += stackLen;
        if (this.cur_stack > this.max_stack) {
            this.max_stack = this.cur_stack;
        }
    }
  }

  emitOp(op: Opcode) {
    this.updateStack(op);
    this.byte_code.emitOp(op);
  }

  label_slots: LabelSlot[] = [];
  top_break: BlockEnv | null = null;

  cpool: any[] = []; // JSValue
  
  closure_var: JSClosureVar[] = [];

  jump_slots: JumpSlot[] = [];

  pc2line: DynBuf;
  pc2column: DynBuf;
  
  source: string = "";
  filename: number = 0; // JSAtom

  add_module_variables() {
    for (let i = 0; i < this.global_vars.length; i++) {
      const hf = this.global_vars[i];
      this.add_closure_var(hf.var_name, true, false, i, hf.var_kind || JSVarKind.JS_VAR_NORMAL, hf.is_const, hf.is_lexical);
    }
  }

  add_var(name: number, is_hoisted: boolean = false): number {
    const idx = this.vars.length;
    
    this.vars.push({
      var_name: name,
      scope_level: 0,
      scope_next: -1,
      is_const: false,
      is_lexical: false,
      is_captured: false,
      is_static_private: false,
      var_kind: JSVarKind.JS_VAR_NORMAL,
      func_pool_idx: -1
    });
    
    if ((this.is_module || (this.is_global_var && this.js_mode === 1)) && (this.scope_level === this.body_scope || is_hoisted)) {
      const closureIdx = this.add_closure_var(name, true, false, idx, JSVarKind.JS_VAR_NORMAL, false, false);
      return closureIdx;
    }

    return idx;
  }

  add_scope_var(name: number, var_kind: JSVarKind): number {
    const idx = this.add_var(name, false);
    if (idx >= 0) {
      let varIdx = idx;
      if ((this.is_module || (this.is_global_var && this.js_mode === 1)) && this.scope_level === this.body_scope) {
        varIdx = this.closure_var[idx].var_idx;
      }
      
      const vd = this.vars[varIdx];
      vd.var_kind = var_kind;
      vd.scope_level = this.scope_level;
      
      vd.scope_next = this.scope_first;
      this.scopes[this.scope_level].first = varIdx;
      this.scope_first = varIdx;
    }
    return idx;
  }

  define_var(name: number, var_def_type: JSVarDefEnum): number {
    let idx = -1;
    switch (var_def_type) {
      case JSVarDefEnum.JS_VAR_DEF_WITH:
        idx = this.add_scope_var(name, JSVarKind.JS_VAR_NORMAL)
        break

      case JSVarDefEnum.JS_VAR_DEF_LET:
      case JSVarDefEnum.JS_VAR_DEF_CONST:
      case JSVarDefEnum.JS_VAR_DEF_FUNCTION_DECL:
      case JSVarDefEnum.JS_VAR_DEF_NEW_FUNCTION_DECL:
        idx = this.find_lexical_decl(name, this.scope_first, true)
        if (idx >= 0) {
          if (idx < GLOBAL_VAR_OFFSET) {
            const vd = this.vars[idx];
            if (vd.scope_level === this.scope_level) {
              if (!(!(this.js_mode & JSMode.JS_MODE_STRICT) && 
                var_def_type === JSVarDefEnum.JS_VAR_DEF_FUNCTION_DECL &&
                vd.var_kind === JSVarKind.JS_VAR_FUNCTION_DECL)) {
                throw new Error("invalid redefinition of lexical identifier");
              }
            } else if (vd.var_kind === JSVarKind.JS_VAR_CATCH && (vd.scope_level + 2) === this.scope_level) {
              throw new Error("invalid redefinition of lexical identifier");
            }
          } else {
            if (this.scope_level === this.body_scope) {
              throw new Error("invalid redefinition of lexical identifier");
            }
          }
        }
        
        if (var_def_type !== JSVarDefEnum.JS_VAR_DEF_FUNCTION_DECL &&
          var_def_type !== JSVarDefEnum.JS_VAR_DEF_NEW_FUNCTION_DECL &&
          this.scope_level === this.body_scope && this.find_arg(name) >= 0) {
          throw new Error("invalid redefinition of parameter name");
        }

        if (this.find_var_in_child_scope(name, this.scope_level) >= 0) {
          throw new Error("invalid redefinition of a variable");
        }

        if (this.is_global_var) {
          const hf = this.find_global_var(name);
          if (hf && this.is_child_scope(hf.scope_level, this.scope_level)) {
            throw new Error("invalid redefinition of global identifier");
          }
        }

        if (this.is_eval && 
          (this.eval_type === 0 || this.eval_type === 1) && 
          this.scope_level === this.body_scope) {
          const hf = this.add_global_var(name);
          if (!hf) return -1;
          hf.is_lexical = true;
          hf.is_const = (var_def_type === JSVarDefEnum.JS_VAR_DEF_CONST);
          idx = GLOBAL_VAR_OFFSET;
        } else {
          let var_kind = JSVarKind.JS_VAR_NORMAL;
          if (var_def_type === JSVarDefEnum.JS_VAR_DEF_FUNCTION_DECL) var_kind = JSVarKind.JS_VAR_FUNCTION_DECL;
          else if (var_def_type === JSVarDefEnum.JS_VAR_DEF_NEW_FUNCTION_DECL) var_kind = JSVarKind.JS_VAR_NEW_FUNCTION_DECL;
          
          idx = this.add_scope_var(name, var_kind);
          if (idx >= 0) {
            this.set_var_lexical(idx, var_def_type !== JSVarDefEnum.JS_VAR_DEF_FUNCTION_DECL && var_def_type !== JSVarDefEnum.JS_VAR_DEF_NEW_FUNCTION_DECL);
            this.set_var_const(idx, var_def_type === JSVarDefEnum.JS_VAR_DEF_CONST);
          }
        }
        break;

      case JSVarDefEnum.JS_VAR_DEF_CATCH:
        idx = this.add_scope_var(name, JSVarKind.JS_VAR_CATCH);
        break;

      case JSVarDefEnum.JS_VAR_DEF_VAR:
        if (this.find_lexical_decl(name, this.scope_first, false) >= 0) {
          throw new Error("invalid redefinition of lexical identifier");
        }
        if (this.is_global_var) {
          let hf = this.find_global_var(name);
          if (hf && hf.is_lexical && hf.scope_level === this.scope_level && this.eval_type === 1) {
            throw new Error("invalid redefinition of lexical identifier");
          }
          hf = this.add_global_var(name);
          if (!hf) return -1;
          idx = GLOBAL_VAR_OFFSET;
        } else {
          idx = this.find_var(name);
          if (idx >= 0) break;
          idx = this.add_var(name, true);
          if (idx >= 0) {
            if (name === JSAtom.JS_ATOM_arguments && this.has_arguments_binding) {
              this.arguments_var_idx = idx;
            }
            let varIdx = idx;
            if (this.is_module || (this.is_global_var && this.js_mode === 1)) {
              varIdx = this.closure_var[idx].var_idx;
            }
            this.vars[varIdx].scope_next = this.scope_level;
          }
        }
        break;
      default:
        throw new Error("Unsupported define_var type");
    }
    return idx;
  }

  find_lexical_decl(name: number, scope_idx: number, check_catch_var: boolean): number {
    while (scope_idx >= 0) {
      const vd = this.vars[scope_idx];
      if (vd.var_name === name && (vd.is_lexical || (vd.var_kind === JSVarKind.JS_VAR_CATCH && check_catch_var))) {
        return scope_idx;
      }
      scope_idx = vd.scope_next;
    }
    
    if (this.is_eval && this.eval_type === 0) {
      const hf = this.find_global_var(name);
      if (hf && hf.is_lexical) return GLOBAL_VAR_OFFSET;
    }
    return -1;
  }

  find_var_in_child_scope(name: number, scope_level: number): number {
    for (let i = 0; i < this.vars.length; i++) {
      const vd = this.vars[i];
      if (vd.var_name === name && vd.scope_level > scope_level) {
        return i;
      }
    }
    return -1;
  }

  find_arg(name: number): number {
    for (let i = 0; i < this.args.length; i++) {
      if (this.args[i].var_name === name) return i;
    }
    return -1;
  }

  find_global_var(name: number): JSGlobalVar | null {
    for (let i = 0; i < this.global_vars.length; i++) {
      if (this.global_vars[i].var_name === name) return this.global_vars[i];
    }
    return null;
  }

  add_global_var(name: number): JSGlobalVar {
    let hf = this.find_global_var(name);
    if (hf) return hf;
    
    hf = {
      cpool_idx: -1,
      force_init: false,
      is_lexical: false,
      is_const: false,
      scope_level: this.scope_level,
      var_name: name
    };
    this.global_vars.push(hf);
    return hf;
  }

  is_child_scope(scope_level: number, parent_scope_level: number): boolean {
    while (scope_level >= 0) {
      if (scope_level === parent_scope_level) return true;
      if (scope_level === this.body_scope) break;
      scope_level = this.scopes[scope_level].parent;
    }
    return false;
  }

  get_first_lexical_var(scope: number): number {
    while (scope >= 0) {
      const scope_idx = this.scopes[scope].first;
      if (scope_idx >= 0) return scope_idx;
      scope = this.scopes[scope].parent;
    }
    return -1;
  }

  set_var_const(idx: number, is_const: boolean) {
    if (this.is_module || (this.is_global_var && this.js_mode === 1)) {
      if (idx < this.closure_var.length) {
        this.closure_var[idx].is_const = is_const;
        const varIdx = this.closure_var[idx].var_idx;
        if (varIdx < this.vars.length) {
          this.vars[varIdx].is_const = is_const;
        }
      }
    } else {
      if (idx < this.vars.length) {
        this.vars[idx].is_const = is_const;
      }
    }
  }

  set_var_lexical(idx: number, is_lexical: boolean) {
    if (this.is_module || (this.is_global_var && this.js_mode === 1)) {
      if (idx < this.closure_var.length) {
        this.closure_var[idx].is_lexical = is_lexical;
        const varIdx = this.closure_var[idx].var_idx;
        if (varIdx < this.vars.length) {
          this.vars[varIdx].is_lexical = is_lexical;
        }
      }
    } else {
      if (idx < this.vars.length) {
        this.vars[idx].is_lexical = is_lexical;
      }
    }
  }

  add_arg(name: number): number {
    const idx = this.args.length;
    this.args.push({
      var_name: name,
      scope_level: 0,
      scope_next: -1,
      is_const: false,
      is_lexical: false,
      is_captured: false,
      is_static_private: false,
      var_kind: JSVarKind.JS_VAR_NORMAL,
      func_pool_idx: -1
    });
    return idx;
  }

  add_closure_var(name: number, is_local: boolean, is_arg: boolean, var_idx: number, var_kind: JSVarKind, is_const: boolean, is_lexical: boolean): number {
    const idx = this.closure_var.findIndex(v => v.var_name === name);
    if (idx !== -1) return idx;
    
    const closureIdx = this.closure_var.length;
    this.closure_var.push({
      var_name: name,
      is_local,
      is_arg,
      var_idx,
      var_kind,
      is_const,
      is_lexical
    });
    return closureIdx;
  }

  find_var(name: number): number {
    for (let i = this.vars.length - 1; i >= 0; i--) {
      if (this.vars[i].var_name === name) return i;
    }
    return -1;
  }

  add_arguments_var(name: number): number {
    const idx = this.add_var(name);
    this.arguments_var_idx = idx;
    return idx;
  }

  get_var_ref(name: number): { idx: number, is_local: boolean, is_arg: boolean, is_const: boolean, is_lexical: boolean, var_kind: JSVarKind } | null {
    if (this.is_module || (this.is_global_var && this.js_mode === 1)) {
      const idx = this.closure_var.findIndex(v => v.var_name === name);
      if (idx !== -1) {
        const v = this.closure_var[idx];
        return { idx, is_local: false, is_arg: false, is_const: v.is_const, is_lexical: v.is_lexical, var_kind: v.var_kind };
      }
    }

    let idx = this.find_var(name);
    if (idx !== -1) {
      const v = this.vars[idx];
      return { idx, is_local: true, is_arg: false, is_const: v.is_const, is_lexical: v.is_lexical, var_kind: v.var_kind };
    }
      
    idx = this.args.findIndex(v => v.var_name === name);
    if (idx !== -1) {
      const v = this.args[idx];
      return { idx, is_local: true, is_arg: true, is_const: false, is_lexical: false, var_kind: JSVarKind.JS_VAR_NORMAL };
    }
    
    if (this.parent) {
      const res = this.parent.get_var_ref(name);
      if (res) {
        let is_local_capture = false;
        let is_arg_capture = false;
        let var_idx = res.idx;
        
        if (res.is_local) { 
          if (res.is_arg) {
            is_local_capture = true;
            is_arg_capture = true;
          } else {
            is_local_capture = true;
            is_arg_capture = false;
          }
        } else { 
          is_local_capture = false;
          is_arg_capture = false;
        }
        
        const closureIdx = this.add_closure_var(name, is_local_capture, is_arg_capture, var_idx, res.var_kind, res.is_const, res.is_lexical);
        
        return { 
          idx: closureIdx, 
          is_local: false, 
          is_arg: false, 
          is_const: res.is_const, 
          is_lexical: res.is_lexical, 
          var_kind: res.var_kind 
        };
      }
    }
    
    return null;
  }

  push_scope(): number {
    const scope_idx = this.scopes.length;
    this.scopes.push({
      parent: this.scope_level,
      first: this.scope_first
    });
    this.scope_level = scope_idx;
    // this.byte_code.emitOp(Opcode.OP_enter_scope);
    // this.byte_code.emitU16(scope_idx);
    return scope_idx;
  }

  pop_scope(): void {
    const scope = this.scopes.pop();
    if (!scope) throw new Error("No scope to pop");
    
    // this.byte_code.emitOp(Opcode.OP_leave_scope);
    // this.byte_code.emitU16(this.scope_level);
    
    this.scope_level = scope.parent;
    this.scope_first = this.get_first_lexical_var(this.scope_level);
  }



  last_line_num: number = 1;
  last_pc: number = 0;
  last_column: number = 0;
  line_start: number = 1;
  column_start: number = 0;
  
  // Pending pc2line state
  pc2line_last_pc: number = 0;
  pc2line_last_line: number = 1;
  pc2line_last_column: number = 0;
  
  pending_pc: number = 0;
  pending_line: number = 1;
  pending_column: number = 0;

  constructor(parent: JSFunctionDef | null = null) {
    this.parent = parent;
    this.byte_code = new BytecodeWriter();
    this.pc2line = new DynBuf();
    this.pc2column = new DynBuf();
    
    // Initialize root scope
    this.scopes.push({
      parent: -1,
      first: -1
    });
    this.scope_level = 0;
  }

  newLabel(): number {
    const idx = this.label_slots.length;
    this.label_slots.push({
      ref_count: 0,
      pos: -1,
      pos2: -1,
      addr: -1,
      first_reloc: null
    });
    return idx;
  }

  emitLabel(label: number): void {
    const slot = this.label_slots[label];
    if (slot.pos !== -1) {
      throw new Error("Label already defined");
    }
    slot.pos = this.byte_code.getOffset();
    
    // Patch pending jumps
    let reloc = slot.first_reloc;
    while (reloc) {
      if (reloc.size === 4) {
        const offset = slot.pos - reloc.addr;
        this.patchJump(reloc.addr, offset);
      } else if (reloc.size === 1) {
        const offset = slot.pos - reloc.addr;
        if (offset < -128 || offset > 127) {
          console.log(`Jump8 overflow: offset=${offset}, pos=${slot.pos}, addr=${reloc.addr}`);
          throw new Error("Jump8 overflow");
        }
        this.patchJump8(reloc.addr, offset);
      }
      reloc = reloc.next;
    }
    slot.first_reloc = null;
  }

  emitJump(op: Opcode, label: number): void {
    this.emitOp(op);
    const addr = this.byte_code.getOffset();
    this.byte_code.emitU32(0); // Placeholder
    
    const slot = this.label_slots[label];
    if (slot.pos !== -1) {
      // Label defined, patch immediately
      const offset = slot.pos - addr;
      this.patchJump(addr, offset);
    } else {
      // Label undefined, add to reloc
      const reloc: RelocEntry = {
        next: slot.first_reloc,
        addr: addr,
        size: 4
      };
      slot.first_reloc = reloc;
      slot.ref_count++;
    }
  }

  emitJump8(op: Opcode, label: number): void {
    this.emitOp(op);
    const addr = this.byte_code.getOffset();
    this.byte_code.emitU8(0); // Placeholder
    
    const slot = this.label_slots[label];
    if (slot.pos !== -1) {
      const offset = slot.pos - addr;
      if (offset < -128 || offset > 127) throw new Error("Jump8 overflow");
      this.patchJump8(addr, offset);
    } else {
      const reloc: RelocEntry = {
        next: slot.first_reloc,
        addr: addr,
        size: 1
      };
      slot.first_reloc = reloc;
      slot.ref_count++;
    }
  }

  patchJump(addr: number, offset: number): void {
    // We need to write 'offset' at 'addr' in the buffer
    // BytecodeWriter uses DynBuf. We need random access write.
    // DynBuf doesn't support random access write easily?
    // Let's check DynBuf.
    this.byte_code.buf.writeU32At(addr, offset);
  }

  patchJump8(addr: number, offset: number): void {
    this.byte_code.buf.writeU8At(addr, offset);
  }

  finalizeBody(): void {
    // Flush any pending pc2line info
    const current_pc = this.byte_code.getOffset();
    if (current_pc > this.pending_pc) {
      if (this.pending_line !== this.pc2line_last_line || this.pending_column !== this.pc2line_last_column) {
        this.write_pc2line(this.pending_pc, this.pending_line, this.pending_column);
      }
    }

    if (this.has_arguments_binding) {
      // Generate setup code
      const setupBuf = new BytecodeWriter();
      setupBuf.emitOp(Opcode.OP_special_object);
      setupBuf.emitU8(0); // ARGUMENTS
      
      if (this.arguments_var_idx !== -1) {
        const varIdx = this.arguments_var_idx;
        if (varIdx === 0) setupBuf.emitOp(Opcode.OP_put_loc0);
        else if (varIdx === 1) setupBuf.emitOp(Opcode.OP_put_loc1);
        else if (varIdx === 2) setupBuf.emitOp(Opcode.OP_put_loc2);
        else if (varIdx === 3) setupBuf.emitOp(Opcode.OP_put_loc3);
        else {
          setupBuf.emitOp(Opcode.OP_put_loc);
          setupBuf.emitU16(varIdx);
        }
      }
      
      const setupBytes = setupBuf.buffer();
      const len = setupBytes.length;
      
      this.byte_code.prepend(setupBytes);
      
      // Shift labels
      for (const slot of this.label_slots) {
        if (slot.pos !== -1) {
          slot.pos += len;
        }
      }
      
      // Shift jump slots
      for (const slot of this.jump_slots) {
        slot.pos += len;
      }
      
      // Shift pc2line
      const pc2lineBuf = new DynBuf();
      pc2lineBuf.putByte(0);
      this.putULEB128(pc2lineBuf, len);
      this.putSLEB128(pc2lineBuf, 0);
      this.putSLEB128(pc2lineBuf, 0); // diff_col
      
      this.pc2line.prepend(pc2lineBuf.buffer());
    }

    // Prepend initial line and column to pc2line
    // console.log('finalizeBody called, prepending line/col', this.line_start, this.column_start);
    const initBuf = new DynBuf();
    this.putSLEB128(initBuf, this.line_start);
    this.putSLEB128(initBuf, this.column_start);
    this.pc2line.prepend(initBuf.buffer());
  }

  pushBreakEntry(label_name: number, label_break: number, label_cont: number, label_finally: number, scope_level: number, drop_count: number = 0): void {
    const entry: BlockEnv = {
      prev: this.top_break,
      label_name,
      label_break,
      label_cont,
      drop_count,
      label_finally,
      scope_level,
      has_iterator: false,
      is_regular_stmt: true
    };
    this.top_break = entry;
  }

  popBreakEntry(): void {
    if (this.top_break) {
      this.top_break = this.top_break.prev;
    }
  }

  update_line_num(line_num: number, column: number = 0) {
    const current_pc = this.byte_code.getOffset();
    
    // If PC has advanced since we last recorded a pending line,
    // we should commit the pending line info for the *previous* block.
    if (current_pc > this.pending_pc) {
      if (this.pending_line !== this.pc2line_last_line || this.pending_column !== this.pc2line_last_column) {
        this.write_pc2line(this.pending_pc, this.pending_line, this.pending_column);
        this.pc2line_last_pc = this.pending_pc;
        this.pc2line_last_line = this.pending_line;
        this.pc2line_last_column = this.pending_column;
      }
      this.pending_pc = current_pc;
    }
    
    this.pending_line = line_num;
    this.pending_column = column;
  }

  write_pc2line(pc: number, line: number, column: number) {
    const pc_diff = pc - this.pc2line_last_pc;
    const line_diff = line - this.pc2line_last_line;
    const col_diff = column - this.pc2line_last_column;
    
    // QuickJS pc2line encoding
    const PC2LINE_BASE = -1;
    const PC2LINE_RANGE = 5;
    const PC2LINE_OP_FIRST = 1;

    if (line_diff >= PC2LINE_BASE && line_diff < PC2LINE_BASE + PC2LINE_RANGE) {
      const op = PC2LINE_OP_FIRST + (pc_diff * PC2LINE_RANGE) + (line_diff - PC2LINE_BASE);
      if (op <= 255) {
        this.pc2line.putByte(op);
        this.putSLEB128(this.pc2line, col_diff);
        return;
      }
    }
    
    this.pc2line.putByte(0);
    this.putULEB128(this.pc2line, pc_diff);
    this.putSLEB128(this.pc2line, line_diff);
    this.putSLEB128(this.pc2line, col_diff);
  }

  putSLEB128(buf: DynBuf, val: number) {
    let more = true;
    while (more) {
      let byte = val & 0x7f;
      val >>= 7;
      if ((val === 0 && (byte & 0x40) === 0) || (val === -1 && (byte & 0x40) !== 0)) {
        more = false;
      } else {
        byte |= 0x80;
      }
      buf.putByte(byte);
    }
  }

  putULEB128(buf: DynBuf, val: number) {
    do {
      let byte = val & 0x7f;
      val >>>= 7;
      if (val !== 0) {
        byte |= 0x80;
      }
      buf.putByte(byte);
    } while (val !== 0);
  }


  static create(parent: JSFunctionDef | null, is_eval: boolean, is_func_expr: boolean, filename: number, line: number = 0, column: number = 0): JSFunctionDef {
    const fd = new JSFunctionDef(parent);
    fd.is_eval = is_eval;
    fd.is_func_expr = is_func_expr;
    fd.filename = filename;
    fd.line_start = line;
    fd.column_start = column;
    
    fd.pc2line_last_line = line;
    fd.pc2line_last_column = column;
    fd.pending_line = line;
    fd.pending_column = column;
    
    return fd;
  }
}
