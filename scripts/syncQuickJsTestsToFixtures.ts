import fs from 'node:fs/promises'
import path from 'node:path'

const repoRoot = path.resolve(__dirname, '..')
const quickJsTestsDir = path.join(repoRoot, 'third_party', 'QuickJS', '__tests__')
const outDir = path.join(repoRoot, '__tests__', 'fixtures', 'quickjs-tests')

const INCLUDE_FILES = new Set([
  'assert.js',
  'fixture_cyclic_import.js',
  'microbench.js',
  'repl.js',
  'test_bigint.js',
  'test_bignum.js',
  'test_bjson.js',
  'test_builtin.js',
  'test_closure.js',
  'test_cyclic_import.js',
  'test_ic_atom_free.js',
  'test_language.js',
  'test_line_column_num.js',
  'test_loop.js',
  'test_op_overloading.js',
  'test_promise_gc_crash.js',
  'test_qjscalc.js',
  'test_std.js',
  'test_worker.js',
  'test_worker_module.js',
])

function normalizeNewlines(text: string): string {
  return text.replace(/\r\n/g, '\n')
}

function patchQuickJsTestSource(jsSource: string, jsFileName: string): string {
  const src = normalizeNewlines(jsSource)

  const lines = src.split('\n')
  const hasHashbang = lines[0]?.startsWith('#!') ?? false

  const headerLines: string[] = []
  if (hasHashbang) {
    headerLines.push(lines[0])
    lines.shift()
  }

  headerLines.push(
    '// Generated from QuickJS __tests__/*.js by scripts/syncQuickJsTestsToFixtures.ts',
    '// @ts-nocheck',
    `// Source: third_party/QuickJS/__tests__/${jsFileName}`,
    '',
  )

  // Many QuickJS tests use __loadScript() to load helper assertions.
  // Our fixture pipeline compares compilation outputs; it does not execute.
  // Provide a harmless stub so TypeScript parsing succeeds.
  const needsLoadScriptStub = /\b__loadScript\s*\(/.test(lines.join('\n'))
  if (needsLoadScriptStub) {
    headerLines.push(
      'declare function __loadScript(path: string): void;',
      '',
    )
  }

  return headerLines.join('\n') + lines.join('\n') + '\n'
}

async function main() {
  await fs.mkdir(outDir, { recursive: true })

  const entries = await fs.readdir(quickJsTestsDir, { withFileTypes: true })
  const jsFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith('.js'))
    .map((e) => e.name)
    .filter((name) => INCLUDE_FILES.has(name))
    .sort((a, b) => a.localeCompare(b))

  if (jsFiles.length === 0) {
    throw new Error(`No .js tests found in ${quickJsTestsDir} (or INCLUDE_FILES mismatch)`) 
  }

  let wrote = 0
  for (const jsFile of jsFiles) {
    const srcPath = path.join(quickJsTestsDir, jsFile)
    const outFile = jsFile.replace(/\.js$/, '.ts')
    const dstPath = path.join(outDir, outFile)

    const jsSource = await fs.readFile(srcPath, 'utf8')
    const tsSource = patchQuickJsTestSource(jsSource, jsFile)

    await fs.writeFile(dstPath, tsSource, 'utf8')
    wrote++
  }

  console.log(`Synced ${wrote} QuickJS test fixture(s) into ${outDir}`)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
