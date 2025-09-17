// closure-param-capture.ts
// Capture and mutate a parameter from nested inner function
export function outer(p: number) {
  function inc(delta: number) {
    p += delta
    return p
  }
  return inc
}

export function chain(start: number) {
  return outer(start)(1)
}
