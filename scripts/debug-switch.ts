import { TypeScriptCompiler } from '../src/compiler';
import * as fs from 'fs';
import * as ts from 'typescript';

const compiler = new TypeScriptCompiler();
const originalEmitLineCol = compiler['emitLineCol'];
const originalEmitOp = compiler['emitOp'];

compiler['emitLineCol'] = function(pos: number, colOffset: number = 0) {
  const { line, character } = this.sourceFile!.getLineAndCharacterOfPosition(pos);
  console.log(`emitLineCol: pos=${pos} line=${line} col=${character}`);
  originalEmitLineCol.call(this, pos, colOffset);
};

compiler['emitOp'] = function(op: number) {
  console.log(`emitOp: ${op} (pc=${this.currentFunc?.byteCode.size})`);
  originalEmitOp.call(this, op);
};

const source = fs.readFileSync('__tests__/compiler/fixtures/tmp-switch-default-middle.ts', 'utf-8');
const bytecode = compiler.compile(source, '__tests__/compiler/fixtures/tmp-switch-default-middle.ts');
fs.writeFileSync('debug-switch.qbc', bytecode);
console.log('Saved debug-switch.qbc');
