import { TypeScriptCompiler } from '../src'
import { promises as fs } from 'node:fs'

async function main() {
  const tsPath = '__tests__/compiler/fixtures/complex-functions.ts'
  const source = await fs.readFile(tsPath, 'utf-8')
  const reference = `function multiply(a, b) {\n    const result = a * b;\n    return result;\n}\nfunction factorial(n) {\n    if (n <= 1) {\n        return 1;\n    }\n    return n * factorial(n - 1);\n}\n`
  const compiler = new TypeScriptCompiler({ referenceJsSource: reference })
  const { functionDef } = await compiler.compileSourceWithArtifacts(source, tsPath, { referenceJsSource: reference })
  console.log(functionDef.children.map((child) => ({ name: child.funcName, pc2line: child.bytecode.pc2line })))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
