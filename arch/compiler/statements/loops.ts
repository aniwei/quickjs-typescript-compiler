import * as ts from 'typescript'
import type { Compiler } from '../../compiler'
import { Opcode } from '../../env'
import { ScopeKind } from '../../scopes'
import type { StatementVisitor, StatementVisitorRegistrar } from '../visitors/statementVisitors'
import { compileBlockStatement } from './simple/index'

export function compileForOfStatement(
  compiler: Compiler,
  node: ts.ForOfStatement,
  options: { labelName?: string } = {}
) {
  if (node.awaitModifier) {
    throw new Error('for await is not supported yet')
  }

  compiler.pushScope(ScopeKind.Block)

  if (!ts.isVariableDeclarationList(node.initializer)) {
    throw new Error('for-of initializer must be a variable declaration')
  }
  if (node.initializer.declarations.length !== 1) {
    throw new Error('Only single variable declarations are supported in for-of')
  }

  const declaration = node.initializer.declarations[0]
  if (!ts.isIdentifier(declaration.name)) {
    throw new Error('Destructuring in for-of is not supported yet')
  }
  if (declaration.initializer) {
    throw new Error('for-of loop variable cannot have an initializer')
  }

  const nameText = declaration.name.text
  const atom = compiler.getAtomId(nameText)
  if (compiler.hasBindingInCurrentScope(atom)) {
    throw new Error(`Identifier '${nameText}' has already been declared in this scope`)
  }

  const flags = node.initializer.flags
  const isConst = (flags & ts.NodeFlags.Const) !== 0
  const isLet = (flags & ts.NodeFlags.Let) !== 0

  const varIndex = compiler.declareLexicalVariable(atom, { isConst, isLet, capture: false })
  const loopVarSlot = compiler.getLocalVarSlot(atom)
  if (loopVarSlot === undefined) {
    throw new Error('Failed to allocate loop variable slot')
  }
  const variable = compiler.getFunctionVar(varIndex)
  compiler.emitSetLocalUninitialized(loopVarSlot, variable.scopeLevel)

  compiler.compileExpression(node.expression)
  compiler.withoutDebugRecording(() => {
    compiler.emitInstruction(Opcode.OP_for_of_start)
  })

  const bodyLabel = compiler.createLabel()
  const continueLabel = compiler.createLabel()
  const exitLabel = compiler.createLabel()

  compiler.registerLoopCleanup(exitLabel, { kind: 'for-of' })
  compiler.pushLoopTarget(exitLabel, continueLabel, { labelName: options.labelName })
  try {
    compiler.emitGoto(continueLabel)

    compiler.markLabel(bodyLabel)
    compiler.withoutDebugRecording(() => {
      compiler.emitStoreToLocal(loopVarSlot)
    })

    if (ts.isBlock(node.statement)) {
      compileBlockStatement(compiler, node.statement, { createScope: false })
    } else {
      compiler.compileStatement(node.statement)
    }

    compiler.markLabel(continueLabel)
    compiler.withoutDebugRecording(() => {
      compiler.emitInstruction(Opcode.OP_for_of_next, [0])
    })
    compiler.emitJump(Opcode.OP_if_false8, bodyLabel)
    compiler.withoutDebugRecording(() => {
      compiler.emitInstruction(Opcode.OP_drop)
    })
  } finally {
    compiler.popScope()
    compiler.popLoopTarget()
  }

  compiler.markLabel(exitLabel)
  compiler.withoutDebugRecording(() => {
    compiler.emitInstruction(Opcode.OP_iterator_close)
  })
  compiler.clearLoopCleanup(exitLabel)
}

