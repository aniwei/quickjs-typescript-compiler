import * as fs from 'fs';
import * as path from 'path';

const filePath = process.argv[2];
if (!filePath) {
    console.error('Usage: tsx dump_tail_binary.ts <file>');
    process.exit(1);
}

const buffer = fs.readFileSync(filePath);
// Find the start of pc2line table.
// It usually starts after the bytecode.
// In our case, we can look for the sequence 2f 0e (line number info start)
// or just dump the last N bytes.

// Let's dump the last 100 bytes
const tail = buffer.subarray(Math.max(0, buffer.length - 100));
console.log('Tail bytes:');
console.log(Array.from(tail).map(b => '0x' + b.toString(16).padStart(2, '0')).join(', '));

// Also try to find the pc2line start by looking for the known header end
// The header ends with stack_size (4 bytes)
// In the diff, we saw:
// 000000e0: 2f c8 03 40 00 00 ...
// 40 00 00 is stack size 4? No, stack size is usually a short or int.
// Let's look at the diff again.
// TS: 2f c8 03 02 00 00 00 (stack size 2?)
// WASM: 2f c8 03 40 00 00 2f 0e ...
// 40 00 00 looks like stack size 64? Or maybe it's 4 encoded differently?
// Wait, 0x40 is 64.
// Let's check stack size encoding.
