import * as ts from 'typescript'
import type { Compiler } from '../../compiler'
import { Opcode, env } from '../../env'

const TAIL_CALL_DEBUG = process.env.DEBUG_TS_CLOSURE === '1'

type EmitDebugInfoOptions = Parameters<Compiler['emitInstruction']>[3]

type DebuggableNode = ts.Node | undefined

export interface CallExpressionCompileOptions {
  tailPosition?: boolean
}

export function compileCallExpression(
  compiler: Compiler,
  expression: ts.CallExpression,
  options: CallExpressionCompileOptions = {}
): boolean {
  const callDebugPos = compiler.getCallExpressionOpenParenPos(expression)
  const callDebug: EmitDebugInfoOptions | undefined = callDebugPos !== undefined
    ? { tsSourcePos: callDebugPos }
    : undefined

  const callee = expression.expression
  const isTailPosition = options.tailPosition === true

  if (ts.isPropertyAccessExpression(callee)) {
    compiler.withSourceNode(callee.expression, () => {
      compiler.compileExpression(callee.expression)
    })

    const propertyAtom = compiler.getAtomId(callee.name.text)
    const propertyOperatorPos = compiler.getPropertyAccessOperatorPos(callee)
    const propertyAccessDebug: EmitDebugInfoOptions | undefined = propertyOperatorPos !== undefined
      ? { tsSourcePos: propertyOperatorPos }
      : undefined
    compiler.emitInstruction(Opcode.OP_get_field2, [propertyAtom], callee.name, propertyAccessDebug)

    for (const arg of expression.arguments) {
      compiler.withSourceNode(arg, () => compiler.compileExpression(arg))
    }

    if (isTailPosition) {
      emitTailCallInstruction(compiler, expression.arguments.length, expression, callDebug, { method: true })
      return true
    }

    compiler.emitInstruction(Opcode.OP_call_method, [expression.arguments.length], expression, callDebug)
    return false
  }

  if (callee.kind === ts.SyntaxKind.SuperKeyword) {
    compiler.emitDerivedConstructorSuperCall(expression.arguments, expression, callDebug)
    return false
  }

  compiler.withSourceNode(callee, () => {
    compiler.compileExpression(callee)
  })

  for (const arg of expression.arguments) {
    compiler.withSourceNode(arg, () => compiler.compileExpression(arg))
  }

  if (isTailPosition) {
    emitTailCallInstruction(compiler, expression.arguments.length, expression, callDebug, { method: false })
    return true
  }

  emitCallInstruction(compiler, expression.arguments.length, expression, callDebug)
  return false
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

function emitTailCallInstruction(
  compiler: Compiler,
  argCount: number,
  node: DebuggableNode,
  debugOptions: EmitDebugInfoOptions | undefined,
  options: { method: boolean }
) {
  if (argCount < 0) {
    throw new Error('Tail call argument count cannot be negative')
  }
  const opcode = options.method ? Opcode.OP_tail_call_method : Opcode.OP_tail_call
  compiler.emitInstruction(opcode, [argCount], node, debugOptions)
}
