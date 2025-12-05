function test() {
  let f;
  {
    let x = 10;
    f = function() { return x; };
  }
  return f();
}
console.log(test());
