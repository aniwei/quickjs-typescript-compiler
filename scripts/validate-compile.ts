import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

const cli = resolve(process.cwd(), 'src/cli.ts')
// Pass through additional args (e.g., --format=quickjs)
const extra = process.argv.slice(2)
const r = spawnSync('npx', ['tsx', cli, '__tests__/compute.ts', ...extra], { env: { ...process.env, DUMP_ASM: '1' }, stdio: 'inherit' })
process.exit(r.status ?? 1)
