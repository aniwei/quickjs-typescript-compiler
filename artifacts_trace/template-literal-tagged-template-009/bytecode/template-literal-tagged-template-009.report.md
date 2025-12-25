# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/template-literal-tagged-template-009.ts
**生成时间**: 2025-12-25T03:14:01.204Z

## 大小对比

- TypeScript编译器: 359 字节
- WASM编译器: 351 字节
- 差异: 8 字节 (2.28%)

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
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "tag9",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r1",
      "offset": 9
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r2",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 15
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 23
    },
    {
      "index": 6,
      "rawLength": 116,
      "actualLength": 58,
      "isWideChar": 0,
      "string": "__tests__/fixtures/template-literal-tagged-template-009.js",
      "offset": 27
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 86
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 88
    }
  ],
  "functionHeader": {
    "offset": 90,
    "tag": "0xc",
    "remaining": 269
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
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "tag9",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r1",
      "offset": 9
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r2",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 15
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 23
    },
    {
      "index": 6,
      "rawLength": 116,
      "actualLength": 58,
      "isWideChar": 0,
      "string": "__tests__/fixtures/template-literal-tagged-template-009.js",
      "offset": 27
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 86
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 88
    }
  ],
  "functionHeader": {
    "offset": 90,
    "tag": "0xc",
    "remaining": 261
  }
}
```

## 字节级差异

共发现 61 个字节差异:

- 偏移量 0x10b: TS=0x14 vs WASM=0x0c
- 偏移量 0x11e: TS=0x42 vs WASM=0xeb
- 偏移量 0x11f: TS=0x30 vs WASM=0xd4
- 偏移量 0x120: TS=0x00 vs WASM=0xeb
- 偏移量 0x121: TS=0x00 vs WASM=0x9f
- 偏移量 0x122: TS=0x00 vs WASM=0x28
- 偏移量 0x124: TS=0x42 vs WASM=0x03
- 偏移量 0x125: TS=0x30 vs WASM=0x10
- 偏移量 0x126: TS=0x00 vs WASM=0x01
- 偏移量 0x128: TS=0x00 vs WASM=0x16
- 偏移量 0x129: TS=0x9f vs WASM=0x40
- 偏移量 0x12a: TS=0x28 vs WASM=0x0c
- 偏移量 0x12b: TS=0xd4 vs WASM=0x02
- 偏移量 0x12c: TS=0x03 vs WASM=0x07
- 偏移量 0x12d: TS=0x10 vs WASM=0x06
- 偏移量 0x12e: TS=0x01 vs WASM=0x07
- 偏移量 0x12f: TS=0x00 vs WASM=0x14
- 偏移量 0x130: TS=0x16 vs WASM=0x07
- 偏移量 0x131: TS=0x40 vs WASM=0x02
- 偏移量 0x132: TS=0x0c vs WASM=0x07
- ... (显示前20个差异，总共61个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 08 74 61 67 39 02 78 04 72 31 04 72 32 0e |...tag9.x.r1.r2.|
00000010: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 74 5f 5f 74 65 |console.logt__te|
00000020: 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 74 |sts__/fixtures/t|
00000030: 65 6d 70 6c 61 74 65 2d 6c 69 74 65 72 61 6c 2d |emplate-literal-|
00000040: 74 61 67 67 65 64 2d 74 65 6d 70 6c 61 74 65 2d |tagged-template-|
00000050: 30 30 39 2e 6a 73 02 73 02 76 0c 00 06 00 a4 01 |009.js.s.v......|
00000060: 00 01 00 04 00 03 74 01 a6 01 00 00 00 40 e4 00 |......t......@..|
00000070: 00 00 40 40 e5 00 00 00 80 40 e6 00 00 00 80 40 |..@@.....@.....@|
00000080: e7 00 00 00 80 c2 00 41 e4 00 00 00 00 3f e5 00 |.......A.....?..|
00000090: 00 00 80 3f e6 00 00 00 80 3f e7 00 00 00 80 bf |...?.....?......|
000000a0: 09 bf 0a 9e 3b e5 00 00 00 39 e4 00 00 00 c1 01 |....;....9......|
000000b0: 39 e5 00 00 00 f2 3b e6 00 00 00 39 e4 00 00 00 |9.....;....9....|
000000c0: c1 02 f1 3b e7 00 00 00 39 e8 00 00 00 43 e9 00 |...;....9....C..|
000000d0: 00 00 39 e6 00 00 00 39 e7 00 00 00 24 02 00 cf |..9....9....$...|
000000e0: 28 d4 03 1a 00 00 00 36 04 18 21 01 25 12 1b 07 |(......6..!.%...|
000000f0: 21 09 25 0a 21 1f 1b 0e 1b 0a 1b 08 1b 09 00 0c |!.%.!...........|
00000100: 41 06 00 c8 03 02 00 01 02 00 00 14 02 d6 03 00 |A...............|
00000110: 01 00 d8 03 00 01 00 0d 01 00 d8 d3 b7 48 42 30 |.............HB0|
00000120: 00 00 00 d4 42 30 00 00 00 9f 28 d4 03 10 01 00 |....B0....(.....|
00000130: 16 40 0c 02 07 06 1b 14 07 02 1b 05 07 25 00 0b |.@...........%..|
00000140: 02 07 02 61 07 02 62 0b 02 07 02 61 07 02 62 02 |...a..b....a..b.|
00000150: 0b 01 07 0e 6e 6f 5f 73 75 62 73 0b 01 07 0e 6e |....no_subs....n|
00000160: 6f 5f 73 75 62 73 02                            |o_subs.|
```

