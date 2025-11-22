import { execSync } from 'child_process'
import path from 'path'

const fixtures = [
  '__tests__/compiler/fixtures/compute.ts',
  '__tests__/compiler/fixtures/long-jump.ts'
]

console.log('🔍 Validating compilation with QJS_NO_SHORT_OPCODES=1...')

let hasError = false

for (const fixture of fixtures) {
  const fixturePath = path.resolve(fixture)
  console.log(`\nChecking ${path.basename(fixture)}...`)

  try {
    // Run compiler with disasm output
    const output = execSync(`QJS_NO_SHORT_OPCODES=1 pnpm -s start ${fixturePath} --disasm`, {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe']
    })

    // Check for short opcodes
    const shortOpcodes = [
      'OP_push_const8',
      'OP_put_loc8',
      'OP_get_loc8',
      'OP_if_false8',
      'OP_if_true8',
      'OP_goto8',
      'OP_fclosure8'
    ]

    const foundShortOpcodes = shortOpcodes.filter(op => output.includes(op))

    if (foundShortOpcodes.length > 0) {
      console.error(`❌ Found short opcodes in output: ${foundShortOpcodes.join(', ')}`)
      hasError = true
    } else {
      console.log('✅ No short opcodes found.')
    }

    // Basic check that it produced some bytecode (look for "Bytecode size:")
    if (!output.includes('Bytecode size:')) {
      console.error('❌ No bytecode generated.')
      hasError = true
    } else {
      console.log('✅ Bytecode generated successfully.')
    }

  } catch (error) {
    console.error(`❌ Compilation failed:`, error)
    hasError = true
  }
}

if (hasError) {
  process.exit(1)
}

console.log('\n✨ All checks passed!')
