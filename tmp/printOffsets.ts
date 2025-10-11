import { promises as fs } from 'node:fs'
import path from 'node:path'
import { createNewCompiler } from '../src/compiler'
import { buildSourceMapping } from '../src/compiler/debug/sourceMapping'

async function main() {
  const fixturePath = path.resolve('__tests__/compiler/fixtures/bitwise-ops.ts')
  const source = await fs.readFile(fixturePath, 'utf8')
  const compiler = createNewCompiler(fixturePath, source)
  const offsets = [73, 105, 140]
  for (const tsPos of offsets) {
    // @ts-ignore accessing private method for diagnostics
    const utf8 = compiler.toUtf8Offset(tsPos)
    // @ts-ignore private as well
    const { line, column } = compiler.getLineColumnFromUtf8Offset(utf8)
    console.log(JSON.stringify({ tsPos, utf8, line, column }))
  }

  // @ts-ignore deeply private access for debugging
  const tracker = compiler.utf8Tracker
  if (tracker) {
    const rangeStart = 65
    const rangeEnd = 115
    const mapping: Array<{ pos: number; utf8: number }> = []
    for (let pos = rangeStart; pos <= rangeEnd; pos += 1) {
      mapping.push({ pos, utf8: tracker.toUtf8Offset(pos) })
    }
    console.log('mapping', JSON.stringify(mapping, null, 2))
  }

  const mapping = buildSourceMapping({ source, sourceFile: (compiler as any).sourceFile, referenceJsSource: await fs.readFile(fixturePath.replace(/\.ts$/i, '.js'), 'utf8') })
  console.log('strippedSource', mapping.strippedSource)
  const collapseSegments: Array<{ start: number; end: number; replacement: string }> = []
  const { normalizedPosByPos, strippedSource } = mapping
  let segmentStart: number | null = null
  for (let pos = 1; pos < normalizedPosByPos.length; pos += 1) {
    const prev = normalizedPosByPos[pos - 1]
    const curr = normalizedPosByPos[pos]
    if (curr === prev) {
      if (segmentStart === null) {
        segmentStart = pos - 1
      }
    } else {
      if (segmentStart !== null) {
        collapseSegments.push({ start: segmentStart, end: pos, replacement: strippedSource.slice(prev, curr) })
        segmentStart = null
      }
    }
  }
  if (segmentStart !== null) {
    const start = segmentStart
    const end = normalizedPosByPos.length - 1
    const last = normalizedPosByPos[end]
    collapseSegments.push({ start, end, replacement: strippedSource.slice(last) })
  }
  console.log('collapse', collapseSegments.map((seg) => ({
    start: seg.start,
    end: seg.end,
    removed: source.slice(seg.start, seg.end),
    replacement: seg.replacement,
  })))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
