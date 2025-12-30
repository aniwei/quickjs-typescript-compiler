import fs from 'node:fs'
import { parseBytecodeModule } from '../../src/bytecodeReader'

function firstInnerFunction(mod: any) {
  const cpool = mod.func.cpool || []
  return cpool.find((e: any) => e && typeof e === 'object' && e.tag === 12)
}

for (const name of ['generator-yield-010', 'generator-yield-048']) {
  const tsPath = 'artifacts/' + name + '/bytecode/' + name + '.ts.qbc'
  const wasmPath = 'artifacts/' + name + '/bytecode/' + name + '.wasm.qbc'

  const ts = parseBytecodeModule(fs.readFileSync(tsPath))
  const wasm = parseBytecodeModule(fs.readFileSync(wasmPath))
  const tsIn = firstInnerFunction(ts)
  const wasmIn = firstInnerFunction(wasm)

  console.log('\n=== ' + name + ' ===')
  console.log('TS inner', { bytecodeLen: tsIn.bytecodeLen, stackSize: tsIn.stackSize })
  console.log('WASM inner', { bytecodeLen: wasmIn.bytecodeLen, stackSize: wasmIn.stackSize })
  console.log('TS prefix', Buffer.from((tsIn.bytecode as Uint8Array).slice(0, 64)).toString('hex'))
  console.log('WASM prefix', Buffer.from((wasmIn.bytecode as Uint8Array).slice(0, 64)).toString('hex'))
}
