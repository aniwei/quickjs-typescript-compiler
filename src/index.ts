import { Compiler } from './compiler'

export class TypeScriptCompiler extends Compiler {}

export function createNewTypeScriptCompiler(
  fileName: string,
  sourceCode: string
) {
  return new TypeScriptCompiler(
    fileName,
    sourceCode
  )
}