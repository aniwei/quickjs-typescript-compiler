import { QuickJSLib } from './QuickJSLib'

async function main() {
  const opcodes = await QuickJSLib.getAllOpcodes()
  console.log(JSON.stringify(opcodes.filter(o => o.code >= 200), null, 2))
}

main()
