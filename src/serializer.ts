import { JSFunctionDef, JSVarDef, JSClosureVar, JSValue, JSVarKind } from './functionDef'
import { BytecodeWriter } from './bytecode'
import { AtomManager, JSAtom } from './atom'
import {
  BytecodeTag,
  env,
  OPCODE_DEFS,
  Opcode,
  OpFormat,
  PC2Line,
  SHORT_OPCODE_DEFS,
} from './env'

type OpcodeDefinitionByCode = Array<typeof OPCODE_DEFS[string] | undefined>

const opcodeDefsByCode: OpcodeDefinitionByCode = (() => {
  const table: OpcodeDefinitionByCode = []
  const opcodeMap = Opcode as unknown as Record<string, number>

  for (const [name, def] of Object.entries(OPCODE_DEFS)) {
    const code = opcodeMap[name]
    if (typeof code === 'number') {
      table[code] = def
    }
  }

  for (const [name, def] of Object.entries(SHORT_OPCODE_DEFS)) {
    const code = opcodeMap[name]
    if (typeof code === 'number') {
      table[code] = def
    }
  }

  return table
})()

const readU16 = (buf: Uint8Array, offset: number): number =>
  buf[offset] | (buf[offset + 1] << 8)

const readI16 = (value: number): number => (value << 16) >> 16

const readI8 = (value: number): number => (value << 24) >> 24

const readI32 = (buf: Uint8Array, offset: number): number =>
  (buf[offset] |
    (buf[offset + 1] << 8) |
    (buf[offset + 2] << 16) |
    (buf[offset + 3] << 24))

const opcodeNamesByCode = Opcode as unknown as Record<number, string>

