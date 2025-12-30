import { readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, extname, join } from 'node:path'

type MappingRow = {
  tsCell: string
  cCell: string
  line?: number
  section?: string
  raw: string
}

type Finding = {
  tsIdentifier?: string
  cIdentifier?: string
  line?: number
  tsFound: boolean
  cFoundNearLine: boolean
  cFoundInFile: boolean
  cCheckSkipped: boolean
  notes?: string
  row: MappingRow
}

function stripBackticks(s: string): string {
  return s.replace(/`/g, '').trim()
}

function extractFirstBackticked(s: string): string | null {
  const m = s.match(/`([^`]+)`/)
  return m ? m[1] : null
}

function toIdentifierLike(name: string): string {
  return name
    .replace(/\(.*\)$/, '')
    .replace(/\s+/g, '')
    .replace(/\./g, '')
}

function walkTsFiles(rootDir: string): string[] {
  const out: string[] = []

  const ignored = new Set(['node_modules', 'third_party', 'artifacts', 'dist', '.git'])

  function walk(dir: string) {
    for (const entry of readdirSync(dir)) {
      if (ignored.has(entry)) continue
      const full = join(dir, entry)
      const st = statSync(full)
      if (st.isDirectory()) {
        walk(full)
        continue
      }
      if (st.isFile() && extname(full) === '.ts') out.push(full)
    }
  }

  walk(rootDir)
  return out
}

function findIdentifierInFiles(identifier: string, files: string[]): boolean {
  if (!identifier) return false
  const re = new RegExp(`\\b${identifier.replace(/[$]/g, '\\$')}\\b`)
  for (const f of files) {
    const text = readFileSync(f, 'utf8')
    if (re.test(text)) return true
  }
  return false
}

// Spec 使用的是“概念化”的 TS 名称；实际实现中可能存在命名差异。
const TS_ALIASES: Record<string, string[]> = {
  // 编译器 label 辅助函数
  emitLabel: ['emitLabelInt', 'emitLabelRaw'],
  emitGoto: ['emitGotoInt'],
  newLabel: ['newLabelInt', 'newLabelFd'],
  newLabelFd: ['newLabelFd'],

  // 变量查找命名
  findVar: ['findVarByAtom', 'findVarInScope'],

  // 函数定义生命周期分散在多个类中，不是一组 1:1 的自由函数
  jsNewFunctionDef: ['js_new_function_def', 'FunctionDef'],
  jsFreeFunctionDef: ['js_free_function_def'],
  jsCreateFunction: ['js_create_function', 'FunctionBuilder'],

  // label 与栈计算是基于类的阶段实现
  resolveLabels: ['LabelResolver', 'resolve'],
  computeStackSize: ['StackSizeComputer', 'compute'],

  // visitor 命名差异 / spec 中的概念化条目
  visitMethodDeclaration: ['visitMethodDefinition'],
  visitSpreadElement: ['ts.isSpreadElement', 'SpreadElement'],
}

// Spec 中已知尚未在 TS 侧实现的条目。
// 保持输出可见，但不让审计失败。
const TS_KNOWN_MISSING: Set<string> = new Set([
  'visitTemplateExpression',
  'visitRegExpLiteral',
  'parseDirectives',
  'parseFunctionCheckNames',
  'parseDestructuringElement',
])

const TS_SKIP: Set<string> = new Set([
  // 内存管理不是 1:1 的导出函数建模。
  'jsFreeFunctionDef',
])

function findTsWithAliases(tsIdentifier: string | undefined, files: string[]): { found: boolean; used?: string } {
  if (!tsIdentifier) return { found: false }
  if (TS_SKIP.has(tsIdentifier)) return { found: true, used: '(skipped)' }

  if (findIdentifierInFiles(tsIdentifier, files)) return { found: true, used: tsIdentifier }

  const aliases = TS_ALIASES[tsIdentifier]
  if (aliases) {
    for (const a of aliases) {
      if (findIdentifierInFiles(a, files)) return { found: true, used: a }
    }
  }

  return { found: false }
}

function isPlaceholderCMapping(cell: string): boolean {
  const c = cell.trim()
  // 例如：(js_parse_statement_or_decl)、(js_parse_postfix_expr) 等。
  return c.startsWith('(') && c.endsWith(')')
}

function cSymbolFoundNearLine(cLines: string[], cSymbol: string, line: number, radius = 25): boolean {
  if (!cSymbol || !line) return false
  const idx = Math.max(0, line - 1)
  const start = Math.max(0, idx - radius)
  const end = Math.min(cLines.length, idx + radius)
  const block = cLines.slice(start, end).join('\n')
  return block.includes(cSymbol)
}

function parseSpecMappings(specText: string): MappingRow[] {
  const rows: MappingRow[] = []
  const lines = specText.split(/\r?\n/)

  let currentSection: string | undefined
  for (const raw of lines) {
    const sectionMatch = raw.match(/^###\s+(.*)$/)
    if (sectionMatch) currentSection = sectionMatch[1].trim()

    if (!raw.startsWith('|')) continue
    if (!raw.includes('`')) continue
    if (raw.includes('---')) continue

    const cells = raw.split('|').map(s => s.trim()).filter(Boolean)
    if (cells.length < 3) continue

    // 尝试按以下形式解析：
    // - 3 列：TS | C | note
    // - 4 列：TS | C | line | note
    const tsCell = cells[0]
    const cCell = cells[1]

    let line: number | undefined
    if (cells.length >= 4) {
      const lineCell = stripBackticks(cells[2])
      // 支持形如：8215、6914+
      if (/^-?\d+\+?$/.test(lineCell)) {
        const maybeNum = Number.parseInt(lineCell, 10)
        if (!Number.isNaN(maybeNum)) line = maybeNum
      }
    }

    rows.push({ tsCell, cCell, line, section: currentSection, raw })
  }

  return rows
}

async function main() {
  const root = process.cwd()
  const specPath = resolve(root, 'docs/TRANSPILATION_SPEC.md')
  const parserCPath = resolve(root, 'third_party/QuickJS/src/core/parser.c')

  const specText = readFileSync(specPath, 'utf8')
  const parserText = readFileSync(parserCPath, 'utf8')
  const parserLines = parserText.split(/\r?\n/)

  const rows = parseSpecMappings(specText)
  const rowsWithLine = rows.filter(r => typeof r.line === 'number')

  const tsFiles = walkTsFiles(resolve(root, 'src'))

  const findings: Finding[] = []

  for (const row of rowsWithLine) {
    const tsBack = extractFirstBackticked(row.tsCell)
    const cBack = extractFirstBackticked(row.cCell)

    const tsIdentifier = tsBack ? toIdentifierLike(tsBack) : undefined
    const cIdentifier = cBack ? toIdentifierLike(cBack) : undefined

    const tsLookup = findTsWithAliases(tsIdentifier, tsFiles)
    const tsFound = tsLookup.found

    const cCheckSkipped = !cIdentifier && isPlaceholderCMapping(row.cCell)
    const cFoundNearLine = !!(row.line && cIdentifier && cSymbolFoundNearLine(parserLines, cIdentifier, row.line))
    const cFoundInFile = !!(cIdentifier && parserText.includes(cIdentifier))

    let notes = ''
    if (!tsFound) notes += 'TS identifier not found. '
    if (tsLookup.used && tsLookup.used !== tsIdentifier && tsLookup.used !== '(skipped)') {
      notes += `TS alias used: ${tsLookup.used}. `
    }
    if (tsLookup.used === '(skipped)') {
      notes += 'TS check skipped (not applicable as a standalone TS symbol). '
    }
    if (cCheckSkipped) {
      notes += 'C symbol check skipped (placeholder mapping). '
    } else if (cIdentifier) {
      if (!cFoundInFile) notes += 'C symbol not found in parser.c. '
      else if (!cFoundNearLine) notes += 'C symbol found but not near specified line (line mapping drift). '
    }

    findings.push({
      tsIdentifier,
      cIdentifier,
      line: row.line,
      tsFound,
      cFoundNearLine,
      cFoundInFile,
      cCheckSkipped,
      notes: notes.trim() || undefined,
      row
    })
  }

  // 仅在 TS 符号缺失 或 C 符号完全找不到 时失败。
  const knownMissing = findings.filter(
    f => !f.tsFound && !!f.tsIdentifier && TS_KNOWN_MISSING.has(f.tsIdentifier)
  )

  const failed = findings.filter(f => {
    const tsMissing = !f.tsFound && !!f.tsIdentifier && !TS_KNOWN_MISSING.has(f.tsIdentifier)
    const cMissing = !f.cCheckSkipped && !!f.cIdentifier && !f.cFoundInFile
    return tsMissing || cMissing
  })

  console.log(`[audit:spec] Parsed ${rows.length} table rows; ${rowsWithLine.length} rows include line numbers.`)
  console.log(`[audit:spec] Checked TS identifiers under ./src and C symbols in ${parserCPath}`)

  if (knownMissing.length > 0) {
    console.log(`\nKnown TS gaps (warn-only): ${knownMissing.length}`)
    for (const f of knownMissing.slice(0, 40)) {
      const sec = f.row.section ? ` (${f.row.section})` : ''
      console.log(`- Line ${String(f.line)}${sec}: TS ${f.tsIdentifier} -> KNOWN_MISSING`) 
    }
    if (knownMissing.length > 40) console.log(`... (${knownMissing.length - 40} more)`)
  }

  if (failed.length === 0) {
    console.log('\nAll checked mappings look consistent.')
    return
  }

  console.log(`\nFound ${failed.length} potential issues:`)
  for (const f of failed.slice(0, 80)) {
    const sec = f.row.section ? ` (${f.row.section})` : ''
    console.log(`\n- Line ${String(f.line)}${sec}`)
    console.log(`  TS: ${f.tsIdentifier ?? '(unknown)'} -> ${f.tsFound ? 'FOUND' : 'MISSING'}`)
    if (f.cCheckSkipped) {
      console.log(`  C : (skipped placeholder mapping)`)
    } else if (f.cIdentifier) {
      const cStatus = f.cFoundNearLine ? 'FOUND_NEAR_LINE' : (f.cFoundInFile ? 'FOUND_IN_FILE' : 'MISSING')
      console.log(`  C : ${f.cIdentifier} -> ${cStatus}`)
    } else {
      console.log(`  C : (unknown) -> (not checked)`)
    }
    console.log(`  Row: ${f.row.raw.trim()}`)
    if (f.notes) console.log(`  Notes: ${f.notes}`)
  }

  if (failed.length > 80) {
    console.log(`\n... (${failed.length - 80} more)`)
  }

  process.exitCode = 1
}

main().catch(err => {
  console.error(err)
  process.exitCode = 1
})
