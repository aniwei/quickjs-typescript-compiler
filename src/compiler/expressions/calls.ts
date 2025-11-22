import * as ts from 'typescript'
import type { Compiler } from '../../compiler'
import { Opcode, env } from '../../env'

type EmitDebugInfoOptions = Parameters<Compiler['emitInstruction']>[3]

type DebuggableNode = ts.Node | undefined

export function compileCallExpression(
  compiler: Compiler,
  expression: ts.CallExpression,
  optionalChainEndLabel?: string
) {
  const callDebugPos = compiler.getCallExpressionOpenParenPos(expression)
  const callDebug: EmitDebugInfoOptions | undefined = callDebugPos !== undefined
    ? { tsSourcePos: callDebugPos }
    : undefined

  const callee = expression.expression

  if (ts.isPropertyAccessExpression(callee)) {
    compiler.withSourceNode(callee.expression, () => {
      compiler.compileExpression(callee.expression, optionalChainEndLabel)
    })

    if (callee.questionDotToken && optionalChainEndLabel) {
      compiler.emitInstruction(Opcode.OP_dup)
      compiler.emitInstruction(Opcode.OP_is_undefined_or_null)
      const continueLabel = compiler.createLabel()
      compiler.emitJump(Opcode.OP_if_false8, continueLabel)
      compiler.emitInstruction(Opcode.OP_drop)
      compiler.emitInstruction(Opcode.OP_undefined)
      compiler.emitJump(Opcode.OP_goto8, optionalChainEndLabel)
      compiler.markLabel(continueLabel)
    }

    const propertyAtom = compiler.getAtomId(callee.name.text)
    const propertyOperatorPos = compiler.getPropertyAccessOperatorPos(callee)
    const propertyAccessDebug: EmitDebugInfoOptions | undefined = propertyOperatorPos !== undefined
      ? { tsSourcePos: propertyOperatorPos }
      : undefined
    compiler.emitInstruction(Opcode.OP_get_field2, [propertyAtom], callee.name, propertyAccessDebug)

    if (expression.questionDotToken && optionalChainEndLabel) {
      // Stack: obj, method
      compiler.emitInstruction(Opcode.OP_dup)
      compiler.emitInstruction(Opcode.OP_is_undefined_or_null)
      const continueLabel = compiler.createLabel()
      compiler.emitJump(Opcode.OP_if_false8, continueLabel)
      compiler.emitInstruction(Opcode.OP_drop) // drop method
      compiler.emitInstruction(Opcode.OP_drop) // drop obj
      compiler.emitInstruction(Opcode.OP_undefined)
      compiler.emitJump(Opcode.OP_goto8, optionalChainEndLabel)
      compiler.markLabel(continueLabel)
    }

    for (const arg of expression.arguments) {
      compiler.withSourceNode(arg, () => compiler.compileExpression(arg))
    }

    compiler.emitInstruction(Opcode.OP_call_method, [expression.arguments.length], expression, callDebug)
    return
  }

  if (callee.kind === ts.SyntaxKind.SuperKeyword) {
    compiler.emitDerivedConstructorSuperCall(expression.arguments, expression, callDebug)
    return
  }

  compiler.withSourceNode(callee, () => {
    compiler.compileExpression(callee, optionalChainEndLabel)
  })

  if (expression.questionDotToken && optionalChainEndLabel) {
    compiler.emitInstruction(Opcode.OP_dup)
    compiler.emitInstruction(Opcode.OP_is_undefined_or_null)
    const continueLabel = compiler.createLabel()
    compiler.emitJump(Opcode.OP_if_false8, continueLabel)
    compiler.emitInstruction(Opcode.OP_drop)
    compiler.emitInstruction(Opcode.OP_undefined)
    compiler.emitJump(Opcode.OP_goto8, optionalChainEndLabel)
    compiler.markLabel(continueLabel)
  }

  for (const arg of expression.arguments) {
    compiler.withSourceNode(arg, () => compiler.compileExpression(arg))
  }

  emitCallInstruction(compiler, expression.arguments.length, expression, callDebug)
}

export function compileNewExpression(compiler: Compiler, expression: ts.NewExpression) {
  const callDebugPos = compiler.getNewExpressionOpenParenPos(expression)
  const callDebug: EmitDebugInfoOptions | undefined = callDebugPos !== undefined
    ? { tsSourcePos: callDebugPos }
    : undefined

  compiler.withSourceNode(expression.expression, () => {
    compiler.compileExpression(expression.expression)
  })

  compiler.emitInstruction(Opcode.OP_dup)

  const args = expression.arguments ?? []
  for (const arg of args) {
    compiler.withSourceNode(arg, () => compiler.compileExpression(arg))
  }

  emitConstructInstruction(compiler, args.length, expression, callDebug)
}

function emitCallInstruction(
  compiler: Compiler,
  argCount: number,
  node: DebuggableNode,
  debugOptions: EmitDebugInfoOptions | undefined,
) {
  if (argCount < 0) {
    throw new Error('Call argument count cannot be negative')
  }
  if (env.supportsShortOpcodes && argCount <= 3) {
    const opcode = (Opcode.OP_call0 + argCount) as Opcode
    compiler.emitInstruction(opcode, [], node, debugOptions)
    return
  }
  compiler.emitInstruction(Opcode.OP_call, [argCount], node, debugOptions)
}

function emitConstructInstruction(
  compiler: Compiler,
  argCount: number,
  node: DebuggableNode,
  debugOptions: EmitDebugInfoOptions | undefined,
) {
  if (argCount < 0) {
    throw new Error('Constructor argument count cannot be negative')
  }
  compiler.emitInstruction(Opcode.OP_call_constructor, [argCount], node, debugOptions)
}
