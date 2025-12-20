import * as fs from 'fs'
import * as ts from 'typescript'
import { TypeScriptCompiler } from '../src/TypeScriptCompiler'
import { initWasm } from '../src/wasm'

async function main() {
  await initWasm()
  
  const filePath = '__tests__/fixtures/array-literal.ts'
  const source = fs.readFileSync(filePath, 'utf-8')
  
  const compiler = new TypeScriptCompiler()
  
  // 临时修改编译流程来打印调试信息
  const module = compiler.compile(source, filePath.replace('.ts', '.js'))
  
  // 获取主函数定义
  const fd = (compiler as any).mainFunctionDef
  if (fd) {
    console.log('=== FunctionDef Debug ===')
    console.log('fd.sourcePos:', fd.sourcePos)
    console.log('fd.lineNumberCount:', fd.lineNumberCount)
    console.log('fd.lineNumberLast:', fd.lineNumberLast)
    console.log('fd.stripDebug:', fd.stripDebug)
    
    if (fd.lineNumberSlots) {
      console.log('\nlineNumberSlots:')
      for (let i = 0; i < fd.lineNumberCount; i++) {
        const slot = fd.lineNumberSlots[i]
        console.log(`  slot[${i}]: pc=${slot.pc}, sourcePos=${slot.sourcePos}`)
      }
    }
  } else {
    console.log('No mainFunctionDef found')
  }
}

main().catch(console.error)
