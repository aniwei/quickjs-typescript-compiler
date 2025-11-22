# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/conditional-expression.ts
**生成时间**: 2025-11-22T14:52:37.803Z

## 大小对比

- TypeScript编译器: 247 字节
- WASM编译器: 243 字节
- 差异: 4 字节 (1.65%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 106,
      "actualLength": 53,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/conditional-expression.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 56
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "max",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 72
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "high",
      "offset": 76
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "low",
      "offset": 81
    }
  ],
  "functionHeader": {
    "offset": 85,
    "tag": "0xd",
    "remaining": 162
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 106,
      "actualLength": 53,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/conditional-expression.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 56
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "max",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 72
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "high",
      "offset": 76
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "low",
      "offset": 81
    }
  ],
  "functionHeader": {
    "offset": 85,
    "tag": "0xd",
    "remaining": 158
  }
}
```

## 字节级差异

共发现 16 个字节差异:

- 偏移量 0xd1: TS=0x24 vs WASM=0x20
- 偏移量 0xdd: TS=0x0a vs WASM=0x08
- 偏移量 0xdf: TS=0x31 vs WASM=0x2f
- 偏移量 0xea: TS=0x11 vs WASM=0x53
- 偏移量 0xeb: TS=0x0c vs WASM=0x21
- 偏移量 0xec: TS=0x25 vs WASM=0x1b
- 偏移量 0xed: TS=0x1c vs WASM=0x0e
- 偏移量 0xee: TS=0x21 vs WASM=0x1b
- 偏移量 0xef: TS=0x49 vs WASM=0x0a
- 偏移量 0xf0: TS=0x1b vs WASM=0x11
- 偏移量 0xf1: TS=0x0e vs WASM=0x01
- 偏移量 0xf2: TS=0x1b vs WASM=0x00
- 偏移量 0xf3: TS=0x0a vs WASM=EOF
- 偏移量 0xf4: TS=0x11 vs WASM=EOF
- 偏移量 0xf5: TS=0x01 vs WASM=EOF
- 偏移量 0xf6: TS=0x00 vs WASM=EOF

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 6a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..j__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6e 64 69 74 69 6f 6e 61 6c 2d 65 78 70 72 65 |onditional-expre|
00000030: 73 73 69 6f 6e 2e 6a 73 02 61 02 62 06 6d 61 78 |ssion.js.a.b.max|
00000040: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 08 68 69 67 |.console.log.hig|
00000050: 68 06 6c 6f 77 0d c8 03 00 00 00 00 00 0c 20 06 |h.low......... .|
00000060: 01 a4 01 00 00 00 03 04 00 54 00 ca 03 00 0d cc |.........T......|
00000070: 03 01 0d ce 03 02 0d 96 02 03 0d 08 ec 02 29 bf |..............).|
00000080: 0a e3 bf 14 e4 68 00 00 68 01 00 a7 ec 06 68 00 |.....h..h.....h.|
00000090: 00 ee 04 68 01 00 e5 39 e8 00 00 00 43 e9 00 00 |...h...9....C...|
000000a0: 00 68 02 00 24 01 00 0e 68 00 00 bc a7 ec 08 04 |.h..$...h.......|
000000b0: ea 00 00 00 ee 06 04 eb 00 00 00 e6 39 e8 00 00 |............9...|
000000c0: 00 43 e9 00 00 00 68 03 00 24 01 00 0e 06 2f c8 |.C....h..$..../.|
000000d0: 03 24 00 00 36 18 11 08 11 03 11 0c 1b 0a 17 31 |.$..6..........1|
000000e0: 1b 0e 1b 0a 11 01 17 08 16 04 11 0c 25 1c 21 49 |............%.!I|
000000f0: 1b 0e 1b 0a 11 01 00                            |.......|
```

### WASM
```
00000000: 05 08 6a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..j__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6e 64 69 74 69 6f 6e 61 6c 2d 65 78 70 72 65 |onditional-expre|
00000030: 73 73 69 6f 6e 2e 6a 73 02 61 02 62 06 6d 61 78 |ssion.js.a.b.max|
00000040: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 08 68 69 67 |.console.log.hig|
00000050: 68 06 6c 6f 77 0d c8 03 00 00 00 00 00 0c 20 06 |h.low......... .|
00000060: 01 a4 01 00 00 00 03 04 00 54 00 ca 03 00 0d cc |.........T......|
00000070: 03 01 0d ce 03 02 0d 96 02 03 0d 08 ec 02 29 bf |..............).|
00000080: 0a e3 bf 14 e4 68 00 00 68 01 00 a7 ec 06 68 00 |.....h..h.....h.|
00000090: 00 ee 04 68 01 00 e5 39 e8 00 00 00 43 e9 00 00 |...h...9....C...|
000000a0: 00 68 02 00 24 01 00 0e 68 00 00 bc a7 ec 08 04 |.h..$...h.......|
000000b0: ea 00 00 00 ee 06 04 eb 00 00 00 e6 39 e8 00 00 |............9...|
000000c0: 00 43 e9 00 00 00 68 03 00 24 01 00 0e 06 2f c8 |.C....h..$..../.|
000000d0: 03 20 00 00 36 18 11 08 11 03 11 0c 1b 08 17 2f |. ..6........../|
000000e0: 1b 0e 1b 0a 11 01 17 08 16 04 53 21 1b 0e 1b 0a |..........S!....|
000000f0: 11 01 00                                        |...|
```