// 组合：optional chaining + nullish coalescing + array/object nested
const obj = { a: { b: { c: 78 } }, f: () => 78+1 };
const v1 = obj?.a?.b?.c ?? 0;
const v2 = (null)?.a?.b ?? 78+2;
const v3 = obj?.f?.() ?? 0;
const list = [{x:1}, null, {y:{z:78}}];
console.log(v1, v2, v3, list?.[2]?.y?.z ?? -1);
