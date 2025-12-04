import path from 'path';
import { TypeScriptCompiler } from '../src';
import { Opcode } from '../src/env';
import { opcodeInfo } from '../src/opcodeInfo';
import { JSFunctionDef } from '../src/functionDef';

const TEMP_OPS = new Set<Opcode>([
  Opcode.OP_scope_get_var,
  Opcode.OP_scope_get_var_undef,
  Opcode.OP_scope_get_var_checkthis,
  Opcode.OP_scope_put_var,
  Opcode.OP_scope_put_var_init,
  Opcode.OP_scope_delete_var,
  Opcode.OP_scope_get_ref,
  Opcode.OP_scope_make_ref,
  Opcode.OP_scope_get_private_field,
  Opcode.OP_scope_get_private_field2,
  Opcode.OP_scope_put_private_field,
  Opcode.OP_scope_in_private_field,
]);

async function main() {
  const compiler = new TypeScriptCompiler({ debug: false });
  const fixture = path.resolve(__dirname, '../__tests__/compiler/fixtures/compute.ts');
  const { functionDef } = await compiler.compileFileWithArtifacts(fixture);
  const hits: Array<{ funcName: string; pc: number; opcode: Opcode }> = [];
  const queue: JSFunctionDef[] = [functionDef];
  const visited = new Set<JSFunctionDef>();
  while (queue.length > 0) {
    const func = queue.pop()!;
    if (visited.has(func))
      continue;
    visited.add(func);
    if (Array.isArray(func.children) && func.children.length > 0) {
      queue.push(...func.children);
    }
    const buf = func.byteCode.buffer;
    for (let pc = 0; pc < buf.length;) {
      const op = buf[pc] as Opcode;
      const info = opcodeInfo[op];
      if (!info) {
        throw new Error(`Unknown opcode ${op} at pc=${pc}`);
      }
      if (TEMP_OPS.has(op)) {
        hits.push({ funcName: describeFunc(func), pc, opcode: op });
      }
      pc += info.size;
    }
  }
  console.log('prefix', Array.from(functionDef.byteCode.buffer.slice(0, 32)));
  console.log(JSON.stringify({ count: hits.length, hits }, null, 2));
}

function describeFunc(func: JSFunctionDef): string {
  const atomManager = func.ctx?.atomManager;
  if (atomManager && typeof func.funcName === 'number') {
    const name = atomManager.getString(func.funcName);
    if (name)
      return name;
  }
  return '<anonymous>';
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
