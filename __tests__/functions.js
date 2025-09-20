export function add(a, b) { return a + b }
export function makeAdder(x) { return (y) => x + y }
const r = add(2, 3) + makeAdder(10)(5)
