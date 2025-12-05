import { BytecodeTag, JSAtom, OPCODE_DEFS, OpFormat, Opcode, env, ATOM_STRINGS, OPCODE_NAME_TO_CODE } from './env';

export interface AtomRef { type: 'atom'; id: number; name?: string; value?: string }
export interface ParsedClosureVar { name: AtomRef; varIndex: number; isLocal: boolean; isArgument: boolean; isConst: boolean; isLexical: boolean; kind: { value: number; name?: string } }
export interface ParsedVarDef { name: AtomRef; scopeLevel: number; scopeNext: number; isConst: boolean; isLexical: boolean; isCaptured: boolean; kind: { value: number; name?: string } }
export interface ParsedInstruction { opcode: number; opcodeName: string; offset: number; operand?: any }
export interface ParsedTaggedValue { tag: string; value: any }
export interface ParsedFunction {
  name: AtomRef;
  flags: any;
  jsModeFlags: string[];
  stackSize: number;
  argCount: number;
  definedArgCount: number;
  varCount: number;
  closureVarCount: number;
  varDefs: ParsedVarDef[];
  closureVars: ParsedClosureVar[];
  constantPool: ParsedTaggedValue[];
  instructions: ParsedInstruction[];
  debug?: any;
}
export interface ParsedModuleObject {
  version: number;
  atoms: { id: number; value: string }[];
  root: any; // ParsedModuleObject or ParsedFunction
  moduleName?: AtomRef;
  requireEntries?: any[];
  importEntries?: any[];
  exportEntries?: any[];
  starExportEntries?: any[];
  hasTopLevelAwait?: boolean;
  function?: ParsedFunction;
}

class BytecodeReader {
  buffer: Uint8Array;
  pos: number = 0;
  atoms: string[] = [];
  firstAtomId: number = env.firstAtomId;

  constructor(buffer: Uint8Array) {
    this.buffer = buffer;
  }

  getAtomRef(index: number): AtomRef {
    if (index < this.atoms.length) {
        const id = this.firstAtomId + index;
        return { type: 'atom', id, name: this.atoms[index], value: this.atoms[index] };
    }
    return { type: 'atom', id: index, value: `<atom:${index}>` };
  }

  readByte(): number {
    if (this.pos >= this.buffer.length) throw new Error("Unexpected EOF");
    return this.buffer[this.pos++];
  }

  readU16(): number {
    const b0 = this.readByte();
    const b1 = this.readByte();
    return (b1 << 8) | b0;
  }

  readU32(): number {
    const b0 = this.readByte();
    const b1 = this.readByte();
    const b2 = this.readByte();
    const b3 = this.readByte();
    return (b3 << 24) | (b2 << 16) | (b1 << 8) | b0;
  }

  readLEB128(): number {
    let val = 0;
    let shift = 0;
    while (true) {
      const byte = this.readByte();
      val |= (byte & 0x7f) << shift;
      if ((byte & 0x80) === 0) break;
      shift += 7;
    }
    return val;
  }
  
  readSLEB128(): number {
    let val = 0;
    let shift = 0;
    while (true) {
      const byte = this.readByte();
      val |= (byte & 0x7f) << shift;
      shift += 7;
      if ((byte & 0x80) === 0) {
        if (byte & 0x40) {
          val |= (-1 << shift);
        }
        break;
      }
    }
    return val;
  }

  readFloat64(): number {
    const b0 = this.readByte();
    const b1 = this.readByte();
    const b2 = this.readByte();
    const b3 = this.readByte();
    const b4 = this.readByte();
    const b5 = this.readByte();
    const b6 = this.readByte();
    const b7 = this.readByte();
    const view = new DataView(new ArrayBuffer(8));
    view.setUint8(0, b0);
    view.setUint8(1, b1);
    view.setUint8(2, b2);
    view.setUint8(3, b3);
    view.setUint8(4, b4);
    view.setUint8(5, b5);
    view.setUint8(6, b6);
    view.setUint8(7, b7);
    return view.getFloat64(0, true);
  }

