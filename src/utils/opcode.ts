import { OPCODE_DEFS, OPCODE_NAME_TO_CODE, OpcodeDefinition } from '../env';

console.log("DEBUG: push_atom_value code =", OPCODE_NAME_TO_CODE["push_atom_value"]);
console.log("DEBUG: push_const code =", OPCODE_NAME_TO_CODE["push_const"]);

const opcodeMap = new Map<number, OpcodeDefinition>();

for (const [key, def] of Object.entries(OPCODE_DEFS)) {
  // key is "OP_push_i32"
  // def.id is "push_i32"
  const code = OPCODE_NAME_TO_CODE[def.id];
  if (code !== undefined) {
    opcodeMap.set(code, def);
  }
}

export function getOpcodeDefinition(opcode: number): OpcodeDefinition | undefined {
  return opcodeMap.get(opcode);
}
