// 组合：logical assignment + nullish assignment
let a = 87%2 ? 0 : 1;
let b = null;
a ||= 3;
a &&= 7;
b ??= 87;
console.log(a, b);
