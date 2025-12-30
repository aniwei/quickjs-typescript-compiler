import fs from 'node:fs'
import { parseBytecodeModule } from '../../src/bytecodeReader'

const qbcPath = process.argv[2] ?? '__tests__/fixtures/quickjs-tests/microbench.qbc'

const mod = parseBytecodeModule(fs.readFileSync(qbcPath))

type FuncLike = any

function collectFuncs(root: FuncLike): FuncLike[] {
  const funcs: FuncLike[] = []
  const seen = new Set<FuncLike>()
  const stack: FuncLike[] = [root]
  while (stack.length) {
    const f = stack.pop()!
    if (!f || seen.has(f)) continue
    seen.add(f)
    funcs.push(f)
    const cp = f.cpool || []
    for (const e of cp) {
      if (e && typeof e === 'object' && e.tag === 12) {
        stack.push(e)
      }
    }
  }
  return funcs
}

const funcs = collectFuncs(mod.func)

const hits: Array<{
  i: number
  bytecodeLen: number
  hasDebug: boolean
  funcName?: string
  funcNameAtom?: number
  func_name?: string
  filename?: string
}> = []

for (let i = 0; i < funcs.length; i++) {
  const bc: Uint8Array | undefined = funcs[i].bytecode
  if (!bc || bc.length < 24) continue
  if (bc[20] === 236 && bc[22] === 67) {
    hits.push({
      i,
      bytecodeLen: bc.length,
      hasDebug: !!funcs[i].debug,
      funcName: funcs[i].funcName,
      funcNameAtom: funcs[i].funcNameAtom,
      func_name: funcs[i].debug?.func_name,
      filename: funcs[i].debug?.filename,
    })
  }
}

console.log(JSON.stringify({ qbcPath, totalFuncs: funcs.length, hits }, null, 2))
