import { DynBuf } from './core/dynBuf';
import { Opcode } from './env';
import { opcodeInfo } from './opcodeInfo';

export interface BytecodeWriterOptions {
  label?: string;
  initialCapacity?: number;
  trackStack?: boolean;
}

export class BytecodeWriter {
  private readonly buf: DynBuf;
  public readonly name: string;
  private readonly trackStack: boolean;
  stackLevel = 0;
  stackMax = 0;

  constructor(nameOrOptions: string | BytecodeWriterOptions = '', maybeOptions?: BytecodeWriterOptions) {
    let opts: BytecodeWriterOptions = {};
    let label = '';
    if (typeof nameOrOptions === 'string') {
      label = nameOrOptions;
      opts = maybeOptions ?? {};
    } else {
      opts = nameOrOptions;
      label = nameOrOptions.label ?? '';
    }
    this.name = label;
    this.trackStack = opts.trackStack ?? true;
    this.buf = new DynBuf({ label, initialCapacity: opts.initialCapacity });
  }

  get size(): number {
    return this.buf.size;
  }

  get buffer(): Uint8Array {
    return this.buf.toUint8Array();
  }

  toArray(): number[] {
    return Array.from(this.buf.view);
  }

  reset() {
    this.buf.clear();
    this.stackLevel = 0;
    this.stackMax = 0;
  }

  // dbuf_put
  write(data: Uint8Array | number[]) {
    this.buf.putBytes(data);
  }

  // dbuf_putc
  putU8(val: number) {
    this.buf.putU8(val);
  }

  // dbuf_put_u16
  putU16(val: number) {
    this.buf.putU16(val);
  }

  // dbuf_put_u32
  putU32(val: number) {
    this.buf.putU32(val);
  }

  putU64(val: bigint) {
    const low = Number(val & 0xffffffffn);
    const high = Number((val >> 32n) & 0xffffffffn);
    this.putU32(low);
    this.putU32(high);
  }

  // Helper for patching
  patchU32(offset: number, val: number) {
    this.buf.patchU32(offset, val);
  }

  // Helper for patching
  patchU16(offset: number, val: number) {
    this.buf.patchU16(offset, val);
  }

  patchU8(offset: number, val: number) {
    this.buf.patchU8(offset, val);
  }

  emitOp(op: Opcode) {
    this.putU8(op);
    if (this.trackStack)
      this.applyStackEffect(op);
  }

  writeULEB128(val: number) {
    this.buf.writeULEB128(val);
  }

  writeSLEB128(val: number) {
    this.buf.writeSLEB128(val);
  }

  // QuickJS uses ZigZag encoding for some signed values (like pc2line diffs)
  writeZigZag(val: number) {
    const encoded = (val << 1) ^ (val >> 31);
    this.writeULEB128(encoded);
  }

  get lastByte(): number | undefined {
    return this.size > 0 ? this.buf.view[this.size - 1] : undefined;
  }

  setSize(size: number) {
    this.buf.truncate(size);
  }

  private applyStackEffect(op: Opcode) {
    const info = opcodeInfo[op];
    if (!info)
      return;
    this.stackLevel -= info.nPop;
    if (this.stackLevel < 0) {
      this.stackLevel = 0;
    }
    this.stackLevel += info.nPush;
    if (this.stackLevel > this.stackMax)
      this.stackMax = this.stackLevel;
  }
}
