// Async function example
export async function asyncAdd(a: number, b: number) {
  const x = await Promise.resolve(a);
  const y = await Promise.resolve(b);
  return x + y;
}

// Example usage
asyncAdd(5, 3).then(result => {
  console.log("Result:", result); // Should print "Result: 8"
});