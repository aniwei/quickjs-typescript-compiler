import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { TypeScriptCompiler } from '../../src'
import { Compiler } from '../../src/compiler'
import { FunctionKind, Opcode, BytecodeTag } from '../../src/env'
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

  test('decimal numeric literals use float constant pool entries', async () => {
    const compiler = new TypeScriptCompiler()
    const source = 'const value = 3.5\n'
    const { functionDef } = await compiler.compileSourceWithArtifacts(source, 'float-literal.ts')

    const pool = functionDef.bytecode.constantPool
    expect(pool.length).toBeGreaterThan(0)
    const floatEntry = pool.find((entry) => entry.tag === BytecodeTag.TC_TAG_FLOAT64)
    expect(floatEntry).toBeDefined()
    if (!floatEntry) {
      return
    }
    expect(floatEntry.tag).toBe(BytecodeTag.TC_TAG_FLOAT64)
    if ('value' in floatEntry) {
      expect(floatEntry.value).toBe(3.5)
    } else {
      throw new Error('Float constant entry missing value field')
    }

    const hasPushConst = functionDef.bytecode.instructions.some(
      (instruction) => instruction.opcode === Opcode.OP_push_const || instruction.opcode === Opcode.OP_push_const8
    )
    expect(hasPushConst).toBe(true)
  })

  test('no-substitution template literals emit atom pushes', async () => {
    const compiler = new TypeScriptCompiler()
    const source = 'const value = `template literal`\n'
    const { functionDef } = await compiler.compileSourceWithArtifacts(source, 'template-literal.ts')

    const hasPushAtomValue = functionDef.bytecode.instructions.some(
      (instruction) => instruction.opcode === Opcode.OP_push_atom_value
    )
    expect(hasPushAtomValue).toBe(true)
    expect(functionDef.bytecode.constantPool).toHaveLength(0)
  })

  test('column adjustments honor explicit reference JS source', () => {
    const sourceTs = [
      'if (true) {',
      '  console.log("ts")',
      '}',
      '',
    ].join('\n')

    const referenceJs = [
      'if (true) {',
      'console.log("ts")',
      '}',
      '',
    ].join('\n')

    const compiler = new Compiler('inline.ts', sourceTs, { referenceJsSource: referenceJs })
    const adjustments = (compiler as any).columnAdjustments as Map<number, Array<{ startColumn: number; delta: number }>>
    const entries = adjustments.get(1)

    expect(entries).toBeDefined()
    expect(entries && entries[0]).toBeDefined()
    expect(entries?.[0].startColumn).toBe(2)
    expect(entries?.[0].delta).toBe(-2)
  })
})
