// Generator function example
export function* genCounter(n: number) {
  let i = 0;
  while (i < n) {
    yield i++;
  }
}

// Example usage with for-of
for (const value of genCounter(3)) {
  console.log(value); // Should print 0, 1, 2
}