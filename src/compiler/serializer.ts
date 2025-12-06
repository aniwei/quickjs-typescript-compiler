import { JSFunctionDef } from './jsFunctionDef';
import { DynBuf } from '../bytecode/dynBuffer';
import { BytecodeTag, JSAtom, OPCODE_DEFS, OpFormat, Opcode, env } from '../env';
import { AtomManager } from './atomManager';

const OPCODE_MAP = new Map<number, any>();
for (const [name, def] of Object.entries(OPCODE_DEFS)) {
  // @ts-ignore
  const op = Opcode[name];
  if (op !== undefined) {
    OPCODE_MAP.set(op, def);
  }
}

export class BytecodeSerializer {
  buf: DynBuf;
  atomManager: AtomManager;
  atom_to_idx: Map<number, number>;
  idx_to_atom: number[];

  constructor(atomManager: AtomManager) {
    this.buf = new DynBuf();
    this.atomManager = atomManager;
    this.atom_to_idx = new Map();
    this.idx_to_atom = [];
  }

  serialize(fd: JSFunctionDef): Uint8Array {
    // 1. Scan to collect atoms and rewrite them (recursively)
    this.scanAndRewriteRecursive(fd);
    
    // 2. Write BC_VERSION
    this.buf.putByte(5); // BC_VERSION

    // 3. Write atoms
    this.writeAtoms();

    // 4. Write object
    const objBuf = new DynBuf();
    this.writeModule(objBuf, fd);
    this.buf.put(objBuf.buffer());

    return this.buf.buffer();
  }

  scanAndRewriteRecursive(fd: JSFunctionDef) {
    this.scanAndRewrite(fd);
    for (const val of fd.cpool) {
      if (val instanceof JSFunctionDef) {
        this.scanAndRewriteRecursive(val);
      }
    }
  }

  writeModule(buf: DynBuf, fd: JSFunctionDef) {
    buf.putByte(BytecodeTag.TC_TAG_MODULE);
    this.putAtom(buf, fd.filename);
    
    this.putLEB128(buf, fd.req_module_entries.length);
    this.putLEB128(buf, fd.export_entries.length);
    this.putLEB128(buf, fd.star_export_entries.length);
    this.putLEB128(buf, fd.import_entries.length);
    
    buf.putByte(0); // has_tla (match WASM: 0)

    for (const e of fd.req_module_entries) {
        this.putAtom(buf, e.module_name);
    }
    
    for (const e of fd.export_entries) {
        if (e.module_name === 0) {
            // JS_EXPORT_TYPE_LOCAL = 1
            buf.putByte(1);
            const varIdx = this.resolveVarIdx(fd, e.local_name);
            this.putLEB128(buf, varIdx);
            this.putAtom(buf, e.export_name);
        } else {
            // JS_EXPORT_TYPE_INDIRECT = 2
            buf.putByte(2);
            const reqIdx = fd.req_module_entries.findIndex(m => m.module_name === e.module_name);
            this.putLEB128(buf, reqIdx);
            this.putAtom(buf, e.local_name);
            this.putAtom(buf, e.export_name);
        }
    }
    
    for (const e of fd.star_export_entries) {
        const reqIdx = fd.req_module_entries.findIndex(m => m.module_name === e.module_name);
        this.putLEB128(buf, reqIdx);
    }
    
    for (const e of fd.import_entries) {
        const varIdx = this.resolveVarIdx(fd, e.local_name);
        this.putLEB128(buf, varIdx);
        buf.putByte(0); // is_star (TODO: support namespace imports if needed)
        this.putAtom(buf, e.export_name);
        const reqIdx = fd.req_module_entries.findIndex(m => m.module_name === e.module_name);
        this.putLEB128(buf, reqIdx);
    }
    
    this.writeFunction(buf, fd);
  }

  resolveVarIdx(fd: JSFunctionDef, name: number): number {
      const closureIdx = fd.closure_var.findIndex(v => v.var_name === name);
      if (closureIdx !== -1) return closureIdx;
      
      const varIdx = fd.vars.findIndex(v => v.var_name === name);
      if (varIdx !== -1) return varIdx;
      
      const argIdx = fd.args.findIndex(v => v.var_name === name);
      if (argIdx !== -1) return argIdx;
      
      // console.warn(`Serializer: Variable not found for export/import: ${this.atomManager.getString(name)}`);
      return 0;
  }

