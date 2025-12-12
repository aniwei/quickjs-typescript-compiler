import { CompilerContext } from '../CompilerContext'
import { FunctionDef } from '../FunctionDef'
import { Compiler } from '../Compiler'
import { ScopeManager } from '../ScopeManager'
import { LabelManager } from '../LabelManager'

export abstract class VisitorContext {
  protected context: CompilerContext

  protected get compiler(): Compiler {
    return this.context.compiler
  }

  protected get funcDef(): FunctionDef | null {
    return this.context.funcDef
  }

  protected get scopeManager(): ScopeManager {
    return this.context.scopeManager
  }

  protected get labelManager(): LabelManager {
    return this.context.labelManager
  }

  
  constructor(context: CompilerContext) {
    this.context = context
  }
}