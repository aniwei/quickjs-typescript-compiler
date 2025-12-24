// 覆盖：逗号运算符（BinaryExpression: CommaToken）以及 for 的多表达式 init/increment
let x = 0;
let y = 0;

x = (y = 1, y + 2, y * 3);
console.log(x, y);

let a = 0;
let b = 10;
for (a = 0, b = 10; a < 3; a++, b += 2) {
  console.log(a, b);
}
