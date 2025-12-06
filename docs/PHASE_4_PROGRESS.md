# Phase 4 Progress: Objects, Arrays, and Infrastructure

## Implemented Features

- [x] `ObjectLiteralExpression`
- [x] `ArrayLiteralExpression`
- [x] `PropertyAccessExpression`
- [x] `ElementAccessExpression`
- [x] `ComputedPropertyName`
- [x] Dynamic Stack Size Calculation
    - Implemented `stackLevel` tracking in `FunctionDef`.
    - Implemented `emitOp` logic to update stack level based on `OPCODE_DEFS`.
    - Removed hardcoded stack sizes.

## Verified Fixtures

- `__tests__/compiler/fixtures/object-literal.ts`: **Perfect Match**
- `__tests__/compiler/fixtures/array-literal.ts`: **Perfect Match**
- `__tests__/compiler/fixtures/do-while.ts`: **Perfect Match**

## Known Issues

- `compute.ts`: Stack size calculated as 2 (TS) vs 1 (WASM). Likely due to bytecode differences in `compute` function.
- Function size writing: `Compiler.ts` writes instruction size instead of total function size in header. Needs buffering fix.

## Next Steps

- [ ] Fix function size writing in `Compiler.ts`.
- [ ] Investigate `compute.ts` stack size discrepancy.
- [ ] Implement `SwitchStatement`.
