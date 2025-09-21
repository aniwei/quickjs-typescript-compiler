import * as ts from 'typescript'
import * as fs from 'fs'

export function parse(filePath: string): ts.SourceFile {
  const sourceCode = fs.readFileSync(filePath, 'utf8')
  return ts.createSourceFile(
    filePath,
    sourceCode,
    ts.ScriptTarget.ES2020,
    true
  )
}
