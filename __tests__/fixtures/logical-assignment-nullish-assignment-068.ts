// 组合：logical assignment + nullish assignment
let a = 68%2 ? 0 : 1;
let b = null;
a ||= 3;
a &&= 7;
b ??= 68;
console.log(a, b);
