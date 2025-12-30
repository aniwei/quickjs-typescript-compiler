// ES2020: optional chaining + nullish coalescing
const o: any = { a: { b: { c: 1 } } };
console.log(o?.a?.b?.c ?? 0);
console.log((null as any)?.a?.b ?? 'x');
