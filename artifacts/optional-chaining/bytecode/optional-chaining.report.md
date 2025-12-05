# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/optional-chaining.ts
**生成时间**: 2025-12-05T12:54:24.208Z

## 大小对比

- TypeScript编译器: 483 字节
- WASM编译器: 377 字节
- 差异: 106 字节 (28.12%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 12,
  "atoms": [
    {
      "index": 0,
      "rawLength": 232,
      "actualLength": 116,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/optional-chaining.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 120
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 122
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 124
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 126
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "w",
      "offset": 128
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "mixed",
      "offset": 130
    },
    {
      "index": 7,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "callChain",
      "offset": 136
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 146
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 148
    },
    {
      "index": 10,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "missing",
      "offset": 150
    },
    {
      "index": 11,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "method",
      "offset": 158
    }
  ],
  "functionHeader": {
    "offset": 165,
    "tag": "0xd",
    "remaining": 318
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 12,
  "atoms": [
    {
      "index": 0,
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/optional-chaining.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 55
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 57
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "w",
      "offset": 59
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "mixed",
      "offset": 61
    },
    {
      "index": 7,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "callChain",
      "offset": 67
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 77
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 79
    },
    {
      "index": 10,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "missing",
      "offset": 81
    },
    {
      "index": 11,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "method",
      "offset": 89
    }
  ],
  "functionHeader": {
    "offset": 96,
    "tag": "0xd",
    "remaining": 281
  }
}
```

## 字节级差异

共发现 454 个字节差异:

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
- ... (显示前20个差异，总共454个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0c e8 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 6f 70 74 69 6f 6e 61 6c 2d 63 68 61 |res/optional-cha|
00000070: 69 6e 69 6e 67 2e 6a 73 02 61 02 78 02 79 02 7a |ining.js.a.x.y.z|
00000080: 02 77 0a 6d 69 78 65 64 12 63 61 6c 6c 43 68 61 |.w.mixed.callCha|
00000090: 69 6e 02 63 02 62 0e 6d 69 73 73 69 6e 67 0c 6d |in.c.b.missing.m|
000000a0: 65 74 68 6f 64 0d c8 03 00 00 00 00 00 0c 20 06 |ethod......... .|
000000b0: 01 a4 01 00 07 00 03 07 00 d1 01 07 ca 03 00 00 |................|
000000c0: 00 cc 03 00 00 00 ce 03 00 00 00 d0 03 00 00 00 |................|
000000d0: d2 03 00 00 00 d4 03 00 00 00 d6 03 00 00 00 ca |................|
000000e0: 03 00 01 cc 03 01 01 ce 03 02 01 d0 03 03 01 d2 |................|
000000f0: 03 04 01 d4 03 05 01 d6 03 06 01 08 6c c9 00 00 |............l...|
00000100: 00 0b 0b b8 4e ec 00 00 00 4e ed 00 00 00 e3 df |....N....N......|
00000110: 11 b2 ec 07 0e 06 6e 15 00 00 00 42 ed 00 00 00 |......n....B....|
00000120: 11 b2 ec 07 0e 06 6e 05 00 00 00 42 ec 00 00 00 |......n....B....|
00000130: e4 df 11 b2 ec 07 0e 06 6e 16 00 00 00 04 ed 00 |........n.......|
00000140: 00 00 48 11 b2 ec 07 0e 06 6e 05 00 00 00 42 ec |..H......n....B.|
00000150: 00 00 00 e5 df 11 b2 ec 07 0e 06 6e 15 00 00 00 |...........n....|
00000160: 42 ee 00 00 00 11 b2 ec 07 0e 06 6e 05 00 00 00 |B..........n....|
00000170: 42 ec 00 00 00 e6 df 11 b2 ec 07 0e 06 6e 14 00 |B............n..|
00000180: 00 00 43 ef 00 00 00 11 b2 ec 08 0e 0e 06 6e 03 |..C...........n.|
00000190: 00 00 00 24 00 00 61 04 00 df 11 b2 ec 07 0e 06 |...$..a.........|
000001a0: 6e 0a 00 00 00 42 ed 00 00 00 42 ec 00 00 00 61 |n....B....B....a|
000001b0: 05 00 df 11 b2 ec 07 0e 06 6e 08 00 00 00 43 ed |.........n....C.|
000001c0: 00 00 00 24 00 00 61 06 00 29 06 2f c8 03 01 12 |...$..a..)./....|
000001d0: 00 14 01 00 22 01 00 23 01 00 22 01 00 23 01 00 |...."..#.."..#..|
000001e0: 19 01 00                                        |...|
```

### WASM
```
00000000: 05 0c 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 70 74 69 6f 6e 61 6c 2d 63 68 61 69 6e 69 6e 67 |ptional-chaining|
00000030: 2e 6a 73 02 61 02 78 02 79 02 7a 02 77 0a 6d 69 |.js.a.x.y.z.w.mi|
00000040: 78 65 64 12 63 61 6c 6c 43 68 61 69 6e 02 63 02 |xed.callChain.c.|
00000050: 62 0e 6d 69 73 73 69 6e 67 0c 6d 65 74 68 6f 64 |b.missing.method|
00000060: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000070: 00 03 07 00 bc 01 00 ca 03 00 0d cc 03 01 0d ce |................|
00000080: 03 02 0d d0 03 03 0d d2 03 04 0d d4 03 05 0d d6 |................|
00000090: 03 06 0d 08 ec 02 29 0b 0b b8 4e ec 00 00 00 4e |......)...N....N|
000000a0: ed 00 00 00 e3 68 00 00 11 b2 ec 05 0e 06 ee 13 |.....h..........|
000000b0: 42 ed 00 00 00 11 b2 ec 05 0e 06 ee 06 42 ec 00 |B............B..|
000000c0: 00 00 e4 68 00 00 11 b2 ec 05 0e 06 ee 14 04 ed |...h............|
000000d0: 00 00 00 48 11 b2 ec 05 0e 06 ee 06 42 ec 00 00 |...H........B...|
000000e0: 00 e5 68 00 00 11 b2 ec 05 0e 06 ee 13 42 ee 00 |..h..........B..|
000000f0: 00 00 11 b2 ec 05 0e 06 ee 06 42 ec 00 00 00 e6 |..........B.....|
00000100: 68 00 00 11 b2 ec 05 0e 06 ee 12 43 ef 00 00 00 |h..........C....|
00000110: 11 b2 ec 06 0e 0e 06 ee 04 24 00 00 61 04 00 68 |.........$..a..h|
00000120: 00 00 11 b2 ec 05 0e 06 ee 0b 42 ed 00 00 00 42 |..........B....B|
00000130: ec 00 00 00 61 05 00 68 00 00 11 b2 ec 05 0e 06 |....a..h........|
00000140: ee 09 43 ed 00 00 00 24 00 00 61 06 00 06 2f c8 |..C....$..a.../.|
00000150: 03 26 00 00 5d 14 11 02 43 06 49 07 52 02 07 0e |.&..]...C.I.R...|
00000160: 49 0f 11 02 43 12 49 13 11 02 70 14 21 0d 11 02 |I...C.I...p.!...|
00000170: 43 06 2b 00 11 02 43 06 00                      |C.+...C..|
```