'use strict';

// 循环内重复属性访问（IC 热路径） + BigInt 常量折叠 + with 静态分派

function sumProps(list: any[], key: string): any /* i32 */ {
  let s /* i32 */ = 0;
  for (let i = 0; i < list.length; i++) {
    // 期望在优化后：get_loc i; get_field_ic <atom:key>
    s += list[i][key] as any /* i32 */;
  }
  return s as any /* i32 */;
}

function big(): bigint /* i64 */ {
  // 编译期折叠：123n + 456n -> 579n
  return 123n + 456n;
}

with ({ a: 10, b: 20 }) {
  // 静态分派：a、b 直接访问到 with 对象的属性，不走 with_*
  const x /* i32 */ = a + b;
  // 非静态属性名将回退 with_* 动态兜底
}

export function main() {
  const arr = [{v:1},{v:2},{v:3}];
  const s /* i32 */ = sumProps(arr, 'v' as any /* string */);
  const B /* i64 */ = big();
  return s;
}