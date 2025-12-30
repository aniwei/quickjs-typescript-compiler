// ES2020: nullish coalescing (??)
const a: any = null
const b = a ?? 'fallback'

console.log(b)
console.log((0 ?? 1) + (undefined ?? 2))
