// Comprehensive test for all function features

// 1. Function hoisting test
const hoistedResult = hoistedFunction(5);

function hoistedFunction(x: number) {
  return x * 2;
}

// 2. Function expression
const expressionFunc = function(a: number, b: number) {
  return a + b;
};

// 3. Arrow function with expression body
const arrowExpr = (x: number) => x * x;

// 4. Arrow function with block body
const arrowBlock = (x: number, y: number) => {
  const sum = x + y;
  return sum * 2;
};

// 5. Closure with variable capture
function makeMultiplier(factor: number) {
  return function(value: number) {
    return value * factor; // Captures 'factor'
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

// 6. Nested function with multiple closure levels
function outerFunction(outerVar: number) {
  function innerFunction(innerVar: number) {
    return function(deepVar: number) {
      return outerVar + innerVar + deepVar; // Captures both outer variables
    };
  }
  
  return innerFunction;
}

const nested = outerFunction(10)(20);
const finalResult = nested(30); // Should be 60

// 7. Using functions
const test1 = expressionFunc(3, 4);
const test2 = arrowExpr(5);
const test3 = arrowBlock(2, 3);
const test4 = double(7);
const test5 = triple(4);