import { compileToIR } from '../compile'
import { emitBytecode } from '../bytecode'
import { OpCode } from '../opcodes'

function assert(cond: boolean, msg: string) { if (!cond) throw new Error('Assertion failed: ' + msg) }

// if with && short-circuit
{
  const src = `
  let a:number = 1; let b:number = 2; let c:number = 3;
  if ((a < b) && (b < c)) { a = 42 as any; }
  `
  const ir = compileToIR(src, 'if_and.ts')
  const { code } = emitBytecode(ir)
  const jf = code.filter(op => op === OpCode.OP_jmp_if_false).length
  assert(jf >= 2, 'if && should produce at least two jmp_if_false')
}

// while with || short-circuit
{
  const src = `
  let a:number = 1; let b:number = 2; let c:number = 3;
  while ((a < b) || (b < c)) { break as any; }
  `
  const ir = compileToIR(src, 'while_or.ts')
  const { code } = emitBytecode(ir)
  const jf = code.filter(op => op === OpCode.OP_jmp_if_false).length
  assert(jf >= 1, 'while || should contain at least one jmp_if_false')
}

console.log('controlflow tests passed')
