import { promises as fs } from 'node:fs'
import * as path from 'node:path'
import { QuickJSLib } from './QuickJSLib'
import { Compiler } from '../src/compiler';
import { serialize } from '../src/serializer';
import * as ts from 'typescript';


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
  const code = await fs.readFile(absIn, 'utf-8');
  const sourceFile = ts.createSourceFile(
    absIn,
    code,
    ts.ScriptTarget.ESNext,
    true
  );
  const compiler = new Compiler();
  const func = compiler.compile(sourceFile);
  const bytecode = serialize(func);
  await fs.writeFile(absOut, Buffer.from(bytecode));

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