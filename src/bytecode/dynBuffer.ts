export class DynBuf {
  buf: Uint8Array;
  size: number;
  allocatedSize: number;
  error: boolean;

  constructor() {
    this.buf = new Uint8Array(64);
    this.size = 0;
    this.allocatedSize = 64;
    this.error = false;
  }

  realloc(newSize: number): boolean {
    if (newSize > this.allocatedSize) {
      let newAllocSize = Math.max(newSize, this.allocatedSize * 2);
      // Align to 64 bytes
      newAllocSize = (newAllocSize + 63) & ~63;
      try {
        const newBuf = new Uint8Array(newAllocSize);
        newBuf.set(this.buf.subarray(0, this.size));
        this.buf = newBuf;
        this.allocatedSize = newAllocSize;
      } catch (e) {
        this.error = true;
        return false;
      }
    }
    return true;
  }

  put(data: Uint8Array | number[]): void {
    if (this.error) return;
    const len = data.length;
    if (!this.realloc(this.size + len)) return;
    this.buf.set(data, this.size);
    this.size += len;
  }

  prepend(data: Uint8Array | number[]): void {
    if (this.error) return;
    const len = data.length;
    if (!this.realloc(this.size + len)) return;
    // Shift existing data
    this.buf.copyWithin(len, 0, this.size);
    // Insert new data
    this.buf.set(data, 0);
    this.size += len;
  }

  putByte(c: number): void {
    if (this.error) return;
    if (!this.realloc(this.size + 1)) return;
    this.buf[this.size++] = c;
  }

  putU16(val: number): void {
    if (this.error) return;
    if (!this.realloc(this.size + 2)) return;
    this.buf[this.size] = val & 0xff;
    this.buf[this.size + 1] = (val >> 8) & 0xff;
    this.size += 2;
  }

  putU32(val: number): void {
    if (this.error) return;
    if (!this.realloc(this.size + 4)) return;
    this.buf[this.size] = val & 0xff;
    this.buf[this.size + 1] = (val >> 8) & 0xff;
    this.buf[this.size + 2] = (val >> 16) & 0xff;
    this.buf[this.size + 3] = (val >>> 24) & 0xff;
    this.size += 4;
  }

  writeU32At(offset: number, val: number): void {
    if (this.error) return;
    if (offset + 4 > this.size) {
      // Should not happen if we are patching existing code
      this.error = true;
      return;
    }
    this.buf[offset] = val & 0xff;
    this.buf[offset + 1] = (val >> 8) & 0xff;
    this.buf[offset + 2] = (val >> 16) & 0xff;
    this.buf[offset + 3] = (val >>> 24) & 0xff;
  }

  writeU8At(offset: number, val: number): void {
    if (this.error) return;
    if (offset + 1 > this.size) {
      this.error = true;
      return;
    }
    this.buf[offset] = val & 0xff;
  }

  putU64(val: bigint): void {
    if (this.error) {
      return
    }

    if (!this.realloc(this.size + 8)) {
      return
    }

    const low = Number(val & 0xffffffffn)
    const high = Number((val >> 32n) & 0xffffffffn)
    this.putU32(low)
    this.size -= 4 // putU32 increments size, so we adjust back to overwrite
    this.buf[this.size] = low & 0xff
    this.buf[this.size + 1] = (low >> 8) & 0xff
    this.buf[this.size + 2] = (low >> 16) & 0xff
    this.buf[this.size + 3] = (low >>> 24) & 0xff
    
    this.buf[this.size + 4] = high & 0xff
    this.buf[this.size + 5] = (high >> 8) & 0xff
    this.buf[this.size + 6] = (high >> 16) & 0xff
    this.buf[this.size + 7] = (high >>> 24) & 0xff
    this.size += 8
  }

  reset(): void {
    this.size = 0
    this.error = false
  }

  buffer(): Uint8Array {
    return this.buf.subarray(0, this.size)
  }
}
