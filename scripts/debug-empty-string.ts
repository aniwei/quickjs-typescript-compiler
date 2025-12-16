import { TypeScriptCompiler } from '../src/TypeScriptCompiler'
import { Opcode, OPCODE_BY_CODE } from '../src/env'
import { TempOpcode } from '../src/compiler/TempOpcode'
import * as ts from 'typescript'

const source = 'let a = ""'
const compiler = new TypeScriptCompiler({})

try {
  const parsed = ts.createSourceFile('test.ts', source, ts.ScriptTarget.ESNext)
  
  compiler['ast'] = parsed as any
  compiler['fileName'] = 'test.ts'
  compiler['sourceCode'] = source
  
  compiler['createModuleDef']()
  compiler['compileModuleBody']()
  
  const fd = compiler['moduleDef'].globalFunction
  const bc = fd.byteCode.buffer.slice(0, fd.byteCode.size)
  console.log('=== 原始字节码 (解析变量之前) ===')
  console.log('大小:', fd.byteCode.size)
  console.log('字节:', Array.from(bc).map((b,i) => {
    const opName = OPCODE_BY_CODE[b]?.id || TempOpcode[b] || '???'
    return `${i}:${b}(${opName})`
  }).join(', '))
  
  for (let i = 0; i < bc.length; i++) {
    if (bc[i] === 195) {
      console.log(`\n发现 opcode 195 在位置 ${i}`)
    }
  }
  
} catch (e) {
  console.error('错误:', e)
}
