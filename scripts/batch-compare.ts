import { readdirSync, existsSync } from 'node:fs'
import { join, resolve, basename } from 'node:path'
import { spawnSync } from 'node:child_process'

interface CaseResult {
  name: string
  ok: boolean
  note?: string
}

function runCompare(
  tsPath: string,
  jsPath: string,
  passDisasm: boolean,
  sideBySide: boolean,
  passDot: boolean,
  artifactsDir?: string,
  normalizeShort?: boolean,
): CaseResult {
  // use compare-with-wasm which can fallback to qjsc; supports --normalize-short
  const args = ['-s', 'exec', 'tsx', 'scripts/compare-with-wasm.ts', tsPath, '--input-js', jsPath]

  if (passDisasm) args.push('--disasm')
  if (sideBySide) args.push('--side-by-side')
  if (normalizeShort) args.push('--normalize-short')
  if (passDot) args.push('--dot')
  if (artifactsDir) args.push('--artifacts-dir', artifactsDir)

  const r = spawnSync('pnpm', args, { encoding: 'utf8' })

  if (r.status === 0) {
    return { name: basename(tsPath), ok: true }
  }

  return { name: basename(tsPath), ok: false, note: (r.stdout + '\n' + r.stderr).trim() }
}

function main() {
  const root = process.cwd()
  const dir = resolve(root, '__tests__')
  const files = readdirSync(dir)
  const cases: Array<{ ts: string, js: string }> = []

  for (const f of files) {
    if (!f.endsWith('.ts')) continue

    const tsPath = join(dir, f)
    const stem = f.slice(0, -3)
    const jsPath = join(dir, stem + '.js')
    const refPath = join(dir, 'ref.js')
    
    if (existsSync(jsPath)) {
      cases.push({ ts: tsPath, js: jsPath })
    } else if (existsSync(refPath)) {
      cases.push({ ts: tsPath, js: refPath })
    }
  }

  if (!cases.length) {
    console.log('No TS/JS pairs found under __tests__.')
    process.exit(0)
  }

  const results: CaseResult[] = []
  const passDisasm = process.argv.includes('--disasm-all')
  const sideBySide = process.argv.includes('--side-by-side')
  const passDot = process.argv.includes('--dot')
  const normalizeShort = process.argv.includes('--normalize-short') || process.argv.includes('--normalize')
  const artIdx = process.argv.indexOf('--artifacts-dir')
  const artifactsDir = artIdx >= 0 ? process.argv[artIdx + 1] : undefined

  // Optional filename filter: --filter=prefix or glob-ish suffix
  const fIdx = process.argv.findIndex(a => a.startsWith('--filter='))
  const filter = fIdx >= 0 ? process.argv[fIdx].slice('--filter='.length) : ''

  for (const c of cases) {
    if (filter) {
      const base = basename(c.ts)
      if (!base.includes(filter)) continue
    }
    console.log(`\n=== Comparing ${basename(c.ts)} vs ${basename(c.js)} ===`)
    results.push(runCompare(c.ts, c.js, passDisasm, sideBySide, passDot, artifactsDir, normalizeShort))
  }

  const ok = results.filter(r => r.ok).length
  const fail = results.length - ok

  console.log(`\nSummary: total=${results.length} pass=${ok} fail=${fail}`)
  
  if (fail) {
    console.log('\nFailures:')
    for (const r of results.filter(r => !r.ok)) {
      console.log(`- ${r.name}:`)
      if (r.note) {
        // shrink noisy outputs; keep last 200 lines
        const lines = r.note.split(/\r?\n/)
        const tail = lines.slice(Math.max(0, lines.length - 200)).join('\n')
        console.log(tail)
      }
    }
    process.exit(1)
  }
}

if (require.main === module) main()
