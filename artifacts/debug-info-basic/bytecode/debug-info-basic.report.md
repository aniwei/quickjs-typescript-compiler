# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/debug-info-basic.ts
**生成时间**: 2025-12-09T14:28:02.689Z

## 大小对比

- TypeScript编译器: 145 字节
- WASM编译器: 157 字节
- 差异: -12 字节 (-7.64%)

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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/debug-info-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 83
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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/debug-info-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 95
  }
}
```

## 字节级差异

共发现 18 个字节差异:

- 偏移量 0x89: TS=0x06 vs WASM=0x12
- 偏移量 0x8c: TS=0x62 vs WASM=0x2f
- 偏移量 0x8d: TS=0x00 vs WASM=0x0e
- 偏移量 0x8e: TS=0x4e vs WASM=0x20
- 偏移量 0x8f: TS=0x00 vs WASM=0x08
- 偏移量 0x90: TS=0x00 vs WASM=0x17
- 偏移量 0x91: TS=EOF vs WASM=0x15
- 偏移量 0x92: TS=EOF vs WASM=0x1b
- 偏移量 0x93: TS=EOF vs WASM=0x0e
- 偏移量 0x94: TS=EOF vs WASM=0x20
- 偏移量 0x95: TS=EOF vs WASM=0x08
- 偏移量 0x96: TS=EOF vs WASM=0x17
- 偏移量 0x97: TS=EOF vs WASM=0x15
- 偏移量 0x98: TS=EOF vs WASM=0x1b
- 偏移量 0x99: TS=EOF vs WASM=0x0e
- 偏移量 0x9a: TS=EOF vs WASM=0x20
- 偏移量 0x9b: TS=EOF vs WASM=0x08
- 偏移量 0x9c: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 62 75 67 2d 69 6e 66 6f 2d 62 61 73 69 63 2e |ebug-info-basic.|
00000030: 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |js.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000050: 00 00 33 00 08 ec 02 29 39 e5 00 00 00 43 e6 00 |..3....)9....C..|
00000060: 00 00 b8 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000070: 00 b9 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 |..$...9....C....|
00000080: ba 24 01 00 0e 06 2f c8 03 06 00 00 62 00 4e 00 |.$..../.....b.N.|
00000090: 00                                              |.|
```

### WASM
```
00000000: 05 03 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 62 75 67 2d 69 6e 66 6f 2d 62 61 73 69 63 2e |ebug-info-basic.|
00000030: 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |js.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000050: 00 00 33 00 08 ec 02 29 39 e5 00 00 00 43 e6 00 |..3....)9....C..|
00000060: 00 00 b8 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000070: 00 b9 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 |..$...9....C....|
00000080: ba 24 01 00 0e 06 2f c8 03 12 00 00 2f 0e 20 08 |.$..../...../. .|
00000090: 17 15 1b 0e 20 08 17 15 1b 0e 20 08 00          |.... ..... ..|
```