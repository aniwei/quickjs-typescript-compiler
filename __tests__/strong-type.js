'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
// 强类型演示（需在你的项目中提供 i32/u32/i64 的类型声明，比如通过 .d.ts）
// 你也可以用 TS typedef 模拟：type i32 = number & { __i32: true };（此处注释化）
// 运行：
// 1) 先执行脚本自动对齐魔数/版本：  ts-node scripts/auto-align-quickjs.ts
// 2) 编译：                         ts-node src/cli.ts examples/strong-types.ts out.qjbc --short
// 3) 验证：                         bash scripts/verify-with-qjs.sh out.qjbc
// 简单的 i32/u32/i64 变量与运算
function add_i32(a /* i32 */, b /* i32 */) {
    return a + b;
}
function to_u32(x /* u32 */) {
    return x;
}
function add_i64(a /* i64 */, b /* i64 */) {
    return a + b;
}
function main() {
    const a /* i32 */ = 2147483647; // 需要收窄为 i32
    const b /* i32 */ = 1;
    const c /* i32 */ = add_i32(a, b); // 溢出后 |0
    const x /* u32 */ = -1; // >>>0 => 4294967295
    const y /* u32 */ = to_u32(x);
    const m /* i64 */ = 9007199254740991n; // BigInt 直接 i64
    const n /* i64 */ = 2n;
    const p /* i64 */ = add_i64(m, n);
    // 返回 i32
    return c;
}
main();
