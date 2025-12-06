# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/try-catch-finally-complex.ts
**生成时间**: 2025-12-06T02:09:56.544Z

## 大小对比

- TypeScript编译器: 670 字节
- WASM编译器: 636 字节
- 差异: 34 字节 (5.35%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 112,
      "actualLength": 56,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/try-catch-finally-complex.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "testFinallyReturn",
      "offset": 59
    },
    {
      "index": 2,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "testFinallyBreak",
      "offset": 77
    },
    {
      "index": 3,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "testFinallyContinue",
      "offset": 94
    },
    {
      "index": 4,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "testNestedFinally",
      "offset": 114
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 132
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 140
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 144
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 146
    }
  ],
  "functionHeader": {
    "offset": 148,
    "tag": "0xd",
    "remaining": 522
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 112,
      "actualLength": 56,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/try-catch-finally-complex.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "testFinallyReturn",
      "offset": 59
    },
    {
      "index": 2,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "testFinallyBreak",
      "offset": 77
    },
    {
      "index": 3,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "testFinallyContinue",
      "offset": 94
    },
    {
      "index": 4,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "testNestedFinally",
      "offset": 114
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 132
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 140
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 144
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 146
    }
  ],
  "functionHeader": {
    "offset": 148,
    "tag": "0xd",
    "remaining": 488
  }
}
```

## 字节级差异

共发现 357 个字节差异:

- 偏移量 0x10e: TS=0x00 vs WASM=0x2c
- 偏移量 0x10f: TS=0x1e vs WASM=0x00
- 偏移量 0x110: TS=0x12 vs WASM=0x00
- 偏移量 0x112: TS=0x00 vs WASM=0x10
- 偏移量 0x113: TS=0x03 vs WASM=0x62
- 偏移量 0x114: TS=0x08 vs WASM=0x00
- 偏移量 0x115: TS=0x00 vs WASM=0x1b
- 偏移量 0x116: TS=0x00 vs WASM=0x0e
- 偏移量 0x117: TS=0x03 vs WASM=0x1b
- 偏移量 0x118: TS=0x0c vs WASM=0x0a
- 偏移量 0x119: TS=0x00 vs WASM=0x07
- 偏移量 0x11a: TS=0x00 vs WASM=0x22
- 偏移量 0x11b: TS=0x03 vs WASM=0x07
- 偏移量 0x11c: TS=0x0e vs WASM=0x23
- 偏移量 0x11d: TS=0x00 vs WASM=0x17
- 偏移量 0x11e: TS=0x00 vs WASM=0x15
- 偏移量 0x11f: TS=0x04 vs WASM=0x1b
- 偏移量 0x121: TS=0x00 vs WASM=0x1b
- 偏移量 0x122: TS=0x34 vs WASM=0x0a
- 偏移量 0x123: TS=0x0c vs WASM=0x07
- ... (显示前20个差异，总共357个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 70 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..p__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 72 79 2d 63 61 74 63 68 2d 66 69 6e 61 6c 6c 79 |ry-catch-finally|
00000030: 2d 63 6f 6d 70 6c 65 78 2e 6a 73 22 74 65 73 74 |-complex.js"test|
00000040: 46 69 6e 61 6c 6c 79 52 65 74 75 72 6e 20 74 65 |FinallyReturn te|
00000050: 73 74 46 69 6e 61 6c 6c 79 42 72 65 61 6b 26 74 |stFinallyBreak&t|
00000060: 65 73 74 46 69 6e 61 6c 6c 79 43 6f 6e 74 69 6e |estFinallyContin|
00000070: 75 65 22 74 65 73 74 4e 65 73 74 65 64 46 69 6e |ue"testNestedFin|
00000080: 61 6c 6c 79 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |ally.console.log|
00000090: 02 78 02 69 0d c8 03 00 00 00 00 00 0c 20 06 01 |.x.i......... ..|
000000a0: a4 01 00 00 00 03 04 04 52 00 ca 03 00 01 cc 03 |........R.......|
000000b0: 01 01 ce 03 02 01 d0 03 03 01 08 ec 0e c2 00 e3 |................|
000000c0: c2 01 e4 c2 02 e5 c2 03 e6 29 39 e9 00 00 00 43 |.........)9....C|
000000d0: ea 00 00 00 df f0 24 01 00 0e 39 e9 00 00 00 43 |......$...9....C|
000000e0: ea 00 00 00 e0 f0 24 01 00 0e 39 e9 00 00 00 43 |......$...9....C|
000000f0: ea 00 00 00 e1 f0 24 01 00 0e 39 e9 00 00 00 43 |......$...9....C|
00000100: ea 00 00 00 e2 f0 24 01 00 0e 06 2f c8 03 00 1e |......$..../....|
00000110: 12 00 00 03 08 00 00 03 0c 00 00 03 0e 00 00 04 |................|
00000120: 0e 00 34 0c 21 74 34 0c 21 74 34 0c 21 74 00 0c |..4.!t4.!t4.!t..|
00000130: 42 06 00 ca 03 00 00 00 03 00 00 26 00 6f 19 00 |B..........&.o..|
00000140: 00 00 b8 70 19 00 00 00 0f 28 0e 06 70 10 00 00 |...p.....(..p...|
00000150: 00 0e 6e 0f 00 00 00 70 05 00 00 00 30 b9 0f 0f |..n....p....0...|
00000160: 28 71 29 c8 03 00 06 04 04 1c 0b 8b 00 00 0c 42 |(q)............B|
00000170: 06 00 cc 03 00 01 00 03 00 00 36 01 d6 03 01 00 |..........6.....|
00000180: 20 b7 cb 0a 6c 2f 00 00 00 6f 1c 00 00 00 70 1d | ...l/...o....p.|
00000190: 00 00 00 0e 6e 1f 00 00 00 0e 06 70 10 00 00 00 |....n......p....|
000001a0: 0e 6e 0d 00 00 00 70 05 00 00 00 30 b8 cb 71 6e |.n....p....0..qn|
000001b0: d3 ff ff ff c7 28 29 c8 03 07 0c 05 0b 0d 7f 21 |.....()........!|
000001c0: 7d 1c 04 9a 04 2d 7b 00 0c 42 06 00 ce 03 00 02 |}....-{..B......|
000001d0: 00 03 00 00 3a 02 d6 03 01 00 20 d8 03 01 00 20 |....:..... .... |
000001e0: b7 cb b7 cc c8 b9 a5 6c 2f 00 00 00 0e 6f 1c 00 |.......l/....o..|
000001f0: 00 00 70 1d 00 00 00 0e 6e eb ff ff ff 0e 06 70 |..p.....n......p|
00000200: 10 00 00 00 0e 6e 0c 00 00 00 70 05 00 00 00 30 |.....n....p....0|
00000210: 0e 71 6e d1 ff ff ff c7 28 29 c8 03 13 12 05 0b |.qn.....()......|
00000220: 0d 00 0d 7f 07 04 26 79 08 00 1c 04 9a 00 28 7f |......&y......(.|
00000230: 00 0c 42 06 00 d0 03 00 01 00 03 00 00 47 01 d6 |..B..........G..|
00000240: 03 01 00 20 b7 cb 6f 39 00 00 00 6f 1f 00 00 00 |... ..o9...o....|
00000250: b8 70 1f 00 00 00 0f 70 2e 00 00 00 0f 28 0e 06 |.p.....p.....(..|
00000260: 70 10 00 00 00 0e 6e 0c 00 00 00 70 05 00 00 00 |p.....n....p....|
00000270: 30 0e 71 0e 06 70 10 00 00 00 0e 6e 0c 00 00 00 |0.q..p.....n....|
00000280: 70 05 00 00 00 30 0e 71 c7 28 29 c8 03 21 0e 05 |p....0.q.()..!..|
00000290: 0b 0d 78 1c 04 1c 0b a9 79 6e 7c 0e 03 00       |..x.....yn|...|
```

