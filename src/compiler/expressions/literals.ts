import * as ts from 'typescript'
import type { Compiler } from '../../compiler'
import { BytecodeTag, Opcode, env } from '../../env'
import { getPushIntOpcode } from '../../utils/opcodeVariants'

function emitStringLiteral(compiler: Compiler, value: string, node: ts.Node) {
  const atom = compiler.getAtomId(value)
  compiler.emitInstruction(Opcode.OP_push_atom_value, [atom], node)
}

export function compileNumericLiteral(compiler: Compiler, node: ts.NumericLiteral) {
  const value = Number(node.text)
  if (Number.isInteger(value) && Number.isFinite(value)) {
    const shortOpcode = getPushIntOpcode(value)
    if (shortOpcode !== undefined) {
      compiler.emitInstruction(shortOpcode, [], null)
      return
    }
    if (value >= -0x80 && value <= 0x7f) {
      compiler.emitInstruction(Opcode.OP_push_i8, [value], null)
      return
    }
    if (value >= -0x8000 && value <= 0x7fff) {
      compiler.emitInstruction(Opcode.OP_push_i16, [value], null)
      return
    }
    if (value >= -0x80000000 && value <= 0x7fffffff) {
      compiler.emitInstruction(Opcode.OP_push_i32, [value], null)
      return
    }
  }

  compiler.emitPushConstant({
    tag: BytecodeTag.TC_TAG_FLOAT64,
    value,
  }, { node })
}

export function compileBooleanLiteral(compiler: Compiler, expression: ts.Expression) {
  const opcode = expression.kind === ts.SyntaxKind.TrueKeyword ? Opcode.OP_push_true : Opcode.OP_push_false
  compiler.emitInstruction(opcode, [], expression)
}

export function compileStringLiteral(compiler: Compiler, expression: ts.StringLiteral) {
  emitStringLiteral(compiler, expression.text, expression)
}

export function compileNoSubstitutionTemplateLiteral(
  compiler: Compiler,
  expression: ts.NoSubstitutionTemplateLiteral
) {
  emitStringLiteral(compiler, expression.text, expression)
}

export function compileNullLiteral(compiler: Compiler, expression: ts.Expression) {
  compiler.emitInstruction(Opcode.OP_null, [], expression)
}

export function compileThisExpression(compiler: Compiler, expression: ts.Expression) {
  compiler.emitInstruction(Opcode.OP_push_this, [], expression)
}

export function compileTemplateExpression(compiler: Compiler, expression: ts.TemplateExpression) {
  compiler.emitInstruction(Opcode.OP_push_empty_string, [], expression)

  const headText = expression.head.text
  if (headText.length > 0) {
    emitStringLiteral(compiler, headText, expression.head)
    compiler.emitInstruction(Opcode.OP_add, [], expression.head)
  }

  for (const span of expression.templateSpans) {
    compiler.compileExpression(span.expression)
    compiler.emitInstruction(Opcode.OP_add, [], span.expression)

    const literalText = span.literal.text
    if (literalText.length > 0) {
      emitStringLiteral(compiler, literalText, span.literal)
      compiler.emitInstruction(Opcode.OP_add, [], span.literal)
    }
  }
}
