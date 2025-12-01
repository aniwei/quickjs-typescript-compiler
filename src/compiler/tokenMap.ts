import ts from 'typescript';

export enum TokenValue {
  TOK_NUMBER = -128,
  TOK_STRING,
  TOK_TEMPLATE,
  TOK_IDENT,
  TOK_REGEXP,
  TOK_MUL_ASSIGN,
  TOK_DIV_ASSIGN,
  TOK_MOD_ASSIGN,
  TOK_PLUS_ASSIGN,
  TOK_MINUS_ASSIGN,
  TOK_SHL_ASSIGN,
  TOK_SAR_ASSIGN,
  TOK_SHR_ASSIGN,
  TOK_AND_ASSIGN,
  TOK_XOR_ASSIGN,
  TOK_OR_ASSIGN,
  TOK_POW_ASSIGN,
  TOK_LAND_ASSIGN,
  TOK_LOR_ASSIGN,
  TOK_DOUBLE_QUESTION_MARK_ASSIGN,
  TOK_DEC,
  TOK_INC,
  TOK_SHL,
  TOK_SAR,
  TOK_SHR,
  TOK_LT,
  TOK_LTE,
  TOK_GT,
  TOK_GTE,
  TOK_EQ,
  TOK_STRICT_EQ,
  TOK_NEQ,
  TOK_STRICT_NEQ,
  TOK_LAND,
  TOK_LOR,
  TOK_POW,
  TOK_ARROW,
  TOK_ELLIPSIS,
  TOK_DOUBLE_QUESTION_MARK,
  TOK_QUESTION_MARK_DOT,
  TOK_ERROR,
  TOK_PRIVATE_NAME,
  TOK_EOF,
  TOK_NULL,
  TOK_FALSE,
  TOK_TRUE,
  TOK_IF,
  TOK_ELSE,
  TOK_RETURN,
  TOK_VAR,
  TOK_THIS,
  TOK_DELETE,
  TOK_VOID,
  TOK_TYPEOF,
  TOK_NEW,
  TOK_IN,
  TOK_INSTANCEOF,
  TOK_DO,
  TOK_WHILE,
  TOK_FOR,
  TOK_BREAK,
  TOK_CONTINUE,
  TOK_SWITCH,
  TOK_CASE,
  TOK_DEFAULT,
  TOK_THROW,
  TOK_TRY,
  TOK_CATCH,
  TOK_FINALLY,
  TOK_FUNCTION,
  TOK_DEBUGGER,
  TOK_WITH,
  TOK_CLASS,
  TOK_CONST,
  TOK_ENUM,
  TOK_EXPORT,
  TOK_EXTENDS,
  TOK_IMPORT,
  TOK_SUPER,
  TOK_IMPLEMENTS,
  TOK_INTERFACE,
  TOK_LET,
  TOK_PACKAGE,
  TOK_PRIVATE,
  TOK_PROTECTED,
  TOK_PUBLIC,
  TOK_STATIC,
  TOK_YIELD,
  TOK_AWAIT,
  TOK_OF,
}

export type TokenClassification = 'identifier' | 'keyword' | 'literal' | 'operator' | 'punctuation';

export interface TokenMappingResult {
  value: number;
  classification: TokenClassification;
}

const charCode = (ch: string): number => ch.charCodeAt(0);

