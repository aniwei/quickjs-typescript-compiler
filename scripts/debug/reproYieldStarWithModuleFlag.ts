import fs from 'node:fs'
import { TypeScriptCompiler } from '../../src'
import { parseBytecodeModule } from '../../src/bytecodeReader'

function firstInnerFunction(mod: any) {
  const cpool = mod.func.cpool || []
  return cpool.find((e: any) => e && typeof e === 'object' && e.tag === 12)
}

const src = fs.readFileSync('__tests__/fixtures/generator-yield-048.ts', 'utf8')

const configs = [
  { module: false, forceModule: false },
  { module: true, forceModule: false },
  { module: true, forceModule: true },
]

for (const cfg of configs) {
  const compiler = new TypeScriptCompiler({ debug: false, module: cfg.module, forceModule: cfg.forceModule })
  const bc = compiler.compile(src, '__tests__/fixtures_generated/complex-048.js')
  const mod = parseBytecodeModule(bc)
  const inner = firstInnerFunction(mod)
  console.log('\n===', cfg, '===')
  console.log('outer', { bytecodeLen: mod.func.bytecodeLen, stackSize: mod.func.stackSize })
  console.log('inner', { bytecodeLen: inner.bytecodeLen, stackSize: inner.stackSize })
  console.log('inner prefix', Buffer.from((inner.bytecode as Uint8Array).slice(0, 24)).toString('hex'))
}
