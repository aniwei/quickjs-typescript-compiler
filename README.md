# QuickJS TypeScript Compiler

A TypeScript to QuickJS bytecode compiler that generates QuickJS-compatible bytecode from TypeScript source code.

## Features

### Function Support

The compiler now supports comprehensive function compilation:

#### Function Declarations
- **Hoisting**: Function declarations are hoisted and available throughout their containing scope
- **Named functions**: Properly binds function names in the current scope
- **QuickJS semantics**: Uses `OP.define_func` opcode for proper function binding

```typescript
// Function can be called before declaration (hoisting)
const result = greet("World");

function greet(name: string) {
  return "Hello, " + name;
}
```

#### Function Expressions and Arrow Functions
- **Closures**: Function expressions create closures using `OP.fclosure` opcode
- **Anonymous functions**: Supports both named and anonymous function expressions
- **Arrow functions**: Full support for arrow function syntax

```typescript
const add = function(a: number, b: number) {
  return a + b;
};

const multiply = (x: number, y: number) => x * y;
```

#### Closures and Variable Capture
- **var_ref support**: Captures variables from outer scopes
- **Nested functions**: Supports multiple levels of function nesting
- **Variable access**: Proper read/write access to captured variables

```typescript
function makeCounter(start: number) {
  let count = start;
  
  return function() {
    return ++count; // Captures 'count' from outer scope
  };
}
```

#### Async and Generator Functions
- **Environment validation**: Checks for required opcode environment variables
- **Async functions**: Requires `QJS_OP_AWAIT` environment variable
- **Generator functions**: Requires `QJS_OP_YIELD` environment variable
- **Clear error messages**: Provides helpful errors when opcodes are not configured

```typescript
// Async function (requires QJS_OP_AWAIT)
export async function asyncAdd(a: number, b: number) {
  const x = await Promise.resolve(a);
  const y = await Promise.resolve(b);
  return x + y;
}

// Generator function (requires QJS_OP_YIELD)
export function* genCounter(n: number) {
  let i = 0;
  while (i < n) {
    yield i++;
  }
}
```

## Environment Variables

For async and generator function support, set these environment variables to match your QuickJS build:

- `QJS_OP_AWAIT`: Required for async function compilation
- `QJS_OP_YIELD`: Required for generator function compilation

Example:
```bash
export QJS_OP_AWAIT=1
export QJS_OP_YIELD=1
npm run start examples/async-await.ts
```

## Usage

Compile TypeScript to QuickJS bytecode:

```bash
npm run start input.ts
```

The compiler outputs bytecode that can be executed with the QuickJS runtime.

## Implementation Notes

- Uses existing infrastructure (Assembler/IR/optimizer) for consistency
- Maintains compatibility with existing features (static dispatch, shape seeding, hot-path IC, BigInt optimizations)
- Follows QuickJS semantics for function hoisting and closure behavior
- Provides clear error messages for unsupported features

## Examples

See the `examples/` directory for complete examples of function usage:

- `basic-functions.ts` - Function declarations, expressions, and hoisting
- `closures.ts` - Closure variable capture examples  
- `async-await.ts` - Async function with await
- `generator-iter.ts` - Generator function with yield
- `minimal.ts` - Simple function test