  readAtom(): AtomRef {
    const val = this.readLEB128();
    let id: number;
    if (val & 1) {
      id = val >> 1; // Integer atom
      return { type: 'atom', id, name: id.toString() };
    } else {
      const idx = val >> 1;
      if (idx < this.firstAtomId) {
        id = idx; // Built-in atom
      } else {
        id = idx; // User atom (mapped)
        // In QuickJS, user atoms start at firstAtomId.
        // But the index in the file is relative to firstAtomId?
        // No, bc_put_atom writes `idx << 1`.
        // `idx` is the index in `idx_to_atom` array + firstAtomId.
        // So `idx` IS the atom ID.
        id = idx;
      }
    }
    
    let name = '';
    if (id < this.firstAtomId) {
       name = ATOM_STRINGS[id] || `<builtin:${id}>`;
    } else {
       const offset = id - this.firstAtomId;
       if (offset < this.atoms.length) {
         name = this.atoms[offset];
       } else {
         name = `<atom:${id}>`;
       }
    }
    return { type: 'atom', id, name };
  }

  readString(): string {
    const lenVal = this.readLEB128();
    const isWide = lenVal & 1;
    const len = lenVal >> 1;
    let str = '';
    if (isWide) {
      for (let i = 0; i < len; i++) {
        str += String.fromCharCode(this.readU16());
      }
    } else {
      for (let i = 0; i < len; i++) {
        str += String.fromCharCode(this.readByte());
      }
    }
    return str;
  }

  readObject(): any {
    const tag = this.readByte();
    switch (tag) {
      case BytecodeTag.TC_TAG_NULL: return { tag: 'TC_TAG_NULL', value: null };
      case BytecodeTag.TC_TAG_UNDEFINED: return { tag: 'TC_TAG_UNDEFINED', value: undefined };
      case BytecodeTag.TC_TAG_BOOL_FALSE: return { tag: 'TC_TAG_BOOL_FALSE', value: false };
      case BytecodeTag.TC_TAG_BOOL_TRUE: return { tag: 'TC_TAG_BOOL_TRUE', value: true };
      case BytecodeTag.TC_TAG_INT32: return { tag: 'TC_TAG_INT32', value: this.readSLEB128() };
      case BytecodeTag.TC_TAG_FLOAT64: return { tag: 'TC_TAG_FLOAT64', value: this.readFloat64() };
      case BytecodeTag.TC_TAG_STRING: return { tag: 'TC_TAG_STRING', value: this.readString() };
      case BytecodeTag.TC_TAG_FUNCTION_BYTECODE: return { tag: 'TC_TAG_FUNCTION_BYTECODE', value: this.readFunction() };
      case BytecodeTag.TC_TAG_MODULE: return { tag: 'TC_TAG_MODULE', value: this.readModule() };
      // TODO: other tags
      default:
        throw new Error(`Unsupported tag: ${tag}`);
    }
  }

