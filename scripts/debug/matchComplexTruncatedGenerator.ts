import { TypeScriptCompiler } from '../../src'
import { parseBytecodeModule } from '../../src/bytecodeReader'

function firstInnerFunction(mod: any) {
  const cpool = mod.func.cpool || []
  return cpool.find((e: any) => e && typeof e === 'object' && e.tag === 12)
}

const targetHex = '89bf308aec022f0eb8b9ba2603008b0ebf30b89f2f'

const variants: Array<{ name: string; src: string }> = [
  {
    name: 'yield + return',
    src: `function* g48() {\n  yield 48;\n  return 48+1;\n}\nlet t = 0;\nfor (const v of g48()) t += v;\nconsole.log(t);\n`,
  },
  {
    name: 'yield + yield array + return',
    src: `function* g48() {\n  yield 48;\n  yield [1,2,3];\n  return 48+1;\n}\nlet t = 0;\nfor (const v of g48()) t += v;\nconsole.log(t);\n`,
  },
  {
    name: 'yield + yield* array + return',
    src: `function* g48() {\n  yield 48;\n  yield* [1, 2, 3];\n  return 48+1;\n}\nlet t = 0;\nfor (const v of g48()) t += v;\nconsole.log(t);\n`,
  },
  {
    name: 'yield + yield* empty + return',
    src: `function* g48() {\n  yield 48;\n  yield* [];\n  return 48+1;\n}\nlet t = 0;\nfor (const v of g48()) t += v;\nconsole.log(t);\n`,
  },
]

for (const v of variants) {
  const compiler = new TypeScriptCompiler({ debug: false, module: false, forceModule: false })
  const bc = compiler.compile(v.src, '__tests__/fixtures_generated/complex-048.js')
  const mod = parseBytecodeModule(bc)
  const inner = firstInnerFunction(mod)
  const hex = Buffer.from(inner.bytecode as Uint8Array).toString('hex')

  const ok = hex === targetHex
  console.log('\n===', v.name, '===')
  console.log('inner', { bytecodeLen: inner.bytecodeLen, stackSize: inner.stackSize })
  console.log('hex', hex)
  console.log('matchTarget', ok)
}
