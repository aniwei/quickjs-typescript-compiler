# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/literals.ts
**生成时间**: 2025-12-06T02:09:56.399Z

## 大小对比

- TypeScript编译器: 140 字节
- WASM编译器: 149 字节
- 差异: -9 字节 (-6.04%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/literals.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 42
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 50
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xd",
    "remaining": 86
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/literals.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 42
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 50
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xd",
    "remaining": 95
  }
}
```

## 字节级差异

共发现 20 个字节差异:

- 偏移量 0x81: TS=0x00 vs WASM=0x12
- 偏移量 0x82: TS=0x08 vs WASM=0x00
- 偏移量 0x83: TS=0x48 vs WASM=0x00
- 偏移量 0x84: TS=0x0c vs WASM=0x2f
- 偏移量 0x85: TS=0x1c vs WASM=0x0e
- 偏移量 0x86: TS=0x74 vs WASM=0x20
- 偏移量 0x87: TS=0x34 vs WASM=0x08
- 偏移量 0x88: TS=0x0c vs WASM=0x17
- 偏移量 0x89: TS=0x1c vs WASM=0x15
- 偏移量 0x8a: TS=0x74 vs WASM=0x1b
- 偏移量 0x8b: TS=0x00 vs WASM=0x0e
- 偏移量 0x8c: TS=EOF vs WASM=0x20
- 偏移量 0x8d: TS=EOF vs WASM=0x08
- 偏移量 0x8e: TS=EOF vs WASM=0x17
- 偏移量 0x8f: TS=EOF vs WASM=0x15
- 偏移量 0x90: TS=EOF vs WASM=0x1b
- 偏移量 0x91: TS=EOF vs WASM=0x0e
- 偏移量 0x92: TS=EOF vs WASM=0x20
- 偏移量 0x93: TS=EOF vs WASM=0x08
- 偏移量 0x94: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 4e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..N__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 69 74 65 72 61 6c 73 2e 6a 73 0e 63 6f 6e 73 6f |iterals.js.conso|
00000030: 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 |le.log......... |
00000040: 06 01 a4 01 00 00 00 03 00 00 33 00 08 ec 02 29 |..........3....)|
00000050: 39 e5 00 00 00 43 e6 00 00 00 07 24 01 00 0e 39 |9....C.....$...9|
00000060: e5 00 00 00 43 e6 00 00 00 0a 24 01 00 0e 39 e5 |....C.....$...9.|
00000070: 00 00 00 43 e6 00 00 00 09 24 01 00 0e 06 2f c8 |...C.....$..../.|
00000080: 03 00 08 48 0c 1c 74 34 0c 1c 74 00             |...H..t4..t.|
```

### WASM
```
00000000: 05 03 4e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..N__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 69 74 65 72 61 6c 73 2e 6a 73 0e 63 6f 6e 73 6f |iterals.js.conso|
00000030: 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 |le.log......... |
00000040: 06 01 a4 01 00 00 00 03 00 00 33 00 08 ec 02 29 |..........3....)|
00000050: 39 e5 00 00 00 43 e6 00 00 00 07 24 01 00 0e 39 |9....C.....$...9|
00000060: e5 00 00 00 43 e6 00 00 00 0a 24 01 00 0e 39 e5 |....C.....$...9.|
00000070: 00 00 00 43 e6 00 00 00 09 24 01 00 0e 06 2f c8 |...C.....$..../.|
00000080: 03 12 00 00 2f 0e 20 08 17 15 1b 0e 20 08 17 15 |..../. ..... ...|
00000090: 1b 0e 20 08 00                                  |.. ..|
```