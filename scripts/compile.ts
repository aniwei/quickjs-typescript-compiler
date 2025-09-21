import { promises as fs } from 'node:fs'
import * as path from 'node:path'
import { QuickJSBinding } from './QuickJSBinding.js'


async function ensureDir(filePath: string) {
  const dir = path.dirname(filePath)
  await fs.mkdir(dir, { recursive: true })
}

async function main() {
  const [ , , inFile, outFile] = process.argv

  if (!inFile || !outFile) {
    console.error('用法：tsx scripts/compile.ts <input.js> <output.bin>')
    process.exit(1)
  }

  const absIn = path.resolve(inFile)
  const absOut = path.resolve(outFile)

  await ensureDir(absOut)
  const bytecode = await QuickJSBinding.compileSourcePath(absIn) 
  await fs.writeFile(absOut, Buffer.from(bytecode))

  console.log(
    `✅ 编译成功: ${path.relative(process.cwd(), absIn)} -> ${path.relative(
      process.cwd(),
      absOut
    )} (${bytecode.byteLength} bytes)`)
}

main().catch((err) => {
  console.error('❗️编译失败:', err)
  process.exit(1)
})