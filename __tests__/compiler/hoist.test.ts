import { AtomTable } from '../../src/atoms'
import { TypeScriptCompiler } from '../../src'
import { Opcode } from '../../src/env'

describe('hoisted globals', () => {
  test('records global metadata and emits QuickJS-aligned prologue', async () => {
    const atomTable = new AtomTable()
    const compiler = new TypeScriptCompiler({ atomTable })
    const source = `
      var outer = 1
      function foo() {}
      let lexicalLet
    `
    const { functionDef } = await compiler.compileSourceWithArtifacts(source, 'hoist.ts')

    expect(functionDef.isGlobalVar).toBe(true)
    expect(functionDef.globalVars.length).toBeGreaterThanOrEqual(2)

    const outerAtom = atomTable.getAtomId('outer')
    const fooAtom = atomTable.getAtomId('foo')
    const lexicalAtom = atomTable.getAtomId('lexicalLet')
    const globals = new Map(functionDef.globalVars.map((entry) => [entry.name, entry]))

    expect(globals.get(outerAtom)?.isLexical).toBe(false)
    expect(globals.get(fooAtom)?.funcPoolIndex).toBeGreaterThanOrEqual(0)
    expect(globals.get(lexicalAtom)?.isLexical).toBe(true)
    expect(globals.get(lexicalAtom)?.forceInit).toBe(true)

    const opcodes = functionDef.bytecode.instructions.map((instruction) => instruction.opcode)
    const guardIndex = opcodes.indexOf(Opcode.OP_return_undef)
    expect(guardIndex).toBeGreaterThanOrEqual(0)

    const defineVarIndex = opcodes.findIndex((code, idx) => code === Opcode.OP_define_var && idx > guardIndex)
    const putVarIndex = opcodes.findIndex((code, idx) => code === Opcode.OP_put_var && idx > guardIndex)

    expect(defineVarIndex).toBeGreaterThan(guardIndex)
    expect(putVarIndex).toBeGreaterThan(guardIndex)
    expect(opcodes).toContain(Opcode.OP_define_func)
  })
})
