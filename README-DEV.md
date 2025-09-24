# Developer Notes

- Generate environment from WASM:
  - pnpm gen:env
- Compare single fixture:
  - pnpm -s exec tsx scripts/compareWithWasm.ts __tests__/compiler/fixtures/compute.ts --input-js __tests__/compiler/fixtures/compute.ts --disasm --normalize-short --side-by-side --artifacts-dir artifacts --show-diff
- Compare all fixtures and write summary:
  - pnpm compare:all

Status
- TS stripping uses TypeScript transpileModule for robustness.
- All fixtures currently match WASM bytecode 1:1.
- A skeleton bytecodeWriter exists; planned to replace WASM emission step-by-step.

Next
- Implement full JSFunctionBytecode serialization (flags, locals, closures, cpool, debug).
- Swap TS compiler output to use bytecodeWriter and keep parity with WASM using compare scripts.
