import * as ts from 'typescript';
import {
  LoweringContext,
  OperandRef,
  TypeFact,
} from './LoweringContext';
import { DestructuringLowerer } from './DestructuringLowerer';
import { LValueBuilder } from './LValueBuilder';

/** Aligns with QuickJS js_parse_expr* family. */
export class ExpressionLowerer {
  constructor(
    private readonly ctx: LoweringContext,
    private readonly lvalue: LValueBuilder,
    private readonly destructuring: DestructuringLowerer,
  ) {}

  emitExpression(node: ts.Expression): OperandRef {
    this.ctx.bytecode.noteSource(node);
    switch (node.kind) {
      case ts.SyntaxKind.BinaryExpression:
        return this.emitBinaryExpression(node as ts.BinaryExpression);
      case ts.SyntaxKind.ConditionalExpression:
        return this.emitConditional(node as ts.ConditionalExpression);
      case ts.SyntaxKind.PrefixUnaryExpression:
      case ts.SyntaxKind.PostfixUnaryExpression:
        return this.emitUnaryExpression(node as ts.PrefixUnaryExpression);
      case ts.SyntaxKind.CallExpression:
      case ts.SyntaxKind.NewExpression:
        return this.emitCallLike(node as ts.CallLikeExpression);
      case ts.SyntaxKind.ParenthesizedExpression:
        return this.emitParenthesizedExpression(node as ts.ParenthesizedExpression);
      case ts.SyntaxKind.TemplateExpression:
      return this.emitTemplateExpression(node as ts.TemplateExpression);
      case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        return this.emitNoSubstitutionTemplate(
          node as ts.NoSubstitutionTemplateLiteral,
        );
      case ts.SyntaxKind.ObjectLiteralExpression:
        return this.emitObjectLiteral(node as ts.ObjectLiteralExpression);
      case ts.SyntaxKind.ArrayLiteralExpression:
        return this.emitArrayLiteral(node as ts.ArrayLiteralExpression);
      case ts.SyntaxKind.AwaitExpression:
      case ts.SyntaxKind.YieldExpression:
        return this.emitSuspendExpression(node as ts.YieldExpression | ts.AwaitExpression);
      case ts.SyntaxKind.Identifier:
      case ts.SyntaxKind.PropertyAccessExpression:
      case ts.SyntaxKind.ElementAccessExpression:
        return this.emitReferenceExpression(node as ts.Expression);
      case ts.SyntaxKind.ArrowFunction:
      case ts.SyntaxKind.FunctionExpression:
        return this.emitFunctionExpression(node as ts.FunctionExpression | ts.ArrowFunction);
      default:
        return this.emitPrimitive(node);
    }
  }

  emitComma(node: ts.BinaryExpression): OperandRef {
    void node;
  throw new Error('ExpressionLowerer.emitComma not implemented');
  }

  emitBinaryExpression(node: ts.BinaryExpression): OperandRef {
    void node;
  throw new Error('ExpressionLowerer.emitBinaryExpression not implemented');
  }

  emitConditional(node: ts.ConditionalExpression): OperandRef {
    void node;
  throw new Error('ExpressionLowerer.emitConditional not implemented');
  }

  emitUnaryExpression(node: ts.PrefixUnaryExpression | ts.PostfixUnaryExpression): OperandRef {
    void node;
  throw new Error('ExpressionLowerer.emitUnaryExpression not implemented');
  }

  emitCallLike(node: ts.CallLikeExpression): OperandRef {
    void node;
  throw new Error('ExpressionLowerer.emitCallLike not implemented');
  }

  emitParenthesizedExpression(node: ts.ParenthesizedExpression): OperandRef {
    void node;
  throw new Error('ExpressionLowerer.emitParenthesizedExpression not implemented');
  }

  emitTemplateExpression(node: ts.TemplateExpression): OperandRef {
    void node;
  throw new Error('ExpressionLowerer.emitTemplateExpression not implemented');
  }

  emitNoSubstitutionTemplate(node: ts.NoSubstitutionTemplateLiteral): OperandRef {
    void node;
  throw new Error('ExpressionLowerer.emitNoSubstitutionTemplate not implemented');
  }

  emitObjectLiteral(node: ts.ObjectLiteralExpression): OperandRef {
    void node;
  throw new Error('ExpressionLowerer.emitObjectLiteral not implemented');
  }

  emitArrayLiteral(node: ts.ArrayLiteralExpression): OperandRef {
    void node;
  throw new Error('ExpressionLowerer.emitArrayLiteral not implemented');
  }

  emitSuspendExpression(node: ts.YieldExpression | ts.AwaitExpression): OperandRef {
    void node;
  throw new Error('ExpressionLowerer.emitSuspendExpression not implemented');
  }

  emitReferenceExpression(node: ts.Expression): OperandRef {
    void node;
  throw new Error('ExpressionLowerer.emitReferenceExpression not implemented');
  }

  emitFunctionExpression(node: ts.FunctionExpression | ts.ArrowFunction): OperandRef {
    void node;
  throw new Error('ExpressionLowerer.emitFunctionExpression not implemented');
  }

  emitDestructuring(
    pattern: ts.BindingName,
    value: OperandRef,
    allowInitializer: boolean,
  ): void {
    this.destructuring.emitBinding(pattern, value, {
      allowInitializer,
  bindingKind: 'var',
      isArgument: false,
    });
  }

  emitShortCircuit(
    operator: ts.SyntaxKind,
    left: ts.Expression,
    right: ts.Expression,
  ): OperandRef {
    void operator;
    void left;
    void right;
  throw new Error('ExpressionLowerer.emitShortCircuit not implemented');
  }

  emitNullishCoalescing(node: ts.BinaryExpression): OperandRef {
    void node;
  throw new Error('ExpressionLowerer.emitNullishCoalescing not implemented');
  }

  deriveFacts(node: ts.Expression): TypeFact | undefined {
    switch (node.kind) {
      case ts.SyntaxKind.TrueKeyword:
        return { description: 'condition is truthy' };
      case ts.SyntaxKind.FalseKeyword:
        return { description: 'condition is falsy' };
      default:
        return undefined;
    }
  }

  emitPrimitive(node: ts.Expression): OperandRef {
    void node;
    throw new Error('ExpressionLowerer.emitPrimitive not implemented');
  }
}
