#!/usr/bin/env tsx

/**
 * Compare TypeScript compiler output with WASM QuickJS compilation
 * This script compiles TypeScript files using both our compiler and QuickJS WASM,
 * then compares the bytecode output for verification.
 */

import fs from 'fs/promises'
import path from 'path'
import { TypeScriptCompiler } from '../src/index'
import { QuickJSLib } from './QuickJSLib'

interface ComparisonOptions {
  inputTs: string
  inputJs?: string
  disasm?: boolean
  normalizeShort?: boolean
  sideBySide?: boolean
  artifactsDir?: string
  showDiff?: boolean
}

interface CompilationResult {
  bytecode: Uint8Array
  disassembly?: string
  size: number
  opcodes?: string[]
}

class BytecodeComparator {
  private options: ComparisonOptions
  private artifactsDir: string

  constructor(options: ComparisonOptions) {
    this.options = options
    this.artifactsDir = options.artifactsDir || 'artifacts'
  }

  async compare(): Promise<void> {
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
    this.compareResults(tsResult, wasmResult)
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
    
    const compiler = new TypeScriptCompiler({
      bigInt: false,
      dump: false,
      shortCode: !this.options.normalizeShort,
      debug: false,
      strictMode: false
    })

    const bytecode = compiler.compile(sourceCode, path.relative(process.cwd(), this.options.inputTs))

    let disassembly: string | undefined
    if (this.options.disasm) {
      disassembly = await this.disassembleBytecode(bytecode, 'ts')
    }
    
    return {
      bytecode,
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
      
      // Use JavaScript input if provided, otherwise convert TypeScript
      let jsCode: string
      if (this.options.inputJs) {
        // Read the JavaScript file directly
        jsCode = await fs.readFile(this.options.inputJs, 'utf-8')
      } else {
        // Convert TypeScript to JavaScript by stripping types
        const tsCode = await fs.readFile(this.options.inputTs, 'utf-8')
        jsCode = this.stripTypeScript(tsCode)
      }
      
      // Compile with QuickJS WASM (placeholder - would need actual WASM binding)
      const inputFileName = this.options.inputJs || this.options.inputTs
      const bytecode = await this.compileJavaScriptWithWasm(jsCode, inputFileName)
      
      let disassembly: string | undefined
      if (this.options.disasm) {
        disassembly = await this.disassembleBytecode(bytecode, 'wasm')
      }
      
      return {
        bytecode,
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

  private stripTypeScript(tsCode: string): string {
    // Simple TypeScript stripping - remove type annotations
    return tsCode
      .replace(/:\s*\w+\s*=/g, ' =')
      .replace(/:\s*\w+\s*\)/g, ')')
      .replace(/:\s*\w+\s*;/g, ';')
      .replace(/:\s*\w+\s*,/g, ',')
      .replace(/:\s*\w+\s*$/g, '')
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
    
    console.log(`💾 Artifacts saved to ${this.artifactsDir}/`)
  }

  private compareResults(tsResult: CompilationResult, wasmResult: CompilationResult): void {
    console.log('\n📊 Comparison Results:')
    console.log('─'.repeat(50))
    
    // Size comparison
    console.log(`TypeScript compiler: ${tsResult.size} bytes`)
    console.log(`WASM compiler:       ${wasmResult.size} bytes`)
    
    const sizeDiff = tsResult.size - wasmResult.size
    const sizePercent = wasmResult.size > 0 ? (sizeDiff / wasmResult.size * 100).toFixed(1) : 'N/A'
    console.log(`Size difference:     ${sizeDiff > 0 ? '+' : ''}${sizeDiff} bytes (${sizePercent}%)`)
    
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

export { BytecodeComparator, ComparisonOptions }