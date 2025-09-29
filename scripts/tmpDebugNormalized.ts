import fs from 'fs/promises'
import path from 'path'
import { Compiler } from '../src/compiler'

async function main() {
  const [, , target = '__tests__/compiler/fixtures/simple-decl-init.ts'] = process.argv
  const fixture = path.resolve(target)
  const source = await fs.readFile(fixture, 'utf-8')
  const compiler = new Compiler(fixture, source)
  const sourceUtf8: Uint8Array = (compiler as any).sourceUtf8
  const normalizedPos: Uint32Array = (compiler as any).normalizedPosByPos
  console.log('fixture', path.relative(process.cwd(), fixture))
  console.log('source length', source.length)
  console.log('source (raw) ->')
  console.log(JSON.stringify(source))
  console.log('stripped utf8 as string ->')
  console.log(new TextDecoder().decode(sourceUtf8))
  console.log('utf8 bytes', Array.from(sourceUtf8))
  console.log('normalized positions sample:')
  for (let i = 0; i < source.length; i++) {
    const ch = JSON.stringify(source[i])
    console.log(`${i} (${ch}) => ${normalizedPos[i]}`)
  }
  console.log(`${source.length} (EOF) => ${normalizedPos[source.length]}`)

  const functionDef = compiler.compile()
  console.log('lineNumberTable ->')
  for (const entry of functionDef.bytecode.lineNumberTable) {
    console.log(entry)
  }
  console.log('pc2line bytes', functionDef.bytecode.pc2line)
  console.log('pc2column bytes', functionDef.bytecode.pc2column)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
