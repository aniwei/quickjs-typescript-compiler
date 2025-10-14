import * as ts from 'typescript';
import { ExceptionEmitter } from './ExceptionEmitter';
import { ExpressionLowerer } from './ExpressionLowerer';
import {
  AnnexBRebind,
  BindingInfo,
  BindingKind,
  LoweringContext,
  OperandRef,
  TypeFact,
} from './LoweringContext';
import { DestructuringLowerer } from './DestructuringLowerer';
import { FunctionLowerer } from './FunctionLowerer';
import { LValueBuilder } from './LValueBuilder';
import { LoopEmitter } from './LoopEmitter';

/** Aligns with QuickJS js_parse_statement_or_decl family. */
export class StatementLowerer {
  constructor(
    private readonly ctx: LoweringContext,
    private readonly expressions: ExpressionLowerer,
    private readonly destructuring: DestructuringLowerer,
    private readonly lvalue: LValueBuilder,
    private readonly loops: LoopEmitter,
    private readonly exceptions: ExceptionEmitter,
    functionLowerer?: FunctionLowerer,
  ) {
    this.functions = functionLowerer ?? new FunctionLowerer(ctx);
  }

  private readonly functions: FunctionLowerer;

  emitStatement(node: ts.Statement): void {
    this.ctx.bytecode.noteSource(node);
    switch (node.kind) {
      case ts.SyntaxKind.Block:
        this.emitBlock(node as ts.Block);
        break;
      case ts.SyntaxKind.VariableStatement:
        this.emitVariableStatement(node as ts.VariableStatement);
        break;
      case ts.SyntaxKind.FunctionDeclaration:
        this.emitFunctionDeclaration(node as ts.FunctionDeclaration);
        break;
      case ts.SyntaxKind.ExpressionStatement:
        this.emitExpressionStatement(node as ts.ExpressionStatement);
        break;
      case ts.SyntaxKind.IfStatement:
        this.emitIfStatement(node as ts.IfStatement);
        break;
      case ts.SyntaxKind.WhileStatement:
        this.loops.emitWhile(node as ts.WhileStatement);
        break;
      case ts.SyntaxKind.DoStatement:
        this.loops.emitDoWhile(node as ts.DoStatement);
        break;
      case ts.SyntaxKind.ForStatement:
        this.loops.emitFor(node as ts.ForStatement);
        break;
      case ts.SyntaxKind.ForInStatement:
      case ts.SyntaxKind.ForOfStatement:
        this.loops.emitForInOf(node as ts.ForInStatement | ts.ForOfStatement);
        break;
      case ts.SyntaxKind.ReturnStatement:
        this.emitReturn(node as ts.ReturnStatement);
        break;
      case ts.SyntaxKind.ThrowStatement:
        this.exceptions.emitThrowStatement(node as ts.ThrowStatement);
        break;
      case ts.SyntaxKind.TryStatement:
        this.exceptions.emitTryStatement(node as ts.TryStatement);
        break;
      case ts.SyntaxKind.SwitchStatement:
        this.emitSwitch(node as ts.SwitchStatement);
        break;
      case ts.SyntaxKind.BreakStatement:
      case ts.SyntaxKind.ContinueStatement:
        this.emitBranch(node as ts.BreakOrContinueStatement);
        break;
      case ts.SyntaxKind.EmptyStatement:
        break;
      default:
        throw new Error(
          `StatementLowerer.emitStatement: unsupported kind ${ts.SyntaxKind[node.kind]}`,
        );
    }
  }

  emitBlock(block: ts.Block): void {
    this.ctx.scope.enter(block);
    try {
      for (const statement of block.statements) {
        this.emitStatement(statement);
      }
    } finally {
      const rebinds = this.ctx.scope.leave(block);
      this.flushAnnexBRebinds(rebinds, block);
    }
  }

