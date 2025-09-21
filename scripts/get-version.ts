import { QuickJSBinding } from './QuickJSBinding'

async function main() {
  const version = await QuickJSBinding.getBytecodeVersion()
  console.log('QuickJS Bytecode Version:', version)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
