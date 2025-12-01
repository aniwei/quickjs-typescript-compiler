const DEFAULT_CAPACITY = 256;

export interface DynBufOptions {
  /** Optional human readable label for diagnostics */
  label?: string;
  /** Starting capacity in bytes */
  initialCapacity?: number;
}

/**
 * TypeScript port of QuickJS DynBuf.
 * Provides amortised O(1) append semantics and allows patching existing bytes.
 */
export class DynBuf {
  private buffer: Uint8Array;
  private length = 0;
  readonly label?: string;

  constructor(options: DynBufOptions = {}) {
    const capacity = Math.max(options.initialCapacity ?? DEFAULT_CAPACITY, 0);
    this.buffer = new Uint8Array(capacity || DEFAULT_CAPACITY);
    this.length = 0;
    this.label = options.label;
  }

  get size(): number {
    return this.length;
  }

  get capacity(): number {
    return this.buffer.length;
  }

  /** Returns a copy of the written bytes. */
  toUint8Array(): Uint8Array {
    return this.buffer.slice(0, this.length);
  }

  /** Returns a view into the underlying buffer. Mutating it mutates the buffer. */
  get view(): Uint8Array {
    return new Uint8Array(this.buffer.buffer, this.buffer.byteOffset, this.length);
  }

  clear() {
    this.length = 0;
  }

  truncate(size: number) {
    if (size < 0)
      size = 0;
    if (size > this.length) {
      throw new RangeError(`DynBuf truncate beyond length: ${size} > ${this.length}`);
    }
    this.length = size;
  }

  ensureCapacity(required: number) {
    if (required <= this.buffer.length)
      return;
    let newCapacity = this.buffer.length;
    while (newCapacity < required) {
      newCapacity = newCapacity < 1024 ? newCapacity * 2 : Math.floor(newCapacity * 1.5);
    }
    const next = new Uint8Array(newCapacity);
    next.set(this.buffer, 0);
    this.buffer = next;
  }

  putU8(value: number) {
    this.ensureCapacity(this.length + 1);
    this.buffer[this.length++] = value & 0xff;
  }

  putU16(value: number) {
    this.ensureCapacity(this.length + 2);
    this.buffer[this.length++] = value & 0xff;
    this.buffer[this.length++] = (value >>> 8) & 0xff;
  }

  putU32(value: number) {
    this.ensureCapacity(this.length + 4);
    this.buffer[this.length++] = value & 0xff;
    this.buffer[this.length++] = (value >>> 8) & 0xff;
    this.buffer[this.length++] = (value >>> 16) & 0xff;
    this.buffer[this.length++] = (value >>> 24) & 0xff;
  }

  putBytes(bytes: ArrayLike<number>) {
    const arr = bytes instanceof Uint8Array ? bytes : Uint8Array.from(bytes);
    this.ensureCapacity(this.length + arr.length);
    this.buffer.set(arr, this.length);
    this.length += arr.length;
  }

  /** Returns the offset before writing the requested size and reserves it. */
  allocate(size: number): number {
    if (size < 0)
      throw new Error('allocate size must be non-negative');
    const offset = this.length;
    this.ensureCapacity(offset + size);
    this.length += size;
    return offset;
  }

  patchU8(offset: number, value: number) {
    this.assertBounds(offset, 1);
    this.buffer[offset] = value & 0xff;
  }

  patchU16(offset: number, value: number) {
    this.assertBounds(offset, 2);
    this.buffer[offset] = value & 0xff;
    this.buffer[offset + 1] = (value >>> 8) & 0xff;
  }

  patchU32(offset: number, value: number) {
    this.assertBounds(offset, 4);
    this.buffer[offset] = value & 0xff;
    this.buffer[offset + 1] = (value >>> 8) & 0xff;
    this.buffer[offset + 2] = (value >>> 16) & 0xff;
    this.buffer[offset + 3] = (value >>> 24) & 0xff;
  }

  writeULEB128(value: number) {
    let v = value >>> 0;
    do {
      let byte = v & 0x7f;
      v >>>= 7;
      if (v !== 0)
        byte |= 0x80;
      this.putU8(byte);
    } while (v !== 0);
  }

  writeSLEB128(value: number) {
    let more = true;
    let v = value | 0;
    while (more) {
      let byte = v & 0x7f;
      v >>= 7;
      const signBit = byte & 0x40;
      if ((v === 0 && signBit === 0) || (v === -1 && signBit !== 0)) {
        more = false;
      } else {
        byte |= 0x80;
      }
      this.putU8(byte);
    }
  }

  private assertBounds(offset: number, size: number) {
    if (offset < 0 || offset + size > this.length) {
      const label = this.label ? ` ("${this.label}")` : '';
      throw new RangeError(
        `DynBuf${label} patch out of bounds: offset=${offset}, size=${size}, length=${this.length}`
      );
    }
  }
}
