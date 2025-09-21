import { encodeUleb128, encodeSleb128 } from '../leb128'

function hex(u: Uint8Array) { return Array.from(u).map(b=>b.toString(16).padStart(2,'0')).join(' ') }

// Minimal ad-hoc test runner (no jest). If needed integrate later.
function assertEqual(a: string, b: string, msg: string) {
  if (a !== b) throw new Error(`Assertion failed: ${msg}\nexpected=${b}\nactual=${a}`)
}

// ULEB128 examples
assertEqual(hex(encodeUleb128(0)), '00', 'uleb 0')
assertEqual(hex(encodeUleb128(127)), '7f', 'uleb 127')
assertEqual(hex(encodeUleb128(128)), '80 01', 'uleb 128')
assertEqual(hex(encodeUleb128(624485)), 'e5 8e 26', 'uleb 624485 (spec example)')

// SLEB128 examples
assertEqual(hex(encodeSleb128(0)), '00', 'sleb 0')
assertEqual(hex(encodeSleb128(-1)), '7f', 'sleb -1')
assertEqual(hex(encodeSleb128(127)), 'ff 00', 'sleb 127')
assertEqual(hex(encodeSleb128(-127)), '81 7f', 'sleb -127')
assertEqual(hex(encodeSleb128(624485)), 'e5 8e 26', 'sleb 624485 (positive behaves like uleb)')

console.log('leb128 tests passed')
