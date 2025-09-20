import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

const cli = resolve(process.cwd(), 'src/cli.ts')
// Input file + passthrough args (e.g., --format=quickjs)
const [input, ...rest] = process.argv.slice(2)
const file = input || '__tests__/compute.ts'
const r = spawnSync('npx', ['tsx', cli, file, ...rest], { env: { ...process.env, DUMP_ASM: '1' }, stdio: 'inherit' })
process.exit(r.status ?? 1)
