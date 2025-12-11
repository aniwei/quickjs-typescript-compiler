import ts from 'typescript'
import { CompilerContext } from '../CompilerContext'
import { Opcode, JSAtom } from '../../env'

export class IdentifierVisitor {
  private context: CompilerContext

  constructor(context: CompilerContext) {
    this.context = context
  }

  private get compiler() {
    return this.context.compiler
  }

  private get funcDef() {
    return this.context.funcDef
  }

  private get scopeManager() {
    return this.context.scopeManager
  }

  visitIdentifier(node: ts.Identifier) {
    if (!this.funcDef) {
      return
    }
    const name = node.text
    const atom = this.compiler.addAtom(name)
    const scopeLevel = this.scopeManager.currentScopeLevel

    // Emit OP_scope_get_var for all identifiers
    // VariableResolver will handle resolution (local, closure, global)
    this.compiler.emitOp(this.funcDef, Opcode.OP_scope_get_var, node.getStart())
    this.compiler.emitU32(this.funcDef, atom)
    this.compiler.emitU16(this.funcDef, scopeLevel)
  }
}
