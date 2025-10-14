import * as ts from 'typescript'
import {
  CompilationMode,
  FunctionKind,
  LoweringContext,
  OperandRef,
} from './LoweringContext'
import { BasicFunctionIR } from './runtime/FunctionIRBuilder'
import { IRBytecodeEmitter } from './runtime/IRBytecodeEmitter'
import { ScopeManagerImpl } from './runtime/ScopeManagerImpl'
import { IRLabelManager } from './runtime/IRLabelManager'
import { TypeFactsTableImpl } from './runtime/TypeFactsTableImpl'

/**
 * Temporary-yet-structured lowering for function declarations.
 * We already materialise a dedicated child FunctionIR and register it with
 * the parent so subsequent stages (closure creation / Annex B) can reference
 * the nested function slot. Parameter bookkeeping now mirrors QuickJS by
 * creating explicit bindings in the child scope; body lowering stays stubbed
 * until the statement/expression pipeline matures.
 */
export class FunctionLowerer {
  constructor(private readonly ctx: LoweringContext) {}

  emitFunctionDeclaration(node: ts.FunctionDeclaration): OperandRef {
    const kind = this.getFunctionKind(node)
    const childIR = new BasicFunctionIR(kind, this.ctx.functionIR.scopeDepth + 1)
    const childEmitter = new IRBytecodeEmitter(childIR)
    const childLabels = new IRLabelManager(childEmitter)
    const childMode = this.deriveChildMode(node)
    const childScope = new ScopeManagerImpl({ rootNode: node, mode: childMode, rootFlavor: 'function' })
    const childFacts = new TypeFactsTableImpl()

    const childContext: LoweringContext = {
      bytecode: childEmitter,
      scope: childScope,
      labels: childLabels,
      facts: childFacts,
      functionIR: childIR,
      checker: this.ctx.checker,
      mode: childMode,
    }

    this.lowerParameters(node, childContext)
    this.emitStubBody(node, childContext)

    const nestedIndex = this.ctx.functionIR.addNestedFunction(childIR)
    const closureOperand: OperandRef = { kind: 'closure', id: nestedIndex }
    return this.ctx.bytecode.emitOpWithResult('OP_make_closure', [closureOperand], node)
  }

  private getFunctionKind(node: ts.FunctionDeclaration): FunctionKind {
    const isAsync = node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.AsyncKeyword) ?? false
    const isGenerator = !!node.asteriskToken

    if (isAsync && isGenerator) {
      return 'async-generator'
    }
    if (isAsync) {
      return 'async'
    }
    if (isGenerator) {
      return 'generator'
    }
    return 'normal'
  }

  private deriveChildMode(node: ts.FunctionDeclaration): CompilationMode {
    if (this.ctx.mode === 'strict') {
      return 'strict'
    }
    const body = node.body
    if (!body || !ts.isBlock(body)) {
      return this.ctx.mode
    }
    for (const statement of body.statements) {
      if (!ts.isExpressionStatement(statement)) {
        break
      }
      const expression = statement.expression
      if (!ts.isStringLiteral(expression)) {
        break
      }
      if (expression.text === 'use strict') {
        return 'strict'
      }
    }
    return 'non-strict'
  }

  private lowerParameters(node: ts.FunctionDeclaration, childCtx: LoweringContext): void {
    for (const parameter of node.parameters) {
      this.lowerParameter(parameter, childCtx)
    }
  }

  private lowerParameter(parameter: ts.ParameterDeclaration, childCtx: LoweringContext): void {
    if (!ts.isIdentifier(parameter.name)) {
      throw new Error('FunctionLowerer.lowerParameter: non-identifier parameters not implemented yet')
    }

    const binding = childCtx.scope.declare(parameter.name, 'param')
    childCtx.scope.markInitialized(binding)

    const isRest = !!parameter.dotDotDotToken
    const hasInitializer = !!parameter.initializer

    if (hasInitializer) {
      childCtx.bytecode.emitOp('OP_param_default_pending', [], parameter.initializer)
    }

    if (isRest) {
      childCtx.bytecode.emitOp('OP_param_rest_pending', [], parameter)
    }

    childCtx.functionIR.addParameter({
      name: parameter.name.text,
      slot: binding.slot,
      atom: binding.atom,
      isRest,
      hasInitializer,
      initializer: parameter.initializer,
      node: parameter,
    })
  }

  private emitStubBody(node: ts.FunctionDeclaration, childCtx: LoweringContext): void {
    const anchor: ts.Node = node.body && ts.isBlock(node.body) ? node.body : node
    childCtx.bytecode.emitOp('OP_function_body_pending', [], anchor)
    childCtx.bytecode.emitOp('OP_return_undef', [], anchor)
  }
}
