# Fixtures 运算符覆盖审计
- fixtures: 93

## BinaryExpression.operatorToken.kind
- observed: 42
- expected: 42
- missing: 0

### Observed
- FirstAssignment (64) x26 e.g. class-accessors.ts:11, class-accessors.ts:16, class-basic.ts:3
- PlusToken (40) x20 e.g. arrow-fn-basic.ts:2, async-await.ts:8, bigint-numeric-separators.ts:5
- FirstCompoundAssignment (65) x20 e.g. async-generator-basic.ts:9, class-methods.ts:7, class-static-block.ts:11
- EqualsEqualsEqualsToken (37) x18 e.g. comparison-ops.ts:7, complex-async-flow.ts:11, complex-control-flow.ts:20
- FirstBinaryOperator (30) x12 e.g. comma-operator.ts:10, comparison-ops.ts:1, complex-control-flow.ts:3
- QuestionQuestionToken (61) x12 e.g. complex-class-optional.ts:35, logical-operators.ts:3, nullish-coalescing.ts:3
- QuestionQuestionEqualsToken (78) x7 e.g. complex-mixed-operators.ts:14, logical-assignment.ts:8, logical-assignment.ts:9
- AsteriskAsteriskToken (43) x6 e.g. bigint-exponentiation.ts:2, exponentiation-ops.ts:2, exponentiation-ops.ts:3
- CommaToken (28) x5 e.g. comma-operator.ts:5, comma-operator.ts:10, complex-mixed-operators.ts:17
- MinusToken (41) x4 e.g. arrow-fn-complex.ts:4, arrow-fn-complex.ts:6, binary-ops.ts:2
- BarBarEqualsToken (76) x4 e.g. complex-class-optional.ts:37, complex-mixed-operators.ts:11, logical-assignment.ts:6
- GreaterThanToken (32) x3 e.g. arrow-fn-complex.ts:3, comparison-ops.ts:2, if-else.ts:2
- AsteriskAsteriskEqualsToken (68) x3 e.g. bigint-exponentiation.ts:4, compound-assignment.ts:9, exponentiation-assignment.ts:3
- AsteriskToken (42) x3 e.g. binary-ops.ts:3, comma-operator.ts:5, es2020_bigint.ts:4
- AmpersandAmpersandEqualsToken (77) x3 e.g. complex-class-optional.ts:38, logical-assignment.ts:7, logical-assignment.ts:14
- InKeyword (103) x3 e.g. private-in-operator.ts:7, regexp-literal.ts:6, regexp-literal.ts:7
- PercentToken (45) x2 e.g. binary-ops.ts:5, loop-break-continue.ts:5
- BarToken (52) x2 e.g. bitwise-ops.ts:2, complex-control-flow.ts:7
- LessThanLessThanToken (48) x2 e.g. bitwise-ops.ts:4, complex-control-flow.ts:7
- GreaterThanEqualsToken (34) x2 e.g. comparison-ops.ts:4, for-loop-variants.ts:4
- AmpersandAmpersandToken (56) x2 e.g. logical-operators.ts:1, logical-operators.ts:4
- BarBarToken (57) x2 e.g. logical-operators.ts:2, logical-operators.ts:5
- InstanceOfKeyword (104) x2 e.g. regexp-literal.ts:14, regexp-literal.ts:15
- SlashToken (44) x1 e.g. binary-ops.ts:4
- AmpersandToken (51) x1 e.g. bitwise-ops.ts:1
- CaretToken (53) x1 e.g. bitwise-ops.ts:3
- GreaterThanGreaterThanToken (49) x1 e.g. bitwise-ops.ts:5
- GreaterThanGreaterThanGreaterThanToken (50) x1 e.g. bitwise-ops.ts:6
- LessThanEqualsToken (33) x1 e.g. comparison-ops.ts:3
- EqualsEqualsToken (35) x1 e.g. comparison-ops.ts:5
- ExclamationEqualsToken (36) x1 e.g. comparison-ops.ts:6
- ExclamationEqualsEqualsToken (38) x1 e.g. comparison-ops.ts:8
- MinusEqualsToken (66) x1 e.g. compound-assignment.ts:5
- AsteriskEqualsToken (67) x1 e.g. compound-assignment.ts:6
- SlashEqualsToken (69) x1 e.g. compound-assignment.ts:7
- PercentEqualsToken (70) x1 e.g. compound-assignment.ts:8
- LessThanLessThanEqualsToken (71) x1 e.g. compound-assignment.ts:11
- GreaterThanGreaterThanEqualsToken (72) x1 e.g. compound-assignment.ts:12
- GreaterThanGreaterThanGreaterThanEqualsToken (73) x1 e.g. compound-assignment.ts:13
- AmpersandEqualsToken (74) x1 e.g. compound-assignment.ts:15
- BarEqualsToken (75) x1 e.g. compound-assignment.ts:16
- LastBinaryOperator (79) x1 e.g. compound-assignment.ts:17

## PrefixUnaryExpression.operator
- observed: 6
- expected: 6
- missing: 0

### Observed
- MinusToken (41) x3 e.g. es2020_bigint.ts:5, es2020_bigint_large.ts:2, unary-ops.ts:4
- PlusPlusToken (46) x1 e.g. prefix-unary.ts:2
- MinusMinusToken (47) x1 e.g. prefix-unary.ts:3
- ExclamationToken (54) x1 e.g. unary-ops.ts:1
- TildeToken (55) x1 e.g. unary-ops.ts:2
- PlusToken (40) x1 e.g. unary-ops.ts:3

## PostfixUnaryExpression.operator
- observed: 2
- expected: 2
- missing: 0

### Observed
- PlusPlusToken (46) x35 e.g. class-private-fields.ts:5, class-static-private-fields.ts:6, closure-short.ts:9
- MinusMinusToken (47) x1 e.g. postfix-unary.ts:3
