// Minimal parser for our serialized QuickJS-like function object (single function)

export interface ParsedQuickJSFunction {
  version: number
  atoms: string[]
  flags: number
  jsMode: number
  funcName: string
  argCount: number
  varCount: number
  definedArgCount: number
  stackSize: number
  closureVarCount: number
  cpoolCount: number
  byteCodeLen: number
  bytecode?: Uint8Array
  hasDebug: boolean
  constants: any[]
  closureVars?: { name: string; varIdx: number; flags: number }[]
}

export function parseQuickJS(buf: Buffer): ParsedQuickJSFunction {
  let off = 0
  const version = buf[off++]
  const offRef = { off }
  const { readUlebFrom, readSlebFrom } = require('./leb128') as typeof import('./leb128')
  const readUleb = () => readUlebFrom(buf, offRef)
  const readSleb = () => readSlebFrom(buf, offRef)
  // atoms
  const atomCount = readUleb()
  const atoms: string[] = []
  for (let i = 0; i < atomCount; i++) {
    const len = readUleb()
    const s = buf.slice(offRef.off, offRef.off + len).toString('utf8')
    offRef.off += len
    atoms.push(s)
  }
  const tag = buf[offRef.off++]
  if (tag !== 0x13) throw new Error('Not a function bytecode tag: ' + tag)
  const flags = buf[offRef.off] | (buf[offRef.off + 1] << 8); offRef.off += 2
  const jsMode = buf[offRef.off++]
  function readAtomRef(): string {
    const v = readUleb()
    if (v & 1) {
      // tagged int
      return String(v >> 1)
    }
    let idx = v >> 1
    // 兼容新编码: ( (JS_ATOM_END_SIM + realIdx) <<1 )
    // 我们不知道 JS_ATOM_END_SIM 真实值, 但之前序列化用 (1<<24)
    const SIM = 1 << 24
    if (idx >= SIM) idx -= SIM
    return atoms[idx]
  }
  const funcName = readAtomRef()
  const argCount = readUleb()
  const varCount = readUleb()
  const definedArgCount = readUleb()
  const stackSize = readUleb()
  const closureVarCount = readUleb()
  const cpoolCount = readUleb()
  const byteCodeLen = readUleb()
  const vardefsCount = readUleb()
  for (let i = 0; i < vardefsCount; i++) {
    ;(function skipAtom(){ readUleb() })() // atom ref (skip)
    readUleb() // scope_level
    readUleb() // scope_next+1
    offRef.off += 1 // flags
  }
  // closure vars appear next in new layout
  const closureVars: { name: string; varIdx: number; flags: number }[] = []
  for (let i = 0; i < closureVarCount; i++) {
    const name = readAtomRef()
    const varIdx = readUleb()
    const f = buf[offRef.off++]
    closureVars.push({ name, varIdx, flags: f })
  }
  // then bytecode
  const bytecode = buf.slice(offRef.off, offRef.off + byteCodeLen)
  offRef.off += byteCodeLen
  let hasDebug = (flags & (1 << 10)) !== 0
  if (hasDebug) {
    readAtomRef() // filename atom
    const pc2len = readUleb(); offRef.off += pc2len
    const sourceLen = readUleb(); offRef.off += sourceLen
  }
  const constants: any[] = []
  for (let i = 0; i < cpoolCount; i++) {
    const t = buf[offRef.off++]
    switch (t) {
      case 1: constants.push(null); break
      case 2: constants.push(undefined); break
      case 3: constants.push(false); break
      case 4: constants.push(true); break
      case 5: constants.push(readSleb()); break
      case 6: {
        const dv = buf.readDoubleLE(offRef.off); offRef.off += 8; constants.push(dv); break
      }
      case 7: {
        const len = readUleb(); const s = buf.slice(offRef.off, offRef.off + len).toString('utf8'); offRef.off += len; constants.push(s); break
      }
      default: throw new Error('Unsupported const tag ' + t)
    }
  }
  return { version, atoms, flags, jsMode, funcName, argCount, varCount, definedArgCount, stackSize, closureVarCount, cpoolCount, byteCodeLen, bytecode, hasDebug, constants, closureVars }
}
