# 7. 优化器

```mermaid
flowchart TD
  O0[optimizeBytecode] --> O1[constFold(i32)]
  O1 --> O2[cleanDupSwapDrop]
  O2 --> O3[deadCodeElim]
  O3 --> O4[hotICRewrite(loop back-edges)]
  O4 --> O5[preciseMaxStackWithExceptions]
```