export function compileForInStatement(
  compiler: Compiler,
  node: ts.ForInStatement,
  options: { labelName?: string } = {}
) {
  compiler.pushScope(ScopeKind.Block)

  const initializer = node.initializer
  if (!initializer) {
    throw new Error('for-in statement must have an initializer')
  }

  let storeValue: () => void

  if (ts.isVariableDeclarationList(initializer)) {
    if (initializer.declarations.length !== 1) {
      throw new Error('Only single variable declarations are supported in for-in')
    }

    const declaration = initializer.declarations[0]
    if (!ts.isIdentifier(declaration.name)) {
      throw new Error('Destructuring in for-in is not supported yet')
    }
    if (declaration.initializer) {
      throw new Error('for-in loop variable cannot have an initializer')
    }

    const nameText = declaration.name.text
    const atom = compiler.getAtomId(nameText)
    const flags = initializer.flags
    const isConst = (flags & ts.NodeFlags.Const) !== 0
    const isLet = (flags & ts.NodeFlags.Let) !== 0

    if ((isConst || isLet) && compiler.hasBindingInCurrentScope(atom)) {
      throw new Error(`Identifier '${nameText}' has already been declared in this scope`)
    }

    const varIndex = compiler.declareLexicalVariable(atom, { isConst, isLet, capture: false })
    const variable = compiler.getFunctionVar(varIndex)
    const loopVarSlot = compiler.getLocalVarSlot(atom)
    if (loopVarSlot === undefined) {
      throw new Error('Failed to allocate loop variable slot')
    }
    compiler.emitSetLocalUninitialized(loopVarSlot, variable.scopeLevel)

    storeValue = () => {
      compiler.withoutDebugRecording(() => {
        compiler.emitStoreToLocal(loopVarSlot)
      })
    }
  } else {
    if (!ts.isIdentifier(initializer)) {
      throw new Error('Only identifier expressions are supported in for-in initializer')
    }
    const identifier = initializer
    const atom = compiler.getAtomId(identifier.text)
    storeValue = () => {
      compiler.emitStoreIdentifier(atom, identifier)
    }
  }

  compiler.compileExpression(node.expression)
  compiler.withoutDebugRecording(() => {
    compiler.emitInstruction(Opcode.OP_for_in_start)
  })

  const bodyLabel = compiler.createLabel()
  const continueLabel = compiler.createLabel()
  const exitLabel = compiler.createLabel()

  compiler.registerLoopCleanup(exitLabel, { kind: 'for-in' })
  compiler.pushLoopTarget(exitLabel, continueLabel, { labelName: options.labelName })
  try {
    compiler.emitGoto(continueLabel)

    compiler.markLabel(bodyLabel)
    storeValue()

    if (ts.isBlock(node.statement)) {
      compileBlockStatement(compiler, node.statement, { createScope: false })
    } else {
      compiler.compileStatement(node.statement)
    }

    compiler.markLabel(continueLabel)
    compiler.withoutDebugRecording(() => {
      compiler.emitInstruction(Opcode.OP_for_in_next)
    })
    compiler.emitJump(Opcode.OP_if_false8, bodyLabel)
    compiler.withoutDebugRecording(() => {
      compiler.emitInstruction(Opcode.OP_drop)
    })
  } finally {
    compiler.popScope()
    compiler.popLoopTarget()
  }

  compiler.markLabel(exitLabel)
  compiler.withoutDebugRecording(() => {
    compiler.emitInstruction(Opcode.OP_drop)
  })
  compiler.clearLoopCleanup(exitLabel)
}

export function compileWhileStatement(
  compiler: Compiler,
  node: ts.WhileStatement,
  options: { labelName?: string } = {}
) {
  const conditionLabel = compiler.createLabel()
  const exitLabel = compiler.createLabel()

  compiler.pushLoopTarget(exitLabel, conditionLabel, { labelName: options.labelName })
  try {
    compiler.markLabel(conditionLabel)
    compiler.compileExpression(node.expression)
    compiler.emitJump(Opcode.OP_if_false8, exitLabel)

    if (ts.isBlock(node.statement)) {
      compileBlockStatement(compiler, node.statement)
    } else {
      compiler.compileStatement(node.statement)
    }

    compiler.emitGoto(conditionLabel)
  } finally {
    compiler.popLoopTarget()
  }

  compiler.markLabel(exitLabel)
}

export function compileDoWhileStatement(
  compiler: Compiler,
  node: ts.DoStatement,
  options: { labelName?: string } = {}
) {
  const bodyLabel = compiler.createLabel()
  const conditionLabel = compiler.createLabel()
  const exitLabel = compiler.createLabel()

  compiler.pushLoopTarget(exitLabel, conditionLabel, { labelName: options.labelName })
  try {
    compiler.markLabel(bodyLabel)

    if (ts.isBlock(node.statement)) {
      compileBlockStatement(compiler, node.statement)
    } else {
      compiler.compileStatement(node.statement)
    }

    compiler.markLabel(conditionLabel)
    compiler.compileExpression(node.expression)
    compiler.emitJump(Opcode.OP_if_true8, bodyLabel)
  } finally {
    compiler.popLoopTarget()
  }

  compiler.markLabel(exitLabel)
}

