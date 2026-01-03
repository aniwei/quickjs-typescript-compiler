# Mismatch families (latest scan)

Artifacts root: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/artifacts
Total fixtures: 281
Identical: 250
Mismatched: 30

## Tag counts
- semantics: 29
- debug: 23
- scope: 20
- func-meta: 11
- error: 1

## Families

### Family 1: bytecode(+pc2line?) (6 fixtures)

- Tags: debug,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32
- Sample fixtures: code-load, test_bigint, test_bjson, test_for_in2, test_line_column_num, test_loop

### Family 2: bytecode(+pc2line?) (3 fixtures)

- Tags: scope,semantics
- Diff paths: func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).closureVars
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: base, test_repl1, test_repl2

### Family 3: bytecode(+pc2line?) (2 fixtures)

- Tags: debug,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVars, func.cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: deltablue, gbemu-part1

### Family 4: bytecode(+pc2line?) (2 fixtures)

- Tags: scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).closureVars
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: regexp, splay

### Family 5: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVars, func.cpool[*](func).cpoolCount, func.cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: crypto

### Family 6: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).debug.pc2line, module.atoms.length
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables; third_party/QuickJS/src/core/parser.c: atom collection / constant pool emission
- Sample fixtures: pdfjs

### Family 7: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: navier-stokes

### Family 8: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,scope,semantics
- Diff paths: func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).varDefs
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: test_argument_scope

### Family 9: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,scope,semantics
- Diff paths: func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: repl

### Family 10: bytecode(+pc2line?) (1 fixtures)

- Tags: debug,semantics
- Diff paths: func.bytecode, func.bytecodeLen, func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).debug.pc2line, func.debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32
- Sample fixtures: test_builtin

### Family 11: bytecode(+pc2line?) (1 fixtures)

- Tags: scope,semantics
- Diff paths: func.bytecode, func.closureVarCount, func.closureVars
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: raytrace

### Family 12: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.bytecode, func.bytecodeLen, func.closureVarCount, func.closureVars, func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVarCount, func.cpool[*](func).closureVars, func.cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).argCount, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).argCount, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).definedArgCount, func.cpool[*](func).cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).definedArgCount, func.cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).debug.pc2line, func.debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: typescript-compiler

### Family 13: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.bytecode, func.cpoolCount, func.cpool[*], func.cpool[*](func).argCount, func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVarCount, func.cpool[*](func).closureVars, func.cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).argCount, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).definedArgCount, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).debug.pc2line, func.cpool[*](func).definedArgCount, func.cpool[*](func).funcNameAtom, func.cpool[*](func).stackSize, func.cpool[*](func).varCount, func.cpool[*](func).varDefs
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: mandreel

### Family 14: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.bytecode, func.cpoolCount, func.cpool[*], func.cpool[*](func).argCount, func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).argCount, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).argCount, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpoolCount, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*], func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).definedArgCount, func.cpool[*](func).cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).definedArgCount, func.cpool[*](func).cpool[*](func).funcNameAtom, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).debug.pc2line, func.cpool[*](func).definedArgCount, func.cpool[*](func).flags, func.cpool[*](func).funcNameAtom, func.cpool[*](func).stackSize, func.cpool[*](func).varCount, func.cpool[*](func).varDefs, func.debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: bundle

### Family 15: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).debug.pc2line, func.debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: earley-boyer

### Family 16: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).debug.pc2line, func.cpool[*](func).stackSize, func.debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: gbemu-part2

### Family 17: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVarCount, func.cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).varCount, func.cpool[*](func).cpool[*](func).varDefs, func.cpool[*](func).debug.pc2line, func.cpool[*](func).varDefs
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: test_language

### Family 18: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,scope,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).closureVars, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).debug.pc2line, func.cpool[*](func).stackSize
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32; third_party/QuickJS/src/core/parser.c: push_scope / pop_scope; third_party/QuickJS/src/core/parser.c: add_var; third_party/QuickJS/src/core/parser.c: add_closure_var / add_closure_variables; third_party/QuickJS/src/core/parser.c: resolve_variables
- Sample fixtures: test_ic_atom_free

### Family 19: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecode, func.cpool[*](func).cpool[*](func).cpool[*](func).bytecodeLen, func.cpool[*](func).cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).debug.pc2line, func.cpool[*](func).cpool[*](func).stackSize, func.cpool[*](func).debug.pc2line
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32
- Sample fixtures: box2d

### Family 20: bytecode+stack(+pc2line?) (1 fixtures)

- Tags: debug,func-meta,semantics
- Diff paths: func.cpool[*](func).bytecode, func.cpool[*](func).bytecodeLen, func.cpool[*](func).debug.pc2line, func.cpool[*](func).stackSize
- QuickJS anchors: third_party/QuickJS/src/core/parser.c: add_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_pc2line_info; third_party/QuickJS/src/core/parser.c: compute_stack_size; third_party/QuickJS/src/core/parser.c: resolve_labels; third_party/QuickJS/src/core/parser.c: emit_op / emit_u8/u16/u32
- Sample fixtures: run

### Family 21: error (1 fixtures)

- Tags: error
- Diff paths: error
- Sample fixtures: test_bignum
