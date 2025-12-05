import { readFileSync } from 'fs';
import { parseBytecodeModule } from '../src/bytecodeReader';
import { createAdvancedDisassembly } from '../src/disasm';

const file = process.argv[2];
const buffer = readFileSync(file);

try {
  console.log('Parsing...');
  const module = parseBytecodeModule(buffer);
  console.log('Parsed successfully:', module);
  
  console.log('Disassembling...');
  const disasm = createAdvancedDisassembly(buffer);
  console.log(disasm);
} catch (e) {
  console.error('Error:', e);
}