export function compileForStatement(
  compiler: Compiler,
  node: ts.ForStatement,
  options: { labelName?: string } = {}
) {
  compiler.pushScope(ScopeKind.Block)
  try {
    if (node.initializer) {
      if (ts.isVariableDeclarationList(node.initializer)) {
        compileForVariableDeclarationList(compiler, node.initializer)
      } else {
        compiler.compileExpression(node.initializer)
        compiler.emitInstruction(Opcode.OP_drop)
      }
    }

    const loopStartLabel = compiler.createLabel()
    const continueLabel = compiler.createLabel()
    const exitLabel = compiler.createLabel()

    compiler.pushLoopTarget(exitLabel, continueLabel, { labelName: options.labelName })
    try {
      compiler.markLabel(loopStartLabel)

      if (node.condition) {
        compiler.compileExpression(node.condition)
        compiler.emitJump(Opcode.OP_if_false8, exitLabel)
      }

      if (ts.isBlock(node.statement)) {
  compileBlockStatement(compiler, node.statement, { createScope: false })
      } else {
        compiler.compileStatement(node.statement)
      }

      compiler.markLabel(continueLabel)
      if (node.incrementor) {
        compiler.compileExpression(node.incrementor)
        compiler.emitInstruction(Opcode.OP_drop)
      }
      compiler.emitGoto(loopStartLabel)
    } finally {
      compiler.popLoopTarget()
    }

    compiler.markLabel(exitLabel)
  } finally {
    compiler.popScope()
  }
}

const loopStatementVisitors = new Map<ts.SyntaxKind, StatementVisitor>([
  [ts.SyntaxKind.ForOfStatement, (compiler, node) => compileForOfStatement(compiler, node as ts.ForOfStatement)],
  [ts.SyntaxKind.ForInStatement, (compiler, node) => compileForInStatement(compiler, node as ts.ForInStatement)],
  [ts.SyntaxKind.WhileStatement, (compiler, node) => compileWhileStatement(compiler, node as ts.WhileStatement)],
  [ts.SyntaxKind.DoStatement, (compiler, node) => compileDoWhileStatement(compiler, node as ts.DoStatement)],
  [ts.SyntaxKind.ForStatement, (compiler, node) => compileForStatement(compiler, node as ts.ForStatement)],
])

export function registerLoopStatements(register: StatementVisitorRegistrar) {
  for (const [kind, visitor] of loopStatementVisitors) {
    register(kind, visitor)
  }
}

function compileForVariableDeclarationList(compiler: Compiler, list: ts.VariableDeclarationList) {
  const flags = list.flags
  const isConst = (flags & ts.NodeFlags.Const) !== 0
  const isLet = (flags & ts.NodeFlags.Let) !== 0
  const isModuleTopLevel = compiler.isModuleTopLevelScope()

  for (const declaration of list.declarations) {
    compiler.withSourceNode(declaration, () => {
      if (!ts.isIdentifier(declaration.name)) {
        throw new Error('Destructuring is not supported yet')
      }

      const nameText = declaration.name.text
      const atom = compiler.getAtomId(nameText)

      if ((isConst || isLet) && compiler.hasBindingInCurrentScope(atom)) {
        throw new Error(`Identifier '${nameText}' has already been declared in this scope`)
      }

      if (isConst && !declaration.initializer) {
        throw new Error(`Missing initializer in const declaration for '${nameText}'`)
      }

      const capture = isModuleTopLevel
      const varIndex = compiler.declareLexicalVariable(atom, { isConst, isLet, capture })
      const variable = compiler.getFunctionVar(varIndex)
      if (compiler.isGlobalVarContext() && isModuleTopLevel) {
        const forceInit = variable.isLexical && !declaration.initializer
        compiler.registerGlobalVar(atom, {
          scopeLevel: variable.scopeLevel,
          isLexical: variable.isLexical,
          isConst: variable.isConst,
          forceInit,
        })
      }

      if (declaration.initializer) {
        compiler.compileExpression(declaration.initializer)
        compiler.emitStoreToLexical(atom)
      } else if (isConst || isLet) {
        compiler.emitInstruction(Opcode.OP_undefined)
        compiler.emitStoreToLexical(atom)
      }
    })
  }
}
