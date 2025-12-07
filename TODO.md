# TODO

- [ ] **Infrastructure**: Fix function size writing in `Compiler.ts`. Currently writes `byteCode.size` (instruction size) instead of total function size. Needs `BytecodeBuilder` buffering.
- [ ] **Investigation**: Why does WASM compiler use stack size 1 for `compute` function (`a+b`) while TS calculates 2?
- [x] **Feature**: Implement `SwitchStatement`.
- [x] **Feature**: Implement `TryStatement` / Exception handling.
- [ ] **Optimization**: Implement short opcodes support (currently disabled/partial).
Remaining difference in compute.ts: 4 bytes missing in pc2line table. Bytecode logic is correct (jump offset fixed). arrow-fn-basic.ts also has pc2line differences.
- [ ] `class-basic.ts`: -5 bytes difference.
  - Fixed `OP_get_var_ref_check` size (removed U16).
  - Removed `OP_drop` inside field init block.
  - WASM has extra prologue (13 bytes) involving `put_loc3`, `fclosure`, `call0`, `rest`.
  - TS has `home_object` logic (3 bytes) which might be unnecessary or different.
  - Current state: Functionally correct, but bytecode differs in prologue.
closure-basic.ts: Identical bytecode size (192 bytes). Instructions match (tail_call optimization implemented).
closure-basic.ts: Identical bytecode size (192 bytes). Instructions match (tail_call optimization implemented).
