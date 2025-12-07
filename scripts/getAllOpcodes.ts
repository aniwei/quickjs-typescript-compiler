import { QuickJSLib } from './QuickJSLib'

async function main() {
  const opcodes = await QuickJSLib.getAllOpcodes()
  console.log('QuickJS Opcodes:', opcodes)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