  scanAndRewrite(fd: JSFunctionDef) {
    // Collect atoms from function fields
    this.getAtomIdx(fd.func_name);
    this.getAtomIdx(fd.filename);
    
    // Module entries
    for (const e of fd.req_module_entries) {
        this.getAtomIdx(e.module_name);
    }
    for (const e of fd.export_entries) {
        this.getAtomIdx(e.local_name);
        this.getAtomIdx(e.export_name);
    }
    for (const e of fd.star_export_entries) {
        this.getAtomIdx(e.module_name);
    }
    for (const e of fd.import_entries) {
        this.getAtomIdx(e.module_name);
        this.getAtomIdx(e.local_name);
        this.getAtomIdx(e.export_name);
    }
    
    // Vars
    for (const v of fd.vars) {
      this.getAtomIdx(v.var_name);
    }
    for (const a of fd.args) {
      this.getAtomIdx(a.var_name);
    }
    // Closure vars
    // TODO: closure vars

    // Bytecode
    const buf = fd.byte_code.buf;
    // We need to access the raw buffer to modify it
    // DynBuf doesn't expose raw buffer easily for modification in place if we use .buffer() which returns a copy/slice.
    // But we can use a DataView on the buffer?
    // Or just rewrite the buffer.
    
    // For now, let's assume we can read/write the buffer.
    // We'll create a new buffer for the rewritten bytecode.
    const newBuf = new DynBuf();
    const bytes = buf.buffer();
    let pos = 0;
    
    while (pos < bytes.length) {
      const op = bytes[pos];
      const def = OPCODE_MAP.get(op);
      if (!def) {
        throw new Error(`Unknown opcode: ${op}`);
      }
      
      newBuf.putByte(op);
      pos++;
      
      // Handle operands
      // We need to know the format.
      // OPCODE_DEFS has size, but not individual operand sizes easily?
      // Actually it has `format`.
      
      switch (def.format) {
        case OpFormat.none:
          break;
        case OpFormat.u8:
        case OpFormat.i8:
        case OpFormat.loc8:
        case OpFormat.const8:
        case OpFormat.label8:
          newBuf.putByte(bytes[pos]);
          pos++;
          break;
        case OpFormat.u16:
        case OpFormat.i16:
        case OpFormat.label16:
        case OpFormat.npop_u16:
          newBuf.putByte(bytes[pos]);
          newBuf.putByte(bytes[pos+1]);
          pos += 2;
          break;
        case OpFormat.u32:
        case OpFormat.i32:
        case OpFormat.const:
        case OpFormat.label:
          newBuf.putByte(bytes[pos]);
          newBuf.putByte(bytes[pos+1]);
          newBuf.putByte(bytes[pos+2]);
          newBuf.putByte(bytes[pos+3]);
          pos += 4;
          break;
        case OpFormat.atom: {
          // u32 atom (Little Endian)
          const atom = bytes[pos] | (bytes[pos+1] << 8) | (bytes[pos+2] << 16) | (bytes[pos+3] << 24);
          const idx = this.getAtomIdx(atom);
          newBuf.putU32(idx);
          pos += 4;
          break;
        }
        case OpFormat.atom_u8: {
          // u32 atom, u8
          const atom = bytes[pos] | (bytes[pos+1] << 8) | (bytes[pos+2] << 16) | (bytes[pos+3] << 24);
          const idx = this.getAtomIdx(atom);
          newBuf.putU32(idx);
          pos += 4;
          newBuf.putByte(bytes[pos]);
          pos++;
          break;
        }
        case OpFormat.atom_u16: {
          // u32 atom, u16
          const atom = bytes[pos] | (bytes[pos+1] << 8) | (bytes[pos+2] << 16) | (bytes[pos+3] << 24);
          const idx = this.getAtomIdx(atom);
          newBuf.putU32(idx);
          pos += 4;
          newBuf.putByte(bytes[pos]);
          newBuf.putByte(bytes[pos+1]);
          pos += 2;
          break;
        }
        // TODO: other formats
        default:
           // Fallback for fixed size
           for (let i = 1; i < def.size; i++) {
             newBuf.putByte(bytes[pos]);
             pos++;
           }
      }
    }
    
    // Replace buffer
    fd.byte_code.buf = newBuf;
  }

  getAtomIdx(atom: number): number {
    if (atom === 0) return 0; // JS_ATOM_NULL
    if (atom < this.atomManager.firstAtomId) return atom;

    if (this.atom_to_idx.has(atom)) {
      return this.atom_to_idx.get(atom)! + this.atomManager.firstAtomId;
    }
    const idx = this.idx_to_atom.length;
    this.idx_to_atom.push(atom);
    this.atom_to_idx.set(atom, idx);
    return idx + this.atomManager.firstAtomId;
  }

  writeAtoms() {
    this.putLEB128(this.buf, this.idx_to_atom.length);
    for (const atomId of this.idx_to_atom) {
      const str = this.atomManager.getString(atomId) || '';
      // QuickJS atom string format:
      // tag (1 byte) + string data?
      // No, JS_ReadObjectAtoms calls JS_NewAtomLen.
      // It reads len (LEB128).
      // If len is odd, it's 8-bit. If even, it's 16-bit (wide).
      // len = (len << 1) | is_wide.
      
      const len = str.length;
      const isWide = false; // Assume 8-bit for now
      this.putLEB128(this.buf, (len << 1) | (isWide ? 1 : 0));
      for (let i = 0; i < str.length; i++) {
        this.buf.putByte(str.charCodeAt(i));
      }
    }
  }

