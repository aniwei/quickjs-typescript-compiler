# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/typeof-instanceof.ts
**生成时间**: 2025-12-05T12:54:24.389Z

## 大小对比

- TypeScript编译器: 227 字节
- WASM编译器: 165 字节
- 差异: 62 字节 (37.58%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 232,
      "actualLength": 116,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/typeof-instanceof.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ti_a",
      "offset": 120
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 125
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 133
    }
  ],
  "functionHeader": {
    "offset": 137,
    "tag": "0xd",
    "remaining": 90
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/typeof-instanceof.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ti_a",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 97
  }
}
```

## 字节级差异

共发现 220 个字节差异:

- 偏移量 0x2: TS=0xe8 vs WASM=0x60
- 偏移量 0x3: TS=0x01 vs WASM=0x5f
- 偏移量 0x4: TS=0x2f vs WASM=0x5f
- 偏移量 0x5: TS=0x55 vs WASM=0x74
- 偏移量 0x6: TS=0x73 vs WASM=0x65
- 偏移量 0x7: TS=0x65 vs WASM=0x73
- 偏移量 0x8: TS=0x72 vs WASM=0x74
- 偏移量 0xa: TS=0x2f vs WASM=0x5f
- 偏移量 0xb: TS=0x61 vs WASM=0x5f
- 偏移量 0xc: TS=0x6e vs WASM=0x2f
- 偏移量 0xd: TS=0x69 vs WASM=0x63
- 偏移量 0xe: TS=0x77 vs WASM=0x6f
- 偏移量 0xf: TS=0x65 vs WASM=0x6d
- 偏移量 0x10: TS=0x69 vs WASM=0x70
- 偏移量 0x11: TS=0x2f vs WASM=0x69
- 偏移量 0x12: TS=0x44 vs WASM=0x6c
- 偏移量 0x14: TS=0x73 vs WASM=0x72
- 偏移量 0x15: TS=0x6b vs WASM=0x2f
- 偏移量 0x16: TS=0x74 vs WASM=0x66
- 偏移量 0x17: TS=0x6f vs WASM=0x69
- ... (显示前20个差异，总共220个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 e8 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 74 79 70 65 6f 66 2d 69 6e 73 74 61 |res/typeof-insta|
00000070: 6e 63 65 6f 66 2e 6a 73 08 74 69 5f 61 0e 63 6f |nceof.js.ti_a.co|
00000080: 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 |nsole.log.......|
00000090: 00 0c 20 06 01 a4 01 00 01 00 03 01 00 30 01 ca |.. ..........0..|
000000a0: 03 00 00 00 ca 03 00 01 08 6c 28 00 00 00 0b e3 |.........l(.....|
000000b0: 39 e6 00 00 00 43 e7 00 00 00 df 99 24 01 00 0e |9....C......$...|
000000c0: 39 e6 00 00 00 43 e7 00 00 00 df 39 9d 00 00 00 |9....C.....9....|
000000d0: a9 24 01 00 0e 29 06 2f c8 03 01 06 00 12 01 00 |.$...)./........|
000000e0: 10 01 00                                        |...|
```

### WASM
```
00000000: 05 04 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 79 70 65 6f 66 2d 69 6e 73 74 61 6e 63 65 6f 66 |ypeof-instanceof|
00000030: 2e 6a 73 08 74 69 5f 61 0e 63 6f 6e 73 6f 6c 65 |.js.ti_a.console|
00000040: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000050: a4 01 00 00 00 04 01 00 2d 00 ca 03 00 01 08 ec |........-.......|
00000060: 02 29 0b e3 39 e6 00 00 00 43 e7 00 00 00 df 99 |.)..9....C......|
00000070: 24 01 00 0e 39 e6 00 00 00 43 e7 00 00 00 df 39 |$...9....C.....9|
00000080: 9d 00 00 00 a9 24 01 00 0e 06 2f c8 03 16 00 00 |.....$..../.....|
00000090: 21 00 1b 0e 1b 18 0c 0f 17 15 1b 0e 1b 0a 07 20 |!.............. |
000000a0: 1b 15 07 0b 00                                  |.....|
```