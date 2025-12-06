# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/optional-chaining.ts
**生成时间**: 2025-12-06T02:09:56.467Z

## 大小对比

- TypeScript编译器: 388 字节
- WASM编译器: 377 字节
- 差异: 11 字节 (2.92%)

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
    "remaining": 292
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

共发现 188 个字节差异:

- 偏移量 0x74: TS=0xda vs WASM=0xbc
- 偏移量 0xab: TS=0x08 vs WASM=0x05
- 偏移量 0xae: TS=0x6e vs WASM=0xee
- 偏移量 0xaf: TS=0x19 vs WASM=0x13
- 偏移量 0xb0: TS=0x00 vs WASM=0x42
- 偏移量 0xb1: TS=0x00 vs WASM=0xed
- 偏移量 0xb3: TS=0x42 vs WASM=0x00
- 偏移量 0xb4: TS=0xed vs WASM=0x00
- 偏移量 0xb5: TS=0x00 vs WASM=0x11
- 偏移量 0xb6: TS=0x00 vs WASM=0xb2
- 偏移量 0xb7: TS=0x00 vs WASM=0xec
- 偏移量 0xb8: TS=0x11 vs WASM=0x05
- 偏移量 0xb9: TS=0xb2 vs WASM=0x0e
- 偏移量 0xba: TS=0xec vs WASM=0x06
- 偏移量 0xbb: TS=0x08 vs WASM=0xee
- 偏移量 0xbc: TS=0x0e vs WASM=0x06
- 偏移量 0xbd: TS=0x06 vs WASM=0x42
- 偏移量 0xbe: TS=0x6e vs WASM=0xec
- 偏移量 0xbf: TS=0x09 vs WASM=0x00
- 偏移量 0xc2: TS=0x00 vs WASM=0xe4
- ... (显示前20个差异，总共188个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0c 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 70 74 69 6f 6e 61 6c 2d 63 68 61 69 6e 69 6e 67 |ptional-chaining|
00000030: 2e 6a 73 02 61 02 78 02 79 02 7a 02 77 0a 6d 69 |.js.a.x.y.z.w.mi|
00000040: 78 65 64 12 63 61 6c 6c 43 68 61 69 6e 02 63 02 |xed.callChain.c.|
00000050: 62 0e 6d 69 73 73 69 6e 67 0c 6d 65 74 68 6f 64 |b.missing.method|
00000060: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000070: 00 03 07 00 da 01 00 ca 03 00 0d cc 03 01 0d ce |................|
00000080: 03 02 0d d0 03 03 0d d2 03 04 0d d4 03 05 0d d6 |................|
00000090: 03 06 0d 08 ec 02 29 0b 0b b8 4e ec 00 00 00 4e |......)...N....N|
000000a0: ed 00 00 00 e3 68 00 00 11 b2 ec 08 0e 06 6e 19 |.....h........n.|
000000b0: 00 00 00 42 ed 00 00 00 11 b2 ec 08 0e 06 6e 09 |...B..........n.|
000000c0: 00 00 00 42 ec 00 00 00 e4 68 00 00 11 b2 ec 08 |...B.....h......|
000000d0: 0e 06 6e 1a 00 00 00 04 ed 00 00 00 48 11 b2 ec |..n.........H...|
000000e0: 08 0e 06 6e 09 00 00 00 42 ec 00 00 00 e5 68 00 |...n....B.....h.|
000000f0: 00 11 b2 ec 08 0e 06 6e 19 00 00 00 42 ee 00 00 |.......n....B...|
00000100: 00 11 b2 ec 08 0e 06 6e 09 00 00 00 42 ec 00 00 |.......n....B...|
00000110: 00 e6 68 00 00 11 b2 ec 08 0e 06 6e 18 00 00 00 |..h........n....|
00000120: 43 ef 00 00 00 11 b2 ec 09 0e 0e 06 6e 07 00 00 |C...........n...|
00000130: 00 24 00 00 61 04 00 68 00 00 11 b2 ec 08 0e 06 |.$..a..h........|
00000140: 6e 0e 00 00 00 42 ed 00 00 00 42 ec 00 00 00 61 |n....B....B....a|
00000150: 05 00 68 00 00 11 b2 ec 08 0e 06 6e 0c 00 00 00 |..h........n....|
00000160: 43 ed 00 00 00 24 00 00 61 06 00 06 2f c8 03 00 |C....$..a.../...|
00000170: 12 16 0f 07 05 07 05 3f 71 b7 00 48 04 76 7c b7 |.......?q..H.v|.|
00000180: 00 bc 04 00                                     |....|
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