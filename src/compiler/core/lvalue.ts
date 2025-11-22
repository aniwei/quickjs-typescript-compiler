import * as ts from 'typescript'
import type { Compiler } from '../../compiler'
import { Opcode } from '../../env'

export interface LValue {
  /**
   * Consumes context (if any), pushes value.
   */
  load(): void

  /**
   * Consumes context (if any) and value (from stack top).
   * Pushes result (value) back to stack.
   * Stack before: [context], value
   * Stack after: value
   */
  store(): void

  /**
   * For compound assignment (+=, etc).
   * Keeps context on stack, pushes value.
   * Stack before: [context]
   * Stack after: [context], value
   */
  loadForCompound(): void
}

export class LValueBuilder {
  constructor(private compiler: Compiler) {}

  prepare(node: ts.Expression): LValue {
    if (ts.isIdentifier(node)) {
      return new IdentifierLValue(this.compiler, node)
    }
    if (ts.isPropertyAccessExpression(node)) {
      this.compiler.compileExpression(node.expression)
      return new PropertyAccessLValue(this.compiler, node)
    }
    if (ts.isElementAccessExpression(node)) {
      this.compiler.compileExpression(node.expression)
      this.compiler.compileExpression(node.argumentExpression)
      return new ElementAccessLValue(this.compiler, node)
    }
    throw new Error(`Unsupported LValue kind: ${ts.SyntaxKind[node.kind]}`)
  }
}

class IdentifierLValue implements LValue {
  constructor(private compiler: Compiler, private node: ts.Identifier) {}

  load() {
    this.compiler.emitLoadIdentifier(this.node)
  }

  store() {
    // Stack: value
    this.compiler.emitInstruction(Opcode.OP_dup)
    const atom = this.compiler.getAtomId(this.node.text)
    this.compiler.emitStoreIdentifier(atom, this.node)
  }

  loadForCompound() {
    this.load()
  }
}

class PropertyAccessLValue implements LValue {
  constructor(private compiler: Compiler, private node: ts.PropertyAccessExpression) {}

  load() {
    // Stack: obj
    const atom = this.compiler.getAtomId(this.node.name.text)
    this.compiler.emitInstruction(Opcode.OP_get_field, [atom], this.node)
  }

  store() {
    // Stack: obj, value
    this.compiler.emitInstruction(Opcode.OP_dup) // obj, value, value
    this.compiler.emitInstruction(Opcode.OP_rot3r) // value, obj, value
    const atom = this.compiler.getAtomId(this.node.name.text)
    this.compiler.emitInstruction(Opcode.OP_put_field, [atom], this.node) // value
  }

  loadForCompound() {
    // Stack: obj
    this.compiler.emitInstruction(Opcode.OP_dup) // obj, obj
    const atom = this.compiler.getAtomId(this.node.name.text)
    this.compiler.emitInstruction(Opcode.OP_get_field, [atom], this.node) // obj, value
  }
}

class ElementAccessLValue implements LValue {
  constructor(private compiler: Compiler, private node: ts.ElementAccessExpression) {}

  load() {
    // Stack: obj, prop
    this.compiler.emitInstruction(Opcode.OP_get_array_el, [], this.node)
  }

  store() {
    // Stack: obj, prop, value
    this.compiler.emitInstruction(Opcode.OP_dup) // obj, prop, value, value
    
    // We need to move the top value to the bottom of the 4-element stack:
    // Stack: obj, prop, value, value (top)
    // Target: value, obj, prop, value
    // OP_insert4: a b c d -> d a b c
    this.compiler.emitInstruction(Opcode.OP_insert4)
    
    this.compiler.emitInstruction(Opcode.OP_put_array_el, [], this.node)
  }

  loadForCompound() {
    // Stack: obj, prop
    this.compiler.emitInstruction(Opcode.OP_dup2) // obj, prop, obj, prop
    this.compiler.emitInstruction(Opcode.OP_get_array_el, [], this.node) // obj, prop, value
  }
}
