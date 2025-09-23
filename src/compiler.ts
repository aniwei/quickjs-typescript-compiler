
import ts from 'typescript';
import { FunctionDef } from './functionDef';

export class Compiler {
  constructor() {}

  compile(node: ts.Node): FunctionDef {
    const fd = new FunctionDef(null);
    // TODO
    return fd;
  }
}
