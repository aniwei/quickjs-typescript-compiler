import { Opcode, env } from '../../env'

export interface ModulePrologueContext {
  withoutDebugRecording<T>(fn: () => T): T
  emitOpcode(opcode: Opcode, operands?: number[], node?: import('typescript').Node | null): number
  emitJump(opcode: Opcode, label: string): void
  createLabel(): string
  markLabel(label: string): void
}

export interface ModulePrologueResult {
  hoistInsertionIndex: number
  hoistLabel: string
}

export function emitModulePrologue(context: ModulePrologueContext): ModulePrologueResult {
  let hoistInsertionIndex = 0
  let hoistLabel = ''

  context.withoutDebugRecording(() => {
    context.emitOpcode(Opcode.OP_push_this)
    const conditionalOpcode = env.supportsShortOpcodes ? Opcode.OP_if_false8 : Opcode.OP_if_false
    hoistLabel = context.createLabel()
    context.emitJump(conditionalOpcode, hoistLabel)
    hoistInsertionIndex = context.emitOpcode(Opcode.OP_return_undef)
    context.markLabel(hoistLabel)
  })

  return {
    hoistInsertionIndex,
    hoistLabel,
  }
}
