import { QuickJSLib } from './QuickJSLib'

async function main() {
  const atoms = await QuickJSLib.getAllAtoms()
  console.log('QuickJS Atoms:', atoms)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
