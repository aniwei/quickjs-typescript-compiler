
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { BytecodeTag } from '../src/env';

async function main() {
  const file = process.argv[2];
  const buf = await fs.readFile(file);
  let pos = 0;

  function readU8() { return buf[pos++]; }
  function readU16() { const v = buf[pos] | (buf[pos+1] << 8); pos += 2; return v; }
  function readULEB() {
    let res = 0, shift = 0;
    while (true) {
      const b = readU8();
      res |= (b & 0x7f) << shift;
      if (!(b & 0x80)) break;
      shift += 7;
    }
    return res;
  }
  function readAtom() { return readULEB(); }

  // Header
  const version = readU8();
  const atomCount = readULEB();
  console.log(`Version: ${version}, Atoms: ${atomCount}`);
  
  // Skip atoms
  for (let i = 0; i < atomCount; i++) {
    const lenInfo = readULEB();
    const len = lenInfo >> 1;
    const isWide = lenInfo & 1;
    pos += (isWide ? len * 2 : len);
  }

  // Module
  const tag = readU8();
  console.log(`Tag: ${tag} (Expected ${BytecodeTag.TC_TAG_MODULE})`);
  
  readAtom(); // module name
  readULEB(); // req
  readULEB(); // exp
  readULEB(); // star
  readULEB(); // imp
  readU8(); // tla

  readFunction('<eval>');

  function readFunction(name: string) {
    console.log(`\nFunction: ${name}`);
    const tag = readU8();
    if (tag !== BytecodeTag.TC_TAG_FUNCTION_BYTECODE) {
        console.log(`Unexpected tag: ${tag} at ${pos-1}`);
        return;
    }
    const flags = readU16();
    const mode = readU8();
    const nameAtom = readAtom();
    const argCount = readULEB();
    const varCount = readULEB();
    const defArgCount = readULEB();
    const stackSize = readULEB();
    const closureVarCount = readULEB();
    const cpoolCount = readULEB();
    const bytecodeLen = readULEB();
    const localsCount = readULEB();

    console.log(`Flags: 0x${flags.toString(16)}, Mode: ${mode}`);
    console.log(`Args: ${argCount}, Vars: ${varCount}, Stack: ${stackSize}`);
    console.log(`ClosureVars: ${closureVarCount}, CPool: ${cpoolCount}, Bytecode: ${bytecodeLen}`);
    console.log(`Locals: ${localsCount}`);

    // Args
    for (let i = 0; i < argCount; i++) {
        console.log(`Arg ${i}:`);
        readVarDef();
    }
    // Vars
    for (let i = 0; i < varCount; i++) {
        console.log(`Var ${i}:`);
        readVarDef();
    }
    // Closure Vars
    for (let i = 0; i < closureVarCount; i++) {
        const name = readAtom();
        const idx = readULEB();
        const flags = readU8();
        console.log(`ClosureVar ${i}: Atom=${name}, Idx=${idx}, Flags=0x${flags.toString(16)}`);
    }

    // Bytecode
    console.log(`Bytecode (${bytecodeLen} bytes):`);
    const code = buf.slice(pos, pos + bytecodeLen);
    console.log([...code].map(b => b.toString(16).padStart(2, '0')).join(' '));
    pos += bytecodeLen;

    console.log('Next 10 bytes:', [...buf.slice(pos, pos + 10)].map(b => b.toString(16).padStart(2, '0')).join(' '));

    // Debug
    if (flags & (1 << 10)) { // has_debug
        readAtom(); // filename
        readULEB(); // line_start
        const pc2lineLen = readULEB();
        console.log(`PC2Line: ${pc2lineLen} bytes`);
        pos += pc2lineLen;
        readULEB(); // source len
    }

    // CPool
    for (let i = 0; i < cpoolCount; i++) {
        const tag = readU8();
        console.log(`CPool ${i}: Tag=${tag}`);
        if (tag === BytecodeTag.TC_TAG_FUNCTION_BYTECODE) {
            pos--; // Backtrack
            readFunction(`Nested ${i}`);
        } else {
            // Skip other constants...
            // Simplified skip
            if (tag === BytecodeTag.TC_TAG_STRING) {
                const lenInfo = readULEB();
                const len = lenInfo >> 1;
                pos += len;
            } else if (tag === BytecodeTag.TC_TAG_INT32) {
                readULEB(); // SLEB actually
            }
            // ... add more if needed
        }
    }
  }

  function readVarDef() {
    const name = readAtom();
    const scopeLevel = readULEB();
    const scopeNext = readULEB();
    const kind = readU8();
    console.log(`  Atom=${name}, Level=${scopeLevel}, Next=${scopeNext}, Kind=${kind}`);
  }
}

main().catch(console.error);
