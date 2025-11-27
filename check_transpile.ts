
import * as ts from 'typescript';
import * as fs from 'fs';

const code = `const total = ((a, b) => a + b)(1, 2);

const doubled = ((value) => value * 2)(total);

const combined = ((value) => ((extra) => value + extra)(4))(doubled);

void total;
void doubled;
void combined;
`;

const result = ts.transpileModule(code, {
    compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2020,
    }
});

console.log('--- Output ---');
console.log(result.outputText);
console.log('--- End ---');