  writeFunction(buf: DynBuf, fd: JSFunctionDef) {
    buf.putByte(BytecodeTag.TC_TAG_FUNCTION_BYTECODE);
    
    // Flags
    const state = { flags: 0, bit: 0 };
    this.setFlags(state, fd.has_prototype, 1);
    this.setFlags(state, fd.has_simple_parameter_list, 1);
    this.setFlags(state, fd.is_derived_class_constructor, 1);
    this.setFlags(state, fd.need_home_object, 1);
    this.setFlags(state, fd.func_kind, 2);
    this.setFlags(state, fd.new_target_allowed, 1);
    this.setFlags(state, fd.super_call_allowed, 1);
    this.setFlags(state, fd.super_allowed, 1);
    this.setFlags(state, fd.arguments_allowed, 1);
    this.setFlags(state, fd.has_debug, 1);
    this.setFlags(state, fd.is_eval, 1);
    
    buf.putU16(state.flags);
    buf.putByte(fd.js_mode);
    this.putAtom(buf, fd.func_name);
    this.putLEB128(buf, fd.args.length); // arg_count
    
    this.putLEB128(buf, fd.vars.length); // var_count
    
    this.putLEB128(buf, fd.defined_arg_count); // defined_arg_count
    this.putLEB128(buf, fd.max_stack); // stack_size
    this.putLEB128(buf, fd.closure_var.length); // closure_var_count
    this.putLEB128(buf, fd.cpool.length);
    console.log('Serializer cpool length:', fd.cpool.length, 'for func:', this.atomManager.getString(fd.func_name));
    this.putLEB128(buf, fd.byte_code.getOffset());
    
    let local_count = fd.args.length + fd.vars.length;
    this.putLEB128(buf, local_count);
    
    // Vardefs (args then vars)
    const allVars = [...fd.args, ...fd.vars];
    for (const v of allVars) {
        this.putAtom(buf, v.var_name);
        this.putSLEB128(buf, v.scope_level);
        this.putLEB128(buf, v.scope_next === -1 ? 0 : v.scope_next);
        
        const state = { flags: 0, bit: 0 };
        this.setFlags(state, v.var_kind, 4);
        this.setFlags(state, v.is_const, 1);
        this.setFlags(state, v.is_lexical, 1);
        this.setFlags(state, v.is_captured, 1);
        buf.putByte(state.flags);
    }
    
    // Closure vars
    for (const cv of fd.closure_var) {
       this.putAtom(buf, cv.var_name);
       this.putLEB128(buf, cv.var_idx);
       
       const state = { flags: 0, bit: 0 };
       this.setFlags(state, cv.is_local, 1);
       this.setFlags(state, cv.is_arg, 1);
       this.setFlags(state, cv.is_const, 1);
       this.setFlags(state, cv.is_lexical, 1);
       this.setFlags(state, cv.var_kind, 4);
       buf.putByte(state.flags);
    }
    
    // Bytecode
    buf.put(fd.byte_code.buffer());
    
    // Debug info (if has_debug)
    if (fd.has_debug) {
       this.putAtom(buf, fd.filename);
       this.putLEB128(buf, fd.line_start); // line_num
       this.putLEB128(buf, fd.pc2line.size);
       buf.put(fd.pc2line.buffer());
       this.putAtom(buf, 0); // source (JS_ATOM_NULL)
    }

    // Cpool
    for (const val of fd.cpool) {
      this.writeValue(buf, val);
    }
  }

  putAtom(buf: DynBuf, atom: number) {
    const idx = this.getAtomIdx(atom);
    this.putLEB128(buf, idx << 1);
  }

  setFlags(state: { flags: number, bit: number }, val: number | boolean, n: number) {
    const v = typeof val === 'boolean' ? (val ? 1 : 0) : val;
    state.flags |= (v << state.bit);
    state.bit += n;
  }

  putLEB128(buf: DynBuf, val: number) {
    do {
      let byte = val & 0x7f;
      val >>>= 7;
      if (val !== 0) {
        byte |= 0x80;
      }
      buf.putByte(byte);
    } while (val !== 0);
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

  writeValue(buf: DynBuf, val: any) {
    if (val instanceof JSFunctionDef) {
      this.writeFunction(buf, val);
      return;
    }

    if (typeof val === 'boolean') {
        buf.putByte(val ? BytecodeTag.TC_TAG_BOOL_TRUE : BytecodeTag.TC_TAG_BOOL_FALSE);
        return;
    }

    if (typeof val === 'number') {
      if (Number.isInteger(val)) {
        buf.putByte(BytecodeTag.TC_TAG_INT32);
        this.putSLEB128(buf, val);
      } else {
        buf.putByte(BytecodeTag.TC_TAG_FLOAT64);
        const view = new DataView(new ArrayBuffer(8));
        view.setFloat64(0, val, true);
        for (let i = 0; i < 8; i++) {
          buf.putByte(view.getUint8(i));
        }
      }
    } else if (typeof val === 'string') {
      buf.putByte(BytecodeTag.TC_TAG_STRING);
      const len = val.length;
      this.putLEB128(buf, (len << 1));
      for (let i = 0; i < len; i++) {
        buf.putByte(val.charCodeAt(i));
      }
    } else {
        console.error('Serializer: Unknown value type in cpool:', val);
        // Write NULL to avoid corruption, but this is an error
        buf.putByte(BytecodeTag.TC_TAG_NULL);
    }
  }

}
