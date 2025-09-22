function multiply(a: number, b: number): number {
  const result = a * b
  return result
}

function factorial(n: number): number {
  if (n <= 1) {
    return 1
  }
  return n * factorial(n - 1)
}