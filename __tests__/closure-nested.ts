// closure-nested.ts
// Multi-layer closure capture & mutation
export function makeLevel3(start: number) {
  let x = start
  function level1(delta1: number) {
    x += delta1
    function level2(delta2: number) {
      x += delta2
      function level3(delta3: number) {
        x += delta3
        return x
      }
      return level3
    }
    return level2
  }
  return level1
}

export function test() {
  const l1 = makeLevel3(5)
  const l2 = l1(1)   // x = 6
  const l3 = l2(2)   // x = 8
  const r  = l3(3)   // x = 11
  return r
}
