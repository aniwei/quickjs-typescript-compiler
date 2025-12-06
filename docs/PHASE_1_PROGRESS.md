# Phase 1 Progress: Basic Language Features

## Objectives
- Implement basic TypeScript to QuickJS bytecode translation.
- Achieve byte-perfect alignment with QuickJS WASM output where possible.
- Implement Debug Info (`pc2line`) mapping.

## Status

| Feature | Status | Notes |
| :--- | :--- | :--- |
| **Arithmetic Operators** | ✅ Done | `+`, `-`, `*`, `/`, `%`, `**` |
| **Comparison Operators** | ✅ Done | `<`, `>`, `<=`, `>=`, `==`, `!=`, `===`, `!==` |
| **Bitwise Operators** | ✅ Done | `&`, `|`, `^`, `~`, `<<`, `>>`, `>>>` |
| **Prefix Unary** | ✅ Done | `!`, `~`, `+`, `-`, `typeof`, `void` |
| **Conditional Operator** | ✅ Done | `cond ? true : false` (Byte-perfect) |
| **Postfix Unary** | 🚧 In Progress | `++`, `--` (Pending `var_ref` support) |
| **Debug Info (`pc2line`)** | ✅ Done | Implemented dynamic generation with ZigZag encoding. Verified byte-perfect for basic calls. |
| **Logical Operators** | ✅ Done | `&&`, `||`, `??` (Byte-perfect) |

## Recent Achievements
- **Logical Operators**: Implemented `&&`, `||`, `??` with correct short-circuiting jumps (`if_false8`, `if_true8`) and `is_undefined_or_null`. Verified byte-perfect.
- **Debug Info**: Successfully implemented `pc2line` compression using ZigZag encoding for deltas. Fixed source position tracking for `CallExpression`, `PropertyAccessExpression`, and `Identifier`. Verified byte-perfect match for `debug-info-basic.ts`.
- **Conditional Operator**: Fixed jump offset calculation and `pc2line` table header. Achieved byte-perfect match.

## Next Steps
1.  **Phase 2: Variables & Scope**: Implement `visitVariableStatement`, `BlockEnv`, and `var_ref` logic. This will unblock Postfix Unary.
2.  **Control Flow**: Implement `if`, `while`, `for`.
