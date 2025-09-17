// closure-mutate.ts
// Validate that inner function mutating outer variable emits put_var_ref / get_var_ref sequence
export function makeCounter(start: number) {
  let a = start
  function inc(delta: number) {
    a += delta
    return a
  }
  return inc
}

export function test() {
  const c = makeCounter(10)
  const v1 = c(1) // 11
  const v2 = c(2) // 13
  return v1 + v2 // 24
}
