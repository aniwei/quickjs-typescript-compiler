import { Compiler } from './compiler'

export class TypeScriptCompiler extends Compiler {}

export function createNewTypeScriptCompiler() {
  return new TypeScriptCompiler()
}