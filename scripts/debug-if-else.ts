import ts from 'typescript'
import { TypeScriptCompiler } from '../src/TypeScriptCompiler'
import { OPCODE_BY_CODE } from '../src/env'

const source = `let a = 1;
if (a > 0) {
    a = 2;
} else {
    a = 3;
}`

const compiler = new TypeScriptCompiler()

try {
  compiler.compile(source, 'test.ts')
  console.log('Compilation succeeded!')
  const fd = compiler.funcDef!
  console.log(`\nFinal ByteCode.size = ${fd.byteCode.size}`)
  
  console.log('\n=== Raw Bytes ===')
  const bytes: string[] = []
  for (let i = 0; i < fd.byteCode.size; i++) {
    bytes.push(fd.byteCode.buffer[i].toString(16).padStart(2, '0'))
  }
  console.log(bytes.join(' '))
  
  console.log('\n=== Disassembly ===')
  let pos = 0
  while (pos < fd.byteCode.size) {
    const op = fd.byteCode.buffer[pos]
    const opDef = OPCODE_BY_CODE[op]
    const opName = opDef?.id || `unknown(${op.toString(16)})`
    let info = `${pos.toString().padStart(4, '0')}: [${op.toString(16).padStart(2, '0')}] ${opName}`
    
    if (opDef) {
      const size = opDef.size
      if (size > 1) {
        const args: string[] = []
        for (let i = 1; i < size; i++) {
          args.push(fd.byteCode.buffer[pos + i].toString(16).padStart(2, '0'))
        }
        info += ` (${args.join(' ')})`
      }
      pos += size
    } else {
      pos++
    }
    
    console.log(info)
  }
} catch (e: any) {
  console.log('Error:', e.message)
  
  // 打印字节码（即使失败了也可以看到已生成的字节码）
  const fd = compiler.funcDef
  if (fd) {
    console.log(`\\nByteCode.size = ${fd.byteCode.size}`)
    console.log(`Buffer length = ${fd.byteCode.buffer.length}`)
    console.log(`Allocated size = ${fd.byteCode.allocatedSize}`)
    
    console.log('\\n=== Raw Bytes (full) ===')
    const fullBytes: string[] = []
    for (let i = 0; i < fd.byteCode.size; i++) {
      fullBytes.push(fd.byteCode.buffer[i].toString(16).padStart(2, '0'))
    }
    console.log(fullBytes.join(' '))
    
    console.log('\\n=== Bytecode ===')
    let pos = 0
    while (pos < fd.byteCode.size) {
      const op = fd.byteCode.buffer[pos]
      const opDef = OPCODE_BY_CODE[op]
      const opName = opDef?.id || `unknown(${op.toString(16)})`
      let info = `${pos.toString().padStart(4, '0')}: [${op.toString(16).padStart(2, '0')}] ${opName}`
      
      if (opDef) {
        const size = opDef.size
        if (size > 1) {
          const args: string[] = []
          for (let i = 1; i < size; i++) {
            args.push(fd.byteCode.buffer[pos + i].toString(16).padStart(2, '0'))
          }
          info += ` (${args.join(' ')})`
        }
        pos += size
      } else {
        pos++
      }
      
      console.log(info)
    }
  }
}