  emitVariableStatement(statement: ts.VariableStatement): void {
    const declarationList = statement.declarationList;
    const bindingKind = this.getBindingKind(declarationList);

    for (const declaration of declarationList.declarations) {
      this.emitDeclarationBinding(declaration, bindingKind);
    }
  }

  emitExpressionStatement(statement: ts.ExpressionStatement): void {
    const result = this.expressions.emitExpression(statement.expression);
    this.consumeResult(result);
  }

  emitIfStatement(statement: ts.IfStatement): void {
    this.ctx.scope.enter(statement);
    try {
      const condition = this.expressions.emitExpression(statement.expression);
      const falseLabel = this.ctx.labels.createLabel();
      const exitLabel = statement.elseStatement
        ? this.ctx.labels.createLabel()
        : falseLabel;

      const falseOperand = this.ctx.bytecode.labelOperand(falseLabel);
      this.ctx.bytecode.emitOp('OP_if_false', [condition, falseOperand], statement.expression);

      const positiveFact = this.expressions.deriveFacts(statement.expression);
      if (positiveFact) {
        this.ctx.facts.narrow(statement.thenStatement, positiveFact);
      }

      this.emitStatement(statement.thenStatement);

      if (positiveFact) {
        this.ctx.facts.clear(statement.thenStatement);
      }

      if (statement.elseStatement) {
        this.ctx.labels.emitJump('OP_goto', exitLabel, statement.elseStatement);
        this.ctx.labels.mark(falseLabel);
        if (positiveFact) {
          this.ctx.facts.narrow(
            statement.elseStatement,
            this.negateFact(positiveFact),
          );
        }
        this.emitStatement(statement.elseStatement);
        if (positiveFact) {
          this.ctx.facts.clear(statement.elseStatement);
        }
        this.ctx.labels.mark(exitLabel);
      } else {
        this.ctx.labels.mark(falseLabel);
      }
    } finally {
      const rebinds = this.ctx.scope.leave(statement);
      this.flushAnnexBRebinds(rebinds, statement);
    }
  }

  private emitFunctionDeclaration(node: ts.FunctionDeclaration): void {
    if (!node.name) {
      throw new Error('Function declarations without a name are not supported');
    }

    const binding = this.ctx.scope.declare(node.name, 'function');
    const functionValue = this.functions.emitFunctionDeclaration(node);
    const mode = this.ctx.scope.getStoreMode(binding);
    this.ctx.bytecode.storeBinding(binding, mode, functionValue, node);
    this.ctx.scope.markInitialized(binding);

    if (this.shouldRegisterAnnexB(node)) {
      this.ctx.scope.registerAnnexB(binding, functionValue);
    }
  }

  emitReturn(statement: ts.ReturnStatement): void {
    void statement;
    throw new Error('StatementLowerer.emitReturn not implemented');
  }

  emitSwitch(statement: ts.SwitchStatement): void {
    void statement;
    throw new Error('StatementLowerer.emitSwitch not implemented');
  }

  emitBranch(statement: ts.BreakOrContinueStatement): void {
    void statement;
    throw new Error('StatementLowerer.emitBranch not implemented');
  }

  emitDeclarationBinding(
    declaration: ts.VariableDeclaration,
    kind: BindingKind,
  ): void {
    const { name, initializer } = declaration;

    if (ts.isIdentifier(name)) {
      this.emitIdentifierBinding(name, kind, initializer, declaration);
      return;
    }

    this.emitPatternBinding(name, kind, initializer, declaration);
  }

  deriveFacts(node: ts.Statement): TypeFact | undefined {
    void node;
    return undefined;
  }

  private consumeResult(result: OperandRef): void {
    /* QuickJS emits OP_drop after expression statements unless the source
       expression already materialised void (e.g. `yield;`). Mirror that here. */
    if (result.kind === 'void') {
      return;
    }
    this.ctx.bytecode.emitOp('OP_drop');
  }