const keywordMap = new Map<ts.SyntaxKind, TokenValue>([
  [ts.SyntaxKind.NullKeyword, TokenValue.TOK_NULL],
  [ts.SyntaxKind.FalseKeyword, TokenValue.TOK_FALSE],
  [ts.SyntaxKind.TrueKeyword, TokenValue.TOK_TRUE],
  [ts.SyntaxKind.IfKeyword, TokenValue.TOK_IF],
  [ts.SyntaxKind.ElseKeyword, TokenValue.TOK_ELSE],
  [ts.SyntaxKind.ReturnKeyword, TokenValue.TOK_RETURN],
  [ts.SyntaxKind.VarKeyword, TokenValue.TOK_VAR],
  [ts.SyntaxKind.ThisKeyword, TokenValue.TOK_THIS],
  [ts.SyntaxKind.DeleteKeyword, TokenValue.TOK_DELETE],
  [ts.SyntaxKind.VoidKeyword, TokenValue.TOK_VOID],
  [ts.SyntaxKind.TypeOfKeyword, TokenValue.TOK_TYPEOF],
  [ts.SyntaxKind.NewKeyword, TokenValue.TOK_NEW],
  [ts.SyntaxKind.InKeyword, TokenValue.TOK_IN],
  [ts.SyntaxKind.InstanceOfKeyword, TokenValue.TOK_INSTANCEOF],
  [ts.SyntaxKind.DoKeyword, TokenValue.TOK_DO],
  [ts.SyntaxKind.WhileKeyword, TokenValue.TOK_WHILE],
  [ts.SyntaxKind.ForKeyword, TokenValue.TOK_FOR],
  [ts.SyntaxKind.BreakKeyword, TokenValue.TOK_BREAK],
  [ts.SyntaxKind.ContinueKeyword, TokenValue.TOK_CONTINUE],
  [ts.SyntaxKind.SwitchKeyword, TokenValue.TOK_SWITCH],
  [ts.SyntaxKind.CaseKeyword, TokenValue.TOK_CASE],
  [ts.SyntaxKind.DefaultKeyword, TokenValue.TOK_DEFAULT],
  [ts.SyntaxKind.ThrowKeyword, TokenValue.TOK_THROW],
  [ts.SyntaxKind.TryKeyword, TokenValue.TOK_TRY],
  [ts.SyntaxKind.CatchKeyword, TokenValue.TOK_CATCH],
  [ts.SyntaxKind.FinallyKeyword, TokenValue.TOK_FINALLY],
  [ts.SyntaxKind.FunctionKeyword, TokenValue.TOK_FUNCTION],
  [ts.SyntaxKind.DebuggerKeyword, TokenValue.TOK_DEBUGGER],
  [ts.SyntaxKind.WithKeyword, TokenValue.TOK_WITH],
  [ts.SyntaxKind.ClassKeyword, TokenValue.TOK_CLASS],
  [ts.SyntaxKind.ConstKeyword, TokenValue.TOK_CONST],
  [ts.SyntaxKind.EnumKeyword, TokenValue.TOK_ENUM],
  [ts.SyntaxKind.ExportKeyword, TokenValue.TOK_EXPORT],
  [ts.SyntaxKind.ExtendsKeyword, TokenValue.TOK_EXTENDS],
  [ts.SyntaxKind.ImportKeyword, TokenValue.TOK_IMPORT],
  [ts.SyntaxKind.SuperKeyword, TokenValue.TOK_SUPER],
  [ts.SyntaxKind.ImplementsKeyword, TokenValue.TOK_IMPLEMENTS],
  [ts.SyntaxKind.InterfaceKeyword, TokenValue.TOK_INTERFACE],
  [ts.SyntaxKind.LetKeyword, TokenValue.TOK_LET],
  [ts.SyntaxKind.PackageKeyword, TokenValue.TOK_PACKAGE],
  [ts.SyntaxKind.PrivateKeyword, TokenValue.TOK_PRIVATE],
  [ts.SyntaxKind.ProtectedKeyword, TokenValue.TOK_PROTECTED],
  [ts.SyntaxKind.PublicKeyword, TokenValue.TOK_PUBLIC],
  [ts.SyntaxKind.StaticKeyword, TokenValue.TOK_STATIC],
  [ts.SyntaxKind.YieldKeyword, TokenValue.TOK_YIELD],
  [ts.SyntaxKind.AwaitKeyword, TokenValue.TOK_AWAIT],
  [ts.SyntaxKind.OfKeyword, TokenValue.TOK_OF],
]);

