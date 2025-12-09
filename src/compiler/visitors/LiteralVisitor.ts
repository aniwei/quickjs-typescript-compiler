import ts from 'typescript'
import { CompilerContext } from '../CompilerContext'
import { Opcode, JSAtom } from '../../env'
import { FunctionDef } from '../FunctionDef'

export class LiteralVisitor {
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

  visitNullKeyword(node: ts.Node) {
    if (!this.funcDef) {
      return
    }
    this.compiler.emitOp(this.funcDef, Opcode.OP_null)
  }

  visitTrueKeyword(node: ts.Node) {
    if (!this.funcDef) {
      return
    }
    this.compiler.emitOp(this.funcDef, Opcode.OP_push_true)
  }

  visitFalseKeyword(node: ts.Node) {
    if (!this.funcDef) {
      return
    }
    this.compiler.emitOp(this.funcDef, Opcode.OP_push_false)
  }

  visitNumericLiteral(node: ts.NumericLiteral) {
    if (!this.funcDef) {
      return
    }
    const val = Number(node.text)
    if (Number.isInteger(val)) {
      if (val === 0) { 
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_0) 
        return
      }
      if (val === 1) { 
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_1) 
        return
      }
      if (val === 2) { 
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_2) 
        return
      }
      if (val === 3) { 
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_3) 
        return
      }
      if (val === 4) { 
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_4) 
        return
      }
      if (val === 5) { 
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_5) 
        return
      }
      if (val === 6) { 
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_6) 
        return
      }
      if (val === 7) { 
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_7) 
        return
      }

      if (val >= -128 && val <= 127) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_i8)
        this.compiler.emitU8(this.funcDef, val)
        return
      }
        // TODO: Handle i32
    }
    
    // Float or large int -> push_const8 (if index < 256)
    const idx = this.compiler.addConst(this.funcDef, val)
    this.compiler.emitOp(this.funcDef, Opcode.OP_push_const8)
    this.compiler.emitU8(this.funcDef, idx)
  }

  visitStringLiteral(node: ts.StringLiteral) {
    if (!this.funcDef) {
      return
    }
    if (node.text === '') {
      this.compiler.emitOp(this.funcDef, Opcode.OP_push_empty_string)
      return
    }
    const atom = this.compiler.addAtom(node.text)
    this.compiler.emitAtomOp(this.funcDef, Opcode.OP_push_atom_value, atom)
  }
}
