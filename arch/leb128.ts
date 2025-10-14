export class LEB128 {
  static encode(value: number): Uint8Array {
    const bytes: number[] = []
    let remaining = value >>> 0 // Convert to unsigned 32-bit
    
    do {
      let byte = remaining & 0x7F
      remaining >>>= 7
      if (remaining !== 0) {
        byte |= 0x80
      }
      bytes.push(byte)
    } while (remaining !== 0)
    
    return new Uint8Array(bytes)
  }
  
  static encodeSigned(value: number): Uint8Array {
    const bytes: number[] = []
    let remaining = value
    let more = true
    
    while (more) {
      let byte = remaining & 0x7F
      remaining >>= 7
      
      if ((remaining === 0 && (byte & 0x40) === 0) ||
          (remaining === -1 && (byte & 0x40) !== 0)) {
        more = false
      } else {
        byte |= 0x80
      }
      bytes.push(byte)
    }
    
    return new Uint8Array(bytes)
  }
  
  static decode(bytes: Uint8Array, offset = 0): { value: number, length: number } {
    let result = 0
    let shift = 0
    let length = 0
    
    while (offset + length < bytes.length) {
      const byte = bytes[offset + length]
      length++
      
      result |= (byte & 0x7F) << shift
      shift += 7
      
      if ((byte & 0x80) === 0) {
        break
      }
    }
    
    return { value: result >>> 0, length }
  }
}