import fs from 'node:fs'
import { parseBytecodeModule } from '../../src/bytecodeReader'

function firstInnerFunction(mod: any) {
  const cpool = mod.func.cpool || []
  return cpool.find((e: any) => e && typeof e === 'object' && e.tag === 12)
}

for (const name of ['complex-010', 'complex-029', 'complex-048', 'complex-067', 'complex-086']) {
  const tsPath = `artifacts/${name}/bytecode/${name}.ts.qbc`
  const wasmPath = `artifacts/${name}/bytecode/${name}.wasm.qbc`

  const ts = parseBytecodeModule(fs.readFileSync(tsPath))
  const wasm = parseBytecodeModule(fs.readFileSync(wasmPath))

  const tsIn = firstInnerFunction(ts)
  const wasmIn = firstInnerFunction(wasm)

  console.log(`\n=== ${name} ===`)
  console.log('TS outer', {
    bytecodeLen: ts.func.bytecodeLen,
    stackSize: ts.func.stackSize,
    hasDebug: ts.func.hasDebug,
    filename: ts.func.debug?.filename,
  })
  console.log('WASM outer', {
    bytecodeLen: wasm.func.bytecodeLen,
    stackSize: wasm.func.stackSize,
    hasDebug: wasm.func.hasDebug,
    filename: wasm.func.debug?.filename,
  })
  console.log(
    'TS inner',
    tsIn
      ? {
          bytecodeLen: tsIn.bytecodeLen,
          stackSize: tsIn.stackSize,
          hasDebug: tsIn.hasDebug,
          filename: tsIn.debug?.filename,
        }
      : null,
  )
  console.log(
    'WASM inner',
    wasmIn
      ? {
          bytecodeLen: wasmIn.bytecodeLen,
          stackSize: wasmIn.stackSize,
          hasDebug: wasmIn.hasDebug,
          filename: wasmIn.debug?.filename,
        }
      : null,
  )

  if (tsIn && wasmIn) {
    const a = tsIn.bytecode as Uint8Array
    const b = wasmIn.bytecode as Uint8Array
    const min = Math.min(a.length, b.length)
    let i = 0
    for (; i < min && a[i] === b[i]; i++);

    console.log('inner firstDiff', {
      i,
      ts: a[i],
      wasm: b[i],
      tsLen: a.length,
      wasmLen: b.length,
    })
    console.log('inner ts prefix', Buffer.from(a.slice(0, Math.min(64, a.length))).toString('hex'))
    console.log('inner wasm prefix', Buffer.from(b.slice(0, Math.min(64, b.length))).toString('hex'))

    const tsSrc = (tsIn.debug?.source as string | undefined) ?? (ts.func.debug?.source as string | undefined)
    const wasmSrc = (wasmIn.debug?.source as string | undefined) ?? (wasm.func.debug?.source as string | undefined)
    const showSrc = (label: string, src: string | undefined) => {
      if (!src) {
        console.log(label, '<no debug.source>')
        return
      }
      const lines = src.split(/\r?\n/).slice(0, 30)
      console.log(label)
      for (let i = 0; i < lines.length; i++) {
        console.log(String(i + 1).padStart(2, '0') + ': ' + lines[i])
      }
    }

    showSrc('TS embedded source (first 30 lines):', tsSrc)
    showSrc('WASM embedded source (first 30 lines):', wasmSrc)
  }
}
