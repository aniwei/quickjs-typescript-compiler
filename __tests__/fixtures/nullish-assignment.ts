// ES2021: nullish coalescing assignment (??=)
let x: any = null
x ??= 1

let y: any = 0
y ??= 2

let z: any = undefined
z ??= 3

console.log(x, y, z)
