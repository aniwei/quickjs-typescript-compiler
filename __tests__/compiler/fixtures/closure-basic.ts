function makeAdder(x: number) {
  return function(y: number) {
    return x + y;
  };
}
var add5 = makeAdder(5);
console.log(add5(2));
