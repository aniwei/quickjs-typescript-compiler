import { QuickJSLib } from './QuickJSLib'

async function main() {
  const version = await QuickJSLib.getBytecodeVersion()
  console.log('QuickJS Bytecode Version:', version)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
