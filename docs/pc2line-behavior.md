# QuickJS `line_number_slots` Collection Rules

_Reference: `third_party/QuickJS/src/core/parser.c` (all line numbers below refer to that file)._ 

QuickJS builds the `line_number_slots` array during the `resolve_labels()` pass. The high level flow is:

1. During parsing, `emit_source_pos()` writes `OP_line_num <source_pos>` pseudo opcodes whenever the parser wants to associate the next instruction with a concrete source byte offset.
2. In `resolve_labels()`, the bytecode is rewritten (short opcode selection, peephole opts, jump fixups, etc.). While emitting the final instruction stream, QuickJS keeps track of the most recent `source_pos` seen in `line_num`.
3. Before writing many opcodes, it calls `add_pc2line_info(cur_pc, line_num)`. The helper only records an entry when:
   * `line_number_slots` storage is available,
   * the PC is monotonically increasing (`pc >= line_number_last_pc`), and
   * the incoming `source_pos` differs from the last recorded one (`source_pos != line_number_last`).
   This effectively means: **only the first instruction emitted after a new `OP_line_num` produces a slot**.

### Opcodes that trigger `add_pc2line_info`

In `resolve_labels()` almost every opcode path ends up calling `add_pc2line_info`, but there are a few notable buckets:

| Bucket | Examples | Notes |
| --- | --- | --- |
| Direct calls and tail-calls | `OP_call`, `OP_call_method`, `OP_tail_call`, `OP_tail_call_method` | Always add before rewriting to short forms (L11230). |
| Control-flow w/ labels | `OP_goto*`, `OP_if_true*`, `OP_if_false*`, `OP_catch`, `OP_gosub`, `OP_with_*` | `goto` path jumps to the shared `has_label:` label where `add_pc2line_info` is invoked exactly once per jump opcode (L11266). |
| Optimisation fallbacks | Many peephole branches insert new instructions (`OP_is_null`, `OP_inc_loc`, etc.) and inject `add_pc2line_info` right before emitting the rewritten opcode (e.g. L11324, L11401, L11538, …). |
| Generic/default case | Any opcode that does not hit an optimisation-specific branch falls through to `default: no_change`, which first calls `add_pc2line_info`, then copies the original instruction verbatim (L11994 onwards).

Thanks to the guard inside `add_pc2line_info`, attempted duplicate recordings simply get ignored. So even though the default path fires for every instruction, only the **first instruction emitted after a fresh `OP_line_num`** actually materialises in the final table.

### Source position semantics

* `OP_line_num` operands carry the **raw UTF-8 byte offset** (`source_ptr - buf_start`).
* `line_num` in `resolve_labels()` is therefore a `source_pos`. The variable name is historical.
* `compute_pc2line_info()` later converts those `source_pos` values to `(line, column)` pairs using `get_line_col_cached()`. They are then delta-encoded into the final `pc2line` buffer.

### Implications for our compiler

* We only need to ensure that the same stream of `source_pos` markers is produced, and that the **first instruction emitted after each marker** is the one that records a `lineNumberTable` entry.
* Simply recording per “current statement” (our existing approach) is too coarse and can produce extra slots (e.g. expression-level identifiers) or miss control-flow edges (e.g. short jumps).
* We should mimic the QuickJS behaviour by:
  * emitting `source_pos` markers at the same syntactic sites as QuickJS (`emit_source_pos` call sites), and
  * deferring the actual recording logic to a `shouldEmitLineSlot` helper which mirrors QuickJS’s first-instruction-after-marker semantics.
