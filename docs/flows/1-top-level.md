# 1. 顶层流水线（Mermaid）

```mermaid
digraph
  compileSource -> emitStmt[遍历 SourceFile.statements]
  compileSource -> assemble[Assembler.assemble]
  assemble -> optimize[optimizeBytecode]
  optimize -> write[writeFunctionOrModule]
```