const literalKinds = new Map<ts.SyntaxKind, TokenValue>([
  [ts.SyntaxKind.NumericLiteral, TokenValue.TOK_NUMBER],
  [ts.SyntaxKind.BigIntLiteral, TokenValue.TOK_NUMBER],
  [ts.SyntaxKind.StringLiteral, TokenValue.TOK_STRING],
  [ts.SyntaxKind.NoSubstitutionTemplateLiteral, TokenValue.TOK_TEMPLATE],
  [ts.SyntaxKind.TemplateHead, TokenValue.TOK_TEMPLATE],
  [ts.SyntaxKind.TemplateMiddle, TokenValue.TOK_TEMPLATE],
  [ts.SyntaxKind.TemplateTail, TokenValue.TOK_TEMPLATE],
  [ts.SyntaxKind.RegularExpressionLiteral, TokenValue.TOK_REGEXP],
  [ts.SyntaxKind.TrueKeyword, TokenValue.TOK_TRUE],
  [ts.SyntaxKind.FalseKeyword, TokenValue.TOK_FALSE],
  [ts.SyntaxKind.NullKeyword, TokenValue.TOK_NULL],
]);

const punctuationMap = new Map<ts.SyntaxKind, number>([
  [ts.SyntaxKind.OpenBraceToken, charCode('{')],
  [ts.SyntaxKind.CloseBraceToken, charCode('}')],
  [ts.SyntaxKind.OpenParenToken, charCode('(')],
  [ts.SyntaxKind.CloseParenToken, charCode(')')],
  [ts.SyntaxKind.OpenBracketToken, charCode('[')],
  [ts.SyntaxKind.CloseBracketToken, charCode(']')],
  [ts.SyntaxKind.CommaToken, charCode(',')],
  [ts.SyntaxKind.SemicolonToken, charCode(';')],
  [ts.SyntaxKind.ColonToken, charCode(':')],
  [ts.SyntaxKind.DotToken, charCode('.')],
  [ts.SyntaxKind.QuestionToken, charCode('?')],
  [ts.SyntaxKind.ExclamationToken, charCode('!')],
  [ts.SyntaxKind.TildeToken, charCode('~')],
  [ts.SyntaxKind.BacktickToken, charCode('`')],
]);

