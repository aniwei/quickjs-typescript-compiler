import { TypeScriptCompiler } from '../../src'
import { BytecodeTag, Opcode } from '../../src/env'
import { FunctionBytecode } from '../../src/functionBytecode'

describe('throw statement compilation', () => {
  test('emits OP_throw after evaluating expression', async () => {
    const compiler = new TypeScriptCompiler()
    const { functionDef } = await compiler.compileSourceWithArtifacts(
      `
      function fail() {
        throw 42
      }
    `,
      'throw-function.ts'
    )

    const functionEntries = functionDef.bytecode.constantPool.filter(
      (entry): entry is { tag: BytecodeTag.TC_TAG_FUNCTION_BYTECODE; value: FunctionBytecode } =>
        entry.tag === BytecodeTag.TC_TAG_FUNCTION_BYTECODE
    )

    const hasThrowInstruction = functionEntries.some((entry) =>
      entry.value.instructions.some((instruction) => instruction.opcode === Opcode.OP_throw)
    )

    expect(hasThrowInstruction).toBe(true)
  })
})
