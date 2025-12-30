// 组合：module mode (export) + function decl (no imports)
export function f17(x) { return x + 17; }
export const v17 = f17(1);
console.log(v17);
