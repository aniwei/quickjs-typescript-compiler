A: for (let a = 0; a < 3; a++) {
  B: for (let b = 0; b < 3; b++) {
    C: for (let c = 0; c < 2; c++) {
      if ((a + b + c) % 2 === 0) continue C;
      if (a === 2) break A;
      if (b === 1) continue B;
    }
  }
}
