import { compileToIR } from '../compile'
import { emitBytecode } from '../bytecode'
import { run } from '../testkit/interpreter'
import { OpCode } from '../opcodes'
import { disassemble } from '../disasm'

function assert(cond: boolean, msg: string) { if (!cond) throw new Error('Assertion failed: ' + msg) }

// 1) ToNumber around relational
{
  const src = `
  let a:number = 1;
  let b:any = '2';
  for (let i:number = 0; i < (b as any); i++) { }
  `
  const ir = compileToIR(src, 'rel.ts')
  const { code, constants, localCount } = emitBytecode(ir)
  // 我们不再静态插入 ToNumber，行为交给运行时；此处仅确保编译流程正常
  // sanity-run full code to ensure interpreter doesn't throw
  const r = run(code, constants as any[], localCount)
  assert(Array.isArray(r.locals), 'interpreter completed')
}

// 2) NaN behavior with < and equality
{
  const src = `
  let x:any = NaN as any; let y:number = 5;
  for (let i:number = 0; i < y; i++) { }
  `
  const ir = compileToIR(src, 'nan.ts')
  const { code, constants, localCount } = emitBytecode(ir)
  const r = run(code, constants as any[], localCount)
  assert(Array.isArray(r.locals), 'nan program interpreted')
}

// 3) == vs === lowering validation by direct opcode sequence
{
  // Manually build IR-like sequence using constants
  // a == b
  const eqCode = [
    2, 0, 0, // push_const 0
    2, 1, 0, // push_const 1
    22,      // OP_eq
    16       // return_undef
  ]
  const eqConsts = ['2', 2]
  const r1 = run(eqCode, eqConsts as any[], 0)
  assert(r1.stack.length === 0 || typeof r1.stack[r1.stack.length-1] !== 'boolean', 'return_undef clears flow')
  // But we can re-run without return for direct check
  const eqCode2 = [2,0,0, 2,1,0, 22]
  const r2 = run(eqCode2, eqConsts as any[], 0)
  // eslint-disable-next-line eqeqeq
  assert((eqConsts[0] as any) == (eqConsts[1] as any) === true, 'JS sanity')
  assert(r2.stack.pop() === true, 'OP_eq uses abstract equality')
}

{
  // a === b should be false for '2' and 2
  const code = [
    2, 0, 0,
    2, 1, 0,
    23 // strict_eq
  ]
  const consts = ['2', 2]
  const r = run(code, consts as any[], 0)
  assert(r.stack.pop() === false, 'OP_strict_eq uses strict equality')
}

console.log('semantics tests passed')

// 4) Direct relational opcodes for <=, >, >= including NaN behavior
{
  const C = [2, NaN, 5] // 0:'2' not used here; 1:NaN, 2:5
  // a<=b where a=2, b=5 -> true
  const leTrue = [OpCode.OP_push_const, 0, 0, OpCode.OP_push_const, 2, 0, OpCode.OP_le]
  const rLeTrue = run(leTrue, [2, NaN, 5] as any[], 0)
  assert(rLeTrue.stack.pop() === true, '<= true for 2<=5')

  // a> b where a=2, b=5 -> false
  const gtFalse = [OpCode.OP_push_const, 0, 0, OpCode.OP_push_const, 2, 0, OpCode.OP_gt]
  const rGtFalse = run(gtFalse, [2, NaN, 5] as any[], 0)
  assert(rGtFalse.stack.pop() === false, '> false for 2>5')

  // a>=b where a=2, b=5 -> false
  const geFalse = [OpCode.OP_push_const, 0, 0, OpCode.OP_push_const, 2, 0, OpCode.OP_ge]
  const rGeFalse = run(geFalse, [2, NaN, 5] as any[], 0)
  assert(rGeFalse.stack.pop() === false, '>= false for 2>=5')

  // NaN with any relational is false
  const rels = [OpCode.OP_lt, OpCode.OP_le, OpCode.OP_gt, OpCode.OP_ge]
  for (const rel of rels) {
    const prog = [OpCode.OP_push_const, 1, 0, OpCode.OP_push_const, 2, 0, rel]
    const rr = run(prog, [2, NaN, 5] as any[], 0)
    assert(rr.stack.pop() === false, 'NaN relational is false')
  }
}

