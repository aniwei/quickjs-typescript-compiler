import ts from 'typescript'
import { CompilerContext } from '../CompilerContext'
import { Opcode } from '../../env'
import { FunctionDef } from '../FunctionDef'

export class ThisVisitor {
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

  visitThisKeyword(node: ts.ThisExpression) {
    if (!this.funcDef) {
      return
    }
    
    const scopeInfo = this.scopeManager.findVar('this', this.funcDef as FunctionDef)
    if (scopeInfo) {
      const idx = scopeInfo.idx
      if (scopeInfo.type === 'closure') {
        // Should not happen for 'this' usually?
        // But if captured, maybe?
        // For now assume local
      } else {
        // Local
        if (idx === 0) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc0, -1)
        } else if (idx === 1) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc1, -1)
        } else {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc, -1)
          this.compiler.emitU16(this.funcDef, idx)
        }
      }
    } else {
      this.compiler.emitOp(this.funcDef, Opcode.OP_push_this)
    }
  }
}
