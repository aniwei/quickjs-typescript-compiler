# 2. 表达式分派 emitExpr（Mermaid）

```mermaid
flowchart TD
  A[emitExpr(expr)] -->|Await| A1[emitAwait]
  A -->|Yield| A2[emitYield]
  A -->|BigIntLiteral| A3[BigInt 构造]
  A -->|Numeric| A4[push_i32/push_const]
  A -->|String/Bool/Null| A5[push_*]
  A -->|Identifier| A6[emitIdentLoad]
  A -->|Paren| A7[emitExpr(inner)]
  A -->|As/Assert| A8[按目标类型收窄]
  A -->|Binary| A9[emitBinary]
  A -->|Call| A10[emitCall/动态import/eval]
  A -->|PropAccess| A11[get_field]
  A -->|ElemAccess| A12[get_array_el]
  A -->|ObjectLit| A13[emitObjectLiteralWithShape]
  A -->|ArrayLit| A14[array_from]
  A -->|Default| A15[undefined]
```
