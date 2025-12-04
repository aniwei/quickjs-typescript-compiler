import {
  JSFunctionDef,
  JSVarDef,
  JSClosureVar,
  JSValue,
  JSVarKind,
  ModuleExportEntry,
  ModuleExportType,
  ModuleRecord,
} from './functionDef'
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

const readU32 = (buf: Uint8Array, offset: number): number =>
  (buf[offset] |
    (buf[offset + 1] << 8) |
    (buf[offset + 2] << 16) |
    (buf[offset + 3] << 24)) >>> 0

const writeU32 = (buf: Uint8Array, offset: number, value: number) => {
  buf[offset] = value & 0xff
  buf[offset + 1] = (value >>> 8) & 0xff
  buf[offset + 2] = (value >>> 16) & 0xff
  buf[offset + 3] = (value >>> 24) & 0xff
}

const opcodeNamesByCode = Opcode as unknown as Record<number, string>

const getOpcodeName = (op: number): string => opcodeNamesByCode[op] ?? `op_${op}`

export class BytecodeSerializer {
  private writer: BytecodeWriter
  private atoms: JSAtom[] = []
  private atomById: Map<JSAtom, number> = new Map()
  private usedAtoms: Set<JSAtom> = new Set()

  private reset() {
    this.writer.reset()
    this.atoms = []
    this.atomById.clear()
    this.usedAtoms.clear()
  }

  constructor() {
    this.writer = new BytecodeWriter()
  }

  serialize(func: JSFunctionDef): Uint8Array {
    this.reset()
    const atomManager = func.ctx.atomManager as AtomManager
    this.collectAtoms(func)

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
      this.writeAtom(this.writer, atom, atomManager)
    }

    // 3. Append object data
    this.writer.write(objWriter.buffer);

