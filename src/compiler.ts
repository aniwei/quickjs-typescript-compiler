import { create } from 'domain'
import { FunctionDef, createNewEmptyFunctionDef } from './functionDef'

export class Compiler {
  compile(source: string, filename: string): FunctionDef {
    const fd = createNewEmptyFunctionDef(filename)

    return fd
  }
}

export function createNewCompiler() {
  return new Compiler()
}