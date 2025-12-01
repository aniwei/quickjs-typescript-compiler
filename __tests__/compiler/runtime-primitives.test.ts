import { DynBuf } from '../../src/core/dynBuf';
import { BytecodeWriter } from '../../src/bytecode';
import { Opcode } from '../../src/env';
import { AtomManager } from '../../src/atom';
import { JSFunctionDef } from '../../src/functionDef';
import { BytecodeSerializer } from '../../src/serializer';

function createTestFunction(filename = 'runtime-primitives.ts') {
  const atomManager = new AtomManager();
  const ctx: any = { atomManager };
  const filenameAtom = atomManager.add(filename);
  const func = new JSFunctionDef(ctx, null, { filenameAtom });
  func.isGlobalVar = true;
  func.funcName = atomManager.add('<eval>');
  return { func, atomManager };
}

function emitPushI32(writer: BytecodeWriter, value: number) {
  writer.emitOp(Opcode.OP_push_i32);
  writer.putU32(value);
}

describe('DynBuf smoke tests', () => {
  it('grows automatically when exceeding initial capacity', () => {
    const buf = new DynBuf({ initialCapacity: 4, label: 'test' });
    const payload = new Uint8Array(32).fill(0xab);
    buf.putBytes(payload);
    expect(buf.size).toBe(32);
    expect(buf.capacity).toBeGreaterThanOrEqual(32);
  });

  it('supports patching previously written bytes', () => {
    const buf = new DynBuf({ label: 'patchable' });
    buf.putU32(0xdeadbeef);
    buf.patchU16(2, 0x1234);
    const view = buf.toUint8Array();
    expect(view[2]).toBe(0x34);
    expect(view[3]).toBe(0x12);
  });
});

describe('BytecodeWriter stack tracking', () => {
  it('tracks peak stack depth for simple sequences', () => {
    const writer = new BytecodeWriter('stack-test');
    emitPushI32(writer, 1);
    emitPushI32(writer, 2);
    writer.emitOp(Opcode.OP_add);
    writer.emitOp(Opcode.OP_return);

    expect(writer.stackLevel).toBe(0);
    expect(writer.stackMax).toBe(2);
  });

  it('can skip stack tracking when disabled', () => {
    const writer = new BytecodeWriter({ label: 'pc2line', trackStack: false });
    emitPushI32(writer, 1);
    writer.emitOp(Opcode.OP_drop);

    expect(writer.stackLevel).toBe(0);
    expect(writer.stackMax).toBe(0);
  });
});

describe('BytecodeSerializer integration', () => {
  it('reuses BytecodeWriter stackMax for global functions', () => {
    const { func } = createTestFunction();
    emitPushI32(func.byteCode, 1);
    emitPushI32(func.byteCode, 2);
    func.byteCode.emitOp(Opcode.OP_add);
    func.byteCode.emitOp(Opcode.OP_return);

    expect(func.byteCode.stackMax).toBeGreaterThan(0);

    const serializer = new BytecodeSerializer();
    const bytes = serializer.serialize(func);

    expect(bytes.length).toBeGreaterThan(0);
    expect(func.stackSize).toBe(func.byteCode.stackMax);
  });
});
