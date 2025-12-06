# Phase 3 Progress: Control Flow

## Implemented Features

- [x] `IfStatement` (with `else`)
- [x] `WhileStatement`
- [x] `ForStatement`
- [x] `BreakStatement`
- [x] `ContinueStatement`
- [x] `if_true8` optimization for `break`/`continue` in `if` statements.
- [x] Correct jump offset calculations (`target - jumpPos`).
- [x] Source position info for `BinaryExpression` and `PostfixUnaryExpression` (pc2line).

## Verified Fixtures

- `__tests__/compiler/fixtures/for-loop.ts`: **Perfect Match** (150 bytes)
- `__tests__/compiler/fixtures/loop-break-continue.ts`: **Perfect Match** (190 bytes)

## Next Steps

- [ ] `SwitchStatement`
- [ ] `DoWhileStatement` (if needed)
- [ ] Labeled statements
- [ ] `TryStatement` (Phase 5?)
