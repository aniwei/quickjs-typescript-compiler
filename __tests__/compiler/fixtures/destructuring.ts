const obj = { a: 1, b: 2 };
const { a, b } = obj;
const arr = [3, 4];
const [c, d] = arr;

const nested = { x: { y: 1 } };
const { x: { y } } = nested;

const arr2 = [1, 2, 3];
const [, , z] = arr2;

const { def = 10 } = {};
const [defArr = 20] = [];