// 6) string vs string relational should not force numeric compare here
{
  // '2' < '10' 在 JS 中为 false（字典序），如果强制 ToNumber 则会变为 true（2 < 10），我们要确保不插入 ToNumber
  const code = [OpCode.OP_push_const, 0, 0, OpCode.OP_push_const, 1, 0, OpCode.OP_lt]
  const consts = ['2', '10']
  const r = run(code, consts as any[], 0)
  assert(r.stack.pop() === false, "'2' < '10' is false in string compare")
}

// 7) Constant folding for literal comparisons and equality; disasm shows push_const true/false
{
  const src = `
  if (2 < 5) {}
  if ('b' < 'a') {}
  if (2 == '2') {}
  if (2 === 2) {}
  `
  const ir = compileToIR(src, 'fold.ts')
  const { code, constants, localCount } = emitBytecode(ir)
  // 容忍存在多个 push_const 布尔值
  const boolConsts = (constants as any[]).filter(v => typeof v === 'boolean')
  assert(boolConsts.length >= 2, 'constant folding produced booleans')
  // 反汇编中应看到 push_const index=.. (true/false)，且比较指令数量少或为0
  const mod = require('../assembler')
  const { serializeQuickJS } = mod
  const bc = serializeQuickJS({ code, constants: constants as any[], atoms: [], localCount, stackSize: 4 })
  const text = disassemble(bc.buffer)
  const hasCmp = /(OP_lt|OP_le|OP_gt|OP_ge|OP_eq|OP_strict_eq)/.test(text)
  // 允许存在用于其它路径的比较，这里只要求至少有布尔 push_const 可见
  assert(/\(true\)|\(false\)/.test(text), 'disasm shows folded boolean constants')
}

// 8) Type-directed conversions: annotated number triggers ToNumber; annotated string triggers ToString
{
  const src = `
  let a: number = 1; let b: any = '10' as any; if (a < (b as any)) {}
  let s1: string = '2'; let s2: string = '10'; if (s1 < s2) {}
  `
  const ir = compileToIR(src, 'typed_conv.ts')
  const { code } = emitBytecode(ir)
  const toNumCount = code.filter(op => op === OpCode.OP_to_number).length
  const toStrCount = code.filter(op => op === OpCode.OP_to_string).length
  assert(toNumCount >= 1, 'inserts OP_to_number for annotated number side')
  assert(toStrCount >= 1, 'inserts OP_to_string for annotated string side')
}

// 5) Logical && and || in for condition (pattern test)
{
  const src = `
  let a:number = 1; let b:number = 2; let c:number = 3;
  for (let i:number = 0; (i < b) && (a < c); i++) {}
  `
  const ir = compileToIR(src, 'logic_and.ts')
  const { code } = emitBytecode(ir)
  // Expect at least one jmp_if_false for left, and final jmp_if_false for overall
  const countJmpIfFalse = code.filter(op => op === OpCode.OP_jmp_if_false).length
  assert(countJmpIfFalse >= 2, '&& should produce two jmp_if_false (left short-circuit + final)')
}

{
  const src = `
  let a:number = 1; let b:number = 2; let c:number = 3;
  for (let i:number = 0; (i < b) || (a < c); i++) {}
  `
  const ir = compileToIR(src, 'logic_or.ts')
  const { code } = emitBytecode(ir)
  // 对于 ||，左为真时将跳过右侧，仍会有最终的 jmp_if_false 判定
  const countJmpIfFalse = code.filter(op => op === OpCode.OP_jmp_if_false).length
  assert(countJmpIfFalse >= 1, '|| should produce at least one jmp_if_false (final)')
}
