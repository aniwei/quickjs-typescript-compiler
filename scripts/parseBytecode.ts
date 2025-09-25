import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { parseBytecodeModule } from '../src/bytecodeReader'

interface CliOptions {
  output?: string
  pretty: boolean
}

function printUsage(): never {
  console.error('Usage: tsx scripts/parseBytecode.ts <input.qbc> [--out output.json] [--pretty]')
  process.exit(1)
}

function parseArgs(argv: string[]): { input: string; options: CliOptions } {
  if (argv.length === 0) {
    printUsage()
  }

  let input: string | undefined
  const options: CliOptions = { pretty: false }

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    switch (arg) {
      case '--out':
      case '-o': {
        const next = argv[++i]
        if (!next) {
          console.error('错误：--out 需要一个输出文件路径')
          printUsage()
        }
        options.output = next
        break
      }
      case '--pretty':
      case '-p':
        options.pretty = true
        break
      case '--help':
      case '-h':
        printUsage()
        break
      default:
        if (!input) {
          input = arg
        } else {
          console.error(`未识别的参数：${arg}`)
          printUsage()
        }
    }
  }

  if (!input) {
    printUsage()
  }

  return { input, options }
}

async function main() {
  const { input, options } = parseArgs(process.argv.slice(2))
  const absoluteInput = path.resolve(process.cwd(), input)

  if (!existsSync(absoluteInput)) {
    console.error(`错误：输入文件不存在 -> ${absoluteInput}`)
    process.exit(1)
  }

  const buffer = await readFile(absoluteInput)
  const parsed = parseBytecodeModule(buffer)
  const json = JSON.stringify(parsed, null, options.pretty ? 2 : undefined)

  if (options.output) {
    const absoluteOutput = path.resolve(process.cwd(), options.output)
    await writeFile(absoluteOutput, json)
    console.log(`✅ 已写出 JSON -> ${path.relative(process.cwd(), absoluteOutput)}`)
  } else {
    process.stdout.write(json)
  }
}

main().catch((error) => {
  console.error('❗️解析失败：', error)
  process.exit(1)
})
