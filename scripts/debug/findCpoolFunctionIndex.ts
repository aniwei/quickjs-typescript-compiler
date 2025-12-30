#!/usr/bin/env tsx

import fs from 'node:fs'
import { parseBytecodeModule } from '../../src/bytecodeReader'

const qbcPath = process.argv[2]
const name = process.argv[3]

if (!qbcPath || !name) {
  console.error('Usage: tsx scripts/debug/findCpoolFunctionIndex.ts <file.qbc> <funcName>')
  process.exit(1)
}

const mod = parseBytecodeModule(fs.readFileSync(qbcPath))

const cp = mod.func.cpool || []
const hits: any[] = []
for (let i = 0; i < cp.length; i++) {
  const e = cp[i]
  if (e && typeof e === 'object' && e.tag === 12) {
    if (e.funcName === name) {
      hits.push({ cpoolIndex: i, funcName: e.funcName, bytecodeLen: e.bytecodeLen, funcNameAtom: e.funcNameAtom })
    }
  }
}

console.log(JSON.stringify({ qbcPath, name, cpoolCount: cp.length, hits }, null, 2))
