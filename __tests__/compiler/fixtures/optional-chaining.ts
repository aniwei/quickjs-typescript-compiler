const a: any = { b: { c: 1 } };
const x = a?.b?.c;
const y = a?.['b']?.c;
const z = a?.missing?.c;
const w = a?.method?.();
const mixed = a?.b.c;
const callChain = a?.b();
