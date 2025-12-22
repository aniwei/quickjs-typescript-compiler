import { readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import ts from 'typescript'
import { TypeScriptCompiler } from '../src/TypeScriptCompiler'
import { DebugInfoBuilder } from '../src/compiler/DebugInfoBuilder'

function usage(): never {
  console.error('Usage: pnpm -s exec tsx scripts/debug_pc2line_fixture.ts <fixture.ts> [--func <name>]')
  process.exit(1)
}

const args = process.argv.slice(2)
if (args.length === 0) usage()

let input: string | undefined
let filterName: string | undefined
for (let i = 0; i < args.length; i++) {
  const a = args[i]
  if (a === '--func') {
    filterName = args[++i]
    if (!filterName) usage()
  } else if (!input) {
    input = a
  } else {
    usage()
  }
}
if (!input) usage()

const absoluteInput = path.resolve(process.cwd(), input)
const tsCode = readFileSync(absoluteInput, 'utf8')

// Match scripts/compareWithWasm.ts stripTypeScript() behavior so the
// source positions/columns align with the comparison pipeline.
const transpiled = ts.transpileModule(tsCode, {
  fileName: path.basename(absoluteInput),
  reportDiagnostics: false,
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ESNext,
    jsx: ts.JsxEmit.Preserve,
    importHelpers: false,
    esModuleInterop: false,
  },
})

const source = transpiled.outputText || tsCode

const compiler = new TypeScriptCompiler()

// Hook to observe pc2line inputs/outputs.
const originalCompute = DebugInfoBuilder.computePc2LineInfo.bind(DebugInfoBuilder)
DebugInfoBuilder.computePc2LineInfo = function (fd: any) {
  const name = fd.funcName || '<eval>'
  if (filterName && name !== filterName) {
    return originalCompute(fd)
  }

  console.log(`=== computePc2LineInfo: ${name} ===`)
  console.log(`sourcePos=${fd.sourcePos} lineNumberSize=${fd.lineNumberSize} lineNumberCount=${fd.lineNumberCount}`)
  for (let i = 0; i < fd.lineNumberCount; i++) {
    const slot = fd.lineNumberSlots[i]
    let lc = ''
    if (fd.getLineColCache && fd.source && slot.sourcePos >= 0) {
      const [ln, col] = DebugInfoBuilder.getLineColCached(fd.getLineColCache, fd.source, slot.sourcePos)
      lc = ` (line=${ln + 1}, col=${col + 1})`
    }
    console.log(`  slot[${i}]: pc=${slot.pc} sourcePos=${slot.sourcePos}${lc}`)
  }

  originalCompute(fd)

  const bytes = [...fd.pc2line.data()].map((b: number) => b.toString(16).padStart(2, '0')).join(' ')
  console.log(`pc2lineLen=${fd.pc2line.size} pc2line=${bytes}`)
}

compiler.compile(source, path.basename(absoluteInput))
