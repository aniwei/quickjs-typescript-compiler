// 组合：logical assignment + nullish assignment
let a = 30 % 2 ? 0 : 1;
let b = null;
a ||= 3;
a &&= 7;
b ??= 30;
console.log(a, b);
