import { JSFunctionDef, JSVarDef, JSClosureVar, JSValue, JSVarKind } from './functionDef';
import { BytecodeWriter } from './bytecode';
import { AtomManager, JSAtom } from './atom';
import { BytecodeTag, env, OPCODE_DEFS, OPCODE_NAME_TO_CODE, OpFormat } from './env';

const JS_TAG_STRING = 7;

export class BytecodeSerializer {
  private writer: BytecodeWriter;
  private atomList: JSAtom[] = [];
  private atomMap: Map<JSAtom, number> = new Map();

  constructor() {
    this.writer = new BytecodeWriter();
  }

  serialize(func: JSFunctionDef): Uint8Array {
    // Pre-populate atomList from AtomManager to ensure all atoms (including those in bytecode) are included
    // and indices match.
    const atomManager = func.ctx.atomManager as AtomManager;
    const allAtoms = atomManager.dump();
    // console.log('All atoms:', allAtoms.slice(env.firstAtomId));
    // User atoms start at env.firstAtomId
    // atomToName array index is the atom ID.
    // We need to add atoms with ID >= env.firstAtomId to atomList.
    for (let i = env.firstAtomId; i < allAtoms.length; i++) {
        this.atomList.push(i);
        this.atomMap.set(i, i);
    }

    // 1. Serialize object (function/module) to temporary buffer
    const objWriter = new BytecodeWriter();
    
    // Ensure filename is in atoms (must be first for main module?)
    // It should already be in atomList if it was added to AtomManager.
    // if (func.filename !== 0) { // JS_ATOM_NULL
    //    this.getAtomIndex(func.filename);
    // }

    // Check if it's a module (global var + strict mode usually implies module in our context?)
    // Or we can just always wrap in module if we want to match WASM which seems to output module.
    // For now, let's try to output Module.
    this.writeModule(objWriter, func);

    // 2. Write header and atoms
    this.writer.putU8(env.bytecodeVersion);
    this.writeLEB128(this.writer, this.atomList.length);
    
    for (const atom of this.atomList) {
      this.writeAtom(this.writer, atom, func.ctx.atomManager);
    }

    // 3. Append object data
    this.writer.write(objWriter.buffer);

    return this.writer.buffer;
  }

  private writeModule(out: BytecodeWriter, func: JSFunctionDef) {
    out.putU8(BytecodeTag.TC_TAG_MODULE);
    
    // Module name
    // In WASM output, module name is the first atom (index 456)
    // We assume func.filename is the module name for now
    const moduleNameIdx = this.getAtomIndex(func.filename);
    this.writeAtomRef(out, moduleNameIdx);
    
    this.writeLEB128(out, 0); // req_module_entries_count
    this.writeLEB128(out, 0); // export_entries_count
    this.writeLEB128(out, 0); // star_export_entries_count
    this.writeLEB128(out, 0); // import_entries_count
    out.putU8(0); // has_tla
    
    // Ensure function stack size is accurate before writing
    func.stackSize = this.computeMaxStack(func.byteCode.buffer);
    this.writeFunction(out, func);
  }

  private computeMaxStack(buf: Uint8Array): number {
    // Build code->def map once
    const codeToDef: Record<number, any> = {};
    for (const [name, def] of Object.entries(OPCODE_DEFS)) {
      const code = (OPCODE_NAME_TO_CODE as Record<string, number>)[name.replace(/OP_/, '')] ?? (OPCODE_NAME_TO_CODE as Record<string, number>)[name];
      // The mapping in OPCODE_NAME_TO_CODE uses names without OP_ prefix for some entries,
      // but OPCODE_DEFS keys are the enum names (OP_xxx). Try both.
      if (typeof code === 'number') {
        codeToDef[code] = def;
      } else {
        // fallback: try using the key directly
        const alt = (OPCODE_NAME_TO_CODE as Record<string, number>)[name];
        if (typeof alt === 'number') codeToDef[alt] = def;
      }
    }

    let pos = 0;
    let cur = 0;
    let max = 0;
    const len = buf.length;
    while (pos < len) {
      const op = buf[pos++];
      const def = codeToDef[op];
      if (!def) {
        // Unknown opcode: stop parsing to avoid infinite loop
        break;
      }

      let nPop = def.nPop;
      const nPush = def.nPush;

      // Handle special formats
      if (def.format === OpFormat.npop) {
        // read u16 immediate (little-endian)
        if (pos + 1 >= len) break;
        const imm = buf[pos] | (buf[pos + 1] << 8);
        pos += 2;
        nPop = imm;
      } else {
        // Skip the remaining bytes of the opcode according to def.size
        const extra = Math.max(0, def.size - 1);
        pos += extra;
      }

      cur = cur - nPop + nPush;
      if (cur > max) max = cur;
    }

    return max;
  }

