import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { resolve, join, basename } from 'node:path'
import { compileToIR } from '../src/compile'
import { emitBytecode } from '../src/bytecode';
import { serialize, writeModule } from '../src/assembler';


async function compileWithTs(jsPath: string) {
  const src = readFileSync(jsPath, 'utf8');
  const ir = compileToIR(src, jsPath)

  const { 
    code, 
    constants, 
    atoms, 
    localCount, 
    stackSize, 
    locals,
    localKinds,
    labels,
    sourceMarks
  } = emitBytecode(ir)

  const debug = process.argv.includes('--debug')
  const strict = process.argv.includes('--strict')
  const base = basename(jsPath)
  const debugFilename = base.replace(/\.ts$/i, '.js')
  const capturedLocals = (ir as any).__capturedLocals as string[] | undefined
  const localsMapObj: Record<string, number> = Object.fromEntries(locals.entries())
  const localKindsObj: Record<string, 'var' | 'let' | 'const'> = localKinds ? Object.fromEntries(localKinds.entries()) as any : {}

  const mod = serialize({ 
    code, 
    constants, 
    atoms, 
    localCount, 
    stackSize, 
    sourceMarks,
    // 当存在严格模式或启用 --debug 时，总是携带规范化的 debug 文件名，确保 has_debug 与文件名原子对齐
    debug: (debug || strict) ? { filename: debugFilename, strict } : undefined as any, 
    localsMap: localsMapObj, 
    localKindsMap: localKindsObj,
    capturedLocals 
  })
  
  const outPath = resolve(process.cwd(), jsPath)
  const outBin = outPath.replace(/\.js$/, '.ts.bin')

  writeModule(mod, outBin)
}

async function main() {
  const inputTs = resolve(process.cwd(), process.argv[2])
  const inputJs = inputTs.replace(/\.ts$/, '.js')

  if (!existsSync(inputJs)) {
    throw new Error('Input JavaScript file does not exist')
  }

  try {
    await compileWithTs(inputJs)
  } catch (e: any) {
    throw new Error('Failed to compile with WASM: ' + e.message)
  }
}

main().catch(e => { console.error(e.stack || String(e)); process.exit(1) })
