import ts from 'typescript'
import { buildSourceMapping, computeReferenceColumnAdjustments, mergeColumnAdjustments, sortColumnAdjustments, adjustColumnForTranspiled } from '../src/compiler/debug/sourceMapping'
import { createUtf8PositionTracker } from '../src/compiler/debug/utf8PositionTracker'

async function main() {
  const fileName = '__tests__/compiler/fixtures/module-exports.ts'
  const source = await ts.sys.readFile(fileName, 'utf8')
  if (!source) {
    throw new Error('missing source: ' + fileName)
  }
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.ES2022, true)
  const reference = ts.transpileModule(source, {
    fileName,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText ?? ''

  const base = buildSourceMapping({ source, sourceFile, referenceJsSource: reference })
  const refAdjustments = computeReferenceColumnAdjustments(base.strippedSource, source, reference, fileName)
  mergeColumnAdjustments(base.columnAdjustments, refAdjustments)
  sortColumnAdjustments(base.columnAdjustments)

  console.log('--- stripped ---')
  base.strippedSource.split(/\n/).forEach((line, index) => {
    console.log(index.toString().padStart(2, '0') + ': ' + line)
  })
  console.log('raw:', JSON.stringify(base.strippedSource))
  console.log('--- adjustments ---')
  for (const [line, entries] of base.columnAdjustments) {
    console.log(line, entries)
  }

  const tracker = createUtf8PositionTracker({
    strippedSource: base.strippedSource,
    normalizedPosByPos: base.normalizedPosByPos,
    columnAdjustments: base.columnAdjustments,
  })
  const interestingOffsets = [131, 166, 169, 172, 175, 178, 180, 162]
  console.log('--- tracker offsets ---')
  for (const offset of interestingOffsets) {
    const { line, column } = tracker.getLineColumnFromUtf8Offset(offset)
    const adjustment = adjustColumnForTranspiled(base.columnAdjustments, line, column)
    console.log({ offset, line, column, adjustment, adjustedColumn: column + adjustment })
  }
  const tsPositions = [131, 169, 175, 180, 178, 162]
  console.log('--- toUtf8Offset ---')
  for (const pos of tsPositions) {
    console.log({ pos, utf8: tracker.toUtf8Offset(pos) })
  }

  const windowStart = 150
  const windowEnd = 190
  console.log('--- normalized positions ---')
  for (let pos = windowStart; pos <= windowEnd; pos += 1) {
    const normalized = base.normalizedPosByPos[pos]
    if (pos % 5 === 0) {
      process.stdout.write('\n')
    }
    process.stdout.write(`${pos}:${normalized} `)
  }
  process.stdout.write('\n')

  const lineOffsets: number[] = []
  let running = 0
  base.strippedSource.split(/\n/).forEach((line) => {
    lineOffsets.push(running)
    running += line.length + 1
  })
  console.log('--- line offsets ---')
  lineOffsets.forEach((start, index) => {
    console.log({ index, start })
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
