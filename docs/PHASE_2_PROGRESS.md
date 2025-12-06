# Phase 2 Progress: Variables & Scope

## Status
- [x] **Atom Ordering**: Implemented `hoistVariables` to match QuickJS behavior.
    - `var` declarations are always hoisted (function scope).
    - `let`/`const` declarations are hoisted only if they are in a block (block scope). Top-level `let`/`const` are treated as module variables and added when encountered.
- [x] **Block Scoping**: Implemented `scopeStack` and `local` variables.
    - `visitBlock` enters a new scope and hoists local `let`/`const` variables.
    - `addVar` now supports `scopeLevel`, `isLexical`, `isConst`.
    - `visitIdentifier`, `visitBinaryExpression`, `visitPostfixUnaryExpression` updated to handle `local` variables using `OP_get_loc`/`OP_put_loc`.
- [x] **Verification**:
    - `variables-var.ts`: **Perfect Match**.
    - `variables-let-block.ts`: **Perfect Match**.

## Next Steps
- [ ] **Function Scoping**: Implement `visitFunctionDeclaration` fully.
    - Handle arguments.
    - Handle `cpool` index mismatch (observed in `compute.ts`).
    - Handle `closure` variables in child functions.
- [ ] **Control Flow**: Implement `if`, `for`, `while` (Phase 3).
