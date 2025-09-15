// Basic function declaration test
function greet(name: string) {
  return "Hello, " + name;
}

// Function expression
const add = function(a: number, b: number) {
  return a + b;
};

// Arrow function
const multiply = (x: number, y: number) => x * y;

// Call hoisted function before declaration
const result = sayHello("World");

function sayHello(name: string) {
  return "Hi, " + name + "!";
}