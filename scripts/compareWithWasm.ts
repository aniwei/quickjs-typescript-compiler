#!/usr/bin/env tsx

/**
 * Compare TypeScript compiler output with WASM QuickJS compilation
 * This script compiles TypeScript files using both our compiler and QuickJS WASM,
 * then compares the bytecode output for verification.
 */

import fs from 'fs/promises'
import path from 'path'
import * as ts from 'typescript'
import { TypeScriptCompiler } from '../src/index'
import { createAdvancedDisassembly } from '../src/disasm'
import { QuickJSLib } from './QuickJSLib'

export interface ComparisonOptions {
  inputTs: string
  inputJs?: string
  disasm?: boolean
  asm?: boolean
  normalizeShort?: boolean
  sideBySide?: boolean
  artifactsDir?: string
  showDiff?: boolean
}

interface CompilationResult {
  bytecode: Uint8Array
  disassembly?: string
  assembly?: string
  size: number
  opcodes?: string[]
}

export interface ComparisonSummary {
  identical: boolean
  tsSize: number
  wasmSize: number
  sizeDiff: number
  sizeDiffPercent: number | null
}

class BytecodeComparator {
  private options: ComparisonOptions
  private artifactsDir: string
  private lastSummary: ComparisonSummary | null = null
  private referenceJs: { code: string; path: string } | null = null
  private referenceJsError: unknown | null = null

  constructor(options: ComparisonOptions) {
    this.options = options
    this.artifactsDir = options.artifactsDir || 'artifacts'
  }

  async compare(): Promise<ComparisonSummary> {
    console.log('🔍 Starting bytecode comparison...')
    
    // Ensure artifacts directory exists
    await this.ensureArtifactsDir()
    
    // Compile with our TypeScript compiler
    console.log('📦 Compiling with TypeScript compiler...')
    const tsResult = await this.compileWithTypeScript()
    
    // Compile with QuickJS WASM (if available)
    console.log('🌐 Compiling with QuickJS WASM...')
    const wasmResult = await this.compileWithWasm()
    
    // Save artifacts
    await this.saveArtifacts(tsResult, wasmResult)
    
    // Compare results
    const summary = this.compareResults(tsResult, wasmResult)
    this.lastSummary = summary
    return summary
  }

  getLastSummary(): ComparisonSummary | null {
    return this.lastSummary
  }

