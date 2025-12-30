import { CompilerContext } from '../CompilerContext'
import { FunctionDef } from '../FunctionDef'
import { Compiler } from '../Compiler'

export abstract class VisitorContext {
  protected context: CompilerContext

  protected get compiler(): Compiler {
    return this.context.compiler
  }

  protected get funcDef(): FunctionDef | null {
    return this.context.funcDef
  }

  
  constructor(context: CompilerContext) {
    this.context = context
  }
}