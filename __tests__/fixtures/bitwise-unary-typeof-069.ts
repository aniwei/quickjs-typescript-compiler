// 组合：bitwise + unary + typeof
const x = (69 | 3) ^ 5;
const y = ~x;
console.log(x, y, typeof y, !!y);
