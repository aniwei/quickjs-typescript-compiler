import * as ts from 'typescript'
import * as fs from 'fs'
import { compileSource } from './compile'
import { BytecodeWriter } from './bytecode'

function loadEnvQuickJS() {
  try {
    if (fs.existsSync('.env.quickjs')) {
      const txt = fs.readFileSync('.env.quickjs', 'utf8')

      for (const line of txt.split(/\r?\n/)) {
        const m = line.match(/^(\w+)\s*=\s*(.+)$/)
        if (m) process.env[m[1]] = m[2]
      }

      console.log('已加载 .env.quickjs（QJS_BC_MAGIC/QJS_BC_VERSION）')
    }
  } catch {}
}

function main() {
  const args = process.argv.slice(2)
  if (args.length < 2) {
    console.error('用法: src/cli.ts input.ts output.bin [--module] [--short] [--bigint=error|coerce] [--no-pc2loc] [--no-columns] [--embed-source] [--strip-debug]')
    process.exit(1)
  }
  const input = args[0], output = args[1];
  const forceModule = args.includes('--module');
  const enableShort = args.includes('--short');
  const bigArg = (args.find(a => a.startsWith('--bigint=')) || '--bigint=error').split('=')[1] as 'error'|'coerce'

  const optNoPC2 = args.includes('--no-pc2loc')
  const optNoCols = args.includes('--no-columns')
  const optEmbedSrc = args.includes('--embed-source')
  const optStripDbg = args.includes('--strip-debug')

  loadEnvQuickJS()

  const program = ts.createProgram([input], {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    strict: true,
    noEmit: true,
    sourceMap: true,
    skipLibCheck: true
  })
  const checker = program.getTypeChecker()
  const sf = program.getSourceFile(input)

  if (!sf) {
    throw new Error('Source not found: '+input)
  }

  const { atoms, ir } = compileSource(sf, checker, {
    forceModule,
    enableShortOpcodes: enableShort,
    bigintMixPolicy: bigArg
  })

  // 应用调试/源码选项
  if (optStripDbg) ir.debug.stripDebug = true
  if (optNoPC2) ir.debug.emitPC2Loc = false
  if (optNoCols) ir.debug.emitColumns = false
  if (optEmbedSrc) ir.debug.embedSource = true

  const writer = new BytecodeWriter(atoms)
  const { buffer } = writer.writeTop(ir)
  fs.writeFileSync(output, buffer)

  console.log(`已输出字节码: ${output} (${buffer.length} bytes)`)}

if (require.main === module) main()