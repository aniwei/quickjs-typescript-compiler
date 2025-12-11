import { CompilerContext } from './CompilerContext'
import { FunctionDef, JSVarDef, JSVarKind } from './FunctionDef'
import { Opcode, BytecodeTag, OPCODE_DEFS, JSAtom } from '../env'
import { BytecodeBuilder } from './BytecodeBuilder'
import { Label, RecordedJump } from './Compiler'
export class VariableResolver {
  constructor(private context: CompilerContext) {}

  private get compiler() {
    return this.context.compiler
  }

  resolve(fd: FunctionDef): void {
   
  }

  private resolveScopeVar(
    fd: FunctionDef,
    varName: number,
    scopeLevel: number,
    op: number,
    bcOut: BytecodeBuilder,
    label: number = 0
  ): void {
    
  }
}
