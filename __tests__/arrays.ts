// Exercises array literal lowering: prefix/static/dynamic with spreads and holes
const a = [1, 2, 3]
const b = [,,]
const c = [1,,3]
const d = [...a]
const e = [1, ...a, 4]
const f = [ ,1, , ...a, 4, , ]