  readFunction(): ParsedFunction {
    const flagsVal = this.readU16();
    const flags = {
      hasPrototype: !!(flagsVal & 1),
      hasSimpleParameterList: !!(flagsVal & 2),
      isDerivedClassConstructor: !!(flagsVal & 4),
      needHomeObject: !!(flagsVal & 8),
      funcKind: { value: (flagsVal >> 4) & 3 },
      newTargetAllowed: !!(flagsVal & 64),
      superCallAllowed: !!(flagsVal & 128),
      superAllowed: !!(flagsVal & 256),
      argumentsAllowed: !!(flagsVal & 512),
      hasDebug: !!(flagsVal & 1024),
      isDirectOrIndirectEval: !!(flagsVal & 2048),
    };
    const jsMode = this.readByte();
    const name = this.readAtom();
    const argCount = this.readLEB128();
    const varCount = this.readLEB128();
    const definedArgCount = this.readLEB128();
    const stackSize = this.readLEB128();
    const closureVarCount = this.readLEB128();
    const cpoolCount = this.readLEB128();
    const bytecodeLen = this.readLEB128();
    const localCount = this.readLEB128();

    const varDefs: ParsedVarDef[] = [];
    for (let i = 0; i < localCount; i++) {
      const varName = this.readAtom();
      const scopeLevel = this.readSLEB128();
      const scopeNext = this.readSLEB128();
      const vFlags = this.readByte();
      varDefs.push({
        name: varName,
        scopeLevel,
        scopeNext,
        isConst: !!(vFlags & 16), // TODO: check flags
        isLexical: !!(vFlags & 32),
        isCaptured: !!(vFlags & 64),
        kind: { value: vFlags & 0xf }
      });
    }

    const closureVars: ParsedClosureVar[] = [];
    for (let i = 0; i < closureVarCount; i++) {
      const varName = this.readAtom();
      const varIndex = this.readSLEB128();
      const vFlags = this.readByte();
      closureVars.push({
        name: varName,
        varIndex,
        isLocal: !!(vFlags & 1),
        isArgument: !!(vFlags & 2),
        isConst: !!(vFlags & 4),
        isLexical: !!(vFlags & 8),
        kind: { value: (vFlags >> 4) & 0xf }
      });
    }

    const bytecodeStart = this.pos;
    this.pos += bytecodeLen; // Skip bytecode for now, parse later

    const debug: any = {};
    // Has debug?
    if (flags.hasDebug) {
      debug.filename = this.readAtom();
      debug.lineNum = this.readLEB128();
      const pc2lineLen = this.readLEB128();
      debug.pc2line = this.buffer.slice(this.pos, this.pos + pc2lineLen);
      this.pos += pc2lineLen;
      
      debug.sourceLen = this.readLEB128(); // source_len (not atom)
      // source is raw bytes, not atom
      // But wait, QuickJS writes source as raw bytes?
      // dbuf_put(s, fd->source, fd->source_len);
      // Yes.
      
      // But wait, readAtom() reads LEB128.
      // If sourceLen is 0, we skip 0 bytes.
      
      // Wait, previous code:
      // debug.sourceLen = this.readLEB128();
      // this.pos += debug.sourceLen;
      
      // This part was actually correct (assuming sourceLen is read correctly).
      // But I need to make sure I don't break it.
      
      // Wait, I need to check if source is atom or raw bytes.
      // QuickJS: bc_put_leb128(s, fd->source_len); dbuf_put(s, fd->source, fd->source_len);
      // So it is raw bytes.
      
      // My serializer writes: this.putAtom(buf, 0);
      // putAtom writes LEB128(idx << 1).
      // If idx=0, it writes 0.
      // So sourceLen = 0.
      // So it writes 0 bytes of source.
      // This is consistent.
      
      // So I just need to fix the lineNum/pc2lineLen part.
      
      this.pos += debug.sourceLen;
    }

    const cpool: ParsedTaggedValue[] = [];
    for (let i = 0; i < cpoolCount; i++) {
      cpool.push(this.readObject());
    }

    // Parse instructions
    const instructions: ParsedInstruction[] = [];
    const savedPos = this.pos;
    this.pos = bytecodeStart;
    const bytecodeEnd = bytecodeStart + bytecodeLen;
    
    while (this.pos < bytecodeEnd) {
      const offset = this.pos - bytecodeStart;
      const op = this.readByte();
      const def = Object.values(OPCODE_DEFS).find(d => OPCODE_NAME_TO_CODE[d.id] === op);
      const opcodeName = def ? def.id : `OP_${op}`;
      
      let operand: any = undefined;
      if (def) {
        switch (def.format) {
          case OpFormat.u8:
          case OpFormat.i8:
          case OpFormat.loc8:
          case OpFormat.const8:
          case OpFormat.label8:
            operand = this.readByte();
            break;
          case OpFormat.u16:
          case OpFormat.i16:
          case OpFormat.label16:
          case OpFormat.npop_u16:
          case OpFormat.npop:
          case OpFormat.loc:
          case OpFormat.arg:
          case OpFormat.var_ref:
            operand = this.readU16();
            break;
          case OpFormat.u32:
          case OpFormat.i32:
          case OpFormat.const:
          case OpFormat.label:
            operand = this.readU32();
            break;
          case OpFormat.atom:
            operand = this.getAtomRef(this.readU32());
            break;
          case OpFormat.atom_u8:
            operand = { atom: this.getAtomRef(this.readU32()), value: this.readByte() };
            break;
          // TODO: other formats
        }
      }
      
      instructions.push({ opcode: op, opcodeName, offset, operand });
    }
    this.pos = savedPos;

    return {
      name,
      flags,
      jsModeFlags: [], // TODO
      stackSize,
      argCount,
      definedArgCount,
      varCount,
      closureVarCount,
      varDefs,
      closureVars,
      constantPool: cpool,
      instructions,
      debug
    };
  }