  private getAtomIndex(atom: JSAtom, atomManager?: AtomManager): number {
    if (atom === 0) return 0; // JS_ATOM_NULL
    
    // If we pre-populated, the atom should be in the map if it's a user atom.
    if (this.atomMap.has(atom)) {
      return this.atomMap.get(atom)!;
    }
    
    // Check for built-in atoms (hack for <eval>)
    // We need atomManager to check the string value
    if (atomManager) {
        const str = atomManager.getString(atom);
        if (str === '<eval>') {
            // JS_ATOM_eval_ (built-in)
            // Index 82 (shifted 164) observed in WASM output
            return 82;
        }
    }
    
    // If it's not in map and not built-in, it might be a standard atom (ID < env.firstAtomId)
    // In that case, return the ID directly.
    if (atom < env.firstAtomId) {
        return atom;
    }

    // Should not happen if we pre-populated correctly
    // But if it does, add it.
    const idx = this.atomList.length + env.firstAtomId;
    this.atomList.push(atom);
    this.atomMap.set(atom, idx);
    return idx;
  }

  private writeAtomRef(out: BytecodeWriter, atomIdx: number) {
      // QuickJS shifts atom index left by 1 for untagged atoms
      this.writeLEB128(out, atomIdx << 1);
  }

  private writeFunction(out: BytecodeWriter, func: JSFunctionDef) {
    // Ensure stack size is computed
    func.stackSize = this.computeMaxStack(func.byteCode.buffer);

    out.putU8(BytecodeTag.TC_TAG_FUNCTION_BYTECODE);
    
    // Flags
    // Match WASM output: 0x0620
    // Bit 5: new_target_allowed
    // Bit 9: has_debug
    // Bit 10: is_direct_or_indirect_eval
    
    let flags = 0;
    if (func.hasPrototype) flags |= (1 << 0);
    if (func.hasSimpleParameterList) flags |= (1 << 1);
    if (func.isDerivedClassConstructor) flags |= (1 << 2);
    if (func.hasHomeObject) flags |= (1 << 3);
    flags |= (func.funcKind << 4);
    if (func.newTargetAllowed) flags |= (1 << 6);
    if (func.superCallAllowed) flags |= (1 << 7);
    if (func.superAllowed) flags |= (1 << 8);
    if (func.argumentsAllowed) flags |= (1 << 9);
    
    const hasDebug = true;
    if (hasDebug) flags |= (1 << 10);
    
    if (func.isEval) flags |= (1 << 11);

    out.putU16(flags);
    
    out.putU8(func.jsMode);
    
    const nameIdx = this.getAtomIndex(func.funcName, func.ctx.atomManager);
    this.writeAtomRef(out, nameIdx);
    
    this.writeLEB128(out, func.args.length); // arg_count
    this.writeLEB128(out, func.vars.length); // var_count
    this.writeLEB128(out, func.args.length); // defined_arg_count
    this.writeLEB128(out, func.stackSize);
    this.writeLEB128(out, func.closureVar.length);
    this.writeLEB128(out, func.cpool.length);
    this.writeLEB128(out, func.byteCode.size);
    
    // Locals
    // Write total count first
    this.writeLEB128(out, func.args.length + func.vars.length);
    
    // Write args
    for (const arg of func.args) {
        this.writeVarDef(out, arg);
    }
    
    // For now, just write vars.
    // TODO: Handle args properly
    for (const v of func.vars) {
      this.writeVarDef(out, v);
    }
    
    // Closure vars
    for (const cv of func.closureVar) {
      this.writeClosureVar(out, cv);
    }
    
    // Bytecode
    out.write(func.byteCode.buffer);
    
    // Debug info
    if (hasDebug) {
        const filenameIdx = this.getAtomIndex(func.filename, func.ctx.atomManager);
        this.writeAtomRef(out, filenameIdx);
        
        // pc2line
        const pc2lineBuf = func.pc2line.buffer;
        this.writeLEB128(out, pc2lineBuf.length);
        out.write(pc2lineBuf);
        
        // source
        this.writeLEB128(out, 0); // len
        // buf (empty)
    }

    // CPool
    for (const val of func.cpool) {
      this.writeValue(out, val);
    }
  }

