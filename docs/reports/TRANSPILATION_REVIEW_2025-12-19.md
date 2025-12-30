# Transpilation Review (Focused) — 2025-12-19

Scope: align TS implementation with QuickJS `parser.c` for the **debug-info emission path** and **switch/break/continue statement emission**.

This review is intentionally narrow (Option B) and aims to produce actionable discrepancies.

---

## 1) QuickJS reference points

### 1.1 `emit_source_pos()` semantics (line-number opcode emission)

QuickJS implementation (see `third_party/QuickJS/src/core/parser.c:1777+`):

- Emits `OP_line_num` when `last_opcode_source_ptr != source_ptr`.
- Dedup key is **pointer equality / source position equality**, not line number.
- Writes the **byte offset** `(source_ptr - s->buf_start)`.

### 1.2 Statement parser behavior for `break` / `continue`

QuickJS `js_parse_statement_or_decl()` (see `parser.c:7268+`) shows:

- `TOK_BREAK` / `TOK_CONTINUE` do **not** call `emit_source_pos()`.
- They call `emit_break()`, which emits gotos/drops/etc via `emit_op()` and `emit_goto()`.

Implication: QuickJS bytecode typically does **not** insert `OP_line_num` at `break`/`continue` token positions.

### 1.3 Statement parser behavior for `switch`

QuickJS `TOK_SWITCH` block (see `parser.c:7289+`):

- Does **not** call `emit_source_pos()` at `switch` token.
- Parses `switch(expr)` and emits comparison flow.
- When parsing `case` clauses, it emits:
  - `OP_dup`, then parses the case expression via `js_parse_expr(s)`.
  - `OP_strict_eq` and conditional jumps.
- For `default`, it emits a **dummy OP_label opcode** (raw) for later patching.

---

## 2) TypeScript implementation (current)

### 2.1 `Compiler.emitSourcePos()` dedup strategy deviates from QuickJS

File: `src/compiler/compiler.ts`

Current behavior:

- Dedups by **exact `sourcePos` equality** via `fd.lastOpcodeSourcePtr`, mirroring QuickJS pointer-equality semantics.
- Writes `TempOpcode.OP_line_num` + `sourcePos`.

Status:

- ✅ This is now aligned with QuickJS `emit_source_pos()` (parser.c:1777-1786). Remaining debug-info diffs should be tracked by sampling sites (where `add_pc2line_info` equivalents are triggered), not by line-dedup policy.

### 2.2 `StatementVisitor`: explicit `emitSourcePos()` on switch/case/default/break/continue

File: `src/compiler/visitors/StatementVisitor.ts`

Observed patterns:

- `visitSwitchStatement()` calls `compiler.emitSourcePos(fd, node.getStart())`.
- Each `case/default` clause also calls `emitSourcePos(fd, clause.getStart())`.
- `visitBreakStatement()` and `visitContinueStatement()` also call `emitSourcePos(fd, node.getStart())`.

QuickJS contrast:

- QuickJS does not call `emit_source_pos()` for `TOK_SWITCH` / `TOK_BREAK` / `TOK_CONTINUE`.
- For `case` expressions, QuickJS relies on expression parsing to emit source positions where needed.

Net: these extra `emitSourcePos()` calls are strong suspects for the historical `pc2line`/`OP_line_num` byte deltas.

### 2.3 `LabelResolver` owns pc2line slot capture and uses `TempOpcode.OP_line_num`

File: `src/compiler/LabelResolver.ts`

- Tracks a mutable `lineNum` variable, updated when reading `TempOpcode.OP_line_num`.
- Calls `addPc2lineInfo(fd, bcOut.size, lineNum)` at many emission points.
- Initializes `fd.lineNumberLast = fd.sourcePos` (matching C comment).

This matches QuickJS high-level structure (collect in label-resolve stage), but correctness depends heavily on the fidelity of `OP_line_num` emission.

### 2.4 Potential off-by-one in `DebugInfoBuilder.computePc2LineInfo()` initial encoding

File: `src/compiler/DebugInfoBuilder.ts`