    return this.writer.buffer;
  }

  private collectAtoms(func: JSFunctionDef) {
    this.markFunctionAtoms(func)
    const orderedAtoms = Array.from(this.usedAtoms).sort((a, b) => a - b)
    this.atoms = orderedAtoms
    this.atomById.clear()
    orderedAtoms.forEach((atom, idx) => {
      this.atomById.set(atom, env.firstAtomId + idx)
    })
  }

  private markFunctionAtoms(func: JSFunctionDef) {
    this.markAtom(func.funcName)
    this.markAtom(func.filename)
    func.args.forEach(arg => this.markAtom(arg.varName))
    func.vars.forEach(v => this.markAtom(v.varName))
    func.closureVar?.forEach(cv => this.markAtom(cv.varName))
    func.globalVars?.forEach(gv => this.markAtom(gv.varName))
    if (func.module && !func.parent) {
      this.collectModuleAtoms(func.module)
    }
    this.collectBytecodeAtoms(func)
    func.cpool.forEach(entry => {
      if (entry.type === 'function' && entry.value) {
        this.markFunctionAtoms(entry.value as JSFunctionDef)
      }
    })
  }

  private collectModuleAtoms(module: ModuleRecord) {
    this.markAtom(module.moduleName)
    module.exportEntries.forEach(entry => {
      if (entry.localName) this.markAtom(entry.localName)
      this.markAtom(entry.exportedName)
    })
    module.importEntries.forEach(entry => {
      this.markAtom(entry.importName)
    })
    module.requireEntries.forEach(entry => {
      this.markAtom(entry.moduleName)
    })
  }

  private collectBytecodeAtoms(func: JSFunctionDef) {
    const buf = func.byteCode.buffer
    let pos = 0
    while (pos < buf.length) {
      const op = buf[pos]
      const def = opcodeDefsByCode[op]
      if (!def) {
        throw new Error(`unknown opcode ${op} at pc=${pos}`)
      }
      if (pos + def.size > buf.length) {
        throw new Error(`truncated bytecode for ${getOpcodeName(op)} at pc=${pos}`)
      }
      switch (def.format) {
        case OpFormat.atom:
        case OpFormat.atom_u8:
        case OpFormat.atom_u16:
        case OpFormat.atom_label_u8:
        case OpFormat.atom_label_u16: {
          const atom = readU32(buf, pos + 1) as JSAtom
          this.markAtom(atom)
          break
        }
      }
      pos += def.size
    }
  }

  private markAtom(atom: JSAtom) {
    if (!atom) return
    if (atom < env.firstAtomId) return
    this.usedAtoms.add(atom)
  }

  private writeModule(out: BytecodeWriter, func: JSFunctionDef) {
    out.putU8(BytecodeTag.TC_TAG_MODULE);

    const moduleRecord = func.module;
    const moduleNameAtom = moduleRecord?.moduleName ?? func.filename;
    const moduleNameIdx = this.getAtomIndex(moduleNameAtom);
    this.writeAtomRef(out, moduleNameIdx);

    const requireEntries = moduleRecord?.requireEntries ?? [];
    this.writeLEB128(out, requireEntries.length);
    for (const entry of requireEntries) {
      this.writeAtomRef(out, this.getAtomIndex(entry.moduleName));
      const attr = entry.attributes;
      if (!attr) {
        out.putU8(BytecodeTag.TC_TAG_NULL);
      } else {
        this.writeValue(out, attr);
      }
    }

    const orderedExports = this.getOrderedExportEntries(moduleRecord);
    this.writeLEB128(out, orderedExports.length);
    for (const entry of orderedExports) {
      out.putU8(entry.type);
      if (entry.type === ModuleExportType.Local) {
        this.writeLEB128(out, entry.localVarIndex ?? 0);
      } else {
        this.writeLEB128(out, entry.reqModuleIndex ?? 0);
        const localNameAtom = entry.localName ?? entry.exportedName;
        this.writeAtomRef(out, this.getAtomIndex(localNameAtom));
      }
      this.writeAtomRef(out, this.getAtomIndex(entry.exportedName));
    }

    const starExportEntries = moduleRecord?.starExportEntries ?? [];
    this.writeLEB128(out, starExportEntries.length);
    for (const reqIdx of starExportEntries) {
      this.writeLEB128(out, reqIdx);
    }

    const importEntries = moduleRecord?.importEntries ?? [];
    this.writeLEB128(out, importEntries.length);
    for (const entry of importEntries) {
      this.writeLEB128(out, entry.varIdx);
      out.putU8(entry.isStar ? 1 : 0);
      this.writeAtomRef(out, this.getAtomIndex(entry.importName));
      this.writeLEB128(out, entry.reqModuleIndex);
    }

    out.putU8(moduleRecord?.hasTopLevelAwait ? 1 : 0);

    this.writeFunction(out, func);
  }

  private getOrderedExportEntries(moduleRecord?: ModuleRecord | null): ModuleExportEntry[] {
    const exportEntries = moduleRecord?.exportEntries ?? []
    return [...exportEntries].sort((a, b) => {
      const aOrder = a.order ?? 0
      const bOrder = b.order ?? 0
      return aOrder - bOrder
    })
  }

  private finalizePc2Line(func: JSFunctionDef) {
    if (func.pc2lineFinalized)
      return;

    if (func.hasPendingLineInfo) {
      const pc = func.pendingLinePcOverride ?? func.byteCode.size;
      func.lineNumberSlots.push({
        pc,
        sourcePos: func.pendingSourcePos,
        line: func.pendingLineNum,
        column: func.pendingColumnNum,
      });
      func.hasPendingLineInfo = false;
      func.pendingLinePcOverride = null;
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

  private getAtomDebugName(atom: JSAtom, atomManager?: AtomManager | null): string {
    if (!atomManager)
      return atom ? `#${atom}` : '<null>'
    const text = atomManager.getString(atom)
    if (!text || text.length === 0)
      return atom ? `#${atom}` : '<null>'
    return text
  }

  private describeFunction(func?: JSFunctionDef | null): string {
    if (!func)
      return '<unknown>'
    const atomManager = func.ctx?.atomManager as AtomManager | undefined
    const name = this.getAtomDebugName(func.funcName, atomManager)
    const filename = this.getAtomDebugName(func.filename, atomManager)
    return `${name}@${filename}`
  }

  private computeMaxStack(buf: Uint8Array, func?: JSFunctionDef): number {
  const debugStack = process.env.DEBUG_STACK === '1'
  const verboseStack = process.env.DEBUG_STACK_VERBOSE === '1'
  const allowInconsistentStack = process.env.DEBUG_STACK_ALLOW_INCONSISTENT === '1'
    const len = buf.length
    if (len === 0) return 0
    if (verboseStack && func) {
      console.debug('[stack:func]', { func: this.describeFunction(func) })
    }

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
          if (allowInconsistentStack) {
            return
          }
          const existingCatchText = existingCatch === -1 ? 'none' : existingCatch.toString()
          const catchText = catchPos === -1 ? 'none' : catchPos.toString()
          const funcLabel = this.describeFunction(func)
          throw new Error(
            `inconsistent stack state at pc=${pos} (existingDepth=${existingDepth}, incomingDepth=${depth}, existingCatch=${existingCatchText}, incomingCatch=${catchText}, source=${getOpcodeName(sourceOp)}, func=${funcLabel})`,
          )
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
        throw new Error(`unknown opcode ${op} at pc=${pos} (func=${this.describeFunction(func)})`)

      const opName = def.id ?? getOpcodeName(op)
      let posNext = pos + def.size
      if (posNext > len)
        throw new Error(`bytecode overflow for ${opName} at pc=${pos} (func=${this.describeFunction(func)})`)

      let nPop = def.nPop
      switch (def.format) {
        case OpFormat.npop:
        case OpFormat.npop_u16: {
          if (pos + 2 >= len)
            throw new Error(`truncated bytecode for ${opName} at pc=${pos} (func=${this.describeFunction(func)})`)
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
        throw new Error(`stack underflow near ${opName} at pc=${pos} (func=${this.describeFunction(func)})`)
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
    const analyzed = this.computeMaxStack(func.byteCode.buffer, func);
    return Math.max(tracked, analyzed);
  }

  private getAtomIndex(atom: JSAtom): number {
    if (atom === 0) return 0 // JS_ATOM_NULL

    if (atom < env.firstAtomId) {
      return atom
    }

    const existing = this.atomById.get(atom)
    if (existing === undefined) {
      throw new Error(`Atom ${atom} missing from serializer mapping`)
    }
    return existing
  }

  private rewriteBytecodeBuffer(func: JSFunctionDef): Uint8Array {
    const source = func.byteCode.buffer;
    const buf = new Uint8Array(source);
    const len = buf.length;
    let pos = 0;

    while (pos < len) {
      const op = buf[pos];
      const def = opcodeDefsByCode[op];
      if (!def)
        throw new Error(`unknown opcode ${op} at pc=${pos}`);
      if (pos + def.size > len)
        throw new Error(`truncated bytecode for ${getOpcodeName(op)} at pc=${pos}`);

      switch (def.format) {
        case OpFormat.atom:
        case OpFormat.atom_u8:
        case OpFormat.atom_u16:
        case OpFormat.atom_label_u8:
        case OpFormat.atom_label_u16: {
          const atom = readU32(buf, pos + 1) as JSAtom;
          const remapped = this.getAtomIndex(atom);
          writeU32(buf, pos + 1, remapped);
          break;
        }
      }

      pos += def.size;
    }

    return buf;
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

    let flags = 0;
    if (func.hasPrototype) flags |= 1 << 0;
    if (func.hasSimpleParameterList) flags |= 1 << 1;
    if (func.isDerivedClassConstructor) flags |= 1 << 2;
    if (func.needHomeObject) flags |= 1 << 3;
    flags |= func.funcKind << 4;
    if (func.newTargetAllowed) flags |= 1 << 6;
    if (func.superCallAllowed) flags |= 1 << 7;
    if (func.superAllowed) flags |= 1 << 8;
    if (func.argumentsAllowed) flags |= 1 << 9;

    const hasDebug = !func.stripDebug;
    if (hasDebug) flags |= 1 << 10;

    if (func.isEval) flags |= 1 << 11;

    out.putU16(flags);
    out.putU8(func.jsMode);

    const nameIdx = this.getAtomIndex(func.funcName);
    this.writeAtomRef(out, nameIdx);

    const argCount = func.argCount !== -1 ? func.argCount : func.args.length;
    const definedArgCount = func.definedArgCount || func.args.length;
    this.writeLEB128(out, argCount);
    this.writeLEB128(out, func.vars.length);
    this.writeLEB128(out, definedArgCount);
    this.writeLEB128(out, func.stackSize);

    const closureVars = func.closureVar ?? [];
    this.writeLEB128(out, closureVars.length);

    const cpoolCount = func.cpool.length;
    this.writeLEB128(out, cpoolCount);

    const bytecode = this.rewriteBytecodeBuffer(func);
    this.writeLEB128(out, bytecode.length);

    this.writeVarDefs(out, func);

    for (const cv of closureVars) {
      this.writeClosureVar(out, cv);
    }

    out.write(bytecode);

    if (hasDebug) {
      const filenameIdx = this.getAtomIndex(func.filename);
      this.writeAtomRef(out, filenameIdx);

      this.finalizePc2Line(func);
      const pc2lineBuf = func.pc2line.buffer;
      this.writeLEB128(out, pc2lineBuf.length);
      out.write(pc2lineBuf);

      if (func.stripSource || !func.source) {
        this.writeLEB128(out, 0);
      } else {
        const sourceBuf = Buffer.from(func.source, 'utf8');
        this.writeLEB128(out, sourceBuf.length);
        out.write(sourceBuf);
      }
    }

    for (const entry of func.cpool) {
      this.writeValue(out, entry);
    }
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

  private writeVarDefs(out: BytecodeWriter, func: JSFunctionDef) {
    const defs: JSVarDef[] = [...func.args, ...func.vars];
    this.writeLEB128(out, defs.length);

    for (const def of defs) {
      const nameIdx = this.getAtomIndex(def.varName);
      this.writeAtomRef(out, nameIdx);
      const scopeLevel = Math.max(0, def.scopeLevel ?? 0);
      this.writeLEB128(out, scopeLevel);
      const scopeNext = (def.scopeNext ?? -1) + 1;
      this.writeLEB128(out, scopeNext);

      let flags = (def.varKind ?? JSVarKind.JS_VAR_NORMAL) & 0xf;
      if (def.isConst) flags |= 1 << 4;
      if (def.isLexical) flags |= 1 << 5;
      if (def.isCaptured) flags |= 1 << 6;
      out.putU8(flags);
    }
  }

  private writeValue(out: BytecodeWriter, val?: JSValue | null) {
    if (!val) {
      out.putU8(BytecodeTag.TC_TAG_NULL);
      return;
    }

    switch (val.type) {
      case 'string': {
        out.putU8(BytecodeTag.TC_TAG_STRING);
        const buf = Buffer.from(val.value, 'utf8');
        this.writeLEB128(out, buf.length);
        out.write(buf);
        break;
      }
      case 'number': {
        if (Number.isInteger(val.value)) {
          out.putU8(BytecodeTag.TC_TAG_INT32);
          out.putU32(val.value);
        } else {
          out.putU8(BytecodeTag.TC_TAG_FLOAT64);
          const buf = Buffer.alloc(8);
          buf.writeDoubleLE(val.value);
          out.write(buf);
        }
        break;
      }
      case 'function': {
        this.writeFunction(out, val.value as JSFunctionDef);
        break;
      }
      case 'boolean': {
        out.putU8(val.value ? BytecodeTag.TC_TAG_BOOL_TRUE : BytecodeTag.TC_TAG_BOOL_FALSE);
        break;
      }
      case 'undefined': {
        out.putU8(BytecodeTag.TC_TAG_UNDEFINED);
        break;
      }
      case 'null': {
        out.putU8(BytecodeTag.TC_TAG_NULL);
        break;
      }
      default: {
        out.putU8(BytecodeTag.TC_TAG_NULL);
        break;
      }
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
