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
    
    if (name === 'undefined') {
      this.compiler.emitAtomOp(this.funcDef, Opcode.OP_get_var, JSAtom.JS_ATOM_undefined, node.getStart())
      return
    }

    const scopeInfo = this.scopeManager.findVar(name, this.funcDef!)
    if (scopeInfo) {
      if (scopeInfo.type === 'closure') {
        const idx = scopeInfo.idx
        if (scopeInfo.isLexical) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref_check, node.getStart())
          this.compiler.emitU16(this.funcDef, idx)
        } else {
          if (idx === 0) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref0, node.getStart())
          } else if (idx === 1) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref1, node.getStart())
          } else if (idx === 2) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref2, node.getStart())
          } else if (idx === 3) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref3, node.getStart())
          } else {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref, node.getStart())
            this.compiler.emitU16(this.funcDef, idx)
          }
        }
      } else {
        // Local
        const varIdx = scopeInfo.idx
        let idx = varIdx
        
        // Check if captured (e.g. module export)
        const foundClosure = this.funcDef.closureVar.findIndex(cv => cv.isLocal && cv.varIdx === varIdx)
        
        if (foundClosure !== -1) {
           const closureIdx = foundClosure
           if (scopeInfo.isLexical) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref_check, node.getStart())
              this.compiler.emitU16(this.funcDef, closureIdx)
           } else {
              if (closureIdx === 0) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref0, node.getStart())
              } else if (closureIdx === 1) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref1, node.getStart())
              } else if (closureIdx === 2) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref2, node.getStart())
              } else if (closureIdx === 3) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref3, node.getStart())
              } else {
                this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref, node.getStart())
                this.compiler.emitU16(this.funcDef, closureIdx)
              }
           }
           return
        }
        
        if (!scopeInfo.isArg) {
          idx = this.funcDef.vars[varIdx].localIdx
          if (idx === -1) {
            throw new Error(`Variable ${name} is captured but accessed as local`)
          }
        }

        if (scopeInfo.isArg) {
          if (idx === 0) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg0, node.getStart())
          } else if (idx === 1) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg1, node.getStart())
          } else if (idx === 2) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg2, node.getStart())
          } else if (idx === 3) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg3, node.getStart())
          } else {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg, node.getStart())
            this.compiler.emitU16(this.funcDef, idx)
          }
        } else if (scopeInfo.isLexical && !scopeInfo.isCatchVar) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc_check, node.getStart())
          this.compiler.emitU16(this.funcDef, idx)
        } else {
          if (idx === 0) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc0, node.getStart())
          } else if (idx === 1) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc1, node.getStart())
          } else if (idx === 2) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc2, node.getStart())
          } else if (idx === 3) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc3, node.getStart())
          } else {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc, node.getStart())
            this.compiler.emitU16(this.funcDef, idx)
          }
        }
      }

      return
    }    
    
    const res = this.compiler.findVar(this.funcDef, name)
    
    if (res) {
      if (res.isArg) {
        if (res.idx === 0) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg0, node.getStart())
        } else if (res.idx === 1) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg1, node.getStart())
        } else if (res.idx === 2) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg2, node.getStart())
        } else if (res.idx === 3) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg3, node.getStart())
        } else {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg, node.getStart())
          this.compiler.emitU16(this.funcDef, res.idx)
        }
      } else {
        // Emit get_var
        // ...
      }
    } else {
      // Global variable
      const atom = this.compiler.addAtom(name)
      this.compiler.emitAtomOp(this.funcDef, Opcode.OP_get_var, atom, node.getStart())
    }
  }
}
