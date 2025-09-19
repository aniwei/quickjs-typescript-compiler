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
  const jf = code.filter(op => op === OpCode.OP_if_false).length
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
  const jf = code.filter(op => op === OpCode.OP_if_false).length
  assert(jf >= 1, 'while || should contain at least one jmp_if_false')
}

console.log('controlflow tests passed')

// break/continue lowering presence
{
  const src = `
  let a:number = 0; 
  for (let i:number = 0; i < 3; i++) { 
    if (i < 1) continue; 
    if (i > 1) break; 
    a = a as any; 
  }
  `
  const ir = compileToIR(src, 'break_continue.ts')
  const { code } = emitBytecode(ir)
  const jmpCount = code.filter(op => op === OpCode.OP_goto).length
  // 至少一处 jump（break 或 continue 之一），具体数量依赖 if 的 else 降级细节
  if (!(jmpCount >= 1)) throw new Error('break/continue should produce jumps')
}

// labeled break/continue and nested loops
{
  const src = `
  outer: for (let i:number = 0; i < 3; i++) {
    inner: for (let j:number = 0; j < 3; j++) {
      if (j === 0) continue inner;
      if (i === 2) break outer;
    }
  }
  `
  const ir = compileToIR(src, 'labeled_nest.ts')
  const { code } = emitBytecode(ir)
  const jmpCount = code.filter(op => op === OpCode.OP_goto).length
  if (!(jmpCount >= 2)) throw new Error('nested labeled break/continue should produce multiple jumps')
}

// if-else with break/continue inside
{
  const src = `
  for (let i:number = 0; i < 5; i++) {
    if (i % 2 as any) { continue }
    else { break }
  }
  `
  const ir = compileToIR(src, 'ifelse_bc.ts')
  const { code } = emitBytecode(ir)
  const hasCondJmp = code.includes(OpCode.OP_if_false)
  const hasJmp = code.includes(OpCode.OP_goto)
  if (!hasCondJmp || !hasJmp) throw new Error('if-else with break/continue should have jumps')
}

// for(;;) infinite loop minimal lowering
{
  const src = `
  for(;;) { break }
  `
  const ir = compileToIR(src, 'for_inf.ts')
  const { code } = emitBytecode(ir)
  const hasJmp = code.includes(OpCode.OP_goto)
  if (!hasJmp) throw new Error('for(;;) with break should still have a jump back or out')
}
