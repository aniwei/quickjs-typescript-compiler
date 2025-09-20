// labeled nested loops with mixed break/continue and inner conditions
outer: for (let i: number = 0; i < 4; i++) {
  inner: for (let j: number = 0; j < 3; j++) {
    if (j === 0) continue inner;
    if (i === 2 && j >= 1) break outer;
  }
}
