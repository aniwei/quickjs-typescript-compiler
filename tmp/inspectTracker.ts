import ts from 'typescript'
import { buildSourceMapping } from '../src/compiler/debug/sourceMapping'
import { createUtf8PositionTracker } from '../src/compiler/debug/utf8PositionTracker'
import { promises as fs } from 'node:fs'

async function main() {
  const file = '__tests__/compiler/fixtures/simple-add.ts'
  const source = await fs.readFile(file, 'utf-8')
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true)
  const map = buildSourceMapping({ source, sourceFile, referenceJsSource: source })
  const tracker = createUtf8PositionTracker({
    strippedSource: map.strippedSource,
    normalizedPosByPos: map.normalizedPosByPos,
    columnAdjustments: map.columnAdjustments,
  })
  const offsets = [0, 1, 2, 3, 4]
  for (const pos of offsets) {
    const utf8 = tracker.toUtf8Offset(pos)
    const { line, column } = tracker.getLineColumnFromUtf8Offset(utf8)
    console.log({ pos, utf8, line, column })
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
