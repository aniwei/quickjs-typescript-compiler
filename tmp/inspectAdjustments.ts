import fs from 'node:fs/promises'
import { Compiler } from '../src/compiler'
import ts from 'typescript'

async function main() {
  const file = process.argv[2]
  if (!file) throw new Error('provide file')
  const source = await fs.readFile(file, 'utf8')
  const transpiled = ts.transpileModule(source, {
    fileName: file,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.Preserve,
      importHelpers: false,
      esModuleInterop: false,
    },
  })
  const compiler: any = new Compiler(file, source, { referenceJsSource: transpiled.outputText ?? undefined })
  const adjustments: Map<number, any> = compiler.columnAdjustments
  console.log('adjustments', adjustments)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
