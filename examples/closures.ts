// Closure and variable capture test
const x = 10;

function makeCounter(start: number) {
  let count = start;
  
  return function() {
    return ++count + x; // Captures both 'count' and 'x'
  };
}

const counter = makeCounter(5);
const result1 = counter(); // Should be 16 (6 + 10)
const result2 = counter(); // Should be 17 (7 + 10)