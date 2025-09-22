/**
 * Main entry point for the QuickJS TypeScript Compiler
 */

import { CompilerFlags } from './opcodes'
import { TypeScriptCompilerCore } from './compiler'

export interface CompileFlags {
  bigInt?: boolean
  dump?: boolean
  shortCode?: boolean
  debug?: boolean
  strictMode?: boolean
}

export class TypeScriptCompiler {
  private config: CompilerFlags
  
  constructor(options: CompileFlags = {}) {
    this.config = {
      bigInt: options.bigInt ?? false,
      dump: options.dump ?? false,
      shortCode: options.shortCode ?? true, // Default to true for optimization
      debug: options.debug ?? false,
      strictMode: options.strictMode ?? true
    }
  }
  
  // Compile TypeScript source code to QuickJS bytecode
  compile(sourceCode: string, fileName?: string): Uint8Array {
    const compiler = new TypeScriptCompilerCore(this.config)
    return compiler.compile(sourceCode, fileName)
  }
  
  // Compile from file
  async compileFile(filePath: string): Promise<Uint8Array> {
    const fs = await import('fs/promises')
    const sourceCode = await fs.readFile(filePath, 'utf-8')
    return this.compile(sourceCode, filePath)
  }
  
  // Get compiler configuration
  getConfig(): CompilerFlags {
    return { ...this.config }
  }
  
  // Update compiler configuration
  updateConfig(options: Partial<CompileFlags>): void {
    Object.assign(this.config, options)
  }
}

// Export all modules
export * from './opcodes'
export * from './atoms'
export * from './bytecode'
export * from './compiler'
export * from './config'
export * from './opcodeGenerator'

// Default export
export default TypeScriptCompiler