import { QuickJSLib } from './scripts/QuickJSLib';

async function main() {
  const opcodes = await QuickJSLib.getOpcodes();
  console.log('get_field2:', opcodes['get_field2']);
  console.log('check_ctor:', opcodes['check_ctor']);
  
  const list = await QuickJSLib.getAllOpcodes();
  const op43 = list.find(o => o.code === 43);
  console.log('Opcode 43:', op43);
}

main();
