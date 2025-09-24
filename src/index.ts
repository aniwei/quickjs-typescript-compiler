import { promises as fs } from 'node:fs'
import { Compiler, CompilerOptions } from './compiler'
import { AtomTable } from './atoms'

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
    return this.compileSource(source, filePath)
  }

  async compileSource(source: string, fileName = '<stdin>'): Promise<Uint8Array> {
    const compiler = new Compiler(fileName, source, this.compilerOptions)
    compiler.compile()
    // TODO: Implement bytecode serialization
    return new Uint8Array()
  }
}

export function createNewTypeScriptCompiler(options: TypeScriptCompilerOptions = {}) {
  return new TypeScriptCompiler(options)
}