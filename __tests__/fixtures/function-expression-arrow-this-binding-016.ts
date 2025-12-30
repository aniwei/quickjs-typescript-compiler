// 组合：function expression + arrow + this binding
const obj = {
  x: 16,
  f: function(y) { return this.x + y; },
  g: (z) => z + 16,
};
console.log(obj.f(2), obj.g(3));
