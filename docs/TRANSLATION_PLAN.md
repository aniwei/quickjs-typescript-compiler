# QuickJS TypeScript Compiler Translation Plan

This plan details the step-by-step translation of the QuickJS compiler from C to TypeScript.

## Phase 1: Foundation & Infrastructure (Completed)

### 1.1 Project Structure Setup
- [x] Create `src/compiler` directory.
- [x] Create `src/bytecode` directory.
- [x] Define `ParseState` class.
- [x] Define `JSFunctionDef` class.
- [x] Define `BytecodeWriter` class.

### 1.2 Environment Integration
- [x] Ensure `Env.ts` is correctly loaded.
- [ ] Implement helper to map `ts.SyntaxKind` to QuickJS concepts if needed.

### 1.3 Bytecode Writer Implementation
- [x] Implement `DynBuf` equivalent (dynamic buffer).
- [x] Implement `emit_op(op)`.
- [x] Implement `emit_u8`, `emit_u16`, `emit_u32`, `emit_u64`.
- [x] Implement `emit_atom`.
- [ ] Implement `get_label`, `emit_label`, `emit_goto`.

## Phase 2: Basic Compilation Flow (In Progress)

### 2.1 Program Entry
- [x] Implement `Compiler.compile(ast)`.
- [x] Implement `js_parse_program` equivalent.
- [x] Setup global function definition (`JSFunctionDef`).

### 2.2 Function Definition (Basic)
- [x] Implement `js_create_function`.
- [ ] Implement `js_parse_function_body` (empty body first).
- [ ] Implement `end_function` (bytecode finalization).

### 2.3 Literals & Constants
- [x] Implement `js_parse_expr` for:
    - [x] `null`, `true`, `false`.
    - [x] Number literals (integers, floats).
    - [x] String literals (atom creation).

## Phase 3: Expressions (ES2023)

### 3.1 Basic Operators
- [x] Unary operators (`+`, `-`, `!`, `~`, `typeof`, `void`, `delete`).
- [x] Binary operators (`+`, `-`, `*`, `/`, `%`, `**`).
- [x] Comparison operators (`<`, `>`, `<=`, `>=`, `==`, `!=`, `===`, `!==`).
- [x] Bitwise operators (`&`, `|`, `^`, `<<`, `>>`, `>>>`).
- [x] Logical operators (`&&`, `||`, `??`).

### 3.2 Assignment & Update
- [x] Assignment (`=`).
- [x] Compound assignment (`+=`, `-=`, etc.).
- [x] Update expressions (`++`, `--`).

### 3.3 Complex Expressions
- [x] Conditional operator (`? :`).
- [x] Comma operator (`,`).
- [x] Array literals (`[]`).
- [x] Object literals (`{}`).
- [x] Function calls (`f()`).
- [x] New expression (`new C()`).
- [x] Member access (`a.b`, `a['b']`).

## Phase 4: Statements

### 4.1 Basic Statements
- [x] Block statement (`{ ... }`).
- [x] Expression statement.
- [x] `if` / `else`.
- [x] `return`.

### 4.2 Loops
- [x] `while`.
- [x] `do ... while`.
- [x] `for` (C-style).
- [x] `for ... in`.
- [x] `for ... of`.
- [x] `break` / `continue` (Label management).
- [x] `switch`.

### 4.3 Exception Handling
- [x] `try ... catch ... finally`.
- [x] `throw`.

### 4.4 Variable Declarations
- [x] `var`.
- [x] `let` / `const` (Block scoping).
- [x] Destructuring declarations.

## Phase 5: Functions & Scopes

### 5.1 Function Features
- [x] Function declarations.
- [x] Function expressions.
- [x] Arrow functions.
- [x] Default parameters.
- [x] Rest parameters.
- [x] `this` binding.
- [x] `arguments` object.

### 5.2 Closures
- [x] Variable capture.
- [x] Scope chain management.
- [x] `close_var` opcode.

## Phase 6: Classes & Modules

### 6.1 Classes
- [x] Class declarations (`class C { ... }`).
- [x] Class expressions.
- [x] Constructor.
- [x] Methods.
- [x] Static methods.
- [x] Fields (instance & static).
- [ ] Private fields/methods.
- [x] `super` calls.
- [x] `extends` (Inheritance).

### 6.2 Modules
- [x] `import`.
- [x] `export`.
- [x] Module scope.

## Phase 7: Advanced Features


### 7.1 Async/Await
- [x] `async` functions.
- [x] `await` expression.

### 7.2 Generators
- [x] Generator functions (`function*`).
- [x] `yield`.
- [x] `yield*`.

### 7.3 Other
- [x] Template literals.
- [ ] Tagged templates.
- [ ] Optional chaining (`?.`).
- [x] Nullish coalescing (`??`).

## Phase 8: Verification & Optimization

### 8.1 Fixture Testing
- [ ] Run all fixtures in `__tests__/compiler/fixtures`.
- [ ] Verify byte-for-byte match with `qjsc`.

### 8.2 Optimization
- [ ] Peephole optimizations (if present in QuickJS).
- [ ] Stack optimization.

## Execution Strategy
1.  Start with **Phase 1** and **Phase 2.1-2.2**.
2.  Create a minimal valid bytecode file (empty program).
3.  Iteratively add features from **Phase 2.3** onwards.
4.  After each sub-task, run `pnpm test` (or specific fixture test) to verify.
