outer: for (let i = 0; i < 4; i++) {
  inner: for (let j = 0; j < 3; j++) {
    if (j === 0) continue inner;
    if (i === 2 && j >= 1) break outer;
  }
}
