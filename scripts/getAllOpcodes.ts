import { QuickJSLib } from './QuickJSLib'

async function main() {
  const opcodes = await QuickJSLib.getAllOpcodes()
  console.log('QuickJS Opcodes:', opcodes.filter(o => o.code >= 190))
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
