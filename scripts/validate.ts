#!/usr/bin/env tsx

/**
 * Script to verify that TypeScript compiler bytecode matches QuickJS WASM output
 * Run: tsx scripts/verifyBytecodeAlignment.ts
 */

import fs from 'fs/promises'
import path from 'path'
import { TypeScriptCompiler } from '../src/index'
import { execSync } from 'child_process'

interface TestResult {
  file: string
  passed: boolean
  tsSize?: number
  wasmSize?: number
  difference?: number
  atomOrder?: {
    ts: string[]
    wasm: string[]
  }
  errors?: string[]
}

class BytecodeAlignmentVerifier {
  private results: TestResult[] = []
  
  async verifyAllFixtures(): Promise<void> {
    console.log('🔍 Verifying bytecode alignment with QuickJS...\n')
    
    const fixturesDir = '__tests__/compiler/fixtures'
    const files = await fs.readdir(fixturesDir)
    const tsFiles = files.filter(f => f.endsWith('.ts'))
    
    for (const file of tsFiles) {
      const result = await this.verifyFile(path.join(fixturesDir, file))
      this.results.push(result)
    }
    
    this.printResults()
  }
  
  private async verifyFile(filePath: string): Promise<TestResult> {
    const fileName = path.basename(filePath)
    const result: TestResult = { file: fileName, passed: false }
    
    try {
      // Compile with TypeScript compiler
      const tsCompiler = new TypeScriptCompiler({
        bigInt: false,
        dump: false,
        shortCode: false,
        debug: false,
        strictMode: false
      })
      
      const tsBytecode = await tsCompiler.compileFile(filePath)
      result.tsSize = tsBytecode.length
      
      // Compile with WASM QuickJS (using the comparison script)
      const compareOutput = execSync(
        `tsx scripts/compareWithWasm.ts ${filePath} --disasm`,
        { encoding: 'utf8' }
      )
      
      // Parse the comparison output
      const wasmSizeMatch = compareOutput.match(/WASM size: (\d+) bytes/)
      if (wasmSizeMatch) {
        result.wasmSize = parseInt(wasmSizeMatch[1])
      }
      
      // Extract atom ordering from disassembly
      result.atomOrder = this.extractAtomOrder(compareOutput)
      
      // Check if bytecodes match
      if (compareOutput.includes('✅ Bytecodes are identical!')) {
        result.passed = true
      } else {
        result.difference = Math.abs((result.tsSize || 0) - (result.wasmSize || 0))
        result.errors = this.extractErrors(compareOutput)
      }
      
    } catch (error: any) {
      result.errors = [error.message]
    }
    
    return result
  }
  
  private extractAtomOrder(output: string): { ts: string[], wasm: string[] } {
    const atomOrder = { ts: [], wasm: [] }
    
    // Extract TypeScript atoms
    const tsAtomsMatch = output.match(/TypeScript atoms: \[(.*?)\]/)
    if (tsAtomsMatch) {
      atomOrder.ts = tsAtomsMatch[1].split(',').map(s => s.trim().replace(/['"]/g, ''))
    }
    
    // Extract WASM atoms
    const wasmAtomsMatch = output.match(/WASM atoms: \[(.*?)\]/)
    if (wasmAtomsMatch) {
      atomOrder.wasm = wasmAtomsMatch[1].split(',').map(s => s.trim().replace(/['"]/g, ''))
    }
    
    return atomOrder
  }
  
  private extractErrors(output: string): string[] {
    const errors: string[] = []
    
    // Look for specific error patterns
    if (output.includes('Byte-level differences:')) {
      const diffMatch = output.match(/Position \d+: TS=.*? vs WASM=.*?/g)
      if (diffMatch) {
        errors.push(...diffMatch.slice(0, 3)) // First 3 differences
      }
    }
    
    if (output.includes('Atom order mismatch')) {
      errors.push('Atom ordering differs between TS and WASM')
    }
    
    return errors
  }
  
  private printResults(): void {
    console.log('\n📊 Verification Results:\n')
    console.log('═'.repeat(80))
    
    let passedCount = 0
    let failedCount = 0
    
    for (const result of this.results) {
      const status = result.passed ? '✅' : '❌'
      const sizeInfo = result.tsSize && result.wasmSize 
        ? `(TS: ${result.tsSize}B, WASM: ${result.wasmSize}B, Diff: ${result.difference}B)`
        : ''
      
      console.log(`${status} ${result.file.padEnd(30)} ${sizeInfo}`)
      
      if (!result.passed && result.errors) {
        for (const error of result.errors) {
          console.log(`   └─ ${error}`)
        }
        
        if (result.atomOrder && 
            JSON.stringify(result.atomOrder.ts) !== JSON.stringify(result.atomOrder.wasm)) {
          console.log(`   └─ Atom order:`)
          console.log(`      TS:   [${result.atomOrder.ts.join(', ')}]`)
          console.log(`      WASM: [${result.atomOrder.wasm.join(', ')}]`)
        }
      }
      
      if (result.passed) passedCount++
      else failedCount++
    }
    
    console.log('═'.repeat(80))
    console.log(`\n📈 Summary: ${passedCount} passed, ${failedCount} failed`)
    
    if (failedCount === 0) {
      console.log('\n🎉 All fixtures match QuickJS bytecode perfectly!')
    } else {
      console.log('\n⚠️  Some fixtures still have mismatches. Review the errors above.')
    }
  }
}

// Additional utility to analyze specific bytecode differences
class BytecodeAnalyzer {
  static analyzeAtomTable(bytecode: Uint8Array): string[] {
    const atoms: string[] = []
    let offset = 1 // Skip BC_VERSION
    
    // Read atom count
    const { value: atomCount, bytesRead } = this.readLEB128(bytecode, offset)
    offset += bytesRead
    
    // Read each atom string
    for (let i = 0; i < atomCount && offset < bytecode.length; i++) {
      const { value: encodedLen, bytesRead: lenBytes } = this.readLEB128(bytecode, offset)
      offset += lenBytes
      
      const actualLen = encodedLen >> 1
      if (offset + actualLen <= bytecode.length) {
        const str = new TextDecoder().decode(bytecode.slice(offset, offset + actualLen))
        atoms.push(str)
        offset += actualLen
      }
    }
    
    return atoms
  }
  
  private static readLEB128(buffer: Uint8Array, offset: number): { value: number, bytesRead: number } {
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
  
  static compareByteArrays(a: Uint8Array, b: Uint8Array): {
    identical: boolean,
    firstDiffOffset?: number,
    diffCount?: number
  } {
    if (a.length !== b.length) {
      return { 
        identical: false, 
        firstDiffOffset: Math.min(a.length, b.length),
        diffCount: Math.abs(a.length - b.length)
      }
    }
    
    let firstDiffOffset: number | undefined
    let diffCount = 0
    
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        if (firstDiffOffset === undefined) {
          firstDiffOffset = i
        }
        diffCount++
      }
    }
    
    return {
      identical: diffCount === 0,
      firstDiffOffset,
      diffCount
    }
  }
}

// Main execution
async function main() {
  const verifier = new BytecodeAlignmentVerifier()
  
  try {
    await verifier.verifyAllFixtures()
  } catch (error) {
    console.error('❌ Verification failed:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { BytecodeAlignmentVerifier, BytecodeAnalyzer }