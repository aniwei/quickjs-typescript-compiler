const { spawnSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

module.exports = async () => {
  const envPath = path.resolve(process.cwd(), 'src/env.ts')
  if (fs.existsSync(envPath)) return
  // generate env.ts before tests
  const r = spawnSync('pnpm', ['-s', 'exec', 'tsx', 'scripts/getEnv.ts'], { stdio: 'inherit' })
  if (r.status !== 0) {
    // throw to fail fast if generation failed
    throw new Error('Failed to generate src/env.ts before tests')
  }
}
