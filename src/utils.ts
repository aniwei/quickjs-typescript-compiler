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
  raw(b: Buffer) { this.chunks.push(b); this._len += b.length; }
  concat(): Buffer { return Buffer.concat(this.chunks); }
  get length() { return this._len; }
}