  readModule(): ParsedModuleObject {
    const moduleName = this.readAtom();
    const reqModuleEntriesCount = this.readLEB128();
    const requireEntries = [];
    for (let i = 0; i < reqModuleEntriesCount; i++) {
      requireEntries.push({
        name: this.readAtom(),
        attributes: this.readObject()
      });
    }

    const exportEntriesCount = this.readLEB128();
    const exportEntries = [];
    for (let i = 0; i < exportEntriesCount; i++) {
      const type = this.readByte();
      if (type === 1) { // JS_EXPORT_TYPE_LOCAL
        exportEntries.push({ type, varIndex: this.readLEB128(), exportName: this.readAtom() });
      } else {
        exportEntries.push({ type, reqModuleIdx: this.readLEB128(), localName: this.readAtom(), exportName: this.readAtom() });
      }
    }

    const starExportEntriesCount = this.readLEB128();
    const starExportEntries = [];
    for (let i = 0; i < starExportEntriesCount; i++) {
      starExportEntries.push({ reqModuleIdx: this.readLEB128() });
    }

    const importEntriesCount = this.readLEB128();
    const importEntries = [];
    for (let i = 0; i < importEntriesCount; i++) {
      importEntries.push({
        varIndex: this.readLEB128(),
        isStar: !!this.readByte(),
        importName: this.readAtom(),
        reqModuleIdx: this.readLEB128()
      });
    }

    const hasTopLevelAwait = !!this.readByte();
    const funcObj = this.readObject(); // Function bytecode
    const func = funcObj.value;

    return {
      version: 5,
      atoms: [], // Filled later
      root: func,
      moduleName,
      requireEntries,
      importEntries,
      exportEntries,
      starExportEntries,
      hasTopLevelAwait,
      function: func
    };
  }
}

export function parseBytecodeModule(buffer: Uint8Array): ParsedModuleObject {
  const reader = new BytecodeReader(buffer);
  const version = reader.readByte();
  if (version !== 5) throw new Error(`Unsupported version: ${version}`);

  const atomCount = reader.readLEB128();
  for (let i = 0; i < atomCount; i++) {
    reader.atoms.push(reader.readString());
  }

  const obj = reader.readObject();
  
  let result: any;
  if (obj.tag === 'TC_TAG_MODULE') {
      result = obj.value;
  } else if (obj.tag === 'TC_TAG_FUNCTION_BYTECODE') {
      // Wrap function in module-like object if it's just a function
      result = {
          version,
          atoms: [],
          root: obj.value,
          function: obj.value
      };
  } else {
      throw new Error(`Unexpected top-level object tag: ${obj.tag}`);
  }
  
  // Attach atoms to result
  result.version = version;
  result.atoms = reader.atoms.map((val, idx) => ({ id: idx + reader.firstAtomId, value: val }));
  
  return result;
}
