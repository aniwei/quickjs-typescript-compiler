
import * as ts from 'typescript';
import * as fs from 'fs';

const fileName = '__tests__/compiler/fixtures/tmp-switch-default-middle.ts';
const tsCode = fs.readFileSync(fileName, 'utf-8');

const transpiled = ts.transpileModule(tsCode, {
    fileName,
    reportDiagnostics: true,
    compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.Preserve,
        importHelpers: false,
        esModuleInterop: false,
    },
});

console.log('--- Transpiled Output ---');
console.log(transpiled.outputText);
console.log('--- End Output ---');
