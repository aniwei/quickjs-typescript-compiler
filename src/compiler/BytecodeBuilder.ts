export class BytecodeBuilder {
  buffer: Uint8Array
  size: number
  allocatedSize: number
  error: boolean

  constructor() {
    this.buffer = new Uint8Array(0)
    this.size = 0
    this.allocatedSize = 0
    this.error = false
  }

  realloc(newSize: number): boolean {
    if (newSize > this.allocatedSize) {
      if (newSize < this.allocatedSize * 2) {
        newSize = this.allocatedSize * 2
      }
      if (newSize < 32) {
        newSize = 32
      }
      try {
        const newBuf = new Uint8Array(newSize)
        newBuf.set(this.buffer)
        this.buffer = newBuf
        this.allocatedSize = newSize
      } catch (e) {
        this.error = true
        return false
      }
    }
    return true
  }

  put(data: Uint8Array | number[]): void {
    if (this.error) {
      return
    }
    
    const len = data.length
    
    if (!this.realloc(this.size + len)) {
      return
    }
    
    this.buffer.set(data, this.size)
    this.size += len
  }

  putByte(c: number): void {
    if (this.error) {
      return
    }

    if (!this.realloc(this.size + 1)) {
      return
    }

    this.buffer[this.size++] = c
  }

  putU8(val: number): void {
    this.putByte(val)
  }

  putU16(val: number): void {
    if (this.error) {
      return
    }
    if (!this.realloc(this.size + 2)) {
      return
    }
    this.buffer[this.size] = val & 0xff
    this.buffer[this.size + 1] = (val >> 8) & 0xff
    this.size += 2
  }

  putU32(val: number): void {
    if (this.error) {
      return
    }
    if (!this.realloc(this.size + 4)) {
      return
    }
    this.buffer[this.size] = val & 0xff
    this.buffer[this.size + 1] = (val >> 8) & 0xff
    this.buffer[this.size + 2] = (val >> 16) & 0xff
    this.buffer[this.size + 3] = (val >> 24) & 0xff
    this.size += 4
  }

  putULEB128(val: number): void {
    if (this.error) {
      return
    }
    do {
      let byte = val & 0x7f
      val >>>= 7
      if (val !== 0) {
        byte |= 0x80
      }
      this.putByte(byte)
    } while (val !== 0)
  }

  putSLEB128(val: number): void {
    if (this.error) {
      return
    }
    let more = true
    while (more) {
      let byte = val & 0x7f
      val >>= 7
      if ((val === 0 && (byte & 0x40) === 0) || (val === -1 && (byte & 0x40) !== 0)) {
        more = false
      } else {
        byte |= 0x80
      }
      this.putByte(byte)
    }
  }

  data(): Uint8Array {
    return this.buffer.subarray(0, this.size)
  }

  putU32At(pos: number, val: number): void {
    if (this.error) {
      return
    }
    if (pos + 4 > this.size) {
      // Should not happen if used for patching
      this.error = true
      return
    }
    this.buffer[pos] = val & 0xff
    this.buffer[pos + 1] = (val >> 8) & 0xff
    this.buffer[pos + 2] = (val >> 16) & 0xff
    this.buffer[pos + 3] = (val >> 24) & 0xff
  }

  reset(): void {
    this.size = 0
    this.error = false
  }
}
