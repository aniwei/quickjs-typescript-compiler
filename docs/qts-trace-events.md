# QTS trace events (QuickJS WASM)

Generated at 2025-12-25T03:17:10.816Z

## How to read
- Source: `artifacts/<fixture>/bytecode/<fixture>.qts.stderr.log`
- These events are emitted by QuickJS `parser.c` via `qts_trace.h` (level>=2 semantic tracing).

## Aggregate
- mismatched fixtures: 37, total trace events: 148
- identical fixtures: 165, total trace events: 113

### Top events (mismatch)
- PARSE.array_literal.begin: 30
- PARSE.array_literal.end: 30
- PARSE.try: 18
- EMIT.for_of_next: 15
- PARSE.array_literal.spread: 10
- PARSE.yield: 10
- PARSE.template.begin: 10
- PARSE.template.end: 10
- PARSE.destructuring.array_rest: 5
- PARSE.emit_spread_code.begin: 5
- PARSE.emit_spread_code.end: 5

### Top events (identical)
- PARSE.array_literal.begin: 24
- PARSE.array_literal.end: 24
- PARSE.try: 21
- EMIT.copy_data_properties: 12
- PARSE.yield: 10
- PARSE.template.begin: 9
- PARSE.template.end: 8
- EMIT.for_of_next: 4
- PARSE.array_literal.spread: 1

