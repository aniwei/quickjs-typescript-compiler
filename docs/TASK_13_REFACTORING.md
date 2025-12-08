# Task 13: Refactoring to Visitor Pattern

## Objective
Refactor the monolithic `TypeScriptCompiler` into smaller, specialized visitors to improve maintainability and alignment with QuickJS structure.

## Subtasks

### 13.3.3 ClassVisitor
- [x] Extract `visitClassDeclaration` to `src/compiler/visitors/ClassVisitor.ts`.
- [x] Fix syntax error in `ClassVisitor.ts` (missing semicolon).
- [x] Delegate `visitClassDeclaration` in `TypeScriptCompiler.ts` to `ClassVisitor`.
- [x] Verify with `class-basic.ts` and `class-inheritance.ts`.

### 13.3.4 FunctionVisitor
- [x] Extract `visitFunctionDeclaration`, `visitArrowFunction`, `visitFunctionExpression` to `src/compiler/visitors/FunctionVisitor.ts`.
- [x] Delegate methods in `TypeScriptCompiler.ts`.
- [x] Verify with `function-expressions.ts`.

### 13.4 Facade (Pending)
- [ ] Create a facade to manage visitors and shared state.

## Fixes
- **ExpressionVisitor**: Fixed `visitBinaryExpression` to correctly handle property assignment (`obj.prop = val`) by emitting `OP_swap`, `OP_dup`, `OP_rot3r`, `OP_put_field`.
- **TypeScriptCompiler**: Removed incorrect `OP_drop` suppression for property assignment in `visitExpressionStatement`.

## Verification
- `class-inheritance.ts`: Size diff reduced to -7 bytes. Logic aligned with QuickJS (using `OP_put_field` for assignment).
