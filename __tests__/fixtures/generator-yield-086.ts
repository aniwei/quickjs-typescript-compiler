// 组合：generator + yield*
function* g86() {
  yield 86;
  yield* [1, 2, 3];
  return 86+1;
}
let t = 0;
for (const v of g86()) t += v;
console.log(t);
