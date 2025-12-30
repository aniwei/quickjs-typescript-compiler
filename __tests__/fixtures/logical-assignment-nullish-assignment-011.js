// 组合：logical assignment + nullish assignment
let a = 11 % 2 ? 0 : 1;
let b = null;
a ||= 3;
a &&= 7;
b ??= 11;
console.log(a, b);
