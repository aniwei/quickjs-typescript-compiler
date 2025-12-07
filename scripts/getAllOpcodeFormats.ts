
import { QuickJSLib } from './QuickJSLib';

async function main() {
  const formats = await QuickJSLib.getAllOpcodeFormats();
  console.log(formats);
}

main();
