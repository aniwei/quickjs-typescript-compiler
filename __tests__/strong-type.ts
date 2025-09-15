'use strict';

// 强类型演示（需在你的项目中提供 i32/u32/i64 的类型声明，比如通过 .d.ts）
// 你也可以用 TS typedef 模拟：type i32 = number & { __i32: true };（此处注释化）
// 运行：
// 1) 先执行脚本自动对齐魔数/版本：  ts-node scripts/auto-align-quickjs.ts
// 2) 编译：                         ts-node src/cli.ts examples/strong-types.ts out.qjbc --short
// 3) 验证：                         bash scripts/verify-with-qjs.sh out.qjbc

// 简单的 i32/u32/i64 变量与运算
function add_i32(a: i32, b: i32): i32 {
  return (a + b) as i32;
}
function to_u32(x: u32): u32 {
  return x as u32;
}
function add_i64(a: i64, b: i64): i64 {
  return (a + b) as i64;
}

// 窄化/品牌辅助：将 number/bigint 安全收窄为对应的品牌类型
function as_i32(x: number): i32 { return (x | 0) as i32; }
function as_u32(x: number): u32 { return (x >>> 0) as u32; }
function as_i64(x: bigint): i64 { return x as i64; }

export function main(): i32 {
  const a: i32 = as_i32(2147483647);       // 需要收窄为 i32
  const b: i32 = as_i32(1);
  const c: i32 = add_i32(a, b);            // 溢出后 |0

  const x: u32 = as_u32(-1);               // >>>0 => 4294967295
  const y: u32 = to_u32(x);

  const m: i64 = as_i64(9007199254740991n);  // BigInt 直接 i64
  const n: i64 = as_i64(2n);
  const p: i64 = add_i64(m, n);

  // 返回 i32
  return c as i32;
}

main();