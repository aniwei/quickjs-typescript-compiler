import { existsSync, readdirSync, readFileSync, renameSync, rmSync } from 'node:fs'
import path from 'node:path'

const SRC_DIR = path.resolve('__tests__/fixtures_generated')
const DST_DIR = path.resolve('__tests__/fixtures')

function parseComboComment(firstLine: string): string | null {
  // 期望格式：// 组合：a + b + c
  const m = firstLine.match(/^\s*\/\/\s*组合：\s*(.+?)\s*$/)
  return m?.[1] ?? null
}

function slugifyCombo(combo: string): string {
  // 用 '+' 分割，生成可读的 kebab-case。
  const parts = combo
    .split('+')
    .map((s) => s.trim())
    .filter(Boolean)

  const raw = parts.join('-')
  const slug = raw
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[\/_]+/g, '-')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 120)

  return slug || 'fixture'
}

function getIdFromComplexFilename(file: string): string | null {
  const m = file.match(/^complex-(\d+)\.ts$/)
  return m?.[1] ?? null
}

function filesEqual(a: string, b: string): boolean {
  // 这里直接读全文做对比（fixture 很小，足够快且跨平台稳定）
  const ab = readFileSync(a)
  const bb = readFileSync(b)
  if (ab.length !== bb.length) return false
  for (let i = 0; i < ab.length; i++) {
    if (ab[i] !== bb[i]) return false
  }
  return true
}

function main() {
  const args = new Set(process.argv.slice(2))
  const overwrite = args.has('--overwrite')

  if (!existsSync(SRC_DIR)) {
    console.log(`Source dir does not exist: ${SRC_DIR}`)
    return
  }
  if (!existsSync(DST_DIR)) {
    throw new Error(`Destination dir does not exist: ${DST_DIR}`)
  }

  const srcFiles = readdirSync(SRC_DIR)
  const tsFiles = srcFiles.filter((f) => /^complex-\d+\.ts$/.test(f))

  let moved = 0
  let removedDuplicates = 0
  const conflicts: Array<{ src: string; dst: string }> = []
  const skipped: Array<{ file: string; reason: string }> = []

  for (const tsFile of tsFiles) {
    const id = getIdFromComplexFilename(tsFile)
    if (!id) continue

    const tsPath = path.join(SRC_DIR, tsFile)
    const firstLine = readFileSync(tsPath, 'utf8').split(/\r?\n/)[0] ?? ''
    const combo = parseComboComment(firstLine)
    if (!combo) {
      skipped.push({ file: tsFile, reason: 'missing // 组合：... comment' })
      continue
    }

    const slug = slugifyCombo(combo)
    const targetBase = `${slug}-${id}`

    for (const ext of ['.ts', '.js'] as const) {
      const srcName = `complex-${id}${ext}`
      const srcPath = path.join(SRC_DIR, srcName)
      if (!existsSync(srcPath)) continue

      const dstName = `${targetBase}${ext}`
      const dstPath = path.join(DST_DIR, dstName)

      if (existsSync(dstPath)) {
        if (filesEqual(srcPath, dstPath)) {
          rmSync(srcPath)
          removedDuplicates++
          continue
        }

        if (!overwrite) {
          conflicts.push({ src: srcPath, dst: dstPath })
          continue
        }

        // overwrite: remove destination first for cross-platform behavior
        rmSync(dstPath)
      }

      renameSync(srcPath, dstPath)
      moved++
    }
  }

  console.log(
    `migrateFixturesGeneratedToFixtures: moved=${moved}, removedDuplicates=${removedDuplicates}, conflicts=${conflicts.length}, skipped=${skipped.length}`
  )

  if (skipped.length) {
    console.log('Skipped (first 20):')
    for (const s of skipped.slice(0, 20)) console.log(`- ${s.file}: ${s.reason}`)
    if (skipped.length > 20) console.log(`...and ${skipped.length - 20} more`)
  }

  if (conflicts.length) {
    console.log('Conflicts (first 20):')
    for (const c of conflicts.slice(0, 20)) console.log(`- ${c.src} -> ${c.dst}`)
    if (conflicts.length > 20) console.log(`...and ${conflicts.length - 20} more`)

    console.log('Re-run with --overwrite to replace destination files.')
    process.exitCode = 1
  }
}

main()
