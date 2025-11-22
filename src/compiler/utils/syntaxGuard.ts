import * as ts from 'typescript'

const SUPPORTED_SYNTAX_KINDS = new Set<ts.SyntaxKind>([
  // Source
  ts.SyntaxKind.SourceFile,
  ts.SyntaxKind.EndOfFileToken,

  // Expressions
  ts.SyntaxKind.ParenthesizedExpression,
  ts.SyntaxKind.NumericLiteral,
  ts.SyntaxKind.TrueKeyword,
  ts.SyntaxKind.FalseKeyword,
  ts.SyntaxKind.StringLiteral,
  ts.SyntaxKind.NoSubstitutionTemplateLiteral,
  ts.SyntaxKind.TemplateExpression,
  ts.SyntaxKind.TemplateHead,
  ts.SyntaxKind.TemplateMiddle,
  ts.SyntaxKind.TemplateTail,
  ts.SyntaxKind.NullKeyword,
  ts.SyntaxKind.ThisKeyword,
  ts.SyntaxKind.ArrayLiteralExpression,
  ts.SyntaxKind.ObjectLiteralExpression,
  ts.SyntaxKind.PropertyAssignment,
  ts.SyntaxKind.ShorthandPropertyAssignment,
  ts.SyntaxKind.Identifier,
  ts.SyntaxKind.BinaryExpression,
  ts.SyntaxKind.CallExpression,
  ts.SyntaxKind.NewExpression,
  ts.SyntaxKind.PropertyAccessExpression,
  ts.SyntaxKind.FunctionExpression,
  ts.SyntaxKind.ArrowFunction,
  ts.SyntaxKind.PostfixUnaryExpression,
  ts.SyntaxKind.PrefixUnaryExpression,
  ts.SyntaxKind.VoidExpression,
  ts.SyntaxKind.TypeOfExpression,
  ts.SyntaxKind.DeleteExpression,
  ts.SyntaxKind.ElementAccessExpression,
  ts.SyntaxKind.ConditionalExpression,
  ts.SyntaxKind.AsExpression,
  ts.SyntaxKind.TypeAssertionExpression,
  ts.SyntaxKind.NonNullExpression,
  
  // Statements
  ts.SyntaxKind.ExpressionStatement,
  ts.SyntaxKind.Block,
  ts.SyntaxKind.VariableStatement,
  ts.SyntaxKind.VariableDeclarationList,
  ts.SyntaxKind.VariableDeclaration,
  ts.SyntaxKind.FunctionDeclaration,
  ts.SyntaxKind.IfStatement,
  ts.SyntaxKind.SwitchStatement,
  ts.SyntaxKind.CaseClause,
  ts.SyntaxKind.DefaultClause,
  ts.SyntaxKind.BreakStatement,
  ts.SyntaxKind.ContinueStatement,
  ts.SyntaxKind.ReturnStatement,
  ts.SyntaxKind.ThrowStatement,
  ts.SyntaxKind.WhileStatement,
  ts.SyntaxKind.DoStatement,
  ts.SyntaxKind.ForStatement,
  ts.SyntaxKind.ForInStatement,
  // ForOfStatement is listed as missing in Phase 1, but TODO says "ForOfStatement (including await)". 
  // The existing TODO says "在编译阶段实现 for...of...". So it might be partially implemented.
  ts.SyntaxKind.ForOfStatement, 

  // Declarations
  ts.SyntaxKind.Parameter,
  ts.SyntaxKind.BindingElement,
  ts.SyntaxKind.ArrayBindingPattern,
  ts.SyntaxKind.ObjectBindingPattern,
])

// Ignored or handled implicitly
const IGNORED_SYNTAX_KINDS = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.InterfaceDeclaration,
  ts.SyntaxKind.TypeAliasDeclaration,
  ts.SyntaxKind.ImportDeclaration, // Not yet implemented fully?
  ts.SyntaxKind.ExportDeclaration, // Not yet implemented fully?
])

export function assertSupportedNode(node: ts.Node): void {
  if (SUPPORTED_SYNTAX_KINDS.has(node.kind)) {
    return
  }
  
  if (IGNORED_SYNTAX_KINDS.has(node.kind)) {
    return
  }

  // Some nodes are parts of others and don't need explicit support if their parent handles them
  // But for expressions and statements, we want to be strict.
  
  if (ts.isToken(node)) {
    return
  }

  const { line, character } = node.getSourceFile().getLineAndCharacterOfPosition(node.getStart())
  const kindName = ts.SyntaxKind[node.kind]
  throw new Error(`Unsupported syntax kind: ${kindName} at ${line + 1}:${character + 1}\nCode: ${node.getText()}`)
}