  private async ensureArtifactsDir(): Promise<void> {
    try {
      await fs.mkdir(this.artifactsDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }
  }

  private async compileWithTypeScript(): Promise<CompilationResult> {
    const sourceCode = await fs.readFile(this.options.inputTs, 'utf-8')

    const reference = await this.resolveReferenceJavaScript({ tolerateErrors: true })
    
    // 从 WASM 查询 firstAtomId（JS_ATOM_END），用于对齐用户原子阈值
    let firstAtomId: number | undefined
    try {
      firstAtomId = await QuickJSLib.getFirstAtomId()
    } catch {}
    // 获取 QuickJS 的 opcode 映射，确保我们生成的数值与引擎一致
    let opcodeOverride: Map<string, number> | undefined
    try {
      opcodeOverride = await QuickJSLib.getOpcodeOverrideMap()
    } catch {}

    const flags = {
      bigInt: false,
      dump: false,
      shortCode: !this.options.normalizeShort,
      debug: false,
      strictMode: false,
      firstAtomId
    } as const

    const compiler = new TypeScriptCompiler({
      ...(flags as any),
      referenceJsSource: reference?.code,
    })
    const bytecode = await compiler.compileFile(this.options.inputTs);

    let disassembly: string | undefined
    if (this.options.disasm) {
      disassembly = await this.disassembleBytecode(bytecode, 'ts')
    }

    let assembly: string | undefined 
    if (this.options.asm) {
      // 使用我们自己的反汇编器渲染 TS 侧字节码，避免被 QuickJS 误解析
      assembly = createAdvancedDisassembly(bytecode)
    }
    
    return {
      bytecode,
      assembly: assembly ? assembly : '<invalid>',
      disassembly,
      size: bytecode.length,
      opcodes: this.extractOpcodes(bytecode)
    }
  }

  private async compileWithWasm(): Promise<CompilationResult> {
    try {
      // Check if QuickJS WASM is available
      const wasmPath = path.join('third_party', 'QuickJS', 'wasm', 'output', 'quickjs_wasm.wasm')
      
      try {
        await fs.access(wasmPath)
      } catch {
        console.log('⚠️  QuickJS WASM not found, skipping WASM build...')
        // Could implement WASM building here
      }
      
      const reference = await this.resolveReferenceJavaScript()
      if (!reference) {
        throw new Error('Unable to resolve JavaScript source for QuickJS compilation')
      }
      
      // Compile with QuickJS WASM (placeholder - would need actual WASM binding)
      const bytecode = await this.compileJavaScriptWithWasm(reference.code, reference.path)
      
      let disassembly: string | undefined
      if (this.options.disasm) {
  disassembly = await this.disassembleBytecode(bytecode, 'wasm')
      }

      let assembly: string | undefined
      if (this.options.asm) {
  assembly = await QuickJSLib.dumpBytesToString(bytecode)
      }

      return {
        bytecode,
        assembly,
        disassembly,
        size: bytecode.length,
        opcodes: this.extractOpcodes(bytecode)
      }
      
    } catch (error) {
      console.log('⚠️  WASM compilation failed, creating mock result:', error)
      
      // Return mock result for comparison
      const mockBytecode = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05])
      return {
        bytecode: mockBytecode,
        disassembly: 'Mock WASM disassembly',
        size: mockBytecode.length,
        opcodes: ['mock_opcode_1', 'mock_opcode_2']
      }
    }
  }

  private async resolveReferenceJavaScript(options: { tolerateErrors?: boolean } = {}): Promise<{ code: string; path: string } | null> {
    if (this.referenceJs) {
      return this.referenceJs
    }

    if (this.referenceJsError) {
      if (options.tolerateErrors) {
        return null
      }
      throw this.referenceJsError
    }

    const tolerateErrors = options.tolerateErrors === true

    try {
      let jsPath: string
      let jsCode: string

      if (this.options.inputJs) {
        jsPath = this.options.inputJs
        if (/\.ts$/i.test(jsPath)) {
          const tsCode = await fs.readFile(jsPath, 'utf-8')
          jsCode = this.stripTypeScript(tsCode, jsPath)
          jsPath = jsPath.replace(/\.ts$/i, '.js')
        } else {
          const maybeJs = await this.readMaybeTextFile(jsPath)
          if (maybeJs === null) {
            throw new Error(`Provided --input-js file is not valid JavaScript: ${jsPath}`)
          }
          jsCode = this.normalizeJavaScriptSource(maybeJs, jsPath)
        }
      } else {
        const inferredJsPath = this.options.inputTs.replace(/\.ts$/i, '.js')
        if (await this.fileExists(inferredJsPath)) {
          const maybeJs = await this.readMaybeTextFile(inferredJsPath)
          if (maybeJs !== null) {
            jsCode = this.normalizeJavaScriptSource(maybeJs, inferredJsPath)
            jsPath = inferredJsPath
          } else {
            const tsCode = await fs.readFile(this.options.inputTs, 'utf-8')
            jsCode = this.stripTypeScript(tsCode, this.options.inputTs)
            jsPath = inferredJsPath
          }
        } else {
          const tsCode = await fs.readFile(this.options.inputTs, 'utf-8')
          jsCode = this.stripTypeScript(tsCode, this.options.inputTs)
          jsPath = inferredJsPath
        }
      }

      this.referenceJs = { code: jsCode, path: jsPath }
      return this.referenceJs
    } catch (error) {
      this.referenceJsError = error
      if (tolerateErrors) {
        return null
      }
      throw error
    }
  }

  private async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath)
      return true
    } catch {
      return false
    }
  }

  private stripTypeScript(tsCode: string, fileName?: string): string {
    try {
      const transpiled = ts.transpileModule(tsCode, {
        fileName,
        reportDiagnostics: true,
        compilerOptions: {
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2020,
          jsx: ts.JsxEmit.Preserve,
          importHelpers: false,
          esModuleInterop: false,
        },
      })

      if (transpiled.diagnostics && transpiled.diagnostics.length > 0) {
        const formatted = transpiled.diagnostics
          .map((diag) => this.formatDiagnostic(diag))
          .join('\n')
        const context = fileName ? ` for ${fileName}` : ''
        console.warn(`⚠️  TypeScript transpile diagnostics${context}:\n${formatted}`)
      }

      if (!transpiled.outputText) {
        throw new Error('Empty transpile output')
      }

      return transpiled.outputText
    } catch (error) {
      const context = fileName ? ` for ${fileName}` : ''
      console.warn(`⚠️  Using fallback TypeScript stripper${context}:`, error)
      return this.basicStripTypeScript(tsCode)
    }
  }

  private basicStripTypeScript(tsCode: string): string {
    return tsCode
      // Remove basic type annotations after colons (e.g., const x: number = ...)
      .replace(/:\s*[^=;,){}]+(?=[=;,){}])/g, '')
      // Remove function return type annotations before block or arrow
      .replace(/([)\]])\s*:\s*[^=;{=>]+(?=\s*(\{|=>))/g, '$1')
      // Remove generic type parameters in simple cases (e.g., Array<number>)
      .replace(/<\s*[^>]+\s*>/g, '')
      // Remove interface and type declarations (very naive)
      .replace(/\b(interface|type)\s+\w+[^{;]*[{][^}]*}[;]?/g, '')
      // Remove declare keywords
      .replace(/\bdeclare\s+/g, '')
      // Remove TS-only assertion syntax as const, satisfies, etc. (naive)
      .replace(/\s+as\s+const\b/g, '')
      .replace(/\s+satisfies\s+[^;]+/g, '')
  }

  private formatDiagnostic(diagnostic: ts.Diagnostic): string {
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
    if (diagnostic.file && diagnostic.start !== undefined) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start)
      const fileName = diagnostic.file.fileName
      return `${fileName} (${line + 1},${character + 1}): ${message}`
    }
    return message
  }

  private normalizeJavaScriptSource(code: string, fileName?: string): string {
    if (fileName) {
      const ext = path.extname(fileName).toLowerCase()
      if (ext === '.js' || ext === '.mjs' || ext === '.cjs') {
        return code
      }
    }
    return this.stripTypeScript(code, fileName)
  }

  private async readMaybeTextFile(filePath: string): Promise<string | null> {
    try {
      const buffer = await fs.readFile(filePath)
      if (buffer.includes(0)) {
        return null
      }
      return buffer.toString('utf-8')
    } catch {
      return null
    }
  }

  private async compileJavaScriptWithWasm(jsCode: string, jsPath?: string): Promise<Uint8Array> {
    const result = await QuickJSLib.compileSource(jsCode, jsPath);
    return result
  }

  private async disassembleBytecode(bytecode: Uint8Array, source: string): Promise<string> {
    const lines = []
    lines.push(`--- ${source.toUpperCase()} Disassembly ---`)
    lines.push(`Bytecode size: ${bytecode.length} bytes`)
    lines.push('')
    
    // Simple hex dump
    for (let i = 0; i < bytecode.length; i += 16) {
      const chunk = bytecode.slice(i, i + 16)
      const hex = Array.from(chunk).map(b => b.toString(16).padStart(2, '0')).join(' ')
      const ascii = Array.from(chunk).map(b => b >= 32 && b <= 126 ? String.fromCharCode(b) : '.').join('')
      lines.push(`${i.toString(16).padStart(8, '0')}: ${hex.padEnd(47)} |${ascii}|`)
    }
    
    lines.push('--- End Disassembly ---')
    return lines.join('\n')
  }

  private extractOpcodes(bytecode: Uint8Array): string[] {
    const opcodes = []
    
    // Simple opcode extraction - would need proper QuickJS opcode parsing
    for (let i = 0; i < Math.min(bytecode.length, 10); i++) {
      opcodes.push(`0x${bytecode[i].toString(16).padStart(2, '0')}`)
    }
    
    return opcodes
  }

  private async saveArtifacts(tsResult: CompilationResult, wasmResult: CompilationResult): Promise<void> {
    const baseName = path.basename(this.options.inputTs, '.ts')
    
    // Save bytecode files
    await fs.writeFile(
      path.join(this.artifactsDir, `${baseName}.ts.qbc`),
      tsResult.bytecode
    )
    
    await fs.writeFile(
      path.join(this.artifactsDir, `${baseName}.wasm.qbc`),
      wasmResult.bytecode
    )
    
    // Save disassemblies if requested
    if (this.options.disasm && tsResult.disassembly && wasmResult.disassembly) {
      await fs.writeFile(
        path.join(this.artifactsDir, `${baseName}.ts.disasm`),
        tsResult.disassembly
      )
      
      await fs.writeFile(
        path.join(this.artifactsDir, `${baseName}.wasm.disasm`),
        wasmResult.disassembly
      )
    }

    if (this.options.asm && tsResult.assembly && wasmResult.assembly) {
      await fs.writeFile(
        path.join(this.artifactsDir, `${baseName}.ts.asm`),
        tsResult.assembly
      )

      await fs.writeFile(
        path.join(this.artifactsDir, `${baseName}.wasm.asm`),
        wasmResult.assembly
      )
    }

    // Save detailed analysis dumps
    await this.saveDumpAnalysis(baseName, tsResult, wasmResult)
    
    console.log(`💾 Artifacts saved to ${this.artifactsDir}/`)
  }
  
  private async saveDumpAnalysis(baseName: string, tsResult: CompilationResult, wasmResult: CompilationResult): Promise<void> {
    const analysis = {
      timestamp: new Date().toISOString(),
      inputFile: this.options.inputTs,
      compilation: {
        typescript: {
          size: tsResult.size,
          bytecode: Array.from(tsResult.bytecode).map(b => `0x${b.toString(16).padStart(2, '0')}`),
          hexDump: this.generateHexDump(tsResult.bytecode),
          structure: this.analyzeBytecodeStructure(tsResult.bytecode, 'TypeScript')
        },
        wasm: {
          size: wasmResult.size,
          bytecode: Array.from(wasmResult.bytecode).map(b => `0x${b.toString(16).padStart(2, '0')}`),
          hexDump: this.generateHexDump(wasmResult.bytecode),
          structure: this.analyzeBytecodeStructure(wasmResult.bytecode, 'WASM')
        }
      },
      differences: this.analyzeDetailedDifferences(tsResult.bytecode, wasmResult.bytecode),
      sizeDifference: {
        absolute: tsResult.size - wasmResult.size,
        percentage: wasmResult.size > 0 ? ((tsResult.size - wasmResult.size) / wasmResult.size * 100).toFixed(2) : 'N/A'
      }
    }
    
    // Save JSON analysis
    await fs.writeFile(
      path.join(this.artifactsDir, `${baseName}.analysis.json`),
      JSON.stringify(analysis, null, 2)
    )
    
    // Save human-readable report
    const report = this.generateAnalysisReport(analysis)
    await fs.writeFile(
      path.join(this.artifactsDir, `${baseName}.report.md`),
      report
    )
  }
  
  private generateHexDump(bytecode: Uint8Array): string[] {
    const lines = []
    for (let i = 0; i < bytecode.length; i += 16) {
      const chunk = bytecode.slice(i, i + 16)
      const hex = Array.from(chunk).map(b => b.toString(16).padStart(2, '0')).join(' ')
      const ascii = Array.from(chunk).map(b => b >= 32 && b <= 126 ? String.fromCharCode(b) : '.').join('')
      lines.push(`${i.toString(16).padStart(8, '0')}: ${hex.padEnd(47)} |${ascii}|`)
    }
    return lines
  }
  
  private analyzeBytecodeStructure(bytecode: Uint8Array, source: string): any {
    if (bytecode.length < 10) {
      return { error: 'Bytecode too short for analysis' }
    }
    
    try {
      let offset = 0
      const structure: any = { source }
      
      // BC_VERSION
      structure.bcVersion = `0x${bytecode[offset].toString(16)}`
      offset++
      
      // User atom count (LEB128)
      const { value: atomCount, bytesRead } = this.readLEB128(bytecode, offset)
      structure.userAtomCount = atomCount
      offset += bytesRead
      
      // Analyze atoms
      const atoms = []
      for (let i = 0; i < atomCount && offset < bytecode.length; i++) {
        const atomStart = offset
        
        // String length (LEB128, potentially encoded with QuickJS format)
        const { value: stringLen, bytesRead: lenBytes } = this.readLEB128(bytecode, offset)
        offset += lenBytes
        
        // Actual string length (QuickJS format: length >> 1)
        const actualLen = stringLen >> 1
        const isWideChar = stringLen & 1
        
        if (offset + actualLen <= bytecode.length) {
          const atomString = new TextDecoder().decode(bytecode.slice(offset, offset + actualLen))
          atoms.push({
            index: i,
            rawLength: stringLen,
            actualLength: actualLen,
            isWideChar,
            string: atomString,
            offset: atomStart
          })
          offset += actualLen
        } else {
          atoms.push({ index: i, error: 'String extends beyond bytecode' })
          break
        }
      }
      structure.atoms = atoms
      
      // Function header analysis
      if (offset < bytecode.length) {
        structure.functionHeader = {
          offset,
          tag: `0x${bytecode[offset].toString(16)}`,
          remaining: bytecode.length - offset
        }
      }
      
      return structure
    } catch (error: any) {
      return { error: `Analysis failed: ${error.message}` }
    }
  }
  
  private readLEB128(buffer: Uint8Array, offset: number): { value: number, bytesRead: number } {
    let result = 0
    let shift = 0
    let bytesRead = 0
    
    while (offset + bytesRead < buffer.length) {
      const byte = buffer[offset + bytesRead]
      result |= (byte & 0x7F) << shift
      bytesRead++
      
      if ((byte & 0x80) === 0) break
      shift += 7
    }
    
    return { value: result, bytesRead }
  }
  
  private analyzeDetailedDifferences(tsBytes: Uint8Array, wasmBytes: Uint8Array): any[] {
    const differences = []
    const maxLen = Math.max(tsBytes.length, wasmBytes.length)
    
    for (let i = 0; i < maxLen; i++) {
      const tsVal = i < tsBytes.length ? tsBytes[i] : undefined
      const wasmVal = i < wasmBytes.length ? wasmBytes[i] : undefined
      
      if (tsVal !== wasmVal) {
        differences.push({
          offset: i,
          offsetHex: `0x${i.toString(16)}`,
          typescript: tsVal !== undefined ? `0x${tsVal.toString(16).padStart(2, '0')}` : 'EOF',
          wasm: wasmVal !== undefined ? `0x${wasmVal.toString(16).padStart(2, '0')}` : 'EOF',
          typescriptDecimal: tsVal,
          wasmDecimal: wasmVal
        })
      }
    }
    
    return differences
  }
  
  private generateAnalysisReport(analysis: any): string {
    const lines = [
      '# 字节码分析报告',
      '',
      `**输入文件**: ${analysis.inputFile}`,
      `**生成时间**: ${analysis.timestamp}`,
      '',
      '## 大小对比',
      '',
      `- TypeScript编译器: ${analysis.compilation.typescript.size} 字节`,
      `- WASM编译器: ${analysis.compilation.wasm.size} 字节`,
      `- 差异: ${analysis.sizeDifference.absolute} 字节 (${analysis.sizeDifference.percentage}%)`,
      '',
      '## 结构分析',
      '',
      '### TypeScript编译器输出',
      '```json',
      JSON.stringify(analysis.compilation.typescript.structure, null, 2),
      '```',
      '',
      '### WASM编译器输出',
      '```json',
      JSON.stringify(analysis.compilation.wasm.structure, null, 2),
      '```',
      '',
      '## 字节级差异',
      '',
      `共发现 ${analysis.differences.length} 个字节差异:`,
      ''
    ]
    
    analysis.differences.slice(0, 20).forEach((diff: any) => {
      lines.push(`- 偏移量 ${diff.offsetHex}: TS=${diff.typescript} vs WASM=${diff.wasm}`)
    })
    
    if (analysis.differences.length > 20) {
      lines.push(`- ... (显示前20个差异，总共${analysis.differences.length}个)`)
    }
    
    lines.push('', '## 十六进制转储对比', '', '### TypeScript')
    lines.push('```')
    lines.push(...analysis.compilation.typescript.hexDump)
    lines.push('```')
    lines.push('', '### WASM')
    lines.push('```')
    lines.push(...analysis.compilation.wasm.hexDump)
    lines.push('```')
    
    return lines.join('\n')
  }

  private compareResults(tsResult: CompilationResult, wasmResult: CompilationResult): ComparisonSummary {
    console.log('\n📊 Comparison Results:')
    console.log('─'.repeat(50))
    
    // Size comparison
    console.log(`TypeScript compiler: ${tsResult.size} bytes`)
    console.log(`WASM compiler:       ${wasmResult.size} bytes`)
    
    const sizeDiff = tsResult.size - wasmResult.size
    const sizePercent = wasmResult.size > 0 ? (sizeDiff / wasmResult.size) * 100 : null
    const sizePercentDisplay = sizePercent === null ? 'N/A' : `${sizePercent >= 0 ? '+' : ''}${sizePercent.toFixed(1)}`
    console.log(`Size difference:     ${sizeDiff > 0 ? '+' : ''}${sizeDiff} bytes (${sizePercentDisplay}%)`)
    
    // Bytecode comparison
    const identical = this.compareBytes(tsResult.bytecode, wasmResult.bytecode)
    console.log(`Bytecode identical:  ${identical ? '✅ Yes' : '❌ No'}`)
    
    if (!identical && this.options.showDiff) {
      this.showByteDifferences(tsResult.bytecode, wasmResult.bytecode)
    }
    
    // Side-by-side disassembly
    if (this.options.sideBySide && tsResult.disassembly && wasmResult.disassembly) {
      this.showSideBySideDisassembly(tsResult.disassembly, wasmResult.disassembly)
    }
    
    console.log('─'.repeat(50))
    
    // Summary
    if (identical) {
      console.log('🎉 Perfect match! TypeScript compiler output is identical to WASM compiler.')
    } else {
      console.log('⚠️  Differences found. Review artifacts for detailed analysis.')
    }

    return {
      identical,
      tsSize: tsResult.size,
      wasmSize: wasmResult.size,
      sizeDiff,
      sizeDiffPercent: sizePercent,
    }
  }

  private compareBytes(a: Uint8Array, b: Uint8Array): boolean {
    if (a.length !== b.length) return false
    
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false
    }
    
    return true
  }

  private showByteDifferences(a: Uint8Array, b: Uint8Array): void {
    console.log('\n🔍 Byte-level differences:')
    
    const maxLen = Math.max(a.length, b.length)
    let diffCount = 0
    
    for (let i = 0; i < maxLen && diffCount < 10; i++) {
      const aVal = i < a.length ? a[i] : undefined
      const bVal = i < b.length ? b[i] : undefined
      
      if (aVal !== bVal) {
        console.log(`  Position ${i}: TS=${aVal?.toString(16).padStart(2, '0') || 'EOF'} vs WASM=${bVal?.toString(16).padStart(2, '0') || 'EOF'}`)
        diffCount++
      }
    }
    
    if (diffCount === 10) {
      console.log('  ... (showing first 10 differences)')
    }
  }

  private showSideBySideDisassembly(tsDisasm: string, wasmDisasm: string): void {
    console.log('\n📋 Side-by-side disassembly:')
    console.log('─'.repeat(100))
    
    const tsLines = tsDisasm.split('\n')
    const wasmLines = wasmDisasm.split('\n')
    const maxLines = Math.max(tsLines.length, wasmLines.length)
    
    for (let i = 0; i < Math.min(maxLines, 20); i++) {
      const tsLine = (tsLines[i] || '').padEnd(48)
      const wasmLine = wasmLines[i] || ''
      console.log(`${tsLine} | ${wasmLine}`)
    }
    
    if (maxLines > 20) {
      console.log('... (truncated, see artifacts for full disassembly)')
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    console.log('Usage: compareWithWasm.ts <input.ts> [options]')
    console.log('Options:')
    console.log('  --input-js <file>      JavaScript input file for TypeScript compilation')
    console.log('  --input-ts <file>      TypeScript input file (required)')
    console.log('  --disasm               Generate disassembly')
    console.log('  --sasm                 Generate assembly')
    console.log('  --normalize-short      Disable short opcode optimization')
    console.log('  --side-by-side         Show side-by-side disassembly')
    console.log('  --artifacts-dir <dir>  Output directory for artifacts (default: artifacts)')
    console.log('  --show-diff            Show detailed byte differences')
    return
  }
  
  const options: ComparisonOptions = {
    inputTs: args[0]
  }
  
  // Parse command line options
  for (let i = 1; i < args.length; i++) {
    switch (args[i]) {
      case '--input-js':
        options.inputJs = args[++i]
        break
      case '--input-ts':
        options.inputTs = args[++i]
        break
      case '--disasm':
        options.disasm = true
        break
      case '--asm':
        options.asm = true
        break
      case '--normalize-short':
        options.normalizeShort = true
        break
      case '--side-by-side':
        options.sideBySide = true
        break
      case '--artifacts-dir':
        options.artifactsDir = args[++i]
        break
      case '--show-diff':
        options.showDiff = true
        break
    }
  }
  
  try {
    const comparator = new BytecodeComparator(options)
    await comparator.compare()
  } catch (error) {
    console.error('❌ Comparison failed:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { BytecodeComparator }