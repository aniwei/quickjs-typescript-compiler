# TODO

- [ ] **Infrastructure**: Fix function size writing in `Compiler.ts`. Currently writes `byteCode.size` (instruction size) instead of total function size. Needs `BytecodeBuilder` buffering.
- [ ] **Investigation**: Why does WASM compiler use stack size 1 for `compute` function (`a+b`) while TS calculates 2?
- [ ] **Feature**: Implement `SwitchStatement`.
- [ ] **Feature**: Implement `TryStatement` / Exception handling.
- [ ] **Optimization**: Implement short opcodes support (currently disabled/partial).
