// closure-sibling-dedup.ts
// Two sibling closures capture same outer local; should generate one parent closure entry
export function makeFns() {
  let x = 0
  function a() { x += 1; return x }
  function b() { x += 2; return x }
  return [a, b]
}
