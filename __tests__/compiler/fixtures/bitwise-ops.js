export function bitwiseOps(value, mask, obj, ctor) {
  const shiftLeft = value << 2
  const shiftRight = value >> 1
  const shiftUnsigned = value >>> 1
  const power = value ** 3
  const bitwiseAnd = value & mask
  const bitwiseOr = value | mask
  const bitwiseXor = value ^ mask
  const hasKey = 'key' in obj
  const isInstance = obj instanceof ctor

  const base =
    shiftLeft +
    shiftRight +
    shiftUnsigned +
    power +
    bitwiseAnd +
    bitwiseOr +
    bitwiseXor

  if (hasKey) {
    if (isInstance) {
      return base + 2
    }
    return base + 1
  }

  if (isInstance) {
    return base + 1
  }

  return base
}
