// 组合：optional chaining + nullish coalescing + array/object nested
const obj = { a: { b: { c: 59 } }, f: () => 59+1 };
const v1 = obj?.a?.b?.c ?? 0;
const v2 = (null)?.a?.b ?? 59+2;
const v3 = obj?.f?.() ?? 0;
const list = [{x:1}, null, {y:{z:59}}];
console.log(v1, v2, v3, list?.[2]?.y?.z ?? -1);
