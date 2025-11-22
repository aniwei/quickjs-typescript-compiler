const obj = {
  a: {
    b: 1
  }
};

console.log(obj?.a?.b);
console.log(obj?.['a']?.['b']);
console.log(obj?.c?.d);

const func = null;
console.log(func?.());
