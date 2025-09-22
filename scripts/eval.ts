import { existsSync, promises as fs } from 'node:fs'
import * as path from 'node:path'
import { QuickJSLib } from './QuickJSLib'

async function main() {
  const [ , , inFile] = process.argv

  if (!inFile) {
    console.error('用法：tsx scripts/run.ts <input.bin>')
    process.exit(1)
  }

  const absIn = path.resolve(inFile)
  if (!existsSync(absIn)) { 
    console.error('输入文件不存在:', absIn)
    process.exit(1)
  }

  const result = await QuickJSLib.runWithBinaryPath(absIn) 
  
  console.log(
    `✅ 运行成功: ${path.relative(process.cwd(), absIn)}`)
}

main().catch((err) => {
  console.error('❗️运行失败:', err)
  process.exit(1)
})