## Per-fixture (subset)
| fixture | mismatch | Δbytes | trace events | highlights |
|---|---:|---:|---:|---|
| array-literal | 0 | 0 | 2 |  |
| array-nested | 0 | 0 | 6 |  |
| array-spread | 0 | 0 | 5 | PARSE.array_literal.spread=1 |
| array-spread-nested-arrays-013 | 1 | 6 | 8 | PARSE.array_literal.spread=2 |
| array-spread-nested-arrays-032 | 1 | 6 | 8 | PARSE.array_literal.spread=2 |
| array-spread-nested-arrays-051 | 1 | 6 | 8 | PARSE.array_literal.spread=2 |
| array-spread-nested-arrays-070 | 1 | 6 | 8 | PARSE.array_literal.spread=2 |
| array-spread-nested-arrays-089 | 1 | 6 | 8 | PARSE.array_literal.spread=2 |
| arrow-fn-basic | 0 | 0 | 0 |  |
| arrow-fn-complex | 0 | 0 | 0 |  |
| async-await | 0 | 0 | 0 |  |
| async-await-promise-chain-no-top-level-await-006 | 0 | 0 | 0 |  |
| async-await-promise-chain-no-top-level-await-025 | 0 | 0 | 0 |  |
| async-await-promise-chain-no-top-level-await-044 | 0 | 0 | 0 |  |
| async-await-promise-chain-no-top-level-await-063 | 0 | 0 | 0 |  |
| async-await-promise-chain-no-top-level-await-082 | 0 | 0 | 0 |  |
| async-generator-basic | 0 | 0 | 2 | PARSE.yield=2 |
| bigint-exponentiation | 0 | 0 | 0 |  |
| bigint-numeric-separators | 0 | 0 | 0 |  |
| binary-ops | 0 | 0 | 0 |  |
| bitwise-ops | 0 | 0 | 0 |  |
| bitwise-unary-typeof-012 | 0 | 0 | 0 |  |
| bitwise-unary-typeof-031 | 0 | 0 | 0 |  |
| bitwise-unary-typeof-050 | 0 | 0 | 0 |  |
| bitwise-unary-typeof-069 | 0 | 0 | 0 |  |
| bitwise-unary-typeof-088 | 0 | 0 | 0 |  |
| class-accessors | 0 | 0 | 0 |  |
| class-basic | 0 | 0 | 0 |  |
| class-field-initializers | 0 | 0 | 0 |  |
| class-inheritance | 0 | 0 | 0 |  |
| class-methods | 0 | 0 | 0 |  |
| class-private-accessors | 0 | 0 | 0 |  |
| class-private-field-method-destructuring-loop-001 | 1 | 1 | 0 |  |
| class-private-field-method-destructuring-loop-020 | 1 | 1 | 0 |  |
| class-private-field-method-destructuring-loop-039 | 1 | 1 | 0 |  |
| class-private-field-method-destructuring-loop-058 | 1 | 1 | 0 |  |
| class-private-field-method-destructuring-loop-077 | 1 | 1 | 0 |  |
| class-private-field-method-destructuring-loop-096 | 1 | 1 | 0 |  |
| class-private-fields | 0 | 0 | 0 |  |
| class-static-block | 0 | 0 | 0 |  |
| class-static-private-accessors | 0 | 0 | 0 |  |
| class-static-private-fields | 0 | 0 | 0 |  |
| closure-basic | 0 | 0 | 0 |  |
| closure-recursion-default-params-005 | 0 | 0 | 0 |  |
| closure-recursion-default-params-024 | 0 | 0 | 0 |  |
| closure-recursion-default-params-043 | 0 | 0 | 0 |  |
| closure-recursion-default-params-062 | 0 | 0 | 0 |  |
| closure-recursion-default-params-081 | 0 | 0 | 0 |  |
| closure-recursion-default-params-100 | 0 | 0 | 0 |  |
| closure-short | 0 | 0 | 0 |  |
| closure-stress | 0 | 0 | 0 |  |
| closure-vars | 0 | 0 | 0 |  |
| comma-operator | 0 | 0 | 0 |  |
| comparison-ops | 0 | 0 | 0 |  |
| complex-async-flow | 0 | 0 | 5 | PARSE.yield=2 PARSE.try=3 |
| complex-class-optional | 0 | 0 | 0 |  |
| complex-control-flow | 0 | 0 | 3 | PARSE.try=3 |
| complex-mixed-operators | 0 | 0 | 6 | PARSE.try=3 EMIT.for_of_next=1 |
| compound-assignment | 0 | 0 | 0 |  |
| compute | 0 | 0 | 0 |  |
| computed-property | 0 | 0 | 0 |  |
| computed-property-object-spread-method-008 | 0 | 0 | 1 | EMIT.copy_data_properties=1 |
| computed-property-object-spread-method-027 | 0 | 0 | 1 | EMIT.copy_data_properties=1 |
| computed-property-object-spread-method-046 | 0 | 0 | 1 | EMIT.copy_data_properties=1 |
| computed-property-object-spread-method-065 | 0 | 0 | 1 | EMIT.copy_data_properties=1 |
| computed-property-object-spread-method-084 | 0 | 0 | 1 | EMIT.copy_data_properties=1 |
| conditional-operator | 0 | 0 | 0 |  |
| console-log | 0 | 0 | 0 |  |
| debug-info-basic | 0 | 0 | 0 |  |
| delete-prop | 0 | 0 | 2 |  |
| destructuring-defaults-rest-object-pattern-018 | 0 | 0 | 1 | EMIT.copy_data_properties=1 |
| destructuring-defaults-rest-object-pattern-037 | 0 | 0 | 1 | EMIT.copy_data_properties=1 |
| destructuring-defaults-rest-object-pattern-056 | 0 | 0 | 1 | EMIT.copy_data_properties=1 |
| destructuring-defaults-rest-object-pattern-075 | 0 | 0 | 1 | EMIT.copy_data_properties=1 |
| destructuring-defaults-rest-object-pattern-094 | 0 | 0 | 1 | EMIT.copy_data_properties=1 |
| destructuring-nested | 0 | 0 | 0 |  |
| destructuring-rest-defaults | 0 | 0 | 1 | EMIT.copy_data_properties=1 |
| do-while | 0 | 0 | 0 |  |
| do-while-break | 0 | 0 | 0 |  |
| do-while-break-continue-015 | 0 | 0 | 0 |  |
| do-while-break-continue-034 | 0 | 0 | 0 |  |
| do-while-break-continue-053 | 0 | 0 | 0 |  |
| do-while-break-continue-072 | 0 | 0 | 0 |  |
| do-while-break-continue-091 | 0 | 0 | 0 |  |
| dynamic-import | 0 | 0 | 0 |  |
| empty | 0 | 0 | 0 |  |
| es2020_bigint | 0 | 0 | 0 |  |
| es2020_bigint_large | 0 | 0 | 0 |  |
| exponentiation-assignment | 0 | 0 | 0 |  |
| exponentiation-ops | 0 | 0 | 0 |  |
| for-await-of | 0 | 0 | 3 | PARSE.yield=3 |
| for-in | 0 | 0 | 0 |  |
| for-loop | 0 | 0 | 0 |  |
| for-loop-variants | 0 | 0 | 0 |  |
| for-of | 0 | 0 | 3 | EMIT.for_of_next=1 |
| for-of-destructuring | 0 | 0 | 4 | EMIT.for_of_next=2 |
| for-of-destructuring-rest-007 | 1 | 4 | 9 | PARSE.destructuring.array_rest=1 PARSE.emit_spread_code.begin=1 EMIT.for_of_next=2 |
| for-of-destructuring-rest-026 | 1 | 4 | 9 | PARSE.destructuring.array_rest=1 PARSE.emit_spread_code.begin=1 EMIT.for_of_next=2 |
| for-of-destructuring-rest-045 | 1 | 4 | 9 | PARSE.destructuring.array_rest=1 PARSE.emit_spread_code.begin=1 EMIT.for_of_next=2 |
| for-of-destructuring-rest-064 | 1 | 4 | 9 | PARSE.destructuring.array_rest=1 PARSE.emit_spread_code.begin=1 EMIT.for_of_next=2 |
| for-of-destructuring-rest-083 | 1 | 4 | 9 | PARSE.destructuring.array_rest=1 PARSE.emit_spread_code.begin=1 EMIT.for_of_next=2 |
| function-call | 0 | 0 | 0 |  |
| function-default-params | 0 | 0 | 0 |  |
| function-expression-arrow-this-binding-016 | 0 | 0 | 0 |  |
| function-expression-arrow-this-binding-035 | 0 | 0 | 0 |  |
| function-expression-arrow-this-binding-054 | 0 | 0 | 0 |  |
| function-expression-arrow-this-binding-073 | 0 | 0 | 0 |  |
| function-expression-arrow-this-binding-092 | 0 | 0 | 0 |  |
| function-expressions | 0 | 0 | 0 |  |
| generator-yield-010 | 1 | -77 | 5 | PARSE.yield=2 EMIT.for_of_next=1 |
| generator-yield-029 | 1 | -77 | 5 | PARSE.yield=2 EMIT.for_of_next=1 |
| generator-yield-048 | 1 | -77 | 5 | PARSE.yield=2 EMIT.for_of_next=1 |
| generator-yield-067 | 1 | -77 | 5 | PARSE.yield=2 EMIT.for_of_next=1 |
| generator-yield-086 | 1 | -77 | 5 | PARSE.yield=2 EMIT.for_of_next=1 |
| generator-yield-star | 0 | 0 | 3 | PARSE.yield=3 |
| if-else | 0 | 0 | 0 |  |
| import-call | 0 | 0 | 2 |  |
| labeled-statements | 0 | 0 | 0 |  |
| logical-assignment | 0 | 0 | 0 |  |
| logical-assignment-nullish-assignment-011 | 0 | 0 | 0 |  |
| logical-assignment-nullish-assignment-030 | 0 | 0 | 0 |  |
| logical-assignment-nullish-assignment-049 | 0 | 0 | 0 |  |
| logical-assignment-nullish-assignment-068 | 0 | 0 | 0 |  |
| logical-assignment-nullish-assignment-087 | 0 | 0 | 0 |  |
| logical-operators | 0 | 0 | 0 |  |
| loop-break-continue | 0 | 0 | 0 |  |
| module-basic | 0 | 0 | 0 |  |
| module-mode-export-function-decl-no-imports-017 | 0 | 0 | 0 |  |
| module-mode-export-function-decl-no-imports-036 | 0 | 0 | 0 |  |
| module-mode-export-function-decl-no-imports-055 | 0 | 0 | 0 |  |
| module-mode-export-function-decl-no-imports-074 | 0 | 0 | 0 |  |
| module-mode-export-function-decl-no-imports-093 | 0 | 0 | 0 |  |
| nested-functions-arguments-new-target-indirect-019 | 1 | 4 | 0 |  |
| nested-functions-arguments-new-target-indirect-038 | 1 | 4 | 0 |  |
| nested-functions-arguments-new-target-indirect-057 | 1 | 4 | 0 |  |
| nested-functions-arguments-new-target-indirect-076 | 1 | 4 | 0 |  |
| nested-functions-arguments-new-target-indirect-095 | 1 | 4 | 0 |  |
| new-target | 0 | 0 | 0 |  |
| nullish-assignment | 0 | 0 | 0 |  |
| nullish-coalescing | 0 | 0 | 0 |  |
| number | 0 | 0 | 0 |  |
| numeric-separators | 0 | 0 | 0 |  |
| object-literal | 0 | 0 | 0 |  |
| object-methods | 0 | 0 | 0 |  |
| object-nested | 0 | 0 | 2 |  |
| object-spread | 0 | 0 | 1 | EMIT.copy_data_properties=1 |
| optional-catch-binding | 0 | 0 | 3 | PARSE.try=3 |
| optional-chain-call | 0 | 0 | 0 |  |
| optional-chaining | 0 | 0 | 2 |  |
| optional-chaining-delete | 0 | 0 | 0 |  |
| optional-chaining-nested | 0 | 0 | 0 |  |
| optional-chaining-nullish-coalescing-array-object-nested-002 | 0 | 0 | 2 |  |
| optional-chaining-nullish-coalescing-array-object-nested-021 | 0 | 0 | 2 |  |
| optional-chaining-nullish-coalescing-array-object-nested-040 | 0 | 0 | 2 |  |
| optional-chaining-nullish-coalescing-array-object-nested-059 | 0 | 0 | 2 |  |
| optional-chaining-nullish-coalescing-array-object-nested-078 | 0 | 0 | 2 |  |
| optional-chaining-nullish-coalescing-array-object-nested-097 | 0 | 0 | 2 |  |
| postfix-prefix-014 | 0 | 0 | 0 |  |
| postfix-prefix-033 | 0 | 0 | 0 |  |
| postfix-prefix-052 | 0 | 0 | 0 |  |
| postfix-prefix-071 | 0 | 0 | 0 |  |
| postfix-prefix-090 | 0 | 0 | 0 |  |
| postfix-unary | 0 | 0 | 0 |  |
| prefix-unary | 0 | 0 | 0 |  |
| primitives | 0 | 0 | 0 |  |
| private-in-operator | 0 | 0 | 0 |  |
| private-method-basic | 0 | 0 | 0 |  |
| regexp-literal | 0 | 0 | 0 |  |
| static-private-method-basic | 0 | 0 | 0 |  |
| switch-case | 0 | 0 | 0 |  |
| switch-default-first | 0 | 0 | 0 |  |
| switch-default-middle | 0 | 0 | 0 |  |
| switch-fallthrough | 0 | 0 | 0 |  |
| switch-fallthrough-block-scoped-let-004 | 0 | 0 | 0 |  |
| switch-fallthrough-block-scoped-let-023 | 0 | 0 | 0 |  |
| switch-fallthrough-block-scoped-let-042 | 0 | 0 | 0 |  |
| switch-fallthrough-block-scoped-let-061 | 0 | 0 | 0 |  |
| switch-fallthrough-block-scoped-let-080 | 0 | 0 | 0 |  |
| switch-fallthrough-block-scoped-let-099 | 0 | 0 | 0 |  |
| tagged-template | 0 | 0 | 10 | PARSE.template.begin=3 |
| tagged-template-basic | 0 | 0 | 6 | PARSE.template.begin=2 |
| tagged-template-element | 0 | 0 | 4 | PARSE.template.begin=1 |
| tagged-template-method | 0 | 0 | 4 | PARSE.template.begin=1 |
| template-literal-tagged-template-009 | 1 | 8 | 4 | PARSE.template.begin=2 |
| template-literal-tagged-template-028 | 1 | 8 | 4 | PARSE.template.begin=2 |
| template-literal-tagged-template-047 | 1 | 8 | 4 | PARSE.template.begin=2 |
| template-literal-tagged-template-066 | 1 | 8 | 4 | PARSE.template.begin=2 |
| template-literal-tagged-template-085 | 1 | 8 | 4 | PARSE.template.begin=2 |
| template-literals | 0 | 0 | 3 | PARSE.template.begin=2 |
| try-catch | 0 | 0 | 3 | PARSE.try=3 |
| try-catch-finally | 0 | 0 | 3 | PARSE.try=3 |
| try-catch-finally-throw-instanceof-new-003 | 1 | 0 | 3 | PARSE.try=3 |
| try-catch-finally-throw-instanceof-new-022 | 1 | 0 | 3 | PARSE.try=3 |
| try-catch-finally-throw-instanceof-new-041 | 1 | 0 | 3 | PARSE.try=3 |
| try-catch-finally-throw-instanceof-new-060 | 1 | 0 | 3 | PARSE.try=3 |
| try-catch-finally-throw-instanceof-new-079 | 1 | 0 | 3 | PARSE.try=3 |
| try-catch-finally-throw-instanceof-new-098 | 1 | 0 | 3 | PARSE.try=3 |
| try-finally-basic | 0 | 0 | 3 | PARSE.try=3 |
| unary-ops | 0 | 0 | 0 |  |
| variables-let-block | 0 | 0 | 0 |  |
| variables-var | 0 | 0 | 0 |  |
| while | 0 | 0 | 0 |  |
