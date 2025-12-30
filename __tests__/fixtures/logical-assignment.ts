let a = 0
let b = ''
let c = null
let d

a ||= 1
b &&= 'fallback'
c ??= 'init'
d ??= 2

console.log(a, b, c, d)

const obj = { x: 0, y: null, z: false }
obj.x &&= 5
obj.y ??= 10
obj.z ||= true

console.log(obj.x, obj.y, obj.z)