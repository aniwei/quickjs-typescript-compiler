import { TypeScriptCompiler } from '../src/index'
import { AtomTable } from '../src/atoms'
import ts from 'typescript'

async function main() {
  const file = process.argv[2]
  if (!file) throw new Error('provide file')
  const atomTable = new AtomTable()
  const tsSource = await (await import('node:fs/promises')).readFile(file, 'utf8')
  const transpiled = ts.transpileModule(tsSource, {
    fileName: file,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.Preserve,
      importHelpers: false,
      esModuleInterop: false,
    },
  })
  const reference = transpiled.outputText ?? undefined
  const compiler = new TypeScriptCompiler({ atomTable, referenceJsSource: reference })
  const { functionDef } = await compiler.compileSourceWithArtifacts(tsSource, file, { referenceJsSource: reference })

  const visit = (func: any) => {
    const name = atomTable.getAtomString(func.bytecode.name) ?? '<anonymous>'
    console.log('Function', name)
    console.log('Line table:', func.bytecode.lineNumberTable)
  console.log('PC2Line:', Array.from(func.bytecode.pc2line))
    if (func.children) {
      for (const child of func.children) {
        visit(child)
      }
    }
  }

  visit(functionDef as any)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
