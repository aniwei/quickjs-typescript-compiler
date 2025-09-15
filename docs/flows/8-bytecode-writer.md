# 8. 写出字节码

```mermaid
flowchart TD
  W0[BytecodeWriter.writeTop] --> W1[Header(kind/flags/...)]
  W1 --> W2[Bytecode]
  W2 --> W3[Const Pool]
  W3 --> W4[Closures(扩展 flags)]
  W4 --> W5[VarRefs]
  W5 --> W6[Exceptions]
  W6 --> W7[pc2line(压缩)]
  W7 --> W8[Names(param/local)]
  W8 --> W9[Debug IDs(fn/file)]
  W9 --> W10[可选源码 Embed]
  W10 --> W11[Module imports/exports]
```