  private negateFact(fact: TypeFact): TypeFact {
    const description = fact.description
      ? `not (${fact.description})`
      : 'negated condition';
    return {
      description,
      narrowedTypes: fact.narrowedTypes,
    };
  }

  private flushAnnexBRebinds(rebinds: readonly AnnexBRebind[], anchor: ts.Node): void {
    if (!rebinds.length) {
      return;
    }
    for (const rebind of rebinds) {
      this.ctx.bytecode.storeBinding(rebind.binding, 'assign', rebind.value, anchor);
      this.ctx.scope.markInitialized(rebind.binding);
    }
  }

  private getBindingKind(list: ts.VariableDeclarationList): BindingKind {
    if (list.flags & ts.NodeFlags.Const) {
      return 'const';
    }
    if (list.flags & ts.NodeFlags.Let) {
      return 'let';
    }
    return 'var';
  }

  private emitIdentifierBinding(
    identifier: ts.Identifier,
    kind: BindingKind,
    initializer: ts.Expression | undefined,
    node: ts.Node,
  ): void {
    if (!initializer && kind === 'const') {
      throw new Error('Missing initializer for const variable');
    }

    const binding = this.ctx.scope.declare(identifier, kind);

    if (initializer) {
      if (this.ctx.scope.requiresReference(identifier)) {
        throw new Error('Reference initialized bindings are not implemented yet');
      }

      const value = this.expressions.emitExpression(initializer);
      const mode = this.ctx.scope.getStoreMode(binding);
      this.ctx.bytecode.storeBinding(binding, mode, value, initializer);
      this.ctx.scope.markInitialized(binding);
      return;
    }

    if (kind === 'let') {
      const undef = this.ctx.bytecode.emitPushUndefined(node);
      this.ctx.bytecode.storeBinding(binding, 'init', undef, node);
      this.ctx.scope.markInitialized(binding);
    }
  }

  private emitPatternBinding(
    pattern: ts.BindingName,
    kind: BindingKind,
    initializer: ts.Expression | undefined,
    node: ts.Node,
  ): void {
    const bindings = this.ctx.scope.declarePattern(pattern, kind);
    const bindingMap = new Map<string, BindingInfo>();
    for (const binding of bindings) {
      bindingMap.set(binding.name.text, binding);
    }

    if (!initializer && kind === 'const') {
      throw new Error('Missing initializer for const binding pattern');
    }

    const source = initializer
      ? this.expressions.emitExpression(initializer)
      : this.ctx.bytecode.emitPushUndefined(node);

    this.destructuring.emitBinding(pattern, source, {
      bindingKind: kind,
      allowInitializer: true,
      isArgument: false,
      bindingLookup: (identifier) => bindingMap.get(identifier.text),
    });

    for (const binding of bindings) {
      this.ctx.scope.markInitialized(binding);
    }
  }

  private shouldRegisterAnnexB(node: ts.FunctionDeclaration): boolean {
    if (this.ctx.mode === 'strict') {
      return false;
    }

    const parent = node.parent;
    if (!parent) {
      return false;
    }

    if (ts.isSourceFile(parent) || ts.isModuleBlock(parent)) {
      return false;
    }

    if (ts.isBlock(parent)) {
      if (this.isFunctionBodyBlock(parent)) {
        return false;
      }
      return true;
    }

    if (ts.isCaseClause(parent) || ts.isDefaultClause(parent)) {
      return true;
    }

    if (ts.isIfStatement(parent)) {
      return true;
    }

    if (ts.isIterationStatement(parent, /*lookInLabeledStatements*/ true)) {
      return true;
    }

    return false;
  }

  private isFunctionBodyBlock(block: ts.Block): boolean {
    const owner = block.parent;
    if (!owner || !ts.isFunctionLike(owner)) {
      return false;
    }
    if (!('body' in owner) || !owner.body) {
      return false;
    }
    return ts.isBlock(owner.body) && owner.body === block;
  }
}
