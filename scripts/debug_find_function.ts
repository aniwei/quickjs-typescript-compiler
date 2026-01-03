import { readFileSync } from 'node:fs'
import { parseBytecodeModule, type FunctionBytecode } from '../src/bytecodeReader'
import { createAdvancedDisassembly } from '../src/disasm'

type FuncPath = number[]

function iterInner(func: FunctionBytecode): FunctionBytecode[] {
  const out: FunctionBytecode[] = []
  for (const entry of func.cpool ?? []) {
    if (entry && typeof entry === 'object' && (entry as any).tag === 12) {
      out.push(entry as FunctionBytecode)
    }
  }
  return out
}

function formatPath(path: FuncPath): string {
  return path.length === 0 ? 'outer' : `inner(${path.join('.')})`
}

function* walk(func: FunctionBytecode, path: FuncPath = []): Generator<{ func: FunctionBytecode; path: FuncPath }> {
  yield { func, path }
  const inner = iterInner(func)
  for (let i = 0; i < inner.length; i++) {
    yield* walk(inner[i], [...path, i])
  }
}

function main() {
  const inFile = process.argv[2]
  const needle = process.argv[3] ?? 'termInit'
  if (!inFile) {
    console.error('Usage: tsx scripts/debug_find_function.ts <input.qbc> [nameSubstr]')
    process.exit(1)
  }

  const bytes = readFileSync(inFile)
  const mod = parseBytecodeModule(bytes)

  const hits: Array<{ func: FunctionBytecode; path: FuncPath }> = []
  for (const item of walk(mod.func)) {
    const name = item.func.funcName ?? ''
    if (name.includes(needle)) hits.push(item)
  }

  if (hits.length === 0) {
    console.error(`No functions matched ${JSON.stringify(needle)} in ${inFile}`)
    process.exit(2)
  }

  for (const h of hits) {
    const f = h.func
    console.log(`\n=== Match: ${formatPath(h.path)} name=${JSON.stringify(f.funcName)} atom=${f.funcNameAtom} ===`)
    console.log(`bytecodeLen=${f.bytecodeLen} stackSize=${f.stackSize} varCount=${f.varCount} argCount=${f.argCount} closureVars=${f.closureVarCount}`)
    if (f.closureVars.length) {
      console.log('closureVars:')
      for (const [i, cv] of f.closureVars.entries()) {
        console.log(`  ${i}: name=${cv.name ?? cv.nameAtom} varIdx=${cv.varIdx} flags=${cv.flags}`)
      }
    }
    console.log(createAdvancedDisassembly(f.bytecode))
  }
}

main()
