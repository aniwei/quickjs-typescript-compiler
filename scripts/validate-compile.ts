import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

// 直接使用 tsx 执行源文件，避免必须先 build 才能看到最新 CLI 输出
const cliSrc = resolve(process.cwd(), 'src/cli.ts')
// Pass through additional args (e.g., --format=quickjs)
const extra = process.argv.slice(2)
const r = spawnSync('npx', ['tsx', cliSrc, '__tests__/compute.ts', ...extra], { env: { ...process.env, DUMP_ASM: '1' }, stdio: 'inherit' })
process.exit(r.status ?? 1)
