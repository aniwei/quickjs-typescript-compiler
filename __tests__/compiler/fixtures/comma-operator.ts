export {};
let a = (1, 2);
console.log(a);

let x = 0;
let b = (x = x + 1, x);
console.log(b);

function foo() {
  return (1, 2, 3);
}
console.log(foo());

