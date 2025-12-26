# Mismatch families (latest recursive scan)

Scan input: `artifacts/mismatch-structure-summary.json` (recursive)

Totals:
- Total fixtures: 315
- Identical: 265
- Mismatched: 50
- Tags: debug=47, semantics=43, func-meta=14, scope=9

## Top families

### Family A: func bytecode + pc2line (17 fixtures)
Signature:
- `func.bytecode`, `func.bytecodeLen`, `func.debug.pc2line`
Fixtures:
- complex-001/013/020/032/039/051/058/070/077/089/096
- try-catch-finally-throw-instanceof-new-003/022/041/060/079/098

QuickJS source anchors (ground truth):
- Label/jump resolution & bytecode rewrite: `third_party/QuickJS/src/core/parser.c` (`resolve_labels()` and related helpers)
- Stack depth computation (stackSize diffs often correlate with rewrite/peephole): `third_party/QuickJS/src/core/parser.c` (`compute_stack_size()`)
- Debug slot capture/encoding (pc2line): `third_party/QuickJS/src/core/parser.c` (`add_pc2line_info()` / `compute_pc2line_info()`)

Instrumentation knobs (QuickJS WASM build):
- `scripts/buildWasm.ts --trace --trace-level 2`
- Per-category env overrides: `QTS_TRACE_LABEL=1`, `QTS_TRACE_STACK=1`, `QTS_TRACE_PC2LINE=1`

### Family B: pc2line-only (6 fixtures)
Signature:
- `func.debug.pc2line`
Fixtures:
- complex-003/022/041/060/079/098

QuickJS source anchors:
- Slot capture: `add_pc2line_info()` in `third_party/QuickJS/src/core/parser.c`
- Encoding: `compute_pc2line_info()` in `third_party/QuickJS/src/core/parser.c`
- Slot emission sites (source_pos decisions): `emit_source_pos()` in `third_party/QuickJS/src/core/parser.c`

Instrumentation knobs:
- `scripts/buildWasm.ts --trace --trace-level 3` + `QTS_TRACE_PC2LINE=1`

### Family C: inner func stackSize + bytecode huge delta (5 fixtures)
Signature:
- `func.cpool[*](func).stackSize`, `func.cpool[*](func).bytecode`, `func.cpool[*](func).bytecodeLen`, `func.cpool[*](func).debug.pc2line`
Fixtures:
- complex-010/029/048/067/086

QuickJS source anchors:
- Stack size computation: `compute_stack_size()` in `third_party/QuickJS/src/core/parser.c`
- Label/jump resolution rewrite (can change stack effect and introduce/remove temporaries): `resolve_labels()` in `third_party/QuickJS/src/core/parser.c`

Instrumentation knobs:
- `QTS_TRACE_STACK=1`, `QTS_TRACE_LABEL=1` (plus `--trace`)

### Family D: nested inner func (cpool[0].cpool[0]) small delta (5 fixtures)
Signature:
- `func.cpool[*](func).cpool[*](func).bytecode`, `...bytecodeLen`, `...debug.pc2line`
Fixtures:
- complex-019/038/057/076/095

QuickJS source anchors:
- Same as Family B/C depending on whether the difference is pc2line-only or semantic lowering.

## Outliers (need separate clustering)

- microbench, repl, test_* (large multi-diff): atoms/varDefs/scope/closure + many bytecode diffs.
  These should be clustered by a second-pass signature that includes opcode-level diff summary.

