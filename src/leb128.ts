// LEB128 (Unsigned & Signed) encoder utilities tailored for QuickJS serialization.
// QuickJS uses standard unsigned LEB128 for lengths/indices and signed for int32 constants.

export function uleb128(n: number): Uint8Array {
  if (n < 0) {
    throw new Error('uleb128: negative input')
  }
  
  const bytes: number[] = []

  do {
    let b = n & 0x7f
    n >>>= 7
    if (n !== 0) b |= 0x80
    bytes.push(b)
  } while (n !== 0)

  return Uint8Array.from(bytes)
}

export function leb128(n: number): Uint8Array {
  // Works for JS 32-bit signed range used by QuickJS int32 tags.
  const bytes: number[] = []
  let more = true
  const isNeg = n < 0

  while (more) {
    let b = n & 0x7f
    n >>= 7
    const signBit = (b & 0x40) !== 0

    if ((n === 0 && !signBit) || (n === -1 && signBit)) {
      more = false
    } else {
      b |= 0x80
    }

    bytes.push(b & 0xff)
  }

  return Uint8Array.from(bytes)
}

export function writeUleb(dst: number[], n: number) {
  const enc = uleb128(n)
  for (const b of enc) dst.push(b)
}

export function writeSleb(dst: number[], n: number) {
  const enc = leb128(n)
  for (const b of enc) dst.push(b)
}

// Backwards-compat aliases for tests
export const encodeUleb128 = uleb128
export const encodeSleb128 = leb128

// Decode helpers operating on Buffer with external offset tracking
export function readUlebFrom(buf: Buffer, offRef: { off: number }): number {
  let res = 0
  let shift = 0

  for (;;) {
    const b = buf[offRef.off++]
    res |= (b & 0x7f) << shift
    if ((b & 0x80) === 0) break
    shift += 7
  }

  return res >>> 0
}

export function readSlebFrom(buf: Buffer, offRef: { off: number }): number {
  // Decode signed LEB128 with proper sign extension for 32-bit range used by QuickJS
  let result = 0
  let shift = 0
  let byte = 0

  do {
    byte = buf[offRef.off++]
    result |= (byte & 0x7f) << shift
    shift += 7
  } while (byte & 0x80)

  // If sign bit of last byte is set, sign-extend
  if (shift < 32 && (byte & 0x40)) {
    result |= (~0 << shift)
  }

  // Force into 32-bit signed range
  result |= 0
  return result
}
