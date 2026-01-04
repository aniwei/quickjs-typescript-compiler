# Mismatch families (latest scan)

Artifacts root: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/artifacts_full_latest
Total fixtures: 300
Identical: 260
Mismatched: 40

## Tag counts
- semantics: 37
- debug: 32
- scope: 23
- func-meta: 14
- error: 2

## Families

### Family 1: bytecode(+pc2line?) (10 fixtures)

- Tags: debug,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32
- Sample fixtures: __tests__/fixtures_quickjs/octane/code-load, __tests__/fixtures_quickjs/test_bigint, __tests__/fixtures_quickjs/test_bjson, __tests__/fixtures_quickjs/test_line_column_num, __tests__/fixtures_quickjs/test_loop, __tests__/fixtures/quickjs-tests/test_bigint, __tests__/fixtures/quickjs-tests/test_bjson, __tests__/fixtures/quickjs-tests/test_line_column_num, __tests__/fixtures/quickjs-tests/test_loop, __tests__/fixtures/test_for_in2

### Family 2: bytecode(+pc2line?) (3 fixtures)

- Tags: scope,semantics
- Diff paths: func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).closureVars
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests__/fixtures_quickjs/octane/base, __tests__/fixtures/test_repl1, __tests__/fixtures/test_repl2

### Family 3: bytecode(+pc2line?) (2 fixtures)

- Tags: debug,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVars, func.cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests__/fixtures_quickjs/octane/deltablue, __tests__/fixtures_quickjs/octane/gbemu-part1

### Family 4: bytecode(+pc2line?) (2 fixtures)

- Tags: debug,semantics
- Diff paths: func.bytecode, func.bytecodeLen, func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).debug.pc2line, func.debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32
- Sample fixtures: __tests__/fixtures_quickjs/test_builtin, __tests__/fixtures/quickjs-tests/test_builtin

### Family 5: bytecode(+pc2line?) (2 fixtures)

- Tags: scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).closureVars
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests__/fixtures_quickjs/octane/regexp, __tests__/fixtures_quickjs/octane/splay

### Family 6: bytecode+stack(+pc2line?) (2 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).debug.pc2line, func.cpool[*](func).varDefs
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests__/fixtures_quickjs/test_language, __tests__/fixtures/quickjs-tests/test_language

### Family 7: bytecode+stack(+pc2line?) (2 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).debug.pc2line, func.cpool[*](func).stackSize
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests__/fixtures_quickjs/test_ic_atom_free, __tests__/fixtures/quickjs-tests/test_ic_atom_free

### Family 8: error (2 fixtures)

- Tags: error
- Diff paths: error
- Sample fixtures: __tests__/fixtures_quickjs/test_bignum, __tests__/fixtures/quickjs-tests/test_bignum

### Family 9: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVars, func.cpool[*](func).cpoolCount, func.cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests__/fixtures_quickjs/octane/crypto

### Family 10: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).debug.pc2line, module.atoms.length
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables; third_party/QuickJS/src/core/parser.c: atom collection / constant pool emission
- Sample fixtures: __tests__/fixtures_quickjs/octane/pdfjs

### Family 11: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).varDefs
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests__/fixtures_quickjs/repl

### Family 12: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests__/fixtures_quickjs/octane/navier-stokes

### Family 13: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,scope,semantics
- Diff paths: func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).varDefs
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests__/fixtures/test_argument_scope

### Family 14: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,scope,semantics
- Diff paths: func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests__/fixtures/quickjs-tests/repl

### Family 15: bytecode(+pc2line?) (1 fixtures)

- Tags: scope,semantics
- Diff paths: func.bytecode, func.closureVarCount, func.closureVars
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests__/fixtures_quickjs/octane/raytrace

### Family 16: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.bytecode, func.bytecodeLen, func.closureVarCount, func.closureVars, func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVarCount, func.cpool[*](func).closureVars, func.cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).argCount, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).argCount, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).definedArgCount, func.cpool[*](func).cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).definedArgCount, func.cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).debug.pc2line, func.debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests__/fixtures_quickjs/octane/typescript-compiler

### Family 17: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.bytecode, func.cpoolCount, func.cpool[*], func.cpool[*](func).argCount, func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVarCount, func.cpool[*](func).closureVars, func.cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).argCount, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).definedArgCount, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).debug.pc2line, func.cpool[*](func).definedArgCount, func.cpool[*](func).funcNameAtom, func.cpool[*](func).stackSize, func.cpool[*](func).varCount, func.cpool[*](func).varDefs
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests__/fixtures_quickjs/octane/mandreel

### Family 18: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.bytecode, func.cpoolCount, func.cpool[*], func.cpool[*](func).argCount, func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).argCount, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).argCount, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).definedArgCount, func.cpool[*](func).cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).definedArgCount, func.cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).debug.pc2line, func.cpool[*](func).definedArgCount, func.cpool[*](func).flags, func.cpool[*](func).funcNameAtom, func.cpool[*](func).stackSize, func.cpool[*](func).varCount, func.cpool[*](func).varDefs, func.debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests__/fixtures_quickjs/octane/bundle

### Family 19: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).debug.pc2line, func.debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests__/fixtures_quickjs/octane/earley-boyer

### Family 20: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).debug.pc2line, func.cpool[*](func).stackSize, func.debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: __tests__/fixtures_quickjs/octane/gbemu-part2

### Family 21: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32
- Sample fixtures: __tests__/fixtures_quickjs/octane/box2d

### Family 22: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).debug.pc2line, func.cpool[*](func).stackSize
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32
- Sample fixtures: __tests__/fixtures_quickjs/octane/run

### Family 23: pc2line-only (1 fixtures)

- Tags: debug
- Diff paths: func.cpool[*](func).cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info
- Sample fixtures: __tests__/fixtures_quickjs/microbench
