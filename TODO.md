- [x] **Refactor**: Extract Label & Loop Management into `LabelManager` (Task 13.2).
- [x] **Refactor**: Extract Statement Visitors into `StatementVisitor` (Task 13.3.1).
- [x] **Refactor**: Extract Expression Visitors into `ExpressionVisitor` (Task 13.3.2).
- [ ] **Refactor**: Extract Function & Class Visitors (Task 13.3.3).

## Notes
- Remaining difference in compute.ts: 1 byte at start of pc2line table. Likely due to push_1 encoding or similar.
Remaining difference in class-inheritance.ts: -25 bytes. Likely due to OP_get_loc_checkthis vs OP_get_var_ref_check for captured const variables.
