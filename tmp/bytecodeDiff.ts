import { promises as fs } from 'node:fs'
import path from 'node:path'
import { TypeScriptCompiler } from '../src'
import { QuickJSLib } from '../scripts/QuickJSLib'

async function main() {
  const fixturePath = path.resolve('__tests__/compiler/fixtures/function-add.ts')
  const jsFixturePath = fixturePath.replace(/\.ts$/i, '.js')
  const source = await fs.readFile(fixturePath, 'utf-8')
  const jsSource = await fs.readFile(jsFixturePath, 'utf-8')
  const moduleFileName = '__tests__/compiler/fixtures/function-add.js'

  const compiler = new TypeScriptCompiler()
  const tsBytecode = await compiler.compileSource(source, moduleFileName)
  const quickjsBytecode = await QuickJSLib.compileSource(jsSource, moduleFileName)

  let diffIndex = -1
  const maxLen = Math.max(tsBytecode.length, quickjsBytecode.length)
  for (let index = 0; index < maxLen; index += 1) {
    if (tsBytecode[index] !== quickjsBytecode[index]) {
      diffIndex = index
      break
    }
  }

  console.log('ts length', tsBytecode.length, 'quickjs length', quickjsBytecode.length)
  console.log('diffIndex', diffIndex)
  if (diffIndex !== -1) {
    console.log('ts bytes', Array.from(tsBytecode.slice(diffIndex, diffIndex + 16)))
    console.log('quickjs bytes', Array.from(quickjsBytecode.slice(diffIndex, diffIndex + 16)))
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