  private writeVarDef(out: BytecodeWriter, v: JSVarDef) {
    const nameIdx = this.getAtomIndex(v.varName);
    this.writeAtomRef(out, nameIdx);
    this.writeLEB128(out, v.scopeLevel);
    // QuickJS uses 0 for end of chain, but we initialized to -1.
    // If -1, write 0 to save space and match behavior (assuming no collision)
    const next = v.scopeNext === -1 ? 0 : v.scopeNext;
    this.writeLEB128(out, next);
    out.putU8(v.varKind);
  }

  private writeClosureVar(out: BytecodeWriter, cv: JSClosureVar) {
    const nameIdx = this.getAtomIndex(cv.varName);
    this.writeAtomRef(out, nameIdx);
    this.writeLEB128(out, cv.varIdx);
    
    let flags = 0;
    if (cv.isLocal) flags |= 1;
    if (cv.isArg) flags |= 2;
    if (cv.isConst) flags |= 4;
    if (cv.isLexical) flags |= 8;
    flags |= (cv.varKind << 4);
    
    out.putU8(flags);
  }

  private writeValue(out: BytecodeWriter, val: JSValue) {
    // TODO: Implement value serialization
    // For now, assume string or int
    if (val.type === 'string') {
        out.putU8(BytecodeTag.TC_TAG_STRING);
        const buf = Buffer.from(val.value, 'utf8');
        this.writeLEB128(out, buf.length);
        out.write(buf);
    } else if (val.type === 'number') {
        if (Number.isInteger(val.value)) {
            out.putU8(BytecodeTag.TC_TAG_INT32);
            out.putU32(val.value);
        } else {
            out.putU8(BytecodeTag.TC_TAG_FLOAT64);
            const buf = Buffer.alloc(8);
            buf.writeDoubleLE(val.value);
            out.write(buf);
        }
    } else if (val.type === 'function') {
        this.writeFunction(out, val.value as JSFunctionDef);
    } else {
        out.putU8(BytecodeTag.TC_TAG_NULL);
    }
  }

  private writeAtom(out: BytecodeWriter, atom: JSAtom, atomManager: AtomManager) {
    const str = atomManager.getString(atom);
    // out.putU8(JS_TAG_STRING); // Atoms in table don't have tag prefix in QuickJS 2021+?
    // Wait, JS_WriteObjectAtoms calls JS_WriteString.
    // JS_WriteString writes tag if it's a value, but here it's just string content?
    // No, JS_WriteString writes: len << 1 | is_wide, then data.
    
    const buf = Buffer.from(str, 'utf8');
    // Assume 8-bit string (is_wide = 0)
    const lenField = (buf.length << 1) | 0;
    this.writeLEB128(out, lenField);
    out.write(buf);
  }

  private writeLEB128(out: BytecodeWriter, val: number) {
    do {
      let byte = val & 0x7f;
      val >>>= 7;
      if (val !== 0) {
        byte |= 0x80;
      }
      out.putU8(byte);
    } while (val !== 0);
  }
}
