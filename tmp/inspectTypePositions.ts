import ts from 'typescript';

const source = `function foo(a: number, b?: string, c = 1) { return a + c }
let x: Array<number> = [];
class C { method<T>(value: T): T { return value as T } prop!: number; }
const tuple: [number, string] = [1, 'a'];
interface I { field: string }
type Alias = { a: number };
const func = (arg: string | number): void => {};
`;

const fileName = 'sample.ts';
const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS);

function logNode(node: ts.Node) {
  if (ts.isParameter(node) || ts.isPropertyDeclaration(node) || ts.isPropertySignature(node) || ts.isAsExpression(node) || ts.isTypeAliasDeclaration(node) || ts.isVariableDeclaration(node) || ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
    const info: any = { kind: ts.SyntaxKind[node.kind], pos: node.pos, end: node.end };
    if ('name' in node && node.name) {
      info.name = node.name.getText(sourceFile);
      info.nameEnd = node.name.end;
    }
    if ('questionToken' in node && node.questionToken) {
      info.questionStart = node.questionToken.getStart(sourceFile, false);
      info.questionEnd = node.questionToken.end;
    }
    if ('type' in node && node.type) {
      info.typeStart = node.type.getFullStart();
      info.typeStartNoTrivia = node.type.getStart(sourceFile, false);
      info.typePos = node.type.pos;
      info.typeEnd = node.type.end;
      info.typeText = node.type.getText(sourceFile);
    }
    if (ts.isAsExpression(node)) {
      info.asKeywordStart = node.expression.end;
      info.typeStart = node.type.getStart(sourceFile, false);
    }
    if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
      if (node.typeParameters) {
        info.typeParametersStart = node.typeParameters.pos;
        info.typeParametersEnd = node.typeParameters.end;
      }
      if (node.type) {
        info.returnTypeStart = node.type.getFullStart();
        info.returnTypeText = node.type.getText(sourceFile);
      }
    }
    if (ts.isVariableDeclaration(node) && node.type) {
      info.varText = node.getText(sourceFile);
    }
    console.log(JSON.stringify(info));
  }
  ts.forEachChild(node, logNode);
}

logNode(sourceFile);
