# Phase 7: ES2020 Features Progress

## 7.1 BigInt Support

### Status
- [x] Basic BigInt literal parsing (`10n`).
- [x] `OP_push_bigint_i32` support for small integers (fits in 32-bit signed).
- [x] Visitor pattern integration (`ExpressionVisitor.visitBigIntLiteral`).
- [x] Large BigInt support (requires `OP_push_const` and constant pool serialization).
- [ ] BigInt operations (binary operators are handled by generic `BinaryExpressionVisitor`, but need to ensure `OP_add`, `OP_mul` etc. work with BigInts - QuickJS handles this at runtime).

### Implementation Details
- **Small BigInts**:
  - If the BigInt value is between -2147483648 and 2147483647, we emit `OP_push_bigint_i32` followed by the 32-bit integer value.
  - This aligns with QuickJS's optimization for small BigInts.

- **Large BigInts**:
  - Implemented `serializeBigInt` in `Compiler.ts` to serialize BigInts to QuickJS bytecode format (Tag 10 + LEB128 length + Two's complement bytes).
  - `ExpressionVisitor` adds large BigInts to `FunctionDef.cpool` and emits `OP_push_const` (or `OP_push_const8`).
  - Verified with `es2020_bigint_large.ts`.

### Verification
- **Fixture**: `__tests__/compiler/fixtures/es2020_bigint.ts`
- **Result**:
  - Small BigInts compile correctly.
  - Bytecode size matches closely (251 vs 249 bytes).
- **Fixture**: `__tests__/compiler/fixtures/es2020_bigint_large.ts`
- **Result**:
  - Large BigInts compile correctly.
  - Bytecode size matches closely (186 vs 184 bytes).
  - Constant pool serialization verified.

## 7.2 Nullish Coalescing (`??`)
- [ ] Pending implementation.

## 7.3 Optional Chaining (`?.`)
- [ ] Pending implementation.

## 7.4 `globalThis`
- [ ] Pending implementation.
