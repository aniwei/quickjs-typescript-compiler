import { promises as fs } from 'node:fs'
import path from 'node:path'
import { TypeScriptCompiler } from '../src'
import { parseBytecodeModule } from '../src/bytecodeReader'
import { PC2Line } from '../src/env'
import { QuickJSLib } from './QuickJSLib'
import { getOpcodeDefinition, getOpcodeName } from '../src/utils/opcode'

async function main() {
  const target = process.argv[2] ?? path.join('__tests__', 'compiler', 'fixtures', 'function-add.ts')
  const fixturePath = path.resolve(target)
  const source = await fs.readFile(fixturePath, 'utf-8')
  const jsFixturePath = fixturePath.replace(/\.ts$/i, '.js')
  const jsSource = await fs.readFile(jsFixturePath, 'utf-8')
  const relative = path.relative(process.cwd(), fixturePath)
  const moduleFileName = relative.replace(/\.(cts|mts|tsx|ts)$/i, (match) => {
    switch (match.toLowerCase()) {
      case '.cts':
        return '.cjs'
      case '.mts':
        return '.mjs'
      default:
        return '.js'
    }
  })

  const compiler = new TypeScriptCompiler()
  const { functionDef, bytecode: tsBytecode } = await compiler.compileSourceWithArtifacts(source, moduleFileName)
  const quickjsBytecode = await QuickJSLib.compileSource(jsSource, moduleFileName)
  console.log('fixture', relative)
  console.log('moduleFileName', moduleFileName)
  console.log('lengths', tsBytecode.length, quickjsBytecode.length)
  let mismatch = -1
  for (let index = 0; index < Math.max(tsBytecode.length, quickjsBytecode.length); index += 1) {
    if (tsBytecode[index] !== quickjsBytecode[index]) {
      mismatch = index
      break
    }
  }
  console.log('mismatch index', mismatch)
  if (mismatch >= 0) {
    console.log('ts', tsBytecode[mismatch], 'quickjs', quickjsBytecode[mismatch])
    console.log('ts slice', Array.from(tsBytecode.slice(Math.max(0, mismatch - 8), mismatch + 8)))
    console.log('quickjs slice', Array.from(quickjsBytecode.slice(Math.max(0, mismatch - 8), mismatch + 8)))
  }
  const atomTable = (compiler as any).atomTable
  console.log('vars', functionDef.vars.map((variable) => ({
    name: atomTable.getAtomString(variable.name),
    scopeLevel: variable.scopeLevel,
    kind: variable.kind,
    isCaptured: variable.isCaptured,
  })))
  console.log('bytecode.varDefs', functionDef.bytecode.varDefs.map((entry) => ({
    name: atomTable.getAtomString(entry.name),
    scopeLevel: entry.scopeLevel,
    scopeNext: entry.scopeNext,
    isConst: entry.isConst,
    isLexical: entry.isLexical,
    isCaptured: entry.isCaptured,
    kind: entry.kind,
  })))
  console.log('bytecode.argDefs', functionDef.bytecode.argDefs.map((entry) => ({
    name: atomTable.getAtomString(entry.name),
    scopeLevel: entry.scopeLevel,
    scopeNext: entry.scopeNext,
    isConst: entry.isConst,
    isLexical: entry.isLexical,
    isCaptured: entry.isCaptured,
    kind: entry.kind,
  })))
  console.log('lineNumberTable', functionDef.bytecode.lineNumberTable)
  console.log('pc2line', functionDef.bytecode.pc2line)
  console.log('pc2column', functionDef.bytecode.pc2column)
  const parsedTs = parseBytecodeModule(tsBytecode)
  const parsedQjs = parseBytecodeModule(quickjsBytecode)
  console.log('parsed.ts.varDefs', parsedTs.root.function.varDefs)
  console.log('parsed.qjs.varDefs', parsedQjs.root.function.varDefs)
  console.log('parsed.ts.debug', parsedTs.root.function.debug)
  console.log('parsed.qjs.debug', parsedQjs.root.function.debug)
  console.log('parsed.ts.constants', parsedTs.root.function.constantPool)
  console.log('parsed.qjs.constants', parsedQjs.root.function.constantPool)
  const tsInnerFunc = parsedTs.root.function.constantPool[0]?.value as any
  const qjsInnerFunc = parsedQjs.root.function.constantPool[0]?.value as any
  if (tsInnerFunc && tsInnerFunc.type === 'function') {
    console.log('tsInner.varDefs', tsInnerFunc.varDefs)
    console.log('tsInner.debug', tsInnerFunc.debug)
  }
  if (qjsInnerFunc && qjsInnerFunc.type === 'function') {
    console.log('qjsInner.varDefs', qjsInnerFunc.varDefs)
    console.log('qjsInner.debug', qjsInnerFunc.debug)
  }
  const innerDef = functionDef.children[0]
  if (innerDef) {
    console.log('inner lineNumberTable', innerDef.bytecode.lineNumberTable)
    console.log('inner instructions', innerDef.bytecode.instructions)
  }
  console.log('decoded.tsInner.pc2line', decodePc2Line(tsInnerFunc?.debug?.pc2line ?? []))
  console.log('decoded.qjsInner.pc2line', decodePc2Line(qjsInnerFunc?.debug?.pc2line ?? []))
  console.log('scopes', functionDef.scopes.map((scope, index) => ({
    index,
    parent: scope.parent,
    kind: scope.kind,
  })))
  console.log('decoded.ts.pc2line', decodePc2Line(functionDef.bytecode.pc2line))
  const wasmPc2 = parsedQjs.root.function.debug?.pc2line ?? []
  console.log('decoded.qjs.pc2line', decodePc2Line(wasmPc2))
  console.log('instructionOffsets', computeInstructionOffsets(functionDef.bytecode.instructions))
  console.log('instructions', functionDef.bytecode.instructions.map((instruction, index) => ({
    index,
    opcode: instruction.opcode,
    name: getOpcodeName(instruction.opcode),
    operands: instruction.operands,
  })))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

function decodePc2Line(data: number[]): Array<{ pc: number; line: number; column: number }> {
  if (data.length === 0) {
    return []
  }
  let offset = 0
  const readULEB = () => {
    let result = 0
    let shift = 0
    while (offset < data.length) {
      const byte = data[offset++]
      result |= (byte & 0x7f) << shift
      if ((byte & 0x80) === 0) {
        break
      }
      shift += 7
    }
    return result >>> 0
  }
  const readSLEB = () => {
    const encoded = readULEB()
    return ((encoded >>> 1) ^ -(encoded & 1)) | 0
  }

  const entries: Array<{ pc: number; line: number; column: number }> = []
  let line = readULEB()
  let column = readULEB()
  let pc = 0
  entries.push({ pc, line, column })
  while (offset < data.length) {
    const op = data[offset++]
    let diffPc = 0
    let diffLine = 0
    if (op === 0) {
      diffPc = readULEB()
      diffLine = readSLEB()
    } else {
      const delta = op - PC2Line.PC2LINE_OP_FIRST
      diffPc = Math.floor(delta / PC2Line.PC2LINE_RANGE)
      diffLine = PC2Line.PC2LINE_BASE + (delta % PC2Line.PC2LINE_RANGE)
    }
    const diffColumn = readSLEB()
    pc += diffPc
    line += diffLine
    column += diffColumn
    entries.push({ pc, line, column })
  }
  return entries
}

function computeInstructionOffsets(instructions: Array<{ opcode: number; operands: number[] }>): number[] {
  const offsets: number[] = []
  let offset = 0
  for (const instruction of instructions) {
    offsets.push(offset)
    const def = getOpcodeDefinition(instruction.opcode)
    offset += def?.size ?? 1
  }
  return offsets
}
