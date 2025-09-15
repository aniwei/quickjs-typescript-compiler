import * as fs from 'node:fs'
import * as path from 'node:path'
import * as ts from 'typescript'
import { compileSource } from '../src/compile'
import { BytecodeWriter } from '../src/bytecode'
import { AtomTable } from '../src/atoms'

function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true })
}

function looksLikeModule(text: string): boolean {
  return /\b(import|export)\b/.test(text)
}

function readU32LE(buf: Buffer, off: number) {
  return (buf[off] | (buf[off+1]<<8) | (buf[off+2]<<16) | (buf[off+3]<<24)) >>> 0
}

function main() {
  const testsDir = path.resolve('__tests__')
  const outDir = path.resolve('dist-tests')
  ensureDir(outDir)

  const files = fs.readdirSync(testsDir).filter(f => f.endsWith('.ts'))
  if (files.length === 0) {
    console.log('未发现 __tests__/*.ts 测试文件')
    process.exit(0)
  }

  const results: Array<{ file: string; out: string; size: number; isModule: boolean; funcs: number; exceptions: number; pc2loc: number }>[] = [] as any

  let ok = 0, skipped = 0, failed = 0

  for (const f of files) {
    const fp = path.join(testsDir, f)
    const text = fs.readFileSync(fp, 'utf8')

    // skip await/yield tests if env not set
    const needsAwait = /await\s+/.test(text)
    const needsYield = /\byield\b/.test(text)
    if ((needsAwait && !process.env.QJS_OP_AWAIT) || (needsYield && !process.env.QJS_OP_YIELD)) {
      console.warn(`[skip] ${f} 需要 QJS_OP_AWAIT/QJS_OP_YIELD 环境变量`)
      skipped++
      continue
    }

    try {
      const program = ts.createProgram([fp], {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.ESNext,
        strict: true,
        noEmit: true,
        sourceMap: false,
        skipLibCheck: true,
      })
      const checker = program.getTypeChecker()
      const sf = program.getSourceFile(fp)
      if (!sf) throw new Error('无法加载 SourceFile: '+fp)

      const forceModule = looksLikeModule(text)
      const { atoms, ir } = compileSource(sf, checker, {
        forceModule,
        enableShortOpcodes: true,
        bigintMixPolicy: 'error',
      })

      const writer = new BytecodeWriter(atoms as unknown as AtomTable)
      const { buffer } = writer.writeTop(ir)

      const outName = f.replace(/\.ts$/, '.bin')
      const outPath = path.join(outDir, outName)
      fs.writeFileSync(outPath, buffer)

      const magic = readU32LE(buffer, 0)
      const version = readU32LE(buffer, 4)

      console.log(`[ok] ${f} -> ${outName} (${buffer.length} bytes) magic=0x${(magic>>>0).toString(16)} version=0x${(version>>>0).toString(16)}`)
      ok++

      const funcs = 1 // 顶层 1 个
      const exceptions = ir.exceptions.length
      const pc2loc = ir.pc2loc.length
      results.push([{ file: f, out: outName, size: buffer.length, isModule: ir.isModule, funcs, exceptions, pc2loc }])
    } catch (e: any) {
      console.error(`[fail] ${f}: ${e?.message ?? e}`)
      failed++
    }
  }

  console.log(`汇总：ok=${ok} skipped=${skipped} failed=${failed}`)
  if (failed > 0) process.exit(1)
}

if (require.main === module) main()
