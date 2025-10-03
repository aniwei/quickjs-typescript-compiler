function categorize(value) {
  switch (value) {
    case 0:
      return value
    case 1:
      return value + 1
    default:
      return value - 1
  }
}

categorize(1)
