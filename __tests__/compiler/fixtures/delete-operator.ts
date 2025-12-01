var obj = { a: 1, b: 2 };
// @ts-ignore
delete obj.a;
console.log(obj.a);
