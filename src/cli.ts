#!/usr/bin/env node

/**
 * Command Line Interface for QuickJS TypeScript Compiler
 */

import fs from 'fs/promises'
import path from 'path'
import { TypeScriptCompiler, CompileFlags } from './index'

interface CLIOptions extends CompileFlags {
  output?: string
  disasm?: boolean
  showCFG?: boolean
  pc2line?: boolean
  verbose?: boolean
}

async function main() {
  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    console.log('Usage: quickjs-ts-compiler <input.ts> [options]')
    console.log('Options:')
    console.log('  -o, --output <file>    Output bytecode file')
    console.log('  --bigint              Enable BigInt support')
    console.log('  --dump                Enable debug dump')
    console.log('  --no-shortcode        Disable short opcode optimization')
    console.log('  --debug               Enable debug mode')
    console.log('  --no-strict           Disable strict mode')
    console.log('  --disasm              Disassemble bytecode (for debugging)')
    console.log('  --showCFG             Show control flow graph')
    console.log('  --pc2line             Show PC to line mapping')
    console.log('  -v, --verbose         Verbose output')
    return
  }
  
  const inputFile = args[0]
  const options: CLIOptions = {}
  
  // Parse arguments
  for (let i = 1; i < args.length; i++) {
    const arg = args[i]
    switch (arg) {
      case '-o':
      case '--output':
        options.output = args[++i]
        break
      case '--bigint':
        options.bigInt = true
        break
      case '--dump':
        options.dump = true
        break
      case '--no-shortcode':
        options.shortCode = false
        break
      case '--debug':
        options.debug = true
        break
      case '--no-strict':
        options.strictMode = false
        break
      case '--disasm':
        options.disasm = true
        break
      case '--showCFG':
        options.showCFG = true
        break
      case '--pc2line':
        options.pc2line = true
        break
      case '-v':
      case '--verbose':
        options.verbose = true
        break
      default:
        console.warn(`Unknown option: ${arg}`)
    }
  }
  
  try {
    await compileTsFile(inputFile, options)
  } catch (error) {
    console.error('Compilation failed:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

async function compileTsFile(inputFile: string, options: CLIOptions) {
  // Resolve input file path
  const inputPath = path.resolve(inputFile)
  
  // Check if input file exists
  try {
    await fs.access(inputPath)
  } catch {
    throw new Error(`Input file not found: ${inputPath}`)
  }
  
  if (options.verbose) {
    console.log(`Compiling: ${inputPath}`)
    console.log('Options:', {
      bigInt: options.bigInt,
      dump: options.dump,
      shortCode: options.shortCode,
      debug: options.debug,
      strictMode: options.strictMode,
      disasm: options.disasm
    })
  }
  
  // Create compiler with options
  const compilerOptions: CompileFlags = {
    bigInt: options.bigInt,
    dump: options.dump,
    shortCode: options.shortCode !== false, // Default to true unless explicitly disabled
    debug: options.debug,
    strictMode: options.strictMode !== false // Default to true unless explicitly disabled
  }
  
  const compiler = new TypeScriptCompiler(compilerOptions)
  
  // Compile file
  const startTime = Date.now()
  const bytecode = await compiler.compileFile(inputPath)
  const compileTime = Date.now() - startTime
  
  if (options.verbose) {
    console.log(`Compilation completed in ${compileTime}ms`)
    console.log(`Bytecode size: ${bytecode.length} bytes`)
  }
  
  // Determine output file
  let outputPath: string
  if (options.output) {
    outputPath = path.resolve(options.output)
  } else {
    const parsed = path.parse(inputPath)
    outputPath = path.join(parsed.dir, parsed.name + '.qbc') // QuickJS Bytecode
  }
  
  // Write bytecode to file
  await fs.writeFile(outputPath, bytecode)
  
  if (options.verbose) {
    console.log(`Bytecode written to: ${outputPath}`)
  }
  
  // Debug options
  if (options.disasm) {
    await disassembleBytecode(bytecode, inputPath)
  }
  
  if (options.showCFG) {
    console.log('Control Flow Graph generation not implemented yet')
  }
  
  if (options.pc2line) {
    console.log('PC to line mapping not implemented yet')
  }
  
  console.log('✓ Compilation successful')
}

async function disassembleBytecode(bytecode: Uint8Array, sourceFile: string) {
  console.log('\n--- Disassembly ---')
  console.log(`Source: ${sourceFile}`)
  console.log(`Bytecode size: ${bytecode.length} bytes`)
  console.log('')
  
  // Simple hex dump for now
  // TODO: Implement proper disassembler
  for (let i = 0; i < bytecode.length; i += 16) {
    const chunk = bytecode.slice(i, i + 16)
    const hex = Array.from(chunk)
      .map(b => b.toString(16).padStart(2, '0'))
      .join(' ')
    const ascii = Array.from(chunk)
      .map(b => (b >= 32 && b <= 126) ? String.fromCharCode(b) : '.')
      .join('')
    
    console.log(`${i.toString(16).padStart(8, '0')}: ${hex.padEnd(47, ' ')} |${ascii}|`)
  }
  
  console.log('--- End Disassembly ---\n')
}

// Run CLI
if (require.main === module) {
  main().catch(error => {
    console.error('CLI Error:', error)
    process.exit(1)
  })
}