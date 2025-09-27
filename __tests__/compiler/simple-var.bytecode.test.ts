import { promises as fs } from 'node:fs'
import path from 'node:path'
import { TypeScriptCompiler } from '../../src'
import { QuickJSLib } from '../../scripts/QuickJSLib'

const FIXTURE_RELATIVE = path.join('__tests__', 'compiler', 'fixtures', 'simple-var.ts')

describe('simple-var bytecode alignment', () => {
  test('TypeScript compiler output matches QuickJS', async () => {
    const fixturePath = path.resolve(FIXTURE_RELATIVE)
    const source = await fs.readFile(fixturePath, 'utf-8')

    const tsCompiler = new TypeScriptCompiler()
    const moduleFileName = toModuleFileName(path.relative(process.cwd(), fixturePath))
    const tsBytecode = await tsCompiler.compileSource(source, moduleFileName)

    const quickjsBytecode = await QuickJSLib.compileSource('const x = 1;\n', moduleFileName)

    expect(Buffer.from(tsBytecode)).toEqual(Buffer.from(quickjsBytecode))
  })
})

function toModuleFileName(filePath: string): string {
  return filePath.replace(/\.(cts|mts|tsx|ts)$/i, (match) => {
    switch (match.toLowerCase()) {
      case '.cts':
        return '.cjs'
      case '.mts':
        return '.mjs'
      default:
        return '.js'
    }
  })
}
