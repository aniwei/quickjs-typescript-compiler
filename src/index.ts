import { promises as fs } from 'node:fs'
import path from 'node:path'
import { Compiler, CompilerOptions } from './compiler'
import { AtomTable } from './atoms'
import { BytecodeWriter } from './bytecodeWriter'

export interface CompileFlags {
  bigInt?: boolean
  dump?: boolean
  shortCode?: boolean
  debug?: boolean
  strictMode?: boolean
}

export interface TypeScriptCompilerOptions extends CompileFlags {
  atomTable?: AtomTable
}

export class TypeScriptCompiler {
  private readonly atomTable: AtomTable
  private readonly compilerOptions: CompilerOptions

  constructor(options: TypeScriptCompilerOptions = {}) {
    this.atomTable = options.atomTable ?? new AtomTable()
    this.compilerOptions = {
      atomTable: this.atomTable,
    }
  }

  async compileFile(filePath: string): Promise<Uint8Array> {
    const source = await fs.readFile(filePath, 'utf-8')
    const relativePath = path.relative(process.cwd(), filePath) || filePath
    return this.compileSource(source, relativePath)
  }

  async compileSource(source: string, fileName = '<stdin>'): Promise<Uint8Array> {
    const compiler = new Compiler(fileName, source, this.compilerOptions)
    const functionDef = compiler.compile()
    const writer = new BytecodeWriter(this.atomTable)
    return writer.writeModule(functionDef)
  }
}

export function createNewTypeScriptCompiler(options: TypeScriptCompilerOptions = {}) {
  return new TypeScriptCompiler(options)
}