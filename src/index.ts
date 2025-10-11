import { promises as fs } from 'node:fs'
import path from 'node:path'
import * as ts from 'typescript'
import { Compiler, type CompilerOptions } from './compiler'
import { AtomTable } from './atoms'
import { BytecodeWriter } from './bytecodeWriter'
import { FunctionDef } from './functionDef'

export interface CompileFlags {
  bigInt?: boolean
  dump?: boolean
  shortCode?: boolean
  debug?: boolean
  strictMode?: boolean
}

export interface TypeScriptCompilerOptions extends CompileFlags {
  atomTable?: AtomTable
  referenceJsSource?: string | null
}

export class TypeScriptCompiler {
  private readonly atomTable: AtomTable
  private readonly compilerOptions: CompilerOptions
  private readonly defaultReferenceJsSource: string | null | undefined

  constructor(options: TypeScriptCompilerOptions = {}) {
    this.atomTable = options.atomTable ?? new AtomTable()
    this.defaultReferenceJsSource = options.referenceJsSource
    this.compilerOptions = {
      atomTable: this.atomTable,
    }
  }

  async compileFile(filePath: string): Promise<Uint8Array> {
    const { bytecode } = await this.compileFileWithArtifacts(filePath)
    return bytecode
  }

  async compileFileWithArtifacts(filePath: string): Promise<{ functionDef: FunctionDef; bytecode: Uint8Array }> {
    const source = await fs.readFile(filePath, 'utf-8')
    const relativePath = path.relative(process.cwd(), filePath) || filePath
    return this.compileSourceWithArtifacts(source, relativePath)
  }

  async compileSource(
    source: string,
    fileName = '<stdin>',
    options: { referenceJsSource?: string | null } = {}
  ): Promise<Uint8Array> {
    const { bytecode } = await this.compileSourceWithArtifacts(source, fileName, options)
    return bytecode
  }

  async compileSourceWithArtifacts(
    source: string,
    fileName = '<stdin>',
    options: { referenceJsSource?: string | null } = {}
  ): Promise<{ functionDef: FunctionDef; bytecode: Uint8Array }> {
    const referenceJsSource = await this.resolveReferenceJsSource(source, fileName, options.referenceJsSource)
    const compiler = new Compiler(fileName, source, {
      ...this.compilerOptions,
      referenceJsSource,
    })
    const functionDef = compiler.compile()
    const writer = new BytecodeWriter(this.atomTable)
    const bytecode = writer.writeModule(functionDef)
    return { functionDef, bytecode }
  }

  private async resolveReferenceJsSource(
    source: string,
    fileName: string,
    explicit: string | null | undefined
  ): Promise<string | null | undefined> {
    if (explicit !== undefined) {
      return explicit
    }
    if (this.defaultReferenceJsSource !== undefined) {
      return this.defaultReferenceJsSource
    }

    if (fileName !== '<stdin>') {
      const absolutePath = path.isAbsolute(fileName) ? fileName : path.resolve(process.cwd(), fileName)
      const jsCandidate = absolutePath.replace(/\.(cts|mts|tsx|ts)$/i, '.js')
      if (jsCandidate !== absolutePath) {
        try {
          const jsSource = await fs.readFile(jsCandidate, 'utf-8')
          return jsSource
        } catch {
          // ignore: fall back to transpilation below
        }
      }
    }

    return this.transpileReferenceSource(source, fileName)
  }

  private transpileReferenceSource(source: string, fileName: string): string | undefined {
    try {
      const result = ts.transpileModule(source, {
        fileName,
        compilerOptions: {
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2020,
          jsx: ts.JsxEmit.Preserve,
          importHelpers: false,
          esModuleInterop: false,
        },
        reportDiagnostics: false,
      })
      const output = result.outputText
      if (!output) {
        return undefined
      }
      return output.replace(/\r\n/g, '\n')
    } catch {
      return undefined
    }
  }
}

export function createNewTypeScriptCompiler(options: TypeScriptCompilerOptions = {}) {
  return new TypeScriptCompiler(options)
}