const getOpcodeName = (op: number): string => opcodeNamesByCode[op] ?? `op_${op}`

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

  private finalizePc2Line(func: JSFunctionDef) {
    if (func.pc2lineFinalized)
      return;

    if (func.hasPendingLineInfo) {
      const pc = func.byteCode.size;
      func.lineNumberSlots.push({
        pc,
        sourcePos: func.pendingSourcePos,
        line: func.pendingLineNum,
        column: func.pendingColumnNum,
      });
      func.hasPendingLineInfo = false;
    }

    const slots = func.lineNumberSlots ?? [];
    func.pc2line.reset();

    const initialLine = Math.max(0, func.initialLineNum - 1);
    const initialCol = Math.max(0, func.initialColumnNum - 1);
    func.pc2line.writeULEB128(initialLine);
    func.pc2line.writeULEB128(initialCol);

    let lastPc = 0;
    let lastLine = initialLine;
    let lastCol = initialCol;

    for (const slot of slots) {
      const diffPc = slot.pc - lastPc;
      if (diffPc < 0)
        continue;

      const slotLine = Math.max(0, slot.line - 1);
      const slotCol = Math.max(0, slot.column - 1);
      const diffLine = slotLine - lastLine;
      const diffCol = slotCol - lastCol;

      if (diffLine === 0 && diffCol === 0)
        continue;

      let op = 0;
      if (
        diffLine >= PC2Line.PC2LINE_BASE &&
        diffLine < PC2Line.PC2LINE_BASE + PC2Line.PC2LINE_RANGE &&
        diffPc <= PC2Line.PC2LINE_DIFF_PC_MAX
      ) {
        op =
          PC2Line.PC2LINE_OP_FIRST +
          diffPc * PC2Line.PC2LINE_RANGE +
          (diffLine - PC2Line.PC2LINE_BASE);
      }

      if (op > 0 && op <= 0xff) {
        func.pc2line.putU8(op);
      } else {
        func.pc2line.putU8(0);
        func.pc2line.writeULEB128(diffPc);
        func.pc2line.writeZigZag(diffLine);
      }
      func.pc2line.writeZigZag(diffCol);

      lastPc = slot.pc;
      lastLine = slotLine;
      lastCol = slotCol;
    }

    func.pc2lineFinalized = true;
  }

  private computeMaxStack(buf: Uint8Array): number {
  const debugStack = process.env.DEBUG_STACK === '1'
  const verboseStack = process.env.DEBUG_STACK_VERBOSE === '1'
    const len = buf.length
    if (len === 0) return 0

    const stackLevels = new Map<number, number>()
    const catchPositions = new Map<number, number>()
    const queue: number[] = []
    let max = 0

    const trackMax = (depth: number, pos: number, opLabel: string) => {
      if (depth > max) {
        max = depth
        if (debugStack) {
          console.debug('[stack]', { pos, op: opLabel, depth })
        }
      }
    }

    const enqueue = (pos: number, depth: number, catchPos: number, sourceOp: number) => {
      if (pos < 0 || pos > len) {
        throw new Error(
          `bytecode jump out of range (op=${getOpcodeName(sourceOp)}, target=${pos})`,
        )
      }
      if (pos === len) {
        return
      }
      const existingDepth = stackLevels.get(pos)
      if (existingDepth !== undefined) {
        const existingCatch = catchPositions.get(pos) ?? -1
        if (existingDepth !== depth || existingCatch !== catchPos) {
          throw new Error(`inconsistent stack state at pc=${pos}`)
        }
        return
      }
      stackLevels.set(pos, depth)
      catchPositions.set(pos, catchPos)
      queue.push(pos)
      trackMax(depth, pos, getOpcodeName(sourceOp))
    }

    enqueue(0, 0, -1, Opcode.OP_invalid)

    while (queue.length > 0) {
      const pos = queue.pop()!
      let stackLen = stackLevels.get(pos) ?? 0
      let catchPos = catchPositions.get(pos) ?? -1

      if (pos >= len)
        continue

      const op = buf[pos]
      const def = opcodeDefsByCode[op]
      if (!def)
        throw new Error(`unknown opcode ${op} at pc=${pos}`)

      const opName = def.id ?? getOpcodeName(op)
      let posNext = pos + def.size
      if (posNext > len)
        throw new Error(`bytecode overflow for ${opName} at pc=${pos}`)

      let nPop = def.nPop
      switch (def.format) {
        case OpFormat.npop:
        case OpFormat.npop_u16: {
          if (pos + 2 >= len)
            throw new Error(`truncated bytecode for ${opName} at pc=${pos}`)
          const imm = readU16(buf, pos + 1)
          nPop += imm
          break
        }
        case OpFormat.npopx:
          nPop += op - Opcode.OP_call0
          break
      }

      stackLen -= nPop
      if (stackLen < 0)
        throw new Error(`stack underflow near ${opName} at pc=${pos}`)
      stackLen += def.nPush
      if (verboseStack) {
        console.debug('[stack:trace]', {
          pos,
          op: opName,
          nPop,
          nPush: def.nPush,
          depth: stackLen,
          catchPos,
        })
      }
      trackMax(stackLen, pos, opName)

      let fallthrough = true

      switch (op) {
        case Opcode.OP_tail_call:
        case Opcode.OP_tail_call_method:
        case Opcode.OP_return:
        case Opcode.OP_return_undef:
        case Opcode.OP_return_async:
        case Opcode.OP_throw:
        case Opcode.OP_throw_error:
        case Opcode.OP_ret:
          fallthrough = false
          break
        case Opcode.OP_goto: {
          const diff = readI32(buf, pos + 1)
          posNext = pos + 1 + diff
          break
        }
        case Opcode.OP_goto16: {
          const diff = readI16(readU16(buf, pos + 1))
          posNext = pos + 1 + diff
          break
        }
        case Opcode.OP_goto8: {
          const diff = readI8(buf[pos + 1])
          posNext = pos + 1 + diff
          break
        }
        case Opcode.OP_if_true:
        case Opcode.OP_if_false: {
          const diff = readI32(buf, pos + 1)
          enqueue(pos + 1 + diff, stackLen, catchPos, op)
          break
        }
        case Opcode.OP_if_true8:
        case Opcode.OP_if_false8: {
          const diff = readI8(buf[pos + 1])
          enqueue(pos + 1 + diff, stackLen, catchPos, op)
          break
        }
        case Opcode.OP_gosub: {
          const diff = readI32(buf, pos + 1)
          enqueue(pos + 1 + diff, stackLen + 1, catchPos, op)
          break
        }
        case Opcode.OP_with_get_var:
        case Opcode.OP_with_delete_var: {
          const diff = readI32(buf, pos + 5)
          enqueue(pos + 5 + diff, stackLen + 1, catchPos, op)
          break
        }
        case Opcode.OP_with_make_ref:
        case Opcode.OP_with_get_ref: {
          const diff = readI32(buf, pos + 5)
          enqueue(pos + 5 + diff, stackLen + 2, catchPos, op)
          break
        }
        case Opcode.OP_with_put_var: {
          const diff = readI32(buf, pos + 5)
          enqueue(pos + 5 + diff, stackLen - 1, catchPos, op)
          break
        }
        case Opcode.OP_catch: {
          const diff = readI32(buf, pos + 1)
          enqueue(pos + 1 + diff, stackLen, catchPos, op)
          catchPos = pos
          break
        }
        case Opcode.OP_for_of_start:
        case Opcode.OP_for_await_of_start:
          catchPos = pos
          break
        case Opcode.OP_drop:
        case Opcode.OP_nip:
        case Opcode.OP_nip1:
        case Opcode.OP_iterator_close: {
          let catchLevel = stackLen
          if (op === Opcode.OP_nip || op === Opcode.OP_nip1)
            catchLevel = stackLen - 1
          else if (op === Opcode.OP_iterator_close)
            catchLevel = stackLen + 2
          if (catchPos >= 0) {
            let level = stackLevels.get(catchPos) ?? 0
            if (buf[catchPos] !== Opcode.OP_catch)
              level++
            if (catchLevel === level)
              catchPos = catchPositions.get(catchPos) ?? -1
          }
          break
        }
        case Opcode.OP_nip_catch: {
          if (catchPos < 0)
            throw new Error(`nip_catch without active catch at pc=${pos}`)
          stackLen = stackLevels.get(catchPos) ?? 0
          if (buf[catchPos] !== Opcode.OP_catch)
            stackLen++
          stackLen++
          trackMax(stackLen, pos, opName)
          catchPos = catchPositions.get(catchPos) ?? -1
          break
        }
      }

      if (fallthrough)
        enqueue(posNext, stackLen, catchPos, op)
    }

    return max
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
    const requiredStack = Math.max(bytecodeStack, func.anonymousLocalsCount);
    func.stackSize = Math.max(func.stackSize, requiredStack);
    
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
      this.finalizePc2Line(func);
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
