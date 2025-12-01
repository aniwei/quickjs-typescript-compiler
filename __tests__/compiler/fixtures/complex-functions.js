function multiply(a, b) {
  const result = a * b
  return result
}

function factorial(n) {
  if (n <= 1) {
    return 1
  }
  return n * factorial(n - 1)
}