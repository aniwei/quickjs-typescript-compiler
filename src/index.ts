import { getTypeScriptCompilerOptions } from './utils';
import { ScopeManager } from './scopeManager';
import { AtomTable } from './atoms';
import { Opcode } from './opcodes';

import { Compiler } from './compiler';
import { FunctionDef } from './functionDef';
import { serialize } from './serializer';
import { CompileFlags } from './types';

export { Compiler } from './compiler';
export { FunctionDef } from './functionDef';
export * from './opcodes';
export { serialize } from './serializer';
export * from './types';

export class TypeScriptCompiler {
  private compiler!: Compiler;
  private flags: CompileFlags;

  constructor(flags: CompileFlags = {}) {
    this.flags = flags;
  }

  async compileFile(fileName: string): Promise<Uint8Array> {
    this.compiler = new Compiler([fileName]);
    const funcDef = this.compiler.compile(fileName);
    if (!funcDef) {
      throw new Error(`Failed to compile ${fileName}`);
    }
    return serialize(funcDef, this.flags);
  }
}

