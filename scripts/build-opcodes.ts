import { writeFileSync } from 'node:fs'
import { OPCODE_CONFIG } from '../opcode.config'
import { resolve } from 'node:path'

interface Features { bigInt: boolean; shortOpcodes: boolean }

function generate (features: Features) {
  const filtered = OPCODE_CONFIG.filter(e => {
    if (e.feature === 'bigInt' && !features.bigInt) return false
    if (e.feature === 'short' && !features.shortOpcodes) return false
    return true
  })
  const enumLines = ['export enum OpCode {']
  const metaLines: string[] = []
  filtered.forEach(entry => {
    enumLines.push(`  OP_${entry.name} = ${entry.code},`)
    metaLines.push(`  { name: 'OP_${entry.name}', code: ${entry.code}, size: ${entry.size}, fmt: '${entry.fmt}' },`)
  })
  enumLines.push('}')
  const content = `// Generated from opcode.config.ts (manual subset)\n` +
`// Features: bigInt=${features.bigInt}, shortOpcodes=${features.shortOpcodes}\n` +
`${enumLines.join('\n')}\n\n` +
`export interface OpMeta { name: string; code: number; size: number; fmt: string }\n` +
`export const OPCODE_META: OpMeta[] = [\n${metaLines.join('\n')}\n] as const\n` +
`export const OPCODE_LOOKUP: Record<number, OpMeta> = Object.fromEntries(OPCODE_META.map(m=>[m.code,m]))\n`
  writeFileSync(resolve(process.cwd(), 'src/opcodes.ts'), content, 'utf8')
}

if (require.main === module) {
  const features: Features = {
    bigInt: process.env.FEATURE_BIGINT === '1',
    shortOpcodes: process.env.FEATURE_SHORT === '1'
  }
  generate(features)
}

export { generate }
