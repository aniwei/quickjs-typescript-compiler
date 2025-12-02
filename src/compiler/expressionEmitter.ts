import ts from 'typescript';

export interface ExpressionEmitOptions {
  isTail?: boolean;
  nameHint?: string;
  dropResult?: boolean;
}

export interface ExpressionEmitterHost {
  compileBinaryExpression(node: ts.BinaryExpression): void;
  compileCallExpression(node: ts.CallExpression, isTail?: boolean): void;
  compilePropertyAccessExpression(node: ts.PropertyAccessExpression): void;
  compileElementAccessExpression(node: ts.ElementAccessExpression): void;
  compilePrefixUnaryExpression(node: ts.PrefixUnaryExpression): void;
  compilePostfixUnaryExpression(node: ts.PostfixUnaryExpression): void;
  compileIdentifier(node: ts.Identifier, emitLineInfo?: boolean): void;
  compileNumericLiteral(node: ts.NumericLiteral): void;
  compileStringLiteral(node: ts.StringLiteral): void;
  compileArrayLiteral(node: ts.ArrayLiteralExpression): void;
  compileObjectLiteral(node: ts.ObjectLiteralExpression): void;
  compileNewExpression(node: ts.NewExpression): void;
  compileThisExpression(node: ts.ThisExpression): void;
  compileNullLiteral(node: ts.NullLiteral): void;
  compileBooleanLiteral(node: ts.BooleanLiteral): void;
  compileTemplateExpression(node: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral): void;
  compileConditionalExpression(node: ts.ConditionalExpression): void;
  compileTypeOfExpression(node: ts.TypeOfExpression): void;
  compileVoidExpression(node: ts.VoidExpression): void;
}

/**
 * Selectively intercepts expression kinds so we can migrate `js_parse_expr`
 * case-by-case without rewriting the entire compiler at once.
 */
export class ExpressionEmitter {
  constructor(private host: ExpressionEmitterHost) {}

  emit(node: ts.Expression, options: ExpressionEmitOptions = {}): boolean {
    switch (node.kind) {
      case ts.SyntaxKind.BinaryExpression:
        this.host.compileBinaryExpression(node as ts.BinaryExpression);
        return true;
      case ts.SyntaxKind.CallExpression:
        this.host.compileCallExpression(node as ts.CallExpression, options.isTail);
        return true;
      case ts.SyntaxKind.PropertyAccessExpression:
        this.host.compilePropertyAccessExpression(node as ts.PropertyAccessExpression);
        return true;
      case ts.SyntaxKind.ElementAccessExpression:
        this.host.compileElementAccessExpression(node as ts.ElementAccessExpression);
        return true;
      case ts.SyntaxKind.PrefixUnaryExpression:
        this.host.compilePrefixUnaryExpression(node as ts.PrefixUnaryExpression);
        return true;
      case ts.SyntaxKind.PostfixUnaryExpression:
        this.host.compilePostfixUnaryExpression(node as ts.PostfixUnaryExpression);
        return true;
      case ts.SyntaxKind.Identifier:
        this.host.compileIdentifier(node as ts.Identifier);
        return true;
      case ts.SyntaxKind.NumericLiteral:
        this.host.compileNumericLiteral(node as ts.NumericLiteral);
        return true;
      case ts.SyntaxKind.StringLiteral:
        this.host.compileStringLiteral(node as ts.StringLiteral);
        return true;
      case ts.SyntaxKind.ArrayLiteralExpression:
        this.host.compileArrayLiteral(node as ts.ArrayLiteralExpression);
        return true;
      case ts.SyntaxKind.ObjectLiteralExpression:
        this.host.compileObjectLiteral(node as ts.ObjectLiteralExpression);
        return true;
      case ts.SyntaxKind.NewExpression:
        this.host.compileNewExpression(node as ts.NewExpression);
        return true;
      case ts.SyntaxKind.ThisKeyword:
        this.host.compileThisExpression(node as ts.ThisExpression);
        return true;
      case ts.SyntaxKind.NullKeyword:
        this.host.compileNullLiteral(node as ts.NullLiteral);
        return true;
      case ts.SyntaxKind.TrueKeyword:
      case ts.SyntaxKind.FalseKeyword:
        this.host.compileBooleanLiteral(node as ts.BooleanLiteral);
        return true;
      case ts.SyntaxKind.TypeOfExpression:
        this.host.compileTypeOfExpression(node as ts.TypeOfExpression);
        return true;
      case ts.SyntaxKind.VoidExpression:
        this.host.compileVoidExpression(node as ts.VoidExpression);
        return true;
      case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
      case ts.SyntaxKind.TemplateExpression:
        this.host.compileTemplateExpression(node as ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral);
        return true;
      case ts.SyntaxKind.ConditionalExpression:
        this.host.compileConditionalExpression(node as ts.ConditionalExpression);
        return true;
      default:
        return false;
    }
  }
}
