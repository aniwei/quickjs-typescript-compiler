import * as ts from 'typescript';

const code = "a?.b.c";
const sourceFile = ts.createSourceFile('test.ts', code, ts.ScriptTarget.Latest);

function visit(node: ts.Node) {
    if (ts.isPropertyAccessExpression(node)) {
        console.log(`Node: ${node.getText(sourceFile)}`);
        console.log(`  isOptionalChain: ${ts.isOptionalChain(node)}`);
    }
    ts.forEachChild(node, visit);
}

visit(sourceFile);
