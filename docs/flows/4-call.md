# 4. 调用（Mermaid）

```mermaid
flowchart TD
  C[emitCall] --> C1{callee 是 obj.prop?}
  C1 -- 是 --> C2[obj; get_field2]
  C1 -- 否 --> C3[emit callee]
  C2 --> C4[逐参数发射并按签名收窄]
  C3 --> C4
  C4 --> C5{method?}
  C5 -- 是 --> C6[call_method(argc)]
  C5 -- 否 --> C7[call(argc)]
```
