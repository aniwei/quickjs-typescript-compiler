import ts from 'typescript'
import { buildSourceMapping } from '../src/compiler/debug/sourceMapping'
import { promises as fs } from 'node:fs'

async function main() {
  const file = '__tests__/compiler/fixtures/simple-add.ts'
  const source = await fs.readFile(file, 'utf-8')
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true)
  const result = buildSourceMapping({
    source,
    sourceFile,
    referenceJsSource: source,
  })
  const entries = Array.from(result.columnAdjustments.entries()).map(([line, adjustments]) => ({ line, adjustments }))
  console.log('stripped===source', result.strippedSource === source)
  console.log('normalizedPos[0..6]', Array.from(result.normalizedPosByPos.slice(0, 7)))
  console.log('columnAdjustments', JSON.stringify(entries))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
