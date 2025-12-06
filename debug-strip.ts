
import * as ts from 'typescript';
import * as fs from 'fs';

const tsCode = fs.readFileSync('__tests__/compiler/fixtures/closure-basic.ts', 'utf-8');

const transpiled = ts.transpileModule(tsCode, {
    reportDiagnostics: true,
    compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.Preserve,
        importHelpers: false,
        esModuleInterop: false,
    },
});

console.log('--- Transpiled Code ---');
console.log(transpiled.outputText);
console.log('-----------------------');
