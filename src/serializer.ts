import { JSFunctionDef, JSVarDef, JSClosureVar, JSValue, JSVarKind } from './functionDef'
import { BytecodeWriter } from './bytecode'
import { AtomManager, JSAtom } from './atom'
import { BytecodeTag, env, OPCODE_DEFS, OPCODE_NAME_TO_CODE, OpFormat } from './env'

export class BytecodeSerializer {
  private writer: BytecodeWriter
  private atoms: JSAtom[] = []
  private atomById: Map<JSAtom, number> = new Map()

  constructor() {
    this.writer = new BytecodeWriter()
  }

  serialize(func: JSFunctionDef): Uint8Array {
    // Pre-populate atoms from AtomManager to ensure all atoms (including those in bytecode) are included
    // and indices match.
    const atomManager = func.ctx.atomManager as AtomManager
    const allAtoms = atomManager.dump()
    // User atoms start at env.firstAtomId
    // atomToName array index is the atom ID.
    // We need to add atoms with ID >= env.firstAtomId to atoms.
    for (let i = env.firstAtomId; i < allAtoms.length; i++) {
      this.atoms.push(i)
      this.atomById.set(i, i)
    }

    // 1. Serialize object (function/module) to temporary buffer
    const objWriter = new BytecodeWriter()
    
    // Ensure filename is in atoms (must be first for main module?)
    // It should already be in atoms if it was added to AtomManager.
    // if (func.filename !== 0) { // JS_ATOM_NULL
    //    this.getAtomIndex(func.filename);
    // }

    // Check if it's a module (global var + strict mode usually implies module in our context?)
    // Or we can just always wrap in module if we want to match WASM which seems to output module.
    // For now, let's try to output Module.
    this.writeModule(objWriter, func)

    // 2. Write header and atoms
    this.writer.putU8(env.bytecodeVersion)
    this.writeLEB128(this.writer, this.atoms.length)
    
    for (const atom of this.atoms) {
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
    
    this.writeFunction(out, func);
  }

  private computeMaxStack(buf: Uint8Array): number {
    // Build code->def map once
    const codeToDef: Record<number, any> = {};
    for (const [name, def] of Object.entries(OPCODE_DEFS)) {
      const code = (OPCODE_NAME_TO_CODE as Record<string, number>)[name.replace(/OP_/, '')] ?? (OPCODE_NAME_TO_CODE as Record<string, number>)[name];
      if (typeof code === 'number') {
        codeToDef[code] = def;
      } else {
        const alt = (OPCODE_NAME_TO_CODE as Record<string, number>)[name];
        if (typeof alt === 'number') codeToDef[alt] = def;
      }
    }

    const depths = new Map<number, number>();
    const queue: number[] = [0];
    depths.set(0, 0);
    
    let max = 0;
    const len = buf.length;

    while (queue.length > 0) {
      let pos = queue.shift()!;
      let cur = depths.get(pos)!;

      while (pos < len) {
        const op = buf[pos];
        const def = codeToDef[op];
        if (!def) break;

        let nPop = def.nPop;
        const nPush = def.nPush;
        const startPos = pos;
        pos++; // skip op

        // Handle special formats
        if (def.format === OpFormat.npop) {
          if (pos + 1 >= len) break;
          const imm = buf[pos] | (buf[pos + 1] << 8);
          pos += 2;
          nPop = imm;
          switch (def.id) {
            case 'call':
            case 'tail_call':
            case 'call_constructor':
            case 'eval':
              nPop += 1;
              break;
            case 'call_method':
            case 'tail_call_method':
              nPop += 2;
              break;
          }
        } else if (def.format === OpFormat.npopx) {
          if (def.id === 'call1') nPop += 1;
          else if (def.id === 'call2') nPop += 2;
          else if (def.id === 'call3') nPop += 3;
        } else if (def.format === OpFormat.npop_u16) {
          if (pos + 3 >= len) break;
          const argc = buf[pos] | (buf[pos + 1] << 8);
          pos += 4;
          nPop = argc + 1;
        } else if (def.id === 'call' || def.id === 'call_method' || def.id === 'tail_call' || def.id === 'tail_call_method' || def.id === 'call_constructor') {
          if (pos + 1 >= len) break;
          const argc = buf[pos] | (buf[pos + 1] << 8);
          pos += 2;
          nPop = argc;
          if (def.id === 'call' || def.id === 'tail_call' || def.id === 'call_constructor') nPop += 1;
          if (def.id === 'call_method' || def.id === 'tail_call_method') nPop += 2;
        } else {
          const extra = Math.max(0, def.size - 1);
          pos += extra;
        }

        cur = cur - nPop + nPush;
        if (cur > max) max = cur;

        // Handle branches
        if (def.id === 'goto8' || def.id === 'if_false8' || def.id === 'if_true8') {
          const offset = (buf[startPos + 1] << 24) >> 24; // signed i8
          const target = startPos + 1 + offset;
          if (!depths.has(target)) {
            depths.set(target, cur);
            queue.push(target);
          }
        } else if (def.id === 'goto' || def.id === 'if_false' || def.id === 'if_true' || def.id === 'catch' || def.id === 'gosub') {
          const offset = buf[startPos + 1] | (buf[startPos + 2] << 8) | (buf[startPos + 3] << 16) | (buf[startPos + 4] << 24);
          const signedOffset = offset | 0;
          const target = startPos + 1 + signedOffset;
          
          let targetStack = cur;
          if (def.id === 'gosub') {
            // Heuristic: WASM output suggests gosub overhead is 1 (or catch overhead is 0)
            // If we use +2, we get stack size 6. WASM has 5.
            targetStack = cur + 1;
          }

          if (!depths.has(target)) {
            depths.set(target, targetStack);
            queue.push(target);
          }
        }
        
        // Stop if unconditional jump
        if (def.id === 'goto8' || def.id === 'goto' || def.id === 'return' || def.id === 'return_undef' || def.id === 'return_async' || def.id === 'throw' || def.id === 'tail_call' || def.id === 'tail_call_method') {
          break;
        }
        
        // Continue to next instruction
        if (depths.has(pos)) {
          // Merge? For now assume consistent stack
          break;
        }
        depths.set(pos, cur);
      }
    }

    return max;
  }

  private getEffectiveStackUsage(func: JSFunctionDef): number {
    const tracked = func.byteCode.stackMax ?? 0;
    const analyzed = this.computeMaxStack(func.byteCode.buffer);
    return Math.max(tracked, analyzed);
  }

  private getAtomIndex(atom: JSAtom, atomManager?: AtomManager): number {
    if (atom === 0) return 0; // JS_ATOM_NULL
    
    // If we pre-populated, the atom should be in the map if it's a user atom.
    if (this.atomById.has(atom)) {
      return this.atomById.get(atom)!;
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
    const idx = this.atoms.length + env.firstAtomId;
    this.atoms.push(atom);
    this.atomById.set(atom, idx);
    return idx;
  }

  private writeAtomRef(out: BytecodeWriter, atomIdx: number) {
    // QuickJS shifts atom index left by 1 for untagged atoms
    this.writeLEB128(out, atomIdx << 1);
  }

  private writeFunction(out: BytecodeWriter, func: JSFunctionDef) {
    const bytecodeStack = this.getEffectiveStackUsage(func);
    if (func.isGlobalVar) {
      const computed = Math.max(func.anonymousLocalsCount, bytecodeStack);
      func.stackSize = Math.max(func.stackSize, computed);
    } else {
      const envOverhead = func.args.length + func.vars.length + func.anonymousLocalsCount;
      const computed = envOverhead + bytecodeStack;
      func.stackSize = Math.max(func.stackSize, computed);
    }
    
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
    
    const argCount = func.argCount !== -1 ? func.argCount : func.args.length;
    this.writeLEB128(out, argCount); // arg_count
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
    // Force recompile
    this.writeAtomRef(out, v.varName);
    this.writeLEB128(out, v.scopeLevel);
    this.writeLEB128(out, v.scopeNext + 1);
    
    const JS_VAR_DEF_CONST = 0x10;
    const JS_VAR_DEF_LEXICAL = 0x20;
    const JS_VAR_DEF_CAPTURED = 0x40;

    let kind = v.varKind;
    if (v.isConst) kind |= JS_VAR_DEF_CONST;
    if (v.isLexical) kind |= JS_VAR_DEF_LEXICAL;
    if (v.isCaptured) kind |= JS_VAR_DEF_CAPTURED;
    
    out.putU8(kind);
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
    // QuickJS bytecode atom table does not include the tag for strings, and shifts length
    // out.putU8(BytecodeTag.TC_TAG_STRING);
    const buf = Buffer.from(str, 'utf8');
    
    // Check if we need wide characters (not implemented yet, assuming 8-bit)
    // QuickJS stores length as (len << 1) | is_wide
    const isWide = 0;
    this.writeLEB128(out, (buf.length << 1) | isWide);
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
