import * as ts from 'typescript';
import { Compiler } from '../src/compiler/compiler';

const code = `console.log("Hello");`;
const sourceFile = ts.createSourceFile('test.ts', code, ts.ScriptTarget.ES2020, true);

const compiler = new Compiler();
const bytecode = compiler.compile(sourceFile);

console.log('Bytecode length:', bytecode.length);
console.log('Bytecode:', Buffer.from(bytecode).toString('hex'));
