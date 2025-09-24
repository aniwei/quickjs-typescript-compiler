
import { FunctionDef } from './functionDef';
import { BytecodeWriter as BCWriter } from './bytecodeWriter';
import { CompileFlags } from './types';
import { env } from './env';
import { BCTag } from './constant';
import { LEB128 } from './leb128';

function writeObject(bw: BCWriter, obj: any, flags: CompileFlags) {
  switch (typeof obj) {
    case 'number':
      if (Number.isInteger(obj)) {
        bw.putU8(BCTag.INT32);
        bw.putU32(obj);
      } else {
        bw.putU8(BCTag.FLOAT64);
        bw.bytes(new Uint8Array(new Float64Array([obj]).buffer));
      }
      break;
    case 'string':
      bw.putU8(BCTag.STRING);
      bw.bytes(LEB128.encode(obj.length));
      for (let i = 0; i < obj.length; i++) {
        bw.putU8(obj.charCodeAt(i));
      }
      break;
    case 'undefined':
      bw.putU8(BCTag.UNDEFINED);
      break;
    case 'boolean':
      bw.putU8(obj ? BCTag.TRUE : BCTag.FALSE);
      break;
    case 'object':
      if (obj === null) {
        bw.putU8(BCTag.NULL);
      } else if (Array.isArray(obj)) {
        // Handle arrays (like the constant pool)
        for (const item of obj) {
          writeObject(bw, item, flags);
        }
      } else if (obj instanceof FunctionDef) {
        writeFunction(bw, obj, flags);
      }
      break;
    default:
      throw new Error(`Unsupported object type for serialization: ${typeof obj}`);
  }
}

function writeFunction(bw: BCWriter, func: FunctionDef, flags: CompileFlags) {
  bw.putU8(BCTag.FUNCTION_BYTECODE);
  const bytecode = func.toBytecode();

  // Simplified header
  bw.bytes(LEB128.encode(bytecode.argCount));
  bw.bytes(LEB128.encode(bytecode.varCount));
  bw.bytes(LEB128.encode(bytecode.stackSize));
  bw.bytes(LEB128.encode(bytecode.closureVarCount));
  bw.bytes(LEB128.encode(bytecode.cpool.length));

  // Bytecode length and content
  bw.bytes(LEB128.encode(bytecode.buffer.length));
  bw.bytes(bytecode.buffer);

  // Serialize the constant pool (cpool)
  writeObject(bw, bytecode.cpool, flags);

  // TODO: Serialize other parts like vars, closure_vars etc.
}

export function serialize(func: FunctionDef, flags: CompileFlags = {}): Uint8Array {
  const bw = new BCWriter();

  // Bytecode version
  bw.putU8(env.bytecodeVersion);

  // User atoms
  const userAtoms = func.atomTable.getUserAtoms();
  bw.bytes(LEB128.encode(userAtoms.size));
  for (const [str, _id] of userAtoms) {
    bw.bytes(LEB128.encode(str.length));
    for (let i = 0; i < str.length; i++) {
      bw.putU8(str.charCodeAt(i));
    }
  }

  writeObject(bw, func, flags);

  return bw.toUint8Array();
}

