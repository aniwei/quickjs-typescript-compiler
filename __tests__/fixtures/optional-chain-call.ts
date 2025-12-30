// ES2020: optional chaining with call + nullish coalescing
const obj: any = {
  a: { b: 1 },
  f: () => 2,
}

console.log(obj?.a?.b ?? 0)
console.log(obj?.missing?.b ?? 3)
console.log(obj?.f?.() ?? 4)
