import { QuickJSLib } from './QuickJSLib'

async function main() {
  const opcodes = await QuickJSLib.getAllOpcodes()
  console.log(JSON.stringify(opcodes, null, 2))
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
