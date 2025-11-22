const [a, b, ...rest] = [1, 2, 3, 4];
console.log(a, b, rest);

const { x, y: z, ...objRest } = { x: 10, y: 20, z: 30 };
console.log(x, z, objRest);

function f({ p = 10 } = {}) {
  console.log(p);
}
f();
