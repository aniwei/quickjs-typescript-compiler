
import { QuickJSLib } from './QuickJSLib';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: tsx scripts/dumpMyBytecode.ts <path-to-qbc>');
    process.exit(1);
  }
  
  const bytecode = fs.readFileSync(filePath);
  try {
    const dump = await QuickJSLib.dumpBytesToString(bytecode);
    console.log(dump);
  } catch (e) {
    console.error('Error dumping bytecode:', e);
  }
}

main();
