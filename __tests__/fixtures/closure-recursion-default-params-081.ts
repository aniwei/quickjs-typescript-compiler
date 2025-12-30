// 组合：closure + recursion + default params
function make81(base = 81) {
  function f(k = 2) {
    if (k <= 0) return base;
    return f(k - 1) + 1;
  }
  return f;
}
const g = make81();
console.log(g(3));
