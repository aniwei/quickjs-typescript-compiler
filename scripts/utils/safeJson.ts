export type SafeJsonStringifyOptions = {
  pretty?: boolean
}

/**
 * JSON.stringify that won't throw on BigInt / Uint8Array / Buffer.
 *
 * - BigInt: serialized as a string with trailing 'n' (e.g. "123n").
 * - Uint8Array/Buffer: serialized as a compact object with length + base64.
 */
export function safeJsonStringify(value: unknown, options: SafeJsonStringifyOptions = {}): string {
  const pretty = options.pretty === true
  const seen = new WeakSet<object>()

  return JSON.stringify(
    value,
    (_key, v) => {
      if (typeof v === 'bigint') {
        return `${v.toString()}n`
      }

      if (typeof Buffer !== 'undefined' && Buffer.isBuffer(v)) {
        return { __type: 'Buffer', length: v.length, base64: v.toString('base64') }
      }

      if (v instanceof Uint8Array) {
        const buf = Buffer.from(v)
        return { __type: 'Uint8Array', length: v.length, base64: buf.toString('base64') }
      }

      if (v instanceof Map) {
        return { __type: 'Map', entries: Array.from(v.entries()) }
      }

      if (v instanceof Set) {
        return { __type: 'Set', values: Array.from(v.values()) }
      }

      if (typeof v === 'object' && v !== null) {
        if (seen.has(v)) return { __type: 'Circular' }
        seen.add(v)
      }

      return v
    },
    pretty ? 2 : undefined,
  )
}
