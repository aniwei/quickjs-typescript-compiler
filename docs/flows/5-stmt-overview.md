# 5. 语句分派概览（Mermaid）

```mermaid
flowchart TD
  S[emitStmt] --> S1[Empty/Debugger/Throw]
  S --> S2[Labeled{loop/switch/other}]
  S --> S3[Break/Continue{含 label 查找}]
  S --> S4[Do/While/For]
  S --> S5[Switch]
  S --> S6[ForIn{严格/非严格}]
  S --> S7[ForOf{IteratorClose}]
  S --> S8[With{静态/动态}]
  S --> S9[Var 声明/解构/导出]
  S --> S10[Import/Export]
  S --> S11[Class/Function 声明]
  S --> S12[Expr/Return/If/Try]
```
