import { TypeScriptCompiler } from '../src/index'
import { promises as fs } from 'node:fs'
import path from 'node:path'

async function main() {
  const [fixture, funcName] = process.argv.slice(2)
  if (!fixture) {
    throw new Error('Usage: tsx tmp/dumpFunctionInfo.ts <fixture> [functionName]')
  }
  const absolute = path.resolve(fixture)
  const compiler = new TypeScriptCompiler({})
  const { functionDef } = await compiler.compileFileWithArtifacts(absolute)
  const atomTable = (compiler as any).atomTable as { getAtomString(id: number): string }
  // @ts-ignore accessing private helper for debugging
  const getLineColumnFromUtf8Offset = (compiler as any).getLineColumnFromUtf8Offset.bind(compiler) as (offset: number) => { line: number; column: number }

  const collect = (func: any, list: any[]) => {
    list.push(func)
    if (Array.isArray(func.children)) {
      for (const child of func.children) {
        collect(child, list)
      }
    }
  }

  const functions: any[] = []
  collect(functionDef, functions)

  const targetName = funcName ?? null

  for (const func of functions) {
    const name = atomTable.getAtomString(func.bytecode.name)
    if (targetName && name !== targetName) {
      continue
    }
    const sourcePos = func.sourcePos ?? -1
    const { line, column } = sourcePos >= 0 ? getLineColumnFromUtf8Offset(sourcePos) : { line: -1, column: -1 }
    console.log(`Function ${name} sourcePos=${sourcePos} line=${line} column=${column}`)
    console.log('pc2line bytes:', func.bytecode.pc2line)
    console.log('pc2column bytes:', func.bytecode.pc2column)
    console.log('---')
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
