import { TypeScriptCompiler } from '../../src'
import { BytecodeTag, Opcode } from '../../src/env'
import { FunctionBytecode } from '../../src/functionBytecode'

async function compileInstructions(source: string, fileName: string) {
  const compiler = new TypeScriptCompiler()
  const { functionDef } = await compiler.compileSourceWithArtifacts(source, fileName)
  return functionDef.bytecode.instructions
}

describe('compiler control-flow integration', () => {
  test('for-of break emits a jump to the loop exit label', async () => {
    const instructions = await compileInstructions(
      `
      const values = [1, 2]
      for (const value of values) {
        break
      }
    `,
      'for-of-break.ts'
    )

    const storeIndex = instructions.findIndex((instruction) => instruction.opcode === Opcode.OP_put_loc0)
    expect(storeIndex).toBeGreaterThan(-1)

    const breakJump = instructions[storeIndex + 1]
    expect(breakJump.opcode).toBe(Opcode.OP_goto8)
    expect(breakJump.operands[0]).toBeGreaterThan(0)
  })

  test('for-of continue jumps back to the loop condition', async () => {
    const instructions = await compileInstructions(
      `
      const values = [1, 2]
      for (const value of values) {
        continue
      }
    `,
      'for-of-continue.ts'
    )

    const storeIndex = instructions.findIndex((instruction) => instruction.opcode === Opcode.OP_put_loc0)
    expect(storeIndex).toBeGreaterThan(-1)

    const continueJump = instructions[storeIndex + 1]
    expect(continueJump.opcode).toBe(Opcode.OP_goto8)
    expect(continueJump.operands[0]).toBeGreaterThan(0)
  })

  test('labeled break unwinds inner loop before exiting outer loop', async () => {
    const instructions = await compileInstructions(
      `
      const matrix = [[1], [2]]
      outer: for (const row of matrix) {
        for (const value of row) {
          break outer
        }
      }
    `,
      'labeled-break.ts'
    )

    const innerStoreIndex = instructions.findIndex((instruction) => instruction.opcode === Opcode.OP_put_loc1)
    expect(innerStoreIndex).toBeGreaterThan(-1)

    const cleanup = instructions[innerStoreIndex + 1]
    const jump = instructions[innerStoreIndex + 2]

    expect(cleanup.opcode).toBe(Opcode.OP_iterator_close)
    expect(jump.opcode).toBe(Opcode.OP_goto8)
  })

  test('while loop continue jumps to condition check', async () => {
    const instructions = await compileInstructions(
      `
      let value = 1
      while (value) {
        continue
      }
    `,
      'while-continue.ts'
    )

    const continueGotoIndex = instructions.findIndex((instruction) =>
      instruction.opcode === Opcode.OP_goto8 && instruction.operands[0] < 0
    )
    expect(continueGotoIndex).toBeGreaterThan(-1)
  })

  test('for loop increment is evaluated on continue', async () => {
    const instructions = await compileInstructions(
      `
      for (let index = 0; index; 1) {
        continue
      }
    `,
      'for-continue.ts'
    )

    const pushLiteralIndex = instructions.findIndex((instruction) => instruction.opcode === Opcode.OP_push_1)
    expect(pushLiteralIndex).toBeGreaterThan(-1)

    const dropAfterLiteral = instructions[pushLiteralIndex + 1]
    expect(dropAfterLiteral?.opcode).toBe(Opcode.OP_drop)
  })

  test('switch statement emits strict equality checks and exit jump', async () => {
    const instructions = await compileInstructions(
      `
      const value = 2
      switch (value) {
        case 1:
          break
        default:
          break
      }
    `,
      'switch-basic.ts'
    )

    const hasStrictEq = instructions.some((instruction) => instruction.opcode === Opcode.OP_strict_eq)
    expect(hasStrictEq).toBe(true)

    const gotoExit = instructions.find((instruction) => instruction.opcode === Opcode.OP_goto8 && instruction.operands[0] > 0)
    expect(gotoExit).toBeDefined()
  })

  test('switch with only return clauses does not emit a trailing drop', async () => {
    const compiler = new TypeScriptCompiler()
    const { functionDef } = await compiler.compileSourceWithArtifacts(
      `
      function categorize(value) {
        switch (value) {
          case 0:
            return value
          case 1:
            return value + 1
          default:
            return value - 1
        }
      }
    `,
      'switch-return.ts'
    )

    const functionEntry = functionDef.bytecode.constantPool.find(
      (entry): entry is { tag: BytecodeTag.TC_TAG_FUNCTION_BYTECODE; value: FunctionBytecode } =>
        entry.tag === BytecodeTag.TC_TAG_FUNCTION_BYTECODE
    )

    expect(functionEntry).toBeDefined()

    const categorizeBytecode = functionEntry!.value
    const lastInstruction = categorizeBytecode.instructions[categorizeBytecode.instructions.length - 1]

    expect(lastInstruction.opcode).toBe(Opcode.OP_return)
  })
})
