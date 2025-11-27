import { QuickJSLib } from './QuickJSLib'

async function main() {
  const atoms = await QuickJSLib.getAllAtoms()
  const atom64 = atoms.find(a => a.id === 64)
  console.log('Atom 64:', atom64)
  
  const atom66 = atoms.find(a => a.id === 66)
  console.log('Atom 66:', atom66)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
