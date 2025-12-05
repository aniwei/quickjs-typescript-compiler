import { BytecodeWriter } from '../bytecode/bytecodeWriter';
import { DynBuf } from '../bytecode/dynBuffer';
import { JSAtom, Opcode } from '../env';

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

  label_slots: LabelSlot[] = [];
  top_break: BlockEnv | null = null;

  cpool: any[] = []; // JSValue
  
  closure_var: JSClosureVar[] = [];

  jump_slots: JumpSlot[] = [];

  pc2line: DynBuf;
  pc2column: DynBuf;
  
  source: string = "";
  filename: number = 0; // JSAtom

  add_var(name: number): number {
    const idx = this.vars.length;
    this.vars.push({
      var_name: name,
      scope_level: this.scope_level,
      scope_next: -1,
      is_const: false,
      is_lexical: false,
      is_captured: false,
      is_static_private: false,
      var_kind: JSVarKind.JS_VAR_NORMAL,
      func_pool_idx: -1
    });
    
    // In QuickJS, top-level variables in modules AND strict global scripts are treated as closure variables
    // (accessed via put_var_ref/get_var_ref instead of put_loc/get_loc).
    if (this.is_module || (this.is_global_var && this.js_mode === 1)) {
        const closureIdx = this.add_closure_var(name, true, false, idx, JSVarKind.JS_VAR_NORMAL, false, false);
        return closureIdx;
    }

    return idx;
  }

  set_var_const(idx: number, is_const: boolean) {
      if (this.is_module || (this.is_global_var && this.js_mode === 1)) {
          // idx is closure index
          if (idx < this.closure_var.length) {
              this.closure_var[idx].is_const = is_const;
              // Also update the underlying var
              const varIdx = this.closure_var[idx].var_idx;
              if (varIdx < this.vars.length) {
                  this.vars[varIdx].is_const = is_const;
              }
          }
      } else {
          // idx is var index
          if (idx < this.vars.length) {
              this.vars[idx].is_const = is_const;
          }
      }
  }

  set_var_lexical(idx: number, is_lexical: boolean) {
      if (this.is_module || (this.is_global_var && this.js_mode === 1)) {
          // idx is closure index
          if (idx < this.closure_var.length) {
              this.closure_var[idx].is_lexical = is_lexical;
              // Also update the underlying var
              const varIdx = this.closure_var[idx].var_idx;
              if (varIdx < this.vars.length) {
                  this.vars[varIdx].is_lexical = is_lexical;
              }
          }
      } else {
          // idx is var index
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
    return this.vars.findIndex(v => v.var_name === name);
  }

  get_var_ref(name: number): { idx: number, is_local: boolean, is_arg: boolean, is_const: boolean, is_lexical: boolean, var_kind: JSVarKind } | null {
      // console.log(`get_var_ref: ${name} in ${this.func_name}`);
      if (name === 165 || name === 166) { // Hack: check for arguments atom. I don't know the ID, so I'll log name if it matches "arguments" string lookup? No access to atomManager here.
         // Just log everything for now, filtered by function name if possible?
      }
      
      // 0. Check module vars (closure vars)
      if (this.is_module || (this.is_global_var && this.js_mode === 1)) {
          const idx = this.closure_var.findIndex(v => v.var_name === name);
          if (idx !== -1) {
              const v = this.closure_var[idx];
              return { idx, is_local: false, is_arg: false, is_const: v.is_const, is_lexical: v.is_lexical, var_kind: v.var_kind };
          }
      }

      // 1. Check local vars
      let idx = this.find_var(name);
      if (idx !== -1) {
          const v = this.vars[idx];
          return { idx, is_local: true, is_arg: false, is_const: v.is_const, is_lexical: v.is_lexical, var_kind: v.var_kind };
      }
      
      // 2. Check args
      idx = this.args.findIndex(v => v.var_name === name);
      if (idx !== -1) {
          const v = this.args[idx];
          return { idx, is_local: true, is_arg: true, is_const: false, is_lexical: false, var_kind: JSVarKind.JS_VAR_NORMAL };
      }
      
      // 3. Check parent
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
      first: -1
    });
    this.scope_level = scope_idx;
    return scope_idx;
  }

  pop_scope(): { def: JSVarDef, idx: number }[] {
    const scope = this.scopes.pop();
    if (!scope) throw new Error("No scope to pop");
    
    const poppedLevel = this.scopes.length;
    this.scope_level = scope.parent;
    
    const result: { def: JSVarDef, idx: number }[] = [];
    for (let i = 0; i < this.vars.length; i++) {
        if (this.vars[i].scope_level === poppedLevel) {
            result.push({ def: this.vars[i], idx: i });
        }
    }
    return result;
  }



  last_line_num: number = 1;
  last_pc: number = 0;

  constructor(parent: JSFunctionDef | null = null) {
    this.parent = parent;
    this.byte_code = new BytecodeWriter();
    this.pc2line = new DynBuf();
    this.pc2column = new DynBuf();
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
          const offset = slot.pos - (reloc.addr + 4);
          this.patchJump(reloc.addr, offset);
      } else if (reloc.size === 1) {
          const offset = slot.pos - (reloc.addr + 1);
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
    this.byte_code.emitOp(op);
    const addr = this.byte_code.getOffset();
    this.byte_code.emitU32(0); // Placeholder
    
    const slot = this.label_slots[label];
    if (slot.pos !== -1) {
      // Label defined, patch immediately
      const offset = slot.pos - (addr + 4);
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
    this.byte_code.emitOp(op);
    const addr = this.byte_code.getOffset();
    this.byte_code.emitU8(0); // Placeholder
    
    const slot = this.label_slots[label];
    if (slot.pos !== -1) {
      const offset = slot.pos - (addr + 1);
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
        
        this.pc2line.prepend(pc2lineBuf.buffer());
    }
  }

  pushBreakEntry(label_name: number, label_break: number, label_cont: number, label_finally: number, scope_level: number): void {
    const entry: BlockEnv = {
      prev: this.top_break,
      label_name,
      label_break,
      label_cont,
      drop_count: 0,
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

  update_line_num(line_num: number) {
    if (line_num === this.last_line_num) return;
    
    const pc = this.byte_code.getOffset();
    const line_diff = line_num - this.last_line_num;
    const pc_diff = pc - this.last_pc;
    
    // Encode
    // QuickJS pc2line encoding:
    // op (1 byte)
    // if op == 0: uleb128(pc_diff), sleb128(line_diff)
    // else:
    //   op -= PC2LINE_OP_FIRST (1)
    //   pc_diff = op / PC2LINE_RANGE
    //   line_diff = op % PC2LINE_RANGE + PC2LINE_BASE (-1)
    
    // For now, use generic encoding (op=0)
    this.pc2line.putByte(0);
    this.putULEB128(this.pc2line, pc_diff);
    this.putSLEB128(this.pc2line, line_diff);
    
    this.last_line_num = line_num;
    this.last_pc = pc;
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


  static create(parent: JSFunctionDef | null, is_eval: boolean, is_func_expr: boolean, filename: number): JSFunctionDef {
    const fd = new JSFunctionDef(parent);
    fd.is_eval = is_eval;
    fd.is_func_expr = is_func_expr;
    fd.filename = filename;
    // TODO: Initialize other fields as in js_new_function_def
    return fd;
  }
}
