import { TypeScriptCompiler } from '../src/index'
import { Opcode } from '../src/env'
import { ModuleExportType } from '../src/functionDef'
import { QuickJSLib } from '../scripts/QuickJSLib'
import { promises as fs } from 'node:fs'
import path from 'node:path'

async function main() {
  const [fixture, ...rest] = process.argv.slice(2)
  const showQuickJs = rest.includes('--quickjs')
  const jsOverrideIndex = rest.indexOf('--js')
  const jsOverride = jsOverrideIndex >= 0 ? rest[jsOverrideIndex + 1] : undefined
  if (!fixture) {
    throw new Error('Usage: tsx tmp/inspectFixture.ts <fixture>')
  }
  const absolute = path.resolve(fixture)
  const compiler = new TypeScriptCompiler({})
  const { functionDef } = await compiler.compileFileWithArtifacts(absolute)
  const atomTable = (compiler as any).atomTable as { getAtomString(id: number): string }
  const { bytecode } = functionDef
  const functionName = atomTable.getAtomString(bytecode.name)
  console.log('Function:', functionName)
  console.log('Instructions:')
  for (const [index, instruction] of bytecode.instructions.entries()) {
    const opcodeName = Opcode[instruction.opcode] ?? `UNKNOWN(${instruction.opcode})`
  const operandText = instruction.operands.map((operand) => operand.toString()).join(', ')
  console.log(index.toString().padStart(3, ' '), opcodeName, operandText)
  }
  console.log('Closure Vars:')
  for (const [index, closure] of bytecode.closureVars.entries()) {
    const name = atomTable.getAtomString(closure.name)
    console.log(index.toString().padStart(3, ' '), name, closure.kind)
  }
  console.log('Line Number Table:')
  for (const entry of bytecode.lineNumberTable) {
    console.log('  pc:', entry.pc, 'line:', entry.line, 'column:', entry.column, 'sourcePos:', entry.sourcePos)
  }
  console.log('pc2line bytes:', bytecode.pc2line)
  console.log('pc2column bytes:', bytecode.pc2column)
  console.log('Global Vars:')
  for (const globalVar of functionDef.globalVars) {
    const name = atomTable.getAtomString(globalVar.name)
    console.log('  name:', name, 'isLexical:', globalVar.isLexical, 'funcPoolIndex:', globalVar.funcPoolIndex, 'forceInit:', globalVar.forceInit)
  }
  console.log('Local Vars:')
  for (const variable of functionDef.vars) {
    const name = atomTable.getAtomString(variable.name)
    console.log('  name:', name, 'slot:', variable.localSlot, 'funcPoolIndex:', variable.funcPoolIndex, 'isCaptured:', variable.isCaptured, 'scopeLevel:', variable.scopeLevel)
  }
  console.log('Args:')
  for (const arg of functionDef.args) {
    const name = atomTable.getAtomString(arg.name)
    console.log('  name:', name, 'funcPoolIndex:', arg.funcPoolIndex)
  }
  if (functionDef.module) {
    console.log('Module exports:')
    for (const entry of functionDef.module.exportEntries) {
      if (entry.type === ModuleExportType.Local) {
        const exported = atomTable.getAtomString(entry.exportedName)
        const localVar = functionDef.vars[entry.localVarIndex]
        const localName = atomTable.getAtomString(localVar?.name ?? -1)
        console.log(`  export ${exported} -> var[${entry.localVarIndex}] (${localName})`)
      }
    }
  }
  if (showQuickJs) {
    let jsPath = jsOverride ? path.resolve(jsOverride) : absolute.replace(/\.ts$/i, '.js')
    let jsSource: string | null = null
    try {
      jsSource = await fs.readFile(jsPath, 'utf-8')
    } catch {
      jsSource = null
    }
    if (jsSource === null) {
      jsSource = await fs.readFile(absolute, 'utf-8')
      jsPath = absolute.replace(/\.ts$/i, '.js')
    }
    const bytecode = await QuickJSLib.compileSource(jsSource, jsPath)
    const assembly = await QuickJSLib.dumpBytesToString(bytecode)
    console.log('\nQuickJS Assembly:\n', assembly)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