QuickJS encodes:

- First ULEB: `last_line_num` where the function returns **line number minus 1**.
- Second ULEB: `last_col_num` where it is **column number minus 1**.

TS code (prior to fix) returned **1-based** line numbers from `getLineColCached()` (cache initialized with `lineNum=1`).

QuickJS `get_line_col_cached()` returns **line number minus 1** (as documented by how `compute_pc2line_info()` writes the returned value).

✅ Fix implemented (2025-12-19): `getLineColCached()` now returns `[cache.lineNum - 1, cache.colNum]`.

Status after fix:

- `compareWithWasm(debug-info-basic)`: still not identical (TS 128 bytes vs WASM 140 bytes). So this fix is necessary but not sufficient; remaining differences likely come from **where/when line slots are sampled** (OP_line_num emission policy and add_pc2line_info call sites).

---

## 3) Concrete discrepancies to track (actionable)

### 3.1 `emitSourcePos` dedup key

- QuickJS: dedup by `source_ptr` equality.
- TS: dedup by `lineNum` change.

**Action**: restore QuickJS-equivalent dedup (by `sourcePos` equality) if byte-perfect output is the goal.

### 3.2 Do not emit source-pos for `break` / `continue` statements

- QuickJS: no `emit_source_pos()` in `TOK_BREAK/TOK_CONTINUE` case.
- TS: `visitBreakStatement/visitContinueStatement` calls `emitSourcePos()`.

**Action**: remove these explicit emissions; rely on opcode emissions that QuickJS uses.

### 3.3 Do not emit source-pos at `switch` / `case` / `default` clause start

- QuickJS: does not emit source-pos at those tokens.
- TS: emits for `switch` and each clause.

**Action**: remove clause-level `emitSourcePos()` calls (or gate them behind a strict QuickJS-compat flag).

### 3.4 Verify pc2line initial header encoding

- Confirm TS `getLineColCached` returns line/col in the same normalization as QuickJS.

**Action**: add a targeted comparison that decodes pc2line from TS and WASM for a tiny fixture (1–2 ops) and verify first two ULEBs.

---

## 4) Current audit status

- `pnpm -s audit:env`: OK (WASM exports == env.ts)
- `pnpm -s audit:spec`: now fails only for genuinely missing/unimplemented items:
  - `visitSpreadElement`, `visitTemplateExpression`, `parseDirectives`, `parseFunctionCheckNames`, `parseDestructuringElement`, `visitRegExpLiteral`, `visitMethodDeclaration`.

These are real gaps (not tooling noise).

---

## 5) Update — 2025-12-20 (progress + integration notes)

### 5.1 pc2line generation is now DebugInfoBuilder-first

- Main pipeline now calls `DebugInfoBuilder.computePc2LineInfo(fd)` during `processFunctionDef()` after `resolve_labels` and `compute_stack_size`.
- Each `FunctionDef` initializes `GetLineColCache` via `DebugInfoBuilder.initLineColCache(fd, source)` so pc2line can be computed without relying on TypeScript's `SourceFile` helpers.
- `Compiler.computePc2LineInfo` is kept only as a deprecated wrapper to avoid duplicate logic and accidental divergence.

QuickJS reference: `add_pc2line_info` (parser.c:10842-10854), `compute_pc2line_info` (parser.c:10862-10912), `get_line_col_cached` (parser.c:148-180).

### 5.2 Expression statement result handling matches QuickJS eval semantics

- For eval/global scripts, expression statements now store the value into `<ret>` (`s->eval_ret_idx`) instead of dropping it.
- This aligns with QuickJS behavior where `<ret>` is updated by expression statements and finally returned.

QuickJS reference: expression statement parsing (parser.c:7632-7649) and eval return handling (parser.c:13499-13533).

### 5.3 Fixture status

- ✅ `debug-info-basic.ts`: byte-perfect vs QuickJS WASM.
- ✅ `switch-case.ts`: byte-perfect vs QuickJS WASM (182 bytes), including matching `pc2line` length/content.