### WASM
```
00000000: 05 09 70 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..p__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 72 79 2d 63 61 74 63 68 2d 66 69 6e 61 6c 6c 79 |ry-catch-finally|
00000030: 2d 63 6f 6d 70 6c 65 78 2e 6a 73 22 74 65 73 74 |-complex.js"test|
00000040: 46 69 6e 61 6c 6c 79 52 65 74 75 72 6e 20 74 65 |FinallyReturn te|
00000050: 73 74 46 69 6e 61 6c 6c 79 42 72 65 61 6b 26 74 |stFinallyBreak&t|
00000060: 65 73 74 46 69 6e 61 6c 6c 79 43 6f 6e 74 69 6e |estFinallyContin|
00000070: 75 65 22 74 65 73 74 4e 65 73 74 65 64 46 69 6e |ue"testNestedFin|
00000080: 61 6c 6c 79 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |ally.console.log|
00000090: 02 78 02 69 0d c8 03 00 00 00 00 00 0c 20 06 01 |.x.i......... ..|
000000a0: a4 01 00 00 00 03 04 04 52 00 ca 03 00 01 cc 03 |........R.......|
000000b0: 01 01 ce 03 02 01 d0 03 03 01 08 ec 0e c2 00 e3 |................|
000000c0: c2 01 e4 c2 02 e5 c2 03 e6 29 39 e9 00 00 00 43 |.........)9....C|
000000d0: ea 00 00 00 df f0 24 01 00 0e 39 e9 00 00 00 43 |......$...9....C|
000000e0: ea 00 00 00 e0 f0 24 01 00 0e 39 e9 00 00 00 43 |......$...9....C|
000000f0: ea 00 00 00 e1 f0 24 01 00 0e 39 e9 00 00 00 43 |......$...9....C|
00000100: ea 00 00 00 e2 f0 24 01 00 0e 06 2f c8 03 2c 00 |......$..../..,.|
00000110: 00 00 10 62 00 1b 0e 1b 0a 07 22 07 23 17 15 1b |...b......".#...|
00000120: 0e 1b 0a 07 20 07 21 17 15 1b 0e 1b 0a 07 26 07 |.... .!.......&.|
00000130: 27 17 15 1b 0e 1b 0a 07 22 07 23 00 0c 43 06 01 |'.......".#..C..|
00000140: ca 03 00 00 00 03 00 00 15 00 6f 0c 00 00 00 b8 |..........o.....|
00000150: 72 70 0b 00 00 00 28 70 05 00 00 00 30 b9 28 c8 |rp....(p....0.(.|
00000160: 03 06 00 00 22 10 4b 00 00 0c 43 06 01 cc 03 00 |....".K...C.....|
00000170: 01 00 04 00 00 25 01 d6 03 01 00 20 63 00 00 b7 |.....%..... c...|
00000180: cb 6f 0e 00 00 00 0e 06 70 0d 00 00 00 0e ee 0e |.o......p.......|
00000190: 70 05 00 00 00 30 b8 11 65 00 00 0e 71 64 00 00 |p....0..e...qd..|
000001a0: 28 c8 03 0a 08 00 00 1a 0e 18 28 01 11 0d 00 0c |(.........(.....|
000001b0: 43 06 01 ce 03 00 02 00 04 00 00 3b 02 d6 03 01 |C..........;....|
000001c0: 00 20 d8 03 01 01 20 63 01 00 63 00 00 b7 cb b7 |. .... c..c.....|
000001d0: cc 64 01 00 b9 a5 ec 27 64 01 00 93 65 01 00 0e |.d.....'d...e...|
000001e0: 6f 0e 00 00 00 0e 06 70 0d 00 00 00 0e ee e3 70 |o......p.......p|
000001f0: 05 00 00 00 30 64 00 00 93 65 00 00 0e 71 64 00 |....0d...e...qd.|
00000200: 00 28 c8 03 14 14 00 37 16 16 04 12 09 11 02 00 |.(.....7........|
00000210: 1a 0a 06 11 02 23 03 11 0d 00 0c 43 06 01 d0 03 |.....#.....C....|
00000220: 00 01 00 05 00 00 3b 01 d6 03 01 00 20 63 00 00 |......;..... c..|
00000230: b7 cb 6f 26 00 00 00 6f 12 00 00 00 b8 72 70 11 |..o&...o.....rp.|
00000240: 00 00 00 72 70 1a 00 00 00 28 70 05 00 00 00 30 |...rp....(p....0|
00000250: 64 00 00 93 65 00 00 0e 71 70 05 00 00 00 30 64 |d...e...qp....0d|
00000260: 00 00 93 65 00 00 0e 71 c8 03 10 22 00 00 10 08 |...e...q..."....|
00000270: 18 64 00 11 02 00 0c 08 09 11 02 00             |.d..........|
```