### WASM
```
00000000: 05 09 08 74 61 67 39 02 78 04 72 31 04 72 32 0e |...tag9.x.r1.r2.|
00000010: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 74 5f 5f 74 65 |console.logt__te|
00000020: 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 74 |sts__/fixtures/t|
00000030: 65 6d 70 6c 61 74 65 2d 6c 69 74 65 72 61 6c 2d |emplate-literal-|
00000040: 74 61 67 67 65 64 2d 74 65 6d 70 6c 61 74 65 2d |tagged-template-|
00000050: 30 30 39 2e 6a 73 02 73 02 76 0c 00 06 00 a4 01 |009.js.s.v......|
00000060: 00 01 00 04 00 03 74 01 a6 01 00 00 00 40 e4 00 |......t......@..|
00000070: 00 00 40 40 e5 00 00 00 80 40 e6 00 00 00 80 40 |..@@.....@.....@|
00000080: e7 00 00 00 80 c2 00 41 e4 00 00 00 00 3f e5 00 |.......A.....?..|
00000090: 00 00 80 3f e6 00 00 00 80 3f e7 00 00 00 80 bf |...?.....?......|
000000a0: 09 bf 0a 9e 3b e5 00 00 00 39 e4 00 00 00 c1 01 |....;....9......|
000000b0: 39 e5 00 00 00 f2 3b e6 00 00 00 39 e4 00 00 00 |9.....;....9....|
000000c0: c1 02 f1 3b e7 00 00 00 39 e8 00 00 00 43 e9 00 |...;....9....C..|
000000d0: 00 00 39 e6 00 00 00 39 e7 00 00 00 24 02 00 cf |..9....9....$...|
000000e0: 28 d4 03 1a 00 00 00 36 04 18 21 01 25 12 1b 07 |(......6..!.%...|
000000f0: 21 09 25 0a 21 1f 1b 0e 1b 0a 1b 08 1b 09 00 0c |!.%.!...........|
00000100: 41 06 00 c8 03 02 00 01 02 00 00 0c 02 d6 03 00 |A...............|
00000110: 01 00 d8 03 00 01 00 0d 01 00 d8 d3 b7 48 eb d4 |.............H..|
00000120: eb 9f 28 d4 03 10 01 00 16 40 0c 02 07 06 07 14 |..(......@......|
00000130: 07 02 07 05 07 25 00 0b 02 07 02 61 07 02 62 0b |.....%.....a..b.|
00000140: 02 07 02 61 07 02 62 02 0b 01 07 0e 6e 6f 5f 73 |...a..b.....no_s|
00000150: 75 62 73 0b 01 07 0e 6e 6f 5f 73 75 62 73 02    |ubs....no_subs.|
```