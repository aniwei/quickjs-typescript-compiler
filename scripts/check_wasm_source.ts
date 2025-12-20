import * as fs from 'fs'
import { initWasm, getQuickJS } from '../src'

async function main() {
  await initWasm()
  
  const filePath = '__tests__/fixtures/array-literal.ts'
  const source = fs.readFileSync(filePath, 'utf-8')
  
  // 使用 ts.transpileModule 转译
  const ts = await import('typescript')
  const result = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
    },
    fileName: filePath
  })
  
  console.log('=== Transpiled source ===')
  console.log(result.outputText)
  console.log('')
  
  // 每个位置对应的字符
  console.log('=== Source positions ===')
  const text = result.outputText
  for (let i = 0; i < Math.min(50, text.length); i++) {
    const char = text[i] === '\n' ? '\\n' : text[i]
    console.log(`  pos ${i}: '${char}'`)
  }
}

main().catch(console.error)
