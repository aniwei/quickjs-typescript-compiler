import { TypeScriptCompiler } from '../src/index'
import { getInstructionSize } from '../src/compiler/analysis/opcodeInfo'

async function dump(file: string) {
  const compiler = new TypeScriptCompiler()
  const { functionDef } = await compiler.compileFileWithArtifacts(file)
  console.log('===', file)
  const dumpTable = (def: any, indent = '') => {
    console.log(indent + 'name:', def.name?.value ?? '<eval>')
    const offsets: number[] = []
    let running = 0
    for (const ins of def.bytecode.instructions) {
      offsets.push(running)
      running += getInstructionSize(ins)
    }
    console.log(indent + 'offsets:', offsets)
    console.log(indent + 'lineNumberTable:', def.bytecode.lineNumberTable)
    for (const constant of def.bytecode.constantPool) {
      if (constant.tag === 9) {
        dumpTable(constant.value, indent + '  ')
      }
    }
  }
  dumpTable(functionDef)
}

async function main() {
  await dump('__tests__/compiler/fixtures/simple-add.ts')
  await dump('__tests__/compiler/fixtures/module-exports.ts')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
