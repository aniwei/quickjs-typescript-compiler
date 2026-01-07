# Mismatch families (latest scan)

Artifacts root: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/artifacts_full_clean_20260107_catchfix
Total fixtures: 302
Identical: 261
Mismatched: 39

## Tag counts
- semantics: 36
- debug: 31
- scope: 23
- func-meta: 14
- error: 2

## Families

### Family 1: bytecode(+pc2line?) (9 fixtures)

- Tags: debug,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32
- Sample fixtures: __tests____fixtures__quickjs-tests__test_bigint/bytecode/test_bigint, __tests____fixtures__quickjs-tests__test_bjson/bytecode/test_bjson, __tests____fixtures__quickjs-tests__test_line_column_num/bytecode/test_line_column_num, __tests____fixtures__quickjs-tests__test_loop/bytecode/test_loop, __tests____fixtures_quickjs__octane__code-load/bytecode/code-load, __tests____fixtures_quickjs__test_bigint/bytecode/test_bigint, __tests____fixtures_quickjs__test_bjson/bytecode/test_bjson, __tests____fixtures_quickjs__test_line_column_num/bytecode/test_line_column_num, __tests____fixtures_quickjs__test_loop/bytecode/test_loop

### Family 2: bytecode(+pc2line?) (3 fixtures)

- Tags: scope,semantics
- Diff paths: func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).closureVars
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests____fixtures__test_repl1/bytecode/test_repl1, __tests____fixtures__test_repl2/bytecode/test_repl2, __tests____fixtures_quickjs__octane__base/bytecode/base

### Family 3: bytecode(+pc2line?) (2 fixtures)

- Tags: debug,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVars, func.cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests____fixtures_quickjs__octane__deltablue/bytecode/deltablue, __tests____fixtures_quickjs__octane__gbemu-part1/bytecode/gbemu-part1

### Family 4: bytecode(+pc2line?) (2 fixtures)

- Tags: debug,semantics
- Diff paths: func.bytecode, func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32
- Sample fixtures: __tests____fixtures__quickjs-tests__test_builtin/bytecode/test_builtin, __tests____fixtures_quickjs__test_builtin/bytecode/test_builtin

### Family 5: bytecode(+pc2line?) (2 fixtures)

- Tags: scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).closureVars
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests____fixtures_quickjs__octane__regexp/bytecode/regexp, __tests____fixtures_quickjs__octane__splay/bytecode/splay

### Family 6: bytecode+stack(+pc2line?) (2 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).debug.pc2line, func.cpool[*](func).varDefs
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests____fixtures__quickjs-tests__test_language/bytecode/test_language, __tests____fixtures_quickjs__test_language/bytecode/test_language

### Family 7: bytecode+stack(+pc2line?) (2 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).debug.pc2line, func.cpool[*](func).stackSize
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests____fixtures__quickjs-tests__test_ic_atom_free/bytecode/test_ic_atom_free, __tests____fixtures_quickjs__test_ic_atom_free/bytecode/test_ic_atom_free

### Family 8: error (2 fixtures)

- Tags: error
- Diff paths: error
- Sample fixtures: __tests____fixtures__quickjs-tests__test_bignum/bytecode/test_bignum, __tests____fixtures_quickjs__test_bignum/bytecode/test_bignum

### Family 9: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVars, func.cpool[*](func).cpoolCount, func.cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests____fixtures_quickjs__octane__crypto/bytecode/crypto

### Family 10: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).debug.pc2line, module.atoms.length
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables; third_party/QuickJS/src/core/parser.c: atom collection / constant pool emission
- Sample fixtures: __tests____fixtures_quickjs__octane__pdfjs/bytecode/pdfjs

### Family 11: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).varDefs
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests____fixtures_quickjs__repl/bytecode/repl

### Family 12: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests____fixtures_quickjs__octane__navier-stokes/bytecode/navier-stokes

### Family 13: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,scope,semantics
- Diff paths: func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).varDefs
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests____fixtures__test_argument_scope/bytecode/test_argument_scope

### Family 14: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,scope,semantics
- Diff paths: func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests____fixtures__quickjs-tests__repl/bytecode/repl

### Family 15: bytecode(+pc2line?) (1 fixtures)

- Tags: scope,semantics
- Diff paths: func.bytecode, func.closureVarCount, func.closureVars
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests____fixtures_quickjs__octane__raytrace/bytecode/raytrace

### Family 16: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.bytecode, func.bytecodeLen, func.closureVarCount, func.closureVars, func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVarCount, func.cpool[*](func).closureVars, func.cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).argCount, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).argCount, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).definedArgCount, func.cpool[*](func).cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).definedArgCount, func.cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).debug.pc2line, func.debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests____fixtures_quickjs__octane__typescript-compiler/bytecode/typescript-compiler

### Family 17: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.bytecode, func.cpoolCount, func.cpool[*], func.cpool[*](func).argCount, func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVarCount, func.cpool[*](func).closureVars, func.cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).argCount, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).definedArgCount, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).debug.pc2line, func.cpool[*](func).definedArgCount, func.cpool[*](func).funcNameAtom, func.cpool[*](func).stackSize, func.cpool[*](func).varCount, func.cpool[*](func).varDefs
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests____fixtures_quickjs__octane__mandreel/bytecode/mandreel

### Family 18: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.bytecode, func.cpoolCount, func.cpool[*], func.cpool[*](func).argCount, func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).argCount, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).argCount, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).definedArgCount, func.cpool[*](func).cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).definedArgCount, func.cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).debug.pc2line, func.cpool[*](func).definedArgCount, func.cpool[*](func).flags, func.cpool[*](func).funcNameAtom, func.cpool[*](func).stackSize, func.cpool[*](func).varCount, func.cpool[*](func).varDefs, func.debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests____fixtures_quickjs__octane__bundle/bytecode/bundle

### Family 19: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).debug.pc2line, func.debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests____fixtures_quickjs__octane__earley-boyer/bytecode/earley-boyer

### Family 20: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).debug.pc2line, func.cpool[*](func).stackSize, func.debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests____fixtures_quickjs__octane__gbemu-part2/bytecode/gbemu-part2

### Family 21: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32
- Sample fixtures: __tests____fixtures_quickjs__octane__box2d/bytecode/box2d

### Family 22: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).debug.pc2line, func.cpool[*](func).stackSize
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32
- Sample fixtures: __tests____fixtures_quickjs__octane__run/bytecode/run

### Family 23: pc2line-only (1 fixtures)

- Tags: debug
- Diff paths: func.cpool[*](func).cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info
- Sample fixtures: __tests____fixtures_quickjs__microbench/bytecode/microbench
