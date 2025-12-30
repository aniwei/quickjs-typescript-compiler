// 组合：switch + fallthrough + block scoped let
let x = 4%4;
let r = 0;
switch (x) {
  case 0: r += 1;
  case 1: r += 2; break;
  default: { let t = 3; r += t; }
}
console.log(x, r);
