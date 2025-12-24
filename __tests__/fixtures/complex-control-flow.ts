let acc = 0

outer: for (let i = 0; i < 3; i++) {
  let j = 0
  while (j < 3) {
    try {
      switch ((i << 2) | j) {
        case 0:
          acc += 1
          break
        case 5:
          acc += 10
          j++
          continue
        default:
          acc += 2
          break
      }

      if (i === 2) {
        if (j === 1) break outer
      }
      if (j === 2) {
        j++
        continue
      }

      acc += 3
    } finally {
      acc += 100
    }

    j++
  }
}

acc
