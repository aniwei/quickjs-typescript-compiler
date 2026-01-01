#!/usr/bin/env tsx

import fs from 'node:fs'
import { parseBytecodeModule } from '../../src/bytecodeReader'

type FuncLike = any

function collectFuncs(root: FuncLike): Array<{ f: FuncLike; path: string }> {
  const out: Array<{ f: FuncLike; path: string }> = []
  const seen = new Set<FuncLike>()
  const stack: Array<{ f: FuncLike; path: string }> = [{ f: root, path: 'root' }]

  while (stack.length) {
    const cur = stack.pop()!
    if (!cur.f || seen.has(cur.f)) continue
    seen.add(cur.f)
    out.push(cur)

    const cp = cur.f.cpool || []
    for (let i = 0; i < cp.length; i++) {
      const e = cp[i]
      if (e && typeof e === 'object' && e.tag === 12) {
        stack.push({ f: e, path: `${cur.path}.cpool[${i}]` })
      }
    }
  }

  return out
}

const qbcPath = process.argv[2]
const bytecodeLen = process.argv[3] ? Number(process.argv[3]) : undefined

if (!qbcPath) {
  console.error('usage: pnpm -s exec tsx scripts/debug/inspectPc2lineByBytecodeLen.ts <file.qbc> [bytecodeLen]')
  process.exit(2)
}

const mod = parseBytecodeModule(fs.readFileSync(qbcPath))
const funcs = collectFuncs(mod.func)

const rows = funcs
  .map(({ f, path }) => ({
    path,
    funcNameAtom: f.funcNameAtom ?? null,
    funcName: f.funcName ?? null,
    bytecodeLen: f.bytecodeLen ?? f.bytecode?.length ?? null,
    pc2lineLen: f.debug?.pc2line?.length ?? null,
    func_name: f.debug?.func_name ?? null,
    filename: f.debug?.filename ?? null,
    line: f.debug?.line_num ?? null,
    col: f.debug?.column_num ?? null,
  }))
  .filter((r) => (bytecodeLen ? r.bytecodeLen === bytecodeLen : true))
  .sort((a, b) => {
    const da = (a.bytecodeLen ?? 0) - (b.bytecodeLen ?? 0)
    if (da) return da
    const pa = a.path
    const pb = b.path
    return pa < pb ? -1 : pa > pb ? 1 : 0
  })

console.log(JSON.stringify({ qbcPath, bytecodeLen: bytecodeLen ?? null, totalFuncs: funcs.length, rows }, null, 2))
