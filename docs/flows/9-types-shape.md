# 9. 类型与形状

```mermaid
flowchart TD
  T0[StrongTypeChecker] --> T1[ensureNoAny]
  T0 --> T2[classify -> i32/u32/i64/...]
  S0[ShapePolicy] --> S1[getCanonicalShape]
  S1 --> S2[对象字面量重排与补齐]
```
