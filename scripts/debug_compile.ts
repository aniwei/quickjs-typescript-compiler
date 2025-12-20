import { TypeScriptCompiler } from '../src/TypeScriptCompiler'

const source = `const arr = [1, 2, 3];
console.log(arr[1]);`

const compiler = new TypeScriptCompiler()

// 临时 hook 以观察 pc2line 数据
const original = (compiler as any).compiler.computePc2LineInfo.bind((compiler as any).compiler)
;(compiler as any).compiler.computePc2LineInfo = function(fd: any) {
  console.log(`=== computePc2LineInfo for ${fd.funcName || '<eval>'} ===`)
  console.log(`  sourcePos: ${fd.sourcePos}`)
  console.log(`  lineNumberCount: ${fd.lineNumberCount}`)
  for (let i = 0; i < fd.lineNumberCount; i++) {
    const slot = fd.lineNumberSlots[i]
    console.log(`  slot[${i}]: pc=${slot.pc}, sourcePos=${slot.sourcePos}`)
  }
  original(fd)
  console.log(`  pc2line size: ${fd.pc2line.size}`)
  console.log(`  pc2line data: ${[...fd.pc2line.data()].map((b: number) => b.toString(16).padStart(2, '0')).join(' ')}`)
}

const bytecode = compiler.compile(source, 'test.js')
console.log(`\nTotal bytecode size: ${bytecode.length}`)
