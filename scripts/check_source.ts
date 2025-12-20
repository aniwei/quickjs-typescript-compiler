import * as fs from 'fs'
import ts from 'typescript'

const filePath = '__tests__/fixtures/array-literal.ts'
const source = fs.readFileSync(filePath, 'utf-8')

console.log('=== Original TypeScript source ===')
console.log(source)
console.log('')

// 每个位置对应的字符
console.log('=== Source positions ===')
for (let i = 0; i < source.length; i++) {
  const char = source[i] === '\n' ? '\\n' : source[i]
  console.log(`  pos ${i.toString().padStart(2)}: '${char}'`)
}

console.log('')
console.log('Key positions from TS compiler:')
console.log('  sourcePos=0:  start of file')
console.log('  sourcePos=13: pos 13 =', JSON.stringify(source[13]))
console.log('  sourcePos=16: pos 16 =', JSON.stringify(source[16]))
console.log('  sourcePos=19: pos 19 =', JSON.stringify(source[19]))
console.log('  sourcePos=23: pos 23 =', JSON.stringify(source[23]))
console.log('  sourcePos=35: pos 35 =', JSON.stringify(source[35]))
console.log('  sourcePos=39: pos 39 =', JSON.stringify(source[39]))
