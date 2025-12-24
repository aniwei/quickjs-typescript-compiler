# Fixture Syntax Coverage (AST-based)

Scanned: 95 fixture files under __tests__/fixtures

## Target kinds

| SyntaxKind | Covered? | Count | Example files |
|---|---:|---:|---|
| FirstStatement | ✅ | 66 | __tests__/fixtures/array-literal.ts, __tests__/fixtures/array-nested.ts, __tests__/fixtures/array-spread.ts, __tests__/fixtures/arrow-fn-basic.ts, __tests__/fixtures/arrow-fn-complex.ts |
| FunctionDeclaration | ✅ | 14 | __tests__/fixtures/async-await.ts, __tests__/fixtures/async-generator-basic.ts, __tests__/fixtures/closure-basic.ts, __tests__/fixtures/closure-short.ts, __tests__/fixtures/closure-stress.ts |
| ReturnStatement | ✅ | 24 | __tests__/fixtures/arrow-fn-basic.ts, __tests__/fixtures/arrow-fn-complex.ts, __tests__/fixtures/async-await.ts, __tests__/fixtures/class-accessors.ts, __tests__/fixtures/class-methods.ts |
| ThrowStatement | ✅ | 3 | __tests__/fixtures/optional-catch-binding.ts, __tests__/fixtures/try-catch-finally.ts, __tests__/fixtures/try-catch.ts |
| IfStatement | ✅ | 11 | __tests__/fixtures/arrow-fn-complex.ts, __tests__/fixtures/complex-async-flow.ts, __tests__/fixtures/complex-control-flow.ts, __tests__/fixtures/complex-mixed-operators.ts, __tests__/fixtures/do-while-break.ts |
| WhileStatement | ✅ | 2 | __tests__/fixtures/complex-control-flow.ts, __tests__/fixtures/while.ts |
| DoStatement | ✅ | 2 | __tests__/fixtures/do-while-break.ts, __tests__/fixtures/do-while.ts |
| ForStatement | ✅ | 6 | __tests__/fixtures/comma-operator.ts, __tests__/fixtures/complex-control-flow.ts, __tests__/fixtures/for-loop-variants.ts, __tests__/fixtures/for-loop.ts, __tests__/fixtures/labeled-statements.ts |
| ForOfStatement | ✅ | 6 | __tests__/fixtures/async-generator-basic.ts, __tests__/fixtures/complex-async-flow.ts, __tests__/fixtures/complex-mixed-operators.ts, __tests__/fixtures/for-await-of.ts, __tests__/fixtures/for-of-destructuring.ts |
| ForInStatement | ✅ | 1 | __tests__/fixtures/for-in.ts |
| SwitchStatement | ✅ | 6 | __tests__/fixtures/complex-control-flow.ts, __tests__/fixtures/complex-mixed-operators.ts, __tests__/fixtures/switch-case.ts, __tests__/fixtures/switch-default-first.ts, __tests__/fixtures/switch-default-middle.ts |
| TryStatement | ✅ | 7 | __tests__/fixtures/complex-async-flow.ts, __tests__/fixtures/complex-control-flow.ts, __tests__/fixtures/complex-mixed-operators.ts, __tests__/fixtures/optional-catch-binding.ts, __tests__/fixtures/try-catch-finally.ts |
| BreakStatement | ✅ | 9 | __tests__/fixtures/complex-control-flow.ts, __tests__/fixtures/complex-mixed-operators.ts, __tests__/fixtures/do-while-break.ts, __tests__/fixtures/for-loop-variants.ts, __tests__/fixtures/for-of-destructuring.ts |
| ContinueStatement | ✅ | 8 | __tests__/fixtures/complex-async-flow.ts, __tests__/fixtures/complex-control-flow.ts, __tests__/fixtures/complex-mixed-operators.ts, __tests__/fixtures/do-while-break.ts, __tests__/fixtures/for-in.ts |
| LabeledStatement | ✅ | 3 | __tests__/fixtures/complex-control-flow.ts, __tests__/fixtures/complex-mixed-operators.ts, __tests__/fixtures/labeled-statements.ts |
| ClassDeclaration | ✅ | 15 | __tests__/fixtures/class-accessors.ts, __tests__/fixtures/class-basic.ts, __tests__/fixtures/class-field-initializers.ts, __tests__/fixtures/class-inheritance.ts, __tests__/fixtures/class-methods.ts |
| BinaryExpression | ✅ | 57 | __tests__/fixtures/arrow-fn-basic.ts, __tests__/fixtures/arrow-fn-complex.ts, __tests__/fixtures/async-await.ts, __tests__/fixtures/async-generator-basic.ts, __tests__/fixtures/bigint-exponentiation.ts |
| PrefixUnaryExpression | ✅ | 4 | __tests__/fixtures/es2020_bigint.ts, __tests__/fixtures/es2020_bigint_large.ts, __tests__/fixtures/prefix-unary.ts, __tests__/fixtures/unary-ops.ts |
| PostfixUnaryExpression | ✅ | 16 | __tests__/fixtures/class-private-fields.ts, __tests__/fixtures/class-static-private-fields.ts, __tests__/fixtures/closure-short.ts, __tests__/fixtures/closure-stress.ts, __tests__/fixtures/closure-vars.ts |
| ConditionalExpression | ✅ | 1 | __tests__/fixtures/conditional-operator.ts |
| CallExpression | ✅ | 87 | __tests__/fixtures/array-literal.ts, __tests__/fixtures/array-nested.ts, __tests__/fixtures/array-spread.ts, __tests__/fixtures/arrow-fn-basic.ts, __tests__/fixtures/arrow-fn-complex.ts |
| PropertyAccessExpression | ✅ | 86 | __tests__/fixtures/array-literal.ts, __tests__/fixtures/array-nested.ts, __tests__/fixtures/array-spread.ts, __tests__/fixtures/arrow-fn-basic.ts, __tests__/fixtures/arrow-fn-complex.ts |
| ElementAccessExpression | ✅ | 8 | __tests__/fixtures/array-literal.ts, __tests__/fixtures/array-nested.ts, __tests__/fixtures/array-spread.ts, __tests__/fixtures/computed-property.ts, __tests__/fixtures/delete-prop.ts |
| ArrayLiteralExpression | ✅ | 10 | __tests__/fixtures/array-literal.ts, __tests__/fixtures/array-nested.ts, __tests__/fixtures/array-spread.ts, __tests__/fixtures/complex-mixed-operators.ts, __tests__/fixtures/delete-prop.ts |
| ObjectLiteralExpression | ✅ | 17 | __tests__/fixtures/array-nested.ts, __tests__/fixtures/complex-class-optional.ts, __tests__/fixtures/computed-property.ts, __tests__/fixtures/delete-prop.ts, __tests__/fixtures/destructuring-nested.ts |
| NewExpression | ✅ | 12 | __tests__/fixtures/class-accessors.ts, __tests__/fixtures/class-field-initializers.ts, __tests__/fixtures/class-inheritance.ts, __tests__/fixtures/class-methods.ts, __tests__/fixtures/class-private-accessors.ts |
| DeleteExpression | ✅ | 1 | __tests__/fixtures/delete-prop.ts |
| TypeOfExpression | ✅ | 1 | __tests__/fixtures/unary-ops.ts |
| VoidExpression | ✅ | 1 | __tests__/fixtures/unary-ops.ts |
| SpreadElement | ✅ | 1 | __tests__/fixtures/array-spread.ts |
| TemplateExpression | ✅ | 1 | __tests__/fixtures/template-literals.ts |
| TaggedTemplateExpression | ❌ | 0 |  |
| AwaitExpression | ✅ | 2 | __tests__/fixtures/async-await.ts, __tests__/fixtures/async-generator-basic.ts |
| YieldExpression | ✅ | 4 | __tests__/fixtures/async-generator-basic.ts, __tests__/fixtures/complex-async-flow.ts, __tests__/fixtures/for-await-of.ts, __tests__/fixtures/generator-yield-star.ts |
| MetaProperty (new.target/import.meta) | ✅ | 1 | __tests__/fixtures/new-target.ts |
| PrivateIdentifier | ✅ | 10 | __tests__/fixtures/class-private-accessors.ts, __tests__/fixtures/class-private-fields.ts, __tests__/fixtures/class-static-block.ts, __tests__/fixtures/class-static-private-accessors.ts, __tests__/fixtures/class-static-private-fields.ts |
| import() call | ❌ | 0 |  |
| new.target | ✅ | 1 | __tests__/fixtures/new-target.ts |

## Notes

- This is **syntax presence** only (TypeScript AST). It does not prove semantic/codegen correctness.
- “Covered” means at least one fixture contains that node kind.
