import { Opcode, OpFormat } from '../env'

export function getOpcodeDefinition(op: Opcode) {
  return { 
    id: Opcode[op],
    name: Opcode[op], 
    size: 1,
    nPop: 0,
    nPush: 0,
    format: OpFormat.none
  }
}
