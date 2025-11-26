import { Opcode } from './env';

export class BytecodeWriter {
  private buf: number[] = [];

  constructor() {}

  get size(): number {
    return this.buf.length;
  }

  get buffer(): Uint8Array {
    return new Uint8Array(this.buf);
  }

  toArray(): number[] {
    return [...this.buf];
  }

  reset() {
    this.buf = [];
  }

  // dbuf_put
  write(data: Uint8Array | number[]) {
    for (let i = 0; i < data.length; i++) {
      this.buf.push(data[i]);
    }
  }

  // dbuf_putc
  putU8(val: number) {
    this.buf.push(val & 0xff);
  }

  // dbuf_put_u16
  putU16(val: number) {
    this.buf.push(val & 0xff);
    this.buf.push((val >> 8) & 0xff);
  }

  // dbuf_put_u32
  putU32(val: number) {
    this.buf.push(val & 0xff);
    this.buf.push((val >> 8) & 0xff);
    this.buf.push((val >> 16) & 0xff);
    this.buf.push((val >> 24) & 0xff);
  }

  putU64(val: bigint) {
    const low = Number(val & 0xffffffffn);
    const high = Number((val >> 32n) & 0xffffffffn);
    this.putU32(low);
    this.putU32(high);
  }

  // Helper for patching
  patchU32(offset: number, val: number) {
    if (offset + 4 > this.buf.length) {
      throw new Error('Patch offset out of bounds');
    }
    this.buf[offset] = val & 0xff;
    this.buf[offset + 1] = (val >> 8) & 0xff;
    this.buf[offset + 2] = (val >> 16) & 0xff;
    this.buf[offset + 3] = (val >> 24) & 0xff;
  }

  // Helper for patching
  patchU16(offset: number, val: number) {
    if (offset + 2 > this.buf.length) {
      throw new Error('Patch offset out of bounds');
    }
    this.buf[offset] = val & 0xff;
    this.buf[offset + 1] = (val >> 8) & 0xff;
  }

  patchU8(offset: number, val: number) {
    if (offset + 1 > this.buf.length) {
      throw new Error('Patch offset out of bounds');
    }
    this.buf[offset] = val & 0xff;
  }

  emitOp(op: Opcode) {
    this.putU8(op);
  }

  writeULEB128(val: number) {
    let v = val;
    do {
      let byte = v & 0x7f;
      v >>>= 7;
      if (v !== 0) {
        byte |= 0x80;
      }
      this.putU8(byte);
    } while (v !== 0);
  }

  writeSLEB128(val: number) {
    let v = val;
    let more = true;
    while (more) {
      let byte = v & 0x7f;
      v >>= 7;
      if ((v === 0 && (byte & 0x40) === 0) || (v === -1 && (byte & 0x40) !== 0)) {
        more = false;
      } else {
        byte |= 0x80;
      }
      this.putU8(byte);
    }
  }

  // QuickJS uses ZigZag encoding for some signed values (like pc2line diffs)
  writeZigZag(val: number) {
    const encoded = (val << 1) ^ (val >> 31);
    this.writeULEB128(encoded);
  }

  get lastByte(): number | undefined {
    return this.buf.length > 0 ? this.buf[this.buf.length - 1] : undefined;
  }
}