const operatorMap = new Map<ts.SyntaxKind, number>([
  [ts.SyntaxKind.PlusToken, charCode('+')],
  [ts.SyntaxKind.MinusToken, charCode('-')],
  [ts.SyntaxKind.AsteriskToken, charCode('*')],
  [ts.SyntaxKind.SlashToken, charCode('/')],
  [ts.SyntaxKind.PercentToken, charCode('%')],
  [ts.SyntaxKind.CaretToken, charCode('^')],
  [ts.SyntaxKind.AmpersandToken, charCode('&')],
  [ts.SyntaxKind.BarToken, charCode('|')],
  [ts.SyntaxKind.LessThanToken, TokenValue.TOK_LT],
  [ts.SyntaxKind.LessThanEqualsToken, TokenValue.TOK_LTE],
  [ts.SyntaxKind.GreaterThanToken, TokenValue.TOK_GT],
  [ts.SyntaxKind.GreaterThanEqualsToken, TokenValue.TOK_GTE],
  [ts.SyntaxKind.EqualsToken, charCode('=')],
  [ts.SyntaxKind.EqualsEqualsToken, TokenValue.TOK_EQ],
  [ts.SyntaxKind.EqualsEqualsEqualsToken, TokenValue.TOK_STRICT_EQ],
  [ts.SyntaxKind.ExclamationEqualsToken, TokenValue.TOK_NEQ],
  [ts.SyntaxKind.ExclamationEqualsEqualsToken, TokenValue.TOK_STRICT_NEQ],
  [ts.SyntaxKind.PlusPlusToken, TokenValue.TOK_INC],
  [ts.SyntaxKind.MinusMinusToken, TokenValue.TOK_DEC],
  [ts.SyntaxKind.LessThanLessThanToken, TokenValue.TOK_SHL],
  [ts.SyntaxKind.GreaterThanGreaterThanToken, TokenValue.TOK_SAR],
  [ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken, TokenValue.TOK_SHR],
  [ts.SyntaxKind.LessThanLessThanEqualsToken, TokenValue.TOK_SHL_ASSIGN],
  [ts.SyntaxKind.GreaterThanGreaterThanEqualsToken, TokenValue.TOK_SAR_ASSIGN],
  [ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken, TokenValue.TOK_SHR_ASSIGN],
  [ts.SyntaxKind.PlusEqualsToken, TokenValue.TOK_PLUS_ASSIGN],
  [ts.SyntaxKind.MinusEqualsToken, TokenValue.TOK_MINUS_ASSIGN],
  [ts.SyntaxKind.AsteriskEqualsToken, TokenValue.TOK_MUL_ASSIGN],
  [ts.SyntaxKind.SlashEqualsToken, TokenValue.TOK_DIV_ASSIGN],
  [ts.SyntaxKind.PercentEqualsToken, TokenValue.TOK_MOD_ASSIGN],
  [ts.SyntaxKind.AmpersandEqualsToken, TokenValue.TOK_AND_ASSIGN],
  [ts.SyntaxKind.BarEqualsToken, TokenValue.TOK_OR_ASSIGN],
  [ts.SyntaxKind.CaretEqualsToken, TokenValue.TOK_XOR_ASSIGN],
  [ts.SyntaxKind.AmpersandAmpersandToken, TokenValue.TOK_LAND],
  [ts.SyntaxKind.BarBarToken, TokenValue.TOK_LOR],
  [ts.SyntaxKind.QuestionQuestionToken, TokenValue.TOK_DOUBLE_QUESTION_MARK],
  [ts.SyntaxKind.AmpersandAmpersandEqualsToken, TokenValue.TOK_LAND_ASSIGN],
  [ts.SyntaxKind.BarBarEqualsToken, TokenValue.TOK_LOR_ASSIGN],
  [ts.SyntaxKind.QuestionQuestionEqualsToken, TokenValue.TOK_DOUBLE_QUESTION_MARK_ASSIGN],
  [ts.SyntaxKind.AsteriskAsteriskToken, TokenValue.TOK_POW],
  [ts.SyntaxKind.AsteriskAsteriskEqualsToken, TokenValue.TOK_POW_ASSIGN],
  [ts.SyntaxKind.QuestionDotToken, TokenValue.TOK_QUESTION_MARK_DOT],
  [ts.SyntaxKind.DotDotDotToken, TokenValue.TOK_ELLIPSIS],
  [ts.SyntaxKind.EqualsGreaterThanToken, TokenValue.TOK_ARROW],
]);

export function syntaxKindToToken(kind: ts.SyntaxKind, text: string): TokenMappingResult {
  if (kind === ts.SyntaxKind.EndOfFileToken) {
    return { value: TokenValue.TOK_EOF, classification: 'punctuation' };
  }

  if (kind === ts.SyntaxKind.Identifier) {
    return { value: TokenValue.TOK_IDENT, classification: 'identifier' };
  }

  if (kind === ts.SyntaxKind.PrivateIdentifier) {
    return { value: TokenValue.TOK_PRIVATE_NAME, classification: 'identifier' };
  }

  const keywordToken = keywordMap.get(kind);
  if (keywordToken !== undefined) {
    return { value: keywordToken, classification: 'keyword' };
  }

  const literalToken = literalKinds.get(kind);
  if (literalToken !== undefined) {
    return { value: literalToken, classification: 'literal' };
  }

  const punctToken = punctuationMap.get(kind);
  if (punctToken !== undefined) {
    return { value: punctToken, classification: 'punctuation' };
  }

  const opToken = operatorMap.get(kind);
  if (opToken !== undefined) {
    return { value: opToken, classification: 'operator' };
  }

  if (kind === ts.SyntaxKind.Unknown) {
    return { value: TokenValue.TOK_ERROR, classification: 'operator' };
  }

  // Fallback: treat token text as identifier or punctuation depending on content
  if (/^[a-zA-Z_$][\w$]*$/.test(text)) {
    return { value: TokenValue.TOK_IDENT, classification: 'identifier' };
  }

  return { value: TokenValue.TOK_ERROR, classification: 'operator' };
}
