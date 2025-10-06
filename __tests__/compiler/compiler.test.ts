import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { TypeScriptCompiler } from '../../src'
import { Compiler } from '../../src/compiler'
import { FunctionKind, Opcode, BytecodeTag } from '../../src/env'
import { ModuleExportType } from '../../src/functionDef'
import { QuickJSLib } from '../../scripts/QuickJSLib'

jest.setTimeout(30000)

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

  test('boolean, null and comparison operations use dedicated opcodes', async () => {
    const compiler = new TypeScriptCompiler()
    const source = `
      const truthy = true
      const falsy = false
      const empty = null

      function check(value: number) {
        if (value === 1) {
          return true
        }
        return value !== 2
      }
    `
    const { functionDef } = await compiler.compileSourceWithArtifacts(source, 'boolean-comparisons.ts')

    const moduleOpcodes = functionDef.bytecode.instructions.map((instruction) => instruction.opcode)
    expect(moduleOpcodes).toEqual(
      expect.arrayContaining([Opcode.OP_push_true, Opcode.OP_push_false, Opcode.OP_null])
    )

    const childFunction = functionDef.children.find((child) => child.bytecode.funcKind === FunctionKind.JS_FUNC_NORMAL)
    expect(childFunction).toBeDefined()
    if (!childFunction) {
      return
    }
    const childOpcodes = childFunction.bytecode.instructions.map((instruction) => instruction.opcode)
    expect(childOpcodes).toEqual(expect.arrayContaining([Opcode.OP_strict_eq, Opcode.OP_strict_neq]))
  })

  test('bitwise, shift, exponent, in and instanceof operations use dedicated opcodes', async () => {
    const compiler = new TypeScriptCompiler()
    const source = `
      function operations(value: number, mask: number, obj: any, ctor: any) {
        const shiftLeft = value << 2
        const shiftRight = value >> 1
        const shiftUnsigned = value >>> 1
        const power = value ** 3
        const bitwiseAnd = value & mask
        const bitwiseOr = value | mask
        const bitwiseXor = value ^ mask
        const hasKey = 'key' in obj
        const isInstance = obj instanceof ctor
        const base =
          shiftLeft +
          shiftRight +
          shiftUnsigned +
          power +
          bitwiseAnd +
          bitwiseOr +
          bitwiseXor
        if (hasKey) {
          if (isInstance) {
            return base + 2
          }
          return base + 1
        }
        if (isInstance) {
          return base + 1
        }
        return base
      }
    `
    const { functionDef } = await compiler.compileSourceWithArtifacts(source, 'bitwise-opcodes.ts')

    const childFunction = functionDef.children.find((child) => child.bytecode.funcKind === FunctionKind.JS_FUNC_NORMAL)
    expect(childFunction).toBeDefined()
    if (!childFunction) {
      return
    }

    const opcodes = childFunction.bytecode.instructions.map((instruction) => instruction.opcode)
    expect(opcodes).toEqual(
      expect.arrayContaining([
        Opcode.OP_shl,
        Opcode.OP_sar,
        Opcode.OP_shr,
        Opcode.OP_pow,
        Opcode.OP_and,
        Opcode.OP_or,
        Opcode.OP_xor,
        Opcode.OP_in,
        Opcode.OP_instanceof,
      ])
    )
  })

  test('records module exports for variable statements, named export declarations and default assignments', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'module-exports.ts')
    const source = await fs.readFile(fixturePath, 'utf8')
    const compiler = new Compiler(fixturePath, source, { referenceJsSource: null })
    const functionDef = compiler.compile()
    const moduleRecord = functionDef.module
    expect(moduleRecord).not.toBeNull()
    if (!moduleRecord) {
      return
    }

    const atomTable = (compiler as any).atomTable
    const exportSummaries = moduleRecord.exportEntries.map((entry) => ({
      type: entry.type,
      exportedName: atomTable.getAtomString(entry.exportedName),
      localVarIndex: entry.type === ModuleExportType.Local ? entry.localVarIndex : -1,
    }))

    expect(exportSummaries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: ModuleExportType.Local,
          exportedName: 'alpha',
          localVarIndex: 0,
        }),
        expect.objectContaining({
          type: ModuleExportType.Local,
          exportedName: 'gamma',
          localVarIndex: 1,
        }),
        expect.objectContaining({
          type: ModuleExportType.Local,
          exportedName: 'default',
          localVarIndex: 2,
        }),
        expect.objectContaining({
          type: ModuleExportType.Local,
          exportedName: 'delta',
          localVarIndex: 3,
        }),
      ])
    )
  })

  test('module exports fixture executes under QuickJS WASM', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'module-exports.ts')
    const compiler = new TypeScriptCompiler()
    const { bytecode } = await compiler.compileFileWithArtifacts(fixturePath)

    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'module-exports-bytecode-'))
    const bytecodePath = path.join(tempDir, 'module-exports.qbc')
    try {
      await fs.writeFile(bytecodePath, bytecode)
      await expect(QuickJSLib.runWithBinaryPath(bytecodePath)).resolves.toBeUndefined()
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true })
    }
  })

  test('default function export fixture records module metadata', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'module-exports-default.ts')
    const source = await fs.readFile(fixturePath, 'utf8')
    const compiler = new Compiler(fixturePath, source, { referenceJsSource: null })
    const functionDef = compiler.compile()
    const moduleRecord = functionDef.module
    expect(moduleRecord).not.toBeNull()
    if (!moduleRecord) {
      return
    }

    const atomTable = (compiler as any).atomTable
    const exportSummaries = moduleRecord.exportEntries.map((entry) => ({
      type: entry.type,
      exportedName: atomTable.getAtomString(entry.exportedName),
      localVarIndex: entry.type === ModuleExportType.Local ? entry.localVarIndex : -1,
    }))

    expect(exportSummaries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: ModuleExportType.Local,
          exportedName: 'default',
        }),
        expect.objectContaining({
          type: ModuleExportType.Local,
          exportedName: 'multiply',
        }),
        expect.objectContaining({
          type: ModuleExportType.Local,
          exportedName: 'ultimateAnswer',
        }),
      ])
    )
  })

  test('default function export fixture executes under QuickJS WASM', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'module-exports-default.ts')
    const compiler = new TypeScriptCompiler()
    const { bytecode } = await compiler.compileFileWithArtifacts(fixturePath)

    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'module-exports-default-bytecode-'))
    const bytecodePath = path.join(tempDir, 'module-exports-default.qbc')
    try {
      await fs.writeFile(bytecodePath, bytecode)
      await expect(QuickJSLib.runWithBinaryPath(bytecodePath)).resolves.toBeUndefined()
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true })
    }
  })

  test('class export fixture records module metadata', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'module-exports-class.ts')
    const source = await fs.readFile(fixturePath, 'utf8')
    const compiler = new Compiler(fixturePath, source, { referenceJsSource: null })
    const functionDef = compiler.compile()
    const moduleRecord = functionDef.module
    expect(moduleRecord).not.toBeNull()
    if (!moduleRecord) {
      return
    }

    const atomTable = (compiler as any).atomTable
    const exportSummaries = moduleRecord.exportEntries.map((entry) => ({
      type: entry.type,
      exportedName: atomTable.getAtomString(entry.exportedName),
      localVarIndex: entry.type === ModuleExportType.Local ? entry.localVarIndex : -1,
    }))

    expect(exportSummaries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: ModuleExportType.Local,
          exportedName: 'Counter',
        }),
        expect.objectContaining({
          type: ModuleExportType.Local,
          exportedName: 'createCounter',
        }),
        expect.objectContaining({
          type: ModuleExportType.Local,
          exportedName: 'sharedCounter',
        }),
        expect.objectContaining({
          type: ModuleExportType.Local,
          exportedName: 'default',
        }),
      ])
    )
  })

  test('class export fixture executes under QuickJS WASM', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'module-exports-class.ts')
    const compiler = new TypeScriptCompiler()
    const { bytecode } = await compiler.compileFileWithArtifacts(fixturePath)

    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'module-exports-class-bytecode-'))
    const bytecodePath = path.join(tempDir, 'module-exports-class.qbc')
    try {
      await fs.writeFile(bytecodePath, bytecode)
      await expect(QuickJSLib.runWithBinaryPath(bytecodePath)).resolves.toBeUndefined()
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true })
    }
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
