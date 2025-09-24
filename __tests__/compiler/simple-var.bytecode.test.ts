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
    const tsBytecode = await tsCompiler.compileSource(source, path.relative(process.cwd(), fixturePath))

    const quickjsBytecode = await QuickJSLib.compileSource('const x = 1;\n', path.relative(process.cwd(), fixturePath))

    expect(Buffer.from(tsBytecode)).toEqual(Buffer.from(quickjsBytecode))
  })
})
