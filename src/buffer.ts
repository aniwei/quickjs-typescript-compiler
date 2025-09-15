export class BufferWriter {
  private chunks: Buffer[] = [];
  private _len = 0;
  u8(v: number) { const b = Buffer.alloc(1); b.writeUInt8(v,0); this.raw(b); }
  i8(v: number) { const b = Buffer.alloc(1); b.writeInt8(v,0); this.raw(b); }
  u16(v: number) { const b = Buffer.alloc(2); b.writeUInt16LE(v,0); this.raw(b); }
  i16(v: number) { const b = Buffer.alloc(2); b.writeInt16LE(v,0); this.raw(b); }
  u32(v: number) { const b = Buffer.alloc(4); b.writeUInt32LE(v,0); this.raw(b); }
  i32(v: number) { const b = Buffer.alloc(4); b.writeInt32LE(v,0); this.raw(b); }
  f64(v: number) { const b = Buffer.alloc(8); b.writeDoubleLE(v,0); this.raw(b); }
  leb128(v: number) {
    // unsigned LEB128
    let val = v >>> 0;
    for (;;) {
      const byte = val & 0x7f;
      val >>>= 7;
      if (val !== 0) {
        this.u8(byte | 0x80);
      } else {
        this.u8(byte);
        break;
      }
    }
  }
  sleb128(v1: number) {
    // QuickJS 风格：ZigZag + ULEB128（参见 quickjs.c: dbuf_put_sleb128）
    const v = v1 | 0; // int32
    const zz = ((v << 1) ^ (v >> 31)) >>> 0;
    this.leb128(zz);
  }
  raw(b: Buffer) { this.chunks.push(b); this._len += b.length; }
  concat(): Buffer { return Buffer.concat(this.chunks); }
  get length() { return this._len; }
}