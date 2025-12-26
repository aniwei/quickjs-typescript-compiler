import fs from 'node:fs'
import { TypeScriptCompiler } from '../../src'
import { parseBytecodeModule } from '../../src/bytecodeReader'

function firstInnerFunction(mod: any) {
  const cpool = mod.func.cpool || []
  return cpool.find((e: any) => e && typeof e === 'object' && e.tag === 12)
}

const src = fs.readFileSync('__tests__/fixtures/generator-yield-048.ts', 'utf8')

for (const filename of [
  '__tests__/fixtures/generator-yield-048.ts',
  '__tests__/fixtures_generated/complex-048.js',
  '__tests__/fixtures_generated/complex-048.ts',
]) {
  const compiler = new TypeScriptCompiler({ debug: false, module: false, forceModule: false })
  const bytecode = compiler.compile(src, filename)
  const mod = parseBytecodeModule(bytecode)
  const inner = firstInnerFunction(mod)

  console.log('\n=== compile filename:', filename, '===')
  console.log('outer', { bytecodeLen: mod.func.bytecodeLen, stackSize: mod.func.stackSize, file: mod.func.debug?.filename })
  console.log('inner', { bytecodeLen: inner.bytecodeLen, stackSize: inner.stackSize, file: inner.debug?.filename })
  console.log('inner prefix', Buffer.from((inner.bytecode as Uint8Array).slice(0, 32)).toString('hex'))
}
