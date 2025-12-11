import { CompilerContext } from '../CompilerContext'

export abstract class VisitorContext {
  private context: CompilerContext

  private get compiler() {
    return this.context.compiler
  }

  private get funcDef() {
    return this.context.funcDef
  }

  private get scopeManager() {
    return this.context.scopeManager
  }

  private get labelManager() {
    return this.context.labelManager
  }

  
  constructor(context: CompilerContext) {
    this.context = context
  }
}