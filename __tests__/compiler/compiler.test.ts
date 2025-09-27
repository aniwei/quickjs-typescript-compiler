import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { TypeScriptCompiler } from '../../src'
import { FunctionKind } from '../../src/env'
import { QuickJSLib } from '../../scripts/QuickJSLib'

describe('TypeScriptCompiler', () => {
  test('compiles simple module to bytecode', async () => {
    const compiler = new TypeScriptCompiler()
    const result = await compiler.compileSource('const value: number = 1;', 'inline.ts')
    expect(result).toBeInstanceOf(Uint8Array)
    expect(result.length).toBeGreaterThan(0)
  })

  test('compiled bytecode executes in QuickJS WASM runtime', async () => {
    const compiler = new TypeScriptCompiler()
    const source = `
      const a: number = 20
      const b: number = 22
      const result = a + b
    `
    const bytecode = await compiler.compileSource(source, 'wasm-run.ts')
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'quickjs-ts-bytecode-'))
    const bytecodePath = path.join(tempDir, 'module.qbc')
    try {
      await fs.writeFile(bytecodePath, bytecode)
      await expect(QuickJSLib.runWithBinaryPath(bytecodePath)).resolves.toBeUndefined()
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true })
    }
  })

  test('function declarations use QuickJS-aligned JSFunctionDef flags', async () => {
    const compiler = new TypeScriptCompiler()
    const source = `
      function add(a: number, b: number) {
        return a + b
      }
      const sentinel = 1
    `
    const { functionDef } = await compiler.compileSourceWithArtifacts(source, 'flag-check.ts')
    const root = functionDef

    expect(root.bytecode.funcKind).toBe(FunctionKind.JS_FUNC_ASYNC)
    expect(root.bytecode.argumentsAllowed).toBe(true)
    expect(root.bytecode.hasSimpleParameterList).toBe(false)

    expect(root.children).toHaveLength(1)
    const child = root.children[0]

    expect(child.bytecode.funcKind).toBe(FunctionKind.JS_FUNC_NORMAL)
    expect(child.bytecode.hasPrototype).toBe(true)
    expect(child.bytecode.newTargetAllowed).toBe(true)
    expect(child.bytecode.argumentsAllowed).toBe(true)
    expect(child.bytecode.hasSimpleParameterList).toBe(true)
  })
})
