import ts from 'typescript'
import { buildSourceMapping, computeReferenceColumnAdjustments, mergeColumnAdjustments, sortColumnAdjustments } from '../src/compiler/debug/sourceMapping'

async function main() {
  const source = await ts.sys.readFile('__tests__/compiler/fixtures/complex-functions.ts', 'utf8')
  if (!source) throw new Error('missing source')
  const fileName = '__tests__/compiler/fixtures/complex-functions.ts'
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.ES2020, true)
  const reference = ts.transpileModule(source, {
    fileName,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    }
  }).outputText ?? ''

  const base = buildSourceMapping({ source, sourceFile, referenceJsSource: undefined })
  const adjustments = base.columnAdjustments
  const refAdjustments = computeReferenceColumnAdjustments(base.strippedSource, source, reference, fileName)
  mergeColumnAdjustments(adjustments, refAdjustments)
  sortColumnAdjustments(adjustments)

  console.log('stripped source:\n' + base.strippedSource)
  console.log('reference:\n' + reference)
  console.log('column adjustments:')
  for (const [line, entries] of adjustments) {
    console.log(line, entries)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
